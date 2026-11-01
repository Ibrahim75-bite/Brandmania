import { NextRequest } from 'next/server';
import { z } from 'zod';
import { container } from '@/infrastructure/container';
import { extractRequestContext } from '@/infrastructure/http/request-context';
import { apiSuccess } from '@/infrastructure/http/api-response';
import { handleHttpError } from '@/infrastructure/http/error-handler';
import { RateLimitError } from '@/application/errors/application.error';
import { submitInquirySchema } from '@/domain/validation/inquiry.schema';
import { idempotencyStore } from '@/infrastructure/security/idempotency';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const ctx = extractRequestContext(req);
  const idempotencyKey = req.headers.get('Idempotency-Key') || req.headers.get('idempotency-key');

  if (idempotencyKey) {
    const cached = idempotencyStore.get(idempotencyKey);
    if (cached && cached.status === 'RESOLVED' && cached.response) {
      return new Response(JSON.stringify(cached.response.body), {
        status: cached.response.statusCode,
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotent-Replay': 'true',
          'X-Request-Id': ctx.requestId,
        },
      });
    }
  }

  try {
    // 1. Rate Limiting Check (Layer 3: IP Rate Limiting -> HTTP 429)
    const rateLimit = await container.rateLimiter.checkLimit(ctx.clientIp);
    if (!rateLimit.allowed) {
      throw new RateLimitError(
        'Too many inquiry submissions from this IP. Please try again shortly.',
        rateLimit.retryAfterSeconds
      );
    }

    // 2. Parse & Validate Payload
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      throw new z.ZodError([
        {
          code: 'custom',
          message: 'Malformed JSON payload in request body',
          path: [],
        },
      ]);
    }

    // 3. Strict Shared Zod Schema Validation
    const validatedInput = submitInquirySchema.parse(rawBody);

    // 4. Anti-Spam Layer 1: Honeypot Check
    if (
      validatedInput.company_fax_number &&
      validatedInput.company_fax_number.trim().length > 0
    ) {
      container.logger.warn('Spam rejected: Honeypot field filled', {
        ip: ctx.clientIp,
        fax: validatedInput.company_fax_number,
      });
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'SPAM_REJECTED',
            message: 'Inquiry submission rejected by security telemetry.',
          },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 5. Anti-Spam Layer 2: Submission Time-Lock (< 2500ms)
    if (
      typeof validatedInput.submissionDurationMs === 'number' &&
      validatedInput.submissionDurationMs < 2500
    ) {
      container.logger.warn('Spam rejected: Submission completed too fast', {
        ip: ctx.clientIp,
        durationMs: validatedInput.submissionDurationMs,
      });
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'TIME_LOCK_VIOLATION',
            message: 'Automated submission detected: Form completed too rapidly.',
          },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 6. Execute Application Use Case
    const result = await container.submitInquiryUseCase.execute({
      clientName: validatedInput.clientName,
      companyName: validatedInput.companyName,
      email: validatedInput.email,
      companyTier: validatedInput.companyTier,
      budgetRange: validatedInput.budgetRange,
      services: validatedInput.services,
      message: validatedInput.website
        ? `[Website: ${validatedInput.website}] ${validatedInput.message}`
        : validatedInput.message,
    });

    // 7. Return Standard API Success Envelope (201 Created)
    const successEnvelope = {
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: ctx.requestId,
      },
    };

    if (idempotencyKey) {
      idempotencyStore.resolve(idempotencyKey, 201, successEnvelope);
    }

    return apiSuccess(result, ctx.requestId, 201);
  } catch (err) {
    return handleHttpError(err, ctx.requestId);
  }
}
