'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

interface CapabilityColumn {
  roman: string;
  domain: string;
  activates: string;
  thesis: string;
  items: string[];
}

export const CapabilitiesSection: React.FC = () => {
  const columns: CapabilityColumn[] = [
    {
      roman: 'I',
      domain: 'Marketing, Growth & Creative Media',
      activates: 'Activates: Consumer Scope & Margin Recovery',
      thesis:
        'Performance-driven customer acquisition that respects brand authority. We acquire high-value clients without diluting category standing or cheapening market perception.',
      items: [
        'Digital Marketing Architecture',
        'Engineered Growth Marketing',
        'High-Intent Performance Media',
        'Strategic Brand Content Creation',
        'Performance Content Production',
      ],
    },
    {
      roman: 'II',
      domain: 'Strategic Business & Operational Management',
      activates: 'Activates: Margin Recovery & Velocity',
      thesis:
        'Operational, financial, and organizational alignment ensuring fulfillment runs with extreme precision, unit economics remain healthy, and margins are preserved.',
      items: [
        'Finance & Unit Economics Optimization',
        'Strategic Operational Management',
        'Cross-Functional Team Orchestration',
        'Complex Project Management & Velocity',
      ],
    },
    {
      roman: 'III',
      domain: 'AI Connected Systems & Automation',
      activates: 'Activates: Operational Leverage & Speed',
      thesis:
        'Deploying AI for operational velocity, workflow automation, and predictive data intelligence — strictly governed by human creative strategy and executive judgment.',
      items: [
        'AI Workflow Automation',
        'Connected Pipeline Architecture',
        'Operational Overhead Elimination',
        'Real-Time Commercial Diagnostics',
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
            SUPPORTING CAPABILITIES &bull; ACTIVATING THE FLAGSHIPS
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
              Capabilities in Service of the Flagships.
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
              We do not sell fragmented, checklist services. Every capability we deploy exists
              exclusively to execute and reinforce Brand Direction, Margin Recovery, and Consumer Scope.
            </p>
          </div>

          {/* Editorial 3-Column Broadsheet (Zero cards) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-12)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: 'var(--space-12)',
            }}
          >
            {columns.map((col) => (
              <div
                key={col.roman}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                }}
              >
                {/* Roman Numeral & Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: 'var(--font-size-3xl)',
                      fontWeight: 700,
                      color: '#8E00FA',
                    }}
                  >
                    {col.roman}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '11px',
                      color: 'var(--color-brand-light-violet)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {col.activates}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.3rem, 1.8vw, 1.65rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: 1.25,
                  }}
                >
                  {col.domain}
                </h3>

                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {col.thesis}
                </p>

                {/* Capability Item List */}
                <div
                  style={{
                    marginTop: 'var(--space-4)',
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                  }}
                >
                  {col.items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.05em',
                        color: 'var(--color-text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                      }}
                    >
                      <span style={{ color: '#8E00FA' }}>&bull;</span>
                      <span>{item}</span>
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
