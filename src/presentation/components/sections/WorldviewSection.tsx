'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import styles from './WorldviewSection.module.css';

export const WorldviewSection: React.FC = () => {
  return (
    <section id="manifesto" className={styles.section}>
      <Container size="full">
        <div className={styles.grid}>
          {/* Left Exposed Index Column */}
          <div className={styles.markerCol}>
            <div className={styles.marker}>
              01 &mdash; THE DOCTRINE
            </div>
          </div>

          {/* Monumental Editorial Pull-Quote Spanning 9 Columns */}
          <div className={styles.statementCol}>
            <h2 className={styles.quote}>
              Branding is not what it looks like. It is how you communicate. Attention does not mean revenue.
            </h2>

            {/* Clean Razor-Sharp Architectural Footnote */}
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
