#!/usr/bin/env python3
"""
Schurr Sound - Field Notes OG image generator.
Usage:
  python3 og_gen.py "Article title here" "Deck line one|Deck line two" out.png
"""
import sys, math, random
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG      = (30, 58, 47)
POLY    = (36, 68, 55)
GOLD    = (184, 161, 92)
WHITE   = (255, 255, 255)
CREAM   = (240, 234, 216)

# Fonts live next to this script in tools/fonts/ and are gitignored: they are
# only needed to generate images, and there is no reason to serve 1 MB of
# TTF from the site. Run tools/get-fonts.sh once to fetch them.
import os
FD = os.environ.get("SS_FONTS", os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts"))
def cg(size, weight=600, italic=False):
    p = f"{FD}/CormorantGaramond-Italic[wght].ttf" if italic else f"{FD}/CormorantGaramond[wght].ttf"
    f = ImageFont.truetype(p, size)
    try: f.set_variation_by_axes([weight])
    except Exception: pass
    return f

def inter(size, weight=600):
    f = ImageFont.truetype(f"{FD}/Inter[opsz,wght].ttf", size)
    try: f.set_variation_by_axes([min(max(size,14),32), weight])
    except Exception: pass
    return f

def tw(d, t, f, tracking=0):
    if not tracking: return d.textlength(t, font=f)
    return sum(d.textlength(ch, font=f) for ch in t) + tracking * (len(t) - 1)

def track_text(d, xy, t, f, fill, tracking):
    x, y = xy
    for ch in t:
        d.text((x, y), ch, font=f, fill=fill)
        x += d.textlength(ch, font=f) + tracking

def centered(d, y, t, f, fill, tracking=0):
    w = tw(d, t, f, tracking)
    x = (W - w) / 2
    if tracking: track_text(d, (x, y), t, f, fill, tracking)
    else: d.text((x, y), t, font=f, fill=fill)
    return w

def wrap(d, text, f, maxw):
    words, lines, cur = text.split(), [], ""
    for wd in words:
        t = (cur + " " + wd).strip()
        if d.textlength(t, font=f) <= maxw or not cur: cur = t
        else: lines.append(cur); cur = wd
    if cur: lines.append(cur)
    return lines

def polygons(img, seed=7):
    rnd = random.Random(seed)
    lay = Image.new("RGB", (W, H), BG)
    dl = ImageDraw.Draw(lay)
    for _ in range(14):
        cx, cy = rnd.randint(-60, W + 60), rnd.randint(-40, H + 40)
        r = rnd.randint(40, 130)
        n = rnd.choice([5, 5, 6])
        rot = rnd.random() * math.tau
        pts = [(cx + r * math.cos(rot + i * math.tau / n),
                cy + r * math.sin(rot + i * math.tau / n)) for i in range(n)]
        dl.polygon(pts, fill=POLY)
    mask = Image.new("L", (W, H), 255)
    md = ImageDraw.Draw(mask)
    md.rectangle([0, 150, W, 500], fill=90)   # fade behind the type block
    img.paste(lay, (0, 0), mask)

def waveform(d, cy, half=95):
    cx = W / 2
    d.line([(cx - half, cy), (cx - half + 28, cy)], fill=GOLD, width=2)
    d.line([(cx + half - 28, cy), (cx + half, cy)], fill=GOLD, width=2)
    bars = [10, 18, 8, 22, 12, 26, 12, 22, 8, 18, 10]
    span = (half - 40) * 2
    step = span / (len(bars) - 1)
    x = cx - span / 2
    for h in bars:
        d.line([(x, cy - h / 2), (x, cy + h / 2)], fill=GOLD, width=2)
        x += step

def build(title, deck, out, eyebrow="FIELD NOTES  ·  ON LOCATION",
          url="schurrsound.com/notes", strap="2026 EMMY NOMINEE  ·  OUTSTANDING SOUND MIXING"):
    img = Image.new("RGB", (W, H), BG)
    polygons(img)
    d = ImageDraw.Draw(img)

    d.rectangle([0, 0, W, 6], fill=GOLD)

    centered(d, 96, eyebrow, inter(17, 700), GOLD, tracking=4.5)

    # title, shrink to fit two lines max
    size = 78
    while size > 46:
        f = cg(size, 600)
        lines = wrap(d, title, f, 1000)
        if len(lines) <= 2: break
        size -= 4
    f = cg(size, 600)
    lines = wrap(d, title, f, 1000)
    lh = size * 1.12
    y = 152 if len(lines) > 1 else 168
    for ln in lines:
        centered(d, y, ln, f, WHITE)
        y += lh

    y += 18
    waveform(d, y + 8)
    y += 42

    fd_ = cg(31, 500, italic=True)
    for ln in deck.split("|"):
        centered(d, y, ln.strip(), fd_, CREAM)
        y += 40

    centered(d, 512, "★  " + strap, inter(16, 700), GOLD, tracking=3.2)
    centered(d, 556, url, inter(19, 700), GOLD)

    img.save(out, "PNG", optimize=True)
    print("wrote", out)

if __name__ == "__main__":
    if not os.path.isdir(FD):
        sys.exit("No fonts at %s. Run tools/get-fonts.sh first." % FD)
    if len(sys.argv) < 3:
        sys.exit('Usage: og_gen.py "Title" "Deck line one|Deck line two" [out.png]')
    t = sys.argv[1]
    dk = sys.argv[2]
    o = sys.argv[3] if len(sys.argv) > 3 else "og.png"
    build(t, dk, o)
