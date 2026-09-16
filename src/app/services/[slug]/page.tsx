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
    return { title: 'Service Not Found | BRANDMANIA' };
  }

  return {
    title: `${service.title} | BRANDMANIA Flagship`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = FLAGSHIP_SERVICES[slug];

  if (!service) {
    notFound();
  }

  return (
    <div>
      <Section spacing="xl" style={{ paddingTop: 'var(--space-20)', backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <Container>
          <div style={{ maxWidth: '860px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <BrandEye size="sm" />
              <Badge variant="purple" size="md">
                FLAGSHIP DISCIPLINE
              </Badge>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-5xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#fff',
                marginBottom: 'var(--space-4)',
              }}
            >
              {service.title}
            </h1>

            <p
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontFamily: 'var(--font-family-serif)',
                fontStyle: 'italic',
                color: 'var(--color-accent-purple-bright)',
                marginBottom: 'var(--space-6)',
              }}
            >
              “{service.headline}”
            </p>

            <p
              style={{
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--line-height-relaxed)',
                marginBottom: 'var(--space-8)',
              }}
            >
              {service.summary}
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <Link href="/#consultation" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg">
                  {service.ctaLabel}
                </Button>
              </Link>
              <Link href="/services" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size="lg">
                  ← All Flagships
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="xl">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-10)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent-purple-bright)', marginBottom: 'var(--space-3)' }}>
                STRATEGIC PREMISE
              </h3>
              <Card variant="glass" style={{ padding: 'var(--space-8)' }}>
                <p style={{ fontSize: 'var(--font-size-lg)', color: '#fff', lineHeight: 'var(--line-height-relaxed)', margin: 0 }}>
                  {service.strategicPremise}
                </p>
              </Card>
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent-purple-bright)', marginBottom: 'var(--space-3)' }}>
                DIAGNOSTIC DELIVERABLES
              </h3>
              <Card variant="elevated" style={{ padding: 'var(--space-8)' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {service.points.map((pt, i) => (
                    <li key={i} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
                      <span style={{ color: 'var(--color-accent-purple-bright)', fontWeight: 'bold' }}>0{i + 1}.</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
