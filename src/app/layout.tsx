import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import React from 'react';
import '../presentation/styles/globals.css';
import { Header, Footer } from '@/presentation/components/layout/Header';
import { ErrorBoundary } from '@/presentation/components/feedback/ErrorBoundary';
import { CookieConsent } from '@/presentation/components/feedback/CookieConsent';
import { SEO_CONFIG } from '@/content/seo';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate,
  },
  description: SEO_CONFIG.defaultDescription,
  keywords: SEO_CONFIG.keywords,
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BRANDMANIA',
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: SEO_CONFIG.openGraph.images,
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#070709',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-primary)' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
