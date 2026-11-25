/* ══════════════════════════════════════════════════════════════════════════
   THE WILD TRACK · production map data.
   Single source of truth for both the live interactive map (map.html)
   and the email's shooting/prep list (tools/generate-map-assets.js).

   Edit only the DATA array below. Regenerate an email list only when a new
   issue is being prepared (cd wild-track/tools && node generate-map-assets.js);
   it rewrites ep1-email.html, which is the archived first issue.

   sources: one to three public links per pin, [{name, url}], strongest first.
            Two or three from different publishers is the standard.
            A pin with ONE source is allowed since 20 November 2026. Since
            23 November 2026 nothing on the map or in the list marks it (Ande
            asked). The one source must be first-hand or trade press
            (screen agency, film commission, guild, studio, streamer,
            broadcaster, newspaper). A directory such as Production List,
            IMDb or Wikipedia is a lead to follow up, never the only source.

   service: local service / line production company, if publicly known.
            Company names only. NEVER an individual's name.

   status:  "shooting" = cameras rolling now
            "prep"     = pre-production, confirmed, not yet rolling
            "hearing"  = network intel, no public source. NEVER add a link.
                         (none listed since 19 November 2026)

   RULE: never list wrapped, in-post or released titles.
         Re-check every entry before each update. Starts get announced;
         wraps never do, so a pin without a published end date says so.

   lat/lng: right-click any point in Google Maps.
   ══════════════════════════════════════════════════════════════════════════ */

(function(){
var UPDATED = "25 November 2026";

var DATA = [
  {
    title:"Feral", kind:"Series · Netflix",
    city:"Gold Coast + Whitsundays", country:"Australia", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Seven-part survival drama from Shirley Conran's novel Savages, with Michelle Dockery, Jessica Gunning and Philippa Northeast, directed by Emma Freeman for Hera Pictures in association with Warner Bros. International Television Production. Screen Queensland said on 23 October 2026 that filming was underway, using the Gold Coast rainforest and the Whitsunday Islands. No wrap date published.",
    lat:-28.00, lng:153.30,
    sources:[
      {name:"Screen Queensland", url:"https://screenqueensland.com.au/sq-news/media-centre/netflix-series-feral-filming-in-queensland/"},
      {name:"TV Blackbox", url:"https://tvblackbox.com.au/page/2026/10/23/netflix-takes-feral-to-queensland-with-international-star-cast/"},
      {name:"Variety Australia", url:"https://au.variety.com/2026/tv/news/netflixs-feral-queensland-michelle-dockery-jessica-gunning-philippa-northeast-41802/"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"Deadlocked", kind:"Feature · Amazon MGM Studios",
    city:"Melbourne", country:"Australia", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Jamie Foxx hostage thriller with Sasha Calle, KiKi Layne and Luke Hemsworth, directed by Nikhil Bhat. Cameras rolled in early October across the CBD, Docklands, Port Melbourne and Docklands Studios, with Melbourne doubling for New York. VicScreen said on 22 October 2026 that filming was underway. No wrap date published.",
    lat:-37.815, lng:144.94,
    sources:[
      {name:"VicScreen", url:"https://vicscreen.vic.gov.au/news/new-jamie-foxx-action-film-locks-in-victoria/"},
      {name:"Variety Australia", url:"https://au.variety.com/2026/film/news/jamie-foxx-deadlocked-victoria-40945/"},
      {name:"AAP", url:"https://www.illawarramercury.com.au/story/9373058/jamie-foxx-brings-hollywood-action-to-australia/"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"Lenni", kind:"Series · Apple TV",
    city:"Sydney", country:"Australia", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Comedy drama adapted from the Norwegian series Pernille, starring Toni Collette with Ciarán Hinds, Dan Wyllie and Celeste Barber, directed by Dearbhla Walsh for Made Up Stories and Keshet International. Announced on 4 November 2026 with filming already underway in Sydney. No wrap date published.",
    lat:-33.87, lng:151.21,
    sources:[
      {name:"IF Magazine", url:"https://if.com.au/apple-tv-orders-toni-collette-comedy-drama-lenni-now-filming-in-sydney/"},
      {name:"Variety Australia", url:"https://au.variety.com/2026/tv/news/toni-collette-apple-tv-lenni-norwegian-format-42266/"},
      {name:"TheWrap", url:"https://www.thewrap.com/creative-content/tv-shows/toni-collette-apple-tv-dark-comedy-lenni/"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"The Artful Dodger (Season 3)", kind:"Series · Disney+",
    city:"Sydney", country:"Australia", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Third and final season of the period drama, with Thomas Brodie-Sangster, David Thewlis and Maia Mitchell, joined by Ewen Leslie, Stephen Curry and Broden Kelly, co-produced with Sony Pictures Television's Curio Pictures. Disney+ said on 6 October 2026 that principal photography was underway in Sydney. No wrap date published.",
    lat:-33.90, lng:151.18,
    sources:[
      {name:"Disney+", url:"https://www.disneyplus.com/en-au/explore/articles/the-artful-dodger-season-3-cast"},
      {name:"Variety Australia", url:"https://au.variety.com/2026/tv/news/artful-dodger-season-three-stephen-curry-broden-kelly-ewen-leslie-41015/"},
      {name:"IF Magazine", url:"https://if.com.au/ewen-leslie-stephen-curry-broden-kelly-join-the-artful-dodger/"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"Bluefly", kind:"Feature · Highland Film Group",
    city:"Gold Coast", country:"Australia", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Sci-fi action thriller directed by Nimród Antal, with Russell Crowe, Priyanka Chopra Jonas and Michael Chiklis. Screen Queensland said on 11 November 2026 that filming was underway on the Gold Coast, at Village Roadshow Studios and on location. No wrap date published.",
    lat:-27.91, lng:153.31,
    sources:[
      {name:"Screen Queensland", url:"https://screenqueensland.com.au/sq-news/media-centre/bluefly-brings-russell-crowe-and-priyanka-chopra-jonas-back-to-queensland/"},
      {name:"IF Magazine", url:"https://if.com.au/nimrod-antals-bluefly-sets-course-for-the-gold-coast-with-russell-crowe-priyanka-chopra-jonas/"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"Slander", kind:"Series · Stan",
    city:"Melbourne", country:"Australia", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Legal drama created by Rachel Griffiths and Marieke Hardy, from Blackfella Films, with Griffiths, Jessica De Gouw and Roxie Mohebbi. IF Magazine reported on 18 September 2026 that production would begin in Melbourne soon, and VicScreen listed it as currently filming on 22 October. No wrap date published.",
    lat:-37.80, lng:144.97,
    sources:[
      {name:"VicScreen", url:"https://vicscreen.vic.gov.au/news/new-jamie-foxx-action-film-locks-in-victoria/"},
      {name:"IF Magazine", url:"https://if.com.au/stan-reboots-mcleods-daughters-orders-slander-stuck-up-stupid/"},
      {name:"Premier of Victoria", url:"https://www.premier.vic.gov.au/labor-locks-jamie-foxxs-new-action-film"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"2 Moons", kind:"Feature · Co-Curious",
    city:"Parramatta, Sydney", country:"Australia", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Western Sydney sci-fi feature from Co-Curious, the first feature directed by Neil Sharma, with Fayssal Bazzi, Nicoletta Dimas and Nicole Nabout. IF Magazine reported on 19 November 2026 that production had begun in Parramatta. No wrap date published.",
    lat:-33.815, lng:151.00,
    sources:[
      {name:"IF Magazine", url:"https://if.com.au/fayssal-bazzi-nicoletta-dimas-nicole-nabout-bask-under-the-glow-of-neil-sharmas-2-moons-in-parramatta/"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"Plague", kind:"Feature · Dingo Pictures",
    city:"Dandenong Ranges, Victoria", country:"Australia", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Self-funded apocalyptic thriller directed and co-written by Ronnie Minder for his company Dingo Pictures. IF Magazine reported on 3 November 2026 that it was filming in Victoria, with scenes shot in the Dandenong Ranges, and that it would wrap in December at the earliest.",
    lat:-37.87, lng:145.35,
    sources:[
      {name:"IF Magazine", url:"https://if.com.au/ronnie-minder-rolls-camera-on-apocalyptic-thriller-plague/"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"McLeod's Daughters", kind:"Series · Stan",
    city:"Regional Victoria", country:"Australia", region:"ANZ",
    service:"",
    status:"prep",
    note:"A new chapter of the Australian drama as a Stan Original, from Werner Film Productions, part of BBC Studios. Announced on 29 October 2026 to film almost entirely in regional Victoria. No town, cast or start date published yet.",
    lat:-36.90, lng:144.60,
    sources:[
      {name:"VicScreen", url:"https://vicscreen.vic.gov.au/news/giddy-up-mcleods-daughters-to-film-in-regional-victoria/"},
      {name:"Mediaweek", url:"https://www.mediaweek.com.au/stan-s-mcleod-s-daughters-revival-heads-to-victoria"},
      {name:"Variety Australia", url:"https://au.variety.com/2026/tv/news/mcleods-daughters-revival-to-film-in-regional-victoria-42108/"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"Pilli Sisters PI", kind:"Series · ABC",
    city:"Perth", country:"Australia", region:"ANZ",
    service:"",
    status:"prep",
    note:"Six-part crime drama set in Fremantle, created and written by Tasma Walton, who also stars, a co-production between Lingo Pictures, Third Act Stories and Meeniyan Stories. Screenwest crew attachment notices for Pilli Sisters Productions give Perth as the location, with a six-week grip attachment from 7 January to 17 February 2027. No shoot dates published.",
    lat:-31.95, lng:115.86,
    sources:[
      {name:"Screenwest", url:"https://www.screenwest.com.au/news/abc-backs-new-western-australian-crime-drama-from-tasma-walton/"},
      {name:"Screenwest crew notice", url:"https://www.screenwest.com.au/news/grip-assistant-attachment/"},
      {name:"IF Magazine", url:"https://if.com.au/abc-announces-new-wa-set-crime-series-pilli-sisters-pi-from-tasma-walton/"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"Don't Look", kind:"Feature · Pathline Pictures / Bronte Studios",
    city:"NSW Outback", country:"Australia", region:"ANZ",
    service:"",
    status:"prep",
    note:"Outback creature horror, formerly titled From Below, directed by Kiah Roache-Turner, with Alyla Browne, George Pullar and Stephen Peacocke. IF Magazine reported on 12 November 2026 that production will now take place in the NSW Outback across February and March 2027. No town or start date published.",
    lat:-31.50, lng:143.50,
    sources:[
      {name:"IF Magazine", url:"https://if.com.au/from-below-becomes-dont-look-with-kiah-roache-turner-set-to-direct/"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"Spaceship Earth", kind:"Pilot · Disney+ / 20th Television",
    city:"Kumeu, Auckland", country:"New Zealand", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Disney+ pilot inspired by the EPCOT ride, with Catherine Laga'aia and Deacon Phillippe, Jason Fuchs showrunning. The Screen Guild's Auckland wrap of 23 September 2026 had it booking crew and due to film at KFS (Kumeu Film Studios) in Auckland during November and December 2026. No start or wrap confirmed since.",
    lat:-36.78, lng:174.56,
    sources:[
      {name:"NZ Screen Guild", url:"https://www.screenguild.co.nz/news/articles/regional-wrap-auckland-ik2mq"},
      {name:"TheWrap", url:"https://www.thewrap.com/creative-content/tv-shows/catherine-lagaaia-deacon-phillippe-cast-spaceship-earth-pilot-disney/"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"Māui & Elvis", kind:"Series · Whakaata Māori / APTN",
    city:"Canterbury (Christchurch)", country:"New Zealand", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Sci-fi adventure comedy series for children and families, a Māori and Métis/Cree co-production from Whitebait Media and Canada's Mosaic Entertainment, with at least 30 percent of the dialogue in te reo Māori. Production was scheduled to begin in November 2026, and Screen CanterburyNZ, whose production grant backs it, has it filming in November and December. Set mainly in the South Island, with scenes in Vancouver.",
    lat:-43.53, lng:172.64,
    sources:[
      {name:"Whakaata Māori", url:"https://www.whakaatamaori.co.nz/media-releases/maui-elvis-brings-maori-and-metis-cree-indigenous-storytellers-together-in-new-international-co-production"},
      {name:"Variety Australia", url:"https://au.variety.com/2026/tv/news/sci-fi-comedy-maui-elvis-whakaata-maori-aptn-39927/"},
      {name:"Screen CanterburyNZ", url:"https://www.screenguild.co.nz/news/articles/boost-for-canterburys-screen-industry"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"Queenstown", kind:"Series · Netflix",
    city:"Queenstown", country:"New Zealand", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Eight-part drama set in Queenstown's luxury ski scene, with Rufus Sewell and Frances O'Connor, made by Silent Firework and Runaway Unicorn. Netflix's first series commissioned and shot in New Zealand. Production began in July 2026, when the Otago Daily Times reported it would film in the resort over six months, with about 450 cast and crew jobs to Christmas. No wrap date published.",
    lat:-45.03, lng:168.66,
    sources:[
      {name:"Netflix Tudum", url:"https://www.netflix.com/tudum/articles/queenstown-series-plot-news"},
      {name:"Variety Australia", url:"https://au.variety.com/2026/tv/news/production-begins-on-new-netflix-series-queenstown-38644/"},
      {name:"Otago Daily Times", url:"https://www.odt.co.nz/regions/queenstown/netflix-shoot-new-drama-queenstown-resort"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"Chan", kind:"Drama series",
    city:"Auckland", country:"New Zealand", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Drama series from Kevin & Co. The Screen Guild's Auckland wrap of 23 September 2026 has it due to shoot in Auckland during November and December.",
    lat:-36.85, lng:174.76,
    sources:[
      {name:"NZ Screen Guild", url:"https://www.screenguild.co.nz/news/articles/regional-wrap-auckland-ik2mq"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"You've Changed", kind:"Feature",
    city:"Auckland", country:"New Zealand", region:"ANZ",
    service:"",
    status:"shooting",
    note:"Feature film from Bougie Baby Productions. The Screen Guild's Auckland wrap of 23 September 2026 has it shooting in Auckland during October and November.",
    lat:-36.90, lng:174.80,
    sources:[
      {name:"NZ Screen Guild", url:"https://www.screenguild.co.nz/news/articles/regional-wrap-auckland-ik2mq"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"Pendekar (Warrior)", kind:"Feature · Asia Media Alliance Group / Nation Pictures",
    city:"Iskandar Puteri, Johor", country:"Malaysia", region:"ASEAN",
    service:"",
    status:"shooting",
    note:"Iko Uwais Silat action feature, John Radel directing, with Tak Sakaguchi and Alicia Amin. Screen Daily reports that filming began in early November at Iskandar Studios in Malaysia and is expected to wrap in late December. Earlier reports had the shoot in Indonesia.",
    lat:1.4084, lng:103.6370,
    sources:[
      {name:"Screen Daily", url:"https://www.screendaily.com/news/pendekar-warrior-starring-the-raids-iko-uwais-begins-malaysia-shoot/5222243.article"},
      {name:"M.A.A.C.", url:"https://maactioncinema.com/archives/28305"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"The Day We Start Again", kind:"Feature · Lomo Pictures",
    city:"Kuala Lumpur + Kluang", country:"Malaysia", region:"ASEAN",
    service:"",
    status:"shooting",
    note:"China and Malaysia production from Lomo Pictures, co-produced by Xingyu Group and VYBE, with Bruce Chiu and Charlene An Yu Chin. Filming began on 6 October 2026, about 90 percent of it in Malaysia, in Kuala Lumpur and Kluang, with more planned in Luang Prabang, Laos. The Star reported on 15 November that it remained in production with filming still ahead, and gave no wrap date.",
    lat:3.14, lng:101.69,
    sources:[
      {name:"The Star", url:"https://www.thestar.com.my/aseanplus/aseanplus-news/2026/11/15/film-icons-including-from-hong-kong-and-digital-creators-gather-to-open-a-new-chapter-for-039film--platform039"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"Goreng!", kind:"Feature · Clover Films / GSC Movies",
    city:"Kuala Lumpur", country:"Malaysia", region:"ASEAN",
    service:"",
    status:"shooting",
    note:"Action comedy about a banana fritter stall used as cover for a bank heist, directed by M. Raihan Halim, with Sky Iskandar, Nadhir Nasar and Amelia Henderson. Malay Mail reported on 2 October 2026 that filming was underway, almost entirely in Kuala Lumpur. No shoot length or wrap date published.",
    lat:3.16, lng:101.71,
    sources:[
      {name:"Malay Mail", url:"https://www.malaymail.com/news/showbiz/2026/10/02/pisang-goreng-by-day-bank-heist-by-night-m-raihan-halim-plots-2027-release-for-malaysian-action-comedy-goreng/237440"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"Untitled FX pilot (Hiro Murai)", kind:"Pilot · FX",
    city:"Bangkok", country:"Thailand", region:"ASEAN",
    service:"",
    status:"prep",
    note:"Untitled pilot for FX, directed by Hiro Murai from a story by Wong Kar-wai, written by Julia Cho and Charles Yu, with Havana Rose Liu as the planned lead. Reported on 9 October 2026, citing Deadline, as set to film in Bangkok before the end of 2026. No dates published and no start confirmed since.",
    lat:13.75, lng:100.52,
    sources:[
      {name:"The A.V. Club", url:"https://www.avclub.com/wong-kar-wai-hiro-murai-teaming-up-fx-pilot-havana-rose-liu"}
    ],
    checked:"2026-11-25"
  },
  {
    title:"We Could Be in Love", kind:"Feature · Tiger & Dog Productions",
    city:"Manila", country:"Philippines", region:"ASEAN",
    service:"",
    status:"prep",
    note:"Indie romantic comedy directed by Marie Jamora, with Jasmine Curtis-Smith, yao, Jamie Chung and Lou Diamond Phillips. Announced in early October 2026 with principal photography to begin in November in New York and Manila. No Manila dates published and no start confirmed yet.",
    lat:14.60, lng:120.98,
    sources:[
      {name:"BroadwayWorld", url:"https://www.broadwayworld.com/bwwtv/article/Photos-WE-COULD-BE-IN-LOVE-to-Launch-with-Curtis-Smith-Chung-Phillips-20261005"},
      {name:"GMA News", url:"https://www.gmanetwork.com/news/showbiz/chikaminute/1004882/jasmine-curtis-smith-to-star-in-international-indie-film-we-could-be-in-love/story/"},
      {name:"MEGA", url:"https://mega-asia.com/women/jasmine-curtis-smith-we-could-be-in-love-movie/"}
    ],
    checked:"2026-11-25"
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
    var ang=(Math.atan2(x-sx,-(y-sy))*180/Math.PI+360)%360;
    s+='<g class="pin" data-t="'+d.title+'" data-st="'+d.status+'" style="--d:'+(ang/360*9).toFixed(2)+'s" tabindex="0" role="button" aria-label="'+(d.title+', '+d.city+', '+LABELS[d.status])+'">'+(d.status==='shooting'?'<circle class="halo" cx="'+x+'" cy="'+y+'" r="16" fill="none"/>':'')+'<circle cx="'+x+'" cy="'+y+'" r="16" fill="'+COLORS[d.status]+'"/>';
    s+='<text class="pinnum" x="'+x+'" y="'+(y+3.6)+'">'+n+'</text></g>';
  });

  // Watermark: baked into the SVG itself so it travels with any
  // screenshot or saved image, unlike an on-page caption that's easy
  // to crop out.
  s+='<text class="wm" x="12" y="'+(H-12)+'" text-anchor="start" font-family="Helvetica,Arial,sans-serif" font-size="11" letter-spacing="1" fill="#1e3a2f" fill-opacity="0.38">schurrsound.com/wild-track</text>';

  return s;
}

var api = { UPDATED:UPDATED, PIN_XY:PIN_XY, spreadPoints:spreadPoints, PIN_SEP:PIN_SEP, DATA:DATA, LAND:LAND, COLORS:COLORS, LABELS:LABELS, W:W, H:H, X:X, Y:Y, buildMapInner:buildMapInner };
if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
} else {
  window.WildTrackMap = api;
}
})();
