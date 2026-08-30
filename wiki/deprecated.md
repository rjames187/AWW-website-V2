# `__deprecated/` — old vanilla-JS site

The original Netlify-hosted vanilla JavaScript site, fully tracked in git. Kept for reference, not used at runtime.

## What's here

- Per-page triplets: `home.html/.css/.js`, `about.*`, `awc.*`, `horses.*`, `support.*`
- Shared: `index.html` (duplicate of home), `navbar.js`, `form.js`, `image-data.js`
- `__deprecated/public/`: original asset library — `horses/` photos, `BOD/` (board of directors) photos, `sponsors/` logos, `files/` (volunteer/registration PDFs and DOCX)

## Why it matters

- `image-data.js` — the old "configuration objects" (`NAVBAR_DATA`, `SPONSOR_DATA`, plus horse/director data) that the webmaster edited by hand. This is exactly what the CMS replaced and is the reference for data shapes.
- `form.js` — the old broken contact form. It called the Brevo API **directly from the browser** with an API key in a gitignored `config.js` (see `__deprecated/.gitignore`). This is both why the form broke and the secret-leak risk that motivated the worker backend. Never revive this pattern.
- `__deprecated/public/` — some assets exist here that were not copied to `client/public/` (e.g. `child_and_horse.jpg`, `Nick.JPEG`, extra `files/*.docx`). Check this folder if something is missing from the new site.

## Rules

- Do not delete without a deliberate stakeholder decision — it's the reference for content/branding parity and the fallback asset pool.
- Do not link to it from new code.
- Use it as a reading reference when migrating static content or checking brand parity.
