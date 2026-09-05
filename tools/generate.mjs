import fs from 'fs';
const M = JSON.parse(fs.readFileSync('tools/assets-manifest.json', 'utf8'));
const IG = JSON.parse(fs.readFileSync('tools/ig-slides.json', 'utf8'));
const A = i => '/assets/' + M[i].local;

const BOOK = 'https://healthengine.com.au/medical-centre/nsw/double-bay/bay-health/s102998';
const PROFILE = 'https://www.adhdme.au/network/anubhav-saxena';
const NAV = [
  ['Meet Dr. Saxena', PROFILE],
  ['Services', '#areas'],
  ['Bay Health', 'https://bayhealth.com.au/'],
  ['ADHD Me', 'https://www.adhdme.au/'],
  ['Beecroft Family Practice', 'https://beecroftfp.com.au/'],
  ['Book Online', BOOK],
];
const ext = h => h.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
const navLinks = NAV.map(([t, h], i) => `<a href="${h}"${ext(h)}${i === NAV.length - 1 ? ' class="nav-pill"' : ''}>${t}</a>`).join('\n        ');

const quote = t => `<h3 style="text-align:center;white-space:pre-wrap;">${t}</h3>`;
const qA = quote('&ldquo;Medicine that looks at the whole person, not just the presenting problem.&rdquo; &mdash; Dr Anubhav Saxena');
const qB = quote('&ldquo;Thorough, unhurried skin checks &mdash; dermoscopy as standard.&rdquo;');
const qC = quote('&ldquo;ADHD care that starts with listening: assessment, clarity, and a plan.&rdquo;');
const qD = quote('&ldquo;Evidence-based integrative medicine &mdash; conventional care and lifestyle, working together.&rdquo;');

const h1Block = `<h1 style="text-align:center;white-space:pre-wrap;"><strong>Dr. Anubhav Saxena</strong></h1>`;
const tagline = `<p style="text-align:center;"><em>MBBS (Syd) &middot; FRACGP &middot; MPhil &middot; BSc (Adv) &middot; DCH &mdash; Director, Bay Health Clinic, Double Bay. Considered, evidence-based general practice for the whole person.</em></p>`;

const bio = `<p style="white-space:pre-wrap;"><strong>Dr Anubhav Saxena</strong> is a Sydney general practitioner and the Director of <a href="https://bayhealth.com.au/" target="_blank" rel="noopener">Bay Health Clinic</a> in Double Bay. He completed his MBBS at the University of Sydney, alongside a Bachelor of Science (Advanced) and a Master of Philosophy in stroke research, and holds a Diploma in Child Health and Fellowship of the RACGP. An Honorary Associate Lecturer at Macquarie University, he has practised in communities across Sydney &mdash; Seven Hills, Double Bay, Hoxton Park and Hornsby &mdash; and holds special interests in skin cancer medicine, integrative medicine and ADHD care. Away from the clinic, he donates his time to supporting the helpless Parramatta Eels. <strong>For an extended bio, click below.</strong></p>`;

const sigH2 = `<h2 style="text-align:center;white-space:pre-wrap;">Areas of Care</h2>`;
const sigPara = `<p style="white-space:pre-wrap;"><strong>Bay Health Clinic&rsquo;s areas of care</strong> span comprehensive general practice for every age and stage: preventive health, chronic disease management, child and family medicine, and mental health support. Dr Saxena&rsquo;s special interests shape three dedicated streams &mdash; <a href="https://beecroftfp.com.au/" target="_blank" rel="noopener">skin cancer medicine</a> with full-body checks, dermoscopy and minor procedures; <a href="https://www.adhdme.au/" target="_blank" rel="noopener">ADHD assessment and ongoing care</a> for children and adults; and evidence-based <a href="https://bayhealth.com.au/" target="_blank" rel="noopener">integrative medicine</a> that pairs conventional treatment with nutrition, sleep and lifestyle. Appointments are long enough to ask questions, plans are made together, and follow-up is built in rather than bolted on.</p>`;

const office = `<h2 style="text-align:center;white-space:pre-wrap;">Bay Health Clinic, Double Bay</h2>
<p style="white-space:pre-wrap;"><strong>Welcome to Bay Health Clinic,</strong> the Double Bay practice directed by Dr Anubhav Saxena. Set in the heart of Sydney&rsquo;s eastern suburbs, the clinic pairs a calm, considered atmosphere with modern clinical facilities: a dedicated skin-check room with dermoscopy, treatment spaces for minor procedures, and consulting rooms designed for unhurried appointments. The team works alongside trusted allied health and specialist networks, so referrals stay seamless and care stays joined-up. Whether you&rsquo;re here for a same-day concern, a full skin check or a long-term plan, every visit is built around thorough, personal medicine.</p>`;

const contact = `<h3 style="white-space:pre-wrap;">Contact</h3>
<p style="white-space:pre-wrap;"><strong>Bay Health Clinic</strong><br>2 Cooper Street<br><em>Double Bay NSW 2028</em><br><em>Sydney, Eastern Suburbs</em><br>Australia</p>
<p style="white-space:pre-wrap;">Phone: (02) 9327 7200<br>Fax: (02) 9326 1878<br>Email: <a href="mailto:info@bayhealth.com.au">info@bayhealth.com.au</a></p>
<p style="white-space:pre-wrap;">Dr Saxena also consults at:<br><a href="https://www.adhdme.au/" target="_blank" rel="noopener">ADHD Me &mdash; adhdme.au</a> (phone consultations available)<br><a href="https://beecroftfp.com.au/" target="_blank" rel="noopener">Beecroft Family &amp; Skin Cancer Clinic</a> &mdash; (02) 9484 4788</p>`;
const disclaimer = `<p style="white-space:pre-wrap;"><em>Email is not monitored for urgent medical issues. In an emergency, call 000.</em></p>`;
const igHead = `<h2 style="text-align:center;white-space:pre-wrap;">Instagram | @beecroftclinic</h2>`;

const grid18 = Array.from({length: 18}, (_, i) => `<img class="fx-img" src="/assets/ph/grid-${String(i).padStart(2, '0')}.svg" alt="Service imagery placeholder" loading="lazy">`).join('\n          ');
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
        <a class="header-logo logo-text" href="/"><span class="logo-top">Dr Anubhav</span><span class="logo-main">Saxena</span></a>
        <nav class="header-nav" aria-label="Main">
        ${navLinks}
        </nav>
        <button class="nav-toggle" aria-label="Open menu"><span></span><span></span><span></span></button>
      </div>
    </header>

    <section class="hero" aria-label="Featured video">
      <div class="video-bg" id="heroVideo" data-video-id="c_iQyAIzAgI"></div>
      <div class="color-overlay"></div>
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

        <section class="intro">
          <div class="sq-block">${h1Block}</div>
          <div class="row">
            <div class="col-3"></div>
            <div class="col-6"><div class="sq-block tagline">${tagline}</div></div>
            <div class="col-3"></div>
          </div>
        </section>

        <section class="bio">
          <div class="row">
            <div class="col-6">
              <div class="sq-block">${bio}</div>
              <div class="btn-wrap"><a class="btn btn-large" href="${PROFILE}" target="_blank" rel="noopener">Meet Dr. Saxena</a></div>
            </div>
            <div class="col-6"><div class="sq-block"><img class="fx-img portrait" src="/assets/54-anubhav-saxena.png" alt="Dr Anubhav Saxena"></div></div>
          </div>
        </section>

        <div class="spacer"></div>

        <section class="press-row press-2">
          <div class="row">
            <div class="col-3"><div class="sq-block"><div class="mark"><span class="mark-top">Macquarie</span><span class="mark-main">University</span><span class="mark-sub">Honorary Associate Lecturer</span></div></div></div>
            <div class="col-3"><div class="sq-block">${qC}</div></div>
            <div class="col-3"><div class="sq-block"><div class="mark"><span class="mark-main">MBBS &middot; MPhil</span><span class="mark-sub">BSc (Adv) &middot; DCH</span></div></div></div>
            <div class="col-3"><div class="sq-block">${qD}</div></div>
          </div>
        </section>

        <div class="sq-block"><hr></div>

        <section class="procedures" id="areas">
          <div class="sq-block">${sigH2}</div>
          <div class="sq-block"><div class="grid-18">
          ${grid18}
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
              <video src="/assets/office-video.mp4" poster="${A(25)}" preload="metadata" playsinline></video>
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
          <div class="row">
            <div class="col-6">
              <div class="sq-block">${contact}</div>
              <div class="btn-wrap"><a class="btn btn-medium" href="${BOOK}" target="_blank" rel="noopener">Book Online</a></div>
              <div class="sq-block disclaimer">${disclaimer}</div>
            </div>
            <div class="col-6"><div class="sq-block map"><img src="/assets/53-map-capture.png" alt="Map placeholder — replace with Double Bay embed"></div></div>
          </div>
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
        <p class="site-line"><span class="site-address">Bay Health Clinic, 2 Cooper Street, Double Bay NSW 2028, Australia</span><span class="site-phone">(02) 9327 7200</span><a class="site-email" href="mailto:info@bayhealth.com.au">info@bayhealth.com.au</a></p>
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
console.log('index.html generated:', html.length, 'bytes');
