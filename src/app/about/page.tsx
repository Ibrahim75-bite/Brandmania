import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { Card } from '@/presentation/components/primitives/Card';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { BRAND } from '@/content/brand';
import { FOUNDER } from '@/content/founder';

import { constructMetadata } from '@/infrastructure/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Philosophy & Leadership | BRANDMANIA',
  description:
    'The philosophy behind BRANDMANIA: Commanding Category Leadership, taking over minds, and engineering market leaders.',
  canonicalPath: '/about',
});

const FLAGSHIPS = [
  {
    index: '05',
    title: 'Flagship I • Brand Direction',
    headline: 'Perception Sovereignty & Aesthetic Authority',
    description:
      'Transcending superficial design trends. We construct imperial rarity, narrative clarity, and unmatched authority so premium brands never plead for attention or compete on discount.',
  },
  {
    index: '06',
    title: 'Flagship II • Margin Recovery',
    headline: 'Commercial Value-Chain Diagnostic',
    description:
      'We audit and repair the 6 verified stages of commercial leakage across planning, marketing, sales, fulfillment, customer service, and retention before risking growth capital.',
  },
  {
    index: '07',
    title: 'Flagship III • Consumer Scope',
    headline: 'Neuro-Marketing & Behavioral Attachment',
    description:
      'Engineering every brand touchpoint through behavioral economics, psychological pricing, and customer attachment mechanisms that convert casual purchasers into lifelong brand advocates.',
  },
];

export default function AboutPage() {
  return (
    <div>
      {}
      <Section
        spacing="lg"
        style={{
          paddingTop: 'var(--space-16)',
          backgroundColor: 'var(--color-bg-surface)',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}
      >
        <Container>
          <div style={{ maxWidth: '840px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <Badge variant="neutral" size="md">
                Strategic philosophy
              </Badge>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-5xl)',
                fontWeight: 400,
                color: '#fff',
                marginBottom: 'var(--space-4)',
                lineHeight: 1.1,
              }}
            >
              Commanding Category Leadership
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-xl)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              &ldquo;{BRAND.tagline}&rdquo; &bull; &ldquo;{BRAND.internalPhilosophy}&rdquo;
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-base)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--line-height-relaxed)',
              }}
            >
              BRANDMANIA exists to resolve the central commercial dilemma: why ambitious enterprises with exceptional products consistently lose margin to commoditization and fail to retain enterprise pricing power.
            </p>
          </div>
        </Container>
      </Section>

      {}
      <Section spacing="xl">
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-12)',
              marginBottom: 'var(--space-16)',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 'var(--font-size-xs)',
                  fontFamily: 'var(--font-mono), monospace',
                  letterSpacing: '0.02em',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Core principles
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 400,
                  color: '#fff',
                  marginTop: 'var(--space-2)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                The Commercial Doctrine
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-4)' }}>
                We reject the agency model that sells ad spend and deliverables to businesses that cannot retain profit. Marketing is not an expense line to be bloated&mdash;it is the strategic acceleration of a finely tuned commercial machine.
              </p>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-4)' }}>
                Our conviction is clear: <strong>Let&apos;s make you a market leader.</strong> That demands fixing the operational machine before buying traffic, defining unassailable brand direction, and mastering consumer decision psychology.
              </p>
              <div
                style={{
                  padding: 'var(--space-4) var(--space-6)',
                  borderLeft: '2px solid rgba(255, 255, 255, 0.28)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-primary)',
                }}
              >
                &ldquo;Bugatti, Not Toyota. Rare • Engineered • Controlled • Category dominant.&rdquo;
              </div>
            </div>

            {}
            <Card
              variant="elevated"
              style={{
                padding: 'var(--space-8)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <BrandEye size="sm" />
                <div>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', color: '#fff', margin: 0, fontWeight: 500 }}>
                    {FOUNDER.name}
                  </h3>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono), monospace' }}>
                    {FOUNDER.role}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-6)' }}>
                {FOUNDER.biography}
              </p>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-4)' }}>
                <h4
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    letterSpacing: '0.02em',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--space-3)',
                    fontFamily: 'var(--font-mono), monospace',
                  }}
                >
                  Strategic credentials
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {FOUNDER.credentials.map((cred, idx) => (
                    <li key={idx} style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>&bull;</span>
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          {}
          <div
            style={{
              borderTop: '1px solid var(--color-border-subtle)',
              paddingTop: 'var(--space-12)',
              marginBottom: 'var(--space-16)',
            }}
          >
            <div style={{ maxWidth: '720px', marginBottom: 'var(--space-8)' }}>
              <span
                style={{
                  fontSize: 'var(--font-size-xs)',
                  fontFamily: 'var(--font-mono), monospace',
                  letterSpacing: '0.02em',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Proprietary architecture
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 400,
                  color: '#fff',
                  marginTop: 'var(--space-2)',
                }}
              >
                The Three Flagships
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                Our proprietary three-part operational model resolving positioning, cash leaks, and behavioral retention.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--space-6)',
              }}
            >
              {FLAGSHIPS.map((flagship) => (
                <div
                  key={flagship.index}
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: '#0A0A0E',
                    padding: 'var(--space-8)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-primary)',
                      letterSpacing: '0.02em',
                    }}
                    className="tabular-nums"
                  >
                    ({flagship.index}) / {flagship.title}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: 'var(--font-size-xl)',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      margin: 0,
                    }}
                  >
                    {flagship.headline}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 'var(--line-height-relaxed)',
                      margin: 0,
                    }}
                  >
                    {flagship.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/#consultation" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                Consult With Leadership →
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
