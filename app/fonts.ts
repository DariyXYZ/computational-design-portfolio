import localFont from 'next/font/local';

/**
 * Both faces used to be base64-inlined into the stylesheet, which turned the
 * one render-blocking CSS request into 59 KB over the wire and cost ~410 ms of
 * FCP on a throttled connection. Served as real files they are preloaded in
 * parallel with the CSS and cached independently of it.
 */

/** Body copy. Variable weight, so one file covers the whole 100–900 range. */
export const nunito = localFont({
  src: './fonts/nunito-sans-var.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-nunito',
  preload: true,
  fallback: ['Barlow', 'Inter', 'system-ui', 'sans-serif'],
  // Nunito's metrics differ enough from the sans fallback that swapping in the
  // real face shifts line boxes; matching the fallback's metrics avoids it.
  adjustFontFallback: 'Arial',
});

/**
 * Display accent, used only for a handful of headings — so it stays out of the
 * preload set and loads when something on the page actually needs it.
 */
export const fraunces = localFont({
  src: './fonts/fraunces-accent.woff2',
  weight: '700',
  style: 'normal',
  display: 'swap',
  variable: '--font-fraunces',
  preload: false,
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: 'Times New Roman',
});
