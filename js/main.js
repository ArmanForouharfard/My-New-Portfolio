// ─── NAV ────────────────────────────────────────────────────────
const burger = document.querySelector('.nav-burger');
const mobileNav = document.querySelector('.nav-mobile');
if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ─── SCROLL FADE ────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ─── CURSOR DOT ─────────────────────────────────────────────────
const dot = document.querySelector('.cursor-dot');
if (dot && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
  });
} else if (dot) {
  dot.style.display = 'none';
}

// ─── TYPEWRITER (hero only) ──────────────────────────────────────
const typeEl = document.querySelector('[data-type]');
if (typeEl) {
  const words = JSON.parse(typeEl.dataset.type);
  let wIdx = 0, cIdx = 0, deleting = false;
  function type() {
    const word = words[wIdx];
    if (!deleting) {
      typeEl.textContent = word.slice(0, ++cIdx);
      if (cIdx === word.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      typeEl.textContent = word.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; }
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  type();
}
