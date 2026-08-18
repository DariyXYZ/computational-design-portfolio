import type { Project } from '../types';

export const tessellationStudies: Project = {
  "slug": "tessellation-studies",
  "title": "Tiling patterns as constraint problems",
  "tag": "Study",
  "summary": "A set of tessellation and paneling algorithms for freeform surfaces, each built around one real constraint and treated as an engineering problem, not a decoration.",
  "meta": "Grasshopper · C# · Computational geometry",
  "hero": {
    "kind": "image",
    "image": {
      "src": "/assets/img/tessellation-studies.jpg",
      "alt": "Tiling pattern renders + GH definition",
      "width": 900,
      "height": 603
    }
  },
  "blocks": [
    {
      "kind": "prose",
      "heading": "Problem",
      "paragraphs": [
        [
          "Freeform-surface tiling and paneling is often shown as a rendered pattern with no explanation of what problem it's actually solving."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Method",
      "paragraphs": [
        [
          "A set of tessellation and paneling algorithms for freeform surfaces, each built around one explicit constraint (minimum panel count, node-type repetition, or a fabrication limit), so the pattern is the answer to a stated problem, not a decoration."
        ]
      ]
    },
    {
      "kind": "mediaRow",
      "frames": [
        {
          "kind": "placeholder",
          "label": "Pattern study, panel-count variant",
          "icon": "image"
        },
        {
          "kind": "placeholder",
          "label": "Pattern study, node-repetition variant",
          "icon": "image"
        }
      ]
    },
    {
      "kind": "prose",
      "heading": "Code",
      "paragraphs": [
        [
          "Grasshopper definitions, C#, not yet published."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Validation",
      "paragraphs": [
        [
          "Each pattern checked against its stated constraint (panel count, node repetition, or fabrication limit) rather than judged by appearance alone."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Result",
      "paragraphs": [
        [
          "A set of documented studies, ready to apply to a real project once one calls for this kind of surface."
        ]
      ]
    }
  ]
};
