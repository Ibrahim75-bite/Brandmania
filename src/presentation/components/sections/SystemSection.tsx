'use client';

import React, { useState } from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';

interface SystemNode {
  step: string;
  title: string;
  discipline: string;
  thesis: string;
}

export const SystemSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const nodes: SystemNode[] = [
    {
      step: '01',
      title: 'Brand Direction',
      discipline: 'Foundation & Positioning',
      thesis:
        'Answers what the brand must become and what the market must perceive. Establishes enterprise identity, narrative authority, and pricing power.',
    },
    {
      step: '02',
      title: 'Perception',
      discipline: 'Market Perception & Value',
      thesis:
        'Controls how the market decodes your craftsmanship. Elevates the brand out of commodity comparisons and protects your pricing margins.',
    },
    {
      step: '03',
      title: 'Consumer Behavior',
      discipline: 'Psychology & Decision Framing',
      thesis:
        'Applies behavioral economics to remove customer hesitation and design touchpoints that turn market perception into emotional attachment.',
    },
    {
      step: '04',
      title: 'Marketing & Media',
      discipline: 'High-Intent Acquisition',
      thesis:
        'Drives qualified prospective buyers into a calibrated commercial experience that respects the brand’s positioning.',
    },
    {
      step: '05',
      title: 'Commercial Margin',
      discipline: 'Unit Economics & Profit Retention',
      thesis:
        'Audits and seals structural leaks across fulfillment, sales pipelines, and customer journeys before media capital is scaled.',
    },
    {
      step: '06',
      title: 'Operations & Fulfillment',
      discipline: 'Fulfillment Velocity & Capacity',
      thesis:
        'Removes operational friction and aligns delivery mechanisms so the business can scale without quality degradation.',
    },
    {
      step: '07',
      title: 'Management & Organization',
      discipline: 'Silo Elimination & Alignment',
      thesis:
        'Harmonizes brand promises with operational realities, ensuring brand, marketing, and operations function as one organism.',
    },
    {
      step: '08',
      title: 'AI & Connected Systems',
      discipline: 'Automation & Execution Speed',
      thesis:
        'Automates operational bottlenecks and data pipelines under human strategic governance, maximizing execution speed.',
    },
    {
      step: '09',
      title: 'Market Leadership',
      discipline: 'Category Authority & Dominance',
      thesis:
        'The cumulative commercial result: pricing power, enduring customer loyalty, protected margins, and category leadership.',
    },
  ];

  return (
    <Section
      id="system"
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
            THE BRANDMANIA SYSTEM &bull; STRUCTURAL CIRCUIT
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
              An Integrated Pipeline, Not Disjointed Tactics.
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
              BRANDMANIA functions as an unbroken circuit. Brand Direction informs Perception; Perception
              governs Consumer Behavior; Behavior drives Commercial Margin; Operations fulfills the promise.
            </p>
          </div>

          {/* Continuous Conduit Layout (Zero cards) */}
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
              gap: 'var(--space-12)',
              alignItems: 'start',
            }}
          >
            {/* Left: Conduit Index */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                paddingLeft: 'var(--space-6)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {nodes.map((node, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={node.step}
                    onClick={() => setActiveStep(idx)}
                    style={{
                      position: 'relative',
                      paddingTop: 'var(--space-4)',
                      paddingBottom: 'var(--space-4)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {/* Active Node Indicator Dot */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '-29px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: isActive ? '11px' : '7px',
                        height: isActive ? '11px' : '7px',
                        borderRadius: '50%',
                        background: isActive ? '#8E00FA' : 'rgba(255, 255, 255, 0.2)',
                        boxShadow: isActive ? '0 0 12px #8E00FA' : 'none',
                        transition: 'all var(--transition-fast)',
                      }}
                    />

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-family-mono)',
                          fontSize: '11px',
                          color: isActive ? '#8E00FA' : 'var(--color-text-muted)',
                          fontWeight: 700,
                        }}
                      >
                        {node.step}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-family-serif)',
                          fontSize: 'clamp(1.2rem, 1.7vw, 1.55rem)',
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? '#ffffff' : 'var(--color-text-secondary)',
                          transition: 'color var(--transition-fast)',
                        }}
                      >
                        {node.title}
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-family-mono)',
                        color: isActive ? 'var(--color-brand-light-violet)' : 'var(--color-text-muted)',
                        marginTop: '2px',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {node.discipline}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Focused Node Theater Display */}
            <div
              style={{
                position: 'sticky',
                top: '120px',
                padding: 'var(--space-10)',
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
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: 'var(--space-4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <BrandEye size="sm" />
                  <span
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '11px',
                      color: '#8E00FA',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                    }}
                  >
                    CIRCUIT STAGE {nodes[activeStep].step} OF 09
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  SYSTEM ARCHITECTURE
                </span>
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.1,
                    margin: 0,
                  }}
                >
                  {nodes[activeStep].title}
                </h3>
                <div
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    fontFamily: 'var(--font-family-mono)',
                    color: 'var(--color-brand-light-violet)',
                    marginTop: 'var(--space-2)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {nodes[activeStep].discipline}
                </div>
              </div>

              <p
                style={{
                  fontSize: 'clamp(1.1rem, 1.3vw, 1.25rem)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {nodes[activeStep].thesis}
              </p>

              <div
                style={{
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-family-mono)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Select any stage to trace the commercial pipeline &uarr;
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-family-mono)',
                    color: 'var(--color-brand-light-violet)',
                    fontWeight: 600,
                  }}
                >
                  Connected Circuit
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
