#!/usr/bin/env python3
"""
Make the web-sized copies the site serves.

Reads every `shoot.<x>(n)` reference in src/, finds the original in
public/images/all/ (the full library, not in git) and writes a copy to
public/images/web/ under the same filename: longest edge 1800 px, JPEG
quality 80, orientation baked in, metadata dropped. Copies that are already
up to date are skipped. Run it after naming a new photograph in src/.

    python3 scripts/export-photos.py

Needs Pillow: pip3 install pillow
"""
import glob
import os
import re
import sys

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public/images/all")
OUT = os.path.join(ROOT, "public/images/web")
EDGE = 1800

PATTERNS = {
    "mei25": "CRKL_Mei25_LR©HABLAR-%s.jpg",
    "juni25": "crkl_juni25_LR_©HABLAR-%s.jpg",
    "okt25": "CRKL_okt25©HABLAR-%s.jpg",
    "dec25": "CRKL_dec25©Hablar_lr-%s.jpg",
    "jan26": "CRKL_Jan26_LR©Hablar-%s.jpg",
    "maart26": "CRKL_Maart26©Hablar_Lr-%s.jpg",
    "april26": "CRKL_april26©HABLAR.be-%s.jpg",
    "jolien": "CRKL_J_april26©HABLAR.be-%s.jpg",
    "juni26": "crkl_juni26_LR_©HABLAR-%s.jpg",
    "juli26": "CRKL_Juli26_LR©Hablar-%s.jpg",
    "leveranciers": "CRKL_Leveranciers_Juni26_LR©Hablar-%s.jpg",
}
EXTRA = ["CRKL_Maart26©Hablar_Lr.jpg"]  # shoot.flessen


def referenced() -> set[str]:
    names = set(EXTRA)
    for path in glob.glob(os.path.join(ROOT, "src/**/*.ts*"), recursive=True):
        with open(path, encoding="utf-8") as handle:
            for key, number in re.findall(r"shoot\.(\w+)\((\d+)\)", handle.read()):
                if key in PATTERNS:
                    names.add(PATTERNS[key] % number)
    return names


def main() -> int:
    os.makedirs(OUT, exist_ok=True)
    missing, written, kept = [], 0, 0
    for name in sorted(referenced()):
        source = os.path.join(SRC, name)
        target = os.path.join(OUT, name)
        if not os.path.exists(source):
            missing.append(name)
            continue
        if os.path.exists(target) and os.path.getmtime(target) >= os.path.getmtime(source):
            kept += 1
            continue
        image = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
        image.thumbnail((EDGE, EDGE), Image.LANCZOS)
        image.save(target, "JPEG", quality=80, optimize=True, progressive=True)
        written += 1
    print(f"{written} written, {kept} up to date, {len(missing)} missing")
    for name in missing:
        print("  missing in public/images/all:", name)
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
