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
