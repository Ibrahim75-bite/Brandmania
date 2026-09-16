import { NextResponse } from 'next/server';
import { SEO_CONFIG } from '@/content/seo';
import { getAllFunnelSlugs } from '@/content/funnels';

export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = SEO_CONFIG.siteUrl;
  const now = new Date().toISOString();

  const staticRoutes = [
    '',
    '/services',
    '/services/margin-recovery',
    '/services/brand-direction',
    '/services/consumer-scope',
    '/work',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
  ];

  const funnelRoutes = getAllFunnelSlugs().map((slug) => `/f/${slug}`);

  const allRoutes = [...staticRoutes, ...funnelRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
