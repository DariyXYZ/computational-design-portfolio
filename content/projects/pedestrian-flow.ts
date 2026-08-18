import type { Project } from '../types';

export const pedestrianFlow: Project = {
  "slug": "pedestrian-flow",
  "title": "Crowd flow, published",
  "tag": "Published",
  "summary": "An agent-based pedestrian-flow plugin for Grasshopper, released on Food4Rhino, with a full pipeline from agent behavior to a heatmap export and an automatic client report.",
  "meta": "Grasshopper · C# · Agent-based sim",
  "hero": {
    "kind": "video",
    "video": {
      "src": "/assets/img/pedestrian-flow-heatmap.mp4",
      "poster": "/assets/img/pedestrian-flow-heatmap-poster.jpg",
      "title": "CrowdFlow computing a density heatmap in real time"
    }
  },
  "blocks": [
    {
      "kind": "prose",
      "heading": "Problem",
      "paragraphs": [
        [
          "Most crowd-simulation tools for architecture are either locked inside expensive specialist software or exist only as one-off scripts nobody else can run, and the ones that do run rarely hand back anything a client can read."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Method",
      "paragraphs": [
        [
          "An agent-based pedestrian-flow plugin for Grasshopper, published on Food4Rhino and Rhino's Yak package manager: define the site boundary, obstacles, entries and exits, then tune a real agent-behavior profile, preferred speed, reaction time, neighbor repulsion, wall avoidance, and about twenty other parameters, before running the simulation. The same definition displays both a density heatmap and the raw pedestrian animation, so a result can be watched moving, not just read as a static map."
        ]
      ],
      "aside": {
        "kind": "image",
        "image": {
          "src": "/assets/img/pedestrian-flow-toolbar.png",
          "alt": "CrowdFlow's own tab in Grasshopper's ribbon, installed like any other plugin",
          "width": 232,
          "height": 150
        }
      }
    },
    {
      "kind": "prose",
      "heading": "Code",
      "paragraphs": [
        [
          "Published on Food4Rhino and Rhino's Yak package manager: publicly downloadable and installable by any Rhino user, not a private demo."
        ]
      ]
    },
    {
      "kind": "codeMedia",
      "image": {
        "src": "/assets/img/pedestrian-flow-nodes.png",
        "alt": "The full CrowdFlow definition: assembly, calculation, heatmap and pedestrian-animation display, PNG export, and automatic Word/PDF report generation",
        "width": 2400,
        "height": 906
      }
    },
    {
      "kind": "prose",
      "heading": "Validation",
      "paragraphs": [
        [
          "Checked against a real floorplan scenario, not a synthetic grid, for plausible crowd behavior: queueing, lane formation, and bottleneck avoidance. Validated at scale, too: a 600-agent run completes in roughly 13–22 seconds."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Result",
      "paragraphs": [
        [
          "A tool other people have actually installed and run, not just a video of it running once. The same definition also exports the heatmap as an image and generates a Word/PDF report with the project and site details filled in automatically, so a result becomes a deliverable, not just a screenshot."
        ]
      ]
    }
  ]
};
