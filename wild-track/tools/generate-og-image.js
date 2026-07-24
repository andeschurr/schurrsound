#!/usr/bin/env node
/*
 * Generates the social-share (Open Graph) preview image for The Wild
 * Track: a stylised ASEAN/ANZ map in the site's green/gold branding
 * with the newsletter name and tagline baked in.
 *
 * Reuses the real coastline data + projection from map-data.js.
 * Output: wild-track/og-wild-track.png (1200x630).
 *
 * LAYOUT NOTE: some clients (WhatsApp inline previews, etc.) crop the
 * image to a CENTRE SQUARE instead of showing the full 1.91:1 frame.
 * So all text is centre-anchored and kept inside the central safe zone
 * (roughly x 300-900), which survives that crop. The map is full-bleed
 * behind it -- fine to lose its edges.
 *
 *   cd wild-track/tools && node generate-og-image.js
 */
const path = require('path');
const sharp = require('sharp');
const { LAND, X, Y, W, H } = require('../map-data.js');

const OUT = path.join(__dirname, '..', 'og-wild-track.png');
const OW = 1200, OH = 630, CX = OW / 2;

// Brand palette
const GREEN = '#1e3a2f', GREEN_DEEP = '#152a21', GOLD = '#b8a15c',
      GOLD_SOFT = '#d6c493', CREAM = '#f0ead8';

// Coastline paths in the map's native 940x560 space.
let coast = '';
LAND.forEach(function(item){
  const pts = item[1];
  coast += '<path d="M' + pts.map(p => X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1)).join('L') + 'Z"/>';
});
// Scale to cover the whole frame as a full-bleed backdrop.
const s = 1.28;
const mtx = (OW - W * s) / 2;
const mty = (OH - H * s) / 2;

// Gold waveform signature, centred. Native width ~178px.
const WAVE = 'M0 14 H24 M24 14 v-4 M28 14 v6 M32 14 v-9 M36 14 v11 M40 14 v-6 M44 14 v3 M48 14 v-11 M52 14 v8 M56 14 v-3 M60 14 v5 M64 14 v-8 M68 14 v2 M72 14 v-5 M76 14 v9 M80 14 v-2 M84 14 h40 M124 14 v-7 M128 14 v10 M132 14 v-4 M136 14 v6 M140 14 v-10 M144 14 v3 M148 14 h30';
const WAVE_W = 178;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OW}" height="${OH}" viewBox="0 0 ${OW} ${OH}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GREEN}"/>
      <stop offset="0.85" stop-color="${GREEN_DEEP}"/>
    </linearGradient>
    <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0" stop-color="${GREEN_DEEP}" stop-opacity="0.62"/>
      <stop offset="1" stop-color="${GREEN_DEEP}" stop-opacity="0.30"/>
    </radialGradient>
  </defs>

  <rect width="${OW}" height="${OH}" fill="url(#bg)"/>

  <!-- full-bleed coastline backdrop -->
  <g transform="translate(${mtx.toFixed(1)},${mty.toFixed(1)}) scale(${s})" fill="${GOLD}" fill-opacity="0.16" stroke="${GOLD}" stroke-opacity="0.30" stroke-width="0.9" stroke-linejoin="round">
    ${coast}
  </g>

  <!-- darken for legibility -->
  <rect width="${OW}" height="${OH}" fill="url(#vig)"/>

  <!-- gold top rule -->
  <rect x="0" y="0" width="${OW}" height="6" fill="${GOLD}"/>

  <!-- centred text block -->
  <text x="${CX}" y="150" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="19" letter-spacing="6" fill="${GOLD_SOFT}">LOCATION SOUND NOTES</text>

  <text x="${CX}" y="258" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="78" font-weight="600" fill="#ffffff">The Wild Track</text>

  <g transform="translate(${CX - WAVE_W / 2},292)" stroke="${GOLD}" stroke-width="2.4" stroke-linecap="round" fill="none">
    <path d="${WAVE}"/>
  </g>

  <text x="${CX}" y="384" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-style="italic" font-size="31" fill="${CREAM}">What&#8217;s shooting across ANZ &amp; ASEAN.</text>
  <text x="${CX}" y="426" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-style="italic" font-size="31" fill="${CREAM}">Quarterly, ninety seconds.</text>

  <text x="${CX}" y="512" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="17" letter-spacing="1.5" fill="${GOLD_SOFT}">&#9733; 2026 EMMY NOMINEE &#183; ANDE SCHURR</text>

  <text x="${CX}" y="566" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="bold" letter-spacing="1" fill="${GOLD}">schurrsound.com/wild-track</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile(OUT)
  .then(() => console.log('wrote', path.relative(process.cwd(), OUT)))
  .catch((err) => { console.error(err); process.exit(1); });
