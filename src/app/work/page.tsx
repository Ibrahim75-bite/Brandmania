import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { Card } from '@/presentation/components/primitives/Card';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { CASE_STUDIES } from '@/content/case-studies';

export const metadata: Metadata = {
  title: 'Selected Work & Proven Execution | BRANDMANIA',
  description:
    'Evidence-based case studies across jewelry, designer boutiques, and luxury e-commerce. Diagnosing margin leakage, engineering brand direction, and driving growth.',
};

export default function WorkPage() {
  return (
    <div>
      <Section spacing="lg" style={{ paddingTop: 'var(--space-16)', backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <Container>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <Badge variant="purple" size="md">
                AUTHORITY EXHIBITION
              </Badge>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-5xl)',
                color: '#fff',
                marginBottom: 'var(--space-4)',
              }}
            >
              Selected Engagements
            </h1>
            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>
              Rigorous diagnostic interventions across high-ticket jewelry houses, designer boutiques, and premium brands.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="xl">
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {CASE_STUDIES.map((cs) => (
              <Card key={cs.id} variant="elevated" style={{ padding: 'var(--space-10)', border: '1px solid var(--color-border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <span style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent-purple-bright)' }}>
                      {cs.industry} • {cs.location}
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 'var(--font-size-3xl)', color: '#fff', marginTop: 'var(--space-1)' }}>
                      {cs.client}
                    </h2>
                  </div>
                  <Badge variant="purple" size="sm">
                    {cs.confidentialityStatus}
                  </Badge>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', margin: 'var(--space-6) 0' }}>
                  <div>
                    <h4 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
                      Initial Diagnostic Challenge
                    </h4>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-normal)' }}>
                      {cs.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', color: 'var(--color-accent-purple-bright)', marginBottom: 'var(--space-2)' }}>
                      Strategic Intervention
                    </h4>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-normal)' }}>
                      {cs.intervention.summary}
                    </p>
                  </div>
                </div>

                {/* Metrics Table */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', backgroundColor: 'var(--color-bg-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)' }}>
                  {cs.metrics.map((m, idx) => (
                    <div key={idx}>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{m.label}</span>
                      <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: 'var(--color-status-success)', marginTop: 'var(--space-1)' }}>
                        {m.change}
                      </div>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                        {m.before} → {m.after}
                      </span>
                    </div>
                  ))}
                </div>

                <blockquote style={{ margin: 0, borderLeft: '2px solid var(--color-accent-purple-bright)', paddingLeft: 'var(--space-4)', fontStyle: 'italic', color: 'var(--color-text-primary)', fontSize: 'var(--font-size-sm)' }}>
                  {cs.testimonial.quote}
                  <footer style={{ marginTop: 'var(--space-2)', fontStyle: 'normal', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    — {cs.testimonial.author}, {cs.testimonial.title}
                  </footer>
                </blockquote>
              </Card>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-16)' }}>
            <Link href="/#consultation" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                Request Diagnostic for Your Brand →
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
