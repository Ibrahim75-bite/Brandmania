'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { QualificationForm } from '@/presentation/components/forms/QualificationForm';

export const QualificationSection: React.FC = () => {
  return (
    <Section
      id="qualification"
      spacing="none"
      style={{
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)',
        overflow: 'hidden',
      }}
    >
      <Container>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          {/* Subtle Datum Marker */}
          <div
            style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-light-violet)',
              marginBottom: 'var(--space-12)',
            }}
          >
            STRATEGIC INTAKE &bull; EXECUTIVE CONSULTATION
          </div>

          {/* Monumental Headline */}
          <div style={{ textAlign: 'left', marginBottom: 'var(--space-12)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.75rem, 5.5vw, 4.8rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
                maxWidth: '880px',
              }}
            >
              Request Strategic Consultation.
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 1.35vw, 1.3rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                maxWidth: '740px',
                marginTop: 'var(--space-4)',
                margin: 0,
              }}
            >
              Confidential executive intake aligned for enterprises and high-trajectory ventures
              generating $700,000+ in annual commercial revenue. We analyze your market presence and
              commercial structure prior to convening our initial strategic consultation.
            </p>
          </div>

          {/* Architectural Intake Terminal Frame (Zero SaaS card styling) */}
          <div
            style={{
              background: '#0E0E13',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: 'var(--space-8)',
            }}
          >
            <QualificationForm />
          </div>
        </div>
      </Container>
    </Section>
  );
};
