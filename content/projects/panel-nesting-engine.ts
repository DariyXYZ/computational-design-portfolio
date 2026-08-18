import type { Project } from '../types';

export const panelNestingEngine: Project = {
  "slug": "panel-nesting-engine",
  "title": "The algorithm that cut a roof",
  "tag": "Built",
  "summary": "A custom C# packing engine for a triangulated canopy roof, run on real fabrication geometry. The roof it produced a cutting layout for is built.",
  "meta": "C# · Rhino · Genetic packing",
  "hero": {
    "kind": "image",
    "image": {
      "src": "/assets/img/panel-nesting-engine.jpg",
      "alt": "Photo of the built roof, plus the nested cut-sheet layout",
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
          "A triangulated canopy roof meant hundreds of uniquely-shaped panels that had to be packed onto standard stock sheets with minimal offcut, and panels sharing an edge on the roof needed to end up adjacent on the cutting layout, or assembly turns into a puzzle."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Method",
      "paragraphs": [
        [
          "A custom C# genetic-packing engine: one packing strategy per CPU core evaluated in parallel each generation, no-fit polygons computed via Minkowski hulls to test placements without overlap, and a mate-pairing step that keeps geometrically adjacent cut-cells next to each other on the sheet."
        ]
      ]
    },
    {
      "kind": "mediaRow",
      "frames": [
        {
          "kind": "placeholder",
          "label": "Nested cut-sheet layout, one sheet",
          "icon": "image"
        },
        {
          "kind": "placeholder",
          "label": "Packing algorithm structure",
          "icon": "diagram"
        }
      ]
    },
    {
      "kind": "prose",
      "heading": "Code",
      "paragraphs": [
        [
          "Not published yet. The core packing algorithm is on the list to open-source once it's cleaned up from the project-specific version."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Validation",
      "paragraphs": [
        [
          "Run directly against the real roof geometry, not a synthetic benchmark: sheet count and material utilization were checked against the actual stock sizes available for fabrication."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Result",
      "paragraphs": [
        [
          "The roof was built from the nested layout this engine produced."
        ]
      ]
    }
  ]
};
