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
export type FrameContext = 'hero' | 'wide' | 'row' | 'card' | 'featured' | 'aside';

const SIZES: Record<FrameContext, string> = {
  // Split hero: full width on mobile, just over half of the 1160 px container above it.
  hero: '(max-width: 900px) 100vw, 640px',
  // Single frame spanning the container.
  wide: '(max-width: 1200px) 100vw, 1160px',
  // Two or three frames sharing the container width.
  row: '(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 380px',
  // Auto-fit grid, minimum 260 px per card, four across at container width.
  card: '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 280px',
  featured: '(max-width: 900px) 100vw, 560px',
  aside: '240px',
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
  // A stamp turns the frame into a drafting sheet, which has its own styling.
  const stamped =
    'stamp' in frame && frame.stamp ? ' media-frame--blueprint' : '';
  const loading: Loading = eager ? 'eager' : 'lazy';

  switch (frame.kind) {
    case 'image': {
      const picture = <Picture image={frame.image} sizes={sizes} loading={loading} />;
      return (
        <div className={`media-frame has-photo${heroModifier}${wide}${stamped}`}>
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
