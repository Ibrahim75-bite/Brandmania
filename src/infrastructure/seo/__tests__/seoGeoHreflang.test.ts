import { describe, it, expect } from 'vitest';
import { constructMetadata } from '../metadata';
import { seoConfig } from '@/content/seoConfig';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getLlmsFullTxt } from '@/app/llms-full.txt/route';

describe('SEO, GEO, International Hreflang & AI Optimization Tests', () => {
  const siteUrl = seoConfig.siteUrl;

  describe('1. Next.js Metadata Construction Engine', () => {
    it('outputs valid metadataBase, canonicals, and bidirectional hreflang alternates', () => {
      const metadata = constructMetadata();

      expect(metadata.metadataBase).toEqual(new URL(siteUrl));
      expect(metadata.alternates?.canonical).toBe(siteUrl);

      const languages = metadata.alternates?.languages as Record<string, string>;
      expect(languages).toBeDefined();
      expect(languages['x-default']).toBe(siteUrl);
      expect(languages['en']).toBe(siteUrl);
      expect(languages['en-US']).toBe(siteUrl);
      expect(languages['en-GB']).toBe(siteUrl);
      expect(languages['en-AE']).toBe(siteUrl);
      expect(languages['en-CA']).toBe(siteUrl);
      expect(languages['en-AU']).toBe(siteUrl);
    });

    it('outputs compliant OpenGraph and Twitter cards with high-res cover art', () => {
      const metadata = constructMetadata();

      const og = metadata.openGraph as Record<string, unknown>;
      expect(og?.type).toBe('website');
      expect(og?.siteName).toBe('BRANDMANIA');
      expect(og?.locale).toBe('en_US');
      expect(og?.images).toEqual([
        {
          url: '/brand/textures/brandmania-cover-clean.jpg',
          width: 1200,
          height: 630,
          alt: 'BRANDMANIA — Branded for the best',
        },
      ]);

      const tw = metadata.twitter as Record<string, unknown>;
      expect(tw?.card).toBe('summary_large_image');
      expect(tw?.images).toEqual([
        '/brand/textures/brandmania-cover-clean.jpg',
      ]);
    });

    it('outputs production robots directives including Googlebot max settings', () => {
      const metadata = constructMetadata();

      expect(metadata.robots).toEqual({
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      });
    });

    it('does not emit geo tags when unconfigured, preventing fake coordinates', () => {
      const metadata = constructMetadata();
      expect(metadata.other).toBeUndefined();
    });
  });

  describe('2. AI Search Crawler Directives (robots.ts)', () => {
    it('explicitly allows all AI search & citation bots and links sitemap', () => {
      const robotsData = robots();

      expect(robotsData.sitemap).toBe(`${siteUrl}/sitemap.xml`);
      expect(Array.isArray(robotsData.rules)).toBe(true);

      const rules = Array.isArray(robotsData.rules) ? robotsData.rules : [robotsData.rules];
      const userAgents = rules.map((r) => r.userAgent);

      expect(userAgents).toContain('*');
      expect(userAgents).toContain('Googlebot');
      expect(userAgents).toContain('Bingbot');
      expect(userAgents).toContain('OAI-SearchBot');
      expect(userAgents).toContain('ChatGPT-User');
      expect(userAgents).toContain('GPTBot');
      expect(userAgents).toContain('ClaudeBot');
      expect(userAgents).toContain('Claude-Web');
      expect(userAgents).toContain('PerplexityBot');
      expect(userAgents).toContain('Google-Extended');
      expect(userAgents).toContain('Applebot-Extended');

      for (const rule of rules) {
        expect(rule.allow).toBe('/');
        expect(rule.disallow).toEqual(['/api/', '/dev/']);
      }
    });
  });

  describe('3. Dynamic Sitemap with Hreflang Alternates (sitemap.ts)', () => {
    it('generates dynamic sitemap with canonicals, hreflang, and AI dossiers', () => {
      const sitemapEntries = sitemap();

      expect(sitemapEntries.length).toBeGreaterThan(10);
      const urls = sitemapEntries.map((e) => e.url);

      expect(urls).toContain(siteUrl);
      expect(urls).toContain(`${siteUrl}/services`);
      expect(urls).toContain(`${siteUrl}/services/brand-direction`);
      expect(urls).toContain(`${siteUrl}/services/margin-recovery`);
      expect(urls).toContain(`${siteUrl}/services/consumer-scope`);
      expect(urls).toContain(`${siteUrl}/work`);

      expect(urls).toContain(`${siteUrl}/llms.txt`);
      expect(urls).toContain(`${siteUrl}/llms-full.txt`);

      const homeEntry = sitemapEntries.find((e) => e.url === siteUrl);
      expect(homeEntry?.alternates?.languages?.['x-default']).toBe(siteUrl);
      expect(homeEntry?.alternates?.languages?.['en']).toBe(siteUrl);
      expect(homeEntry?.alternates?.languages?.['en-GB']).toBe(siteUrl);
    });
  });

  describe('4. Native AI Dossiers (/llms.txt & /llms-full.txt)', () => {
    it('/llms.txt returns valid Markdown index with Content-Type header and verified facts', async () => {
      const response = await getLlmsTxt();

      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');

      const text = await response.text();
      expect(text).toContain('# BRANDMANIA');
      expect(text).toContain('Branded for the best');
      expect(text).toContain("Let's make you a market leader");
      expect(text).toContain('$700,000+ annual revenue');
      expect(text).toContain('Brand Direction');
      expect(text).toContain('Margin Recovery');
      expect(text).toContain('Consumer Scope');
      expect(text).toContain(`${siteUrl}/llms-full.txt`);

      expect(text).not.toMatch(/\bARR\b/);
    });

    it('/llms-full.txt returns comprehensive machine-readable dossier with all 20 industries and 11 capabilities', async () => {
      const response = await getLlmsFullTxt();

      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');

      const text = await response.text();
      expect(text).toContain('Complete Machine-Readable Entity Dossier');

      expect(text).toContain('Flagship I: Brand Direction');
      expect(text).toContain('Flagship II: Margin Recovery');
      expect(text).toContain('Flagship III: Consumer Scope');

      expect(text).toContain('Digital Marketing');
      expect(text).toContain('Growth Marketing');
      expect(text).toContain('Performance Marketing');
      expect(text).toContain('Content Creation');
      expect(text).toContain('Performance Content Creation');
      expect(text).toContain('Finance & Operations');
      expect(text).toContain('Strategic Management');
      expect(text).toContain('Team Management');
      expect(text).toContain('Project Management');
      expect(text).toContain('AI Automation');
      expect(text).toContain('AI Connected Systems');

      expect(text).toContain('Designers');
      expect(text).toContain('Jewelry & Gemstones');
      expect(text).toContain('Interior Design');
      expect(text).toContain('Outdoor Luxury Construction');
      expect(text).toContain('Hotels & Resorts');
      expect(text).toContain('Gyms');
      expect(text).toContain('Supplement Stores');
      expect(text).toContain('Sports & Fitness Wear');
      expect(text).toContain('Organic Herbs & Alternative Medicine');
      expect(text).toContain('Software & Mobile Apps');
      expect(text).toContain('Cosmetics & Skincare/Haircare');
      expect(text).toContain('E-Commerce');
      expect(text).toContain('Healthcare Nutrition & Weight Loss');
      expect(text).toContain('Perfumes');
      expect(text).toContain("Women's Clothing & Apparel");
      expect(text).toContain('Accessories');
      expect(text).toContain('Electronics');
      expect(text).toContain('Coffee');
      expect(text).toContain('B2B Medical Devices');
      expect(text).toContain('Furniture');

      expect(text).toContain('Full Strategic Rebuild & Performance Engagement');
      expect(text).toContain('Strategic Consultancy');

      expect(text).toContain('$700,000+ annual revenue');
      expect(text).not.toMatch(/\bARR\b/);
    });
  });
});
