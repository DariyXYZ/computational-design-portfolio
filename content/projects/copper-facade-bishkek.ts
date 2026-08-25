import type { Project } from '../types';

export const copperFacadeBishkek: Project = {
  slug: 'copper-facade-bishkek',
  title: 'One script, from form to fabrication',
  tag: 'In Progress',
  summary:
    'A single Grasshopper definition that takes a triangulated copper-panel canopy from geometry straight to labeled, ready-to-cut sheets, for a bus station under construction in Bishkek.',
  meta: 'Grasshopper · Rhino · Panel nesting & marking',
  hero: {
    kind: 'image',
    image: {
      src: '/assets/img/copper-facade-bishkek.jpg',
      alt: 'Rendered view of the finished bus station, its copper canopy cantilevered over the concourse',
      width: 1800,
      height: 1005,
    },
  },
  // Three text blocks, each followed by a pair of images. Kept deliberately
  // short: the earlier version stacked Problem/Method and then
  // Validation/Result/Under construction, which read as walls of prose.
  blocks: [
    {
      kind: 'prose',
      heading: 'Method',
      paragraphs: [
        [
          'A triangulated copper canopy means hundreds of uniquely-shaped panels, which normally takes three separate handoffs: one model for the form, a second pass to nest the panels onto stock sheets, and a third round of labeling them by hand.',
        ],
        [
          'This is one Grasshopper definition instead. It generates the geometry, nests the panels, gives each one a position code — roof zone, row, column, left or right pair — and exports per-layer lines ready to hand straight to the cutter.',
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
            src: '/assets/img/copper-facade-marking.jpg',
            alt: 'One mockup section isolated from the canopy, every panel labeled with its position code',
            width: 1800,
            height: 1012,
          },
          stamp: { project: 'Copper Façade', sheet: 'Mockup Marking' },
        },
        {
          kind: 'image',
          image: {
            src: '/assets/img/copper-facade-cutsheets.jpg',
            alt: 'Nested cutting sheets exported straight from the same definition, each panel pre-labeled',
            width: 1800,
            height: 1012,
          },
          stamp: { project: 'Copper Façade', sheet: 'Cutting Layout' },
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'Code',
      paragraphs: [["Internal tool, built for this project's fabrication pipeline."]],
    },
    {
      kind: 'mediaRow',
      wide: true,
      frames: [
        {
          kind: 'image',
          image: {
            src: '/assets/img/copper-facade-nodes.png',
            alt: 'The full Grasshopper definition: geometry, nesting, marking, and export in one script',
            width: 3600,
            height: 1386,
          },
          bare: true,
        },
        {
          kind: 'video',
          video: {
            src: '/assets/img/copper-facade-panel-fit.mp4',
            poster: '/assets/img/copper-facade-panel-fit-poster.jpg',
            title: 'How adjacent copper panels fit and lock together',
          },
          stamp: { project: 'Copper Façade', sheet: 'Panel Fit' },
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'Result',
      paragraphs: [
        [
          'Every panel in the cutting layout carries a position code that traces back to its exact spot on the roof, checked against the real canopy geometry rather than a synthetic test case.',
        ],
        [
          'The first bay is installed on site. The steel frame for the next one is up and waiting for its panels.',
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
            src: '/assets/img/copper-facade-canopy-structure.webp',
            alt: "The canopy's steel truss shown inside the triangulated panel skin it carries",
            width: 1800,
            height: 1005,
          },
          stamp: { project: 'Copper Façade', sheet: 'Canopy Structure' },
        },
        {
          kind: 'image',
          image: {
            src: '/assets/img/copper-facade-construction.jpg',
            alt: 'The bus station under construction, the first section of copper canopy mounted and the steel truss for the next section still exposed',
            width: 1800,
            height: 1005,
          },
        },
      ],
    },
  ],
};
