'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { BLUR_PLACEHOLDERS } from '@/content/blurPlaceholders';
import { runViewTransition } from '@/presentation/utils/viewTransition';

export const HeroSection: React.FC = () => {
  const [perspective, setPerspective] = useState<'preference' | 'price'>('preference');

  const switchPerspective = useCallback((next: 'preference' | 'price') => {
    runViewTransition(() => {
      setPerspective(next);
    });
  }, []);

  // #4 Keyboard Shortcuts 1 and 2 for Hero Perspective Switcher
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (!isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (e.key === '1') {
          e.preventDefault();
          switchPerspective('preference');
        } else if (e.key === '2') {
          e.preventDefault();
          switchPerspective('price');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [switchPerspective]);

  return (
    <section
      id="hero"
      style={{
        minHeight: '94vh',
        width: '100%',
        maxWidth: '100vw',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        padding: '0 clamp(1.5rem, 3vw, 4rem)',
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* TIER 1: Top Architectural Index Strip (Full-Width 4-Column Hairline Grid) */}
      <div
        className="tabular-nums"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: 'var(--space-4) 0',
          gap: 'var(--space-4)',
          fontFamily: 'var(--font-Mono), monospace',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted, #7c7e94)',
        }}
      >
        <div style={{ color: '#ffffff', fontWeight: 600 }}>
          (01) / BRANDMANIA&reg;
        </div>
        <div>
          BRAND DIRECTION &bull; MARGIN RECOVERY &bull; CONSUMER SCOPE
        </div>
        <div style={{ color: 'var(--color-brand-light-violet, #c084fc)' }}>
          CLIENT THRESHOLD: $700,000+ ANNUAL REVENUE
        </div>
        <div style={{ textAlign: 'right', color: '#ffffff' }}>
          LET&rsquo;S MAKE YOU A MARKET LEADER
        </div>
      </div>

      {/* TIER 2: Centerpiece Visual Stage & Interactive Lens */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(320px, 46vh, 520px)',
          margin: 'clamp(var(--space-4), 2vh, var(--space-6)) 0',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          overflow: 'hidden',
          backgroundColor: '#07050a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Authentic Liquid Violet Marble Texture with 85% Opacity and Blur LQIP */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.85,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <Image
            src="/brand/textures/brandmania-cover-clean.jpg"
            alt="BRANDMANIA — Liquid violet marble materiality cover artwork depicting high-ticket brand perception"
            fill
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDERS.coverClean}
            style={{
              objectFit: 'cover',
              filter: 'contrast(1.35) saturate(1.25) brightness(0.9)',
            }}
            priority
          />
        </div>

        {/* Framing Corner Arcs */}
        <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none' }}>
          <CornerArcs position="top-left" size={140} opacity={0.35} color="#8E00FA" strokeWidth={10} />
        </div>
        <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 2, pointerEvents: 'none' }}>
          <CornerArcs position="top-right" size={140} opacity={0.35} color="#8E00FA" strokeWidth={10} />
        </div>

        {/* Center Stage Brand Eye Watermark Geometry */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(280px, 35vw, 480px)',
            height: 'clamp(280px, 35vw, 480px)',
            zIndex: 2,
            opacity: 0.28,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 40px rgba(142, 0, 250, 0.6))',
          }}
        >
          <BrandEye size="xl" glow={true} idSuffix="heroCenterEye" />
        </div>

        {/* Top-Left Stage Datum Label */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            padding: 'var(--space-4) var(--space-6)',
            fontFamily: 'var(--font-Mono), monospace',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8E00FA' }} />
          <span>TACTILE PERCEPTION STAGE &bull; THE LIQUID COVER TEXTURE</span>
        </div>

        {/* Bottom-Right Sleek Frameless Horizontal Architectural Toggle & 1-Sentence Thesis */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            padding: 'var(--space-4) clamp(var(--space-4), 3vw, var(--space-8))',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            background: 'linear-gradient(180deg, transparent 0%, rgba(7, 7, 9, 0.88) 100%)',
          }}
        >
          {/* Razor-Sharp 1-Sentence Thesis Overlay (Both Perspectives Rendered in SSR DOM) */}
          <div style={{ maxWidth: '640px' }}>
            <AnimatePresence mode="wait">
              {perspective === 'preference' ? (
                <motion.div
                  key="pref"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-serif), Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
                      color: '#ffffff',
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    &ldquo;Strategic brand architecture compounds pricing power and insulates gross margin against commoditization.&rdquo;
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="price"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-serif), Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
                      color: '#ff9494',
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    &ldquo;Uncalibrated media spend without brand authority turns customer acquisition into an unsustainable discount treadmill.&rdquo;
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Semantic definition block ensuring AI extractors and crawlers parse both core perspectives in SSR DOM */}
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
                <dt>Command Preference Perspective</dt>
                <dd>Strategic brand architecture compounds pricing power and insulates gross margin against commoditization.</dd>
                <dt>Compete on Price Perspective</dt>
                <dd>Uncalibrated media spend without brand authority turns customer acquisition into an unsustainable discount treadmill.</dd>
              </dl>
            </div>
          </div>

          {/* Frameless Horizontal Architectural Toggle (Zero SaaS Cards) with Shortcut Keycaps */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              fontFamily: 'var(--font-Mono), monospace',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <button
              type="button"
              onClick={() => switchPerspective('preference')}
              className="hit-slop"
              style={{
                background: perspective === 'preference' ? 'rgba(142, 0, 250, 0.25)' : 'transparent',
                border: 'none',
                borderBottom: perspective === 'preference' ? '2px solid #C084FC' : '1px solid rgba(255, 255, 255, 0.2)',
                color: perspective === 'preference' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                padding: '6px 12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                fontWeight: perspective === 'preference' ? 700 : 400,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>01 COMMAND PREFERENCE</span>
              <kbd style={{ fontSize: '9px', padding: '1px 3px' }}>1</kbd>
            </button>

            <button
              type="button"
              onClick={() => switchPerspective('price')}
              className="hit-slop"
              style={{
                background: perspective === 'price' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                border: 'none',
                borderBottom: perspective === 'price' ? '2px solid #ff6b6b' : '1px solid rgba(255, 255, 255, 0.2)',
                color: perspective === 'price' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                padding: '6px 12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                fontWeight: perspective === 'price' ? 700 : 400,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>02 COMPETE ON PRICE</span>
              <kbd style={{ fontSize: '9px', padding: '1px 3px' }}>2</kbd>
            </button>
          </div>
        </div>
      </div>

      {/* TIER 3: Bottom Monumental Display Lockup (Full 94vw Span) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-6)',
          paddingBottom: 'clamp(var(--space-6), 3vh, var(--space-10))',
          paddingTop: 'var(--space-4)',
        }}
      >
        {/* Massive Instrument Serif H1: "Branded for the Best." */}
        <h1
          style={{
            fontFamily: 'var(--font-Editorial), Georgia, serif',
            fontSize: 'clamp(4.5rem, 10.5vw, 11.5rem)',
            fontWeight: 400,
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            margin: 0,
            padding: 0,
          }}
        >
          Branded for{' '}
          <em
            style={{
              fontFamily: 'var(--font-Editorial), Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#C882FF',
            }}
          >
            the Best.
          </em>
        </h1>

        <div style={{ maxWidth: '30rem', paddingBottom: 'clamp(0.5rem, 1.5vw, 1.8rem)' }}>
          <p
            style={{
              margin: '0 0 1.25rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'var(--font-sans), sans-serif',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
              lineHeight: 1.55,
            }}
          >
            We rebuild how your brand is perceived, seal silent commercial leakage, and engineer category preference.
          </p>
          {/* Quiet, direct path for ready decision-makers. */}
          <a
            href="#qualification"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-Sans), -apple-system, sans-serif',
              fontSize: 'clamp(14px, 1.1vw, 18px)',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textDecoration: 'none',
              borderBottom: '1px solid #C882FF',
              paddingBottom: '4px',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#C882FF';
              e.currentTarget.style.borderBottomWidth = '2px';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderBottomWidth = '1px';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Request Strategic Consultation</span>
            <ArrowUpRight size={20} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
};
