# Client (`client/`)

React 19 SPA built with Vite, deployed to Cloudflare as static assets (worker `amyswishwithwingsweb`). This page covers structure, routing, state, services, the CMS editor, and styling.

## Source tree (`client/src`)

```
main.tsx                 BrowserRouter > StrictMode > AuthContextProvider > DataContextProvider > App
App.tsx                  routes + PAGES list (nav/footer chrome)
index.css                global styles
vite-env.d.ts            vite client types
DataService.ts           LEGACY static accessor — dead code (see ../wiki/gotchas.md)
assets/                  images bundled by Vite (CSS backgrounds)
components/              Nav, Footer, HorseProfile, DirectorProfile, ScrollToAnchor,
                         VoteLink (unused), utils, cms/*
context/                 AuthContext, DataContext
data/                    legacy static arrays (dead), canonical TS interfaces, schemas.ts
pages/                   Home, About, AmysWishClub, Horses, Support, CMSEditor, Login
services/                dataService, authService, uploadService
```

## Routing

`App.tsx` declares:

- `/` → Home, `/about` → About, `/awc` → AmysWishClub, `/horses` → Horses, `/support` → Support
- `/cms` → CMSEditor, `/cms/login` → LoginPage

`PAGES` (`[{name, href}]`) drives Nav and Footer links; CMS routes are intentionally excluded. `ScrollToAnchor` scrolls to `location.hash` (e.g. `/support#volunteer`).

**Caveat**: `client/public/_redirects` 301-redirects `/about`, `/awc`, `/horses`, `/support` back to `/`. That means deep links land on the homepage rather than the SPA resolving them client-side — a leftover of the Netlify setup that may mask a missing SPA fallback. Read `gotchas.md` before touching routing.

## State management

Two contexts, no external state library:

- **AuthContext** (`context/AuthContext.tsx`): `{ authData: { accessToken } | null, setAuthData }`. The token lives only in memory; the refresh token is an HttpOnly cookie handled by the worker. See [auth.md](auth.md).
- **DataContext** (`context/DataContext.tsx`): whole CMS blob fetched once on mount via `GET /data?key=data`; `setNeedRefresh(true)` triggers a refetch. Shape: `Record<string, ContentObject[]>` with keys `Horses`, `Directors`, `Sponsors`. See [cms.md](cms.md).

## Services (`client/src/services`)

All three read `import.meta.env`:
- `VITE_WORKER_HOST || 'localhost:8787'`
- uploads also require `VITE_CDN_HOST`
- `VITE_CDN_HOST` fallback above only if explicitly set

- **dataService.ts**: `fetchData(key)` / `updateData(key, data, token)` hitting `${VITE_WORKER_HOST}/data?key=...`; exports a class plus destructured convenience functions.
- **authService.ts**: `orchestrateAuthenticatedCall(context, navigate, callback, args)` — refreshes via `POST /auth/refresh` with `credentials: 'include'`, retries once on 401, redirects to `/cms/login` on failure. See [auth.md](auth.md).
- **uploadService.ts**: `uploadImageFile(file, key, token)` — sends raw `ArrayBuffer` with the file's MIME type; returns a CDN URL. See [cms.md](cms.md).

## CMS editor flow

`pages/CMSEditor.tsx` (no CSS file; uses inline styles):

1. On mount it reads the blob via `fetchData('data')` and keeps local `data` state.
2. A `useEffect` watches `data`; a lodash `_.isEqual` guard prevents write loops and read-triggered writes.
3. Saves go through `orchestrateAuthenticatedCall(updateData, ['data', data])`.

`components/cms/` implements the form machinery:

- `types.ts` — `FieldDefinition`, `ContentSchema`, `ContentObject` interfaces
- `ContentList.tsx` — card grid with edit/delete/create
- `ContentObjectEditor.tsx` — modal form generated from a `ContentSchema`
- `FieldInput.tsx` — per-field renderer; image fields upload **immediately** to `PUT /upload-image?key=...` and store `{ name, size, type, uploadKey, uploadedUrl }`

Schemas live in `data/schemas.ts` — naming and key conventions are documented in [cms.md](cms.md).

## Styling

- **Not Tailwind**: `@tailwindcss/vite` is in dependencies but unused — no plugin registration in `vite.config.ts`, no `@import "tailwindcss"` anywhere. Do **not** assume utility classes exist.
- Real approach: co-located plain CSS per page/component (`home.css`, `Nav.css`, `Footer.css`, …) imported from TSX; global styles in `index.css`. Brand colors are the purple family (`#6d2d9e`, `#421a60`, `#4a148c`).
- The CMS pages/components use inline styles instead — an inconsistency to be aware of before restyling.

## Pages

- `Home.tsx`, `About.tsx`, `AmysWishClub.tsx`, `Horses.tsx`, `Support.tsx` (each with a same-named lowercase CSS file)
- `CMSEditor.tsx`, `Login.tsx` (no separate CSS)

Pages map `ContentObject`s to typed models via `mapToHorse` / `mapToDirector` helpers and build image URLs as `` `${CDN_HOST}/${object.file.uploadKey}` ``.

## Legacy/static code

`client/src/DataService.ts` (static accessor) and `client/src/data/*.ts` static arrays are **not used for rendering** — only the TypeScript interfaces (`Horse`, `Director`, `Sponsor`, `SponsorCategory`) are imported. See [gotchas.md](gotchas.md) for the full list of dead code.
