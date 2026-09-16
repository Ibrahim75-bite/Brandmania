import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { Card } from '@/presentation/components/primitives/Card';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { FLAGSHIP_SERVICES, SUPPORTING_CAPABILITIES } from '@/content/services';
import { BRAND } from '@/content/brand';

export const metadata: Metadata = {
  title: 'Flagship Disciplines & Strategic Capabilities',
  description:
    'BRANDMANIA combines Margin Recovery, Brand Direction, and Consumer Scope, supported by growth marketing, operations, and AI connected systems.',
};

export default function ServicesPage() {
  return (
    <div>
      <Section spacing="lg" style={{ paddingTop: 'var(--space-16)', backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <Container>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <Badge variant="purple" size="md">
                STRATEGIC PRACTICES
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
              The Three Flagship Disciplines
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--line-height-relaxed)',
              }}
            >
              We do not present an arbitrary flat catalogue of agency services. Our three flagship disciplines represent a structured methodology to diagnose leaks, engineer premium market perception, and align customer psychology.
            </p>
          </div>
        </Container>
      </Section>

      {/* Flagships Grid */}
      <Section spacing="xl">
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            {Object.values(FLAGSHIP_SERVICES).map((service, index) => (
              <Card
                key={service.id}
                variant="elevated"
                style={{
                  padding: 'var(--space-10)',
                  border: '1px solid var(--color-border-default)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <span style={{ fontSize: 'var(--font-size-xs)', letterSpacing: '0.15em', color: 'var(--color-accent-purple-bright)', fontWeight: 'bold' }}>
                      DISCIPLINE 0{index + 1}
                    </span>
                    <h2
                      style={{
                        fontFamily: 'var(--font-family-serif)',
                        fontSize: 'var(--font-size-3xl)',
                        color: '#fff',
                        marginTop: 'var(--space-2)',
                      }}
                    >
                      {service.title}
                    </h2>
                  </div>

                  <Link href={`/services/${service.slug}`} style={{ textDecoration: 'none' }}>
                    <Button variant="primary" size="md">
                      Explore Deep-Dive →
                    </Button>
                  </Link>
                </div>

                <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)', fontStyle: 'italic' }}>
                  “{service.headline}”
                </p>

                <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-6)' }}>
                  {service.summary}
                </p>

                <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
                  <h4 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent-purple-bright)', marginBottom: 'var(--space-3)' }}>
                    Core Diagnostic Vectors
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
                    {service.points.map((pt, i) => (
                      <li key={i} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
                        <span style={{ color: 'var(--color-accent-purple-bright)' }}>•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Supporting Capabilities Section */}
      <Section spacing="lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ maxWidth: '780px', marginBottom: 'var(--space-10)' }}>
            <Badge variant="purple" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
              EXECUTION CAPABILITIES
            </Badge>
            <h2 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 'var(--font-size-3xl)', color: '#fff' }}>
              Supporting Operational Capabilities
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
              The infrastructure that executes and scales our three flagship disciplines.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
            {SUPPORTING_CAPABILITIES.map((cap) => (
              <Card key={cap.group} variant="glass">
                <h3 style={{ fontSize: 'var(--font-size-base)', color: '#fff', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-3)' }}>
                  {cap.group}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {cap.items.map((it, idx) => (
                    <li key={idx} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <span style={{ color: 'var(--color-accent-purple-bright)' }}>›</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
