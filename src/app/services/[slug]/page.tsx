import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { Card } from '@/presentation/components/primitives/Card';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { FLAGSHIP_SERVICES } from '@/content/services';
import { constructMetadata } from '@/infrastructure/seo/metadata';

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(FLAGSHIP_SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = FLAGSHIP_SERVICES[slug];

  if (!service) {
    return constructMetadata({
      title: 'Service Not Found | BRANDMANIA',
      canonicalPath: `/services/${slug}`,
    });
  }

  return constructMetadata({
    title: `${service.title} | BRANDMANIA Flagship Discipline`,
    description: service.summary,
    canonicalPath: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = FLAGSHIP_SERVICES[slug];

  if (!service) {
    notFound();
  }

  return (
    <div style={{ backgroundColor: '#0D0118', color: '#FAF7FF' }}>
      <Section spacing="xl" style={{ paddingTop: 'clamp(5rem, 8vw, 8rem)', backgroundColor: '#160429', borderBottom: '1px solid rgba(200, 130, 255, 0.16)' }}>
        <Container>
          <div style={{ maxWidth: '880px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <BrandEye size="sm" />
              <Badge variant="purple" size="md">
                FLAGSHIP DISCIPLINE
              </Badge>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                fontWeight: 400,
                color: '#FAF7FF',
                marginBottom: '1.5rem',
                lineHeight: 1.02,
              }}
            >
              {service.title}
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontStyle: 'italic',
                color: '#C882FF',
                marginBottom: '1.75rem',
                lineHeight: 1.35,
              }}
            >
              &ldquo;{service.headline}&rdquo;
            </p>

            <p
              style={{
                fontSize: '1.15rem',
                color: '#C4B8D8',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
              }}
            >
              {service.summary}
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/#qualification" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg">
                  {service.ctaLabel} &rarr;
                </Button>
              </Link>
              <Link href="/services" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" size="lg">
                  All Disciplines
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="xl" style={{ backgroundColor: '#0D0118' }}>
        <Container>
          <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.14em', color: '#C882FF', textTransform: 'uppercase', fontWeight: 600 }}>
                STRATEGIC PREMISE
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '2.2rem', fontWeight: 400, color: '#FAF7FF', margin: '0.5rem 0 1rem 0' }}>
                Core Commercial Thesis
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#C4B8D8', lineHeight: 1.7 }}>
                {service.strategicPremise}
              </p>
            </div>

            <Card variant="elevated" style={{ backgroundColor: '#160429', border: '1px solid rgba(200, 130, 255, 0.2)', padding: '2.5rem', borderRadius: 0 }}>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.14em', color: '#C882FF', textTransform: 'uppercase', fontWeight: 600 }}>
                DIAGNOSTIC ARCHITECTURE
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '1.85rem', fontWeight: 400, color: '#FAF7FF', margin: '0.5rem 0 1.5rem 0' }}>
                Operational Vectors &amp; Deliverables
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {service.points.map((pt, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(200, 130, 255, 0.1)' }}>
                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', color: '#C882FF' }}>
                      [0{i + 1}]
                    </span>
                    <span style={{ fontSize: '1rem', color: '#FAF7FF', lineHeight: 1.5 }}>
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            {service.faqs && service.faqs.length > 0 && (
              <div>
                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.14em', color: '#C882FF', textTransform: 'uppercase', fontWeight: 600 }}>
                  EXECUTIVE FAQ
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '2rem', fontWeight: 400, color: '#FAF7FF', margin: '0.5rem 0 1.5rem 0' }}>
                  Frequently Addressed Questions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {service.faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      style={{
                        backgroundColor: '#160429',
                        border: '1px solid rgba(200, 130, 255, 0.16)',
                        padding: '1.25rem 1.5rem',
                      }}
                    >
                      <summary
                        style={{
                          fontFamily: 'var(--font-serif), Georgia, serif',
                          fontSize: '1.2rem',
                          color: '#FAF7FF',
                          cursor: 'pointer',
                        }}
                      >
                        {faq.question}
                      </summary>
                      <p style={{ marginTop: '0.75rem', fontSize: '0.98rem', color: '#C4B8D8', lineHeight: 1.65 }}>
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            <div style={{ textAlign: 'center', paddingTop: '2.5rem', borderTop: '1px solid rgba(200, 130, 255, 0.16)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '2rem', color: '#FAF7FF', marginBottom: '1rem' }}>
                Initiate Strategic Intake
              </h3>
              <p style={{ color: '#C4B8D8', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                Our partners review inquiries under bilateral non-disclosure for brands meeting our $700,000+ annual revenue qualification floor.
              </p>
              <Link href="/#qualification" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg">
                  Request Strategic Consultation &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
