/* ══════════════════════════════════════════════════════════════════════════
   THE WILD TRACK · production map data.
   Single source of truth for both the live interactive map (map.html)
   and the email's shooting/prep/hearing list (tools/generate-map-assets.js).

   Edit only the DATA array below, then run:
     cd wild-track/tools && node generate-map-assets.js
   to regenerate the email's issue list.

   service: local service / line production company, if publicly known.
            Company names only. NEVER an individual's name.

   status:  "shooting" = cameras rolling now
            "prep"     = pre-production, confirmed, not yet rolling
            "hearing"  = network intel, no public source. NEVER add a link.

   RULE: never list wrapped, in-post or released titles.
         Re-check every entry before each issue. Starts get announced;
         wraps never do.

   Add a row: copy a block, change values, save, regenerate, git push.
   lat/lng: right-click any point in Google Maps.
   ══════════════════════════════════════════════════════════════════════════ */

(function(){
var UPDATED = "1 September 2026";

var DATA = [
  {
    title:"Crazy Rich Asians (Series)", kind:"Series · Max / Warner Bros. Television",
    city:"Singapore", country:"Singapore", region:"ASEAN",
    service:"",
    status:"prep",
    note:"The series continuation, reuniting Jon M. Chu and Adele Lim from the original film. Principal photography begins 11 January 2027, split between New York and Singapore.",
    lat:1.35, lng:103.82,
    source:"https://www.productionlist.com/crazy-rich-asians-series-heading-to-max-with-jon-m-chu-and-adele-lim-filming-in-new-york-and-singapore",
    checked:"2026-09-01"
  },
  {
    title:"Extraction 3", kind:"Feature · Netflix / AGBO",
    city:"Sydney + NSW South Coast", country:"Australia", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Chris Hemsworth, Idris Elba, Golshifteh Farahani. Sam Hargrave directing. Shooting 23 July to 9 October across Sydney, the NSW South Coast, Europe and Thailand. Location Offset + Made in NSW via Screen NSW.",
    lat:-34.42, lng:150.89,
    source:"https://au.variety.com/2026/film/news/chris-hemsworth-extraction-3-begins-production-38851/",
    checked:"2026-09-01"
  },
  {
    title:"Queenstown", kind:"Series · Netflix",
    city:"Queenstown", country:"New Zealand", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Eight episodes, shot under the working title Black Diamond across four ski fields. Around 120 local crew over a five-month schedule. First Netflix series commissioned out of ANZ to be set and filmed in New Zealand. Glendyn Ivin and Roseanne Liang directing.",
    lat:-45.03, lng:168.66,
    source:"https://au.variety.com/2026/tv/news/production-begins-on-new-netflix-series-queenstown-38644/",
    checked:"2026-09-01"
  },
  {
    title:"Blue Murder Motel", kind:"Series S2 · Acorn TV / ITV",
    city:"Auckland", country:"New Zealand", region:"ANZ",
    service:"Great Southern Television",
    status:"shooting",
    note:"Season two is in production around greater Auckland, Michala Banas and Brett Tucker back as the retired detectives. Trade reports differ on the episode count, so treat that as unsettled.",
    lat:-36.85, lng:174.76,
    source:"https://tvtonight.com.au/2026/06/renewed-blue-murder-motel.html",
    checked:"2026-09-01"
  },
  {
    title:"Dead Losi", kind:"Series · TVNZ+",
    city:"Auckland", country:"New Zealand", region:"ANZ",
    service:"The Sweetshop",
    status:"shooting",
    note:"Six 44-minute episodes for TVNZ+, an original Samoan crime comedy developed with director Damon Fepulei, on NZ On Air scripted funding. The Screen Guild had it in prep in Auckland in February. No fresh public update since August, so the dates may have moved.",
    lat:-36.85, lng:174.76,
    source:"https://shownews.co.nz/dead-losi-tv-series/",
    checked:"2026-09-01"
  },
  {
    title:"The Hunt for Gollum", kind:"Feature · Warner Bros.",
    city:"Wellington", country:"New Zealand", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Middle-earth is back at Miramar. Principal photography began early July and runs to late October or early November. Andy Serkis directing and starring, with Kate Winslet, Anya Taylor-Joy and Leo Woodall.",
    lat:-41.31, lng:174.81,
    source:"https://variety.com/2026/film/news/lord-of-the-rings-hunt-for-gollum-filming-set-footage-1236810966/",
    checked:"2026-09-01"
  },
  {
    title:"Wentworth: Halfway Home", kind:"Series · Fremantle Australia",
    city:"Melbourne", country:"Australia", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Cameras rolled 27 July in Melbourne, shooting and posting in Victoria for Binge. Katrina Milosevic, Nicole da Silva and Kate Box returning. Premiere flagged for late 2026.",
    lat:-37.81, lng:144.96,
    source:"https://vicscreen.vic.gov.au/news/production-begins-on-wentworth-halfway-home",
    checked:"2026-09-01"
  },
  {
    title:"Crime Casters", kind:"Feature · Haven't You Done Well Productions",
    city:"Melbourne + regional Victoria", country:"Australia", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Aunty Donna's company steps up to its first feature, a comedy thriller. Max Miller directing, Scott Limbrick writing. Shooting from 17 August in and around Melbourne, backed by Screen Australia and VicScreen.",
    lat:-37.70, lng:145.20,
    source:"https://if.com.au/havent-you-done-well-kicks-off-on-first-feature-crime-casters/",
    checked:"2026-09-01"
  },
  {
    title:"NCIS: Sydney (Season 4)", kind:"Series · Paramount+ / CBS / Endemol Shine Australia",
    city:"Sydney", country:"Australia", region:"ANZ",
    service:"Endemol Shine Australia",
    status:"shooting",
    note:"Cameras rolled again in May across Sydney Harbour and surrounds. Airing on CBS at midseason in the 2026-27 season, so the block runs deep into the year.",
    lat:-33.86, lng:151.21,
    source:"https://www.paramountanz.com.au/news/cameras-roll-on-season-four-of-ncis-sydney/",
    checked:"2026-09-01"
  },
  {
    title:"Fog City", kind:"Feature",
    city:"Melbourne", country:"Australia", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Dan Pritzker's Depression-era San Francisco drama, with Melbourne standing in. Docklands Studios plus heritage locations, confirmed by VicScreen. Scheduled to shoot until the first week of September, so this one is about to come off the board.",
    lat:-37.81, lng:144.94,
    source:"https://vicscreen.vic.gov.au/news/melbourne-transforms-into-san-francisco-in-new-feature-fog-city",
    checked:"2026-09-01"
  },
  {
    title:"Priscilla, Queen of the Desert 2", kind:"Feature · Stephan Elliott",
    city:"Australia, locations unannounced", country:"Australia", region:"ANZ",
    service:"",
    status:"prep",
    note:"Elliott back to write and direct, with Hugo Weaving and Guy Pearce returning. Pearce says it shoots in 2027 for a 2028 release. Terence Stamp pre-filmed his scenes on a nine-camera array before his death, to be composited over a stand-in.",
    lat:-25.00, lng:134.00,
    source:"https://deadline.com/2026/08/guy-pearce-priscilla-queen-of-the-desert-2-filming-update-1237062780/",
    checked:"2026-09-01"
  },
  {
    title:"The Good Samaritan", kind:"Feature · Canton / Oakhurst / Sentient",
    city:"Malaysia", country:"Malaysia", region:"ASEAN",
    service:"Wave Films (Singapore)",
    status:"prep",
    note:"Pierre Morel directing, Daisy Ridley with Josh Duhamel and Sharlto Copley. Singapore's Wave Films is line producing in Malaysia. The story is set in Indonesia but the shoot is Malaysian.",
    lat:3.14, lng:101.69,
    source:"https://deadline.com/2026/07/singapore-wave-films-cambodian-broadcasting-dave-ulmer-1237013111/",
    checked:"2026-09-01"
  },

  {
    title:"Untitled US production", kind:"Feature or series",
    city:"Johor", country:"Malaysia", region:"ASEAN",
    service:"",
    status:"hearing",
    note:"A US production is shooting in southern Malaysia. Nothing announced, so no title and no source.",
    lat:1.42, lng:103.63,
    source:"",
    checked:"2026-09-01"
  },
  {
    title:"The Big Fix", kind:"Feature · Netflix",
    city:"Penang", country:"Malaysia", region:"ASEAN",
    service:"Biscuit Films Malaysia",
    status:"hearing",
    note:"Mark Wahlberg and Riz Ahmed. Serviced locally out of Penang, Australian sound crew alongside local.",
    lat:5.41, lng:100.33,
    source:"",
    checked:"2026-09-01"
  },
  {
    title:"Untitled Spektrum Cahaya feature", kind:"Feature · Spektrum Cahaya",
    city:"Johor", country:"Malaysia", region:"ASEAN",
    service:"",
    status:"hearing",
    note:"A regional feature setting up at Iskandar Malaysia Studios in Johor, with Adnan Al Rajeev attached to direct.",
    lat:1.43, lng:103.63,
    source:"",
    checked:"2026-09-01"
  },
  {
    title:"Nak Muay", kind:"Feature Film · Disruptive Element Films / Michelle Yeoh",
    city:"Bangkok + Pranburi", country:"Thailand", region:"ASEAN",
    service:"",
    status:"shooting",
    note:"Michelle Yeoh exec-produces; Tinge Krishnan directing a Muay Thai drama shooting Bangkok and Pranburi from 2 August through September, backed by the Thai government and the UK Global Screen Fund.",
    lat:13.75, lng:100.50,
    source:"https://deadline.com/2026/07/michelle-yeoh-ep-martial-arts-pnak-muay-thailand-august-1237005843/",
    checked:"2026-09-01"
  },
  {
    title:"Ah Boys To Firemen", kind:"Feature · J Team Productions / mm2 Entertainment",
    city:"Singapore", country:"Singapore", region:"ASEAN",
    service:"",
    status:"prep",
    note:"Jack Neo's franchise pivots from the army to the Civil Defence Force. Cappu Films took it to Filmart against a mid-2026 production start and a Chinese New Year 2027 release. Around US$3m, with virtual production for the fire work. No public confirmation yet that cameras have rolled.",
    lat:1.3521, lng:103.8198,
    source:"https://www.screendaily.com/news/cappu-films-to-spark-off-jack-neos-ah-boys-to-firemen-at-filmart/5214918.article",
    checked:"2026-09-01"
  },
  {
    title:"Journey to the West (modern adaptation)", kind:"Feature · Fiction Shore",
    city:"Singapore + Kuala Lumpur", country:"Singapore", region:"ASEAN",
    service:"",
    status:"hearing",
    note:"A stylised modern take on the classic, reportedly splitting stages and locations between Singapore and set builds in KL, with main unit around August and September.",
    lat:1.3521, lng:103.8198,
    source:"",
    checked:"2026-09-01"
  },
];

/* simplified coastlines: [label, [[lng,lat],...], showLabel] */
var LAND=[
["Japan",[[141.5,41.5],[141.0,38.3],[140.0,36.0],[138.9,34.6],[137.0,34.7],[135.5,33.5],[133.0,34.3],[131.0,34.0],[130.3,33.0],[130.9,31.6],[131.8,32.8],[132.5,33.9],[134.5,34.2],[136.9,35.2],[138.5,35.6],[139.9,35.4],[140.9,36.0],[141.6,38.5],[142.0,40.5]],1],
["",[[140.0,42.0],[141.5,42.5],[145.5,43.3],[145.0,44.4],[142.5,45.5],[141.0,45.2],[140.3,43.3]],0],
["Korea",[[126.5,37.8],[128.5,38.3],[129.4,37.0],[129.5,35.5],[129.0,35.1],[127.0,34.4],[126.4,34.7],[126.2,36.0]],1],
["Taiwan",[[121.0,25.3],[122.0,25.0],[121.5,23.0],[120.7,21.9],[120.1,23.0],[120.2,24.5]],1],
["Myanmar",[[92.6,21.3],[94.0,23.6],[96.0,24.1],[98.0,24.1],[98.9,23.0],[99.4,20.4],[98.6,19.7],[97.8,18.4],[98.6,16.5],[98.2,14.9],[98.7,12.2],[98.5,10.6],[97.4,16.4],[95.2,15.9],[94.2,16.1],[94.0,18.2],[92.9,19.6]],1],
["Thailand",[[99.4,20.4],[100.6,20.3],[101.2,19.6],[100.6,18.0],[102.1,18.1],[103.5,18.3],[104.8,17.4],[105.5,16.0],[105.0,14.4],[103.5,14.0],[102.4,13.6],[101.0,12.7],[100.9,13.5],[100.0,13.5],[99.6,12.0],[99.2,10.4],[100.1,9.0],[100.6,7.2],[101.9,6.5],[100.6,6.5],[99.6,6.9],[98.6,8.0],[98.5,10.6],[98.7,12.2],[98.2,14.9],[98.6,16.5],[97.8,18.4],[98.6,19.7]],1],
["Laos",[[100.6,20.3],[102.1,22.4],[104.6,22.8],[104.0,20.0],[105.2,18.9],[106.5,17.0],[107.4,15.9],[107.6,14.5],[105.5,14.5],[105.0,14.4],[105.5,16.0],[104.8,17.4],[103.5,18.3],[102.1,18.1],[100.6,18.0],[101.2,19.6]],1],
["Cambodia",[[102.4,13.6],[103.5,14.0],[105.0,14.4],[105.5,14.5],[107.5,14.4],[107.0,12.3],[105.8,11.0],[104.5,10.4],[103.5,10.6],[103.0,11.6],[102.5,12.6]],1],
["Vietnam",[[102.1,22.4],[104.5,22.8],[106.7,22.8],[107.5,21.5],[106.0,20.5],[106.5,19.0],[108.0,16.0],[109.3,13.5],[109.2,11.5],[107.0,10.8],[105.0,8.6],[104.9,10.0],[106.0,11.2],[107.5,12.5],[107.6,14.5],[107.4,15.9],[106.5,17.0],[105.2,18.9],[104.0,20.0],[104.6,22.8]],1],
["Malaysia",[[100.1,6.5],[101.5,6.3],[102.6,5.8],[103.6,4.5],[104.3,2.7],[103.5,1.4],[102.5,1.9],[101.3,2.8],[100.6,4.3],[100.1,5.5]],1],
["Sumatra",[[95.3,5.6],[97.5,5.2],[98.7,3.8],[100.3,2.5],[102.0,1.0],[103.5,-0.5],[104.6,-2.0],[105.9,-5.6],[104.5,-5.9],[102.5,-4.5],[100.5,-2.5],[98.5,-0.5],[96.5,3.0]],0],
["Java",[[105.2,-6.0],[107.0,-5.9],[109.0,-6.4],[111.0,-6.8],[113.0,-7.2],[114.5,-8.1],[114.0,-8.6],[111.5,-8.3],[109.0,-7.7],[106.5,-7.4],[105.2,-6.9]],0],
["Borneo",[[109.5,1.9],[111.0,1.5],[113.0,3.0],[115.0,4.5],[117.0,4.2],[118.6,4.5],[119.0,3.0],[117.5,1.0],[117.0,-1.0],[116.5,-3.0],[114.5,-3.5],[111.5,-3.0],[110.0,-2.5],[109.0,-0.5]],1],
["Sulawesi",[[120.0,1.5],[121.5,1.0],[123.5,0.8],[125.2,1.5],[125.0,0.5],[123.0,-0.5],[122.5,-2.0],[124.0,-3.0],[122.8,-4.5],[121.5,-4.0],[121.0,-2.5],[120.0,-3.5],[119.5,-5.5],[119.0,-5.0],[119.5,-3.0],[119.8,-1.0]],0],
["",[[115.0,-8.2],[116.0,-8.3],[117.5,-8.4],[119.0,-8.7],[120.5,-8.6],[122.5,-8.5],[124.5,-9.0],[123.5,-10.2],[121.0,-9.4],[118.5,-9.2],[116.5,-9.0],[115.0,-8.8]],0],
["Philippines",[[120.5,18.5],[121.6,18.3],[122.3,17.0],[122.0,15.5],[121.5,14.5],[122.6,14.0],[121.0,13.7],[120.6,14.5],[120.0,16.0]],1],
["",[[124.0,9.7],[126.1,9.5],[126.6,8.0],[126.0,6.5],[124.5,6.0],[123.0,7.0],[122.0,7.5],[123.5,8.5]],0],
["Papua New Guinea",[[141.0,-2.6],[144.0,-4.0],[147.0,-6.0],[150.0,-6.3],[150.8,-9.5],[147.5,-10.0],[144.5,-9.0],[141.0,-9.2]],1],
["Australia",[[113.2,-22.0],[114.0,-26.5],[115.0,-31.5],[117.5,-35.1],[120.0,-33.9],[123.5,-34.0],[126.0,-32.3],[129.0,-31.6],[132.0,-32.0],[134.0,-33.0],[135.5,-34.8],[137.0,-35.5],[138.5,-35.6],[140.0,-38.0],[143.0,-38.9],[145.5,-38.5],[147.5,-38.0],[150.0,-37.5],[151.5,-33.0],[153.0,-30.0],[153.5,-27.0],[152.5,-24.5],[149.5,-22.0],[147.0,-19.5],[145.5,-17.0],[145.3,-14.9],[142.5,-10.7],[141.0,-12.5],[140.0,-17.5],[138.0,-16.5],[136.0,-12.0],[132.5,-11.0],[130.8,-12.5],[129.0,-14.9],[127.0,-14.0],[124.5,-16.5],[122.0,-18.0],[118.5,-20.4],[115.5,-21.0]],1],
["",[[145.0,-40.7],[148.3,-40.8],[148.3,-42.5],[147.0,-43.6],[145.5,-43.0]],0],
["",[[172.7,-34.4],[174.5,-35.8],[176.0,-37.5],[178.5,-37.6],[178.0,-39.5],[176.0,-40.5],[174.9,-41.3],[174.0,-39.5],[173.0,-39.0],[174.5,-37.0]],0],
["",[[172.5,-40.5],[174.3,-41.5],[174.0,-42.5],[173.0,-43.5],[171.0,-44.5],[170.5,-45.9],[168.5,-46.7],[166.5,-46.0],[166.8,-45.0],[168.5,-44.0],[170.0,-42.8],[171.5,-41.7]],0]
];

var COLORS={shooting:'#8a763a',prep:'#1d6a5a',hearing:'#a0642c'};
var LABELS={shooting:'Shooting now',prep:'Pre-production',hearing:'Also hearing'};

var W=940, H=560, LNG0=90, LNG1=182, LAT0=48, LAT1=-50;
function X(l){ return (l-LNG0)/(LNG1-LNG0)*W; }
function Y(l){ return (LAT0-l)/(LAT0-LAT1)*H; }

/* Marker de-overlap, shared by both layers.
   Several productions share a city, and the Stages layer puts studio markers
   in the same places, so true coordinates land on the same few pixels and
   markers hide each other. Exact GPS is not the point of this map, being able
   to click each item is, so overlapping markers are pushed apart until every
   centre is SEP apart. They still read as a cluster and still overlap visibly,
   they just stay separate click targets.

   Deterministic: fixed start positions, fixed iteration order, fixed pass
   count. Feed it every marker from every visible layer at once, otherwise a
   studio can still land under a production pin. */
var PIN_SEP = 23;

function spreadPoints(items, sep){
  sep = sep || PIN_SEP;
  var pts = items.map(function(it, i){
    // golden-angle nudge so exactly coincident points have a direction to
    // separate along, and always the same one
    var a = i * 2.39996323;
    return { x: X(it.lng) + Math.cos(a) * 0.01, y: Y(it.lat) + Math.sin(a) * 0.01 };
  });

  for (var pass = 0; pass < 240; pass++){
    var settled = true;
    for (var i = 0; i < pts.length; i++){
      for (var j = i + 1; j < pts.length; j++){
        var dx = pts[j].x - pts[i].x, dy = pts[j].y - pts[i].y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        if (dist >= sep) continue;
        var push = (sep - dist) / 2, ux = dx/dist, uy = dy/dist;
        pts[i].x -= ux*push; pts[i].y -= uy*push;
        pts[j].x += ux*push; pts[j].y += uy*push;
        settled = false;
      }
    }
    if (settled) break;
  }

  var out = {};
  items.forEach(function(it, i){
    out[it.key] = {
      x: Math.min(W - 18, Math.max(18, pts[i].x)),
      y: Math.min(H - 18, Math.max(18, pts[i].y))
    };
  });
  return out;
}

/* Fallback for callers that only draw productions (the OG image generator). */
var PIN_XY = spreadPoints(DATA.map(function(d){
  return { key:d.title, lng:d.lng, lat:d.lat };
}));

/* Pure SVG-string builder, no DOM, works in browser and Node.
   rows: filtered/ordered array of DATA entries to plot.
   opts.showLabels: draw country name labels (on by default). */
function buildMapInner(rows, opts){
  opts = opts || {};
  var showLabels = opts.showLabels !== false;
  var ns = new Map(DATA.map(function(d,i){ return [d.title, i+1]; }));
  var s = '';

  LAND.forEach(function(item){
    var name=item[0], pts=item[1], lab=item[2];
    s+='<path class="land" d="M'+pts.map(function(p){return X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1);}).join('L')+'Z"/>';
    if(showLabels && lab && name){
      var cx=pts.reduce(function(a,p){return a+X(p[0]);},0)/pts.length;
      var cy=pts.reduce(function(a,p){return a+Y(p[1]);},0)/pts.length;
      s+='<text class="clabel" x="'+cx.toFixed(1)+'" y="'+cy.toFixed(1)+'">'+name+'</text>';
    }
  });
  if(showLabels){
    s+='<text class="clabel" x="'+X(176.5).toFixed(1)+'" y="'+Y(-42).toFixed(1)+'">New Zealand</text>';
  }

  var sx=X(103.8), sy=Y(1.35);
  s+='<circle class="base" cx="'+sx+'" cy="'+sy+'" r="10"/>';
  s+='<circle cx="'+sx+'" cy="'+sy+'" r="3.2" fill="#1e3a2f"/>';
  // dropped clear of the Singapore pin cluster, which the de-overlap pass fans
  // out below the base marker
  s+='<text class="baselab" x="'+sx+'" y="'+(sy+44)+'">SINGAPORE · BASE</text>';

  var POS = opts.positions || PIN_XY;

  // Stages layer sits under the production pins: studios are context, the
  // productions are the headline. Rounded squares, never circles, so the two
  // layers stay apart in greyscale and in print.
  (opts.stages || []).forEach(function(st){
    var sp = POS[st.id] || { x:X(st.lng), y:Y(st.lat) };
    var visited = !!(st.visit && st.visit.visited);
    var half = 13;
    s+='<g class="stage'+(visited?' is-visited':' is-desk')+'" data-s="'+st.id+'" tabindex="0" role="button"'
      +' aria-label="'+(st.name+', '+st.city+'. '+(visited?'Visited in person':'Desk research'))+'">'
      +'<rect x="'+(sp.x-half).toFixed(1)+'" y="'+(sp.y-half).toFixed(1)+'" width="'+(half*2)+'" height="'+(half*2)+'" rx="5"/>'
      +'<text class="stagelab" x="'+sp.x.toFixed(1)+'" y="'+(sp.y+4).toFixed(1)+'">'+(st.mapLabel||'')+'</text>'
      +'</g>';
  });

  rows.forEach(function(d){
    var p=POS[d.title] || { x:X(d.lng), y:Y(d.lat) };
    var x=p.x, y=p.y, n=ns.get(d.title);
    s+='<g class="pin" data-t="'+d.title+'" tabindex="0" role="button" aria-label="'+(d.title+', '+d.city+', '+LABELS[d.status])+'"><circle cx="'+x+'" cy="'+y+'" r="16" fill="'+COLORS[d.status]+'"/>';
    s+='<text class="pinnum" x="'+x+'" y="'+(y+3.6)+'">'+n+'</text></g>';
  });

  // Watermark: baked into the SVG itself so it travels with any
  // screenshot or saved image, unlike an on-page caption that's easy
  // to crop out.
  s+='<text x="12" y="'+(H-12)+'" text-anchor="start" font-family="Helvetica,Arial,sans-serif" font-size="11" letter-spacing="1" fill="#1e3a2f" fill-opacity="0.38">schurrsound.com/wild-track</text>';

  return s;
}

var api = { UPDATED:UPDATED, PIN_XY:PIN_XY, spreadPoints:spreadPoints, PIN_SEP:PIN_SEP, DATA:DATA, LAND:LAND, COLORS:COLORS, LABELS:LABELS, W:W, H:H, X:X, Y:Y, buildMapInner:buildMapInner };
if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
} else {
  window.WildTrackMap = api;
}
})();
