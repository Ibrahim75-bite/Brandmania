import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { getAllCaseStudies, getCaseStudyBySlug } from '@/content/caseStudies';
import { constructMetadata } from '@/infrastructure/seo/metadata';
import { seoConfig } from '@/content/seoConfig';

interface WorkSlugProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: WorkSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return constructMetadata({
      title: 'Architectural Dossier Not Found | BRANDMANIA',
      description: 'The requested architectural dossier does not exist.',
      canonicalPath: '/work',
    });
  }

  return constructMetadata({
    title: `${study.title} | Architectural Dossier | BRANDMANIA`,
    description: study.executiveSummary,
    canonicalPath: `/work/${study.slug}`,
  });
}

export default async function WorkDossierPage({ params }: WorkSlugProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
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
        name: 'Selected Work',
        item: `${seoConfig.siteUrl}/work`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: study.title,
        item: `${seoConfig.siteUrl}/work/${study.slug}`,
      },
    ],
  };

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: study.title,
    headline: study.subtitle,
    description: study.executiveSummary,
    creator: {
      '@type': 'Organization',
      name: seoConfig.brandName,
      url: seoConfig.siteUrl,
    },
    datePublished: study.publishedAt,
    dateModified: study.updatedAt,
    image: `${seoConfig.siteUrl}${study.imageSrc}`,
    genre: study.flagship,
  };

  return (
    <div style={{ backgroundColor: '#0D0118', minHeight: '100vh', color: '#FAF7FF' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
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
          <div style={{ maxWidth: '960px' }}>
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
              <Link href="/work" style={{ color: '#C882FF', textDecoration: 'none' }}>
                Selected Work
              </Link>
              <span>/</span>
              <span style={{ color: '#FAF7FF' }}>[{study.catalogNumber}]</span>
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
                DOSSIER [{study.catalogNumber}] &bull; {study.flagship}
              </Badge>
              <Badge variant="neutral" size="sm">
                {study.confidentialityStatus}
              </Badge>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                fontWeight: 400,
                color: '#FAF7FF',
                lineHeight: 1.1,
                marginBottom: 'var(--space-2)',
              }}
            >
              {study.title}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 'var(--font-size-base)',
                color: '#C882FF',
                marginBottom: 'var(--space-6)',
              }}
            >
              {study.subtitle}
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
                <span style={{ color: '#C882FF' }}>SECTOR:</span> {study.clientSector}
              </div>
              <div>
                <span style={{ color: '#C882FF' }}>LOCATION:</span> {study.location}
              </div>
              <div>
                <span style={{ color: '#C882FF' }}>TIMEFRAME:</span> {study.timeframe}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" style={{ backgroundColor: '#0D0118' }}>
        <Container>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <aside
              aria-label="Executive Mandate and Outcome"
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
                  marginBottom: 'var(--space-2)',
                  fontWeight: 600,
                }}
              >
                AEO DIRECT SUMMARY &bull; EXECUTIVE MANDATE &amp; ARCHITECTURAL OUTCOME
              </div>
              <p
                style={{
                  fontSize: 'var(--font-size-base)',
                  lineHeight: 'var(--line-height-relaxed)',
                  color: '#FAF7FF',
                  margin: 0,
                }}
              >
                {study.executiveSummary}
              </p>
            </aside>

            <div
              style={{
                border: '1px solid rgba(200, 130, 255, 0.2)',
                backgroundColor: '#160429',
                padding: 'var(--space-6)',
                marginBottom: 'var(--space-12)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  backgroundColor: '#0D0118',
                  border: '1px solid rgba(200, 130, 255, 0.12)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 'var(--space-4)',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={study.imageSrc}
                  alt={study.imageAlt}
                  width={study.imageWidth}
                  height={study.imageHeight}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: 0,
                  }}
                  priority
                />
              </div>
              <div
                style={{
                  marginTop: 'var(--space-3)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  color: '#A8A0B8',
                }}
              >
                <span>UNCROPPED PHYSICAL ARTBOARD EXHIBITION</span>
                <span>[{study.catalogNumber}] FIDELITY VERIFIED</span>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--space-8)',
                marginBottom: 'var(--space-12)',
              }}
            >
              <div
                style={{
                  backgroundColor: '#160429',
                  border: '1px solid rgba(200, 130, 255, 0.16)',
                  padding: 'var(--space-8)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 'var(--font-size-xs)',
                    color: '#D48A9E',
                    letterSpacing: '0.06em',
                    marginBottom: 'var(--space-2)',
                    fontWeight: 600,
                  }}
                >
                  DIAGNOSTIC CHALLENGE
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
                  Root Cause of Margin Compression
                </h2>
                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: '#C4B8D8',
                    lineHeight: 'var(--line-height-relaxed)',
                    margin: 0,
                  }}
                >
                  {study.challenge}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#160429',
                  border: '1px solid rgba(200, 130, 255, 0.16)',
                  padding: 'var(--space-8)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 'var(--font-size-xs)',
                    color: '#C882FF',
                    letterSpacing: '0.06em',
                    marginBottom: 'var(--space-2)',
                    fontWeight: 600,
                  }}
                >
                  STRATEGIC INTERVENTION
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
                  Brandmania Architecture Deployed
                </h2>
                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: '#C4B8D8',
                    lineHeight: 'var(--line-height-relaxed)',
                    margin: 0,
                  }}
                >
                  {study.strategicIntervention}
                </p>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#160429',
                border: '1px solid rgba(200, 130, 255, 0.16)',
                padding: 'var(--space-8)',
                marginBottom: 'var(--space-12)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 'var(--font-size-xs)',
                  color: '#C882FF',
                  letterSpacing: '0.06em',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 600,
                }}
              >
                ARCHITECTURAL EXECUTION MATRIX
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
                Standard Agency vs. Brandmania Architecture
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
                  <thead>
                    <tr
                      style={{
                        borderBottom: '1px solid rgba(200, 130, 255, 0.2)',
                        backgroundColor: 'rgba(13, 1, 24, 0.6)',
                      }}
                    >
                      <th style={{ padding: '12px', color: '#FAF7FF', fontFamily: 'var(--font-mono), monospace', fontSize: '11px' }}>
                        DIMENSION
                      </th>
                      <th style={{ padding: '12px', color: '#A8A0B8', fontFamily: 'var(--font-mono), monospace', fontSize: '11px' }}>
                        STANDARD AGENCY
                      </th>
                      <th style={{ padding: '12px', color: '#C882FF', fontFamily: 'var(--font-mono), monospace', fontSize: '11px' }}>
                        BRANDMANIA ARCHITECTURE
                      </th>
                      <th style={{ padding: '12px', color: '#FAF7FF', fontFamily: 'var(--font-mono), monospace', fontSize: '11px' }}>
                        COMMERCIAL IMPACT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {study.executionTable.map((row, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: '1px solid rgba(200, 130, 255, 0.1)',
                        }}
                      >
                        <td
                          style={{
                            padding: '16px 12px',
                            fontWeight: 600,
                            color: '#FAF7FF',
                            verticalAlign: 'top',
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: 'var(--font-size-xs)',
                          }}
                        >
                          {row.dimension}
                        </td>
                        <td style={{ padding: '16px 12px', color: '#A8A0B8', verticalAlign: 'top' }}>
                          {row.standardAgencyApproach}
                        </td>
                        <td style={{ padding: '16px 12px', color: '#FAF7FF', verticalAlign: 'top', backgroundColor: 'rgba(200, 130, 255, 0.04)' }}>
                          {row.brandmaniaArchitecture}
                        </td>
                        <td style={{ padding: '16px 12px', color: '#C4B8D8', verticalAlign: 'top' }}>
                          {row.commercialImpact}
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
                border: '1px solid rgba(200, 130, 255, 0.16)',
                padding: 'var(--space-8)',
                marginBottom: 'var(--space-12)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 'var(--font-size-xs)',
                  color: '#C882FF',
                  letterSpacing: '0.06em',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 600,
                }}
              >
                PROVEN COMMERCIAL RETURN
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
                Empirical Performance Metrics
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 'var(--space-4)',
                }}
              >
                {study.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#0D0118',
                      border: '1px solid rgba(200, 130, 255, 0.14)',
                      padding: 'var(--space-6)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        color: '#A8A0B8',
                        letterSpacing: '0.04em',
                        fontFamily: 'var(--font-mono), monospace',
                      }}
                    >
                      {m.label}
                    </span>
                    <div
                      style={{
                        fontSize: 'var(--font-size-3xl)',
                        fontFamily: 'var(--font-family-serif)',
                        color: '#C882FF',
                        margin: 'var(--space-2) 0',
                      }}
                    >
                      {m.change}
                    </div>
                    <span
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        color: '#C4B8D8',
                        fontFamily: 'var(--font-mono), monospace',
                      }}
                    >
                      {m.before} → {m.after}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#160429',
                border: '1px solid rgba(200, 130, 255, 0.16)',
                padding: 'var(--space-8)',
                marginBottom: 'var(--space-12)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 'var(--font-size-xs)',
                  color: '#C882FF',
                  letterSpacing: '0.06em',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 600,
                }}
              >
                DELIVERABLE ARCHITECTURE
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
                Codified Engagement Assets
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {study.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderLeft: '2px solid #C882FF',
                      paddingLeft: 'var(--space-4)',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        color: '#FAF7FF',
                        fontSize: 'var(--font-size-base)',
                        marginBottom: '4px',
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ color: '#C4B8D8', fontSize: 'var(--font-size-sm)' }}>
                      {item.description}
                    </div>
                  </div>
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
                  Deploy this architectural standard to your enterprise.
                </h3>
                <p style={{ color: '#C4B8D8', margin: '4px 0 0 0', fontSize: 'var(--font-size-sm)' }}>
                  Bilateral NDA execution &bull; Verified $700K+ qualification floor.
                </p>
              </div>
              <Link href="/#qualification" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="md">
                  Request Strategic Consultation →
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

