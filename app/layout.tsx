import './globals.css';
import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';

// ─────────────────────────────────────────────────────────────────────────────
// Root Layout
//
// Rules enforced:
// • No margin / padding / max-width constraints on html or body — the cinematic
//   hero must mount full-screen edge-to-edge on every browser.
// • Global overflow-x clipping prevents horizontal spill without creating an
//   overflow container that would disable sticky scroll sections.
// • scroll-smooth enables native CSS scroll-behavior for the 400vh container.
// • bg-[#0E0F11] on body ensures the matte obsidian background is visible even
//   before React hydration completes (no flash of white).
// ─────────────────────────────────────────────────────────────────────────────
const display = Cormorant_Garamond({
  variable: '--font-lmb-display',
  subsets: ['latin'],
  display: 'swap',
});

const sans = Manrope({
  variable: '--font-lmb-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LMB Molecular | Luxury Molecular Bartending',
  description:
    'Luxury molecular mixology, bespoke cocktail bars and unforgettable celebrations across Delhi, Agra, and India.',
  keywords: [
    'molecular bartending services',
    'luxury bartending services',
    'cocktail catering',
    'Delhi bartending services',
    'Agra bartending services',
  ],
  openGraph: {
    title: 'LMB Molecular | Luxury Molecular Bartending',
    description: 'Science, craft, theatre, and taste for unforgettable celebrations.',
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#080808',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="m-0 p-0 antialiased bg-[#080808] scroll-smooth"
      >
        {children}
      </body>
    </html>
  );
}
