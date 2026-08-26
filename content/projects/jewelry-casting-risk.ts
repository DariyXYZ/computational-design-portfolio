import type { Project } from '../types';

export const jewelryCastingRisk: Project = {
  "slug": "jewelry-casting-risk",
  "title": "Casting risk, mapped before production",
  "tag": "Working Prototype",
  "summary": "A Grasshopper C# preflight tool that turns a closed jewelry mesh into a color-coded casting-risk map, combining local wall thickness, abrupt transitions, sharp detail, metal, and production process before a model reaches the mold.",
  "meta": "Grasshopper · C# · Jewelry casting preflight",
  "hero": {
    "kind": "image",
    "image": {
      "src": "/assets/img/jewelry-casting-risk-hero.png",
      "alt": "Color-coded casting-risk analysis over the Grasshopper definition that produced it",
      "width": 1800,
      "height": 846
    }
  },
  "blocks": [
    {
      "kind": "prose",
      "heading": "Problem",
      "paragraphs": [
        [
          "A jewelry model can look finished in Rhino and still contain sections that are too thin to fill reliably, sharp local details that cool too early, or abrupt thickness changes that only become visible after a failed casting. Checking those conditions by eye is inconsistent and usually happens too late — a wrong model doesn't fail quietly, it comes back from casting as a crate of scrapped pieces, a real and recurring reject rate, not a rounding error."
        ]
      ]
    },
    {
      "kind": "mediaRow",
      "frames": [
        {
          "kind": "image",
          "image": {
            "src": "/assets/img/jewelry-casting-risk-rejects.jpg",
            "alt": "A crate of rejected castings, misrun pieces scrapped after pouring",
            "width": 1800,
            "height": 1005
          },
          "wide": true,
          "statCaption": "17% MISRUN"
        }
      ],
      "wide": true
    },
    {
      "kind": "prose",
      "heading": "Method",
      "paragraphs": [
        [
          "The script samples every mesh face from its center, estimates the inward direction, and casts a configurable cone of rays through the closed mesh to measure internal thickness. It combines that thickness with neighboring thickness jumps and sharp-feature risk, then adjusts the score for the selected metal and casting process. The result is written back as a per-face color map: red and orange mark the areas that need review; blue marks likely safe geometry."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Implementation",
      "paragraphs": [
        [
          "One Rhino 8 C# Script component carries the full review engine. It includes review, strict-audit, and thickness-only modes; profiles for silver, gold alloys, platinum, palladium, bronze, and brass; vacuum, centrifugal, gravity, and unknown-process settings; configurable smoothing and risk thresholds; and parallel face processing for dense meshes."
        ]
      ]
    },
    {
      "kind": "codeMedia",
      "image": {
        "src": "/assets/img/jewelry-casting-risk-nodes.png",
        "alt": "Grasshopper definition feeding a jewelry mesh and material settings into the C# casting-risk analysis component",
        "width": 1724,
        "height": 966
      }
    },
    {
      "kind": "prose",
      "heading": "Application examples",
      "paragraphs": [
        [
          "The four blue models below are screenshots from real jewelry projects where the script was used. The same analysis runs across dense ornament, signet geometry, stone settings, engraving, thin edges, and openwork without rebuilding the Grasshopper definition for each object."
        ]
      ]
    },
    {
      "kind": "mediaRow",
      "frames": [
        {
          "kind": "group",
          "cols": 2,
          "ratio": "16 / 9",
          "cells": [
            {
              "image": {
                "src": "/assets/img/jewelry-casting-risk-cluster-ring.png",
                "alt": "Casting-risk map on a highly detailed cluster ring",
                "width": 3840,
                "height": 2160
              }
            },
            {
              "image": {
                "src": "/assets/img/jewelry-casting-risk-signet-ring.png",
                "alt": "Casting-risk map on a signet ring with relief details",
                "width": 3840,
                "height": 2160
              }
            },
            {
              "image": {
                "src": "/assets/img/jewelry-casting-risk-stone-ring.png",
                "alt": "Casting-risk map around a stone setting, engraving, and ring shoulders",
                "width": 3840,
                "height": 2160
              }
            },
            {
              "image": {
                "src": "/assets/img/jewelry-casting-risk-pendant.png",
                "alt": "Casting-risk map on a thin openwork pendant with narrow transitions",
                "width": 3840,
                "height": 2160
              }
            }
          ],
          "wide": true
        }
      ],
      "wide": true
    },
    {
      "kind": "prose",
      "heading": "How to use the algorithm",
      "paragraphs": [
        [
          "Design → critical-area check → geometry correction → stable casting. The analysis is used as an iteration loop: inspect the color map, revise the highlighted transitions and thin sections, then run the same check again before production."
        ]
      ]
    },
    {
      "kind": "mediaRow",
      "frames": [
        {
          "kind": "image",
          "image": {
            "src": "/assets/img/jewelry-casting-risk-workflow.webp",
            "alt": "Four-step jewelry workflow from the initial design through casting-risk analysis and geometry correction to a stable final piece",
            "width": 1800,
            "height": 1005
          },
          "wide": true
        }
      ],
      "wide": true
    },
    {
      "kind": "prose",
      "heading": "Outputs",
      "paragraphs": [
        [
          "Alongside the colored mesh, the component returns mesh validity and closure, critical and good thickness thresholds, measured minimum and maximum thickness, area-weighted average risk, maximum risk, the percentage of high-risk faces, the active engine profile, a plain-language review report, and a compact run status."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Validation",
      "paragraphs": [
        [
          "Review mode uses the median result from a cone of rays so a nearby groove wall does not automatically read as a structurally thin section, then suppresses isolated single-face spikes without high-risk neighbors. Strict and thickness-only modes retain the minimum-ray result for worst-case checks. The tool is deliberately presented as geometric preflight, not a replacement for casting-flow or solidification simulation."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Result",
      "paragraphs": [
        [
          "A reusable first-pass review inside Grasshopper: change the mesh, metal, or process and get the same visual risk language and report structure immediately, before committing the model to detailed production engineering or a physical mold."
        ]
      ]
    },
    {
      "kind": "codeMedia",
      "image": {
        "src": "/assets/img/jewelry-casting-risk-result.png",
        "alt": "The reviewed mesh next to the finished cast ring, pavé-set and worn",
        "width": 1800,
        "height": 974
      }
    },
    {
      kind: 'metrics',
      items: [
        {
          value: '1',
          label: 'Script component',
          note: 'One Rhino 8 C# Script carries the whole review engine',
        },
        {
          value: '6',
          label: 'Metal profiles',
          note: 'Silver, gold alloys, platinum, palladium, bronze and brass',
        },
        {
          value: '4',
          label: 'Casting processes',
          note: 'Vacuum, centrifugal, gravity, and unknown',
        },
        {
          value: '3',
          label: 'Review modes',
          note: 'Review, strict audit, and thickness-only',
        },
      ],
    },
  ],
};
