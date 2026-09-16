import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { LEGAL_CONTENT } from '@/content/legal';

export const metadata: Metadata = {
  title: 'Cookie Policy | BRANDMANIA',
  description: 'BRANDMANIA cookie usage policy, consent governance, and telemetry disclosures.',
};

export default function CookiesPage() {
  return (
    <Section spacing="xl" style={{ paddingTop: 'var(--space-16)' }}>
      <Container>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Badge variant="purple" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
            LEGAL ARCHITECTURE
          </Badge>
          <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 'var(--font-size-4xl)', color: '#fff', marginBottom: 'var(--space-2)' }}>
            Cookie Policy &amp; Telemetry
          </h1>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
            Last Updated: September 2026
          </p>

          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-6)' }}>
            BRANDMANIA employs strict consent gating for any non-essential analytics tracking. No analytical telemetry or third-party marketing tags are initialized unless you explicitly choose to accept them via the Cookie Consent interface.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', color: '#fff', marginBottom: 'var(--space-2)' }}>
                1. Essential Security &amp; Session Cookies
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
                Essential cookies maintain CSRF security tokens, rate-limiting session IDs, and your stored privacy preferences. These cookies cannot be disabled as the website cannot function securely without them.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', color: '#fff', marginBottom: 'var(--space-2)' }}>
                2. Analytical &amp; Performance Telemetry
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
                When granted, analytics cookies help us measure aggregate funnel engagement, VSL watch completion, and conversion drop-off points to optimize site performance.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
