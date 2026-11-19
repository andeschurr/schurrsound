#!/usr/bin/env node
/*
 * Rebuilds everything that is derived from wild-track/map-data.js, so the
 * production map can be updated by editing ONE file (the DATA list) and
 * running this script. No dependencies.
 *
 *   node wild-track/tools/build-map.js                 check + rebuild
 *   node wild-track/tools/build-map.js --check         check only, write nothing
 *   node wild-track/tools/build-map.js --log "text"    rebuild and record what changed
 *   node wild-track/tools/build-map.js --log-quiet "text"   rebuild and record a check that changed nothing
 *
 * It writes:
 *   wild-track/map.html      the static list, summary, quick answers and JSON-LD
 *                            (between the <!--gen:X--> markers), so search engines
 *                            and readers without scripts get the whole map as text
 *   wild-track/map-log.json  what changed and when, newest first
 *   wild-track/radar.xml     the same as a feed (weeks with a change only): the
 *                            weekly Radar email is sent from it
 *   index.html               the count and date in the home page's map section
 *   sitemap.xml              lastmod for /whats-shooting
 *
 * It refuses to write anything if a pin breaks the rules below.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const M = require('../map-data.js');
const { DATA, UPDATED, COLORS, LABELS } = M;

const args = process.argv.slice(2);
const CHECK_ONLY = args.includes('--check');
const QUIET = args.includes('--log-quiet');
const logIdx = QUIET ? args.indexOf('--log-quiet') : args.indexOf('--log');
const LOG_TEXT = logIdx >= 0 ? (args[logIdx + 1] || '').trim() : '';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function isoOf(longDate) {
  const m = /^(\d{1,2}) ([A-Z][a-z]+) (\d{4})$/.exec(longDate || '');
  if (!m || MONTHS.indexOf(m[2]) < 0) return null;
  return m[3] + '-' + String(MONTHS.indexOf(m[2]) + 1).padStart(2, '0') + '-' + m[1].padStart(2, '0');
}
const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return ''; } };

/* ── the rules ─────────────────────────────────────────────────────────── */
const errors = [];
const UPDATED_ISO = isoOf(UPDATED);
if (!UPDATED_ISO) errors.push('UPDATED must read like "19 November 2026", got: ' + UPDATED);
const seen = new Set();
DATA.forEach((d, i) => {
  const at = '#' + (i + 1) + ' ' + (d.title || '(no title)') + ': ';
  if (!d.title) errors.push(at + 'no title');
  if (seen.has(d.title)) errors.push(at + 'listed twice');
  seen.add(d.title);
  ['kind', 'city', 'country', 'note'].forEach((k) => { if (!d[k]) errors.push(at + 'missing ' + k); });
  if (!['ANZ', 'ASEAN'].includes(d.region)) errors.push(at + 'region must be ANZ or ASEAN');
  if (!['shooting', 'prep'].includes(d.status)) errors.push(at + 'status must be shooting or prep (nothing wrapped, in post, released or unsourced)');
  if (typeof d.lat !== 'number' || typeof d.lng !== 'number' || d.lat < -50 || d.lat > 29 || d.lng < 90 || d.lng > 182) errors.push(at + 'lat/lng outside Australia, New Zealand and Southeast Asia');
  const src = d.sources || [];
  if (src.length < 2) errors.push(at + 'needs at least two public sources');
  if (src.length > 3) errors.push(at + 'three sources at most');
  src.forEach((x) => { if (!x.name || !/^https:\/\//.test(x.url || '')) errors.push(at + 'each source needs a name and an https link'); });
  if (new Set(src.map((x) => host(x.url))).size < Math.min(2, src.length || 2)) errors.push(at + 'sources must come from at least two different sites');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.checked || '')) errors.push(at + 'checked must be a date like 2026-11-19');
  const text = [d.title, d.kind, d.city, d.service, d.note].join(' ');
  if (/[–—]/.test(text)) errors.push(at + 'no em or en dashes');
  if (/[\w.+-]+@[\w-]+\.[\w.]+/.test(text) || /\+?\d[\d\s().-]{7,}\d/.test(text.replace(/\b(19|20)\d{2}\b/g, ''))) errors.push(at + 'no contact details (email or phone) on the map');
});
if (errors.length) {
  console.error('Map NOT rebuilt. Fix these first:\n- ' + errors.join('\n- '));
  process.exit(1);
}

/* ── what the map says, in words ───────────────────────────────────────── */
const n = DATA.length;
const shooting = DATA.filter((d) => d.status === 'shooting');
const prep = DATA.filter((d) => d.status === 'prep');
const countries = [];
DATA.forEach((d) => { if (!countries.includes(d.country)) countries.push(d.country); });
const byCountry = (c) => DATA.filter((d) => d.country === c);
const plural = (k, w) => k + ' ' + w + (k === 1 ? '' : 's');
const place = (d) => (d.city.indexOf(d.country) >= 0 ? d.city : d.city + ', ' + d.country);
const one = (d) => d.title + ' (' + d.kind.replace(/\s*·\s*/g, ', ') + ', ' + d.city + ')';
const sentenceFor = (rows) => {
  const s = rows.filter((d) => d.status === 'shooting'), p = rows.filter((d) => d.status === 'prep');
  if (!rows.length) return 'Nothing on the map right now. That means nothing has two public sources yet, not that nothing is happening.';
  let out = '';
  if (s.length) out += 'Shooting: ' + s.map(one).join('; ') + '.';
  if (p.length) out += (out ? ' ' : '') + 'In pre-production: ' + p.map(one).join('; ') + '.';
  return out;
};
const summary = '<strong>' + plural(n, 'production') + '</strong>: ' + shooting.length + ' shooting, ' + prep.length + ' in pre-production. '
  + countries.map((c) => c + ' ' + byCountry(c).length).join(', ') + '. Checked ' + UPDATED + '.';

const ASEAN = ['Brunei','Cambodia','Indonesia','Laos','Malaysia','Myanmar','Philippines','Singapore','Thailand','Timor-Leste','Vietnam'];
const faq = [
  ['What is shooting in Australia right now?', 'As of ' + UPDATED + '. ' + sentenceFor(byCountry('Australia'))],
  ['What is shooting in New Zealand right now?', 'As of ' + UPDATED + '. ' + sentenceFor(byCountry('New Zealand'))],
  ['What is shooting in Southeast Asia right now?', 'As of ' + UPDATED + '. ' + sentenceFor(DATA.filter((d) => ASEAN.includes(d.country)))],
  ['How is the map checked?', 'Every production needs at least two public sources from different publishers, such as a trade paper and a screen agency release, and each pin links to them. The list is rechecked every week. Only productions in pre-production or shooting are listed, and wrapped titles come off.'],
  ['Does it list crew or contact details?', 'No. It shows what is shooting, where, and the production or service company when that is public. For contacts, go through the production company or the local screen agency.'],
  ['Can I add a production?', 'Yes. Email the title and the start month to ande@schurrsound.com. It goes on once two public sources confirm it.'],
];

/* ── generated HTML ────────────────────────────────────────────────────── */
const srcHTML = (d) => '<div class="note srcs"><strong>Sources:</strong> '
  + d.sources.map((x) => '<a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.name) + '</a>').join(' &nbsp;·&nbsp; ')
  + ' &nbsp;·&nbsp; checked ' + esc(d.checked) + '</div>';
const listHTML = DATA.map((d, i) => '<li data-status="' + d.status + '" data-t="' + esc(d.title) + '">'
  + '<div class="rowhead"><span class="n">' + (i + 1) + '</span><span class="t">' + esc(d.title) + '</span>'
  + '<span class="tag" style="background:' + COLORS[d.status] + '">' + LABELS[d.status] + '</span></div>'
  + '<div class="meta">' + esc(d.kind) + ' &nbsp;·&nbsp; ' + esc(place(d)) + '</div>'
  + (d.service ? '<div class="note"><strong>Serviced by</strong> ' + esc(d.service) + '</div>' : '')
  + '<div class="note">' + esc(d.note) + '</div>' + srcHTML(d) + '</li>').join('\n');
const faqHTML = faq.map(([q, a]) => '<details><summary>' + esc(q) + '</summary><p>' + esc(a) + '</p></details>').join('\n');

const typeOf = (d) => /series/i.test(d.kind) ? 'TVSeries' : /feature|film/i.test(d.kind) ? 'Movie' : 'CreativeWork';
const ld = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', '@id': 'https://schurrsound.com/whats-shooting', url: 'https://schurrsound.com/whats-shooting',
      name: "What's shooting in Australia, New Zealand and Southeast Asia",
      description: plural(n, 'film and television production') + ' shooting or in pre-production, each with two or three public sources.',
      dateModified: UPDATED_ISO, inLanguage: 'en',
      author: { '@type': 'Person', name: 'Ande Schurr', jobTitle: 'Production sound mixer', url: 'https://schurrsound.com/about' } },
    { '@type': 'ItemList', name: 'Productions shooting or in pre-production', numberOfItems: n,
      itemListElement: DATA.map((d, i) => ({ '@type': 'ListItem', position: i + 1, item: {
        '@type': typeOf(d), name: d.title, description: d.note,
        locationCreated: { '@type': 'Place', name: place(d) },
        creativeWorkStatus: LABELS[d.status], citation: d.sources.map((x) => x.url) } })) },
    { '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ],
};
const ldHTML = '<script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, '\\u003c') + '</script>';

const stdout = 'Map: ' + plural(n, 'production') + ' (' + shooting.length + ' shooting, ' + prep.length + ' in pre-production). Updated ' + UPDATED + '.';
if (CHECK_ONLY) { console.log('OK. ' + stdout); process.exit(0); }

/* ── write ─────────────────────────────────────────────────────────────── */
function fill(html, name, content) {
  const re = new RegExp('(<!--gen:' + name + '-->)[\\s\\S]*?(<!--/gen:' + name + '-->)');
  if (!re.test(html)) { console.error('Marker gen:' + name + ' is missing from the page. Nothing written.'); process.exit(1); }
  return html.replace(re, (m, a, b) => a + '\n' + content + '\n' + b);
}
const mapFile = path.join(ROOT, 'wild-track', 'map.html');
let page = fs.readFileSync(mapFile, 'utf8');
page = fill(page, 'ld', ldHTML);
page = fill(page, 'sum', '<p class="map-sum">' + summary + '</p>');
page = fill(page, 'list', listHTML);
page = fill(page, 'faq', faqHTML);
const desc = plural(n, 'production') + ' shooting or in pre-production across Australia, New Zealand and Southeast Asia, each with public sources. Checked ' + UPDATED + '.';
page = page.replace(/(<meta name="description" content=")[^"]*(">)/, (m, a, b) => a + esc(desc) + b);

const logFile = path.join(ROOT, 'wild-track', 'map-log.json');
let log = [];
try { log = JSON.parse(fs.readFileSync(logFile, 'utf8')); } catch (e) {}
if (LOG_TEXT) {
  log = log.filter((x) => x.date !== UPDATED_ISO);
  log.unshift({ date: UPDATED_ISO, text: LOG_TEXT, changed: !QUIET, productions: n, shooting: shooting.length, prep: prep.length });
  log = log.slice(0, 26);
}
const latest = log[0];
page = fill(page, 'log', latest ? '<p class="map-log">Latest change, ' + esc(latest.date) + ': ' + esc(latest.text) + '</p>' : '');
fs.writeFileSync(mapFile, page);
fs.writeFileSync(logFile, JSON.stringify(log, null, 1) + '\n');

/* the feed: one item per week in which the map changed */
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const rfc822 = (iso) => { const t = new Date(iso + 'T05:00:00+08:00'); const u = new Date(t.getTime() + 8 * 3600 * 1000);
  return DAYS[u.getUTCDay()] + ', ' + String(u.getUTCDate()).padStart(2, '0') + ' ' + MONTHS[u.getUTCMonth()].slice(0, 3) + ' ' + u.getUTCFullYear() + ' 05:00:00 +0800'; };
const longOf = (iso) => { const [y, m, dd] = iso.split('-'); return Number(dd) + ' ' + MONTHS[Number(m) - 1] + ' ' + y; };
const items = log.filter((x) => x.changed !== false).map((x) => '<item><title>' + esc('The Radar, ' + longOf(x.date)) + '</title>'
  + '<link>https://schurrsound.com/whats-shooting?week=' + x.date + '</link><guid isPermaLink="false">radar-' + x.date + '</guid>'
  + '<pubDate>' + rfc822(x.date) + '</pubDate><description>' + esc(x.text + ' On the map now: ' + plural(x.productions, 'production') + ', ' + x.shooting + ' shooting and ' + x.prep + ' in pre-production.') + '</description></item>').join('\n');
fs.writeFileSync(path.join(ROOT, 'wild-track', 'radar.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel>\n'
  + '<title>The Radar: what is shooting in Australia, New Zealand and Southeast Asia</title>\n<link>https://schurrsound.com/whats-shooting</link>\n'
  + '<description>Changes to the production map, checked every week. Two public sources on every pin.</description>\n<language>en</language>\n'
  + (log[0] ? '<lastBuildDate>' + rfc822(log[0].date) + '</lastBuildDate>\n' : '') + items + '\n</channel></rss>\n');

const homeFile = path.join(ROOT, 'index.html');
let home = fs.readFileSync(homeFile, 'utf8');
home = home.replace(/(<span data-map-count>)[^<]*(<\/span>)/g, (m, a, b) => a + n + b)
           .replace(/(<span data-map-updated>)[^<]*(<\/span>)/g, (m, a, b) => a + UPDATED + b);
fs.writeFileSync(homeFile, home);

const smFile = path.join(ROOT, 'sitemap.xml');
let sm = fs.readFileSync(smFile, 'utf8');
sm = sm.replace(/(<loc>https:\/\/schurrsound\.com\/whats-shooting<\/loc><lastmod>)[^<]*(<\/lastmod>)/, (m, a, b) => a + UPDATED_ISO + b);
fs.writeFileSync(smFile, sm);

console.log(stdout + (LOG_TEXT ? ' Logged: ' + LOG_TEXT : ''));
