'use client';

import React, { useState } from 'react';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { ArchitecturalGlyph } from '@/presentation/components/primitives/ArchitecturalGlyph';
import { CONSUMER_SCOPE_DIMENSIONS as DIMENSIONS } from '@/content/consumerScopeDimensions';
import styles from './ConsumerScopeSection.module.css';

export const ConsumerScopeReader: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('01');

  const activeDim = DIMENSIONS.find((d) => d.id === activeId) || DIMENSIONS[0];

  return (
    <div className={styles.readerGrid}>
      <div className={styles.leftPane} role="tablist" aria-label="Behavioral Dimensions">
        {DIMENSIONS.map((dim) => {
          const isActive = dim.id === activeId;
          return (
            <button
              key={dim.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(dim.id)}
              onMouseEnter={() => setActiveId(dim.id)}
              className={`${styles.dimButton} ${isActive ? styles.dimButtonActive : ''} hit-slop`}
            >
              <span className={styles.dimIndex}>{dim.id}</span>
              <ArchitecturalGlyph
                name={dim.glyph}
                size={16}
                color={isActive ? '#C882FF' : '#9A89B8'}
              />
              <span className={styles.dimName}>{dim.name}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.rightPane} role="tabpanel" aria-live="polite">
        <div className={styles.apertureStage}>
          <div className={styles.apertureFrame}>
            <div className={styles.apertureCrosshair} />
            <div
              className={styles.apertureGraphic}
              style={{
                transform: `rotate(${activeDim.rotationDeg}deg) scale(${activeDim.scaleVal})`,
              }}
            >
              <BrandEye size="md" />
            </div>
          </div>

          <div className={styles.apertureReadout}>
            <span className={styles.apertureDatum}>BrandEye Optical Aperture</span>
            <span className={styles.apertureAngle}>{activeDim.rotationDeg.toFixed(1)}&deg; Orientation</span>
            <span className={styles.apertureStatus}>
              Calibrated to Dimension {activeDim.id} &bull; Active Focal Plane
            </span>
          </div>
        </div>

        <div>
          <div className={styles.activeHeader}>
            <span className={styles.activeBadge}>DIMENSION {activeDim.id}</span>
            <ArchitecturalGlyph name={activeDim.glyph} size={18} color="#C882FF" />
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
    </div>
  );
};
