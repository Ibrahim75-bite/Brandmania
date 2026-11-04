### FILE: E:\Ibrahim's website\src\middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const proto = request.headers.get('x-forwarded-proto');
  const host = request.headers.get('host') || '';

  // Enforce HTTPS redirect behind production proxies (skip on local dev environments)
  if (
    proto === 'http' &&
    !host.startsWith('localhost') &&
    !host.startsWith('127.0.0.1')
  ) {
    const httpsUrl = new URL(request.url);
    httpsUrl.protocol = 'https:';
    return NextResponse.redirect(httpsUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files and image optimization
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};


### FILE: E:\Ibrahim's website\src\app\apple-icon.tsx

import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#070709',
          borderRadius: '22%',
          border: '4px solid #161622',
        }}
      >
        <svg
          viewBox="0 0 180 180"
          width="130"
          height="130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Radial outer glow boundary */}
          <circle cx="90" cy="90" r="80" stroke="#8E00FA" strokeWidth="8" strokeOpacity="0.4" />
          {/* Obsidian iris channel */}
          <circle cx="90" cy="90" r="64" stroke="#8E00FA" strokeWidth="12" />
          {/* Electric violet pupil */}
          <circle cx="90" cy="90" r="38" fill="#8E00FA" />
          {/* Focal core highlight */}
          <circle cx="90" cy="90" r="16" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}


### FILE: E:\Ibrahim's website\src\app\error.tsx

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
    console.error('App-level runtime error:', error);
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


### FILE: E:\Ibrahim's website\src\app\global-error.tsx

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


### FILE: E:\Ibrahim's website\src\app\icon.tsx

import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#070709',
          borderRadius: '25%',
        }}
      >
        <svg
          viewBox="0 0 32 32"
          width="26"
          height="26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Obsidian outer iris */}
          <circle cx="16" cy="16" r="14" fill="#070709" stroke="#8E00FA" strokeWidth="2.5" />
          {/* Electric violet pupil */}
          <circle cx="16" cy="16" r="8" fill="#8E00FA" />
          {/* Pure white core reflection */}
          <circle cx="16" cy="16" r="3.5" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}


### FILE: E:\Ibrahim's website\src\app\layout.tsx

import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import React from 'react';
import '../presentation/styles/globals.css';
import { Header, Footer } from '@/presentation/components/layout/Header';
import { ErrorBoundary } from '@/presentation/components/feedback/ErrorBoundary';
import { CookieConsentBanner } from '@/presentation/components/compliance/CookieConsentBanner';
import { AnalyticsProvider } from '@/presentation/components/analytics/AnalyticsProvider';
import { SmoothScroll } from '@/presentation/components/layout/SmoothScroll';
import { constructMetadata } from '@/infrastructure/seo/metadata';
import { StructuredData } from '@/presentation/components/seo/StructuredData';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#070709',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVariables = `${instrumentSerif.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`;

  return (
    <html lang="en" className={fontVariables}>
      <body
        className={fontVariables}
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: 'var(--surface-obsidian, #070709)',
          color: 'var(--color-text-primary, #ffffff)',
          fontFamily: 'var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <AnalyticsProvider>
          <StructuredData />
          <SmoothScroll />
          <Header />
          <main style={{ flex: 1 }}>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>
          <Footer />
          <CookieConsentBanner />
        </AnalyticsProvider>
      </body>
    </html>
  );
}


### FILE: E:\Ibrahim's website\src\app\not-found.tsx

import React from 'react';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { Badge } from '@/presentation/components/primitives/Badge';

export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        color: '#EAE6F0',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 3vw, 4rem)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      {/* Precision Corner Arcs */}
      <CornerArcs position="top-left" size={240} opacity={0.15} color="#8E00FA" strokeWidth={12} />
      <CornerArcs position="bottom-right" size={240} opacity={0.12} color="#C882FF" strokeWidth={12} />

      {/* Watermark BrandEye */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '640px',
          height: '640px',
          opacity: 0.04,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        <BrandEye size="xl" glow={false} idSuffix="notFoundWatermark" />
      </div>

      <Container size="md">
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            border: '1px solid rgba(255, 255, 255, 0.12)',
            backgroundColor: 'rgba(7, 7, 9, 0.85)',
            backdropFilter: 'blur(16px)',
            padding: 'clamp(2.5rem, 5vw, 4.5rem)',
            textAlign: 'center',
          }}
        >
          {/* Diagnostic Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
            <Badge variant="purple" size="sm">
              ERROR 404 // DISCONNECTED COORDINATE
            </Badge>
          </div>

          {/* Instrument Serif Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-Editorial), serif',
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: 'var(--space-4)',
            }}
          >
            0404 / Perception Lost.
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: '#A8A0B8',
              lineHeight: 1.6,
              maxWidth: '560px',
              margin: '0 auto var(--space-8)',
            }}
          >
            The requested architectural resource, strategic brief, or digital coordinate does not exist within the current BRANDMANIA perception system.
          </p>

          {/* Navigation Action */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '48px',
                padding: '0.85rem 2rem',
                backgroundColor: '#8E00FA',
                color: '#FFFFFF',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                boxShadow: '0 0 24px rgba(142, 0, 250, 0.35)',
                transition: 'all 0.2s ease',
              }}
            >
              Return to Brandmania ↗
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\app\opengraph-image.tsx

import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'BRANDMANIA — Branded for the Best';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          backgroundColor: '#070709',
          color: '#FFFFFF',
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(142, 0, 250, 0.25) 0%, transparent 60%)',
          border: '12px solid #0F0F14',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#8E00FA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 24px #8E00FA',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              BRANDMANIA
            </span>
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: '0.12em',
              color: '#C882FF',
              textTransform: 'uppercase',
              border: '1px solid rgba(200, 130, 255, 0.3)',
              padding: '6px 16px',
            }}
          >
            Commercial Advisory &bull; $700K+
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Branded for the Best.
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#A8A0B8',
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            Brand Direction &bull; Margin Recovery &bull; Consumer Scope
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '24px',
            fontSize: 16,
            color: '#A8A0B8',
          }}
        >
          <span>brandmania.com</span>
          <span style={{ color: '#C882FF' }}>Executive Qualification Protocol</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}


### FILE: E:\Ibrahim's website\src\app\page.tsx

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

      {/* 08. Selected Work — Campaign Artifact Lookbook */}
      <ArtifactGallery />

      {/* 09. Supporting Capabilities — Full-Spectrum Architecture */}
      <CapabilitiesSection />

      {/* 10. Qualification & Strategic Consultation Intake */}
      <QualificationSection />
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\app\robots.ts

import type { MetadataRoute } from 'next';
import { seoConfig } from '@/content/seoConfig';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = seoConfig.siteUrl;

  const aiAndSearchBots = [
    '*',
    'Googlebot',
    'Bingbot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'GPTBot',
    'ClaudeBot',
    'Claude-Web',
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended',
  ];

  return {
    rules: aiAndSearchBots.map((bot) => ({
      userAgent: bot,
      allow: '/',
      disallow: ['/api/', '/dev/'],
    })),
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}


### FILE: E:\Ibrahim's website\src\app\sitemap.ts

import type { MetadataRoute } from 'next';
import { seoConfig } from '@/content/seoConfig';
import { getAllFunnelSlugs } from '@/content/funnels';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = seoConfig.siteUrl;
  const now = new Date();

  // Helper to generate hreflang alternates matching <head>
  const createLanguageAlternates = (route: string) => {
    const canonical = `${siteUrl}${route}`;
    const languages: Record<string, string> = {
      'x-default': canonical,
    };
    for (const locale of seoConfig.locales) {
      if (locale !== 'x-default') {
        languages[locale] = canonical;
      }
    }
    return languages;
  };

  interface RouteDefinition {
    path: string;
    priority: number;
    changeFrequency:
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'monthly'
      | 'yearly'
      | 'never';
  }

  const coreRoutes: RouteDefinition[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/services/brand-direction', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/services/margin-recovery', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/services/consumer-scope', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/work', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
    // AI search dossiers
    { path: '/llms.txt', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/llms-full.txt', priority: 0.7, changeFrequency: 'weekly' },
  ];

  const funnelRoutes: RouteDefinition[] = getAllFunnelSlugs().map((slug) => ({
    path: `/f/${slug}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }));

  const allRoutes = [...coreRoutes, ...funnelRoutes];

  return allRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: createLanguageAlternates(route.path),
    },
  }));
}


### FILE: E:\Ibrahim's website\src\app\about\page.tsx

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { Card } from '@/presentation/components/primitives/Card';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { BRAND } from '@/content/brand';
import { FOUNDER } from '@/content/founder';

export const metadata: Metadata = {
  title: 'Philosophy & Leadership | BRANDMANIA',
  description:
    'The philosophy behind BRANDMANIA: Commanding Category Leadership, taking over minds, and engineering market leaders.',
};

export default function AboutPage() {
  return (
    <div>
      <Section spacing="lg" style={{ paddingTop: 'var(--space-16)', backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <Container>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <Badge variant="purple" size="md">
                STRATEGIC PHILOSOPHY
              </Badge>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-5xl)',
                color: '#fff',
                marginBottom: 'var(--space-4)',
              }}
            >
              Commanding Category Leadership
            </h1>
            <p style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-accent-purple-bright)', fontStyle: 'italic', marginBottom: 'var(--space-4)' }}>
              “{BRAND.internalPhilosophy}”
            </p>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
              BRANDMANIA exists to resolve the central tension of modern commerce: why ambitious brands with remarkable products consistently fail to retain margin and command their rightful category authority.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="xl">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-12)' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 'var(--font-size-3xl)', color: '#fff', marginBottom: 'var(--space-4)' }}>
                The Commercial Doctrine
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-4)' }}>
                We reject the agency model that sells ad spend and deliverables to businesses that cannot retain profit. Marketing is not an expense line to be bloated—it is the strategic acceleration of a finely tuned commercial machine.
              </p>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
                Our conviction is simple: <strong>Let&apos;s make you a market leader.</strong> That requires fixing the machine before buying traffic, defining strategic brand direction, and mastering consumer psychology.
              </p>
            </div>

            {/* Founder Authority Section */}
            <Card variant="elevated" style={{ padding: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <BrandEye size="sm" />
                <div>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', color: '#fff', margin: 0 }}>
                    {FOUNDER.name}
                  </h3>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-purple-bright)' }}>
                    {FOUNDER.role}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-6)' }}>
                {FOUNDER.biography}
              </p>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-4)' }}>
                <h4 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent-purple-bright)', marginBottom: 'var(--space-3)' }}>
                  Strategic Credentials
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {FOUNDER.credentials.map((cred, idx) => (
                    <li key={idx} style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                      • {cred}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-16)' }}>
            <Link href="/#consultation" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                Consult With Leadership →
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\app\api\health\route.ts

import { NextRequest } from 'next/server';
import { container } from '@/infrastructure/container';
import { extractRequestContext } from '@/infrastructure/http/request-context';
import { apiSuccess } from '@/infrastructure/http/api-response';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const ctx = extractRequestContext(req);
  const healthData = container.getSystemHealthUseCase.getLiveness();
  return apiSuccess(healthData, ctx.requestId, 200);
}


### FILE: E:\Ibrahim's website\src\app\api\ready\route.ts

import { NextRequest } from 'next/server';
import { container } from '@/infrastructure/container';
import { extractRequestContext } from '@/infrastructure/http/request-context';
import { apiSuccess } from '@/infrastructure/http/api-response';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const ctx = extractRequestContext(req);
  const readinessData = await container.getSystemHealthUseCase.getReadiness();
  const statusCode = readinessData.status === 'ready' ? 200 : 503;
  return apiSuccess(readinessData, ctx.requestId, statusCode);
}


### FILE: E:\Ibrahim's website\src\app\api\v1\inquiries\route.ts

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { container } from '@/infrastructure/container';
import { extractRequestContext } from '@/infrastructure/http/request-context';
import { apiSuccess } from '@/infrastructure/http/api-response';
import { handleHttpError } from '@/infrastructure/http/error-handler';
import { RateLimitError } from '@/application/errors/application.error';
import { submitInquirySchema } from '@/domain/validation/inquiry.schema';
import { idempotencyStore } from '@/infrastructure/security/idempotency';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const ctx = extractRequestContext(req);
  const idempotencyKey = req.headers.get('Idempotency-Key') || req.headers.get('idempotency-key');

  if (idempotencyKey) {
    const cached = idempotencyStore.get(idempotencyKey);
    if (cached && cached.status === 'RESOLVED' && cached.response) {
      return new Response(JSON.stringify(cached.response.body), {
        status: cached.response.statusCode,
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotent-Replay': 'true',
          'X-Request-Id': ctx.requestId,
        },
      });
    }
  }

  try {
    // 1. Rate Limiting Check (Layer 3: IP Rate Limiting -> HTTP 429)
    const rateLimit = await container.rateLimiter.checkLimit(ctx.clientIp);
    if (!rateLimit.allowed) {
      throw new RateLimitError(
        'Too many inquiry submissions from this IP. Please try again shortly.',
        rateLimit.retryAfterSeconds
      );
    }

    // 2. Parse & Validate Payload
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      throw new z.ZodError([
        {
          code: 'custom',
          message: 'Malformed JSON payload in request body',
          path: [],
        },
      ]);
    }

    // 3. Strict Shared Zod Schema Validation
    const validatedInput = submitInquirySchema.parse(rawBody);

    // 4. Anti-Spam Layer 1: Honeypot Check
    if (
      validatedInput.company_fax_number &&
      validatedInput.company_fax_number.trim().length > 0
    ) {
      container.logger.warn('Spam rejected: Honeypot field filled', {
        ip: ctx.clientIp,
        fax: validatedInput.company_fax_number,
      });
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'SPAM_REJECTED',
            message: 'Inquiry submission rejected by security telemetry.',
          },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 5. Anti-Spam Layer 2: Submission Time-Lock (< 2500ms)
    if (
      typeof validatedInput.submissionDurationMs === 'number' &&
      validatedInput.submissionDurationMs < 2500
    ) {
      container.logger.warn('Spam rejected: Submission completed too fast', {
        ip: ctx.clientIp,
        durationMs: validatedInput.submissionDurationMs,
      });
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'TIME_LOCK_VIOLATION',
            message: 'Automated submission detected: Form completed too rapidly.',
          },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 6. Execute Application Use Case
    const result = await container.submitInquiryUseCase.execute({
      clientName: validatedInput.clientName,
      companyName: validatedInput.companyName,
      email: validatedInput.email,
      companyTier: validatedInput.companyTier,
      budgetRange: validatedInput.budgetRange,
      services: validatedInput.services,
      message: validatedInput.website
        ? `[Website: ${validatedInput.website}] ${validatedInput.message}`
        : validatedInput.message,
    });

    // 7. Return Standard API Success Envelope (201 Created)
    const successEnvelope = {
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: ctx.requestId,
      },
    };

    if (idempotencyKey) {
      idempotencyStore.resolve(idempotencyKey, 201, successEnvelope);
    }

    return apiSuccess(result, ctx.requestId, 201);
  } catch (err) {
    return handleHttpError(err, ctx.requestId);
  }
}


### FILE: E:\Ibrahim's website\src\app\contact\page.tsx

import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { QualificationForm } from '@/presentation/components/forms/QualificationForm';

export const metadata: Metadata = {
  title: 'Executive Contact & Confidential Consultation | BRANDMANIA',
  description:
    'Request a confidential executive diagnostic session with BRANDMANIA leadership. Tailored for ambitious brands with ~$700k+ annual revenue trajectory.',
};

export default function ContactPage() {
  return (
    <div>
      <Section spacing="lg" style={{ paddingTop: 'var(--space-16)', backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <Container>
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <Badge variant="purple" size="md">
                EXECUTIVE LIAISON
              </Badge>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-5xl)',
                color: '#fff',
                marginBottom: 'var(--space-4)',
              }}
            >
              Initiate Strategic Dialogue
            </h1>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
              All inquiries are reviewed directly by executive partners under strict non-disclosure. Complete the diagnostic intake below to schedule your consultation.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="xl">
        <Container>
          <QualificationForm />
        </Container>
      </Section>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\app\cookies\page.tsx

import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { LEGAL_CONTENT } from '@/content/legal';

export const metadata: Metadata = {
  title: 'Cookie Policy | BRANDMANIA',
  description: 'BRANDMANIA cookie usage policy, consent governance, and telemetry disclosures.',
};

export default function CookiesPage() {
  return (
    <Section spacing="xl" style={{ paddingTop: 'var(--space-16)' }}>
      <Container>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Badge variant="purple" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
            LEGAL ARCHITECTURE
          </Badge>
          <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 'var(--font-size-4xl)', color: '#fff', marginBottom: 'var(--space-2)' }}>
            Cookie Policy &amp; Telemetry
          </h1>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
            Last Updated: September 2026
          </p>

          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-6)' }}>
            BRANDMANIA employs strict consent gating for any non-essential analytics tracking. No analytical telemetry or third-party marketing tags are initialized unless you explicitly choose to accept them via the Cookie Consent interface.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', color: '#fff', marginBottom: 'var(--space-2)' }}>
                1. Essential Security &amp; Session Cookies
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
                Essential cookies maintain CSRF security tokens, rate-limiting session IDs, and your stored privacy preferences. These cookies cannot be disabled as the website cannot function securely without them.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', color: '#fff', marginBottom: 'var(--space-2)' }}>
                2. Analytical &amp; Performance Telemetry
              </h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
                When granted, analytics cookies help us measure aggregate funnel engagement, VSL watch completion, and conversion drop-off points to optimize site performance.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}


### FILE: E:\Ibrahim's website\src\app\dev\foundation\page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Card } from '@/presentation/components/primitives/Card';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { Input } from '@/presentation/components/primitives/Input';
import { Alert } from '@/presentation/components/primitives/Alert';
import { Modal } from '@/presentation/components/primitives/Modal';

interface HealthData {
  status: string;
  uptimeSeconds: number;
  timestamp: string;
  version: string;
}

interface ReadyData {
  status: string;
  checks: {
    memory: { status: string; heapUsedMb: number };
    persistence: { status: string };
    rateLimiter: { status: string };
  };
}

export default function FoundationVerificationPage() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [readiness, setReadiness] = useState<ReadyData | null>(null);
  const [isLoadingProbes, setIsLoadingProbes] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [clientName, setClientName] = useState('Alexander Vance');
  const [companyName, setCompanyName] = useState('Vance & Co. Haute Horlogerie');
  const [email, setEmail] = useState('alexander@vance-horology.ch');
  const [companyTier, setCompanyTier] = useState('HAUTE_LUXURY');
  const [budgetRange, setBudgetRange] = useState('TIER_100K_250K');
  const [services, setServices] = useState<string[]>(['BRAND_DIRECTION', 'MARGIN_RECOVERY', 'NEUROMARKETING']);
  const [message, setMessage] = useState('Seeking complete brand direction realignment and margin recovery across European boutique channels.');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResult, setApiResult] = useState<any>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchProbes = async () => {
    setIsLoadingProbes(true);
    try {
      const [healthRes, readyRes] = await Promise.all([
        fetch('/api/health'),
        fetch('/api/ready'),
      ]);
      const healthJson = await healthRes.json();
      const readyJson = await readyRes.json();
      setHealth(healthJson.data);
      setReadiness(readyJson.data);
    } catch (err) {
      console.error('Failed to probe system health:', err);
    } finally {
      setIsLoadingProbes(false);
    }
  };

  useEffect(() => {
    fetchProbes();
  }, []);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setApiResult(null);

    try {
      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          companyName,
          email,
          companyTier,
          budgetRange,
          services,
          message,
        }),
      });

      const json = await res.json();
      setApiResult(json);
      if (!res.ok) {
        setFormError(json.error?.message || 'API request rejected');
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* 1. Header Hero Banner */}
      <Section spacing="sm" style={{ borderBottom: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <Badge variant="purple" size="md">Architectural Foundation</Badge>
              <Badge variant="success" size="md">Internal Diagnostic Harness</Badge>
            </div>
            <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 'var(--font-size-3xl)', color: 'var(--color-text-primary)' }}>
              Foundation Verification Surface
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '800px', fontSize: 'var(--font-size-sm)' }}>
              This surface actively validates layer boundaries, design tokens, UI primitives, API contracts, and real-time system probes.
              It is an internal surface separated from the public marketing experience.
            </p>
          </div>
        </Container>
      </Section>

      <Container>
        {/* 2. System Probes & Reliability */}
        <Section spacing="sm">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
              1. System Observability & Probes
            </h2>
            <Button variant="ghost" size="sm" onClick={fetchProbes} isLoading={isLoadingProbes}>
              Refresh Probes
            </Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            <Card variant="elevated">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>LIVENESS PROBE</span>
                <Badge variant={health?.status === 'healthy' ? 'success' : 'error'} size="sm">
                  {health?.status || 'Probing...'}
                </Badge>
              </div>
              <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                /api/health
              </p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                Uptime: {health ? `${health.uptimeSeconds}s` : '--'} • Version: {health?.version || '--'}
              </p>
            </Card>

            <Card variant="elevated">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>READINESS PROBE</span>
                <Badge variant={readiness?.status === 'ready' ? 'success' : 'warning'} size="sm">
                  {readiness?.status || 'Probing...'}
                </Badge>
              </div>
              <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                /api/ready
              </p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                Heap: {readiness?.checks.memory.heapUsedMb ?? '--'} MB • Persistence: {readiness?.checks.persistence.status ?? '--'}
              </p>
            </Card>

            <Card variant="elevated">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>SECURITY & RATE LIMITER</span>
                <Badge variant="purple" size="sm">Active</Badge>
              </div>
              <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                In-Memory Sliding
              </p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                Window: 60s • Max Requests: 60 / IP
              </p>
            </Card>
          </div>
        </Section>

        {/* 3. Design System & UI Primitives Sandbox */}
        <Section spacing="sm">
          <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)' }}>
            2. Design Tokens & UI Primitives Sandbox
          </h2>

          <Card variant="surface" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Colors */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
                PALETTE TOKENS
              </h3>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--color-accent-purple)' }} />
                  <span style={{ fontSize: 'var(--font-size-xs)' }}>Imperial Purple</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--color-bg-base)', border: '1px solid #333' }} />
                  <span style={{ fontSize: 'var(--font-size-xs)' }}>Obsidian #070709</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--color-bg-elevated)', border: '1px solid #333' }} />
                  <span style={{ fontSize: 'var(--font-size-xs)' }}>Elevated #161620</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--color-status-success)' }} />
                  <span style={{ fontSize: 'var(--font-size-xs)' }}>Success</span>
                </div>
              </div>
            </div>

            {/* Buttons & Dialogs */}
            <div>
              <h3 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
                BUTTON VARIANTS & DIALOGS
              </h3>
              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button variant="primary" size="md">Primary Action</Button>
                <Button variant="secondary" size="md">Secondary Action</Button>
                <Button variant="outline" size="md">Outline Action</Button>
                <Button variant="ghost" size="md">Ghost Action</Button>
                <Button variant="primary" size="md" isLoading>Loading State</Button>
                <Button variant="outline" size="md" onClick={() => setIsModalOpen(true)}>Open Test Modal</Button>
              </div>
            </div>
          </Card>
        </Section>

        {/* 4. End-to-End Architectural Test Form */}
        <Section spacing="md">
          <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-2)' }}>
            3. End-to-End Boundary Verification: Inquiry Intake API
          </h2>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
            Submits live through the full boundary stack: <code>Request Context → Rate Limiter → Zod Schema → SubmitInquiryUseCase → Domain Entity → InMemoryRepository → Standardized Response</code>.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--space-6)' }}>
            <Card variant="elevated">
              <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <Input
                  label="Executive Client Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
                <Input
                  label="Corporate Entity / Brand"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
                <Input
                  label="Business Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                      Company Tier
                    </label>
                    <select
                      value={companyTier}
                      onChange={(e) => setCompanyTier(e.target.value)}
                      style={{
                        width: '100%',
                        height: 42,
                        marginTop: 4,
                        background: 'var(--color-bg-surface)',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border-default)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0 8px',
                      }}
                    >
                      <option value="HAUTE_LUXURY">Haute Luxury</option>
                      <option value="GLOBAL_ENTERPRISE">Global Enterprise</option>
                      <option value="MID_MARKET">Mid Market</option>
                      <option value="EMERGING_ENTERPRISE">Emerging Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                      Budget Allocation
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      style={{
                        width: '100%',
                        height: 42,
                        marginTop: 4,
                        background: 'var(--color-bg-surface)',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border-default)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0 8px',
                      }}
                    >
                      <option value="TIER_50K_100K">$50k - $100k</option>
                      <option value="TIER_100K_250K">$100k - $250k</option>
                      <option value="TIER_250K_500K">$250k - $500k</option>
                      <option value="TIER_500K_PLUS">$500k+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                    Engagement Scope / Message
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: '100%',
                      marginTop: 4,
                      background: 'var(--color-bg-surface)',
                      color: 'var(--color-text-primary)',
                      border: '1px solid var(--color-border-default)',
                      borderRadius: 'var(--radius-md)',
                      padding: '8px',
                      fontFamily: 'inherit',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  />
                </div>

                <Button variant="primary" size="lg" type="submit" isLoading={isSubmitting}>
                  Execute POST /api/v1/inquiries
                </Button>
              </form>
            </Card>

            {/* Response Viewer */}
            <Card variant="surface" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Live API Contract Response
                </span>
                {apiResult && (
                  <Badge variant={apiResult.success ? 'success' : 'error'} size="sm">
                    {apiResult.success ? '201 Created' : 'Error Response'}
                  </Badge>
                )}
              </div>

              {formError && (
                <Alert variant="error" title="Submission Error" style={{ marginBottom: 'var(--space-3)' }}>
                  {formError}
                </Alert>
              )}

              <pre
                style={{
                  background: 'var(--color-bg-base)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-accent-purple-light)',
                  fontFamily: 'var(--font-family-mono)',
                  overflowX: 'auto',
                  flex: 1,
                  minHeight: '260px',
                }}
              >
                {apiResult ? JSON.stringify(apiResult, null, 2) : '// Submit the inquiry form to inspect the standardized API response envelope.'}
              </pre>
            </Card>
          </div>
        </Section>
      </Container>

      {/* Test Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Foundation Modal Primitive">
        <p style={{ marginBottom: 'var(--space-4)', lineHeight: 'var(--line-height-normal)' }}>
          This modal validates the accessible dialog primitive: focus trapping, Escape key listener, backdrop click dismiss, and luxury styling tokens.
        </p>
        <Button variant="primary" size="md" onClick={() => setIsModalOpen(false)}>
          Dismiss Dialog
        </Button>
      </Modal>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\app\f\[slug]\page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getFunnelBySlug, getAllFunnelSlugs } from '@/content/funnels';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { Card } from '@/presentation/components/primitives/Card';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { VSLPlayer } from '@/presentation/components/primitives/VSLPlayer';
import { PainPointCard } from '@/presentation/components/primitives/PainPointCard';
import { StatBlock } from '@/presentation/components/primitives/StatBlock';
import { ProofQuote } from '@/presentation/components/primitives/ProofQuote';
import { Check } from '@phosphor-icons/react/dist/ssr';
import { QualificationForm } from '@/presentation/components/forms/QualificationForm';

interface FunnelPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllFunnelSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: FunnelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const funnel = getFunnelBySlug(slug);

  if (!funnel) {
    return {
      title: 'Funnel Not Found | BRANDMANIA',
    };
  }

  return {
    title: `${funnel.meta.title}`,
    description: funnel.meta.description,
  };
}

export default async function FunnelPage({ params }: FunnelPageProps) {
  const { slug } = await params;
  const funnel = getFunnelBySlug(slug);

  if (!funnel) {
    notFound();
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* 1. Hero Section */}
      <Section spacing="lg" style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-20)' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '650px',
            background: 'var(--gradient-purple-obsidian)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <Container>
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '960px',
              margin: '0 auto',
              gap: 'var(--space-6)',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <Badge variant="purple" size="md">
                {funnel.hero.badge}
              </Badge>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-hero)',
                fontWeight: 'var(--font-weight-bold)',
                lineHeight: 'var(--line-height-tight)',
                letterSpacing: '-0.02em',
                color: '#ffffff',
              }}
            >
              {funnel.hero.headline}
            </h1>

            <p
              style={{
                fontSize: 'var(--font-size-xl)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--line-height-relaxed)',
                maxWidth: '780px',
              }}
            >
              {funnel.hero.subheadline}
            </p>

            <div
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: 'var(--space-4)',
              }}
            >
              <a href="#consultation" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg">
                  {funnel.hero.primaryCta}
                </Button>
              </a>
              <a href="#briefing" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size="lg">
                  {funnel.hero.secondaryCta}
                </Button>
              </a>
            </div>

            <p
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.04em',
              }}
            >
              {funnel.hero.supportingText}
            </p>
          </div>
        </Container>
      </Section>

      {/* 2. Executive VSL Briefing */}
      <Section id="briefing" spacing="lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-10)' }}>
            <Badge variant="purple" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
              STRATEGIC BRIEFING
            </Badge>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-4xl)',
                color: '#fff',
                marginBottom: 'var(--space-3)',
              }}
            >
              {funnel.vsl.headline}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-base)' }}>
              {funnel.vsl.subheadline}
            </p>
          </div>

          <VSLPlayer
            posterUrl={funnel.vsl.posterUrl}
            videoUrl={funnel.vsl.videoUrl}
            durationMinutes={funnel.vsl.durationMinutes}
            headline={funnel.vsl.headline}
          />

          <div
            style={{
              maxWidth: '860px',
              margin: 'var(--space-10) auto 0',
              padding: 'var(--space-6)',
              backgroundColor: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h4
              style={{
                fontSize: 'var(--font-size-xs)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-purple-bright)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Key Diagnostic Briefing Points
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {funnel.vsl.keyTakeaways.map((point, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 'var(--space-3)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <span style={{ color: 'var(--color-accent-purple-bright)', fontWeight: 'bold' }}>0{i + 1}.</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 3. The Three Pain Points */}
      <Section spacing="lg">
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent-purple-bright)' }}>
              PROBLEM RECOGNITION
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-4xl)',
                color: '#fff',
                marginTop: 'var(--space-2)',
              }}
            >
              The Dilemma of Modern Growth
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
              Why established businesses burn capital without compounding enterprise value.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {funnel.painPoints.map((item) => (
              <PainPointCard
                key={item.id}
                category={item.category}
                question={item.question}
                elaboration={item.elaboration}
                impact={item.impact}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. The Commercial Progression Mechanism */}
      <Section spacing="lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
            <Badge variant="purple" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
              CORE MECHANISM
            </Badge>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-4xl)',
                color: '#fff',
              }}
            >
              {funnel.mechanism.title}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
              {funnel.mechanism.tagline}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {funnel.mechanism.stages.map((stage) => (
              <Card key={stage.number} variant="elevated">
                <div
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'var(--font-size-2xl)',
                    color: 'var(--color-accent-purple-bright)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {stage.number}
                </div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', color: '#fff', marginBottom: 'var(--space-2)' }}>
                  {stage.name}
                </h3>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-normal)' }}>
                  {stage.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. AI Philosophy */}
      <Section spacing="md">
        <Container>
          <Card
            variant="glass"
            style={{
              padding: 'var(--space-10)',
              border: '1px solid var(--color-border-active)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ maxWidth: '800px' }}>
              <Badge variant="purple" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
                STRATEGIC OPERATING SYSTEM
              </Badge>
              <h3
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'var(--font-size-3xl)',
                  color: '#fff',
                  marginBottom: 'var(--space-4)',
                }}
              >
                {funnel.aiPhilosophy.headline}
              </h3>
              <p
                style={{
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--line-height-relaxed)',
                }}
              >
                {funnel.aiPhilosophy.body}
              </p>
            </div>
          </Card>
        </Container>
      </Section>

      {/* 6. Proof & Selected Case Highlights */}
      <Section spacing="lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
            <Badge variant="purple" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
              PROOF OF EXECUTION
            </Badge>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-4xl)',
                color: '#fff',
              }}
            >
              {funnel.proof.headline}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
              {funnel.proof.subheadline}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-10)',
            }}
          >
            {funnel.proof.metrics.map((stat, idx) => (
              <StatBlock
                key={idx}
                value={stat.value}
                label={stat.label}
                context={stat.context}
              />
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {funnel.proof.quotes.map((q, idx) => (
              <ProofQuote
                key={idx}
                quote={q.text}
                author={q.author}
                title={q.title}
                industry={q.industry}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Selectivity / "Those Who Dare" */}
      <Section spacing="lg">
        <Container>
          <div
            style={{
              maxWidth: '880px',
              margin: '0 auto',
              backgroundColor: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-10)',
              textAlign: 'center',
            }}
          >
            <Badge variant="purple" size="md" style={{ marginBottom: 'var(--space-4)' }}>
              {funnel.selectivity.badge}
            </Badge>

            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-3xl)',
                color: '#fff',
                marginBottom: 'var(--space-4)',
              }}
            >
              {funnel.selectivity.headline}
            </h2>

            <p
              style={{
                fontSize: 'var(--font-size-base)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--line-height-relaxed)',
                marginBottom: 'var(--space-6)',
              }}
            >
              {funnel.selectivity.description}
            </p>

            <div
              style={{
                textAlign: 'left',
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <h4
                style={{
                  fontSize: 'var(--font-size-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-accent-purple-bright)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Intended Commercial Profile
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {funnel.selectivity.criteria.map((crit, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                    }}
                  >
                    <Check size={16} weight="bold" color="var(--color-status-success)" />
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
              {funnel.selectivity.disclaimer}
            </p>
          </div>
        </Container>
      </Section>

      {/* 8. Qualification & Strategic Intake */}
      <Section id="consultation" spacing="xl" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-10)' }}>
            <Badge variant="purple" size="md" style={{ marginBottom: 'var(--space-3)' }}>
              EXECUTIVE QUALIFICATION
            </Badge>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-4xl)',
                color: '#fff',
                marginBottom: 'var(--space-2)',
              }}
            >
              {funnel.finalCta.headline}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              {funnel.finalCta.subheadline}
            </p>
          </div>

          {/* Connected Qualification Intake Form */}
          <QualificationForm />
        </Container>
      </Section>

      {/* 9. Final Brand Statement */}
      <Section spacing="md" style={{ borderTop: '1px solid var(--color-border-subtle)', textAlign: 'center' }}>
        <Container>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
            <BrandEye size="sm" />
            <span style={{ fontSize: 'var(--font-size-xs)', letterSpacing: '0.25em', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              EXECUTIVE DIRECTIVE
            </span>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-family-serif)',
              fontSize: 'var(--font-size-2xl)',
              color: '#fff',
              letterSpacing: '0.05em',
            }}
          >
            Bugatti, Not Toyota.
          </h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
            Rare • Engineered • Controlled • Category Dominant
          </p>
        </Container>
      </Section>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\app\llms-full.txt\route.ts

import { NextResponse } from 'next/server';
import { seoConfig } from '@/content/seoConfig';

export const dynamic = 'force-static';

export async function GET() {
  const siteUrl = seoConfig.siteUrl;

  const content = `# ${seoConfig.brandName} — Complete Machine-Readable Entity Dossier
> ${seoConfig.tagline}
> ${seoConfig.oneLiner}

## 1. Corporate Identity & Positioning
- **Legal & Operating Entity:** ${seoConfig.brandName}
- **Industry Category:** Strategic Branding & Commercial Advisory Agency
- **Corporate Slogan:** "${seoConfig.tagline}"
- **Commercial Philosophy:** "${seoConfig.oneLiner}"
- **Client Revenue Qualification Threshold:** ${seoConfig.revenueThreshold} (Established businesses and high-ticket international brands).
- **Primary Website:** ${siteUrl}
- **Qualification Protocol:** ${siteUrl}/#qualification
- **Commercial Verification Standard:** All facts, capabilities, and disciplines are verified with zero fabricated reviews or metrics.

---

## 2. The 3 Flagship Disciplines

### Flagship I: Brand Direction
- **URL Anchor:** ${siteUrl}/#brand-direction
- **Core Thesis:** How the message is communicated is at least as important as what the message is.
- **Strategic Function:** Bridging the gap between what an enterprise communicates and how the market perceives it.
- **Pillars & Focus Vectors:**
  1. Brand Story & Executive Narrative: Defensible corporate authority commanding reverence.
  2. Tone of Voice & Linguistic Precision: Surgical tone that communicates undeniable category mastery.
  3. Positioning & Unique Selling Proposition (USP): Carving out uncontested market space where competitors are rendered obsolete.
  4. Trust Architecture & Risk Mitigation: Institutional credibility built into every client interaction touchpoint.
  5. Visual Identity & Design System: Timeless visual standard distinct and prestigious across physical and digital mediums.
  6. Vision, Mission & Generational Relevance: Harmonizing internal capability with external prestige and generational longevity.

### Flagship II: Margin Recovery
- **URL Anchor:** ${siteUrl}/#margin-recovery
- **Core Thesis:** Fix the commercial machine before buying more traffic.
- **Strategic Function:** Auditing commercial and operational data across the full value chain to identify and repair revenue and margin leakage before scaling customer acquisition spend.
- **The 6-Stage Commercial Audit:**
  1. Planning: Recalibrating contribution profit floors so every dollar deployed yields verified gross margin.
  2. Marketing: Disciplined messaging aligned strictly with premium buyers, extinguishing paid media waste.
  3. Sales: Hardening conversion architecture and offer framing so high-ticket buyers purchase at full price without discount erosion.
  4. Fulfillment: Optimizing operational velocity and standards to preserve profit margins as volume scales.
  5. Customer Service: Transforming support from reactive triage into an active trust protector that resolves doubt before refund demands.
  6. Post-Purchase Relationships: Engineering affirmation rituals and recurring loyalty loops to maximize lifetime customer value (LTV).

### Flagship III: Consumer Scope
- **URL Anchor:** ${siteUrl}/#consumer-scope
- **Core Thesis:** Engineering customer perception, experience, and cognitive attachment through human behavior.
- **Strategic Function:** Designing customer touchpoints using behavioral economics, cognitive psychology, and decision architecture.
- **The 7 Behavioral Dimensions:**
  1. Perceived Value: Perception dictates willingness-to-pay far more than production cost. Elevating offerings above commodity price comparisons.
  2. Psychological Pricing: Price resistance is an emotional reaction to uncalibrated value contrast. Engineering pricing architecture where premium figures feel natural.
  3. Emotional Attachment: Rational logic justifies decisions, but emotional resonance drives them. Designing visceral brand rituals that build irrational preference.
  4. Social Identity: Customers do not merely buy products; they buy confirmation of who they are. Positioning the brand as a symbolic badge of self-definition.
  5. Status Perception: High-ticket buyers seek risk mitigation and prestige validation. Disciplined visual standards and tone of voice establishing institutional prestige.
  6. Enduring Loyalty: A single transaction is a test; lifetime loyalty is an engineered ecosystem. Constructing post-purchase loops that convert buyers into lifelong advocates.
  7. Decision-Making Architecture: Hesitation is caused by perceived transition risk and cognitive friction. Systematically eliminating unspoken doubts at the point of decision.

---

## 3. The 11 Supporting Capabilities
These capabilities tether directly to the 3 Flagships across three execution clusters:

### Cluster I: Growth & Narrative Execution
1. Digital Marketing: High-status multi-channel communication calibrated to executive and high-ticket consumer psychology.
2. Growth Marketing: Data-driven funnel engineering expanding market footprint without discounting brand prestige.
3. Performance Marketing: Paid media acquisition governed strictly by contribution profit and verified customer lifetime value.
4. Content Creation: Editorial-grade narrative and visual assets articulating craftsmanship and institutional certainty.
5. Performance Content Creation: High-converting creative assets built for rapid algorithmic arrest and verified buyer action.

### Cluster II: Commercial Operations
6. Finance & Operations: Gross margin governance, unit contribution modeling, and capital allocation frameworks.
7. Strategic Management: Executive roadmap alignment, category positioning defenses, and market expansion planning.
8. Team Management: High-performance team orchestration, operational accountability, and cross-functional standards.
9. Project Management: Surgical delivery velocity, milestone governance, and multi-disciplinary operational execution.

### Cluster III: Intelligent Systems & AI
10. AI Automation: Streamlining repetitive operational handoffs, customer workflows, and operational fulfillment friction.
11. AI Connected Systems: Unified real-time data pipelines linking marketing inputs, operational handoffs, and financial outputs.

---

## 4. The 20 Target Industries Served
${seoConfig.brandName} specifically serves established companies across:
${seoConfig.targetIndustries.map((ind, idx) => `${idx + 1}. ${ind}`).join('\n')}

---

## 5. Confirmed Engagement Models
1. **Full Strategic Rebuild & Performance Engagement:**
   - Audience: Established enterprises generating ${seoConfig.revenueThreshold}.
   - Scope: Comprehensive brand direction, commercial margin audit, and consumer touchpoint engineering.
   - Price Range: $$$$
2. **Strategic Consultancy:**
   - Audience: Qualifying brands requiring diagnostic clarity prior to a full rebuild or when full-engagement capacity is reached.
   - Scope: High-level perceptual audit, margin leakage diagnosis, and positioning roadmap.
   - Price Range: $$$

---

## 6. Frequently Asked Questions (Verified)
${seoConfig.faqs.map((faq, idx) => `Q${idx + 1}: ${faq.question}\nA: ${faq.answer}`).join('\n\n')}
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}


### FILE: E:\Ibrahim's website\src\app\llms.txt\route.ts

import { NextResponse } from 'next/server';
import { seoConfig } from '@/content/seoConfig';

export const dynamic = 'force-static';

export async function GET() {
  const siteUrl = seoConfig.siteUrl;

  const content = `# ${seoConfig.brandName}
> ${seoConfig.tagline}

**Primary Strategic Proposition:** ${seoConfig.oneLiner}

## Executive Summary
${seoConfig.brandName} is a strategic brand and commercial advisory firm serving established businesses generating **${seoConfig.revenueThreshold}** and high-ticket international brands. The firm operates across three interlocked flagship disciplines: Brand Direction, Margin Recovery, and Consumer Scope.

## Target Audience & Threshold
- **Client Threshold:** Established enterprises generating ${seoConfig.revenueThreshold}.
- **Target Category:** High-ticket international brands and ambitious market leaders across 20 authority industries.
- **Engagement Premise:** "Fix the machine before buying more traffic" and "Brand architecture compounds pricing power."

## The 3 Flagship Disciplines
1. [Brand Direction](${siteUrl}/#brand-direction): Aligning corporate identity, positioning, USP, narrative, executive tone of voice, and trust architecture with market perception to command pricing power.
2. [Margin Recovery](${siteUrl}/#margin-recovery): Diagnostic commercial audit across Planning, Marketing, Sales, Fulfillment, Customer Service, and Post-Purchase Relationships to identify and repair revenue leakage before escalating media spend.
3. [Consumer Scope](${siteUrl}/#consumer-scope): Engineering customer perception, experience, and cognitive attachment through behavioral economics, perceived value enhancement, psychological pricing, and status perception.

## Confirmed Engagement Models
- **Full Strategic Rebuild & Performance Engagement:** Comprehensive brand, commercial, and operational transformation for businesses generating ${seoConfig.revenueThreshold}.
- **Strategic Consultancy:** High-level strategic advisory and diagnostic engagement for qualifying brands prior to a full engagement or when full-engagement capacity is full.

## Verification & Architecture
- Canonical Root: ${siteUrl}
- Machine-Readable Entity Dossier: ${siteUrl}/llms-full.txt
- Intake & Qualification: ${siteUrl}/#qualification
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}


### FILE: E:\Ibrahim's website\src\app\privacy\page.tsx

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { LEGAL_CONTENT } from '@/content/legal';
import { seoConfig } from '@/content/seoConfig';
import { constructMetadata } from '@/infrastructure/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy & Client Data Protection',
  description:
    'BRANDMANIA data governance protocol, qualification inquiry confidentiality, GDPR and CCPA rights, and zero-compromise executive privacy standards.',
  canonicalPath: '/privacy',
});

export default function PrivacyPage() {
  const policy = LEGAL_CONTENT.privacyPolicy;

  return (
    <Section
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        color: '#EAE6F0',
        minHeight: '85vh',
        padding: 'clamp(5rem, 8vw, 8rem) 0 clamp(4rem, 6vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      {/* Precision Corner Arcs */}
      <CornerArcs position="top-right" size={260} opacity={0.12} color="#8E00FA" />
      <CornerArcs position="bottom-left" size={200} opacity={0.08} color="#C882FF" />

      {/* Background Watermark */}
      <div
        style={{
          position: 'absolute',
          right: '-5%',
          top: '15%',
          width: '550px',
          height: '550px',
          opacity: 0.03,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        <BrandEye size="xl" glow={false} idSuffix="privacyWatermark" />
      </div>

      <Container size="lg">
        {/* Editorial Masthead */}
        <div
          style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            paddingBottom: 'var(--space-8)',
            marginBottom: 'var(--space-10)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <Badge variant="purple" size="sm">
              GOVERNANCE ARCHITECTURE
            </Badge>
            <span
              style={{
                fontFamily: 'var(--font-Mono)',
                fontSize: '0.75rem',
                color: '#A8A0B8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Protocol Ref: BM-SEC-2026 // v2.4
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-Editorial), serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: 'var(--space-4)',
              maxWidth: '900px',
            }}
          >
            {policy.title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              color: '#A8A0B8',
              lineHeight: 1.6,
              maxWidth: '750px',
              marginBottom: 'var(--space-6)',
            }}
          >
            {policy.subtitle}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-6)',
              fontFamily: 'var(--font-Mono)',
              fontSize: '0.75rem',
              color: '#A8A0B8',
              paddingTop: 'var(--space-4)',
              borderTop: '1px dashed rgba(255, 255, 255, 0.08)',
            }}
          >
            <span>STATUS: ACTIVE GOVERNANCE</span>
            <span>LAST REVISED: {policy.lastUpdated}</span>
            <span>COMPLIANCE: GDPR / UK DPA / CCPA</span>
          </div>
        </div>

        {/* 2-Column Swiss Grid: Sticky Index + Content Blocks */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-12)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {policy.sections.map((sec) => (
              <article
                key={sec.heading}
                id={`sec-${sec.index}`}
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                  paddingTop: 'var(--space-6)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 'var(--space-4)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-Mono)',
                      fontSize: '0.85rem',
                      color: '#C882FF',
                      fontWeight: 600,
                    }}
                  >
                    § {sec.index}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-Sans)',
                      fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {sec.heading}
                  </h2>
                </div>

                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: '#EAE6F0',
                    maxWidth: '680px',
                  }}
                >
                  {sec.content}
                </p>
              </article>
            ))}
          </div>

          {/* Sticky Official Channel Panel */}
          <aside aria-label="Official Channel Inquiries">
            <div
              style={{
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                padding: 'var(--space-8)',
                position: 'sticky',
                top: '6rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-Mono)',
                  fontSize: '0.75rem',
                  color: '#C882FF',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: 'var(--space-3)',
                }}
              >
                OFFICIAL CHANNEL INQUIRY
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-Editorial)',
                  fontSize: '1.75rem',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Data Rights & Verification
              </h3>
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: '#A8A0B8',
                  marginBottom: 'var(--space-6)',
                }}
              >
                To request data verification, update your intake coordinates, or submit an immediate erasure notice, connect directly through our official intake portal.
              </p>

              <div
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-Mono)',
                    fontSize: '0.75rem',
                    color: '#A8A0B8',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  INTAKE PORTAL:
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-Mono)',
                    fontSize: '0.85rem',
                    color: '#FFFFFF',
                    wordBreak: 'break-all',
                  }}
                >
                  {seoConfig.contactPoint.contactType}
                </div>
              </div>

              <Link
                href="/#qualification"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  minHeight: '44px',
                  padding: '0.75rem 1.25rem',
                  backgroundColor: '#8E00FA',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'background-color 0.2s ease',
                }}
              >
                Access Executive Intake Portal ↗
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}


### FILE: E:\Ibrahim's website\src\app\services\page.tsx

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { Card } from '@/presentation/components/primitives/Card';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { FLAGSHIP_SERVICES, SUPPORTING_CAPABILITIES } from '@/content/services';
import { BRAND } from '@/content/brand';

export const metadata: Metadata = {
  title: 'Flagship Disciplines & Strategic Capabilities',
  description:
    'BRANDMANIA combines Margin Recovery, Brand Direction, and Consumer Scope, supported by growth marketing, operations, and AI connected systems.',
};

export default function ServicesPage() {
  return (
    <div>
      <Section spacing="lg" style={{ paddingTop: 'var(--space-16)', backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <Container>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <Badge variant="purple" size="md">
                STRATEGIC PRACTICES
              </Badge>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-5xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#fff',
                marginBottom: 'var(--space-4)',
              }}
            >
              The Three Flagship Disciplines
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--line-height-relaxed)',
              }}
            >
              We do not present an arbitrary flat catalogue of agency services. Our three flagship disciplines represent a structured methodology to diagnose leaks, engineer premium market perception, and align customer psychology.
            </p>
          </div>
        </Container>
      </Section>

      {/* Flagships Grid */}
      <Section spacing="xl">
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            {Object.values(FLAGSHIP_SERVICES).map((service, index) => (
              <Card
                key={service.id}
                variant="elevated"
                style={{
                  padding: 'var(--space-10)',
                  border: '1px solid var(--color-border-default)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <span style={{ fontSize: 'var(--font-size-xs)', letterSpacing: '0.15em', color: 'var(--color-accent-purple-bright)', fontWeight: 'bold' }}>
                      DISCIPLINE 0{index + 1}
                    </span>
                    <h2
                      style={{
                        fontFamily: 'var(--font-family-serif)',
                        fontSize: 'var(--font-size-3xl)',
                        color: '#fff',
                        marginTop: 'var(--space-2)',
                      }}
                    >
                      {service.title}
                    </h2>
                  </div>

                  <Link href={`/services/${service.slug}`} style={{ textDecoration: 'none' }}>
                    <Button variant="primary" size="md">
                      Explore Deep-Dive →
                    </Button>
                  </Link>
                </div>

                <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)', fontStyle: 'italic' }}>
                  “{service.headline}”
                </p>

                <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-6)' }}>
                  {service.summary}
                </p>

                <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
                  <h4 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent-purple-bright)', marginBottom: 'var(--space-3)' }}>
                    Core Diagnostic Vectors
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
                    {service.points.map((pt, i) => (
                      <li key={i} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
                        <span style={{ color: 'var(--color-accent-purple-bright)' }}>•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Supporting Capabilities Section */}
      <Section spacing="lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <Container>
          <div style={{ maxWidth: '780px', marginBottom: 'var(--space-10)' }}>
            <Badge variant="purple" size="sm" style={{ marginBottom: 'var(--space-3)' }}>
              EXECUTION CAPABILITIES
            </Badge>
            <h2 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 'var(--font-size-3xl)', color: '#fff' }}>
              Supporting Operational Capabilities
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
              The infrastructure that executes and scales our three flagship disciplines.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
            {SUPPORTING_CAPABILITIES.map((cap) => (
              <Card key={cap.group} variant="glass">
                <h3 style={{ fontSize: 'var(--font-size-base)', color: '#fff', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-3)' }}>
                  {cap.group}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {cap.items.map((it, idx) => (
                    <li key={idx} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <span style={{ color: 'var(--color-accent-purple-bright)' }}>›</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\app\services\[slug]\page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { Card } from '@/presentation/components/primitives/Card';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { FLAGSHIP_SERVICES } from '@/content/services';

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(FLAGSHIP_SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = FLAGSHIP_SERVICES[slug];

  if (!service) {
    return { title: 'Service Not Found | BRANDMANIA' };
  }

  return {
    title: `${service.title} | BRANDMANIA Flagship`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = FLAGSHIP_SERVICES[slug];

  if (!service) {
    notFound();
  }

  return (
    <div>
      <Section spacing="xl" style={{ paddingTop: 'var(--space-20)', backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <Container>
          <div style={{ maxWidth: '860px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <BrandEye size="sm" />
              <Badge variant="purple" size="md">
                FLAGSHIP DISCIPLINE
              </Badge>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-5xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: '#fff',
                marginBottom: 'var(--space-4)',
              }}
            >
              {service.title}
            </h1>

            <p
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontFamily: 'var(--font-family-serif)',
                fontStyle: 'italic',
                color: 'var(--color-accent-purple-bright)',
                marginBottom: 'var(--space-6)',
              }}
            >
              “{service.headline}”
            </p>

            <p
              style={{
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--line-height-relaxed)',
                marginBottom: 'var(--space-8)',
              }}
            >
              {service.summary}
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <Link href="/#consultation" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg">
                  {service.ctaLabel}
                </Button>
              </Link>
              <Link href="/services" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size="lg">
                  ← All Flagships
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="xl">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-10)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent-purple-bright)', marginBottom: 'var(--space-3)' }}>
                STRATEGIC PREMISE
              </h3>
              <Card variant="glass" style={{ padding: 'var(--space-8)' }}>
                <p style={{ fontSize: 'var(--font-size-lg)', color: '#fff', lineHeight: 'var(--line-height-relaxed)', margin: 0 }}>
                  {service.strategicPremise}
                </p>
              </Card>
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent-purple-bright)', marginBottom: 'var(--space-3)' }}>
                DIAGNOSTIC DELIVERABLES
              </h3>
              <Card variant="elevated" style={{ padding: 'var(--space-8)' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {service.points.map((pt, i) => (
                    <li key={i} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
                      <span style={{ color: 'var(--color-accent-purple-bright)', fontWeight: 'bold' }}>0{i + 1}.</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\app\terms\page.tsx

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { LEGAL_CONTENT } from '@/content/legal';
import { seoConfig } from '@/content/seoConfig';
import { constructMetadata } from '@/infrastructure/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Terms of Engagement & Advisory Notice',
  description:
    'BRANDMANIA terms of engagement, intellectual property rights, non-binding preliminary diagnostic disclosures, and commercial advisory conditions.',
  canonicalPath: '/terms',
});

export default function TermsPage() {
  const terms = LEGAL_CONTENT.termsOfEngagement;

  return (
    <Section
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        color: '#EAE6F0',
        minHeight: '85vh',
        padding: 'clamp(5rem, 8vw, 8rem) 0 clamp(4rem, 6vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      {/* Precision Corner Arcs */}
      <CornerArcs position="top-right" size={260} opacity={0.12} color="#8E00FA" />
      <CornerArcs position="bottom-left" size={200} opacity={0.08} color="#C882FF" />

      {/* Background Watermark */}
      <div
        style={{
          position: 'absolute',
          right: '-5%',
          top: '15%',
          width: '550px',
          height: '550px',
          opacity: 0.03,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        <BrandEye size="xl" glow={false} idSuffix="termsWatermark" />
      </div>

      <Container size="lg">
        {/* Editorial Masthead */}
        <div
          style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            paddingBottom: 'var(--space-8)',
            marginBottom: 'var(--space-10)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <Badge variant="purple" size="sm">
              LEGAL ARCHITECTURE
            </Badge>
            <span
              style={{
                fontFamily: 'var(--font-Mono)',
                fontSize: '0.75rem',
                color: '#A8A0B8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Document Ref: BM-ENG-2026 // v3.1
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-Editorial), serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: 'var(--space-4)',
              maxWidth: '900px',
            }}
          >
            {terms.title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              color: '#A8A0B8',
              lineHeight: 1.6,
              maxWidth: '750px',
              marginBottom: 'var(--space-6)',
            }}
          >
            {terms.subtitle}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-6)',
              fontFamily: 'var(--font-Mono)',
              fontSize: '0.75rem',
              color: '#A8A0B8',
              paddingTop: 'var(--space-4)',
              borderTop: '1px dashed rgba(255, 255, 255, 0.08)',
            }}
          >
            <span>STATUS: ACTIVE GOVERNANCE</span>
            <span>LAST REVISED: {terms.lastUpdated}</span>
            <span>GOVERNANCE: INTERNATIONAL COMMERCIAL ADVISORY</span>
          </div>
        </div>

        {/* 2-Column Swiss Grid: Sticky Index + Content Blocks */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-12)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {terms.sections.map((sec) => (
              <article
                key={sec.heading}
                id={`sec-${sec.index}`}
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                  paddingTop: 'var(--space-6)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 'var(--space-4)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-Mono)',
                      fontSize: '0.85rem',
                      color: '#C882FF',
                      fontWeight: 600,
                    }}
                  >
                    § {sec.index}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-Sans)',
                      fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {sec.heading}
                  </h2>
                </div>

                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: '#EAE6F0',
                    maxWidth: '680px',
                  }}
                >
                  {sec.content}
                </p>
              </article>
            ))}
          </div>

          {/* Sticky Advisory Notice Panel */}
          <aside aria-label="Commercial Advisory Notice">
            <div
              style={{
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                padding: 'var(--space-8)',
                position: 'sticky',
                top: '6rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-Mono)',
                  fontSize: '0.75rem',
                  color: '#C882FF',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: 'var(--space-3)',
                }}
              >
                ENGAGEMENT THRESHOLD
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-Editorial)',
                  fontSize: '1.75rem',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Qualification Protocol
              </h3>
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: '#A8A0B8',
                  marginBottom: 'var(--space-6)',
                }}
              >
                BRANDMANIA provides strategic advisory and margin recovery exclusively for established commercial enterprises ({seoConfig.revenueThreshold}). Submitting an inquiry initiates preliminary qualification review.
              </p>

              <div
                style={{
                  padding: 'var(--space-4)',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-Mono)',
                    fontSize: '0.75rem',
                    color: '#A8A0B8',
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  PRE-ENGAGEMENT SCOPE:
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-Mono)',
                    fontSize: '0.85rem',
                    color: '#FFFFFF',
                  }}
                >
                  Non-Binding Diagnostic Intake
                </div>
              </div>

              <Link
                href="/#qualification"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  minHeight: '44px',
                  padding: '0.75rem 1.25rem',
                  backgroundColor: '#8E00FA',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'background-color 0.2s ease',
                }}
              >
                Submit Strategic Inquiry ↗
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}


### FILE: E:\Ibrahim's website\src\app\work\page.tsx

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';
import { Badge } from '@/presentation/components/primitives/Badge';
import { Button } from '@/presentation/components/primitives/Button';
import { Card } from '@/presentation/components/primitives/Card';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { CASE_STUDIES } from '@/content/case-studies';

export const metadata: Metadata = {
  title: 'Selected Work & Proven Execution | BRANDMANIA',
  description:
    'Evidence-based case studies across jewelry, designer boutiques, and luxury e-commerce. Diagnosing margin leakage, engineering brand direction, and driving growth.',
};

export default function WorkPage() {
  return (
    <div>
      <Section spacing="lg" style={{ paddingTop: 'var(--space-16)', backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <Container>
          <div style={{ maxWidth: '820px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <Badge variant="purple" size="md">
                AUTHORITY EXHIBITION
              </Badge>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-5xl)',
                color: '#fff',
                marginBottom: 'var(--space-4)',
              }}
            >
              Selected Engagements
            </h1>
            <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>
              Rigorous diagnostic interventions across high-ticket jewelry houses, designer boutiques, and premium brands.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="xl">
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            {CASE_STUDIES.map((cs) => (
              <Card key={cs.id} variant="elevated" style={{ padding: 'var(--space-10)', border: '1px solid var(--color-border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <span style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent-purple-bright)' }}>
                      {cs.industry} • {cs.location}
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 'var(--font-size-3xl)', color: '#fff', marginTop: 'var(--space-1)' }}>
                      {cs.client}
                    </h2>
                  </div>
                  <Badge variant="purple" size="sm">
                    {cs.confidentialityStatus}
                  </Badge>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', margin: 'var(--space-6) 0' }}>
                  <div>
                    <h4 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
                      Initial Diagnostic Challenge
                    </h4>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-normal)' }}>
                      {cs.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', color: 'var(--color-accent-purple-bright)', marginBottom: 'var(--space-2)' }}>
                      Strategic Intervention
                    </h4>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-normal)' }}>
                      {cs.intervention.summary}
                    </p>
                  </div>
                </div>

                {/* Metrics Table */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', backgroundColor: 'var(--color-bg-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)' }}>
                  {cs.metrics.map((m, idx) => (
                    <div key={idx}>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{m.label}</span>
                      <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: 'var(--color-status-success)', marginTop: 'var(--space-1)' }}>
                        {m.change}
                      </div>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                        {m.before} → {m.after}
                      </span>
                    </div>
                  ))}
                </div>

                <blockquote style={{ margin: 0, borderLeft: '2px solid var(--color-accent-purple-bright)', paddingLeft: 'var(--space-4)', fontStyle: 'italic', color: 'var(--color-text-primary)', fontSize: 'var(--font-size-sm)' }}>
                  {cs.testimonial.quote}
                  <footer style={{ marginTop: 'var(--space-2)', fontStyle: 'normal', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    — {cs.testimonial.author}, {cs.testimonial.title}
                  </footer>
                </blockquote>
              </Card>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-16)' }}>
            <Link href="/#consultation" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg">
                Request Diagnostic for Your Brand →
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\application\dtos\submit-inquiry.dto.ts

export interface SubmitInquiryInputDto {
  clientName: string;
  companyName: string;
  email: string;
  companyTier: string;
  budgetRange: string;
  services: string[];
  message: string;
}

export interface SubmitInquiryOutputDto {
  inquiryId: string;
  status: string;
  estimatedReviewHours: number;
  priorityScore: number;
  receivedAt: string;
}


### FILE: E:\Ibrahim's website\src\application\dtos\system-health.dto.ts

export interface HealthCheckDto {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptimeSeconds: number;
  timestamp: string;
  version: string;
}

export interface ReadinessCheckDto {
  status: 'ready' | 'not_ready';
  checks: {
    memory: {
      status: 'ok' | 'warning' | 'critical';
      heapUsedMb: number;
      heapTotalMb: number;
    };
    persistence: {
      status: 'ok' | 'error';
      message?: string;
    };
    rateLimiter: {
      status: 'ok' | 'error';
    };
  };
  timestamp: string;
}


### FILE: E:\Ibrahim's website\src\application\errors\application.error.ts

export abstract class ApplicationError extends Error {
  public abstract readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(message: string, code: string, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends ApplicationError {
  public readonly statusCode = 400;
  constructor(message = 'Validation failed', details?: unknown) {
    super(message, 'VALIDATION_ERROR', details);
  }
}

export class AuthenticationError extends ApplicationError {
  public readonly statusCode = 401;
  constructor(message = 'Authentication required', details?: unknown) {
    super(message, 'AUTHENTICATION_ERROR', details);
  }
}

export class AuthorizationError extends ApplicationError {
  public readonly statusCode = 403;
  constructor(message = 'Access denied', details?: unknown) {
    super(message, 'AUTHORIZATION_ERROR', details);
  }
}

export class NotFoundError extends ApplicationError {
  public readonly statusCode = 404;
  constructor(message = 'Resource not found', details?: unknown) {
    super(message, 'NOT_FOUND_ERROR', details);
  }
}

export class ConflictError extends ApplicationError {
  public readonly statusCode = 409;
  constructor(message = 'Resource state conflict', details?: unknown) {
    super(message, 'CONFLICT_ERROR', details);
  }
}

export class RateLimitError extends ApplicationError {
  public readonly statusCode = 429;
  public readonly retryAfterSeconds: number;

  constructor(message = 'Rate limit exceeded', retryAfterSeconds = 60) {
    super(message, 'RATE_LIMIT_ERROR', { retryAfterSeconds });
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export class DependencyError extends ApplicationError {
  public readonly statusCode = 502;
  constructor(message = 'External dependency failure', details?: unknown) {
    super(message, 'DEPENDENCY_ERROR', details);
  }
}

export class InternalError extends ApplicationError {
  public readonly statusCode = 500;
  constructor(message = 'Internal server error', details?: unknown) {
    super(message, 'INTERNAL_ERROR', details);
  }
}


### FILE: E:\Ibrahim's website\src\application\ports\booking.port.ts

/**
 * Booking Provider Port
 *
 * Defines the contract for scheduling and consultation booking integrations.
 * Allows switching between Calendly, custom modal, Google Calendar, or other providers
 * without affecting application use cases or domain entities.
 */

export interface BookingContext {
  inquiryId?: string;
  clientName: string;
  email: string;
  companyName: string;
  industry?: string;
  revenueTier?: string;
}

export interface IBookingProvider {
  /**
   * Generates a direct, authenticated, or pre-filled booking URL.
   */
  generateBookingUrl(context: BookingContext): Promise<string>;

  /**
   * Returns provider metadata for diagnostic logs and UI rendering.
   */
  getProviderName(): string;
}


### FILE: E:\Ibrahim's website\src\application\ports\cache.port.ts

export interface ICache {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlMs?: number): Promise<void>;
  delete(key: string): Promise<boolean>;
  clear(): Promise<void>;
  has(key: string): Promise<boolean>;
}


### FILE: E:\Ibrahim's website\src\application\ports\clock.port.ts

export interface IClock {
  now(): Date;
  timestamp(): number;
}

export class SystemClock implements IClock {
  public now(): Date {
    return new Date();
  }

  public timestamp(): number {
    return Date.now();
  }
}


### FILE: E:\Ibrahim's website\src\application\ports\email.port.ts

export interface EmailMessage {
  to: string;
  subject: string;
  bodyText: string;
  bodyHtml?: string;
}

export interface IEmailSender {
  send(message: EmailMessage): Promise<{ success: boolean; messageId: string }>;
}


### FILE: E:\Ibrahim's website\src\application\ports\job-queue.port.ts

export interface Job<T = unknown> {
  id: string;
  name: string;
  data: T;
  createdAt: Date;
  idempotencyKey?: string;
}

export type JobHandler<T = unknown> = (job: Job<T>) => Promise<void>;

export interface IJobQueue {
  enqueue<T = unknown>(name: string, data: T, idempotencyKey?: string): Promise<string>;
  registerHandler<T = unknown>(name: string, handler: JobHandler<T>): void;
  getPendingCount(): Promise<number>;
}


### FILE: E:\Ibrahim's website\src\application\ports\logger.port.ts

export type LogContext = Record<string, unknown>;

export interface ILogger {
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, error?: Error | unknown, context?: LogContext): void;
  debug(message: string, context?: LogContext): void;
  audit(action: string, actor: string, details?: LogContext): void;
}


### FILE: E:\Ibrahim's website\src\application\ports\rate-limiter.port.ts

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTimeMs: number;
  retryAfterSeconds: number;
}

export interface IRateLimiter {
  checkLimit(key: string, maxRequests?: number, windowMs?: number): Promise<RateLimitResult>;
  reset(key: string): Promise<void>;
}


### FILE: E:\Ibrahim's website\src\application\ports\result.ts

export type Result<T, E = Error> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export function isOk<T, E>(result: Result<T, E>): result is { ok: true; value: T } {
  return result.ok;
}

export function isErr<T, E>(result: Result<T, E>): result is { ok: false; error: E } {
  return !result.ok;
}

/**
 * Executes an async operation with exponential backoff retry.
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    initialDelayMs?: number;
    backoffFactor?: number;
    shouldRetry?: (error: unknown) => boolean;
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    initialDelayMs = 200,
    backoffFactor = 2,
    shouldRetry = () => true,
  } = options;

  let attempt = 0;
  let delay = initialDelayMs;

  while (attempt < maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt >= maxAttempts || !shouldRetry(error)) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= backoffFactor;
    }
  }

  throw new Error('Retry exhausted without result');
}


### FILE: E:\Ibrahim's website\src\application\use-cases\get-system-health.use-case.ts

import { IInquiryRepository } from '../../domain/repositories/inquiry.repository.interface';
import { IRateLimiter } from '../ports/rate-limiter.port';
import { IClock } from '../ports/clock.port';
import { HealthCheckDto, ReadinessCheckDto } from '../dtos/system-health.dto';

const PROCESS_START_TIME = Date.now();

export class GetSystemHealthUseCase {
  constructor(
    private readonly inquiryRepository: IInquiryRepository,
    private readonly rateLimiter: IRateLimiter,
    private readonly clock: IClock,
    private readonly appVersion = '1.0.0'
  ) {}

  public getLiveness(): HealthCheckDto {
    const uptimeSeconds = Math.floor((Date.now() - PROCESS_START_TIME) / 1000);
    return {
      status: 'healthy',
      uptimeSeconds,
      timestamp: this.clock.now().toISOString(),
      version: this.appVersion,
    };
  }

  public async getReadiness(): Promise<ReadinessCheckDto> {
    const memory = process.memoryUsage();
    const heapUsedMb = Math.round((memory.heapUsed / 1024 / 1024) * 100) / 100;
    const heapTotalMb = Math.round((memory.heapTotal / 1024 / 1024) * 100) / 100;

    let memoryStatus: 'ok' | 'warning' | 'critical' = 'ok';
    if (heapUsedMb > 1024) memoryStatus = 'critical';
    else if (heapUsedMb > 512) memoryStatus = 'warning';

    let persistenceStatus: 'ok' | 'error' = 'ok';
    let persistenceMessage: string | undefined;

    try {
      await this.inquiryRepository.count();
    } catch (err) {
      persistenceStatus = 'error';
      persistenceMessage = err instanceof Error ? err.message : 'Repository access failed';
    }

    let rateLimiterStatus: 'ok' | 'error' = 'ok';
    try {
      await this.rateLimiter.checkLimit('health_probe_check', 1000, 1000);
    } catch {
      rateLimiterStatus = 'error';
    }

    const isReady =
      memoryStatus !== 'critical' &&
      persistenceStatus === 'ok' &&
      rateLimiterStatus === 'ok';

    return {
      status: isReady ? 'ready' : 'not_ready',
      checks: {
        memory: {
          status: memoryStatus,
          heapUsedMb,
          heapTotalMb,
        },
        persistence: {
          status: persistenceStatus,
          message: persistenceMessage,
        },
        rateLimiter: {
          status: rateLimiterStatus,
        },
      },
      timestamp: this.clock.now().toISOString(),
    };
  }
}


### FILE: E:\Ibrahim's website\src\application\use-cases\submit-inquiry.use-case.ts

import { Inquiry } from '../../domain/entities/inquiry.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { CompanyTier } from '../../domain/value-objects/company-tier.vo';
import { BudgetRange } from '../../domain/value-objects/budget-range.vo';
import { ServiceCategory } from '../../domain/value-objects/service-category.vo';
import { InquirySubmissionRules } from '../../domain/rules/inquiry-submission.rules';
import { IInquiryRepository } from '../../domain/repositories/inquiry.repository.interface';
import { ILogger } from '../ports/logger.port';
import { IJobQueue } from '../ports/job-queue.port';
import { IClock } from '../ports/clock.port';
import { SubmitInquiryInputDto, SubmitInquiryOutputDto } from '../dtos/submit-inquiry.dto';

export class SubmitInquiryUseCase {
  constructor(
    private readonly inquiryRepository: IInquiryRepository,
    private readonly logger: ILogger,
    private readonly jobQueue: IJobQueue,
    private readonly clock: IClock
  ) {}

  public async execute(input: SubmitInquiryInputDto): Promise<SubmitInquiryOutputDto> {
    // 1. Build & Validate Domain Value Objects
    const email = new Email(input.email);
    const companyTier = new CompanyTier(input.companyTier);
    const budgetRange = new BudgetRange(input.budgetRange);
    const services = input.services.map((code) => new ServiceCategory(code));

    // 2. Validate Domain Business Rules
    InquirySubmissionRules.validateHighTicketAlignment(companyTier, budgetRange);

    // 3. Instantiate Domain Entity
    const inquiryId = `inq_${this.clock.timestamp()}_${Math.random().toString(36).substring(2, 9)}`;
    const inquiry = Inquiry.create({
      id: inquiryId,
      clientName: input.clientName,
      companyName: input.companyName,
      email,
      companyTier,
      budgetRange,
      services,
      message: input.message,
    });

    // 4. Persist Aggregate
    await this.inquiryRepository.save(inquiry);

    // 5. Calculate Priority & Review Window
    const priorityScore = InquirySubmissionRules.calculatePriorityScore(
      companyTier,
      budgetRange,
      services.length
    );
    const estimatedReviewHours = companyTier.isHighTicket() ? 12 : 24;

    // 6. Structured Audit Logging
    this.logger.audit('INQUIRY_SUBMITTED', email.value, {
      inquiryId: inquiry.id,
      companyTier: companyTier.value,
      budgetRange: budgetRange.value,
      priorityScore,
    });

    // 7. Enqueue Background Notification Job (Async Boundary)
    await this.jobQueue.enqueue(
      'SEND_INQUIRY_NOTIFICATION',
      {
        inquiryId: inquiry.id,
        recipientEmail: email.value,
        clientName: inquiry.clientName,
      },
      `notify_${inquiry.id}`
    );

    // 8. Return Standard Output DTO
    return {
      inquiryId: inquiry.id,
      status: inquiry.status,
      estimatedReviewHours,
      priorityScore,
      receivedAt: inquiry.createdAt.toISOString(),
    };
  }
}


### FILE: E:\Ibrahim's website\src\content\blurPlaceholders.ts

/**
 * Low-Quality Image Placeholders (LQIP)
 * Deterministic obsidian (#070709) and imperial violet (#160029, #2E0854)
 * SVG data-URIs tailored for Brandmania authentic assets.
 */

function createSvgDataUri(svgContent: string): string {
  const base64 = typeof window === 'undefined'
    ? Buffer.from(svgContent).toString('base64')
    : btoa(svgContent);
  return `data:image/svg+xml;base64,${base64}`;
}

const obsidianVioletGradient = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070709" />
      <stop offset="50%" stop-color="#160029" />
      <stop offset="100%" stop-color="#070709" />
    </linearGradient>
  </defs>
  <rect width="40" height="40" fill="url(#bg)" />
</svg>
`;

const editorialAlabasterGradient = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <defs>
    <linearGradient id="bgLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3F0EA" />
      <stop offset="50%" stop-color="#E5DEC9" />
      <stop offset="100%" stop-color="#F3F0EA" />
    </linearGradient>
  </defs>
  <rect width="40" height="40" fill="url(#bgLight)" />
</svg>
`;

const posterVioletGradient = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60" width="40" height="60">
  <defs>
    <linearGradient id="posterBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#070709" />
      <stop offset="40%" stop-color="#2E0854" />
      <stop offset="70%" stop-color="#160029" />
      <stop offset="100%" stop-color="#070709" />
    </linearGradient>
  </defs>
  <rect width="40" height="60" fill="url(#posterBg)" />
</svg>
`;

export const BLUR_PLACEHOLDERS = {
  // Hero aperture cover asset
  coverClean: createSvgDataUri(obsidianVioletGradient),
  // Brand direction poster
  poster: createSvgDataUri(posterVioletGradient),
  // Artboards
  artboard1: createSvgDataUri(obsidianVioletGradient),
  artboard2: createSvgDataUri(editorialAlabasterGradient),
  artboard3: createSvgDataUri(obsidianVioletGradient),
  artboard4: createSvgDataUri(obsidianVioletGradient),
  // Campaign banner
  agencyBanner: createSvgDataUri(obsidianVioletGradient),
  // Default fallback
  default: createSvgDataUri(obsidianVioletGradient),
};


### FILE: E:\Ibrahim's website\src\content\brand.ts

/**
 * BRANDMANIA Brand Configuration & Core Strategic Identity
 *
 * This module contains the foundational positioning, strategic principles,
 * and commercial identity of BRANDMANIA.
 */

export interface BrandConfig {
  name: string;
  tagline: string;
  internalPhilosophy: string;
  mottos: {
    primary: string;
    secondary: string;
  };
  commercialPhilosophy: string;
  positioning: string[];
  flagshipDisciplines: {
    marginRecovery: {
      id: string;
      code: string;
      title: string;
      tagline: string;
      coreIdea: string;
      philosophy: string;
      auditVectors: string[];
    };
    brandDirection: {
      id: string;
      code: string;
      title: string;
      tagline: string;
      coreIdea: string;
      philosophy: string;
      deliverables: string[];
    };
    consumerScope: {
      id: string;
      code: string;
      title: string;
      tagline: string;
      coreIdea: string;
      philosophy: string;
      mechanisms: string[];
    };
  };
  aiPhilosophy: {
    headline: string;
    humanResponsibilities: string[];
    aiLeveragePoints: string[];
  };
  targetClient: {
    primaryMarkets: string[];
    expansionMarkets: string[];
    currencies: string[];
    minimumAnnualRevenueUsd: number;
    authorityIndustries: string[];
  };
  persona: {
    aesthetic: string;
    comparison: string;
    keywords: string[];
  };
}

export const BRAND: BrandConfig = {
  name: 'BRANDMANIA',
  tagline: 'Branded for the best',
  internalPhilosophy:
    "Let people applaud your second to greatest work, because you're creating your greatest.",
  mottos: {
    primary: 'Commanding Category Leadership',
    secondary: 'Taking over minds',
  },
  commercialPhilosophy: "Let's make you a market leader.",
  positioning: [
    'Strategic Premium Agency',
    'Boutique Consultancy',
    'Brand + Business Consultancy',
    'Executive-Level Strategic Partner',
    'Performance-Oriented Growth Partner',
  ],
  flagshipDisciplines: {
    marginRecovery: {
      id: 'margin-recovery',
      code: 'MARGIN_RECOVERY',
      title: 'Margin Recovery',
      tagline: 'Fix the machine before buying more traffic.',
      coreIdea:
        'Every business is in the business of making money. Before escalating ad spend, identify and repair the breaking points where revenue and margin are silently leaking.',
      philosophy: 'Attention does not automatically mean revenue.',
      auditVectors: [
        'Strategic Planning',
        'Acquisition Architecture',
        'Sales Pipeline & Conversion',
        'Operational Fulfillment',
        'Customer Support Systems',
        'Post-Purchase Journey',
        'Customer Retention & LTV',
        'Financial Flow & Cost Allocation',
      ],
    },
    brandDirection: {
      id: 'brand-direction',
      code: 'BRAND_DIRECTION',
      title: 'Brand Direction',
      tagline: 'How the message is communicated is at least as important as what the message is.',
      coreIdea:
        'Strategic perception and market positioning. We establish optimal brand presence, executive trust, tone of voice, narrative clarity, and commercial differentiation.',
      philosophy: 'Perception dictates pricing power.',
      deliverables: [
        'Strategic Market Positioning',
        'Brand Personality & Voice Definition',
        'Executive Narrative & Trust Frameworks',
        'Commercial Differentiation',
        'Visual Direction & Art Direction',
        'Offer Architecture & Value Framing',
      ],
    },
    consumerScope: {
      id: 'consumer-scope',
      code: 'CONSUMER_SCOPE',
      title: 'Consumer Scope',
      tagline: 'Engineering customer perception, experience, and cognitive attachment.',
      coreIdea:
        'Designing customer touchpoints through psychology, behavioral economics, perceived value, and customer loyalty. What happens in the customer mind throughout the lifecycle.',
      philosophy: 'Understand the mind before asking for the capital.',
      mechanisms: [
        'Behavioral Economics Application',
        'Cognitive Value Perception',
        'Psychological Pricing Engineering',
        'Identity Attachment & Tribal Alignment',
        'Frictionless Experience Design',
        'Habit-Forming Purchase Loops',
      ],
    },
  },
  aiPhilosophy: {
    headline: 'AI as strategic leverage, not human creative substitution.',
    humanResponsibilities: [
      'Strategic Vision & Judgment',
      'Cognitive Psychology & Consumer Insight',
      'High-Level Creative Storytelling',
      'Experience Architecture',
      'Executive Cultural Understanding',
    ],
    aiLeveragePoints: [
      'Elimination of Repetitive Operational Overhead',
      'Systemic Process Acceleration',
      'Real-Time Margin Diagnostics',
      'Automated Data Synthesis & Intelligence',
      'Connected Workflow Scalability',
    ],
  },
  targetClient: {
    primaryMarkets: ['United Kingdom', 'North America'],
    expansionMarkets: ['Europe', 'GCC'],
    currencies: ['USD', 'EUR', 'GBP'],
    minimumAnnualRevenueUsd: 700000,
    authorityIndustries: [
      'Jewelry & Gemstones',
      'Designer Boutiques',
      'Luxury Interior Design',
      'High-End Hospitality & Resorts',
      'High-Performance Wellness & Nutrition',
      'Cosmetics & Haute Fragrance',
      'Premium Lifestyle Goods',
      'Specialized Medical Devices',
    ],
  },
  persona: {
    aesthetic: 'An Exhibition of Contemporary Luxury and Strategic Intelligence',
    comparison: 'Bugatti, not Toyota. Rare, engineered, confident, deliberate.',
    keywords: [
      'Sophisticated',
      'Provocative',
      'Luxurious',
      'Analytical',
      'Strategic',
      'Editorial',
      'Futuristic',
      'Exclusive',
      'Clinical',
      'Rebellious',
    ],
  },
};


### FILE: E:\Ibrahim's website\src\content\case-studies.ts

/**
 * BRANDMANIA Case Studies & Client Proof Architecture
 *
 * All case study details are structured with clear owner placeholder annotations.
 * No false credentials or unapproved metrics are invented.
 */

export interface CaseStudyMetric {
  label: string;
  before: string;
  after: string;
  change: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  confidentialityStatus: 'CONFIDENTIAL' | 'ANONYMIZED' | 'NAMED';
  industry: string;
  location: string;
  challenge: string;
  intervention: {
    flagshipsApplied: ('MARGIN_RECOVERY' | 'BRAND_DIRECTION' | 'CONSUMER_SCOPE')[];
    summary: string;
  };
  timeframe: string;
  metrics: CaseStudyMetric[];
  testimonial: {
    quote: string;
    author: string;
    title: string;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-01',
    slug: 'fine-jewelry-margin-recovery',
    client: '[OWNER COPY — European Fine Jewelry House]',
    confidentialityStatus: 'ANONYMIZED',
    industry: 'Fine Jewelry & Gemstones',
    location: 'Geneva / London',
    challenge:
      '[OWNER COPY — Client was achieving strong multi-million topline revenue, but rapid customer acquisition costs and post-purchase handling were dissolving over 35% of projected operating margin.]',
    intervention: {
      flagshipsApplied: ['MARGIN_RECOVERY', 'BRAND_DIRECTION'],
      summary:
        '[OWNER COPY — Comprehensive 8-vector margin audit conducted. Re-engineered post-purchase flow, renegotiated fulfillment bottlenecks, and repositioned product narrative to eliminate discounting.]',
    },
    timeframe: '90 Days',
    metrics: [
      {
        label: 'Net Operating Margin',
        before: '[OWNER STAT — Before %]',
        after: '[OWNER STAT — After %]',
        change: '+[OWNER STAT]%',
      },
      {
        label: 'Average Order Value (AOV)',
        before: '[OWNER STAT — Before $]',
        after: '[OWNER STAT — After $]',
        change: '+[OWNER STAT]%',
      },
      {
        label: 'Blended CAC',
        before: '[OWNER STAT — Before $]',
        after: '[OWNER STAT — After $]',
        change: '-[OWNER STAT]%',
      },
    ],
    testimonial: {
      quote:
        '[OWNER COPY — "BRANDMANIA did not pitch us more ad spend. They walked in, diagnosed where our capital was leaking, and fundamentally fixed our margin within weeks."]',
      author: '[OWNER COPY — Founder & CEO]',
      title: 'Managing Principal',
    },
  },
  {
    id: 'cs-02',
    slug: 'designer-boutique-perception-realignment',
    client: '[OWNER COPY — Haute Designer Boutique]',
    confidentialityStatus: 'ANONYMIZED',
    industry: 'Designer Boutiques & Women\'s Fashion',
    location: 'London / New York',
    challenge:
      '[OWNER COPY — Market perception lagged behind product craftsmanship, creating high resistance to premium pricing and forcing reliance on end-of-season sales.]',
    intervention: {
      flagshipsApplied: ['BRAND_DIRECTION', 'CONSUMER_SCOPE'],
      summary:
        '[OWNER COPY — Redefined visual direction, executive tone of voice, and psychological pricing tiers. Shifted communication from promotional discounts to imperial rarity.]',
    },
    timeframe: '120 Days',
    metrics: [
      {
        label: 'Full-Price Sell-Through Rate',
        before: '[OWNER STAT — Before %]',
        after: '[OWNER STAT — After %]',
        change: '+[OWNER STAT]%',
      },
      {
        label: 'Repeat Purchase LTV (6 Mo)',
        before: '[OWNER STAT — Before $]',
        after: '[OWNER STAT — After $]',
        change: '+[OWNER STAT]%',
      },
    ],
    testimonial: {
      quote:
        '[OWNER COPY — "Our customers stopped questioning our price points. The new Brand Direction created undeniable status that transformed our sell-through."]',
      author: '[OWNER COPY — Creative Director]',
      title: 'Founder & Head of Design',
    },
  },
];


### FILE: E:\Ibrahim's website\src\content\founder.ts

/**
 * Founder-Led Experience Configuration
 *
 * Articulates the executive leadership behind BRANDMANIA.
 * Maintains institutional authority without devolving into a personal blog.
 */

export interface FounderConfig {
  name: string;
  role: string;
  portraitUrl: string;
  biography: string;
  personalMotto: string;
  experienceHighlights: {
    year: string;
    milestone: string;
  }[];
  credentials: string[];
}

export const FOUNDER: FounderConfig = {
  name: '[OWNER COPY — Founder Name]',
  role: 'Founder & Strategic Principal',
  portraitUrl: '/brand/graphics/founder-placeholder.svg',
  biography:
    '[OWNER COPY — Founder biography detailing background in high-ticket brand direction, margin optimization, behavioral economics, and international commercial strategy.]',
  personalMotto:
    "Let people applaud your second to greatest work, because you're creating your greatest.",
  experienceHighlights: [
    {
      year: '[YEAR]',
      milestone: '[OWNER COPY — Established BRANDMANIA strategic consultancy]',
    },
    {
      year: '[YEAR]',
      milestone: '[OWNER COPY — Directed luxury margin recovery across UK & European houses]',
    },
    {
      year: '[YEAR]',
      milestone: '[OWNER COPY — Architected proprietary Consumer Scope neuro-marketing frameworks]',
    },
  ],
  credentials: [
    '[OWNER COPY — Credential / Strategic Authority 1]',
    '[OWNER COPY — Credential / Industry Specialization 2]',
    '[OWNER COPY — Credential / Commercial Track Record 3]',
  ],
};


### FILE: E:\Ibrahim's website\src\content\legal.ts

/**
 * Legal & Compliance Placeholders
 *
 * Provides structured placeholders for Privacy Policy, Terms of Engagement,
 * and Cookie Consent texts without inventing binding legal prose.
 */

export const LEGAL_CONTENT = {
  privacyPolicy: {
    title: 'Privacy Policy & Client Data Protection',
    subtitle: 'Data governance protocols, qualification intake confidentiality, and statutory user rights.',
    lastUpdated: 'October 2026',
    sections: [
      {
        index: '01',
        heading: 'Scope & Qualification Intake Data',
        content:
          'When you interact with the BRANDMANIA platform or submit a strategic inquiry through our Qualification intake form, we collect specific executive contact coordinates and operational parameters: executive full name, corporate email address, corporate brand domain/URL, verified annual revenue tier ($700,000+), and your primary commercial dilemma (Brand Direction, Margin Recovery, or Consumer Scope). We collect only data strictly necessary to evaluate commercial qualification and strategic mutual fit.',
      },
      {
        index: '02',
        heading: 'Commercial Confidentiality & Non-Disclosure',
        content:
          'All diagnostic disclosures, financial parameters, and corporate inquiries submitted to BRANDMANIA are treated as privileged commercial intelligence under strict institutional confidentiality. Your corporate data is never sold, leased, traded, or shared with third-party advertising networks. Access to intake submissions is restricted solely to authorized advisory partners tasked with conducting strategic fit evaluations.',
      },
      {
        index: '03',
        heading: 'Cookie Telemetry & Analytics Governance',
        content:
          'We utilize essential security cookies required to maintain session integrity, guard against CSRF vulnerabilities, and ensure form validation security. Analytical telemetry (such as Google Analytics) is strictly non-essential and is only initialized after you provide affirmative consent via our Cookie Consent interface. You retain the absolute right to operate in Essential Only mode with zero analytical tracking.',
      },
      {
        index: '04',
        heading: 'Data Retention & Purpose Limitation',
        content:
          'Inquiry records and diagnostic submissions are retained only for the active duration required to review qualification and conduct executive advisory dialogue. Submissions from organizations that do not proceed to a formal commercial retainer are systematically purged from active repositories within 90 days. Any client may request immediate expedited data erasure at any time.',
      },
      {
        index: '05',
        heading: 'Statutory User Rights (GDPR, UK DPA & CCPA)',
        content:
          'Under applicable international data protection frameworks (including the EU/UK General Data Protection Regulation and the California Consumer Privacy Act), you possess enforceable statutory rights regarding your personal and corporate coordinates: the Right to Access, the Right to Rectification, the Right to Erasure ("Right to be Forgotten"), the Right to Data Portability, and the Right to Object to or Restrict Processing. We honor all verified rights requests without commercial retaliation.',
      },
      {
        index: '06',
        heading: 'Official Communications & Data Inquiries',
        content:
          'To exercise your statutory data rights, request an immediate purge of your intake records, or query our data governance standards, submit a direct notice through our official executive portal. We do not publish unverified physical addresses; official communications are managed directly through our validated qualification and advisory channels.',
      },
    ],
  },
  termsOfEngagement: {
    title: 'Terms of Engagement & Advisory Notice',
    subtitle: 'Operational terms governing website access, proprietary methodologies, and qualification inquiries.',
    lastUpdated: 'October 2026',
    sections: [
      {
        index: '01',
        heading: 'Acceptance of Architectural Terms',
        content:
          'By accessing or navigating the BRANDMANIA digital environment, reviewing strategic publications, or utilizing our qualification intake architecture, you agree to comply with and be bound by these Terms of Engagement. If you do not agree with any provision herein, you must immediately discontinue use of this platform.',
      },
      {
        index: '02',
        heading: 'Intellectual Property & Proprietary Frameworks',
        content:
          'All visual artboards, typography systems, mathematical grids, vector watermarks (including the authentic BrandEye), and proprietary frameworks—including but not limited to the Perception Theater, Continuous Causal System, Margin Recovery, Brand Direction, and Consumer Scope—are the exclusive intellectual property of BRANDMANIA. No portion of this site or its proprietary methodology may be copied, reproduced, distributed, scraped, framed, or utilized for generative AI model training without explicit written authorization.',
      },
      {
        index: '03',
        heading: 'Nature of Inquiries & Non-Binding Advisory Status',
        content:
          'The submission of a strategic intake form, diagnostic qualification request, or exploratory message does NOT constitute a binding advisory retainer, joint venture, performance contract, or formal agency engagement. BRANDMANIA reserves absolute discretion in evaluating strategic fit and client suitability. A binding commercial relationship is established solely upon the mutual execution of an individualized Master Services Agreement (MSA) and Statement of Work (SOW).',
      },
      {
        index: '04',
        heading: 'Prohibited Platform Conduct',
        content:
          'You may not engage in automated scraping, denial-of-service attempts, payload injection, automated form spamming, reverse-engineering of client-side assets, or any behavior that impairs the availability, integrity, or aesthetic performance of the BRANDMANIA infrastructure.',
      },
      {
        index: '05',
        heading: 'Limitation of Commercial Liability',
        content:
          'All strategic commentary, articles, and diagnostic frameworks provided across this platform are published for strategic evaluation and educational purposes. While BRANDMANIA engineers high-precision market positioning and margin recovery systems, we make no speculative or unconditional guarantees of financial return prior to formal bilateral audit and retainer execution. BRANDMANIA disclaims all liability for indirect, incidental, or consequential damages arising from reliance on public web content.',
      },
      {
        index: '06',
        heading: 'Governing Law & Dispute Resolution',
        content:
          'These terms and any disputes arising out of the use of this website shall be governed by and construed in accordance with established principles of international commercial arbitration. In the event of a dispute, the parties commit to good-faith executive negotiation prior to initiating formal arbitral proceedings.',
      },
    ],
  },
  cookieConsent: {
    bannerTitle: 'Privacy & Strategic Telemetry',
    bannerText:
      'We use essential security cookies to ensure intake form integrity and session security. With your consent, we employ privacy-respecting analytics to evaluate aggregate platform performance.',
    acceptAllLabel: 'Accept Analytics',
    essentialOnlyLabel: 'Essential Only',
    privacyPolicyLabel: 'Review Privacy Policy',
  },
};


### FILE: E:\Ibrahim's website\src\content\navigation.ts

/**
 * Navigation Configuration
 *
 * Header menu, mobile drawer items, and footer directories.
 */

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: 'Manifesto', href: '/#manifesto' },
  { label: 'System', href: '/#system' },
  { label: 'Disciplines', href: '/#disciplines' },
  { label: 'Work', href: '/#work' },
];

export const FOOTER_SECTIONS = [
  {
    title: 'Architecture & System',
    links: [
      { label: 'Manifesto', href: '/#manifesto' },
      { label: 'Continuous System', href: '/#system' },
      { label: 'Disciplines', href: '/#disciplines' },
      { label: 'Selected Work', href: '/#work' },
      { label: 'Qualification Intake', href: '/#qualification' },
    ],
  },
  {
    title: 'Flagship Disciplines',
    links: [
      { label: 'Margin Recovery', href: '/services/margin-recovery' },
      { label: 'Brand Direction', href: '/services/brand-direction' },
      { label: 'Consumer Scope', href: '/services/consumer-scope' },
      { label: 'Supporting Capabilities', href: '/services' },
    ],
  },
  {
    title: 'Campaign Funnels',
    links: [
      { label: 'Executive Cold Outreach', href: '/f/default' },
      { label: 'Margin Leakage Diagnostic', href: '/f/margin-recovery' },
      { label: 'Fine Jewelry & Gemstones', href: '/f/jewelry' },
      { label: 'Designer Boutiques', href: '/f/designer-boutiques' },
    ],
  },
  {
    title: 'Legal & Compliance',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
];


### FILE: E:\Ibrahim's website\src\content\qualification.ts

/**
 * Lead Qualification Form Architecture
 *
 * Configurable question definitions, revenue tiers, and industry options.
 * Aligned for established businesses ($700,000+ annual revenue) and high-ticket international brands.
 */

export interface QualificationOption {
  value: string;
  label: string;
  sublabel?: string;
}

export interface QualificationField {
  id: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'email' | 'url' | 'select' | 'radio' | 'textarea';
  required: boolean;
  options?: QualificationOption[];
  step: number;
}

export const ENGAGEMENT_TRACKS: QualificationOption[] = [
  {
    value: 'FULL_ENGAGEMENT',
    label: 'Full Strategic & Performance Engagement',
    sublabel: 'Comprehensive multi-quarter brand direction, commercial margin audit, and performance execution.',
  },
  {
    value: 'STRATEGIC_CONSULTANCY',
    label: 'Strategic Consultancy',
    sublabel: 'High-impact advisory and architectural diagnostic (for targeted interventions or before full rebuild).',
  },
];

export const REVENUE_TIERS: QualificationOption[] = [
  { value: 'TIER_SUB_700K', label: 'Under $700K Annual Revenue', sublabel: 'Emerging trajectory' },
  { value: 'TIER_700K_1_5M', label: '$700K – $2M Annual Revenue', sublabel: 'Established foundation' },
  { value: 'TIER_1_5M_5M', label: '$2M – $10M Annual Revenue', sublabel: 'Scaling market presence' },
  { value: 'TIER_5M_PLUS', label: '$10M+ Annual Revenue', sublabel: 'Category leader' },
];

export const PRIMARY_INDUSTRIES: QualificationOption[] = [
  { value: 'HIGH_END_ECOMMERCE', label: 'High-Ticket Consumer Brands & E-commerce' },
  { value: 'LUXURY_GOODS', label: 'Luxury Goods & Prestige Products' },
  { value: 'SPECIALIZED_DEVICES', label: 'Specialized Devices & Technology' },
  { value: 'DESIGNER_BOUTIQUE', label: 'Designer Fashion & Apparel' },
  { value: 'COSMETICS_PERFUME', label: 'Cosmetics, Skincare & Fragrance' },
  { value: 'LUXURY_INTERIOR', label: 'Architecture, Interior & Home' },
  { value: 'HOSPITALITY_RESORT', label: 'Hospitality, Travel & Resorts' },
  { value: 'JEWELRY_GEMSTONES', label: 'Fine Jewelry & Watches' },
  { value: 'SPECIALIZED_SERVICES', label: 'Specialized Commercial Services' },
  { value: 'OTHER', label: 'Other High-Ticket Commercial Vertical' },
];

export const CORE_CHALLENGES: QualificationOption[] = [
  { value: 'BRAND_PERCEPTION', label: 'Brand Direction & Market Perception', sublabel: 'Positioning ceiling; price resistance' },
  { value: 'MARGIN_LEAKS', label: 'Margin Recovery & Cash Flow Leakage', sublabel: 'High marketing spend with eroding net return' },
  { value: 'CONSUMER_ATTACHMENT', label: 'Consumer Scope & Retention', sublabel: 'Transactional churn; low lifetime attachment' },
  { value: 'COMPREHENSIVE_SYSTEM', label: 'Full System Integration', sublabel: 'Harmonizing brand, marketing, and operations' },
];

export const TIMELINES: QualificationOption[] = [
  { value: 'IMMEDIATE', label: 'Immediate (Next 14 Days)' },
  { value: 'WITHIN_30_DAYS', label: 'Within 30 Days' },
  { value: 'NEXT_QUARTER', label: 'Next Quarter' },
  { value: 'EXPLORATORY', label: 'Strategic Evaluation' },
];

export const QUALIFICATION_CONFIG = {
  title: 'Request Strategic Consultation',
  subtitle: 'Confidential Executive Diagnostic • Aligned for Established Businesses ($700K+ Annual Revenue)',
  steps: [
    {
      step: 1,
      title: 'Commercial Profile & Engagement Track',
      description: 'Your business baseline and preferred engagement structure.',
    },
    {
      step: 2,
      title: 'Primary Strategic Challenge',
      description: 'Identify where your commercial machine requires intervention.',
    },
    {
      step: 3,
      title: 'Executive Coordinates',
      description: 'Direct contact details for confidential scheduling.',
    },
  ],
};


### FILE: E:\Ibrahim's website\src\content\seo.ts

/**
 * SEO & Structured Data Configuration
 *
 * Configures canonical URLs, meta tags, OpenGraph schemas, and JSON-LD structured data.
 */

export const SEO_CONFIG = {
  defaultTitle: 'BRANDMANIA | Branded For The Best',
  titleTemplate: '%s | BRANDMANIA',
  defaultDescription:
    'Strategic premium agency and executive growth partner. We engineer Margin Recovery, Brand Direction, and Consumer Scope for ambitious market leaders.',
  siteUrl: process.env.APP_URL || 'https://brandmania.agency',
  keywords: [
    'Brand Direction',
    'Margin Recovery',
    'Consumer Scope',
    'Strategic Marketing',
    'High Ticket Branding',
    'Luxury Consulting',
    'Behavioral Economics Branding',
    'Jewelry Brand Strategy',
    'Designer Boutique Marketing',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BRANDMANIA',
    images: [
      {
        url: '/brand/graphics/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BRANDMANIA — Branded for the best',
      },
    ],
  },
  twitter: {
    handle: '@brandmania',
    site: '@brandmania',
    cardType: 'summary_large_image',
  },
  organizationSchema: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BRANDMANIA',
    url: 'https://brandmania.agency',
    logo: 'https://brandmania.agency/brand/logo/brandmania-logo.svg',
    slogan: 'Branded for the best',
    description:
      'Executive-level strategic brand consultancy specializing in Margin Recovery, Brand Direction, and Consumer Scope.',
    sameAs: [],
  },
};


### FILE: E:\Ibrahim's website\src\content\seoConfig.ts

import { SeoConfigSchema, type SeoConfig } from '@/domain/seo/schemaTypes';

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brandmania.com';
// Normalize siteUrl to never have a trailing slash
const siteUrl = rawSiteUrl.replace(/\/+$/, '');

const rawConfig = {
  brandName: 'BRANDMANIA',
  tagline: 'Branded for the best',
  oneLiner: "Let's make you a market leader",
  siteUrl,
  revenueThreshold: '$700,000+ annual revenue',
  logoPath: '/brand/textures/brandmania-cover-clean.jpg',
  coverImagePath: '/brand/textures/brandmania-cover-clean.jpg',
  priceRange: '$$$$',
  currenciesAccepted: 'USD',
  locales: ['x-default', 'en', 'en-US', 'en-GB', 'en-AE', 'en-CA', 'en-AU'],
  defaultLocale: 'en',
  contactPoint: {
    contactType: 'Strategic Consultation & Qualification',
    availableLanguage: ['English'],
    url: `${siteUrl}/#qualification`,
  },
  openingHours: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  // Conditional schemas: null/empty by default to eliminate fabricated facts
  founder: null,
  address: null,
  geo: null,
  reviews: [],
  aggregateRating: null,
  flagshipDisciplines: [
    {
      id: 'brand-direction',
      name: 'Brand Direction',
      slogan: 'How the message is communicated is at least as important as what the message is.',
      description:
        'Aligning brand story, narrative, tone of voice, positioning, USP, trust, identity, vision, and mission with ideal customer perception.',
      anchor: `${siteUrl}/#brand-direction`,
    },
    {
      id: 'margin-recovery',
      name: 'Margin Recovery',
      slogan: 'Fix the machine before buying more traffic.',
      description:
        'Auditing commercial data across planning, marketing, sales, fulfillment, customer service, and post-purchase relationships to identify and repair revenue leakage before scaling traffic.',
      anchor: `${siteUrl}/#margin-recovery`,
    },
    {
      id: 'consumer-scope',
      name: 'Consumer Scope',
      slogan: 'Engineering customer perception, experience, and cognitive attachment.',
      description:
        'Designing customer touchpoints and interactions through psychology and behavioral economics (perceived value, psychological pricing, emotional attachment, loyalty, status perception, and behavioral elasticity).',
      anchor: `${siteUrl}/#consumer-scope`,
    },
  ],
  supportingCapabilities: [
    'Digital Marketing',
    'Growth Marketing',
    'Performance Marketing',
    'Content Creation',
    'Performance Content Creation',
    'Finance & Operations',
    'Strategic Management',
    'Team Management',
    'Project Management',
    'AI Automation',
    'AI Connected Systems',
  ],
  targetIndustries: [
    'Designers',
    'Jewelry & Gemstones',
    'Interior Design',
    'Outdoor Luxury Construction',
    'Hotels & Resorts',
    'Gyms',
    'Supplement Stores',
    'Sports & Fitness Wear',
    'Organic Herbs & Alternative Medicine',
    'Software & Mobile Apps',
    'Cosmetics & Skincare/Haircare',
    'E-Commerce',
    'Healthcare Nutrition & Weight Loss',
    'Perfumes',
    "Women's Clothing & Apparel",
    'Accessories',
    'Electronics',
    'Coffee',
    'B2B Medical Devices',
    'Furniture',
  ],
  engagementModels: [
    {
      id: 'full-engagement',
      name: 'Full Strategic Rebuild & Performance Engagement',
      description:
        'Comprehensive commercial and brand transformation for established businesses with $700,000+ annual revenue, aligning Brand Direction, Margin Recovery, and Consumer Scope.',
      eligibility:
        'Established businesses generating $700,000+ in annual revenue and high-ticket international brands.',
      priceRange: '$$$$',
    },
    {
      id: 'strategic-consultancy',
      name: 'Strategic Consultancy',
      description:
        'Targeted high-level advisory and diagnostic engagement for prospects not yet ready for a full rebuild or when full-engagement capacity is reached.',
      eligibility:
        'Qualifying brands requiring strategic direction, perceptual audits, or margin leakage diagnosis.',
      priceRange: '$$$',
    },
  ],
  faqs: [
    {
      question: 'What types of businesses does BRANDMANIA work with?',
      answer:
        'Established businesses generating $700,000+ in annual revenue and high-ticket international brands across design, jewelry, interior design, luxury construction, hospitality, fitness, supplements, software/apps, cosmetics, e-commerce, medical devices, and more.',
    },
    {
      question: "What are BRANDMANIA's three core disciplines?",
      answer: 'Brand Direction, Margin Recovery, and Consumer Scope.',
    },
    {
      question:
        'Does BRANDMANIA offer consultancy if we are not ready for a full engagement?',
      answer:
        'Yes, BRANDMANIA offers strategic consultancy for businesses not yet ready for a full rebuild or when full-engagement capacity is full.',
    },
  ],
};

// Validate at module initialization so misconfigurations fail fast
export const seoConfig: SeoConfig = SeoConfigSchema.parse(rawConfig);


### FILE: E:\Ibrahim's website\src\content\services.ts

/**
 * BRANDMANIA Services Architecture
 *
 * Distinctly articulates the 3 Flagship Disciplines supported by targeted
 * operational, marketing, and technological capabilities.
 */

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  category: 'FLAGSHIP' | 'SUPPORTING';
  headline: string;
  summary: string;
  strategicPremise: string;
  points: string[];
  ctaLabel: string;
}

export const FLAGSHIP_SERVICES: Record<string, ServiceDetail> = {
  'margin-recovery': {
    id: 'margin-recovery',
    slug: 'margin-recovery',
    title: 'Margin Recovery',
    category: 'FLAGSHIP',
    headline: 'Fix The Machine Before Buying More Traffic',
    summary:
      'Every business is in the business of making money. Before escalating customer acquisition spend, we diagnose and seal the breaking points destroying margin.',
    strategicPremise:
      'Attention does not equal revenue. Pouring paid traffic into a leaky commercial system only accelerates capital destruction.',
    points: [
      'Comprehensive 8-vector margin and leakage audit',
      'Diagnostic breakdown of fulfillment, acquisition, and post-purchase costs',
      'Elimination of high-friction conversion drop-offs',
      'Restructuring sales pipeline economics for maximum margin retention',
      'Operational workflow stabilization before scaling ad capital',
    ],
    ctaLabel: 'Request Margin Diagnostic',
  },
  'brand-direction': {
    id: 'brand-direction',
    slug: 'brand-direction',
    title: 'Brand Direction',
    category: 'FLAGSHIP',
    headline: 'How The Message Is Communicated Is As Critical As The Message Itself',
    summary:
      'Brand Direction is not merely a logo, font palette, or guideline document. It is strategic market perception, narrative authority, and pricing power.',
    strategicPremise:
      'When your market perceives ordinary execution, you are forced to compete on price. When your brand communicates undeniable rarity, you dictate the terms.',
    points: [
      'Market perception repositioning for high-ticket buyers',
      'Executive tone of voice, linguistic precision, and narrative structure',
      'Distinctive commercial identity engineered for category authority',
      'Realigning brand presence with ideal high-LTV clientele',
      'Creation of bespoke digital brand assets with controlled visual tension',
    ],
    ctaLabel: 'Explore Brand Direction',
  },
  'consumer-scope': {
    id: 'consumer-scope',
    slug: 'consumer-scope',
    title: 'Consumer Scope',
    category: 'FLAGSHIP',
    headline: 'Engineering Customer Perception, Experience, and Behavioral Attachment',
    summary:
      'Going far beyond standard analytics. Consumer Scope explores cognitive touchpoints through behavioral economics, perceived value, and customer psychology.',
    strategicPremise:
      'Brand Direction defines who you are. Consumer Scope dictates how the customer mind feels, interprets, values, and behaves toward you at every single touchpoint.',
    points: [
      'Behavioral economics applied to high-ticket customer journeys',
      'Perceived value enhancement to support premium price points',
      'Psychological pricing frameworks and decision architecture',
      'Customer attachment loops that convert first-time buyers into brand advocates',
      'Systematic elimination of cognitive friction across the entire funnel',
    ],
    ctaLabel: 'Consult on Consumer Scope',
  },
};

export const SUPPORTING_CAPABILITIES = [
  {
    group: 'Growth & Performance Marketing',
    items: [
      'Engineered Customer Acquisition',
      'Performance Media Strategy',
      'High-Intent Funnel Architecture',
      'High-Conversion Creative Strategy',
      'Multi-Channel Performance Content',
    ],
  },
  {
    group: 'Strategic Operations & Finance',
    items: [
      'Unit Economics Optimization',
      'Strategic Operational Management',
      'Cross-Functional Team Orchestration',
      'Fulfillment Friction Elimination',
      'Executive Leadership Advisory',
    ],
  },
  {
    group: 'Technology & AI Connected Systems',
    items: [
      'Operational Process Automation',
      'Connected CRM & Data Pipelines',
      'Execution Velocity Acceleration',
      'Repetitive Task Elimination',
      'Bespoke Agency-Client Infrastructure',
    ],
  },
];


### FILE: E:\Ibrahim's website\src\content\funnels\brand-direction.ts

import { FunnelConfig } from './types';
import { DEFAULT_FUNNEL } from './default';

export const BRAND_DIRECTION_FUNNEL: FunnelConfig = {
  ...DEFAULT_FUNNEL,
  meta: {
    slug: 'brand-direction',
    title: 'BRANDMANIA | Brand Direction & Strategic Perception',
    description:
      'Elevate your brand presence to command premium pricing. How the message is communicated is as important as the message itself.',
    targetAudience: 'Founders of Luxury, Jewelry, and Designer Boutiques',
    campaignTag: 'brand-direction-v1',
  },
  hero: {
    badge: 'BRAND DIRECTION EXECUTIVE BRIEFING',
    headline: 'Perception Dictates Pricing Power.',
    subheadline:
      'We help brands establish optimal market perception, executive trust, tone of voice, narrative clarity, and category dominance.',
    primaryCta: 'Explore Brand Direction',
    secondaryCta: 'View Case Studies',
    supportingText: 'Consult an Expert for Free — Redefine Your Market Authority',
  },
};


### FILE: E:\Ibrahim's website\src\content\funnels\consumer-scope.ts

import { FunnelConfig } from './types';
import { DEFAULT_FUNNEL } from './default';

export const CONSUMER_SCOPE_FUNNEL: FunnelConfig = {
  ...DEFAULT_FUNNEL,
  meta: {
    slug: 'consumer-scope',
    title: 'BRANDMANIA | Consumer Scope & Behavioral Architecture',
    description:
      'Engineer customer touchpoints using behavioral economics, perceived value, psychological pricing, and customer loyalty.',
    targetAudience: 'Executives designing high-LTV customer journeys',
    campaignTag: 'consumer-scope-v1',
  },
  hero: {
    badge: 'CONSUMER SCOPE ARCHITECTURE',
    headline: 'Taking Over Minds.',
    subheadline:
      'We design how customers experience, interpret, value, and emotionally attach to your brand across every critical commercial touchpoint.',
    primaryCta: 'Consult on Consumer Scope',
    secondaryCta: 'Explore Behavioral Mechanisms',
    supportingText: 'Consult an Expert for Free — Understand the Mind Before Asking for Capital',
  },
};


### FILE: E:\Ibrahim's website\src\content\funnels\default.ts

import { FunnelConfig } from './types';

/**
 * DEFAULT COLD OUTREACH FUNNEL
 *
 * Implements the 18-step persuasive narrative sequence for cold traffic,
 * with clearly marked owner copy placeholders.
 */
export const DEFAULT_FUNNEL: FunnelConfig = {
  meta: {
    slug: 'default',
    title: 'BRANDMANIA | Executive Cold Outreach & Strategic Diagnostic',
    description:
      'Discover how market leaders recover lost margin, establish category-dominating brand perception, and scale with behavioral precision.',
    targetAudience: 'Founders, CEOs, and Commercial Executives ($700k+ Revenue)',
    campaignTag: 'cold-outreach-v1',
  },
  hero: {
    badge: 'CONFIDENTIAL STRATEGIC BRIEFING',
    headline: 'Attention Does Not Equal Revenue.',
    subheadline:
      'Fix the machine before buying more traffic. We diagnose hidden margin leaks, re-engineer brand perception, and build category leaders.',
    primaryCta: 'Book Now',
    secondaryCta: 'Watch Strategic Briefing',
    supportingText: 'Consult an Expert for Free — Discover How to Make the Best Decision for Your Brand',
  },
  painPoints: [
    {
      id: 'margin-pain',
      category: 'MARGIN',
      question: 'Your business is making money. So why are you losing so much of it?',
      elaboration:
        'Escalating customer acquisition cost, fragmented fulfillment, and post-purchase drop-offs silently dissolve profitability while topline revenue looks deceptively healthy.',
      impact: 'Capital incineration disguised as growth.',
    },
    {
      id: 'brand-pain',
      category: 'BRAND',
      question: 'Your market sees something fundamentally different from the business you built.',
      elaboration:
        'When communication fails to convey absolute rarity and authority, you become commoditized. You are forced to discount, negotiate, and plead for buyer attention.',
      impact: 'Erosion of premium pricing power.',
    },
    {
      id: 'consumer-pain',
      category: 'CONSUMER',
      question: 'Your customers buy from you. But have they truly chosen you?',
      elaboration:
        'Without psychological loyalty, identity alignment, and friction-free experience design, transactions remain purely circumstantial. One competitor offer, and they vanish.',
      impact: 'Zero customer attachment or lifetime value elasticity.',
    },
  ],
  mechanism: {
    title: 'The Commercial Progression',
    tagline: 'A disciplined, diagnostic pathway from broken economics to uncontested market leadership.',
    stages: [
      {
        number: '01',
        name: 'Margin Recovery',
        description: 'Diagnose and repair operational, sales, and fulfillment leaks before risking ad capital.',
      },
      {
        number: '02',
        name: 'Growth & Performance',
        description: 'Deploy aggressive, scalable customer acquisition only after unit economics are stabilized.',
      },
      {
        number: '03',
        name: 'Market Maturity',
        description: 'Consolidate market share, fortify cash flow, and elevate customer retention benchmarks.',
      },
      {
        number: '04',
        name: 'Brand Direction',
        description: 'Re-engineer market perception, narrative authority, and category differentiation.',
      },
      {
        number: '05',
        name: 'Consumer Scope',
        description: 'Architect deep psychological resonance, loyalty loops, and cognitive brand attachment.',
      },
      {
        number: '06',
        name: 'Market Leadership',
        description: 'The culmination: commanding premium valuation, organic inbound pull, and market dominance.',
      },
    ],
  },
  flagshipHighlights: [
    {
      title: '01. Margin Recovery',
      description:
        'A comprehensive diagnostic across planning, acquisition, conversion, fulfillment, support, and retention. We identify breaking points that destroy revenue.',
    },
    {
      title: '02. Brand Direction',
      description:
        'Transcending graphic design. We establish optimal market perception, strategic tone of voice, narrative clarity, and unmatched authority for your ideal client.',
    },
    {
      title: '03. Consumer Scope',
      description:
        'Behavioral economics, perceived value, psychological pricing, and customer attachment engineering. Understanding how decisions form in the buyer mind.',
    },
  ],
  aiPhilosophy: {
    headline: 'AI as System Velocity. Humans as Strategic Masters.',
    body:
      'We reject the notion that AI replaces human creative and strategic brilliance. We leverage AI to eliminate operational friction, automate repetitive tasks, and synthesize data at machine speed. Human intellect remains solely responsible for strategy, psychology, storytelling, and nuanced commercial judgment.',
  },
  vsl: {
    headline: 'The Executive Video Briefing',
    subheadline: 'A 6-minute diagnostic breakdown of the Dilemma of Branding and how to break free.',
    posterUrl: '/brand/textures/brandmania-cover.jpg',
    durationMinutes: 6,
    keyTakeaways: [
      'Why conventional marketing agencies sell ad spend to businesses that cannot retain profit',
      'The 8 hidden areas where established brands quietly leak 15% to 40% of their net margin',
      'How luxury jewelry, boutiques, and high-ticket brands command 3x higher perceived value',
      'The exact diagnostic framework BRANDMANIA uses before accepting a partner engagement',
    ],
  },
  proof: {
    headline: 'Engineered Authority',
    subheadline: 'Real results from high-ticket engagements across Europe, the UK, and North America.',
    quotes: [
      {
        text:
          '[OWNER COPY — CASE STUDY QUOTE: "BRANDMANIA completely diagnosed our margin leak within 72 hours, transforming our acquisition economics."]',
        author: '[OWNER COPY — Executive Founder]',
        title: 'Managing Director',
        industry: 'Haute Horlogerie & Jewelry',
      },
      {
        text:
          '[OWNER COPY — CASE STUDY QUOTE: "The Brand Direction repositioning unlocked a 45% increase in average transaction size without increasing ad budget."]',
        author: '[OWNER COPY — Brand Director]',
        title: 'Creative Principal',
        industry: 'Designer Boutique',
      },
    ],
    metrics: [
      {
        value: '[OWNER STAT]',
        label: 'Margin Recovery Velocity',
        context: 'Average timeframe to identify primary operational leaks',
      },
      {
        value: '$700K+',
        label: 'Client Baseline ARR',
        context: 'Engineered strictly for ambitious and established businesses',
      },
      {
        value: '3 Flagships',
        label: 'Unified System',
        context: 'Margin Recovery • Brand Direction • Consumer Scope',
      },
    ],
  },
  engagementProcess: {
    headline: 'How We Engage',
    steps: [
      {
        number: '1',
        title: 'Diagnostic Audit',
        description: 'A deep forensic analysis of your business machine, margin leaks, and brand positioning.',
      },
      {
        number: '2',
        title: 'Remediation Architecture',
        description: 'Fixing the breaking points discovered through the audit before deploying growth capital.',
      },
      {
        number: '3',
        title: 'Selective Performance Partnership',
        description: 'For aligned brands, ongoing performance-driven execution and market leadership development.',
      },
    ],
  },
  selectivity: {
    badge: 'THOSE WHO DARE',
    headline: 'We Are Selectively Aligned.',
    description:
      'BRANDMANIA does not accept every business that requests an audit. We partner strictly with ambitious founders whose products and commercial foundations possess genuine market potential.',
    criteria: [
      'Established or ambitious business with ~$700k+ in annual revenue trajectory',
      'High-ticket or high-LTV sectors (Jewelry, Designer Boutiques, Luxury, Wellness, Specialized Goods)',
      'Leadership open to rigorous strategic truth, operational restructuring, and category dominance',
      'Desire to build a market leader rather than chase short-term vanity deliverables',
    ],
    disclaimer:
      'Revenue figures are guidance, not an automated barrier. If your brand possesses extraordinary commercial velocity and potential, we welcome your consultation request.',
  },
  finalCta: {
    headline: 'Let’s Make You A Market Leader.',
    subheadline: 'Schedule your preliminary strategic consultation with our leadership team.',
    buttonLabel: 'Book Now',
    supportingNote: 'Consult an Expert for Free • Zero Obligation • Strictly Confidential',
  },
};


### FILE: E:\Ibrahim's website\src\content\funnels\index.ts

import { FunnelConfig } from './types';
import { DEFAULT_FUNNEL } from './default';
import { MARGIN_RECOVERY_FUNNEL } from './margin-recovery';
import { BRAND_DIRECTION_FUNNEL } from './brand-direction';
import { CONSUMER_SCOPE_FUNNEL } from './consumer-scope';

export * from './types';
export { DEFAULT_FUNNEL } from './default';
export { MARGIN_RECOVERY_FUNNEL } from './margin-recovery';
export { BRAND_DIRECTION_FUNNEL } from './brand-direction';
export { CONSUMER_SCOPE_FUNNEL } from './consumer-scope';

const FUNNEL_MAP: Record<string, FunnelConfig> = {
  default: DEFAULT_FUNNEL,
  'margin-recovery': MARGIN_RECOVERY_FUNNEL,
  'brand-direction': BRAND_DIRECTION_FUNNEL,
  'consumer-scope': CONSUMER_SCOPE_FUNNEL,
  jewelry: {
    ...DEFAULT_FUNNEL,
    meta: {
      ...DEFAULT_FUNNEL.meta,
      slug: 'jewelry',
      title: 'BRANDMANIA | High Jewelry & Gemstones Strategic Practice',
      targetAudience: 'Fine Jewelry & Gemstone Brand Founders',
      campaignTag: 'vertical-jewelry-v1',
    },
    hero: {
      ...DEFAULT_FUNNEL.hero,
      badge: 'FINE JEWELRY & GEMSTONE AUTHORITY',
      headline: 'Rarity Engineered For Category Dominance.',
      subheadline:
        'We help jewelry and gemstone houses eliminate operational leaks, elevate perceived value, and command uncontested international market presence.',
    },
  },
  'designer-boutiques': {
    ...DEFAULT_FUNNEL,
    meta: {
      ...DEFAULT_FUNNEL.meta,
      slug: 'designer-boutiques',
      title: 'BRANDMANIA | Designer Boutiques & Fashion Houses',
      targetAudience: 'Designer Boutique Principals & Luxury Fashion Founders',
      campaignTag: 'vertical-designer-boutiques-v1',
    },
    hero: {
      ...DEFAULT_FUNNEL.hero,
      badge: 'DESIGNER BOUTIQUE ARCHITECTURE',
      headline: 'Transforming High-End Design Into Commercial Authority.',
      subheadline:
        'Bridge the gap between pure artistic vision and commercial margin retention. Fix the machine and establish undeniable brand pull.',
    },
  },
};

export function getFunnelBySlug(slug: string): FunnelConfig | null {
  return FUNNEL_MAP[slug] || null;
}

export function getAllFunnelSlugs(): string[] {
  return Object.keys(FUNNEL_MAP);
}


### FILE: E:\Ibrahim's website\src\content\funnels\margin-recovery.ts

import { FunnelConfig } from './types';
import { DEFAULT_FUNNEL } from './default';

export const MARGIN_RECOVERY_FUNNEL: FunnelConfig = {
  ...DEFAULT_FUNNEL,
  meta: {
    slug: 'margin-recovery',
    title: 'BRANDMANIA | Margin Recovery Diagnostic',
    description:
      'Stop incinerating ad capital on broken machinery. Discover where your business is silently leaking margin and fix the breaking points.',
    targetAudience: 'E-commerce Founders & Brand Executives seeking profit restoration',
    campaignTag: 'margin-recovery-v1',
  },
  hero: {
    badge: 'MARGIN RECOVERY DIAGNOSTIC',
    headline: 'Fix The Machine Before Buying More Traffic.',
    subheadline:
      'Every business is in the business of making money. We identify where existing revenue is leaking across your operations, sales, and fulfillment.',
    primaryCta: 'Request Margin Audit',
    secondaryCta: 'Explore Diagnostic Vectors',
    supportingText: 'Consult an Expert for Free — Discover What Is Breaking Your Net Profit',
  },
};


### FILE: E:\Ibrahim's website\src\content\funnels\types.ts

/**
 * Funnel Configuration Types
 *
 * Defines the contract for all acquisition and cold-outreach funnels.
 * Enables config-driven campaign pages (/f/[slug]) without duplicating UI code.
 */

export interface FunnelMetadata {
  slug: string;
  title: string;
  description: string;
  targetAudience: string;
  campaignTag: string;
}

export interface PainPointEntry {
  id: string;
  category: 'MARGIN' | 'BRAND' | 'CONSUMER';
  question: string;
  elaboration: string;
  impact: string;
}

export interface FunnelStep {
  stepNumber: number;
  title: string;
  subtitle?: string;
  content: string;
  badge?: string;
}

export interface FunnelConfig {
  meta: FunnelMetadata;
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    supportingText: string;
  };
  painPoints: PainPointEntry[];
  mechanism: {
    title: string;
    tagline: string;
    stages: {
      number: string;
      name: string;
      description: string;
    }[];
  };
  flagshipHighlights: {
    title: string;
    description: string;
  }[];
  aiPhilosophy: {
    headline: string;
    body: string;
  };
  vsl: {
    headline: string;
    subheadline: string;
    videoUrl?: string;
    posterUrl: string;
    durationMinutes: number;
    keyTakeaways: string[];
  };
  proof: {
    headline: string;
    subheadline: string;
    quotes: {
      text: string;
      author: string;
      title: string;
      industry: string;
    }[];
    metrics: {
      value: string;
      label: string;
      context: string;
    }[];
  };
  engagementProcess: {
    headline: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  selectivity: {
    badge: string;
    headline: string;
    description: string;
    criteria: string[];
    disclaimer: string;
  };
  finalCta: {
    headline: string;
    subheadline: string;
    buttonLabel: string;
    supportingNote: string;
  };
}


### FILE: E:\Ibrahim's website\src\domain\entities\inquiry.entity.ts

import { DomainValidationError } from '../errors/domain.error';
import { Email } from '../value-objects/email.vo';
import { CompanyTier } from '../value-objects/company-tier.vo';
import { BudgetRange } from '../value-objects/budget-range.vo';
import { ServiceCategory } from '../value-objects/service-category.vo';

export type InquiryStatus = 'PENDING' | 'QUALIFIED' | 'CONTACTED' | 'REJECTED';

export interface InquiryProps {
  id: string;
  clientName: string;
  companyName: string;
  email: Email;
  companyTier: CompanyTier;
  budgetRange: BudgetRange;
  services: ServiceCategory[];
  message: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Inquiry {
  private readonly _id: string;
  private readonly _clientName: string;
  private readonly _companyName: string;
  private readonly _email: Email;
  private readonly _companyTier: CompanyTier;
  private readonly _budgetRange: BudgetRange;
  private readonly _services: ServiceCategory[];
  private readonly _message: string;
  private _status: InquiryStatus;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  private constructor(props: InquiryProps) {
    this._id = props.id;
    this._clientName = props.clientName;
    this._companyName = props.companyName;
    this._email = props.email;
    this._companyTier = props.companyTier;
    this._budgetRange = props.budgetRange;
    this._services = props.services;
    this._message = props.message;
    this._status = props.status;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  public static create(params: {
    id: string;
    clientName: string;
    companyName: string;
    email: Email;
    companyTier: CompanyTier;
    budgetRange: BudgetRange;
    services: ServiceCategory[];
    message: string;
  }): Inquiry {
    if (!params.id || params.id.trim().length === 0) {
      throw new DomainValidationError('Inquiry ID is required', 'id');
    }
    if (!params.clientName || params.clientName.trim().length < 2) {
      throw new DomainValidationError('Client name must be at least 2 characters', 'clientName');
    }
    if (!params.companyName || params.companyName.trim().length < 2) {
      throw new DomainValidationError('Company name must be at least 2 characters', 'companyName');
    }
    if (!params.services || params.services.length === 0) {
      throw new DomainValidationError('At least one service must be selected', 'services');
    }
    if (!params.message || params.message.trim().length < 10) {
      throw new DomainValidationError('Message must be at least 10 characters long', 'message');
    }

    const now = new Date();
    return new Inquiry({
      id: params.id,
      clientName: params.clientName.trim(),
      companyName: params.companyName.trim(),
      email: params.email,
      companyTier: params.companyTier,
      budgetRange: params.budgetRange,
      services: params.services,
      message: params.message.trim(),
      status: 'PENDING',
      createdAt: now,
      updatedAt: now,
    });
  }

  public static reconstruct(props: InquiryProps): Inquiry {
    return new Inquiry(props);
  }

  public qualify(): void {
    if (this._status === 'REJECTED') {
      throw new DomainValidationError('Cannot qualify an inquiry that has been marked as rejected');
    }
    this._status = 'QUALIFIED';
    this._updatedAt = new Date();
  }

  public markContacted(): void {
    this._status = 'CONTACTED';
    this._updatedAt = new Date();
  }

  public reject(): void {
    this._status = 'REJECTED';
    this._updatedAt = new Date();
  }

  // Getters
  public get id(): string { return this._id; }
  public get clientName(): string { return this._clientName; }
  public get companyName(): string { return this._companyName; }
  public get email(): Email { return this._email; }
  public get companyTier(): CompanyTier { return this._companyTier; }
  public get budgetRange(): BudgetRange { return this._budgetRange; }
  public get services(): ReadonlyArray<ServiceCategory> { return Object.freeze([...this._services]); }
  public get message(): string { return this._message; }
  public get status(): InquiryStatus { return this._status; }
  public get createdAt(): Date { return this._createdAt; }
  public get updatedAt(): Date { return this._updatedAt; }
}


### FILE: E:\Ibrahim's website\src\domain\errors\domain.error.ts

export abstract class DomainError extends Error {
  public readonly code: string;

  constructor(message: string, code = 'DOMAIN_ERROR') {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class DomainValidationError extends DomainError {
  public readonly field?: string;

  constructor(message: string, field?: string) {
    super(message, 'DOMAIN_VALIDATION_ERROR');
    this.field = field;
  }
}

export class EntityNotFoundError extends DomainError {
  public readonly entityName: string;
  public readonly identifier: string;

  constructor(entityName: string, identifier: string) {
    super(`${entityName} with identifier '${identifier}' was not found.`, 'ENTITY_NOT_FOUND');
    this.entityName = entityName;
    this.identifier = identifier;
  }
}

export class BusinessRuleViolationError extends DomainError {
  constructor(message: string) {
    super(message, 'BUSINESS_RULE_VIOLATION');
  }
}


### FILE: E:\Ibrahim's website\src\domain\repositories\inquiry.repository.interface.ts

import { Inquiry } from '../entities/inquiry.entity';
import { Email } from '../value-objects/email.vo';

export interface IInquiryRepository {
  save(inquiry: Inquiry): Promise<void>;
  findById(id: string): Promise<Inquiry | null>;
  findByEmail(email: Email): Promise<Inquiry[]>;
  findAll(limit?: number, offset?: number): Promise<Inquiry[]>;
  count(): Promise<number>;
  delete(id: string): Promise<boolean>;
}


### FILE: E:\Ibrahim's website\src\domain\rules\inquiry-submission.rules.ts

import { CompanyTier } from '../value-objects/company-tier.vo';
import { BudgetRange } from '../value-objects/budget-range.vo';
import { BusinessRuleViolationError } from '../errors/domain.error';

export class InquirySubmissionRules {
  /**
   * High-ticket enterprise rule: If client represents Haute Luxury,
   * the minimum budget tier must meet high-ticket standards.
   */
  public static validateHighTicketAlignment(tier: CompanyTier, budget: BudgetRange): void {
    if (tier.value === 'HAUTE_LUXURY' && budget.getMinimumBudgetUsd() < 100000) {
      throw new BusinessRuleViolationError(
        'Haute Luxury engagements require a minimum budget allocation of $100,000+'
      );
    }
  }

  /**
   * Determine priority routing score for incoming inquiries based on tier and scope.
   */
  public static calculatePriorityScore(tier: CompanyTier, budget: BudgetRange, serviceCount: number): number {
    let score = 0;
    if (tier.value === 'HAUTE_LUXURY') score += 50;
    else if (tier.value === 'GLOBAL_ENTERPRISE') score += 40;
    else if (tier.value === 'MID_MARKET') score += 20;
    else score += 10;

    score += Math.min(budget.getMinimumBudgetUsd() / 10000, 40);
    score += serviceCount * 5;
    return score;
  }
}


### FILE: E:\Ibrahim's website\src\domain\seo\schemaTypes.ts

import { z } from 'zod';

export const PostalAddressSchema = z.object({
  streetAddress: z.string().min(1),
  addressLocality: z.string().min(1),
  addressRegion: z.string().optional(),
  postalCode: z.string().optional(),
  addressCountry: z.string().min(1),
});

export type PostalAddress = z.infer<typeof PostalAddressSchema>;

export const GeoCoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  region: z.string().optional(),
  placename: z.string().optional(),
});

export type GeoCoordinates = z.infer<typeof GeoCoordinatesSchema>;

export const OpeningHoursSpecificationSchema = z.object({
  dayOfWeek: z.array(z.string()).min(1),
  opens: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  closes: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
});

export type OpeningHoursSpecification = z.infer<typeof OpeningHoursSpecificationSchema>;

export const ReviewRatingSchema = z.object({
  ratingValue: z.number().min(1).max(5),
  bestRating: z.number().default(5),
  worstRating: z.number().default(1),
});

export const ReviewSchema = z.object({
  author: z.string().min(1),
  datePublished: z.string().min(1),
  reviewBody: z.string().min(1),
  reviewRating: ReviewRatingSchema,
});

export type Review = z.infer<typeof ReviewSchema>;

export const AggregateRatingSchema = z.object({
  ratingValue: z.number().min(1).max(5),
  reviewCount: z.number().int().positive(),
  bestRating: z.number().default(5),
  worstRating: z.number().default(1),
});

export type AggregateRating = z.infer<typeof AggregateRatingSchema>;

export const FounderSchema = z.object({
  name: z.string().min(1),
  jobTitle: z.string().min(1),
  url: z.string().url().optional(),
  sameAs: z.array(z.string().url()).optional(),
});

export type Founder = z.infer<typeof FounderSchema>;

export const ContactPointSchema = z.object({
  contactType: z.string().min(1),
  availableLanguage: z.array(z.string()).min(1),
  url: z.string().min(1),
  email: z.string().email().optional(),
  telephone: z.string().optional(),
});

export type ContactPoint = z.infer<typeof ContactPointSchema>;

export const FlagshipDisciplineSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slogan: z.string().min(1),
  description: z.string().min(1),
  anchor: z.string().min(1),
});

export type FlagshipDiscipline = z.infer<typeof FlagshipDisciplineSchema>;

export const OfferModelSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  eligibility: z.string().min(1),
  priceRange: z.string().optional(),
});

export type OfferModel = z.infer<typeof OfferModelSchema>;

export const FaqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export type FaqItem = z.infer<typeof FaqItemSchema>;

export const BlogPostInputSchema = z.object({
  headline: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1),
  datePublished: z.string().min(1),
  dateModified: z.string().optional(),
  author: z.string().optional(),
  image: z.string().optional(),
});

export type BlogPostInput = z.infer<typeof BlogPostInputSchema>;

export const BreadcrumbItemSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
  position: z.number().int().positive(),
});

export type BreadcrumbItem = z.infer<typeof BreadcrumbItemSchema>;

export const SeoConfigSchema = z.object({
  brandName: z.string().min(1),
  tagline: z.string().min(1),
  oneLiner: z.string().min(1),
  siteUrl: z.string().url(),
  revenueThreshold: z.string().min(1),
  logoPath: z.string().min(1),
  coverImagePath: z.string().min(1),
  priceRange: z.string().min(1),
  currenciesAccepted: z.string().min(1),
  locales: z.array(z.string()).min(1),
  defaultLocale: z.string().min(1),
  contactPoint: ContactPointSchema,
  openingHours: OpeningHoursSpecificationSchema,
  founder: FounderSchema.nullable(),
  address: PostalAddressSchema.nullable(),
  geo: GeoCoordinatesSchema.nullable(),
  reviews: z.array(ReviewSchema),
  aggregateRating: AggregateRatingSchema.nullable(),
  flagshipDisciplines: z.array(FlagshipDisciplineSchema).length(3),
  supportingCapabilities: z.array(z.string()).length(11),
  targetIndustries: z.array(z.string()).length(20),
  engagementModels: z.array(OfferModelSchema).length(2),
  faqs: z.array(FaqItemSchema).min(1),
});

export type SeoConfig = z.infer<typeof SeoConfigSchema>;


### FILE: E:\Ibrahim's website\src\domain\validation\inquiry.schema.ts

import { z } from 'zod';

export function normalizeWebsiteUrl(input?: string | null): string {
  if (!input) return '';
  const trimmed = input.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export const websiteValidator = z
  .string()
  .trim()
  .transform(normalizeWebsiteUrl)
  .refine(
    (val) => {
      if (!val) return true; // optional
      try {
        const parsed = new URL(val);
        return parsed.hostname.includes('.');
      } catch {
        return false;
      }
    },
    { message: 'Please provide a valid brand website (e.g. brand.com or https://brand.com)' }
  );

export const submitInquirySchema = z.object({
  clientName: z
    .string()
    .trim()
    .min(2, 'Executive name must be at least 2 characters')
    .max(100, 'Executive name cannot exceed 100 characters'),
  companyName: z
    .string()
    .trim()
    .min(2, 'Company or brand name must be at least 2 characters')
    .max(100, 'Company name cannot exceed 100 characters'),
  email: z
    .string()
    .trim()
    .email('Please provide a valid corporate email address'),
  website: websiteValidator.optional(),
  companyTier: z.enum(
    ['EMERGING_ENTERPRISE', 'MID_MARKET', 'GLOBAL_ENTERPRISE', 'HAUTE_LUXURY'],
    { errorMap: () => ({ message: 'Please select a valid annual commercial revenue tier' }) }
  ),
  budgetRange: z.enum(
    ['TIER_50K_100K', 'TIER_100K_250K', 'TIER_250K_500K', 'TIER_500K_PLUS'],
    { errorMap: () => ({ message: 'Please select a valid advisory budget allocation' }) }
  ),
  services: z
    .array(z.string())
    .min(1, 'Please select at least one strategic focus discipline'),
  message: z
    .string()
    .trim()
    .min(10, 'Diagnostic context must be at least 10 characters')
    .max(2000, 'Message cannot exceed 2000 characters'),
  // Anti-Spam Layer 1: Honeypot (must remain completely empty)
  company_fax_number: z.string().optional(),
  // Anti-Spam Layer 2: Submission Time-Lock (minimum 2500ms duration)
  submissionDurationMs: z.number().optional(),
});

export type SubmitInquirySchemaInput = z.infer<typeof submitInquirySchema>;


### FILE: E:\Ibrahim's website\src\domain\value-objects\budget-range.vo.ts

import { DomainValidationError } from '../errors/domain.error';

export type BudgetRangeType = 'TIER_50K_100K' | 'TIER_100K_250K' | 'TIER_250K_500K' | 'TIER_500K_PLUS';

export class BudgetRange {
  private static readonly VALID_RANGES: BudgetRangeType[] = [
    'TIER_50K_100K',
    'TIER_100K_250K',
    'TIER_250K_500K',
    'TIER_500K_PLUS',
  ];

  private readonly _value: BudgetRangeType;

  constructor(value: string) {
    if (!value) {
      throw new DomainValidationError('Budget range is required', 'budgetRange');
    }

    const upper = value.toUpperCase().trim() as BudgetRangeType;
    if (!BudgetRange.VALID_RANGES.includes(upper)) {
      throw new DomainValidationError(
        `Invalid budget tier '${value}'. Must be one of: ${BudgetRange.VALID_RANGES.join(', ')}`,
        'budgetRange'
      );
    }

    this._value = upper;
  }

  public get value(): BudgetRangeType {
    return this._value;
  }

  public getMinimumBudgetUsd(): number {
    switch (this._value) {
      case 'TIER_50K_100K':
        return 50000;
      case 'TIER_100K_250K':
        return 100000;
      case 'TIER_250K_500K':
        return 250000;
      case 'TIER_500K_PLUS':
        return 500000;
    }
  }

  public equals(other: BudgetRange): boolean {
    return other instanceof BudgetRange && this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }
}


### FILE: E:\Ibrahim's website\src\domain\value-objects\company-tier.vo.ts

import { DomainValidationError } from '../errors/domain.error';

export type CompanyTierType = 'EMERGING_ENTERPRISE' | 'MID_MARKET' | 'GLOBAL_ENTERPRISE' | 'HAUTE_LUXURY';

export class CompanyTier {
  private static readonly VALID_TIERS: CompanyTierType[] = [
    'EMERGING_ENTERPRISE',
    'MID_MARKET',
    'GLOBAL_ENTERPRISE',
    'HAUTE_LUXURY',
  ];

  private readonly _value: CompanyTierType;

  constructor(value: string) {
    if (!value) {
      throw new DomainValidationError('Company tier is required', 'companyTier');
    }

    const upper = value.toUpperCase().trim() as CompanyTierType;
    if (!CompanyTier.VALID_TIERS.includes(upper)) {
      throw new DomainValidationError(
        `Invalid company tier '${value}'. Must be one of: ${CompanyTier.VALID_TIERS.join(', ')}`,
        'companyTier'
      );
    }

    this._value = upper;
  }

  public get value(): CompanyTierType {
    return this._value;
  }

  public isHighTicket(): boolean {
    return this._value === 'GLOBAL_ENTERPRISE' || this._value === 'HAUTE_LUXURY';
  }

  public equals(other: CompanyTier): boolean {
    return other instanceof CompanyTier && this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }
}


### FILE: E:\Ibrahim's website\src\domain\value-objects\email.vo.ts

import { DomainValidationError } from '../errors/domain.error';

export class Email {
  private static readonly EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  private readonly _value: string;

  constructor(value: string) {
    if (!value || typeof value !== 'string') {
      throw new DomainValidationError('Email address cannot be empty', 'email');
    }

    const normalized = value.trim().toLowerCase();

    if (normalized.length > 254) {
      throw new DomainValidationError('Email address exceeds maximum length of 254 characters', 'email');
    }

    if (!Email.EMAIL_REGEX.test(normalized)) {
      throw new DomainValidationError(`Invalid email address format: ${value}`, 'email');
    }

    this._value = normalized;
  }

  public get value(): string {
    return this._value;
  }

  public equals(other: Email): boolean {
    if (!(other instanceof Email)) return false;
    return this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }
}


### FILE: E:\Ibrahim's website\src\domain\value-objects\service-category.vo.ts

import { DomainValidationError } from '../errors/domain.error';

export type ServiceCode =
  | 'BRAND_DIRECTION'
  | 'MARGIN_RECOVERY'
  | 'NEUROMARKETING'
  | 'AI_AUTOMATION'
  | 'GROWTH_MARKETING'
  | 'PERFORMANCE_CONTENT'
  | 'STRATEGIC_MANAGEMENT';

export class ServiceCategory {
  private static readonly VALID_SERVICES: Record<ServiceCode, { name: string; isCorePillar: boolean }> = {
    BRAND_DIRECTION: { name: 'Brand Direction', isCorePillar: true },
    MARGIN_RECOVERY: { name: 'Margin Recovery', isCorePillar: true },
    NEUROMARKETING: { name: 'Neuromarketing (Consumer Scope)', isCorePillar: true },
    AI_AUTOMATION: { name: 'AI Connected Systems & Automation', isCorePillar: false },
    GROWTH_MARKETING: { name: 'Growth & Performance Marketing', isCorePillar: false },
    PERFORMANCE_CONTENT: { name: 'Performance Content Creation', isCorePillar: false },
    STRATEGIC_MANAGEMENT: { name: 'Strategic Management & Ops', isCorePillar: false },
  };

  private readonly _code: ServiceCode;

  constructor(code: string) {
    if (!code) {
      throw new DomainValidationError('Service code cannot be empty', 'service');
    }

    const upper = code.toUpperCase().trim() as ServiceCode;
    if (!(upper in ServiceCategory.VALID_SERVICES)) {
      throw new DomainValidationError(
        `Unknown service category '${code}'. Valid: ${Object.keys(ServiceCategory.VALID_SERVICES).join(', ')}`,
        'service'
      );
    }

    this._code = upper;
  }

  public get code(): ServiceCode {
    return this._code;
  }

  public get name(): string {
    return ServiceCategory.VALID_SERVICES[this._code].name;
  }

  public get isCorePillar(): boolean {
    return ServiceCategory.VALID_SERVICES[this._code].isCorePillar;
  }

  public equals(other: ServiceCategory): boolean {
    return other instanceof ServiceCategory && this._code === other._code;
  }

  public static getAllCorePillars(): ServiceCode[] {
    return ['BRAND_DIRECTION', 'MARGIN_RECOVERY', 'NEUROMARKETING'];
  }
}


### FILE: E:\Ibrahim's website\src\infrastructure\container.ts

import { env } from './config/env';
import { StructuredLogger } from './logging/logger';
import { MemoryRateLimiter } from './security/rate-limiter';
import { MemoryCacheStore } from './cache/memory-cache';
import { InMemoryJobQueue } from './jobs/memory-job-queue';
import { InMemoryInquiryRepository } from './persistence/in-memory-inquiry.repository';
import { SystemClock } from '../application/ports/clock.port';
import { SubmitInquiryUseCase } from '../application/use-cases/submit-inquiry.use-case';
import { GetSystemHealthUseCase } from '../application/use-cases/get-system-health.use-case';

export class Container {
  private static instance: Container;

  public readonly clock: SystemClock;
  public readonly logger: StructuredLogger;
  public readonly rateLimiter: MemoryRateLimiter;
  public readonly cache: MemoryCacheStore;
  public readonly jobQueue: InMemoryJobQueue;
  public readonly inquiryRepository: InMemoryInquiryRepository;

  // Use Cases
  public readonly submitInquiryUseCase: SubmitInquiryUseCase;
  public readonly getSystemHealthUseCase: GetSystemHealthUseCase;

  private constructor() {
    this.clock = new SystemClock();
    this.logger = new StructuredLogger(env.LOG_LEVEL as any, 'agency-platform');
    this.rateLimiter = new MemoryRateLimiter(
      env.RATE_LIMIT_MAX_REQUESTS,
      env.RATE_LIMIT_WINDOW_MS
    );
    this.cache = new MemoryCacheStore(env.CACHE_DEFAULT_TTL_MS);
    this.jobQueue = new InMemoryJobQueue();
    this.inquiryRepository = new InMemoryInquiryRepository();

    // Register async background worker handlers
    this.jobQueue.registerHandler('SEND_INQUIRY_NOTIFICATION', async (job) => {
      this.logger.info(`Processing async notification for inquiry:`, {
        jobId: job.id,
        data: job.data,
      });
    });

    // Instantiate Use Cases
    this.submitInquiryUseCase = new SubmitInquiryUseCase(
      this.inquiryRepository,
      this.logger,
      this.jobQueue,
      this.clock
    );

    this.getSystemHealthUseCase = new GetSystemHealthUseCase(
      this.inquiryRepository,
      this.rateLimiter,
      this.clock,
      '1.0.0'
    );
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }
}

export const container = Container.getInstance();


### FILE: E:\Ibrahim's website\src\infrastructure\booking\calendly-booking.adapter.ts

import { IBookingProvider, BookingContext } from '@/application/ports/booking.port';

export class CalendlyBookingAdapter implements IBookingProvider {
  constructor(private readonly baseUrl: string = 'https://calendly.com/brandmania/executive-briefing') {}

  public async generateBookingUrl(context: BookingContext): Promise<string> {
    const params = new URLSearchParams();
    if (context.clientName) params.set('name', context.clientName);
    if (context.email) params.set('email', context.email);
    if (context.companyName) params.set('a1', context.companyName);
    if (context.inquiryId) params.set('a2', context.inquiryId);

    const queryString = params.toString();
    return queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
  }

  public getProviderName(): string {
    return 'Calendly';
  }
}


### FILE: E:\Ibrahim's website\src\infrastructure\booking\dev-booking.adapter.ts

import { IBookingProvider, BookingContext } from '@/application/ports/booking.port';

export class DevBookingAdapter implements IBookingProvider {
  public async generateBookingUrl(context: BookingContext): Promise<string> {
    const id = context.inquiryId || `dev_${Date.now()}`;
    return `/dev/foundation?booking_inquiry=${encodeURIComponent(id)}`;
  }

  public getProviderName(): string {
    return 'DevBooking';
  }
}


### FILE: E:\Ibrahim's website\src\infrastructure\cache\memory-cache.ts

import { ICache } from '../../application/ports/cache.port';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class MemoryCacheStore implements ICache {
  private readonly store = new Map<string, CacheEntry<unknown>>();

  constructor(
    private readonly defaultTtlMs = 300000,
    private readonly keyPrefix = 'agy_cache:'
  ) {}

  private getFullKey(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  public async get<T>(key: string): Promise<T | null> {
    const fullKey = this.getFullKey(key);
    const entry = this.store.get(fullKey);

    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(fullKey);
      return null;
    }

    return entry.value as T;
  }

  public async set<T>(key: string, value: T, ttlMs = this.defaultTtlMs): Promise<void> {
    const fullKey = this.getFullKey(key);
    this.store.set(fullKey, {
      value,
      expiresAt: Date.now() + ttlMs,
    });
  }

  public async delete(key: string): Promise<boolean> {
    return this.store.delete(this.getFullKey(key));
  }

  public async clear(): Promise<void> {
    this.store.clear();
  }

  public async has(key: string): Promise<boolean> {
    const val = await this.get(key);
    return val !== null;
  }
}


### FILE: E:\Ibrahim's website\src\infrastructure\config\env.ts

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  APP_URL: z.string().url().default('http://localhost:3000'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(60),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  API_SECRET_KEY: z.string().min(16).default('dev-secret-key-32-chars-minimum-required!'),
  CACHE_DEFAULT_TTL_MS: z.coerce.number().default(300000),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errorDetails = result.error.errors
      .map((err) => `${err.path.join('.')}: ${err.message}`)
      .join('\n');

    throw new Error(
      `FATAL: Application configuration validation failed. Process cannot boot safely:\n${errorDetails}`
    );
  }

  return result.data;
}

export const env: Env = parseEnv();


### FILE: E:\Ibrahim's website\src\infrastructure\http\api-response.ts

import { NextResponse } from 'next/server';

export interface ApiResponseMeta {
  requestId: string;
  timestamp: string;
}

export interface ApiSuccessEnvelope<T> {
  success: true;
  data: T;
  meta: ApiResponseMeta;
}

export interface ApiErrorPayload {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiErrorEnvelope {
  success: false;
  error: ApiErrorPayload;
  meta: ApiResponseMeta;
}

export function apiSuccess<T>(
  data: T,
  requestId: string,
  statusCode = 200,
  headers?: HeadersInit
): NextResponse<ApiSuccessEnvelope<T>> {
  const meta: ApiResponseMeta = {
    requestId,
    timestamp: new Date().toISOString(),
  };

  const responseHeaders = new Headers(headers);
  responseHeaders.set('x-request-id', requestId);

  return NextResponse.json(
    {
      success: true,
      data,
      meta,
    },
    {
      status: statusCode,
      headers: responseHeaders,
    }
  );
}

export function apiError(
  error: ApiErrorPayload,
  requestId: string,
  statusCode = 500,
  headers?: HeadersInit
): NextResponse<ApiErrorEnvelope> {
  const meta: ApiResponseMeta = {
    requestId,
    timestamp: new Date().toISOString(),
  };

  const responseHeaders = new Headers(headers);
  responseHeaders.set('x-request-id', requestId);

  return NextResponse.json(
    {
      success: false,
      error,
      meta,
    },
    {
      status: statusCode,
      headers: responseHeaders,
    }
  );
}


### FILE: E:\Ibrahim's website\src\infrastructure\http\error-handler.ts

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ApplicationError } from '../../application/errors/application.error';
import { DomainError, DomainValidationError } from '../../domain/errors/domain.error';
import { apiError, ApiErrorEnvelope } from './api-response';

export function handleHttpError(err: unknown, requestId: string): NextResponse<ApiErrorEnvelope> {
  // 1. Zod Schema Validation Errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      path: e.path.join('.'),
      message: e.message,
    }));

    return apiError(
      {
        code: 'VALIDATION_ERROR',
        message: 'Request input validation failed',
        details: formattedErrors,
      },
      requestId,
      400
    );
  }

  // 2. Application Layer Errors (with explicit status codes)
  if (err instanceof ApplicationError) {
    const headers = new Headers();
    if (err.code === 'RATE_LIMIT_ERROR' && err.details && typeof err.details === 'object') {
      const details = err.details as { retryAfterSeconds?: number };
      if (details.retryAfterSeconds) {
        headers.set('Retry-After', String(details.retryAfterSeconds));
      }
    }

    return apiError(
      {
        code: err.code,
        message: err.message,
        details: err.details,
      },
      requestId,
      err.statusCode,
      headers
    );
  }

  // 3. Domain Invariant Violations
  if (err instanceof DomainError) {
    const statusCode = err instanceof DomainValidationError ? 400 : 422;
    return apiError(
      {
        code: err.code,
        message: err.message,
      },
      requestId,
      statusCode
    );
  }

  // 4. Unhandled / Internal Errors (Redact stack and internal implementation)
  const isProd = process.env.NODE_ENV === 'production';
  const message = isProd ? 'An unexpected internal error occurred' : String(err);

  return apiError(
    {
      code: 'INTERNAL_ERROR',
      message,
    },
    requestId,
    500
  );
}


### FILE: E:\Ibrahim's website\src\infrastructure\http\request-context.ts

import { NextRequest } from 'next/server';

export interface RequestContext {
  requestId: string;
  clientIp: string;
  userAgent: string;
}

export function extractRequestContext(req: NextRequest): RequestContext {
  const requestId =
    req.headers.get('x-request-id') ||
    `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  const clientIp =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '127.0.0.1';

  const userAgent = req.headers.get('user-agent') || 'unknown';

  return {
    requestId,
    clientIp,
    userAgent,
  };
}


### FILE: E:\Ibrahim's website\src\infrastructure\jobs\memory-job-queue.ts

import { IJobQueue, Job, JobHandler } from '../../application/ports/job-queue.port';

export class InMemoryJobQueue implements IJobQueue {
  private readonly handlers = new Map<string, JobHandler<unknown>>();
  private readonly processedIdempotencyKeys = new Set<string>();
  private readonly pendingJobs: Job<unknown>[] = [];
  private isProcessing = false;

  public registerHandler<T = unknown>(name: string, handler: JobHandler<T>): void {
    this.handlers.set(name, handler as JobHandler<unknown>);
  }

  public async enqueue<T = unknown>(name: string, data: T, idempotencyKey?: string): Promise<string> {
    if (idempotencyKey && this.processedIdempotencyKeys.has(idempotencyKey)) {
      return `skipped_${idempotencyKey}`;
    }

    const job: Job<T> = {
      id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name,
      data,
      createdAt: new Date(),
      idempotencyKey,
    };

    this.pendingJobs.push(job as Job<unknown>);

    // Trigger async non-blocking drain
    queueMicrotask(() => {
      this.drain().catch((err) => {
        console.error('Job queue background drain error:', err);
      });
    });

    return job.id;
  }

  public async getPendingCount(): Promise<number> {
    return this.pendingJobs.length;
  }

  private async drain(): Promise<void> {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      while (this.pendingJobs.length > 0) {
        const job = this.pendingJobs.shift();
        if (!job) continue;

        const handler = this.handlers.get(job.name);
        if (handler) {
          await handler(job);
        }

        if (job.idempotencyKey) {
          this.processedIdempotencyKeys.add(job.idempotencyKey);
        }
      }
    } finally {
      this.isProcessing = false;
    }
  }
}


### FILE: E:\Ibrahim's website\src\infrastructure\logging\logger.ts

import { ILogger, LogContext } from '../../application/ports/logger.port';

const SENSITIVE_KEYS = new Set([
  'password',
  'token',
  'secret',
  'authorization',
  'api_key',
  'apikey',
  'credit_card',
  'cvv',
  'access_token',
  'refresh_token',
]);

function scrubContext(context: LogContext): LogContext {
  const clean: LogContext = {};
  for (const [key, value] of Object.entries(context)) {
    const lower = key.toLowerCase();
    if (SENSITIVE_KEYS.has(lower) || lower.includes('secret') || lower.includes('token')) {
      clean[key] = '[REDACTED]';
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      clean[key] = scrubContext(value as LogContext);
    } else {
      clean[key] = value;
    }
  }
  return clean;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class StructuredLogger implements ILogger {
  private readonly levelPriority: Record<LogLevel, number> = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
  };

  constructor(
    private readonly minLevel: LogLevel = 'info',
    private readonly serviceName = 'agency-platform'
  ) {}

  private shouldLog(level: LogLevel): boolean {
    return this.levelPriority[level] >= this.levelPriority[this.minLevel];
  }

  private write(level: string, message: string, meta?: LogContext, err?: Error | unknown): void {
    const payload: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      service: this.serviceName,
      level,
      message,
    };

    if (meta) {
      payload.context = scrubContext(meta);
    }

    if (err instanceof Error) {
      payload.error = {
        name: err.name,
        message: err.message,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
      };
    } else if (err) {
      payload.error = { message: String(err) };
    }

    const output = JSON.stringify(payload);
    if (level === 'error') {
      console.error(output);
    } else if (level === 'warn') {
      console.warn(output);
    } else {
      console.log(output);
    }
  }

  public debug(message: string, context?: LogContext): void {
    if (this.shouldLog('debug')) this.write('debug', message, context);
  }

  public info(message: string, context?: LogContext): void {
    if (this.shouldLog('info')) this.write('info', message, context);
  }

  public warn(message: string, context?: LogContext): void {
    if (this.shouldLog('warn')) this.write('warn', message, context);
  }

  public error(message: string, error?: Error | unknown, context?: LogContext): void {
    if (this.shouldLog('error')) this.write('error', message, context, error);
  }

  public audit(action: string, actor: string, details?: LogContext): void {
    this.write('audit', `AUDIT: [${action}] by [${actor}]`, {
      action,
      actor,
      ...details,
    });
  }
}


### FILE: E:\Ibrahim's website\src\infrastructure\persistence\in-memory-inquiry.repository.ts

import { IInquiryRepository } from '../../domain/repositories/inquiry.repository.interface';
import { Inquiry } from '../../domain/entities/inquiry.entity';
import { Email } from '../../domain/value-objects/email.vo';

export class InMemoryInquiryRepository implements IInquiryRepository {
  private readonly items = new Map<string, Inquiry>();

  public async save(inquiry: Inquiry): Promise<void> {
    this.items.set(inquiry.id, inquiry);
  }

  public async findById(id: string): Promise<Inquiry | null> {
    return this.items.get(id) ?? null;
  }

  public async findByEmail(email: Email): Promise<Inquiry[]> {
    const results: Inquiry[] = [];
    for (const inquiry of this.items.values()) {
      if (inquiry.email.equals(email)) {
        results.push(inquiry);
      }
    }
    return results;
  }

  public async findAll(limit = 50, offset = 0): Promise<Inquiry[]> {
    const all = Array.from(this.items.values());
    return all.slice(offset, offset + limit);
  }

  public async count(): Promise<number> {
    return this.items.size;
  }

  public async delete(id: string): Promise<boolean> {
    return this.items.delete(id);
  }

  public clear(): void {
    this.items.clear();
  }
}


### FILE: E:\Ibrahim's website\src\infrastructure\security\idempotency.ts

/**
 * Server-Side Idempotency Store
 * Deduplicates repeated consultation requests with identical Idempotency-Key,
 * preventing race-conditions, duplicate billing/notifications, and multiple records.
 */

export interface IdempotencyRecord<T = unknown> {
  key: string;
  status: 'IN_FLIGHT' | 'RESOLVED';
  response?: {
    statusCode: number;
    body: T;
    headers?: Record<string, string>;
  };
  createdAt: number;
}

export class IdempotencyStore {
  private store: Map<string, IdempotencyRecord> = new Map();
  private readonly ttlMs: number;

  constructor(ttlMs: number = 24 * 60 * 60 * 1000) {
    this.ttlMs = ttlMs;
  }

  public get<T>(key: string): IdempotencyRecord<T> | undefined {
    const record = this.store.get(key) as IdempotencyRecord<T> | undefined;
    if (!record) return undefined;

    // Check expiration
    if (Date.now() - record.createdAt > this.ttlMs) {
      this.store.delete(key);
      return undefined;
    }

    return record;
  }

  public set<T>(key: string, record: Omit<IdempotencyRecord<T>, 'key' | 'createdAt'>): void {
    this.store.set(key, {
      ...record,
      key,
      createdAt: Date.now(),
    });
  }

  public markInFlight(key: string): boolean {
    const existing = this.get(key);
    if (existing) {
      return false; // Already exists (in-flight or resolved)
    }
    this.set(key, { status: 'IN_FLIGHT' });
    return true;
  }

  public resolve<T>(key: string, statusCode: number, body: T, headers?: Record<string, string>): void {
    this.set(key, {
      status: 'RESOLVED',
      response: {
        statusCode,
        body,
        headers,
      },
    });
  }

  public clear(): void {
    this.store.clear();
  }

  public size(): number {
    return this.store.size;
  }
}

// Singleton instance for server runtime
export const idempotencyStore = new IdempotencyStore();


### FILE: E:\Ibrahim's website\src\infrastructure\security\rate-limiter.ts

import { IRateLimiter, RateLimitResult } from '../../application/ports/rate-limiter.port';

interface RateLimitBucket {
  tokens: number;
  lastRefillMs: number;
}

export class MemoryRateLimiter implements IRateLimiter {
  private readonly buckets = new Map<string, RateLimitBucket>();

  constructor(
    private readonly defaultMaxRequests = 60,
    private readonly defaultWindowMs = 60000
  ) {}

  public async checkLimit(
    key: string,
    maxRequests = this.defaultMaxRequests,
    windowMs = this.defaultWindowMs
  ): Promise<RateLimitResult> {
    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket) {
      bucket = {
        tokens: maxRequests - 1,
        lastRefillMs: now,
      };
      this.buckets.set(key, bucket);
      return {
        allowed: true,
        limit: maxRequests,
        remaining: bucket.tokens,
        resetTimeMs: now + windowMs,
        retryAfterSeconds: 0,
      };
    }

    // Refill tokens based on elapsed time
    const elapsed = now - bucket.lastRefillMs;
    if (elapsed >= windowMs) {
      bucket.tokens = maxRequests;
      bucket.lastRefillMs = now;
    } else {
      const tokensToAdd = Math.floor((elapsed / windowMs) * maxRequests);
      if (tokensToAdd > 0) {
        bucket.tokens = Math.min(maxRequests, bucket.tokens + tokensToAdd);
        bucket.lastRefillMs = now;
      }
    }

    if (bucket.tokens > 0) {
      bucket.tokens -= 1;
      const resetTimeMs = bucket.lastRefillMs + windowMs;
      return {
        allowed: true,
        limit: maxRequests,
        remaining: bucket.tokens,
        resetTimeMs,
        retryAfterSeconds: 0,
      };
    }

    const resetTimeMs = bucket.lastRefillMs + windowMs;
    const retryAfterSeconds = Math.max(1, Math.ceil((resetTimeMs - now) / 1000));

    return {
      allowed: false,
      limit: maxRequests,
      remaining: 0,
      resetTimeMs,
      retryAfterSeconds,
    };
  }

  public async reset(key: string): Promise<void> {
    this.buckets.delete(key);
  }

  public clearAll(): void {
    this.buckets.clear();
  }
}


### FILE: E:\Ibrahim's website\src\infrastructure\security\__tests__\secretsAudit.test.ts

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Security & Secrets Audit Test Suite', () => {
  const rootDir = path.resolve(__dirname, '../../../../');
  const srcDir = path.join(rootDir, 'src');

  const FORBIDDEN_SERVER_KEYS = [
    'API_SECRET_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'SERVICE_ROLE_KEY',
    'DATABASE_URL',
    'DATABASE_PASSWORD',
    'POSTGRES_PASSWORD',
    'PRIVATE_KEY',
    'JWT_SECRET',
    'STRIPE_SECRET_KEY',
  ];

  function getFilesRecursively(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (file !== 'node_modules' && file !== '.next') {
          getFilesRecursively(fullPath, fileList);
        }
      } else if (/\.(tsx|ts|js|mjs)$/.test(file) && !file.includes('.test.')) {
        fileList.push(fullPath);
      }
    }
    return fileList;
  }

  it('ensures zero server secret keys are prefixed with NEXT_PUBLIC_ anywhere in repository', () => {
    const allSrcFiles = getFilesRecursively(srcDir);
    const envExamplePath = path.join(rootDir, '.env.example');
    const filesToCheck = [...allSrcFiles];
    if (fs.existsSync(envExamplePath)) {
      filesToCheck.push(envExamplePath);
    }

    const violations: { file: string; line: string }[] = [];

    for (const filePath of filesToCheck) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        for (const secret of FORBIDDEN_SERVER_KEYS) {
          if (line.includes(`NEXT_PUBLIC_${secret}`)) {
            violations.push({
              file: path.relative(rootDir, filePath),
              line: `Line ${index + 1}: ${line.trim()}`,
            });
          }
        }
      });
    }

    expect(
      violations,
      `Found forbidden NEXT_PUBLIC_ secret prefixes:\n${JSON.stringify(violations, null, 2)}`
    ).toHaveLength(0);
  });

  it('ensures no "use client" components import or reference private server environment variables', () => {
    const allSrcFiles = getFilesRecursively(path.join(srcDir, 'presentation'));

    const violations: { file: string; secret: string; line: string }[] = [];

    for (const filePath of allSrcFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const isClientComponent =
        content.includes("'use client'") || content.includes('"use client"');

      if (isClientComponent) {
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          for (const secret of FORBIDDEN_SERVER_KEYS) {
            if (line.includes(`process.env.${secret}`) || line.includes(`env.${secret}`)) {
              violations.push({
                file: path.relative(rootDir, filePath),
                secret,
                line: `Line ${index + 1}: ${line.trim()}`,
              });
            }
          }
        });
      }
    }

    expect(
      violations,
      `Found client components referencing server-only secrets:\n${JSON.stringify(violations, null, 2)}`
    ).toHaveLength(0);
  });

  it('ensures next.config.ts does not leak server secrets into public env block', () => {
    const nextConfigPath = path.join(rootDir, 'next.config.ts');
    if (fs.existsSync(nextConfigPath)) {
      const content = fs.readFileSync(nextConfigPath, 'utf-8');
      for (const secret of FORBIDDEN_SERVER_KEYS) {
        expect(content).not.toContain(secret);
      }
    }
  });
});


### FILE: E:\Ibrahim's website\src\infrastructure\seo\metadata.ts

import type { Metadata } from 'next';
import { seoConfig } from '@/content/seoConfig';

export interface CustomMetadataOptions {
  title?: string;
  description?: string;
  canonicalPath?: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
}

/**
 * Builds production-grade Next.js Metadata with canonicals, hreflang alternates,
 * OpenGraph, Twitter cards, crawler directives, and conditional geo meta tags.
 */
export function constructMetadata(options: CustomMetadataOptions = {}): Metadata {
  const siteUrl = seoConfig.siteUrl;
  const path = options.canonicalPath || '';
  const canonicalUrl = `${siteUrl}${path}`;

  // Build hreflang map pointing to valid, resolvable canonical URLs
  // (Prevents Google Search Console 404 errors for non-existent locale subpaths)
  const languageAlternates: Record<string, string> = {
    'x-default': canonicalUrl,
  };

  for (const locale of seoConfig.locales) {
    if (locale !== 'x-default') {
      languageAlternates[locale] = canonicalUrl;
    }
  }

  const defaultTitleText =
    'BRANDMANIA — Branded for the Best | Brand Direction, Margin Recovery & Consumer Scope';
  const defaultDescriptionText =
    'Branding and commercial advisory for established businesses ($700,000+ annual revenue) and high-ticket international brands. Specializing in Brand Direction, Margin Recovery, and Consumer Scope.';

  const title = options.title
    ? {
        default: options.title,
        template: '%s | BRANDMANIA',
      }
    : {
        default: defaultTitleText,
        template: '%s | BRANDMANIA',
      };

  const description = options.description || defaultDescriptionText;
  const ogImageUrl = options.ogImage || seoConfig.coverImagePath;

  // Build conditional geo tags inside metadata.other
  const otherMeta: Record<string, string> = {};
  if (seoConfig.geo) {
    if (seoConfig.geo.region) {
      otherMeta['geo.region'] = seoConfig.geo.region;
    }
    if (seoConfig.geo.placename) {
      otherMeta['geo.placename'] = seoConfig.geo.placename;
    }
    otherMeta['geo.position'] = `${seoConfig.geo.latitude};${seoConfig.geo.longitude}`;
    otherMeta['ICBM'] = `${seoConfig.geo.latitude}, ${seoConfig.geo.longitude}`;
  }

  const defaultKeywords = [
    'Brand Direction',
    'Margin Recovery',
    'Consumer Scope',
    'Strategic Marketing',
    'High Ticket Branding',
    'Commercial Advisory',
    'Behavioral Economics Branding',
    'Pricing Power',
    'Enterprise Brand Strategy',
    ...seoConfig.targetIndustries,
  ];

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: options.keywords || defaultKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    openGraph: {
      type: 'website',
      siteName: seoConfig.brandName,
      locale: 'en_US',
      title: options.title || defaultTitleText,
      description,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${seoConfig.brandName} — ${seoConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: options.title || defaultTitleText,
      description,
      images: [ogImageUrl],
    },
    robots: options.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    ...(Object.keys(otherMeta).length > 0 ? { other: otherMeta } : {}),
  };
}


### FILE: E:\Ibrahim's website\src\infrastructure\seo\schemaGraph.ts

import { seoConfig as defaultSeoConfig } from '@/content/seoConfig';
import type {
  SeoConfig,
  Founder,
  PostalAddress,
  GeoCoordinates,
  Review,
  AggregateRating,
  FaqItem,
  BlogPostInput,
} from '@/domain/seo/schemaTypes';

// Recursive helper to omit undefined values from JSON-LD output
function stripUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(stripUndefined) as unknown as T;
  }
  if (value !== null && typeof value === 'object') {
    const cleaned: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (v !== undefined) {
        cleaned[k] = stripUndefined(v);
      }
    }
    return cleaned as T;
  }
  return value;
}

export function buildPostalAddressSchema(
  address: PostalAddress,
  siteUrl: string
): Record<string, unknown> {
  return stripUndefined({
    '@type': 'PostalAddress',
    '@id': `${siteUrl}/#postal-address`,
    streetAddress: address.streetAddress,
    addressLocality: address.addressLocality,
    addressRegion: address.addressRegion,
    postalCode: address.postalCode,
    addressCountry: address.addressCountry,
  });
}

export function buildGeoCoordinatesSchema(
  geo: GeoCoordinates,
  siteUrl: string
): Record<string, unknown> {
  return stripUndefined({
    '@type': 'GeoCoordinates',
    '@id': `${siteUrl}/#geo`,
    latitude: geo.latitude,
    longitude: geo.longitude,
  });
}

export function buildPersonSchema(
  founder: Founder,
  siteUrl: string
): Record<string, unknown> {
  return stripUndefined({
    '@type': 'Person',
    '@id': `${siteUrl}/#founder`,
    name: founder.name,
    jobTitle: founder.jobTitle,
    worksFor: { '@id': `${siteUrl}/#organization` },
    url: founder.url,
    sameAs: founder.sameAs,
  });
}

export function buildReviewSchema(
  review: Review,
  index: number,
  siteUrl: string
): Record<string, unknown> {
  return stripUndefined({
    '@type': 'Review',
    '@id': `${siteUrl}/#review-${index + 1}`,
    author: {
      '@type': 'Person',
      name: review.author,
    },
    datePublished: review.datePublished,
    reviewBody: review.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.reviewRating.ratingValue,
      bestRating: review.reviewRating.bestRating,
      worstRating: review.reviewRating.worstRating,
    },
    itemReviewed: { '@id': `${siteUrl}/#organization` },
  });
}

export function buildAggregateRatingSchema(
  rating: AggregateRating,
  siteUrl: string
): Record<string, unknown> {
  return stripUndefined({
    '@type': 'AggregateRating',
    '@id': `${siteUrl}/#aggregate-rating`,
    ratingValue: rating.ratingValue,
    reviewCount: rating.reviewCount,
    bestRating: rating.bestRating,
    worstRating: rating.worstRating,
    itemReviewed: { '@id': `${siteUrl}/#organization` },
  });
}

export function buildFaqPageSchema(
  faqs: FaqItem[],
  customConfig?: SeoConfig
): Record<string, unknown> {
  const config = customConfig || defaultSeoConfig;
  const siteUrl = config.siteUrl;

  return stripUndefined({
    '@type': 'FAQPage',
    '@id': `${siteUrl}/#faq`,
    isPartOf: { '@id': `${siteUrl}/#webpage` },
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });
}

export function buildBlogPostingSchema(
  post: BlogPostInput,
  customConfig?: SeoConfig
): Record<string, unknown> {
  const config = customConfig || defaultSeoConfig;
  const siteUrl = config.siteUrl;
  const canonicalUrl = `${siteUrl}/briefings/${post.slug}`;

  return stripUndefined({
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    isPartOf: { '@id': `${siteUrl}/#website` },
    mainEntityOfPage: canonicalUrl,
    headline: post.headline,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author,
        }
      : { '@id': `${siteUrl}/#organization` },
    publisher: { '@id': `${siteUrl}/#organization` },
    image: post.image
      ? post.image.startsWith('http')
        ? post.image
        : `${siteUrl}${post.image}`
      : `${siteUrl}${config.coverImagePath}`,
  });
}

export interface SchemaGraphOptions {
  config?: SeoConfig;
  canonicalPath?: string;
  pageTitle?: string;
  pageDescription?: string;
  includeBlogPosting?: BlogPostInput;
}

export interface JsonLdGraph {
  '@context': string;
  '@graph': Record<string, unknown>[];
}

/**
 * Builds the centralized, production-grade Schema.org JSON-LD @graph architecture
 * supporting all 18 service-business schemas.
 */
export function generateSchemaGraph(options: SchemaGraphOptions = {}): JsonLdGraph {
  const config = options.config || defaultSeoConfig;
  const siteUrl = config.siteUrl;
  const pageUrl = options.canonicalPath ? `${siteUrl}${options.canonicalPath}` : siteUrl;

  const graphNodes: Record<string, unknown>[] = [];

  // 1. Organization Schema
  const organizationNode = stripUndefined({
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: config.brandName,
    slogan: config.tagline,
    description:
      'Branding & Marketing Agency serving established businesses ($700,000+ annual revenue) and high-ticket international brands across Brand Direction, Margin Recovery, and Consumer Scope.',
    url: siteUrl,
    logo: `${siteUrl}${config.logoPath}`,
    image: `${siteUrl}${config.coverImagePath}`,
    contactPoint: { '@id': `${siteUrl}/#contact-point` },
    hasOfferCatalog: { '@id': `${siteUrl}/#offer-catalog` },
    makesOffer: config.engagementModels.map((model) => ({
      '@id': `${siteUrl}/#offer-${model.id}`,
    })),
  });
  graphNodes.push(organizationNode);

  // 2. LocalBusiness (Dual-typed with ProfessionalService & Organization)
  const localBusinessNode = stripUndefined({
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${siteUrl}/#localbusiness`,
    name: config.brandName,
    url: siteUrl,
    parentOrganization: { '@id': `${siteUrl}/#organization` },
    priceRange: config.priceRange,
    currenciesAccepted: config.currenciesAccepted,
    openingHoursSpecification: { '@id': `${siteUrl}/#opening-hours` },
    ...(config.address ? { address: buildPostalAddressSchema(config.address, siteUrl) } : {}),
    ...(config.geo ? { geo: buildGeoCoordinatesSchema(config.geo, siteUrl) } : {}),
    ...(config.aggregateRating
      ? { aggregateRating: buildAggregateRatingSchema(config.aggregateRating, siteUrl) }
      : {}),
  });
  graphNodes.push(localBusinessNode);

  // 3. Service Schemas (3 Flagship Disciplines)
  for (const disc of config.flagshipDisciplines) {
    const serviceNode = stripUndefined({
      '@type': 'Service',
      '@id': `${siteUrl}/#service-${disc.id}`,
      name: disc.name,
      serviceType: disc.name,
      slogan: disc.slogan,
      description: disc.description,
      provider: { '@id': `${siteUrl}/#organization` },
      url: disc.anchor,
    });
    graphNodes.push(serviceNode);
  }

  // 4. Offer Schemas (2 Confirmed Engagement Models)
  for (const model of config.engagementModels) {
    const offerNode = stripUndefined({
      '@type': 'Offer',
      '@id': `${siteUrl}/#offer-${model.id}`,
      name: model.name,
      description: model.description,
      offeredBy: { '@id': `${siteUrl}/#organization` },
      priceRange: model.priceRange || config.priceRange,
      eligibleCustomerType: model.eligibility,
      url: `${siteUrl}/#qualification`,
    });
    graphNodes.push(offerNode);
  }

  // 5. OfferCatalog Schema
  const offerCatalogNode = stripUndefined({
    '@type': 'OfferCatalog',
    '@id': `${siteUrl}/#offer-catalog`,
    name: `${config.brandName} Strategic Capabilities & Disciplines Catalog`,
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Flagship Disciplines',
        itemListElement: config.flagshipDisciplines.map((disc) => ({
          '@id': `${siteUrl}/#service-${disc.id}`,
        })),
      },
      {
        '@type': 'OfferCatalog',
        name: 'Supporting Capabilities',
        itemListElement: config.supportingCapabilities.map((cap, idx) => ({
          '@type': 'Offer',
          position: idx + 1,
          name: cap,
          offeredBy: { '@id': `${siteUrl}/#organization` },
        })),
      },
    ],
  });
  graphNodes.push(offerCatalogNode);

  // 6. Person Schema (Founder/Principal, only if non-null and verified)
  if (config.founder) {
    graphNodes.push(buildPersonSchema(config.founder, siteUrl));
  }

  // 7. ContactPoint Schema
  const contactPointNode = stripUndefined({
    '@type': 'ContactPoint',
    '@id': `${siteUrl}/#contact-point`,
    contactType: config.contactPoint.contactType,
    availableLanguage: config.contactPoint.availableLanguage,
    url: config.contactPoint.url,
    ...(config.contactPoint.email ? { email: config.contactPoint.email } : {}),
    ...(config.contactPoint.telephone ? { telephone: config.contactPoint.telephone } : {}),
  });
  graphNodes.push(contactPointNode);

  // 8. PostalAddress Schema (Standalone if address configured)
  if (config.address) {
    graphNodes.push(buildPostalAddressSchema(config.address, siteUrl));
  }

  // 9. GeoCoordinates Schema (Standalone if geo configured)
  if (config.geo) {
    graphNodes.push(buildGeoCoordinatesSchema(config.geo, siteUrl));
  }

  // 10. OpeningHoursSpecification Schema
  const openingHoursNode = stripUndefined({
    '@type': 'OpeningHoursSpecification',
    '@id': `${siteUrl}/#opening-hours`,
    dayOfWeek: config.openingHours.dayOfWeek,
    opens: config.openingHours.opens,
    closes: config.openingHours.closes,
  });
  graphNodes.push(openingHoursNode);

  // 11. Review Schemas (Only if verified reviews exist)
  if (config.reviews.length > 0) {
    config.reviews.forEach((review, idx) => {
      graphNodes.push(buildReviewSchema(review, idx, siteUrl));
    });
  }

  // 12. AggregateRating Schema (Only if verified rating exists)
  if (config.aggregateRating) {
    graphNodes.push(buildAggregateRatingSchema(config.aggregateRating, siteUrl));
  }

  // 13. WebSite Schema
  const webSiteNode = stripUndefined({
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: config.brandName,
    description: config.tagline,
    publisher: { '@id': `${siteUrl}/#organization` },
    inLanguage: config.defaultLocale,
  });
  graphNodes.push(webSiteNode);

  // 14. WebPage Schema
  const webPageNode = stripUndefined({
    '@type': 'WebPage',
    '@id': `${siteUrl}/#webpage`,
    url: pageUrl,
    name:
      options.pageTitle ||
      `${config.brandName} — Branded for the Best | Brand Direction, Margin Recovery & Consumer Scope`,
    description:
      options.pageDescription ||
      'Branding and commercial advisory for established businesses ($700,000+ annual revenue) and high-ticket international brands across Brand Direction, Margin Recovery, and Consumer Scope.',
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#organization` },
    inLanguage: config.defaultLocale,
    breadcrumb: { '@id': `${siteUrl}/#breadcrumbs` },
  });
  graphNodes.push(webPageNode);

  // 15. BreadcrumbList Schema (Primary architectural navigation anchors)
  const breadcrumbNode = stripUndefined({
    '@type': 'BreadcrumbList',
    '@id': `${siteUrl}/#breadcrumbs`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Manifesto',
        item: `${siteUrl}/#manifesto`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'System',
        item: `${siteUrl}/#system`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Disciplines',
        item: `${siteUrl}/#brand-direction`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Selected Work',
        item: `${siteUrl}/#campaigns`,
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'Consultation',
        item: `${siteUrl}/#qualification`,
      },
    ],
  });
  graphNodes.push(breadcrumbNode);

  // 16. BlogPosting Schema (Optional passed input)
  if (options.includeBlogPosting) {
    graphNodes.push(buildBlogPostingSchema(options.includeBlogPosting, config));
  }

  // 17. FAQPage Schema (Verified FAQs)
  if (config.faqs && config.faqs.length > 0) {
    graphNodes.push(buildFaqPageSchema(config.faqs, config));
  }

  // 18. ItemList Schemas (Flagship Disciplines & Industries Served)
  const flagshipDisciplinesList = stripUndefined({
    '@type': 'ItemList',
    '@id': `${siteUrl}/#flagship-disciplines-list`,
    name: 'BRANDMANIA Flagship Disciplines',
    numberOfItems: config.flagshipDisciplines.length,
    itemListElement: config.flagshipDisciplines.map((disc, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: disc.name,
      description: disc.description,
      item: `${siteUrl}/#service-${disc.id}`,
    })),
  });
  graphNodes.push(flagshipDisciplinesList);

  const industriesServedList = stripUndefined({
    '@type': 'ItemList',
    '@id': `${siteUrl}/#industries-served-list`,
    name: 'Industries Served by BRANDMANIA',
    numberOfItems: config.targetIndustries.length,
    itemListElement: config.targetIndustries.map((ind, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: ind,
    })),
  });
  graphNodes.push(industriesServedList);

  return {
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  };
}


### FILE: E:\Ibrahim's website\src\infrastructure\seo\__tests__\schemaGraph.test.ts

import { describe, it, expect } from 'vitest';
import {
  generateSchemaGraph,
  buildBlogPostingSchema,
  buildFaqPageSchema,
  buildPersonSchema,
  buildPostalAddressSchema,
  buildGeoCoordinatesSchema,
  buildReviewSchema,
  buildAggregateRatingSchema,
} from '../schemaGraph';
import { seoConfig } from '@/content/seoConfig';
import type { SeoConfig } from '@/domain/seo/schemaTypes';

describe('Schema.org JSON-LD Structured Data Engine Tests', () => {
  const siteUrl = seoConfig.siteUrl;

  it('DEFAULT GRAPH: generates valid @context and all active unconditional schemas', () => {
    const graph = generateSchemaGraph();

    expect(graph['@context']).toBe('https://schema.org');
    expect(Array.isArray(graph['@graph'])).toBe(true);

    const nodes = graph['@graph'];
    const types = nodes.flatMap((node) => {
      const t = node['@type'];
      return Array.isArray(t) ? t : [t];
    });

    // 1. Organization
    expect(types).toContain('Organization');
    const orgNode = nodes.find((n) => n['@id'] === `${siteUrl}/#organization`);
    expect(orgNode).toBeDefined();
    expect(orgNode?.name).toBe('BRANDMANIA');
    expect(orgNode?.slogan).toBe('Branded for the best');
    expect(orgNode?.description).toContain('$700,000+ annual revenue');
    expect(orgNode?.logo).toBe(`${siteUrl}/brand/textures/brandmania-cover-clean.jpg`);

    // 2. LocalBusiness (Dual-typed)
    expect(types).toContain('LocalBusiness');
    expect(types).toContain('ProfessionalService');
    const localBizNode = nodes.find((n) => n['@id'] === `${siteUrl}/#localbusiness`);
    expect(localBizNode).toBeDefined();
    expect(localBizNode?.priceRange).toBe('$$$$');
    expect(localBizNode?.currenciesAccepted).toBe('USD');

    // 3. Service (3 Flagship Disciplines)
    const serviceNodes = nodes.filter((n) => n['@type'] === 'Service');
    expect(serviceNodes).toHaveLength(3);
    const serviceIds = serviceNodes.map((s) => s['@id']);
    expect(serviceIds).toContain(`${siteUrl}/#service-brand-direction`);
    expect(serviceIds).toContain(`${siteUrl}/#service-margin-recovery`);
    expect(serviceIds).toContain(`${siteUrl}/#service-consumer-scope`);

    // 4. Offer (2 Confirmed Engagement Models)
    const offerNodes = nodes.filter((n) => n['@type'] === 'Offer');
    expect(offerNodes.length).toBeGreaterThanOrEqual(2);
    const offerIds = offerNodes.map((o) => o['@id']);
    expect(offerIds).toContain(`${siteUrl}/#offer-full-engagement`);
    expect(offerIds).toContain(`${siteUrl}/#offer-strategic-consultancy`);

    // 5. OfferCatalog
    const catalogNode = nodes.find((n) => n['@id'] === `${siteUrl}/#offer-catalog`);
    expect(catalogNode).toBeDefined();
    expect(catalogNode?.['@type']).toBe('OfferCatalog');

    // 7. ContactPoint
    const contactNode = nodes.find((n) => n['@id'] === `${siteUrl}/#contact-point`);
    expect(contactNode).toBeDefined();
    expect(contactNode?.contactType).toBe('Strategic Consultation & Qualification');
    expect(contactNode?.availableLanguage).toEqual(['English']);
    expect(contactNode?.url).toBe(`${siteUrl}/#qualification`);

    // 10. OpeningHoursSpecification
    const hoursNode = nodes.find((n) => n['@id'] === `${siteUrl}/#opening-hours`);
    expect(hoursNode).toBeDefined();
    expect(hoursNode?.dayOfWeek).toEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
    ]);
    expect(hoursNode?.opens).toBe('09:00');
    expect(hoursNode?.closes).toBe('18:00');

    // 13. WebSite
    const siteNode = nodes.find((n) => n['@id'] === `${siteUrl}/#website`);
    expect(siteNode).toBeDefined();
    expect(siteNode?.name).toBe('BRANDMANIA');

    // 14. WebPage
    const pageNode = nodes.find((n) => n['@id'] === `${siteUrl}/#webpage`);
    expect(pageNode).toBeDefined();
    expect(pageNode?.isPartOf).toEqual({ '@id': `${siteUrl}/#website` });

    // 15. BreadcrumbList
    const breadcrumbNode = nodes.find((n) => n['@id'] === `${siteUrl}/#breadcrumbs`);
    expect(breadcrumbNode).toBeDefined();
    const items = breadcrumbNode?.itemListElement as Array<{ name: string; position: number }>;
    expect(items).toHaveLength(6);
    expect(items.map((i) => i.name)).toEqual([
      'Home',
      'Manifesto',
      'System',
      'Disciplines',
      'Selected Work',
      'Consultation',
    ]);

    // 17. FAQPage
    const faqNode = nodes.find((n) => n['@id'] === `${siteUrl}/#faq`);
    expect(faqNode).toBeDefined();
    expect(faqNode?.['@type']).toBe('FAQPage');
    const mainEntity = faqNode?.mainEntity as Array<{ name: string }>;
    expect(mainEntity).toHaveLength(3);
    expect(mainEntity[0].name).toBe('What types of businesses does BRANDMANIA work with?');

    // 18. ItemList (Flagships & Industries Served)
    const itemLists = nodes.filter((n) => n['@type'] === 'ItemList');
    expect(itemLists).toHaveLength(2);
    const disciplinesList = nodes.find(
      (n) => n['@id'] === `${siteUrl}/#flagship-disciplines-list`
    );
    expect(disciplinesList).toBeDefined();
    expect(disciplinesList?.numberOfItems).toBe(3);

    const industriesList = nodes.find(
      (n) => n['@id'] === `${siteUrl}/#industries-served-list`
    );
    expect(industriesList).toBeDefined();
    expect(industriesList?.numberOfItems).toBe(20);
  });

  it('CONDITIONAL ANTI-FABRICATION RULE: Omits unverified facts in default config', () => {
    const graph = generateSchemaGraph();
    const nodes = graph['@graph'];
    const types = nodes.flatMap((node) => {
      const t = node['@type'];
      return Array.isArray(t) ? t : [t];
    });

    // Person (Founder) omitted if unverified
    expect(types).not.toContain('Person');
    expect(nodes.some((n) => n['@id'] === `${siteUrl}/#founder`)).toBe(false);

    // PostalAddress omitted if unverified
    expect(types).not.toContain('PostalAddress');
    expect(nodes.some((n) => n['@id'] === `${siteUrl}/#postal-address`)).toBe(false);

    // GeoCoordinates omitted if unverified
    expect(types).not.toContain('GeoCoordinates');
    expect(nodes.some((n) => n['@id'] === `${siteUrl}/#geo`)).toBe(false);

    // Review omitted if empty
    expect(types).not.toContain('Review');

    // AggregateRating omitted if null
    expect(types).not.toContain('AggregateRating');
    expect(nodes.some((n) => n['@id'] === `${siteUrl}/#aggregate-rating`)).toBe(false);
  });

  it('CONDITIONAL SERIALIZATION: Accurately serializes valid verified facts when provided', () => {
    const testConfig: SeoConfig = {
      ...seoConfig,
      founder: {
        name: 'Alexander Sterling',
        jobTitle: 'Principal & Strategic Director',
        url: `${siteUrl}/principal`,
        sameAs: ['https://linkedin.com/in/alexander-sterling'],
      },
      address: {
        streetAddress: '100 Mayfair Avenue',
        addressLocality: 'London',
        addressRegion: 'Greater London',
        postalCode: 'W1K 4QA',
        addressCountry: 'GB',
      },
      geo: {
        latitude: 51.5074,
        longitude: -0.1278,
        region: 'GB-LND',
        placename: 'London',
      },
      reviews: [
        {
          author: 'Marcus Vance',
          datePublished: '2026-03-15',
          reviewBody:
            'Brand Direction and Margin Recovery restructured our commercial operations, returning 34% margin.',
          reviewRating: {
            ratingValue: 5,
            bestRating: 5,
            worstRating: 1,
          },
        },
      ],
      aggregateRating: {
        ratingValue: 5.0,
        reviewCount: 1,
        bestRating: 5,
        worstRating: 1,
      },
    };

    const graph = generateSchemaGraph({ config: testConfig });
    const nodes = graph['@graph'];

    // Verify Person
    const personNode = nodes.find((n) => n['@id'] === `${siteUrl}/#founder`);
    expect(personNode).toBeDefined();
    expect(personNode?.['@type']).toBe('Person');
    expect(personNode?.name).toBe('Alexander Sterling');
    expect(personNode?.worksFor).toEqual({ '@id': `${siteUrl}/#organization` });

    // Verify PostalAddress
    const addressNode = nodes.find((n) => n['@id'] === `${siteUrl}/#postal-address`);
    expect(addressNode).toBeDefined();
    expect(addressNode?.streetAddress).toBe('100 Mayfair Avenue');

    // Verify GeoCoordinates
    const geoNode = nodes.find((n) => n['@id'] === `${siteUrl}/#geo`);
    expect(geoNode).toBeDefined();
    expect(geoNode?.latitude).toBe(51.5074);
    expect(geoNode?.longitude).toBe(-0.1278);

    // Verify Review
    const reviewNode = nodes.find((n) => n['@id'] === `${siteUrl}/#review-1`);
    expect(reviewNode).toBeDefined();
    expect(reviewNode?.['@type']).toBe('Review');
    expect((reviewNode?.author as { name: string }).name).toBe('Marcus Vance');

    // Verify AggregateRating
    const ratingNode = nodes.find((n) => n['@id'] === `${siteUrl}/#aggregate-rating`);
    expect(ratingNode).toBeDefined();
    expect(ratingNode?.ratingValue).toBe(5.0);
    expect(ratingNode?.reviewCount).toBe(1);

    // LocalBusiness should attach address, geo, aggregateRating
    const localBizNode = nodes.find((n) => n['@id'] === `${siteUrl}/#localbusiness`);
    expect(localBizNode?.address).toBeDefined();
    expect(localBizNode?.geo).toBeDefined();
    expect(localBizNode?.aggregateRating).toBeDefined();
  });

  it('BUILDERS: exports standalone helper builders for BlogPosting, FAQs and entities', () => {
    // BlogPosting
    const blogNode = buildBlogPostingSchema({
      headline: 'The Dilemma of Brand Authority vs Media Spend',
      description: 'Why ad spend accelerates capital destruction without margin architecture.',
      slug: 'brand-authority-vs-media-spend',
      datePublished: '2026-08-10',
      author: 'Strategic Principal',
    });
    expect(blogNode['@type']).toBe('BlogPosting');
    expect(blogNode['@id']).toBe(
      `${siteUrl}/briefings/brand-authority-vs-media-spend#article`
    );
    expect(blogNode.publisher).toEqual({ '@id': `${siteUrl}/#organization` });

    // FAQPage
    const faqNode = buildFaqPageSchema([
      { question: 'Test Question?', answer: 'Test Answer.' },
    ]);
    expect(faqNode['@type']).toBe('FAQPage');
    expect(faqNode['@id']).toBe(`${siteUrl}/#faq`);
  });
});


### FILE: E:\Ibrahim's website\src\infrastructure\seo\__tests__\seoGeoHreflang.test.ts

import { describe, it, expect } from 'vitest';
import { constructMetadata } from '../metadata';
import { seoConfig } from '@/content/seoConfig';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { GET as getLlmsTxt } from '@/app/llms.txt/route';
import { GET as getLlmsFullTxt } from '@/app/llms-full.txt/route';

describe('SEO, GEO, International Hreflang & AI Optimization Tests', () => {
  const siteUrl = seoConfig.siteUrl;

  describe('1. Next.js Metadata Construction Engine', () => {
    it('outputs valid metadataBase, canonicals, and bidirectional hreflang alternates', () => {
      const metadata = constructMetadata();

      expect(metadata.metadataBase).toEqual(new URL(siteUrl));
      expect(metadata.alternates?.canonical).toBe(siteUrl);

      // Verify hreflang alternates: x-default + English target locales
      const languages = metadata.alternates?.languages as Record<string, string>;
      expect(languages).toBeDefined();
      expect(languages['x-default']).toBe(siteUrl);
      expect(languages['en']).toBe(siteUrl);
      expect(languages['en-US']).toBe(siteUrl);
      expect(languages['en-GB']).toBe(siteUrl);
      expect(languages['en-AE']).toBe(siteUrl);
      expect(languages['en-CA']).toBe(siteUrl);
      expect(languages['en-AU']).toBe(siteUrl);
    });

    it('outputs compliant OpenGraph and Twitter cards with high-res cover art', () => {
      const metadata = constructMetadata();

      const og = metadata.openGraph as Record<string, unknown>;
      expect(og?.type).toBe('website');
      expect(og?.siteName).toBe('BRANDMANIA');
      expect(og?.locale).toBe('en_US');
      expect(og?.images).toEqual([
        {
          url: '/brand/textures/brandmania-cover-clean.jpg',
          width: 1200,
          height: 630,
          alt: 'BRANDMANIA — Branded for the best',
        },
      ]);

      const tw = metadata.twitter as Record<string, unknown>;
      expect(tw?.card).toBe('summary_large_image');
      expect(tw?.images).toEqual([
        '/brand/textures/brandmania-cover-clean.jpg',
      ]);
    });

    it('outputs production robots directives including Googlebot max settings', () => {
      const metadata = constructMetadata();

      expect(metadata.robots).toEqual({
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      });
    });

    it('does not emit geo tags when unconfigured, preventing fake coordinates', () => {
      const metadata = constructMetadata();
      // seoConfig.geo is null by default
      expect(metadata.other).toBeUndefined();
    });
  });

  describe('2. AI Search Crawler Directives (robots.ts)', () => {
    it('explicitly allows all AI search & citation bots and links sitemap', () => {
      const robotsData = robots();

      expect(robotsData.sitemap).toBe(`${siteUrl}/sitemap.xml`);
      expect(Array.isArray(robotsData.rules)).toBe(true);

      const rules = Array.isArray(robotsData.rules) ? robotsData.rules : [robotsData.rules];
      const userAgents = rules.map((r) => r.userAgent);

      // Must allow both traditional and AI citation crawlers
      expect(userAgents).toContain('*');
      expect(userAgents).toContain('Googlebot');
      expect(userAgents).toContain('Bingbot');
      expect(userAgents).toContain('OAI-SearchBot');
      expect(userAgents).toContain('ChatGPT-User');
      expect(userAgents).toContain('GPTBot');
      expect(userAgents).toContain('ClaudeBot');
      expect(userAgents).toContain('Claude-Web');
      expect(userAgents).toContain('PerplexityBot');
      expect(userAgents).toContain('Google-Extended');
      expect(userAgents).toContain('Applebot-Extended');

      // Verify each rule allows / and disallows /api/ and /dev/
      for (const rule of rules) {
        expect(rule.allow).toBe('/');
        expect(rule.disallow).toEqual(['/api/', '/dev/']);
      }
    });
  });

  describe('3. Dynamic Sitemap with Hreflang Alternates (sitemap.ts)', () => {
    it('generates dynamic sitemap with canonicals, hreflang, and AI dossiers', () => {
      const sitemapEntries = sitemap();

      expect(sitemapEntries.length).toBeGreaterThan(10);
      const urls = sitemapEntries.map((e) => e.url);

      // Primary routes
      expect(urls).toContain(siteUrl);
      expect(urls).toContain(`${siteUrl}/services`);
      expect(urls).toContain(`${siteUrl}/services/brand-direction`);
      expect(urls).toContain(`${siteUrl}/services/margin-recovery`);
      expect(urls).toContain(`${siteUrl}/services/consumer-scope`);
      expect(urls).toContain(`${siteUrl}/work`);

      // Native AI endpoints
      expect(urls).toContain(`${siteUrl}/llms.txt`);
      expect(urls).toContain(`${siteUrl}/llms-full.txt`);

      // Hreflang alternates on entries
      const homeEntry = sitemapEntries.find((e) => e.url === siteUrl);
      expect(homeEntry?.alternates?.languages?.['x-default']).toBe(siteUrl);
      expect(homeEntry?.alternates?.languages?.['en']).toBe(siteUrl);
      expect(homeEntry?.alternates?.languages?.['en-GB']).toBe(siteUrl);
    });
  });

  describe('4. Native AI Dossiers (/llms.txt & /llms-full.txt)', () => {
    it('/llms.txt returns valid Markdown index with Content-Type header and verified facts', async () => {
      const response = await getLlmsTxt();

      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');

      const text = await response.text();
      expect(text).toContain('# BRANDMANIA');
      expect(text).toContain('Branded for the best');
      expect(text).toContain("Let's make you a market leader");
      expect(text).toContain('$700,000+ annual revenue');
      expect(text).toContain('Brand Direction');
      expect(text).toContain('Margin Recovery');
      expect(text).toContain('Consumer Scope');
      expect(text).toContain(`${siteUrl}/llms-full.txt`);

      // Ensure no standalone ARR acronym used for annual revenue
      expect(text).not.toMatch(/\bARR\b/);
    });

    it('/llms-full.txt returns comprehensive machine-readable dossier with all 20 industries and 11 capabilities', async () => {
      const response = await getLlmsFullTxt();

      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');

      const text = await response.text();
      expect(text).toContain('Complete Machine-Readable Entity Dossier');

      // The 3 Flagships
      expect(text).toContain('Flagship I: Brand Direction');
      expect(text).toContain('Flagship II: Margin Recovery');
      expect(text).toContain('Flagship III: Consumer Scope');

      // The 11 Capabilities
      expect(text).toContain('Digital Marketing');
      expect(text).toContain('Growth Marketing');
      expect(text).toContain('Performance Marketing');
      expect(text).toContain('Content Creation');
      expect(text).toContain('Performance Content Creation');
      expect(text).toContain('Finance & Operations');
      expect(text).toContain('Strategic Management');
      expect(text).toContain('Team Management');
      expect(text).toContain('Project Management');
      expect(text).toContain('AI Automation');
      expect(text).toContain('AI Connected Systems');

      // The 20 Industries
      expect(text).toContain('Designers');
      expect(text).toContain('Jewelry & Gemstones');
      expect(text).toContain('Interior Design');
      expect(text).toContain('Outdoor Luxury Construction');
      expect(text).toContain('Hotels & Resorts');
      expect(text).toContain('Gyms');
      expect(text).toContain('Supplement Stores');
      expect(text).toContain('Sports & Fitness Wear');
      expect(text).toContain('Organic Herbs & Alternative Medicine');
      expect(text).toContain('Software & Mobile Apps');
      expect(text).toContain('Cosmetics & Skincare/Haircare');
      expect(text).toContain('E-Commerce');
      expect(text).toContain('Healthcare Nutrition & Weight Loss');
      expect(text).toContain('Perfumes');
      expect(text).toContain("Women's Clothing & Apparel");
      expect(text).toContain('Accessories');
      expect(text).toContain('Electronics');
      expect(text).toContain('Coffee');
      expect(text).toContain('B2B Medical Devices');
      expect(text).toContain('Furniture');

      // 2 Engagement Models
      expect(text).toContain('Full Strategic Rebuild & Performance Engagement');
      expect(text).toContain('Strategic Consultancy');

      // Verified threshold (no standalone ARR acronym)
      expect(text).toContain('$700,000+ annual revenue');
      expect(text).not.toMatch(/\bARR\b/);
    });
  });
});


### FILE: E:\Ibrahim's website\src\presentation\analytics\analytics.port.ts

/**
 * Analytics Port & Telemetry Contracts
 *
 * Provides a vendor-agnostic abstraction for event tracking.
 * Strictly enforces consent gating prior to initializing third-party telemetry.
 */

export type ConsentState = 'PENDING' | 'GRANTED' | 'DENIED';

export type AnalyticsEventType =
  | 'page_view'
  | 'cta_click'
  | 'vsl_start'
  | 'vsl_progress'
  | 'vsl_complete'
  | 'form_start'
  | 'form_submit'
  | 'qualification_step_completed'
  | 'consultation_submitted'
  | 'booking_initiated'
  | 'booking_completed'
  | 'outbound_contact_click';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  payload?: Record<string, unknown>;
  timestamp?: string;
}

export interface IAnalyticsTracker {
  track(event: AnalyticsEvent): void;
  setConsent(state: ConsentState): void;
  getConsent(): ConsentState;
}


### FILE: E:\Ibrahim's website\src\presentation\analytics\analytics.service.ts

'use client';

import { IAnalyticsTracker, AnalyticsEvent, ConsentState } from './analytics.port';

const CONSENT_STORAGE_KEY = 'brandmania_cookie_consent';

export class AnalyticsService implements IAnalyticsTracker {
  private consent: ConsentState = 'PENDING';

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentState | null;
      if (stored === 'GRANTED' || stored === 'DENIED') {
        this.consent = stored;
      }
    }
  }

  public setConsent(state: ConsentState): void {
    this.consent = state;
    if (typeof window !== 'undefined') {
      localStorage.setItem(CONSENT_STORAGE_KEY, state);
    }
  }

  public getConsent(): ConsentState {
    return this.consent;
  }

  public track(event: AnalyticsEvent): void {
    // Strictly gate non-essential analytics tracking if consent is not granted
    if (this.consent !== 'GRANTED') {
      return;
    }

    const eventWithTimestamp = {
      ...event,
      timestamp: event.timestamp || new Date().toISOString(),
    };

    // Development & testing console observer
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(`[ANALYTICS] [${eventWithTimestamp.type}]`, eventWithTimestamp.payload);
    }

    // Adaptable integration point: dispatch to window.dataLayer, Meta Pixel, or custom endpoint
    if (typeof window !== 'undefined') {
      const win = window as any;
      if (win.dataLayer && Array.isArray(win.dataLayer)) {
        win.dataLayer.push({
          event: eventWithTimestamp.type,
          ...eventWithTimestamp.payload,
        });
      }
    }
  }
}

export const analytics = new AnalyticsService();


### FILE: E:\Ibrahim's website\src\presentation\components\analytics\AnalyticsProvider.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { COOKIE_CONSENT_KEY } from '../compliance/CookieConsentBanner';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored === 'GRANTED') {
        setHasConsent(true);
      }
    } catch {
      // Graceful fallback
    }

    const handleConsentEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ consent: string }>;
      if (customEvent.detail?.consent === 'GRANTED') {
        setHasConsent(true);
      } else {
        setHasConsent(false);
      }
    };

    window.addEventListener('brandmania_consent_changed', handleConsentEvent);
    return () => {
      window.removeEventListener('brandmania_consent_changed', handleConsentEvent);
    };
  }, []);

  return (
    <>
      {hasConsent && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      )}
      {children}
    </>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\animations\BlurText.tsx

'use client';

import React, { useEffect, useRef, useState } from 'react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

/**
 * BlurText - React Bits Adapted Staggered Focus Text Reveal
 * Letters/words transition smoothly from optical blur into crisp focus.
 * Respects prefers-reduced-motion by rendering immediately in full focus.
 */
export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 35,
  className = '',
  style = {},
  as: Component = 'h1',
}) => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Immediate render under reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  const ComponentTag = Component as any;

  return (
    <ComponentTag
      ref={containerRef}
      className={className}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        ...style,
      }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{
            display: 'inline-block',
            marginRight: '0.28em',
            whiteSpace: 'nowrap',
          }}
        >
          {word.split('').map((char, charIndex) => {
            const index = wordIndex * 6 + charIndex;
            return (
              <span
                key={charIndex}
                style={{
                  display: 'inline-block',
                  opacity: inView ? 1 : 0,
                  filter: inView ? 'blur(0px)' : 'blur(10px)',
                  transform: inView ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms, filter 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * delay}ms`,
                  willChange: 'filter, opacity, transform',
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </ComponentTag>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\animations\CountUp.tsx

'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * CountUp - React Bits Adapted Smooth Numeric Counter
 * Eases numbers upward smoothly via requestAnimationFrame.
 * Exclusively used for verified figures. Renders target number immediately under reduced-motion.
 */
export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 1.8,
  separator = ',',
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  style = {},
}) => {
  const [value, setValue] = useState(from);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    // Instant render under reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = performance.now();
          const durationMs = duration * 1000;

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // Ease-out cubic curve
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = from + (to - from) * easedProgress;

            setValue(currentVal);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setValue(to);
            }
          };

          window.requestAnimationFrame(step);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [to, from, duration]);

  const formattedNumber = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const displayString = separator
    ? formattedNumber
    : formattedNumber.replace(/,/g, '');

  return (
    <span ref={elementRef} className={className} style={style}>
      {prefix}
      {displayString}
      {suffix}
    </span>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\animations\Magnet.tsx

'use client';

import React, { useState, useEffect, useRef, type ReactNode } from 'react';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Magnet - React Bits Adapted Spring-Physics Attraction Wrapper
 * Gently pulls key conversion actions toward cursor proximity.
 * Disabled on touch/mobile devices and reduced-motion mode.
 */
export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 40,
  disabled = false,
  magnetStrength = 3.5,
  className = '',
  style = {},
}) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState<boolean>(false);
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices and reduced-motion preference
    if (
      disabled ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return;

      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true);
        const offsetX = (e.clientX - centerX) / magnetStrength;
        const offsetY = (e.clientY - centerY) / magnetStrength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        if (isActive) {
          setIsActive(false);
          setPosition({ x: 0, y: 0 });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, disabled, magnetStrength, isActive]);

  return (
    <div
      ref={magnetRef}
      className={className}
      style={{
        display: 'inline-block',
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive
          ? 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
          : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isActive ? 'transform' : 'auto',
        ...style,
      }}
    >
      {children}
    </div>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\animations\NoiseOverlay.tsx

'use client';

import React, { useRef, useEffect } from 'react';

interface NoiseOverlayProps {
  patternAlpha?: number;
  patternRefreshInterval?: number;
}

/**
 * NoiseOverlay - React Bits Adapted Tactile Film Grain Canvas
 * Imparts an authentic physical paper/editorial texture over the obsidian void.
 * Fixed, pointer-events: none, zero impact on interaction.
 */
export const NoiseOverlay: React.FC<NoiseOverlayProps> = ({
  patternAlpha = 11,
  patternRefreshInterval = 3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Disable active canvas animation under reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId: number;
    const canvasSize = 512;

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;
      const len = data.length;

      for (let i = 0; i < len; i += 4) {
        const val = (Math.random() * 255) | 0;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = patternAlpha;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      frame++;
      if (frame % patternRefreshInterval === 0) {
        drawGrain();
      }
      animationId = window.requestAnimationFrame(loop);
    };

    drawGrain();
    animationId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [patternAlpha, patternRefreshInterval]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999,
        opacity: 0.025,
      }}
    />
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\animations\SpotlightCard.module.css

.spotlightCard {
  position: relative;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border-subtle);
  background-color: var(--color-bg-surface);
  overflow: hidden;
  transition: border-color var(--transition-base), transform var(--transition-base);
  --mouse-x: 50%;
  --mouse-y: 50%;
  --spotlight-color: rgba(142, 0, 250, 0.14);
}

.spotlightCard:hover {
  border-color: var(--color-border-active);
  transform: translateY(-2px);
}

.spotlightGlow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    400px circle at var(--mouse-x) var(--mouse-y),
    var(--spotlight-color),
    transparent 80%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 1;
}

.spotlightCard:hover .spotlightGlow,
.spotlightCard:focus-within .spotlightGlow {
  opacity: 1;
}

.cardContent {
  position: relative;
  z-index: 2;
  height: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .spotlightCard:hover {
    transform: none !important;
  }
  .spotlightGlow {
    display: none !important;
  }
}


### FILE: E:\Ibrahim's website\src\presentation\components\animations\SpotlightCard.tsx

'use client';

import React, { useRef } from 'react';
import styles from './SpotlightCard.module.css';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  spotlightColor?: string;
}

/**
 * SpotlightCard - React Bits Adapted Radial Spotlight Container
 * Renders a subtle radial specular glow following the cursor position across deep obsidian surfaces.
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  style = {},
  spotlightColor = 'rgba(142, 0, 250, 0.14)',
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`${styles.spotlightCard} ${className}`}
      style={style}
      {...props}
    >
      <div className={styles.spotlightGlow} aria-hidden="true" />
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\brand\CornerArcs.module.css

.cornerArcsContainer {
  position: absolute;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.topLeft {
  top: 0;
  left: 0;
}

.topRight {
  top: 0;
  right: 0;
  transform: scaleX(-1);
}

.bottomLeft {
  bottom: 0;
  left: 0;
  transform: scaleY(-1);
}

.bottomRight {
  bottom: 0;
  right: 0;
  transform: scale(-1, -1);
}

.arcSvg {
  display: block;
}


### FILE: E:\Ibrahim's website\src\presentation\components\brand\CornerArcs.tsx

import React from 'react';
import styles from './CornerArcs.module.css';

export interface CornerArcsProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  className?: string;
}

export function CornerArcs({
  position = 'top-left',
  size = 200,
  color = '#FFFFFF',
  opacity = 0.25,
  strokeWidth = 14,
  className = '',
}: CornerArcsProps) {
  const positionClass =
    position === 'top-left'
      ? styles.topLeft
      : position === 'top-right'
      ? styles.topRight
      : position === 'bottom-left'
      ? styles.bottomLeft
      : styles.bottomRight;

  return (
    <div
      className={`${styles.cornerArcsContainer} ${positionClass} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.arcSvg}
      >
        {/* Triple concentric radar arcs curving inward from the corner origin (0, 0) */}
        <path
          d="M 60 0 A 60 60 0 0 1 0 60"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={opacity}
          fill="none"
        />
        <path
          d="M 120 0 A 120 120 0 0 1 0 120"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={opacity}
          fill="none"
        />
        <path
          d="M 180 0 A 180 180 0 0 1 0 180"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={opacity}
          fill="none"
        />
      </svg>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\compliance\CookieConsentBanner.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { analytics } from '@/presentation/analytics/analytics.service';
import { LEGAL_CONTENT } from '@/content/legal';

export const COOKIE_CONSENT_KEY = 'brandmania_cookie_consent';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!stored) {
        setIsVisible(true);
      }
    } catch {
      // Gracefully handle storage disabled environments
    }
  }, []);

  const handleAcceptAnalytics = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'GRANTED');
    } catch {
      // Graceful fallback
    }
    analytics.setConsent('GRANTED');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('brandmania_consent_changed', { detail: { consent: 'GRANTED' } })
      );
    }
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'DENIED');
    } catch {
      // Graceful fallback
    }
    analytics.setConsent('DENIED');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('brandmania_consent_changed', { detail: { consent: 'DENIED' } })
      );
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie and Privacy Consent"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(7, 7, 9, 0.95)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        padding: 'clamp(1rem, 2vw, 1.25rem) clamp(1.5rem, 3vw, 4rem)',
        boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.6)',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
        }}
      >
        {/* Editorial Information */}
        <div style={{ maxWidth: '820px' }}>
          <div
            style={{
              fontFamily: 'var(--font-Mono)',
              fontSize: '0.7rem',
              color: '#C882FF',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
            }}
          >
            {LEGAL_CONTENT.cookieConsent.bannerTitle}
          </div>
          <p
            style={{
              fontSize: '0.875rem',
              color: '#EAE6F0',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {LEGAL_CONTENT.cookieConsent.bannerText}{' '}
            <Link
              href="/privacy"
              style={{
                color: '#C882FF',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                fontWeight: 500,
              }}
            >
              Privacy Policy ↗
            </Link>
          </p>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={handleAcceptAnalytics}
            style={{
              minHeight: '44px',
              padding: '0.65rem 1.4rem',
              backgroundColor: '#8E00FA',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          >
            {LEGAL_CONTENT.cookieConsent.acceptAllLabel}
          </button>

          <button
            type="button"
            onClick={handleEssentialOnly}
            style={{
              minHeight: '44px',
              padding: '0.65rem 1.4rem',
              backgroundColor: 'transparent',
              color: '#A8A0B8',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {LEGAL_CONTENT.cookieConsent.essentialOnlyLabel}
          </button>
        </div>
      </div>
    </aside>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\feedback\CookieConsent.module.css

.banner {
  position: fixed;
  bottom: max(var(--space-6), env(safe-area-inset-bottom, 1.5rem));
  right: max(var(--space-6), env(safe-area-inset-right, 1.5rem));
  left: max(var(--space-6), env(safe-area-inset-left, 1.5rem));
  max-width: 520px;
  margin-left: auto;
  background: rgba(14, 14, 19, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--color-border-active);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(121, 40, 202, 0.2);
  z-index: var(--z-toast);
  animation: slideUp var(--transition-base) ease-out;
}

.title {
  font-family: var(--font-serif), Georgia, serif;
  font-size: var(--font-size-base);
  font-weight: 400;
  color: #fff;
  margin-bottom: var(--space-2);
}

.text {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
  margin-bottom: var(--space-4);
}

.buttonRow {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


### FILE: E:\Ibrahim's website\src\presentation\components\feedback\CookieConsent.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../primitives/Button';
import { analytics } from '@/presentation/analytics/analytics.service';
import { LEGAL_CONTENT } from '@/content/legal';
import styles from './CookieConsent.module.css';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if consent has not yet been resolved
    if (analytics.getConsent() === 'PENDING') {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    analytics.setConsent('GRANTED');
    setIsVisible(false);
    analytics.track({ type: 'cta_click', payload: { action: 'cookie_consent_accepted' } });
  };

  const handleEssentialOnly = () => {
    analytics.setConsent('DENIED');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.banner} role="region" aria-label="Cookie Consent Banner">
      <h4 className={styles.title}>{LEGAL_CONTENT.cookieConsent.bannerTitle}</h4>
      <p className={styles.text}>{LEGAL_CONTENT.cookieConsent.bannerText}</p>
      <div className={styles.buttonRow}>
        <Button variant="primary" size="sm" onClick={handleAcceptAll}>
          {LEGAL_CONTENT.cookieConsent.acceptAllLabel}
        </Button>
        <Button variant="outline" size="sm" onClick={handleEssentialOnly}>
          {LEGAL_CONTENT.cookieConsent.essentialOnlyLabel}
        </Button>
      </div>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\feedback\EmptyState.module.css

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-12) var(--space-6);
  border: 1px dashed var(--color-border-default);
  border-radius: var(--radius-lg);
  background-color: rgba(16, 18, 21, 0.4);
}

.icon {
  font-size: 2.5rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

.title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  max-width: 420px;
  margin-bottom: var(--space-6);
  line-height: var(--line-height-normal);
}

.action {
  display: flex;
  gap: var(--space-3);
}


### FILE: E:\Ibrahim's website\src\presentation\components\feedback\EmptyState.tsx

import React, { ReactNode } from 'react';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\feedback\ErrorBoundary.tsx

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert } from '../primitives/Alert';
import { Button } from '../primitives/Button';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 'var(--space-8)', maxWidth: '600px', margin: '0 auto' }}>
          <Alert
            variant="error"
            title={this.props.fallbackTitle || 'A component error occurred'}
          >
            <p style={{ marginBottom: 'var(--space-4)' }}>
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            <Button variant="secondary" size="sm" onClick={this.handleReset}>
              Try Again
            </Button>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}


### FILE: E:\Ibrahim's website\src\presentation\components\feedback\Skeleton.tsx

import React, { HTMLAttributes } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
}

export function Skeleton({
  width = '100%',
  height = '20px',
  borderRadius = 'var(--radius-md)',
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: 'var(--color-bg-elevated)',
        backgroundImage: 'linear-gradient(90deg, var(--color-bg-elevated) 0%, #252932 50%, var(--color-bg-elevated) 100%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-shimmer 1.5s infinite',
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: '2px solid var(--color-border-default)',
        borderTopColor: 'var(--color-accent-gold)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
      role="status"
      aria-label="Loading..."
    />
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\forms\QualificationForm.module.css

.formArchitectural {
  width: 100%;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
}

.stepIndicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: var(--space-4);
}

.stepPill {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-family-mono);
  font-size: 11px;
  color: var(--color-text-muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: transparent;
  border: none;
  cursor: default;
}

.activeStepPill {
  color: var(--color-brand-light-violet);
  font-weight: 700;
}

.stepNumber {
  width: 22px;
  height: 22px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 10px;
}

.activeStepPill .stepNumber {
  background: rgba(142, 0, 250, 0.25);
  border-color: var(--color-brand-light-violet);
  color: #fff;
}

.stepContainer {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
}

@media (max-width: 640px) {
  .grid2 {
    grid-template-columns: 1fr;
  }
}

.fieldGroup {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.fieldLabel {
  font-family: var(--font-family-mono);
  font-size: 11px;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.selectInput {
  width: 100%;
  height: 46px;
  padding: 0 var(--space-3);
  font-size: var(--font-size-sm);
  color: #ffffff;
  background-color: #0b0b10;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  transition: border-color var(--transition-fast);
}

.selectInput:focus {
  outline: none;
  border-color: var(--color-brand-light-violet);
}

.textareaInput {
  width: 100%;
  min-height: 90px;
  padding: var(--space-3);
  font-size: var(--font-size-sm);
  color: #ffffff;
  background-color: #0b0b10;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  resize: vertical;
  font-family: inherit;
  transition: border-color var(--transition-fast);
}

.textareaInput:focus {
  outline: none;
  border-color: var(--color-brand-light-violet);
}

.trackSelector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-2);
}

@media (max-width: 640px) {
  .trackSelector {
    grid-template-columns: 1fr;
  }
}

.trackButton {
  padding: var(--space-4);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.trackButtonActive {
  background: rgba(142, 0, 250, 0.15);
  border-color: var(--color-brand-light-violet);
}

.trackTitle {
  font-family: var(--font-serif), Georgia, serif;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
}

.trackDesc {
  font-size: 11px;
  color: var(--color-text-secondary);
  line-height: 1.45;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-4);
  margin-top: var(--space-6);
  padding-top: var(--space-6);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}


### FILE: E:\Ibrahim's website\src\presentation\components\forms\QualificationForm.tsx

'use client';

import React, { useState, useRef, useEffect, useCallback, useOptimistic, useTransition } from 'react';
import { Input } from '../primitives/Input';
import { Button } from '../primitives/Button';
import { Alert } from '../primitives/Alert';
import { BookingModal } from '../modals/BookingModal';
import { UndoToast } from '../primitives/UndoToast';
import {
  ENGAGEMENT_TRACKS,
  REVENUE_TIERS,
  PRIMARY_INDUSTRIES,
  CORE_CHALLENGES,
} from '@/content/qualification';
import { normalizeWebsiteUrl } from '@/domain/validation/inquiry.schema';
import { analytics } from '@/presentation/analytics/analytics.service';
import { runViewTransition } from '@/presentation/utils/viewTransition';
import styles from './QualificationForm.module.css';

interface FormSnapshot {
  engagementTrack: string;
  coreChallenge: string;
  companyName: string;
  website: string;
  country: string;
  industry: string;
  revenueTier: string;
  clientName: string;
  roleTitle: string;
  email: string;
  phone: string;
  message: string;
}

export function QualificationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [, startTransition] = useTransition();

  // #2 React 19 Optimistic Updates for Instant Step Transition (<16ms)
  const [optimisticStep, setOptimisticStep] = useOptimistic(
    currentStep,
    (_, next: number) => next
  );

  // #19 Idempotency Key (Per-Session/Attempt Unique UUID)
  const idempotencyKeyRef = useRef<string>(
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `idemp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  );

  // Time-lock anti-spam defense: record mount timestamp
  const formMountedAt = useRef(Date.now());
  useEffect(() => {
    formMountedAt.current = Date.now();
  }, []);

  // Invisible honeypot anti-spam defense
  const [companyFaxNumber, setCompanyFaxNumber] = useState('');

  // Form State
  const [engagementTrack, setEngagementTrack] = useState(ENGAGEMENT_TRACKS[0].value);
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState('');
  const [industry, setIndustry] = useState(PRIMARY_INDUSTRIES[0].value);
  const [revenueTier, setRevenueTier] = useState(REVENUE_TIERS[1].value);

  // Step 2 State
  const [coreChallenge, setCoreChallenge] = useState(CORE_CHALLENGES[0].value);
  const [message, setMessage] = useState('');

  // Step 3 Decision-Maker State
  const [clientName, setClientName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationCode, setShowVerificationCode] = useState(false);

  // Validation & Accessibility Refs for Error Auto-Focus
  const companyNameRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const clientNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // #5 Undo Toast State & Snapshot History
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const prevSnapshotRef = useRef<FormSnapshot | null>(null);

  const captureSnapshot = useCallback((): FormSnapshot => {
    return {
      engagementTrack,
      coreChallenge,
      companyName,
      website,
      country,
      industry,
      revenueTier,
      clientName,
      roleTitle,
      email,
      phone,
      message,
    };
  }, [
    engagementTrack,
    coreChallenge,
    companyName,
    website,
    country,
    industry,
    revenueTier,
    clientName,
    roleTitle,
    email,
    phone,
    message,
  ]);

  const restoreSnapshot = useCallback((snapshot: FormSnapshot) => {
    setEngagementTrack(snapshot.engagementTrack);
    setCoreChallenge(snapshot.coreChallenge);
    setCompanyName(snapshot.companyName);
    setWebsite(snapshot.website);
    setCountry(snapshot.country);
    setIndustry(snapshot.industry);
    setRevenueTier(snapshot.revenueTier);
    setClientName(snapshot.clientName);
    setRoleTitle(snapshot.roleTitle);
    setEmail(snapshot.email);
    setPhone(snapshot.phone);
    setMessage(snapshot.message);
  }, []);

  // #6 Stale-While-Revalidate (sessionStorage form draft persistence & hydration)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = sessionStorage.getItem('brandmania_consultation_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.companyName) setCompanyName(parsed.companyName);
        if (parsed.website) setWebsite(parsed.website);
        if (parsed.country) setCountry(parsed.country);
        if (parsed.clientName) setClientName(parsed.clientName);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.roleTitle) setRoleTitle(parsed.roleTitle);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.message) setMessage(parsed.message);
        if (parsed.engagementTrack) setEngagementTrack(parsed.engagementTrack);
        if (parsed.coreChallenge) setCoreChallenge(parsed.coreChallenge);
      }
    } catch {
      // Ignore sessionStorage access errors in restricted contexts
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const draft = captureSnapshot();
      sessionStorage.setItem('brandmania_consultation_draft', JSON.stringify(draft));
    } catch {
      // Ignore storage quota
    }
  }, [captureSnapshot]);

  // #12 Predictive Back Gesture & History State Sync
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && typeof e.state.formStep === 'number') {
        runViewTransition(() => {
          setCurrentStep(e.state.formStep);
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [confirmedInquiryId, setConfirmedInquiryId] = useState<string | undefined>();
  const [bookingUrl, setBookingUrl] = useState('https://calendly.com/brandmania/executive-briefing');

  const mapRevenueTierToCompanyTier = (tier: string) => {
    switch (tier) {
      case 'TIER_5M_PLUS':
        return 'HAUTE_LUXURY';
      case 'TIER_1_5M_5M':
        return 'GLOBAL_ENTERPRISE';
      case 'TIER_700K_1_5M':
        return 'MID_MARKET';
      default:
        return 'EMERGING_ENTERPRISE';
    }
  };

  const mapChallengeToServices = (challenge: string): string[] => {
    switch (challenge) {
      case 'MARGIN_LEAKS':
        return ['MARGIN_RECOVERY', 'GROWTH_MARKETING'];
      case 'BRAND_PERCEPTION':
        return ['BRAND_DIRECTION', 'PERFORMANCE_CONTENT'];
      case 'CONSUMER_ATTACHMENT':
        return ['NEUROMARKETING', 'BRAND_DIRECTION'];
      default:
        return ['MARGIN_RECOVERY', 'BRAND_DIRECTION', 'NEUROMARKETING'];
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!companyName.trim() || companyName.trim().length < 2) {
      newErrors.companyName = 'Company or brand name must be at least 2 characters.';
    }

    if (website.trim()) {
      const normalized = normalizeWebsiteUrl(website);
      try {
        const parsed = new URL(normalized);
        if (!parsed.hostname.includes('.')) {
          newErrors.website = 'Please provide a valid website address (e.g. brand.com or https://brand.com).';
        }
      } catch {
        newErrors.website = 'Please provide a valid website address (e.g. brand.com or https://brand.com).';
      }
    }

    setErrors(newErrors);
    if (newErrors.companyName) {
      setFormError(newErrors.companyName);
      companyNameRef.current?.focus();
      return false;
    }
    if (newErrors.website) {
      setFormError(newErrors.website);
      websiteRef.current?.focus();
      return false;
    }

    setFormError(null);
    return true;
  };

  const validateStep2 = () => {
    setFormError(null);
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;

    const nextStep = Math.min(currentStep + 1, 3);

    analytics.track({
      type: 'qualification_step_completed',
      payload: { step: currentStep, action: `qualification_step_${currentStep}_completed` },
    });

    // Synchronize browser history for predictive back
    if (typeof window !== 'undefined') {
      window.history.pushState({ formStep: nextStep }, '');
    }

    runViewTransition(() => {
      startTransition(() => {
        setOptimisticStep(nextStep);
      });
      setCurrentStep(nextStep);
    });
  };

  const handleBack = () => {
    setFormError(null);
    setErrors({});
    const prevStep = Math.max(currentStep - 1, 1);

    if (typeof window !== 'undefined') {
      window.history.pushState({ formStep: prevStep }, '');
    }

    runViewTransition(() => {
      startTransition(() => {
        setOptimisticStep(prevStep);
      });
      setCurrentStep(prevStep);
    });
  };

  const handleTrackChange = (newTrack: string) => {
    if (newTrack !== engagementTrack) {
      prevSnapshotRef.current = captureSnapshot();
      setEngagementTrack(newTrack);
      setToastMessage('Engagement track updated.');
      setIsToastVisible(true);
    }
  };

  const handleChallengeChange = (newChallenge: string) => {
    if (newChallenge !== coreChallenge) {
      prevSnapshotRef.current = captureSnapshot();
      setCoreChallenge(newChallenge);
      setToastMessage('Diagnostic challenge focus updated.');
      setIsToastVisible(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!clientName.trim() || clientName.trim().length < 2) {
      newErrors.clientName = 'Please provide your full executive name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid corporate email address.';
    }

    setErrors(newErrors);

    if (newErrors.clientName) {
      setFormError(newErrors.clientName);
      clientNameRef.current?.focus();
      return;
    }
    if (newErrors.email) {
      setFormError(newErrors.email);
      emailRef.current?.focus();
      return;
    }

    const submissionDurationMs = Date.now() - formMountedAt.current;

    setIsSubmitting(true);
    setFormError(null);

    const normalizedWebsite = website.trim() ? normalizeWebsiteUrl(website) : undefined;

    const payload = {
      clientName: clientName.trim(),
      companyName: companyName.trim(),
      email: email.trim(),
      website: normalizedWebsite,
      companyTier: mapRevenueTierToCompanyTier(revenueTier),
      budgetRange: 'TIER_100K_250K',
      services: mapChallengeToServices(coreChallenge),
      message: `[Track: ${engagementTrack}] [Role: ${roleTitle.trim() || 'Executive'}] [Country: ${country.trim() || 'International'}] [Industry: ${industry}] [Phone: ${phone.trim() || 'N/A'}] — ${message.trim() || 'Initial strategic advisory consultation request.'}`,
      company_fax_number: companyFaxNumber,
      submissionDurationMs,
    };

    try {
      // #19 Attach Idempotency-Key header to deduplicate duplicate submissions
      const res = await fetch('/api/v1/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKeyRef.current,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error?.message || 'Inquiry submission was rejected by the server.');
      }

      // Clear draft after verified transmission
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('brandmania_consultation_draft');
      }

      const inquiryId = json.data?.inquiryId;
      setConfirmedInquiryId(inquiryId);

      analytics.track({
        type: 'consultation_submitted',
        payload: { action: 'consultation_submitted', inquiryId },
      });

      const params = new URLSearchParams({
        name: clientName,
        email: email,
        a1: companyName,
        ...(inquiryId ? { a2: inquiryId } : {}),
      });
      setBookingUrl(`https://calendly.com/brandmania/executive-briefing?${params.toString()}`);
      setIsBookingModalOpen(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Network error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.formArchitectural}>
        {/* Step Indicator with Tabular Numbers */}
        <div className={styles.stepIndicator} role="navigation" aria-label="Consultation form steps">
          <div className={`${styles.stepPill} ${optimisticStep === 1 ? styles.activeStepPill : ''}`}>
            <span className={`${styles.stepNumber} tabular-nums`}>01</span>
            <span>Profile &amp; Engagement Track</span>
          </div>
          <div className={`${styles.stepPill} ${optimisticStep === 2 ? styles.activeStepPill : ''}`}>
            <span className={`${styles.stepNumber} tabular-nums`}>02</span>
            <span>Diagnostic Focus</span>
          </div>
          <div className={`${styles.stepPill} ${optimisticStep === 3 ? styles.activeStepPill : ''}`}>
            <span className={`${styles.stepNumber} tabular-nums`}>03</span>
            <span>Executive Contact</span>
          </div>
        </div>

        {formError && (
          <Alert variant="error" title="Validation Notice" style={{ marginBottom: 'var(--space-6)' }}>
            {formError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Anti-Spam Layer 1: Invisible Honeypot (Off-Screen) */}
          <div
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0,
            }}
            aria-hidden="true"
          >
            <label htmlFor="company_fax_number">Company Fax Number (Leave Blank)</label>
            <input
              id="company_fax_number"
              name="company_fax_number"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={companyFaxNumber}
              onChange={(e) => setCompanyFaxNumber(e.target.value)}
            />
          </div>

          {/* STEP 1: Profile & Track */}
          {optimisticStep === 1 && (
            <div className={styles.stepContainer}>
              {/* Engagement Track Selection with Undo Toast Integration */}
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Select Preferred Engagement Track</label>
                <div className={styles.trackSelector} role="radiogroup" aria-label="Engagement Track">
                  {ENGAGEMENT_TRACKS.map((track) => {
                    const isSelected = engagementTrack === track.value;
                    return (
                      <button
                        key={track.value}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => handleTrackChange(track.value)}
                        className={`${styles.trackButton} ${isSelected ? styles.trackButtonActive : ''} hit-slop`}
                      >
                        <span className={styles.trackTitle}>{track.label}</span>
                        <span className={styles.trackDesc}>{track.sublabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.grid2}>
                <Input
                  ref={companyNameRef}
                  id="company-name"
                  label="Company / Brand Name *"
                  placeholder="e.g. Vance Luxury Group"
                  autoComplete="organization"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: '' }));
                  }}
                  error={errors.companyName}
                  required
                />
                <Input
                  ref={websiteRef}
                  id="website"
                  label="Website / Digital Presence"
                  placeholder="e.g. brand.com or https://brand.com"
                  type="url"
                  autoComplete="url"
                  value={website}
                  onChange={(e) => {
                    setWebsite(e.target.value);
                    if (errors.website) setErrors((prev) => ({ ...prev, website: '' }));
                  }}
                  error={errors.website}
                  helperText="Accepts brand.com or https://brand.com"
                />
              </div>

              <div className={styles.grid2}>
                <Input
                  id="country"
                  label="Primary Market / Country"
                  placeholder="e.g. United States, United Kingdom, UAE"
                  autoComplete="country-name"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />

                <div className={styles.fieldGroup}>
                  <label htmlFor="industry-select" className={styles.fieldLabel}>Commercial Industry</label>
                  <select
                    id="industry-select"
                    className={styles.selectInput}
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    {PRIMARY_INDUSTRIES.map((ind) => (
                      <option key={ind.value} value={ind.value}>
                        {ind.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="revenue-select" className={styles.fieldLabel}>Annual Commercial Revenue Band</label>
                <select
                  id="revenue-select"
                  className={styles.selectInput}
                  value={revenueTier}
                  onChange={(e) => setRevenueTier(e.target.value)}
                >
                  {REVENUE_TIERS.map((tier) => (
                    <option key={tier.value} value={tier.value}>
                      {tier.label} ({tier.sublabel})
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.actions}>
                <Button type="button" variant="primary" onClick={handleNext} className="hit-slop">
                  <span>Next: Diagnostic Focus &rarr;</span>
                  <kbd style={{ marginLeft: 6, fontSize: '9px', padding: '1px 3px' }}>↵</kbd>
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Diagnostic Focus */}
          {optimisticStep === 2 && (
            <div className={styles.stepContainer}>
              <div className={styles.fieldGroup}>
                <label htmlFor="challenge-select" className={styles.fieldLabel}>Primary Strategic Discipline Needed</label>
                <select
                  id="challenge-select"
                  className={styles.selectInput}
                  value={coreChallenge}
                  onChange={(e) => handleChallengeChange(e.target.value)}
                >
                  {CORE_CHALLENGES.map((ch) => (
                    <option key={ch.value} value={ch.value}>
                      {ch.label} — {ch.sublabel}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="strategic-context" className={styles.fieldLabel}>Current Commercial Context or Specific Bottleneck</label>
                <textarea
                  id="strategic-context"
                  className={styles.textareaInput}
                  placeholder="Briefly describe your current brand position, pricing resistance, or operational margin leakage..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className={styles.actions}>
                <Button type="button" variant="ghost" onClick={handleBack} className="hit-slop">
                  &larr; Back
                </Button>
                <Button type="button" variant="primary" onClick={handleNext} className="hit-slop">
                  <span>Next: Executive Details &rarr;</span>
                  <kbd style={{ marginLeft: 6, fontSize: '9px', padding: '1px 3px' }}>↵</kbd>
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Executive Coordinates & Autofill */}
          {optimisticStep === 3 && (
            <div className={styles.stepContainer}>
              <div className={styles.grid2}>
                <Input
                  ref={clientNameRef}
                  id="client-name"
                  label="Executive Full Name *"
                  placeholder="e.g. Alexander Vance"
                  autoComplete="name"
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    if (errors.clientName) setErrors((prev) => ({ ...prev, clientName: '' }));
                  }}
                  error={errors.clientName}
                  required
                />
                <Input
                  id="role-title"
                  label="Executive Role / Title"
                  placeholder="e.g. Founder, CEO, Managing Director"
                  autoComplete="organization-title"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                />
              </div>

              <div className={styles.grid2}>
                <Input
                  ref={emailRef}
                  id="client-email"
                  label="Direct Corporate Email *"
                  placeholder="e.g. a.vance@vancegroup.com"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  error={errors.email}
                  required
                />
                <Input
                  id="client-phone"
                  label="Direct Phone / Mobile (Optional)"
                  placeholder="e.g. +1 555 019 2834"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Optional Executive Verification Code Autofill (#15) */}
              <div style={{ marginTop: '0.25rem' }}>
                <button
                  type="button"
                  onClick={() => setShowVerificationCode((prev) => !prev)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono), monospace',
                    color: 'rgba(255, 255, 255, 0.45)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {showVerificationCode ? '− Hide priority VIP clearance code' : '+ Have a private invite or VIP clearance code?'}
                </button>

                {showVerificationCode && (
                  <div style={{ marginTop: '0.75rem', maxWidth: '320px' }}>
                    <Input
                      id="verification-code"
                      label="VIP Clearance Code"
                      placeholder="6-digit verification code"
                      autoComplete="one-time-code"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      helperText="Supports one-time SMS/email autofill"
                    />
                  </div>
                )}
              </div>

              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-mono), monospace',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: 'var(--space-3)',
                }}
              >
                Confidentiality Notice: All submitted details are handled under strict executive confidentiality.
              </div>

              <div className={styles.actions}>
                <Button type="button" variant="ghost" onClick={handleBack} disabled={isSubmitting} className="hit-slop">
                  &larr; Back
                </Button>
                <Button type="submit" variant="primary" disabled={isSubmitting} className="hit-slop">
                  {isSubmitting ? 'Transmitting Request...' : 'Submit Strategic Request \u2192'}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* #5 Executive Undo Toast */}
      <UndoToast
        isVisible={isToastVisible}
        message={toastMessage}
        onUndo={() => {
          if (prevSnapshotRef.current) {
            restoreSnapshot(prevSnapshotRef.current);
          }
        }}
        onDismiss={() => setIsToastVisible(false)}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        bookingUrl={bookingUrl}
        clientName={clientName}
        inquiryId={confirmedInquiryId}
      />
    </>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\layout\Container.tsx

import React, { HTMLAttributes } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export function Container({
  children,
  size = 'full',
  style,
  ...props
}: ContainerProps) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '100vw',
        padding: '0 clamp(1.5rem, 3vw, 4rem)',
        margin: '0 auto',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\layout\Footer.module.css

.footer {
  border-top: 1px solid var(--color-border-subtle);
  background-color: var(--color-bg-surface);
  padding: var(--space-16) 0 var(--space-8);
  margin-top: auto;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-10);
  margin-bottom: var(--space-12);
}

.brandCol {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 380px;
}

.brandTitle {
  font-family: var(--font-serif), Georgia, serif;
  font-size: var(--font-size-2xl);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
}

.brandManifesto {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.columnTitle {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent-purple-bright);
  margin-bottom: var(--space-4);
}

.linkList {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.link {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.link:hover {
  color: #fff;
}

.bottomBar {
  border-top: 1px solid var(--color-border-subtle);
  padding-top: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

@media (min-width: 768px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1025px) {
  .grid {
    grid-template-columns: 1.8fr repeat(4, 1fr);
  }
  .bottomBar {
    flex-direction: row;
  }
}


### FILE: E:\Ibrahim's website\src\presentation\components\layout\Header.module.css

.header {
  border-bottom: 1px solid var(--color-border-subtle);
  background-color: rgba(7, 7, 9, 0.82);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  transition: border-color var(--transition-base);
  padding-top: max(0px, env(safe-area-inset-top, 0px));
  padding-left: max(0px, env(safe-area-inset-left, 0px));
  padding-right: max(0px, env(safe-area-inset-right, 0px));
}

.indexTrigger {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.7);
  padding: 0.35rem 0.6rem;
  font-size: 11px;
  font-family: var(--font-mono), monospace;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.indexTrigger:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.25);
}

.inner {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brandLink {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  color: inherit;
}

.wordmark {
  font-family: var(--font-serif), Georgia, serif;
  font-size: var(--font-size-xl);
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #fff;
  line-height: 1;
  text-transform: uppercase;
}

.navDesktop {
  display: none;
  align-items: center;
  gap: var(--space-6);
}

.navLink {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.navLink:hover {
  color: #fff;
}

.headerActions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.mobileToggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  background: transparent;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  color: #fff;
  cursor: pointer;
}

/* Mobile Drawer */
.drawerOverlay {
  position: fixed;
  inset: 0;
  background-color: rgba(7, 7, 9, 0.85);
  backdrop-filter: blur(8px);
  z-index: var(--z-modal);
  display: flex;
  justify-content: flex-end;
}

.drawer {
  width: 85%;
  max-width: 360px;
  height: 100%;
  background-color: #0E0E13;
  border-left: 1px solid var(--color-border-default);
  box-shadow: -15px 0 45px rgba(0, 0, 0, 0.95);
  padding: var(--space-8) var(--space-6);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.drawerHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-8);
}

.drawerLinks {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.drawerLink {
  min-height: 44px;
  display: flex;
  align-items: center;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.drawerLink:hover {
  color: var(--color-accent-purple-bright);
}

@media (min-width: 992px) {
  .navDesktop {
    display: flex;
  }
  .mobileToggle {
    display: none;
  }
}


### FILE: E:\Ibrahim's website\src\presentation\components\layout\Header.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { BrandEye } from '../primitives/BrandEye';
import { Button } from '../primitives/Button';
import { CommandMenu } from '../navigation/CommandMenu';
import { SwipeableSheet } from '../primitives/SwipeableSheet';
import { MAIN_NAV_LINKS, FOOTER_SECTIONS } from '@/content/navigation';
import { BRAND } from '@/content/brand';
import headerStyles from './Header.module.css';
import footerStyles from './Footer.module.css';

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // #3 Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className={headerStyles.header}>
      <Container>
        <div className={headerStyles.inner}>
          {/* Brand Logo & Wordmark */}
          <Link href="/" className={`${headerStyles.brandLink} hit-slop`}>
            <BrandEye size="sm" />
            <span className={headerStyles.wordmark}>{BRAND.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={headerStyles.navDesktop} aria-label="Main Navigation">
            {MAIN_NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={`${headerStyles.navLink} hit-slop`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Header Action / CTA */}
          <div className={headerStyles.headerActions}>
            {/* #3 & #4 Index Command Trigger with Shortcut Hint */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className={`${headerStyles.indexTrigger} hit-slop`}
              aria-label="Open Command Menu Palette"
            >
              <span>Index</span>
              <kbd style={{ fontSize: '9px', padding: '1px 4px' }}>⌘K</kbd>
            </button>

            <Button
              variant="primary"
              size="sm"
              className="hit-slop"
              onClick={() => {
                const el = document.getElementById('qualification');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#qualification';
                }
              }}
            >
              Request Strategic Consultation
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`${headerStyles.mobileToggle} hit-slop`}
              onClick={() => setIsMobileOpen(true)}
              aria-label={isMobileOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* #3 Executive Command Menu Modal */}
      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />

      {/* #10 & #12 Spring-Physics Swipeable Mobile Sheet with Predictive Back */}
      <SwipeableSheet
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        title="Navigation Index"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <BrandEye size="sm" />
            <span className={headerStyles.wordmark}>{BRAND.name}</span>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {MAIN_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hit-slop"
                style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  textDecoration: 'none',
                  fontSize: '1.125rem',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMobileOpen(false);
                setIsCommandOpen(true);
              }}
              className="hit-slop"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '0.9375rem',
                marginTop: '0.5rem',
                cursor: 'pointer',
              }}
            >
              <span>Brandmania Command Palette</span>
              <kbd>⌘K</kbd>
            </button>
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1rem' }}>
            <Button
              variant="primary"
              size="md"
              style={{ width: '100%' }}
              onClick={() => {
                setIsMobileOpen(false);
                const el = document.getElementById('qualification');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.location.href = '/#qualification';
              }}
            >
              Request Strategic Consultation
            </Button>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', textAlign: 'center' }}>
              {BRAND.tagline}
            </span>
          </div>
        </div>
      </SwipeableSheet>
    </header>
  );
}

export function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <Container>
        <div className={footerStyles.grid}>
          {/* Brand Manifesto Column */}
          <div className={footerStyles.brandCol}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <BrandEye size="sm" />
              <span className={footerStyles.brandTitle}>{BRAND.name}</span>
            </div>
            <p className={footerStyles.brandManifesto}>
              {BRAND.tagline}. Strategic premium consultancy engineering Margin Recovery, Brand Direction, and Consumer Scope for ambitious market leaders.
            </p>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-purple-bright)', fontStyle: 'italic' }}>
              “{BRAND.internalPhilosophy}”
            </span>
          </div>

          {/* Directory Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className={footerStyles.columnTitle}>{section.title}</h4>
              <ul className={footerStyles.linkList}>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerStyles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal & Operational Bar */}
        <div className={footerStyles.bottomBar}>
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
            <Link href="/privacy" className={footerStyles.link}>Privacy Policy</Link>
            <Link href="/terms" className={footerStyles.link}>Terms & Conditions</Link>
            <Link href="/cookies" className={footerStyles.link}>Cookie Policy</Link>
          </div>
          <p style={{ color: 'var(--color-text-muted)' }}>
            {BRAND.mottos.primary}
          </p>
        </div>
      </Container>
    </footer>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\layout\Section.tsx

import React, { forwardRef, HTMLAttributes } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
}

const sectionPadding = {
  none: '0',
  sm: 'var(--space-8) 0',
  md: 'var(--space-16) 0',
  lg: 'var(--space-24) 0',
  xl: 'var(--space-32) 0',
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { children, spacing = 'md', style, ...props },
  ref
) {
  return (
    <section
      ref={ref}
      style={{
        width: '100%',
        padding: sectionPadding[spacing],
        position: 'relative',
        ...style,
      }}
      {...props}
    >
      {children}
    </section>
  );
});


### FILE: E:\Ibrahim's website\src\presentation\components\layout\SmoothScroll.tsx

'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScroll() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return null;
}


### FILE: E:\Ibrahim's website\src\presentation\components\modals\BookingModal.module.css

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(7, 7, 9, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  animation: fadeIn var(--transition-fast) ease-out;
}

.modal {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-active);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 600px;
  padding: var(--space-8);
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(121, 40, 202, 0.25);
  animation: scaleIn var(--transition-base) cubic-bezier(0.16, 1, 0.3, 1);
}

.closeButton {
  position: absolute;
  top: var(--space-5);
  right: var(--space-5);
  background: transparent;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-full);
  width: 36px;
  height: 36px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.closeButton:hover {
  border-color: var(--color-border-active);
  transform: scale(1.05);
}

.header {
  text-align: center;
  margin-bottom: var(--space-6);
}

.title {
  font-family: var(--font-serif), Georgia, serif;
  font-size: var(--font-size-2xl);
  font-weight: 400;
  color: #fff;
  margin-top: var(--space-2);
}

.subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-top: var(--space-2);
  line-height: var(--line-height-normal);
}

.content {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  text-align: center;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}


### FILE: E:\Ibrahim's website\src\presentation\components\modals\BookingModal.tsx

'use client';

import React, { useEffect, useCallback } from 'react';
import { BrandEye } from '../primitives/BrandEye';
import { Button } from '../primitives/Button';
import { Badge } from '../primitives/Badge';
import { CornerArcs } from '../brand/CornerArcs';
import styles from './BookingModal.module.css';

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingUrl: string;
  clientName?: string;
  inquiryId?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  bookingUrl,
  clientName,
  inquiryId,
}: BookingModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <CornerArcs position="top-left" size={100} opacity={0.2} color="#8E00FA" />
        <CornerArcs position="bottom-right" size={100} opacity={0.2} color="#8E00FA" />
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close Booking Dialog"
        >
          ✕
        </button>

        <div className={styles.header}>
          <BrandEye size="md" />
          <Badge variant="purple" size="sm" style={{ marginTop: 'var(--space-3)' }}>
            PRIORITY SCHEDULING
          </Badge>
          <h3 id="booking-modal-title" className={styles.title}>
            Reserve Your Strategic Consultation
          </h3>
          <p className={styles.subtitle}>
            {clientName ? `Welcome, ${clientName}. ` : ''}Your qualification submission has been verified. Choose your preferred executive briefing window below.
          </p>
        </div>

        <div className={styles.content}>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            CONFIDENTIAL SESSION DETAILS
          </div>

          <div style={{ fontSize: 'var(--font-size-sm)', color: '#fff', lineHeight: 'var(--line-height-normal)' }}>
            <strong>Session:</strong> Executive Diagnostic &amp; Margin Leakage Assessment<br />
            <strong>Duration:</strong> 30 Minutes • One-on-One with Strategic Leadership<br />
            {inquiryId && (
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-purple-bright)' }}>
                Reference Dossier ID: {inquiryId}
              </span>
            )}
          </div>

          <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button variant="primary" size="lg" style={{ width: '100%' }}>
                Open Executive Calendar ↗
              </Button>
            </a>

            <Button variant="ghost" size="sm" onClick={onClose}>
              Dismiss &amp; Complete Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\navigation\CommandMenu.tsx

'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MagnifyingGlass, ArrowElbowDownLeft, Sparkle, Compass } from '@phosphor-icons/react';

export interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrack?: (track: 'track-1' | 'track-2') => void;
}

interface CommandItem {
  id: string;
  index: string;
  label: string;
  category: 'Section' | 'Track' | 'Action';
  shortcut?: string;
  action: () => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  onSelectTrack,
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  }, []);

  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: 'hero',
        index: '01',
        label: 'Hero: The Perception Arbitrage',
        category: 'Section',
        action: () => scrollToId('hero'),
      },
      {
        id: 'manifesto',
        index: '02',
        label: 'Worldview Manifesto: Commercial Certainty',
        category: 'Section',
        action: () => scrollToId('manifesto'),
      },
      {
        id: 'dilemma',
        index: '03',
        label: 'Commercial Divide: Brand Equity vs Price Erosion',
        category: 'Section',
        action: () => scrollToId('dilemma'),
      },
      {
        id: 'system',
        index: '04',
        label: 'Integrated System: 6 Operational Disciplines',
        category: 'Section',
        action: () => scrollToId('system'),
      },
      {
        id: 'disciplines',
        index: '05',
        label: 'Brand Direction: Defensible Narrative & Visual Standard',
        category: 'Section',
        action: () => scrollToId('disciplines'),
      },
      {
        id: 'margin-recovery',
        index: '06',
        label: 'Margin Recovery: 6 Enterprise Audit Stages',
        category: 'Section',
        action: () => scrollToId('margin-recovery'),
      },
      {
        id: 'consumer-scope',
        index: '07',
        label: 'Consumer Scope: 7 Behavioral Dimensions',
        category: 'Section',
        action: () => scrollToId('consumer-scope'),
      },
      {
        id: 'work',
        index: '08',
        label: 'Selected Artifacts: Authentic Lookbook',
        category: 'Section',
        action: () => scrollToId('work'),
      },
      {
        id: 'capabilities',
        index: '09',
        label: 'Institutional Capabilities: 11 Supporting Disciplines',
        category: 'Section',
        action: () => scrollToId('capabilities'),
      },
      {
        id: 'qualification',
        index: '10',
        label: 'Strategic Consultation: Qualification Assessment',
        category: 'Section',
        action: () => scrollToId('qualification'),
      },
      {
        id: 'track-1',
        index: 'T1',
        label: 'Pre-select Track I: Full Strategic & Performance Engagement',
        category: 'Track',
        action: () => {
          if (onSelectTrack) onSelectTrack('track-1');
          scrollToId('qualification');
        },
      },
      {
        id: 'track-2',
        index: 'T2',
        label: 'Pre-select Track II: Strategic Consultancy & Advisory',
        category: 'Track',
        action: () => {
          if (onSelectTrack) onSelectTrack('track-2');
          scrollToId('qualification');
        },
      },
    ],
    [scrollToId, onSelectTrack]
  );

  const filteredCommands = useMemo(() => {
    if (!search.trim()) return commands;
    const q = search.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.index.toLowerCase().includes(q)
    );
  }, [commands, search]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation within menu
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? filteredCommands.length - 1 : prev - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected) {
          selected.action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [filteredCommands, selectedIndex, onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Quick-Jump Command Menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: 'clamp(3rem, 12vh, 8rem)',
            paddingInline: '1rem',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(7, 7, 9, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          />

          {/* Palette Dialog Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
            className="squircle-surface"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '640px',
              backgroundColor: '#070709',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.9), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
            onKeyDown={handleKeyDown}
          >
            {/* Input Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.25rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <MagnifyingGlass size={18} color="rgba(255, 255, 255, 0.4)" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Jump to section or engagement track..."
                aria-label="Command search"
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: '0.9375rem',
                  fontFamily: 'var(--font-sans), sans-serif',
                }}
              />
              <kbd style={{ fontSize: '10px' }}>ESC</kbd>
            </div>

            {/* List of Results */}
            <div
              style={{
                maxHeight: '340px',
                overflowY: 'auto',
                padding: '0.5rem',
              }}
              role="listbox"
            >
              {filteredCommands.length === 0 ? (
                <div
                  style={{
                    padding: '2rem 1rem',
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.875rem',
                  }}
                >
                  No matching index sections or tracks found.
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        cmd.action();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor: isSelected
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'transparent',
                        color: isSelected ? '#fff' : 'rgba(255, 255, 255, 0.75)',
                        transition: 'background 0.1s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span
                          className="font-mono tabular-nums"
                          style={{
                            fontSize: '11px',
                            color: isSelected ? 'var(--color-brand-neon-violet, #c882ff)' : 'rgba(255, 255, 255, 0.35)',
                            minWidth: '22px',
                          }}
                        >
                          {cmd.index}
                        </span>
                        {cmd.category === 'Track' ? (
                          <Sparkle size={15} color="#c882ff" />
                        ) : (
                          <Compass size={15} color="rgba(255, 255, 255, 0.45)" />
                        )}
                        <span style={{ fontSize: '0.875rem', fontWeight: isSelected ? 500 : 400 }}>
                          {cmd.label}
                        </span>
                      </div>

                      {isSelected && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)' }}>
                            Jump
                          </span>
                          <ArrowElbowDownLeft size={13} color="rgba(255, 255, 255, 0.6)" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                fontSize: '10px',
                color: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
                <span><kbd>↵</kbd> Select</span>
              </div>
              <span className="font-mono">BRANDMANIA INDEX PALETTE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\Alert.module.css

.alert {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 2px;
}

.content {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
}

.info {
  background-color: var(--color-status-info-bg);
  border-color: rgba(59, 130, 246, 0.3);
  color: #bfdbfe;
}
.info .title {
  color: #60a5fa;
}

.success {
  background-color: var(--color-status-success-bg);
  border-color: rgba(16, 185, 129, 0.3);
  color: #a7f3d0;
}
.success .title {
  color: #34d399;
}

.warning {
  background-color: var(--color-status-warning-bg);
  border-color: rgba(245, 158, 11, 0.3);
  color: #fde68a;
}
.warning .title {
  color: #fbbf24;
}

.error {
  background-color: var(--color-status-error-bg);
  border-color: rgba(239, 68, 68, 0.3);
  color: #fecaca;
}
.error .title {
  color: #f87171;
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\Alert.tsx

import React, { HTMLAttributes } from 'react';
import styles from './Alert.module.css';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
}

export function Alert({
  children,
  variant = 'info',
  title,
  className,
  ...props
}: AlertProps) {
  const classNames = [
    styles.alert,
    styles[variant],
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} role="alert" {...props}>
      {title && <h4 className={styles.title}>{title}</h4>}
      <div className={styles.content}>{children}</div>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\ArchitecturalSkeleton.tsx

import React from 'react';

interface ArchitecturalSkeletonProps {
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  className?: string;
  hasHairlines?: boolean;
}

export const ArchitecturalSkeleton: React.FC<ArchitecturalSkeletonProps> = ({
  width = '100%',
  height = '100%',
  style,
  className = '',
  hasHairlines = true,
}) => {
  return (
    <div
      className={`architectural-skeleton ${className}`}
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#070709',
        border: hasHairlines ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #070709 0%, #160029 50%, #070709 100%)',
          backgroundSize: '200% 100%',
          animation: 'architecturalShimmer 1.8s infinite ease-in-out',
        }}
      />
    </div>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\Badge.module.css

.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-radius: var(--radius-full);
  line-height: 1;
  border: 1px solid transparent;
}

.sm {
  font-size: 0.6875rem; /* 11px */
  padding: 3px 8px;
}

.md {
  font-size: var(--font-size-xs);
  padding: 4px 10px;
}

.purple {
  background-color: rgba(121, 40, 202, 0.16);
  color: #c084fc;
  border-color: rgba(168, 85, 247, 0.35);
}

.gold {
  background-color: var(--color-accent-gold-dim);
  color: var(--color-accent-gold-light);
  border-color: rgba(212, 175, 55, 0.3);
}

.success {
  background-color: var(--color-status-success-bg);
  color: var(--color-status-success);
  border-color: rgba(16, 185, 129, 0.3);
}

.warning {
  background-color: var(--color-status-warning-bg);
  color: var(--color-status-warning);
  border-color: rgba(245, 158, 11, 0.3);
}

.error {
  background-color: var(--color-status-error-bg);
  color: var(--color-status-error);
  border-color: rgba(239, 68, 68, 0.3);
}

.neutral {
  background-color: var(--color-bg-elevated);
  color: var(--color-text-secondary);
  border-color: var(--color-border-default);
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\Badge.tsx

import React, { HTMLAttributes } from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'purple' | 'gold' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'gold',
  size = 'md',
  className,
  ...props
}: BadgeProps) {
  const classNames = [
    styles.badge,
    styles[variant],
    styles[size],
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\BrandEye.module.css

.container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform var(--transition-base), filter var(--transition-base);
}

.glow {
  filter: drop-shadow(0 0 16px rgba(168, 85, 247, 0.45));
}

.container:hover {
  transform: scale(1.04);
  filter: drop-shadow(0 0 22px rgba(192, 132, 252, 0.6));
}

.sm {
  width: 24px;
  height: 24px;
}

.md {
  width: 36px;
  height: 36px;
}

.lg {
  width: 52px;
  height: 52px;
}

.xl {
  width: 80px;
  height: 80px;
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\BrandEye.tsx

import React from 'react';
import styles from './BrandEye.module.css';

export interface BrandEyeProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  className?: string;
  idSuffix?: string;
}

export function BrandEye({
  size = 'md',
  glow = true,
  className = '',
  idSuffix = 'eye',
}: BrandEyeProps) {
  const gradId = `brandEyeGrad_${idSuffix}`;

  const classNames = [
    styles.container,
    styles[size],
    glow ? styles.glow : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} aria-hidden="true">
      <svg
        viewBox="475 309 1050 1050"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="50%" stopColor="#8E00FA" />
            <stop offset="100%" stopColor="#5E00A8" />
          </linearGradient>
        </defs>

        <g fill={`url(#${gradId})`}>
          {/* Authentic Quadrant Arcs & Sclera Geometries */}
          <path d="M 1245.93 1359.47 L 1170.93 1359.47 C 1170.93 1311.82, 1180.27 1265.56, 1198.70 1222.00 C 1216.49 1179.95, 1241.95 1142.18, 1274.37 1109.76 C 1306.79 1077.34, 1344.55 1051.89, 1386.60 1034.10 C 1430.17 1015.67, 1476.42 1006.33, 1524.08 1006.33 L 1524.08 1081.33 C 1370.71 1081.33, 1245.93 1206.10, 1245.93 1359.47" />
          <path d="M 1419.85 1359.47 L 1344.85 1359.47 C 1344.85 1260.65, 1425.25 1180.25, 1524.08 1180.25 L 1524.08 1255.25 C 1466.61 1255.25, 1419.85 1302.00, 1419.85 1359.47" />
          <path d="M 1524.08 830.01 L 1524.08 905.01 C 1471.49 905.01, 1420.95 913.99, 1373.93 930.50 L 1373.92 930.51 C 1286.08 961.33, 1210.50 1018.43, 1156.63 1092.32 C 1101.92 1167.36, 1069.61 1259.71, 1069.61 1359.47 L 994.61 1359.47 C 994.61 1333.94, 996.40 1308.67, 999.96 1283.77 C 1006.36 1238.97, 1018.49 1195.34, 1036.24 1153.37 C 1040.84 1142.50, 1045.77 1131.83, 1051.05 1121.36 L 1051.06 1121.36 C 1067.34 1088.99, 1086.85 1058.52, 1109.41 1030.19 L 1109.42 1030.19 C 1184.13 1003.30, 1258.14 948.57, 1330.68 866.46 C 1370.72 850.72, 1412.22 840.04, 1454.74 834.49 C 1454.95 834.46, 1455.15 834.43, 1455.36 834.41 L 1455.38 834.41 C 1478.01 831.48, 1500.94 830.01, 1524.08 830.01" />
          <path d="M 828.99 1359.47 L 753.99 1359.47 C 753.99 1206.10, 629.22 1081.33, 475.85 1081.33 L 475.85 1006.33 C 523.51 1006.33, 569.76 1015.67, 613.32 1034.10 C 655.38 1051.89, 693.14 1077.34, 725.56 1109.76 C 757.98 1142.18, 783.44 1179.95, 801.23 1222.00 C 819.65 1265.56, 828.99 1311.82, 828.99 1359.47" />
          <path d="M 655.08 1359.47 L 580.08 1359.47 C 580.08 1302.00, 533.32 1255.25, 475.85 1255.25 L 475.85 1180.25 C 574.68 1180.25, 655.08 1260.65, 655.08 1359.47" />
          <path d="M 1005.31 1359.47 L 930.31 1359.47 C 930.31 1259.44, 897.82 1166.85, 842.83 1091.70 C 788.08 1016.84, 711.00 959.30, 621.48 928.94 C 575.74 913.43, 526.76 905.01, 475.85 905.01 L 475.85 830.01 L 475.93 830.01 C 499.07 830.01, 521.99 831.49, 544.62 834.42 C 545.22 834.49, 545.82 834.57, 546.41 834.65 C 586.87 840.02, 626.39 850.06, 664.62 864.67 C 712.42 919.12, 791.62 993.94, 889.89 1029.41 C 912.65 1057.86, 932.31 1088.48, 948.71 1121.03 C 954.06 1131.61, 959.05 1142.39, 963.69 1153.37 C 981.44 1195.34, 993.57 1238.97, 999.96 1283.77 C 1003.52 1308.67, 1005.31 1333.94, 1005.31 1359.47" />
          <path d="M 1524.15 662.49 C 1476.49 662.49, 1430.24 653.15, 1386.68 634.72 C 1344.62 616.93, 1306.86 591.48, 1274.44 559.06 C 1242.02 526.64, 1216.56 488.87, 1198.77 446.82 C 1180.35 403.26, 1171.01 357.01, 1171.01 309.35 L 1246.01 309.35 C 1246.01 462.72, 1370.78 587.49, 1524.15 587.49 Z" />
          <path d="M 1524.15 488.57 C 1425.32 488.57, 1344.92 408.17, 1344.92 309.35 L 1419.92 309.35 C 1419.92 366.82, 1466.68 413.57, 1524.15 413.57 Z" />
          <path d="M 1524.15 763.81 L 1524.15 838.81 L 1524.08 838.81 C 1500.94 838.81, 1478.01 837.34, 1455.38 834.41 C 1455.12 834.37, 1454.86 834.34, 1454.60 834.31 L 1454.60 834.30 C 1413.43 828.92, 1373.22 818.71, 1334.36 803.77 C 1259.94 718.78, 1183.94 662.61, 1107.22 635.78 C 1085.16 607.68, 1066.07 577.50, 1050.13 545.47 L 1050.12 545.47 C 1045.22 535.64, 1040.61 525.63, 1036.31 515.45 C 1018.56 473.48, 1006.43 429.85, 1000.04 385.05 C 996.48 360.15, 994.69 334.88, 994.69 309.35 L 1069.69 309.35 C 1069.69 407.78, 1101.15 499.01, 1154.54 573.50 L 1154.55 573.50 C 1209.25 649.84, 1287.00 708.60, 1377.53 739.54 C 1423.55 755.27, 1472.87 763.81, 1524.15 763.81" />
          <path d="M 475.93 662.49 L 475.93 587.49 C 629.29 587.49, 754.07 462.72, 754.07 309.35 L 829.07 309.35 C 829.07 357.01, 819.73 403.26, 801.30 446.82 C 783.51 488.87, 758.05 526.64, 725.63 559.06 C 693.21 591.48, 655.45 616.93, 613.40 634.72 C 569.83 653.15, 523.58 662.49, 475.93 662.49" />
          <path d="M 475.93 488.57 L 475.93 413.57 C 533.40 413.57, 580.15 366.82, 580.15 309.35 L 655.15 309.35 C 655.15 408.17, 574.75 488.57, 475.93 488.57" />
          <path d="M 1005.39 309.35 C 1005.39 334.88, 1003.60 360.15, 1000.04 385.05 C 993.64 429.85, 981.51 473.48, 963.76 515.45 C 959.37 525.83, 954.67 536.02, 949.66 546.04 C 933.46 578.47, 914.05 609.00, 891.58 637.39 L 891.57 637.39 C 791.61 673.21, 711.32 749.83, 663.61 804.58 C 625.76 818.94, 586.65 828.83, 546.62 834.15 C 545.96 834.24, 545.29 834.33, 544.62 834.42 L 544.60 834.42 C 521.98 837.34, 499.06 838.81, 475.93 838.81 L 475.93 763.81 C 526.42 763.81, 575.02 755.53, 620.43 740.26 L 620.44 740.25 C 711.24 709.73, 789.32 651.25, 844.38 575.09 L 844.39 575.09 C 898.48 500.31, 930.39 408.48, 930.39 309.35 Z" />
          <path d="M 1109.42 1030.19 L 1109.41 1030.19 C 1073.47 1043.13, 1037.37 1049.63, 1001.19 1049.63 C 1000.43 1049.63, 999.66 1049.62, 998.89 1049.62 C 960.59 1049.33, 924.09 1041.75, 889.89 1029.41 C 791.62 993.94, 712.42 919.12, 664.62 864.67 C 654.77 853.44, 646.25 843.07, 639.17 834.10 C 645.97 825.45, 654.15 815.45, 663.61 804.58 C 711.32 749.83, 791.61 673.21, 891.57 637.39 L 891.58 637.39 C 925.55 625.20, 961.79 617.74, 999.79 617.45 C 1000.56 617.44, 1001.32 617.44, 1002.09 617.44 C 1037.23 617.44, 1072.30 623.57, 1107.22 635.78 C 1183.94 662.61, 1259.94 718.78, 1334.36 803.77 C 1342.58 813.16, 1350.77 822.89, 1358.95 832.98 C 1349.55 844.60, 1340.13 855.76, 1330.68 866.46 C 1258.14 948.57, 1184.13 1003.30, 1109.42 1030.19 M 1454.74 834.49 L 1454.60 834.31 L 1454.60 834.30 L 1453.58 832.92 L 1495.12 776.54 L 1409.66 776.54 C 1399.01 763.68, 1388.30 751.34, 1377.53 739.54 C 1305.45 660.48, 1230.93 605.02, 1154.55 573.50 L 1154.54 573.50 C 1120.10 559.28, 1085.27 549.93, 1050.13 545.47 L 1050.12 545.47 C 1033.22 543.33, 1016.26 542.32, 999.22 542.45 C 982.68 542.58, 966.16 543.78, 949.66 546.04 C 914.40 550.87, 879.26 560.57, 844.39 575.09 L 844.38 575.09 C 806.63 590.79, 769.22 612.15, 732.30 639.07 C 687.80 671.51, 650.18 707.63, 620.44 740.25 L 620.43 740.26 C 608.78 753.04, 598.34 765.27, 589.17 776.54 L 510.05 776.54 L 546.60 834.13 C 546.60 834.14, 546.61 834.14, 546.62 834.15 C 546.62 834.17, 546.65 834.20, 546.67 834.24 L 546.41 834.65 L 510.95 890.53 L 588.28 890.53 C 597.95 902.42, 609.04 915.40, 621.48 928.94 C 650.91 961.00, 687.86 996.26, 731.40 1028.00 C 768.10 1054.76, 805.31 1076.02, 842.83 1091.70 C 877.90 1106.36, 913.24 1116.16, 948.71 1121.03 C 965.23 1123.30, 981.77 1124.50, 998.32 1124.62 C 999.30 1124.62, 1000.26 1124.63, 1001.24 1124.63 C 1017.91 1124.63, 1034.51 1123.54, 1051.05 1121.36 L 1051.06 1121.36 C 1086.60 1116.68, 1121.81 1107.00, 1156.63 1092.32 C 1231.01 1061.00, 1303.63 1006.95, 1373.92 930.51 L 1373.93 930.50 C 1385.60 917.79, 1397.22 904.48, 1408.77 890.53 L 1496.03 890.53 Z" />
          {/* Eye Iris Ring */}
          <path d="M 1125.89 831.72 C 1125.89 762.24, 1069.57 705.92, 1000.09 705.92 C 930.61 705.92, 874.29 762.24, 874.29 831.72 C 874.29 901.20, 930.61 957.52, 1000.09 957.52 C 1069.57 957.52, 1125.89 901.20, 1125.89 831.72 Z" fill="none" stroke={`url(#${gradId})`} strokeWidth="75" strokeMiterlimit="10" />
          {/* Pupil with Reflection Cutout */}
          <path d="M 1102.37 776.33 C 1102.37 750.99, 1081.82 730.44, 1056.48 730.44 C 1031.13 730.44, 1010.59 750.99, 1010.59 776.33 C 1010.59 801.68, 1031.13 822.22, 1056.48 822.22 C 1081.82 822.22, 1102.37 801.68, 1102.37 776.33" />
        </g>
      </svg>
    </span>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\Button.module.css

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-family-sans);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  position: relative;
  user-select: none;
  border: 1px solid transparent;
  cursor: pointer;
  letter-spacing: 0.02em;
}

.button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

/* Sizes */
.sm {
  font-size: var(--font-size-xs);
  padding: var(--space-2) var(--space-3);
  min-height: 44px;
}

.md {
  font-size: var(--font-size-sm);
  padding: var(--space-2) var(--space-4);
  min-height: 44px;
}

.lg {
  font-size: var(--font-size-base);
  padding: var(--space-3) var(--space-6);
  min-height: 50px;
}

/* Variants */
.primary {
  background: var(--gradient-brand-primary);
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(121, 40, 202, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.primary:hover:not(:disabled) {
  background: var(--gradient-brand-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 25px rgba(168, 85, 247, 0.5);
}

.primary:active:not(:disabled) {
  transform: translateY(0);
}

.secondary {
  background-color: var(--color-bg-elevated);
  color: var(--color-text-primary);
  border-color: var(--color-border-default);
}

.secondary:hover:not(:disabled) {
  background-color: #1e1e2c;
  border-color: var(--color-border-active);
  transform: translateY(-1px);
}

.outline {
  background-color: transparent;
  color: var(--color-accent-purple-bright);
  border-color: var(--color-border-default);
}

.outline:hover:not(:disabled) {
  background-color: var(--color-accent-purple-dim);
  border-color: var(--color-border-active);
  transform: translateY(-1px);
}

.ghost {
  background-color: transparent;
  color: var(--color-text-secondary);
}

.ghost:hover:not(:disabled) {
  background-color: var(--color-bg-surface);
  color: var(--color-text-primary);
}

.danger {
  background-color: var(--color-status-error);
  color: #fff;
}

.danger:hover:not(:disabled) {
  background-color: #dc2626;
}

/* Loading Spinner */
.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\Button.tsx

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      isLoading ? styles.loading : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={classNames}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && <span className={styles.spinner} aria-hidden="true" />}
        <span className={styles.label}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\Card.module.css

.card {
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: transform var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base);
  position: relative;
  overflow: hidden;
}

.surface {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border-subtle);
}

.elevated {
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  box-shadow: var(--shadow-md);
}

.glass {
  background: rgba(14, 14, 19, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--color-border-subtle);
}

.interactive {
  cursor: pointer;
}

.interactive:hover {
  transform: translateY(-2px);
  border-color: var(--color-border-active);
  box-shadow: 0 8px 30px rgba(121, 40, 202, 0.25);
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\Card.tsx

import React, { HTMLAttributes, forwardRef } from 'react';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'surface' | 'elevated' | 'glass';
  isInteractive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'surface', isInteractive = false, className, ...props }, ref) => {
    const classNames = [
      styles.card,
      styles[variant],
      isInteractive ? styles.interactive : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\Input.module.css

.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  width: 100%;
}

.label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.required {
  color: var(--color-status-error);
  margin-left: var(--space-1);
}

.input {
  width: 100%;
  height: 44px;
  padding: 0 var(--space-3);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.input:hover:not(:disabled) {
  border-color: rgba(168, 85, 247, 0.4);
}

.input:focus {
  outline: none;
  border-color: var(--color-accent-purple-bright);
  box-shadow: 0 0 0 3px rgba(121, 40, 202, 0.25);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.hasError {
  border-color: var(--color-status-error) !important;
}

.hasError:focus {
  box-shadow: 0 0 0 3px var(--color-status-error-bg) !important;
}

.errorText {
  font-size: var(--font-size-xs);
  color: var(--color-status-error);
  margin-top: 3px;
}

.helperText {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-top: 3px;
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\Input.tsx

import React, { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, className, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`${styles.wrapper} ${className || ''}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`${styles.input} ${error ? styles.hasError : ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className={styles.errorText} role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\Modal.module.css

.backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(8, 9, 10, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  z-index: var(--z-modal);
  animation: fadeIn var(--transition-fast) forwards;
}

.dialog {
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border-active);
  box-shadow: var(--shadow-lg), var(--shadow-gold-glow);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: scaleIn var(--transition-fast) forwards;
}

.header {
  padding: var(--space-5) var(--space-6);
  border-bottom: 1px solid var(--color-border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.closeButton {
  font-size: 1.5rem;
  line-height: 1;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
  padding: 4px;
}

.closeButton:hover {
  color: var(--color-accent-gold);
}

.body {
  padding: var(--space-6);
  overflow-y: auto;
  color: var(--color-text-secondary);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.96); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\Modal.tsx

'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import styles from './Modal.module.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={styles.header}>
          <h3 id="modal-title" className={styles.title}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\PainPointCard.module.css

.card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-6);
  position: relative;
  overflow: hidden;
  transition: all var(--transition-base);
}

.card:hover {
  border-color: var(--color-border-active);
  transform: translateY(-3px);
  box-shadow: 0 12px 36px rgba(121, 40, 202, 0.2);
}

.categoryTag {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent-purple-bright);
}

.question {
  font-family: var(--font-serif), Georgia, serif;
  font-size: var(--font-size-2xl);
  font-weight: 400;
  line-height: var(--line-height-snug);
  color: var(--color-text-primary);
  margin-top: var(--space-2);
}

.elaboration {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.impactWrapper {
  border-top: 1px solid var(--color-border-subtle);
  padding-top: var(--space-4);
}

.impactLabel {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-status-error);
  font-weight: var(--font-weight-semibold);
  display: block;
  margin-bottom: var(--space-1);
}

.impactText {
  font-size: var(--font-size-xs);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\PainPointCard.tsx

import React from 'react';
import styles from './PainPointCard.module.css';

export interface PainPointCardProps {
  category: 'MARGIN' | 'BRAND' | 'CONSUMER';
  question: string;
  elaboration: string;
  impact: string;
  className?: string;
}

export function PainPointCard({
  category,
  question,
  elaboration,
  impact,
  className = '',
}: PainPointCardProps) {
  const categoryTitles = {
    MARGIN: 'DIAGNOSTIC VECTOR // MARGIN LEAKAGE',
    BRAND: 'PERCEPTION VECTOR // BRAND DILUTION',
    CONSUMER: 'BEHAVIORAL VECTOR // CUSTOMER ATTACHMENT',
  };

  return (
    <div className={`${styles.card} ${className}`}>
      <div>
        <span className={styles.categoryTag}>{categoryTitles[category]}</span>
        <h3 className={styles.question}>{question}</h3>
      </div>

      <p className={styles.elaboration}>{elaboration}</p>

      <div className={styles.impactWrapper}>
        <span className={styles.impactLabel}>Commercial Consequence</span>
        <p className={styles.impactText}>{impact}</p>
      </div>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\ProofQuote.tsx

import React from 'react';

export interface ProofQuoteProps {
  quote: string;
  author: string;
  title: string;
  industry?: string;
  className?: string;
}

export function ProofQuote({
  quote,
  author,
  title,
  industry,
  className = '',
}: ProofQuoteProps) {
  return (
    <blockquote
      className={className}
      style={{
        margin: 0,
        padding: 'var(--space-8)',
        backgroundColor: 'var(--color-bg-elevated)',
        borderLeft: '3px solid var(--color-accent-purple-bright)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        position: 'relative',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-family-serif)',
          fontSize: 'var(--font-size-lg)',
          fontStyle: 'italic',
          color: 'var(--color-text-primary)',
          lineHeight: 'var(--line-height-relaxed)',
          margin: 0,
        }}
      >
        “{quote}”
      </p>

      <footer style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <cite
          style={{
            fontStyle: 'normal',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-sm)',
            color: '#fff',
          }}
        >
          {author}
        </cite>
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
          {title} {industry ? `• ${industry}` : ''}
        </span>
      </footer>
    </blockquote>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\StatBlock.tsx

import React from 'react';

export interface StatBlockProps {
  value: string;
  label: string;
  context?: string;
  className?: string;
}

export function StatBlock({ value, label, context, className = '' }: StatBlockProps) {
  return (
    <div
      className={className}
      style={{
        padding: 'var(--space-6)',
        backgroundColor: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-family-serif)',
          fontSize: 'var(--font-size-4xl)',
          fontWeight: 'var(--font-weight-bold)',
          background: 'linear-gradient(135deg, #ffffff 0%, var(--color-accent-purple-bright) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-text-primary)',
          letterSpacing: '0.04em',
        }}
      >
        {label}
      </div>
      {context && (
        <div
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-muted)',
            lineHeight: 'var(--line-height-normal)',
          }}
        >
          {context}
        </div>
      )}
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\SwipeableSheet.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';

export interface SwipeableSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  syncHistory?: boolean;
}

export const SwipeableSheet: React.FC<SwipeableSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  syncHistory = true,
}) => {
  const isPushedRef = useRef(false);

  // #12 Predictive Back Gesture & History State Sync
  useEffect(() => {
    if (!syncHistory || typeof window === 'undefined') return;

    if (isOpen) {
      window.history.pushState({ modal: 'swipeable-sheet' }, '');
      isPushedRef.current = true;

      const handlePopState = () => {
        isPushedRef.current = false;
        onClose();
      };

      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
        if (isPushedRef.current && window.history.state?.modal === 'swipeable-sheet') {
          // If closed programmatically, back out the pushed state cleanly
          window.history.back();
          isPushedRef.current = false;
        }
      };
    }
  }, [isOpen, onClose, syncHistory]);

  // #10 Swipe-to-dismiss threshold check
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 110 || info.velocity.y > 450) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            pointerEvents: 'auto',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(7, 7, 9, 0.75)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Drawer Sheet */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.6 }}
            onDragEnd={handleDragEnd}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
            style={{
              position: 'relative',
              width: '100%',
              maxHeight: '90vh',
              backgroundColor: '#070709',
              borderTop: '1px solid rgba(255, 255, 255, 0.14)',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))',
            }}
          >
            {/* Grab Handle */}
            <div
              style={{
                width: '100%',
                padding: '0.75rem 0 0.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'grab',
                touchAction: 'none',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                }}
              />
            </div>

            {/* Optional Header */}
            {title && (
              <div
                style={{
                  padding: '0.5rem 1.5rem 1rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: '1.25rem',
                    color: '#fff',
                  }}
                >
                  {title}
                </span>
                <button
                  onClick={onClose}
                  aria-label="Close sheet"
                  className="hit-slop"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {/* Sheet Content */}
            <div
              style={{
                padding: '1.5rem',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\UndoToast.tsx

'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface UndoToastProps {
  isVisible: boolean;
  message: string;
  onUndo: () => void;
  onDismiss: () => void;
  durationMs?: number;
}

export const UndoToast: React.FC<UndoToastProps> = ({
  isVisible,
  message,
  onUndo,
  onDismiss,
  durationMs = 5000,
}) => {
  // Listen for Cmd+Z / Ctrl+Z
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isVisible) return;

      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        if (!isInput) {
          e.preventDefault();
          onUndo();
          onDismiss();
        }
      }
    },
    [isVisible, onUndo, onDismiss]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Auto-dismiss timer
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [isVisible, durationMs, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
          className="squircle-surface"
          style={{
            position: 'fixed',
            bottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))',
            right: 'max(1.5rem, env(safe-area-inset-right, 1.5rem))',
            zIndex: 9999,
            backgroundColor: 'rgba(7, 7, 9, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: '#fff',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.12)',
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-sans), -apple-system, sans-serif',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'var(--color-brand-neon-violet, #a855f7)',
              }}
            />
            <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{message}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => {
                onUndo();
                onDismiss();
              }}
              className="hit-slop"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '4px',
                color: '#fff',
                padding: '0.25rem 0.6rem',
                fontSize: '0.75rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'background 0.15s ease',
              }}
            >
              Undo
              <kbd style={{ fontSize: '9px', padding: '1px 3px' }}>⌘Z</kbd>
            </button>

            <button
              onClick={onDismiss}
              aria-label="Dismiss notification"
              className="hit-slop"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                padding: '0.2rem',
                lineHeight: 1,
                fontSize: '1rem',
              }}
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\VSLPlayer.module.css

.container {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-subtle);
  box-shadow: var(--shadow-lg), 0 0 35px rgba(121, 40, 202, 0.15);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.container:hover {
  border-color: var(--color-border-active);
  box-shadow: var(--shadow-lg), 0 0 50px rgba(121, 40, 202, 0.25);
}

.aspectRatio {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  background: #000;
}

.posterWrapper {
  position: absolute;
  inset: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: radial-gradient(circle at 50% 50%, #1a102f 0%, #070709 100%);
}

.posterImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.posterWrapper:hover .posterImage {
  transform: scale(1.02);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(7, 7, 9, 0.2) 0%, rgba(7, 7, 9, 0.75) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-6);
  text-align: center;
}

.playButton {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  background: var(--gradient-brand-primary);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
}

.playButton:hover {
  transform: scale(1.1);
  box-shadow: 0 0 45px rgba(192, 132, 252, 0.8);
}

.playIcon {
  width: 28px;
  height: 28px;
  margin-left: 4px;
}

.videoFrame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.briefingTag {
  font-size: var(--font-size-xs);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent-purple-bright);
  font-weight: var(--font-weight-semibold);
}

.durationBadge {
  position: absolute;
  bottom: var(--space-4);
  right: var(--space-4);
  background: rgba(7, 7, 9, 0.85);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-sm);
  padding: 4px 8px;
  font-size: var(--font-size-xs);
  color: #fff;
}


### FILE: E:\Ibrahim's website\src\presentation\components\primitives\VSLPlayer.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './VSLPlayer.module.css';

export interface VSLPlayerProps {
  posterUrl: string;
  videoUrl?: string;
  durationMinutes?: number;
  headline?: string;
  onPlayStart?: () => void;
  onProgress?: (percent: number) => void;
  onCompleted?: () => void;
  className?: string;
}

export function VSLPlayer({
  posterUrl,
  videoUrl,
  durationMinutes = 6,
  headline = 'Executive Strategic Briefing',
  onPlayStart,
  className = '',
}: VSLPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartPlay = () => {
    setIsPlaying(true);
    if (onPlayStart) {
      onPlayStart();
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.aspectRatio}>
        {!isPlaying ? (
          <div
            className={styles.posterWrapper}
            onClick={handleStartPlay}
            role="button"
            tabIndex={0}
            aria-label={`Play ${headline}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleStartPlay();
              }
            }}
          >
            <Image
              src={posterUrl}
              alt={headline}
              fill
              className={styles.posterImage}
              sizes="(max-width: 1200px) 100vw, 1200px"
              loading="lazy"
            />

            <div className={styles.overlay}>
              <span className={styles.briefingTag}>CONFIDENTIAL BRIEFING</span>
              <button className={styles.playButton} aria-hidden="true">
                <svg className={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>

            <div className={styles.durationBadge}>
              <span>{durationMinutes}:00 MIN</span>
            </div>
          </div>
        ) : (
          <iframe
            className={styles.videoFrame}
            src={videoUrl || 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1'}
            title={headline}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\sections\ArtifactGallery.module.css

.section { position: relative; overflow: clip; max-width: 100vw; padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 5rem); background: var(--surface-obsidian); border-bottom: 1px solid rgba(255, 255, 255, .12); }
.anchor { position: absolute; inset: 0 auto auto 0; }
.index { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; padding: .8rem 0; border-block: 1px solid rgba(255, 255, 255, .12); color: rgba(255,255,255,.55); font: 500 10px/1.2 var(--font-mono); letter-spacing: .14em; text-transform: uppercase; }
.index span:first-child { color: #c882ff; }.index span:last-child { text-align: right; }
.header { display: grid; grid-template-columns: minmax(0, 2fr) minmax(16rem, 1fr); gap: clamp(2rem, 8vw, 10rem); align-items: end; margin: clamp(3rem, 8vw, 8rem) 0 clamp(2rem, 5vw, 5rem); }
.header h2,.caption h3 { margin: 0; }.header h2 { max-width: 13ch; color: #fff; font: 400 clamp(3.3rem, 6.6vw, 7rem)/.9 var(--font-serif); letter-spacing: -.04em; }.header h2 em { color: #c882ff; }.header > p { max-width: 30rem; margin: 0; color: rgba(255,255,255,.64); font: 400 .95rem/1.6 var(--font-sans); }
.exhibition { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: clamp(1rem, 2vw, 2rem); }.artifact { grid-column: span 6; min-width: 0; margin: 0; }.wide { grid-column: 3 / span 8; }.artwork { display: flex; align-items: center; justify-content: center; overflow: hidden; background: #0b0b0e; border: 1px solid rgba(255,255,255,.11); }.image { display: block; width: 100%; height: auto; object-fit: contain; }
.caption { display: grid; grid-template-columns: 4.5rem minmax(0, 1fr) minmax(8rem, auto); gap: 1rem; padding: 1rem 0 2.5rem; color: rgba(255,255,255,.48); font: 500 10px/1.35 var(--font-mono); letter-spacing: .11em; text-transform: uppercase; }.caption h3 { color: #fff; font: 400 clamp(1.4rem, 2vw, 2rem)/1.05 var(--font-serif); letter-spacing: -.02em; text-transform: none; }.caption p { max-width: 36rem; margin: .5rem 0 0; color: rgba(255,255,255,.62); font: 400 .82rem/1.55 var(--font-sans); letter-spacing: normal; text-transform: none; }.caption > span:last-child { text-align: right; }
@media (max-width: 760px) { .index { grid-template-columns: repeat(2, minmax(0, 1fr)); font-size: 9px; }.index span:last-child { text-align: left; }.header { grid-template-columns: 1fr; gap: 1.25rem; margin-block: 3rem; }.header h2 { font-size: clamp(3rem, 15vw, 4.7rem); }.artifact,.wide { grid-column: 1 / -1; }.caption { grid-template-columns: 3.5rem minmax(0, 1fr); padding-bottom: 2rem; }.caption > span:last-child { grid-column: 2; text-align: left; } }


### FILE: E:\Ibrahim's website\src\presentation\components\sections\ArtifactGallery.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Section } from '@/presentation/components/layout/Section';
import { BLUR_PLACEHOLDERS } from '@/content/blurPlaceholders';
import { ArchitecturalSkeleton } from '@/presentation/components/primitives/ArchitecturalSkeleton';
import { runViewTransition } from '@/presentation/utils/viewTransition';
import styles from './ArtifactGallery.module.css';

interface CampaignArtifact {
  id: string;
  title: string;
  format: string;
  imageSrc: string;
  blurDataURL: string;
  description: string;
  width: number;
  height: number;
  span: 'standard' | 'wide';
}

const artifacts: CampaignArtifact[] = [
  {
    id: '01',
    title: 'Brand Mission & Ethos Creative',
    format: 'Campaign Master Visual',
    imageSrc: '/brand/graphics/artboard-1-our.jpg',
    blurDataURL: BLUR_PLACEHOLDERS.artboard1,
    description: 'The campaign assertion that articulates BRANDMANIA’s ethos of craftsmanship and market leadership.',
    width: 1080,
    height: 1080,
    span: 'standard',
  },
  {
    id: '02',
    title: 'Services & Branding Architecture',
    format: 'Identity Deliverable Artboard',
    imageSrc: '/brand/graphics/artboard-2-services-branding.jpg',
    blurDataURL: BLUR_PLACEHOLDERS.artboard2,
    description: 'A complete view of the Brand Direction system: positioning, frameworks, and visual standards.',
    width: 1080,
    height: 1080,
    span: 'standard',
  },
  {
    id: '03',
    title: 'Social & Feed Campaign System',
    format: 'Social Media Artboard',
    imageSrc: '/brand/graphics/artboard-3-services-social.jpg',
    blurDataURL: BLUR_PLACEHOLDERS.artboard3,
    description: 'A high-density campaign system designed to create recognition and authority in the feed.',
    width: 1080,
    height: 1080,
    span: 'standard',
  },
  {
    id: '04',
    title: 'The Brand Eye Cultural Seal',
    format: 'Symbolic Iconography',
    imageSrc: '/brand/graphics/artboard-4-brand-eye.jpg',
    blurDataURL: BLUR_PLACEHOLDERS.artboard4,
    description: 'The Brand Eye as a symbol of focus, symmetry, and executive standard.',
    width: 1080,
    height: 1080,
    span: 'standard',
  },
  {
    id: '05',
    title: 'Omni-Channel Agency Banner',
    format: 'Landscape Master Banner',
    imageSrc: '/brand/graphics/brandmania-ad-agency-banner.jpg',
    blurDataURL: BLUR_PLACEHOLDERS.agencyBanner,
    description: 'A panoramic campaign asset for high-visibility digital and physical placements.',
    width: 1920,
    height: 1080,
    span: 'wide',
  },
];

export const ArtifactGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // #7 Programmatic Preloading of Adjacent Images
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const nextIdx = (activeIndex + 1) % artifacts.length;
    const prevIdx = (activeIndex - 1 + artifacts.length) % artifacts.length;

    const imgNext = new window.Image();
    imgNext.src = artifacts[nextIdx].imageSrc;

    const imgPrev = new window.Image();
    imgPrev.src = artifacts[prevIdx].imageSrc;
  }, [activeIndex]);

  // #9 View Transitions on lookbook navigation
  const goToNext = useCallback(() => {
    runViewTransition(() => {
      setImageLoaded(false);
      setActiveIndex((prev) => (prev + 1) % artifacts.length);
    });
  }, []);

  const goToPrev = useCallback(() => {
    runViewTransition(() => {
      setImageLoaded(false);
      setActiveIndex((prev) => (prev - 1 + artifacts.length) % artifacts.length);
    });
  }, []);

  // #4 Keyboard Shortcuts (← / →) when not inside form inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (!isInput && !e.metaKey && !e.ctrlKey) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  const active = artifacts[activeIndex];

  return (
    <Section id="work" spacing="none" className={styles.section}>
      <div id="campaigns" className={styles.anchor} aria-hidden="true" />
      
      {/* Top Section Index Bar */}
      <div className={`${styles.index} tabular-nums`}>
        <span>(08) / SELECTED ARTIFACTS</span>
        <span>CAMPAIGN ARTIFACT LOOKBOOK</span>
        <span>FIVE ORIGINAL EXHIBITS</span>
        <span>DISPLAYED AT NATURAL RATIO</span>
      </div>

      <header className={styles.header}>
        <h2>
          Proof of craft, not <em>manufactured proof.</em>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
          <p>
            Each artifact is shown as created—fully visible, uncropped, without a smartphone bezel or synthetic distortion.
          </p>

          {/* Lookbook Navigation Bar with Hit Slop and Shortcut Hints */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '0.5rem',
            }}
          >
            <button
              onClick={goToPrev}
              className="hit-slop"
              aria-label="Previous artifact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '4px',
                color: '#fff',
                padding: '0.4rem 0.75rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '11px',
                minWidth: '44px',
                minHeight: '44px',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              <CaretLeft size={14} weight="bold" />
              <span>PREV</span>
              <kbd style={{ fontSize: '9px', padding: '1px 3px' }}>←</kbd>
            </button>

            <span
              className="font-mono tabular-nums"
              style={{
                fontSize: '11px',
                color: 'var(--color-brand-neon-violet, #c882ff)',
                letterSpacing: '0.14em',
              }}
            >
              {active.id} / 05
            </span>

            <button
              onClick={goToNext}
              className="hit-slop"
              aria-label="Next artifact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '4px',
                color: '#fff',
                padding: '0.4rem 0.75rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '11px',
                minWidth: '44px',
                minHeight: '44px',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              <span>NEXT</span>
              <kbd style={{ fontSize: '9px', padding: '1px 3px' }}>→</kbd>
              <CaretRight size={14} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      {/* Featured Lookbook Interactive Viewer */}
      <div
        style={{
          border: '1px solid rgba(255, 255, 255, 0.12)',
          marginBottom: 'clamp(2rem, 4vw, 4rem)',
          backgroundColor: '#070709',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
            style={{ position: 'relative', width: '100%' }}
          >
            {/* Image Stage */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxHeight: '75vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0b0b0e',
                overflow: 'hidden',
              }}
            >
              {!imageLoaded && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                  <ArchitecturalSkeleton height="100%" />
                </div>
              )}
              <Image
                src={active.imageSrc}
                alt={`BRANDMANIA ${active.title}`}
                width={active.width}
                height={active.height}
                placeholder="blur"
                blurDataURL={active.blurDataURL}
                onLoad={() => setImageLoaded(true)}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
                priority
              />
            </div>

            {/* Datum Caption */}
            <figcaption className={styles.caption} style={{ padding: '1.25rem 1.5rem' }}>
              <span className="tabular-nums">{active.id} / 05</span>
              <div>
                <h3>{active.title}</h3>
                <p>{active.description}</p>
              </div>
              <span className="font-mono">{active.format}</span>
            </figcaption>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Full SSR DOM Exhibition Grid for Crawlers & Comprehensive Viewing */}
      <div className={styles.exhibition}>
        {artifacts.map((artifact, idx) => (
          <figure
            key={artifact.id}
            className={`${styles.artifact} ${artifact.span === 'wide' ? styles.wide : ''}`}
            onClick={() => {
              runViewTransition(() => {
                setActiveIndex(idx);
                const el = document.getElementById('work');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              });
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.artwork}>
              <Image
                src={artifact.imageSrc}
                alt={`BRANDMANIA ${artifact.title}`}
                width={artifact.width}
                height={artifact.height}
                placeholder="blur"
                blurDataURL={artifact.blurDataURL}
                sizes={
                  artifact.span === 'wide'
                    ? '(max-width: 760px) 100vw, 66vw'
                    : '(max-width: 760px) 100vw, 33vw'
                }
                className={styles.image}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>
            <figcaption className={styles.caption}>
              <span className="tabular-nums">{artifact.id} / 05</span>
              <div>
                <h3>{artifact.title}</h3>
                <p>{artifact.description}</p>
              </div>
              <span>{artifact.format}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\sections\BrandDirectionSection.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { BookOpenText, ChatText, CrosshairSimple, ShieldCheck, Swatches, Binoculars } from '@phosphor-icons/react';
import { BLUR_PLACEHOLDERS } from '@/content/blurPlaceholders';

export const BrandDirectionSection: React.FC = () => {
  const pillars = [
    { num: '01', title: 'Brand Story & Narrative', desc: 'Crafting defensible corporate authority that commands executive reverence.', icon: BookOpenText },
    { num: '02', title: 'Tone of Voice', desc: 'Surgical linguistic precision that cuts through industry noise and communicates mastery.', icon: ChatText },
    { num: '03', title: 'Positioning & USP', desc: 'Carving out uncontested market space where competitors are rendered obsolete.', icon: CrosshairSimple },
    { num: '04', title: 'Trust Architecture', desc: 'Building institutional certainty and credibility into every customer interaction touchpoint.', icon: ShieldCheck },
    { num: '05', title: 'Visual Identity & System', desc: 'A timeless visual standard distinct and prestigious across physical and digital mediums.', icon: Swatches },
    { num: '06', title: 'Vision, Mission & Relevance', desc: 'Harmonizing internal conviction with market expectations and generational staying power.', icon: Binoculars },
  ];

  return (
    <section
      id="disciplines"
      style={{
        backgroundColor: '#F3F0EA',
        color: '#070709',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        padding: 'clamp(var(--space-16), 8vw, var(--space-28)) clamp(1.5rem, 3vw, 4rem)',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Anchor alias for backwards-compatibility */}
      <div id="brand-direction" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} aria-hidden="true" />
      
      {/* 12-Column Swiss Grid Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(var(--space-8), 4vw, var(--space-12))',
          alignItems: 'start',
        }}
      >
        {/* Left 5 Columns: Sticky Architectural Headline & Pillar Index */}
        <div
          style={{
            gridColumn: 'span 5',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-8)',
            position: 'sticky',
            top: '100px',
          }}
        >
          {/* Section Datum */}
          <div
            className="tabular-nums"
            style={{
              fontFamily: 'var(--font-Mono), monospace',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#4A0099',
              borderTop: '1px solid rgba(0, 0, 0, 0.18)',
              paddingTop: 'var(--space-3)',
            }}
          >
            (05) / FLAGSHIP I &bull; BRAND DIRECTION
          </div>

          {/* Monumental Instrument Serif Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 'clamp(3.5rem, 6vw, 6rem)',
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: '#070709',
              margin: 0,
            }}
          >
            Aligning what you are with what the market perceives.
          </h2>

          {/* Clean Numbered Index List of the 6 Pillars */}
          <div
            className="tabular-nums"
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid rgba(0, 0, 0, 0.14)',
            }}
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.num}
                  style={{
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    padding: 'var(--space-3) 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--space-4)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-Mono), monospace',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#4A0099',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {pillar.num}
                    </span>
                    <Icon size={16} color="#070709" weight="bold" />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans), -apple-system, sans-serif',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#070709',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {pillar.title}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans), -apple-system, sans-serif',
                      fontSize: '11px',
                      color: '#66636E',
                      textAlign: 'right',
                      maxWidth: '220px',
                      lineHeight: 1.35,
                    }}
                  >
                    {pillar.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 7 Columns: Massive Uncropped Exhibition Display on Alabaster Surface */}
        <div
          style={{
            gridColumn: 'span 7',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-10)',
          }}
        >
          {/* Master Deliverable Artboard (100% Uncropped on Alabaster Surface, Zero Black Bars) */}
          <div
            style={{
              background: '#F3F0EA',
              border: '1px solid rgba(0, 0, 0, 0.14)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/brand/graphics/artboard-2-services-branding.jpg"
              alt="BRANDMANIA Services &amp; Branding Architecture Deliverable Artboard"
              width={1080}
              height={1080}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDERS.artboard2}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />
            <div
              className="tabular-nums"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 16px',
                fontFamily: 'var(--font-Mono), monospace',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(7, 7, 9, 0.75)',
                background: '#EAE6DC',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              }}
            >
              <span>Brand Services Architecture Master</span>
              <span style={{ color: '#4A0099', fontWeight: 600 }}>100% Legibility Standard</span>
            </div>
          </div>

          {/* Physical Folded Paper Poster (100% Uncropped on Alabaster Surface) */}
          <div
            style={{
              background: '#F3F0EA',
              border: '1px solid rgba(0, 0, 0, 0.14)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/brand/textures/brandmania-poster.jpg"
              alt="BRANDMANIA — Physical folded editorial paper poster detailing brand direction standards"
              width={2064}
              height={2064}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDERS.poster}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div
              className="tabular-nums"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 16px',
                fontFamily: 'var(--font-Mono), monospace',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(7, 7, 9, 0.75)',
                background: '#EAE6DC',
                borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              }}
            >
              <span>Physical Materiality Poster</span>
              <span style={{ color: '#4A0099', fontWeight: 600 }}>Folded Violet Ink</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\sections\BriefingSection.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

export const BriefingSection: React.FC = () => {
  return (
    <Section
      id="briefing"
      spacing="none"
      style={{
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)',
        overflow: 'hidden',
      }}
    >
      <Container>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          {/* Subtle Datum Marker */}
          <div
            style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-light-violet)',
              marginBottom: 'var(--space-12)',
            }}
          >
            CINEMATIC INTERLUDE &bull; STRATEGIC BRIEFING
          </div>

          {/* Monumental Headline */}
          <div style={{ marginBottom: 'var(--space-12)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.75rem, 5.5vw, 4.8rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
                maxWidth: '960px',
              }}
            >
              Resolving The Commercial Dilemma.
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 1.35vw, 1.3rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                maxWidth: '740px',
                marginTop: 'var(--space-4)',
                margin: 0,
              }}
            >
              An executive analysis of why traditional agency retainers fail, how uncalibrated
              perception caps enterprise valuation, and what is required to command category
              leadership.
            </p>
          </div>

          {/* Full-Width 21:9 Anamorphic Cinema Frame (Zero fake play buttons) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '21 / 9',
              minHeight: '380px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              marginBottom: 'var(--space-12)',
              backgroundColor: '#07050a',
            }}
          >
            <Image
              src="/brand/textures/brandmania-cover.jpg"
              alt="BRANDMANIA Cinematic Artwork"
              fill
              style={{ objectFit: 'cover', opacity: 0.85 }}
              sizes="(max-width: 1200px) 100vw, 1120px"
              priority={false}
            />
            {/* Cinematic Gradient Mask */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(7, 7, 9, 0.25) 0%, rgba(7, 7, 9, 0.88) 100%)',
              }}
            />

            {/* Overlaid Cinema Credits & Title */}
            <div
              style={{
                position: 'absolute',
                bottom: 'var(--space-8)',
                left: 'var(--space-8)',
                right: 'var(--space-8)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-light-violet)',
                  }}
                >
                  FOUNDER EXECUTIVE BRIEFING
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(1.6rem, 2.7vw, 2.6rem)',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginTop: '4px',
                  }}
                >
                  The Anatomy of Market Leadership
                </div>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}
              >
                Confidential Strategic Review
              </div>
            </div>
          </div>

          {/* Three Thesis Takeaways (Cinematic Subtitles Layout) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-10)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: 'var(--space-8)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: '#8E00FA',
                  letterSpacing: '0.15em',
                  marginBottom: 'var(--space-2)',
                }}
              >
                THESIS 01 &bull; PERCEPTION
              </div>
              <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: '#ffffff', margin: '0 0 var(--space-2)' }}>
                Perception Sets The Valuation Ceiling
              </h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                If the market views your brand as interchangeable, no sales force can defend margins.
                Status must be engineered across every single customer touchpoint.
              </p>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: '#8E00FA',
                  letterSpacing: '0.15em',
                  marginBottom: 'var(--space-2)',
                }}
              >
                THESIS 02 &bull; CAPITAL INTEGRITY
              </div>
              <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: '#ffffff', margin: '0 0 var(--space-2)' }}>
                The Trap of Media Scaling
              </h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Pumping paid traffic into uncalibrated commercial funnels accelerates capital burn.
                Fix the machine before spending capital to buy more traffic.
              </p>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: '#8E00FA',
                  letterSpacing: '0.15em',
                  marginBottom: 'var(--space-2)',
                }}
              >
                THESIS 03 &bull; IDENTITY
              </div>
              <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: '#ffffff', margin: '0 0 var(--space-2)' }}>
                Cognitive Attachment Outlasts Utility
              </h4>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                High-ticket loyalty is created when customer identity bonds with the brand. Behavioral
                heuristics convert transactional purchasers into permanent brand champions.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\sections\CapabilitiesSection.tsx

'use client';

import React, { useState, useRef } from 'react';
import {
  MegaphoneSimple,
  TrendUp,
  Target,
  PenNib,
  VideoCamera,
  Coins,
  Buildings,
  UsersThree,
  Kanban,
  Robot,
  Cpu,
  type Icon,
} from '@phosphor-icons/react';
import { Section } from '@/presentation/components/layout/Section';
import { useSafeTriangle } from '@/presentation/hooks/useSafeTriangle';

interface CapabilityItem {
  name: string;
  desc: string;
  icon: Icon;
}

interface CapabilityCluster {
  roman: string;
  name: string;
  subtitle: string;
  items: CapabilityItem[];
}

export const CapabilitiesSection: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const { handleRowHover } = useSafeTriangle({
    detailRef: detailPanelRef,
    suppressionDelayMs: 180,
  });

  const clusters: CapabilityCluster[] = [
    {
      roman: 'I',
      name: 'Communication & Growth Execution',
      subtitle: 'Digital reach, growth, and performance creative',
      items: [
        {
          name: 'Digital Marketing',
          desc: 'High-status multi-channel communication calibrated to executive and high-ticket consumer psychology.',
          icon: MegaphoneSimple,
        },
        {
          name: 'Growth Marketing',
          desc: 'Data-driven funnel engineering expanding market footprint without discounting brand prestige.',
          icon: TrendUp,
        },
        {
          name: 'Performance Marketing',
          desc: 'Paid media acquisition governed strictly by contribution profit and verified customer lifetime value.',
          icon: Target,
        },
        {
          name: 'Content Creation',
          desc: 'Editorial-grade narrative and visual assets articulating craftsmanship and institutional certainty.',
          icon: PenNib,
        },
        {
          name: 'Performance Content Creation',
          desc: 'High-converting creative assets built for rapid algorithmic arrest and verified buyer action.',
          icon: VideoCamera,
        },
      ],
    },
    {
      roman: 'II',
      name: 'Commercial & Operational Architecture',
      subtitle: 'Finance, strategic management, teams, and delivery',
      items: [
        {
          name: 'Finance & Operations',
          desc: 'Gross margin governance, unit contribution modeling, and capital allocation frameworks.',
          icon: Coins,
        },
        {
          name: 'Strategic Management',
          desc: 'Executive roadmap alignment, category positioning defenses, and market expansion planning.',
          icon: Buildings,
        },
        {
          name: 'Team Management',
          desc: 'High-performance team orchestration, operational accountability, and cross-functional standards.',
          icon: UsersThree,
        },
        {
          name: 'Project Management',
          desc: 'Surgical delivery velocity, milestone governance, and multi-disciplinary operational execution.',
          icon: Kanban,
        },
      ],
    },
    {
      roman: 'III',
      name: 'Operational Leverage Systems',
      subtitle: 'Connected automation and intelligence',
      items: [
        {
          name: 'AI Automation',
          desc: 'Streamlining repetitive operational handoffs, customer workflows, and operational fulfillment friction.',
          icon: Robot,
        },
        {
          name: 'AI Connected Systems',
          desc: 'Unified real-time data pipelines linking marketing inputs, operational handoffs, and financial outputs.',
          icon: Cpu,
        },
      ],
    },
  ];

  return (
    <Section
      id="capabilities"
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 3vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      {/* Tier 1: Swiss Architectural Index Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '0.85rem 0',
          marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.55)',
        }}
      >
        <div>
          <span style={{ color: '#C882FF', marginRight: '6px' }}>(09)</span> / FULL-SPECTRUM EXECUTION
        </div>
        <div>SUPPORTING ARCHITECTURE</div>
        <div>MARKETING • OPERATIONS • AI</div>
        <div style={{ textAlign: 'right' }}>11 SPECIALIZED DISCIPLINES</div>
      </div>

      {/* Tier 2: Editorial Monumental Display Header */}
      <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
            fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            color: '#ffffff',
            margin: 0,
            maxWidth: '1200px',
          }}
        >
          Integrated capabilities{' '}
          <span
            style={{
              fontStyle: 'italic',
              color: 'var(--color-brand-light-violet, #C882FF)',
            }}
          >
            across marketing, operations, and AI.
          </span>
        </h2>
      </div>

      {/* Tier 3: Edge-to-Edge 3-Cluster Swiss Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1px',
          background: 'rgba(255, 255, 255, 0.12)',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        {clusters.map((cluster) => (
          <div
            key={cluster.roman}
            style={{
              background: '#070709',
              padding: 'clamp(2rem, 3vh, 3rem) clamp(1.5rem, 2vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* Cluster Top Metadata */}
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)', paddingBottom: '1.5rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#C882FF',
                  letterSpacing: '0.12em',
                  marginBottom: '0.5rem',
                }}
              >
                CLUSTER {cluster.roman}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                  fontSize: 'clamp(1.75rem, 2.2vw, 2.2rem)',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: '#ffffff',
                  margin: '0 0 0.5rem 0',
                }}
              >
                {cluster.name}
              </h3>
              <div
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.45)',
                  letterSpacing: '0.04em',
                }}
              >
                {cluster.subtitle}
              </div>
            </div>

            {/* Cluster Capability Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cluster.items.map((item) => {
                const Icon = item.icon;
                const isHovered = hoveredItem === item.name;
                return (
                  <div
                    key={item.name}
                    ref={isHovered ? detailPanelRef : undefined}
                    onMouseEnter={() => handleRowHover(() => setHoveredItem(item.name))}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      padding: '1rem',
                      border: isHovered
                        ? '1px solid rgba(200, 130, 255, 0.35)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                      background: isHovered ? 'rgba(142, 0, 250, 0.08)' : 'rgba(255, 255, 255, 0.015)',
                      borderRadius: '2px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                      <Icon size={18} weight="duotone" color={isHovered ? '#C882FF' : 'rgba(255, 255, 255, 0.5)'} />
                      <div
                        style={{
                          fontFamily: 'var(--font-serif), Georgia, serif',
                          fontSize: '1.15rem',
                          color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                        fontSize: '12.5px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\sections\ConsumerScopeSection.tsx

'use client';

import React, { useState, useRef } from 'react';
import { Section } from '@/presentation/components/layout/Section';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { SpotlightCard } from '@/presentation/components/animations/SpotlightCard';
import { useSafeTriangle } from '@/presentation/hooks/useSafeTriangle';

interface Dimension {
  id: string;
  name: string;
  principle: string;
  thesis: string;
}

export const ConsumerScopeSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('01');
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const { handleRowHover } = useSafeTriangle({
    detailRef: detailPanelRef,
    suppressionDelayMs: 180,
  });

  const dimensions: Dimension[] = [
    {
      id: '01',
      name: 'Perceived Value',
      principle: 'Perception dictates willingness-to-pay far more than production cost.',
      thesis:
        'When market perception elevates an offering above commodity comparisons, buyers evaluate value by status and certainty rather than unit manufacturing cost.',
    },
    {
      id: '02',
      name: 'Psychological Pricing',
      principle: 'Price resistance is an emotional reaction to uncalibrated value contrast.',
      thesis:
        'Engineering pricing architecture and contextual framing so premium figures feel natural, extinguishing discount friction before it arises.',
    },
    {
      id: '03',
      name: 'Emotional Attachment',
      principle: 'Rational logic justifies decisions, but emotional resonance drives them.',
      thesis:
        'Designing visceral brand rituals and communication cues that build irrational customer preference—the deepest moat against competitor feature wars.',
    },
    {
      id: '04',
      name: 'Social Identity',
      principle: 'Customers do not merely buy products; they buy confirmation of who they are.',
      thesis:
        'Turning your brand into a symbolic badge of self-definition, aligning ownership with the customer’s aspirational peer identity.',
    },
    {
      id: '05',
      name: 'Status Perception',
      principle: 'High-ticket buyers seek risk mitigation and prestige validation.',
      thesis:
        'Disciplined visual standards and surgical tone of voice establish institutional prestige that commands immediate market respect.',
    },
    {
      id: '06',
      name: 'Enduring Loyalty',
      principle: 'A single transaction is a test; lifetime loyalty is an engineered ecosystem.',
      thesis:
        'Constructing post-purchase affirmation systems and customer loops that transform one-time purchasers into generational brand ambassadors.',
    },
    {
      id: '07',
      name: 'Decision-Making Architecture',
      principle: 'Hesitation is caused by perceived transition risk and cognitive friction.',
      thesis:
        'Systematically resolving unspoken doubts and removing cognitive friction at the precise psychological point of decision.',
    },
  ];

  return (
    <Section
      id="consumer-scope"
      spacing="none"
      style={{
        background: 'linear-gradient(180deg, #110022 0%, #070709 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 3vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      {/* Monumental BrandEye Watermark in Background (70vw) */}
      <div
        style={{
          position: 'absolute',
          right: '-10vw',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '65vw',
          maxWidth: '920px',
          height: '65vw',
          maxHeight: '920px',
          opacity: 0.045,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <BrandEye size="xl" glow={false} idSuffix="watermark_scope_swiss" />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Tier 1: Swiss Architectural Index Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '0.85rem 0',
            marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.55)',
          }}
        >
          <div>
            <span style={{ color: '#C882FF', marginRight: '6px' }}>(04)</span> / FLAGSHIP III
          </div>
          <div>BEHAVIORAL ECONOMICS &amp; COGNITION</div>
          <div>CONSUMER SCOPE SPECIFICATION</div>
          <div style={{ textAlign: 'right' }}>7 BEHAVIORAL DIMENSIONS</div>
        </div>

        {/* Tier 2: Editorial Monumental Display Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: 0,
              maxWidth: '1200px',
            }}
          >
            Every touchpoint engineered{' '}
            <span
              style={{
                fontStyle: 'italic',
                color: 'var(--color-brand-light-violet, #C882FF)',
              }}
            >
              through human behavior.
            </span>
          </h2>
        </div>

        {/* Tier 3: Edge-to-Edge Architectural Index (7 Dimensions) */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {dimensions.map((dim) => {
            const isActive = activeId === dim.id;
            return (
              <SpotlightCard
                key={dim.id}
                onMouseEnter={() => handleRowHover(() => setActiveId(dim.id))}
                onClick={() => setActiveId(dim.id)}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 0,
                  borderInline: 'none',
                  borderTop: 'none',
                  padding: 'clamp(1.25rem, 2.5vh, 2.25rem) 0',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  background: isActive ? 'rgba(142, 0, 250, 0.05)' : 'transparent',
                }}
                spotlightColor="rgba(200, 130, 255, 0.12)"
              >
                {/* Master Grid Row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(60px, 80px) minmax(260px, 1.4fr) minmax(280px, 1.8fr) minmax(40px, 60px)',
                    gap: 'clamp(1rem, 2vw, 2.5rem)',
                    alignItems: 'center',
                    padding: '0 1rem',
                  }}
                >
                  {/* Step ID */}
                  <div
                    className="tabular-nums"
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: isActive ? '#C882FF' : 'rgba(255, 255, 255, 0.35)',
                      letterSpacing: '0.12em',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {dim.id}
                  </div>

                  {/* Name in Instrument Serif */}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)',
                        fontWeight: 400,
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                        margin: 0,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {dim.name}
                    </h3>
                  </div>

                  {/* Principle Quote */}
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.05rem, 1.35vw, 1.35rem)',
                        color: isActive ? '#C882FF' : 'rgba(255, 255, 255, 0.55)',
                        margin: 0,
                        lineHeight: 1.3,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      &ldquo;{dim.principle}&rdquo;
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '14px',
                      color: isActive ? '#C882FF' : 'rgba(255, 255, 255, 0.25)',
                      textAlign: 'right',
                      transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isActive ? '—' : '+'}
                  </div>
                </div>

                {/* Architectural Behavioral Thesis (Safe Triangle Detail Target, Always Rendered in SSR DOM) */}
                <div
                  ref={isActive ? detailPanelRef : undefined}
                  style={{
                    display: isActive ? 'grid' : 'none',
                    gridTemplateColumns: 'minmax(60px, 80px) minmax(260px, 1.4fr) minmax(280px, 1.8fr) minmax(40px, 60px)',
                    gap: 'clamp(1rem, 2vw, 2.5rem)',
                    padding: '1.25rem 1rem 0.5rem 1rem',
                  }}
                >
                  <div />
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.4)',
                      paddingTop: '4px',
                    }}
                  >
                    BEHAVIORAL THESIS
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.88)',
                        lineHeight: 1.6,
                        margin: 0,
                        maxWidth: '680px',
                      }}
                    >
                      {dim.thesis}
                    </p>
                  </div>
                  <div />
                </div>

                {/* Semantic description node for AI crawler and search indexing extraction */}
                <div
                  style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: 0,
                  }}
                  aria-hidden="false"
                >
                  <dl>
                    <dt>{dim.name} — Core Behavioral Principle</dt>
                    <dd>{dim.principle}</dd>
                    <dt>{dim.name} — Behavioral Thesis</dt>
                    <dd>{dim.thesis}</dd>
                  </dl>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </Section>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\sections\DilemmaSection.tsx

'use client';

import React from 'react';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { Section } from '@/presentation/components/layout/Section';

export const DilemmaSection: React.FC = () => {
  return (
    <Section
      id="dilemma"
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
        width: '100%',
        padding: 0,
      }}
    >
      {/* Full-Bleed Edge-to-Edge Split Plane */}
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          alignItems: 'stretch',
        }}
      >
        {/* Left Half: The Attention Trap (Matte Obsidian #09090C) */}
        <div
          style={{
            backgroundColor: '#09090C',
            padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 5rem)',
            borderRight: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#ff6b6b',
                marginBottom: '1rem',
              }}
            >
              (03) / THE ATTENTION TRAP &bull; COMMODITIZED CHURN
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: 'clamp(2.6rem, 4.5vw, 4.5rem)',
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Traffic buys attention.{' '}
              <span style={{ fontStyle: 'italic', color: '#ff6b6b' }}>
                It does not buy loyalty.
              </span>
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              color: 'rgba(255, 255, 255, 0.65)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '540px',
            }}
          >
            Pouring ad spend into an uncalibrated business model creates an exhausting discount treadmill.
            Without differentiated brand perception, buyers default strictly to price comparison.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '520px' }}>
            {[
              'Purchasing impressions into an uncalibrated commercial funnel',
              'Commodity positioning forcing constant discount dependency',
              'Rising customer acquisition costs with declining unit economics',
              'High top-of-funnel churn without organic brand attachment',
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.65)',
                  lineHeight: 1.5,
                }}
              >
                <XCircle size={18} weight="duotone" color="#ff6b6b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Half: The Brandmania Architecture (Rich Imperial Violet Surface #190033) */}
        <div
          style={{
            background: 'linear-gradient(165deg, #1A0033 0%, #0A0015 100%)',
            padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2.5rem',
            position: 'relative',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-light-violet, #C882FF)',
                marginBottom: '1rem',
              }}
            >
              (04) / THE COMMERCIAL REMEDY &bull; BRAND ARCHITECTURE
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: 'clamp(2.6rem, 4.5vw, 4.5rem)',
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Brand architecture{' '}
              <span
                style={{
                  fontStyle: 'italic',
                  color: 'var(--color-brand-light-violet, #C882FF)',
                }}
              >
                commands margin.
              </span>
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '540px',
            }}
          >
            When Brand Direction, Margin Recovery, and Consumer Scope operate as a unified system,
            advertising amplifies an already profitable machine. Market perception commands premium pricing.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '520px' }}>
            {[
              'Brand direction establishes category prestige & pricing power',
              'Commanding price inelasticity where customers buy at full value',
              'Operational audits sealing leakage across the entire commercial chain',
              'Enduring identity attachment driving high-retention customer loops',
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '14px',
                  color: '#ffffff',
                  lineHeight: 1.5,
                }}
              >
                <CheckCircle size={18} weight="duotone" color="#C882FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\sections\HeroSection.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';
import { BrandEye } from '@/presentation/components/primitives/BrandEye';
import { BLUR_PLACEHOLDERS } from '@/content/blurPlaceholders';
import { runViewTransition } from '@/presentation/utils/viewTransition';

export const HeroSection: React.FC = () => {
  const [perspective, setPerspective] = useState<'preference' | 'price'>('preference');

  const switchPerspective = useCallback((next: 'preference' | 'price') => {
    runViewTransition(() => {
      setPerspective(next);
    });
  }, []);

  // #4 Keyboard Shortcuts 1 and 2 for Hero Perspective Switcher
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (!isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (e.key === '1') {
          e.preventDefault();
          switchPerspective('preference');
        } else if (e.key === '2') {
          e.preventDefault();
          switchPerspective('price');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [switchPerspective]);

  return (
    <section
      id="hero"
      style={{
        minHeight: '94vh',
        width: '100%',
        maxWidth: '100vw',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        padding: '0 clamp(1.5rem, 3vw, 4rem)',
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* TIER 1: Top Architectural Index Strip (Full-Width 4-Column Hairline Grid) */}
      <div
        className="tabular-nums"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: 'var(--space-4) 0',
          gap: 'var(--space-4)',
          fontFamily: 'var(--font-Mono), monospace',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted, #7c7e94)',
        }}
      >
        <div style={{ color: '#ffffff', fontWeight: 600 }}>
          (01) / BRANDMANIA&reg;
        </div>
        <div>
          BRAND DIRECTION &bull; MARGIN RECOVERY &bull; CONSUMER SCOPE
        </div>
        <div style={{ color: 'var(--color-brand-light-violet, #c084fc)' }}>
          CLIENT THRESHOLD: $700,000+ ANNUAL REVENUE
        </div>
        <div style={{ textAlign: 'right', color: '#ffffff' }}>
          LET&rsquo;S MAKE YOU A MARKET LEADER
        </div>
      </div>

      {/* TIER 2: Centerpiece Visual Stage & Interactive Lens */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(320px, 46vh, 520px)',
          margin: 'clamp(var(--space-4), 2vh, var(--space-6)) 0',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          overflow: 'hidden',
          backgroundColor: '#07050a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Authentic Liquid Violet Marble Texture with 85% Opacity and Blur LQIP */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.85,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <Image
            src="/brand/textures/brandmania-cover-clean.jpg"
            alt="BRANDMANIA — Liquid violet marble materiality cover artwork depicting high-ticket brand perception"
            fill
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDERS.coverClean}
            style={{
              objectFit: 'cover',
              filter: 'contrast(1.35) saturate(1.25) brightness(0.9)',
            }}
            priority
          />
        </div>

        {/* Framing Corner Arcs */}
        <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none' }}>
          <CornerArcs position="top-left" size={140} opacity={0.35} color="#8E00FA" strokeWidth={10} />
        </div>
        <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 2, pointerEvents: 'none' }}>
          <CornerArcs position="top-right" size={140} opacity={0.35} color="#8E00FA" strokeWidth={10} />
        </div>

        {/* Center Stage Brand Eye Watermark Geometry */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(280px, 35vw, 480px)',
            height: 'clamp(280px, 35vw, 480px)',
            zIndex: 2,
            opacity: 0.28,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 40px rgba(142, 0, 250, 0.6))',
          }}
        >
          <BrandEye size="xl" glow={true} idSuffix="heroCenterEye" />
        </div>

        {/* Top-Left Stage Datum Label */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            padding: 'var(--space-4) var(--space-6)',
            fontFamily: 'var(--font-Mono), monospace',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8E00FA' }} />
          <span>TACTILE PERCEPTION STAGE &bull; THE LIQUID COVER TEXTURE</span>
        </div>

        {/* Bottom-Right Sleek Frameless Horizontal Architectural Toggle & 1-Sentence Thesis */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            padding: 'var(--space-4) clamp(var(--space-4), 3vw, var(--space-8))',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            background: 'linear-gradient(180deg, transparent 0%, rgba(7, 7, 9, 0.88) 100%)',
          }}
        >
          {/* Razor-Sharp 1-Sentence Thesis Overlay (Both Perspectives Rendered in SSR DOM) */}
          <div style={{ maxWidth: '640px' }}>
            <AnimatePresence mode="wait">
              {perspective === 'preference' ? (
                <motion.div
                  key="pref"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-serif), Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
                      color: '#ffffff',
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    &ldquo;Strategic brand architecture compounds pricing power and insulates gross margin against commoditization.&rdquo;
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="price"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-serif), Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
                      color: '#ff9494',
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    &ldquo;Uncalibrated media spend without brand authority turns customer acquisition into an unsustainable discount treadmill.&rdquo;
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Semantic definition block ensuring AI extractors and crawlers parse both core perspectives in SSR DOM */}
            <div
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: 0,
              }}
              aria-hidden="false"
            >
              <dl>
                <dt>Command Preference Perspective</dt>
                <dd>Strategic brand architecture compounds pricing power and insulates gross margin against commoditization.</dd>
                <dt>Compete on Price Perspective</dt>
                <dd>Uncalibrated media spend without brand authority turns customer acquisition into an unsustainable discount treadmill.</dd>
              </dl>
            </div>
          </div>

          {/* Frameless Horizontal Architectural Toggle (Zero SaaS Cards) with Shortcut Keycaps */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              fontFamily: 'var(--font-Mono), monospace',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <button
              type="button"
              onClick={() => switchPerspective('preference')}
              className="hit-slop"
              style={{
                background: perspective === 'preference' ? 'rgba(142, 0, 250, 0.25)' : 'transparent',
                border: 'none',
                borderBottom: perspective === 'preference' ? '2px solid #C084FC' : '1px solid rgba(255, 255, 255, 0.2)',
                color: perspective === 'preference' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                padding: '6px 12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                fontWeight: perspective === 'preference' ? 700 : 400,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>01 COMMAND PREFERENCE</span>
              <kbd style={{ fontSize: '9px', padding: '1px 3px' }}>1</kbd>
            </button>

            <button
              type="button"
              onClick={() => switchPerspective('price')}
              className="hit-slop"
              style={{
                background: perspective === 'price' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                border: 'none',
                borderBottom: perspective === 'price' ? '2px solid #ff6b6b' : '1px solid rgba(255, 255, 255, 0.2)',
                color: perspective === 'price' ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                padding: '6px 12px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                fontWeight: perspective === 'price' ? 700 : 400,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>02 COMPETE ON PRICE</span>
              <kbd style={{ fontSize: '9px', padding: '1px 3px' }}>2</kbd>
            </button>
          </div>
        </div>
      </div>

      {/* TIER 3: Bottom Monumental Display Lockup (Full 94vw Span) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-6)',
          paddingBottom: 'clamp(var(--space-6), 3vh, var(--space-10))',
          paddingTop: 'var(--space-4)',
        }}
      >
        {/* Massive Instrument Serif H1: "Branded for the Best." */}
        <h1
          style={{
            fontFamily: 'var(--font-Editorial), Georgia, serif',
            fontSize: 'clamp(4.5rem, 10.5vw, 11.5rem)',
            fontWeight: 400,
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            margin: 0,
            padding: 0,
          }}
        >
          Branded for{' '}
          <em
            style={{
              fontFamily: 'var(--font-Editorial), Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#C882FF',
            }}
          >
            the Best.
          </em>
        </h1>

        <div style={{ maxWidth: '30rem', paddingBottom: 'clamp(0.5rem, 1.5vw, 1.8rem)' }}>
          <p
            style={{
              margin: '0 0 1.25rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'var(--font-sans), sans-serif',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
              lineHeight: 1.55,
            }}
          >
            We rebuild how your brand is perceived, seal silent commercial leakage, and engineer category preference.
          </p>
          {/* Quiet, direct path for ready decision-makers. */}
          <a
            href="#qualification"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-Sans), -apple-system, sans-serif',
              fontSize: 'clamp(14px, 1.1vw, 18px)',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textDecoration: 'none',
              borderBottom: '1px solid #C882FF',
              paddingBottom: '4px',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#C882FF';
              e.currentTarget.style.borderBottomWidth = '2px';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderBottomWidth = '1px';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Request Strategic Consultation</span>
            <ArrowUpRight size={20} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\sections\MarginRecoverySection.tsx

'use client';

import React, { useState, useRef } from 'react';
import { Section } from '@/presentation/components/layout/Section';
import { useSafeTriangle } from '@/presentation/hooks/useSafeTriangle';

interface AuditRow {
  step: string;
  stage: string;
  leakage: string;
  repair: string;
}

export const MarginRecoverySection: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const { handleRowHover } = useSafeTriangle({
    detailRef: detailPanelRef,
    suppressionDelayMs: 180,
  });

  const auditRows: AuditRow[] = [
    {
      step: '01',
      stage: 'Planning',
      leakage:
        'Uncalibrated contribution margins and ad spend deployed without unit-economic floors.',
      repair:
        'Recalibrating contribution profit floors so every dollar deployed yields verified margin.',
    },
    {
      step: '02',
      stage: 'Marketing',
      leakage:
        'Purchasing low-intent traffic with commoditized messaging that attracts discount seekers.',
      repair:
        'Disciplined messaging aligned strictly with premium buyers, extinguishing media waste.',
    },
    {
      step: '03',
      stage: 'Sales',
      leakage:
        'Unresolved hesitation on high-ticket tiers causing reps to default to price cuts.',
      repair:
        'Hardening conversion architecture and offer framing so buyers purchase at full price.',
    },
    {
      step: '04',
      stage: 'Fulfillment',
      leakage:
        'Operational bottlenecks and handoff friction silently degrading margins as scale grows.',
      repair:
        'Optimizing fulfillment velocity and operational standards to preserve margin through scale.',
    },
    {
      step: '05',
      stage: 'Customer Service',
      leakage:
        'Reactive ticket handling triggering avoidable refund spikes and disputed charges.',
      repair:
        'Transforming support into an active trust protector that resolves doubt before refund demands.',
    },
    {
      step: '06',
      stage: 'Post-Purchase Relationships',
      leakage:
        'Treating transactions as terminal events, trapping the brand on the high-CAC acquisition wheel.',
      repair:
        'Engineering post-purchase affirmation rituals and recurring loyalty loops to maximize lifetime value.',
    },
  ];

  return (
    <Section
      id="margin-recovery"
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 3vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      {/* Tier 1: Swiss Architectural Index Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '0.85rem 0',
          marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.55)',
        }}
      >
        <div>
          <span style={{ color: '#C882FF', marginRight: '6px' }}>(03)</span> / FLAGSHIP II
        </div>
        <div>OPERATIONAL CHAIN AUDIT</div>
        <div>MARGIN RECOVERY ARCHITECTURE</div>
        <div style={{ textAlign: 'right' }}>6-STAGE COMMERCIAL DRAIN REPAIR</div>
      </div>

      {/* Tier 2: Editorial Monumental Display Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'clamp(1rem, 2vw, 2.5rem)',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
          alignItems: 'baseline',
        }}
      >
        <div style={{ gridColumn: 'span 12' }}>
          <h2
            style={{
              fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: 0,
            }}
          >
            Fix the commercial machine{' '}
            <span
              style={{
                fontStyle: 'italic',
                color: 'var(--color-brand-light-violet, #C882FF)',
              }}
            >
              before buying more traffic.
            </span>
          </h2>
        </div>
      </div>

      {/* Tier 3: Full-Bleed 94vw Swiss Architectural Audit Table */}
      <div
        style={{
          width: '100%',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Table Header Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '70px minmax(240px, 1.2fr) minmax(260px, 1.4fr) minmax(260px, 1.4fr)',
            gap: 'clamp(1rem, 2vw, 2.5rem)',
            padding: '1rem 1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.45)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <div>Index</div>
          <div>Operational Stage</div>
          <div>Where Commercial Value Leaks</div>
          <div>Strategic &amp; Operational Repair</div>
        </div>

        {/* 6 Large Horizontal Rows */}
        {auditRows.map((row, idx) => {
          const isHovered = hoveredRow === idx;
          return (
            <div
              key={row.step}
              onMouseEnter={() => handleRowHover(() => setHoveredRow(idx))}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '70px minmax(240px, 1.2fr) minmax(260px, 1.4fr) minmax(260px, 1.4fr)',
                gap: 'clamp(1rem, 2vw, 2.5rem)',
                padding: 'clamp(1.5rem, 3vh, 2.5rem) 1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                alignItems: 'center',
                background: isHovered ? 'rgba(142, 0, 250, 0.06)' : 'transparent',
                borderLeft: isHovered ? '2px solid #C882FF' : '2px solid transparent',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'default',
              }}
            >
              {/* Step Index */}
              <div
                className="tabular-nums"
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: isHovered ? '#C882FF' : 'rgba(255, 255, 255, 0.4)',
                  letterSpacing: '0.08em',
                  transition: 'color 0.2s ease',
                }}
              >
                {row.step}
              </div>

              {/* Stage Title in Instrument Serif 2.5rem */}
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)',
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.92)',
                    margin: 0,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {row.stage}
                </h3>
              </div>

              {/* Crisp 1-Line Commercial Leakage Statement */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {row.leakage}
                </p>
              </div>

              {/* Crisp 1-Line Strategic Repair Statement (Safe Triangle Detail Target) */}
              <div ref={isHovered ? detailPanelRef : undefined}>
                <p
                  style={{
                    fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                    fontSize: '14px',
                    color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                    lineHeight: 1.5,
                    margin: 0,
                    padding: '8px 12px',
                    background: isHovered ? 'rgba(142, 0, 250, 0.16)' : 'rgba(255, 255, 255, 0.02)',
                    border: isHovered
                      ? '1px solid rgba(200, 130, 255, 0.35)'
                      : '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '2px',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {row.repair}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\sections\MethodologySection.tsx

'use client';

import React from 'react';
import { Container } from '@/presentation/components/layout/Container';
import { Section } from '@/presentation/components/layout/Section';

interface Phase {
  num: string;
  name: string;
  focus: string;
  deliverables: string;
}

export const MethodologySection: React.FC = () => {
  const phases: Phase[] = [
    {
      num: '01',
      name: 'Forensic Diagnostic & Market Audit',
      focus: 'Perception, Funnel & Economics Synthesis',
      deliverables:
        'We audit your public brand touchpoints, commercial funnel stages, and unit economics to pinpoint hidden leakage points across perception, conversion, and fulfillment before proposing any intervention.',
    },
    {
      num: '02',
      name: 'Strategic Architecture & Position Blueprint',
      focus: 'Brand Direction & Margin Restoration Strategy',
      deliverables:
        'We establish your definitive category positioning, executive tone of voice, psychological pricing tiers, and operational stabilization milestones.',
    },
    {
      num: '03',
      name: 'Systemic Touchpoint & Workflow Engineering',
      focus: 'Consumer Scope & Operational Alignment',
      deliverables:
        'Full implementation across every touchpoint: bespoke visual systems, behavioral decision heuristics, post-purchase retention loops, and connected operational pipelines.',
    },
    {
      num: '04',
      name: 'Acquisition Scaling & Margin Governance',
      focus: 'Media Calibration & Category Leadership',
      deliverables:
        'Deploying high-intent acquisition media into a sealed, high-margin commercial machine. Ongoing executive governance of perceived value, customer LTV, and enterprise equity.',
    },
  ];

  return (
    <Section
      id="methodology"
      spacing="none"
      style={{
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        paddingTop: 'var(--space-24)',
        paddingBottom: 'var(--space-24)',
        overflow: 'hidden',
      }}
    >
      <Container>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          {/* Subtle Datum Marker */}
          <div
            style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-light-violet)',
              marginBottom: 'var(--space-12)',
            }}
          >
            ENGAGEMENT METHODOLOGY &bull; COMMERCIAL RIGOR
          </div>

          {/* Monumental Headline */}
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(2.75rem, 5.5vw, 4.8rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
                maxWidth: '960px',
              }}
            >
              Institutional Precision.
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 1.35vw, 1.3rem)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                maxWidth: '740px',
                marginTop: 'var(--space-4)',
                margin: 0,
              }}
            >
              Every diagnostic engagement is anchored in audited commercial analysis, transparent
              unit-economic frameworks, and strict executive confidentiality.
            </p>
          </div>

          {/* 4-Phase Process Ledger (Zero cards) */}
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            {phases.map((phase) => (
              <div
                key={phase.num}
                style={{
                  paddingTop: 'var(--space-8)',
                  paddingBottom: 'var(--space-8)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'grid',
                  gridTemplateColumns: '80px minmax(0, 1fr) minmax(0, 1.4fr)',
                  gap: 'var(--space-8)',
                  alignItems: 'baseline',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '12px',
                    color: '#8E00FA',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}
                >
                  PHASE {phase.num}
                </span>

                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: 'var(--font-size-xl)',
                      fontWeight: 700,
                      color: '#ffffff',
                      margin: '0 0 var(--space-2)',
                    }}
                  >
                    {phase.name}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '11px',
                      color: 'var(--color-brand-light-violet)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {phase.focus}
                  </div>
                </div>

                <p
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {phase.deliverables}
                </p>
              </div>
            ))}
          </div>

          {/* Institutional Client Confidentiality Commitment */}
          <div
            style={{
              marginTop: 'var(--space-16)',
              padding: 'var(--space-10)',
              background: '#0E0E13',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.7fr)',
              gap: 'var(--space-10)',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#8E00FA',
                  marginBottom: 'var(--space-2)',
                }}
              >
                Executive Discretion Under Non-Disclosure
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 var(--space-3)',
                }}
              >
                Protecting Enterprise Strategy
              </h4>
              <p
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Our client partners operate in highly competitive national and international markets.
                In accordance with mutual non-disclosure agreements, we protect proprietary commercial
                metrics, customer data, and brand strategy files.
              </p>
            </div>

            <div
              style={{
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                paddingLeft: 'var(--space-8)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: '#ffffff',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-3)',
                  fontWeight: 700,
                }}
              >
                Engagement Scope
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '11px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 2,
                }}
              >
                <li>&bull; Established product/service craftsmanship</li>
                <li>&bull; Minimum $700,000+ annual revenue</li>
                <li>&bull; Direct founder/executive involvement</li>
                <li>&bull; Willingness to calibrate machine before media scale</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\sections\QualificationSection.tsx

'use client';

import React from 'react';
import { LockKey, ShieldCheck, Sparkle } from '@phosphor-icons/react';
import { Section } from '@/presentation/components/layout/Section';
import { QualificationForm } from '@/presentation/components/forms/QualificationForm';
import { CornerArcs } from '@/presentation/components/brand/CornerArcs';

export const QualificationSection: React.FC = () => {
  return (
    <Section
      id="qualification"
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 3vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      <CornerArcs position="top-right" size={320} opacity={0.08} color="#C882FF" />

      {/* Tier 1: Swiss Architectural Index Strip */}
      <div
        className="tabular-nums"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '0.85rem 0',
          marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.55)',
        }}
      >
        <div>
          <span style={{ color: '#C882FF', marginRight: '6px' }}>(10)</span> / STRATEGIC INTAKE
        </div>
        <div>EXECUTIVE QUALIFICATION</div>
        <div>THRESHOLD: $700,000+ ANNUAL REVENUE</div>
        <div style={{ textAlign: 'right' }}>STRICT NON-DISCLOSURE PROTOCOL</div>
      </div>

      {/* Tier 2: Split Architectural Plane */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'flex-start',
        }}
      >
        {/* Left Column: Criteria & Directives */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(2.8rem, 5vw, 5rem)',
                fontWeight: 400,
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Request a private{' '}
              <span
                style={{
                  fontStyle: 'italic',
                  color: 'var(--color-brand-light-violet, #C882FF)',
                }}
              >
                briefing.
              </span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.6,
                marginTop: '1.25rem',
                margin: '1.25rem 0 0 0',
                maxWidth: '520px',
              }}
            >
              A selective Strategic Consultation Dossier for established enterprises generating $700,000+
              in annual revenue. We review commercial and perceptual context before the meeting.
            </p>
          </div>

          {/* Consultation Protocols */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              paddingTop: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={20} weight="duotone" color="#C882FF" />
              <span
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '13.5px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontWeight: 500,
                }}
              >
                Direct Consultation with Strategic Brand &amp; Commercial Leadership
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkle size={20} weight="duotone" color="#C882FF" />
              <span
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '13.5px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontWeight: 500,
                }}
              >
                Preliminary Commercial Audit Prepared Prior to Meeting
              </span>
            </div>
          </div>

          {/* Strict Non-Disclosure Protocol */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <LockKey size={20} weight="duotone" color="#C882FF" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                }}
              >
                Strict Non-Disclosure Protocol
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.55)',
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: '460px',
                }}
              >
                All commercial metrics, positioning notes, and proprietary operational discussions
                are governed under standard executive non-disclosure confidentiality.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Intake Form */}
        <div
          style={{
            borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
            paddingLeft: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          <QualificationForm />
        </div>
      </div>

      {/* Tier 3: Verified Architectural FAQ Accordion */}
      <div
        id="faq"
        style={{
          marginTop: 'clamp(4rem, 8vw, 7rem)',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'start',
          }}
        >
          {/* FAQ Column Header */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#C882FF',
                marginBottom: '1rem',
              }}
            >
              (08) / VERIFIED DIRECTIVES &bull; FAQ
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: 'clamp(2.2rem, 3.8vw, 3.6rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Frequently Clarified{' '}
              <span style={{ fontStyle: 'italic', color: '#C882FF' }}>
                Principles.
              </span>
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                fontSize: '13.5px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 1.6,
                marginTop: '1rem',
                maxWidth: '440px',
              }}
            >
              Truthful, strictly verified facts regarding engagement parameters, core disciplines, and advisory models.
            </p>
          </div>

          {/* FAQ Accordion List (100% Rendered in SSR DOM) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            {[
              {
                q: 'What types of businesses does BRANDMANIA work with?',
                a: 'Established businesses generating $700,000+ in annual revenue and high-ticket international brands across design, jewelry, interior design, luxury construction, hospitality, fitness, supplements, software/apps, cosmetics, e-commerce, medical devices, and more.',
              },
              {
                q: "What are BRANDMANIA's three core disciplines?",
                a: 'Brand Direction, Margin Recovery, and Consumer Scope.',
              },
              {
                q: 'Does BRANDMANIA offer consultancy if we are not ready for a full engagement?',
                a: 'Yes, BRANDMANIA offers strategic consultancy for businesses not yet ready for a full rebuild or when full-engagement capacity is full.',
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                open
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                  padding: '1.25rem 0',
                }}
              >
                <summary
                  style={{
                    fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                    fontSize: 'clamp(1.2rem, 1.6vw, 1.45rem)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <span>{faq.q}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '11px',
                      color: '#C882FF',
                    }}
                  >
                    [0{idx + 1}]
                  </span>
                </summary>
                <p
                  style={{
                    fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                    fontSize: '13.5px',
                    color: 'rgba(255, 255, 255, 0.75)',
                    lineHeight: 1.65,
                    margin: '0.85rem 0 0 0',
                    maxWidth: '680px',
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\sections\SystemSection.tsx

'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Section } from '@/presentation/components/layout/Section';

interface SystemNode {
  step: string;
  title: string;
  discipline: string;
  description: string;
}

export const SystemSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 25%'],
  });

  const pathProgress = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  const nodes: SystemNode[] = [
    {
      step: '01',
      title: 'Identity & Narrative',
      discipline: 'Brand Direction',
      description:
        'Defines positioning, USP, and authoritative tone of voice before capital enters the market.',
    },
    {
      step: '02',
      title: 'Market Perception',
      discipline: 'Strategic Alignment',
      description:
        'Harmonizes internal capability with external prestige, eliminating commodity discounting.',
    },
    {
      step: '03',
      title: 'Consumer Psychology',
      discipline: 'Consumer Scope',
      description:
        'Decodes behavioral biases, status cues, and identity attachment to create irrational loyalty.',
    },
    {
      step: '04',
      title: 'Pricing Power',
      discipline: 'Margin Architecture',
      description:
        'Commands premium price inelasticity where buyers choose certainty over low price.',
    },
    {
      step: '05',
      title: 'Commercial Performance',
      discipline: 'Margin Recovery',
      description:
        'Audits and repairs data leakage across the entire commercial chain before scaling ad spend.',
    },
    {
      step: '06',
      title: 'Category Dominance',
      discipline: 'Enduring Equity',
      description:
        'The cumulative commercial outcome: protected margin, compounding retention, and pricing leverage.',
    },
  ];

  return (
    <Section
      id="system"
      ref={sectionRef}
      spacing="none"
      style={{
        backgroundColor: 'var(--surface-obsidian, #070709)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 3vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      {/* Tier 1: Swiss Architectural Index Strip */}
      <div
        className="tabular-nums"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '0.85rem 0',
          marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.55)',
        }}
      >
        <div>
          <span style={{ color: '#C882FF', marginRight: '6px' }}>(04)</span> / THE SYSTEM
        </div>
        <div>CONTINUOUS CAUSAL VALUE CHAIN</div>
        <div>END-TO-END COMMERCIAL ENGINE</div>
        <div style={{ textAlign: 'right' }}>6 INTERLOCKED NODES</div>
      </div>

      {/* Tier 2: Editorial Monumental Display Header */}
      <div style={{ marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-serif), Georgia, serif',
            fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            color: '#ffffff',
            margin: 0,
            maxWidth: '1100px',
          }}
        >
          From perception upstream{' '}
          <span
            style={{
              fontStyle: 'italic',
              color: 'var(--color-brand-light-violet, #C882FF)',
            }}
          >
            to cash flow downstream.
          </span>
        </h2>
      </div>

      {/* Connected SVG Pipeline Drawing Line */}
      <div style={{ position: 'relative', width: '100%', marginBottom: '2rem' }}>
        <svg
          viewBox="0 0 1200 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '28px', display: 'block' }}
        >
          <line x1="0" y1="20" x2="1200" y2="20" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4 4" />
          <motion.line
            x1="0"
            y1="20"
            x2="1200"
            y2="20"
            stroke="#C882FF"
            strokeWidth="2"
            style={{ pathLength: pathProgress }}
          />
          {[100, 300, 500, 700, 900, 1100].map((cx, i) => (
            <circle
              key={i}
              cx={cx}
              cy="20"
              r="5"
              fill="#070709"
              stroke="#C882FF"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>

      {/* 6-Column Edge-to-Edge Swiss Architectural Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'rgba(255, 255, 255, 0.12)',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        {nodes.map((node) => (
          <div
            key={node.step}
            style={{
              background: '#070709',
              padding: 'clamp(1.5rem, 3vh, 2.5rem) 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              transition: 'background 0.2s ease',
            }}
          >
            {/* Step Number in Instrument Serif */}
            <div
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: 'clamp(2.5rem, 3.5vw, 3.2rem)',
                fontWeight: 400,
                lineHeight: 1,
                color: '#C882FF',
                letterSpacing: '-0.02em',
              }}
            >
              {node.step}
            </div>

            {/* Discipline Tag */}
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.45)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {node.discipline}
            </div>

            {/* Stage Title */}
            <h3
              style={{
                fontFamily: 'var(--font-editorial, var(--font-Editorial), Georgia, serif)',
                fontSize: '1.35rem',
                fontWeight: 400,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {node.title}
            </h3>

            {/* Concise Mechanism Description */}
            <p
              style={{
                fontFamily: 'var(--font-sans, "Plus Jakarta Sans", sans-serif)',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {node.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\sections\WorldviewSection.tsx

'use client';

import React from 'react';

export const WorldviewSection: React.FC = () => {
  return (
    <section
      id="manifesto"
      style={{
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        padding: 'clamp(var(--space-16), 8vw, var(--space-28)) clamp(1.5rem, 3vw, 4rem)',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 12-Column Swiss Architectural Grid Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'var(--space-6)',
          alignItems: 'start',
        }}
      >
        {/* Left Exposed Index Column (Cols 1-2) */}
        <div
          style={{
            gridColumn: 'span 2',
            fontFamily: 'var(--font-Mono), monospace',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-brand-light-violet, #c084fc)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: 'var(--space-3)',
          }}
        >
          (02) / MANIFESTO
        </div>

        {/* Monumental Instrument Serif Statement Spanning 10 Columns */}
        <div
          style={{
            gridColumn: 'span 10',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-8), 4vw, var(--space-12))',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-Editorial), Georgia, serif',
              fontSize: 'clamp(3.2rem, 6.5vw, 6.8rem)',
              fontWeight: 400,
              lineHeight: 0.96,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: 0,
            }}
          >
            Branding is not what it looks like.{' '}
            <em
              style={{
                fontFamily: 'var(--font-Editorial), Georgia, serif',
                fontStyle: 'italic',
                color: '#C882FF',
              }}
            >
              It is how you communicate.
            </em>{' '}
            Attention does not mean revenue.
          </h2>

          {/* Clean Razor-Sharp Architectural Footnote */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              paddingTop: 'var(--space-6)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-Editorial), Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
                color: 'rgba(255, 255, 255, 0.75)',
                margin: 0,
                maxWidth: '720px',
              }}
            >
              &ldquo;Let people applaud your second to greatest work, because you&rsquo;re creating your greatest.&rdquo;
            </p>

            <span
              style={{
                fontFamily: 'var(--font-Mono), monospace',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted, #7c7e94)',
              }}
            >
              THE BRANDMANIA DOCTRINE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};


### FILE: E:\Ibrahim's website\src\presentation\components\seo\JsonLd.tsx

import React from 'react';

export interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}


### FILE: E:\Ibrahim's website\src\presentation\components\seo\StructuredData.tsx

import React from 'react';
import {
  generateSchemaGraph,
  type SchemaGraphOptions,
  type JsonLdGraph,
} from '@/infrastructure/seo/schemaGraph';

export interface StructuredDataProps extends SchemaGraphOptions {
  customGraph?: JsonLdGraph;
}

/**
 * React Server Component that injects the complete, production-grade
 * Schema.org JSON-LD @graph script into the Server-Side HTML.
 */
export const StructuredData: React.FC<StructuredDataProps> = ({
  customGraph,
  ...options
}) => {
  const graph = customGraph || generateSchemaGraph(options);

  // Safe stringify: escape '<' to prevent closing </script> tags in payload
  const jsonLdString = JSON.stringify(graph).replace(/</g, '\\u003c');

  return (
    <script
      id="structured-data-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
};


### FILE: E:\Ibrahim's website\src\presentation\hooks\useSafeTriangle.ts

import { useRef, useCallback, useEffect } from 'react';

export interface Point {
  x: number;
  y: number;
}

/**
 * 2D vector cross-product sign test for point-in-triangle inclusion
 */
export function sign(p1: Point, p2: Point, p3: Point): number {
  return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

/**
 * Mathematical test: checks if point pt is inside triangle formed by vertices v1, v2, v3
 */
export function isPointInTriangle(pt: Point, v1: Point, v2: Point, v3: Point): boolean {
  const d1 = sign(pt, v1, v2);
  const d2 = sign(pt, v2, v3);
  const d3 = sign(pt, v3, v1);

  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;

  return !(hasNeg && hasPos);
}

export interface UseSafeTriangleOptions {
  detailRef: React.RefObject<HTMLElement | null>;
  suppressionDelayMs?: number;
}

export function useSafeTriangle({
  detailRef,
  suppressionDelayMs = 180,
}: UseSafeTriangleOptions) {
  const currentCursorRef = useRef<Point>({ x: 0, y: 0 });
  const prevCursorRef = useRef<Point>({ x: 0, y: 0 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      prevCursorRef.current = currentCursorRef.current;
      currentCursorRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const isCursorInSafeTriangle = useCallback((): boolean => {
    if (!detailRef.current) return false;
    const rect = detailRef.current.getBoundingClientRect();
    
    // Triangle vertices:
    // v1: starting cursor position
    // v2: top-left corner of active detail pane
    // v3: bottom-left corner of active detail pane
    // (or right corners if detail pane is to the left of the cursor)
    const isDetailToLeft = rect.right < currentCursorRef.current.x;
    const targetX = isDetailToLeft ? rect.right : rect.left;

    const v1: Point = prevCursorRef.current.x === 0 ? currentCursorRef.current : prevCursorRef.current;
    const v2: Point = { x: targetX, y: rect.top };
    const v3: Point = { x: targetX, y: rect.bottom };

    return isPointInTriangle(currentCursorRef.current, v1, v2, v3);
  }, [detailRef]);

  const handleRowHover = useCallback(
    (onActivate: () => void) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (isCursorInSafeTriangle()) {
        // Suppress accidental switch while diagonal movement to detail panel is underway
        timerRef.current = setTimeout(() => {
          onActivate();
        }, suppressionDelayMs);
      } else {
        // Immediate switch
        onActivate();
      }
    },
    [isCursorInSafeTriangle, suppressionDelayMs]
  );

  return {
    handleRowHover,
    isCursorInSafeTriangle,
  };
}


### FILE: E:\Ibrahim's website\src\presentation\styles\globals.css

@import './tokens.css';
@import './reset.css';

/* Global Swiss Editorial Root */
html,
body {
  background-color: var(--color-bg-base);
  color: var(--color-text-primary);
  font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: var(--font-size-base);
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

/* Headings strictly mapped to Instrument Serif / Editorial Serif (NEVER Arial / sans-serif!) */
h1,
h2,
h3,
h4,
h5,
h6,
blockquote,
.display-headline {
  font-family: var(--font-serif), Georgia, serif !important;
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.05;
  text-wrap: balance;
}

/* Editorial Body Copy with balanced wrapping */
p,
li,
.editorial-p {
  text-wrap: pretty;
}

/* Tabular Numerals (#16) applied to numerals, indexes, metrics, inputs */
.tabular-nums,
input,
select,
textarea,
[data-numeral],
[data-metric],
.font-mono {
  font-variant-numeric: tabular-nums lining-nums;
  -webkit-font-feature-settings: "tnum" 1, "lnum" 1;
  font-feature-settings: "tnum" 1, "lnum" 1;
}

/* Italic Emphasized Editorial Styling */
em,
.font-italic {
  font-family: var(--font-serif), Georgia, serif !important;
  font-style: italic !important;
}

/* Monospace & Datum Code */
code,
kbd,
samp,
.font-mono {
  font-family: var(--font-mono), 'JetBrains Mono', Consolas, monospace !important;
  font-variant-numeric: tabular-nums lining-nums;
}

/* #4 Shortcut Keycaps */
kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 0.4rem;
  font-size: 10px;
  line-height: 1;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
  vertical-align: middle;
}

/* #13 Hit Slop (Expanded Invisible Touch/Click Targets) */
.hit-slop {
  position: relative;
}
.hit-slop::after {
  content: "";
  position: absolute;
  inset: -12px;
  min-width: 44px;
  min-height: 44px;
  pointer-events: auto;
}

/* #18 Continuous Corners (Optical Squircle Smoothing for floating surfaces) */
.squircle-surface {
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
}

/* #14 Safe Area Inset Helper */
.safe-area-header {
  padding-top: max(1rem, env(safe-area-inset-top, 0px));
  padding-left: max(1.5rem, env(safe-area-inset-left, 0px));
  padding-right: max(1.5rem, env(safe-area-inset-right, 0px));
}

.safe-area-bottom {
  padding-bottom: max(1.25rem, env(safe-area-inset-bottom, 0px));
}

/* Lenis Smooth Scroll Recommended Styles */
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}

/* Accessibility Focus Visible */
:focus-visible {
  outline: 2px solid var(--color-brand-neon-violet);
  outline-offset: 2px;
}

/* Scrollbar Customization */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-base);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-sm);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-brand-neon-violet);
}

/* The presentation uses data-dense editorial grids on wide displays. At narrow
   widths those grids become an ordered reading sequence instead of overflow. */
@media (max-width: 760px) {
  [style*='grid-template-columns'][style*='minmax('] {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  #manifesto > div,
  #disciplines > div:last-child {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  #manifesto > div > div,
  #disciplines > div:last-child > div {
    grid-column: 1 / -1 !important;
  }

  #disciplines > div:last-child > div:first-child {
    position: static !important;
  }

  #margin-recovery [style*='grid-template-columns'],
  #consumer-scope [style*='grid-template-columns'] {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  #consumer-scope [style*='minmax(60px'] > :first-child,
  #consumer-scope [style*='minmax(60px'] > :last-child {
    display: none;
  }
}

@keyframes architecturalShimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}


### FILE: E:\Ibrahim's website\src\presentation\styles\reset.css

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
}

body {
  min-height: 100vh;
  line-height: var(--line-height-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  background: none;
  border: none;
}

a {
  color: inherit;
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}


### FILE: E:\Ibrahim's website\src\presentation\styles\tokens.css

:root {
  /* ============================================================
     BRANDMANIA Tonal Surface Pacing & Color Architecture
     ============================================================ */
  --surface-obsidian: #070709;
  --surface-imperial: linear-gradient(165deg, #1A0033 0%, #090014 100%);
  --surface-exhibition-light: #F3F0EA;
  --color-museum-ink: #09080C;
  --color-museum-violet: #4A0099;
  --color-museum-muted: #2A2830;
  --color-museum-border: rgba(9, 8, 12, 0.12);

  --color-bg-base: var(--surface-obsidian);
  --color-bg-surface: #0e0e13;
  --color-bg-elevated: #161620;
  --color-bg-overlay: rgba(7, 7, 9, 0.88);
  --color-bg-glass: rgba(14, 14, 19, 0.75);

  --color-border-subtle: rgba(168, 85, 247, 0.12);
  --color-border-default: rgba(168, 85, 247, 0.22);
  --color-border-active: rgba(168, 85, 247, 0.55);
  --color-border-glow: rgba(192, 132, 252, 0.75);

  --color-text-primary: #FFFFFF;
  --color-text-secondary: #EAE6F0;
  --color-text-muted: #A8A0B8;
  --color-text-inverse: #070709;

  /* BRANDMANIA Accents: Imperial Royal Violet, Neon & Electric Spectrum */
  --color-brand-deep-violet: #32005c;
  --color-brand-primary-violet: #5e00a8;
  --color-brand-neon-violet: #8e00fa;
  --color-brand-light-violet: #c084fc;

  --color-accent-purple: #5e00a8;
  --color-accent-purple-light: #8e00fa;
  --color-accent-purple-bright: #c084fc;
  --color-accent-purple-dim: rgba(94, 0, 168, 0.16);
  --color-accent-purple-glow: rgba(142, 0, 250, 0.4);

  --color-accent-electric: #8e00fa;
  --color-accent-violet: #5e00a8;
  --color-accent-blue: #6366f1;

  /* Gradients */
  --gradient-brand-primary: linear-gradient(135deg, #8e00fa 0%, #5e00a8 50%, #32005c 100%);
  --gradient-brand-hover: linear-gradient(135deg, #c084fc 0%, #8e00fa 100%);
  --gradient-brand-subtle: linear-gradient(180deg, rgba(94, 0, 168, 0.2) 0%, rgba(7, 5, 10, 0) 100%);
  --gradient-purple-obsidian: radial-gradient(circle at 50% 0%, rgba(142, 0, 250, 0.25) 0%, rgba(7, 5, 10, 0) 70%);
  --gradient-card-surface: linear-gradient(135deg, rgba(22, 16, 36, 0.8) 0%, rgba(14, 10, 22, 0.9) 100%);

  /* Spotlight & Motion Canvas Variables */
  --mouse-x: 50%;
  --mouse-y: 50%;
  --spotlight-color: rgba(142, 0, 250, 0.12);

  /* Legacy mapping mapped to royal violet spectrum */
  --color-accent-gold: #8e00fa;
  --color-accent-gold-light: #c084fc;
  --color-accent-gold-dim: rgba(142, 0, 250, 0.12);
  --color-accent-gold-glow: rgba(142, 0, 250, 0.3);

  /* Semantic Feedback */
  --color-status-success: #10b981;
  --color-status-success-bg: rgba(16, 185, 129, 0.12);
  --color-status-warning: #f59e0b;
  --color-status-warning-bg: rgba(245, 158, 11, 0.12);
  --color-status-error: #ef4444;
  --color-status-error-bg: rgba(239, 68, 68, 0.12);
  --color-status-info: #3b82f6;
  --color-status-info-bg: rgba(59, 130, 246, 0.12);

  /* Editorial Typography Scale - Instrument Serif & Plus Jakarta Sans */
  /* next/font owns --font-serif, --font-sans and --font-mono on <html>. */
  --font-Editorial: var(--font-serif);
  --font-Sans: var(--font-sans);
  --font-Mono: var(--font-mono);
  --font-display: var(--font-serif), Georgia, serif;
  --font-editorial: var(--font-serif), Georgia, serif;
  --font-family-display: var(--font-serif), Georgia, serif;
  --font-family-serif: var(--font-serif), Georgia, serif;
  --font-family-sans: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-mono: var(--font-mono), monospace;

  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */
  --font-size-6xl: 4rem;      /* 64px */
  --font-size-7xl: 5.5rem;    /* 88px */
  --font-size-hero: clamp(2.5rem, 6vw, 6.5rem);

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.1;
  --line-height-snug: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Spacing Scale */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 18px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Shadows & Glow */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 14px rgba(0, 0, 0, 0.55);
  --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.7);
  --shadow-purple-glow: 0 0 25px rgba(121, 40, 202, 0.3);
  --shadow-purple-lg: 0 8px 36px rgba(121, 40, 202, 0.22);

  /* Elevation / Z-index */
  --z-base: 1;
  --z-sticky: 100;
  --z-dropdown: 200;
  --z-modal: 500;
  --z-toast: 1000;

  /* Motion & Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 400ms cubic-bezier(0.16, 1, 0.3, 1);

  /* Containers */
  --container-max-width: 1280px;
  --container-narrow-width: 860px;
  --container-padding: var(--space-6);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-fast: 0ms !important;
    --transition-base: 0ms !important;
    --transition-slow: 0ms !important;
  }
}


### FILE: E:\Ibrahim's website\src\presentation\utils\viewTransition.ts

/**
 * Safe View Transition Wrapper
 * Integrates with document.startViewTransition when available,
 * respecting prefers-reduced-motion, with instantaneous callback fallback.
 */

export function runViewTransition(callback: () => void | Promise<void>): void {
  if (typeof window === 'undefined') {
    callback();
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If user prefers reduced motion or startViewTransition is unsupported, execute immediately
  if (prefersReducedMotion || typeof document === 'undefined' || !('startViewTransition' in document)) {
    callback();
    return;
  }

  // Type-safe invocation of document.startViewTransition
  try {
    (document as unknown as { startViewTransition: (cb: () => void | Promise<void>) => unknown })
      .startViewTransition(() => {
        return callback();
      });
  } catch {
    callback();
  }
}


### FILE: E:\Ibrahim's website\src\presentation\__tests__\uxEngineeringPatterns.test.tsx

import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { IdempotencyStore } from '@/infrastructure/security/idempotency';
import { isPointInTriangle, sign } from '@/presentation/hooks/useSafeTriangle';
import { CommandMenu } from '@/presentation/components/navigation/CommandMenu';
import { UndoToast } from '@/presentation/components/primitives/UndoToast';

describe('UX Engineering Pattern #19: Server-Side Idempotency Store', () => {
  let store: IdempotencyStore;

  beforeEach(() => {
    store = new IdempotencyStore(1000); // 1 second TTL
  });

  it('allows the initial request to mark key in-flight', () => {
    const key = 'idem-req-1234';
    const firstAttempt = store.markInFlight(key);
    expect(firstAttempt).toBe(true);

    const record = store.get(key);
    expect(record).toBeDefined();
    expect(record?.status).toBe('IN_FLIGHT');
  });

  it('blocks concurrent duplicate requests with the same idempotency key', () => {
    const key = 'idem-req-1234';
    store.markInFlight(key);

    const duplicateAttempt = store.markInFlight(key);
    expect(duplicateAttempt).toBe(false);
  });

  it('stores and retrieves resolved cached response for identical keys', () => {
    const key = 'idem-req-5678';
    store.markInFlight(key);

    const responseData = { success: true, inquiryId: 'inq_999' };
    store.resolve(key, 201, responseData);

    const record = store.get(key);
    expect(record).toBeDefined();
    expect(record?.status).toBe('RESOLVED');
    expect(record?.response?.statusCode).toBe(201);
    expect(record?.response?.body).toEqual(responseData);

    // Further duplicate attempts while resolved are still blocked from starting fresh
    expect(store.markInFlight(key)).toBe(false);
  });

  it('evicts expired keys after TTL passes', () => {
    vi.useFakeTimers();
    const shortTtlStore = new IdempotencyStore(100);
    const key = 'idem-expiring';

    shortTtlStore.markInFlight(key);
    expect(shortTtlStore.get(key)).toBeDefined();

    vi.advanceTimersByTime(150);
    expect(shortTtlStore.get(key)).toBeUndefined();
    vi.useRealTimers();
  });
});

describe('UX Engineering Pattern #20: Amazon Safe Triangle Geometry', () => {
  // Test triangle vertices:
  // v1: (0, 0)
  // v2: (100, 0)
  // v3: (50, 100)
  const v1 = { x: 0, y: 0 };
  const v2 = { x: 100, y: 0 };
  const v3 = { x: 50, y: 100 };

  it('returns true for a point strictly inside the safe triangle polygon', () => {
    const insidePoint = { x: 50, y: 30 };
    expect(isPointInTriangle(insidePoint, v1, v2, v3)).toBe(true);
  });

  it('returns false for points clearly outside the safe triangle polygon', () => {
    const outsideTop = { x: 50, y: -10 };
    const outsideLeft = { x: -10, y: 50 };
    const outsideRight = { x: 110, y: 50 };
    const outsideBottom = { x: 50, y: 150 };

    expect(isPointInTriangle(outsideTop, v1, v2, v3)).toBe(false);
    expect(isPointInTriangle(outsideLeft, v1, v2, v3)).toBe(false);
    expect(isPointInTriangle(outsideRight, v1, v2, v3)).toBe(false);
    expect(isPointInTriangle(outsideBottom, v1, v2, v3)).toBe(false);
  });

  it('returns true for vertices and edge boundaries', () => {
    expect(isPointInTriangle(v1, v1, v2, v3)).toBe(true);
    expect(isPointInTriangle(v2, v1, v2, v3)).toBe(true);
    expect(isPointInTriangle(v3, v1, v2, v3)).toBe(true);

    const edgeMidpoint = { x: 50, y: 0 };
    expect(isPointInTriangle(edgeMidpoint, v1, v2, v3)).toBe(true);
  });

  it('correctly calculates the 2D cross product sign', () => {
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 10, y: 0 };
    const p3Above = { x: 5, y: 5 };
    const p3Below = { x: 5, y: -5 };

    expect(sign(p3Above, p1, p2)).toBeGreaterThan(0);
    expect(sign(p3Below, p1, p2)).toBeLessThan(0);
  });
});

describe('UX Engineering Pattern #3: Swiss Quick-Jump Command Menu', () => {
  it('does not render when isOpen is false', () => {
    render(<CommandMenu isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders with accessible role="dialog" and search input when isOpen is true', () => {
    render(<CommandMenu isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByPlaceholderText(/Jump to section/i)).toBeDefined();
  });

  it('renders all 10 index sections and engagement track options', () => {
    render(<CommandMenu isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText(/01/)).toBeDefined();
    expect(screen.getByText(/The Perception Arbitrage/i)).toBeDefined();
    expect(screen.getByText(/Worldview Manifesto/i)).toBeDefined();
    expect(screen.getByText(/Commercial Divide/i)).toBeDefined();
    expect(screen.getByText(/Integrated System/i)).toBeDefined();
    expect(screen.getByText(/Margin Recovery/i)).toBeDefined();
    expect(screen.getByText(/Consumer Scope/i)).toBeDefined();
    expect(screen.getByText(/Selected Artifacts/i)).toBeDefined();
    expect(screen.getByText(/Institutional Capabilities/i)).toBeDefined();
    expect(screen.getByText(/Strategic Consultation/i)).toBeDefined();
    expect(screen.getByText(/Pre-select Track I:/i)).toBeDefined();
    expect(screen.getByText(/Pre-select Track II:/i)).toBeDefined();
  });

  it('filters results when the user types a query', () => {
    render(<CommandMenu isOpen={true} onClose={vi.fn()} />);
    const input = screen.getByPlaceholderText(/Jump to section/i);

    fireEvent.change(input, { target: { value: 'Margin' } });

    expect(screen.getByText(/Margin Recovery/i)).toBeDefined();
    expect(screen.queryByText(/Selected Artifacts/i)).toBeNull();
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<CommandMenu isOpen={true} onClose={onClose} />);
    const input = screen.getByPlaceholderText(/Jump to section/i);

    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('calls action and onClose when an item is clicked', () => {
    const onClose = vi.fn();
    const onSelectTrack = vi.fn();
    render(<CommandMenu isOpen={true} onClose={onClose} onSelectTrack={onSelectTrack} />);

    const track1Item = screen.getByText(/Pre-select Track I:/i);
    fireEvent.click(track1Item);

    expect(onSelectTrack).toHaveBeenCalledWith('track-1');
    expect(onClose).toHaveBeenCalled();
  });
});

describe('UX Engineering Pattern #5: Undo Toast & Keyboard Shortcut', () => {
  it('renders with message when visible', () => {
    render(
      <UndoToast
        isVisible={true}
        message="Track selection updated"
        onUndo={vi.fn()}
        onDismiss={vi.fn()}
      />
    );
    expect(screen.getByRole('status')).toBeDefined();
    expect(screen.getByText(/Track selection updated/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Undo/i })).toBeDefined();
  });

  it('does not render when isVisible is false', () => {
    render(
      <UndoToast
        isVisible={false}
        message="Track selection updated"
        onUndo={vi.fn()}
        onDismiss={vi.fn()}
      />
    );
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('triggers onUndo and onDismiss when Undo button is clicked', () => {
    const onUndo = vi.fn();
    const onDismiss = vi.fn();

    render(
      <UndoToast
        isVisible={true}
        message="Track updated"
        onUndo={onUndo}
        onDismiss={onDismiss}
      />
    );

    const undoButton = screen.getByRole('button', { name: /Undo/i });
    fireEvent.click(undoButton);

    expect(onUndo).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('triggers onUndo and onDismiss when ⌘Z or Ctrl+Z is pressed on window', () => {
    const onUndo = vi.fn();
    const onDismiss = vi.fn();

    render(
      <UndoToast
        isVisible={true}
        message="Track updated"
        onUndo={onUndo}
        onDismiss={onDismiss}
      />
    );

    // Simulate Cmd+Z / Ctrl+Z
    fireEvent.keyDown(window, {
      key: 'z',
      ctrlKey: true,
      metaKey: false,
    });

    expect(onUndo).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onUndo if focused on an input element when ⌘Z is pressed', () => {
    const onUndo = vi.fn();
    const onDismiss = vi.fn();

    render(
      <div>
        <input data-testid="test-input" />
        <UndoToast
          isVisible={true}
          message="Track updated"
          onUndo={onUndo}
          onDismiss={onDismiss}
        />
      </div>
    );

    const input = screen.getByTestId('test-input');
    fireEvent.keyDown(input, {
      key: 'z',
      metaKey: true,
    });

    expect(onUndo).not.toHaveBeenCalled();
  });

  it('auto-dismisses after durationMs', () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();

    render(
      <UndoToast
        isVisible={true}
        message="Track updated"
        onUndo={vi.fn()}
        onDismiss={onDismiss}
        durationMs={3000}
      />
    );

    act(() => {
      vi.advanceTimersByTime(2999);
    });
    expect(onDismiss).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onDismiss).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});


