import type { Project, ProjectCard } from './types';

import { copperFacadeBishkek } from './projects/copper-facade-bishkek';
import { daylightMassing } from './projects/daylight-massing';
import { insolationMound } from './projects/insolation-mound';
import { jewelryCastingRisk } from './projects/jewelry-casting-risk';
import { mcpRhinoAgent } from './projects/mcp-rhino-agent';
import { panelNestingEngine } from './projects/panel-nesting-engine';
import { pedestrianFlow } from './projects/pedestrian-flow';
import { revitPanelExport } from './projects/revit-panel-export';
import { tessellationStudies } from './projects/tessellation-studies';
import { windComfort } from './projects/wind-comfort';

/**
 * Reading order for the whole site, ranked by how real each system is.
 *
 * This single array drives the index page, `generateStaticParams`, the sitemap,
 * and the previous/next links at the foot of every case page — so reordering a
 * project here moves it everywhere at once.
 */
export const projects: readonly Project[] = [
  mcpRhinoAgent,
  panelNestingEngine,
  copperFacadeBishkek,
  pedestrianFlow,
  revitPanelExport,
  daylightMassing,
  windComfort,
  jewelryCastingRisk,
  tessellationStudies,
  insolationMound,
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
 * How each project appears on the index page. Card copy is deliberately its own
 * text: it is a pitch, where the case page's `summary` is a description.
 */
export const cards: readonly ProjectCard[] = [
  {
    slug: 'mcp-rhino-agent',
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
    slug: 'panel-nesting-engine',
    placement: 'featured',
    reverse: true,
    blurb:
      'A custom C# packing engine for a triangulated canopy roof: an evolutionary search runs one packing strategy per CPU core, no-fit polygons built from Minkowski hulls keep panels from overlapping, and adjacent cut-cells stay paired so mating edges line up. It shipped. The roof is built.',
    frame: {
      kind: 'image',
      image: {
        src: '/assets/img/panel-nesting-engine-card.webp',
        alt: 'Photo of the built roof, plus the nested cut-sheet layout',
        width: 720,
        height: 482,
      },
    },
  },
  {
    slug: 'copper-facade-bishkek',
    placement: 'grid',
    blurb:
      'A single Grasshopper definition that takes a triangulated copper-panel canopy from geometry straight to labeled, ready-to-cut sheets, for a bus station under construction in Bishkek.',
    frame: {
      kind: 'image',
      image: {
        src: '/assets/img/copper-facade-bishkek-card.webp',
        alt: "Rendered visualization of the Bishkek bus station's copper canopy",
        width: 720,
        height: 402,
      },
    },
  },
  {
    slug: 'pedestrian-flow',
    placement: 'grid',
    meta: 'Grasshopper · Agent-based sim',
    blurb:
      'An agent-based pedestrian-flow plugin for Grasshopper, released on Food4Rhino: anyone can install it and run their own crowd simulation, not just look at a rendered result.',
    frame: {
      kind: 'video',
      video: {
        src: '/assets/img/pedestrian-flow-home.mp4',
        poster: '/assets/img/pedestrian-flow-card.webp',
        title: "CrowdFlow's pedestrian animation running",
      },
    },
  },
  {
    slug: 'revit-panel-export',
    placement: 'grid',
    blurb:
      'A Grasshopper-to-Revit bridge that exports parametric façade panels as scheduled Revit families. Panel count, area and type survive the round trip instead of being redrawn by hand.',
    frame: {
      kind: 'image',
      image: {
        src: '/assets/img/revit-panel-export-card.webp',
        alt: 'Revit family schedule + GH definition',
        width: 720,
        height: 479,
      },
    },
  },
  {
    slug: 'daylight-massing',
    placement: 'grid',
    blurb:
      'A daylight-driven massing optimizer that generates stepped, terraced forms directly from insolation constraints, not sculpted first and checked after.',
    frame: {
      kind: 'image',
      image: {
        src: '/assets/img/daylight-massing-card.webp',
        alt: 'Massing study, stepped sun-access diagram',
        width: 720,
        height: 482,
      },
    },
  },
  {
    slug: 'wind-comfort',
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
    slug: 'jewelry-casting-risk',
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
  {
    slug: 'tessellation-studies',
    placement: 'grid',
    blurb:
      'A set of tessellation and paneling algorithms for freeform surfaces, each built around one real constraint (minimum panel count, node repetition, fabrication limits) and treated as an engineering problem, not a decoration.',
    frame: {
      kind: 'image',
      image: {
        src: '/assets/img/tessellation-studies-card.webp',
        alt: 'Tiling pattern renders + GH definition',
        width: 720,
        height: 482,
      },
    },
  },
  {
    slug: 'insolation-mound',
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
];
