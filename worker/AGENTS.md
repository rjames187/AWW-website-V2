# Worker — agent context

The Cloudflare Worker API `awwworker` (see [`../wiki/worker.md`](../wiki/worker.md) for endpoints and conventions). This file is the minimum you need to work safely in this directory.

## Commands

Run everything inside `worker/` (the root package.json is intentionally empty).

| Command | What it does |
|---|---|
| `npm run dev` | `wrangler dev` (port 8787 by default) |
| `npm run deploy` | `wrangler deploy` |
| `npm run check` | `tsc` then `wrangler deploy --dry-run` — the closest thing to a CI gate |
| `npm run cf-typegen` | regenerates `worker-configuration.d.ts` from `wrangler.json`/`wrangler types` |
| `npm run seedLocalD1` | **vestigial** — D1 scaffold leftover; do not use |

There is no test suite. Verification = `npm run check` + deploy dry-run.

If you change bindings or secrets, run `npm run cf-typegen` to refresh `worker-configuration.d.ts`.

## Configuration files

- `wrangler.json` — runtime config (name, main, compatibility flags, KV/R2 bindings, observability)
- `worker-configuration.d.ts` — generated env types; do not hand-edit
- `.dev.vars` — local secrets (**gitignored**, contains sensitive values — do not commit or paste)
- `.gitignore` — includes `.dev.vars*`
- `.vscode/settings.json` — associates `wrangler.json` with jsonc
- `migrations/` — **empty**; D1 scaffold leftover (see [`../wiki/gotchas.md`](../wiki/gotchas.md))

## Big warnings

- D1/template leftovers: `migrations/`, `seedLocalD1`, `README.md`, `package.json cloudflare` block are scaffold residue — the real datastore is **KV** under key `"data"`.
- Dead deps: `cookie-parser` and `bcryptjs` (caps) are installed but not used.
- Real bug: `EmailService.getErrorAlertBody` passes `message`/`timestamp` in the wrong order to `errorReportTemplate` (see [`../wiki/gotchas.md`](../wiki/gotchas.md)).

## Deep dives

- [architecture.md](../wiki/architecture.md) — big picture
- [auth.md](../wiki/auth.md) — JWT lifecycle and secrets inventory
- [cms.md](../wiki/cms.md) — schema and storage rules
- [worker.md](../wiki/worker.md) — endpoint table and conventions
- [gotchas.md](../wiki/gotchas.md) — legacy deps and quirks
