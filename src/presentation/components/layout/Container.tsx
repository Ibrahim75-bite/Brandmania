import React, { HTMLAttributes } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
}

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
        maxWidth: '100vw',
        padding: '0 clamp(1.5rem, 3vw, 4rem)',
        margin: '0 auto',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
