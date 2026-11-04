import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { getAllArticles, getArticleBySlug } from '@/content/articles';
import { constructMetadata } from '@/infrastructure/seo/metadata';
import { seoConfig } from '@/content/seoConfig';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return constructMetadata({
      title: 'Article Not Found | BRANDMANIA',
      description: 'The requested executive insight article does not exist.',
      canonicalPath: '/insights',
    });
  }

  return constructMetadata({
    title: `${article.title} | BRANDMANIA Insights`,
    description: article.tldrAnswer,
    canonicalPath: `/insights/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

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
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${seoConfig.siteUrl}/insights/${article.slug}`,
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    alternativeHeadline: article.subtitle,
    description: article.tldrAnswer,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.brandName,
      url: seoConfig.siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${seoConfig.siteUrl}/insights/${article.slug}`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <article style={{ backgroundColor: '#0D0118', minHeight: '100vh', color: '#FAF7FF' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
            <nav
              aria-label="Breadcrumb"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 'var(--font-size-xs)',
                color: '#A8A0B8',
                marginBottom: 'var(--space-4)',
              }}
            >
              <Link href="/" style={{ color: '#C882FF', textDecoration: 'none' }}>
                Home
              </Link>
              <span>/</span>
              <Link href="/insights" style={{ color: '#C882FF', textDecoration: 'none' }}>
                Executive Insights
              </Link>
              <span>/</span>
              <span style={{ color: '#FAF7FF' }}>{article.category}</span>
            </nav>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-3)',
              }}
            >
              <BrandEye size="sm" />
              <Badge variant="neutral" size="sm">
                {article.category}
              </Badge>
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  color: '#A8A0B8',
                }}
              >
                {article.readingTimeMinutes} MIN READ
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.3rem, 4.5vw, 3.8rem)',
                fontWeight: 400,
                color: '#FAF7FF',
                lineHeight: 1.15,
                marginBottom: 'var(--space-3)',
              }}
            >
              {article.title}
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 'var(--font-size-sm)',
                color: '#C882FF',
                lineHeight: 'var(--line-height-normal)',
                marginBottom: 'var(--space-6)',
              }}
            >
              {article.subtitle}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-6)',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 'var(--font-size-xs)',
                color: '#A8A0B8',
                borderTop: '1px solid rgba(200, 130, 255, 0.12)',
                paddingTop: 'var(--space-4)',
              }}
            >
              <div>
                <span style={{ color: '#C882FF' }}>AUTHOR:</span> {article.author.name} ({article.author.role})
              </div>
              <div>
                <span style={{ color: '#C882FF' }}>PUBLISHED:</span> {article.publishedAt}
              </div>
              <div>
                <span style={{ color: '#C882FF' }}>REVISED:</span> {article.updatedAt}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="xl" style={{ backgroundColor: '#0D0118' }}>
        <Container>
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <aside
              aria-label="Executive Summary"
              style={{
                backgroundColor: '#160429',
                border: '1px solid #C882FF',
                padding: 'var(--space-6)',
                marginBottom: 'var(--space-10)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  color: '#C882FF',
                  letterSpacing: '0.08em',
                  marginBottom: 'var(--space-3)',
                  fontWeight: 600,
                }}
              >
                AEO DIRECT ANSWER &bull; EXECUTIVE SUMMARY
              </div>
              <p
                style={{
                  fontSize: 'var(--font-size-base)',
                  lineHeight: 'var(--line-height-relaxed)',
                  color: '#FAF7FF',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {article.tldrAnswer}
              </p>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '11px',
                    color: '#A8A0B8',
                    letterSpacing: '0.04em',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  CORE ARCHITECTURAL TAKEAWAYS:
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: 'var(--space-5)',
                    color: '#C4B8D8',
                    fontSize: 'var(--font-size-sm)',
                    lineHeight: 'var(--line-height-relaxed)',
                  }}
                >
                  {article.keyTakeaways.map((point, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {article.sections.map((sec) => (
              <section key={sec.id} style={{ marginBottom: 'var(--space-10)' }}>
                <h2
                  id={sec.id}
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'var(--font-size-3xl)',
                    fontWeight: 400,
                    color: '#FAF7FF',
                    lineHeight: 1.25,
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {sec.heading}
                </h2>

                {sec.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    style={{
                      fontSize: 'var(--font-size-base)',
                      color: '#C4B8D8',
                      lineHeight: '1.75',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    {p}
                  </p>
                ))}

                {sec.quote && (
                  <blockquote
                    style={{
                      margin: 'var(--space-6) 0',
                      padding: 'var(--space-5) var(--space-6)',
                      backgroundColor: '#160429',
                      borderLeft: '3px solid #C882FF',
                      color: '#FAF7FF',
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: 'var(--font-size-lg)',
                      fontStyle: 'italic',
                      lineHeight: 'var(--line-height-relaxed)',
                    }}
                  >
                    &ldquo;{sec.quote}&rdquo;
                  </blockquote>
                )}
              </section>
            ))}

            <div
              style={{
                backgroundColor: '#160429',
                border: '1px solid rgba(200, 130, 255, 0.2)',
                padding: 'var(--space-8)',
                marginBottom: 'var(--space-12)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  color: '#C882FF',
                  letterSpacing: '0.08em',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 600,
                }}
              >
                GEO CITATION MATRIX &bull; MACHINE-READABLE COMPARISON
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 400,
                  color: '#FAF7FF',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {article.comparisonTable.caption}
              </h2>

              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    textAlign: 'left',
                    fontSize: 'var(--font-size-sm)',
                  }}
                >
                  <caption style={{ display: 'none' }}>
                    {article.comparisonTable.caption}
                  </caption>
                  <thead>
                    <tr
                      style={{
                        borderBottom: '1px solid rgba(200, 130, 255, 0.24)',
                        backgroundColor: 'rgba(13, 1, 24, 0.7)',
                      }}
                    >
                      {article.comparisonTable.headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          scope="col"
                          style={{
                            padding: '12px',
                            color: hIdx === 2 ? '#C882FF' : '#FAF7FF',
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: '11px',
                            fontWeight: 600,
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {article.comparisonTable.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        style={{
                          borderBottom: '1px solid rgba(200, 130, 255, 0.1)',
                        }}
                      >
                        <td
                          style={{
                            padding: '14px 12px',
                            fontWeight: 600,
                            color: '#FAF7FF',
                            verticalAlign: 'top',
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: 'var(--font-size-xs)',
                          }}
                        >
                          {row.dimension}
                        </td>
                        <td style={{ padding: '14px 12px', color: '#A8A0B8', verticalAlign: 'top' }}>
                          {row.legacyAdSpendModel}
                        </td>
                        <td
                          style={{
                            padding: '14px 12px',
                            color: '#FAF7FF',
                            verticalAlign: 'top',
                            backgroundColor: 'rgba(200, 130, 255, 0.05)',
                          }}
                        >
                          {row.brandmaniaSovereignModel}
                        </td>
                        <td style={{ padding: '14px 12px', color: '#C4B8D8', verticalAlign: 'top' }}>
                          {row.strategicAdvantage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#160429',
                border: '1px solid rgba(200, 130, 255, 0.2)',
                padding: 'var(--space-8)',
                marginBottom: 'var(--space-12)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  color: '#C882FF',
                  letterSpacing: '0.08em',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 600,
                }}
              >
                EXECUTIVE INQUIRY &bull; FREQUENTLY ASKED QUESTIONS
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 400,
                  color: '#FAF7FF',
                  marginBottom: 'var(--space-6)',
                }}
              >
                Frequently Addressed Strategic Questions
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {article.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    style={{
                      border: '1px solid rgba(200, 130, 255, 0.16)',
                      backgroundColor: '#0D0118',
                      padding: 'var(--space-4)',
                    }}
                  >
                    <summary
                      style={{
                        fontFamily: 'var(--font-family-serif)',
                        fontSize: 'var(--font-size-lg)',
                        color: '#FAF7FF',
                        cursor: 'pointer',
                        userSelect: 'none',
                        outline: 'none',
                      }}
                    >
                      {faq.question}
                    </summary>
                    <p
                      style={{
                        marginTop: 'var(--space-3)',
                        marginBottom: 0,
                        fontSize: 'var(--font-size-sm)',
                        color: '#C4B8D8',
                        lineHeight: 'var(--line-height-relaxed)',
                      }}
                    >
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                padding: 'var(--space-8)',
                backgroundColor: '#160429',
                border: '1px solid rgba(200, 130, 255, 0.2)',
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'var(--font-size-2xl)',
                    color: '#FAF7FF',
                    margin: 0,
                  }}
                >
                  Explore the underlying flagship discipline.
                </h3>
                <p style={{ color: '#C4B8D8', margin: '4px 0 0 0', fontSize: 'var(--font-size-sm)' }}>
                  Detailed architectural scope &bull; Verified enterprise qualification.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <Link
                  href={`/services/${article.relatedDisciplineSlug}`}
                  style={{
                    padding: '12px 18px',
                    border: '1px solid rgba(200, 130, 255, 0.3)',
                    backgroundColor: 'rgba(200, 130, 255, 0.08)',
                    color: '#FAF7FF',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 'var(--font-size-xs)',
                  }}
                >
                  Inspect Discipline →
                </Link>
                <Link href="/#qualification" style={{ textDecoration: 'none' }}>
                  <Button variant="primary" size="sm">
                    Request Consultation →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}

