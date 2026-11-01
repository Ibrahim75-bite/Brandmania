import React from 'react';

interface ArchitecturalSkeletonProps {
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  className?: string;
  hasHairlines?: boolean;
}

export const ArchitecturalSkeleton: React.FC<ArchitecturalSkeletonProps> = ({
  width = '100%',
  height = '100%',
  style,
  className = '',
  hasHairlines = true,
}) => {
  return (
    <div
      className={`architectural-skeleton ${className}`}
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#070709',
        border: hasHairlines ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #070709 0%, #160029 50%, #070709 100%)',
          backgroundSize: '200% 100%',
          animation: 'architecturalShimmer 1.8s infinite ease-in-out',
        }}
      />
    </div>
  );
};
