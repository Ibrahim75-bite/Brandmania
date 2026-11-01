import type { Metadata } from 'next';
import { seoConfig } from '@/content/seoConfig';

export interface CustomMetadataOptions {
  title?: string;
  description?: string;
  canonicalPath?: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
}

/**
 * Builds production-grade Next.js Metadata with canonicals, hreflang alternates,
 * OpenGraph, Twitter cards, crawler directives, and conditional geo meta tags.
 */
export function constructMetadata(options: CustomMetadataOptions = {}): Metadata {
  const siteUrl = seoConfig.siteUrl;
  const path = options.canonicalPath || '';
  const canonicalUrl = `${siteUrl}${path}`;

  // Build hreflang map pointing to valid, resolvable canonical URLs
  // (Prevents Google Search Console 404 errors for non-existent locale subpaths)
  const languageAlternates: Record<string, string> = {
    'x-default': canonicalUrl,
  };

  for (const locale of seoConfig.locales) {
    if (locale !== 'x-default') {
      languageAlternates[locale] = canonicalUrl;
    }
  }

  const defaultTitleText =
    'BRANDMANIA — Branded for the Best | Brand Direction, Margin Recovery & Consumer Scope';
  const defaultDescriptionText =
    'Branding and commercial advisory for established businesses ($700,000+ annual revenue) and high-ticket international brands. Specializing in Brand Direction, Margin Recovery, and Consumer Scope.';

  const title = options.title
    ? {
        default: options.title,
        template: '%s | BRANDMANIA',
      }
    : {
        default: defaultTitleText,
        template: '%s | BRANDMANIA',
      };

  const description = options.description || defaultDescriptionText;
  const ogImageUrl = options.ogImage || seoConfig.coverImagePath;

  // Build conditional geo tags inside metadata.other
  const otherMeta: Record<string, string> = {};
  if (seoConfig.geo) {
    if (seoConfig.geo.region) {
      otherMeta['geo.region'] = seoConfig.geo.region;
    }
    if (seoConfig.geo.placename) {
      otherMeta['geo.placename'] = seoConfig.geo.placename;
    }
    otherMeta['geo.position'] = `${seoConfig.geo.latitude};${seoConfig.geo.longitude}`;
    otherMeta['ICBM'] = `${seoConfig.geo.latitude}, ${seoConfig.geo.longitude}`;
  }

  const defaultKeywords = [
    'Brand Direction',
    'Margin Recovery',
    'Consumer Scope',
    'Strategic Marketing',
    'High Ticket Branding',
    'Commercial Advisory',
    'Behavioral Economics Branding',
    'Pricing Power',
    'Enterprise Brand Strategy',
    ...seoConfig.targetIndustries,
  ];

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: options.keywords || defaultKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    openGraph: {
      type: 'website',
      siteName: seoConfig.brandName,
      locale: 'en_US',
      title: options.title || defaultTitleText,
      description,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${seoConfig.brandName} — ${seoConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: options.title || defaultTitleText,
      description,
      images: [ogImageUrl],
    },
    robots: options.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    ...(Object.keys(otherMeta).length > 0 ? { other: otherMeta } : {}),
  };
}
