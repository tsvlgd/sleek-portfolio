# mehfooj.dev

Live at [mehfooj.dev](https://mehfooj.dev).

## Stack

Next.js 15 App Router, React 19, TypeScript, Tailwind v4, shadcn/ui. Deployed on
Vercel. No animation library: the motion on this site is CSS and one shared rAF
where a value has to follow the pointer.

## Getting started

```bash
bun install
bun run dev
```

Open http://localhost:3000.

## Commands

```bash
bun run dev          # dev server with turbopack
bun run build        # the verification step
bun run lint         # eslint via next lint
bun run knip         # unused deps, files and exports
bun run format:all   # prettier, both configs
```

Do not run `bun run build` while `bun run dev` is running. They share `.next`
and the dev server dies on a missing build manifest.

## Environment

Copy `.env.example` to `.env` and fill in what you need.

| Variable             | Required             | Purpose                                                                                                                    |
| -------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`       | no                   | Fine grained, read only on public repos. Enables the contribution grid. Without it the section degrades to a profile link. |
| `TELEGRAM_BOT_TOKEN` | for the contact form | Telegram bot token the contact form posts through.                                                                         |
| `TELEGRAM_CHAT_ID`   | for the contact form | Chat the form messages are delivered to.                                                                                   |
| `NEXT_PUBLIC_URL`    | no                   | Canonical origin. Defaults to localhost.                                                                                   |

The contact form returns 500 without the Telegram pair. Everything else on the
site works with no environment at all.
