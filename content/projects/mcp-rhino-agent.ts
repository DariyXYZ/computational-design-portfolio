import type { Project } from '../types';

export const mcpRhinoAgent: Project = {
  "slug": "mcp-rhino-agent",
  "title": "An LLM that operates Rhino",
  "tag": "Open Source",
  "summary": "A rule-and-scenario library, exposed through the Model Context Protocol, that lets a language model place geometry, run solvers, and read back model state directly inside Rhino.",
  "meta": "MCP · Python · RhinoCommon",
  "hero": {
    "kind": "video",
    "video": {
      "src": "/assets/img/mcp-rhino-agent-hero.mp4",
      "poster": "/assets/img/mcp-rhino-agent-hero-poster.jpg",
      "title": "Cycling through one pipeline: site data, zoning, building envelope, massing"
    }
  },
  "heroSplit": true,
  "blocks": [
    {
      "kind": "prose",
      "heading": "Six directions",
      "paragraphs": [
        [
          "Each is a separate template: its own inputs, its own process, its own result."
        ]
      ]
    },
    {
      "kind": "overviewGrid",
      "cards": [
        {
          "badge": "01",
          "tone": "blue",
          "title": "Reference → 3D model",
          "icon": {
            "src": "/assets/img/mcp-rhino-agent-ov-1.png",
            "alt": "",
            "width": 700,
            "height": 466
          },
          "flow": [
            {
              "label": "photo / plan / text"
            },
            {
              "label": "3D geometry",
              "tone": "blue"
            }
          ]
        },
        {
          "badge": "02",
          "tone": "green",
          "title": "Site only → zoning → massing",
          "icon": {
            "src": "/assets/img/mcp-rhino-agent-ov-2.png",
            "alt": "",
            "width": 700,
            "height": 466
          },
          "flow": [
            {
              "label": "site boundary + brief"
            },
            {
              "label": "zoning + massing",
              "tone": "green"
            }
          ]
        },
        {
          "badge": "03",
          "tone": "green",
          "title": "Approved footprints → volumes",
          "icon": {
            "src": "/assets/img/mcp-rhino-agent-ov-3.png",
            "alt": "",
            "width": 700,
            "height": 466
          },
          "flow": [
            {
              "label": "footprints"
            },
            {
              "label": "form + variants",
              "tone": "green"
            }
          ]
        },
        {
          "badge": "04",
          "tone": "yellow",
          "title": "Existing massing → form variants",
          "icon": {
            "src": "/assets/img/mcp-rhino-agent-ov-4.png",
            "alt": "",
            "width": 700,
            "height": 466
          },
          "flow": [
            {
              "label": "approved massing"
            },
            {
              "label": "2–3 alternatives",
              "tone": "yellow"
            }
          ]
        },
        {
          "badge": "05",
          "tone": "purple",
          "title": "Finished model → DGP checklist",
          "icon": {
            "src": "/assets/img/mcp-rhino-agent-ov-5.png",
            "alt": "",
            "width": 700,
            "height": 466
          },
          "flow": [
            {
              "label": "model in Rhino"
            },
            {
              "label": "compliance checklist",
              "tone": "purple"
            }
          ]
        },
        {
          "badge": "06",
          "tone": "orange",
          "title": "Complex model → clean geometry",
          "icon": {
            "src": "/assets/img/mcp-rhino-agent-ov-6.png",
            "alt": "",
            "width": 700,
            "height": 466
          },
          "flow": [
            {
              "label": "detailed Rhino model"
            },
            {
              "label": "calculation geometry",
              "tone": "orange"
            }
          ]
        }
      ]
    },
    {
      "kind": "prose",
      "heading": "Problem",
      "paragraphs": [
        [
          "Driving Rhino from natural language usually means either brittle macro recording or one-off scripts that only work for a single task. There was no general way to let an LLM issue real modeling commands and get real model state back, across more than one kind of design problem."
        ]
      ]
    },
    {
      "kind": "mediaRow",
      "wide": true,
      "frames": [
        {
          "kind": "image",
          "image": {
            "src": "/assets/img/mcp-rhino-agent-workflow.png",
            "alt": "The scene the agent reads back, open in VS Code as JSON with every object's id, layer, bounding box and face count, beside the live Rhino file holding the massing it generated on the site",
            "width": 2560,
            "height": 1526
          },
          "wide": true
        }
      ]
    },
    {
      "kind": "prose",
      "heading": "Method",
      "paragraphs": [
        [
          "A rule-and-scenario library exposed over the Model Context Protocol (MCP): the agent reads a repository of scenarios, form-finding patterns, and a documented error library before writing a line, then RhinoMCP runs the resulting Python or C# script live inside the open Rhino file. Six directions of use share that same repository, each its own input, process, and result."
        ]
      ]
    },
    {
      "kind": "directions",
      "items": [
        {
          "badge": "01",
          "tone": "blue",
          "title": "Reference → 3D model",
          "flow": [
            {
              "label": "photo / plan / text"
            },
            {
              "label": "3D geometry",
              "tone": "blue"
            }
          ],
          "frames": [
            {
              "kind": "compare",
              "refs": [
                {
                  "image": {
                    "src": "/assets/img/mcp-rhino-agent-ref-karlatornet.jpg",
                    "alt": "Karlatornet, Gothenburg, by SOM",
                    "width": 771,
                    "height": 900
                  },
                  "caption": "Karlatornet"
                },
                {
                  "image": {
                    "src": "/assets/img/mcp-rhino-agent-ref-aqua-tower.jpg",
                    "alt": "Aqua Tower, Chicago, by Studio Gang",
                    "width": 675,
                    "height": 900
                  },
                  "caption": "Aqua Tower"
                },
                {
                  "image": {
                    "src": "/assets/img/mcp-rhino-agent-ref-absolute-world.jpg",
                    "alt": "Absolute World, Mississauga, by MAD Architects",
                    "width": 557,
                    "height": 988
                  },
                  "caption": "Absolute World"
                },
                {
                  "image": {
                    "src": "/assets/img/mcp-rhino-agent-ref-turning-torso.jpg",
                    "alt": "Turning Torso, Malmö, by Santiago Calatrava",
                    "width": 677,
                    "height": 900
                  },
                  "caption": "Turning Torso"
                },
                {
                  "image": {
                    "src": "/assets/img/mcp-rhino-agent-ref-gherkin.jpg",
                    "alt": "30 St Mary Axe, London, by Foster + Partners",
                    "width": 675,
                    "height": 900
                  },
                  "caption": "30 St Mary Axe"
                },
                {
                  "image": {
                    "src": "/assets/img/mcp-rhino-agent-ref-shanghai-tower.jpg",
                    "alt": "Shanghai Tower, Shanghai, by Gensler",
                    "width": 900,
                    "height": 600
                  },
                  "caption": "Shanghai Tower"
                }
              ],
              "result": {
                "src": "/assets/img/mcp-rhino-agent-forms.jpg",
                "alt": "A range of tower forms the agent produced from written briefs alone, Karlatornet, Aqua Tower, and Absolute World-style geometries among them",
                "width": 1800,
                "height": 1800
              },
              "wide": true
            }
          ],
          "credit": "Reference photos, not literal inputs — the agent generated these forms from text briefs alone. Karlatornet: ArildV (CC BY-SA 4.0). Aqua Tower: George Showman (CC BY 2.0). Turning Torso: Zairon (CC BY-SA 3.0). 30 St Mary Axe: Paste (public domain). Shanghai Tower: Stefan Fussan (CC BY-SA 3.0). All via Wikimedia Commons. Absolute World: Iwan Baan."
        },
        {
          "badge": "02",
          "tone": "green",
          "title": "Site only → zoning → massing",
          "flow": [
            {
              "label": "site boundary + brief"
            },
            {
              "label": "zoning + massing",
              "tone": "green"
            }
          ],
          "frames": [
            {
              "kind": "group",
              "cols": 2,
              "ratio": "1 / 1",
              "cells": [
                {
                  "image": {
                    "src": "/assets/img/mcp-rhino-agent-d2-1.jpg",
                    "alt": "Site boundary and constraints, the agent's starting input",
                    "width": 900,
                    "height": 900
                  },
                  "label": "Site data"
                },
                {
                  "image": {
                    "src": "/assets/img/mcp-rhino-agent-d2-2.jpg",
                    "alt": "Zoning generated from the site brief",
                    "width": 900,
                    "height": 900
                  },
                  "label": "Zoning"
                },
                {
                  "image": {
                    "src": "/assets/img/mcp-rhino-agent-d2-3.jpg",
                    "alt": "Building envelopes fitted to the zoning",
                    "width": 900,
                    "height": 900
                  },
                  "label": "Building envelope"
                },
                {
                  "image": {
                    "src": "/assets/img/mcp-rhino-agent-d2-4.jpg",
                    "alt": "Final massing derived from the envelope",
                    "width": 900,
                    "height": 900
                  },
                  "label": "Massing"
                }
              ],
              "wide": true
            }
          ]
        },
        {
          "badge": "03",
          "tone": "green",
          "title": "Approved footprints → volumes",
          "flow": [
            {
              "label": "footprints"
            },
            {
              "label": "form + variants",
              "tone": "green"
            }
          ],
          "frames": [
            {
              "kind": "group",
              "cols": 1,
              "ratio": "2 / 1",
              "cells": [
                {
                  "image": {
                    "src": "/assets/img/mcp-rhino-agent-d3-1.jpg",
                    "alt": "Approved footprints, the fixed input for this direction",
                    "width": 1400,
                    "height": 700
                  },
                  "label": "Footprints (input)"
                },
                {
                  "image": {
                    "src": "/assets/img/mcp-rhino-agent-d3-2.jpg",
                    "alt": "Volumes generated on top of the approved footprints",
                    "width": 1400,
                    "height": 700
                  },
                  "label": "Volumes (output)"
                }
              ],
              "wide": true
            }
          ]
        },
        {
          "badge": "04",
          "tone": "yellow",
          "title": "Existing massing → form variants",
          "flow": [
            {
              "label": "approved massing"
            },
            {
              "label": "2–3 alternatives",
              "tone": "yellow"
            }
          ],
          "frames": [
            {
              "kind": "image",
              "image": {
                "src": "/assets/img/mcp-rhino-agent-d4-2.jpg",
                "alt": "Form variants generated from one already-approved massing, without touching its footprint or floor areas",
                "width": 1400,
                "height": 700
              },
              "wide": true
            }
          ]
        },
        {
          "badge": "05",
          "tone": "purple",
          "title": "Finished model → DGP checklist",
          "flow": [
            {
              "label": "model in Rhino"
            },
            {
              "label": "compliance checklist",
              "tone": "purple"
            }
          ],
          "frames": [
            {
              "kind": "group",
              "cols": 2,
              "ratio": "1 / 1",
              "cells": [
                {
                  "image": {
                    "src": "/assets/img/mcp-rhino-agent-d5-1.jpg",
                    "alt": "First massing option scored against the design-review checklist",
                    "width": 900,
                    "height": 900
                  },
                  "label": "Variant 01"
                },
                {
                  "image": {
                    "src": "/assets/img/mcp-rhino-agent-d5-2.jpg",
                    "alt": "Second massing option scored against the same checklist",
                    "width": 900,
                    "height": 900
                  },
                  "label": "Variant 02"
                }
              ],
              "wide": true
            }
          ]
        },
        {
          "badge": "06",
          "tone": "orange",
          "title": "Complex model → clean geometry",
          "flow": [
            {
              "label": "detailed Rhino model"
            },
            {
              "label": "calculation geometry",
              "tone": "orange"
            }
          ],
          "frames": [
            {
              "kind": "image",
              "image": {
                "src": "/assets/img/mcp-rhino-agent-geometry.jpg",
                "alt": "The same kind of model simplified into clean, watertight geometry for downstream analysis, not just decoration",
                "width": 1400,
                "height": 1400
              },
              "wide": true
            }
          ]
        }
      ]
    },
    {
      "kind": "prose",
      "heading": "Code",
      "paragraphs": [
        [
          "Public on GitHub (",
          {
            "text": "ai-geometry-workflows",
            "href": "https://github.com/DariyXYZ/ai-geometry-workflows"
          },
          "): the MCP server, the RhinoCommon bridge, and the full scenario, pattern, and error library are all in the open, not a private demo."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Validation",
      "paragraphs": [
        [
          "Scored against a real municipal design-review checklist (ДГП), not an internal guess: a generated massing is checked section by section, silhouette, volumetric uniqueness, street frontage, permeability, so the result cites what the model was actually run against."
        ]
      ]
    },
    {
      "kind": "prose",
      "heading": "Result",
      "paragraphs": [
        [
          "12+ real building types worked through end to end, Karlatornet, Aqua Tower, Grove at Grand Bay, and Absolute World among them, backed by an 8-code error library so the agent stops repeating the same architectural mistakes session to session."
        ]
      ]
    }
  ]
};
