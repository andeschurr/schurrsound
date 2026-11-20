/* Schurr Sound, shared behaviour. See design-system.md.
   Publishes the real measured nav height as --nav-h so scroll-margin-top can
   keep in-page anchors clear of the sticky bar at every viewport width.
   When the bar is not sticky (phones, the map page) the offset drops to zero. */
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
