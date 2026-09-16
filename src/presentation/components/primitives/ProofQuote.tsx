import React from 'react';

export interface ProofQuoteProps {
  quote: string;
  author: string;
  title: string;
  industry?: string;
  className?: string;
}

export function ProofQuote({
  quote,
  author,
  title,
  industry,
  className = '',
}: ProofQuoteProps) {
  return (
    <blockquote
      className={className}
      style={{
        margin: 0,
        padding: 'var(--space-8)',
        backgroundColor: 'var(--color-bg-elevated)',
        borderLeft: '3px solid var(--color-accent-purple-bright)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        position: 'relative',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-family-serif)',
          fontSize: 'var(--font-size-lg)',
          fontStyle: 'italic',
          color: 'var(--color-text-primary)',
          lineHeight: 'var(--line-height-relaxed)',
          margin: 0,
        }}
      >
        “{quote}”
      </p>

      <footer style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <cite
          style={{
            fontStyle: 'normal',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-sm)',
            color: '#fff',
          }}
        >
          {author}
        </cite>
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
          {title} {industry ? `• ${industry}` : ''}
        </span>
      </footer>
    </blockquote>
  );
}
