'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

export const BrandDirectionSection: React.FC = () => {
  const pillars = [
    { num: '01', title: 'Brand Story & Narrative', desc: 'Crafting a defensible corporate narrative that establishes category authority and commands executive respect.' },
    { num: '02', title: 'Tone of Voice', desc: 'Surgical, high-status linguistic precision that cuts through industry noise and communicates mastery.' },
    { num: '03', title: 'Positioning & USP', desc: 'Carving out uncontested market space where competitors are rendered obsolete by comparison.' },
    { num: '04', title: 'Trust Architecture', desc: 'Building institutional certainty and credibility into every customer interaction touchpoint.' },
    { num: '05', title: 'Visual Identity & System', desc: 'A timeless visual standard that remains distinct and prestigious across physical and digital mediums.' },
    { num: '06', title: 'Vision, Mission & Relevance', desc: 'Harmonizing internal enterprise conviction with modern market expectations and generational relevance.' },
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
        <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Section Indicator */}
          <div
            style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-light-violet)',
              marginBottom: 'var(--space-8)',
            }}
          >
            05 / FLAGSHIP I &bull; BRAND DIRECTION
          </div>

          {/* Staggered Editorial Layout: Visual Exhibition First (~60%) + Crisp Architectural Index (~40%) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.85fr)',
              gap: 'clamp(var(--space-8), 4vw, var(--space-16))',
              alignItems: 'start',
            }}
          >
            {/* Visual Exhibition Lead: Poster & Services Artboard (True 1:1 Aspect Ratio, Zero Clipping) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              {/* Deliverable Artboard: True 1080x1080 Aspect Ratio, No Chopped Text */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: '#07050a',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/brand/graphics/artboard-2-services-branding.jpg"
                  alt="BRANDMANIA Services & Branding Architecture Artboard"
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 100vw, 680px"
                  priority
                />
              </div>

              {/* Physical Print Edition Poster: True 2064x2064 Aspect Ratio, No Letterboxing */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: '#07050a',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/brand/textures/brandmania-poster.jpg"
                  alt="BRANDMANIA Physical Print Poster showing folded paper texture and violet ink"
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 100vw, 680px"
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
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: 'var(--space-3)',
                }}
              >
                <span>Authentic Identity Deliverables</span>
                <span>Permanent Physical &amp; Digital Standards</span>
              </div>
            </div>

            {/* Right Column: Narrative & Tight Crisp Architectural Index */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-8)',
                position: 'sticky',
                top: 'var(--space-12)',
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
                    fontWeight: 700,
                    lineHeight: 1.08,
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
                    fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.65,
                    marginTop: 'var(--space-4)',
                    margin: 0,
                  }}
                >
                  Brand Direction is not cosmetic logo design. It is the surgical alignment of what your
                  business is, how it communicates, and what the market perceives. When perception
                  lags behind craftsmanship, pricing power collapses. When perception commands
                  authority, you dictate the terms of trade.
                </p>
              </div>

              {/* Tight Crisp Architectural Index of the 6 Pillars */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {pillars.map((pillar) => (
                  <div
                    key={pillar.num}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: 'var(--space-4) 0',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-family-mono)',
                          fontSize: '11px',
                          color: 'var(--color-brand-light-violet)',
                          fontWeight: 700,
                        }}
                      >
                        {pillar.num}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-family-serif)',
                          fontSize: 'var(--font-size-base)',
                          fontWeight: 600,
                          color: '#ffffff',
                          margin: 0,
                        }}
                      >
                        {pillar.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.5,
                        margin: 0,
                        marginTop: '4px',
                        paddingLeft: '22px',
                      }}
                    >
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
