// Minimal nav toggle for mobile
(function () {
  const btn = document.querySelector('.nav-toggle');
  const list = document.querySelector('.nav-list');
  if (!btn || !list) return;
  btn.addEventListener('click', function () {
    const open = list.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();
