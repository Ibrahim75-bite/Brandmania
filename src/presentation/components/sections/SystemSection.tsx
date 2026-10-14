'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

interface SystemNode {
  step: string;
  title: string;
  discipline: string;
  description: string;
}

export const SystemSection: React.FC = () => {
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
        'Harmonizes internal craftsmanship with external perception. Eliminates commodity comparison and removes the necessity of price discounting.',
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
        paddingTop: 'var(--space-24)',
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
            04 / THE SYSTEM &bull; CONTINUOUS VALUE CONDUIT
          </div>

          {/* Section Title */}
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                margin: 0,
                maxWidth: '920px',
              }}
            >
              The unbroken causality between
              <br />
              <span style={{ color: 'var(--color-brand-light-violet)', fontStyle: 'italic' }}>
                upstream perception and downstream cash flow.
              </span>
            </h2>
          </div>

          {/* Continuous Staggered Architectural Flow Across the Grid (All 6 Visible Simultaneously) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-6)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: 'var(--space-10)',
            }}
          >
            {nodes.map((node) => (
              <div
                key={node.step}
                style={{
                  borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingLeft: 'var(--space-6)',
                  paddingBottom: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                }}
              >
                {/* Node Step & Discipline Tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--color-brand-light-violet)',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {node.step}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '10px',
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {node.discipline}
                  </span>
                </div>

                {/* Node Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.3rem, 1.8vw, 1.6rem)',
                    fontWeight: 600,
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: 1.25,
                  }}
                >
                  {node.title}
                </h3>

                {/* Node Explanation */}
                <p
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {node.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
