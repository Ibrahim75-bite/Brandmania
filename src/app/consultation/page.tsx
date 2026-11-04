import React from 'react';
import type { Metadata } from 'next';
import { constructMetadata } from '@/infrastructure/seo/metadata';
import { ConsultationClient } from './ConsultationClient';

export const metadata: Metadata = constructMetadata({
  title: 'Executive Briefing Consultation | BRANDMANIA',
  description:
    'Private executive briefing and diagnostic session for qualified enterprises generating $700,000+ annual revenue.',
  canonicalPath: '/consultation',
  noIndex: true,
});

export default function ConsultationPage() {
  return <ConsultationClient />;
}
