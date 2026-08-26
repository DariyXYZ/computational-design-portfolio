import type { Project } from '../types';

export const revitPanelExport: Project = {
  "slug": "revit-panel-export",
  "title": "Geometry that keeps its parameters",
  "tag": "In Use",
  "summary": "A Grasshopper-to-Revit bridge that exports parametric façade panels as scheduled Revit families, with panel count, area, and type intact.",
  "meta": "Rhino.Inside.Revit · Revit API",
  "hero": {
    "kind": "image",
    "image": {
      "src": "/assets/img/revit-panel-export.jpg",
      "alt": "Revit family schedule + GH definition",
      "width": 900,
      "height": 599
    }
  },
  "blocks": [
    {
      "kind": "prose",
      "heading": "Problem",
      "paragraphs": [
        [
          "Parametric façade panels designed in Grasshopper usually have to be redrawn by hand in Revit to become schedulable BIM families, and that redraw step is where panel count, area, and type information gets lost or introduces errors."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Method",
      "paragraphs": [
        [
          "A Grasshopper-to-Revit bridge, built on Rhino.Inside.Revit, that exports panel geometry directly as scheduled Revit families with their parameters intact."
        ]
      ]
    },
    {
      "kind": "mediaRow",
      "frames": [
        {
          "kind": "placeholder",
          "label": "Revit schedule, panel count and area",
          "icon": "image"
        },
        {
          "kind": "placeholder",
          "label": "GH definition, export step",
          "icon": "diagram"
        }
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
      "kind": "prose",
      "heading": "Validation",
      "paragraphs": [
        [
          "Checked by comparing the resulting Revit schedule (panel count, area, type) against the source Grasshopper definition after a full round trip."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Result",
      "paragraphs": [
        [
          "In active use: panels move from Grasshopper to a real Revit schedule without a manual redraw step."
        ]
      ]
    },
    {
      kind: 'metrics',
      items: [
        {
          value: '0',
          label: 'Manual redraws',
          note: 'Geometry lands as a schedulable family, not as imported shapes to re-type',
        },
        {
          value: '3',
          label: 'Parameters preserved',
          note: 'Panel count, area and type survive the round trip instead of being retyped',
        },
        {
          value: 'Verified',
          label: 'Round trip',
          note: 'The resulting Revit schedule compared back against the source definition',
        },
      ],
    },
  ],
};
