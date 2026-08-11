"""Apply shared production fixes to generated and hand-authored HTML.

The original case generator currently lives outside this repository. This
post-processor is intentionally idempotent: rerun it after importing fresh
case HTML so contacts, metadata, accessibility, and media policy do not drift.
"""

from __future__ import annotations

import html
import json
import re
import struct
from pathlib import Path
from urllib.parse import urljoin


ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://dariyxyz.github.io/computational-design-portfolio/"

EMAIL = "dariy.nazarov@gmail.com"
PHONE_HREF = "+79858843727"
PHONE_LABEL = "+7 985 884 37 27"
PHONE_LABEL_HTML = "+7&nbsp;985&nbsp;884&nbsp;37&nbsp;27"
TELEGRAM = "https://t.me/dariy_nazarov"
GITHUB = "https://github.com/DariyXYZ"
PRODUCT_SITE = "https://dariy.framer.website/"

DESCRIPTIONS = {
    "index.html": "Dariy Nazarov's computational-design portfolio: Rhino and Grasshopper tools, fabrication systems, simulation, BIM interoperability, and AI-assisted geometry workflows.",
    "experience.html": "Experience of computational designer Dariy Nazarov across IND, PIK, RAUM, and Kleinewelt Architekten, spanning Grasshopper, C#, Rhino.Inside.Revit, and rule-based design systems.",
    "projects/mcp-rhino-agent.html": "An open Rhino MCP workflow where an LLM uses a scenario and rule library to inspect, generate, validate, and refine architectural geometry.",
    "projects/panel-nesting-engine.html": "A custom C# genetic packing engine that nested fabrication panels for a roof that was built.",
    "projects/copper-facade-bishkek.html": "A Grasshopper workflow connecting form generation, copper facade rationalization, marking, and fabrication cut sheets.",
    "projects/pedestrian-flow.html": "CrowdFlow, a published Grasshopper plugin for agent-based pedestrian simulation and density heatmaps.",
    "projects/revit-panel-export.html": "A Grasshopper-to-Revit workflow that preserves panel parameters as schedulable Revit families.",
    "projects/daylight-massing.html": "A daylight-driven massing study that compares stepped building forms against solar-access constraints.",
    "projects/wind-comfort.html": "A Grasshopper workflow for rapid wind-comfort checks, staged calculation, result display, and export.",
    "projects/tessellation-studies.html": "Constraint-based tessellation studies balancing minimum panel count and node-type repetition.",
    "projects/insolation-mound.html": "A Grasshopper plugin, built from scratch: a site-wide solar heatmap, a per-window insolation check, and a voxel mound that flags the darkest windows automatically.",
    "projects/jewelry-casting-risk.html": "A Grasshopper C# preflight tool that maps jewelry casting risk from wall thickness, sharp detail, local transitions, metal, and process profiles.",
}

OG_IMAGES = {
    "index.html": "assets/img/mcp-rhino-agent-cover-poster.jpg",
    "experience.html": "assets/img/portrait.png",
    "projects/mcp-rhino-agent.html": "assets/img/mcp-rhino-agent-hero-poster.jpg",
    "projects/panel-nesting-engine.html": "assets/img/panel-nesting-engine.jpg",
    "projects/copper-facade-bishkek.html": "assets/img/copper-facade-bishkek.jpg",
    "projects/pedestrian-flow.html": "assets/img/pedestrian-flow-heatmap-poster.jpg",
    "projects/revit-panel-export.html": "assets/img/revit-panel-export.jpg",
    "projects/daylight-massing.html": "assets/img/daylight-massing.jpg",
    "projects/wind-comfort.html": "assets/img/wind-comfort-demo-poster.jpg",
    "projects/tessellation-studies.html": "assets/img/tessellation-studies.jpg",
    "projects/insolation-mound.html": "assets/img/insolation-mound-heatmap.jpg",
    "projects/jewelry-casting-risk.html": "assets/img/jewelry-casting-risk-cover.webp",
}

INDEX_MEDIA = {
    "assets/img/portrait.png": "assets/img/portrait-600.webp",
    "assets/img/mcp-rhino-agent-cover-poster.jpg": "assets/img/mcp-rhino-agent-card.webp",
    "assets/img/panel-nesting-engine.jpg": "assets/img/panel-nesting-engine-card.webp",
    "assets/img/copper-facade-bishkek.jpg": "assets/img/copper-facade-bishkek-card.webp",
    "assets/img/pedestrian-flow-home-poster.jpg": "assets/img/pedestrian-flow-card.webp",
    "assets/img/revit-panel-export.jpg": "assets/img/revit-panel-export-card.webp",
    "assets/img/daylight-massing.jpg": "assets/img/daylight-massing-card.webp",
    "assets/img/wind-comfort-demo-poster.jpg": "assets/img/wind-comfort-card.webp",
    "assets/img/tessellation-studies.jpg": "assets/img/tessellation-studies-card.webp",
    "assets/img/jewelry-casting-risk-cover.webp": "assets/img/jewelry-casting-risk-card.webp",
}

META_START = "<!-- site-meta:start -->"
META_END = "<!-- site-meta:end -->"

ICON_EMAIL = '<svg aria-hidden="true" focusable="false" width="15" height="15" viewBox="0 -960 960 960"><path fill="currentColor" d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200Z"/></svg>'
ICON_TELEGRAM = '<svg aria-hidden="true" focusable="false" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M21.9 2.6 18.7 20c-.2 1.2-.9 1.5-1.9.9l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5L20.2 2c.9-.3 1.9.2 1.7.6Z"/></svg>'
ICON_GITHUB = '<svg aria-hidden="true" focusable="false" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"/></svg>'
ICON_SITE = '<svg aria-hidden="true" focusable="false" width="15" height="15" viewBox="0 -960 960 960"><path fill="currentColor" d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>'
ICON_PHONE = '<svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 -960 960 960"><path fill="currentColor" d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z"/></svg>'


def public_url(relative_path: str) -> str:
    return urljoin(BASE_URL, "" if relative_path == "index.html" else relative_path)


def metadata(relative_path: str, title: str) -> str:
    description = DESCRIPTIONS[relative_path]
    canonical = public_url(relative_path)
    image_url = urljoin(BASE_URL, OG_IMAGES[relative_path])
    prefix = "../" if relative_path.startswith("projects/") else ""
    lines = [
        META_START,
        f'<meta name="description" content="{html.escape(description, quote=True)}" />',
        '<meta name="theme-color" content="#0a0a0a" />',
        f'<link rel="canonical" href="{canonical}" />',
        f'<link rel="icon" href="{prefix}favicon.svg" type="image/svg+xml" />',
        '<meta property="og:type" content="website" />',
        f'<meta property="og:title" content="{html.escape(title, quote=True)}" />',
        f'<meta property="og:description" content="{html.escape(description, quote=True)}" />',
        f'<meta property="og:url" content="{canonical}" />',
        f'<meta property="og:image" content="{image_url}" />',
        '<meta name="twitter:card" content="summary_large_image" />',
        f'<meta name="twitter:title" content="{html.escape(title, quote=True)}" />',
        f'<meta name="twitter:description" content="{html.escape(description, quote=True)}" />',
        f'<meta name="twitter:image" content="{image_url}" />',
    ]
    if relative_path == "index.html":
        person = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dariy Nazarov",
            "jobTitle": "Computational Designer",
            "url": BASE_URL,
            "email": f"mailto:{EMAIL}",
            "sameAs": [GITHUB, TELEGRAM, PRODUCT_SITE],
        }
        lines.append(
            '<script type="application/ld+json">'
            + json.dumps(person, ensure_ascii=False, separators=(",", ":"))
            + "</script>"
        )
    lines.append(META_END)
    return "\n".join(lines)


def footer() -> str:
    return f'''<footer id="contact">
  <div class="container">
    <p class="eyebrow">Contact</p>
    <h2>Let's build the next one.</h2>
    <ul class="contact-list">
      <li><a href="mailto:{EMAIL}">{ICON_EMAIL} Email</a></li>
      <li><a href="{TELEGRAM}" target="_blank" rel="noopener">{ICON_TELEGRAM} Telegram</a></li>
      <li><a href="{GITHUB}" target="_blank" rel="noopener">{ICON_GITHUB} GitHub</a></li>
      <li><a href="{PRODUCT_SITE}" target="_blank" rel="noopener">{ICON_SITE} Product design</a></li>
    </ul>
  </div>
</footer>'''


def about_contacts() -> str:
    return f'''<ul class="about__contacts" data-reveal style="--i:1">
      <li class="about__contacts-row">
        <a href="mailto:{EMAIL}">{ICON_EMAIL.replace('width="15" height="15"', 'width="14" height="14"')} Email</a>
        <a href="{TELEGRAM}" target="_blank" rel="noopener">{ICON_TELEGRAM.replace('width="15" height="15"', 'width="14" height="14"')} Telegram</a>
      </li>
      <li class="about__contacts-row">
        <a href="{GITHUB}" target="_blank" rel="noopener">{ICON_GITHUB.replace('width="15" height="15"', 'width="14" height="14"')} GitHub</a>
        <a href="{PRODUCT_SITE}" target="_blank" rel="noopener">{ICON_SITE.replace('width="15" height="15"', 'width="14" height="14"')} Product design</a>
      </li>
      <li><a href="tel:{PHONE_HREF}" aria-label="Call {PHONE_LABEL}">{ICON_PHONE} {PHONE_LABEL_HTML}</a></li>
    </ul>'''


def image_size(path: Path) -> tuple[int, int] | None:
    data = path.read_bytes()
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return struct.unpack(">II", data[16:24])
    if data.startswith(b"RIFF") and data[8:12] == b"WEBP":
        chunk = data[12:16]
        if chunk == b"VP8X":
            return (
                1 + int.from_bytes(data[24:27], "little"),
                1 + int.from_bytes(data[27:30], "little"),
            )
        if chunk == b"VP8 ":
            return struct.unpack("<HH", data[26:30])
        if chunk == b"VP8L":
            bits = int.from_bytes(data[21:25], "little")
            return (1 + (bits & 0x3FFF), 1 + ((bits >> 14) & 0x3FFF))
    if data.startswith(b"\xff\xd8"):
        offset = 2
        while offset + 9 < len(data):
            if data[offset] != 0xFF:
                offset += 1
                continue
            marker = data[offset + 1]
            length = int.from_bytes(data[offset + 2 : offset + 4], "big")
            if marker in range(0xC0, 0xC4):
                return (
                    int.from_bytes(data[offset + 7 : offset + 9], "big"),
                    int.from_bytes(data[offset + 5 : offset + 7], "big"),
                )
            offset += 2 + length
    return None


def enrich_images(text: str, page_path: Path) -> str:
    def add_attribute(tag: str, attribute: str) -> str:
        return tag[:-2].rstrip() + f" {attribute} />"

    def update(match: re.Match[str]) -> str:
        tag = re.sub(r" {2,}(?=[a-zA-Z-]+=)", " ", match.group(0))
        src_match = re.search(r'\bsrc="([^"]+)"', tag)
        if not src_match:
            return tag
        source = (page_path.parent / src_match.group(1)).resolve()
        dimensions = image_size(source) if source.exists() else None
        if dimensions and " width=" not in tag and " height=" not in tag:
            tag = add_attribute(tag, f'width="{dimensions[0]}" height="{dimensions[1]}"')
        if " decoding=" not in tag:
            tag = add_attribute(tag, 'decoding="async"')
        if " loading=" not in tag:
            tag = add_attribute(tag, 'loading="lazy"')
        return re.sub(r"\s*/>$", " />", tag)

    text = re.sub(r"<img\b[^>]*?/>", update, text)

    header = re.search(r'<header class="project-hero[^>]*>.*?</header>', text, flags=re.S)
    if header:
        eager = re.sub(
            r' loading="lazy"',
            ' loading="eager" fetchpriority="high"',
            header.group(0),
            count=1,
        )
        text = text[: header.start()] + eager + text[header.end() :]
    return text


def wrap_main(text: str) -> str:
    if 'class="skip-link"' not in text:
        text = text.replace(
            "<body>\n",
            '<body>\n<a class="skip-link" href="#main-content">Skip to content</a>\n',
            1,
        )
    if "<main" in text:
        return text
    nav_end = text.find("</nav>")
    content = re.search(r"\n(<(?:header|section)\b)", text[nav_end + 6 :])
    footer_start = text.find('\n<footer id="contact">')
    if nav_end < 0 or not content or footer_start < 0:
        raise RuntimeError("Could not locate main-content anchors")
    start = nav_end + 6 + content.start() + 1
    text = text[:start] + '<main id="main-content">\n' + text[start:]
    footer_start = text.find('\n<footer id="contact">')
    return text[:footer_start] + "\n</main>" + text[footer_start:]


def process(path: Path) -> None:
    relative_path = path.relative_to(ROOT).as_posix()
    text = path.read_text(encoding="utf-8")

    if relative_path == "index.html":
        for source, target in INDEX_MEDIA.items():
            text = text.replace(source, target)
        text = text.replace("Eight other systems in between.", "Seven other systems in between.")
        text = text.replace(
            "Media is real where a system has been documented so far; the rest are still dashed placeholder frames.",
            "Each page separates shipped work, built outcomes, and studies; unfinished documentation remains explicitly marked.",
        )
        text = re.sub(
            r'<ul class="about__contacts".*?</ul>',
            about_contacts(),
            text,
            count=1,
            flags=re.S,
        )
    elif relative_path == "experience.html":
        text = text.replace("assets/img/portrait.png", "assets/img/portrait-600.webp")
        text = text.replace("<h3>", "<h2>").replace("</h3>", "</h2>")
    elif relative_path == "projects/mcp-rhino-agent.html":
        text = re.sub(r"<(\/?)h4\b", r"<\1h3", text)

    text = text.replace('href="https://github.com/"', f'href="{GITHUB}"')
    text = text.replace(f'href="mailto:{EMAIL}"', f'href="mailto:{EMAIL}"')
    text = text.replace('<nav class="nav">', '<nav class="nav" aria-label="Primary">')
    text = re.sub(r'<footer id="contact">.*?</footer>', footer(), text, count=1, flags=re.S)

    title_match = re.search(r"<title>(.*?)</title>", text, flags=re.S)
    if not title_match:
        raise RuntimeError(f"Missing title in {relative_path}")
    title = html.unescape(title_match.group(1).strip())
    text = re.sub(
        re.escape(META_START) + r".*?" + re.escape(META_END) + r"\n?",
        "",
        text,
        flags=re.S,
    )
    text = text.replace("</title>", f"</title>\n{metadata(relative_path, title)}", 1)

    text = wrap_main(text)
    text = enrich_images(text, path)
    text = re.sub(r"<video\b([^>]*)>", lambda m: update_video(m.group(0)), text)
    text = re.sub(
        r"<svg(?![^>]*\baria-hidden=)",
        '<svg aria-hidden="true" focusable="false"',
        text,
    )
    text = re.sub(r'<video\b([^>]*)\saria-label="([^"]+)"', r'<video\1 title="\2"', text)
    text = text.replace("<!doctype html>", "<!DOCTYPE html>")
    text = re.sub(r"<(meta|link|img)([^>]*)\s*/>", r"<\1\2>", text)
    path.write_text(text, encoding="utf-8", newline="\n")
    print(relative_path)


def update_video(tag: str) -> str:
    tag = re.sub(r"\sautoplay\b", "", tag)
    if " data-autoplay" not in tag:
        tag = tag[:-1] + " data-autoplay>"
    if " preload=" not in tag:
        tag = tag[:-1] + ' preload="metadata">'
    return tag


def main() -> None:
    pages = [ROOT / "index.html", ROOT / "experience.html"]
    pages.extend(sorted((ROOT / "projects").glob("*.html")))
    for page in pages:
        process(page)


if __name__ == "__main__":
    main()
