import React from 'react';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { EmptyState } from '@/presentation/components/feedback/EmptyState';
import { Button } from '@/presentation/components/primitives/Button';

export default function NotFound() {
  return (
    <Container size="sm" style={{ padding: 'var(--space-20) var(--space-4)' }}>
      <EmptyState
        title="404 — Resource Not Found"
        description="The requested architectural resource or endpoint does not exist on this environment."
        action={
          <Link href="/">
            <Button variant="primary" size="md">
              Return to Foundation Surface
            </Button>
          </Link>
        }
      />
    </Container>
  );
}
