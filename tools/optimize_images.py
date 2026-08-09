"""Create small, deterministic derivatives used by the portfolio index.

Originals stay untouched because project pages need their larger source files.
Run this script before tools/postprocess_html.py after adding or replacing media.
"""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "assets" / "img"

JOBS = {
    "portrait.png": ("portrait-600.webp", (600, 600), 82),
    "mcp-rhino-agent-cover-poster.jpg": ("mcp-rhino-agent-card.webp", (720, 720), 82),
    "panel-nesting-engine.jpg": ("panel-nesting-engine-card.webp", (720, 720), 82),
    "copper-facade-bishkek.jpg": ("copper-facade-bishkek-card.webp", (720, 720), 82),
    "casting-feasibility.jpg": ("casting-feasibility-card.webp", (720, 720), 82),
    "pedestrian-flow-home-poster.jpg": ("pedestrian-flow-card.webp", (720, 720), 82),
    "revit-panel-export.jpg": ("revit-panel-export-card.webp", (720, 720), 82),
    "daylight-massing.jpg": ("daylight-massing-card.webp", (720, 720), 82),
    "wind-comfort-demo-poster.jpg": ("wind-comfort-card.webp", (720, 720), 82),
    "tessellation-studies.jpg": ("tessellation-studies-card.webp", (720, 720), 82),
}


def main() -> None:
    for source_name, (target_name, max_size, quality) in JOBS.items():
        source = IMAGE_DIR / source_name
        target = IMAGE_DIR / target_name
        with Image.open(source) as image:
            image.thumbnail(max_size, Image.Resampling.LANCZOS)
            image.save(target, "WEBP", quality=quality, method=6)
        print(f"{source_name} -> {target_name}")


if __name__ == "__main__":
    main()
