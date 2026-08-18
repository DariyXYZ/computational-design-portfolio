import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowRightIcon, EmailIcon, GitHubIcon, PhoneIcon, TelegramIcon } from '@/components/icons';
import { MediaFrame, Picture } from '@/components/media';
import { RichText } from '@/components/rich-text';
import { cards, getProject } from '@/content';
import { home, person, site } from '@/content/site';
import type { ProjectCard } from '@/content/types';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...pageMetadata({
    title: site.title,
    description: site.description,
    path: '/',
  }),
  // The index carries the full title itself rather than the `%s — site` template.
  title: { absolute: site.title },
};

/**
 * Animated hero mark. Re-encoded from a 1.9 MB, 1080x1400 GIF down to a 45 KB
 * animated AVIF (88 KB animated WebP fallback) at the size it actually paints.
 */
const HERO_ANIMATION = {
  src: '/assets/img/hero-bg.webp',
  alt: '',
  width: 640,
  height: 830,
};

/** Card copy comes from the index entry; status and tech line from the project. */
function cardCopy(card: ProjectCard) {
  const project = getProject(card.slug);
  if (!project) throw new Error(`Index card references unknown project: ${card.slug}`);
  return {
    href: `/projects/${card.slug}`,
    tag: project.tag,
    title: project.title,
    meta: card.meta ?? project.meta,
    blurb: card.blurb,
  };
}

function Featured({ card }: { card: ProjectCard }) {
  const copy = cardCopy(card);
  return (
    <Link className="project-link" href={copy.href}>
      <div
        className={card.reverse ? 'featured featured--reverse' : 'featured'}
        data-reveal
      >
        <div className="featured__media">
          <MediaFrame frame={card.frame} context="featured" />
        </div>
        <div className="featured__text">
          <span className="tag">{copy.tag}</span>
          <h3>{copy.title}</h3>
          <p className="desc">{copy.blurb}</p>
          <p className="meta">{copy.meta}</p>
        </div>
      </div>
    </Link>
  );
}

function Card({ card, index }: { card: ProjectCard; index: number }) {
  const copy = cardCopy(card);
  return (
    <Link className="project-link" href={copy.href}>
      <article className="card" data-reveal style={{ '--i': index } as React.CSSProperties}>
        <MediaFrame frame={card.frame} context="card" />
        <span className="tag">{copy.tag}</span>
        <h3>{copy.title}</h3>
        <p className="desc">{copy.blurb}</p>
        <p className="meta">{copy.meta}</p>
      </article>
    </Link>
  );
}

export default function HomePage() {
  const featured = cards.filter((card) => card.placement === 'featured');
  const grid = cards.filter((card) => card.placement === 'grid');

  return (
    <>
      <section className="hero">
        <div className="hero__row">
          <div className="container">
            <p className="eyebrow">{home.eyebrow}</p>
            <h1>{home.heading}</h1>
            <p className="stack">{home.stack}</p>
          </div>
          <Picture
            className="hero__gif"
            image={HERO_ANIMATION}
            sizes="(max-width: 900px) min(64vw, 300px), min(30vw, 380px)"
            loading="eager"
          />
        </div>
      </section>

      <section className="about" id="about">
        <div className="container about__grid">
          <Link className="media-frame has-photo about__portrait" href="/experience" data-reveal>
            <Picture
              image={{
                src: '/assets/img/portrait-600.webp',
                alt: 'Portrait of Dariy Nazarov',
                width: 600,
                height: 600,
              }}
              sizes="(max-width: 780px) 60vw, 300px"
            />
          </Link>

          <div className="about__intro" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
            <h2>{home.about.heading}</h2>
            {home.about.paragraphs.map((paragraph) => (
              <p className="desc" key={paragraph.slice(0, 32)}>
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="about__contacts" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
            <li className="about__contacts-row">
              <a href={`mailto:${person.email}`}>
                <EmailIcon size={14} /> Email
              </a>
              <a href={person.telegram} target="_blank" rel="noopener">
                <TelegramIcon size={14} /> Telegram
              </a>
            </li>
            <li className="about__contacts-row">
              <a href={person.github} target="_blank" rel="noopener">
                <GitHubIcon size={14} /> GitHub
              </a>
              <a href={`tel:${person.phone}`} aria-label={`Call ${person.phoneLabel}`}>
                <PhoneIcon /> {person.phoneLabel}
              </a>
            </li>
          </ul>

          <div className="about__facts-row" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
            <ul className="about__facts">
              {home.about.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <div className="about__cta-block">
              <Link className="about__cta" href="/experience">
                {home.about.cta}
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="systems" id="systems">
        <div className="container">
          <h2 data-reveal>{home.systems.heading}</h2>
          <p className="intro" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
            {home.systems.intro}
          </p>

          {featured.map((card) => (
            <Featured card={card} key={card.slug} />
          ))}

          <div className="grid">
            {grid.map((card, index) => (
              <Card card={card} index={index} key={card.slug} />
            ))}
          </div>

          <p className="aside-note" data-reveal>
            <RichText value={home.asideNote} />
          </p>
        </div>
      </section>
    </>
  );
}
