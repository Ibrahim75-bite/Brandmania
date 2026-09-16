import React from 'react';
import styles from './PainPointCard.module.css';

export interface PainPointCardProps {
  category: 'MARGIN' | 'BRAND' | 'CONSUMER';
  question: string;
  elaboration: string;
  impact: string;
  className?: string;
}

export function PainPointCard({
  category,
  question,
  elaboration,
  impact,
  className = '',
}: PainPointCardProps) {
  const categoryTitles = {
    MARGIN: 'DIAGNOSTIC VECTOR // MARGIN LEAKAGE',
    BRAND: 'PERCEPTION VECTOR // BRAND DILUTION',
    CONSUMER: 'BEHAVIORAL VECTOR // CUSTOMER ATTACHMENT',
  };

  return (
    <div className={`${styles.card} ${className}`}>
      <div>
        <span className={styles.categoryTag}>{categoryTitles[category]}</span>
        <h3 className={styles.question}>{question}</h3>
      </div>

      <p className={styles.elaboration}>{elaboration}</p>

      <div className={styles.impactWrapper}>
        <span className={styles.impactLabel}>Commercial Consequence</span>
        <p className={styles.impactText}>{impact}</p>
      </div>
    </div>
  );
}
