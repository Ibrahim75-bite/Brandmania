'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Container } from '@/presentation/components/layout/Container';
import { BLUR_PLACEHOLDERS } from '@/content/blurPlaceholders';
import styles from './ArtifactGallery.module.css';

interface Artifact {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  width: number;
  height: number;
  format: string;
  blurDataURL?: string;
  altText: string;
}

const ARTIFACTS: Artifact[] = [
  {
    id: '01',
    title: 'Brand Mission & Ethos Creative',
    description: 'The campaign assertion that articulates BRANDMANIA’s ethos of craftsmanship, pricing power, and market leadership.',
    imageSrc: '/brand/graphics/artboard-1-our.jpg',
    width: 1080,
    height: 1080,
    format: 'Campaign Master Visual',
    blurDataURL: BLUR_PLACEHOLDERS.artboard1,
    altText: 'BRANDMANIA Brand Mission & Ethos Creative Master Artboard',
  },
  {
    id: '02',
    title: 'Services & Branding Architecture',
    description: 'A complete view of the Brand Direction system: positioning, frameworks, and visual standards.',
    imageSrc: '/brand/graphics/artboard-2-services-branding.jpg',
    width: 1080,
    height: 1080,
    format: 'Identity Deliverable Artboard',
    blurDataURL: BLUR_PLACEHOLDERS.artboard2,
    altText: 'BRANDMANIA Services & Branding Architecture Deliverable Artboard',
  },
  {
    id: '03',
    title: 'Social & Feed Campaign System',
    description: 'A high-density campaign system designed to create instant category authority and retention across digital feeds.',
    imageSrc: '/brand/graphics/artboard-3-services-social.jpg',
    width: 1080,
    height: 1080,
    format: 'Social Media Artboard',
    blurDataURL: BLUR_PLACEHOLDERS.artboard3,
    altText: 'BRANDMANIA Social & Feed Campaign System Deliverable Artboard',
  },
  {
    id: '04',
    title: 'The Brand Eye Cultural Seal',
    description: 'The Brand Eye as a symbol of focus, symmetry, uncompromising standard, and cultural longevity.',
    imageSrc: '/brand/graphics/artboard-4-brand-eye.jpg',
    width: 1080,
    height: 1080,
    format: 'Symbolic Iconography',
    blurDataURL: BLUR_PLACEHOLDERS.artboard4,
    altText: 'BRANDMANIA The Brand Eye Cultural Seal Artboard',
  },
  {
    id: '05',
    title: 'Omni-Channel Agency Banner',
    description: 'Landscape campaign artwork articulating strategic discipline and market authority across channels.',
    imageSrc: '/brand/graphics/brandmania-ad-agency-banner.jpg',
    width: 1920,
    height: 1080,
    format: 'Landscape Master Banner',
    blurDataURL: BLUR_PLACEHOLDERS.agencyBanner,
    altText: 'BRANDMANIA Omni-Channel Agency Banner Master Deliverable',
  },
];

interface PlateItemProps {
  artifact: Artifact;
  index: number;
  total: number;
  onEnter: (idx: number) => void;
  shouldReduceMotion: boolean | null;
}

const PlateItem: React.FC<PlateItemProps> = ({
  artifact,
  index,
  total,
  onEnter,
  shouldReduceMotion,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'center center', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.9]);
  const clip = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['inset(12% 8% 12% 8%)', 'inset(0% 0% 0% 0%)', 'inset(10% 6% 10% 6%)']
  );

  return (
    <article
      id={`artwork-${artifact.id}`}
      ref={targetRef}
      className={styles.plateStage}
      aria-label={`${artifact.id} — ${artifact.title}`}
    >
      <motion.div
        onViewportEnter={() => onEnter(index)}
        viewport={{ amount: 0.35 }}
        style={{
          scale: shouldReduceMotion ? 1 : scale,
          clipPath: shouldReduceMotion ? 'none' : clip,
        }}
        className={styles.plateFrame}
      >
        <div className={styles.imageBox}>
          <Image
            src={artifact.imageSrc}
            alt={artifact.altText}
            width={artifact.width}
            height={artifact.height}
            placeholder="blur"
            blurDataURL={artifact.blurDataURL}
            className={styles.plateImage}
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        <figcaption className={styles.plateCaption}>
          <span className={styles.plateNum}>{artifact.id} / 0{total}</span>
          <div className={styles.plateInfo}>
            <h3 className={styles.plateTitle}>{artifact.title}</h3>
            <p className={styles.plateDesc}>{artifact.description}</p>
          </div>
          <span className={styles.plateFormat}>{artifact.format}</span>
        </figcaption>
      </motion.div>
    </article>
  );
};

export const ArtifactGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();
  const artifacts = ARTIFACTS;
  const active = artifacts[activeIndex];

  const scrollToArtwork = (id: string, idx: number) => {
    setActiveIndex(idx);
    const element = document.getElementById(`artwork-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className={styles.section}>
      <div id="artifacts" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true" />

      <Container size="full">
        {}
        <div>
          <div className={styles.marker}>
            Selected Artifacts
          </div>
          <header className={styles.introBlock}>
            <div>
              <h2 className={styles.introTitle}>
                Uncompromised physical and digital materiality
              </h2>
            </div>
            <div>
              <p className={styles.introDesc}>
                Every deliverable produced by Brandmania exists as a verified, high-craft brand asset designed to command immediate executive respect and unassailable pricing power.
              </p>
            </div>
          </header>
        </div>

        {}
        <div className={styles.stickyHud} role="region" aria-label="Showcase Navigation HUD">
          <div className={styles.hudLeft}>
            <span className={styles.hudCounter}>
              {active.id} / 0{artifacts.length}
            </span>
            <span className={styles.hudActiveTitle}>{active.title}</span>
          </div>

          <div className={styles.hudPills} role="tablist" aria-label="Artifact Selectors">
            {artifacts.map((item, idx) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={idx === activeIndex}
                onClick={() => scrollToArtwork(item.id, idx)}
                className={`${styles.hudPill} ${idx === activeIndex ? styles.hudPillActive : ''} hit-slop`}
              >
                {item.id}
              </button>
            ))}
          </div>
        </div>

        {}
        <div className={styles.showcaseStack}>
          {artifacts.map((artifact, index) => (
            <PlateItem
              key={artifact.id}
              artifact={artifact}
              index={index}
              total={artifacts.length}
              onEnter={setActiveIndex}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
