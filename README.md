# Shubham Gupta — Portfolio

A single-page portfolio for an AI-focused backend engineer, built around one idea: **dense, loud, technical, and rigorously gridded**. The visual language is called "Engineered Maximalism" — the portfolio equivalent of a well-typeset system diagram, not a magazine.

Positioning, copy and every metric on the site are sourced from `Shubham_Gupta_Updated.pdf`. If the resume changes, `src/lib/data.ts` is the only file that should need editing.

Live: [portfolio-kohl-iota-hhgp6wh6p9.vercel.app](https://portfolio-kohl-iota-hhgp6wh6p9.vercel.app)

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first config, no `tailwind.config.ts`) |
| UI motion | [Motion](https://motion.dev) 13 (`motion/react`) — scroll progress, overlays, popovers |
| Scroll | [Lenis](https://github.com/darkroomengineering/lenis) — single owner of smooth scroll |
| Counters | `@number-flow/react` |
| Theming | `next-themes` (dark/light) + three CSS-variable accent palettes |
| Icons | `lucide-react` (UI) + `react-icons` (brand marks) |
| Analytics-free, backend-free | No database, no API, no tracking. Fully static. |

---

## Design system

Everything lives in [`src/app/globals.css`](src/app/globals.css).

**Three type voices** — loaded via `next/font/google`:

| Voice | Font | Job |
| --- | --- | --- |
| Display | Archivo | Huge statements (`.display`, `.display-xl/lg/md`) |
| Text | Space Grotesk | Body and UI |
| Mono | JetBrains Mono | Labels, indices, metadata (`.mono`, `.mono-sm`) |

**Form rules:** 2px borders, hard offset shadows (`6px 6px 0`), zero blur, radius capped at 4px. These are what separate the look from a default shadcn template.

**Texture:** `.grid-paper` (1px graph grid), `.grain` (SVG turbulence overlay), `.halftone`, `.hatch`.

**Palettes:** three, switched by a `data-palette` attribute on `<html>`:

- `volt` — electric blue
- `hazard` — signal orange
- `signal` — acid lime

Each palette defines `--primary` (fill), `--primary-foreground` (text on that fill) and `--primary-ink` (accent text readable on the page background). All 66 colour pairings across 3 palettes × 2 themes are verified against WCAG AA by [`.archive/contrast-check.mjs`](.archive/contrast-check.mjs) — run `node .archive/contrast-check.mjs`.

---

## Motion contract

The site has a hard rule: **content is visible without JavaScript.**

Reveal animation is opt-in and additive. [`Reveal.tsx`](src/components/motion/Reveal.tsx) only hides an element when JS is running, motion is not reduced, `IntersectionObserver` exists, **and** the element is still below the fold. Anything already on screen is never touched, so there is no hide-then-show flash and no dependence on animation frames for content to appear.

`MetricCounter` follows the same rule: the real number is server-rendered, and only elements below the fold count up from zero.

A global `@media (prefers-reduced-motion: reduce)` block neutralises transforms, marquees and smooth scrolling.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx           # fonts, metadata, pre-paint palette script
│   ├── page.tsx             # composes the sections + Person JSON-LD
│   ├── globals.css          # the entire design system
│   ├── opengraph-image.tsx  # dynamic 1200x630 social card
│   ├── icon.svg  not-found.tsx  robots.ts  sitemap.ts
│   └── alt/                 # noindex design experiment (kept for reference)
├── components/
│   ├── Navbar  Hero  About  Skills  Experience  Projects  Contact  Footer
│   ├── StackSchematic.tsx   # the hero's architecture figure
│   ├── SmoothScroll.tsx     # Lenis + `scrollToSection()` helper
│   ├── ColorThemeContext.tsx
│   ├── motion/              # Reveal, MetricCounter
│   └── ui/                  # button, primitives
└── lib/
    ├── data.ts              # ⭐ all site content
    └── site.ts              # canonical origin
```

---

## Editing content

**All copy lives in [`src/lib/data.ts`](src/lib/data.ts).** No component edits needed for text changes.

Notable exports: `personalInfo`, `tagline`, `summary`, `availability`, `heroMetrics`, `aboutBio`, `stats`, `skillCategories`, `allTechnologies`, `experiences`, `projects`, `navLinks`, `education`.

The one rule to respect: `heroMetrics[].value` and `stats[].value` must be **real numbers** — they are server-rendered, and inflating them would put a false claim in the HTML.

### Project links

`Project.repo` and `Project.live` are both **optional**, and the UI adapts:

- `repo` present → a "View code" button.
- `repo` absent → a dashed "Repository available on request" chip. This exists because **no public repository is reachable for QueryLens or IdleWatch** (verified against the GitHub API). Linking to a guessed slug would hand a recruiter a 404.
- `live` present → a second "Live site" button.

Drop the real URLs in and the buttons appear automatically.

---

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

### Local environment notes

`npm install` can fail with `EPERM ... /Users/<you>/.npm` if that cache directory contains root-owned files. Work around it without `sudo`:

```bash
npm install --cache /tmp/npm-cache-accio
```

### Deployment

Deployed on Vercel from `main`. Set `NEXT_PUBLIC_SITE_URL` once a custom domain is attached — it drives `metadataBase`, the canonical URL, the sitemap and the OG image.

---

## Verification

```bash
node .archive/contrast-check.mjs   # 66 WCAG AA colour pairings
```

After any change, confirm the content is still in the served HTML — this is the check that matters most:

```bash
npm run build && npm run start
curl -s localhost:3000 | grep -c "Technical depth"
```

A `0` here means the page has regressed to client-only rendering.

---

## Notes & limitations

- **`/alt`** is an earlier editorial-brutalist experiment. It is `noindex`ed and excluded in `robots.ts`. It exists for reference only — delete `src/app/alt/` and `src/components/alt/` to remove it.
- **`.archive/`** holds the verification scripts and the three components removed during the redesign (`card.tsx`, `separator.tsx`, `badge.tsx`). It is gitignored.
- **OG image typography** uses Satori's default sans rather than Archivo — loading a custom font into `ImageResponse` would add a build-time network fetch. Revisit if brand consistency matters more than build fragility.
- **No contact form.** Delivery would require an email provider; a form that silently drops messages is worse than a mailto link, so the contact section ships a copy-to-clipboard address and direct links instead.
