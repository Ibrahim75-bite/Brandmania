import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { ArtifactShowcase } from './ArtifactShowcase';
import styles from './ArtifactGallery.module.css';

export const ArtifactGallery: React.FC = () => {
  return (
    <section id="work" className={styles.section}>
      <div id="artifacts" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true" />

      <Container size="full">
        <div>
          <div className={styles.marker}>
            Selected Artifacts
          </div>
          <header className={styles.introBlock}>
            <div>
              <h2 className={styles.introTitle}>
                Uncompromised physical and digital materiality
              </h2>
            </div>
            <div>
              <p className={styles.introDesc}>
                Every deliverable produced by Brandmania exists as a verified, high-craft brand asset designed to command immediate executive respect and unassailable pricing power.
              </p>
            </div>
          </header>
        </div>

        <ArtifactShowcase />
      </Container>
    </section>
  );
};
