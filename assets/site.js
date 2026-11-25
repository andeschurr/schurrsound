/* Schurr Sound, shared behaviour. See design-system.md.
   Publishes the real measured nav height as --nav-h so scroll-margin-top can
   keep in-page anchors clear of the sticky bar at every viewport width.
   When the bar is not sticky (phones, the map page) the offset drops to zero. */
/* Own devices: Ande's own views should not count as visitors. Opening any page once with
   ?count=off marks this browser (kept in localStorage); ?count=on unmarks it. Cloudflare adds
   its visitor counter to the page at the edge, so the page cannot leave it out. On a marked
   browser this stops the counter's report (/cdn-cgi/rum) from being sent instead. This file is
   loaded in <head> with defer, so it runs before the counter, which sits at the end of <body>. */
(function () {
  var KEY = 'sx-own-device', m = /[?&]count=(off|on)\b/.exec(location.search), own = false;
  try {
    if (m) { if (m[1] === 'off') { localStorage.setItem(KEY, '1'); } else { localStorage.removeItem(KEY); } }
    own = localStorage.getItem(KEY) === '1';
  } catch (e) { return; }
  if (m) {
    var note = document.createElement('p');
    note.setAttribute('role', 'status');
    note.textContent = own ? 'Marked as your own device: its visits are no longer counted.' : 'Unmarked: visits from this device are counted again.';
    note.style.cssText = 'position:fixed;left:50%;top:14px;transform:translateX(-50%);z-index:9999;margin:0;padding:10px 16px;' +
      'background:#152a21;color:#f3ead2;border:1px solid #b8a15c;font:600 14px/1.4 system-ui,sans-serif;width:max-content;max-width:92vw;text-align:center';
    document.body.appendChild(note);
    setTimeout(function () { if (note.parentNode) { note.parentNode.removeChild(note); } }, 9000);
    if (history.replaceState) { history.replaceState(null, '', location.pathname + location.hash); }
  }
  if (!own) { return; }
  var rum = function (u) { return String((u && u.url) || u || '').indexOf('/cdn-cgi/rum') !== -1; };
  if (navigator.sendBeacon) {
    var sb = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function (u, d) { return rum(u) ? true : sb(u, d); };
  }
  var xo = XMLHttpRequest.prototype.open, xs = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (method, u) { this.__own = rum(u); return xo.apply(this, arguments); };
  XMLHttpRequest.prototype.send = function () { if (this.__own) { return; } return xs.apply(this, arguments); };
  if (window.fetch && window.Response) {
    var f = window.fetch;
    window.fetch = function (u) { return rum(u) ? Promise.resolve(new Response(null, { status: 204 })) : f.apply(this, arguments); };
  }
})();

(function () {
  var nav = document.querySelector('nav');
  var root = document.documentElement;
  if (!nav) { root.style.setProperty('--nav-h', '0px'); return; }

  function measure() {
    var stuck = getComputedStyle(nav).position === 'sticky';
    var h = stuck ? Math.ceil(nav.getBoundingClientRect().height) : 0;
    root.style.setProperty('--nav-h', h + 'px');
  }

  measure();
  window.addEventListener('load', measure);
  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('orientationchange', measure);
  if (window.ResizeObserver) { new ResizeObserver(measure).observe(nav); }
})();

/* Phone menu: the Menu button opens and closes the link list under the bar.
   The inline script in <nav> adds .js first, so without JavaScript the list
   simply stays open. A link click or Escape closes it again. */
(function () {
  var nav = document.querySelector('nav');
  var btn = nav && nav.querySelector('.nav-toggle');
  if (!btn) { return; }
  function set(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Close' : 'Menu';
  }
  btn.addEventListener('click', function () { set(!nav.classList.contains('open')); });
  nav.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () { set(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { set(false); } });
})();

/* Tabs ([data-tabs]): one panel at a time, arrow keys move between tabs.
   Without JavaScript every panel shows, each with its own heading. */
(function () {
  [].forEach.call(document.querySelectorAll('[data-tabs]'), function (box) {
    var tabs = [].slice.call(box.querySelectorAll('[role="tab"]'));
    if (!tabs.length) { return; }
    box.classList.add('ready');
    function show(t, focus) {
      tabs.forEach(function (x) {
        var on = x === t, p = document.getElementById(x.getAttribute('aria-controls'));
        x.setAttribute('aria-selected', on ? 'true' : 'false');
        x.tabIndex = on ? 0 : -1;
        if (p) { p.hidden = !on; }
      });
      if (focus) { t.focus(); }
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(t); });
      t.addEventListener('keydown', function (e) {
        var j = i;
        if (e.key === 'ArrowRight') { j = (i + 1) % tabs.length; }
        else if (e.key === 'ArrowLeft') { j = (i - 1 + tabs.length) % tabs.length; }
        else { return; }
        e.preventDefault(); show(tabs[j], true);
      });
    });
    show(tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0]);
  });
})();

/* The showreel: one press on play and it plays with the sound on (Ande, 23 Nov 2026:
   muted autoplay meant play, then unmute, "two points of friction"). No autoplay and
   never muted: the press lands on Wistia's own play button, inside the player, so every
   browser lets the sound play. The player loads as it nears the screen. Without
   JavaScript the link opens the reel.
   data-reel-start (seconds) skips the reel's opening title card: the reel starts there,
   loops back to there, and cannot be scrubbed to before it. Remove the attribute once
   the card has been trimmed off the video itself in Wistia. */
(function () {
  var box = document.querySelector('.hero-reel[data-reel]');
  if (!box) { return; }
  var frame = box.querySelector('.reel');
  var done = false;
  function add() {
    if (done) { return; }
    done = true;
    var id = box.getAttribute('data-reel');
    var start = parseFloat(box.getAttribute('data-reel-start')) || 0;
    var end = parseFloat(box.getAttribute('data-reel-end')) || 0;
    var f = document.createElement('iframe');
    f.src = 'https://fast.wistia.net/embed/iframe/' + id + '?videoFoam=true' +
      (start ? '&time=' + start : '');
      /* Never add autoPlay, silentAutoPlay or muted here (23 Nov 2026, above). */
    f.title = 'Ande Schurr · Showreel';
    f.setAttribute('allow', 'autoplay; fullscreen');
    f.setAttribute('allowfullscreen', '');
    if (start || end) { f.className = 'wistia_embed'; f.name = 'wistia_embed'; }
    frame.innerHTML = '';
    frame.appendChild(f);
    if (start || end) {
      /* Wistia's player API for iframes: keep the playhead between the start and end points
         (data-reel-end, 23 Nov 2026: one moment of the reel, e.g. Piggy). */
      window._wq = window._wq || [];
      window._wq.push({ id: id, onReady: function (v) {
        /* a moment with an end point plays once, then waits at its start for the next press */
        var skip = function (t) {
          if (end && t >= end) { v.pause(); v.time(start); }
          else if (t < start - 0.4) { v.time(start); }
        };
        skip(v.time());
        v.bind('timechange', skip);
      } });
      var sc = document.createElement('script');
      sc.src = 'https://fast.wistia.net/assets/external/E-v1.js';
      sc.async = true;
      document.head.appendChild(sc);
    }
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); add(); }
    }, { rootMargin: '200px' });
    io.observe(box);
  } else { add(); }
})();

/* One sound at a time: starting one player pauses any other on the page. */
document.addEventListener('play', function (e) {
  var t = e.target;
  if (!t || t.tagName !== 'AUDIO') { return; }
  [].forEach.call(document.querySelectorAll('audio'), function (a) { if (a !== t) { a.pause(); } });
}, true);

/* Official trailers ([data-yt]): nothing loads from YouTube until the visitor presses play.
   Without JavaScript the link opens the trailer on YouTube. Adding ?quiet to the address
   starts it muted. */
(function () {
  [].forEach.call(document.querySelectorAll('[data-yt]'), function (box) {
    var a = box.querySelector('.reel-start'), frame = box.querySelector('.reel');
    if (!a || !frame) { return; }
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + box.getAttribute('data-yt') + '?autoplay=1&rel=0' +
        (/[?&]quiet\b/.test(location.search) ? '&mute=1' : '');
      f.title = box.getAttribute('data-yt-title') || 'Official trailer';
      f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
      f.setAttribute('allowfullscreen', '');
      frame.innerHTML = '';
      frame.appendChild(f);
    });
  });
})();

/* Documentary reel ([data-dr]): clips from YouTube played one after another in one frame.
   Nothing loads from YouTube until the visitor presses play; the first press also fetches
   YouTube's player script, which is what tells the page a clip has ended. Without JavaScript
   each line opens its clip on YouTube. Adding ?quiet to the address starts it muted. */
(function () {
  var box = document.querySelector('[data-dr]');
  if (!box) { return; }
  var frame = box.querySelector('.reel'), start = box.querySelector('.reel-start');
  var links = [].slice.call(box.querySelectorAll('.dr-list a[data-v]'));
  if (!frame || !links.length) { return; }
  var player = null, ready = false, idx = 0, pending = null, tick = null;
  var quiet = /[?&]quiet\b/.test(location.search);

  function mark(i) {
    links.forEach(function (a, k) {
      if (k === i) { a.setAttribute('aria-current', 'true'); } else { a.removeAttribute('aria-current'); }
    });
  }

  function secs(a, name) { return parseFloat(a.getAttribute(name)) || 0; }

  /* A clip with data-e stops at that second and hands over to the next. The time is watched
     here and not given to YouTube as an end point: its own end point made the next clip
     report "ended" the moment it loaded, which skipped a clip in testing (21 Nov 2026).
     The cut waits until this clip has been seen before its end point, so a reading left
     over from the clip before cannot set it off. */
  function watch(v, e) {
    if (tick) { clearInterval(tick); tick = null; }
    if (!e) { return; }
    var armed = false;
    tick = setInterval(function () {
      if (!player || !ready || typeof player.getCurrentTime !== 'function') { return; }
      var d = typeof player.getVideoData === 'function' ? player.getVideoData() : null;
      if (d && d.video_id && d.video_id !== v) { return; }
      if (player.getCurrentTime() < e) { armed = true; return; }
      if (!armed) { return; }
      clearInterval(tick); tick = null;
      if (idx + 1 < links.length) { play(idx + 1); } else if (player.pauseVideo) { player.pauseVideo(); }
    }, 200);
  }

  function build(v, s) {
    var holder = document.createElement('div');
    frame.innerHTML = '';
    frame.appendChild(holder);
    player = new window.YT.Player(holder, {
      host: 'https://www.youtube-nocookie.com',
      videoId: v, width: '100%', height: '100%',
      playerVars: { autoplay: 1, rel: 0, playsinline: 1, start: Math.floor(s), mute: quiet ? 1 : 0 },
      events: {
        onReady: function (e) {
          ready = true;
          var f = e.target.getIframe && e.target.getIframe();
          if (f) { f.title = 'Documentary reel'; }
          if (pending !== null) { var p = pending; pending = null; play(p); }
        },
        onStateChange: function (e) {
          if (e.data === 0 && idx + 1 < links.length) { play(idx + 1); }
        },
        /* A clip that has been taken down or cannot play here: move on to the next one. */
        onError: function () {
          if (idx + 1 < links.length) { play(idx + 1); }
        }
      }
    });
  }

  function play(i) {
    idx = i;
    mark(i);
    var a = links[i], v = a.getAttribute('data-v'), s = secs(a, 'data-s');
    watch(v, secs(a, 'data-e'));
    if (player && ready) { player.loadVideoById({ videoId: v, startSeconds: s }); return; }
    if (player || box.getAttribute('data-dr') === 'loading') { pending = i; return; }
    box.setAttribute('data-dr', 'loading');
    if (window.YT && window.YT.Player) { build(v, s); return; }
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof prev === 'function') { prev(); }
      var cur = links[pending !== null ? pending : idx];
      pending = null;
      build(cur.getAttribute('data-v'), secs(cur, 'data-s'));
    };
    var sc = document.createElement('script');
    sc.src = 'https://www.youtube.com/iframe_api';
    sc.onerror = function () { location.href = a.href; };
    document.head.appendChild(sc);
  }

  if (start) { start.addEventListener('click', function (e) { e.preventDefault(); play(0); }); }
  links.forEach(function (a, i) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) { return; }
      e.preventDefault();
      play(i);
      var r = frame.getBoundingClientRect();
      if (r.top < 0 || r.bottom > (window.innerHeight || 0)) {
        var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        frame.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'center' });
      }
    });
  });
})();

/* Credits ([data-yt-pop]): a cover or a title opens its video in a window over the page.
   Nothing loads from YouTube until it is pressed. Escape, Close or a press outside the picture
   closes the window and stops the video. Without JavaScript, or with a new-tab click, the link
   opens the video on YouTube. Adding ?quiet to the address starts it muted. */
(function () {
  var links = document.querySelectorAll('[data-yt-pop]');
  if (!links.length || typeof HTMLDialogElement !== 'function') { return; }
  var dlg = null, frame = null, cap = null, opener = null;
  function build() {
    dlg = document.createElement('dialog');
    dlg.className = 'ytpop';
    dlg.innerHTML = '<div class="ytpop-in"><div class="ytpop-frame"></div>' +
      '<div class="ytpop-bar"><p class="ytpop-cap"></p><button type="button" class="ytpop-x">Close</button></div></div>';
    document.body.appendChild(dlg);
    frame = dlg.querySelector('.ytpop-frame');
    cap = dlg.querySelector('.ytpop-cap');
    dlg.querySelector('.ytpop-x').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) { dlg.close(); } });
    dlg.addEventListener('close', function () {
      frame.innerHTML = '';
      if (opener) { opener.focus(); }
    });
  }
  [].forEach.call(links, function (a) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0) { return; }
      e.preventDefault();
      if (!dlg) { build(); }
      opener = a;
      var q = '?autoplay=1&rel=0&playsinline=1';
      if (a.getAttribute('data-start')) { q += '&start=' + a.getAttribute('data-start'); }
      if (a.getAttribute('data-end')) { q += '&end=' + a.getAttribute('data-end'); }
      if (/[?&]quiet\b/.test(location.search)) { q += '&mute=1'; }
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + a.getAttribute('data-yt-pop') + q;
      f.title = a.getAttribute('data-yt-title') || 'Video';
      f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
      f.setAttribute('allowfullscreen', '');
      frame.innerHTML = '';
      frame.appendChild(f);
      cap.textContent = a.getAttribute('data-cap') || '';
      dlg.showModal();
    });
  });
})();

/* Driven to Greatness on the Singapore page (25 Nov 2026).
   Ande's own clip ([data-clip]): nothing loads until the visitor presses play, and that one press
   starts it with the sound on. Adding ?quiet to the address starts it muted. Starting a YouTube
   video on the page stops it.
   The coming-soon card ([data-soon]): its button runs the five start lights, one by one, then out. */
(function () {
  var box = document.querySelector('[data-clip]');
  var v = box && box.querySelector('video'), b = box && box.querySelector('.dtg-play');
  if (v && b) {
    b.addEventListener('click', function () {
      v.muted = /[?&]quiet\b/.test(location.search);
      v.controls = true;
      box.classList.add('playing');
      var p = v.play();
      if (p && p.catch) { p.catch(function () { v.controls = false; box.classList.remove('playing'); }); }
    });
    v.addEventListener('ended', function () {
      v.controls = false;
      box.classList.remove('playing');
      var s = b.querySelector('span');
      if (s) { s.textContent = 'Play again'; }
      v.load();
    });
    document.addEventListener('click', function (e) {
      if (!v.paused && e.target.closest && e.target.closest('.reel-start, [data-yt-pop]')) { v.pause(); }
    });
  }
  var btn = document.querySelector('[data-lights]');
  if (!btn) { return; }
  var card = btn.closest('[data-soon]') || btn.parentNode;
  var bulbs = [].slice.call(card.querySelectorAll('.dtg-bulbs i'));
  var lab = btn.querySelector('.dtg-lab'), say = card.querySelector('.dtg-say');
  var label = lab ? lab.textContent : '', busy = false;
  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function out() {
    bulbs.forEach(function (i) { i.classList.remove('on'); });
    if (lab) { lab.textContent = 'Still on the grid!'; }
    if (say) { say.textContent = 'Not out yet. The link goes here as soon as the episode is public.'; }
    setTimeout(function () {
      if (lab) { lab.textContent = label; }
      if (say) { say.textContent = ''; }
      busy = false;
    }, 2600);
  }
  btn.addEventListener('click', function () {
    if (busy) { return; }
    busy = true;
    if (calm) { out(); return; }
    bulbs.forEach(function (i, k) { setTimeout(function () { i.classList.add('on'); }, 360 * (k + 1)); });
    setTimeout(out, 360 * bulbs.length + 800);
  });
})();
