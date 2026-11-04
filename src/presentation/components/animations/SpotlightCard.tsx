'use client';

import React, { useRef } from 'react';
import styles from './SpotlightCard.module.css';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  spotlightColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  style = {},
  spotlightColor = 'rgba(255, 255, 255, 0.04)',
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`${styles.spotlightCard} ${className}`}
      style={style}
      {...props}
    >
      <div className={styles.spotlightGlow} aria-hidden="true" />
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
};
