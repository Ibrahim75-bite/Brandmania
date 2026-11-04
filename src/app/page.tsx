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
import { CapabilitiesSection } from '@/presentation/components/sections/CapabilitiesSection';
import { QualificationSection } from '@/presentation/components/sections/QualificationSection';
import { ArchitecturalSkeleton } from '@/presentation/components/primitives/ArchitecturalSkeleton';

import { constructMetadata } from '@/infrastructure/seo/metadata';

/**
 * #3 Performance: Dynamic code splitting — below-the-fold heavy interactive
 * islands lazy-loaded with ArchitecturalSkeleton fallbacks.
 * ArtifactGallery is section 08 (below the fold) — deferred until needed.
 */
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

export const metadata: Metadata = constructMetadata({
  title: 'BRANDMANIA — Branded for the Best | Commercial Advisory',
  description:
    'Strategic branding and commercial advisory for established brands ($700,000+ annual revenue) across Brand Direction, Margin Recovery, and Consumer Scope.',
  canonicalPath: '',
});

export default function HomePage() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Tactile Micro-Noise Texture */}
      <NoiseOverlay patternAlpha={9} patternRefreshInterval={3} />

      {/* 01. Architectural Hero Stage */}
      <HeroSection />

      {/* 02. The Manifesto */}
      <WorldviewSection />

      {/* 03. The Strategic Dilemma */}
      <DilemmaSection />

      {/* 04. The Continuous Causal System */}
      <SystemSection />

      {/* 05. Flagship 01 — Brand Direction (Warm Museum Alabaster Stage) */}
      <BrandDirectionSection />

      {/* 06. Flagship 02 — Margin Recovery (Deep Obsidian Commercial Audit Table) */}
      <MarginRecoverySection />

      {/* 07. Flagship 03 — Consumer Scope (Spatial Behavioral Lens with BrandEye Watermark) */}
      <ConsumerScopeSection />

      {/* 08. Selected Work — Campaign Artifact Lookbook (lazy-loaded) */}
      <ArtifactGallery />

      {/* 09. Supporting Capabilities — Full-Spectrum Architecture */}
      <CapabilitiesSection />

      {/* 10. Qualification & Strategic Consultation Intake */}
      <QualificationSection />
    </div>
  );
}
