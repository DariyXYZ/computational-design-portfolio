/**
 * Content model for the portfolio.
 *
 * Every case page is data, not markup: `content/projects/*.ts` describe what a
 * page says, and `components/blocks.tsx` decides how each block renders. That
 * split is the whole point of the Next.js rewrite — the old build kept twelve
 * near-identical HTML files in sync with a Python post-processor.
 */

/** Accent colours used by the direction badges and chips. */
export type Tone = 'blue' | 'green' | 'yellow' | 'purple' | 'orange';

/** A raster asset with intrinsic dimensions, so every frame reserves its box. */
export type ImageAsset = {
  /** Root-relative and basePath-free, e.g. `/assets/img/portrait.png`. */
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type VideoAsset = {
  src: string;
  poster: string;
  /** Doubles as the accessible description; these clips carry no audio. */
  title: string;
};

/**
 * Inline rich text: plain runs, links, and emphasis.
 *
 * Modelled as data so no content string is ever raw HTML, which keeps
 * `dangerouslySetInnerHTML` out of the codebase entirely.
 */
export type RichText = ReadonlyArray<
  string | { text: string; href: string } | { emphasis: string }
>;

/** The drafting-stamp overlay on blueprint-framed media. */
export type Stamp = { project: string; sheet: string };

export type Frame =
  | {
      kind: 'image';
      image: ImageAsset;
      wide?: boolean;
      stamp?: Stamp;
      /** Big overlaid figure, e.g. "17% MISRUN". */
      statCaption?: string;
      /**
       * Render without frame chrome. For the keyed-transparent Grasshopper
       * canvases, which are meant to sit on the page's own texture with the
       * arrow field showing through rather than being walled off in a card.
       */
      bare?: boolean;
    }
  | { kind: 'video'; video: VideoAsset; wide?: boolean; stamp?: Stamp }
  | {
      kind: 'group';
      wide?: boolean;
      /** Columns in the inner grid. */
      cols: number;
      /** CSS aspect-ratio for each cell, e.g. `'1 / 1'`. */
      ratio: string;
      /** Per-cell caption; some groups are unlabelled. */
      cells: ReadonlyArray<{ image: ImageAsset; label?: string }>;
    }
  | {
      kind: 'compare';
      wide?: boolean;
      refs: ReadonlyArray<{ image: ImageAsset; caption: string }>;
      result: ImageAsset;
    }
  /** Documentation gap, deliberately shown rather than hidden. */
  | { kind: 'placeholder'; label: string; icon: 'image' | 'diagram' };

export type Chip = { label: string; tone?: Tone };

export type Direction = {
  /** Two-digit ordinal shown in the badge. */
  badge: string;
  tone: Tone;
  title: string;
  flow: ReadonlyArray<Chip>;
  frames: ReadonlyArray<Frame>;
  credit?: string;
};

export type OverviewCard = {
  badge: string;
  tone: Tone;
  title: string;
  icon: ImageAsset;
  flow: ReadonlyArray<Chip>;
};

export type Block =
  | {
      kind: 'prose';
      heading: string;
      paragraphs: ReadonlyArray<RichText>;
      /** Small supporting frame pinned beside the text. */
      aside?: Frame;
    }
  | {
      kind: 'mediaRow';
      wide?: boolean;
      frames: ReadonlyArray<Frame>;
      credit?: string;
    }
  /** Full-bleed screenshot of a definition or source listing. */
  | { kind: 'codeMedia'; image: ImageAsset }
  | { kind: 'overviewGrid'; cards: ReadonlyArray<OverviewCard> }
  | { kind: 'directions'; items: ReadonlyArray<Direction> };

export type Project = {
  slug: string;
  /** Card + hero headline. */
  title: string;
  /** Status label: Built, In Use, Study… */
  tag: string;
  /** One-sentence description, reused as the page's meta description. */
  summary: string;
  /** Tech line, e.g. `Grasshopper · C# · Rhino`. */
  meta: string;
  /** Hero media; a few pages intentionally have none. */
  hero?: Frame;
  /** Two-column hero layout for the flagship case. */
  heroSplit?: boolean;
  blocks: ReadonlyArray<Block>;
};

/** How a project appears in the index: hero slot, featured row, or grid card. */
export type IndexPlacement = 'featured' | 'grid';

export type ProjectCard = {
  slug: string;
  placement: IndexPlacement;
  /** Card media, which is often a lighter derivative than the hero. */
  frame: Frame;
  /** Card copy, shorter than the case page's summary. */
  blurb: string;
  /** Overrides the project's tech line where the card runs a shorter one. */
  meta?: string;
  /** Mirrors the featured--reverse modifier. */
  reverse?: boolean;
};
