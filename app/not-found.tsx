import type { Metadata } from 'next';
import Link from 'next/link';

import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Page not found',
  // Nothing here should ever be indexed.
  robots: { index: false, follow: true },
};

/**
 * Exported to `out/404.html`, which GitHub Pages serves for any unknown path —
 * the old static build had no 404 page at all.
 */
export default function NotFound() {
  return (
    <section className="project-content container">
      <div className="project-block">
        <p className="eyebrow">404</p>
        <h1>This page doesn&rsquo;t exist.</h1>
        <p>
          The link may be out of date. The index lists every system on the site.
        </p>
        <p>
          <Link className="about__cta" href="/">
            Back to {site.name}
          </Link>
        </p>
      </div>
    </section>
  );
}
