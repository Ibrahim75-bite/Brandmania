import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { FAQS, FAQ_CATEGORIES } from '@/content/faqs';
import { MAIN_NAV_LINKS, FOOTER_SECTIONS } from '@/content/navigation';

const rootDir = process.cwd();

describe('FAQ Page, Visible Checkbox & Clean Footer Suite', () => {
  describe('Part 1: Dedicated Luxury /faq Page & JSON-LD', () => {
    it('contains at least 16 authoritative executive FAQs across 5 categories', () => {
      expect(FAQS.length).toBeGreaterThanOrEqual(16);
      expect(FAQ_CATEGORIES.length).toBe(6);

      const categoriesInFaqs = new Set(FAQS.map((f) => f.category));
      expect(categoriesInFaqs.has('qualification')).toBe(true);
      expect(categoriesInFaqs.has('brand-direction')).toBe(true);
      expect(categoriesInFaqs.has('margin-recovery')).toBe(true);
      expect(categoriesInFaqs.has('consumer-scope')).toBe(true);
      expect(categoriesInFaqs.has('governance')).toBe(true);

      for (const faq of FAQS) {
        expect(faq.question).toBeTruthy();
        expect(faq.shortAnswer).toBeTruthy();
        expect(faq.detailedAnswer).toBeTruthy();
      }
    });

    it('implements valid FAQPage and BreadcrumbList structured data in /faq/page.tsx', () => {
      const faqPagePath = path.join(rootDir, 'src/app/faq/page.tsx');
      expect(fs.existsSync(faqPagePath)).toBe(true);
      const content = fs.readFileSync(faqPagePath, 'utf-8');

      expect(content).toContain("'@type': 'FAQPage'");
      expect(content).toContain("'@type': 'BreadcrumbList'");
      expect(content).toContain('mainEntity: FAQS.map');
      expect(content).toContain("canonicalPath: '/faq'");
    });

    it('wires /faq into navigation, footer, sitemap, and LLM routes', () => {
      const navHrefs = MAIN_NAV_LINKS.map((l) => l.href);
      expect(navHrefs).toContain('/faq');

      const footerLinks = FOOTER_SECTIONS.flatMap((s) => s.links.map((l) => l.href));
      expect(footerLinks).toContain('/faq');

      const sitemapContent = fs.readFileSync(path.join(rootDir, 'src/app/sitemap.ts'), 'utf-8');
      expect(sitemapContent).toContain("path: '/faq'");

      const llmsContent = fs.readFileSync(path.join(rootDir, 'src/app/llms.txt/route.ts'), 'utf-8');
      expect(llmsContent).toContain('/faq');

      const llmsFullContent = fs.readFileSync(path.join(rootDir, 'src/app/llms-full.txt/route.ts'), 'utf-8');
      expect(llmsFullContent).toContain('/faq');
    });
  });

  describe('Part 2: Visible 18+ Architectural Checkbox', () => {
    it('wires 22px x 22px custom architectural checkbox in QualificationForm and CSS Module', () => {
      const formTsx = fs.readFileSync(
        path.join(rootDir, 'src/presentation/components/forms/QualificationForm.tsx'),
        'utf-8'
      );
      expect(formTsx).toContain('customCheckbox');
      expect(formTsx).toContain('hiddenNativeCheckbox');
      expect(formTsx).toContain('aria-checked={consentAccepted}');
      expect(formTsx).toContain('id="consent-checkbox"');

      const formCss = fs.readFileSync(
        path.join(rootDir, 'src/presentation/components/forms/QualificationForm.module.css'),
        'utf-8'
      );
      expect(formCss).toContain('width: 22px;');
      expect(formCss).toContain('height: 22px;');
      expect(formCss).toContain('border: 2px solid #C882FF;');
      expect(formCss).toContain('background-color: #160429;');
    });

    it('wires 22px x 22px custom architectural checkbox in ConsultationClient and CSS Module', () => {
      const clientTsx = fs.readFileSync(
        path.join(rootDir, 'src/app/consultation/ConsultationClient.tsx'),
        'utf-8'
      );
      expect(clientTsx).toContain('customCheckbox');
      expect(clientTsx).toContain('hiddenNativeCheckbox');
      expect(clientTsx).toContain('aria-checked={consentAccepted}');

      const clientCss = fs.readFileSync(
        path.join(rootDir, 'src/app/consultation/Consultation.module.css'),
        'utf-8'
      );
      expect(clientCss).toContain('width: 22px;');
      expect(clientCss).toContain('height: 22px;');
      expect(clientCss).toContain('border: 2px solid #C882FF;');
      expect(clientCss).toContain('background-color: #160429;');
    });
  });

  describe('Part 3: NeonStickerPhysicsFooter Removal & Zero Initial Flash', () => {
    it('confirms NeonStickerPhysicsFooter is completely purged from Header and Footer layout', () => {
      const headerTsx = fs.readFileSync(
        path.join(rootDir, 'src/presentation/components/layout/Header.tsx'),
        'utf-8'
      );
      expect(headerTsx).not.toContain('NeonStickerPhysicsFooter');
      expect(headerTsx).not.toContain('loading: () => <footer');

      const stickerPath = path.join(
        rootDir,
        'src/presentation/components/layout/NeonStickerPhysicsFooter.tsx'
      );
      expect(fs.existsSync(stickerPath)).toBe(false);
    });

    it('confirms static imports on homepage (page.tsx) without dynamic skeleton flashes', () => {
      const pageTsx = fs.readFileSync(path.join(rootDir, 'src/app/page.tsx'), 'utf-8');
      expect(pageTsx).not.toContain('next/dynamic');
      expect(pageTsx).not.toContain('ArchitecturalSkeleton');
      expect(pageTsx).toContain('import { ArtifactGallery }');
      expect(pageTsx).toContain('import { CapabilitiesSection }');
      expect(pageTsx).toContain('import { QualificationSection }');
    });
  });

  describe('Part 4: Windows next/font Preload Manifest Repair Wired Into Build', () => {
    it('wires the font manifest repair script as the postbuild step', () => {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8')
      );
      expect(packageJson.scripts.postbuild).toBe('node scripts/fix-font-manifest.mjs');
      expect(fs.existsSync(path.join(rootDir, 'scripts/fix-font-manifest.mjs'))).toBe(true);
    });

    it('repair script reconstructs the preloadable manifest and injects font preloads into prerendered HTML', () => {
      const script = fs.readFileSync(
        path.join(rootDir, 'scripts/fix-font-manifest.mjs'),
        'utf-8'
      );
      expect(script).toContain('next-font-manifest.json');
      expect(script).toContain('\\.p\\.(woff2|woff)$');
      expect(script).toContain('as="font"');
      expect(script).toContain('crossorigin=""');
      expect(script).toContain('type="font/${ext}"');
      expect(script).toContain('standalone');
      expect(script).toContain('rel="expect"');
    });
  });
});

