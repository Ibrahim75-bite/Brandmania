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
import { CapabilitiesSection } from '@/presentation/components/sections/CapabilitiesSection';
import { MethodologySection } from '@/presentation/components/sections/MethodologySection';
import { BriefingSection } from '@/presentation/components/sections/BriefingSection';
import { ArtifactGallery } from '@/presentation/components/sections/ArtifactGallery';
import { QualificationSection } from '@/presentation/components/sections/QualificationSection';

export const metadata: Metadata = {
  title: 'BRANDMANIA | Branded For The Best — Strategic Brand Architecture',
  description:
    'Strategic brand architecture, commercial margin recovery, and consumer scope engineering for enterprises and high-trajectory brands generating $700,000+ in annual revenue.',
};

export default function HomePage() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* React Bits Tactile Film Grain Canvas */}
      <NoiseOverlay patternAlpha={11} patternRefreshInterval={3} />

      {/* 01. Hero / Brand Introduction */}
      <HeroSection />

      {/* 02. The BRANDMANIA Worldview */}
      <WorldviewSection />

      {/* 03. The Strategic Dilemma */}
      <DilemmaSection />

      {/* 04. The BRANDMANIA System */}
      <SystemSection />

      {/* 05. Flagship I: Brand Direction */}
      <BrandDirectionSection />

      {/* 06. Flagship II: Margin Recovery */}
      <MarginRecoverySection />

      {/* 07. Flagship III: Consumer Scope */}
      <ConsumerScopeSection />

      {/* 08. Integrated Supporting Capabilities */}
      <CapabilitiesSection />

      {/* 09. The Strategic Briefing (Cinematic Interlude) */}
      <BriefingSection />

      {/* 10. Brand Materiality & Artifact Exhibition */}
      <ArtifactGallery />

      {/* 11. Methodology & Rigor (Process Ledger & Confidentiality) */}
      <MethodologySection />

      {/* 12. Strategic Intake Terminal */}
      <QualificationSection />
    </div>
  );
}
