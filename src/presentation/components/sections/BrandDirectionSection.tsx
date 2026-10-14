'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';

export const BrandDirectionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'authority' | 'commodity'>('authority');

  return (
    <Section
      id="brand-direction"
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
            FLAGSHIP 01 &bull; IDENTITY &amp; PERCEPTION
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
              Brand Direction.
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
              &ldquo;How the brand communicates is at least as important as what it communicates.&rdquo;
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
              Brand Direction is not merely a logo or visual guideline. It answers the fundamental
              executive question:{' '}
              <strong style={{ color: '#ffffff' }}>
                What must this brand become, and what must the market perceive?
              </strong>{' '}
              When market perception lags behind craftsmanship, you are forced to discount. When your
              brand communicates undeniable authority, you dictate the terms of trade.
            </p>
          </div>

          {/* Exhibition Spread: Physical Poster Artifact + Typography Analysis */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
              gap: 'var(--space-12)',
              alignItems: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: 'var(--space-12)',
              marginBottom: 'var(--space-16)',
            }}
          >
            {/* Left: Positioning Mechanics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 'var(--space-4)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Positioning Comparison
                </span>

                <div
                  style={{
                    display: 'inline-flex',
                    background: '#0E0E13',
                    padding: '3px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab('commodity')}
                    style={{
                      background: activeTab === 'commodity' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      border: 'none',
                      color: activeTab === 'commodity' ? '#ffffff' : 'var(--color-text-muted)',
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '6px 14px',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    Commodity
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('authority')}
                    style={{
                      background: activeTab === 'authority' ? 'var(--color-brand-primary-violet)' : 'transparent',
                      border: 'none',
                      color: '#ffffff',
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '6px 14px',
                      cursor: 'pointer',
                      fontWeight: 700,
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    Category Authority
                  </button>
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                    color: '#ffffff',
                    fontWeight: 600,
                    lineHeight: 1.25,
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {activeTab === 'authority'
                    ? 'Commands Category Pricing Power'
                    : 'Trapped in Discount Negotiations'}
                </div>
                <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {activeTab === 'authority'
                    ? 'When the market perceives clear distinction and surgical authority, buyers accept pricing without comparison or resistance. Perception dictates pricing power.'
                    : 'Without clear distinction, products are viewed as interchangeable utilities. Customers demand discounts and compare competitor rates.'}
                </p>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                    color: '#ffffff',
                    fontWeight: 600,
                    lineHeight: 1.25,
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {activeTab === 'authority'
                    ? 'Surgical Precision & Tone of Voice'
                    : 'Generic Marketing Adjectives'}
                </div>
                <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {activeTab === 'authority'
                    ? 'Tone of voice is engineered to establish immediate intellectual clarity. Language communicates mastery and intent.'
                    : 'Over-relying on empty marketing superlatives that alert the buyer to an ordinary proposition.'}
                </p>
              </div>
            </div>

            {/* Right: Authentic Physical Print Edition Artifact */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 5',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: '#07050a',
                overflow: 'hidden',
              }}
            >
              <Image
                src="/brand/textures/brandmania-poster.jpg"
                alt="BRANDMANIA Physical Brand Artifact"
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 100vw, 520px"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
