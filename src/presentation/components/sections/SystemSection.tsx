'use client';

import React, { useState } from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';

interface SystemNode {
  step: string;
  title: string;
  discipline: string;
  description: string;
}

export const SystemSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const nodes: SystemNode[] = [
    {
      step: '01',
      title: 'Identity & Narrative',
      discipline: 'Brand Direction',
      description:
        'Defines what the brand stands for, its positioning, USP, and authentic tone of voice. Establishes the authoritative foundation before entering the market.',
    },
    {
      step: '02',
      title: 'Market Perception',
      discipline: 'Strategic Alignment',
      description:
        'Harmonizes internal craftsmanship with market perception. Eliminates commodity comparison and removes the necessity of price discounting.',
    },
    {
      step: '03',
      title: 'Consumer Psychology',
      discipline: 'Consumer Scope',
      description:
        'Decodes behavioral biases, status cues, and identity attachment. Transforms transactional buyers into irrational brand advocates.',
    },
    {
      step: '04',
      title: 'Pricing Power',
      discipline: 'Margin Architecture',
      description:
        'Commands premium price elasticity. High perceived value protects enterprise gross margin from competitive price wars.',
    },
    {
      step: '05',
      title: 'Commercial Performance',
      discipline: 'Margin Recovery',
      description:
        'Audits and repairs data leaks across planning, marketing, sales, fulfillment, and service before scaling customer acquisition spend.',
    },
    {
      step: '06',
      title: 'Category Dominance',
      discipline: 'Enduring Enterprise Value',
      description:
        'The cumulative commercial outcome: protected cash flow, high retention, pricing leverage, and defensible market leadership.',
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
        paddingTop: 'var(--space-20)',
        paddingBottom: 'var(--space-24)',
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
              marginBottom: 'var(--space-8)',
            }}
          >
            04 / THE PERCEPTION-TO-PERFORMANCE SPREAD &bull; THE CONTINUOUS VALUE CONDUIT
          </div>

          {/* Section Title */}
          <div style={{ marginBottom: 'var(--space-12)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.2rem, 4.2vw, 3.8rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
                maxWidth: '920px',
              }}
            >
              The unbroken causality between
              <br />
              <span style={{ color: 'var(--color-brand-light-violet)' }}>
                upstream perception and downstream cash flow.
              </span>
            </h2>
          </div>

          {/* Continuous Hairline Stepper Circuit (Zero Cards) */}
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 'var(--space-4)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: 'var(--space-8)',
              marginBottom: 'var(--space-12)',
            }}
          >
            {nodes.map((node, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={node.step}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                    position: 'relative',
                  }}
                >
                  {/* Step Header with Node Indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: isActive ? 'var(--color-brand-light-violet)' : 'rgba(255, 255, 255, 0.25)',
                        boxShadow: isActive ? '0 0 10px var(--color-brand-light-violet)' : 'none',
                        transition: 'all var(--transition-fast)',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: isActive ? 'var(--color-brand-light-violet)' : 'var(--color-text-muted)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {node.step}
                    </span>
                  </div>

                  {/* Title */}
                  <div
                    style={{
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: 'clamp(1rem, 1.25vw, 1.25rem)',
                      fontWeight: 600,
                      color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                      lineHeight: 1.25,
                      transition: 'color var(--transition-fast)',
                    }}
                  >
                    {node.title}
                  </div>

                  {/* Discipline Tag */}
                  <div
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '10px',
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {node.discipline}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Node Detail Spread (Zero Cards, Architectural Layout) */}
          <div
            style={{
              paddingTop: 'var(--space-8)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.35fr) minmax(0, 1fr) minmax(0, 0.3fr)',
              gap: 'var(--space-8)',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: 'var(--color-brand-light-violet)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Active Step &bull; {nodes[activeStep].step}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                {nodes[activeStep].title}
              </div>
            </div>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {nodes[activeStep].description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: 0.6 }}>
              <BrandEye size="md" glow={false} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
