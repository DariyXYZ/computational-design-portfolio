/**
 * Inline icons, lifted verbatim from the previous static build.
 *
 * Inline rather than sprited or fetched: each is a single short path, so they
 * cost less inside the prerendered HTML than any extra request would, and there
 * is no flash before an icon font or SVG sheet arrives. All are decorative —
 * every one sits next to a text label — so all are hidden from assistive tech.
 */

type IconProps = { size?: number; className?: string };

function Glyph({
  size,
  className,
  viewBox,
  d,
}: IconProps & { viewBox: string; d: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}

const MATERIAL = '0 -960 960 960';
const BRAND = '0 0 24 24';

/** Wordmark spark. */
export function MarkIcon({ size = 26, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      viewBox={MATERIAL}
      d="m176-120-56-56 301-302-181-45 198-123-17-234 179 151 216-88-87 217 151 178-234-16-124 198-45-181-301 301Zm24-520-80-80 80-80 80 80-80 80Zm355 197 48-79 93 7-60-71 35-86-86 35-71-59 7 92-79 49 90 22 23 90Zm165 323-80-80 80-80 80 80-80 80ZM569-570Z"
    />
  );
}

export function GitHubIcon({ size = 15, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      viewBox={BRAND}
      d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"
    />
  );
}

export function EmailIcon({ size = 15, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      viewBox={MATERIAL}
      d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200Z"
    />
  );
}

export function TelegramIcon({ size = 15, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      viewBox={BRAND}
      d="M21.9 2.6 18.7 20c-.2 1.2-.9 1.5-1.9.9l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5L20.2 2c.9-.3 1.9.2 1.7.6Z"
    />
  );
}

export function PhoneIcon({ size = 14, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      viewBox={MATERIAL}
      d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z"
    />
  );
}

export function ArrowRightIcon({ size = 12, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      viewBox={MATERIAL}
      d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"
    />
  );
}

export function ArrowLeftIcon({ size = 16, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      viewBox={MATERIAL}
      d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"
    />
  );
}

/** Stand-in for a case-page image that has not been produced yet. */
export function ImagePlaceholderIcon({ size = 30, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      viewBox={MATERIAL}
      d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"
    />
  );
}

/** Stand-in for a missing diagram, as opposed to a missing photo. */
export function DiagramPlaceholderIcon({ size = 30, className }: IconProps) {
  return (
    <Glyph
      size={size}
      className={className}
      viewBox={MATERIAL}
      d="M600-120v-120H440v-400h-80v120H80v-320h280v120h240v-120h280v320H600v-120h-80v320h80v-120h280v320H600ZM160-760v160-160Zm520 400v160-160Zm0-400v160-160Zm0 160h120v-160H680v160Zm0 400h120v-160H680v160ZM160-600h120v-160H160v160Z"
    />
  );
}
