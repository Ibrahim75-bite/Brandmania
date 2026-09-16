import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { LEGAL_CONTENT } from '@/content/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy | BRANDMANIA',
  description: 'BRANDMANIA corporate privacy policy, GDPR compliance, and data governance practices.',
};

export default function PrivacyPage() {
  const policy = LEGAL_CONTENT.privacyPolicy;

  return (
    <Section spacing="xl" style={{ paddingTop: 'var(--space-16)' }}>
      <Container>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Badge variant="purple" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
            LEGAL ARCHITECTURE
          </Badge>
          <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 'var(--font-size-4xl)', color: '#fff', marginBottom: 'var(--space-2)' }}>
            {policy.title}
          </h1>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
            Last Updated: {policy.lastUpdated}
          </p>

          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-purple-bright)', fontStyle: 'italic', marginBottom: 'var(--space-8)' }}>
            {policy.notice}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            {policy.sections.map((sec) => (
              <div key={sec.heading}>
                <h3 style={{ fontSize: 'var(--font-size-lg)', color: '#fff', marginBottom: 'var(--space-2)' }}>
                  {sec.heading}
                </h3>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
