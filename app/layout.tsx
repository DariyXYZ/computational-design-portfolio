import type { Metadata, Viewport } from 'next';

import { FieldCanvas } from '@/components/field-canvas';
import { PageEffects } from '@/components/page-effects';
import { SiteFooter } from '@/components/site-footer';
import { SiteNav } from '@/components/site-nav';
import { site } from '@/content/site';
import { personJsonLd } from '@/lib/seo';
import { themeInitScript } from '@/lib/theme';
import { fraunces, nunito } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: site.title,
    // Case pages set only their own headline; the site name is appended here.
    template: `%s — ${site.name}`,
  },
  description: site.description,
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
};

export const viewport: Viewport = {
  // The browser chrome follows the theme the visitor actually picked.
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: site.themeColor },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // Next.js 16 no longer applies smooth scrolling to router navigations
      // implicitly; this opts back in to the `scroll-behavior` the CSS sets.
      data-scroll-behavior="smooth"
      className={`${nunito.variable} ${fraunces.variable}`}
      // The inline script below overwrites this before paint; it is here so the
      // served HTML is never themeless for a reader with scripting off.
      data-theme="dark"
    >
      <head>
        {/* Blocking and inline on purpose: a stored light theme applied after
            hydration would flash a dark page first. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          // Static, build-time JSON with no user input in it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>

        <FieldCanvas />
        <SiteNav />

        <main id="main-content">{children}</main>

        <SiteFooter />
        <PageEffects />
      </body>
    </html>
  );
}
