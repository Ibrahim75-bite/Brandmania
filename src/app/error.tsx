'use client';

import React, { useEffect } from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Alert } from '@/presentation/components/primitives/Alert';
import { Button } from '@/presentation/components/primitives/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') console.error('App-level runtime error:', error);
  }, [error]);

  return (
    <Container size="sm" style={{ padding: 'var(--space-16) var(--space-4)' }}>
      <Alert variant="error" title="Application Error Detected">
        <p style={{ marginBottom: 'var(--space-4)', color: 'var(--color-text-secondary)' }}>
          {error.message || 'An unexpected client error occurred during processing.'}
        </p>
        <Button variant="primary" size="sm" onClick={() => reset()}>
          Retry Operation
        </Button>
      </Alert>
    </Container>
  );
}
