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
