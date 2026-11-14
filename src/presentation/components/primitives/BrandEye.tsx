'use client';

import React, { useState } from 'react';

export interface BrandEyeProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  className?: string;
  idSuffix?: string;
}

const SIZE_MAP = {
  sm: 28,
  md: 36,
  lg: 52,
  xl: 84,
} as const;

export function BrandEye({
  size = 'md',
  glow = true,
  className = '',
}: BrandEyeProps) {
  const px = SIZE_MAP[size] || 36;
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        color: '#FFFFFF',
        width: px,
        height: px,
        minWidth: px,
        minHeight: px,
        flexShrink: 0,
        transition: hovered ? undefined : 'opacity 200ms ease',
        opacity: hovered ? 0.85 : 1,
        filter: glow ? 'none' : 'none',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="475 309 1050 1050"
        width={px}
        height={px}
        style={{
          width: px,
          height: px,
          display: 'block',
          flexShrink: 0,
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <use href="#brandEyeGlyph" />
      </svg>
    </span>
  );
}
