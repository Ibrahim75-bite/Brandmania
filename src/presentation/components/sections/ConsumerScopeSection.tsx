'use client';

import React, { useState } from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';

interface BehavioralDimension {
  id: string;
  name: string;
  principle: string;
  application: string;
}

export const ConsumerScopeSection: React.FC = () => {
  const [activeDimension, setActiveDimension] = useState<number>(0);

  const dimensions: BehavioralDimension[] = [
    {
      id: '01',
      name: 'Perceived Value',
      principle: 'Perception dictates willingness-to-pay far more than production cost.',
      application:
        'When market perception elevates an offering above commodity comparisons, buyers evaluate value by the status and certainty it delivers rather than scrutinizing unit costs.',
    },
    {
      id: '02',
      name: 'Psychological Pricing',
      principle: 'Price resistance is an emotional reaction to uncalibrated value contrast.',
      application:
        'We engineer pricing architecture, tier contrast, and contextual framing so premium figures feel natural and justified, extinguishing discount demands before they arise.',
    },
    {
      id: '03',
      name: 'Emotional Attachment',
      principle: 'Rational logic justifies decisions, but emotional resonance drives them.',
      application:
        'We design visceral brand rituals and communication cues that build irrational customer preference—the deepest moat against competitor feature wars.',
    },
    {
      id: '04',
      name: 'Social Identity',
      principle: 'Customers do not merely buy products; they buy confirmation of who they are.',
      application:
        'We turn your brand into a symbolic badge of self-definition, aligning ownership with the customer’s desired peer recognition and aspirational identity.',
    },
    {
      id: '05',
      name: 'Status Perception',
      principle: 'High-ticket buyers seek risk mitigation and prestige validation.',
      application:
        'Through disciplined visual standards, surgical tone of voice, and uncompromised restraint, we establish institutional prestige that commands immediate respect.',
    },
    {
      id: '06',
      name: 'Enduring Loyalty',
      principle: 'A single transaction is a test; lifetime loyalty is an engineered ecosystem.',
      application:
        'We construct post-purchase affirmation systems and customer experience loops that transform one-time purchasers into generational brand ambassadors.',
    },
    {
      id: '07',
      name: 'Decision-Making Architecture',
      principle: 'Hesitation is caused by perceived transition risk and cognitive friction.',
      application:
        'We map the customer mind across the entire consideration journey, systematically resolving unspoken doubts and removing cognitive friction at the point of decision.',
    },
  ];

  return (
    <Section
      id="consumer-scope"
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
            07 / FLAGSHIP III &bull; CONSUMER SCOPE
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
              Understand the mind
              <br />
              <span style={{ color: 'var(--color-brand-light-violet)', fontStyle: 'italic' }}>
                before asking for the capital.
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
              Consumer Scope is the deliberate application of behavioral economics, cognitive
              psychology, and status perception to your commercial architecture. We decode how customers
              actually make decisions, what triggers their hesitation, and how to engineer natural,
              unshakable brand attachment.
            </p>
          </div>

          {/* Interactive BrandEye Focal Lens Spread (Zero Cards, No A/B Toggles) */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: 'var(--space-12)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
              gap: 'var(--space-12)',
              alignItems: 'center',
            }}
          >
            {/* Left: The Optical Focal Lens (BrandEye Geometry) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: 'var(--space-8)',
                borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '280px',
                  height: '280px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Subtle Concentric Aperture Rings */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '1px solid rgba(142, 0, 250, 0.25)',
                    transition: 'all 0.4s ease-out',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: '18%',
                    borderRadius: '50%',
                    border: '1px dashed rgba(255, 255, 255, 0.15)',
                  }}
                />

                {/* Central Brand Eye Geometry */}
                <BrandEye size="xl" glow={true} />
              </div>

              <div
                style={{
                  marginTop: 'var(--space-6)',
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brand-light-violet)',
                  textAlign: 'center',
                }}
              >
                Cognitive Aperture &bull; Dimension {dimensions[activeDimension].id} of 07
              </div>
            </div>

            {/* Right: The 7 Behavioral Dimensions Selector & In-Place Diagnostic */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Dimensional Selector Line */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  paddingBottom: 'var(--space-4)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {dimensions.map((dim, idx) => {
                  const isActive = activeDimension === idx;
                  return (
                    <button
                      key={dim.id}
                      type="button"
                      onClick={() => setActiveDimension(idx)}
                      style={{
                        padding: '6px 12px',
                        background: isActive ? 'rgba(142, 0, 250, 0.2)' : 'transparent',
                        border: isActive ? '1px solid rgba(142, 0, 250, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                        color: isActive ? '#ffffff' : 'var(--color-text-muted)',
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.06em',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      {dim.name}
                    </button>
                  );
                })}
              </div>

              {/* Active Dimension Diagnostic Spread (Zero Cards) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {dimensions[activeDimension].name}
                </h3>

                <blockquote
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.15rem, 1.4vw, 1.35rem)',
                    fontStyle: 'italic',
                    color: 'var(--color-brand-light-violet)',
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  &ldquo;{dimensions[activeDimension].principle}&rdquo;
                </blockquote>

                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                    marginTop: 'var(--space-2)',
                  }}
                >
                  {dimensions[activeDimension].application}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
