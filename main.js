// Theme toggle (persisted) and project card flips. The initial theme is set by an inline script in <head>.
(() => {
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  const toggle = document.querySelector('.theme-toggle');

  const sync = () => {
    const light = root.classList.contains('light');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(light));
      toggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    }
    if (meta) meta.setAttribute('content', light ? '#eceef2' : '#0d0e12');
  };

  toggle?.addEventListener('click', () => {
    const light = root.classList.toggle('light');
    try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch { /* storage unavailable */ }
    sync();
  });
  sync();

  document.querySelectorAll('.flip').forEach((card) => {
    const front = card.querySelector('.flip-front');
    const back = card.querySelector('.flip-back');
    const openBtn = front.querySelector('.flip-btn');
    const closeBtn = back.querySelector('.flip-btn');
    back.inert = true;

    const flip = (show) => {
      card.classList.toggle('is-flipped', show);
      front.inert = show;
      back.inert = !show;
      openBtn.setAttribute('aria-expanded', String(show));
      (show ? closeBtn : openBtn).focus({ preventScroll: true });
    };

    openBtn.addEventListener('click', (e) => { e.stopPropagation(); flip(true); });
    closeBtn.addEventListener('click', () => flip(false));
    front.addEventListener('click', () => flip(true));
    back.addEventListener('click', (e) => { if (!e.target.closest('a, button')) flip(false); });
    card.addEventListener('keydown', (e) => { if (e.key === 'Escape' && card.classList.contains('is-flipped')) flip(false); });
  });
})();