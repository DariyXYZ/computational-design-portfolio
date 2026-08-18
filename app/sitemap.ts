import type { MetadataRoute } from 'next';

import { projects } from '@/content';
import { absoluteUrl } from '@/lib/seo';

// A static export needs metadata routes marked static explicitly, otherwise
// `next build` treats them as request-time handlers and refuses to emit them.
export const dynamic = 'force-static';

/**
 * Generated from the project list, so a new case appears in the sitemap the
 * moment its content file is registered — the old `sitemap.xml` was maintained
 * by hand and had drifted out of step with the pages that existed.
 *
 * URLs are extension-less. GitHub Pages serves `projects/wind-comfort.html` at
 * both that path and `/projects/wind-comfort`, so the previously indexed `.html`
 * URLs keep resolving and consolidate onto these canonicals.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), priority: 1 },
    { url: absoluteUrl('/experience'), priority: 0.8 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      priority: 0.6,
    })),
  ];
}
