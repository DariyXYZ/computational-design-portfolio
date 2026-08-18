import type { RichText as RichTextValue } from '@/content/types';

/**
 * Renders the `RichText` shape from the content files.
 *
 * Content stores paragraphs as arrays of plain runs, links, and emphasis rather
 * than HTML strings, so nothing on this site needs `dangerouslySetInnerHTML`.
 * Links to another origin get `rel="noopener"` automatically.
 */
export function RichText({ value }: { value: RichTextValue }) {
  return (
    <>
      {value.map((part, index) => {
        if (typeof part === 'string') return part;

        if ('emphasis' in part) {
          return <strong key={`em-${index}`}>{part.emphasis}</strong>;
        }

        return (
          <a
            key={`${part.href}-${index}`}
            href={part.href}
            {...(isExternal(part.href) ? { target: '_blank', rel: 'noopener' } : {})}
          >
            {part.text}
          </a>
        );
      })}
    </>
  );
}

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}
