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
import { constructMetadata } from '@/infrastructure/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Flagship Disciplines & Strategic Capabilities | BRANDMANIA',
  description:
    'BRANDMANIA combines Margin Recovery, Brand Direction, and Consumer Scope, supported by growth marketing, operations, and AI connected systems.',
  canonicalPath: '/services',
});

export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: '#0D0118', color: '#FAF7FF' }}>
      <Section spacing="lg" style={{ paddingTop: 'clamp(4rem, 8vw, 7rem)', backgroundColor: '#160429', borderBottom: '1px solid rgba(200, 130, 255, 0.16)' }}>
        <Container>
          <div style={{ maxWidth: '860px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <BrandEye size="sm" />
              <Badge variant="purple" size="md">
                STRATEGIC PRACTICES
              </Badge>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                fontWeight: 400,
                color: '#FAF7FF',
                marginBottom: '1.25rem',
                lineHeight: 1.02,
              }}
            >
              The Three Flagship Disciplines
            </h1>
            <p
              style={{
                fontSize: '1.15rem',
                color: '#C4B8D8',
                lineHeight: 1.65,
                maxWidth: '740px',
              }}
            >
              We do not present an arbitrary flat catalogue of agency services. Our three flagship disciplines represent a structured methodology to diagnose leaks, engineer premium market perception, and align customer psychology.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="xl" style={{ backgroundColor: '#0D0118' }}>
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {Object.values(FLAGSHIP_SERVICES).map((service, index) => (
              <Card
                key={service.id}
                variant="elevated"
                style={{
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  backgroundColor: '#160429',
                  border: '1px solid rgba(200, 130, 255, 0.16)',
                  borderRadius: 0,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.14em', color: '#C882FF', fontWeight: 600, textTransform: 'uppercase' }}>
                      Discipline 0{index + 1}
                    </span>
                    <h2
                      style={{
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                        fontWeight: 400,
                        color: '#FAF7FF',
                        marginTop: '0.5rem',
                        lineHeight: 1.1,
                      }}
                    >
                      {service.title}
                    </h2>
                  </div>

                  <Link href={`/services/${service.slug}`} style={{ textDecoration: 'none' }}>
                    <Button variant="primary" size="md">
                      Explore Deep-Dive &rarr;
                    </Button>
                  </Link>
                </div>

                <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '1.3rem', fontStyle: 'italic', color: '#FAF7FF', marginBottom: '1rem', lineHeight: 1.35 }}>
                  &ldquo;{service.headline}&rdquo;
                </p>

                <p style={{ fontSize: '1rem', color: '#C4B8D8', lineHeight: 1.65, marginBottom: '2rem', maxWidth: '820px' }}>
                  {service.summary}
                </p>

                <div style={{ backgroundColor: '#0D0118', padding: '1.5rem', border: '1px solid rgba(200, 130, 255, 0.12)' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11px', letterSpacing: '0.12em', color: '#C882FF', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    Core Diagnostic Vectors
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                    {service.points.map((pt, i) => (
                      <li key={i} style={{ fontSize: '0.92rem', color: '#FAF7FF', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                        <span style={{ color: '#C882FF', fontFamily: 'var(--font-mono), monospace' }}>&bull;</span>
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

      <Section id="capabilities" spacing="lg" style={{ backgroundColor: '#160429', borderTop: '1px solid rgba(200, 130, 255, 0.16)' }}>
        <Container>
          <div style={{ maxWidth: '780px', marginBottom: '3rem' }}>
            <Badge variant="purple" size="sm" style={{ marginBottom: '1rem' }}>
              OPERATIONAL LEVERAGE
            </Badge>
            <h2 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 400, color: '#FAF7FF', lineHeight: 1.1 }}>
              Supporting Operational Capabilities
            </h2>
            <p style={{ color: '#C4B8D8', marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              The infrastructure that executes and scales our three flagship disciplines.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {SUPPORTING_CAPABILITIES.map((cap) => (
              <Card key={cap.group} variant="glass" style={{ backgroundColor: '#0D0118', border: '1px solid rgba(200, 130, 255, 0.16)', padding: '2rem', borderRadius: 0 }}>
                <h3 style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '1.35rem', fontWeight: 400, color: '#FAF7FF', marginBottom: '1.25rem', borderBottom: '1px solid rgba(200, 130, 255, 0.16)', paddingBottom: '0.75rem' }}>
                  {cap.group}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {cap.items.map((it, idx) => (
                    <li key={idx} style={{ fontSize: '0.92rem', color: '#C4B8D8', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ color: '#C882FF', fontFamily: 'var(--font-mono), monospace' }}>&rsaquo;</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(200, 130, 255, 0.16)' }}>
            <Link href="/#qualification" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                Request Strategic Consultation &rarr;
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
