# Client — agent context

The React 19 + Vite SPA (see [`../wiki/client.md`](../wiki/client.md) for the full map). This file is the minimum you need to work safely in this directory.

## Commands

Run all commands inside `client/` (the root package.json is intentionally empty).

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server (default port 5173) |
| `npm run build` | `tsc -b && vite build` — type errors fail the build |
| `npm run lint` | `eslint .` |
| `npm run preview` | Vite preview |
| `npm run preview:worker` | build + `wrangler dev` |
| `npm run deploy:worker` | build + `wrangler deploy` |
| `npm run prepare` | installs husky hooks (`cd .. && husky install client/.husky`) |

There is no test suite. Verification = `npm run lint` + `npm run build` passing.

## Where things live (`src/`)

- `pages/` — one component per route (`Home`, `About`, `AmysWishClub`, `Horses`, `Support`, `CMSEditor`, `Login`)
- `components/` — shared UI (`Nav`, `Footer`, `HorseProfile`, `DirectorProfile`, `ScrollToAnchor`, `VoteLink`*unused*, `utils`, `cms/*`)
- `context/` — `AuthContext`, `DataContext`
- `services/` — `dataService`, `authService`, `uploadService`
- `data/` — canonical interfaces + legacy static arrays (*dead code for rendering*) and `schemas.ts`
- `DataService.ts` — legacy static accessor, **unused**
- `public/` — static assets incl. `_redirects`

Routes and the `PAGES` list are in `App.tsx`.

## Patterns to know

- **Styling**: plain CSS co-located per page/component; CMS pages use inline styles. Tailwind is a dependency but **unused** — don't assume utility classes. See [`../wiki/conventions.md`](../wiki/conventions.md).
- **CMS**: editor at `/cms` auto-saves via `orchestrateAuthenticatedCall`. Schemas in `data/schemas.ts` must match page consumers — see [`../wiki/cms.md`](../wiki/cms.md).
- **Auth**: access token in memory only; refresh token is HttpOnly cookie. See [`../wiki/auth.md`](../wiki/auth.md).
- **Env**: `VITE_WORKER_HOST` and `VITE_CDN_HOST` via `import.meta.env`.

## Big trap

`client/public/_redirects` 301-redirects `/about`, `/awc`, `/horses`, `/support` → `/`. Deep links land on the homepage. See [`../wiki/gotchas.md`](../wiki/gotchas.md) before touching routing.

## Deep dives

- [architecture.md](../wiki/architecture.md) — how client and worker fit together
- [cms.md](../wiki/cms.md) — schema system and storage rules
- [gotchas.md](../wiki/gotchas.md) — dead code + quirks
