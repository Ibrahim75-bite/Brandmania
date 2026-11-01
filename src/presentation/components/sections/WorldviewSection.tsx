'use client';

import React from 'react';

export const WorldviewSection: React.FC = () => {
  return (
    <section
      id="manifesto"
      style={{
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        padding: 'clamp(var(--space-16), 8vw, var(--space-28)) clamp(1.5rem, 3vw, 4rem)',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 12-Column Swiss Architectural Grid Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'var(--space-6)',
          alignItems: 'start',
        }}
      >
        {/* Left Exposed Index Column (Cols 1-2) */}
        <div
          style={{
            gridColumn: 'span 2',
            fontFamily: 'var(--font-Mono), monospace',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-brand-light-violet, #c084fc)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: 'var(--space-3)',
          }}
        >
          (02) / MANIFESTO
        </div>

        {/* Monumental Instrument Serif Statement Spanning 10 Columns */}
        <div
          style={{
            gridColumn: 'span 10',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-8), 4vw, var(--space-12))',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-Editorial), Georgia, serif',
              fontSize: 'clamp(3.2rem, 6.5vw, 6.8rem)',
              fontWeight: 400,
              lineHeight: 0.96,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: 0,
            }}
          >
            Branding is not what it looks like.{' '}
            <em
              style={{
                fontFamily: 'var(--font-Editorial), Georgia, serif',
                fontStyle: 'italic',
                color: '#C882FF',
              }}
            >
              It is how you communicate.
            </em>{' '}
            Attention does not mean revenue.
          </h2>

          {/* Clean Razor-Sharp Architectural Footnote */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              paddingTop: 'var(--space-6)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-Editorial), Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
                color: 'rgba(255, 255, 255, 0.75)',
                margin: 0,
                maxWidth: '720px',
              }}
            >
              &ldquo;Let people applaud your second to greatest work, because you&rsquo;re creating your greatest.&rdquo;
            </p>

            <span
              style={{
                fontFamily: 'var(--font-Mono), monospace',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted, #7c7e94)',
              }}
            >
              THE BRANDMANIA DOCTRINE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
