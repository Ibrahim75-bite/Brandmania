import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { QualificationForm } from '@/presentation/components/forms/QualificationForm';

import { constructMetadata } from '@/infrastructure/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Executive Contact & Confidential Consultation | BRANDMANIA',
  description:
    'Request a confidential executive diagnostic session with BRANDMANIA leadership. Tailored for ambitious brands with ~$700k+ annual revenue trajectory.',
  canonicalPath: '/contact',
});

export default function ContactPage() {
  return (
    <div>
      <Section spacing="lg" style={{ paddingTop: 'var(--space-16)', backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <Badge variant="purple" size="md">
                EXECUTIVE LIAISON
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
              Initiate Strategic Dialogue
            </h1>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
              All inquiries are reviewed directly by executive partners under strict non-disclosure. Complete the diagnostic intake below to schedule your consultation.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', fontSize: '14px', color: '#C4B8D8' }}>
              <span>Operating Locations: <strong style={{ color: '#FAF7FF' }}>London &bull; New York &bull; Dubai / Cairo</strong></span>
              <span>Direct Liaison: <a href="mailto:contact@brandmania.com" style={{ color: '#C882FF', textDecoration: 'none' }}>contact@brandmania.com</a></span>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="xl">
        <Container>
          <QualificationForm />
        </Container>
      </Section>
    </div>
  );
}
