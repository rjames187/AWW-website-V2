# AGENTS.md — Amy's Wish with Wings Website (V2)

This is the mandatory first read for any agent working in this repository. Summaries here link to deep-dive pages in [`wiki/`](wiki/README.md).

## What this is

Website for **Amy's Wish with Wings** (501(c)(3), Southlake, TX: equine-assisted services for children). Migrated from a vanilla-JS/Netlify site to a React front end plus a Cloudflare Worker backend. See [wiki/project-overview.md](wiki/project-overview.md) for background and production URLs.

## Repository map

| Path | What it is |
|---|---|
| `client/` | React 19 + Vite SPA → deployed as Workers static assets (`amyswishwithwingsweb`). See [client/AGENTS.md](client/AGENTS.md). |
| `worker/` | Cloudflare Worker API (`awwworker`): contact form email, CMS auth, image upload, CMS blob. See [worker/AGENTS.md](worker/AGENTS.md). |
| `__deprecated/` | Old vanilla-JS site, kept for reference only. See [wiki/deprecated.md](wiki/deprecated.md). |
| `wiki/` | Deep documentation for agents — start at [wiki/README.md](wiki/README.md). |

## Golden rules

1. **Never run npm from the repo root** — root `package.json` is `{}` on purpose; run inside `client/` or `worker/`.
2. **There are no tests and no CI.** Verification gates: client = `npm run lint` + `npm run build`; worker = `npm run check` (+ `npm run deploy` only when asked).
3. **Secrets stay secret**: `client/.env` and `worker/.dev.vars` are gitignored — never commit them, never paste their values into code or docs.
4. **Keep docs in sync**: if your change alters commands, structure, routes, schemas, data shapes, conventions, or deployment, update the relevant `AGENTS.md` and wiki page in the same change.
5. **Read [wiki/gotchas.md](wiki/gotchas.md) before editing** — it lists dead code and one real bug you must not "fix" by accident.

## Quick command reference

Client (in `client/`): `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`, `npm run preview:worker`, `npm run deploy:worker`
Worker (in `worker/`): `npm run dev`, `npm run deploy`, `npm run check`, `npm run cf-typegen`
Worker vestigial (do not use): `npm run seedLocalD1`

Details: [wiki/setup.md](wiki/setup.md), [wiki/deployment.md](wiki/deployment.md).

## Conventions in one glance

- 2-space indent; single quotes predominate; `any` allowed in client ESLint.
- React: PascalCase components, pages in `pages/`, API wrappers in `services/`, singleton services as classes; worker controllers are kebab-case.
- Styling: plain CSS co-located with components/pages (**Tailwind is installed but unused**); CMS pages use inline styles.
- Four asset-storage strategies — see [wiki/conventions.md](wiki/conventions.md).

## Top gotchas (details in [wiki/gotchas.md](wiki/gotchas.md))

- Tailwind dependency unused — don't assume utility classes.
- Worker is scaffolded from a D1 template — D1 machinery is dead; real store is KV under key `"data"`.
- Dead code in client: `DataService.ts`, `data/*.ts` static arrays, `VoteLink.tsx`; dead dep in worker: `cookie-parser`.
- Real bug: `EmailService.getErrorAlertBody` swaps `message`/`timestamp` when calling `errorReportTemplate`.
- `client/public/_redirects` 301-redirects deep links to `/` — routing behavior depends on it.

## Wiki index

- [project-overview.md](wiki/project-overview.md) — org, history, roadmap, production URLs
- [architecture.md](wiki/architecture.md) — big picture, CORS, singletons, storage
- [client.md](wiki/client.md) — tree, routing, contexts, services, CMS editor, styling
- [worker.md](wiki/worker.md) — endpoints, controllers, storage, error handler
- [auth.md](wiki/auth.md) — JWT lifecycle, secrets inventory
- [cms.md](wiki/cms.md) — schemas, content objects, auto-save rules
- [setup.md](wiki/setup.md) — prerequisites, env files, all commands
- [deployment.md](wiki/deployment.md) — deploy commands, secrets, client config
- [conventions.md](wiki/conventions.md) — style, naming, asset strategies
- [gotchas.md](wiki/gotchas.md) — traps, dead code, the email-template bug
- [deprecated.md](wiki/deprecated.md) — what's in `__deprecated/` and how to use it
