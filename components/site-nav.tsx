import Link from 'next/link';

import { nav, person, site } from '@/content/site';
import { GitHubIcon, MarkIcon } from './icons';

/**
 * Primary navigation, rendered once in the root layout.
 *
 * The section links point at the index page's anchors, so they work from a case
 * page too — the old build wrote `../index.html#about` into every generated file.
 */
export function SiteNav() {
  return (
    <nav className="nav" aria-label="Primary">
      <Link className="nav__mark" href="/">
        <MarkIcon className="nav__mark-icon" />
        {site.wordmark}
      </Link>
      <div className="nav__links">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <a className="nav__cta" href={person.github} target="_blank" rel="noopener">
          <GitHubIcon size={13} />
          GitHub
        </a>
      </div>
    </nav>
  );
}
