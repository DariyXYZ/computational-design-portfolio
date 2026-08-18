import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The site is a fully prerendered static export: `next build` writes plain
  // HTML/CSS/JS into `out/`, which the Pages workflow uploads as an artifact.
  output: 'export',

  // `actions/configure-pages` hands the workflow the project's Pages prefix
  // (`/computational-design-portfolio`). Empty locally, so `next dev` serves at `/`.
  basePath: process.env.PAGES_BASE_PATH,

  // Left at the default `false` on purpose: `next build` then emits
  // `out/projects/wind-comfort.html`, which GitHub Pages serves both at
  // `/projects/wind-comfort` and at the legacy `/projects/wind-comfort.html`.
  // Every URL the old static site published keeps resolving.
  trailingSlash: false,

  images: {
    // A static export has no request-time image optimizer. This site does its
    // own: `tools/media.py` writes an AVIF ladder ahead of the build and
    // `components/media.tsx` renders <picture> with the original as fallback.
    // The flag only matters if next/image is ever introduced here.
    unoptimized: true,
  },
};

export default nextConfig;
