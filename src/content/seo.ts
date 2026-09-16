/**
 * SEO & Structured Data Configuration
 *
 * Configures canonical URLs, meta tags, OpenGraph schemas, and JSON-LD structured data.
 */

export const SEO_CONFIG = {
  defaultTitle: 'BRANDMANIA | Branded For The Best',
  titleTemplate: '%s | BRANDMANIA',
  defaultDescription:
    'Strategic premium agency and executive growth partner. We engineer Margin Recovery, Brand Direction, and Consumer Scope for ambitious market leaders.',
  siteUrl: process.env.APP_URL || 'https://brandmania.agency',
  keywords: [
    'Brand Direction',
    'Margin Recovery',
    'Consumer Scope',
    'Strategic Marketing',
    'High Ticket Branding',
    'Luxury Consulting',
    'Behavioral Economics Branding',
    'Jewelry Brand Strategy',
    'Designer Boutique Marketing',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BRANDMANIA',
    images: [
      {
        url: '/brand/graphics/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BRANDMANIA — Branded for the best',
      },
    ],
  },
  twitter: {
    handle: '@brandmania',
    site: '@brandmania',
    cardType: 'summary_large_image',
  },
  organizationSchema: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BRANDMANIA',
    url: 'https://brandmania.agency',
    logo: 'https://brandmania.agency/brand/logo/brandmania-logo.svg',
    slogan: 'Branded for the best',
    description:
      'Executive-level strategic brand consultancy specializing in Margin Recovery, Brand Direction, and Consumer Scope.',
    sameAs: [],
  },
};
