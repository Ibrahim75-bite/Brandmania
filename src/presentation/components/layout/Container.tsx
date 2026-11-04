import React, { HTMLAttributes } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const sizeMap: Record<'sm' | 'md' | 'lg' | 'full', string> = {
  sm: '760px',
  md: '1080px',
  lg: '1360px',
  full: '1480px',
};

export function Container({
  children,
  size = 'full',
  style,
  ...props
}: ContainerProps) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: sizeMap[size],
        padding: '0 clamp(1.5rem, 4vw, 4rem)',
        margin: '0 auto',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
