import React, { HTMLAttributes } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const maxSizes = {
  sm: '768px',
  md: '1024px',
  lg: '1280px',
  full: '100%',
};

export function Container({
  children,
  size = 'lg',
  style,
  ...props
}: ContainerProps) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: maxSizes[size],
        margin: '0 auto',
        padding: '0 var(--container-padding)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'none';
}

const sectionPadding = {
  none: '0',
  sm: 'var(--space-8) 0',
  md: 'var(--space-16) 0',
  lg: 'var(--space-24) 0',
};

export function Section({
  children,
  spacing = 'md',
  style,
  ...props
}: SectionProps) {
  return (
    <section
      style={{
        width: '100%',
        padding: sectionPadding[spacing],
        position: 'relative',
        ...style,
      }}
      {...props}
    >
      {children}
    </section>
  );
}
