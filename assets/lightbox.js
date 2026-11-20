/* Pictures open full screen, one after another.
   Every content picture on the page joins the set: the largest copy listed for it is shown
   (data-full, else the biggest in srcset, else the file itself), never scaled up past its own size.
   Left out: pictures inside a link or a button, logos, icons, and any <img data-nolb>.
   A picture that sits behind a page title (class cr-bg) gets a small "Photo" button instead of a click.
   Keys: left and right arrows, Escape. Touch: swipe. Without this script the pictures simply stay as they are. */
(function () {
  function wide(im) { return parseInt(im.getAttribute('width'), 10) || im.naturalWidth || 0; }
  var imgs = [].slice.call(document.querySelectorAll('img')).filter(function (im) {
    if (im.hasAttribute('data-nolb') || im.closest('a, button, nav, footer, .lb')) return false;
    if (im.hasAttribute('data-full')) return true;
    var src = im.getAttribute('src') || '';
    if (/\.svg($|\?)/i.test(src) || /logo|icon/i.test(src + ' ' + im.className)) return false;
    return wide(im) >= 400;
  });
  if (!imgs.length) return;
  var box, pic, cap, num, idx = 0, last = null, x0 = null;

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }

  function full(im) {
    var f = im.getAttribute('data-full'); if (f) return f;
    var best = '', bw = 0;
    (im.getAttribute('srcset') || '').split(',').forEach(function (p) {
      p = p.trim().split(/\s+/); var w = parseInt(p[1], 10) || 0;
      if (p[0] && w > bw) { bw = w; best = p[0]; }
    });
    return best || im.getAttribute('src');
  }

  function caption(im) {
    var c = im.getAttribute('data-cap'); if (c !== null) return c;
    var fig = im.closest('figure'), fc = fig && fig.querySelector('figcaption');
    if (!fc) { var sec = im.closest('section, header'); fc = sec && sec.querySelector('.hx-cap'); }
    return fc ? fc.textContent.replace(/\s+/g, ' ').trim() : '';
  }

  function build() {
    box = el('div', 'lb');
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', 'Pictures'); box.hidden = true;
    var top = el('div', 'lb-top');
    num = el('span', 'lb-n');
    var x = el('button', 'lb-x', 'Close'); x.type = 'button';
    top.appendChild(num); top.appendChild(x);
    var stage = el('div', 'lb-stage');
    pic = el('img'); pic.alt = '';
    stage.appendChild(pic);
    var chev = '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M9 4l8 8-8 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var prev = el('button', 'lb-prev', chev); prev.type = 'button'; prev.setAttribute('aria-label', 'Previous picture');
    var next = el('button', 'lb-next', chev); next.type = 'button'; next.setAttribute('aria-label', 'Next picture');
    if (imgs.length < 2) { prev.hidden = true; next.hidden = true; }
    cap = el('p', 'lb-cap'); cap.setAttribute('aria-live', 'polite');
    box.appendChild(top); box.appendChild(stage); box.appendChild(prev); box.appendChild(next); box.appendChild(cap);
    document.body.appendChild(box);

    x.addEventListener('click', close);
    prev.addEventListener('click', function () { show(idx - 1); });
    next.addEventListener('click', function () { show(idx + 1); });
    stage.addEventListener('click', function (e) { if (e.target === stage) close(); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); }
      else if (e.key === 'ArrowLeft') { show(idx - 1); }
      else if (e.key === 'ArrowRight') { show(idx + 1); }
      else if (e.key === 'Tab') {
        var f = imgs.length < 2 ? [x] : [x, prev, next], i = f.indexOf(document.activeElement);
        e.preventDefault(); f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
      }
    });
    stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40 && imgs.length > 1) show(idx + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  function load(i) { var im = new Image(); im.src = full(imgs[(i + imgs.length) % imgs.length]); return im; }

  function show(i) {
    idx = (i + imgs.length) % imgs.length;
    var src = imgs[idx], want = idx;
    pic.src = src.currentSrc || src.src;                 /* the copy already on the page, at once */
    pic.alt = src.alt || '';
    var big = load(idx);
    big.onload = function () { if (want === idx) pic.src = big.src; };
    cap.textContent = caption(src);
    num.textContent = imgs.length > 1 ? (idx + 1) + ' of ' + imgs.length : '';
    if (imgs.length > 1) { load(idx + 1); load(idx - 1); }
  }

  function open(i) {
    if (!box) build();
    last = document.activeElement;
    box.hidden = false; document.documentElement.classList.add('lb-on');
    show(i); box.querySelector('.lb-x').focus();
  }

  function close() {
    box.hidden = true; document.documentElement.classList.remove('lb-on');
    if (last && last.focus) last.focus();
  }

  imgs.forEach(function (im, i) {
    if (im.classList.contains('cr-bg')) {              /* behind a title: a button, not the picture itself */
      var b = el('button', 'lb-open', '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Photo</span>');
      b.type = 'button'; b.setAttribute('aria-label', 'Open the photograph full screen');
      im.parentNode.appendChild(b);
      b.addEventListener('click', function () { open(i); });
      return;
    }
    im.setAttribute('data-lb', '');
    im.setAttribute('role', 'button'); im.setAttribute('tabindex', '0');
    im.setAttribute('aria-label', (im.alt ? im.alt + '. ' : '') + 'Open full screen');
    im.addEventListener('click', function () { open(i); });
    im.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
  });
})();
