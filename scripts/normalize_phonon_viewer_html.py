#!/usr/bin/env python3
from __future__ import annotations

import argparse
import glob
import re
import sys
from pathlib import Path


DEFAULT_PATTERN = "portfolio/public/phonon-viewer/**/mode_*.html"

STYLE_BLOCK = """<style>
  body { margin: 0; font-family: sans-serif; background: #16120d; color: #f3eadf; }
  #container { position: relative; width: 100vw; height: 100vh; background: radial-gradient(circle at top, #241b14 0%, #16120d 55%, #100d09 100%); }
  #viewer { width: 100%; height: 100%; }
  #overlay {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
    background: rgba(12,10,8,0.68);
    border: 1px solid rgba(200, 137, 58, 0.2);
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 14px;
    line-height: 1.6;
    pointer-events: none;
    box-shadow: 0 10px 24px rgba(0,0,0,0.2);
  }
  #playbtn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 3;
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 999px;
    color: #fff7ee;
    font-size: 21px;
    font-family: monospace;
    line-height: 1;
    box-shadow: 0 10px 24px rgba(0,0,0,0.28);
    transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
  }
  #playbtn:hover { transform: scale(1.04); }
  #playbtn[data-state="playing"] {
    background: rgba(145, 55, 44, 0.92);
    border-color: rgba(255, 167, 146, 0.35);
  }
  #playbtn[data-state="playing"]:hover { background: rgba(168, 67, 54, 0.96); }
  #playbtn[data-state="paused"] {
    background: rgba(71, 119, 78, 0.92);
    border-color: rgba(182, 230, 176, 0.35);
  }
  #playbtn[data-state="paused"]:hover { background: rgba(86, 141, 93, 0.96); }
</style>"""

SCRIPT_TAIL = """var viewer = $3Dmol.createViewer("viewer", {backgroundColor: "0x16120d"});
viewer.addModelsAsFrames(xyzData, "xyz");
viewer.setStyle({}, {stick: {radius: 0.15}, sphere: {scale: 0.3}});
viewer.zoomTo();
viewer.rotate(45, "x");
viewer.rotate(45, "z");
viewer.animate({loop: "forward", reps: 0, interval: 50});
viewer.render();

function togglePlay() {
  playing = !playing;
  var playBtn = document.getElementById("playbtn");
  playBtn.textContent = playing ? "■" : "▶";
  playBtn.dataset.state = playing ? "playing" : "paused";
  playBtn.setAttribute("aria-label", playing ? "Stop animation" : "Play animation");
  if (playing) {
    viewer.animate({loop: "forward", reps: 0, interval: 50});
  } else {
    viewer.stopAnimate();
  }
}

window.addEventListener("resize", function() {
  viewer.resize();
  viewer.render();
});
"""

STYLE_RE = re.compile(r"<style>.*?</style>", re.S)
OVERLAY_RE = re.compile(
    r"Mode:\s*<b>(?P<mode>.*?)</b><br>\s*Frequency:\s*<b>(?P<frequency>.*?)</b>",
    re.S,
)
CONTAINER_RE = re.compile(
    r'<div id="container">\s*<div id="viewer"></div>\s*<div id="overlay">.*?</div>\s*(?:<div id="controls">.*?</div>\s*|<button id="playbtn".*?</button>\s*)</div>',
    re.S,
)
VIEWER_TAIL_RE = re.compile(
    r'var viewer = \$3Dmol\.createViewer\("viewer", \{backgroundColor: "[^"]+"\}\);.*?(?=</script>)',
    re.S,
)


def resolve_targets(raw_targets: list[str]) -> list[Path]:
    targets = raw_targets or [DEFAULT_PATTERN]
    resolved: list[Path] = []

    for target in targets:
        path = Path(target)
        if path.is_file():
            resolved.append(path)
            continue
        if path.is_dir():
            resolved.extend(sorted(path.rglob("mode_*.html")))
            continue
        resolved.extend(sorted(Path(match) for match in glob.glob(target, recursive=True)))

    deduped = sorted({path.resolve() for path in resolved if path.name.startswith("mode_") and path.suffix == ".html"})
    return [Path(path) for path in deduped]


def build_container(mode: str, frequency: str) -> str:
    return (
        '<div id="container">\n'
        '  <div id="viewer"></div>\n'
        '  <div id="overlay">\n'
        f"    Mode: <b>{mode}</b><br>\n"
        f"    Frequency: <b>{frequency}</b>\n"
        "  </div>\n"
        '  <button id="playbtn" onclick="togglePlay()" data-state="playing" aria-label="Stop animation">■</button>\n'
        "</div>"
    )


def normalize_html(text: str, source: Path) -> str:
    overlay_match = OVERLAY_RE.search(text)
    if not overlay_match:
        raise ValueError(f"Could not locate mode/frequency overlay in {source}")

    style_match = STYLE_RE.search(text)
    if not style_match:
        raise ValueError(f"Could not locate <style> block in {source}")

    container_match = CONTAINER_RE.search(text)
    if not container_match:
        raise ValueError(f"Could not locate viewer container block in {source}")

    tail_match = VIEWER_TAIL_RE.search(text)
    if not tail_match:
        raise ValueError(f"Could not locate 3Dmol viewer setup in {source}")

    normalized = STYLE_RE.sub(STYLE_BLOCK, text, count=1)
    normalized = CONTAINER_RE.sub(
        build_container(overlay_match.group("mode"), overlay_match.group("frequency")),
        normalized,
        count=1,
    )
    normalized = VIEWER_TAIL_RE.sub(SCRIPT_TAIL, normalized, count=1)
    return normalized


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Normalize phonon 3Dmol HTML files to the current portfolio viewer standard."
    )
    parser.add_argument(
        "targets",
        nargs="*",
        help="Files, directories, or glob patterns. Defaults to portfolio/public/phonon-viewer/**/mode_*.html",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Report files that would change without writing them.",
    )
    args = parser.parse_args()

    files = resolve_targets(args.targets)
    if not files:
        print("No mode HTML files found.", file=sys.stderr)
        return 1

    changed: list[Path] = []
    for path in files:
        original = path.read_text()
        normalized = normalize_html(original, path)
        if normalized != original:
            changed.append(path)
            if not args.check:
                path.write_text(normalized)

    verb = "would normalize" if args.check else "normalized"
    print(f"{verb} {len(changed)} of {len(files)} files")
    for path in changed:
        print(path)

    return 1 if args.check and changed else 0


if __name__ == "__main__":
    raise SystemExit(main())
