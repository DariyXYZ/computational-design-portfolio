export type Theme = 'dark' | 'light';

// Bumped when light became the default (2026-10): a choice stored under the old
// key was mostly the old dark default echoed back, not a real preference.
export const THEME_STORAGE_KEY = 'cd-theme-v2';

/** The site's own default, and what the arrow field paints against on first load.
 *  Light, as on the product-design portfolio; the system preference is not consulted. */
export const DEFAULT_THEME: Theme = 'light';

/**
 * Runs before first paint, inlined into the document head.
 *
 * It has to be blocking and inline: a stored dark theme applied after
 * hydration would show a full light page first, and on a static export there is
 * no server that knows the visitor's choice. Kept to one statement, wrapped so
 * a blocked `localStorage` cannot stop the page rendering.
 */
export const themeInitScript = `
try {
  var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
  var theme = stored === 'light' || stored === 'dark'
    ? stored
    : '${DEFAULT_THEME}';
  document.documentElement.dataset.theme = theme;
} catch (e) {
  document.documentElement.dataset.theme = '${DEFAULT_THEME}';
}
`.trim();
