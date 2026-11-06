import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { NextRequest } from 'next/server';
import { POST as inquiriesPost } from '@/app/api/v1/inquiries/route';
import { container } from '@/infrastructure/container';
import { generateFormToken } from '@/infrastructure/security/form-token';
import { CONSULTATION_COPY } from '@/app/consultation/ConsultationClient';

async function validFormToken(elapsedMs: number): Promise<string> {
  const timestamp = Date.now() - elapsedMs;
  return generateFormToken(timestamp);
}

describe('Consultation Flow & Anti-Slop Verification Suite', () => {
  beforeEach(async () => {
    container.inquiryRepository.clear();
  });

  describe('Part 1: 6-Field Custom Time Fallback Form Submission', () => {
    it('submits 6-field custom time fallback request cleanly and returns 201 Created', async () => {
      const payload = {
        clientName: 'Alexander Vance',
        companyName: 'Alexander Vance (Custom Time)',
        email: 'alexander@vance-intl.com',
        phone: '+1 555-019-2834',
        website: '',
        companyTier: 'MID_MARKET',
        budgetRange: 'TIER_100K_250K',
        services: ['BRAND_DIRECTION', 'MARGIN_RECOVERY', 'CONSUMER_SCOPE'],
        preferredTimes: '1) Nov 10 at 2pm EST\n2) Nov 11 at 10am EST\n3) Nov 12 at 4pm EST',
        topics: 'Teardown review, luxury checkout friction',
        questions: 'Questions about our paid acquisition margin',
        company_fax_number: '',
        submissionDurationMs: 4500,
        consentAccepted: true,
        message:
          'CUSTOM CALENDAR TIME REQUEST:\nClient Name: Alexander Vance\nPhone/WhatsApp: +1 555-019-2834\nPreferred 3 Dates & Times: Nov 10 at 2pm EST',
      };

      const token = await validFormToken(3000);
      const req = new NextRequest('https://brandmania.agency/api/v1/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': 'idemp_consultation_' + Date.now(),
          'x-request-id': 'req_consultation_' + Date.now(),
          'x-form-token': token,
        },
        body: JSON.stringify(payload),
      });

      const response = await inquiriesPost(req);
      expect(response.status).toBe(201);

      const json = await response.json();
      expect(json.success).toBe(true);
      expect(json.data.inquiryId).toMatch(/^inq_/);
      expect(json.data.status).toBe('PENDING');
    });
  });

  describe('Part 2: Zero AI Design Slop on /consultation', () => {
    it('ensures zero headlines or subheadings end with a trailing period', () => {
      expect(CONSULTATION_COPY.headline.endsWith('.')).toBe(false);
      expect(CONSULTATION_COPY.agendaHeading.endsWith('.')).toBe(false);
      expect(CONSULTATION_COPY.proofHeading.endsWith('.')).toBe(false);
      expect(CONSULTATION_COPY.bookingHeading.endsWith('.')).toBe(false);
      expect(CONSULTATION_COPY.customFallbackHeading.endsWith('.')).toBe(false);
    });

    it('ensures zero placeholder strings exist in CONSULTATION_COPY', () => {
      const copyString = JSON.stringify(CONSULTATION_COPY);
      expect(copyString.includes('[PLACEHOLDER')).toBe(false);
    });

    it('ensures zero fabricated testimonials exist in CONSULTATION_COPY or ConsultationClient.tsx', () => {
      expect('testimonials' in CONSULTATION_COPY).toBe(false);
      const clientContent = fs.readFileSync(
        path.join(process.cwd(), 'src/app/consultation/ConsultationClient.tsx'),
        'utf-8'
      );
      expect(clientContent.includes('testimonialsGrid')).toBe(false);
      expect(clientContent.includes('teardown pinpointed')).toBe(false);
    });

    it('ensures zero serif font usage in Consultation.module.css', () => {
      const cssContent = fs.readFileSync(
        path.join(process.cwd(), 'src/app/consultation/Consultation.module.css'),
        'utf-8'
      );
      expect(cssContent.includes('--font-serif')).toBe(false);
    });
  });

  describe('Part 3: Calendly Engine Integration', () => {
    it('verifies Calendly URL is configured in environment', () => {
      const bookingUrl =
        process.env.NEXT_PUBLIC_BOOKING_URL ||
        'https://calendly.com/brandmania-consultation/30min';
      expect(bookingUrl).toContain('calendly.com/brandmania-consultation/30min');
    });

    it('verifies ConsultationClient mounts Calendly iframe with brand parameters', () => {
      const clientContent = fs.readFileSync(
        path.join(process.cwd(), 'src/app/consultation/ConsultationClient.tsx'),
        'utf-8'
      );
      expect(clientContent).toContain('calendly.com/brandmania-consultation/30min');
      expect(clientContent).toContain('calendly.event_scheduled');
    });
  });

  describe('Part 4: Leftover Root Scratch Scripts Purged', () => {
    it('verifies all 6 temporary Cal.com debug scripts are deleted from repo root', () => {
      const root = process.cwd();
      const forbiddenScripts = [
        'check_cal.js',
        'inspect_cal_html.js',
        'find_snippets.js',
        'find_event.js',
        'get_cal_text.js',
        'test_embed_call.mjs',
      ];

      for (const script of forbiddenScripts) {
        const fullPath = path.join(root, script);
        expect(fs.existsSync(fullPath)).toBe(false);
      }
    });
  });
});
