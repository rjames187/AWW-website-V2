# Project Overview

## Who

**Amy's Wish with Wings** is a 501(c)(3) nonprofit in Southlake, Texas providing equine-assisted services to children with diverse medical conditions. The website is maintained by a webmaster on behalf of non-technical stakeholders.

## History

The site was originally a simple vanilla JavaScript site hosted on Netlify. Updates required the webmaster to hand-edit configuration objects in code (see [`__deprecated/`](deprecated.md)), and the contact form was broken (its Brevo API key was bundled into the browser bundle — both a functional and a security failure).

The migration design doc lives in the root [README.md](../README.md). The plan was:

1. Port the website to React ✅ (done — React 19 + Vite)
2. Repair the contact form, notify the chief stakeholder, report errors to the webmaster ✅ (done — the worker `/contact` endpoint)
3. Implement a WYSIWYG editor 🚧 (in progress — a CMS editor exists at `/cms`; see [cms.md](cms.md))

Hosting moved from Netlify to **Cloudflare** because its free tier includes DDoS protection, and the CMS needs server-side storage (Cloudflare KV / R2).

## Architecture at a glance

- `client/` — React SPA deployed as Cloudflare Workers **static assets** (worker name `amyswishwithwingsweb`)
- `worker/` — Cloudflare Worker API (name `awwworker`) providing `/contact`, `/auth/*`, `/upload-image`, and `/data` endpoints
- Storage: **KV** namespace holds the CMS data blob; **R2** bucket `aww-images` holds uploaded images; **Brevo** API sends email
- `__deprecated/` — the old vanilla-JS site, kept for reference (see [deprecated.md](deprecated.md))

## Production URLs

These values also appear in env files and `wrangler` config:

- Client: `https://amyswishwithwingsweb.rory-james2021.workers.dev` and `https://www.amyswishwithwings.com`
- Worker API: `https://awwworker.rory-james2021.workers.dev`
- Public R2 bucket URL: `https://pub-f567eb753cca4747a0d4d7334101b81a.r2.dev`

## Non-goals

- There is **no test suite** and **no CI**. Verification = `lint`/`build` (client) and `check`/`tsc` (worker). Do not invent test commands.
- The root `package.json` is intentionally empty (`{}`): it is not a workspace. Every command runs inside `client/` or `worker/`.
