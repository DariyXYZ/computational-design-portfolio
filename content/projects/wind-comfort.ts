import type { Project } from '../types';

export const windComfort: Project = {
  "slug": "wind-comfort",
  "title": "Wind comfort, without the queue",
  "tag": "In Use",
  "summary": "A wind-comfort analysis tool built so architects can run it themselves, end to end, without waiting on the computational-design department.",
  "meta": "Grasshopper · ParaView · UX for internal tools",
  "hero": {
    "kind": "video",
    "video": {
      "src": "/assets/img/wind-comfort-demo.mp4",
      "poster": "/assets/img/wind-comfort-demo-poster.jpg",
      "title": "Wind-flow calculation running against a building's geometry"
    }
  },
  "blocks": [
    {
      "kind": "prose",
      "heading": "Problem",
      "paragraphs": [
        [
          "Checking pedestrian wind comfort around a building normally means sending the geometry to the computational-design department and waiting for a result, which turns a quick design question into a multi-day queue."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Method",
      "paragraphs": [
        [
          "A Grasshopper definition that runs a wind-flow calculation against the building's geometry and its surroundings, scored against the Lawson wind-comfort criteria, then previewed either in Grasshopper or as a full flow field in ParaView. The real work here wasn't the solver, it was the interface around it: numbered setup steps, a sequential three-step run button so a multi-stage calculation can't be triggered out of order, inline file-naming rules to stop the file system from breaking a run, and a settings panel written for an architect, not a script."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Code",
      "paragraphs": [
        [
          "Internal tool, built for a specific project pipeline."
        ]
      ]
    },
    {
      "kind": "codeMedia",
      "image": {
        "src": "/assets/img/wind-comfort-nodes.png",
        "alt": "The full wind-comfort definition: setup, geometry check, staged calculation, result display, and export",
        "width": 2400,
        "height": 471
      }
    },
    {
      "kind": "prose",
      "heading": "Validation",
      "paragraphs": [
        [
          "Checked against the Lawson comfort criteria the tool scores against, and against real project geometry in ParaView, before being handed to architects to run unsupervised."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Result",
      "paragraphs": [
        [
          "Architects run their own wind-comfort checks end to end now, PNG export and Word/PDF report included, without opening a ticket with the computational-design team first."
        ]
      ]
    }
  ]
};
