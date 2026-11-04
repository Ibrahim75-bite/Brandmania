import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { getAllArticles } from '@/content/articles';
import { InsightsClient } from './InsightsClient';
import { constructMetadata } from '@/infrastructure/seo/metadata';
import { seoConfig } from '@/content/seoConfig';

export const metadata: Metadata = constructMetadata({
  title: 'Executive Insights & Strategic Commercial Articles | BRANDMANIA',
  description:
    'Forensic analyses on brand perception, margin recovery frameworks, consumer behavioral pricing, and AI connected systems for $700K+ enterprises.',
  canonicalPath: '/insights',
});

export default function InsightsIndexPage() {
  const articles = getAllArticles();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Executive Insights & Strategic Commercial Articles',
    description:
      'Forensic analyses on brand perception, margin recovery frameworks, consumer behavioral pricing, and AI connected systems for $700K+ enterprises.',
    url: `${seoConfig.siteUrl}/insights`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${seoConfig.siteUrl}/insights/${article.slug}`,
        name: article.title,
      })),
    },
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
        name: 'Executive Insights',
        item: `${seoConfig.siteUrl}/insights`,
      },
    ],
  };

  return (
    <div style={{ backgroundColor: '#0D0118', minHeight: '100vh', color: '#FAF7FF' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Section
        spacing="lg"
        style={{
          paddingTop: 'calc(var(--space-16) + 2rem)',
          backgroundColor: '#160429',
          borderBottom: '1px solid rgba(200, 130, 255, 0.16)',
        }}
      >
        <Container>
          <div style={{ maxWidth: '920px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <Badge variant="neutral" size="md">
                (09) / EXECUTIVE INSIGHTS &amp; COMMERCIAL DOCTRINE
              </Badge>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 400,
                color: '#FAF7FF',
                marginBottom: 'var(--space-4)',
                lineHeight: 1.1,
              }}
            >
              Executive Insights &amp; Strategic Articles
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-lg)',
                color: '#C4B8D8',
                lineHeight: 'var(--line-height-relaxed)',
                maxWidth: '760px',
              }}
            >
              Rigorous diagnostic frameworks on brand perception, commercial margin recovery, price inelasticity, and autonomous enterprise systems.
            </p>
          </div>
        </Container>
      </Section>

      <InsightsClient articles={articles} />
    </div>
  );
}

