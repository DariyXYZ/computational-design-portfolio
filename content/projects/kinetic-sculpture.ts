import type { Project } from '../types';

export const kineticSculpture: Project = {
  slug: 'kinetic-sculpture',
  title: 'A ceiling of paper flowers',
  tag: 'Design Proposal',
  summary:
    'A kinetic sculpture for an atrium: hundreds of folded paper modules hung on cables, opening and closing in waves that one shared rule drives across the whole hanger grid.',
  meta: 'Grasshopper · Rhino · 3ds Max',
  hero: {
    kind: 'video',
    wide: true,
    video: {
      src: '/assets/img/kinetic-sculpture-wave.mp4',
      poster: '/assets/img/kinetic-sculpture-wave-poster.jpg',
      title: 'A wave of opening rolling across the grid of folded modules, red closed, blue fully open',
      width: 1440,
      height: 1080,
    },
  },
  blocks: [
    {
      kind: 'prose',
      heading: 'Method',
      paragraphs: [
        [
          'The brief was a moving piece for the public areas of a new building: the escalator atrium and the gallery above it. Each module is a folded paper flower on its own cable, and every flower has one state, how far it is open.',
        ],
        [
          'Instead of animating flowers one by one, a single Grasshopper definition sets that state for the whole grid at once. A wave is a field passing over the hanger points: where it peaks, the flowers open into flat hexagons; behind it they fold shut again. Changing the wave changes the whole sculpture, so a new pattern is a new rule, not a new animation.',
        ],
      ],
    },
    {
      kind: 'mediaRow',
      wide: true,
      frames: [
        {
          kind: 'video',
          video: {
            src: '/assets/img/kinetic-sculpture-atrium.mp4',
            poster: '/assets/img/kinetic-sculpture-atrium-poster.jpg',
            title: 'The sculpture placed in the atrium model, waves running along the gallery and over the escalators',
            width: 1920,
            height: 1170,
          },
          stamp: { project: 'Kinetic Sculpture', sheet: 'Atrium' },
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'From Grasshopper to a render',
      paragraphs: [
        [
          'Rhino cannot write an animated Alembic, so the motion leaves Grasshopper as geometry plus a point cache: one OBJ of the first frame and a PC2 file with every vertex position on every frame. A script steps the frame slider, collects the meshes and writes the cache; 3ds Max reads it back with a Point Cache modifier, ready for the visualisers.',
        ],
      ],
    },
    {
      kind: 'mediaRow',
      wide: true,
      frames: [
        {
          kind: 'video',
          video: {
            src: '/assets/img/kinetic-sculpture-escalator.mp4',
            poster: '/assets/img/kinetic-sculpture-escalator-poster.jpg',
            title: 'View from the escalators: rows of paper flowers opening and folding overhead',
            width: 1440,
            height: 1124,
          },
          stamp: { project: 'Kinetic Sculpture', sheet: 'Escalator View' },
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'Result',
      paragraphs: [
        [
          'A set of motion variants, each checked from the escalators and the gallery in the real atrium model, and a scene the visualisation team can render without touching Grasshopper.',
        ],
        [
          'The logic is not tied to this flower: a different module or a different hanger grid goes through the same definition.',
        ],
      ],
    },
  ],
};
