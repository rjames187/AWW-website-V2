# AWWW Website Wiki

This wiki is the deep technical context for the Amy's Wish with Wings (AWWW) website project. The root [AGENTS.md](../AGENTS.md) is the mandatory first read; these pages hold the detail it links to.

## Pages

| Page | Read it when... |
|---|---|
| [project-overview.md](project-overview.md) | You need business context, history, or the production URLs. |
| [architecture.md](architecture.md) | You need to understand how the client SPA, API worker, KV, R2, and Brevo fit together. |
| [client.md](client.md) | You are working anywhere in `client/`. |
| [worker.md](worker.md) | You are working anywhere in `worker/`. |
| [auth.md](auth.md) | You are touching login, tokens, protected routes, or the CMS editor's save flow. |
| [cms.md](cms.md) | You are changing schemas, content objects, or how pages read CMS data. |
| [setup.md](setup.md) | You need install, env files, or run/build/lint commands. |
| [deployment.md](deployment.md) | You are deploying or managing production secrets. |
| [conventions.md](conventions.md) | Any contribution — naming, style, and the four asset-storage strategies. |
| [gotchas.md](gotchas.md) | Before you touch anything — known traps, dead code, and one real bug. |
| [deprecated.md](deprecated.md) | You need old assets or reference content from `__deprecated/`. |

## Doc-maintenance policy

These docs are only useful if they stay true to the code. When you change any of the following, update the corresponding wiki page **and** the relevant AGENTS.md in the same change:

- commands or scripts
- file structure / routes / endpoints
- schemas, data shapes, or CMS flows
- conventions or the asset-storage strategies
- deployment or environment setup

Keep secrets out of the docs — refer to env vars by name only.
