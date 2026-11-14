import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { SystemPipeline } from './SystemPipeline';
import styles from './SystemSection.module.css';

interface SystemNode {
  step: string;
  title: string;
  discipline: string;
  description: string;
}

export const SystemSection: React.FC = () => {
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
    <section id="system" className={styles.section}>
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

        <SystemPipeline />

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
