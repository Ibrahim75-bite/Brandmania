'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Container } from '@/presentation/components/layout/Container';
import styles from './SystemSection.module.css';

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
    <section id="system" ref={sectionRef} className={styles.section}>
      <Container size="full">
        {}
        <div className={styles.headerBlock}>
          <div className={styles.marker}>
            03 &mdash; THE INTEGRATED SYSTEM &bull; 6 INTERLOCKED NODES
          </div>
          <h2 className={styles.headline}>
            From perception upstream to cash flow downstream
          </h2>
        </div>

        {}
        <div className={styles.pipelineVisual}>
          <svg
            viewBox="0 0 1200 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '24px', display: 'block' }}
          >
            <line
              x1="0"
              y1="20"
              x2="1200"
              y2="20"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
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
                r="4"
                fill="#070709"
                stroke="#C882FF"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        {}
        <div className={styles.matrixGrid}>
          {nodes.map((node) => (
            <div key={node.step} className={styles.matrixCell}>
              <div className={styles.cellStep}>{node.step}</div>
              <div className={styles.cellDiscipline}>{node.discipline}</div>
              <h3 className={styles.cellTitle}>{node.title}</h3>
              <p className={styles.cellDesc}>{node.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
