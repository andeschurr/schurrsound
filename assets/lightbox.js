/* Pictures open full screen, one after another. Any <img data-full="..."> on the page joins the set.
   Keys: left and right arrows, Escape. Touch: swipe. Without this script the pictures simply stay as they are. */
(function () {
  var imgs = [].slice.call(document.querySelectorAll('img[data-full]'));
  if (!imgs.length) return;
  var box, pic, cap, num, idx = 0, last = null, x0 = null;

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }

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
        var f = [x, prev, next], i = f.indexOf(document.activeElement);
        e.preventDefault(); f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
      }
    });
    stage.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  function load(i) { var im = new Image(); im.src = imgs[(i + imgs.length) % imgs.length].getAttribute('data-full'); return im; }

  function show(i) {
    idx = (i + imgs.length) % imgs.length;
    var src = imgs[idx], want = idx;
    pic.src = src.currentSrc || src.src;                 /* the copy already on the page, at once */
    pic.alt = src.alt || '';
    var big = load(idx);
    big.onload = function () { if (want === idx) pic.src = big.src; };
    cap.textContent = src.getAttribute('data-cap') || '';
    num.textContent = (idx + 1) + ' of ' + imgs.length;
    load(idx + 1); load(idx - 1);
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
    im.setAttribute('role', 'button'); im.setAttribute('tabindex', '0');
    im.setAttribute('aria-label', (im.alt ? im.alt + '. ' : '') + 'Open full screen');
    im.addEventListener('click', function () { open(i); });
    im.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
  });
})();
