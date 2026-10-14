'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

interface Phase {
  num: string;
  name: string;
  focus: string;
  deliverables: string;
}

export const MethodologySection: React.FC = () => {
  const phases: Phase[] = [
    {
      num: '01',
      name: 'Forensic Diagnostic & Market Audit',
      focus: 'Perception, Funnel & Economics Synthesis',
      deliverables:
        'We audit your public brand touchpoints, commercial funnel stages, and unit economics to pinpoint hidden leakage points across perception, conversion, and fulfillment before proposing any intervention.',
    },
    {
      num: '02',
      name: 'Strategic Architecture & Position Blueprint',
      focus: 'Brand Direction & Margin Restoration Strategy',
      deliverables:
        'We establish your definitive category positioning, executive tone of voice, psychological pricing tiers, and operational stabilization milestones.',
    },
    {
      num: '03',
      name: 'Systemic Touchpoint & Workflow Engineering',
      focus: 'Consumer Scope & Operational Alignment',
      deliverables:
        'Full implementation across every touchpoint: bespoke visual systems, behavioral decision heuristics, post-purchase retention loops, and connected operational pipelines.',
    },
    {
      num: '04',
      name: 'Acquisition Scaling & Margin Governance',
      focus: 'Media Calibration & Category Leadership',
      deliverables:
        'Deploying high-intent acquisition media into a sealed, high-margin commercial machine. Ongoing executive governance of perceived value, customer LTV, and enterprise equity.',
    },
  ];

  return (
    <Section
      id="methodology"
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
            ENGAGEMENT METHODOLOGY &bull; COMMERCIAL RIGOR
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
              Rigor Over Rhetoric.
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
              We do not invent vanity statistics or publish unverified marketing claims. Our credibility
              is founded on factual commercial rigor, transparent diagnostic frameworks, and strict
              client confidentiality.
            </p>
          </div>

          {/* 4-Phase Process Ledger (Zero cards) */}
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            {phases.map((phase) => (
              <div
                key={phase.num}
                style={{
                  paddingTop: 'var(--space-8)',
                  paddingBottom: 'var(--space-8)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'grid',
                  gridTemplateColumns: '80px minmax(0, 1fr) minmax(0, 1.4fr)',
                  gap: 'var(--space-8)',
                  alignItems: 'baseline',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '12px',
                    color: '#8E00FA',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}
                >
                  PHASE {phase.num}
                </span>

                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: 'var(--font-size-xl)',
                      fontWeight: 700,
                      color: '#ffffff',
                      margin: '0 0 var(--space-2)',
                    }}
                  >
                    {phase.name}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '11px',
                      color: 'var(--color-brand-light-violet)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {phase.focus}
                  </div>
                </div>

                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {phase.deliverables}
                </p>
              </div>
            ))}
          </div>

          {/* Institutional Client Confidentiality Commitment */}
          <div
            style={{
              marginTop: 'var(--space-16)',
              padding: 'var(--space-10)',
              background: '#0E0E13',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.7fr)',
              gap: 'var(--space-10)',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#8E00FA',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Executive Discretion Under Non-Disclosure
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 var(--space-3)',
                }}
              >
                Protecting Enterprise Strategy
              </h4>
              <p
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Our client partners operate in highly competitive national and international markets.
                In accordance with mutual non-disclosure agreements, we protect proprietary commercial
                metrics, customer data, and brand strategy files.
              </p>
            </div>

            <div
              style={{
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                paddingLeft: 'var(--space-8)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: '#ffffff',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-3)',
                  fontWeight: 700,
                }}
              >
                Engagement Scope
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 2,
                }}
              >
                <li>&bull; Established product/service craftsmanship</li>
                <li>&bull; Minimum $700,000+ annual revenue</li>
                <li>&bull; Direct founder/executive involvement</li>
                <li>&bull; Willingness to calibrate machine before media scale</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
