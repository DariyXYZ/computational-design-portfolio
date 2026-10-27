import Link from 'next/link';

import { nav, person, site } from '@/content/site';
import { asset } from '@/lib/asset';
import { GitHubIcon } from './icons';
import { ThemeToggle } from './theme-toggle';

/**
 * Primary navigation, rendered once in the root layout.
 *
 * Laid out like the product-design portfolio's header: the mark and the
 * section links on the left, the GitHub pill and the theme switch on the right.
 * The section links point at the index page's anchors, so they work from a
 * case page too.
 */
export function SiteNav() {
  return (
    <nav className="nav" aria-label="Primary">
      {/* The label is a span so narrow screens can drop it and keep the mark;
          aria-label then carries the name the hidden text used to give. */}
      <Link className="nav__mark" href="/" aria-label={site.wordmark}>
        {/* Same mark as the product-design portfolio. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="nav__mark-icon" src={asset('/logo.svg')} alt="" aria-hidden="true" />
        <span className="nav__mark-text">{site.wordmark}</span>
      </Link>
      <div className="nav__links">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
      <div className="nav__actions">
        <a className="nav__cta" href={person.github} target="_blank" rel="noopener">
          <GitHubIcon size={13} />
          GitHub
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
