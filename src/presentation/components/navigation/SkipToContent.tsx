'use client';

import React from 'react';

/**
 * Accessible Skip to Main Content Link
 * Hidden offscreen until focused by keyboard Tab navigation.
 * Standard #15 (WCAG 2.1 AA Success Criterion 2.4.1 Bypass Blocks)
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: '-100px',
        left: '16px',
        zIndex: 9999,
        padding: '12px 18px',
        background: '#FFFFFF',
        color: '#070709',
        fontSize: '13px',
        fontWeight: 600,
        fontFamily: 'var(--font-mono), monospace',
        textDecoration: 'none',
        borderRadius: '0px',
        border: '2px solid #C882FF',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
        transition: 'top 0.15s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = '16px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-100px';
      }}
    >
      Skip to main content &crarr;
    </a>
  );
}
