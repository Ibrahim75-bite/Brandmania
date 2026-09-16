import React from 'react';

export interface StatBlockProps {
  value: string;
  label: string;
  context?: string;
  className?: string;
}

export function StatBlock({ value, label, context, className = '' }: StatBlockProps) {
  return (
    <div
      className={className}
      style={{
        padding: 'var(--space-6)',
        backgroundColor: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-family-serif)',
          fontSize: 'var(--font-size-4xl)',
          fontWeight: 'var(--font-weight-bold)',
          background: 'linear-gradient(135deg, #ffffff 0%, var(--color-accent-purple-bright) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-text-primary)',
          letterSpacing: '0.04em',
        }}
      >
        {label}
      </div>
      {context && (
        <div
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-muted)',
            lineHeight: 'var(--line-height-normal)',
          }}
        >
          {context}
        </div>
      )}
    </div>
  );
}
