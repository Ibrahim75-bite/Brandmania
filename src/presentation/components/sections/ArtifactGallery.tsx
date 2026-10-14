'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

interface CampaignArtboard {
  id: string;
  title: string;
  format: string;
  imageSrc: string;
  description: string;
}

export const ArtifactGallery: React.FC = () => {
  const [activeArtboard, setActiveArtboard] = useState<number>(0);

  const artboards: CampaignArtboard[] = [
    {
      id: '01',
      title: 'Social Campaign Architecture',
      format: 'Vertical Social & Ad Creative (4:5 Format)',
      imageSrc: '/brand/graphics/artboard-3-services-social.jpg',
      description:
        'Strategic social media creative designed for immediate visual arrest, high narrative density, and premium brand perception across modern algorithmic feeds.',
    },
    {
      id: '02',
      title: 'Brand Mission & Ethos Creative',
      format: 'Campaign Master Visual',
      imageSrc: '/brand/graphics/artboard-1-our.jpg',
      description:
        'The foundational campaign assertion articulating Brandmania’s ethos of uncompromising craftsmanship and market leadership.',
    },
    {
      id: '03',
      title: 'Visual Identity & Iconic Seal',
      format: 'Symbolic Iconography & Mark',
      imageSrc: '/brand/graphics/artboard-4-brand-eye.jpg',
      description:
        'The Brand Eye as an omnipresent cultural seal—instantly communicating precision, optical focus, and premium tier positioning.',
    },
    {
      id: '04',
      title: 'Omni-Channel Campaign Banner',
      format: 'Landscape Agency Banner',
      imageSrc: '/brand/graphics/brandmania-ad-agency-banner.jpg',
      description:
        'High-impact digital outdoor and horizontal campaign banner engineered for category dominance and immediate brand recognition.',
    },
  ];

  return (
    <Section
      id="campaigns"
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
            08 / MEDIA &amp; CAMPAIGN EXECUTION &bull; AUTHENTIC ARTIFACTS
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
              Real Campaign Artifacts.
              <br />
              <span style={{ color: 'var(--color-brand-light-violet)', fontStyle: 'italic' }}>
                Executed for maximum market resonance.
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
              Strategy without uncompromising execution remains theoretical. We design and direct
              high-impact advertising campaigns, social media assets, and commercial creative where
              every frame protects and elevates the brand’s pricing power.
            </p>
          </div>

          {/* Campaign Artboard Selector & Justified Device Showcase */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.25fr)',
              gap: 'var(--space-12)',
              alignItems: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: 'var(--space-12)',
            }}
          >
            {/* Left: Campaign Selector List (Zero cards) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {artboards.map((artboard, idx) => {
                const isActive = activeArtboard === idx;
                return (
                  <button
                    key={artboard.id}
                    type="button"
                    onClick={() => setActiveArtboard(idx)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderLeft: isActive
                        ? '2px solid var(--color-brand-light-violet)'
                        : '2px solid rgba(255, 255, 255, 0.08)',
                      padding: 'var(--space-4) 0 var(--space-4) var(--space-6)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: isActive ? 'var(--color-brand-light-violet)' : 'var(--color-text-muted)',
                      }}
                    >
                      {artboard.format}
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-family-serif)',
                        fontSize: 'clamp(1.2rem, 1.6vw, 1.5rem)',
                        fontWeight: 600,
                        color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                        lineHeight: 1.25,
                      }}
                    >
                      {artboard.title}
                    </div>

                    {isActive && (
                      <p
                        style={{
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--color-text-secondary)',
                          lineHeight: 1.6,
                          margin: 0,
                          marginTop: 'var(--space-2)',
                        }}
                      >
                        {artboard.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: The Justified Phone / Media Frame */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Minimalist Phone Bezel Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '380px',
                  aspectRatio: '9 / 16',
                  borderRadius: '36px',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  background: '#0e0e13',
                  padding: '12px',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(142, 0, 250, 0.1)',
                  overflow: 'hidden',
                }}
              >
                {/* Speaker Notch */}
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '64px',
                    height: '4px',
                    borderRadius: '2px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    zIndex: 2,
                  }}
                />

                {/* Actual Campaign Image Viewport */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '26px',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={artboards[activeArtboard].imageSrc}
                    alt={artboards[activeArtboard].title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 380px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
