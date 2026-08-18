import type { Project } from '../types';

export const daylightMassing: Project = {
  "slug": "daylight-massing",
  "title": "Massing shaped by sunlight",
  "tag": "Built",
  "summary": "A daylight-driven massing optimizer that generates stepped, terraced forms directly from insolation constraints, not sculpted first and checked after.",
  "meta": "Grasshopper · Daylight analysis",
  "hero": {
    "kind": "image",
    "image": {
      "src": "/assets/img/daylight-massing.jpg",
      "alt": "Massing study, stepped sun-access diagram",
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
          "Massing studies are often sculpted first and checked for daylight performance afterward, which means good-looking massing can fail the daylight requirement and has to be reworked from scratch."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Method",
      "paragraphs": [
        [
          "A daylight-driven massing optimizer that generates stepped, terraced massing directly from insolation constraints, so the form is a direct output of the daylight requirement instead of a guess that gets checked later."
        ]
      ]
    },
    {
      "kind": "mediaRow",
      "frames": [
        {
          "kind": "placeholder",
          "label": "Insolation map across the massing options",
          "icon": "image"
        }
      ]
    },
    {
      "kind": "prose",
      "heading": "Code",
      "paragraphs": [
        [
          "Internal tool."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Validation",
      "paragraphs": [
        [
          "Checked against the insolation constraint it was built to satisfy, on a real site."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Result",
      "paragraphs": [
        [
          "Built massing options that already satisfy the daylight constraint by construction, not by iteration."
        ]
      ]
    }
  ]
};
