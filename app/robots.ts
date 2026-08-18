import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/seo';

// A static export needs metadata routes marked static explicitly, otherwise
// `next build` treats them as request-time handlers and refuses to emit them.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
