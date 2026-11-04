## FILE: E:\Ibrahim's website\src\presentation\styles\globals.css
```css
@import './tokens.css';
@import './reset.css';

/* Global Swiss Editorial Root */
html,
body {
  background-color: var(--color-bg-base);
  color: var(--color-text-primary);
  font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: var(--font-size-base);
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

/* Headings strictly mapped to Instrument Serif / Editorial Serif (NEVER Arial / sans-serif!) */
h1,
h2,
h3,
h4,
h5,
h6,
blockquote,
.display-headline {
  font-family: var(--font-serif), Georgia, serif !important;
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.05;
  text-wrap: balance;
}

/* Editorial Body Copy with balanced wrapping */
p,
li,
.editorial-p {
  text-wrap: pretty;
}

/* Tabular Numerals (#16) applied to numerals, indexes, metrics, inputs */
.tabular-nums,
input,
select,
textarea,
[data-numeral],
[data-metric],
.font-mono {
  font-variant-numeric: tabular-nums lining-nums;
  -webkit-font-feature-settings: "tnum" 1, "lnum" 1;
  font-feature-settings: "tnum" 1, "lnum" 1;
}

/* Italic Emphasized Editorial Styling */
em,
.font-italic {
  font-family: var(--font-serif), Georgia, serif !important;
  font-style: italic !important;
}

/* Monospace & Datum Code */
code,
kbd,
samp,
.font-mono {
  font-family: var(--font-mono), 'JetBrains Mono', Consolas, monospace !important;
  font-variant-numeric: tabular-nums lining-nums;
}

/* #4 Shortcut Keycaps */
kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 0.4rem;
  font-size: 10px;
  line-height: 1;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
  vertical-align: middle;
}

/* #13 Hit Slop (Expanded Invisible Touch/Click Targets) */
.hit-slop {
  position: relative;
}
.hit-slop::after {
  content: "";
  position: absolute;
  inset: -12px;
  min-width: 44px;
  min-height: 44px;
  pointer-events: auto;
}

/* #18 Continuous Corners (Optical Squircle Smoothing for floating surfaces) */
.squircle-surface {
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
}

/* #14 Safe Area Inset Helper */
.safe-area-header {
  padding-top: max(1rem, env(safe-area-inset-top, 0px));
  padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
  padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
}

.safe-area-bottom {
  padding-bottom: max(1.25rem, env(safe-area-inset-bottom, 0px));
}

/* Lenis Smooth Scroll Recommended Styles */
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}

/* Accessibility Focus Visible */
:focus-visible {
  outline: 2px solid var(--color-brand-neon-violet);
  outline-offset: 2px;
}

/* Scrollbar Customization */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-base);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-sm);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-brand-neon-violet);
}

/* The presentation uses data-dense editorial grids on wide displays. At narrow
   widths those grids become an ordered reading sequence instead of overflow. */
@media (max-width: 760px) {
  [style*='grid-template-columns'][style*='minmax('] {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  #manifesto > div,
  #disciplines > div:last-child {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  #manifesto > div > div,
  #disciplines > div:last-child > div {
    grid-column: 1 / -1 !important;
  }

  #disciplines > div:last-child > div:first-child {
    position: static !important;
  }

  #margin-recovery [style*='grid-template-columns'],
  #consumer-scope [style*='grid-template-columns'] {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  #consumer-scope [style*='minmax(60px'] > :first-child,
  #consumer-scope [style*='minmax(60px'] > :last-child {
    display: none;
  }
}

@keyframes architecturalShimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

```

## FILE: E:\Ibrahim's website\src\presentation\styles\reset.css
```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
}

body {
  min-height: 100vh;
  line-height: var(--line-height-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  background: none;
  border: none;
}

a {
  color: inherit;
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}

```

## FILE: E:\Ibrahim's website\src\presentation\styles\tokens.css
```css
:root {
  /* ============================================================
     BRANDMANIA Tonal Surface Pacing & Color Architecture
     ============================================================ */
  --surface-obsidian: #070709;
  --surface-imperial: linear-gradient(165deg, #1A0033 0%, #090014 100%);
  --surface-exhibition-light: #F3F0EA;
  --color-museum-ink: #09080C;
  --color-museum-violet: #4A0099;
  --color-museum-muted: #2A2830;
  --color-museum-border: rgba(9, 8, 12, 0.12);

  --color-bg-base: var(--surface-obsidian);
  --color-bg-surface: #0e0e13;
  --color-bg-elevated: #161620;
  --color-bg-overlay: rgba(7, 7, 9, 0.88);
  --color-bg-glass: rgba(14, 14, 19, 0.75);

  --color-border-subtle: rgba(168, 85, 247, 0.12);
  --color-border-default: rgba(168, 85, 247, 0.22);
  --color-border-active: rgba(168, 85, 247, 0.55);
  --color-border-glow: rgba(192, 132, 252, 0.75);

  --color-text-primary: #FFFFFF;
  --color-text-secondary: #EAE6F0;
  --color-text-muted: #A8A0B8;
  --color-text-inverse: #070709;

  /* BRANDMANIA Accents: Imperial Royal Violet, Neon & Electric Spectrum */
  --color-brand-deep-violet: #32005c;
  --color-brand-primary-violet: #5e00a8;
  --color-brand-neon-violet: #8e00fa;
  --color-brand-light-violet: #c084fc;

  --color-accent-purple: #5e00a8;
  --color-accent-purple-light: #8e00fa;
  --color-accent-purple-bright: #c084fc;
  --color-accent-purple-dim: rgba(94, 0, 168, 0.16);
  --color-accent-purple-glow: rgba(142, 0, 250, 0.4);

  --color-accent-electric: #8e00fa;
  --color-accent-violet: #5e00a8;
  --color-accent-blue: #6366f1;

  /* Gradients */
  --gradient-brand-primary: linear-gradient(135deg, #8e00fa 0%, #5e00a8 50%, #32005c 100%);
  --gradient-brand-hover: linear-gradient(135deg, #c084fc 0%, #8e00fa 100%);
  --gradient-brand-subtle: linear-gradient(180deg, rgba(94, 0, 168, 0.2) 0%, rgba(7, 5, 10, 0) 100%);
  --gradient-purple-obsidian: radial-gradient(circle at 50% 0%, rgba(142, 0, 250, 0.25) 0%, rgba(7, 5, 10, 0) 70%);
  --gradient-card-surface: linear-gradient(135deg, rgba(22, 16, 36, 0.8) 0%, rgba(14, 10, 22, 0.9) 100%);

  /* Spotlight & Motion Canvas Variables */
  --mouse-x: 50%;
  --mouse-y: 50%;
  --spotlight-color: rgba(142, 0, 250, 0.12);

  /* Legacy mapping mapped to royal violet spectrum */
  --color-accent-gold: #8e00fa;
  --color-accent-gold-light: #c084fc;
  --color-accent-gold-dim: rgba(142, 0, 250, 0.12);
  --color-accent-gold-glow: rgba(142, 0, 250, 0.3);

  /* Semantic Feedback */
  --color-status-success: #10b981;
  --color-status-success-bg: rgba(16, 185, 129, 0.12);
  --color-status-warning: #f59e0b;
  --color-status-warning-bg: rgba(245, 158, 11, 0.12);
  --color-status-error: #ef4444;
  --color-status-error-bg: rgba(239, 68, 68, 0.12);
  --color-status-info: #3b82f6;
  --color-status-info-bg: rgba(59, 130, 246, 0.12);

  /* Editorial Typography Scale - Instrument Serif & Plus Jakarta Sans */
  /* next/font owns --font-serif, --font-sans and --font-mono on <html>. */
  --font-Editorial: var(--font-serif);
  --font-Sans: var(--font-sans);
  --font-Mono: var(--font-mono);
  --font-display: var(--font-serif), Georgia, serif;
  --font-editorial: var(--font-serif), Georgia, serif;
  --font-family-display: var(--font-serif), Georgia, serif;
  --font-family-serif: var(--font-serif), Georgia, serif;
  --font-family-sans: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-mono: var(--font-mono), monospace;

  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  --font-size-6xl: 4rem;      /* 64px */
  --font-size-7xl: 5.5rem;    /* 88px */
  --font-size-hero: clamp(2.5rem, 6vw, 6.5rem);

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.1;
  --line-height-snug: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Spacing Scale */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 18px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Shadows & Glow */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 14px rgba(0, 0, 0, 0.55);
  --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.7);
  --shadow-purple-glow: 0 0 25px rgba(121, 40, 202, 0.3);
  --shadow-purple-lg: 0 8px 36px rgba(121, 40, 202, 0.22);

  /* Elevation / Z-index */
  --z-base: 1;
  --z-sticky: 100;
  --z-dropdown: 200;
  --z-modal: 500;
  --z-toast: 1000;

  /* Motion & Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 400ms cubic-bezier(0.16, 1, 0.3, 1);

  /* Containers */
  --container-max-width: 1280px;
  --container-narrow-width: 860px;
  --container-padding: var(--space-6);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-fast: 0ms !important;
    --transition-base: 0ms !important;
    --transition-slow: 0ms !important;
  }
}

```

## FILE: E:\Ibrahim's website\src\presentation\components\sections\ArtifactGallery.module.css
```css
.section { position: relative; overflow: clip; max-width: 100vw; padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 5rem); background: var(--surface-obsidian); border-bottom: 1px solid rgba(255, 255, 255, .12); }
.anchor { position: absolute; inset: 0 auto auto 0; }
.index { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; padding: .8rem 0; border-block: 1px solid rgba(255, 255, 255, .12); color: rgba(255,255,255,.55); font: 500 10px/1.2 var(--font-mono); letter-spacing: .14em; text-transform: uppercase; }
.index span:first-child { color: #c882ff; }.index span:last-child { text-align: right; }
.header { display: grid; grid-template-columns: minmax(0, 2fr) minmax(16rem, 1fr); gap: clamp(2rem, 8vw, 10rem); align-items: end; margin: clamp(3rem, 8vw, 8rem) 0 clamp(2rem, 5vw, 5rem); }
.header h2,.caption h3 { margin: 0; }.header h2 { max-width: 13ch; color: #fff; font: 400 clamp(3.3rem, 6.6vw, 7rem)/.9 var(--font-serif); letter-spacing: -.04em; }.header h2 em { color: #c882ff; }.header > p { max-width: 30rem; margin: 0; color: rgba(255,255,255,.64); font: 400 .95rem/1.6 var(--font-sans); }
.exhibition { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: clamp(1rem, 2vw, 2rem); }.artifact { grid-column: span 6; min-width: 0; margin: 0; }.wide { grid-column: 3 / span 8; }.artwork { display: flex; align-items: center; justify-content: center; overflow: hidden; background: #0b0b0e; border: 1px solid rgba(255,255,255,.11); }.image { display: block; width: 100%; height: auto; object-fit: contain; }
.caption { display: grid; grid-template-columns: 4.5rem minmax(0, 1fr) minmax(8rem, auto); gap: 1rem; padding: 1rem 0 2.5rem; color: rgba(255,255,255,.48); font: 500 10px/1.35 var(--font-mono); letter-spacing: .11em; text-transform: uppercase; }.caption h3 { color: #fff; font: 400 clamp(1.4rem, 2vw, 2rem)/1.05 var(--font-serif); letter-spacing: -.02em; text-transform: none; }.caption p { max-width: 36rem; margin: .5rem 0 0; color: rgba(255,255,255,.62); font: 400 .82rem/1.55 var(--font-sans); letter-spacing: normal; text-transform: none; }.caption > span:last-child { text-align: right; }
@media (max-width: 760px) { .index { grid-template-columns: repeat(2, minmax(0, 1fr)); font-size: 9px; }.index span:last-child { text-align: left; }.header { grid-template-columns: 1fr; gap: 1.25rem; margin-block: 3rem; }.header h2 { font-size: clamp(3rem, 15vw, 4.7rem); }.artifact,.wide { grid-column: 1 / -1; }.caption { grid-template-columns: 3.5rem minmax(0, 1fr); padding-bottom: 2rem; }.caption > span:last-child { grid-column: 2; text-align: left; } }

```

## FILE: E:\Ibrahim's website\src\presentation\components\sections\ArtifactGallery.tsx
```tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Section } from '@/presentation/components/layout/Section';
import { BLUR_PLACEHOLDERS } from '@/content/blurPlaceholders';
import { ArchitecturalSkeleton } from '@/presentation/components/primitives/ArchitecturalSkeleton';
import { runViewTransition } from '@/presentation/utils/viewTransition';
import styles from './ArtifactGallery.module.css';

interface CampaignArtifact {
  id: string;
  title: string;
  format: string;
  imageSrc: string;
  blurDataURL: string;
  description: string;
  width: number;
  height: number;
  span: 'standard' | 'wide';
}

const artifacts: CampaignArtifact[] = [
  {
    id: '01',
    title: 'Brand Mission & Ethos Creative',
    format: 'Campaign Master Visual',
    imageSrc: '/brand/graphics/artboard-1-our.jpg',
    blurDataURL: BLUR_PLACEHOLDERS.artboard1,
    description: 'The campaign assertion that articulates BRANDMANIA’s ethos of craftsmanship and market leadership.',
    width: 1080,
    height: 1080,
    span: 'standard',
  },
  {
    id: '02',
    title: 'Services & Branding Architecture',
    format: 'Identity Deliverable Artboard',
    imageSrc: '/brand/graphics/artboard-2-services-branding.jpg',
    blurDataURL: BLUR_PLACEHOLDERS.artboard2,
    description: 'A complete view of the Brand Direction system: positioning, frameworks, and visual standards.',
    width: 1080,
    height: 1080,
    span: 'standard',
  },
  {
    id: '03',
    title: 'Social & Feed Campaign System',
    format: 'Social Media Artboard',
    imageSrc: '/brand/graphics/artboard-3-services-social.jpg',
    blurDataURL: BLUR_PLACEHOLDERS.artboard3,
    description: 'A high-density campaign system designed to create recognition and authority in the feed.',
    width: 1080,
    height: 1080,
    span: 'standard',
  },
  {
    id: '04',
    title: 'The Brand Eye Cultural Seal',
    format: 'Symbolic Iconography',
    imageSrc: '/brand/graphics/artboard-4-brand-eye.jpg',
    blurDataURL: BLUR_PLACEHOLDERS.artboard4,
    description: 'The Brand Eye as a symbol of focus, symmetry, and executive standard.',
    width: 1080,
    height: 1080,
    span: 'standard',
  },
  {
    id: '05',
    title: 'Omni-Channel Agency Banner',
    format: 'Landscape Master Banner',
    imageSrc: '/brand/graphics/brandmania-ad-agency-banner.jpg',
    blurDataURL: BLUR_PLACEHOLDERS.agencyBanner,
    description: 'A panoramic campaign asset for high-visibility digital and physical placements.',
    width: 1920,
    height: 1080,
    span: 'wide',
  },
];

export const ArtifactGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // #7 Programmatic Preloading of Adjacent Images
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const nextIdx = (activeIndex + 1) % artifacts.length;
    const prevIdx = (activeIndex - 1 + artifacts.length) % artifacts.length;

    const imgNext = new window.Image();
    imgNext.src = artifacts[nextIdx].imageSrc;

    const imgPrev = new window.Image();
    imgPrev.src = artifacts[prevIdx].imageSrc;
  }, [activeIndex]);

  // #9 View Transitions on lookbook navigation
  const goToNext = useCallback(() => {
    runViewTransition(() => {
      setImageLoaded(false);
      setActiveIndex((prev) => (prev + 1) % artifacts.length);
    });
  }, []);

  const goToPrev = useCallback(() => {
    runViewTransition(() => {
      setImageLoaded(false);
      setActiveIndex((prev) => (prev - 1 + artifacts.length) % artifacts.length);
    });
  }, []);

  // #4 Keyboard Shortcuts (← / →) when not inside form inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (!isInput && !e.metaKey && !e.ctrlKey) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  const active = artifacts[activeIndex];

  return (
    <Section id="work" spacing="none" className={styles.section}>
      <div id="campaigns" className={styles.anchor} aria-hidden="true" />
      
      {/* Top Section Index Bar */}
      <div className={`${styles.index} tabular-nums`}>
        <span>(08) / SELECTED ARTIFACTS</span>
        <span>CAMPAIGN ARTIFACT LOOKBOOK</span>
        <span>FIVE ORIGINAL EXHIBITS</span>
        <span>DISPLAYED AT NATURAL RATIO</span>
      </div>

      <header className={styles.header}>
        <h2>
          Proof of craft, not <em>manufactured proof.</em>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
          <p>
            Each artifact is shown as created—fully visible, uncropped, without a smartphone bezel or synthetic distortion.
          </p>

          {/* Lookbook Navigation Bar with Hit Slop and Shortcut Hints */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '0.5rem',
            }}
          >
            <button
              onClick={goToPrev}
              className="hit-slop"
              aria-label="Previous artifact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '4px',
                color: '#fff',
                padding: '0.4rem 0.75rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '11px',
                minWidth: '44px',
                minHeight: '44px',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              <CaretLeft size={14} weight="bold" />
              <span>PREV</span>
              <kbd style={{ fontSize: '9px', padding: '1px 3px' }}>←</kbd>
            </button>

            <span
              className="font-mono tabular-nums"
              style={{
                fontSize: '11px',
                color: 'var(--color-brand-neon-violet, #c882ff)',
                letterSpacing: '0.14em',
              }}
            >
              {active.id} / 05
            </span>

            <button
              onClick={goToNext}
              className="hit-slop"
              aria-label="Next artifact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '4px',
                color: '#fff',
                padding: '0.4rem 0.75rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '11px',
                minWidth: '44px',
                minHeight: '44px',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              <span>NEXT</span>
              <kbd style={{ fontSize: '9px', padding: '1px 3px' }}>→</kbd>
              <CaretRight size={14} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      {/* Featured Lookbook Interactive Viewer */}
      <div
        style={{
          border: '1px solid rgba(255, 255, 255, 0.12)',
          marginBottom: 'clamp(2rem, 4vw, 4rem)',
          backgroundColor: '#070709',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
            style={{ position: 'relative', width: '100%' }}
          >
            {/* Image Stage */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxHeight: '75vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0b0b0e',
                overflow: 'hidden',
              }}
            >
              {!imageLoaded && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                  <ArchitecturalSkeleton height="100%" />
                </div>
              )}
              <Image
                src={active.imageSrc}
                alt={`BRANDMANIA ${active.title}`}
                width={active.width}
                height={active.height}
                placeholder="blur"
                blurDataURL={active.blurDataURL}
                onLoad={() => setImageLoaded(true)}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
                priority
              />
            </div>

            {/* Datum Caption */}
            <figcaption className={styles.caption} style={{ padding: '1.25rem 1.5rem' }}>
              <span className="tabular-nums">{active.id} / 05</span>
              <div>
                <h3>{active.title}</h3>
                <p>{active.description}</p>
              </div>
              <span className="font-mono">{active.format}</span>
            </figcaption>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Full SSR DOM Exhibition Grid for Crawlers & Comprehensive Viewing */}
      <div className={styles.exhibition}>
        {artifacts.map((artifact, idx) => (
          <figure
            key={artifact.id}
            className={`${styles.artifact} ${artifact.span === 'wide' ? styles.wide : ''}`}
            onClick={() => {
              runViewTransition(() => {
                setActiveIndex(idx);
                const el = document.getElementById('work');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              });
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.artwork}>
              <Image
                src={artifact.imageSrc}
                alt={`BRANDMANIA ${artifact.title}`}
                width={artifact.width}
                height={artifact.height}
                placeholder="blur"
                blurDataURL={artifact.blurDataURL}
                sizes={
                  artifact.span === 'wide'
                    ? '(max-width: 760px) 100vw, 66vw'
                    : '(max-width: 760px) 100vw, 33vw'
                }
                className={styles.image}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>
            <figcaption className={styles.caption}>
              <span className="tabular-nums">{artifact.id} / 05</span>
              <div>
                <h3>{artifact.title}</h3>
                <p>{artifact.description}</p>
              </div>
              <span>{artifact.format}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
};

```

## FILE: E:\Ibrahim's website\src\presentation\components\sections\BrandDirectionSection.tsx
```tsx
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

```

## FILE: E:\Ibrahim's website\src\presentation\components\sections\BriefingSection.tsx
```tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

export const BriefingSection: React.FC = () => {
  return (
    <Section
      id="briefing"
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
            CINEMATIC INTERLUDE &bull; STRATEGIC BRIEFING
          </div>

          {/* Monumental Headline */}
          <div style={{ marginBottom: 'var(--space-12)' }}>
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
              Resolving The Commercial Dilemma.
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
              An executive analysis of why traditional agency retainers fail, how uncalibrated
              perception caps enterprise valuation, and what is required to command category
              leadership.
            </p>
          </div>

          {/* Full-Width 21:9 Anamorphic Cinema Frame (Zero fake play buttons) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '21 / 9',
              minHeight: '380px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              marginBottom: 'var(--space-12)',
              backgroundColor: '#07050a',
            }}
          >
            <Image
              src="/brand/textures/brandmania-cover.jpg"
              alt="BRANDMANIA Cinematic Artwork"
              fill
              style={{ objectFit: 'cover', opacity: 0.85 }}
              sizes="(max-width: 1200px) 100vw, 1120px"
              priority={false}
            />
            {/* Cinematic Gradient Mask */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(7, 7, 9, 0.25) 0%, rgba(7, 7, 9, 0.88) 100%)',
              }}
            />

            {/* Overlaid Cinema Credits & Title */}
            <div
              style={{
                position: 'absolute',
                bottom: 'var(--space-8)',
                left: 'var(--space-8)',
                right: 'var(--space-8)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-light-violet)',
                  }}
                >
                  FOUNDER EXECUTIVE BRIEFING
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.6rem, 2.7vw, 2.6rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginTop: '4px',
                  }}
                >
                  The Anatomy of Market Leadership
                </div>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}
              >
                Confidential Strategic Review
              </div>
            </div>
          </div>

          {/* Three Thesis Takeaways (Cinematic Subtitles Layout) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-10)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: 'var(--space-8)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: '#8E00FA',
                  letterSpacing: '0.15em',
                  marginBottom: 'var(--space-2)',
                }}
              >
                THESIS 01 &bull; PERCEPTION
              </div>
              <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: '#ffffff', margin: '0 0 var(--space-2)' }}>
                Perception Sets The Valuation Ceiling
              </h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                If the market views your brand as interchangeable, no sales force can defend margins.
                Status must be engineered across every single customer touchpoint.
              </p>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: '#8E00FA',
                  letterSpacing: '0.15em',
                  marginBottom: 'var(--space-2)',
                }}
              >
                THESIS 02 &bull; CAPITAL INTEGRITY
              </div>
              <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: '#ffffff', margin: '0 0 var(--space-2)' }}>
                The Trap of Media Scaling
              </h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Pumping paid traffic into uncalibrated commercial funnels accelerates capital burn.
                Fix the machine before spending capital to buy more traffic.
              </p>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: '#8E00FA',
                  letterSpacing: '0.15em',
                  marginBottom: 'var(--space-2)',
                }}
              >
                THESIS 03 &bull; IDENTITY
              </div>
              <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: '#ffffff', margin: '0 0 var(--space-2)' }}>
                Cognitive Attachment Outlasts Utility
              </h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                High-ticket loyalty is created when customer identity bonds with the brand. Behavioral
                heuristics convert transactional purchasers into permanent brand champions.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

```

## FILE: E:\Ibrahim's website\src\presentation\components\sections\CapabilitiesSection.tsx
```tsx
'use client';

import React, { useState, useRef } from 'react';
import {
  MegaphoneSimple,
  TrendUp,
  Target,
  PenNib,
  VideoCamera,
  Coins,
  Buildings,
  UsersThree,
  Kanban,
  Robot,
  Cpu,
  type Icon,
} from '@phosphor-icons/react';
import { Section } from '@/presentation/components/layout/Section';
import { useSafeTriangle } from '@/presentation/hooks/useSafeTriangle';

interface CapabilityItem {
  name: string;
  desc: string;
  icon: Icon;
}

interface CapabilityCluster {
  roman: string;
  name: string;
  subtitle: string;
  items: CapabilityItem[];
}

export const CapabilitiesSection: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const { handleRowHover } = useSafeTriangle({
    detailRef: detailPanelRef,
    suppressionDelayMs: 180,
  });

  const clusters: CapabilityCluster[] = [
    {
      roman: 'I',
      name: 'Communication & Growth Execution',
      subtitle: 'Digital reach, growth, and performance creative',
      items: [
        {
          name: 'Digital Marketing',
          desc: 'High-status multi-channel communication calibrated to executive and high-ticket consumer psychology.',
          icon: MegaphoneSimple,
        },
        {
          name: 'Growth Marketing',
          desc: 'Data-driven funnel engineering expanding market footprint without discounting brand prestige.',
          icon: TrendUp,
        },
        {
          name: 'Performance Marketing',
          desc: 'Paid media acquisition governed strictly by contribution profit and verified customer lifetime value.',
          icon: Target,
        },
        {
          name: 'Content Creation',
          desc: 'Editorial-grade narrative and visual assets articulating craftsmanship and institutional certainty.',
          icon: PenNib,
        },
        {
          name: 'Performance Content Creation',
          desc: 'High-converting creative assets built for rapid algorithmic arrest and verified buyer action.',
          icon: VideoCamera,
        },
      ],
    },
    {
      roman: 'II',
      name: 'Commercial & Operational Architecture',
      subtitle: 'Finance, strategic management, teams, and delivery',
      items: [
        {
          name: 'Finance & Operations',
          desc: 'Gross margin governance, unit contribution modeling, and capital allocation frameworks.',
          icon: Coins,
        },
        {
          name: 'Strategic Management',
          desc: 'Executive roadmap alignment, category positioning defenses, and market expansion planning.',
          icon: Buildings,
        },
        {
          name: 'Team Management',
          desc: 'High-performance team orchestration, operational accountability, and cross-functional standards.',
          icon: UsersThree,
        },
        {
          name: 'Project Management',
          desc: 'Surgical delivery velocity, milestone governance, and multi-disciplinary operational execution.',
          icon: Kanban,
        },
      ],
    },
    {
      roman: 'III',
      name: 'Operational Leverage Systems',
      subtitle: 'Connected automation and intelligence',
      items: [
        {
          name: 'AI Automation',
          desc: 'Streamlining repetitive operational handoffs, customer workflows, and operational fulfillment friction.',
          icon: Robot,
        },
        {
          name: 'AI Connected Systems',
          desc: 'Unified real-time data pipelines linking marketing inputs, operational handoffs, and financial outputs.',
          icon: Cpu,
        },
      ],
    },
  ];

  return (
    <Section
      id="capabilities"
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 3vw, 4rem)',
        overflow: 'hidden',
      }}
    >
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
          <span style={{ color: '#C882FF', marginRight: '6px' }}>(09)</span> / FULL-SPECTRUM EXECUTION
        </div>
        <div>SUPPORTING ARCHITECTURE</div>
        <div>MARKETING • OPERATIONS • AI</div>
        <div style={{ textAlign: 'right' }}>11 SPECIALIZED DISCIPLINES</div>
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
          Integrated capabilities{' '}
          <span
            style={{
              fontStyle: 'italic',
              color: 'var(--color-brand-light-violet, #C882FF)',
            }}
          >
            across marketing, operations, and AI.
          </span>
        </h2>
      </div>

      {/* Tier 3: Edge-to-Edge 3-Cluster Swiss Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1px',
          background: 'rgba(255, 255, 255, 0.12)',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        {clusters.map((cluster) => (
          <div
            key={cluster.roman}
            style={{
              background: '#070709',
              padding: 'clamp(2rem, 3vh, 3rem) clamp(1.5rem, 2vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* Cluster Top Metadata */}
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: '1.5rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#C882FF',
                  letterSpacing: '0.12em',
                  marginBottom: '0.5rem',
                }}
              >
                CLUSTER {cluster.roman}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                  fontSize: 'clamp(1.75rem, 2.2vw, 2.2rem)',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: '#ffffff',
                  margin: '0 0 0.5rem 0',
                }}
              >
                {cluster.name}
              </h3>
              <div
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.45)',
                  letterSpacing: '0.04em',
                }}
              >
                {cluster.subtitle}
              </div>
            </div>

            {/* Cluster Capability Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cluster.items.map((item) => {
                const Icon = item.icon;
                const isHovered = hoveredItem === item.name;
                return (
                  <div
                    key={item.name}
                    ref={isHovered ? detailPanelRef : undefined}
                    onMouseEnter={() => handleRowHover(() => setHoveredItem(item.name))}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      padding: '1rem',
                      border: isHovered
                        ? '1px solid rgba(200, 130, 255, 0.35)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                      background: isHovered ? 'rgba(142, 0, 250, 0.08)' : 'rgba(255, 255, 255, 0.015)',
                      borderRadius: '2px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                      <Icon size={18} weight="duotone" color={isHovered ? '#C882FF' : 'rgba(255, 255, 255, 0.5)'} />
                      <div
                        style={{
                          fontFamily: 'var(--font-serif), Georgia, serif',
                          fontSize: '1.15rem',
                          color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                        fontSize: '12.5px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

```

## FILE: E:\Ibrahim's website\src\presentation\components\sections\ConsumerScopeSection.tsx
```tsx
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

```

## FILE: E:\Ibrahim's website\src\presentation\components\sections\DilemmaSection.tsx
```tsx
'use client';

import React from 'react';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { Section } from '@/presentation/components/layout/Section';

export const DilemmaSection: React.FC = () => {
  return (
    <Section
      id="dilemma"
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
        width: '100%',
        padding: 0,
      }}
    >
      {/* Full-Bleed Edge-to-Edge Split Plane */}
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          alignItems: 'stretch',
        }}
      >
        {/* Left Half: The Attention Trap (Matte Obsidian #09090C) */}
        <div
          style={{
            backgroundColor: '#09090C',
            padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 5rem)',
            borderRight: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#ff6b6b',
                marginBottom: '1rem',
              }}
            >
              (03) / THE ATTENTION TRAP &bull; COMMODITIZED CHURN
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: 'clamp(2.6rem, 4.5vw, 4.5rem)',
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Traffic buys attention.{' '}
              <span style={{ fontStyle: 'italic', color: '#ff6b6b' }}>
                It does not buy loyalty.
              </span>
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              color: 'rgba(255, 255, 255, 0.65)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '540px',
            }}
          >
            Pouring ad spend into an uncalibrated business model creates an exhausting discount treadmill.
            Without differentiated brand perception, buyers default strictly to price comparison.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '520px' }}>
            {[
              'Purchasing impressions into an uncalibrated commercial funnel',
              'Commodity positioning forcing constant discount dependency',
              'Rising customer acquisition costs with declining unit economics',
              'High top-of-funnel churn without organic brand attachment',
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.65)',
                  lineHeight: 1.5,
                }}
              >
                <XCircle size={18} weight="duotone" color="#ff6b6b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Half: The Brandmania Architecture (Rich Imperial Violet Surface #190033) */}
        <div
          style={{
            background: 'linear-gradient(165deg, #1A0033 0%, #0A0015 100%)',
            padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5rem',
            position: 'relative',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-light-violet, #C882FF)',
                marginBottom: '1rem',
              }}
            >
              (04) / THE COMMERCIAL REMEDY &bull; BRAND ARCHITECTURE
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: 'clamp(2.6rem, 4.5vw, 4.5rem)',
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Brand architecture{' '}
              <span
                style={{
                  fontStyle: 'italic',
                  color: 'var(--color-brand-light-violet, #C882FF)',
                }}
              >
                commands margin.
              </span>
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '540px',
            }}
          >
            When Brand Direction, Margin Recovery, and Consumer Scope operate as a unified system,
            advertising amplifies an already profitable machine. Market perception commands premium pricing.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '520px' }}>
            {[
              'Brand direction establishes category prestige & pricing power',
              'Commanding price inelasticity where customers buy at full value',
              'Operational audits sealing leakage across the entire commercial chain',
              'Enduring identity attachment driving high-retention customer loops',
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '14px',
                  color: '#ffffff',
                  lineHeight: 1.5,
                }}
              >
                <CheckCircle size={18} weight="duotone" color="#C882FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

```

## FILE: E:\Ibrahim's website\src\presentation\components\sections\HeroSection.tsx
```tsx
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

```

## FILE: E:\Ibrahim's website\src\presentation\components\sections\MarginRecoverySection.tsx
```tsx
'use client';

import React, { useState, useRef } from 'react';
import { Section } from '@/presentation/components/layout/Section';
import { useSafeTriangle } from '@/presentation/hooks/useSafeTriangle';

interface AuditRow {
  step: string;
  stage: string;
  leakage: string;
  repair: string;
}

export const MarginRecoverySection: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const { handleRowHover } = useSafeTriangle({
    detailRef: detailPanelRef,
    suppressionDelayMs: 180,
  });

  const auditRows: AuditRow[] = [
    {
      step: '01',
      stage: 'Planning',
      leakage:
        'Uncalibrated contribution margins and ad spend deployed without unit-economic floors.',
      repair:
        'Recalibrating contribution profit floors so every dollar deployed yields verified margin.',
    },
    {
      step: '02',
      stage: 'Marketing',
      leakage:
        'Purchasing low-intent traffic with commoditized messaging that attracts discount seekers.',
      repair:
        'Disciplined messaging aligned strictly with premium buyers, extinguishing media waste.',
    },
    {
      step: '03',
      stage: 'Sales',
      leakage:
        'Unresolved hesitation on high-ticket tiers causing reps to default to price cuts.',
      repair:
        'Hardening conversion architecture and offer framing so buyers purchase at full price.',
    },
    {
      step: '04',
      stage: 'Fulfillment',
      leakage:
        'Operational bottlenecks and handoff friction silently degrading margins as scale grows.',
      repair:
        'Optimizing fulfillment velocity and operational standards to preserve margin through scale.',
    },
    {
      step: '05',
      stage: 'Customer Service',
      leakage:
        'Reactive ticket handling triggering avoidable refund spikes and disputed charges.',
      repair:
        'Transforming support into an active trust protector that resolves doubt before refund demands.',
    },
    {
      step: '06',
      stage: 'Post-Purchase Relationships',
      leakage:
        'Treating transactions as terminal events, trapping the brand on the high-CAC acquisition wheel.',
      repair:
        'Engineering post-purchase affirmation rituals and recurring loyalty loops to maximize lifetime value.',
    },
  ];

  return (
    <Section
      id="margin-recovery"
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 3vw, 4rem)',
        overflow: 'hidden',
      }}
    >
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
          <span style={{ color: '#C882FF', marginRight: '6px' }}>(03)</span> / FLAGSHIP II
        </div>
        <div>OPERATIONAL CHAIN AUDIT</div>
        <div>MARGIN RECOVERY ARCHITECTURE</div>
        <div style={{ textAlign: 'right' }}>6-STAGE COMMERCIAL DRAIN REPAIR</div>
      </div>

      {/* Tier 2: Editorial Monumental Display Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(1rem, 2vw, 2.5rem)',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
          alignItems: 'baseline',
        }}
      >
        <div style={{ gridColumn: 'span 12' }}>
          <h2
            style={{
              fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: 0,
            }}
          >
            Fix the commercial machine{' '}
            <span
              style={{
                fontStyle: 'italic',
                color: 'var(--color-brand-light-violet, #C882FF)',
              }}
            >
              before buying more traffic.
            </span>
          </h2>
        </div>
      </div>

      {/* Tier 3: Full-Bleed 94vw Swiss Architectural Audit Table */}
      <div
        style={{
          width: '100%',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Table Header Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '70px minmax(240px, 1.2fr) minmax(260px, 1.4fr) minmax(260px, 1.4fr)',
            gap: 'clamp(1rem, 2vw, 2.5rem)',
            padding: '1rem 1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.45)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <div>Index</div>
          <div>Operational Stage</div>
          <div>Where Commercial Value Leaks</div>
          <div>Strategic &amp; Operational Repair</div>
        </div>

        {/* 6 Large Horizontal Rows */}
        {auditRows.map((row, idx) => {
          const isHovered = hoveredRow === idx;
          return (
            <div
              key={row.step}
              onMouseEnter={() => handleRowHover(() => setHoveredRow(idx))}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '70px minmax(240px, 1.2fr) minmax(260px, 1.4fr) minmax(260px, 1.4fr)',
                gap: 'clamp(1rem, 2vw, 2.5rem)',
                padding: 'clamp(1.5rem, 3vh, 2.5rem) 1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                alignItems: 'center',
                background: isHovered ? 'rgba(142, 0, 250, 0.06)' : 'transparent',
                borderLeft: isHovered ? '2px solid #C882FF' : '2px solid transparent',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'default',
              }}
            >
              {/* Step Index */}
              <div
                className="tabular-nums"
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: isHovered ? '#C882FF' : 'rgba(255, 255, 255, 0.4)',
                  letterSpacing: '0.08em',
                  transition: 'color 0.2s ease',
                }}
              >
                {row.step}
              </div>

              {/* Stage Title in Instrument Serif 2.5rem */}
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)',
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.92)',
                    margin: 0,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {row.stage}
                </h3>
              </div>

              {/* Crisp 1-Line Commercial Leakage Statement */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {row.leakage}
                </p>
              </div>

              {/* Crisp 1-Line Strategic Repair Statement (Safe Triangle Detail Target) */}
              <div ref={isHovered ? detailPanelRef : undefined}>
                <p
                  style={{
                    fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                    fontSize: '14px',
                    color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                    lineHeight: 1.5,
                    margin: 0,
                    padding: '8px 12px',
                    background: isHovered ? 'rgba(142, 0, 250, 0.16)' : 'rgba(255, 255, 255, 0.02)',
                    border: isHovered
                      ? '1px solid rgba(200, 130, 255, 0.35)'
                      : '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '2px',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {row.repair}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

```

## FILE: E:\Ibrahim's website\src\presentation\components\sections\MethodologySection.tsx
```tsx
'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

interface Phase {
  num: string;
  name: string;
  focus: string;
  deliverables: string;
}

export const MethodologySection: React.FC = () => {
  const phases: Phase[] = [
    {
      num: '01',
      name: 'Forensic Diagnostic & Market Audit',
      focus: 'Perception, Funnel & Economics Synthesis',
      deliverables:
        'We audit your public brand touchpoints, commercial funnel stages, and unit economics to pinpoint hidden leakage points across perception, conversion, and fulfillment before proposing any intervention.',
    },
    {
      num: '02',
      name: 'Strategic Architecture & Position Blueprint',
      focus: 'Brand Direction & Margin Restoration Strategy',
      deliverables:
        'We establish your definitive category positioning, executive tone of voice, psychological pricing tiers, and operational stabilization milestones.',
    },
    {
      num: '03',
      name: 'Systemic Touchpoint & Workflow Engineering',
      focus: 'Consumer Scope & Operational Alignment',
      deliverables:
        'Full implementation across every touchpoint: bespoke visual systems, behavioral decision heuristics, post-purchase retention loops, and connected operational pipelines.',
    },
    {
      num: '04',
      name: 'Acquisition Scaling & Margin Governance',
      focus: 'Media Calibration & Category Leadership',
      deliverables:
        'Deploying high-intent acquisition media into a sealed, high-margin commercial machine. Ongoing executive governance of perceived value, customer LTV, and enterprise equity.',
    },
  ];

  return (
    <Section
      id="methodology"
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
            ENGAGEMENT METHODOLOGY &bull; COMMERCIAL RIGOR
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
              Institutional Precision.
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
              Every diagnostic engagement is anchored in audited commercial analysis, transparent
              unit-economic frameworks, and strict executive confidentiality.
            </p>
          </div>

          {/* 4-Phase Process Ledger (Zero cards) */}
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            {phases.map((phase) => (
              <div
                key={phase.num}
                style={{
                  paddingTop: 'var(--space-8)',
                  paddingBottom: 'var(--space-8)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'grid',
                  gridTemplateColumns: '80px minmax(0, 1fr) minmax(0, 1.4fr)',
                  gap: 'var(--space-8)',
                  alignItems: 'baseline',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '12px',
                    color: '#8E00FA',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}
                >
                  PHASE {phase.num}
                </span>

                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: 'var(--font-size-xl)',
                      fontWeight: 700,
                      color: '#ffffff',
                      margin: '0 0 var(--space-2)',
                    }}
                  >
                    {phase.name}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '11px',
                      color: 'var(--color-brand-light-violet)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {phase.focus}
                  </div>
                </div>

                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {phase.deliverables}
                </p>
              </div>
            ))}
          </div>

          {/* Institutional Client Confidentiality Commitment */}
          <div
            style={{
              marginTop: 'var(--space-16)',
              padding: 'var(--space-10)',
              background: '#0E0E13',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.7fr)',
              gap: 'var(--space-10)',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#8E00FA',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Executive Discretion Under Non-Disclosure
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 var(--space-3)',
                }}
              >
                Protecting Enterprise Strategy
              </h4>
              <p
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Our client partners operate in highly competitive national and international markets.
                In accordance with mutual non-disclosure agreements, we protect proprietary commercial
                metrics, customer data, and brand strategy files.
              </p>
            </div>

            <div
              style={{
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                paddingLeft: 'var(--space-8)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: '#ffffff',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-3)',
                  fontWeight: 700,
                }}
              >
                Engagement Scope
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 2,
                }}
              >
                <li>&bull; Established product/service craftsmanship</li>
                <li>&bull; Minimum $700,000+ annual revenue</li>
                <li>&bull; Direct founder/executive involvement</li>
                <li>&bull; Willingness to calibrate machine before media scale</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

```

## FILE: E:\Ibrahim's website\src\presentation\components\sections\QualificationSection.tsx
```tsx
'use client';

import React from 'react';
import { LockKey, ShieldCheck, Sparkle } from '@phosphor-icons/react';
import { Section } from '@/presentation/components/layout/Section';
import { QualificationForm } from '@/presentation/components/forms/QualificationForm';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';

export const QualificationSection: React.FC = () => {
  return (
    <Section
      id="qualification"
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 3vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      <CornerArcs position="top-right" size={320} opacity={0.08} color="#C882FF" />

      {/* Tier 1: Swiss Architectural Index Strip */}
      <div
        className="tabular-nums"
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
          <span style={{ color: '#C882FF', marginRight: '6px' }}>(10)</span> / STRATEGIC INTAKE
        </div>
        <div>EXECUTIVE QUALIFICATION</div>
        <div>THRESHOLD: $700,000+ ANNUAL REVENUE</div>
        <div style={{ textAlign: 'right' }}>STRICT NON-DISCLOSURE PROTOCOL</div>
      </div>

      {/* Tier 2: Split Architectural Plane */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'flex-start',
        }}
      >
        {/* Left Column: Criteria & Directives */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(2.8rem, 5vw, 5rem)',
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Request a private{' '}
              <span
                style={{
                  fontStyle: 'italic',
                  color: 'var(--color-brand-light-violet, #C882FF)',
                }}
              >
                briefing.
              </span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.6,
                marginTop: '1.25rem',
                margin: '1.25rem 0 0 0',
                maxWidth: '520px',
              }}
            >
              A selective Strategic Consultation Dossier for established enterprises generating $700,000+
              in annual revenue. We review commercial and perceptual context before the meeting.
            </p>
          </div>

          {/* Consultation Protocols */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              paddingTop: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={20} weight="duotone" color="#C882FF" />
              <span
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '13.5px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontWeight: 500,
                }}
              >
                Direct Consultation with Strategic Brand &amp; Commercial Leadership
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkle size={20} weight="duotone" color="#C882FF" />
              <span
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '13.5px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontWeight: 500,
                }}
              >
                Preliminary Commercial Audit Prepared Prior to Meeting
              </span>
            </div>
          </div>

          {/* Strict Non-Disclosure Protocol */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <LockKey size={20} weight="duotone" color="#C882FF" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                }}
              >
                Strict Non-Disclosure Protocol
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.55)',
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: '460px',
                }}
              >
                All commercial metrics, positioning notes, and proprietary operational discussions
                are governed under standard executive non-disclosure confidentiality.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Intake Form */}
        <div
          style={{
            borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
            paddingLeft: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          <QualificationForm />
        </div>
      </div>

      {/* Tier 3: Verified Architectural FAQ Accordion */}
      <div
        id="faq"
        style={{
          marginTop: 'clamp(4rem, 8vw, 7rem)',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'start',
          }}
        >
          {/* FAQ Column Header */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#C882FF',
                marginBottom: '1rem',
              }}
            >
              (08) / VERIFIED DIRECTIVES &bull; FAQ
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: 'clamp(2.2rem, 3.8vw, 3.6rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Frequently Clarified{' '}
              <span style={{ fontStyle: 'italic', color: '#C882FF' }}>
                Principles.
              </span>
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                fontSize: '13.5px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.6,
                marginTop: '1rem',
                maxWidth: '440px',
              }}
            >
              Truthful, strictly verified facts regarding engagement parameters, core disciplines, and advisory models.
            </p>
          </div>

          {/* FAQ Accordion List (100% Rendered in SSR DOM) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            {[
              {
                q: 'What types of businesses does BRANDMANIA work with?',
                a: 'Established businesses generating $700,000+ in annual revenue and high-ticket international brands across design, jewelry, interior design, luxury construction, hospitality, fitness, supplements, software/apps, cosmetics, e-commerce, medical devices, and more.',
              },
              {
                q: "What are BRANDMANIA's three core disciplines?",
                a: 'Brand Direction, Margin Recovery, and Consumer Scope.',
              },
              {
                q: 'Does BRANDMANIA offer consultancy if we are not ready for a full engagement?',
                a: 'Yes, BRANDMANIA offers strategic consultancy for businesses not yet ready for a full rebuild or when full-engagement capacity is full.',
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                open
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                  padding: '1.25rem 0',
                }}
              >
                <summary
                  style={{
                    fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                    fontSize: 'clamp(1.2rem, 1.6vw, 1.45rem)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <span>{faq.q}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '11px',
                      color: '#C882FF',
                    }}
                  >
                    [0{idx + 1}]
                  </span>
                </summary>
                <p
                  style={{
                    fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                    fontSize: '13.5px',
                    color: 'rgba(255, 255, 255, 0.75)',
                    lineHeight: 1.65,
                    margin: '0.85rem 0 0 0',
                    maxWidth: '680px',
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

```

## FILE: E:\Ibrahim's website\src\presentation\components\sections\SystemSection.tsx
```tsx
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Section } from '@/presentation/components/layout/Section';

interface SystemNode {
  step: string;
  title: string;
  discipline: string;
  description: string;
}

export const SystemSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 25%'],
  });

  const pathProgress = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  const nodes: SystemNode[] = [
    {
      step: '01',
      title: 'Identity & Narrative',
      discipline: 'Brand Direction',
      description:
        'Defines positioning, USP, and authoritative tone of voice before capital enters the market.',
    },
    {
      step: '02',
      title: 'Market Perception',
      discipline: 'Strategic Alignment',
      description:
        'Harmonizes internal capability with external prestige, eliminating commodity discounting.',
    },
    {
      step: '03',
      title: 'Consumer Psychology',
      discipline: 'Consumer Scope',
      description:
        'Decodes behavioral biases, status cues, and identity attachment to create irrational loyalty.',
    },
    {
      step: '04',
      title: 'Pricing Power',
      discipline: 'Margin Architecture',
      description:
        'Commands premium price inelasticity where buyers choose certainty over low price.',
    },
    {
      step: '05',
      title: 'Commercial Performance',
      discipline: 'Margin Recovery',
      description:
        'Audits and repairs data leakage across the entire commercial chain before scaling ad spend.',
    },
    {
      step: '06',
      title: 'Category Dominance',
      discipline: 'Enduring Equity',
      description:
        'The cumulative commercial outcome: protected margin, compounding retention, and pricing leverage.',
    },
  ];

  return (
    <Section
      id="system"
      ref={sectionRef}
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 3vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      {/* Tier 1: Swiss Architectural Index Strip */}
      <div
        className="tabular-nums"
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
          <span style={{ color: '#C882FF', marginRight: '6px' }}>(04)</span> / THE SYSTEM
        </div>
        <div>CONTINUOUS CAUSAL VALUE CHAIN</div>
        <div>END-TO-END COMMERCIAL ENGINE</div>
        <div style={{ textAlign: 'right' }}>6 INTERLOCKED NODES</div>
      </div>

      {/* Tier 2: Editorial Monumental Display Header */}
      <div style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            color: '#ffffff',
            margin: 0,
            maxWidth: '1100px',
          }}
        >
          From perception upstream{' '}
          <span
            style={{
              fontStyle: 'italic',
              color: 'var(--color-brand-light-violet, #C882FF)',
            }}
          >
            to cash flow downstream.
          </span>
        </h2>
      </div>

      {/* Connected SVG Pipeline Drawing Line */}
      <div style={{ position: 'relative', width: '100%', marginBottom: '2rem' }}>
        <svg
          viewBox="0 0 1200 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '28px', display: 'block' }}
        >
          <line x1="0" y1="20" x2="1200" y2="20" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4 4" />
          <motion.line
            x1="0"
            y1="20"
            x2="1200"
            y2="20"
            stroke="#C882FF"
            strokeWidth="2"
            style={{ pathLength: pathProgress }}
          />
          {[100, 300, 500, 700, 900, 1100].map((cx, i) => (
            <circle
              key={i}
              cx={cx}
              cy="20"
              r="5"
              fill="#070709"
              stroke="#C882FF"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>

      {/* 6-Column Edge-to-Edge Swiss Architectural Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'rgba(255, 255, 255, 0.12)',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        {nodes.map((node) => (
          <div
            key={node.step}
            style={{
              background: '#070709',
              padding: 'clamp(1.5rem, 3vh, 2.5rem) 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              transition: 'background 0.2s ease',
            }}
          >
            {/* Step Number in Instrument Serif */}
            <div
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: 'clamp(2.5rem, 3.5vw, 3.2rem)',
                fontWeight: 400,
                lineHeight: 1,
                color: '#C882FF',
                letterSpacing: '-0.02em',
              }}
            >
              {node.step}
            </div>

            {/* Discipline Tag */}
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.45)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {node.discipline}
            </div>

            {/* Stage Title */}
            <h3
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: '1.35rem',
                fontWeight: 400,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {node.title}
            </h3>

            {/* Concise Mechanism Description */}
            <p
              style={{
                fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {node.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

```

## FILE: E:\Ibrahim's website\src\presentation\components\sections\WorldviewSection.tsx
```tsx
'use client';

import React from 'react';

export const WorldviewSection: React.FC = () => {
  return (
    <section
      id="manifesto"
      style={{
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        padding: 'clamp(var(--space-16), 8vw, var(--space-28)) clamp(1.5rem, 3vw, 4rem)',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 12-Column Swiss Architectural Grid Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'var(--space-6)',
          alignItems: 'start',
        }}
      >
        {/* Left Exposed Index Column (Cols 1-2) */}
        <div
          style={{
            gridColumn: 'span 2',
            fontFamily: 'var(--font-Mono), monospace',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-brand-light-violet, #c084fc)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: 'var(--space-3)',
          }}
        >
          (02) / MANIFESTO
        </div>

        {/* Monumental Instrument Serif Statement Spanning 10 Columns */}
        <div
          style={{
            gridColumn: 'span 10',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-8), 4vw, var(--space-12))',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-Editorial), Georgia, serif',
              fontSize: 'clamp(3.2rem, 6.5vw, 6.8rem)',
              fontWeight: 400,
              lineHeight: 0.96,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: 0,
            }}
          >
            Branding is not what it looks like.{' '}
            <em
              style={{
                fontFamily: 'var(--font-Editorial), Georgia, serif',
                fontStyle: 'italic',
                color: '#C882FF',
              }}
            >
              It is how you communicate.
            </em>{' '}
            Attention does not mean revenue.
          </h2>

          {/* Clean Razor-Sharp Architectural Footnote */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              paddingTop: 'var(--space-6)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-Editorial), Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
                color: 'rgba(255, 255, 255, 0.75)',
                margin: 0,
                maxWidth: '720px',
              }}
            >
              &ldquo;Let people applaud your second to greatest work, because you&rsquo;re creating your greatest.&rdquo;
            </p>

            <span
              style={{
                fontFamily: 'var(--font-Mono), monospace',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted, #7c7e94)',
              }}
            >
              THE BRANDMANIA DOCTRINE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

```

