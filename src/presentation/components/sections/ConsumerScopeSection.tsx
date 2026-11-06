'use client';

import React, { useState } from 'react';
import { Container } from '@/presentation/components/layout/Container';
import styles from './ConsumerScopeSection.module.css';

interface Dimension {
  id: string;
  name: string;
  principle: string;
  thesis: string;
}

export const ConsumerScopeSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('01');

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

  const activeDim = dimensions.find((d) => d.id === activeId) || dimensions[0];

  return (
    <section id="consumer-scope" className={styles.section}>
      <Container size="full">
        {}
        <div className={styles.headerBlock}>
          <div className={styles.marker}>
            Consumer Scope Architecture
          </div>
          <h2 className={styles.headline}>
            Every touchpoint engineered through human behavior
          </h2>
        </div>

        {}
        <div className={styles.readerGrid}>
          {}
          <div className={styles.leftPane} role="tablist" aria-label="Behavioral Dimensions">
            {dimensions.map((dim) => {
              const isActive = dim.id === activeId;
              return (
                <button
                  key={dim.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(dim.id)}
                  className={`${styles.dimButton} ${isActive ? styles.dimButtonActive : ''} hit-slop`}
                >
                  <span className={styles.dimIndex}>{dim.id}</span>
                  <span className={styles.dimName}>{dim.name}</span>
                </button>
              );
            })}
          </div>

          {}
          <div className={styles.rightPane} role="tabpanel" aria-live="polite">
            <div className={styles.activeHeader}>
              <span className={styles.activeBadge}>DIMENSION {activeDim.id}</span>
            </div>

            <h3 className={styles.activeName}>{activeDim.name}</h3>

            <p className={styles.activePrinciple}>
              &ldquo;{activeDim.principle}&rdquo;
            </p>

            <p className={styles.activeThesis}>
              {activeDim.thesis}
            </p>
          </div>
        </div>

        {}
        <div className={styles.srOnly} aria-label="Consumer Scope Complete Archive">
          {dimensions.map((dim) => (
            <article key={`ssr-${dim.id}`}>
              <h4>{dim.id} &mdash; {dim.name}</h4>
              <p>{dim.principle}</p>
              <p>{dim.thesis}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
