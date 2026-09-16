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
import { SubmitInquiryInputDto, SubmitInquiryOutputDto } from '../dtos/submit-inquiry.dto';

export class SubmitInquiryUseCase {
  constructor(
    private readonly inquiryRepository: IInquiryRepository,
    private readonly logger: ILogger,
    private readonly jobQueue: IJobQueue,
    private readonly clock: IClock
  ) {}

  public async execute(input: SubmitInquiryInputDto): Promise<SubmitInquiryOutputDto> {
    // 1. Build & Validate Domain Value Objects
    const email = new Email(input.email);
    const companyTier = new CompanyTier(input.companyTier);
    const budgetRange = new BudgetRange(input.budgetRange);
    const services = input.services.map((code) => new ServiceCategory(code));

    // 2. Validate Domain Business Rules
    InquirySubmissionRules.validateHighTicketAlignment(companyTier, budgetRange);

    // 3. Instantiate Domain Entity
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

    // 4. Persist Aggregate
    await this.inquiryRepository.save(inquiry);

    // 5. Calculate Priority & Review Window
    const priorityScore = InquirySubmissionRules.calculatePriorityScore(
      companyTier,
      budgetRange,
      services.length
    );
    const estimatedReviewHours = companyTier.isHighTicket() ? 12 : 24;

    // 6. Structured Audit Logging
    this.logger.audit('INQUIRY_SUBMITTED', email.value, {
      inquiryId: inquiry.id,
      companyTier: companyTier.value,
      budgetRange: budgetRange.value,
      priorityScore,
    });

    // 7. Enqueue Background Notification Job (Async Boundary)
    await this.jobQueue.enqueue(
      'SEND_INQUIRY_NOTIFICATION',
      {
        inquiryId: inquiry.id,
        recipientEmail: email.value,
        clientName: inquiry.clientName,
      },
      `notify_${inquiry.id}`
    );

    // 8. Return Standard Output DTO
    return {
      inquiryId: inquiry.id,
      status: inquiry.status,
      estimatedReviewHours,
      priorityScore,
      receivedAt: inquiry.createdAt.toISOString(),
    };
  }
}
