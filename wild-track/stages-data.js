/* ══════════════════════════════════════════════════════════════════════════
   THE STAGES · studio and stage data for the production map's second layer.

   Productions answer "what is shooting". Stages answer "where could I shoot".
   Separate file, separate schema: do not merge this into map-data.js.

   EDITORIAL RULES, enforced by the renderer in map.html, not just by habit:
     1. incentive is never rendered unless incentive.verified === true.
        A wrong rebate figure in a producer's budget is unrecoverable.
     2. access.doorToDoor must carry provenance. measuredBy:"author" renders
        differently from anything estimated or published.
     3. No confidential production information here, ever. Studios are never
        tagged with unannounced shows, however well sourced.
     4. lastUpdated renders on every card.
     5. sources always render, even if it is one line.
     6. gaps is not a diplomatic field. Honest omissions are what make the
        rest of the record believable. Do not quietly drop it.

   visit.visited   true  -> filled marker, "Visited" badge
   visit.stale     true  -> filled marker, "Visited, data being refreshed"
   visit.visited   false -> hollow marker, "Desk research" badge
   ══════════════════════════════════════════════════════════════════════════ */
(function(){

var STAGES = [

  /* ── Deep record. First hand, article in draft. ───────────────────────── */
  {
    id:"ims-johor",
    name:"Iskandar Malaysia Studios",
    shortName:"IMS",
    formerName:"Pinewood Iskandar Malaysia Studios",
    country:"Malaysia", region:"ASEAN",
    city:"Iskandar Puteri, Johor",
    lat:1.4083774, lng:103.6370128,

    status:"operational",
    opened:2014,
    siteArea:"20 ha / 49 acres",
    owner:"Studio Management Services consortium. GHY Culture & Media (SGX-listed) holds 80%.",

    stages:[
      { name:"Stage 1", areaSqft:15000 },
      { name:"Stage 2", areaSqft:15000 },
      { name:"Stage 3", areaSqft:20000 },
      { name:"Stage 4", areaSqft:20000 },
      { name:"Stage 5", areaSqft:30000, notes:"water tank" }
    ],
    tvStudios:[
      { areaSqft:12000, notes:"converted to virtual production wall" },
      { areaSqft:12000, notes:"700-seat audience studio" }
    ],
    water:{
      paddockTank:"65 m x 65 m x 1.4 m, largest in Southeast Asia",
      deepTank:"18 m diameter x 5.6 m"
    },

    post:["Dolby Atmos mix stage","ADR","Foley","pre-mix","DCP mastering (Clipster)","DaVinci grade"],
    onSiteServices:["line production","standing sets / colonial back lot","props","workshops"],
    rentalPartners:[{ discipline:"camera & lighting", company:"True Colour Media (TCM)" }],
    gaps:["No named production sound partner"],

    access:{
      fromHub:"Singapore",
      doorToDoor:"about 3 h 15 m, Potong Pasir to gate, public transport via Tuas Second Link",
      notes:"CIQ 2nd Link then 15 min by road. E-hailing cannot enter the checkpoint.",
      measuredBy:"author",
      measuredOn:"2026-08-10"
    },

    incentive:{
      scheme:"FIMI (Film in Malaysia Incentive)",
      headline:"30% cash rebate on qualifying Malaysian spend",
      conditions:"Minimum spend and local-crew thresholds apply. Verify against FINAS before relying on this.",
      verified:false
    },

    crewDepth:"Most Malaysian sound crews are based in Kuala Lumpur. The Johor technical crew pool is thin (per IMS Studio Services, Aug 2026).",

    visit:{ visited:true, date:"2026-08-10", hosted:true },
    article:{ slug:null, status:"in-draft", expected:"2026-09" },
    sources:[
      "Author site visit, 10 August 2026",
      "iskandarmalaysiastudios.com",
      "Wikipedia, Iskandar Malaysia Studios"
    ],
    lastUpdated:"2026-08-11"
  },

  /* ── Known first hand, but the visit is old. Flagged rather than dressed
        up as current. ─────────────────────────────────────────────────── */
  {
    id:"infinite-batam",
    name:"Infinite Studios Batam",
    shortName:"Infinite Batam",
    country:"Indonesia", region:"ASEAN",
    city:"Nongsa, Batam",
    lat:1.0832, lng:104.1211,
    coordsNote:"Plotted to the Nongsa locality, not a surveyed studio position. To be corrected on the next visit.",

    status:"operational",
    siteArea:"10 ha",

    stages:[
      { name:"Soundstage", areaSqft:30000 },
      { name:"Soundstage", areaSqft:14000 }
    ],
    onSiteServices:["1 hectare backlot"],
    gaps:[
      "No current first-hand read on crew depth, post facilities or rates",
      "Stage list is from the operator's published page and may be incomplete"
    ],

    access:{
      fromHub:"Singapore",
      doorToDoor:"40 minutes by ferry, per the operator. Door to door not yet measured.",
      measuredBy:"operator"
    },

    crewDepth:null,

    visit:{ visited:true, date:"pre-2020", stale:true },
    article:{ slug:null, status:"planned", expected:"2026-10" },
    sources:[
      "infinitestudios.com.sg/batam",
      "Author familiarity, several years old"
    ],
    lastUpdated:"2026-08-11"
  },

  /* ── Desk research. No first-hand knowledge, and the card says so. ────── */
  {
    id:"docklands-melbourne",
    name:"Docklands Studios Melbourne",
    country:"Australia", region:"ANZ",
    city:"Docklands, Melbourne",
    lat:-37.810, lng:144.935,

    status:"operational",
    opened:2004,
    siteArea:"6.4 ha",

    stages:[
      { name:"Stages 1 to 5", areaSqft:8000, notes:"five stages, 743 sq m to 2,323 sq m (8,000 to 25,000 sq ft)" },
      { name:"Stage 6", areaSqft:40000, notes:"3,700 sq m, one of the largest in the southern hemisphere" }
    ],
    water:{ deepTank:"900,000 litre tank, 4.5 m deep, inside Stage 6" },
    gaps:["Desk research only. No first-hand read on crew, post or day-to-day access."],

    visit:{ visited:false },
    article:{ slug:null, status:"none" },
    sources:[
      "VicScreen, new super stage and water tank",
      "Development Victoria, Docklands Studios Melbourne"
    ],
    lastUpdated:"2026-08-11"
  },

  {
    id:"village-roadshow-gold-coast",
    name:"Village Roadshow Studios",
    country:"Australia", region:"ANZ",
    city:"Oxenford, Gold Coast",
    lat:-27.8646, lng:153.3126,

    status:"operational",
    stages:[
      { name:"Nine sound stages", areaSqft:40000, notes:"269 sq m to 3,716 sq m (4,860 to 40,000 sq ft), 15,380 sq m total floor area" },
      { name:"Sound Stage 9", areaSqft:40000, notes:"80 m x 47 m x 18 m high" }
    ],
    water:{ paddockTank:"Outdoor tank, 1,200 sq m, six million litres. Three water tanks on site." },
    gaps:["Desk research only. No first-hand read on crew, post or day-to-day access."],

    visit:{ visited:false },
    article:{ slug:null, status:"none" },
    sources:[
      "villageroadshowstudios.com.au, stages and tanks",
      "Screen Queensland, major Gold Coast facilities"
    ],
    lastUpdated:"2026-08-11"
  },

  {
    id:"auckland-film-studios",
    name:"Auckland Film Studios",
    country:"New Zealand", region:"ANZ",
    city:"Henderson, Auckland",
    lat:-36.879, lng:174.630,

    status:"operational",
    stages:[
      { name:"Five stages", areaSqft:22000, notes:"over 7,500 sq m (80,700 sq ft) across five stages. The two opened in 2022 are about 2,000 sq m (22,000 sq ft) each. Individual sizes for the older three are not published." }
    ],
    gaps:["Desk research only. No first-hand read on crew, post or day-to-day access."],

    visit:{ visited:false },
    article:{ slug:null, status:"none" },
    sources:["Variety, Auckland Film Studios opens two additional stages","Auckland Unlimited"],
    lastUpdated:"2026-08-11"
  },

  {
    id:"kumeu-film-studios",
    name:"Kumeu Film Studios",
    country:"New Zealand", region:"ANZ",
    city:"Kumeu, Auckland",
    lat:-36.770, lng:174.550,

    status:"operational",
    stages:[
      { name:"Stage 1", areaSqft:25000, notes:"2,336 sq m, 14 m minimum internal height" },
      { name:"Stage 2", areaSqft:25000, notes:"2,336 sq m, 14 m minimum internal height" },
      { name:"Converted warehouse", areaSqft:43448, notes:"4,036 sq m, 9 m to 11 m high" }
    ],
    onSiteServices:["workshops 6,160 sq m","offices 1,215 sq m"],
    gaps:["Desk research only. No first-hand read on crew, post or day-to-day access."],

    visit:{ visited:false },
    article:{ slug:null, status:"none" },
    sources:["Auckland Unlimited, Kumeu Film Studios","New Zealand Film Commission sound stage list"],
    lastUpdated:"2026-08-11"
  }

];

/* Derived helpers the renderer uses for filters and the stage summary line. */
function totalStages(s){ return (s.stages||[]).length; }
function largestSqft(s){
  return (s.stages||[]).concat(s.tvStudios||[])
    .reduce(function(m,x){ return Math.max(m, x.areaSqft||0); }, 0);
}
function hasWater(s){ return !!(s.water && (s.water.paddockTank || s.water.deepTank)); }
function hasPost(s){ return !!(s.post && s.post.length); }
function isVisited(s){ return !!(s.visit && s.visit.visited); }

var api = {
  STAGES:STAGES,
  totalStages:totalStages, largestSqft:largestSqft,
  hasWater:hasWater, hasPost:hasPost, isVisited:isVisited
};

if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
else { window.WildTrackStages = api; }
})();
