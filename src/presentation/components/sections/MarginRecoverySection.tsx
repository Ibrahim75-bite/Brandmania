'use client';

import React, { useState } from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

interface FlowStage {
  id: string;
  name: string;
  fissure: string;
  remedy: string;
  impact: string;
}

export const MarginRecoverySection: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<number>(0);

  const stages: FlowStage[] = [
    {
      id: '01',
      name: 'Media & Acquisition Inflow',
      fissure:
        'Escalating ad spend into unfocused audiences, creating high top-of-funnel traffic with low commercial intent and rapid creative fatigue.',
      remedy:
        'Filter traffic by high commercial intent, aligning creative communication with brand positioning to eliminate wasted ad spend.',
      impact: 'Protects gross margins and eliminates wasted advertising capital.',
    },
    {
      id: '02',
      name: 'Offer Architecture & Sales Pipeline',
      fissure:
        'Weak offer framing and complex checkout friction force sales teams into discounting and price concessions.',
      remedy:
        'Restructure packaging and pricing tiers so high-value buyers encounter zero cognitive hesitation.',
      impact: 'Restores baseline pricing power and eliminates discount leakage.',
    },
    {
      id: '03',
      name: 'Operational Delivery & Fulfillment',
      fissure:
        'Delivery bottlenecks, supplier friction, and dislocated internal communication create fulfillment delays and rework.',
      remedy:
        'Streamline operational handoffs and delivery mechanisms under clear quality control standards.',
      impact: 'Preserves operating margins during rapid volume scaling.',
    },
    {
      id: '04',
      name: 'Post-Purchase Experience',
      fissure:
        'Zero proactive post-purchase communication allows buyer remorse to fester, triggering cancellation spikes and support overload.',
      remedy:
        'Deploy structured onboarding rituals that immediately validate the buyer’s decision.',
      impact: 'Crushes early refund rates and cements customer loyalty.',
    },
    {
      id: '05',
      name: 'Retention & Lifetime Value',
      fissure:
        'Treating buyers as single-transaction events, forcing the business back onto an expensive, never-ending acquisition treadmill.',
      remedy:
        'Build structured re-engagement loops that unlock recurring lifetime customer value.',
      impact: 'Converts transactional purchasers into permanent brand champions.',
    },
  ];

  return (
    <Section
      id="margin-recovery"
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
            FLAGSHIP 02 &bull; COMMERCIAL INTEGRITY
          </div>

          {/* Monumental Headline */}
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(3rem, 6.5vw, 5.8rem)',
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Margin Recovery.
            </h2>
            <div
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(1.3rem, 2.2vw, 2rem)',
                fontStyle: 'italic',
                color: 'var(--color-brand-light-violet)',
                marginTop: 'var(--space-3)',
              }}
            >
              &ldquo;Fix the machine before buying more traffic.&rdquo;
            </div>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 1.35vw, 1.3rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                maxWidth: '780px',
                marginTop: 'var(--space-4)',
                margin: 0,
              }}
            >
              Attention does not mean revenue. Every business is in the business of making money.
              Before escalating advertising capital, we conduct an exhaustive audit across the
              commercial lifecycle to identify, seal, and recover the critical fissures where
              operating margin quietly bleeds away.
            </p>
          </div>

          {/* Commercial Lifecycle Flow Stream (Zero cards) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
              gap: 'var(--space-12)',
              alignItems: 'start',
              paddingTop: 'var(--space-8)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Left: Lifecycle Audit Pathway */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                Lifecycle Audit Pathway
              </div>

              {stages.map((stage, idx) => {
                const isSelected = selectedStage === idx;
                return (
                  <div
                    key={stage.id}
                    onClick={() => setSelectedStage(idx)}
                    style={{
                      paddingTop: 'var(--space-4)',
                      paddingBottom: 'var(--space-4)',
                      paddingLeft: 'var(--space-4)',
                      borderLeft: isSelected ? '2px solid #8E00FA' : '2px solid rgba(255, 255, 255, 0.1)',
                      background: isSelected ? 'rgba(50, 0, 92, 0.12)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-family-mono)',
                          fontSize: '11px',
                          color: isSelected ? '#8E00FA' : 'var(--color-text-muted)',
                          fontWeight: 700,
                        }}
                      >
                        STAGE {stage.id}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-family-serif)',
                          fontSize: 'var(--font-size-lg)',
                          fontWeight: isSelected ? 700 : 500,
                          color: isSelected ? '#ffffff' : 'var(--color-text-secondary)',
                          transition: 'color var(--transition-fast)',
                        }}
                      >
                        {stage.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Stage Diagnostic & Recovery Analysis */}
            <div
              style={{
                padding: 'var(--space-8)',
                background: '#0E0E13',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: 'var(--space-3)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    color: 'var(--color-brand-light-violet)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  Diagnostic &bull; Stage {stages[selectedStage].id}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-family-mono)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Commercial Integrity
                </span>
              </div>

              {/* The Commercial Fissure */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  The Hidden Fissure (Where Capital Leaks)
                </div>
                <p
                  style={{
                    fontSize: 'var(--font-size-base)',
                    color: '#ffffff',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {stages[selectedStage].fissure}
                </p>
              </div>

              {/* The Strategic Seal */}
              <div
                style={{
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    color: '#8E00FA',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  The Strategic Recovery (How We Seal It)
                </div>
                <p
                  style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {stages[selectedStage].remedy}
                </p>
              </div>

              {/* Net Impact */}
              <div
                style={{
                  padding: 'var(--space-4)',
                  background: 'rgba(50, 0, 92, 0.25)',
                  borderLeft: '2px solid #8E00FA',
                  fontSize: 'var(--font-size-xs)',
                  fontFamily: 'var(--font-family-mono)',
                  color: '#ffffff',
                  letterSpacing: '0.04em',
                }}
              >
                <strong>COMMERCIAL RESULT: </strong>
                {stages[selectedStage].impact}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
