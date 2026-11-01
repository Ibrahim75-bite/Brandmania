'use client';

import React, { useState, useRef } from 'react';
import { Section } from '@/presentation/components/layout/Section';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { SpotlightCard } from '@/presentation/components/animations/SpotlightCard';
import { useSafeTriangle } from '@/presentation/hooks/useSafeTriangle';

interface Dimension {
  id: string;
  name: string;
  principle: string;
  thesis: string;
}

export const ConsumerScopeSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('01');
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const { handleRowHover } = useSafeTriangle({
    detailRef: detailPanelRef,
    suppressionDelayMs: 180,
  });

  const dimensions: Dimension[] = [
    {
      id: '01',
      name: 'Perceived Value',
      principle: 'Perception dictates willingness-to-pay far more than production cost.',
      thesis:
        'When market perception elevates an offering above commodity comparisons, buyers evaluate value by status and certainty rather than unit manufacturing cost.',
    },
    {
      id: '02',
      name: 'Psychological Pricing',
      principle: 'Price resistance is an emotional reaction to uncalibrated value contrast.',
      thesis:
        'Engineering pricing architecture and contextual framing so premium figures feel natural, extinguishing discount friction before it arises.',
    },
    {
      id: '03',
      name: 'Emotional Attachment',
      principle: 'Rational logic justifies decisions, but emotional resonance drives them.',
      thesis:
        'Designing visceral brand rituals and communication cues that build irrational customer preference—the deepest moat against competitor feature wars.',
    },
    {
      id: '04',
      name: 'Social Identity',
      principle: 'Customers do not merely buy products; they buy confirmation of who they are.',
      thesis:
        'Turning your brand into a symbolic badge of self-definition, aligning ownership with the customer’s aspirational peer identity.',
    },
    {
      id: '05',
      name: 'Status Perception',
      principle: 'High-ticket buyers seek risk mitigation and prestige validation.',
      thesis:
        'Disciplined visual standards and surgical tone of voice establish institutional prestige that commands immediate market respect.',
    },
    {
      id: '06',
      name: 'Enduring Loyalty',
      principle: 'A single transaction is a test; lifetime loyalty is an engineered ecosystem.',
      thesis:
        'Constructing post-purchase affirmation systems and customer loops that transform one-time purchasers into generational brand ambassadors.',
    },
    {
      id: '07',
      name: 'Decision-Making Architecture',
      principle: 'Hesitation is caused by perceived transition risk and cognitive friction.',
      thesis:
        'Systematically resolving unspoken doubts and removing cognitive friction at the precise psychological point of decision.',
    },
  ];

  return (
    <Section
      id="consumer-scope"
      spacing="none"
      style={{
        background: 'linear-gradient(180deg, #110022 0%, #070709 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 3vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      {/* Monumental BrandEye Watermark in Background (70vw) */}
      <div
        style={{
          position: 'absolute',
          right: '-10vw',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '65vw',
          maxWidth: '920px',
          height: '65vw',
          maxHeight: '920px',
          opacity: 0.045,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <BrandEye size="xl" glow={false} idSuffix="watermark_scope_swiss" />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Tier 1: Swiss Architectural Index Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '0.85rem 0',
            marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.55)',
          }}
        >
          <div>
            <span style={{ color: '#C882FF', marginRight: '6px' }}>(04)</span> / FLAGSHIP III
          </div>
          <div>BEHAVIORAL ECONOMICS &amp; COGNITION</div>
          <div>CONSUMER SCOPE SPECIFICATION</div>
          <div style={{ textAlign: 'right' }}>7 BEHAVIORAL DIMENSIONS</div>
        </div>

        {/* Tier 2: Editorial Monumental Display Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: 0,
              maxWidth: '1200px',
            }}
          >
            Every touchpoint engineered{' '}
            <span
              style={{
                fontStyle: 'italic',
                color: 'var(--color-brand-light-violet, #C882FF)',
              }}
            >
              through human behavior.
            </span>
          </h2>
        </div>

        {/* Tier 3: Edge-to-Edge Architectural Index (7 Dimensions) */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {dimensions.map((dim) => {
            const isActive = activeId === dim.id;
            return (
              <SpotlightCard
                key={dim.id}
                onMouseEnter={() => handleRowHover(() => setActiveId(dim.id))}
                onClick={() => setActiveId(dim.id)}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 0,
                  borderInline: 'none',
                  borderTop: 'none',
                  padding: 'clamp(1.25rem, 2.5vh, 2.25rem) 0',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  background: isActive ? 'rgba(142, 0, 250, 0.05)' : 'transparent',
                }}
                spotlightColor="rgba(200, 130, 255, 0.12)"
              >
                {/* Master Grid Row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(60px, 80px) minmax(260px, 1.4fr) minmax(280px, 1.8fr) minmax(40px, 60px)',
                    gap: 'clamp(1rem, 2vw, 2.5rem)',
                    alignItems: 'center',
                    padding: '0 1rem',
                  }}
                >
                  {/* Step ID */}
                  <div
                    className="tabular-nums"
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: isActive ? '#C882FF' : 'rgba(255, 255, 255, 0.35)',
                      letterSpacing: '0.12em',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {dim.id}
                  </div>

                  {/* Name in Instrument Serif */}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)',
                        fontWeight: 400,
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                        margin: 0,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {dim.name}
                    </h3>
                  </div>

                  {/* Principle Quote */}
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.05rem, 1.35vw, 1.35rem)',
                        color: isActive ? '#C882FF' : 'rgba(255, 255, 255, 0.55)',
                        margin: 0,
                        lineHeight: 1.3,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      &ldquo;{dim.principle}&rdquo;
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '14px',
                      color: isActive ? '#C882FF' : 'rgba(255, 255, 255, 0.25)',
                      textAlign: 'right',
                      transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isActive ? '—' : '+'}
                  </div>
                </div>

                {/* Architectural Behavioral Thesis (Safe Triangle Detail Target, Always Rendered in SSR DOM) */}
                <div
                  ref={isActive ? detailPanelRef : undefined}
                  style={{
                    display: isActive ? 'grid' : 'none',
                    gridTemplateColumns: 'minmax(60px, 80px) minmax(260px, 1.4fr) minmax(280px, 1.8fr) minmax(40px, 60px)',
                    gap: 'clamp(1rem, 2vw, 2.5rem)',
                    padding: '1.25rem 1rem 0.5rem 1rem',
                  }}
                >
                  <div />
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.4)',
                      paddingTop: '4px',
                    }}
                  >
                    BEHAVIORAL THESIS
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.88)',
                        lineHeight: 1.6,
                        margin: 0,
                        maxWidth: '680px',
                      }}
                    >
                      {dim.thesis}
                    </p>
                  </div>
                  <div />
                </div>

                {/* Semantic description node for AI crawler and search indexing extraction */}
                <div
                  style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: 0,
                  }}
                  aria-hidden="false"
                >
                  <dl>
                    <dt>{dim.name} — Core Behavioral Principle</dt>
                    <dd>{dim.principle}</dd>
                    <dt>{dim.name} — Behavioral Thesis</dt>
                    <dd>{dim.thesis}</dd>
                  </dl>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
