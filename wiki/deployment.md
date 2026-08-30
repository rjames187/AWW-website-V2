# Deployment

## What deploys where

- `client/` → Cloudflare worker `amyswishwithwingsweb`, serving static assets from `client/dist`
- `worker/` → Cloudflare worker `awwworker`

## Commands

Client:

```bash
npm run build          # tsc -b && vite build
npm run preview:worker # build + wrangler dev
npm run deploy:worker  # build + wrangler deploy
```

Worker:

```bash
npm run check   # tsc && wrangler deploy --dry-run
npm run deploy  # wrangler deploy
```

## Production secrets

Set env vars as Cloudflare secrets, e.g. `npx wrangler secret put SOME_KEY`. See [auth.md](auth.md) for the full list of names. Never commit secret values to the repo.

If you change bindings in `worker/wrangler.json`, regenerate types with `npm run cf-typegen` so `worker-configuration.d.ts` stays accurate.

## Client config

`client/wrangler.toml`:

- `name = "amyswishwithwingsweb"`
- `compatibility_date = "2025-05-05"`
- `assets = { directory = "dist" }`, observability logs enabled

Deep-link quirk: `client/public/_redirects` 301-redirects `/about`, `/awc`, `/horses`, and `/support` back to `/`. This is left over from the Netlify setup; it means deep links land on the homepage (see [gotchas.md](gotchas.md)).
