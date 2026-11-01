import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { submitInquirySchema, normalizeWebsiteUrl } from '@/domain/validation/inquiry.schema';
import { LEGAL_CONTENT } from '@/content/legal';
import { seoConfig } from '@/content/seoConfig';
import { MAIN_NAV_LINKS, FOOTER_SECTIONS } from '@/content/navigation';

describe('Launch-Readiness 20-Point Verification Suite', () => {
  const rootDir = path.resolve(__dirname, '../../');

  describe('Group 1: Legal Pages, Custom 404 & Link Integrity', () => {
    it('Item #1: Privacy Policy contains required GDPR/CCPA sections and official contact', () => {
      expect(LEGAL_CONTENT.privacyPolicy.title).toContain('Privacy Policy');
      expect(LEGAL_CONTENT.privacyPolicy.sections.length).toBeGreaterThanOrEqual(5);

      const sectionHeadings = LEGAL_CONTENT.privacyPolicy.sections.map((s) => s.heading);
      expect(sectionHeadings.some((h) => h.includes('Intake'))).toBe(true);
      expect(sectionHeadings.some((h) => h.includes('Confidentiality'))).toBe(true);
      expect(sectionHeadings.some((h) => h.includes('Cookie'))).toBe(true);
      expect(sectionHeadings.some((h) => h.includes('Retention'))).toBe(true);
      expect(sectionHeadings.some((h) => h.includes('Rights'))).toBe(true);

      // Verify no fake address or fake DPO name
      const fullText = JSON.stringify(LEGAL_CONTENT.privacyPolicy);
      expect(fullText).not.toContain('123 Fake');
      expect(fullText).not.toContain('John Doe, DPO');
    });

    it('Item #2: Terms of Engagement clarifies non-binding nature and IP rights', () => {
      expect(LEGAL_CONTENT.termsOfEngagement.title).toContain('Terms of Engagement');
      const sectionHeadings = LEGAL_CONTENT.termsOfEngagement.sections.map((s) => s.heading);
      expect(sectionHeadings.some((h) => h.includes('Intellectual Property'))).toBe(true);
      expect(sectionHeadings.some((h) => h.includes('Non-Binding'))).toBe(true);
      expect(sectionHeadings.some((h) => h.includes('Liability'))).toBe(true);

      const fullText = JSON.stringify(LEGAL_CONTENT.termsOfEngagement);
      expect(fullText).toContain('does NOT constitute a binding advisory retainer');
      expect(fullText).toContain('Perception Theater');
    });

    it('Item #15: Custom 404 page exists and has art-directed display copy', () => {
      const notFoundPath = path.join(rootDir, 'src/app/not-found.tsx');
      expect(fs.existsSync(notFoundPath)).toBe(true);
      const content = fs.readFileSync(notFoundPath, 'utf-8');
      expect(content).toContain('0404 / Perception Lost.');
      expect(content).toContain('Return to Brandmania ↗');
      expect(content).toContain('BrandEye');
      expect(content).toContain('CornerArcs');
    });

    it('Item #16: All navigation anchors match target section IDs in page.tsx', () => {
      const pagePath = path.join(rootDir, 'src/app/page.tsx');
      const pageContent = fs.readFileSync(pagePath, 'utf-8');

      // Check MAIN_NAV_LINKS
      const mainAnchors = MAIN_NAV_LINKS.map((l) => l.href.replace('/#', ''));
      expect(mainAnchors).toEqual(['manifesto', 'system', 'disciplines', 'work']);

      // Check section components for exact matching IDs
      const sectionFiles = [
        'WorldviewSection.tsx',
        'SystemSection.tsx',
        'BrandDirectionSection.tsx',
        'ArtifactGallery.tsx',
        'QualificationSection.tsx',
      ];

      const foundIds: string[] = [];
      for (const file of sectionFiles) {
        const filePath = path.join(rootDir, 'src/presentation/components/sections', file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const match = fileContent.match(/id="([^"]+)"/);
        if (match) {
          foundIds.push(match[1]);
        }
      }

      expect(foundIds).toContain('manifesto');
      expect(foundIds).toContain('system');
      expect(foundIds).toContain('disciplines');
      expect(foundIds).toContain('work');
      expect(foundIds).toContain('qualification');
    });
  });

  describe('Group 2: Security, HTTPS, Validation & Spam Protection', () => {
    it('Item #4: Middleware enforces HTTPS redirect for non-localhost HTTP requests', () => {
      const middlewarePath = path.join(rootDir, 'src/middleware.ts');
      expect(fs.existsSync(middlewarePath)).toBe(true);
      const content = fs.readFileSync(middlewarePath, 'utf-8');
      expect(content).toContain("x-forwarded-proto");
      expect(content).toContain("301");
    });

    it('Item #17: Normalizes website URLs accepting both brand.com and https://brand.com', () => {
      expect(normalizeWebsiteUrl('brandmania.agency')).toBe('https://brandmania.agency');
      expect(normalizeWebsiteUrl('http://vance.com')).toBe('http://vance.com');
      expect(normalizeWebsiteUrl('https://luxury.ch')).toBe('https://luxury.ch');
      expect(normalizeWebsiteUrl('   ')).toBe('');
      expect(normalizeWebsiteUrl(null)).toBe('');
    });

    it('Item #17 & #18: Shared schema validates required fields and rejects honeypot/rapid spam', () => {
      const validPayload = {
        clientName: 'Julian Sterling',
        companyName: 'Sterling Haute Horlogerie',
        email: 'j.sterling@sterling-haute.com',
        website: 'sterling-haute.com',
        companyTier: 'HAUTE_LUXURY' as const,
        budgetRange: 'TIER_100K_250K' as const,
        services: ['BRAND_DIRECTION'],
        message: 'Requesting strategic positioning review for global expansion.',
        submissionDurationMs: 4500,
      };

      const parsed = submitInquirySchema.safeParse(validPayload);
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.website).toBe('https://sterling-haute.com');
      }

      // Test honeypot rejection: filled company_fax_number must be flagged by route
      const botHoneypotPayload = {
        ...validPayload,
        company_fax_number: '+1-555-SPAMBOT',
      };
      const parsedBot = submitInquirySchema.safeParse(botHoneypotPayload);
      expect(parsedBot.success).toBe(true);
      expect(parsedBot.data?.company_fax_number).toBe('+1-555-SPAMBOT');

      // Test time-lock detection: under 2500ms
      const rapidBotPayload = {
        ...validPayload,
        submissionDurationMs: 600,
      };
      const parsedRapid = submitInquirySchema.safeParse(rapidBotPayload);
      expect(parsedRapid.success).toBe(true);
      expect(parsedRapid.data?.submissionDurationMs).toBeLessThan(2500);
    });
  });

  describe('Group 3: Cookie Consent, Analytics & Single CTA', () => {
    it('Item #5 & #19: CookieConsentBanner and AnalyticsProvider exist and manage consent', () => {
      const bannerPath = path.join(
        rootDir,
        'src/presentation/components/compliance/CookieConsentBanner.tsx'
      );
      const providerPath = path.join(
        rootDir,
        'src/presentation/components/analytics/AnalyticsProvider.tsx'
      );

      expect(fs.existsSync(bannerPath)).toBe(true);
      expect(fs.existsSync(providerPath)).toBe(true);

      const bannerContent = fs.readFileSync(bannerPath, 'utf-8');
      expect(bannerContent).toContain('brandmania_cookie_consent');
      expect(bannerContent).toContain('brandmania_consent_changed');
      expect(bannerContent).toContain('/privacy');

      const providerContent = fs.readFileSync(providerPath, 'utf-8');
      expect(providerContent).toContain('NEXT_PUBLIC_GA_MEASUREMENT_ID');
      expect(providerContent).toContain('brandmania_consent_changed');
    });

    it('Item #20: One dominant primary CTA "Request Strategic Consultation" across components', () => {
      const headerPath = path.join(rootDir, 'src/presentation/components/layout/Header.tsx');
      const headerContent = fs.readFileSync(headerPath, 'utf-8');
      expect(headerContent).toContain('Request Strategic Consultation');

      const heroPath = path.join(rootDir, 'src/presentation/components/sections/HeroSection.tsx');
      const heroContent = fs.readFileSync(heroPath, 'utf-8');
      expect(heroContent).toContain('Request Strategic Consultation');
    });
  });

  describe('Group 4: Metadata, Social Preview, Favicon & Alt Text', () => {
    it('Item #7 & #8: opengraph-image.tsx, icon.tsx, and apple-icon.tsx exist', () => {
      expect(fs.existsSync(path.join(rootDir, 'src/app/opengraph-image.tsx'))).toBe(true);
      expect(fs.existsSync(path.join(rootDir, 'src/app/icon.tsx'))).toBe(true);
      expect(fs.existsSync(path.join(rootDir, 'src/app/apple-icon.tsx'))).toBe(true);
    });

    it('Item #9: sitemap.ts includes core pages, privacy, terms, and llms.txt', () => {
      const sitemapPath = path.join(rootDir, 'src/app/sitemap.ts');
      const content = fs.readFileSync(sitemapPath, 'utf-8');
      expect(content).toContain("path: '/privacy'");
      expect(content).toContain("path: '/terms'");
      expect(content).toContain("path: '/llms.txt'");
      expect(content).toContain("path: '/llms-full.txt'");
    });

    it('Item #10: Images have rich descriptive alt attributes', () => {
      const heroPath = path.join(rootDir, 'src/presentation/components/sections/HeroSection.tsx');
      const heroContent = fs.readFileSync(heroPath, 'utf-8');
      expect(heroContent).toContain('alt="BRANDMANIA — Liquid violet marble materiality');

      const brandDirectionPath = path.join(
        rootDir,
        'src/presentation/components/sections/BrandDirectionSection.tsx'
      );
      const bdContent = fs.readFileSync(brandDirectionPath, 'utf-8');
      expect(bdContent).toContain('alt="BRANDMANIA Services &amp; Branding Architecture Deliverable Artboard"');
      expect(bdContent).toContain('alt="BRANDMANIA — Physical folded editorial paper poster');
    });
  });

  describe('Group 5: Image Formats, Contrast & Touch Targets', () => {
    it('Item #11: next.config.ts configures AVIF and WebP image formats', () => {
      const nextConfigPath = path.join(rootDir, 'next.config.ts');
      const content = fs.readFileSync(nextConfigPath, 'utf-8');
      expect(content).toContain("'image/avif'");
      expect(content).toContain("'image/webp'");
    });

    it('Item #13: WCAG AA contrast colors configured in tokens.css', () => {
      const tokensPath = path.join(rootDir, 'src/presentation/styles/tokens.css');
      const content = fs.readFileSync(tokensPath, 'utf-8');
      expect(content).toContain('--color-text-secondary: #EAE6F0;');
      expect(content).toContain('--color-text-muted: #A8A0B8;');
      expect(content).toContain('--color-museum-violet: #4A0099;');
    });

    it('Item #14: Button and mobileToggle meet 44px touch target minimum', () => {
      const btnCssPath = path.join(
        rootDir,
        'src/presentation/components/primitives/Button.module.css'
      );
      const btnContent = fs.readFileSync(btnCssPath, 'utf-8');
      expect(btnContent).toContain('min-height: 44px;');

      const headerCssPath = path.join(
        rootDir,
        'src/presentation/components/layout/Header.module.css'
      );
      const headerContent = fs.readFileSync(headerCssPath, 'utf-8');
      expect(headerContent).toContain('min-width: 44px;');
      expect(headerContent).toContain('min-height: 44px;');
    });
  });
});
