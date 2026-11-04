import React from 'react';
import styles from './CornerArcs.module.css';

export interface CornerArcsProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  className?: string;
}

export function CornerArcs({
  position = 'top-left',
  size = 200,
  color = '#FFFFFF',
  opacity = 0.25,
  strokeWidth = 14,
  className = '',
}: CornerArcsProps) {
  const positionClass =
    position === 'top-left'
      ? styles.topLeft
      : position === 'top-right'
      ? styles.topRight
      : position === 'bottom-left'
      ? styles.bottomLeft
      : styles.bottomRight;

  return (
    <div
      className={`${styles.cornerArcsContainer} ${positionClass} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.arcSvg}
      >
        {}
        <path
          d="M 60 0 A 60 60 0 0 1 0 60"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={opacity}
          fill="none"
        />
        <path
          d="M 120 0 A 120 120 0 0 1 0 120"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={opacity}
          fill="none"
        />
        <path
          d="M 180 0 A 180 180 0 0 1 0 180"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={opacity}
          fill="none"
        />
      </svg>
    </div>
  );
}
