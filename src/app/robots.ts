import type { MetadataRoute } from 'next';
import { seoConfig } from '@/content/seoConfig';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = seoConfig.siteUrl;

  const aiAndSearchBots = [
    '*',
    'Googlebot',
    'Bingbot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'GPTBot',
    'ClaudeBot',
    'Claude-Web',
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended',
  ];

  return {
    rules: aiAndSearchBots.map((bot) => ({
      userAgent: bot,
      allow: '/',
      disallow: ['/api/', '/dev/'],
    })),
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
