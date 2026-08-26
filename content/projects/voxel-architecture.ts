import type { Project } from '../types';

export const voxelArchitecture: Project = {
  slug: 'voxel-architecture',
  title: 'Voxels, by layer',
  tag: 'In Use',
  summary:
    'A Grasshopper definition that turns any massing into voxel blocks on a shared floor grid, with the ground, typical and top floors each at their own height — and geometry that builds or subtracts depending only on the Rhino layer it sits on.',
  meta: 'Grasshopper · C# · Voxel massing',
  hero: {
    kind: 'image',
    image: {
      src: '/assets/img/voxel-architecture-catalogue.jpg',
      alt: 'Twenty-four voxelised forms from the same definition: towers, arches, terraced mounds, courtyard blocks and cantilevers, all built from stacked cubes',
      width: 2752,
      height: 1536,
    },
  },
  blocks: [
    {
      kind: 'metrics',
      items: [
        {
          value: '24',
          label: 'Forms, one definition',
          note: 'Towers, arches, terraces, courtyards and cantilevers — every shape above came out of the same script',
        },
        {
          value: '2',
          label: 'Layers, no wiring',
          note: 'The model layer builds, the cutter layer subtracts — that is the entire interface',
        },
        {
          value: '3',
          label: 'Floor kinds',
          note: 'Ground, typical and top each carry their own height instead of one repeated slab',
        },
        {
          value: '1',
          label: 'Shared floor grid',
          note: 'Every block lands on the same levels, so nothing drifts half a storey',
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'Problem',
      paragraphs: [
        [
          'Voxelising a massing by hand means rebuilding it: slice the form floor by floor, array cubes inside each slice, then cut the openings back out. Move a wall and all of that is thrown away.',
        ],
        [
          'This is one Grasshopper definition instead, and the layer an object sits on is the whole interface. Drop geometry on the model layer and it becomes blocks; drop it on the cutter layer and it carves them away. Nothing to rewire, nothing to reselect.',
        ],
      ],
    },
    {
      kind: 'codeMedia',
      image: {
        src: '/assets/img/voxel-architecture-nodes.png',
        alt: 'The voxel definition: layer inputs and cutters on the left, the C# solver that lays out floor levels and cell axes in the middle, then rod construction, floor outlines and the merged model on the right',
        width: 3575,
        height: 1101,
      },
    },
    {
      kind: 'prose',
      heading: 'Result',
      paragraphs: [
        [
          'Floors are not one repeated slab. The ground floor, the typical floors and the top floor each carry their own height, and every block is snapped to a shared set of levels, so blocks line up across the whole model rather than drifting half a storey apart.',
        ],
        [
          'Internally it builds vertical rods on the grid rather than one cube at a time, then merges them into a single mesh. Three things come back: the merged model, the floor outlines as polylines, and the raw rods — so the result can be rendered, dimensioned, or taken apart again.',
        ],
      ],
    },
  ],
};
