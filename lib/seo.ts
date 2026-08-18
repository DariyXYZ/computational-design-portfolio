import type { Metadata } from 'next';

import { person, site } from '@/content/site';

/**
 * Absolute URLs for metadata.
 *
 * Built by hand rather than through `metadataBase`: the site lives under a
 * project path (`/computational-design-portfolio`), and a root-relative value
 * resolved against a base URL would drop that path segment entirely.
 */
export function absoluteUrl(path = ''): string {
  if (!path || path === '/') return `${site.url}/`;
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  /** Site-relative route, e.g. `/projects/wind-comfort`. */
  path: string;
  /** Site-relative image path; falls back to the site's default card image. */
  image?: string;
};

/**
 * Title, description, canonical, and social cards for one page.
 *
 * The previous build injected the same set with a Python post-processor that had
 * to be re-run after every content edit; here it is derived from the content.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? site.ogImage);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Schema.org Person, carried over from the old hand-written JSON-LD block. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    url: absoluteUrl('/'),
    email: `mailto:${person.email}`,
    sameAs: [person.github, person.telegram],
  };
}
