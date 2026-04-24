// Loads /_partials/header.html and /_partials/footer.html into the page,
// then re-wires mobile nav, active nav state, and the footer year.
(async function () {
  async function inject(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) return;
      el.outerHTML = await res.text();
    } catch (_) { /* no-op */ }
  }

  await Promise.all([
    inject('site-header', '/julielichty-com/_partials/header.html'),
    inject('site-footer', '/julielichty-com/_partials/footer.html'),
  ]);

  // Active nav (matches pathname)
  const path = window.location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.nav-list a[data-path]').forEach(function (a) {
    if (a.dataset.path === path) a.setAttribute('aria-current', 'page');
  });

  // Mobile nav toggle
  const btn = document.querySelector('.nav-toggle');
  const list = document.querySelector('.nav-list');
  if (btn && list) {
    btn.addEventListener('click', function () {
      const open = list.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (n) {
    n.textContent = new Date().getFullYear();
  });

  // Testimonial slider (scroll-snap + dots)
  document.querySelectorAll('[data-slider]').forEach(function (slider) {
    const track = slider.querySelector('.testimonial-track');
    const slides = slider.querySelectorAll('.testimonial-slide');
    const dots = slider.querySelectorAll('.slider-dots .dot');
    const prev = slider.querySelector('.slider-prev');
    const next = slider.querySelector('.slider-next');
    if (!track) return;

    function goTo(i) {
      const clamped = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
    }
    function currentIndex() {
      return Math.round(track.scrollLeft / track.clientWidth);
    }
    prev && prev.addEventListener('click', function () { goTo(currentIndex() - 1); });
    next && next.addEventListener('click', function () { goTo(currentIndex() + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });
    track.addEventListener('scroll', function () {
      const i = currentIndex();
      dots.forEach(function (d, j) { d.classList.toggle('is-active', j === i); });
    });
  });
})();
