import { mediaManifest } from '@/content/media-manifest';
import type { Frame, ImageAsset, VideoAsset } from '@/content/types';
import { asset } from '@/lib/asset';
import { ImagePlaceholderIcon, DiagramPlaceholderIcon } from './icons';

/**
 * Media rendering for a static export.
 *
 * There is no image optimizer at request time, so `tools/media.py` writes an
 * AVIF ladder ahead of the build and `mediaManifest` records which widths exist.
 * These are Server Components: the manifest never reaches the browser.
 */

/** Widths the ladder was built at, from the manifest. */
function widthsFor(src: string): readonly number[] | undefined {
  const widths = mediaManifest[src];
  return widths && widths.length > 0 ? widths : undefined;
}

function srcSet(src: string, widths: readonly number[]): string {
  const stem = src.replace(/^\/assets\/img\//, '').replace(/\.[^.]+$/, '');
  return widths
    .map((width) => `${asset(`/assets/opt/${stem}-${width}.avif`)} ${width}w`)
    .join(', ');
}

type Loading = 'eager' | 'lazy';

type PictureProps = {
  image: ImageAsset;
  /** Widths the layout will paint this at, for the browser to choose from. */
  sizes: string;
  loading?: Loading;
  className?: string;
};

/**
 * AVIF ladder with the original as fallback. Intrinsic width/height are always
 * emitted so the box is reserved before bytes arrive — the old build shipped
 * three unsized screenshots.
 */
export function Picture({ image, sizes, loading = 'lazy', className }: PictureProps) {
  const widths = widthsFor(image.src);
  const eager = loading === 'eager';

  const img = (
    <img
      className={className}
      src={asset(image.src)}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={loading}
      // Always async: a synchronous decode of a large hero blocks the main
      // thread at exactly the moment the rest of the page wants to paint.
      decoding="async"
      // Only the hero of a page should compete for early bandwidth.
      fetchPriority={eager ? 'high' : 'auto'}
      sizes={widths ? sizes : undefined}
    />
  );

  if (!widths) return img;

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(image.src, widths)} sizes={sizes} />
      {img}
    </picture>
  );
}

type ClipProps = {
  video: VideoAsset;
  /** Eager clips get their first frame; the rest wait for the viewport. */
  eager?: boolean;
};

/**
 * Silent looping clip. `preload="none"` is deliberate: the index page carries
 * three of these and each `preload="metadata"` was a range request during load.
 * `components/field-canvas.tsx` starts playback once a clip scrolls into view.
 */
export function Clip({ video, eager = false }: ClipProps) {
  return (
    <video
      src={asset(video.src)}
      poster={asset(video.poster)}
      title={video.title}
      preload={eager ? 'metadata' : 'none'}
      loop
      muted
      playsInline
      data-autoplay
    />
  );
}

function Stamped({
  stamp,
  children,
}: {
  stamp: { project: string; sheet: string };
  children: React.ReactNode;
}) {
  return (
    <div className="blueprint">
      <div className="blueprint__frame">
        {children}
        <div className="blueprint__stamp">
          <div className="blueprint__stamp-label">Project</div>
          <div className="blueprint__stamp-value">{stamp.project}</div>
          <div className="blueprint__stamp-label">Sheet</div>
          <div className="blueprint__stamp-value">{stamp.sheet}</div>
        </div>
      </div>
    </div>
  );
}

/** Where a frame sits, which decides both its CSS modifier and its `sizes`. */
export type FrameContext =
  | 'hero'
  | 'wide'
  | 'pair'
  | 'row'
  | 'card'
  | 'featured'
  | 'aside';

/**
 * What each context actually paints, measured rather than guessed.
 *
 * These must track the CSS. Case media breaks out of the 1160px text container
 * to `min(1440px, 100vw - 32px)`, and a stale 640px hint here had the browser
 * picking the 1200px rung for a frame painting 1437 CSS px — an upscale of
 * nearly two, which read as a soft image no amount of extra quality would fix.
 *
 * 1472px is the breakout's own crossover: above it the width is pinned at
 * 1440, below it the viewport minus its gutter. Written as media queries plus
 * calc() rather than min(), which every target browser parses in `sizes`.
 */
const BREAKOUT = '(max-width: 1472px) calc(100vw - 32px), 1440px';

const SIZES: Record<FrameContext, string> = {
  // Full-width opening frame, and any single frame spanning a wide row.
  hero: `(max-width: 700px) 100vw, ${BREAKOUT}`,
  wide: `(max-width: 700px) 100vw, ${BREAKOUT}`,
  // Two frames abreast: half the breakout, less the 16px gap. 712px at cap.
  pair: '(max-width: 700px) 100vw, (max-width: 1472px) calc((100vw - 48px) / 2), 712px',
  // Three abreast: a third of the breakout, less two gaps. 469px at cap.
  row: '(max-width: 700px) 100vw, (max-width: 1472px) calc((100vw - 64px) / 3), 469px',
  // Auto-fit grid inside the text container: 312px at four across, 484 at two.
  card: '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 484px',
  // Featured rows stay inside the container; the media column paints ~468px.
  featured: '(max-width: 900px) 100vw, 480px',
  // Figure beside prose: its own column, capped at the source's 536px.
  aside: '(max-width: 900px) 100vw, 536px',
};

export function MediaFrame({
  frame,
  context = 'row',
  eager = false,
}: {
  frame: Frame;
  context?: FrameContext;
  eager?: boolean;
}) {
  const wide = 'wide' in frame && frame.wide ? ' media-frame--wide' : '';
  const sizes = SIZES[context === 'wide' || wide ? 'wide' : context];
  const heroModifier = context === 'hero' ? ' media-frame--hero' : '';
  // Never paint a frame wider than its source: four case heroes only exist at
  // 900px, and the breakout width would otherwise upscale them by half again.
  const nativeWidth =
    frame.kind === 'image'
      ? frame.image.width
      : frame.kind === 'video'
        ? undefined
        : undefined;
  // The hero frame used to be pinned at 16/8 regardless of what it held, so a
  // 1.49 render lost a quarter of its height to a crop nobody chose. Handing
  // CSS the source's own ratio lets each hero show the frame it was composed in.
  const natural =
    frame.kind === 'image'
      ? `${frame.image.width} / ${frame.image.height}`
      : undefined;
  const cap = nativeWidth
    ? ({
        '--media-cap': `${nativeWidth}px`,
        ...(natural ? { '--media-ratio': natural } : {}),
      } as React.CSSProperties)
    : undefined;
  // A stamp turns the frame into a drafting sheet, which has its own styling.
  const stamped =
    'stamp' in frame && frame.stamp ? ' media-frame--blueprint' : '';
  const loading: Loading = eager ? 'eager' : 'lazy';

  switch (frame.kind) {
    case 'image': {
      const picture = <Picture image={frame.image} sizes={sizes} loading={loading} />;
      // Frameless: the canvas is already keyed transparent and processed to sit
      // straight on the page, so a card behind it would defeat the point.
      if (frame.bare) return <div className="code-media">{picture}</div>;
      return (
        <div
          className={`media-frame has-photo${heroModifier}${wide}${stamped}`}
          style={cap}
        >
          {frame.stamp ? (
            <Stamped stamp={frame.stamp}>{picture}</Stamped>
          ) : (
            <>
              {picture}
              {frame.statCaption ? (
                <span className="media-stat-caption">{frame.statCaption}</span>
              ) : null}
            </>
          )}
        </div>
      );
    }

    case 'video': {
      const clip = <Clip video={frame.video} eager={eager} />;
      return (
        <div className={`media-frame has-photo${heroModifier}${wide}${stamped}`}>
          {frame.stamp ? <Stamped stamp={frame.stamp}>{clip}</Stamped> : clip}
        </div>
      );
    }

    case 'group':
      return (
        <div className={`media-frame media-frame--group${wide}`}>
          <div
            className="media-group"
            style={
              {
                '--group-cols': frame.cols,
                '--group-ratio': frame.ratio,
              } as React.CSSProperties
            }
          >
            {frame.cells.map((cell) => (
              <div className="media-group__cell" key={cell.image.src}>
                <Picture
                  image={cell.image}
                  // Cells split the container by column count.
                  sizes={`(max-width: 700px) 100vw, ${Math.round(1160 / frame.cols)}px`}
                />
                {cell.label ? (
                  <span className="media-group__label">{cell.label}</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      );

    case 'compare':
      return (
        <div className={`media-frame media-frame--compare${wide}`}>
          <div className="compare__refs">
            {frame.refs.map((ref) => (
              <figure className="blueprint blueprint--ref" key={ref.image.src}>
                <div className="blueprint__frame">
                  <Picture image={ref.image} sizes="(max-width: 700px) 33vw, 180px" />
                </div>
                <figcaption>{ref.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="compare__arrow" aria-hidden="true">
            &rarr;
          </div>
          <div className="compare__result">
            <Picture
              image={frame.result}
              sizes="(max-width: 900px) 100vw, 620px"
            />
          </div>
        </div>
      );

    case 'placeholder':
      return (
        <div className="media-frame media-frame--md">
          {frame.icon === 'diagram' ? (
            <DiagramPlaceholderIcon />
          ) : (
            <ImagePlaceholderIcon />
          )}
          <span>{frame.label}</span>
        </div>
      );
  }
}
