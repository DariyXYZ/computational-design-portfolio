import type { Project } from '../types';

export const voxelArchitecture: Project = {
  // Slug kept from the earlier framing: the page is already live under it, and
  // the rock-cut reading is a lens on the same work rather than new work.
  slug: 'voxel-architecture',
  title: 'Rock-cut architecture',
  tag: 'Study',
  summary:
    'Rock-cut architecture is made by excavating living rock: the building is whatever mass is left after material is taken away. Twenty-four studies that put that constraint into a Grasshopper rule — one Rhino layer is the living rock, another is the excavation, and the solver works top-down through complete storeys.',
  meta: 'Grasshopper · C# · Rock-cut studies',
  hero: {
    kind: 'video',
    video: {
      src: '/assets/img/voxel-architecture-hero.mp4',
      poster: '/assets/img/voxel-architecture-hero-poster.jpg',
      title: 'A cutter passing through a terraced mass, opening a void through the middle of it and closing again',
      width: 1576,
      height: 1080,
    },
  },
  heroSplit: true,
  blocks: [
    {
      kind: 'prose',
      heading: 'Excavating living rock',
      paragraphs: [
        [
          'The tradition is old, and scattered across places that never spoke to each other, and it holds to one rule: nothing is assembled. At Petra the façade is cut back into a cliff; the Kailasa temple at Ellora was excavated downward out of a basalt hill until it stood free inside its own pit; at Lalibela whole churches are monolithic, quarried out below the level of the ground around them.',
        ],
        [
          'The method carries its own discipline. Masons worked top-down, opening the roof of a space first so nothing fell on them, and needed neither scaffolding nor foundation because the rock overhead was still holding itself up. Nothing can be added afterwards. No cut can be undone. Anything that carries a load has to be mass somebody chose not to remove.',
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
            src: '/assets/img/voxel-architecture-catalogue.jpg',
            alt: 'Twenty-four rock-cut studies: cliff-cut arcades, free-standing monoliths, terraced quarries, sunken courtyards and hypogea, each excavated from a solid block',
            width: 2752,
            height: 1536,
          },
          wide: true,
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'The rule',
      paragraphs: [
        [
          'The studies put that constraint into a Grasshopper definition. One Rhino layer holds the living rock, another holds the excavation. The solver walks a grid of vertical columns through the mass, measures where each one is solid, subtracts whatever the cutters take out of it, and keeps the remainder — so a pillar here is never drawn. It is the stone the rule declined to remove.',
        ],
        [
          'It works top-down too, for a related reason. The top of every column is snapped down to the nearest level that still leaves a complete storey, and the ground floor, the typical floors and the top floor each carry their own height on levels shared across the whole model. Rock that cannot make a full storey is left uncut rather than trimmed to fit.',
        ],
      ],
    },
    {
      kind: 'codeMedia',
      image: {
        src: '/assets/img/voxel-architecture-nodes.png',
        alt: 'The definition behind the studies: the rock and cutter layers on the left, the C# solver that sets floor levels and column axes in the middle, then column construction, floor outlines and the merged mass on the right',
        width: 3575,
        height: 1101,
      },
    },
    {
      kind: 'metrics',
      items: [
        {
          value: '24',
          label: 'Excavations',
          note: 'Cliff-cut arcades, free-standing monoliths, terraced quarries and sunken courtyards, all out of one rule',
        },
        {
          value: '1',
          label: 'Operation',
          note: 'Subtraction — the only move the technique allows, and the only one the definition has',
        },
        {
          value: '2',
          label: 'Layers',
          note: 'One is living rock, the other is the excavation; moving an object between them changes what it does',
        },
        {
          value: '3',
          label: 'Storey kinds',
          note: 'Ground, typical and top each at their own height; rock that cannot make a full storey stays uncut',
        },
      ],
    },
  ],
};
