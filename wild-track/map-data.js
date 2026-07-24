/* ══════════════════════════════════════════════════════════════════════════
   THE WILD TRACK — production map data.
   Single source of truth for both the live interactive map (map.html)
   and the email's shooting/prep/hearing list (tools/generate-map-assets.js).

   Edit only the DATA array below, then run:
     cd wild-track/tools && node generate-map-assets.js
   to regenerate the email's issue list.

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
var UPDATED = "24 July 2026";

var DATA = [
  {
    title:"Extraction 3", kind:"Feature · Netflix / AGBO",
    city:"Sydney + NSW South Coast", country:"Australia", region:"ANZ",
    status:"shooting",
    note:"Chris Hemsworth, Idris Elba, Golshifteh Farahani. Sam Hargrave directing. Location Offset + Made in NSW via Screen NSW.",
    lat:-34.42, lng:150.89,
    source:"https://www.instagram.com/ausfilm_international/",
    checked:"2026-07-24"
  },
  {
    title:"Queenstown", kind:"Series · Netflix",
    city:"Queenstown", country:"New Zealand", region:"ANZ",
    status:"shooting",
    note:"Eight episodes running to Christmas. First Netflix series commissioned out of ANZ to be set and filmed in New Zealand. Around 450 cast and crew jobs. Glendyn Ivin and Roseanne Liang directing.",
    lat:-45.03, lng:168.66,
    source:"https://deadline.com/2026/07/netflix-queenstown-rufus-sewell-frances-oconnor-show-cast-1236984382/",
    checked:"2026-07-24"
  },
  {
    title:"Blue Murder Hotel", kind:"Series S2 · Acorn TV / ITV",
    city:"Auckland", country:"New Zealand", region:"ANZ",
    status:"prep",
    note:"Season two went into pre-production 8 July, international deals already locked in.",
    lat:-36.85, lng:174.76,
    source:"https://shownews.co.nz/blue-murder-hotel-s2/",
    checked:"2026-07-24"
  },
  {
    title:"Dead Losi", kind:"Series · TVNZ+ / The Sweet Shop",
    city:"Auckland", country:"New Zealand", region:"ANZ",
    status:"prep",
    note:"Into pre-production 3 July, on NZ On Air scripted funding.",
    lat:-36.85, lng:174.76,
    source:"https://shownews.co.nz/dead-losi-tv-series/",
    checked:"2026-07-24"
  },
  {
    title:"The Hunt for Gollum", kind:"Feature · Warner Bros.",
    city:"Wellington", country:"New Zealand", region:"ANZ",
    status:"shooting",
    note:"Middle-earth is back at Miramar.",
    lat:-41.31, lng:174.81,
    source:"https://variety.com/2026/film/news/lord-of-the-rings-hunt-for-gollum-filming-set-footage-1236810966/",
    checked:"2026-07-24"
  },
  {
    title:"Bluey the Movie", kind:"Feature · Ludo Studio / BBC Studios",
    city:"Brisbane", country:"Australia", region:"ANZ",
    status:"prep",
    note:"In pre-production, per the Screen Australia register.",
    lat:-27.47, lng:153.03,
    source:"https://www.screenaustralia.gov.au/the-screen-guide/upcoming-productions/",
    checked:"2026-07-24"
  },
  {
    title:"Wentworth: Beyond Bars", kind:"Series · Fremantle Australia",
    city:"Melbourne", country:"Australia", region:"ANZ",
    status:"prep",
    note:"In pre-production, per the Screen Australia register.",
    lat:-37.81, lng:144.96,
    source:"https://www.screenaustralia.gov.au/the-screen-guide/upcoming-productions/",
    checked:"2026-07-24"
  },
  {
    title:"The Good Samaritan", kind:"Feature · Canton / Oakhurst / Sentient",
    city:"Australia", country:"Australia", region:"ANZ",
    status:"prep",
    note:"International production, in pre-production per Screen Australia — exact location not public yet.",
    lat:-33.87, lng:151.21,
    source:"https://www.screenaustralia.gov.au/the-screen-guide/upcoming-productions/",
    checked:"2026-07-24"
  },
  {
    title:"The Big Fix", kind:"Feature · Netflix",
    city:"Penang", country:"Malaysia", region:"ASEAN",
    status:"hearing",
    note:"Mark Wahlberg and Riz Ahmed. Serviced locally out of Penang, Australian sound crew alongside local.",
    lat:5.41, lng:100.33,
    source:"",
    checked:"2026-07-24"
  },
  {
    title:"Untitled Spektrum Cahaya feature", kind:"Feature · Spektrum Cahaya",
    city:"Johor", country:"Malaysia", region:"ASEAN",
    status:"hearing",
    note:"A regional feature setting up at Iskandar Malaysia Studios in Johor, with Adnan Al Rajeev attached to direct.",
    lat:1.43, lng:103.63,
    source:"",
    checked:"2026-07-24"
  },
  {
    title:"Fog City", kind:"Feature",
    city:"Melbourne", country:"Australia", region:"ANZ",
    status:"shooting",
    note:"Melbourne standing in for San Francisco. Shooting at Docklands Studios, confirmed by VicScreen.",
    lat:-37.81, lng:144.94,
    source:"https://vicscreen.vic.gov.au/news/melbourne-transforms-into-san-francisco-in-new-feature-fog-city",
    checked:"2026-07-24"
  }
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

/* Pure SVG-string builder — no DOM, works in browser and Node.
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
  s+='<text class="baselab" x="'+sx+'" y="'+(sy+26)+'">SINGAPORE · BASE</text>';

  rows.forEach(function(d){
    var x=X(d.lng), y=Y(d.lat), n=ns.get(d.title);
    s+='<g class="pin" data-t="'+d.title+'"><circle cx="'+x+'" cy="'+y+'" r="16" fill="'+COLORS[d.status]+'"/>';
    s+='<text class="pinnum" x="'+x+'" y="'+(y+3.6)+'">'+n+'</text></g>';
  });
  return s;
}

var api = { UPDATED:UPDATED, DATA:DATA, LAND:LAND, COLORS:COLORS, LABELS:LABELS, W:W, H:H, X:X, Y:Y, buildMapInner:buildMapInner };
if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
} else {
  window.WildTrackMap = api;
}
})();
