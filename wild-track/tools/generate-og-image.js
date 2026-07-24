#!/usr/bin/env node
/*
 * Generates the social-share (Open Graph) preview image for The Wild
 * Track: a stylised ASEAN/ANZ map in the site's green/gold branding
 * with the newsletter name and tagline baked in.
 *
 * Reuses the real coastline data + projection from map-data.js.
 * Output: wild-track/og-wild-track.png (1200x630, the ratio WhatsApp/
 * Facebook/Twitter crop link previews to).
 *
 *   cd wild-track/tools && node generate-og-image.js
 */
const path = require('path');
const sharp = require('sharp');
const { LAND, X, Y, W, H } = require('../map-data.js');

const OUT = path.join(__dirname, '..', 'og-wild-track.png');
const OW = 1200, OH = 630;

// Brand palette
const GREEN = '#1e3a2f', GREEN_DEEP = '#152a21', GOLD = '#b8a15c',
      GOLD_SOFT = '#d6c493', CREAM = '#f0ead8';

// Build the coastline paths in the map's native 940x560 space, then a
// wrapping <g transform> scales + positions them as a backdrop.
let coast = '';
LAND.forEach(function(item){
  const pts = item[1];
  coast += '<path d="M' + pts.map(p => X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1)).join('L') + 'Z"/>';
});

// Scale the 940x560 map to sit as a large backdrop bleeding off the
// right edge, leaving the left third clear for text.
const s = 1.35;
const tx = 250;         // push right so ASEAN/Australia fill the frame
const ty = (OH - H * s) / 2;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OW}" height="${OH}" viewBox="0 0 ${OW} ${OH}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GREEN}"/>
      <stop offset="0.85" stop-color="${GREEN_DEEP}"/>
    </linearGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${GREEN_DEEP}" stop-opacity="0.95"/>
      <stop offset="0.55" stop-color="${GREEN_DEEP}" stop-opacity="0.15"/>
      <stop offset="1" stop-color="${GREEN_DEEP}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${OW}" height="${OH}" fill="url(#bg)"/>

  <!-- coastline backdrop -->
  <g transform="translate(${tx},${ty}) scale(${s})" fill="${GOLD}" fill-opacity="0.18" stroke="${GOLD}" stroke-opacity="0.32" stroke-width="0.9" stroke-linejoin="round">
    ${coast}
  </g>

  <!-- left fade so text stays legible over the map -->
  <rect width="${OW}" height="${OH}" fill="url(#fade)"/>

  <!-- gold top + bottom rules -->
  <rect x="0" y="0" width="${OW}" height="6" fill="${GOLD}"/>

  <!-- text block -->
  <text x="70" y="150" font-family="Helvetica,Arial,sans-serif" font-size="19" letter-spacing="5" fill="${GOLD_SOFT}" text-transform="uppercase">LOCATION SOUND NOTES</text>

  <text x="66" y="270" font-family="Georgia,'Times New Roman',serif" font-size="104" font-weight="600" fill="#ffffff">The Wild Track</text>

  <!-- small gold waveform signature -->
  <g transform="translate(70,300)" stroke="${GOLD}" stroke-width="2.4" stroke-linecap="round" fill="none">
    <path d="M0 14 H24 M24 14 v-4 M28 14 v6 M32 14 v-9 M36 14 v11 M40 14 v-6 M44 14 v3 M48 14 v-11 M52 14 v8 M56 14 v-3 M60 14 v5 M64 14 v-8 M68 14 v2 M72 14 v-5 M76 14 v9 M80 14 v-2 M84 14 h40 M124 14 v-7 M128 14 v10 M132 14 v-4 M136 14 v6 M140 14 v-10 M144 14 v3 M148 14 h30"/>
  </g>

  <text x="70" y="392" font-family="Georgia,'Times New Roman',serif" font-style="italic" font-size="33" fill="${CREAM}">What&#8217;s shooting across ANZ &amp; ASEAN.</text>
  <text x="70" y="436" font-family="Georgia,'Times New Roman',serif" font-style="italic" font-size="33" fill="${CREAM}">Quarterly, ninety seconds.</text>

  <!-- Emmy line -->
  <text x="70" y="520" font-family="Helvetica,Arial,sans-serif" font-size="17" letter-spacing="1.5" fill="${GOLD_SOFT}">&#9733; 2026 EMMY NOMINEE &#183; ANDE SCHURR</text>

  <!-- url -->
  <text x="70" y="574" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="bold" letter-spacing="1" fill="${GOLD}">schurrsound.com/wild-track</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile(OUT)
  .then(() => console.log('wrote', path.relative(process.cwd(), OUT)))
  .catch((err) => { console.error(err); process.exit(1); });
