'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';

export const HeroSection: React.FC = () => {
  const [selectedPerspective, setSelectedPerspective] = useState<'preference' | 'price'>('preference');

  return (
    <Section
      spacing="none"
      style={{
        minHeight: '94vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: 'var(--space-20)',
        paddingBottom: 'var(--space-20)',
        overflow: 'hidden',
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Structural Corner Arcs Framing */}
      <CornerArcs position="top-right" size={420} opacity={0.16} color="#8E00FA" />

      {/* Atmospheric Liquid Violet Marble Texture Backdrop (Visibly Rich 55% Opacity with Radial Vignette) */}
      <div
        style={{
          position: 'absolute',
          right: '-5%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(460px, 50vw, 760px)',
          height: 'clamp(460px, 50vw, 760px)',
          borderRadius: '50%',
          overflow: 'hidden',
          opacity: 0.52,
          filter: 'contrast(1.25) brightness(0.9)',
          pointerEvents: 'none',
          zIndex: 0,
          maskImage: 'radial-gradient(circle at 60% 50%, rgba(0, 0, 0, 1) 35%, rgba(0, 0, 0, 0.4) 65%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 60% 50%, rgba(0, 0, 0, 1) 35%, rgba(0, 0, 0, 0.4) 65%, transparent 80%)',
        }}
        aria-hidden="true"
      >
        <Image
          src="/brand/textures/brandmania-cover-clean.jpg"
          alt="BRANDMANIA Campaign Liquid Marble"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <Container>
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
            gap: 'var(--space-12)',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column: Monumental Campaign Assertion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Architectural Datum Line */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
                fontFamily: 'var(--font-family-mono)',
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-light-violet)',
              }}
            >
              <span>BRANDMANIA</span>
              <span style={{ color: 'var(--color-text-muted)' }}>/</span>
              <span>STRATEGIC ADVISORY</span>
              <span style={{ color: 'var(--color-text-muted)' }}>/</span>
              <span>$700,000+ ANNUAL REVENUE</span>
            </div>

            {/* Monumental Headline */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Let&rsquo;s make you a market leader.
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'clamp(3.75rem, 8.2vw, 8.2rem)',
                  fontWeight: 700,
                  lineHeight: 0.96,
                  letterSpacing: '-0.035em',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                Branded For The Best.
              </h1>
            </div>

            {/* Campaign Proposition */}
            <p
              style={{
                fontSize: 'clamp(1.15rem, 1.7vw, 1.45rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.55,
                maxWidth: '640px',
                margin: 0,
                fontWeight: 400,
              }}
            >
              We don&rsquo;t ask how much advertising you should buy. We determine what your brand
              must become, where capital is leaking from your business, and how to engineer undeniable
              category leadership.
            </p>

            {/* Strategic Action Links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-6)',
                flexWrap: 'wrap',
                marginTop: 'var(--space-4)',
              }}
            >
              <a
                href="#qualification"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: '16px 36px',
                  background: '#ffffff',
                  color: '#070709',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  transition: 'background var(--transition-fast), transform var(--transition-fast)',
                }}
              >
                <span>Request Strategic Consultation</span>
                <span>&rarr;</span>
              </a>

              <a
                href="#manifesto"
                style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  transition: 'color var(--transition-fast)',
                }}
              >
                Read The Manifesto &darr;
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Strategic Perspective (No overlapping icons, clean background) */}
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
              paddingLeft: 'var(--space-8)',
              paddingBottom: 'var(--space-2)',
              background: 'rgba(7, 7, 9, 0.7)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: 'var(--color-brand-light-violet)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Strategic Perspective
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.45,
                }}
              >
                How do you intend to scale your business?
              </div>
            </div>

            {/* Perspective Selectors */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '4px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              role="tablist"
              aria-label="Strategic perspective selector"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedPerspective === 'preference'}
                onClick={() => setSelectedPerspective('preference')}
                style={{
                  padding: '10px 14px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-family-mono)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontWeight: selectedPerspective === 'preference' ? 700 : 500,
                  color: selectedPerspective === 'preference' ? '#ffffff' : 'var(--color-text-muted)',
                  background:
                    selectedPerspective === 'preference'
                      ? 'rgba(142, 0, 250, 0.28)'
                      : 'transparent',
                  border:
                    selectedPerspective === 'preference'
                      ? '1px solid rgba(142, 0, 250, 0.6)'
                      : '1px solid transparent',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                Command Preference
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={selectedPerspective === 'price'}
                onClick={() => setSelectedPerspective('price')}
                style={{
                  padding: '10px 14px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-family-mono)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontWeight: selectedPerspective === 'price' ? 700 : 500,
                  color: selectedPerspective === 'price' ? '#ffffff' : 'var(--color-text-muted)',
                  background:
                    selectedPerspective === 'price'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'transparent',
                  border:
                    selectedPerspective === 'price'
                      ? '1px solid rgba(255, 255, 255, 0.2)'
                      : '1px solid transparent',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                Compete On Price
              </button>
            </div>

            {/* Dynamic Perspective Content (Clean Text, No Icon Collisions) */}
            {selectedPerspective === 'preference' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-5)',
                }}
              >
                <div>
                  <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: '#ffffff' }}>
                    01 / Brand Direction
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-secondary)',
                      marginTop: '4px',
                      lineHeight: 1.5,
                    }}
                  >
                    Perception dictates pricing power. Aligning what your business is with what the market perceives sets the ceiling of what you can charge.
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: '#ffffff' }}>
                    02 / Margin Recovery
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-secondary)',
                      marginTop: '4px',
                      lineHeight: 1.5,
                    }}
                  >
                    Fix the machine before buying more traffic. Full commercial data audits across operations to stop silent revenue leakage.
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: '#ffffff' }}>
                    03 / Consumer Scope
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-secondary)',
                      marginTop: '4px',
                      lineHeight: 1.5,
                    }}
                  >
                    Understand the mind before asking for the capital. Decoding behavioral economics, status motivations, and identity attachment.
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-4)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '2px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    color: '#ff6b6b',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  The Commoditization Trap
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: '#ffffff',
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  &ldquo;When price is your only differentiator, margin evaporates before advertising pays for itself.&rdquo;
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  Discounting temporarily lifts sales volume while permanently degrading market perception. Customer acquisition costs climb, customer loyalty drops, and enterprise value stagnates.
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--color-brand-light-violet)',
                    fontFamily: 'var(--font-family-mono)',
                    marginTop: 'var(--space-2)',
                  }}
                >
                  Solution: Transition to engineered brand preference &rarr;
                </div>
              </div>
            )}

            <div
              style={{
                paddingTop: 'var(--space-4)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '11px',
                color: 'var(--color-brand-light-violet)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              Audience Scope: Established Businesses ($700,000+ Annual Revenue)
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
