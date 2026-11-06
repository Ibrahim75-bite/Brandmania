import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { constructMetadata } from '@/infrastructure/seo/metadata';
import { ThankYouClient } from './ThankYouClient';

export const metadata: Metadata = constructMetadata({
  title: 'Thank You | BRANDMANIA Private Consultation',
  description: 'Your strategic consultation details have been processed by BRANDMANIA advisory.',
  canonicalPath: '/consultation/thank-you',
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '80vh', backgroundColor: '#0D0118' }} />
      }
    >
      <ThankYouClient />
    </Suspense>
  );
}

