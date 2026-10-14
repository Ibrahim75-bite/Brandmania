'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';

export const ArtifactGallery: React.FC = () => {
  return (
    <Section
      id="artifacts"
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
            BRAND MATERIALITY &bull; THE EXHIBITION
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
              Evidence In The Execution.
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
              Category leadership cannot live solely in slide presentations or sterile digital pixels.
              It demands tangible physical presence, deliberate scale, and uncompromising execution.
            </p>
          </div>

          {/* Asymmetrical Exhibition Gallery Spaces (Zero cards) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
              gap: 'var(--space-12)',
              alignItems: 'start',
            }}
          >
            {/* Wing 01: Physical Print Edition */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
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
                  alt="BRANDMANIA Physical Print Edition"
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    color: '#8E00FA',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  PLATE I &bull; PHYSICAL ARTIFACT
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: '0 0 var(--space-2)',
                  }}
                >
                  Physical Print Edition
                </h3>
                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Tangible paper presence and deep imperial violet ink values. Engineered for permanent
                  physical impact rather than transient digital feeds.
                </p>
              </div>
            </div>

            {/* Wing 02: Optical Identity Geometry */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'radial-gradient(circle at 50% 50%, rgba(50, 0, 92, 0.35) 0%, #070709 75%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <div style={{ transform: 'scale(1.5)' }}>
                  <BrandEye size="xl" glow={false} />
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    color: '#8E00FA',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  PLATE II &bull; THE ICONIC EMBLEM
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: '0 0 var(--space-2)',
                  }}
                >
                  The Brand Eye
                </h3>
                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Concentric optical geometry engineered for immediate silhouette recall across
                  monumental physical installations and high-definition screens.
                </p>
              </div>
            </div>
          </div>

          {/* Exhibition Philosophy Citation */}
          <div
            style={{
              marginTop: 'var(--space-16)',
              paddingTop: 'var(--space-8)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-xl)',
                fontStyle: 'italic',
                color: '#ffffff',
              }}
            >
              &ldquo;Rare, deliberate, confident, unyielding.&rdquo;
            </div>
            <div
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-light-violet)',
              }}
            >
              The Brand Standard
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
