'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { QualificationForm } from '@/presentation/components/forms/QualificationForm';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';

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
      {/* Restrained Titanium Corner Arcs */}
      <CornerArcs position="top-right" size={340} opacity={0.12} color="#8E00FA" />

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
            10 / STRATEGIC CONSULTATION &bull; ADVISORY INTAKE
          </div>

          {/* Open Asymmetric Architectural Layout (Zero Glowing SaaS Boxes) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.25fr)',
              gap: 'var(--space-16)',
              alignItems: 'flex-start',
            }}
          >
            {/* Left Column: Criteria, Engagement Tracks, & Confidentiality */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(2.6rem, 5.2vw, 4.6rem)',
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  Request Strategic
                  <br />
                  <span style={{ color: 'var(--color-brand-light-violet)', fontStyle: 'italic' }}>
                    Consultation.
                  </span>
                </h2>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.65,
                    marginTop: 'var(--space-4)',
                    margin: 0,
                  }}
                >
                  Confidential intake aligned strictly for established businesses ($700,000+ annual
                  revenue) and high-ticket international brands. We conduct an initial market presence
                  and commercial structural review before convening our executive consultation.
                </p>
              </div>

              {/* Engagement Track Guide */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: 'var(--space-6)',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '11px',
                      color: 'var(--color-brand-light-violet)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '2px',
                    }}
                  >
                    Track I &bull; Full Engagement
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    Comprehensive multi-quarter brand direction, commercial margin audit, and performance execution.
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '11px',
                      color: 'var(--color-brand-light-violet)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '2px',
                    }}
                  >
                    Track II &bull; Strategic Consultancy
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    High-impact advisory and architectural diagnostic for businesses evaluating targeted intervention before a full rebuild.
                  </div>
                </div>
              </div>

              {/* Confidentiality Commitment */}
              <div
                style={{
                  padding: 'var(--space-4)',
                  borderLeft: '2px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '10px',
                    color: 'var(--color-text-muted)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  Confidentiality Protocol
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  All commercial data, proprietary positioning notes, and executive discussions are
                  protected under standard non-disclosure confidentiality.
                </div>
              </div>
            </div>

            {/* Right Column: Open Architectural Intake (Zero Glowing Box Shadows) */}
            <div
              style={{
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                paddingLeft: 'var(--space-10)',
              }}
            >
              <QualificationForm />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
