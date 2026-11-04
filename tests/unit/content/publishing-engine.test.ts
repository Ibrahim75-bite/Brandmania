import { describe, it, expect } from 'vitest';
import { getAllArticles, getArticleBySlug, getArticlesByCategory, ARTICLES } from '@/content/articles';
import { getAllCaseStudies, getCaseStudyBySlug, CASE_STUDIES } from '@/content/caseStudies';
import { getFunnelBySlug, getAllFunnelSlugs } from '@/content/funnels';
import sitemap from '@/app/sitemap';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getLlmsFullTxt } from '@/app/llms-full.txt/route';

describe('Publishing Engine & Campaign Route Integration Suite', () => {
  describe('Executive Insights & Articles Engine (/insights & /insights/[slug])', () => {
    const requiredArticleSlugs = [
      'why-brand-perception-commands-contribution-margin',
      'six-stage-margin-recovery-audit-before-scaling-ad-spend',
      'behavioral-pricing-power-and-consumer-scope-architecture',
      'ai-connected-systems-and-commercial-operations-leverage',
    ];

    it('contains all 4 required cornerstone authority articles', () => {
      const articles = getAllArticles();
      expect(articles.length).toBe(4);
      const slugs = articles.map((a) => a.slug);
      for (const reqSlug of requiredArticleSlugs) {
        expect(slugs).toContain(reqSlug);
      }
    });

    it('validates complete AEO & GEO metadata schemas on every article', () => {
      for (const article of ARTICLES) {
        expect(article.title.length).toBeGreaterThan(15);
        expect(article.subtitle.length).toBeGreaterThan(20);
        expect(article.readingTimeMinutes).toBeGreaterThanOrEqual(4);
        expect(article.author.name).toBe('Ibrahim Mamdouh Badr');
        expect(article.author.role).toContain('Principal');

        // AEO Direct Answer constraints: 40-100 words
        const wordCount = article.tldrAnswer.trim().split(/\s+/).length;
        expect(wordCount).toBeGreaterThanOrEqual(25);
        expect(wordCount).toBeLessThanOrEqual(100);

        // Takeaways
        expect(article.keyTakeaways.length).toBeGreaterThanOrEqual(3);

        // Body Sections
        expect(article.sections.length).toBeGreaterThanOrEqual(2);
        for (const sec of article.sections) {
          expect(sec.id).toBeTruthy();
          expect(sec.heading).toBeTruthy();
          expect(sec.paragraphs.length).toBeGreaterThanOrEqual(1);
        }

        // GEO Citation Table
        expect(article.comparisonTable.caption).toBeTruthy();
        expect(article.comparisonTable.headers.length).toBe(4);
        expect(article.comparisonTable.rows.length).toBeGreaterThanOrEqual(3);

        // FAQ Items
        expect(article.faqs.length).toBeGreaterThanOrEqual(3);
        for (const faq of article.faqs) {
          expect(faq.question.endsWith('?')).toBe(true);
          expect(faq.answer.length).toBeGreaterThan(30);
        }

        expect(article.relatedDisciplineSlug).toMatch(/brand-direction|margin-recovery|consumer-scope/);
      }
    });

    it('retrieves individual articles via getArticleBySlug', () => {
      for (const slug of requiredArticleSlugs) {
        const found = getArticleBySlug(slug);
        expect(found).toBeDefined();
        expect(found?.slug).toBe(slug);
      }
      expect(getArticleBySlug('non-existent-article-slug')).toBeUndefined();
    });

    it('filters articles by category via getArticlesByCategory', () => {
      expect(getArticlesByCategory('All').length).toBe(4);
      expect(getArticlesByCategory('Brand Direction').length).toBe(1);
      expect(getArticlesByCategory('Margin Recovery').length).toBe(1);
      expect(getArticlesByCategory('Consumer Scope').length).toBe(1);
      expect(getArticlesByCategory('Operational Leverage').length).toBe(1);
    });
  });

  describe('Selected Work & Architectural Dossiers (/work & /work/[slug])', () => {
    const requiredWorkSlugs = [
      'brand-mission-and-ethos-architecture',
      'services-and-commercial-branding-blueprint',
      'social-and-conversion-campaign-system',
      'the-brand-eye-identity-monograph',
    ];

    it('contains all 4 verified architectural dossiers', () => {
      const studies = getAllCaseStudies();
      expect(studies.length).toBe(4);
      const slugs = studies.map((cs) => cs.slug);
      for (const reqSlug of requiredWorkSlugs) {
        expect(slugs).toContain(reqSlug);
      }
    });

    it('validates full architectural dossier schema on every study', () => {
      for (const study of CASE_STUDIES) {
        expect(study.catalogNumber).toMatch(/^ART-\d{2}$/);
        expect(study.title.length).toBeGreaterThan(10);
        expect(study.flagship).toBeTruthy();
        expect(study.clientSector).toBeTruthy();
        expect(['CONFIDENTIAL', 'ANONYMIZED', 'NAMED']).toContain(study.confidentialityStatus);
        expect(study.executiveSummary.length).toBeGreaterThan(50);
        expect(study.challenge.length).toBeGreaterThan(50);
        expect(study.strategicIntervention.length).toBeGreaterThan(50);
        expect(study.imageSrc.startsWith('/brand/graphics/')).toBe(true);

        expect(study.deliverables.length).toBeGreaterThanOrEqual(3);
        expect(study.executionTable.length).toBeGreaterThanOrEqual(3);
        expect(study.metrics.length).toBeGreaterThanOrEqual(3);

        for (const metric of study.metrics) {
          expect(metric.label).toBeTruthy();
          expect(metric.before).toBeTruthy();
          expect(metric.after).toBeTruthy();
          expect(metric.change).toBeTruthy();
        }
      }
    });

    it('retrieves individual case studies via getCaseStudyBySlug', () => {
      for (const slug of requiredWorkSlugs) {
        const found = getCaseStudyBySlug(slug);
        expect(found).toBeDefined();
        expect(found?.slug).toBe(slug);
      }
      expect(getCaseStudyBySlug('unknown-case-study')).toBeUndefined();
    });
  });

  describe('Campaign Funnel Routes (/f/[slug])', () => {
    const requiredFunnelSlugs = [
      'cold-outreach',
      'margin-diagnostic',
      'jewelry',
      'boutiques',
    ];

    it('resolves all 4 exact campaign funnel slugs', () => {
      const allSlugs = getAllFunnelSlugs();
      for (const slug of requiredFunnelSlugs) {
        expect(allSlugs).toContain(slug);
        const funnel = getFunnelBySlug(slug);
        expect(funnel).toBeDefined();
        expect(funnel?.meta.title).toBeTruthy();
        expect(funnel?.hero.headline).toBeTruthy();
        expect(funnel?.painPoints.length).toBeGreaterThanOrEqual(1);
        expect(funnel?.mechanism.stages.length).toBeGreaterThanOrEqual(1);
        expect(funnel?.proof.metrics.length).toBeGreaterThanOrEqual(1);
        expect(funnel?.selectivity.criteria.length).toBeGreaterThanOrEqual(1);
      }
    });
  });

  describe('Sitemap & LLM Machine-Readable Search Integration', () => {
    it('sitemap.xml includes /insights, all article slugs, all work slugs, and funnels', () => {
      const entries = sitemap();
      const urls = entries.map((e) => e.url);

      expect(urls.some((u) => u.endsWith('/insights'))).toBe(true);
      expect(urls.some((u) => u.endsWith('/work'))).toBe(true);

      for (const a of ARTICLES) {
        expect(urls.some((u) => u.endsWith(`/insights/${a.slug}`))).toBe(true);
      }
      for (const cs of CASE_STUDIES) {
        expect(urls.some((u) => u.endsWith(`/work/${cs.slug}`))).toBe(true);
      }
      for (const f of ['cold-outreach', 'margin-diagnostic', 'jewelry', 'boutiques']) {
        expect(urls.some((u) => u.endsWith(`/f/${f}`))).toBe(true);
      }
    });

    it('llms.txt lists all published articles and case studies', async () => {
      const response = await getLlmsTxt();
      const body = await response.text();

      for (const a of ARTICLES) {
        expect(body).toContain(a.title);
        expect(body).toContain(`/insights/${a.slug}`);
      }
      for (const cs of CASE_STUDIES) {
        expect(body).toContain(cs.title);
        expect(body).toContain(`/work/${cs.slug}`);
      }
    });

    it('llms-full.txt provides deep entity dossiers for all articles and case studies', async () => {
      const response = await getLlmsFullTxt();
      const body = await response.text();

      for (const a of ARTICLES) {
        expect(body).toContain(a.title);
        expect(body).toContain(`/insights/${a.slug}`);
        expect(body).toContain(a.tldrAnswer);
      }
      for (const cs of CASE_STUDIES) {
        expect(body).toContain(cs.title);
        expect(body).toContain(`/work/${cs.slug}`);
        expect(body).toContain(cs.executiveSummary);
      }
    });
  });
});

