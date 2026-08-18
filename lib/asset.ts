/**
 * Prefix a `public/` path with the deployment's base path.
 *
 * `next/link` and `next/image` apply `basePath` on their own, but raw `<img>`,
 * `<source>` and `<video>` URLs do not — and this site hand-rolls `<picture>`
 * so it can serve pre-built AVIF ladders from a static export. Every media URL
 * therefore goes through here.
 *
 * On GitHub Pages the value is `/computational-design-portfolio`, injected by
 * the deploy workflow. Locally it is unset, so paths stay root-relative.
 */
const BASE_PATH = process.env.PAGES_BASE_PATH ?? '';

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

export const basePath = BASE_PATH;
