import Link from 'next/link';

import { nav, person, site } from '@/content/site';
import { GitHubIcon, MarkIcon } from './icons';
import { ThemeToggle } from './theme-toggle';

/**
 * Primary navigation, rendered once in the root layout.
 *
 * The section links point at the index page's anchors, so they work from a case
 * page too — the old build wrote `../index.html#about` into every generated file.
 */
export function SiteNav() {
  return (
    <nav className="nav" aria-label="Primary">
      {/* The label is a span so narrow screens can drop it and keep the mark;
          aria-label then carries the name the hidden text used to give. */}
      <Link className="nav__mark" href="/" aria-label={site.wordmark}>
        <MarkIcon className="nav__mark-icon" />
        <span className="nav__mark-text">{site.wordmark}</span>
      </Link>
      <div className="nav__links">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
        <a className="nav__cta" href={person.github} target="_blank" rel="noopener">
          <GitHubIcon size={13} />
          GitHub
        </a>
      </div>
    </nav>
  );
}
