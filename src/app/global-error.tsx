'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#08090a', color: '#f8fafc', padding: '2rem', fontFamily: 'sans-serif' }}>
        <h2>System Crash Recovery</h2>
        <p style={{ color: '#ef4444', margin: '1rem 0' }}>{error.message || 'Fatal system error'}</p>
        <button
          onClick={() => reset()}
          style={{
            padding: '8px 16px',
            backgroundColor: '#d4af37',
            color: '#08090a',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Restart Application
        </button>
      </body>
    </html>
  );
}
