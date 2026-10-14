'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';

export const HeroSection: React.FC = () => {
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
      <CornerArcs position="top-right" size={420} opacity={0.2} color="#8E00FA" />

      {/* Campaign Visual Hero: Liquid Violet Marble Layer + Monolithic Brand Eye */}
      <div
        style={{
          position: 'absolute',
          right: '-5%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(420px, 52vw, 820px)',
          height: 'clamp(420px, 52vw, 820px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        {/* Authentic Liquid Marble Texture Crop */}
        <div
          style={{
            position: 'absolute',
            inset: '12%',
            borderRadius: '50%',
            overflow: 'hidden',
            opacity: 0.28,
            filter: 'contrast(1.2) brightness(0.8)',
          }}
        >
          <Image
            src="/brand/textures/brandmania-cover-clean.jpg"
            alt="BRANDMANIA Campaign Liquid Marble"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* Monolithic Brand Eye Vector */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.85,
          }}
        >
          <BrandEye size="xl" glow={false} />
        </div>
      </div>

      <Container>
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.7fr)',
            gap: 'var(--space-12)',
            alignItems: 'flex-end',
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
              <span>CAMPAIGN 2026</span>
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

          {/* Right Column: Architectural Triad Backbone */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              paddingLeft: 'var(--space-8)',
              paddingBottom: 'var(--space-2)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '11px',
                color: 'var(--color-brand-light-violet)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              The Structural Backbone
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: '#ffffff' }}>
                  01 / Brand Direction
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                    marginTop: '4px',
                    lineHeight: 1.45,
                  }}
                >
                  Perception dictates pricing power. What the market perceives sets the ceiling of what you can charge.
                </div>
              </div>

              <div>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: '#ffffff' }}>
                  02 / Margin Recovery
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                    marginTop: '4px',
                    lineHeight: 1.45,
                  }}
                >
                  Fix the machine before buying more traffic. Stop the silent evaporation of operating cash flow.
                </div>
              </div>

              <div>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: '#ffffff' }}>
                  03 / Consumer Scope
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                    marginTop: '4px',
                    lineHeight: 1.45,
                  }}
                >
                  Understand the mind before asking for the capital. Behavioral economics and identity attachment.
                </div>
              </div>
            </div>

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
              Strategic Scope: $700,000+ Annual Revenue
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
