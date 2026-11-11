#!/usr/bin/env python3
"""
Schurr Sound - interim site icon: a cream Cormorant S on the site green.
A stand-in until a Schurr Sound logo is chosen; it uses only the site's own
type and colours so it does not pre-empt that choice.

Writes, into the repo root (or the folder given):
  favicon.ico (16, 32, 48), favicon.svg, apple-touch-icon.png (180),
  icon-192.png, icon-512.png

Usage:
  sh tools/get-fonts.sh            # once
  pip install fonttools pillow
  python3 tools/favicon_gen.py [out_dir]
"""
import os, re, sys
from PIL import Image, ImageDraw, ImageFont

GREEN = (30, 58, 47)
CREAM = (240, 234, 216)
WEIGHT = 700
FD = os.environ.get("SS_FONTS", os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts"))
FONT = f"{FD}/CormorantGaramond[wght].ttf"

def tile(size, radius_frac=0.0, glyph_frac=0.80):
    """Square tile with the S centred on its ink, glyph_frac of the height."""
    big = size * 8
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if radius_frac:
        d.rounded_rectangle([0, 0, big - 1, big - 1], radius=int(big * radius_frac), fill=GREEN)
    else:
        d.rectangle([0, 0, big, big], fill=GREEN)
    # size the font so the S's ink height is glyph_frac of the tile
    probe = ImageFont.truetype(FONT, 1000); probe.set_variation_by_axes([WEIGHT])
    l, t, r, b = probe.getbbox("S")
    fs = int(1000 * (big * glyph_frac) / (b - t))
    f = ImageFont.truetype(FONT, fs); f.set_variation_by_axes([WEIGHT])
    l, t, r, b = f.getbbox("S")
    x = (big - (r - l)) / 2 - l
    y = (big - (b - t)) / 2 - t
    d.text((x, y), "S", font=f, fill=CREAM)
    return img.resize((size, size), Image.LANCZOS)

def svg():
    from fontTools.ttLib import TTFont
    from fontTools.varLib.instancer import instantiateVariableFont
    from fontTools.pens.svgPathPen import SVGPathPen
    from fontTools.pens.boundsPen import BoundsPen
    from fontTools.pens.transformPen import TransformPen
    font = instantiateVariableFont(TTFont(FONT), {"wght": WEIGHT})
    gs = font.getGlyphSet()
    name = font.getBestCmap()[ord("S")]
    bp = BoundsPen(gs); gs[name].draw(bp)
    xmin, ymin, xmax, ymax = bp.bounds
    box, ink = 64.0, 64.0 * 0.80
    s = ink / (ymax - ymin)
    dx = (box - (xmax - xmin) * s) / 2 - xmin * s
    dy = (box + (ymax - ymin) * s) / 2 + ymin * s
    sp = SVGPathPen(gs)
    gs[name].draw(TransformPen(sp, (s, 0, 0, -s, dx, dy)))
    path = re.sub(r"-?\d+\.\d+", lambda m: ("%.2f" % float(m.group())).rstrip("0").rstrip("."), sp.getCommands())
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
            '<rect width="64" height="64" rx="12" fill="#1E3A2F"/>'
            f'<path fill="#F0EAD8" d="{path}"/></svg>\n')

def main(out):
    os.makedirs(out, exist_ok=True)
    tile(512, 0.0).convert("RGB").save(f"{out}/icon-512.png", optimize=True)
    tile(192, 0.0).convert("RGB").save(f"{out}/icon-192.png", optimize=True)
    tile(180, 0.0).convert("RGB").save(f"{out}/apple-touch-icon.png", optimize=True)
    ico = tile(256, 0.19)
    ico.save(f"{out}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    open(f"{out}/favicon.svg", "w").write(svg())
    print("icons written to", out)

if __name__ == "__main__":
    if not os.path.exists(FONT):
        sys.exit("No fonts at %s. Run tools/get-fonts.sh first." % FD)
    main(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
