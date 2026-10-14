'use client';

import React, { useState } from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';

interface CognitiveVector {
  step: string;
  name: string;
  mindset: string;
  architecture: string;
}

export const ConsumerScopeSection: React.FC = () => {
  const [activeVector, setActiveVector] = useState<number>(0);

  const vectors: CognitiveVector[] = [
    {
      step: '01',
      name: 'Status Perception & Trust Cues',
      mindset:
        '"Is this brand genuinely superior, or just another vendor trying to sell me something?"',
      architecture:
        'We engineer visual and linguistic status signals that immediately bypass commercial skepticism, positioning your offering as an undeniable authority.',
    },
    {
      step: '02',
      name: 'Price Anchoring & Value Framing',
      mindset:
        '"Why does this cost what it does? Is this an expense or a high-return investment?"',
      architecture:
        'We structure value framing and contrast so your price point is perceived not as a cost, but as an indispensable asset that confers status and certainty.',
    },
    {
      step: '03',
      name: 'Choice Architecture & Friction Removal',
      mindset:
        '"What if this doesn’t work? What if I regret making this decision?"',
      architecture:
        'We map and eliminate friction across the decision journey, removing hesitation, choice overload, and perceived transition risk.',
    },
    {
      step: '04',
      name: 'Post-Purchase Pride of Ownership',
      mindset:
        '"Did I make the right choice? I hope this delivers on what they promised."',
      architecture:
        'We design immediate psychological affirmation rituals that eliminate buyer remorse and confirm the customer’s sophisticated taste.',
    },
    {
      step: '05',
      name: 'Identity & Lifetime Attachment',
      mindset:
        '"This brand represents who I am. I would never consider an alternative."',
      architecture:
        'We transform customers into brand advocates through shared symbolic language, exclusive access, and self-reinforcing loyalty loops.',
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
            FLAGSHIP 03 &bull; BEHAVIORAL ECONOMICS &amp; PERCEPTION
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
              Consumer Scope.
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
              &ldquo;Understand the mind before asking for the capital.&rdquo;
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
              Brand Direction defines who you are. Consumer Scope dictates how the human mind
              interprets, values, and bonds with you at every touchpoint. By applying behavioral
              economics and cognitive psychology, we turn transactional buyers into permanent brand
              champions.
            </p>
          </div>

          {/* Interactive Human Perception System (Zero cards) */}
          <div
            style={{
              paddingTop: 'var(--space-8)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.7fr)',
              gap: 'var(--space-12)',
              alignItems: 'start',
            }}
          >
            {/* Left: Perception Vector Journey */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {vectors.map((vec, idx) => {
                const isActive = activeVector === idx;
                return (
                  <div
                    key={vec.step}
                    onClick={() => setActiveVector(idx)}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingBottom: 'var(--space-6)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-family-mono)',
                          fontSize: '11px',
                          color: isActive ? '#8E00FA' : 'var(--color-text-muted)',
                          fontWeight: 700,
                        }}
                      >
                        STAGE {vec.step}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-family-serif)',
                          fontSize: 'clamp(1.4rem, 2.1vw, 1.9rem)',
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? '#ffffff' : 'var(--color-text-secondary)',
                          margin: 0,
                          transition: 'color var(--transition-fast)',
                        }}
                      >
                        {vec.name}
                      </h3>
                    </div>

                    {isActive && (
                      <div
                        style={{
                          marginTop: 'var(--space-4)',
                          paddingLeft: 'var(--space-8)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'var(--space-3)',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-family-serif)',
                            fontSize: 'var(--font-size-base)',
                            fontStyle: 'italic',
                            color: 'var(--color-brand-light-violet)',
                            lineHeight: 1.5,
                          }}
                        >
                          {vec.mindset}
                        </div>
                        <p
                          style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {vec.architecture}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Psychological Synthesis Commentary with Optical Brand Eye Iris */}
            <div
              style={{
                position: 'sticky',
                top: '120px',
                padding: 'var(--space-8)',
                background: '#0E0E13',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <BrandEye size="sm" />
                <span
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#8E00FA',
                  }}
                >
                  Perception Heuristic
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                  fontWeight: 600,
                  color: '#ffffff',
                  lineHeight: 1.25,
                }}
              >
                People do not buy utilities alone. They buy identity confirmation.
              </div>

              <p
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                When a high-value client purchases from your brand, they are confirming who they are
                to themselves and their peers. If your touchpoints feel transactional or commoditized,
                the psychological attachment dissolves. We make your brand an irreplaceable identity
                asset.
              </p>

              <div
                style={{
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: 'var(--color-brand-light-violet)',
                }}
              >
                Focus: Cognitive Attachment &amp; Pricing Power
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
