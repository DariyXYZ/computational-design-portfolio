import type { Project } from '../types';

export const insolationMound: Project = {
  "slug": "insolation-mound",
  "title": "The insolation toolkit",
  "tag": "In Use",
  "summary": "A Grasshopper plugin built from scratch: a site-wide solar heatmap, a per-window insolation check, and a voxel mound that turns those results into a form, flagging the darkest windows automatically instead of by eye.",
  "meta": "Grasshopper · Insolation analysis",
  "blocks": [
    {
      "kind": "prose",
      "heading": "Problem",
      "paragraphs": [
        [
          "Insolation gets checked in three disconnected passes: a site heatmap in one file, a manual ray-trace for a suspect window in another, a mound or write-up assembled by hand from both — three workflows that don't share geometry, and nothing a new team member can run without being walked through each one from an empty canvas."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Method",
      "paragraphs": [
        [
          "One Grasshopper plugin, written from scratch, covering three connected tools instead of three separate files: a site-wide solar heatmap scoring every ground cell in hours of light; a per-window check that traces real sun rays against the surrounding massing and returns Ok / NotOk / PartialOk per window; and a voxel mound built directly from those per-window results, so the worst-lit windows in the whole building show up as low points in a form, not a row in a spreadsheet. Every tool ships with template presets, so a new user opens a preconfigured file instead of wiring the definition themselves."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Site heatmap",
      "paragraphs": [
        [
          "Every cell of the site gets scored in hours of direct light across the massing, read straight off the ground plane rather than estimated from a section cut."
        ]
      ]
    },
    {
      "kind": "mediaRow",
      "frames": [
        {
          "kind": "image",
          "image": {
            "src": "/assets/img/insolation-mound-heatmap.jpg",
            "alt": "Site-wide solar heatmap, hours of light per ground cell across the massing",
            "width": 1800,
            "height": 1012
          },
          "wide": true,
          "stamp": {
            "project": "Insolation Toolkit",
            "sheet": "Site Heatmap"
          }
        }
      ],
      "wide": true
    },
    {
      "kind": "codeMedia",
      "image": {
        "src": "/assets/img/insolation-mound-heatmap-nodes.png",
        "alt": "Solar heatmap Grasshopper definition",
        "width": 2600,
        "height": 531
      }
    },
    {
      "kind": "prose",
      "heading": "Per-window check",
      "paragraphs": [
        [
          "Real sun rays traced from each window against the surrounding buildings, returned as a plain Ok / NotOk / PartialOk per window instead of a raw number to interpret."
        ]
      ]
    },
    {
      "kind": "mediaRow",
      "frames": [
        {
          "kind": "image",
          "image": {
            "src": "/assets/img/insolation-mound-windows.jpg",
            "alt": "Per-window insolation rays traced against the surrounding massing",
            "width": 1800,
            "height": 1012
          },
          "wide": true,
          "stamp": {
            "project": "Insolation Toolkit",
            "sheet": "Window Rays"
          }
        }
      ],
      "wide": true
    },
    {
      "kind": "codeMedia",
      "image": {
        "src": "/assets/img/insolation-mound-windows-nodes.png",
        "alt": "Per-window insolation-check Grasshopper definition",
        "width": 2600,
        "height": 733
      }
    },
    {
      "kind": "prose",
      "heading": "Insolation mound",
      "paragraphs": [
        [
          "The same per-window results, rebuilt as a voxel form: each window becomes part of the mound, and the darkest ones are wherever the form dips lowest, flagged by the geometry instead of a lookup."
        ]
      ]
    },
    {
      "kind": "mediaRow",
      "frames": [
        {
          "kind": "image",
          "image": {
            "src": "/assets/img/insolation-mound-voxels.jpg",
            "alt": "Voxel insolation mound built from per-window results, against the surrounding massing",
            "width": 1800,
            "height": 1012
          },
          "wide": true,
          "stamp": {
            "project": "Insolation Toolkit",
            "sheet": "Insolation Mound"
          }
        }
      ],
      "wide": true
    },
    {
      "kind": "codeMedia",
      "image": {
        "src": "/assets/img/insolation-mound-mound-nodes.png",
        "alt": "Insolation-mound Grasshopper definition",
        "width": 2600,
        "height": 993
      }
    },
    {
      "kind": "prose",
      "heading": "Code",
      "paragraphs": [
        [
          "Internal plugin, built by the team from scratch, with template presets for new users. Not yet published."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Validation",
      "paragraphs": [
        [
          "Each window's result traced back to real sun rays against the actual surrounding massing, not a simplified stand-in, so an Ok / NotOk / PartialOk call can be checked geometrically, not just trusted."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Result",
      "paragraphs": [
        [
          "Three insolation workflows that used to be three separate files now share one plugin and one set of template presets — a new user opens a preset instead of rebuilding the definition, and the darkest window in a building shows up as a dip in a form, not a line a reviewer has to go looking for."
        ]
      ]
    }
  ]
};
