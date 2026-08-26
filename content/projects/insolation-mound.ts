import type { Project } from '../types';

export const insolationMound: Project = {
  slug: 'insolation-mound',
  title: 'The insolation toolkit',
  tag: 'In Use',
  summary:
    'A Grasshopper plugin built from scratch: a site-wide solar heatmap, a per-window insolation check, and a voxel mound that turns those results into a form, flagging the darkest windows automatically instead of by eye.',
  meta: 'Grasshopper · Insolation analysis',
  hero: {
    kind: 'image',
    image: {
      src: '/assets/img/insolation-mound-sunpath.jpg',
      alt: 'The voxel insolation mound standing in its surrounding massing, under the traced sun path it was built from',
      width: 2752,
      height: 1536,
    },
  },
  // Figures first, then three tools in one pass each. The earlier version ran
  // eight prose blocks for three tools and buried every claim it made in the
  // middle of a paragraph; the drafting stamps now do the labelling the
  // per-tool headings used to, so the renders can sit two abreast.
  blocks: [
    {
      kind: 'prose',
      heading: 'Problem',
      paragraphs: [
        [
          'Insolation used to be checked in three disconnected passes: a site heatmap in one file, a manual ray-trace for a suspect window in another, a mound assembled by hand from both. Nothing shared geometry, and nobody new could run any of it without being walked through from an empty canvas.',
        ],
        [
          'This is one Grasshopper plugin, written from scratch, covering all three.',
        ],
      ],
    },
    {
      kind: 'mediaRow',
      wide: true,
      frames: [
        {
          kind: 'image',
          image: {
            src: '/assets/img/insolation-mound-heatmap.jpg',
            alt: 'Site-wide solar heatmap, hours of light per ground cell across the massing',
            width: 1800,
            height: 1012,
          },
          stamp: { project: 'Insolation Toolkit', sheet: 'Site Heatmap' },
        },
        {
          kind: 'image',
          image: {
            src: '/assets/img/insolation-mound-rays.jpg',
            alt: 'Sun rays traced from one window against the surrounding buildings, hits and misses drawn in different colours',
            width: 3840,
            height: 2160,
          },
          stamp: { project: 'Insolation Toolkit', sheet: 'Window Rays' },
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'The site, then every window',
      paragraphs: [
        [
          'The heatmap scores every ground cell in hours of direct light, read straight off the ground plane rather than estimated from a section cut. The window check traces real sun rays against the surrounding massing and answers Ok, NotOk or PartialOk per window.',
        ],
      ],
    },
    {
      kind: 'codeMedia',
      image: {
        src: '/assets/img/insolation-mound-heatmap-nodes.png',
        alt: 'Solar heatmap Grasshopper definition',
        width: 2600,
        height: 531,
      },
    },
    {
      kind: 'codeMedia',
      image: {
        src: '/assets/img/insolation-mound-windows-nodes.png',
        alt: 'Per-window insolation-check Grasshopper definition',
        width: 2600,
        height: 733,
      },
    },
    {
      kind: 'prose',
      heading: 'Insolation mound',
      paragraphs: [
        [
          'The same per-window results, rebuilt as a voxel form: each window becomes part of the mound, and the darkest ones are wherever it dips lowest — flagged by the geometry instead of a lookup.',
        ],
      ],
    },
    {
      kind: 'mediaRow',
      wide: true,
      frames: [
        {
          kind: 'image',
          image: {
            src: '/assets/img/insolation-mound-voxels.jpg',
            alt: 'The finished voxel insolation mound standing among the surrounding massing',
            width: 3840,
            height: 2160,
          },
          wide: true,
          stamp: { project: 'Insolation Toolkit', sheet: 'Insolation Mound' },
        },
      ],
    },
    {
      kind: 'codeMedia',
      image: {
        src: '/assets/img/insolation-mound-mound-nodes.png',
        alt: 'Insolation-mound Grasshopper definition',
        width: 2600,
        height: 993,
      },
    },
    {
      kind: 'prose',
      heading: 'Result',
      paragraphs: [
        [
          "Every verdict traces back to real sun rays against the actual surrounding massing, not a simplified stand-in, so a call can be checked geometrically rather than trusted. Internal plugin, built by the team, not yet published.",
        ],
        [
          'Three workflows that were three files now share one install and one set of presets, and the worst-lit window in a building shows up as a dip in a form instead of a line a reviewer has to go looking for.',
        ],
      ],
    },
    {
      kind: 'metrics',
      items: [
        {
          value: '3 → 1',
          label: 'Definitions merged',
          note: 'Nothing was shared between them — not geometry, not settings, not a starting file',
        },
        {
          value: '100%',
          label: 'Windows ray-traced',
          note: 'Every window against the real surrounding massing, not a sampled few',
        },
        {
          value: '3',
          label: 'Verdicts per window',
          note: 'Ok, NotOk, PartialOk — not a raw number left to interpret',
        },
        {
          value: '0',
          label: 'Definitions to wire',
          note: 'Every tool opens on a template preset instead of an empty canvas',
        },
      ],
    },
  ],
};
