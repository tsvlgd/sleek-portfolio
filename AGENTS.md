# AGENTS.md

Personal portfolio for a backend / AI engineer (mehfooj.dev). Next.js 15 App Router, React 19, Tailwind v4, shadcn/ui. Single app — no monorepo, no packages.

**Design system: read `DESIGN.md` before touching any UI.** It is binding, not advisory.

## Commands

Use **bun** (CI uses bun; `bun.lock` is authoritative, `package-lock.json` is gitignored and stale).

```bash
bun install
bun run dev                 # next dev --turbopack  → http://localhost:3000
bun run lint                # `next lint` — DEPRECATED in Next 15.5; use `npx eslint .`
bun run build               # the verification step
bun run format:all          # prettier with BOTH configs (see below)
bun run knip                # unused deps/files/exports — keep it at zero
bun run test-telegram       # live check of TELEGRAM_* creds
```

No test framework. **Never run `bun run build` while `bun run dev` is running** — they share `.next` and the dev server dies with `ENOENT ... app-build-manifest.json`. Stop dev, build, restart.

CI (`.github/workflow/lint.yml` — note singular `workflow`) on PRs to `main`: `bun install` → `lint` → `build` → `bunx prettier --check`.

### Two prettier configs

`.prettierrc` sorts imports (`@trivago`); `.prettierrc.json` sorts Tailwind classes. Bare `prettier` and `bun run format` resolve only `.prettierrc`. The pre-commit hook (lint-staged) applies **both**, so use `bun run format:all` to avoid hook rewrites.

## Architecture

- `@/*` → `src/*`.
- **`src/config/*.tsx` is the content layer.** `Hero`, `About`, `Experience`, `Projects`, `Navbar`, `Footer`, `Contact`, `Github`, `Meta`. Edit these before touching components.
- **`src/config/Meta.tsx` owns all SEO.** `generateMetadata(path)` reads `pageMetadata`, keyed by route. `getPageMetadata` silently falls back to `'/'`, so a new route without an entry ships the home title and canonical URL. The function is annotated `: Metadata` — without that annotation the literal unions widen to `string` and every route's `export const metadata` fails to typecheck.
- Tailwind v4, **no `tailwind.config`** — tokens live in `globals.css` under `@theme inline`. Dark mode: `@custom-variant dark (&:is(.dark *))` + `next-themes`, and `ThemeProvider` must wrap the app in `layout.tsx`. Removing it silently kills dark mode.
- One content axis: everything is `max-w-3xl` (`Section`, pages, header, footer). Do not add a second width — two left edges is the exact bug this replaced.

### Server-only modules

`src/lib/project.ts` uses `fs`/`path` — never import from a `'use client'` component. Same for `src/lib/github.ts`, which reads `GITHUB_TOKEN` (server-only, never `NEXT_PUBLIC_`).

- **Projects** — catalogue lives in `src/config/Projects.tsx`; case-study prose lives in `src/data/projects/<slug>.mdx`. A project needs both: `details: true` to get a `/projects/<slug>` route, and an MDX file for the body. Case-study prev/next follows the **array order in `Projects.tsx`**.
- Case studies render with `next-mdx-remote/rsc` (server-rendered, no client fetch). Custom JSX in MDX only works if mapped in `src/components/projects/ProjectComponents.tsx`.

### GitHub activity

`src/lib/github.ts` calls the GitHub GraphQL API directly. The old third-party endpoint it replaced (`github-contributions-api.deno.dev`) is **dead** — Deno Deploy Classic was sunset. Requires `GITHUB_TOKEN`; without it the section degrades to a profile link rather than failing.

### API

`src/app/api/contact` — zod-validated POST → Telegram. In-memory per-IP rate limit (5/min): per-instance, resets on deploy, not a security control.

## Agent workflow

- Plan and ask before building. This repo's design language is opinionated; guessing produces something off-system.
- Parallelise across **disjoint file sets**. Multiple agents editing `globals.css`, `layout.tsx` or a shared config will conflict.
- Verify with the browser (Playwright MCP is configured) — screenshot desktop **and** mobile, both themes. Check `document.documentElement.scrollWidth === clientWidth` for horizontal overflow.
- Finish with `bun run lint && bun run build && bun run knip`.

## Integrity rules for content

- Only feature work that is publicly verifiable, or explicitly in progress with **no link**.
- Never present a fork as original work. `tsvlgd/ai-coding-agent` is a byte-identical fork of another author's repo — it is not linked anywhere on the site.
- The `~/now` terminal panel and all status labels must be true. Update them, don't leave stale claims.
- Nothing to invent: no fake screenshots, no fabricated metrics.
- never use hyphens like - or -- anywhre in content seems like ai written
- don't always name low level stuff or components like react loop or xml etc nobody intersted in that but in things like harness eng, agentic systems, runtime etc or cli based agents are
- and project should sound like product not components like (don't mention low level techincal terms eg xml parsing, react loop agent loop)

## Gotchas

- `.agents/skills/` holds shared agent skills (auto-discovered). `opencode.json` configures Playwright + shadcn MCPs — use `bunx --bun` for them, because system Node is v18 and Playwright needs 20+.
- `audit/` and `.playwright-mcp/` are scratch output from browser testing; both are gitignored.
