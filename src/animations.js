/* Motion (Framer Motion vanilla engine) — entrance, scroll, and gesture system.
   Principles: transform/opacity only, spring gestures, staggered reveals,
   full prefers-reduced-motion opt-out. */
import { animate, inView, scroll, stagger } from 'motion';

const EASE = [0.22, 1, 0.36, 1];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const clearTransforms = els => els.forEach(el => { el.style.transform = ''; });

function reveal(selector, { y = 24, x = 0, scale = 1, per = 0.09, dur = 0.7, amount = 0.25, clear = false } = {}) {
  const els = Array.from(document.querySelectorAll(selector));
  if (!els.length) return;
  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = `translate(${x}px, ${y}px)` + (scale !== 1 ? ` scale(${scale})` : '');
  });
  const io = inView(els[0].closest('section, footer, .prefooter') || els[0], () => {
    const controls = animate(els,
      { opacity: 1, y: 0, x: 0, ...(scale !== 1 ? { scale: 1 } : {}) },
      { duration: dur, ease: EASE, delay: stagger(per) });
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

export function initAnimations() {
  if (reduced) return; // everything stays visible and static

  /* ---- load sequence: header + hero (the page's one authored moment) ---- */
  animate('.header-logo', { opacity: [0, 1], y: [-6, 0] }, { duration: 0.6, ease: EASE, delay: 0.1 });
  animate('.header-nav a', { opacity: [0, 1], y: [-8, 0] }, { duration: 0.5, ease: EASE, delay: stagger(0.06, { startDelay: 0.2 }) });
  animate('.hero-copy > *', { opacity: [0, 1], y: [22, 0] }, { duration: 0.85, ease: EASE, delay: stagger(0.11, { startDelay: 0.3 }) });
  const portrait0 = document.querySelector('.hero-portrait');
  if (portrait0) animate(portrait0, { opacity: [0, getComputedStyle(portrait0).opacity], x: [30, 0], scale: [1.03, 1] }, { duration: 1.5, ease: EASE, delay: 0.4 });

  /* ---- reading progress (teal hairline, top) ---- */
  const bar = document.querySelector('.scroll-progress');
  if (bar) scroll(animate(bar, { scaleX: [0, 1] }, { ease: 'linear' }));

  /* ---- scroll-linked: hero portrait drift + bio portrait counter-drift ---- */
  const hero = document.querySelector('.hero');
  if (hero) {
    scroll(animate('.hero-portrait', { y: [0, 70] }, { ease: 'linear' }),
      { target: hero, offset: ['start start', 'end start'] });
  }
  const bioP = document.querySelector('.bio .portrait');
  if (bioP) scroll(animate(bioP, { y: [24, -24] }, { ease: 'linear' }),
    { target: bioP, offset: ['start end', 'end start'] });


  /* ---- section reveals (staggered, once) ---- */
  reveal('.press-1 .sq-block', { per: 0.1 });
  reveal('.bio .col-6:first-child .sq-block, .bio .btn-wrap', { per: 0.12, x: 0, y: 26 });
  reveal('.press-2 .sq-block', { per: 0.1 });
  reveal('.procedures h2', { y: 16 });
  reveal('.care-row', { per: 0.07, y: 14, dur: 0.55, amount: 0.1, clear: true });
  reveal('.procedures > .sq-block:nth-of-type(3), .procedures .btn-wrap', { per: 0.12 });
  reveal('.office-intro .sq-block', { y: 22 });
  reveal('.office-video .player', { y: 0, scale: 0.985, dur: 0.8 });
  reveal('.strip .slide', { x: 28, y: 0, per: 0.06, dur: 0.6, clear: true });
  reveal('.contact .col-6:first-child .sq-block, .contact .btn-wrap', { per: 0.11 });
  reveal('.contact .map', { y: 28, dur: 0.8 });
  reveal('.booking-heading', { y: 14 });
  reveal('.book-card', { per: 0.1, y: 24, dur: 0.65, amount: 0.15, clear: true });
  reveal('.prefooter h2', { y: 16 });
  reveal('.grid-ig .tile', { per: 0.05, y: 16, scale: 0.95, dur: 0.55, amount: 0.08, clear: true });
  reveal('.social-row a', { per: 0.06, y: 10, dur: 0.45, clear: true });
  reveal('.footer-inner .site-line', { y: 12, dur: 0.6 });

  /* ---- gesture springs ---- */
  springGesture('.btn');
  springGesture('.nav-pill', { hoverScale: 1.045, hoverY: 0, tapScale: 0.96 });
  springGesture('.gal-arrow', { hoverScale: 1.08, hoverY: 0, tapScale: 0.92 });
  springGesture('.book-card', { hoverScale: 1.004, hoverY: -6, tapScale: 0.998 });

  /* ---- perpetual micro-loop: the play disc breathes ---- */
  const disc = document.querySelector('.play-overlay .disc');
  if (disc) animate(disc, { scale: [1, 1.07, 1] }, { duration: 2.6, repeat: Infinity, ease: 'easeInOut' });
}

/* Spring-driven strip slider (replaces CSS transition) */
export function slideStrip(strip, pct) {
  if (reduced) { strip.style.transform = `translateX(${pct}%)`; return; }
  strip.style.transition = 'none';
  animate(strip, { x: pct + '%' }, { type: 'spring', stiffness: 170, damping: 26 });
}
