import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { constructMetadata } from '@/infrastructure/seo/metadata';
import { ConsultationClient } from './ConsultationClient';

export const metadata: Metadata = constructMetadata({
  title: 'Private Executive Consultation | BRANDMANIA',
  description:
    'In 30 minutes, see the 2–3 hidden leaks costing you sales—without spending a dollar more on ads. Private 1-on-1 working session.',
  canonicalPath: '/consultation',
  noIndex: true,
});

export default function ConsultationPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '100vh', backgroundColor: '#0D0118' }} />
      }
    >
      <ConsultationClient />
    </Suspense>
  );
}
