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

/* Home hero: the showreel starts silently when it comes into view, looping; Wistia's
   own button turns the sound on. Visitors who prefer reduced motion or save data get
   the player without autoplay. Without JavaScript the link opens the reel.
   data-reel-start (seconds) skips the reel's opening title card: the reel starts there,
   loops back to there, and cannot be scrubbed to before it. Remove the attribute once
   the card has been trimmed off the video itself in Wistia. */
(function () {
  var box = document.querySelector('.hero-reel[data-reel]');
  if (!box) { return; }
  var frame = box.querySelector('.reel');
  var quiet = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
    (navigator.connection && navigator.connection.saveData);
  var done = false;
  function add() {
    if (done) { return; }
    done = true;
    var id = box.getAttribute('data-reel');
    var start = parseFloat(box.getAttribute('data-reel-start')) || 0;
    var f = document.createElement('iframe');
    f.src = 'https://fast.wistia.net/embed/iframe/' + id + '?videoFoam=true' +
      (start ? '&time=' + start : '') +
      (quiet ? '' : '&autoPlay=true&muted=true&silentAutoPlay=allow&endVideoBehavior=loop');
    f.title = 'Ande Schurr · Showreel';
    f.setAttribute('allow', 'autoplay; fullscreen');
    f.setAttribute('allowfullscreen', '');
    if (start) { f.className = 'wistia_embed'; f.name = 'wistia_embed'; }
    frame.innerHTML = '';
    frame.appendChild(f);
    if (start) {
      /* Wistia's player API for iframes: keep the playhead at or after the start point. */
      window._wq = window._wq || [];
      window._wq.push({ id: id, onReady: function (v) {
        var skip = function (t) { if (t < start - 0.4) { v.time(start); } };
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
   Without JavaScript the link opens the trailer on YouTube. */
(function () {
  [].forEach.call(document.querySelectorAll('[data-yt]'), function (box) {
    var a = box.querySelector('.reel-start'), frame = box.querySelector('.reel');
    if (!a || !frame) { return; }
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + box.getAttribute('data-yt') + '?autoplay=1&rel=0';
      f.title = box.getAttribute('data-yt-title') || 'Official trailer';
      f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
      f.setAttribute('allowfullscreen', '');
      frame.innerHTML = '';
      frame.appendChild(f);
    });
  });
})();

/* Documentary reel ([data-dr]): official clips played one after another in one frame.
   Nothing loads from YouTube until the visitor presses play; the first press also fetches
   YouTube's player script, which is what tells the page a clip has ended. Without JavaScript
   each line opens its clip on YouTube. Adding ?quiet to the address starts it muted. */
(function () {
  var box = document.querySelector('[data-dr]');
  if (!box) { return; }
  var frame = box.querySelector('.reel'), start = box.querySelector('.reel-start');
  var links = [].slice.call(box.querySelectorAll('.dr-list a[data-v]'));
  if (!frame || !links.length) { return; }
  var player = null, ready = false, idx = 0, pending = null;
  var quiet = /[?&]quiet\b/.test(location.search);

  function mark(i) {
    links.forEach(function (a, k) {
      if (k === i) { a.setAttribute('aria-current', 'true'); } else { a.removeAttribute('aria-current'); }
    });
  }

  function build(v, s) {
    var holder = document.createElement('div');
    frame.innerHTML = '';
    frame.appendChild(holder);
    player = new window.YT.Player(holder, {
      host: 'https://www.youtube-nocookie.com',
      videoId: v, width: '100%', height: '100%',
      playerVars: { autoplay: 1, rel: 0, playsinline: 1, start: s, mute: quiet ? 1 : 0 },
      events: {
        onReady: function (e) {
          ready = true;
          var f = e.target.getIframe && e.target.getIframe();
          if (f) { f.title = 'Documentary reel'; }
          if (pending !== null) { var p = pending; pending = null; play(p); }
        },
        onStateChange: function (e) {
          if (e.data === 0 && idx + 1 < links.length) { play(idx + 1); }
        }
      }
    });
  }

  function play(i) {
    idx = i;
    mark(i);
    var a = links[i], v = a.getAttribute('data-v'), s = parseInt(a.getAttribute('data-s'), 10) || 0;
    if (player && ready) { player.loadVideoById({ videoId: v, startSeconds: s }); return; }
    if (player || box.getAttribute('data-dr') === 'loading') { pending = i; return; }
    box.setAttribute('data-dr', 'loading');
    if (window.YT && window.YT.Player) { build(v, s); return; }
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof prev === 'function') { prev(); }
      var cur = links[pending !== null ? pending : idx];
      pending = null;
      build(cur.getAttribute('data-v'), parseInt(cur.getAttribute('data-s'), 10) || 0);
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
