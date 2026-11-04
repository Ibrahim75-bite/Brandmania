'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react';
import { Container } from '@/presentation/components/layout/Container';
import { BLUR_PLACEHOLDERS } from '@/content/blurPlaceholders';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className={styles.heroSection}>
      <Container size="full">
        {/* Top Architectural Datum Strip */}
        <div className={styles.topDatum}>
          <span>01 / BRANDMANIA&reg; &mdash; STRATEGIC BRAND &amp; COMMERCIAL ADVISORY</span>
          <span>CLIENT THRESHOLD: $700,000+ ANNUAL REVENUE</span>
        </div>

        {/* 2-Column Asymmetric Luxury Layout */}
        <div className={styles.grid}>
          {/* Content Column */}
          <div className={styles.contentCol}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              <span>01 &mdash; STRATEGIC BRAND &amp; COMMERCIAL ADVISORY</span>
            </div>

            <h1 className={styles.headline}>
              Branded for <span className={styles.headlineItalic}>the Best.</span>
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
                <span>Explore Selected Work</span>
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>

          {/* Visual Exhibition Plate Column */}
          <div className={styles.visualCol}>
            <div className={styles.imageWrapper}>
              <Image
                src="/brand/textures/brandmania-cover-clean.jpg"
                alt="BRANDMANIA — Liquid violet marble materiality, high-craft brand monograph and visual identity artifact"
                fill
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDERS.coverClean}
                className={styles.image}
                priority
              />
            </div>
            <div className={styles.museumCaption}>
              <span>EXHIBITION PLATE / NO. 01</span>
              <span>ARCHIVE STANDARD</span>
            </div>
          </div>
        </div>

        {/* Bottom Three Metrics Bar */}
        <div className={styles.metricsBar}>
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>01</span>
            <span className={styles.metricLabel}>Brand Direction</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>02</span>
            <span className={styles.metricLabel}>Margin Recovery</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>03</span>
            <span className={styles.metricLabel}>Consumer Scope</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
