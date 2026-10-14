'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

export const BrandDirectionSection: React.FC = () => {
  const pillars = [
    { title: 'Brand Story & Narrative', desc: 'Engineering an authentic, defensible corporate narrative that establishes authority and commands attention.' },
    { title: 'Tone of Voice', desc: 'Crafting surgical, high-status language that communicates intellectual clarity and market leadership.' },
    { title: 'Positioning & USP', desc: 'Carving out uncontested category space where competitors are rendered obsolete by comparison.' },
    { title: 'Trust Architecture', desc: 'Building institutional certainty and credibility into every customer interaction touchpoint.' },
    { title: 'Visual Identity & System', desc: 'A timeless visual language that remains distinct and prestigious across all physical and digital expressions.' },
    { title: 'Vision, Mission & Relevance', desc: 'Aligning internal enterprise conviction with modern market expectations and generational relevance.' },
  ];

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
            05 / FLAGSHIP I &bull; BRAND DIRECTION
          </div>

          {/* Monumental Headline & Strategic Premise */}
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
              Aligning what you are
              <br />
              <span style={{ color: 'var(--color-brand-light-violet)', fontStyle: 'italic' }}>
                with what the market perceives.
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
              Brand Direction is not merely an aesthetic refresh or cosmetic logo design. It is the
              rigorous alignment of what your business is, how it communicates, and what the market
              actually perceives. When market perception lags behind your internal craftsmanship, you
              are forced to compete on price. When perception matches your highest standard, you command
              the terms of trade.
            </p>
          </div>

          {/* Museum Exhibition Grid: Editorial Pillars + Authentic Material Artifacts */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
              gap: 'var(--space-12)',
              alignItems: 'flex-start',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: 'var(--space-12)',
            }}
          >
            {/* Left: Complete Discipline Scope */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}
              >
                The Architecture of Brand Direction
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: 'var(--space-6)',
                }}
              >
                {pillars.map((pillar, i) => (
                  <div
                    key={pillar.title}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                      paddingBottom: 'var(--space-4)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 'var(--space-3)',
                        marginBottom: '4px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-family-mono)',
                          fontSize: '11px',
                          color: 'var(--color-brand-light-violet)',
                          fontWeight: 700,
                        }}
                      >
                        0{i + 1}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-family-serif)',
                          fontSize: 'clamp(1.2rem, 1.6vw, 1.45rem)',
                          color: '#ffffff',
                          fontWeight: 600,
                          margin: 0,
                        }}
                      >
                        {pillar.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.6,
                        margin: 0,
                        paddingLeft: '22px',
                      }}
                    >
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Authentic Brand Artifacts (Poster + Branding Deliverable Artboard) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {/* Authentic Physical Print Edition Poster */}
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
                  alt="BRANDMANIA Physical Print Artifact showing folded paper texture and violet ink"
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>

              {/* Authentic Brand Services Identity Artboard */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: '#07050a',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/brand/graphics/artboard-2-services-branding.jpg"
                  alt="BRANDMANIA Brand Architecture and Identity Delivery System"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Permanent Physical & Digital Deliverables</span>
                <span>Craftsmanship Standard</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
