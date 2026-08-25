'use client';

import { useEffect, useState } from 'react';

import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme';

/**
 * Day/night switch for the nav.
 *
 * The theme is already on `<html>` before React runs — the inline script in
 * `app/layout.tsx` puts it there, so there is no flash and no wrong first
 * paint. This component only reads that decision back and lets the visitor
 * change it, which is why it renders nothing until mounted: any markup it
 * produced on the server would claim a theme it cannot know.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === 'light' ? 'light' : 'dark');
  }, []);

  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* Private mode and blocked storage: the choice just won't outlive the tab. */
    }
  }

  // Reserve the control's box on the server so the nav does not reflow when it
  // appears; `aria-hidden` keeps the placeholder out of the accessibility tree.
  if (theme === null) {
    return <span className="theme-toggle theme-toggle--pending" aria-hidden="true" />;
  }

  const goingLight = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={theme === 'light'}
      aria-label={goingLight ? 'Switch to the light theme' : 'Switch to the dark theme'}
      title={goingLight ? 'Light theme' : 'Dark theme'}
    >
      <svg
        className="theme-toggle__icon"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        {goingLight ? (
          // Sun: the state the click moves to.
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.6v2.2M12 19.2v2.2M4.36 4.36l1.56 1.56M18.08 18.08l1.56 1.56M2.6 12h2.2M19.2 12h2.2M4.36 19.64l1.56-1.56M18.08 5.92l1.56-1.56" />
          </>
        ) : (
          // Crescent, drawn as one path so the stroke stays a single weight.
          <path d="M20.2 14.4A8.6 8.6 0 0 1 9.6 3.8a8.6 8.6 0 1 0 10.6 10.6Z" />
        )}
      </svg>
    </button>
  );
}
