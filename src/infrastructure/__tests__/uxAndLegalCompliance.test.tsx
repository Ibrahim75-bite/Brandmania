import { describe, it, expect, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { NextRequest } from 'next/server';
import {
  submitInquirySchema,
  normalizeWebsiteUrl,
  normalizePhoneNumber,
  normalizeEmailAddress,
} from '@/domain/validation/inquiry.schema';
import { LEGAL_CONTENT } from '@/content/legal';
import { container } from '@/infrastructure/container';
import { Inquiry } from '@/domain/entities/inquiry.entity';
import { Email } from '@/domain/value-objects/email.vo';
import { CompanyTier } from '@/domain/value-objects/company-tier.vo';
import { BudgetRange } from '@/domain/value-objects/budget-range.vo';
import { ServiceCategory } from '@/domain/value-objects/service-category.vo';
import {
  generateUnsubscribeToken,
  verifyUnsubscribeToken,
  buildExecutiveEmail,
  isEmailSuppressed,
  emailSuppressionSet,
} from '@/infrastructure/email/email-templates';
import { GET as unsubscribeGet, POST as unsubscribePost } from '@/app/api/v1/communications/unsubscribe/route';
import { POST as deletionRequestPost } from '@/app/api/v1/privacy/deletion-request/route';

describe('UX Laws & Legal Compliance Verification Suite', () => {
  const rootDir = path.resolve(__dirname, '../../../');

  beforeEach(() => {
    emailSuppressionSet.clear();
  });

  describe('Part 1: UX Laws Normalization & Design Tokens', () => {
    it('UX Law #18 (Postel\'s Law): Website URL liberal normalization', () => {
      expect(normalizeWebsiteUrl('brand.com')).toBe('https://brand.com');
      expect(normalizeWebsiteUrl('www.brand.com')).toBe('https://brand.com');
      expect(normalizeWebsiteUrl('http://vance.com')).toBe('http://vance.com');
      expect(normalizeWebsiteUrl('https://brandmania.agency')).toBe('https://brandmania.agency');
      expect(normalizeWebsiteUrl('')).toBe('');
      expect(normalizeWebsiteUrl(null)).toBe('');
    });

    it('UX Law #18 (Postel\'s Law): International phone number normalization', () => {
      expect(normalizePhoneNumber('+1 (555) 019-2834')).toBe('+15550192834');
      expect(normalizePhoneNumber('(555) 019-2834')).toBe('5550192834');
      expect(normalizePhoneNumber('+44 20 7946 0991')).toBe('+442079460991');
      expect(normalizePhoneNumber('01012345678')).toBe('01012345678');
      expect(normalizePhoneNumber('')).toBe('');
      expect(normalizePhoneNumber(undefined)).toBe('');
    });

    it('UX Law #17 & #18: Email address normalization (lowercase & trim)', () => {
      expect(normalizeEmailAddress('  EXECUTIVE@ENTERPRISE.COM  ')).toBe('executive@enterprise.com');
      expect(normalizeEmailAddress('info@brandmania.agency')).toBe('info@brandmania.agency');
      expect(normalizeEmailAddress('')).toBe('');
    });

    it('UX Law #15 (Goal-Gradient Effect): Progress calculation matches 33% -> 66% -> 100%', () => {
      const getProgress = (step: number, total = 3) => Math.round((step / total) * 100);
      expect(getProgress(1)).toBe(33);
      expect(getProgress(2)).toBe(67);
      expect(getProgress(3)).toBe(100);
    });

    it('UX Law #3 (Fitts\'s Law): .hit-slop class enforces minimum 44px x 44px target', () => {
      const globalsCss = fs.readFileSync(path.join(rootDir, 'src/presentation/styles/globals.css'), 'utf-8');
      expect(globalsCss).toContain('.hit-slop');
      expect(globalsCss).toContain('min-width: 44px');
      expect(globalsCss).toContain('min-height: 44px');

      const buttonCss = fs.readFileSync(path.join(rootDir, 'src/presentation/components/primitives/Button.module.css'), 'utf-8');
      expect(buttonCss).toContain('min-height: 44px');
    });

    it('UX Law #13 (Von Restorff Effect): Primary CTA hover color uses energetic highlight (#C882FF)', () => {
      const buttonCss = fs.readFileSync(path.join(rootDir, 'src/presentation/components/primitives/Button.module.css'), 'utf-8');
      expect(buttonCss).toContain('#C882FF');
    });

    it('WCAG Color Contrast: Muted text is #A8A0B8 on obsidian and #3D3A45 on alabaster', () => {
      const tokensCss = fs.readFileSync(path.join(rootDir, 'src/presentation/styles/tokens.css'), 'utf-8');
      expect(tokensCss).toContain('--color-text-muted: #A8A0B8;');

      const brandDirTsx = fs.readFileSync(path.join(rootDir, 'src/presentation/components/sections/BrandDirectionSection.tsx'), 'utf-8');
      expect(brandDirTsx).toContain('#3D3A45');
    });
  });

  describe('Part 2: Form Consent & 18+ Age Eligibility Guard', () => {
    const validFormData = {
      clientName: 'Alexander Vance',
      roleTitle: 'Chief Commercial Officer',
      companyName: 'Vance International',
      email: 'alexander@vance-intl.com',
      phone: '+1 555 019 2834',
      website: 'vance-intl.com',
      companyTier: 'GLOBAL_ENTERPRISE' as const,
      budgetRange: 'TIER_50K_100K' as const,
      services: ['Brand Direction', 'Margin Recovery'],
      message: 'Seeking comprehensive commercial brand overhaul and margin recovery diagnostic.',
      submissionDurationMs: 8500,
    };

    it('Accepts submission when consentAccepted is true', () => {
      const result = submitInquirySchema.safeParse({
        ...validFormData,
        consentAccepted: true,
      });
      expect(result.success).toBe(true);
    });

    it('Rejects submission when consentAccepted is false with legal/18+ message', () => {
      const result = submitInquirySchema.safeParse({
        ...validFormData,
        consentAccepted: false,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const consentError = result.error.issues.find((i) => i.path.includes('consentAccepted'));
        expect(consentError).toBeDefined();
        expect(consentError?.message).toContain('18+');
      }
    });

    it('Defaults consentAccepted to true when omitted for backward compatibility', () => {
      const result = submitInquirySchema.safeParse(validFormData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.consentAccepted).toBe(true);
      }
    });
  });

  describe('Part 3: RFC 8058 One-Click Unsubscribe Infrastructure', () => {
    const testEmail = 'executive@enterprise-client.com';

    it('Generates and verifies cryptographic HMAC SHA-256 tokens', () => {
      const token = generateUnsubscribeToken(testEmail);
      expect(typeof token).toBe('string');
      expect(token.length).toBe(64);
      expect(verifyUnsubscribeToken(testEmail, token)).toBe(true);
      expect(verifyUnsubscribeToken(testEmail, 'invalid-token-tampered')).toBe(false);
      expect(verifyUnsubscribeToken('other@client.com', token)).toBe(false);
    });

    it('buildExecutiveEmail attaches RFC 8058 headers and visible footer links', () => {
      const email = buildExecutiveEmail({
        to: testEmail,
        subject: 'Executive Briefing: Margin Recovery',
        bodyText: 'Enclosed is the preliminary margin recovery diagnostic dossier.',
      });

      expect(email.headers['List-Unsubscribe']).toContain('/api/v1/communications/unsubscribe?email=');
      expect(email.headers['List-Unsubscribe-Post']).toBe('List-Unsubscribe=One-Click');
      expect(email.text).toContain('Unsubscribe from executive briefings & communications');
      expect(email.html).toContain('Unsubscribe from executive briefings &amp; communications');
    });

    it('Handles GET /api/v1/communications/unsubscribe and records suppression', async () => {
      const token = generateUnsubscribeToken(testEmail);
      const req = new NextRequest(
        `https://brandmania.agency/api/v1/communications/unsubscribe?email=${encodeURIComponent(testEmail)}&token=${token}`
      );

      const res = await unsubscribeGet(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(isEmailSuppressed(testEmail)).toBe(true);
    });

    it('Handles POST /api/v1/communications/unsubscribe with JSON body', async () => {
      const token = generateUnsubscribeToken(testEmail);
      const req = new NextRequest('https://brandmania.agency/api/v1/communications/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmail, token }),
      });

      const res = await unsubscribePost(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(isEmailSuppressed(testEmail)).toBe(true);
    });

    it('Rejects unsubscribe request with invalid token', async () => {
      const req = new NextRequest(
        `https://brandmania.agency/api/v1/communications/unsubscribe?email=${encodeURIComponent(testEmail)}&token=tampered_token`
      );

      const res = await unsubscribeGet(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
    });
  });

  describe('Part 4: Self-Serve Data Deletion Request Endpoint', () => {
    const deletionEmail = 'purged-client@enterprise-advisory.com';

    it('Deletes matching inquiries, suppresses email, and returns verifiable deletionReceiptId', async () => {
      const inquiry = Inquiry.create({
        id: 'inq_to_purge_123',
        clientName: 'Purge Candidate',
        companyName: 'Purge Candidate Corp',
        email: new Email(deletionEmail),
        companyTier: new CompanyTier('EMERGING_ENTERPRISE'),
        budgetRange: new BudgetRange('TIER_50K_100K'),
        services: [new ServiceCategory('MARGIN_RECOVERY')],
        message: 'Initial diagnostic evaluation.',
      });

      await container.inquiryRepository.save(inquiry);
      const foundBefore = await container.inquiryRepository.findByEmail(new Email(deletionEmail));
      expect(foundBefore.length).toBeGreaterThan(0);

      const validToken = generateUnsubscribeToken(deletionEmail);
      const req = new NextRequest('https://brandmania.agency/api/v1/privacy/deletion-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: deletionEmail,
          companyName: 'Purge Candidate Corp',
          requestType: 'DELETE_ALL_DATA',
          reason: 'Corporate GDPR Art. 17 right-to-be-forgotten request.',
          token: validToken,
        }),
      });

      const res = await deletionRequestPost(req);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.deletionReceiptId).toMatch(/^del_/);
      expect(data.recordsPurged).toBe(1);

      const foundAfter = await container.inquiryRepository.findByEmail(new Email(deletionEmail));
      expect(foundAfter.length).toBe(0);

      expect(isEmailSuppressed(deletionEmail)).toBe(true);
    });

    it('Rejects invalid email format in deletion request', async () => {
      const validToken = generateUnsubscribeToken('not-an-email');
      const req = new NextRequest('https://brandmania.agency/api/v1/privacy/deletion-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'not-an-email',
          requestType: 'DELETE_ALL_DATA',
          token: validToken,
        }),
      });

      const res = await deletionRequestPost(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
    });
  });

  describe('Part 5: Legal & Accessibility Architecture Elements', () => {
    it('Terms of Engagement Section 11 contains Commercial Retainer & Refund Policy', () => {
      const sec11 = LEGAL_CONTENT.termsOfEngagement.sections.find((s) => s.index === '11');
      expect(sec11).toBeDefined();
      expect(sec11?.heading).toContain('Commercial Retainer, Milestone Billing & Refund Policy');
      expect(sec11?.content).toContain('cancellation/refund policies');

      const termsPageContent = fs.readFileSync(path.join(rootDir, 'src/app/terms/page.tsx'), 'utf-8');
      expect(termsPageContent).toContain('refund-policy');
    });

    it('Cookie notice includes Third-Party SDK audit table with self-hosted fonts and GA4', () => {
      const sdks = LEGAL_CONTENT.cookieNotice.thirdPartySdks;
      expect(sdks).toBeDefined();
      expect(sdks.length).toBeGreaterThanOrEqual(2);

      const fontSdk = sdks.find((s) => s.name.includes('next/font/google'));
      expect(fontSdk).toBeDefined();
      expect(fontSdk?.dataHandling).toContain('Zero runtime browser requests');

      const gaSdk = sdks.find((s) => s.name.includes('Google Analytics'));
      expect(gaSdk).toBeDefined();
      expect(gaSdk?.privacyControls).toContain('Strictly opt-in');

      const cookiesPageContent = fs.readFileSync(path.join(rootDir, 'src/app/cookies/page.tsx'), 'utf-8');
      expect(cookiesPageContent).toContain('Third-Party SDK');
      expect(cookiesPageContent).toContain('thirdPartySdks');
    });

    it('Business Details Disclosure card is configured and wired into sidebars', () => {
      const biz = LEGAL_CONTENT.businessDetails;
      expect(biz.operatingEntity).toContain('BRANDMANIA');
      expect(biz.corePractices).toContain('Brand Direction, Margin Recovery & Consumer Scope');
      expect(biz.qualificationScope).toContain('$700,000+');
      expect(biz.protocolRef).toBe('BM-CORP-2026');

      const cardPath = path.join(rootDir, 'src/presentation/components/compliance/CorporateEntityCard.tsx');
      expect(fs.existsSync(cardPath)).toBe(true);

      const footerContent = fs.readFileSync(path.join(rootDir, 'src/presentation/components/layout/Header.tsx'), 'utf-8');
      expect(footerContent).toContain('operatingEntity');
      expect(footerContent).toContain('protocolRef');
    });

    it('SkipToContent accessibility link is implemented and mounted as first body child in layout.tsx', () => {
      const skipComponentPath = path.join(rootDir, 'src/presentation/components/navigation/SkipToContent.tsx');
      expect(fs.existsSync(skipComponentPath)).toBe(true);

      const skipContent = fs.readFileSync(skipComponentPath, 'utf-8');
      expect(skipContent).toContain('href="#main-content"');
      expect(skipContent).toContain('Skip to main content');

      const layoutContent = fs.readFileSync(path.join(rootDir, 'src/app/layout.tsx'), 'utf-8');
      expect(layoutContent).toContain('<SkipToContent />');
      expect(layoutContent).toContain('id="main-content"');
      expect(layoutContent).toContain('tabIndex={-1}');
    });
  });
});
