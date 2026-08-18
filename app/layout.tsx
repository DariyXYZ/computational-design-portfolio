import type { Metadata, Viewport } from 'next';

import { FieldCanvas } from '@/components/field-canvas';
import { PageEffects } from '@/components/page-effects';
import { SiteFooter } from '@/components/site-footer';
import { SiteNav } from '@/components/site-nav';
import { site } from '@/content/site';
import { personJsonLd } from '@/lib/seo';
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
  themeColor: site.themeColor,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // Next.js 16 no longer applies smooth scrolling to router navigations
      // implicitly; this opts back in to the `scroll-behavior` the CSS sets.
      data-scroll-behavior="smooth"
      className={`${nunito.variable} ${fraunces.variable}`}
    >
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
