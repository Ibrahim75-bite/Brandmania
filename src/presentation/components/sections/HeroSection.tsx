'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Container } from '@/presentation/components/layout/Container';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { BLUR_PLACEHOLDERS } from '@/content/blurPlaceholders';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className={styles.heroSection}>
      <Container size="full">
        <div className={styles.topDatum}>
          <span>BRANDMANIA&reg; &mdash; Strategic Brand &amp; Commercial Advisory</span>
          <span>Client Qualification: $700,000+ Annual Revenue</span>
          <span className={styles.topDatumRight}>Perception &bull; Margin &bull; Psychology</span>
        </div>

        <div className={styles.grid}>
          <div className={styles.editorialCol}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              <span>Strategic Brand &amp; Commercial Advisory</span>
            </div>

            <h1 className={styles.headline}>
              Branded for the Best
            </h1>

            <p className={styles.lead}>
              When an enterprise is better than it looks, its brand is costing it margin. We align market perception with commercial reality across Brand Direction, Margin Recovery, and Consumer Scope.
            </p>

            <div className={styles.actionRow}>
              <Link href="/#qualification" className={`${styles.primaryCta} hit-slop`}>
                <span>Request Strategic Consultation</span>
                <ArrowUpRight size={18} weight="bold" />
              </Link>

              <Link href="/#work" className={`${styles.secondaryLink} hit-slop`}>
                <span>Explore Selected Work &rarr;</span>
              </Link>
            </div>
          </div>

          <div className={styles.centerMonolith}>
            <div className={styles.ambientGlow} />
            <div className={styles.dashedOrbit} />

            <div className={styles.brandEyeContainer}>
              <BrandEye size="lg" />
            </div>

            <h3 className={styles.brandEyeTitle}>The BrandEye</h3>
            <p className={styles.brandEyeDesc}>
              The mathematical convergence of perceptual authority, commercial leverage, and psychological lock-in.
            </p>

            <div className={styles.brandEyeCaption}>
              <span>PROPRIETARY SEAL</span>
              <span>ARCHITECTURAL SEAL</span>
            </div>
          </div>

          <div className={styles.disciplinesCol}>
            <div className={styles.disciplinesHeader}>
              <div className={styles.disciplinesTag}>Core Disciplines</div>
              <h3 className={styles.disciplinesMainTitle}>Commercial Architecture</h3>
            </div>

            <div className={styles.disciplineRow}>
              <h4 className={styles.disciplineName}>Brand Direction</h4>
              <p className={styles.disciplineDesc}>
                Defensible corporate authority, positioning, and prestige architecture.
              </p>
            </div>

            <div className={styles.disciplineRow}>
              <h4 className={styles.disciplineName}>Margin Recovery</h4>
              <p className={styles.disciplineDesc}>
                Six-stage commercial audit plugging profit leakage before scaling spend.
              </p>
            </div>

            <div className={styles.disciplineRow}>
              <h4 className={styles.disciplineName}>Consumer Scope</h4>
              <p className={styles.disciplineDesc}>
                Psychological buyer mapping and price-inelasticity frameworks.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.metricsBar}>
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>$700,000+ Annual Revenue</span>
            <span className={styles.metricLabel}>Verified Enterprise Qualification Floor</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>Dual Engagement Tracks</span>
            <span className={styles.metricLabel}>Full Rebuild &amp; Strategic Consultancy</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>Confidential Governance</span>
            <span className={styles.metricLabel}>Protected Under Bilateral Mutual NDA</span>
          </div>
        </div>

        <div className={styles.materialityTexture} aria-hidden="true">
          <Image
            src="/brand/textures/brandmania-cover-clean.jpg"
            alt="BRANDMANIA — Liquid violet marble materiality, high-craft brand monograph and visual identity artifact"
            fill
            sizes="1px"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDERS.coverClean}
            style={{ objectFit: 'cover', opacity: 0.001, pointerEvents: 'none' }}
          />
        </div>
      </Container>
    </section>
  );
};
