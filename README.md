# Dr Anubhav Saxena — practice site mockup

Single-page mockup for **Dr Anubhav Saxena** (MBBS (Syd) FRACGP MPhil BSc(Adv)
DCH) — Director, Bay Health Clinic, Double Bay — for review and iteration.

## Run

```bash
npm install
npm run dev        # local dev
npm run build      # production build (dist/)
```

`index.html` is generated: edit `tools/generate.mjs` (all copy lives there as
plain strings) and run `node tools/generate.mjs` to regenerate.

## What's real

- Bio, credentials, special interests (skin cancer, integrative medicine, ADHD)
- Live links: [bayhealth.com.au](https://bayhealth.com.au/) ·
  [adhdme.au](https://www.adhdme.au/) (incl. his network profile) ·
  [beecroftfp.com.au](https://beecroftfp.com.au/) · HealthEngine booking
- Bay Health contact details (2 Cooper St, Double Bay · 02 9327 7200 ·
  info@bayhealth.com.au) · Beecroft phone + socials
- Dr Saxena's headshot

## What's placeholder

- Hero video (template's YouTube embed), office tour video (excluded from repo),
  interior/building gallery photos (template practice)
- "Areas of Care" + Instagram grids: generated neutral SVG tiles pending real
  service photography / feed
- Manhattan map capture → replace with a Double Bay embed
- Quote wording drafted AHPRA-safe (philosophy lines, not patient testimonials)

Full slot-by-slot content map: [docs/content-pack.md](docs/content-pack.md)

## Stack

Vite (vanilla) · [Motion](https://motion.dev) (Framer Motion vanilla engine) for
entrance/scroll/gesture animation (reduced-motion respected) ·
`@vercel/analytics` + `@vercel/speed-insights` (activate automatically on
Vercel; the two script 404s in local dev are expected).

Layout scaffolding was rebuilt from a reference Squarespace template with
measured tokens; remaining template-derived media is excluded from this repo
via `.gitignore` and must be replaced before any production use.
