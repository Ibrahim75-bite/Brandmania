import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { ConsumerScopeReader } from './ConsumerScopeReader';
import { CONSUMER_SCOPE_DIMENSIONS } from '@/content/consumerScopeDimensions';
import styles from './ConsumerScopeSection.module.css';

export const ConsumerScopeSection: React.FC = () => {
  return (
    <section id="consumer-scope" className={styles.section}>
      <Container size="full">
        <div className={styles.headerBlock}>
          <div className={styles.marker}>
            Consumer Scope Architecture
          </div>
          <h2 className={styles.headline}>
            Every touchpoint engineered through human behavior
          </h2>
        </div>

        <ConsumerScopeReader />

        <div className={styles.srOnly} aria-label="Consumer Scope Complete Archive">
          {CONSUMER_SCOPE_DIMENSIONS.map((dim) => (
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
