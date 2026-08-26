import type { Project } from '../types';

export const pedestrianFlow: Project = {
  slug: 'pedestrian-flow',
  title: 'Crowd flow, published',
  tag: 'Published',
  summary:
    "An agent-based pedestrian-flow plugin for Grasshopper, published to Rhino's package registry: anyone can install CrowdFlow from the Package Manager and run their own simulation.",
  meta: 'Grasshopper · C# · Agent-based sim',
  hero: {
    kind: 'video',
    video: {
      src: '/assets/img/pedestrian-flow-people.mp4',
      poster: '/assets/img/pedestrian-flow-people-poster.jpg',
      title: 'Agents walking the floor plan over a live throughput heatmap',
    },
  },
  // Method, then how it ships, then what comes out of it. Media between each.
  blocks: [
    {
      kind: 'prose',
      heading: 'Method',
      paragraphs: [
        [
          'Comparing two circulation layouts usually means arguing from intuition, or waiting on a specialist with dedicated simulation software. Neither fits the week where the plan is still moving.',
        ],
        [
          'CrowdFlow puts the simulation inside Grasshopper. Define the floor, obstacles, sources and exits, set an agent profile, and the solver runs until every agent has left rather than stopping at a shared clock.',
        ],
        [
          'What comes back is Grasshopper geometry, so it stays in the file the plan already lives in: agent trajectories, and five heatmaps reading the same run from different angles — density, speed, occupancy, throughput and congestion. Move a wall and they rebuild, which is what makes a layout arguable in the same sitting.',
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
            src: '/assets/img/pedestrian-flow-install.mp4',
            poster: '/assets/img/pedestrian-flow-install-poster.jpg',
            title: "Installing CrowdFlow from Rhino's Package Manager",
          },
        },
        {
          kind: 'video',
          video: {
            src: '/assets/img/pedestrian-flow-template.mp4',
            poster: '/assets/img/pedestrian-flow-template-poster.jpg',
            title: 'The bundled template definition: import, assemble, solve, display',
          },
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'Published',
      paragraphs: [
        [
          'Version 0.1.3.2 is live on ',
          { text: "Rhino's package registry", href: 'https://yak.rhino3d.com/packages/crowdflow' },
          ': search for ',
          { emphasis: 'crowdflow' },
          ' in the Package Manager, install, restart. The package carries builds for both Rhino 7 and Rhino 8, and ships a ready template so the first run needs no setup. Source is on ',
          { text: 'GitHub', href: 'https://github.com/DariyXYZ/grasshopper-crowd-flow' },
          '.',
        ],
        [
          'Thirteen components under one Crowd tab: floor, obstacle, source, exit and agent profile to build the scene, one node to solve it, then heatmap, legend, people preview, image export, report export and the template opener.',
        ],
      ],
      aside: {
        kind: 'image',
        image: {
          src: '/assets/img/pedestrian-flow-toolbar.png',
          alt: "CrowdFlow's Crowd tab in the Grasshopper ribbon, all thirteen components",
          width: 536,
          height: 178,
        },
      },
    },
    {
      kind: 'mediaRow',
      wide: true,
      frames: [
        {
          kind: 'video',
          video: {
            src: '/assets/img/pedestrian-flow-heatmap.mp4',
            poster: '/assets/img/pedestrian-flow-heatmap-poster.jpg',
            title: 'Moving a volume rebuilds the throughput heatmap immediately',
          },
          wide: true,
        },
      ],
    },
    {
      kind: 'mediaRow',
      wide: true,
      frames: [
        {
          kind: 'image',
          image: {
            src: '/assets/img/pedestrian-flow-nodes.png',
            alt: 'The full CrowdFlow definition: assembly, calculation, heatmap and pedestrian-animation display, PNG export, and automatic Word/PDF report generation',
            width: 3600,
            height: 1360,
          },
          bare: true,
          wide: true,
        },
      ],
    },
    {
      kind: 'prose',
      heading: 'Result',
      paragraphs: [
        [
          'Every run answers with numbers, not just a picture, and they come out of the solver node into an exported DOCX and PDF report — the thing that actually reaches a client meeting, instead of a screenshot pasted into a deck.',
        ],
        [
          'It ships as a package rather than a file passed around the studio. Five releases between 27 April and 14 May 2026 took it from a first working solver to something an architect installs, opens on the bundled demo scene, and points at their own plan the same afternoon.',
        ],
      ],
    },
    {
      kind: 'metrics',
      items: [
        {
          value: '0.1.3.2',
          label: 'Published version',
          note: 'Live on the Rhino package registry — search, install, restart',
        },
        {
          value: '13',
          label: 'Components, one tab',
          note: 'Floor, obstacle, source, exit and agent profile, the solver, heatmaps, exports and the template opener',
        },
        {
          value: '5',
          label: 'Heatmaps per run',
          note: 'Density, speed, occupancy, throughput and congestion, all read off the same solve',
        },
        {
          value: '4',
          label: 'Numbers in the report',
          note: 'Clearance time, mean travel time, peak density and the exit split, exported to DOCX and PDF',
        },
      ],
    },
  ],
};
