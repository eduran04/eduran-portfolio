const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const nav = document.getElementById('nav');
const navMenuBtn = document.getElementById('navMenuBtn');
const navPanel = document.getElementById('navPanel');
const navLinks = document.getElementById('navLinks');
const navBackdrop = document.getElementById('navBackdrop');
const mqMobile = window.matchMedia('(max-width: 900px)');

const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const stored = (() => {
  try {
    return localStorage.getItem('theme');
  } catch (e) {
    return null;
  }
})();
const initial = stored || (systemDark ? 'dark' : 'light');
root.setAttribute('data-theme', initial);

toggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try {
    localStorage.setItem('theme', next);
  } catch (e) {}
});

/** Dialog semantics only while the drawer is open on small viewports (avoids role on desktop). */
function syncMobileNavDialogAttrs(open) {
  if (!navPanel || !mqMobile.matches) {
    if (navPanel) {
      navPanel.removeAttribute('role');
      navPanel.removeAttribute('aria-modal');
      navPanel.removeAttribute('aria-labelledby');
    }
    return;
  }
  if (open) {
    navPanel.setAttribute('role', 'dialog');
    navPanel.setAttribute('aria-modal', 'true');
    navPanel.setAttribute('aria-labelledby', 'navDrawerHeading');
  } else {
    navPanel.removeAttribute('role');
    navPanel.removeAttribute('aria-modal');
    navPanel.removeAttribute('aria-labelledby');
  }
}

function closeNav(focusMenuButton) {
  if (!nav.classList.contains('nav-open')) return;
  nav.classList.remove('nav-open');
  navMenuBtn.setAttribute('aria-expanded', 'false');
  navMenuBtn.setAttribute('aria-label', 'Open menu');
  navBackdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (mqMobile.matches && navPanel) navPanel.setAttribute('inert', '');
  syncMobileNavDialogAttrs(false);
  toggle.removeAttribute('tabindex');
  if (focusMenuButton !== false) navMenuBtn.focus();
}

function openNav() {
  nav.classList.add('nav-open');
  navMenuBtn.setAttribute('aria-expanded', 'true');
  navMenuBtn.setAttribute('aria-label', 'Close menu');
  navBackdrop.setAttribute('aria-hidden', 'false');
  if (navPanel) navPanel.removeAttribute('inert');
  syncMobileNavDialogAttrs(true);
  document.body.style.overflow = 'hidden';
  toggle.setAttribute('tabindex', '-1');
  const first = navLinks.querySelector('a');
  if (first) requestAnimationFrame(() => first.focus());
}

function setNavInertForViewport() {
  if (!mqMobile.matches) {
    if (navPanel) navPanel.removeAttribute('inert');
    syncMobileNavDialogAttrs(false);
    closeNav(false);
  } else if (!nav.classList.contains('nav-open') && navPanel) {
    navPanel.setAttribute('inert', '');
    syncMobileNavDialogAttrs(false);
  }
}

navMenuBtn.addEventListener('click', () => {
  if (nav.classList.contains('nav-open')) closeNav();
  else openNav();
});

navBackdrop.addEventListener('click', () => closeNav());

navLinks.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    if (mqMobile.matches) closeNav(false);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
    e.preventDefault();
    closeNav();
  }
});

const panelLinks = () => Array.from(navLinks.querySelectorAll('a'));

navLinks.addEventListener('keydown', (e) => {
  if (!nav.classList.contains('nav-open') || e.key !== 'Tab' || !mqMobile.matches) return;
  const links = panelLinks();
  if (links.length === 0) return;
  const first = links[0];
  const last = links[links.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    navMenuBtn.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    navMenuBtn.focus();
  }
});

navMenuBtn.addEventListener('keydown', (e) => {
  if (!nav.classList.contains('nav-open') || e.key !== 'Tab' || e.shiftKey || !mqMobile.matches) return;
  e.preventDefault();
  const links = panelLinks();
  if (links[0]) links[0].focus();
});

mqMobile.addEventListener('change', setNavInertForViewport);
setNavInertForViewport();

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Anime.js v4 UMD exposes `animate`, `stagger`, etc. on the global `anime` object. */
function getAnime() {
  const g = typeof globalThis.anime !== 'undefined' ? globalThis.anime : null;
  if (!g || typeof g.animate !== 'function' || typeof g.stagger !== 'function') return null;
  return g;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => {
  if (motionOk) observer.observe(el);
  else el.classList.add('visible');
});

/**
 * Hero title - Moving Letters-style stagger (inspired by Tobias Ahlin, MIT)
 * https://tobiasahlin.com/moving-letters/
 */
function initHeroMovingLetters() {
  const h1 = document.getElementById('heroTitle');
  const A = getAnime();
  if (!h1 || !motionOk || !A) return;

  const line1 = 'Elizandro';
  const line2 = 'Duran.';

  const wrapLine = (text, useEm) => {
    const frag = document.createDocumentFragment();
    for (const ch of text) {
      const span = document.createElement('span');
      span.className = 'ml-letter';
      span.textContent = ch;
      frag.appendChild(span);
    }
    if (useEm) {
      const em = document.createElement('em');
      em.appendChild(frag);
      return em;
    }
    return frag;
  };

  const wrap = document.createElement('span');
  wrap.className = 'hero-title-visual';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.appendChild(wrapLine(line1, false));
  wrap.appendChild(document.createElement('br'));
  wrap.appendChild(wrapLine(line2, true));

  h1.replaceChildren(wrap);

  const letters = wrap.querySelectorAll('.ml-letter');
  A.animate(letters, {
    opacity: [0, 1],
    translateY: ['0.28em', 0],
    duration: 2250,
    ease: 'outExpo',
    delay: A.stagger(62, { from: 'first' })
  });
}

initHeroMovingLetters();

/**
 * Stagger tag/skill pills when their row or card scrolls into view (once).
 */
function initStaggerPills() {
  const A = getAnime();
  if (!motionOk || !A) return;

  document.documentElement.classList.add('anime-stagger-ready');

  const done = new WeakSet();

  const runStagger = (tags) => {
    const spans = tags.querySelectorAll(':scope > span');
    if (spans.length === 0) return;
    A.animate(spans, {
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 520,
      ease: 'out(3)',
      delay: A.stagger(42, { from: 'first' })
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting || done.has(e.target)) return;
        const row = e.target;
        const pillRoot = row.classList.contains('skill-list')
          ? row
          : row.querySelector('.featured-tags');
        if (!pillRoot) return;
        done.add(row);
        runStagger(pillRoot);
        io.unobserve(row);
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.featured-item.reveal').forEach((el) => {
    el.classList.add('anime-stagger-host');
    io.observe(el);
  });
  document.querySelectorAll('.skills-grid .skill-list').forEach((el) => {
    el.classList.add('anime-stagger-host');
    io.observe(el);
  });
}

initStaggerPills();

/** Replace CSS keyframe pulse on the hero scroll cue when motion is allowed. */
function initScrollCuePulse() {
  const A = getAnime();
  const line = document.querySelector('.scroll-cue .line');
  if (!motionOk || !A || !line) return;

  document.documentElement.classList.add('scroll-cue-anime');
  A.animate(line, {
    scaleX: [0.5, 1],
    opacity: [0.4, 1],
    duration: 1200,
    ease: 'inOut(2)',
    loop: true,
    alternate: true
  });
}

initScrollCuePulse();
