export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'cd-theme';

/** The site's own default, and what the arrow field paints against on first load. */
export const DEFAULT_THEME: Theme = 'dark';

/**
 * Runs before first paint, inlined into the document head.
 *
 * It has to be blocking and inline: a stored light theme applied after
 * hydration would show a full dark page first, and on a static export there is
 * no server that knows the visitor's choice. Kept to one statement, wrapped so
 * a blocked `localStorage` cannot stop the page rendering.
 */
export const themeInitScript = `
try {
  var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
  var theme = stored === 'light' || stored === 'dark'
    ? stored
    : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : '${DEFAULT_THEME}');
  document.documentElement.dataset.theme = theme;
} catch (e) {
  document.documentElement.dataset.theme = '${DEFAULT_THEME}';
}
`.trim();
