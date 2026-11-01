'use client';

import React from 'react';
import Image from 'next/image';
import { BookOpenText, ChatText, CrosshairSimple, ShieldCheck, Swatches, Binoculars } from '@phosphor-icons/react';
import { BLUR_PLACEHOLDERS } from '@/content/blurPlaceholders';

export const BrandDirectionSection: React.FC = () => {
  const pillars = [
    { num: '01', title: 'Brand Story & Narrative', desc: 'Crafting defensible corporate authority that commands executive reverence.', icon: BookOpenText },
    { num: '02', title: 'Tone of Voice', desc: 'Surgical linguistic precision that cuts through industry noise and communicates mastery.', icon: ChatText },
    { num: '03', title: 'Positioning & USP', desc: 'Carving out uncontested market space where competitors are rendered obsolete.', icon: CrosshairSimple },
    { num: '04', title: 'Trust Architecture', desc: 'Building institutional certainty and credibility into every customer interaction touchpoint.', icon: ShieldCheck },
    { num: '05', title: 'Visual Identity & System', desc: 'A timeless visual standard distinct and prestigious across physical and digital mediums.', icon: Swatches },
    { num: '06', title: 'Vision, Mission & Relevance', desc: 'Harmonizing internal conviction with market expectations and generational staying power.', icon: Binoculars },
  ];

  return (
    <section
      id="disciplines"
      style={{
        backgroundColor: '#F3F0EA',
        color: '#070709',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        padding: 'clamp(var(--space-16), 8vw, var(--space-28)) clamp(1.5rem, 3vw, 4rem)',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Anchor alias for backwards-compatibility */}
      <div id="brand-direction" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true" />
      
      {/* 12-Column Swiss Grid Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(var(--space-8), 4vw, var(--space-12))',
          alignItems: 'start',
        }}
      >
        {/* Left 5 Columns: Sticky Architectural Headline & Pillar Index */}
        <div
          style={{
            gridColumn: 'span 5',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-8)',
            position: 'sticky',
            top: '100px',
          }}
        >
          {/* Section Datum */}
          <div
            className="tabular-nums"
            style={{
              fontFamily: 'var(--font-Mono), monospace',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#4A0099',
              borderTop: '1px solid rgba(0, 0, 0, 0.18)',
              paddingTop: 'var(--space-3)',
            }}
          >
            (05) / FLAGSHIP I &bull; BRAND DIRECTION
          </div>

          {/* Monumental Instrument Serif Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(3.5rem, 6vw, 6rem)',
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: '#070709',
              margin: 0,
            }}
          >
            Aligning what you are with what the market perceives.
          </h2>

          {/* Clean Numbered Index List of the 6 Pillars */}
          <div
            className="tabular-nums"
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid rgba(0, 0, 0, 0.14)',
            }}
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.num}
                  style={{
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    padding: 'var(--space-3) 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--space-4)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-Mono), monospace',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#4A0099',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {pillar.num}
                    </span>
                    <Icon size={16} color="#070709" weight="bold" />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans), -apple-system, sans-serif',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#070709',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {pillar.title}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans), -apple-system, sans-serif',
                      fontSize: '11px',
                      color: '#66636E',
                      textAlign: 'right',
                      maxWidth: '220px',
                      lineHeight: 1.35,
                    }}
                  >
                    {pillar.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 7 Columns: Massive Uncropped Exhibition Display on Alabaster Surface */}
        <div
          style={{
            gridColumn: 'span 7',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-10)',
          }}
        >
          {/* Master Deliverable Artboard (100% Uncropped on Alabaster Surface, Zero Black Bars) */}
          <div
            style={{
              background: '#F3F0EA',
              border: '1px solid rgba(0, 0, 0, 0.14)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/brand/graphics/artboard-2-services-branding.jpg"
              alt="BRANDMANIA Services &amp; Branding Architecture Deliverable Artboard"
              width={1080}
              height={1080}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDERS.artboard2}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />
            <div
              className="tabular-nums"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 16px',
                fontFamily: 'var(--font-Mono), monospace',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(7, 7, 9, 0.75)',
                background: '#EAE6DC',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              }}
            >
              <span>Brand Services Architecture Master</span>
              <span style={{ color: '#4A0099', fontWeight: 600 }}>100% Legibility Standard</span>
            </div>
          </div>

          {/* Physical Folded Paper Poster (100% Uncropped on Alabaster Surface) */}
          <div
            style={{
              background: '#F3F0EA',
              border: '1px solid rgba(0, 0, 0, 0.14)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/brand/textures/brandmania-poster.jpg"
              alt="BRANDMANIA — Physical folded editorial paper poster detailing brand direction standards"
              width={2064}
              height={2064}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDERS.poster}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div
              className="tabular-nums"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 16px',
                fontFamily: 'var(--font-Mono), monospace',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(7, 7, 9, 0.75)',
                background: '#EAE6DC',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              }}
            >
              <span>Physical Materiality Poster</span>
              <span style={{ color: '#4A0099', fontWeight: 600 }}>Folded Violet Ink</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
