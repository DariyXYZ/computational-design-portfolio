# Computational Design Portfolio

Static portfolio for [Dariy Nazarov](https://github.com/DariyXYZ), published at [dariyxyz.github.io/computational-design-portfolio](https://dariyxyz.github.io/computational-design-portfolio/).

## Build workflow

The 9 files in `projects/` were produced by a Python template generator that currently lives outside this repository. Do not apply repeated edits to those files by hand.

After importing freshly generated case pages, run:

```powershell
python tools/optimize_images.py
python tools/postprocess_html.py
```

`postprocess_html.py` is idempotent and owns shared production concerns until the original generator is restored here: contacts, metadata, landmarks, image dimensions/loading, decorative SVG accessibility, and video loading policy.

## Media still needed

- `casting-feasibility`: misrun-risk heatmap on a node.
- `daylight-massing`: insolation map across massing options.
- `panel-nesting-engine`: nested cut sheet and packing-algorithm structure.
- `revit-panel-export`: Revit schedule and Grasshopper export step.
- `tessellation-studies`: panel-count and node-repetition pattern variants.
- `mcp-rhino-agent`: 4 explanatory diagram slots remain; the page already has substantial real media.

Keep full-resolution source material in ignored `source-assets/`; only web-ready derivatives belong in `assets/img/`.
