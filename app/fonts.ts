import { JetBrains_Mono, Onest } from 'next/font/google';

/**
 * The same pair as the product-design portfolio, so the two sites read as one
 * person's work: Onest for everything, JetBrains Mono for figures, dates and
 * tech lines. next/font self-hosts both at build time — no request to Google
 * from the visitor's browser.
 */
export const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-onest',
  display: 'swap',
});

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-face',
  display: 'swap',
});
