'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

interface CapabilityCluster {
  roman: string;
  name: string;
  supporting: string;
  description: string;
  capabilities: string[];
}

export const CapabilitiesSection: React.FC = () => {
  const clusters: CapabilityCluster[] = [
    {
      roman: 'I',
      name: 'Communication & Growth Execution',
      supporting: 'Tethered to Brand Direction & Consumer Scope',
      description:
        'Customer acquisition and market resonance that respects brand authority. We drive qualified commercial demand without diluting category standing or cheapening market perception.',
      capabilities: [
        'Digital Marketing',
        'Growth Marketing',
        'Performance Marketing',
        'Content Creation',
        'Performance Content Creation',
      ],
    },
    {
      roman: 'II',
      name: 'Commercial & Operational Architecture',
      supporting: 'Tethered to Margin Recovery',
      description:
        'Operational, financial, and organizational alignment ensuring fulfillment runs with extreme precision, unit economics remain healthy, and operating margins are preserved.',
      capabilities: [
        'Finance & Operations',
        'Strategic Management',
        'Team Management',
        'Project Management',
      ],
    },
    {
      roman: 'III',
      name: 'Operational Leverage Systems',
      supporting: 'Accelerating Execution Across All Disciplines',
      description:
        'Deploying intelligent automation and connected systems for operational velocity, workflow acceleration, and real-time commercial data intelligence under human strategic governance.',
      capabilities: [
        'AI Automation',
        'AI Connected Systems',
      ],
    },
  ];

  return (
    <Section
      id="capabilities"
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
        <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
            09 / SUPPORTING CAPABILITIES &bull; THE BROADSHEET INDEX
          </div>

          {/* Monumental Headline */}
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.8rem, 6vw, 5.4rem)',
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              The Exact 11 Capabilities.
              <br />
              <span style={{ color: 'var(--color-brand-light-violet)', fontStyle: 'italic' }}>
                Tethered to the three flagships.
              </span>
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 1.35vw, 1.25rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.65,
                maxWidth: '820px',
                marginTop: 'var(--space-6)',
                margin: 0,
              }}
            >
              Our three flagship disciplines—Brand Direction, Margin Recovery, and Consumer Scope—are
              operationalized through 11 disciplined execution capabilities spanning commercial
              marketing, financial operations, and modern leverage systems.
            </p>
          </div>

          {/* 3-Column Broadsheet Table (Zero cards, 1px titanium hairlines) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 0,
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {clusters.map((cluster, idx) => (
              <div
                key={cluster.roman}
                style={{
                  padding: 'var(--space-10) var(--space-8)',
                  borderRight: idx < 2 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-6)',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--color-brand-light-violet)',
                      letterSpacing: '0.15em',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    CLUSTER {cluster.roman}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: 'clamp(1.35rem, 1.8vw, 1.7rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {cluster.name}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '10px',
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginTop: '6px',
                    }}
                  >
                    {cluster.supporting}
                  </div>
                </div>

                <p
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {cluster.description}
                </p>

                {/* Capabilities List */}
                <div
                  style={{
                    paddingTop: 'var(--space-6)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                  }}
                >
                  {cluster.capabilities.map((cap) => (
                    <div
                      key={cap}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-3)',
                        fontSize: 'var(--font-size-sm)',
                        color: '#ffffff',
                        fontWeight: 500,
                      }}
                    >
                      <span style={{ color: 'var(--color-brand-light-violet)', fontSize: '10px' }}>&bull;</span>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
