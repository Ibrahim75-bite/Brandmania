import React from 'react';
import styles from './BrandEye.module.css';

export interface BrandEyeProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  className?: string;
  idSuffix?: string;
}

export function BrandEye({
  size = 'md',
  glow = true,
  className = '',
  idSuffix = 'eye',
}: BrandEyeProps) {
  const glowId = `eyeGlow_${idSuffix}`;
  const pupilId = `pupilGrad_${idSuffix}`;
  const auraId = `aura_${idSuffix}`;

  const classNames = [
    styles.container,
    styles[size],
    glow ? styles.glow : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} aria-hidden="true">
      <svg
        viewBox="0 0 120 120"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={glowId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id={pupilId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#e9d5ff" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <radialGradient id={auraId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7928ca" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#070709" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="60" cy="60" r="56" fill={`url(#${auraId})`} />

        {/* Outer Geometric Sclera Contour */}
        <path
          d="M12 60C24 38 42 26 60 26C78 26 96 38 108 60C96 82 78 94 60 94C42 94 24 82 12 60Z"
          stroke={`url(#${glowId})`}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner Iris Ring */}
        <circle
          cx="60"
          cy="60"
          r="22"
          stroke={`url(#${glowId})`}
          strokeWidth="2.5"
          strokeDasharray="2 4"
        />

        {/* Core Pupil & Cognitive Aperture */}
        <circle cx="60" cy="60" r="12" fill={`url(#${pupilId})`} />
        <circle cx="60" cy="60" r="5" fill="#070709" />

        {/* Perception Alignment Points */}
        <circle cx="60" cy="18" r="2" fill="#c084fc" />
        <circle cx="60" cy="102" r="2" fill="#c084fc" />
        <circle cx="4" cy="60" r="2" fill="#9333ea" />
        <circle cx="116" cy="60" r="2" fill="#9333ea" />
      </svg>
    </span>
  );
}
