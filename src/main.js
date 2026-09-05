/* Behaviors — params from motion.json / final-probe.json (see ../specs) */
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { initAnimations, slideStrip } from './animations.js';
inject();
injectSpeedInsights();

/* ---- Hero: YouTube background with cover-math (spec 02) ---- */
function setupHero() {
  const mount = document.getElementById('heroVideo');
  if (!mount) return;
  const videoId = mount.dataset.videoId;
  const hero = mount.closest('.hero');

  // Original inline style @1440×1235: width 2195.56, inset 0 0 0 -377.78 → cover + center
  const cover = el => {
    const bw = hero.clientWidth, bh = hero.clientHeight;
    let w = bw, h = bw * 9 / 16;
    if (h < bh) { h = bh; w = bh * 16 / 9; }
    // slight overscan like Squarespace to hide YT edges
    Object.assign(el.style, {
      width: w + 'px', height: h + 'px',
      left: (bw - w) / 2 + 'px', top: (bh - h) / 2 + 'px',
    });
  };

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);

  window.onYouTubeIframeAPIReady = () => {
    const holder = document.createElement('div');
    mount.appendChild(holder);
    const player = new YT.Player(holder, {
      videoId,
      playerVars: {
        autoplay: 1, controls: 0, rel: 0, showinfo: 0, modestbranding: 1,
        playsinline: 1, loop: 1, playlist: videoId, iv_load_policy: 3, disablekb: 1,
      },
      events: {
        onReady: e => {
          e.target.mute();
          e.target.setPlaybackRate(1);
          e.target.playVideo();
          const iframe = e.target.getIframe();
          cover(iframe);
          window.addEventListener('resize', () => cover(iframe));
        },
        onStateChange: e => { if (e.data === YT.PlayerState.ENDED) e.target.playVideo(); },
      },
    });
  };
}

/* ---- Sidecar mobile nav (spec 01) ---- */
function setupSidecar() {
  const open = () => document.body.classList.add('sidecar-open');
  const close = () => document.body.classList.remove('sidecar-open');
  const tog = document.querySelector('.nav-toggle');
  if (tog) tog.addEventListener('click', open);
  const x = document.querySelector('.sidecar-close');
  if (x) x.addEventListener('click', close);
  const ov = document.querySelector('.body-overlay');
  if (ov) ov.addEventListener('click', close);
}

/* ---- Office strip slider: slide one tile per click, wraps (spec 10) ---- */
function setupGallery() {
  const wrap = document.querySelector('.office-gallery');
  if (!wrap) return;
  const strip = wrap.querySelector('.strip');
  const slides = strip.children.length;
  const visible = () => (window.innerWidth <= 767 ? 2 : 4);
  let i = 0;
  const apply = () => {
    const max = slides - visible();
    if (i < 0) i = max; if (i > max) i = 0; // wrap like the original
    slideStrip(strip, -(i * 100) / visible());
  };
  wrap.querySelector('.gal-arrow.prev').addEventListener('click', () => { i -= 1; apply(); });
  wrap.querySelector('.gal-arrow.next').addEventListener('click', () => { i += 1; apply(); });
  window.addEventListener('resize', apply);
}

/* ---- Native video: overlay play button (spec 09) ---- */
function setupVideo() {
  const sec = document.querySelector('.office-video');
  if (!sec) return;
  const video = sec.querySelector('video');
  const btn = sec.querySelector('.play-overlay');
  btn.addEventListener('click', () => {
    sec.classList.add('playing');
    video.controls = true;
    video.play();
  });
  video.addEventListener('ended', () => { sec.classList.remove('playing'); video.controls = false; });
}

/* ---- Squarespace-style image load fade (motion.json: IO-based loader) ---- */
function setupImageFade() {
  document.querySelectorAll('img.fx-img').forEach(img => {
    if (img.complete && img.naturalWidth) img.classList.add('loaded');
    else img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
    img.addEventListener('error', () => img.classList.add('loaded'), { once: true });
  });
}

setupHero();
setupSidecar();
setupGallery();
setupVideo();
setupImageFade();
initAnimations();
