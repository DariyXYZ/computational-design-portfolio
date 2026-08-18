import type { Metadata } from 'next';
import Link from 'next/link';

import { Picture } from '@/components/media';
import { RichText } from '@/components/rich-text';
import { experience, experiencePage } from '@/content/experience';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Experience',
  description: experiencePage.summary,
  path: '/experience',
  image: experiencePage.portrait.src,
});

export default function ExperiencePage() {
  return (
    <>
      <header className="project-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">{site.name}</Link>
            <span aria-hidden="true">/</span>
            <span className="current">{experiencePage.breadcrumb}</span>
          </nav>
          <div className="exp-hero__grid">
            <div className="media-frame has-photo exp-hero__portrait">
              <Picture
                image={experiencePage.portrait}
                sizes="(max-width: 780px) 60vw, 300px"
                loading="eager"
              />
            </div>
            <div className="exp-hero__text">
              <h1>{experiencePage.heading}</h1>
              <p className="project-summary">{experiencePage.summary}</p>
              <p className="meta">{experiencePage.meta}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="project-content container">
        <div className="exp-list">
          {experience.map((entry, index) => (
            <article
              className="exp-entry"
              data-reveal
              style={{ '--i': index } as React.CSSProperties}
              key={entry.organisation}
            >
              <div className="exp-entry__when">{entry.when}</div>
              <div className="exp-entry__body">
                <h2>{entry.organisation}</h2>
                <p className="exp-entry__role">{entry.role}</p>
                <p className="desc">
                  <RichText value={entry.description} />
                </p>
                {entry.bullets ? (
                  <ul className="exp-entry__list">
                    {entry.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>
                        <RichText value={bullet} />
                      </li>
                    ))}
                  </ul>
                ) : null}
                {entry.meta ? <p className="meta">{entry.meta}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
