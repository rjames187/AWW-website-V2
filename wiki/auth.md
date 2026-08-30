# Authentication and Secrets

## Model

One hardcoded admin user (credentials come from env `ADMIN_USERNAME`/`ADMIN_PASSWORD`, compared as plain strings). JWTs prove "logged in as the one admin"; there are no user claims — tokens carry only `{ issued, type }`. Issuer `cms-backend`, audience `cms-client`.

- **Access token**: 15 minutes
- **Refresh token**: 7 days
- **Refresh cookie**: `refreshToken`, `HttpOnly; Secure; SameSite=Lax; Max-Age=604800; Path=/auth/refresh`

## Flow

1. `POST /auth/login` → `loginController` verifies creds, returns `{ accessToken }` in JSON and sets the refresh cookie.
2. Client stores only the access token in memory (`AuthContext`); the refresh token never touches JS.
3. Any protected call goes through `orchestrateAuthenticatedCall(...)` (`client/src/services/authService.ts`):
   - performs the request
   - on 401 → `POST /auth/refresh` with `credentials: 'include'`, retry once
   - if that fails → navigate to `/cms/login`
4. `refreshController` rotates both tokens and re-sets the cookie.

The `/cms` route has **no client-side protection**; security relies on the API rejecting unauthorized PUTs.

## Secrets inventory (by name only)

| Variable | Where used |
|---|---|
| `VITE_WORKER_HOST` | client (worker base URL; falls back to `localhost:8787`) |
| `VITE_CDN_HOST` | client (public R2 URL base) |
| `BREVO_KEY` | worker (Brevo API key) |
| `FROM_EMAIL` | worker (email sender address) |
| `FROM_NAME` | worker (email sender display name) |
| `ADMIN_EMAIL` | worker (recipient of contact + error emails) |
| `OWNER_EMAIL` | worker (CC for contact emails when dual notifications) |
| `DUAL_NOTIFICATIONS` | worker (toggle string; `!= "false"` means on) |
| `JWT_ACCESS_SECRET` | worker (access-token signing) |
| `JWT_REFRESH_SECRET` | worker (refresh-token signing) |
| `ADMIN_USERNAME` | worker (login verification) |
| `ADMIN_PASSWORD` | worker (login verification) |
| `CLIENT_ORIGINS` | worker (comma-separated allowed origins for CORS) |

Local values live in `client/.env` and `worker/.dev.vars` (both gitignored). Production secrets are managed with `wrangler secret` (see [deployment.md](deployment.md)).

## Operational rules for agents

- Never print commit or paste the contents of `.env` / `.dev.vars`.
- Never embed a secret into code, a comment, or documentation.
- If you accidentally leak a secret, rotate it immediately and purge it from history.
