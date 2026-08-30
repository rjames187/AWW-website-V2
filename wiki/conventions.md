# Conventions

## Style

- 2-space indent (enforced by ESLint in client).
- Client uses plain CSS co-located with components/pages, plus a global `index.css`. **Tailwind is installed but unused** — don't assume utility classes exist (see [gotchas.md](gotchas.md)).
- CMS pages/components use **inline styles** — inconsistent on purpose; align with page or component conventions in your change, but don't standardize them silently.
- Most code in the repo uses single quotes.
- ESLint allows `any` (`@typescript-eslint/no-explicit-any: off`) — used liberally.

## Naming / organization

- Components and classes: PascalCase (`Nav.tsx`, `DataService.ts`, `JWTService.ts`)
- Page-level CSS files: lowercase, matching the page (`home.css`, `awc.css`)
- Utilities/shared modules: mixed (`utils.tsx`, `types.ts`, `templates.ts`, `schemas.ts`)
- Worker controllers: kebab-case (`data-controller.ts`, `login-controller.ts`)
- Pages live in `pages/`, reusable UI in `components/`, API wrappers in `services/`, singleton services as classes.
- Worker uses `Request → Controller → Response` with helpers `jsonResponse`/`errorResponse`.

## Image storage strategies (four, keep them straight)

1. Static site imagery → `client/public/`, referenced as relative `./name.jpg`. Works because `_redirects` funnels deep links to `/`.
2. CSS background images → `client/src/assets/`, bundled by Vite with hashed filenames.
3. CMS-uploaded images → R2 via the worker, displayed from the public bucket URL (`VITE_CDN_HOST`) using `{name, size, type, uploadKey, uploadedUrl}`.
4. Downloadable forms (PDF/DOCX) → `client/public/files/`.

**Filename case trap**: filenames have inconsistent casing and extensions (`Chip.JPEG`, `Max.PNG`, `jazzy.jpeg` vs `Jazzy.jpeg` in `__deprecated/`). Data strings must match the actual file casing exactly — case-sensitivity matters.

## Env access

Client reads via `import.meta.env.VITE_*` (fallback `localhost:8787` for `VITE_WORKER_HOST`). Worker reads `env.*` (see [auth.md](auth.md) for variable names).

## Commit behavior

`client/.husky/pre-commit` runs `npx lint-staged --cwd client/` which executes `eslint --fix` on staged `*.ts`/`*.tsx`.
