'use client';

import React, { useState } from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

interface Tension {
  id: string;
  left: string;
  leftSub: string;
  right: string;
  rightSub: string;
  thesis: string;
}

export const DilemmaSection: React.FC = () => {
  const [activeTension, setActiveTension] = useState<number>(0);

  const tensions: Tension[] = [
    {
      id: '01',
      left: 'ATTENTION',
      leftSub: 'Advertising Impressions Purchased',
      right: 'REVENUE',
      rightSub: 'Net Operating Profit Retained',
      thesis:
        'Purchasing ad impressions into an uncalibrated business model accelerates capital destruction. High acquisition numbers frequently mask the silent evaporation of cash flow across sales friction, fulfillment failures, and churn.',
    },
    {
      id: '02',
      left: 'WHAT YOU SAY',
      leftSub: 'Internal Intention & Craftsmanship',
      right: 'WHAT THEY HEAR',
      rightSub: 'Uncalibrated Market Perception',
      thesis:
        'Leadership believes the brand communicates category leadership. The market registers an ordinary commodity. When narrative precision is absent, buyers default to price comparison, forcing discounting and destroying margin.',
    },
    {
      id: '03',
      left: 'PERCEIVED VALUE',
      leftSub: 'Status & Perceived Worth',
      right: 'PRICE',
      rightSub: 'Discounting & Price Resistance',
      thesis:
        'Customers do not judge price in isolation; they judge it against subconscious status cues and cognitive contrast. Elevating perceived value eliminates price friction and unlocks pricing power.',
    },
    {
      id: '04',
      left: 'INTERNAL REALITY',
      leftSub: 'Product Craftsmanship & Vision',
      right: 'MARKET PERCEPTION',
      rightSub: 'Customer Mindset & Preconception',
      thesis:
        'The best product rarely wins on craftsmanship alone. The market rewards the brand that commands the mental category. If the market cannot instantly decipher your distinction, it does not exist commercially.',
    },
    {
      id: '05',
      left: 'ACQUISITION',
      leftSub: 'First-Time Transaction Churn',
      right: 'RETENTION',
      rightSub: 'Enduring Customer Loyalty Loops',
      thesis:
        'Chasing top-of-funnel buyers without engineering post-purchase psychological validation keeps the business on an exhausting acquisition treadmill. True market leaders build self-compounding customer loyalty ecosystems.',
    },
  ];

  return (
    <Section
      id="dilemma"
      spacing="none"
      style={{
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)',
      }}
    >
      <Container>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
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
            THE STRATEGIC DILEMMA &bull; VISUAL CONFRONTATION
          </div>

          {/* Monumental Headline */}
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.75rem, 5.5vw, 4.8rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
                maxWidth: '960px',
              }}
            >
              The Commercial Contradictions.
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
              Growth does not stall from lack of effort or advertising budget. It stalls when unseen
              structural tensions disconnect commercial reality from market perception.
            </p>
          </div>

          {/* High-Tension Visual Contrast Rows (Zero cards) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {tensions.map((t, idx) => {
              const isSelected = activeTension === idx;
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveTension(idx)}
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: 'var(--space-8)',
                    paddingBottom: 'var(--space-8)',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)',
                    backgroundColor: isSelected ? 'rgba(50, 0, 92, 0.12)' : 'transparent',
                    borderLeft: isSelected ? '3px solid #8E00FA' : '3px solid transparent',
                    paddingLeft: 'var(--space-6)',
                    paddingRight: 'var(--space-6)',
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 0.6fr)',
                      gap: 'var(--space-8)',
                      alignItems: 'center',
                    }}
                  >
                    {/* Visual Confrontation Elements */}
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-family-mono)',
                          fontSize: '11px',
                          letterSpacing: '0.15em',
                          color: isSelected ? '#8E00FA' : 'var(--color-text-muted)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        CONTRAST {t.id}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          flexWrap: 'wrap',
                          gap: 'var(--space-4)',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-family-serif)',
                            fontSize: 'clamp(1.6rem, 2.7vw, 2.6rem)',
                            fontWeight: 700,
                            color: isSelected ? '#ffffff' : 'var(--color-text-secondary)',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {t.left}
                        </span>

                        <span
                          style={{
                            fontFamily: 'var(--font-family-mono)',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: 'var(--color-brand-light-violet)',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                          }}
                        >
                          VS.
                        </span>

                        <span
                          style={{
                            fontFamily: 'var(--font-family-serif)',
                            fontSize: 'clamp(1.6rem, 2.7vw, 2.6rem)',
                            fontWeight: 700,
                            color: isSelected ? '#ffffff' : 'var(--color-text-secondary)',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {t.right}
                        </span>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          gap: 'var(--space-8)',
                          marginTop: 'var(--space-2)',
                          fontSize: '11px',
                          fontFamily: 'var(--font-family-mono)',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        <span>{t.leftSub}</span>
                        <span>&rarr;</span>
                        <span>{t.rightSub}</span>
                      </div>
                    </div>

                    {/* Thesis Breakdown */}
                    <div>
                      <p
                        style={{
                          fontSize: 'var(--font-size-sm)',
                          color: isSelected ? '#ffffff' : 'var(--color-text-secondary)',
                          lineHeight: 1.6,
                          margin: 0,
                          transition: 'color var(--transition-fast)',
                        }}
                      >
                        {t.thesis}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />
          </div>

          {/* Strategic Synthesis Link */}
          <div
            style={{
              marginTop: 'var(--space-12)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
            }}
          >
            <div style={{ fontSize: 'var(--font-size-base)', color: '#ffffff', fontWeight: 500 }}>
              Resolving these contradictions requires more than advertising spend.{' '}
              <span style={{ color: 'var(--color-brand-light-violet)' }}>
                It requires an integrated strategic architecture.
              </span>
            </div>
            <a
              href="#system"
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#8E00FA',
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              See The Integrated System &darr;
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
};
