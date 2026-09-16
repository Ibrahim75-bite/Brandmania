import { describe, it, expect } from 'vitest';
import { Inquiry } from '@/domain/entities/inquiry.entity';
import { Email } from '@/domain/value-objects/email.vo';
import { CompanyTier } from '@/domain/value-objects/company-tier.vo';
import { BudgetRange } from '@/domain/value-objects/budget-range.vo';
import { ServiceCategory } from '@/domain/value-objects/service-category.vo';
import { DomainValidationError } from '@/domain/errors/domain.error';

describe('Inquiry Aggregate Entity', () => {
  const createValidInquiry = () => {
    return Inquiry.create({
      id: 'inq_test_123',
      clientName: 'Alexander Vance',
      companyName: 'Vance & Co.',
      email: new Email('alexander@vance.com'),
      companyTier: new CompanyTier('HAUTE_LUXURY'),
      budgetRange: new BudgetRange('TIER_100K_250K'),
      services: [new ServiceCategory('BRAND_DIRECTION')],
      message: 'Comprehensive brand direction and market repositioning.',
    });
  };

  it('should successfully instantiate a valid Inquiry entity', () => {
    const inquiry = createValidInquiry();
    expect(inquiry.id).toBe('inq_test_123');
    expect(inquiry.status).toBe('PENDING');
    expect(inquiry.clientName).toBe('Alexander Vance');
    expect(inquiry.services).toHaveLength(1);
  });

  it('should reject inquiry with empty client name', () => {
    expect(() =>
      Inquiry.create({
        id: 'inq_test_123',
        clientName: '',
        companyName: 'Vance & Co.',
        email: new Email('alexander@vance.com'),
        companyTier: new CompanyTier('HAUTE_LUXURY'),
        budgetRange: new BudgetRange('TIER_100K_250K'),
        services: [new ServiceCategory('BRAND_DIRECTION')],
        message: 'Valid message content.',
      })
    ).toThrow(DomainValidationError);
  });

  it('should allow valid status transitions', () => {
    const inquiry = createValidInquiry();
    expect(inquiry.status).toBe('PENDING');

    inquiry.qualify();
    expect(inquiry.status).toBe('QUALIFIED');

    inquiry.markContacted();
    expect(inquiry.status).toBe('CONTACTED');

    inquiry.reject();
    expect(inquiry.status).toBe('REJECTED');
  });

  it('should throw error when qualifying an already rejected inquiry', () => {
    const inquiry = createValidInquiry();
    inquiry.reject();
    expect(() => inquiry.qualify()).toThrow(DomainValidationError);
  });
});
