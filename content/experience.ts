import type { ImageAsset, RichText } from './types';

/** One role, in reverse-chronological order on the Experience page. */
export type ExperienceEntry = {
  /** Left column: the period, as loose as the record actually is. */
  when: string;
  organisation: string;
  role: string;
  /** Lead paragraph, before any bullet list. */
  description: RichText;
  /** Bullets carry emphasis for the tool or product name that leads them. */
  bullets?: ReadonlyArray<RichText>;
  /** Tech line, omitted for the short internships. */
  meta?: string;
};

export const experiencePage = {
  breadcrumb: 'Experience',
  heading: 'Architecture, tools, and production workflows.',
  summary:
    'Computational designer with architectural training from MARCHI, building project-facing tools at IND and teaching parametric design at HSE. The work spans pedestrian simulation, Rhino–Revit interoperability, performance analysis, fabrication logic, and LLM-assisted modeling in Rhino.',
  meta: 'IND · HSE · RAUM · PIK · Kleinewelt Architekten · MARCHI',
  portrait: {
    src: '/assets/img/portrait-600.webp',
    alt: 'Portrait of Dariy Nazarov',
    width: 600,
    height: 600,
  } satisfies ImageAsset,
} as const;

export const experience: readonly ExperienceEntry[] = [
  {
    when: 'Sep 2024 – present',
    organisation: 'IND',
    role: 'Computational Designer',
    description: [
      'Developing project-facing tools across concept design, analysis, BIM, and fabrication:',
    ],
    bullets: [
      [
        { emphasis: 'CrowdFlow' },
        ", a pedestrian-simulation plugin for Grasshopper published through Rhino's Package Manager",
      ],
      [
        'A Rhino.Inside.Revit bridge that exports parametric façade panels as scheduled Revit families',
      ],
      ['Daylight-driven massing and architect-operated wind-comfort workflows'],
      [
        'A custom C# genetic-packing engine for the triangulated canopy of a Bishkek bus station, paired with fabrication documentation and casting-feasibility checks',
      ],
      [
        'A public rule-and-scenario library over the Model Context Protocol that lets an LLM operate Rhino directly — creating and inspecting geometry, running solvers, and reading model state across multiple architectural workflows',
      ],
    ],
    meta: 'Grasshopper · C# · Python · Rhino.Inside.Revit · RhinoMCP · Environmental analysis · Digital fabrication',
  },
  {
    when: 'Current',
    organisation: 'HSE — Higher School of Economics',
    role: "Tutor, Industrial Design Master's Program",
    description: [
      'Teaching parametric design, generative systems, production-oriented workflows, and 3D modeling. Students translate fabrication constraints into reusable Grasshopper definitions instead of resolving each form as a one-off model.',
    ],
    meta: 'Grasshopper · Generative systems · 3D modeling · Digital fabrication',
  },
  {
    when: '2024',
    organisation: 'RAUM',
    role: 'Parametric Designer, contract',
    description: [
      'Built generative definitions for sculptural lighting forms, turning proportions and production constraints into reusable systems capable of producing related families of fabrication-ready variants.',
    ],
    meta: 'Grasshopper · Generative form · Fabrication constraints',
  },
  {
    when: 'Jul 2026',
    organisation: 'PIK',
    role: 'Design Intern, Land Assets Block · one-month internship',
    description: [
      "Contributed to early-stage architectural concept development across multiple sites, exploring alternative design directions within the project team's requirements.",
    ],
  },
  {
    when: '—',
    organisation: 'Kleinewelt Architekten',
    role: 'Architectural Intern · one-month internship',
    description: [
      'Supported the project team in developing and comparing architectural concepts during the early design stage.',
    ],
  },
  {
    when: '2020 – 2023',
    organisation: 'MARCHI',
    role: 'Algorithmic Design & Fabrication Studio',
    description: [
      "Completed three years in MARCHI's parametric architecture track alongside the architecture and structures curriculum, developing constraint-based tessellation studies, fabrication workflows, research prototypes, and physical models as documented team systems.",
    ],
    meta: 'Grasshopper · Parametric architecture · Tessellation · Physical fabrication',
  },
];
