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
import { SkipToContent } from '@/presentation/components/navigation/SkipToContent';

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
  themeColor: '#0D011A',
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
          backgroundColor: 'var(--ground-primary, #0D011A)',
          color: 'var(--ink-primary, #FAF7FF)',
          fontFamily: 'var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <SkipToContent />
        <AnalyticsProvider>
          <StructuredData />
          <SmoothScroll />
          <Header />
          <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: 'none' }}>
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
