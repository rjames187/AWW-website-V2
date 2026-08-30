# Setup

## Prerequisites

- Node.js (LTS) and npm
- A Cloudflare account with `wrangler` access (only for deploy or for `preview:worker`)

## Install

```bash
cd client && npm install
cd ../worker && npm install
```

(The repository has no workspaces; each package is independent.)

## Environment files

- `client/.env` — `VITE_WORKER_HOST`, `VITE_CDN_HOST`
- `worker/.dev.vars` — all secrets listed in [auth.md](auth.md)

Both are gitignored; do not commit them. The agent must never paste their values.

## Commands

Client (run in `client/`):

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server (default 5173) |
| `npm run build` | `tsc -b && vite build` → `client/dist` |
| `npm run lint` | `eslint .` |
| `npm run preview` | Vite preview |
| `npm run preview:worker` | build + `wrangler dev` |
| `npm run deploy:worker` | build + `wrangler deploy` |
| `npm run prepare` | installs husky hooks (`cd .. && husky install client/.husky`) |

Worker (run in `worker/`):

| Command | Purpose |
|---|---|
| `npm run dev` | `wrangler dev` (default 8787) |
| `npm run deploy` | `wrangler deploy` |
| `npm run check` | `tsc && wrangler deploy --dry-run` |
| `npm run cf-typegen` | `wrangler types` (regenerates `worker-configuration.d.ts`) |
| `npm run seedLocalD1` | **vestigial** — do not use |

## Pre-commit hooks

`client/.husky/pre-commit` runs `npx lint-staged --cwd client/`; `client/lint-staged.config.js` runs `eslint --fix` on staged `*.ts`/`*.tsx`. Note that `client/package.json` also has a redundant `lint-staged` key for `*.js` only.
