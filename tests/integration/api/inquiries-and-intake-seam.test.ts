import { describe, it, expect, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST as inquiriesPost } from '@/app/api/v1/inquiries/route';
import { container } from '@/infrastructure/container';
import { WebsiteUrl } from '@/domain/value-objects/website-url.vo';
import { PhoneNumber } from '@/domain/value-objects/phone-number.vo';
import { SupabaseInquiryRepository } from '@/infrastructure/persistence/supabase-inquiry.repository';
import { InMemoryInquiryRepository } from '@/infrastructure/persistence/in-memory-inquiry.repository';
import { Inquiry } from '@/domain/entities/inquiry.entity';
import { Email } from '@/domain/value-objects/email.vo';
import { CompanyTier } from '@/domain/value-objects/company-tier.vo';
import { BudgetRange } from '@/domain/value-objects/budget-range.vo';
import { ServiceCategory } from '@/domain/value-objects/service-category.vo';

describe('Inquiry Intake Public Seam & Adapter Verification', () => {
  beforeEach(async () => {
    container.inquiryRepository.clear();
  });

  describe('Public Seam: POST /api/v1/inquiries', () => {
    it('executes full intake pipeline, returning 201 Created and persisting aggregate', async () => {
      const validPayload = {
        clientName: 'Julian Sterling',
        companyName: 'Sterling Private Wealth',
        email: 'julian@sterling.com',
        companyTier: 'GLOBAL_ENTERPRISE',
        budgetRange: 'TIER_250K_500K',
        services: ['BRAND_DIRECTION', 'MARGIN_RECOVERY'],
        message: 'Comprehensive margin recovery and perception diagnostic.',
        submissionDurationMs: 6500,
        consentAccepted: true,
      };

      const req = new NextRequest('https://brandmania.agency/api/v1/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': 'idemp_test_seam_1',
          'x-request-id': 'req_test_seam_1',
        },
        body: JSON.stringify(validPayload),
      });

      const response = await inquiriesPost(req);
      expect(response.status).toBe(201);
      expect(response.headers.get('X-RateLimit-Limit')).toBeDefined();

      const json = await response.json();
      expect(json.success).toBe(true);
      expect(json.data.inquiryId).toMatch(/^inq_/);
      expect(json.data.status).toBe('PENDING');

      // Verify observable state transition in repository at the seam
      const saved = await container.inquiryRepository.findById(json.data.inquiryId);
      expect(saved).not.toBeNull();
      expect(saved?.clientName).toBe('Julian Sterling');
    });

    it('enforces atomic idempotency: replay returns cached response without duplicating records', async () => {
      const idempotencyKey = 'idemp_test_replay_2';
      const validPayload = {
        clientName: 'Alexander Vance',
        companyName: 'Vance International',
        email: 'alexander@vance-intl.com',
        companyTier: 'MID_MARKET',
        budgetRange: 'TIER_100K_250K',
        services: ['MARGIN_RECOVERY'],
        message: 'Requesting commercial audit.',
        submissionDurationMs: 5000,
        consentAccepted: true,
      };

      // First call
      const req1 = new NextRequest('https://brandmania.agency/api/v1/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey,
          'x-request-id': 'req_first_call',
        },
        body: JSON.stringify(validPayload),
      });
      const res1 = await inquiriesPost(req1);
      expect(res1.status).toBe(201);
      const json1 = await res1.json();

      // Second call with same idempotency key
      const req2 = new NextRequest('https://brandmania.agency/api/v1/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey,
          'x-request-id': 'req_second_call',
        },
        body: JSON.stringify(validPayload),
      });
      const res2 = await inquiriesPost(req2);
      expect(res2.status).toBe(201);
      expect(res2.headers.get('X-Idempotent-Replay')).toBe('true');

      const json2 = await res2.json();
      expect(json2.data.inquiryId).toBe(json1.data.inquiryId);

      // Verify repository only has 1 record for this email
      const records = await container.inquiryRepository.findByEmail(new Email('alexander@vance-intl.com'));
      expect(records.length).toBe(1);
    });

    it('rejects honeypot automated bot submission with 400 SPAM_REJECTED', async () => {
      const botPayload = {
        clientName: 'Bot User',
        companyName: 'Spam Corp',
        email: 'bot@spam.com',
        companyTier: 'MID_MARKET',
        budgetRange: 'TIER_100K_250K',
        services: ['MARGIN_RECOVERY'],
        message: 'Spam text message.',
        company_fax_number: '1-800-SPAM-BOT', // Trap field filled
        submissionDurationMs: 8000,
        consentAccepted: true,
      };

      const req = new NextRequest('https://brandmania.agency/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(botPayload),
      });

      const response = await inquiriesPost(req);
      expect(response.status).toBe(400);
      const json = await response.json();
      expect(json.success).toBe(false);
      expect(json.error.code).toBe('SPAM_REJECTED');

      // Verify zero records persisted
      const count = await container.inquiryRepository.count();
      expect(count).toBe(0);
    });

    it('rejects rapid automated bot submission (< 2500ms) with 400 TIME_LOCK_VIOLATION', async () => {
      const fastPayload = {
        clientName: 'Fast Bot',
        companyName: 'Speed Corp',
        email: 'speed@bot.com',
        companyTier: 'MID_MARKET',
        budgetRange: 'TIER_100K_250K',
        services: ['MARGIN_RECOVERY'],
        message: 'Rapid automated submission.',
        submissionDurationMs: 800, // Completed in 800ms
        consentAccepted: true,
      };

      const req = new NextRequest('https://brandmania.agency/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fastPayload),
      });

      const response = await inquiriesPost(req);
      expect(response.status).toBe(400);
      const json = await response.json();
      expect(json.success).toBe(false);
      expect(json.error.code).toBe('TIME_LOCK_VIOLATION');
    });
  });

  describe('Domain Value Objects: Eliminating Primitive Obsession', () => {
    it('WebsiteUrl validates and normalizes public URLs while blocking unsafe SSRF vectors', () => {
      const url = new WebsiteUrl('brandmania.agency');
      expect(url.value).toBe('https://brandmania.agency');

      const urlWithWww = new WebsiteUrl('www.brandmania.agency');
      expect(urlWithWww.value).toBe('https://brandmania.agency');

      // SSRF vectors rejected
      expect(() => new WebsiteUrl('http://169.254.169.254/latest/meta-data/')).toThrow();
      expect(() => new WebsiteUrl('http://localhost:3000')).toThrow();
      expect(() => new WebsiteUrl('http://10.0.0.1')).toThrow();
    });

    it('PhoneNumber normalizes international numbers into canonical E.164-compatible format', () => {
      const phone = new PhoneNumber('+1 (555) 019-2834');
      expect(phone.value).toBe('+15550192834');

      const ukPhone = new PhoneNumber('+44 20 7946 0991');
      expect(ukPhone.value).toBe('+442079460991');

      // Invalid lengths rejected
      expect(() => new PhoneNumber('123')).toThrow();
      expect(() => new PhoneNumber('')).toThrow();
    });
  });

  describe('Seam Deletion Test: Two Real Adapters for IInquiryRepository', () => {
    it('both InMemoryInquiryRepository and SupabaseInquiryRepository satisfy IInquiryRepository contract', async () => {
      const inMemoryRepo = new InMemoryInquiryRepository();
      const supabaseRepo = new SupabaseInquiryRepository();

      const testInquiry = Inquiry.create({
        id: 'inq_dual_adapter_1',
        clientName: 'Dual Test Client',
        companyName: 'Dual Corp',
        email: new Email('dual@test.com'),
        companyTier: new CompanyTier('EMERGING_ENTERPRISE'),
        budgetRange: new BudgetRange('TIER_50K_100K'),
        services: [new ServiceCategory('MARGIN_RECOVERY')],
        message: 'Testing dual repository adapters.',
      });

      // Verify InMemory adapter
      await inMemoryRepo.save(testInquiry);
      const foundInMem = await inMemoryRepo.findById('inq_dual_adapter_1');
      expect(foundInMem?.id).toBe('inq_dual_adapter_1');
      expect(await inMemoryRepo.count()).toBe(1);
      await inMemoryRepo.delete('inq_dual_adapter_1');
      expect(await inMemoryRepo.count()).toBe(0);

      // Verify Supabase adapter
      await supabaseRepo.save(testInquiry);
      const foundSupa = await supabaseRepo.findById('inq_dual_adapter_1');
      expect(foundSupa?.id).toBe('inq_dual_adapter_1');
      expect(await supabaseRepo.count()).toBe(1);
      await supabaseRepo.delete('inq_dual_adapter_1');
      expect(await supabaseRepo.count()).toBe(0);
    });
  });
});
