import type { Metadata } from 'next';
import Link from 'next/link';

import { HeroArc } from '@/components/hero-arc';
import { ArrowRightIcon, EmailIcon, GitHubIcon, PhoneIcon, TelegramIcon } from '@/components/icons';
import { MediaFrame, Picture } from '@/components/media';
import { RichText } from '@/components/rich-text';
import { bands, cards, getProject } from '@/content';
import { home, nav, person, site } from '@/content/site';
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

/** Two-digit case number, as on the product site's cards. */
const pad = (n: number) => String(n).padStart(2, '0');

/** Kicker row, title, blurb, then a footer: "View case" left, tech line right. */
function CardBody({ card, number }: { card: ProjectCard; number: number }) {
  const copy = cardCopy(card);
  return (
    <>
      <p className="card__kicker">
        <span className="card__num">{pad(number)}</span>
        <span className="card__status">{copy.tag}</span>
      </p>
      <h3>{copy.title}</h3>
      <p className="desc">{copy.blurb}</p>
      <div className="card__foot">
        <span className="card__more">
          View case <ArrowUpRightIcon />
        </span>
        <span className="meta">{copy.meta}</span>
      </div>
    </>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">
      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Featured({ card, number }: { card: ProjectCard; number: number }) {
  return (
    <Link className="project-link" href={`/projects/${card.slug}`}>
      <div
        className={card.reverse ? 'featured featured--reverse' : 'featured'}
        data-reveal
      >
        <div className="featured__media">
          <MediaFrame frame={card.frame} context="featured" />
        </div>
        <div className="featured__text">
          <CardBody card={card} number={number} />
        </div>
      </div>
    </Link>
  );
}

function Card({ card, index, number }: { card: ProjectCard; index: number; number: number }) {
  return (
    <Link className="project-link" href={`/projects/${card.slug}`}>
      <article className="card" data-reveal style={{ '--i': index } as React.CSSProperties}>
        <MediaFrame frame={card.frame} context="card" />
        <div className="card__body">
          <CardBody card={card} number={number} />
        </div>
      </article>
    </Link>
  );
}

export default function HomePage() {
  // The index groups by band so the "ranked by how real they are" claim is
  // something the eye can see, not a sentence the reader has to take on trust.
  const banded = bands
    .map((band) => {
      const inBand = cards.filter((card) => card.band === band.id);
      return {
        band,
        featured: inBand.filter((card) => card.placement === 'featured'),
        grid: inBand.filter((card) => card.placement === 'grid'),
      };
    })
    .filter(({ featured, grid }) => featured.length + grid.length > 0);

  // Cards are numbered in the order they are read, across all bands.
  const numbers = new Map(
    banded
      .flatMap(({ featured, grid }) => [...featured, ...grid])
      .map((card, i) => [card.slug, i + 1]),
  );
  const numberOf = (card: ProjectCard) => numbers.get(card.slug) ?? 0;

  // Two-tone heading, as on the product site: the greeting in ink, the role
  // dimmed. Splits the existing sentence; the copy itself is unchanged.
  const comma = home.heading.indexOf(', ');
  const headLead = comma > 0 ? home.heading.slice(0, comma + 1) : home.heading;
  const headRest = comma > 0 ? home.heading.slice(comma + 2) : '';

  return (
    <>
      <section className="hero">
        <HeroArc />
        <div className="hero__inner container">
          <p className="eyebrow">{home.eyebrow}</p>
          <h1>
            {headLead}
            {headRest ? (
              <>
                {' '}
                <span className="dim">{headRest}</span>
              </>
            ) : null}
          </h1>
          <p className="stack">{home.stack}</p>
          <div className="hero__actions">
            <Link className="btn btn--primary" href="/#systems">
              {home.systems.heading}
            </Link>
            <Link className="btn btn--secondary" href="/experience">
              {home.about.cta}
            </Link>
          </div>
        </div>
        {/* Outside the container: its z-index would isolate the blend mode,
            and the mark's near-black backdrop would show as a box. */}
        <Picture
          className="hero__gif"
          image={HERO_ANIMATION}
          sizes="(max-width: 900px) min(64vw, 300px), 340px"
          loading="eager"
        />
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
          <p className="section-kicker" data-reveal>
            {nav.find((item) => item.href === '/#systems')?.label}
          </p>
          <h2 data-reveal>{home.systems.heading}</h2>
          <p className="intro" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
            {home.systems.intro}
          </p>

          {banded.map(({ band, featured, grid }) => (
            <section className="band" key={band.id} aria-labelledby={`band-${band.id}`}>
              <div className="band__head" data-reveal>
                <h3 className="band__label" id={`band-${band.id}`}>
                  {band.label}
                </h3>
                <p className="band__note">{band.note}</p>
              </div>

              {featured.map((card) => (
                <Featured card={card} number={numberOf(card)} key={card.slug} />
              ))}

              {grid.length > 0 ? (
                <div className="grid">
                  {grid.map((card, index) => (
                    <Card card={card} index={index} number={numberOf(card)} key={card.slug} />
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          <p className="aside-note" data-reveal>
            <RichText value={home.asideNote} />
          </p>
        </div>
      </section>
    </>
  );
}
