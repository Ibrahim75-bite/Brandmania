'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BLUR_PLACEHOLDERS } from '@/content/blurPlaceholders';
import styles from './BrandDirectionSection.module.css';

export const BrandDirectionTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'poster'>('architecture');

  return (
    <>
      <div className={styles.tabsNav} role="tablist" aria-label="Brand Direction Artifacts">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'architecture'}
          onClick={() => setActiveTab('architecture')}
          className={`${styles.tabBtn} ${activeTab === 'architecture' ? styles.tabBtnActive : ''} hit-slop`}
        >
          01 / BRAND &amp; COMMERCIAL ARCHITECTURE
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'poster'}
          onClick={() => setActiveTab('poster')}
          className={`${styles.tabBtn} ${activeTab === 'poster' ? styles.tabBtnActive : ''} hit-slop`}
        >
          02 / PHYSICAL FOLDED MONOGRAPH POSTER
        </button>
      </div>

      <div
        className={styles.artboardContainer}
        style={{ display: activeTab === 'architecture' ? 'block' : 'none' }}
      >
        <Image
          src="/brand/graphics/brandmania-ad-agency-banner.jpg"
          alt="BRANDMANIA Services &amp; Branding Architecture Deliverable Artboard"
          width={2160}
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
        />
        <div className={styles.artboardCaption}>
          <span>Brand &amp; Commercial Architecture Master Deliverable</span>
          <span className={styles.captionBadge}>100% Uncropped Standard</span>
        </div>
      </div>

      <div
        className={styles.artboardContainer}
        style={{ display: activeTab === 'poster' ? 'block' : 'none' }}
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
        <div className={styles.artboardCaption}>
          <span>Physical Materiality Poster</span>
          <span className={styles.captionBadge}>Folded Archive Monograph</span>
        </div>
      </div>
    </>
  );
};
