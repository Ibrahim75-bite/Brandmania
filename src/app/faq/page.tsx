import React from 'react';
import type { Metadata } from 'next';
import { constructMetadata } from '@/infrastructure/seo/metadata';
import { seoConfig } from '@/content/seoConfig';
import { FAQS, FAQ_CATEGORIES } from '@/content/faqs';
import { FaqClient } from './FaqClient';

export const metadata: Metadata = constructMetadata({
  title: 'Executive FAQ — Commercial & Brand Advisory',
  description:
    'Direct answers on BRANDMANIA qualification ($700K+ annual revenue), Brand Direction, 6-Stage Margin Recovery, Consumer Scope, and confidential NDA governance.',
  canonicalPath: '/faq',
  keywords: [
    'BRANDMANIA FAQ',
    'Brand Direction advisory',
    'Margin Recovery audit',
    'Consumer Scope architecture',
    'Commercial qualification $700k',
    'Enterprise brand advisory FAQ',
  ],
});

export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${faq.shortAnswer} ${faq.detailedAnswer}`,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: seoConfig.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Executive FAQ',
        item: `${seoConfig.siteUrl}/faq`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FaqClient faqs={FAQS} categories={FAQ_CATEGORIES} />
    </>
  );
}
