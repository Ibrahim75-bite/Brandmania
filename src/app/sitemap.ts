import type { MetadataRoute } from 'next';
import { seoConfig } from '@/content/seoConfig';
import { getAllFunnelSlugs } from '@/content/funnels';
import { getAllArticles } from '@/content/articles';
import { getAllCaseStudies } from '@/content/caseStudies';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = seoConfig.siteUrl;
  const now = new Date();

  const createLanguageAlternates = (route: string) => {
    const canonical = `${siteUrl}${route}`;
    const languages: Record<string, string> = {
      'x-default': canonical,
    };
    for (const locale of seoConfig.locales) {
      if (locale !== 'x-default') {
        languages[locale] = canonical;
      }
    }
    return languages;
  };

  interface RouteDefinition {
    path: string;
    priority: number;
    changeFrequency:
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'monthly'
      | 'yearly'
      | 'never';
  }

  const coreRoutes: RouteDefinition[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/services/brand-direction', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/services/margin-recovery', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/services/consumer-scope', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/work', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/insights', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/llms.txt', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/llms-full.txt', priority: 0.7, changeFrequency: 'weekly' },
  ];

  const workRoutes: RouteDefinition[] = getAllCaseStudies().map((study) => ({
    path: `/work/${study.slug}`,
    priority: 0.85,
    changeFrequency: 'weekly' as const,
  }));

  const articleRoutes: RouteDefinition[] = getAllArticles().map((article) => ({
    path: `/insights/${article.slug}`,
    priority: 0.85,
    changeFrequency: 'weekly' as const,
  }));

  const funnelRoutes: RouteDefinition[] = getAllFunnelSlugs().map((slug) => ({
    path: `/f/${slug}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }));

  const allRoutes = [...coreRoutes, ...workRoutes, ...articleRoutes, ...funnelRoutes];

  return allRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: createLanguageAlternates(route.path),
    },
  }));
}
