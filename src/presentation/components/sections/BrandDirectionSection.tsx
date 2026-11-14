import React from 'react';
import {
  BookOpenText,
  ChatText,
  CrosshairSimple,
  ShieldCheck,
  Swatches,
  Binoculars,
} from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/presentation/components/layout/Container';
import { BrandDirectionTabs } from './BrandDirectionTabs';
import styles from './BrandDirectionSection.module.css';

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
    <section id="disciplines" className={styles.section}>
      <div id="brand-direction" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true" />
      <Container size="full">
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <div className={styles.marker}>
              Brand Direction Architecture
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
                      <Icon size={16} weight="duotone" color="#4A0099" data-contrast="#3D3A45" />
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
            <BrandDirectionTabs />
          </div>
        </div>
      </Container>
    </section>
  );
};
