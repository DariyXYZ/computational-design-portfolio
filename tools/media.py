"""Build web-ready media derivatives and the manifest the site renders from.

Two jobs:

1.  For every raster in `public/assets/img/`, write an AVIF ladder into
    `public/assets/opt/`. The originals stay put and remain the `<img>` fallback,
    so a browser without AVIF still gets exactly what the old site served.
2.  Re-encode `media-src/hero-bg.gif` as an animated AVIF (with an animated WebP
    fallback) at the size it actually renders. The GIF was 1.9 MB of five
    1080x1400 frames for a box that is never wider than 380 CSS px.

The manifest it writes (`content/media-manifest.ts`) tells `components/media.tsx`
which widths exist for a given source, so `srcset` never points at a missing file.
Server-only data: it is imported by Server Components and never reaches the client.

Run after adding or replacing anything in `public/assets/img/`:

    python tools/media.py
"""

from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image, ImageSequence

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "public" / "assets" / "img"
# Animation source, kept out of `public/` so the 1.9 MB GIF is never served —
# only committed, so the pipeline stays reproducible on a fresh checkout.
ANIM_SRC_DIR = ROOT / "media-src"
OPT_DIR = ROOT / "public" / "assets" / "opt"
MANIFEST = ROOT / "content" / "media-manifest.ts"

RASTER_SUFFIXES = {".png", ".jpg", ".jpeg", ".webp"}

# Animated output is served as-is: running it through the still ladder would
# silently flatten it to its first frame.
ANIMATED = {"hero-bg.webp"}

# Rendered widths across the layout. Case media now breaks out of the text
# container and paints up to ~1370 CSS px, so a 2x screen wants ~2700 real
# pixels; the ladder has to reach that or the browser upscales.
LADDER = (400, 800, 1200, 1800, 2400)

# Quality by rung, not one number for the whole ladder. A 400px rung is shown
# small on a phone, where bandwidth costs more than the artefacts cost; an
# 1800px rung fills a desktop viewport, where compression is plainly visible.
QUALITY_BY_WIDTH = (
    (800, 62),
    (1200, 68),
    (1800, 76),
)
# Anything above the last threshold.
QUALITY_LARGE = 80

# Grasshopper node graphs and technical drawings are line art with small labels;
# lossy artefacts there read as blur rather than noise, so they run richer.
LINE_ART_BONUS = 8
LINE_ART_MARKERS = (
    "-nodes.",
    "-toolbar.",
    "-workflow.",
    "-structure.",
    # Hairline sun rays and a dashed sun-path dome on white: the same failure
    # mode as a node graph, where lossy artefacts read as smear, not noise.
    "-sunpath.",
    "-rays.",
)

# The animated hero sits in a box of at most 380 CSS px, so 640 covers it at
# 1.7x DPR. It is a white lattice on pure black, which both codecs handle well:
# at these settings the first frame is indistinguishable from the source at
# render size, and `mix-blend-mode: lighten` hides what noise remains.
HERO_GIF = "hero-bg.gif"
HERO_TARGET_WIDTH = 640
HERO_WEBP_QUALITY = 62
HERO_AVIF_QUALITY = 48


def quality_for(name: str, width: int) -> int:
    """Higher quality the larger the rung will be painted."""
    base = QUALITY_LARGE
    for threshold, quality in QUALITY_BY_WIDTH:
        if width <= threshold:
            base = quality
            break
    if any(marker in name for marker in LINE_ART_MARKERS):
        base += LINE_ART_BONUS
    return min(base, 92)



def widths_for(source_width: int) -> list[int]:
    """Ladder rungs that are genuine downscales, plus the native width."""
    rungs = [w for w in LADDER if w < source_width]
    if source_width <= LADDER[0]:
        return [source_width]
    rungs.append(source_width)
    return rungs


def build_still(path: Path) -> tuple[str, list[int]]:
    with Image.open(path) as im:
        im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
        source_width, source_height = im.size
        widths = widths_for(source_width)

        for width in widths:
            height = max(1, round(source_height * width / source_width))
            target = OPT_DIR / f"{path.stem}-{width}.avif"
            frame = (
                im
                if width == source_width
                else im.resize((width, height), Image.Resampling.LANCZOS)
            )
            frame.save(
                target, "AVIF", quality=quality_for(path.name, width), speed=4
            )

    return f"/assets/img/{path.name}", widths


def build_hero(path: Path) -> tuple[str, list[int]]:
    """Animated GIF -> animated AVIF, with an animated WebP fallback.

    The AVIF lands in `assets/opt/` under the same `<stem>-<width>` name the
    still ladder uses, so `<Media>` picks it up through the normal manifest path
    and needs no special case for animation.
    """
    with Image.open(path) as im:
        source_width, source_height = im.size
        width = min(HERO_TARGET_WIDTH, source_width)
        height = max(1, round(source_height * width / source_width))
        durations = []
        frames = []
        for frame in ImageSequence.Iterator(im):
            durations.append(frame.info.get("duration", im.info.get("duration", 500)))
            frames.append(
                frame.convert("RGB").resize((width, height), Image.Resampling.LANCZOS)
            )

    fallback = SRC_DIR / "hero-bg.webp"
    frames[0].save(
        fallback,
        "WEBP",
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        quality=HERO_WEBP_QUALITY,
        method=6,
    )

    preferred = OPT_DIR / f"hero-bg-{width}.avif"
    frames[0].save(
        preferred,
        "AVIF",
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        quality=HERO_AVIF_QUALITY,
        speed=4,
    )

    print(
        f"{path.name}: {path.stat().st_size/1024:.0f} KB "
        f"({source_width}x{source_height}, {len(frames)}f) -> "
        f"{preferred.name} {preferred.stat().st_size/1024:.0f} KB / "
        f"{fallback.name} {fallback.stat().st_size/1024:.0f} KB at {width}x{height}"
    )
    return f"/assets/img/{fallback.name}", [width]


def main() -> None:
    if OPT_DIR.exists():
        shutil.rmtree(OPT_DIR)
    OPT_DIR.mkdir(parents=True)

    manifest: dict[str, list[int]] = {}

    hero = ANIM_SRC_DIR / HERO_GIF
    if hero.exists():
        src, widths = build_hero(hero)
        manifest[src] = widths

    saved = 0
    for path in sorted(SRC_DIR.iterdir()):
        if path.suffix.lower() not in RASTER_SUFFIXES or path.name in ANIMATED:
            continue
        src, widths = build_still(path)
        manifest[src] = widths
        smallest = min(
            (OPT_DIR / f"{path.stem}-{w}.avif").stat().st_size for w in widths
        )
        saved += max(0, path.stat().st_size - smallest)

    body = json.dumps(manifest, indent=2, sort_keys=True)
    MANIFEST.write_text(
        "/**\n"
        " * Generated by `python tools/media.py` — do not edit by hand.\n"
        " *\n"
        " * Maps each original in `public/assets/img/` to the AVIF widths that exist\n"
        " * in `public/assets/opt/`, so `<Media>` can build a truthful srcset.\n"
        " */\n\n"
        f"export const mediaManifest: Record<string, readonly number[]> = {body};\n",
        encoding="utf-8",
    )

    total = sum(p.stat().st_size for p in OPT_DIR.iterdir())
    print(
        f"{len(manifest)} sources -> {len(list(OPT_DIR.iterdir()))} AVIF files "
        f"({total/1024/1024:.1f} MB), smallest-rung saving vs originals: "
        f"{saved/1024/1024:.1f} MB"
    )


if __name__ == "__main__":
    main()
