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

export const metadata: Metadata = {
  title: 'Philosophy & Leadership | BRANDMANIA',
  description:
    'The philosophy behind BRANDMANIA: Decyphering the Dilemma of Branding, taking over minds, and engineering market leaders.',
};

export default function AboutPage() {
  return (
    <div>
      <Section spacing="lg" style={{ paddingTop: 'var(--space-16)', backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <Container>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <Badge variant="purple" size="md">
                STRATEGIC PHILOSOPHY
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
              Decyphering The Dilemma of Branding
            </h1>
            <p style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-accent-purple-bright)', fontStyle: 'italic', marginBottom: 'var(--space-4)' }}>
              “{BRAND.internalPhilosophy}”
            </p>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
              BRANDMANIA exists to resolve the central tension of modern commerce: why ambitious brands with remarkable products consistently fail to retain margin and command their rightful category authority.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="xl">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-12)' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 'var(--font-size-3xl)', color: '#fff', marginBottom: 'var(--space-4)' }}>
                The Commercial Doctrine
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-4)' }}>
                We reject the agency model that sells ad spend and deliverables to businesses that cannot retain profit. Marketing is not an expense line to be bloated—it is the strategic acceleration of a finely tuned commercial machine.
              </p>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
                Our conviction is simple: <strong>Let&apos;s make you a market leader.</strong> That requires fixing the machine before buying traffic, defining strategic brand direction, and mastering consumer psychology.
              </p>
            </div>

            {/* Founder Authority Section */}
            <Card variant="elevated" style={{ padding: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <BrandEye size="sm" />
                <div>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', color: '#fff', margin: 0 }}>
                    {FOUNDER.name}
                  </h3>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-purple-bright)' }}>
                    {FOUNDER.role}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-6)' }}>
                {FOUNDER.biography}
              </p>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-4)' }}>
                <h4 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent-purple-bright)', marginBottom: 'var(--space-3)' }}>
                  Strategic Credentials
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {FOUNDER.credentials.map((cred, idx) => (
                    <li key={idx} style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                      • {cred}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-16)' }}>
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
