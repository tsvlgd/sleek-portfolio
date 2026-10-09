# Design System — mehfooj.dev

## Concept: 墨紙 (_sumi-kami_) — "ink on paper, inside a terminal"

A portfolio for a backend/AI engineer who thinks in terminals. The surface is
Japanese-minimal: warm paper, sumi ink, hairline rules, generous 間 (ma) negative
space. The _material_ is technical: monospace metadata, section numerals,
hairline tick marks, a single restrained accent that behaves like a terminal
caret rather than a brand colour.

Two things this is deliberately **not**: not a SaaS dashboard, and not a
"hacker terminal" pastiche (no green-on-black, no Matrix rain, no fake
`~/user@host` cosplay). The terminal shows up as _typography and rhythm_,
not as a costume.

Reference discipline: borrow **technique** from ramx.in and deepakmodi.dev.
Never copy their content, copy, or markup.

---

## Non-negotiables

1. **No animation library.** Not framer-motion, not GSAP. `motion` stays
   uninstalled/unused. Everything animates via CSS transitions and one-shot
   IntersectionObserver reveals. (ramx.in ships ~200 bytes of CSS and reads as
   fully animated; a motion library would cost 30–40 KB gzip to do less.)
2. **No infinite animation on large painted areas.** No spinning conic
   gradients, no full-width infinite blurs. Transform/opacity only.
3. **`backdrop-filter` is never mounted on a permanent fixed overlay.** It
   forces a composited layer + continuous readback. A plain gradient gets 90%
   of the look for 0% of the paint cost.
4. **Smooth scroll is desktop-only and tuned.** Native momentum on touch.
5. **Fonts are woff2, subset to latin, and preloaded only where rendered.**
6. **Every animation respects `prefers-reduced-motion`.**
7. **Scroll-reveal fires once.** No re-trigger on scroll-up, no observer left
   alive after the fold.

---

## Colour

All tokens in `src/app/globals.css` via `@theme inline`. One token set, two
themes — same names, no variant-specific component classes.

| Token                  | Light (default) — 生成り       | Dark (default toggle) — 墨    | Usage                                                       |
| ---------------------- | ------------------------------ | ----------------------------- | ----------------------------------------------------------- |
| `--background`         | `oklch(0.972 0.006 85)`        | `oklch(0.158 0.006 60)`       | Page canvas. Never pure `#fff`/`#000`                       |
| `--foreground`         | `oklch(0.19 0.008 60)`         | `oklch(0.93 0.008 85)`        | Sumi ink                                                    |
| `--card`               | `oklch(1 0 0 / 0.55)`          | `oklch(1 1 0 / 0.035)`        | Translucent paper panel                                     |
| `--muted`              | `oklch(0.945 0.006 85)`        | `oklch(0.215 0.006 60)`       | Subtle surfaces                                             |
| `--muted-foreground`   | `oklch(0.505 0.01 70)`         | `oklch(0.68 0.008 80)`        | Supporting copy                                             |
| `--border`             | `oklch(0.19 0.008 60 / 0.12)`  | `oklch(1 0 0 / 0.10)`         | Hairlines, **derived from ink alpha**                       |
| `--input`              | `oklch(0.19 0.008 60 / 0.14)`  | `oklch(1 0 0 / 0.14)`         |                                                             |
| `--primary`            | `oklch(0.22 0.01 60)`          | `oklch(0.93 0.008 85)`        | **Inverts between themes**                                  |
| `--primary-foreground` | `oklch(0.985 0.004 85)`        | `oklch(0.16 0.006 60)`        |                                                             |
| `--accent`             | `oklch(0.545 0.155 32)` 朱     | `oklch(0.78 0.125 70)` 琥珀   | **Sparing.** Hover, active, caret, one focal point per view |
| `--ring`               | `oklch(0.545 0.155 32 / 0.55)` | `oklch(0.78 0.125 70 / 0.55)` | Focus rings                                                 |
| `--destructive`        | `oklch(0.58 0.21 27)`          | `oklch(0.68 0.19 25)`         |                                                             |
| `--radius`             | `0.5rem`                       |                               | Tightened, not pill-round                                   |

Rules:

- **Accent budget: ≤2 accent elements per viewport.** If a view feels busy,
  the accent is overused — demote something to `muted-foreground`.
- **`--primary` inverts** so every `hover:text-primary` reads correctly in both
  themes without a variant class.
- Alpha borders (`/ 0.12`) over solid greys — makes surfaces read as layered
  paper rather than outlined boxes.
- Depth uses **inset** highlight, never drop shadow:
  `box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.04)`. Inset does not expand paint
  area, so it costs nothing on scroll.

---

## Typography

| Role                                  | Family           | Loading                                                            |
| ------------------------------------- | ---------------- | ------------------------------------------------------------------ |
| UI / body / headings                  | Inter (variable) | `next/font/google`, `subsets: ['latin']`, `display: 'swap'`        |
| Code, metadata, numerals              | JetBrains Mono   | `next/font/google`, `subsets: ['latin']`                           |
| Japanese glyphs (a handful of labels) | **system stack** | `"Hiragino Sans", "Yu Gothic", "Noto Sans JP", Meiryo, sans-serif` |

- **Never ship a `.ttf`.** The current `public/fonts/HankenGrotesk-Variable.ttf`
  (128 KB) + Italic (136 KB) are removed; `format('truetype')` with no
  `unicode-range` means every visitor downloads 264 KB to read one column.
  Two latin-subset woff2 files replace it.
- **Japanese labels use the system stack — zero bytes.** A downloaded JP webfont
  would be megabytes to render six characters. If a Japanese label needs to
  match the Latin type optically, tune `letter-spacing`, not the font.
- Every family needs a **metric-adjusted fallback**
  (`ascent-override`/`descent-override`/`size-adjust`) so the swap causes no CLS.
- Type scale is deliberately restrained — this is a document, not a landing page:

| Element                | Size                                                   |
| ---------------------- | ------------------------------------------------------ |
| Hero statement         | `text-3xl` → `text-5xl`, `tracking-tight`, max 2 lines |
| Hero terminal panel    | `text-[13px]` mono                                     |
| Page title (`h1`)      | `text-2xl` → `text-3xl`                                |
| Section label          | `text-xs` mono, uppercase, `tracking-[0.14em]`         |
| Section heading (`h2`) | `text-xl` → `text-2xl`                                 |
| Card / item title      | `text-base`                                            |
| Body                   | `text-[15px]`, `leading-7`                             |
| Metadata               | `text-xs` mono                                         |

---

## Layout

**One axis for everything: `max-w-3xl` (56rem).** Sections, pages, header and
footer all share it.

An earlier version let catalogue sections break out to a wider container. The
result was two left edges on the same page and section labels that no longer
lined up with each other. One axis reads as deliberate. 56rem also fits the
GitHub contribution grid (53 columns) without a horizontal scrollbar.

Vertical rhythm between sections: `pt-12 pb-16` → `sm:pt-16 sm:pb-24`. Inside a
section: `space-y-3`. Sections are separated by **whitespace and a hairline**,
never by cards, gradients, or heavy dividers.

The GitHub grid is the one element wider than a phone screen. Contain it with
`overflow-x-auto` on the grid wrapper — never let it widen the page, because a
document-level horizontal scrollbar is the classic mobile bug.

### Section label (the signature element)

Every section opens with a mono micro-label: a numeral, a hairline, and an
optional Japanese word. This is the one place the design introduces a new
register — used nowhere else, so it lands.

```tsx
<p className="text-muted-foreground font-mono text-xs tracking-[0.14em] uppercase">
  01 — work<span className="text-accent">.</span>
</p>
```

---

## Components

### Surfaces

No default shadcn card look. Panels are translucent with hairline borders and
inset highlight. Prefer a bordered region over a filled box.

### Project rows

A catalogue row, not a card grid: hairline top border, hover reveals the
accent and expands detail with `grid-rows-[0fr]` → `[1fr]` (animates to
auto-height with zero JS measurement). Row metadata is mono.

Cursor-follow preview is **desktop, `pointer: fine` only**, portalled to
`body`, boundary-aware, transform-positioned (never `left/top`), rAF lerp, and
torn down on `mouseleave`. Must be skipped entirely when `prefers-reduced-motion`.

### Terminal panel (hero)

- `font-mono text-[13px]`, hairline border, translucent `--card`, `rounded-lg`.
- **Static content by default.** A single blinking caret is the only always-on
  animation (`caret-blink`, opacity only, 1.2s).
- Content is a short, truthful status block (currently building / stack /
  focus). It is not a fake shell and never fake-types content.
- No per-character typing animation on load, no rAF loop, no `will-change`.

### Mascot

One ambient companion, bottom corner, `pointer-events: none` unless it is
explicitly interactive. Honours `prefers-reduced-motion` by not starting.
Must never overlap nav, text, or the footer CTA.

### Buttons

- Primary: ink fill, paper text, `rounded-full`, `hover:-translate-y-0.5`.
- Secondary: hairline border, transparent fill, accent on hover.
- Physical depth is _not_ used (no neo-brutalist bevel) — it fights the paper
  concept and adds `box-shadow` paint area.

---

## Motion budget

| Interaction          | Technique                                                                                                    | Cost                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------- |
| Section reveal       | one-shot IntersectionObserver, `rootMargin: '0px 0px -40px 0px'`, then disconnect; `fade-in-up` 20px / 350ms | CSS only              |
| Stagger              | CSS var `--i`, `animation-delay: calc(var(--i) * 50ms)`                                                      | one shared class      |
| Nav hover            | per-character roll, `transitionDelay: ${i * 30}ms`, duplicated glyph pair + `overflow-hidden`                | CSS only              |
| Row expand           | `grid-rows-[0fr]` → `[1fr]`, 300ms                                                                           | CSS only              |
| Hairline draw        | `transform: scaleX()` on a pseudo-element                                                                    | CSS only              |
| Caret                | opacity blink                                                                                                | CSS only              |
| Status marquee       | duplicated track, `translateX(-50%)`, 30s, paused on hover, **hidden under `pointer: coarse`**               | transform-only        |
| Scroll progress ring | `useLenis` callback writes `strokeDashoffset`                                                                | one style write/frame |

Hard rules: only `transform`/`opacity`/`color` animate. No layout-affecting
property animates. Nothing animates from a `setInterval`.

---

## Smooth scroll

- Lenis mounts **only** when `(hover: hover) and (pointer: fine)` and
  `prefers-reduced-motion: no-preference`. Touch devices get native momentum.
- Tuned config — `lerp: 0.12`, `wheelMultiplier: 1`, `smoothWheel: true`,
  `syncTouch: false`. **Do not set `duration`** alongside `lerp`; `duration`
  silently wins and produces a long, laggy tween (the wrong-feeling-scroll bug).
- Anchor jumps call `scrollIntoView({ behavior: 'instant' })` and let Lenis
  animate to the target. `behavior: 'smooth'` fights Lenis and is the other
  cause of scroll "friction".
- Provide a scroll-spy with IntersectionObserver for the section rail, and
  guard against redundant `setState` (compare section id before writing).

---

## Chrome

- **Header**: `sticky top-0`, `h-14`, `bg-background/85 backdrop-blur-sm
supports-[backdrop-filter]:bg-background/55`. No scroll listener — no
  hide-on-scroll, no shrink, no JS. Fewer bytes, zero main-thread work.
- **Section rail** (home only): fixed left/right rail of hairline ticks on
  desktop, showing the active section. Hidden on mobile. `aria-hidden`.
- **Footer**: two columns — _Navigate_ / _Connect_ — each opened with the same
  mono micro-label used by section headings, so the footer reads as part of
  the same system. Framed by **two** hairlines (top of footer, top of
  copyright) rather than one, or a gradient.
- **Bottom fade**: plain `bg-gradient-to-t from-background to-transparent`,
  no `backdrop-filter`. `pointer-events-none`.
- **Command palette** is `dynamic(..., { ssr: false })` and mounts on first
  open only. cmdk must never be in the initial bundle.
- **Nav items come from one exported config.** The navbar, the command
  palette, the footer and the section rail all map over the same array.

---

## Accessibility

- Visible focus rings everywhere: `focus-visible:ring-ring/50 focus-visible:ring-[3px]`.
- Contrast: body text ≥ 7:1 against `--background`; `muted-foreground` ≥ 4.5:1.
  Hairline borders are decorative and exempt, but never the only boundary of a
  control.
- Every hover affordance has a keyboard/`focus-visible` twin.
- Marquee duplicates are `aria-hidden`.
- Skip-to-content link.
- One `h1` per page; sections use `h2`.
- Touch targets ≥ 44px; no hover-only information.

---

## Content rules

- Config-driven: all editable content lives in `src/config/*.tsx`.
- Never fake status. "Currently building" must be true this month.
- Case studies live in `src/data/projects/*.mdx` with `isPublished: true`.
- No blog (removed). No resume content on this domain — `/resume` is a
  placeholder for the future `resume.mehfooj.dev` pipeline.
