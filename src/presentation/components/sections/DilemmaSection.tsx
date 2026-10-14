'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

export const DilemmaSection: React.FC = () => {
  return (
    <Section
      id="dilemma"
      spacing="none"
      style={{
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-20)',
        overflow: 'hidden',
      }}
    >
      <Container>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          {/* Section Indicator */}
          <div
            style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-light-violet)',
              marginBottom: 'var(--space-10)',
            }}
          >
            03 / THE PERCEPTION-TO-PERFORMANCE SPREAD &bull; THE STRUCTURAL DIVIDE
          </div>

          {/* Monumental Headline */}
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.5rem, 5.2vw, 4.6rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                margin: 0,
                maxWidth: '980px',
              }}
            >
              The structural divide between chasing traffic
              <br />
              <span style={{ color: 'var(--color-brand-light-violet)' }}>
                and commanding market preference.
              </span>
            </h2>
          </div>

          {/* Continuous Split-Plane Architecture (Zero Cards, No Toggles) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
              gap: 0,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Plane A: The Attention Illusion */}
            <div
              style={{
                padding: 'var(--space-12) var(--space-10) var(--space-12) 0',
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-8)',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  The Vulnerable Model
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: 1.15,
                  }}
                >
                  The Attention Illusion
                </h3>
              </div>

              <p
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Treating advertising as a substitute for brand architecture creates an exhausting
                treadmill. Capital is spent to purchase impressions, but absent distinct perception,
                buyers immediately compare price, CAC inflates, and margins erode before fulfillment
                completes.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {[
                  'Buying impressions into an uncalibrated commercial vehicle',
                  'Commodity positioning forcing frequent discount promotions',
                  'Rising customer acquisition costs with declining unit economics',
                  'High top-of-funnel churn without organic brand attachment',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--space-3)',
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: '#ff6b6b', fontWeight: 700 }}>&times;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plane B: The Architectural Advantage */}
            <div
              style={{
                padding: 'var(--space-12) 0 var(--space-12) var(--space-10)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-8)',
                background: 'linear-gradient(90deg, rgba(50, 0, 92, 0.12) 0%, transparent 100%)',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-light-violet)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  The Brandmania Standard
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: 1.15,
                  }}
                >
                  The Architectural Advantage
                </h3>
              </div>

              <p
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                When Brand Direction, Margin Recovery, and Consumer Scope operate as a single
                integrated system, advertising amplifies an already profitable machine. Market
                perception commands pricing power, unit economics are protected, and customer loyalty
                compounds enterprise value.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {[
                  'Brand direction establishes unmatched category perception',
                  'Inelastic demand commanding premium pricing and healthy margins',
                  'Operational data audits sealing leaks across the entire commercial chain',
                  'Enduring identity attachment driving high-retention customer loops',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--space-3)',
                      fontSize: 'var(--font-size-xs)',
                      color: '#ffffff',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: 'var(--color-brand-light-violet)', fontWeight: 700 }}>
                      &check;
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
