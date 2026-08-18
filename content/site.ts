import type { RichText } from './types';

/** Site-level constants: identity, contacts, and the copy shared across pages. */

export const site = {
  name: 'Computational Design',
  /** Wordmark form: a non-breaking space keeps it on one line in the nav. */
  wordmark: 'Computational Design',
  title: 'Computational Design — Systems, not renders',
  description:
    "Dariy Nazarov's computational-design portfolio: Rhino and Grasshopper tools, fabrication systems, simulation, BIM interoperability, and AI-assisted geometry workflows.",
  /** Canonical origin + project path. Used for absolute metadata URLs. */
  url: 'https://dariyxyz.github.io/computational-design-portfolio',
  themeColor: '#0a0a0a',
  /** Falls back to this when a page defines no social image. */
  ogImage: '/assets/img/mcp-rhino-agent-cover-poster.jpg',
} as const;

export const person = {
  name: 'Dariy Nazarov',
  jobTitle: 'Computational Designer',
  email: 'dariy.nazarov@gmail.com',
  phone: '+79858843727',
  /** Display form; the separators are non-breaking so the number never wraps. */
  phoneLabel: '+7 985 884 37 27',
  telegram: 'https://t.me/dariy_nazarov',
  github: 'https://github.com/DariyXYZ',
} as const;

export const nav = [
  { href: '/#about', label: 'About' },
  { href: '/#systems', label: 'Systems' },
  { href: '/#contact', label: 'Contact' },
] as const;

export const home = {
  eyebrow: 'Computational Design Architect',
  heading: "Hi — I'm Dariy, a computational design architect.",
  stack: 'Grasshopper · C# · Python · Rhino.Inside.Revit · MCP',
  about: {
    heading: 'About me',
    paragraphs: [
      'Trained as an architect, not a developer, which is why these systems solve real fabrication and layout problems instead of showing off code for its own sake. Five years of architecture at MARCHI, three of them in its Algorithmic Design & Fabrication Studio, then a shift toward writing the tools rather than only using them: Grasshopper, C#, Python, whatever gets a real constraint solved.',
      "Currently pairing that with a Master's in Applied Informatics, and open to computational-design roles across the EU. The roof got built; the packing engine, the crowd-flow plugin, and the Rhino-driving agent are what's next to prove out.",
    ],
    facts: [
      'MARCHI · B.Arch, 2020–2025',
      'Togliatti State University · M.S. Informatics, 2025–2027',
    ],
    cta: 'Experience & partners',
  },
  systems: {
    heading: 'Selected Systems',
    intro:
      "Ten systems, ranked by how real they are: what shipped, what's built, and what's still a study. Each page separates shipped work, built outcomes, and studies; unfinished documentation remains explicitly marked.",
  },
  contact: {
    eyebrow: 'Contact',
    heading: "Let's build the next one.",
  },
  /** Closing note under the systems grid. */
  asideNote: [
    'Also built, not shown as headline work: ',
    { emphasis: 'a Grasshopper node-click heatmap' },
    ' for auditing design workflows, and ',
    { emphasis: 'a Telegram bot' },
    ' that collects tasks across architecture teams.',
  ] satisfies RichText,
} as const;
