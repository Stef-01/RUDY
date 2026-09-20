/* Motion (Framer Motion vanilla engine) — entrance, scroll, and gesture system.
   Principles: transform/opacity only, spring gestures, staggered reveals,
   full prefers-reduced-motion opt-out. */
import { animate, inView, scroll, stagger } from 'motion';

const EASE = [0.22, 1, 0.36, 1];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const clearTransforms = els => els.forEach(el => { el.style.transform = ''; });

function reveal(selector, { y = 40, x = 0, scale = 0.95, per = 0.1, dur = 0.9, amount = 0.2, clear = false } = {}) {
  const els = Array.from(document.querySelectorAll(selector));
  if (!els.length) return;
  els.forEach(el => {
    el.style.opacity = '0';
    // Let Framer Motion handle initial transform via the array syntax
  });
  const io = inView(els[0].closest('section, footer, .prefooter') || els[0], () => {
    const controls = animate(els,
      { opacity: [0, 1], y: [y, 0], x: [x, 0], scale: [scale, 1] },
      { duration: dur, ease: [0.16, 1, 0.3, 1], delay: stagger(per) });
    controls.finished?.then(() => { if (clear) clearTransforms(els); });
    io();
  }, { amount });
}

function springGesture(selector, { hoverScale = 1.02, hoverY = -1, tapScale = 0.97 } = {}) {
  document.querySelectorAll(selector).forEach(el => {
    const spring = { type: 'spring', stiffness: 350, damping: 22 };
    el.addEventListener('pointerenter', () => animate(el, { scale: hoverScale, y: hoverY }, spring));
    el.addEventListener('pointerleave', () => animate(el, { scale: 1, y: 0 }, spring));
    el.addEventListener('pointerdown', () => animate(el, { scale: tapScale }, { type: 'spring', stiffness: 500, damping: 28 }));
    el.addEventListener('pointerup', () => animate(el, { scale: hoverScale }, spring));
  });
}

function initHeroLogic() {
  const heroCopy = document.querySelector('.hero-copy');
  const heroScrim = document.querySelector('.hero-scrim');
  if (!heroCopy) return;

  // Set initial state
  heroCopy.style.opacity = 0;
  heroCopy.style.transform = 'translateY(20px)';
  let isVisible = false;

  const showHero = () => {
    if (isVisible) return;
    isVisible = true;
    if (heroScrim) animate(heroScrim, { opacity: 1 }, { duration: 1.2, ease: EASE });
    animate(heroCopy, { opacity: 1, y: 0 }, { duration: 1.2, ease: EASE });
    // Stagger the children elements nicely
    animate(Array.from(heroCopy.children), 
      { opacity: [0, 1], y: [20, 0], scale: [0.95, 1] }, 
      { duration: 1, ease: [0.16, 1, 0.3, 1], delay: stagger(0.15) }
    );
  };

  const hideHero = () => {
    if (!isVisible) return;
    isVisible = false;
    if (heroScrim) animate(heroScrim, { opacity: 0 }, { duration: 0.6, ease: EASE });
    animate(heroCopy, { opacity: 0, y: 20 }, { duration: 0.6, ease: EASE });
  };

  // 20-second cinematic wait
  let timer = setTimeout(() => {
    if (window.scrollY < 20) showHero();
  }, 20000);

  // Scroll triggers
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      showHero();
      if (timer) { clearTimeout(timer); timer = null; }
    } else {
      hideHero();
    }
  });
}

export function initAnimations() {
  if (reduced) return; // everything stays visible and static

  /* ---- load sequence: header ---- */
  animate('.header-logo', { opacity: [0, 1], y: [-10, 0] }, { duration: 0.8, ease: EASE, delay: 0.1 });
  animate('.header-nav a', { opacity: [0, 1], y: [-10, 0] }, { duration: 0.6, ease: EASE, delay: stagger(0.08, { startDelay: 0.2 }) });

  /* ---- interactive cinematic hero logic ---- */
  initHeroLogic();

  /* ---- reading progress (teal hairline, top) ---- */
  const bar = document.querySelector('.scroll-progress');
  if (bar) scroll(animate(bar, { scaleX: [0, 1] }, { ease: 'linear' }));

  /* ---- scroll-linked parallax: background video slowly scales/moves ---- */
  const video = document.querySelector('.video-container iframe');
  if (video) {
    scroll(animate(video, { y: [0, 150], scale: [1, 1.05] }, { ease: 'linear' }), { offset: ['start start', 'end start'] });
  }

  /* ---- scroll-linked parallax: bio portrait counter-drift ---- */
  const bioP = document.querySelector('.bio .portrait');
  if (bioP) scroll(animate(bioP, { y: [40, -40] }, { ease: 'linear' }), { target: bioP, offset: ['start end', 'end start'] });

  /* ---- section reveals (staggered, once) ---- */
  // Press rows
  reveal('.press-1 .sq-block', { per: 0.15, y: 30, scale: 0.95 });
  
  // Bio
  reveal('.bio .col-6:first-child .sq-block, .bio .btn-wrap', { per: 0.15, y: 40, scale: 0.98 });
  
  // Filmography Header
  reveal('.procedures h2', { y: 20, scale: 0.95 });
  
  // Filmography Rows (Beautiful Stagger sliding in from the left)
  reveal('.care-row', { per: 0.12, x: -30, y: 0, scale: 1, dur: 0.9, amount: 0.1, clear: true });
  
  // Contact
  reveal('.contact .col-6:first-child .sq-block, .contact .btn-wrap', { per: 0.15, y: 30, scale: 0.98 });
  reveal('.contact .contact-quote', { y: 20, scale: 0.9, dur: 1.2 });
  
  // Footer
  reveal('.prefooter h2', { y: 20 });
  reveal('.footer-inner .site-line', { y: 15, dur: 0.8 });

  /* ---- gesture springs ---- */
  springGesture('.btn', { hoverScale: 1.05, tapScale: 0.95 });
  springGesture('.nav-pill', { hoverScale: 1.045, hoverY: 0, tapScale: 0.96 });
}

/* Spring-driven strip slider (replaces CSS transition) */
export function slideStrip(strip, pct) {
  if (reduced) { strip.style.transform = `translateX(${pct}%)`; return; }
  strip.style.transition = 'none';
  animate(strip, { x: pct + '%' }, { type: 'spring', stiffness: 170, damping: 26 });
}
