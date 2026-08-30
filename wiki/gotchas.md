# Gotchas

Read this before editing.

### Tailwind is installed but unused

`@tailwindcss/vite ^4.1.11` is in `client/package.json` but never registered in `vite.config.ts`, and no `@import "tailwindcss"` exists anywhere. Never assume utility classes work.

### D1 is a scaffold leftover; the real store is KV

The Cloudflare D1 template the worker was scaffolded from left behind `worker/migrations/` (**empty**), a `worker/README.md` describing D1 setup that does not apply, a `package.json` name `"d1-template"`, and a `seedLocalD1` script. Do not use these. CMS data lives in the KV namespace binding `KV` under key `"data"`.

### Dead code in the client

- `client/src/DataService.ts` (static accessor) — unused by any component.
- `client/src/data/*.ts` static arrays (`horses.ts`, `directors.ts`, `sponsors.ts`) — not used for rendering; only exported TypeScript interfaces (`Horse`, `Director`, `Sponsor`, `SponsorCategory`) are imported.
- `client/src/components/VoteLink.tsx` — unused (the "vote" link was removed in commit `f46681c`).

### Dead dependency in the worker

`cookie-parser` is in `worker/package.json` dependencies but not used; cookie parsing is implemented by the custom `CookieHelper`. `@types/bcryptjs` is in devDependencies although no hashing is implemented.

### Real bug: error-alert template argument order

`EmailService.getErrorAlertBody` calls `errorReportTemplate(status, timeStamp, message, ...)` but the template's signature is `(status, message, timestamp, ...)`. In error-alert emails, **message and timestamp are swapped**. Fix carefully — don't reorder the call without updating the signature (or vice versa) in the same change.

### Double authentication on `/data` PUT

`dataController` invokes `authenticate(...)` twice on the PUT path (once as route middleware where applicable, once inside the handler). Placeholder behavior is harmless but confusing; preserve it unless intentionally simplifying.

### Client deep-link behavior

`client/public/_redirects` contains 301 redirects for `/about`, `/awc`, `/horses`, `/support` → `/`. Deep links to those routes land on the homepage rather than the SPA resolving them. Changing this (e.g. SPA fallback) changes site behavior — check with the stakeholder first.

### Root has no scripts

Root `package.json` is `{}`. Never run `npm ...` from root. Run inside `client/` or `worker/`.

### Env files are sensitive

`client/.env` and `worker/.dev.vars` are gitignored for a reason. Treat them as secrets. Rotate if leaked.

### Case-sensitive filenames

Image filenames have inconsistent casing (e.g. `Chip.JPEG`, `Max.PNG`). The strings you use in data files must match the filesystem exactly.
