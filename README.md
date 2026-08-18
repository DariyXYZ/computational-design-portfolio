# Computational Design Portfolio

Portfolio for [Dariy Nazarov](https://github.com/DariyXYZ), published at
[dariyxyz.github.io/computational-design-portfolio](https://dariyxyz.github.io/computational-design-portfolio/).

Next.js 16 App Router, exported as a fully prerendered static site and deployed
to GitHub Pages by Actions. Every page is server-rendered at build time; the only
client-side JavaScript is the arrow-field canvas and a small progressive-
enhancement layer.

## Working on it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into out/
npm start          # serve the built out/ on http://localhost:4321
npm run typecheck
npm run lint
```

## How content works

Case pages are **data, not markup**. `content/projects/<slug>.ts` describes a
page as an ordered list of blocks; `components/blocks.tsx` decides how each block
renders. Adding a case means:

1. Write `content/projects/<slug>.ts` (see `content/types.ts` for the block union).
2. Register it in `content/index.ts` — that one array drives the index page,
   `generateStaticParams`, the sitemap, and the previous/next links.
3. Add a card entry to `cards` in the same file if it should appear on the index.

Shared copy — contacts, headings, the About section, the Experience timeline —
lives in `content/site.ts` and `content/experience.ts`.

This replaces the previous arrangement, where twelve near-identical HTML files
were kept in sync by `tools/postprocess_html.py`, and where the project order in
`sitemap.xml` had drifted out of step with the order shown on the index page.

## Media pipeline

```bash
npm run media      # python tools/media.py
```

Run it after adding or replacing anything in `public/assets/img/`. It:

- writes an AVIF ladder for every raster into `public/assets/opt/`, and
- re-encodes `media-src/hero-bg.gif` into an animated AVIF plus an animated WebP
  fallback at the size the hero actually paints.

It also regenerates `content/media-manifest.ts`, which records the widths that
exist so `components/media.tsx` can build a `srcset` that never points at a
missing file. Originals stay in `public/assets/img/` and remain the `<img>`
fallback, so a browser without AVIF gets what the old site served.

Commit the generated derivatives — the deploy workflow does not run Python.

Keep full-resolution source material in the ignored `source-assets/`; only
web-ready derivatives belong in `public/assets/`.

## URLs

`trailingSlash` is off, so the export writes `out/projects/<slug>.html`. GitHub
Pages serves that at both `/projects/<slug>` and the legacy
`/projects/<slug>.html`, so every URL the previous build published still
resolves. Canonicals and the sitemap use the extension-less form.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and uploads `out/`
as a Pages artifact. The repository's Pages source must be set to **GitHub
Actions** (not "deploy from a branch"). `basePath` comes from
`actions/configure-pages`, so the same build works for a project site and a user
site without editing config.

## Media still needed

- `casting-feasibility`: misrun-risk heatmap on a node.
- `daylight-massing`: insolation map across massing options.
- `panel-nesting-engine`: nested cut sheet and packing-algorithm structure.
- `revit-panel-export`: Revit schedule and Grasshopper export step.
- `tessellation-studies`: panel-count and node-repetition pattern variants.
- `mcp-rhino-agent`: 4 explanatory diagram slots remain; the page already has
  substantial real media.

These render as labelled placeholder frames rather than being hidden.
