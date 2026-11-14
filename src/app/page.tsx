import React from 'react';
import type { Metadata } from 'next';
import { NoiseOverlay } from '@/presentation/components/animations/NoiseOverlay';
import { HeroSection } from '@/presentation/components/sections/HeroSection';
import { WorldviewSection } from '@/presentation/components/sections/WorldviewSection';
import { DilemmaSection } from '@/presentation/components/sections/DilemmaSection';
import { SystemSection } from '@/presentation/components/sections/SystemSection';
import { BrandDirectionSection } from '@/presentation/components/sections/BrandDirectionSection';
import { MarginRecoverySection } from '@/presentation/components/sections/MarginRecoverySection';
import { ConsumerScopeSection } from '@/presentation/components/sections/ConsumerScopeSection';
import { ArtifactGallery } from '@/presentation/components/sections/ArtifactGallery';
import { CapabilitiesSection } from '@/presentation/components/sections/CapabilitiesSection';
import { QualificationSection } from '@/presentation/components/sections/QualificationSection';
import { constructMetadata } from '@/infrastructure/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'BRANDMANIA — Branded for the Best | Commercial Advisory',
  description:
    'Strategic branding and commercial advisory for established brands ($700,000+ annual revenue) across Brand Direction, Margin Recovery, and Consumer Scope.',
  canonicalPath: '',
});

export default function HomePage() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <NoiseOverlay patternAlpha={9} />
      <HeroSection />
      <WorldviewSection />
      <DilemmaSection />
      <SystemSection />
      <BrandDirectionSection />
      <MarginRecoverySection />
      <ConsumerScopeSection />
      <ArtifactGallery />
      <CapabilitiesSection />
      <QualificationSection />
    </div>
  );
}
