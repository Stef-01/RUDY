import fs from 'fs';
const M = JSON.parse(fs.readFileSync('tools/assets-manifest.json', 'utf8'));
const IG = JSON.parse(fs.readFileSync('tools/ig-slides.json', 'utf8'));
const A = i => '/assets/' + M[i].local;

const BOOK = 'https://healthengine.com.au/medical-centre/nsw/double-bay/bay-health/s102998';
const PROFILE = 'https://www.adhdme.au/network/anubhav-saxena';
const NAV = [
  ['Bay Health', 'https://bayhealth.com.au/'],
  ['ADHD Me', 'https://www.adhdme.au/'],
  ['Beecroft Family Practice', 'https://beecroftfp.com.au/'],
  ['Services', '#areas'],
  ['Book Online', '#book'],
];
const ext = h => h.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
const navLinks = NAV.map(([t, h], i) => `<a href="${h}"${ext(h)}${i === NAV.length - 1 ? ' class="nav-pill"' : ''}>${t}</a>`).join('\n        ');

const quote = t => `<p class="press-quote">${t}</p>`;
const qA = quote('&ldquo;Medicine that looks at the whole person, not just the presenting problem.&rdquo;');
const qB = quote('&ldquo;Thorough, unhurried skin checks, with dermoscopy as standard.&rdquo;');
const qC = quote('&ldquo;ADHD care that starts with listening: assessment, clarity, and a plan.&rdquo;');
const qD = quote('&ldquo;Evidence-based integrative medicine: conventional care and lifestyle, working together.&rdquo;');

const bio = `<p style="white-space:pre-wrap;"><strong>Dr Anubhav Saxena</strong> is a Sydney general practitioner and the Director of <a href="https://bayhealth.com.au/" target="_blank" rel="noopener">Bay Health Clinic</a> in Double Bay. He completed his MBBS at the University of Sydney, alongside a Bachelor of Science (Advanced) and a Master of Philosophy in stroke research, and holds a Diploma in Child Health and Fellowship of the RACGP. An Honorary Associate Lecturer at Macquarie University, he has practised in communities across Sydney, from Seven Hills and Hoxton Park to Hornsby and Double Bay, and holds special interests in skin cancer medicine, integrative medicine and ADHD care. Away from the clinic, he donates his time to supporting the helpless Parramatta Eels.</p>`;

const sigH2 = `<h2 style="text-align:center;white-space:pre-wrap;">Areas of Care</h2>`;
const sigPara = `<p style="white-space:pre-wrap;"><strong>Bay Health Clinic&rsquo;s areas of care</strong> span comprehensive general practice for every age and stage: preventive health, chronic disease management, child and family medicine, and mental health support. Dr Saxena&rsquo;s special interests shape three dedicated streams: <a href="https://beecroftfp.com.au/" target="_blank" rel="noopener">skin cancer medicine</a> with full-body checks, dermoscopy and minor procedures; <a href="https://www.adhdme.au/" target="_blank" rel="noopener">ADHD assessment and ongoing care</a> for children and adults; and evidence-based <a href="https://bayhealth.com.au/" target="_blank" rel="noopener">integrative medicine</a> that pairs conventional treatment with nutrition, sleep and lifestyle. Appointments are long enough to ask questions, plans are made together, and follow-up is built in rather than bolted on.</p>`;

const office = `<h2 style="text-align:center;white-space:pre-wrap;">Bay Health Clinic, Double Bay</h2>
<p style="white-space:pre-wrap;"><strong>Welcome to Bay Health Clinic,</strong> the Double Bay practice directed by Dr Anubhav Saxena. Set in the heart of Sydney&rsquo;s eastern suburbs, the clinic pairs a calm, considered atmosphere with modern clinical facilities: a dedicated skin-check room with dermoscopy, treatment spaces for minor procedures, and consulting rooms designed for unhurried appointments. The team works alongside trusted allied health and specialist networks, so referrals stay seamless and care stays joined-up. Whether you&rsquo;re here for a same-day concern, a full skin check or a long-term plan, every visit is built around thorough, personal medicine.</p>`;

const contact = `<p style="white-space:pre-wrap;"><strong>Bay Health Clinic</strong><br>2 Cooper Street<br><em>Double Bay NSW 2028</em><br><em>Sydney, Eastern Suburbs</em><br>Australia</p>
<p style="white-space:pre-wrap;">Phone: (02) 9327 7200<br>Fax: (02) 9326 1878<br>Email: <a href="mailto:info@bayhealth.com.au">info@bayhealth.com.au</a></p>
`;
const disclaimer = `<p style="white-space:pre-wrap;"><em>Email is not monitored for urgent medical issues. In an emergency, call 000.</em></p>`;
const igHead = `<h2 style="text-align:center;white-space:pre-wrap;">Instagram &middot; @beecroftclinic</h2>`;

const ICONS = {
  ring: '<circle cx="32" cy="32" r="17" />',
  plus: '<path d="M32 15 V49 M15 32 H49" />',
  leaf: '<path d="M32 13 C20 25 20 39 32 51 C44 39 44 25 32 13 Z" />',
  dots: '<g>' + [-11,0,11].map(y => [-11,0,11].map(x => `<circle cx="${32+x}" cy="${32+y}" r="1.8" fill="currentColor" stroke="none"/>`).join('')).join('') + '</g>',
  diamond: '<rect x="19" y="19" width="26" height="26" transform="rotate(45 32 32)" />',
  arcs: '<path d="M17 38 Q32 15 47 38" /><path d="M21 44 Q32 27 43 44" opacity="0.45" />',
};
const icon = k => `<svg class="care-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6">${ICONS[k]}</svg>`;
const CARE = [
  ['Skin Cancer Medicine', 'Full-body checks &middot; dermoscopy', 'leaf', 'https://beecroftfp.com.au/'],
  ['ADHD Care', 'Assessment to follow-up', 'plus', 'https://www.adhdme.au/'],
  ['Integrative Medicine', 'Conventional care + lifestyle', 'ring', 'https://bayhealth.com.au/'],
  ['Child &amp; Family Health', 'DCH &middot; every age and stage', 'arcs', 'https://bayhealth.com.au/'],
  ['Preventive Health', 'Screening &middot; planning &middot; reviews', 'dots', 'https://bayhealth.com.au/'],
  ['Chronic Disease Care', 'Structured, measured follow-up', 'diamond', 'https://bayhealth.com.au/'],
];
const careCards = CARE.map(([t, sub, ic, href], i) => {
  const inner = `${icon(ic)}<span class="care-title">${t}</span><span class="care-sub">${sub}</span>`;
  return href
    ? `<a class="care-card care-p${i % 6}" href="${href}" target="_blank" rel="noopener">${inner}</a>`
    : `<div class="care-card care-p${i % 6}">${inner}</div>`;
}).join('\n          ');
const strip16 = M.slice(24, 40).map((e, i) => `<div class="slide"><img class="fx-img" src="${A(24 + i)}" alt="Clinic interior" loading="lazy"></div>`).join('\n            ');
const play = `<span class="play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>`;
const igTiles = Array.from({length: 12}, (_, i) =>
  `<a class="tile" href="https://www.instagram.com/beecroftclinic/" target="_blank" rel="noopener"><img class="fx-img" src="/assets/ph/ig-${String(i).padStart(2, '0')}.svg" alt="Instagram post placeholder" loading="lazy"></a>`).join('\n          ');
const socialDefs = [
  ['https://www.instagram.com/beecroftclinic/', 'instagram-unauth-icon', 'Instagram'],
  ['mailto:info@bayhealth.com.au', 'email-icon', 'Email'],
  ['https://www.facebook.com/beecroftclinic', 'facebook-unauth-icon', 'Facebook'],
  ['https://www.adhdme.au/', 'tiktok-unauth-icon', 'ADHD Me'],
];
const socialRow = socialDefs.map(([href, icon, label]) =>
  `<a href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''} aria-label="${label}"><svg viewBox="0 0 64 64"><use href="/assets/social-accounts.svg#${icon}"></use></svg></a>`).join('\n          ');

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dr Anubhav Saxena | Bay Health Clinic, Double Bay</title>
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400;1,700&family=Mulish:wght@400;600;700&family=Red+Hat+Display:wght@800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/styles/tokens.css">
  <link rel="stylesheet" href="/src/styles/base.css">
  <link rel="stylesheet" href="/src/styles/sections.css">
</head>
<body>
  <nav id="sidecarNav" aria-label="Mobile">
    <button class="sidecar-close" aria-label="Close menu">&#10005;</button>
    <ul class="sidecar-links">
      ${NAV.map(([t, h], i) => `<li><a href="${h}"${ext(h)}${i === NAV.length - 1 ? ' class="nav-pill"' : ''}>${t}</a></li>`).join('\n      ')}
    </ul>
  </nav>
  <div class="body-overlay"></div>
  <div id="siteWrapper">

    <header id="header">
      <div class="header-inner">
        <a class="header-logo logo-text" href="/"><span class="logo-min">Dr Saxena</span><span class="logo-dot"></span></a>
        <nav class="header-nav" aria-label="Main">
        ${navLinks}
        </nav>
        <button class="nav-toggle" aria-label="Open menu"><span></span><span></span><span></span></button>
      </div>
    </header>

    <section class="hero" aria-label="Introduction">
      <img class="hero-portrait" src="/assets/55-anubhav-hero.png" alt="" aria-hidden="true">
      <div class="hero-inner layout">
        <div class="hero-copy">
          <h1>Dr Anubhav<br>Saxena</h1>
          <p class="hero-creds">MBBS (Syd) &middot; FRACGP &middot; MPhil &middot; BSc (Adv) &middot; DCH</p>
          <p class="hero-line"><em>Considered, evidence-based general practice for the whole person, at Bay Health Clinic in Double Bay.</em></p>
          <a class="btn btn-large hero-cta" href="#book">Book an appointment</a>
        </div>
      </div>
    </section>

    <main id="content">
      <div class="layout">

        <section class="press-row press-1">
          <div class="row">
            <div class="col-3"><div class="sq-block"><div class="mark"><span class="mark-top">The University of</span><span class="mark-main">Sydney</span></div></div></div>
            <div class="col-3"><div class="sq-block">${qA}</div></div>
            <div class="col-3"><div class="sq-block"><div class="mark"><span class="mark-main">RACGP</span><span class="mark-sub">Fellowship</span></div></div></div>
            <div class="col-3"><div class="sq-block">${qB}</div></div>
          </div>
        </section>

        <div class="spacer"></div>

        <section class="bio">
          <div class="row">
            <div class="col-6">
              <div class="sq-block">${bio}</div>
            </div>
            <div class="col-6"><div class="sq-block"><img class="fx-img portrait" src="/assets/54-anubhav-saxena.png" alt="Dr Anubhav Saxena"></div></div>
          </div>
        </section>

        <div class="spacer"></div>

        <section class="press-row press-2">
          <div class="row">
            <div class="col-3"><div class="sq-block"><div class="mark"><span class="mark-top">Macquarie</span><span class="mark-main">University</span><span class="mark-sub" style="white-space:nowrap">Hon. Associate Lecturer</span></div></div></div>
            <div class="col-3"><div class="sq-block">${qC}</div></div>
            <div class="col-3"><div class="sq-block"><div class="mark"><span class="mark-main">MBBS &middot; MPhil</span><span class="mark-sub">BSc (Adv) &middot; DCH</span></div></div></div>
            <div class="col-3"><div class="sq-block">${qD}</div></div>
          </div>
        </section>

        <div class="sq-block"><hr></div>

        <section class="procedures" id="areas">
          <div class="sq-block">${sigH2}</div>
          <div class="sq-block"><div class="care-grid">
          ${careCards}
          </div></div>
          <div class="sq-block">${sigPara}</div>
          <div class="btn-wrap"><a class="btn btn-large" href="https://bayhealth.com.au/" target="_blank" rel="noopener">View All Services</a></div>
        </section>

        <div class="sq-block"><hr></div>

        <section class="office-intro">
          <div class="sq-block">${office}</div>
        </section>

        <div class="spacer"></div>

        <section class="office-video">
          <div class="sq-block">
            <div class="player">
              <video src="/assets/office-video.mp4" poster="${A(33)}" preload="metadata" playsinline></video>
              <button class="play-overlay" aria-label="Play video"><span class="disc"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></button>
            </div>
          </div>
        </section>

        <div class="spacer"></div>

        <section class="office-gallery-wrap">
          <div class="sq-block">
            <div class="office-gallery">
              <div class="strip">
              ${strip16}
              </div>
              <button class="gal-arrow prev" aria-label="Previous"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg></button>
              <button class="gal-arrow next" aria-label="Next"><svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg></button>
            </div>
          </div>
        </section>

        <div class="spacer"></div>

        <section class="contact">
          <div class="sq-block"><h2 style="text-align:center;white-space:pre-wrap;">Contact</h2></div>
          <div class="row">
            <div class="col-6">
              <div class="sq-block">${contact}</div>
              <div class="sq-block disclaimer">${disclaimer}</div>
            </div>
            <div class="col-6"><div class="sq-block map"><img src="/assets/53-map-capture.png" alt="Map placeholder — replace with Double Bay embed"></div></div>
          </div>
        </section>

        <section class="booking" id="book">
          <div class="sq-block"><h3 class="booking-heading">Book an appointment</h3></div>
          <div class="sq-block"><div class="book-grid">
            <div class="book-card">
              <span class="book-name">Bay Health Clinic</span>
              <span class="book-sub">Double Bay &middot; General practice</span>
              <span class="book-line">2 Cooper Street &middot; (02) 9327 7200</span>
              <a class="btn btn-book" href="${BOOK}" target="_blank" rel="noopener">Book &middot; Double Bay</a>
            </div>
            <div class="book-card">
              <span class="book-name">ADHD Me</span>
              <span class="book-sub">Telehealth &middot; ADHD assessment &amp; care</span>
              <span class="book-line">adhdme.au &middot; phone consultations</span>
              <a class="btn btn-book" href="${PROFILE}" target="_blank" rel="noopener">Book &middot; ADHD Me</a>
            </div>
            <div class="book-card">
              <span class="book-name">Beecroft Family Practice</span>
              <span class="book-sub">Beecroft &middot; Family &amp; skin cancer clinic</span>
              <span class="book-line">(02) 9484 4788</span>
              <a class="btn btn-book" href="https://beecroftfp.com.au/" target="_blank" rel="noopener">Book &middot; Beecroft</a>
            </div>
          </div></div>
        </section>

      </div>
    </main>

    <section class="prefooter" id="preFooter">
      <div class="layout">
        <div class="sq-block">${igHead}</div>
        <div class="sq-block"><div class="grid-ig">
          ${igTiles}
        </div></div>
        <div class="social-row">
          ${socialRow}
        </div>
      </div>
    </section>

    <footer id="footer">
      <div class="footer-inner">
        <p class="site-line"><span class="site-address">Bay Health Clinic &middot; 2&nbsp;Cooper&nbsp;Street, Double&nbsp;Bay&nbsp;NSW&nbsp;2028</span></p>
        <p class="site-line site-line-2"><a class="site-phone" href="tel:+61293277200">(02)&nbsp;9327&nbsp;7200</a><span class="sep">&middot;</span><a class="site-email" href="mailto:info@bayhealth.com.au">info@bayhealth.com.au</a></p>
      </div>
    </footer>
    <div class="footer-legal">
      <a href="#" rel="noopener">Privacy Policy</a>
      <a href="#" rel="noopener">Accessibility Statement</a>
    </div>

  </div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
`;
fs.writeFileSync('index.html', html);
console.log('saxena index.html generated:', html.length, 'bytes');
