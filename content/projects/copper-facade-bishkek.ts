import type { Project } from '../types';

export const copperFacadeBishkek: Project = {
  "slug": "copper-facade-bishkek",
  "title": "One script, from form to fabrication",
  "tag": "In Progress",
  "summary": "A single Grasshopper definition that takes a triangulated copper-panel canopy from geometry straight to labeled, ready-to-cut sheets, for a bus station under construction in Bishkek.",
  "meta": "Grasshopper · Rhino · Panel nesting & marking",
  "hero": {
    "kind": "image",
    "image": {
      "src": "/assets/img/copper-facade-bishkek.jpg",
      "alt": "Rendered visualization of the Bishkek bus station's copper canopy",
      "width": 1600,
      "height": 893
    }
  },
  "blocks": [
    {
      "kind": "prose",
      "heading": "Problem",
      "paragraphs": [
        [
          "A triangulated copper canopy means hundreds of uniquely-shaped panels, and that normally means three separate handoffs: one model for the form, a second pass to nest the panels onto stock sheets, and a third round of manual labeling so the fabricator knows which cut panel goes where on the building."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Method",
      "paragraphs": [
        [
          "One Grasshopper definition that stays a single script end to end: it generates the canopy's triangulated geometry, nests the panels onto cutting sheets, and labels every panel with its own position code, roof zone, row, column, left or right pair, then exports per-layer lines ready to hand straight to the cutter. Nothing gets redrawn or relabeled by hand between the model and the fabricator."
        ]
      ]
    },
    {
      "kind": "mediaRow",
      "frames": [
        {
          "kind": "image",
          "image": {
            "src": "/assets/img/copper-facade-elevation.jpg",
            "alt": "Annotated elevation calling out the copper-bronze panel system, curtain wall, mullions, guardrail, and ground-floor glazing",
            "width": 1900,
            "height": 1060
          },
          "wide": true,
          "stamp": {
            "project": "Copper Façade",
            "sheet": "Facade Elevation"
          }
        },
        {
          "kind": "image",
          "image": {
            "src": "/assets/img/copper-facade-marking.jpg",
            "alt": "One mockup section isolated from the canopy, every panel labeled with its position code",
            "width": 1800,
            "height": 1012
          },
          "wide": true,
          "stamp": {
            "project": "Copper Façade",
            "sheet": "Mockup Marking"
          }
        },
        {
          "kind": "image",
          "image": {
            "src": "/assets/img/copper-facade-cutsheets.jpg",
            "alt": "Nested cutting sheets exported straight from the same definition, each panel pre-labeled",
            "width": 1800,
            "height": 1012
          },
          "wide": true,
          "stamp": {
            "project": "Copper Façade",
            "sheet": "Cutting Layout"
          }
        }
      ],
      "wide": true
    },
    {
      "kind": "prose",
      "heading": "Code",
      "paragraphs": [
        [
          "Internal tool, built for this project's fabrication pipeline."
        ]
      ]
    },
    {
      "kind": "codeMedia",
      "image": {
        "src": "/assets/img/copper-facade-nodes.png",
        "alt": "The full Grasshopper definition: geometry, nesting, marking, and export in one script",
        "width": 2600,
        "height": 1001
      }
    },
    {
      "kind": "mediaRow",
      "frames": [
        {
          "kind": "video",
          "video": {
            "src": "/assets/img/copper-facade-panel-fit.mp4",
            "poster": "/assets/img/copper-facade-panel-fit-poster.jpg",
            "title": "How adjacent copper panels fit and lock together"
          },
          "wide": true,
          "stamp": {
            "project": "Copper Façade",
            "sheet": "Panel Fit"
          }
        }
      ],
      "wide": true
    },
    {
      "kind": "prose",
      "heading": "Validation",
      "paragraphs": [
        [
          "Checked against the real triangulated canopy geometry for this project, not a synthetic test case: every panel in the cutting layout carries a position code that traces back to its exact spot on the roof."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Result",
      "paragraphs": [
        [
          "A physical mockup is next, followed by real construction. The same script that placed the panels is the one handing the cutter their sheets, with the marking already on them."
        ]
      ]
    }
  ]
};
