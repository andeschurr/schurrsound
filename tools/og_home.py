#!/usr/bin/env python3
"""
Schurr Sound - home link card (og-image.jpg), set in the site's own faces.
The July card fell back to DejaVu Sans for every sans line; this rebuilds the
same words and layout in Inter and Cormorant Garamond.

Usage:
  sh tools/get-fonts.sh            # once
  python3 tools/og_home.py og-image.jpg
"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG    = (30, 58, 47)
GOLD  = (184, 161, 92)
PALE  = (214, 196, 145)   # eyebrow
CREAM = (240, 234, 216)
SOFT  = (226, 219, 196)   # credit line

FD = os.environ.get("SS_FONTS", os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts"))

def cg(size, weight=600, italic=False):
    p = f"{FD}/CormorantGaramond-Italic[wght].ttf" if italic else f"{FD}/CormorantGaramond[wght].ttf"
    f = ImageFont.truetype(p, size)
    f.set_variation_by_axes([weight])
    return f

def inter(size, weight=500):
    f = ImageFont.truetype(f"{FD}/Inter[opsz,wght].ttf", size)
    f.set_variation_by_axes([min(max(size, 14), 32), weight])
    return f

def width(d, t, f, tracking=0):
    if not tracking:
        return d.textlength(t, font=f)
    return sum(d.textlength(c, font=f) for c in t) + tracking * (len(t) - 1)

def centre(d, y, t, f, fill, tracking=0):
    """Draw t centred, with its cap line at y."""
    x = (W - width(d, t, f, tracking)) / 2
    top = f.getbbox("H")[1]
    y = y - top
    if not tracking:
        d.text((x, y), t, font=f, fill=fill)
        return
    for c in t:
        d.text((x, y), c, font=f, fill=fill)
        x += d.textlength(c, font=f) + tracking

def s_tile(size):
    """The site icon (cream S on green) turned round: a cream tile with a green S, corners as the favicon."""
    src = Image.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "icon-512.png")).convert("RGB")
    src = src.resize((size, size), Image.LANCZOS)
    out = Image.new("RGB", (size, size))
    px, po = src.load(), out.load()
    for y in range(size):
        for x in range(size):
            r, g, b = px[x, y]
            t = ((r - BG[0]) + (g - BG[1]) + (b - BG[2])) / ((CREAM[0] - BG[0]) + (CREAM[1] - BG[1]) + (CREAM[2] - BG[2]))
            t = min(max(t, 0.0), 1.0)
            po[x, y] = tuple(round(CREAM[i] + t * (BG[i] - CREAM[i])) for i in range(3))
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=round(size * 12 / 64), fill=255)
    return out, mask

def lockup(img, d, y, f, fill, tracking, size=46, gap=18):
    """S tile beside the tracked name, the pair centred; y is the name's cap line."""
    tw = width(d, "SCHURR SOUND", f, tracking)
    x = (W - (size + gap + tw)) / 2
    top = f.getbbox("H")[1]; cap = f.getbbox("H")[3] - top
    tile, mask = s_tile(size)
    img.paste(tile, (round(x), round(y + cap / 2 - size / 2)), mask)
    tx = x + size + gap
    for c in "SCHURR SOUND":
        d.text((tx, y - top), c, font=f, fill=fill)
        tx += d.textlength(c, font=f) + tracking

def build(out):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    lockup(img, d, 80, inter(26, 650), PALE, 8.5)
    d.rectangle([430, 129, 770, 132], fill=GOLD)
    centre(d, 196, "Ande Schurr", cg(132, 600), CREAM)
    centre(d, 337, "2026 EMMY NOMINEE", inter(26, 650), GOLD, tracking=1.5)
    centre(d, 379, "Outstanding Sound Mixing · Lord of the Flies (BBC/Netflix)", inter(25, 450), SOFT, tracking=0.3)
    centre(d, 462, "Clean dialogue on difficult locations.", cg(42, 500, italic=True), CREAM)
    centre(d, 551, "schurrsound.com", inter(26, 650), GOLD, tracking=0.3)
    img.save(out, "JPEG", quality=90, optimize=True, progressive=True)
    print("wrote", out)

if __name__ == "__main__":
    if not os.path.isdir(FD):
        sys.exit("No fonts at %s. Run tools/get-fonts.sh first." % FD)
    build(sys.argv[1] if len(sys.argv) > 1 else "og-image.jpg")
