import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { NoiseOverlay } from '@/presentation/components/animations/NoiseOverlay';
import { HeroSection } from '@/presentation/components/sections/HeroSection';
import { WorldviewSection } from '@/presentation/components/sections/WorldviewSection';
import { DilemmaSection } from '@/presentation/components/sections/DilemmaSection';
import { SystemSection } from '@/presentation/components/sections/SystemSection';
import { BrandDirectionSection } from '@/presentation/components/sections/BrandDirectionSection';
import { MarginRecoverySection } from '@/presentation/components/sections/MarginRecoverySection';
import { ConsumerScopeSection } from '@/presentation/components/sections/ConsumerScopeSection';
import { ArchitecturalSkeleton } from '@/presentation/components/primitives/ArchitecturalSkeleton';

import { constructMetadata } from '@/infrastructure/seo/metadata';

const ArtifactGallery = dynamic(
  () => import('@/presentation/components/sections/ArtifactGallery').then((mod) => mod.ArtifactGallery),
  {
    loading: () => (
      <section id="work" style={{ minHeight: '600px', width: '100%' }}>
        <ArchitecturalSkeleton width="100%" height="600px" />
      </section>
    ),
  }
);

const CapabilitiesSection = dynamic(
  () => import('@/presentation/components/sections/CapabilitiesSection').then((mod) => mod.CapabilitiesSection),
  {
    loading: () => (
      <section style={{ minHeight: '400px', width: '100%', backgroundColor: '#070709' }}>
        <ArchitecturalSkeleton width="100%" height="400px" />
      </section>
    ),
  }
);

const QualificationSection = dynamic(
  () => import('@/presentation/components/sections/QualificationSection').then((mod) => mod.QualificationSection),
  {
    loading: () => (
      <section style={{ minHeight: '400px', width: '100%', backgroundColor: '#070709' }}>
        <ArchitecturalSkeleton width="100%" height="400px" />
      </section>
    ),
  }
);

export const metadata: Metadata = constructMetadata({
  title: 'BRANDMANIA — Branded for the Best | Commercial Advisory',
  description:
    'Strategic branding and commercial advisory for established brands ($700,000+ annual revenue) across Brand Direction, Margin Recovery, and Consumer Scope.',
  canonicalPath: '',
});

export default function HomePage() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {}
      <NoiseOverlay patternAlpha={9} patternRefreshInterval={3} />

      {}
      <section id="manifesto">
        <HeroSection />
      </section>

      {}
      <section id="system">
        <WorldviewSection />
      </section>

      {}
      <section id="disciplines">
        <DilemmaSection />
      </section>

      {}
      <section id="continuous-system">
        <SystemSection />
      </section>

      {}
      <section id="brand-direction">
        <BrandDirectionSection />
      </section>

      {}
      <section id="margin-recovery">
        <MarginRecoverySection />
      </section>

      {}
      <section id="consumer-scope">
        <ConsumerScopeSection />
      </section>

      {}
      <section id="work">
        <ArtifactGallery />
      </section>

      {}
      <section id="capabilities">
        <CapabilitiesSection />
      </section>

      {}
      <section id="qualification">
        <QualificationSection />
      </section>
    </div>
  );
}
