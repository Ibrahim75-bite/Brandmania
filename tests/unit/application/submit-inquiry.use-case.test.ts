import { describe, it, expect, beforeEach } from 'vitest';
import { SubmitInquiryUseCase } from '@/application/use-cases/submit-inquiry.use-case';
import { InMemoryInquiryRepository } from '@/infrastructure/persistence/in-memory-inquiry.repository';
import { InMemoryJobQueue } from '@/infrastructure/jobs/memory-job-queue';
import { StructuredLogger } from '@/infrastructure/logging/logger';
import { SystemClock } from '@/application/ports/clock.port';
import { BusinessRuleViolationError } from '@/domain/errors/domain.error';

describe('SubmitInquiryUseCase', () => {
  let repository: InMemoryInquiryRepository;
  let logger: StructuredLogger;
  let jobQueue: InMemoryJobQueue;
  let clock: SystemClock;
  let useCase: SubmitInquiryUseCase;

  beforeEach(() => {
    repository = new InMemoryInquiryRepository();
    logger = new StructuredLogger('error');
    jobQueue = new InMemoryJobQueue();
    clock = new SystemClock();
    useCase = new SubmitInquiryUseCase(repository, logger, jobQueue, clock);
  });

  it('should successfully orchestrate a valid high-ticket inquiry submission', async () => {
    const result = await useCase.execute({
      clientName: 'Julian Sterling',
      companyName: 'Sterling Private Wealth',
      email: 'julian@sterling.com',
      companyTier: 'GLOBAL_ENTERPRISE',
      budgetRange: 'TIER_250K_500K',
      services: ['BRAND_DIRECTION', 'MARGIN_RECOVERY'],
      message: 'Seeking full brand restructuring and margin recovery programs.',
    });

    expect(result.inquiryId).toBeDefined();
    expect(result.status).toBe('PENDING');
    expect(result.estimatedReviewHours).toBe(12); // High ticket gets 12hr review window
    expect(result.priorityScore).toBeGreaterThan(50);

    const saved = await repository.findById(result.inquiryId);
    expect(saved).not.toBeNull();
    expect(saved?.clientName).toBe('Julian Sterling');
  });

  it('should reject Haute Luxury client if budget is below $100k threshold', async () => {
    await expect(
      useCase.execute({
        clientName: 'Boutique Client',
        companyName: 'Luxury Brand',
        email: 'client@luxury.com',
        companyTier: 'HAUTE_LUXURY',
        budgetRange: 'TIER_50K_100K', // Too low for Haute Luxury rule
        services: ['BRAND_DIRECTION'],
        message: 'Inquiring about potential branding work.',
      })
    ).rejects.toThrow(BusinessRuleViolationError);
  });
});
