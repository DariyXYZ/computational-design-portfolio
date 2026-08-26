import { Fragment } from 'react';

import type {
  Block,
  Chip as ChipValue,
  Direction,
  Metric,
  OverviewCard,
} from '@/content/types';
import { MediaFrame, Picture } from './media';
import { RichText } from './rich-text';

/**
 * Case-page block renderer.
 *
 * `content/projects/*.ts` describes a page as an ordered list of blocks; this
 * decides what each one looks like. Adding a case means writing data, not markup.
 */

function Chip({ chip }: { chip: ChipValue }) {
  return (
    <span className={chip.tone ? `chip chip--${chip.tone}` : 'chip'}>{chip.label}</span>
  );
}

/** `input → output` flow line, with an arrow between each pair of chips. */
function Flow({ chips }: { chips: ReadonlyArray<ChipValue> }) {
  return (
    <p className="direction__flow">
      {chips.map((chip, index) => (
        <Fragment key={chip.label}>
          {index > 0 ? (
            <span className="direction__arrow">&rarr;</span>
          ) : null}
          <Chip chip={chip} />
        </Fragment>
      ))}
    </p>
  );
}

function OverviewCards({ cards }: { cards: ReadonlyArray<OverviewCard> }) {
  return (
    <div className="overview-grid">
      {cards.map((card) => (
        <div className={`overview-card overview-card--${card.tone}`} key={card.badge}>
          <span className={`direction__badge direction__badge--${card.tone}`}>
            {card.badge}
          </span>
          <h3 className="overview-card__title">{card.title}</h3>
          {/* Bare picture, not a media frame: the card owns the border and padding. */}
          <div className="overview-card__icon">
            <Picture image={card.icon} sizes="(max-width: 700px) 100vw, 360px" />
          </div>
          <Flow chips={card.flow} />
        </div>
      ))}
    </div>
  );
}

function Metrics({ items }: { items: ReadonlyArray<Metric> }) {
  return (
    <dl className="metrics">
      {items.map((metric) => (
        <div
          className={metric.tone ? `metric metric--${metric.tone}` : 'metric'}
          key={metric.label}
        >
          {/* Term before description, as a <dl> requires. The figure is
              visually on top via `order`, so a screen reader still hears
              "Verdicts per window — three" rather than the reverse. */}
          <dt className="metric__label">{metric.label}</dt>
          <dd className="metric__value">{metric.value}</dd>
          <dd className="metric__note">{metric.note}</dd>
        </div>
      ))}
    </dl>
  );
}

function Directions({ items }: { items: ReadonlyArray<Direction> }) {
  return (
    <div className="directions">
      {items.map((direction) => (
        <div className="direction" key={direction.badge}>
          <div className="direction__head">
            <span className={`direction__badge direction__badge--${direction.tone}`}>
              {direction.badge}
            </span>
            <h3 className="direction__title">{direction.title}</h3>
          </div>
          <Flow chips={direction.flow} />
          {direction.frames.length > 0 ? (
            <div className="media-row media-row--wide">
              {direction.frames.map((frame, index) => (
                <MediaFrame frame={frame} context="wide" key={index} />
              ))}
              {direction.credit ? (
                <p className="compare__credit">{direction.credit}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function ProjectBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case 'prose': {
      const body = (
        <>
          <h2>{block.heading}</h2>
          {block.paragraphs.map((paragraph, index) => (
            <p key={index}>
              <RichText value={paragraph} />
            </p>
          ))}
        </>
      );

      // With a figure beside it the text needs to be one grid cell, not three
      // auto-placed rows, or the column gap doubles as a gap between paragraphs.
      if (!block.aside) return <div className="project-block">{body}</div>;

      return (
        <div className="project-block project-block--with-aside">
          <div className="project-block__body">{body}</div>
          <div className="project-block__aside">
            <MediaFrame frame={block.aside} context="aside" />
          </div>
        </div>
      );
    }

    case 'mediaRow':
      return (
        <div className={block.wide ? 'media-row media-row--wide' : 'media-row'}>
          {block.frames.map((frame, index) => (
            <MediaFrame
              frame={frame}
              // A frame flagged `wide` spans the whole row; otherwise the row's
              // frames share the width, and two abreast is the common case.
              context={
                'wide' in frame && frame.wide
                  ? 'wide'
                  : block.frames.length === 2
                    ? 'pair'
                    : 'row'
              }
              key={index}
            />
          ))}
          {block.credit ? <p className="compare__credit">{block.credit}</p> : null}
        </div>
      );

    case 'codeMedia':
      // Full-bleed screenshot with no frame chrome: `.code-media img` styles it.
      return (
        <div className="code-media">
          <Picture
            image={block.image}
            sizes="(max-width: 1200px) 100vw, 1160px"
          />
        </div>
      );

    case 'metrics':
      return <Metrics items={block.items} />;

    case 'overviewGrid':
      return <OverviewCards cards={block.cards} />;

    case 'directions':
      return <Directions items={block.items} />;
  }
}
