# Architecture

## Big picture

```
┌─────────────────────────┐         ┌──────────────────────────────┐
│  Browser                 │         │  Cloudflare                   │
│                          │         │                               │
│  React SPA (client/dist) │ ──────► │  Worker (assets-only)         │
│  served as static assets │         │  "amyswishwithwingsweb"       │
└─────────────────────────┘         └───────────────────────────────┘
                 │
                 │ cross-origin fetch, CORS-checked
                 ▼
┌────────────────────────────────────────────────────────────────────┐
│  Cloudflare Worker API "awwworker" (worker/src/index.ts)           │
│                                                                    │
│   /contact (email)  /auth/login  /auth/refresh                     │
│   /upload-image     /data (GET public, PUT authenticated)          │
│                                                                    │
│  Binds: KV namespace "KV"  • R2 bucket "IMG_BUCKET" (aww-images)   │
│  Email: Brevo transactional API                                    │
└────────────────────────────────────────────────────────────────────┘
```

The SPA calls the API worker directly cross-origin; there is no Vite proxy and no Cloudflare Pages. The client is deployed as a Worker that only serves static assets (`assets = { directory = "dist" }`).

## CORS model

The worker allows origins listed in the `CLIENT_ORIGINS` env var (comma-separated) plus `http://localhost:5173` and `http://localhost:8787`. On every request it computes the elected origin and echoes it in `Access-Control-Allow-Origin` with credentials allowed (`Access-Control-Allow-Credentials: true`). All controllers use the shared helpers `jsonResponse`/`errorResponse` (worker/src/utils.ts) so CORS headers attach consistently.

## Singleton services (worker)

`worker/src/index.ts` initializes long-lived singletons every request (guarded against re-init) from the request's `env`:

- `EmailService` (Brevo API)
- `ImageService` (R2 binding)
- `DataService` (KV binding)
- `JWTService` (sign/verify access + refresh tokens)
- `LoginService` (single hardcoded admin user from env)

Controllers are thin functions taking `Request` and returning `Response`. A global `try/catch` wraps the router in `fetch`: on error it emails an error alert to the admin (best-effort) and returns 500.

## Storage

- **KV** namespace binding `KV`: whole CMS dataset lives under one key, `"data"`, as a JSON string. Allowed keys are `["sponsors", "horses", "directors", "data"]` but only `data` is used. (Worker calls this; `D1` is a scaffold leftover — see [gotchas.md](gotchas.md).)
- **R2** bucket binding `IMG_BUCKET` (bucket `aww-images`): uploaded image objects, keyed `{timestamp}-{filename}`. Public URLs come from the bucket's public `r2.dev` URL (`VITE_CDN_HOST` on the client).
- **Email**: Brevo (`https://api.brevo.com/v3/smtp/email`). Contact submissions go to the admin (+ owner when `DUAL_NOTIFICATIONS != "false"`); server-error alerts go to the admin.

## Client-side state

Two React contexts (no Redux/Zustand):

- `AuthContext` — access token in memory only; refresh token lives in an HttpOnly cookie scoped to `/auth/refresh`. See [auth.md](auth.md).
- `DataContext` — whole CMS blob fetched once from `GET /data?key=data`; pages read `data.Horses` / `data.Directors` / `data.Sponsors`. See [cms.md](cms.md).

## Request flows worth knowing

- **Contact form**: Footer form → `POST /contact` → Brevo email to admin (+ optionally owner). Errors are reported to the webmaster-email (`ADMIN_EMAIL`) — see [worker.md](worker.md).
- **CMS auto-save**: `CMSEditor.tsx` watches local `data` with lodash `_.isEqual` guards and writes via `orchestrateAuthenticatedCall(updateData, ['data', data])` — see [client.md](client.md) and [auth.md](auth.md).
