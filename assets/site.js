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

/* Home hero: the showreel plays silently behind the copy, as on schurrproductions.tv.
   Added after the page has loaded, and not at all for visitors who prefer reduced
   motion or have data saving on. "Watch with sound" goes to the full reel. */
(function () {
  var bg = document.querySelector('.hero-bg[data-reel]');
  if (!bg) { return; }
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }
  var c = navigator.connection;
  if (c && c.saveData) { return; }
  function add() {
    var f = document.createElement('iframe');
    f.src = 'https://fast.wistia.net/embed/iframe/' + bg.getAttribute('data-reel') +
      '?autoPlay=true&muted=true&silentAutoPlay=allow&endVideoBehavior=loop&controlsVisibleOnLoad=false' +
      '&playbar=false&playButton=false&smallPlayButton=false&volumeControl=false&fullscreenButton=false' +
      '&settingsControl=false&qualityControl=false&copyLinkAndThumbnailEnabled=false&videoFoam=false&fitStrategy=cover';
    f.title = 'Showreel, playing silently';
    f.tabIndex = -1;
    f.setAttribute('allow', 'autoplay');
    f.setAttribute('aria-hidden', 'true');
    bg.appendChild(f);
  }
  if (document.readyState === 'complete') { add(); } else { window.addEventListener('load', add); }
})();
