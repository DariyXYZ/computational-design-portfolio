import type { Project } from '../types';

export const voxelArchitecture: Project = {
  // Slug kept from the earlier framing of this case: the page is already live
  // under it, and the rock-cut reading is a lens on the same work, not new work.
  slug: 'voxel-architecture',
  title: 'Carved, not built',
  tag: 'Study',
  summary:
    'A study of rock-cut architecture — the tradition where building means removing rather than adding. Twenty-four forms cut from solid mass by a single Grasshopper rule: geometry on one Rhino layer is stone, geometry on another is the chisel.',
  meta: 'Grasshopper · C# · Rock-cut studies',
  hero: {
    kind: 'image',
    image: {
      src: '/assets/img/voxel-architecture-catalogue.jpg',
      alt: 'A catalogue of twenty-four rock-cut studies: arcades, towers, terraced amphitheatres, sunken courtyards and eroded masses, each carved from a solid block on a voxel grid',
      width: 2752,
      height: 1536,
    },
  },
  blocks: [
    {
      kind: 'prose',
      heading: 'Removing, not adding',
      paragraphs: [
        [
          'Rock-cut architecture builds by not building. At Petra, at Ellora, at Lalibela, masons started from solid rock and made everything they made by taking material away. No frame, no assembly, no joint — the architecture is the void, and the structure is whatever mass was left standing around it.',
        ],
        [
          'This is a study of that logic treated as a rule rather than a style. If subtraction is the only operation available, what range of architecture falls out of it? The catalogue above is one answer — arcades, towers, terraced amphitheatres, courtyards sunk into a block — every one of them cut by the same procedure, the one below.',
        ],
      ],
    },
    {
      kind: 'codeMedia',
      image: {
        src: '/assets/img/voxel-architecture-nodes.png',
        alt: 'The definition behind the studies: layer inputs and cutters on the left, the C# solver that lays out floor levels and cell axes in the middle, then rod construction, floor outlines and the merged model on the right',
        width: 3575,
        height: 1101,
      },
    },
    {
      kind: 'prose',
      heading: 'The rule',
      paragraphs: [
        [
          'The chisel is a Rhino layer. Geometry on the model layer is stone; geometry on the cutter layer is the cut. Nothing is wired and nothing is reselected — moving an object from one layer to the other changes what it does to the mass.',
        ],
        [
          'What survives the cut resolves to a voxel grid, and that grid has storeys: the ground floor, the typical floors and the top floor each carry their own height, on levels shared across the whole model. The quarry face is measured, not only sculpted — which is what keeps these studies architecture rather than texture.',
        ],
      ],
    },
    {
      kind: 'metrics',
      items: [
        {
          value: '24',
          label: 'Forms cut',
          note: 'Arcades, towers, terraced amphitheatres and sunken courtyards, all out of one procedure',
        },
        {
          value: '1',
          label: 'Operation',
          note: 'Subtraction — the tradition’s only move, and this study’s only rule',
        },
        {
          value: '2',
          label: 'Layers, no wiring',
          note: 'One layer is stone, the other is the chisel; moving an object between them changes what it does',
        },
        {
          value: '3',
          label: 'Floor kinds',
          note: 'Ground, typical and top each at their own height, on levels shared across the model',
        },
      ],
    },
  ],
};
