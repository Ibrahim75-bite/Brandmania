import React, { forwardRef, HTMLAttributes } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
}

const sectionPadding = {
  none: '0',
  sm: 'var(--space-8) 0',
  md: 'var(--space-16) 0',
  lg: 'var(--space-24) 0',
  xl: 'var(--space-32) 0',
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { children, spacing = 'md', style, ...props },
  ref
) {
  return (
    <section
      ref={ref}
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
});
