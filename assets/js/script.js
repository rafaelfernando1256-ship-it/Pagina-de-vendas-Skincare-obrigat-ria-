document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('nav--open');
      navToggle.classList.toggle('nav-toggle--active');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('nav--open'));
    });
  }

  // Header shrink on scroll
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // Offer countdown timer — resets to a fresh 4h window per visit,
  // purely as a visual urgency cue (no fake claims about a global deadline).
  const hoursEl = document.getElementById('tHours');
  const minutesEl = document.getElementById('tMinutes');
  const secondsEl = document.getElementById('tSeconds');

  if (hoursEl && minutesEl && secondsEl) {
    const DURATION_MS = 4 * 60 * 60 * 1000;
    const STORAGE_KEY = 'skincareOfferDeadline';

    let deadline = Number(sessionStorage.getItem(STORAGE_KEY));
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + DURATION_MS;
      sessionStorage.setItem(STORAGE_KEY, String(deadline));
    }

    const pad = n => String(n).padStart(2, '0');

    const tick = () => {
      const remaining = Math.max(0, deadline - Date.now());
      const h = Math.floor(remaining / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      hoursEl.textContent = pad(h);
      minutesEl.textContent = pad(m);
      secondsEl.textContent = pad(s);
      if (remaining <= 0) {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    };

    tick();
    setInterval(tick, 1000);
  }

  // Sticky mobile CTA — hide once the offer section is in view
  const stickyCta = document.getElementById('stickyCta');
  const offerSection = document.getElementById('oferta');
  if (stickyCta && offerSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        stickyCta.style.transform = entry.isIntersecting ? 'translateY(120%)' : 'translateY(0)';
      }),
      { threshold: 0.15 }
    );
    observer.observe(offerSection);
  }

});
