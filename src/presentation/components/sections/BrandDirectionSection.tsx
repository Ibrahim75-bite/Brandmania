'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BookOpenText,
  ChatText,
  CrosshairSimple,
  ShieldCheck,
  Swatches,
  Binoculars,
} from '@phosphor-icons/react';
import { Container } from '@/presentation/components/layout/Container';
import { BLUR_PLACEHOLDERS } from '@/content/blurPlaceholders';
import styles from './BrandDirectionSection.module.css';

export const BrandDirectionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'poster'>('architecture');

  const pillars = [
    { num: '01', title: 'Brand Story & Narrative', desc: 'Crafting defensible corporate authority that commands executive reverence.', icon: BookOpenText },
    { num: '02', title: 'Tone of Voice', desc: 'Surgical linguistic precision that cuts through industry noise and communicates mastery.', icon: ChatText },
    { num: '03', title: 'Positioning & USP', desc: 'Carving out uncontested market space where competitors are rendered obsolete.', icon: CrosshairSimple },
    { num: '04', title: 'Trust Architecture', desc: 'Building institutional certainty and credibility into every customer interaction touchpoint.', icon: ShieldCheck },
    { num: '05', title: 'Visual Identity & System', desc: 'A timeless visual standard distinct and prestigious across physical and digital mediums.', icon: Swatches },
    { num: '06', title: 'Vision, Mission & Relevance', desc: 'Harmonizing internal conviction with market expectations and generational staying power.', icon: Binoculars },
  ];

  return (
    <section id="disciplines" className={styles.section}>
      <div id="brand-direction" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true" />

      <Container size="full">
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <div className={styles.marker}>
              05 &mdash; FLAGSHIP I &bull; BRAND DIRECTION
            </div>

            <h2 className={styles.headline}>
              Aligning what you are with what the market perceives
            </h2>

            <div className={styles.pillarsList}>
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.num} className={styles.pillarRow}>
                    <div className={styles.pillarLeft}>
                      <span className={styles.pillarNum}>{pillar.num}</span>
                      <Icon size={16} weight="duotone" color="#C882FF" data-contrast="#3D3A45" />
                      <span className={styles.pillarTitle}>{pillar.title}</span>
                    </div>
                    <span className={styles.pillarDesc}>
                      {pillar.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.rightCol}>
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
                priority
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
          </div>
        </div>
      </Container>
    </section>
  );
};
