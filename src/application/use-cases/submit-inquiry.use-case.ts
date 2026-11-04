import { Inquiry } from '../../domain/entities/inquiry.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { CompanyTier } from '../../domain/value-objects/company-tier.vo';
import { BudgetRange } from '../../domain/value-objects/budget-range.vo';
import { ServiceCategory } from '../../domain/value-objects/service-category.vo';
import { InquirySubmissionRules } from '../../domain/rules/inquiry-submission.rules';
import { IInquiryRepository } from '../../domain/repositories/inquiry.repository.interface';
import { ILogger } from '../ports/logger.port';
import { IJobQueue } from '../ports/job-queue.port';
import { IClock } from '../ports/clock.port';
import { IRateLimiter } from '../ports/rate-limiter.port';
import { ICache } from '../ports/cache.port';
import { SubmitInquiryInputDto, SubmitInquiryOutputDto } from '../dtos/submit-inquiry.dto';
import { submitInquirySchema } from '../../domain/validation/inquiry.schema';
import { IdempotencyStore } from '../../infrastructure/security/idempotency';
import { sanitizeText, detectAndNeutralizePromptInjection } from '../../infrastructure/security/sanitizer';

export interface IntakePipelineContext {
  clientIp: string;
  requestId: string;
  idempotencyKey?: string | null;
}

export interface IntakePipelineRequest {
  payload: unknown;
  context: IntakePipelineContext;
}

export type IntakePipelineResult =
  | {
      status: 'SUCCESS';
      statusCode: 201;
      data: SubmitInquiryOutputDto;
      headers: Record<string, string>;
    }
  | {
      status: 'IDEMPOTENT_REPLAY';
      statusCode: number;
      body: unknown;
      headers: Record<string, string>;
    }
  | {
      status: 'CONCURRENT_IN_FLIGHT';
      statusCode: 409;
      error: { code: string; message: string };
      headers: Record<string, string>;
    }
  | {
      status: 'RATE_LIMIT_EXCEEDED';
      statusCode: 429;
      error: { code: string; message: string };
      headers: Record<string, string>;
    }
  | {
      status: 'SPAM_REJECTED';
      statusCode: 400;
      error: { code: string; message: string };
      headers: Record<string, string>;
    }
  | {
      status: 'TIME_LOCK_VIOLATION';
      statusCode: 400;
      error: { code: string; message: string };
      headers: Record<string, string>;
    };

export class SubmitInquiryUseCase {
  constructor(
    private readonly inquiryRepository: IInquiryRepository,
    private readonly logger: ILogger,
    private readonly jobQueue: IJobQueue,
    private readonly clock: IClock,
    private readonly rateLimiter?: IRateLimiter,
    private readonly cache?: ICache,
    private readonly idempotency?: IdempotencyStore
  ) {}

  public async processIntake({
    payload,
    context,
  }: IntakePipelineRequest): Promise<IntakePipelineResult> {
    const rateLimitHeaders: Record<string, string> = {};

    if (this.rateLimiter) {
      const rateLimit = await this.rateLimiter.checkLimit(context.clientIp);
      rateLimitHeaders['X-RateLimit-Limit'] = String(rateLimit.limit);
      rateLimitHeaders['X-RateLimit-Remaining'] = String(rateLimit.remaining);

      if (!rateLimit.allowed) {
        rateLimitHeaders['Retry-After'] = String(rateLimit.retryAfterSeconds);
        return {
          status: 'RATE_LIMIT_EXCEEDED',
          statusCode: 429,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many inquiry submissions from this IP. Please try again shortly.',
          },
          headers: rateLimitHeaders,
        };
      }
    }

    const { idempotencyKey } = context;
    if (idempotencyKey && this.idempotency) {
      const cached = this.idempotency.get(idempotencyKey);
      if (cached) {
        if (cached.status === 'RESOLVED' && cached.response) {
          return {
            status: 'IDEMPOTENT_REPLAY',
            statusCode: cached.response.statusCode,
            body: cached.response.body,
            headers: {
              'X-Idempotent-Replay': 'true',
              'X-Request-Id': context.requestId,
              ...rateLimitHeaders,
            },
          };
        }

        if (cached.status === 'IN_FLIGHT') {
          return {
            status: 'CONCURRENT_IN_FLIGHT',
            statusCode: 409,
            error: {
              code: 'CONCURRENT_REQUEST_IN_FLIGHT',
              message: 'A submission with this idempotency key is currently processing. Please wait.',
            },
            headers: {
              'X-Request-Id': context.requestId,
              ...rateLimitHeaders,
            },
          };
        }
      }

      const marked = this.idempotency.markInFlight(idempotencyKey);
      if (!marked) {
        return {
          status: 'CONCURRENT_IN_FLIGHT',
          statusCode: 409,
          error: {
            code: 'CONCURRENT_REQUEST_IN_FLIGHT',
            message: 'A submission with this idempotency key is currently in-flight.',
          },
          headers: {
            'X-Request-Id': context.requestId,
            ...rateLimitHeaders,
          },
        };
      }
    }

    let validatedInput;
    try {
      validatedInput = submitInquirySchema.parse(payload);
    } catch (err) {
      if (idempotencyKey && this.idempotency) {
        this.idempotency.release(idempotencyKey);
      }
      throw err;
    }

    if (
      validatedInput.company_fax_number &&
      validatedInput.company_fax_number.trim().length > 0
    ) {
      this.logger.warn('Spam rejected: Honeypot field filled', {
        ip: context.clientIp,
        fax: validatedInput.company_fax_number,
      });
      if (idempotencyKey && this.idempotency) {
        this.idempotency.release(idempotencyKey);
      }
      return {
        status: 'SPAM_REJECTED',
        statusCode: 400,
        error: {
          code: 'SPAM_REJECTED',
          message: 'Inquiry submission rejected by security telemetry.',
        },
        headers: rateLimitHeaders,
      };
    }

    if (
      typeof validatedInput.submissionDurationMs === 'number' &&
      validatedInput.submissionDurationMs < 2500
    ) {
      this.logger.warn('Spam rejected: Submission completed too fast', {
        ip: context.clientIp,
        durationMs: validatedInput.submissionDurationMs,
      });
      if (idempotencyKey && this.idempotency) {
        this.idempotency.release(idempotencyKey);
      }
      return {
        status: 'TIME_LOCK_VIOLATION',
        statusCode: 400,
        error: {
          code: 'TIME_LOCK_VIOLATION',
          message: 'Automated submission detected: Form completed too rapidly.',
        },
        headers: rateLimitHeaders,
      };
    }

    const sanitizedClientName = sanitizeText(validatedInput.clientName);
    const sanitizedCompanyName = sanitizeText(validatedInput.companyName);
    const sanitizedRawMessage = sanitizeText(validatedInput.message);
    const promptAnalysis = detectAndNeutralizePromptInjection(sanitizedRawMessage);

    if (promptAnalysis.isSuspicious) {
      this.logger.warn('Potential prompt injection detected in inquiry message', {
        ip: context.clientIp,
        detectedPatterns: promptAnalysis.detectedPatterns,
      });
    }

    const processedMessage = validatedInput.website
      ? `[Website: ${validatedInput.website}] ${promptAnalysis.sanitizedText}`
      : promptAnalysis.sanitizedText;

    try {
      const output = await this.execute({
        clientName: sanitizedClientName,
        companyName: sanitizedCompanyName,
        email: validatedInput.email,
        companyTier: validatedInput.companyTier,
        budgetRange: validatedInput.budgetRange,
        services: validatedInput.services,
        message: processedMessage,
      });

      if (this.cache) {
        await this.cache.invalidateByTag('inquiries');
      }

      const successEnvelope = {
        success: true,
        data: output,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: context.requestId,
        },
      };

      if (idempotencyKey && this.idempotency) {
        this.idempotency.resolve(idempotencyKey, 201, successEnvelope);
      }

      return {
        status: 'SUCCESS',
        statusCode: 201,
        data: output,
        headers: rateLimitHeaders,
      };
    } catch (err) {
      if (idempotencyKey && this.idempotency) {
        this.idempotency.release(idempotencyKey);
      }
      throw err;
    }
  }

  public async execute(input: SubmitInquiryInputDto): Promise<SubmitInquiryOutputDto> {
    const email = new Email(input.email);
    const companyTier = new CompanyTier(input.companyTier);
    const budgetRange = new BudgetRange(input.budgetRange);
    const services = input.services.map((code) => new ServiceCategory(code));

    InquirySubmissionRules.validateHighTicketAlignment(companyTier, budgetRange);

    const inquiryId = `inq_${this.clock.timestamp()}_${Math.random().toString(36).substring(2, 9)}`;
    const inquiry = Inquiry.create({
      id: inquiryId,
      clientName: input.clientName,
      companyName: input.companyName,
      email,
      companyTier,
      budgetRange,
      services,
      message: input.message,
    });

    await this.inquiryRepository.save(inquiry);

    const priorityScore = InquirySubmissionRules.calculatePriorityScore(
      companyTier,
      budgetRange,
      services.length
    );
    const estimatedReviewHours = companyTier.isHighTicket() ? 12 : 24;

    this.logger.audit('INQUIRY_SUBMITTED', email.value, {
      inquiryId: inquiry.id,
      companyTier: companyTier.value,
      budgetRange: budgetRange.value,
      priorityScore,
    });

    await this.jobQueue.enqueue(
      'SEND_INQUIRY_NOTIFICATION',
      {
        inquiryId: inquiry.id,
        recipientEmail: email.value,
        clientName: inquiry.clientName,
      },
      `notify_${inquiry.id}`
    );

    return {
      inquiryId: inquiry.id,
      status: inquiry.status,
      estimatedReviewHours,
      priorityScore,
      receivedAt: inquiry.createdAt.toISOString(),
    };
  }
}
