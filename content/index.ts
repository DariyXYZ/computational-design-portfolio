import type { Band, Project, ProjectCard } from './types';

import { copperFacadeBishkek } from './projects/copper-facade-bishkek';
import { insolationMound } from './projects/insolation-mound';
import { jewelryCastingRisk } from './projects/jewelry-casting-risk';
import { kineticSculpture } from './projects/kinetic-sculpture';
import { mcpRhinoAgent } from './projects/mcp-rhino-agent';
import { pedestrianFlow } from './projects/pedestrian-flow';
import { solutionsHub } from './projects/solutions-hub';
import { voxelArchitecture } from './projects/voxel-architecture';
import { windComfort } from './projects/wind-comfort';

/**
 * Reading order for the whole site, ranked by how real each system is.
 *
 * This single array drives the index page, `generateStaticParams`, the sitemap,
 * and the previous/next links at the foot of every case page — so reordering a
 * project here moves it everywhere at once.
 */
export const projects: readonly Project[] = [
  // Built & shipped
  mcpRhinoAgent,
  copperFacadeBishkek,
  pedestrianFlow,
  // In use
  solutionsHub,
  windComfort,
  insolationMound,
  // Studies
  kineticSculpture,
  voxelArchitecture,
  jewelryCastingRisk,
];

export const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

export function getProject(slug: string): Project | undefined {
  return projectsBySlug.get(slug);
}

/**
 * Previous/next case, wrapping at both ends so the footer is never a dead end.
 * The old build hard-coded these links into each generated page.
 */
export function neighbours(slug: string): { previous: Project; next: Project } {
  const index = projects.findIndex((project) => project.slug === slug);
  const count = projects.length;
  return {
    previous: projects[(index - 1 + count) % count]!,
    next: projects[(index + 1) % count]!,
  };
}

/**
 * The index's three bands, in order. A system earns its place by what exists in
 * the world, not by how interesting it is.
 */
export const bands: readonly Band[] = [
  {
    id: 'built',
    label: 'Built & shipped',
    note: 'Public, published, or standing on site',
  },
  {
    id: 'in-use',
    label: 'In use',
    note: 'Running inside a studio on live projects',
  },
  {
    id: 'studies',
    label: 'Studies & prototypes',
    note: 'Working, not yet load-bearing',
  },
];

/**
 * How each project appears on the index page. Card copy is deliberately its own
 * text: it is a pitch, where the case page's `summary` is a description.
 */
export const cards: readonly ProjectCard[] = [
  {
    slug: 'mcp-rhino-agent',
    band: 'built',
    placement: 'featured',
    blurb:
      'A rule-and-scenario library, exposed through the Model Context Protocol, that lets a language model place geometry, run solvers, and read back model state directly inside Rhino, no macros, no screen-scraping. Public on GitHub.',
    frame: {
      kind: 'video',
      video: {
        src: '/assets/img/mcp-rhino-agent-cover.mp4',
        poster: '/assets/img/mcp-rhino-agent-card.webp',
        title: 'Cycling through one pipeline: site data, zoning, building envelope, massing',
      },
    },
  },
  
  
  {
    slug: 'copper-facade-bishkek',
    band: 'built',
    placement: 'featured',
    reverse: true,
    blurb:
      'A single Grasshopper definition that takes a triangulated copper-panel canopy from geometry straight to labeled, ready-to-cut sheets, for a bus station under construction in Bishkek.',
    frame: {
      kind: 'image',
      image: {
        src: '/assets/img/copper-facade-canopy-structure.webp',
        alt: "The canopy's steel truss shown inside its triangulated panel skin",
        width: 2752,
        height: 1536,
      },
    },
  },
  
  
  {
    slug: 'pedestrian-flow',
    band: 'built',
    placement: 'grid',
    meta: 'Grasshopper · C# · Agent-based sim',
    blurb:
      "An agent-based pedestrian-flow plugin for Grasshopper, published to Rhino's package registry: anyone can install CrowdFlow from the Package Manager and run their own simulation, not just look at a rendered result.",
    frame: {
      kind: 'video',
      video: {
        src: '/assets/img/pedestrian-flow-home.mp4',
        poster: '/assets/img/pedestrian-flow-home-poster.jpg',
        title: "CrowdFlow's pedestrian animation running over a live heatmap",
      },
    },
  },
  
  
  
  
  {
    slug: 'solutions-hub',
    band: 'in-use',
    placement: 'featured',
    blurb:
      "A Telegram Mini App that puts the department's 41 ready scripts, tools and project algorithms in front of architects first, and turns everything else into a request with its context attached, straight onto the department's Pyrus board.",
    frame: {
      kind: 'image',
      image: {
        src: '/assets/img/solutions-hub-card.webp',
        alt: 'The Mini App on a phone, showing a topic card',
        width: 960,
        height: 720,
      },
    },
  },
  
  
  
  
  {
    slug: 'wind-comfort',
    band: 'in-use',
    placement: 'grid',
    blurb:
      'A wind-comfort analysis tool built so architects can run it themselves, end to end, without waiting on the computational-design department.',
    frame: {
      kind: 'video',
      video: {
        src: '/assets/img/wind-comfort-demo.mp4',
        poster: '/assets/img/wind-comfort-card.webp',
        title: "Wind-flow calculation running against a building's geometry",
      },
    },
  },
  
  
  {
    slug: 'insolation-mound',
    band: 'in-use',
    placement: 'grid',
    blurb:
      'A Grasshopper plugin, built from scratch: a site-wide solar heatmap, a per-window insolation check, and a voxel mound that flags the darkest windows automatically.',
    frame: {
      kind: 'image',
      image: {
        src: '/assets/img/insolation-mound-card.webp',
        alt: 'Voxel insolation mound built from per-window results',
        width: 720,
        height: 720,
      },
    },
  },
  
  
  {
    slug: 'kinetic-sculpture',
    band: 'studies',
    placement: 'grid',
    blurb:
      'A kinetic sculpture of folded paper flowers on cables. One Grasshopper rule sends waves of opening across the whole grid, and the motion goes on to 3ds Max as a point cache.',
    frame: {
      kind: 'video',
      video: {
        src: '/assets/img/kinetic-sculpture-card.mp4',
        poster: '/assets/img/kinetic-sculpture-card-poster.jpg',
        title: 'Paper flowers opening and folding in a wave across the hanger grid',
      },
    },
  },
  {
    slug: 'voxel-architecture',
    band: 'studies',
    placement: 'grid',
    blurb:
      'Rock-cut architecture is made by excavating living rock — the building is whatever mass is left. Twenty-four studies that put that constraint into one Grasshopper rule.',
    frame: {
      kind: 'image',
      image: {
        // Twenty of the twenty-four; the case page still opens on the full
        // catalogue. Padded left and right with its own background so the
        // 16/10 card frame shows it whole rather than cropping the outer rows.
        src: '/assets/img/voxel-architecture-card.jpg',
        alt: 'Twenty voxelised forms from the same definition: towers, arches, terraced mounds, courtyard blocks and cantilevers',
        width: 2627,
        height: 1642,
      },
    },
  },
  {
    slug: 'jewelry-casting-risk',
    band: 'studies',
    placement: 'grid',
    meta: 'Grasshopper · C# · Jewelry casting',
    blurb:
      'A Grasshopper C# preflight tool that checks a jewelry mesh for thin sections, abrupt transitions, and fragile detail, adjusted for the selected metal and casting process.',
    frame: {
      kind: 'image',
      image: {
        src: '/assets/img/jewelry-casting-risk-cover-card.webp',
        alt: 'Color-coded casting-risk analysis over a Grasshopper definition',
        width: 720,
        height: 405,
      },
    },
  },
  
  
];
