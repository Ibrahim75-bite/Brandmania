'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import styles from './WorldviewSection.module.css';

export const WorldviewSection: React.FC = () => {
  return (
    <section id="manifesto" className={styles.section}>
      <Container size="full">
        <div className={styles.grid}>
          {}
          <div className={styles.markerCol}>
            <div className={styles.marker}>
              The Doctrine
            </div>
          </div>

          {}
          <div className={styles.statementCol}>
            <h2 className={styles.quote}>
              Branding is not what it looks like. It is how you communicate. Attention does not mean revenue
            </h2>

            {}
            <div className={styles.footerRow}>
              <p className={styles.subquote}>
                &ldquo;Let people applaud your second to greatest work, because you&rsquo;re creating your greatest.&rdquo;
              </p>

              <span className={styles.doctrineTag}>
                The Brandmania Doctrine
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
