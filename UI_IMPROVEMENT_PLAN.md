# Portfolio UI Overhaul — Code Audit & Improvement Plan

**Project:** `shubhamgupta/Desktop/portfolio` · Next.js portfolio, deployed on Vercel
**Audit date:** 23 Sep 2026
**Scope:** full code read-through, live-site verification, runtime visual audit, npm version verification for every proposed library

---

## 0. TL;DR

The codebase is clean, well-organised and data-driven — the architecture does **not** need a rewrite. What it needs is:

1. **Three urgent correctness fixes** before any visual work. The deployed site currently ships an **empty `<body>`** to crawlers, and every piece of content is gated behind a JavaScript animation that fails to run in throttled/background/reduced-motion contexts. A visual audit produced a screenshot of a near-blank dark rectangle. This is the single most damaging issue for a job-search portfolio.
2. **A real design system.** The reason it reads "minimal" is not just restraint — it is that there is exactly one typographic voice, one card, one elevation, one radius, one section rhythm, and one accent colour used at ~8% opacity. That is a *system absence*, not a style choice.
3. **A maximalist direction with discipline.** "Maximalism" fails when it means "more stuff". It works when it means *density, layering, texture, and loud colour held together by a rigid grid*. The plan below specifies that system concretely: 3 type voices, 3 loud colours, hard 2px borders with offset shadows, zero blur, grain + pattern layers, and a motion budget.
4. **A verified library stack.** Every version below was checked against the npm registry today, not recalled.

The starter already contains a taste signal for the direction: the uncommitted `/alt` route is an editorial-brutalist experiment (oversized display type, index-numbered rows, full-bleed colour block, `mix-blend-mode: difference` nav). The plan builds on those instincts rather than discarding them.

---

## 1. Current state

### 1.1 Verified stack

| Layer | Actual | Notes |
|---|---|---|
| Framework | Next.js `16.1.6` (App Router) | latest is `16.3.6` |
| Runtime | React `19.2.3` | latest is `19.3.0` |
| Language | TypeScript `^5` | latest is `7.0.2` (major jump — optional) |
| Styling | Tailwind CSS `^4` via `@tailwindcss/postcss`, `tw-animate-css`, `shadcn/tailwind.css` | no `tailwind.config.ts` (v4 uses CSS-first config) |
| Animation | `framer-motion` `12.36.0` | latest is `13.4.1` |
| Smooth scroll | `lenis` `1.3.18` | latest is `1.3.26` |
| Theming | `next-themes` `0.4.6` + custom `ColorThemeContext` (6 palettes) | |
| Primitives | `@base-ui/react` `1.3.0` behind shadcn `Button` / `Badge` | |
| Icons | `lucide-react` **and** `react-icons` | two sets, mixed styles |
| Misc | `react-type-animation`, `class-variance-authority`, `clsx`, `tailwind-merge` | |
| Deploy | Vercel — `portfolio-kohl-iota-hhgp6wh6p9.vercel.app` | a per-deployment URL, not a stable alias |

### 1.2 Structure

```
src/
├── app/
│   ├── layout.tsx        # ThemeProvider → ColorThemeProvider → SmoothScroll → children
│   ├── page.tsx          # composes 8 sections
│   ├── globals.css       # tokens, @theme, blob keyframes, .glass-card, .timeline-line
│   └── alt/              # UNC — alternate editorial route (layout + page)
├── components/
│   ├── Navbar / Hero / About / Skills / Experience / Projects / Contact / Footer
│   ├── SmoothScroll.tsx  ThemeProvider.tsx  ColorThemeContext.tsx
│   ├── alt/AltPage.tsx   # 598 lines, all styling inline via <style>{`…`}
│   └── ui/               # button, badge, card (unused), separator (unused)
└── lib/
    ├── data.ts           # single source of truth for all copy  ✅
    └── utils.ts          # cn()
```

**Architecture observations**

- Every single component is `"use client"`. There is not one Server Component in the project, so the App Router's main advantage (server-rendered HTML, zero client JS for static content) is entirely unused.
- `src/lib/data.ts` is genuinely good: typed exports, documented, and the only place copy lives. **Preserve and extend it.**
- `Navbar.tsx` has an uncommitted modification; `src/app/alt/`, `src/components/alt/`, `UNCONVENTIONAL_UI.md`, `CLAUDE_HELP.md` are untracked.
- Git: last commit `a3cb9ce` ("style: Transition UI from glassmorphism and strong glow effects to a solid, pixel-style aesthetic"). GitHub reports `pushed_at: 2026-03-16`.

---

## 2. Defects (evidence-backed)

### P0 — Blocks the site from doing its job

**P0-1 · The server-rendered HTML is empty.**

Evidence: fetched the live URL — `HTTP 200`, **10,698 bytes total**, and **zero** occurrences of any content string (`About`, `Technical`, `Work Experience`, `Featured`, `Get In Touch` all return 0 matches). Stripping `<script>` tags leaves **38 characters and 1 element** in `<body>`. Reproduced locally: dev-mode HTML is 31,997 bytes but excluding scripts the body is still 38 characters.

Root cause: [`ColorThemeContext.tsx:239`](src/components/ColorThemeContext.tsx:239)

```tsx
// Avoid flash of incorrect palette
if (!mounted) return null;
```

That provider wraps the whole app in [`layout.tsx`](src/app/layout.tsx:51), so during SSR — and on the client's first render — the entire tree renders as `null`.

Impact: Google and every social/link-preview crawler see a blank page; LCP cannot begin until JS parses and mounts; pasting the link into Slack/LinkedIn/WhatsApp produces an empty preview card. For a portfolio whose entire purpose is to be found and shared, this is the highest-value fix in the document.

Fix: never gate children on `mounted`. Apply the palette the way `next-themes` does — a small blocking inline `<script>` in `<head>` that reads `localStorage` and sets a `data-palette` attribute on `<html>` before paint — then define palettes as `[data-palette="emerald"] { --primary: … }` rules in `globals.css`. Move the palette definitions out of TS and into CSS so they are static, cacheable, and SSR-safe. (Keep the TS list only for the picker UI.)

**P0-2 · All content is hidden behind JS animation, and the resting state is invisible.**

Evidence: runtime audit of the running dev server at a 1440×900 viewport, clean load, 5s hydration wait — **47 text-bearing elements computed `opacity: 0`**, including the hero container, eyebrow, `h1`, paragraph, CTA row and three stat cards. The fixed nav computed `transform: translateY(-100px)` (rect `top: -100`). The captured screenshot is a near-solid `rgb(15,23,42)` field with the Next.js dev badge as the only visible pixel. No content string appeared anywhere in the render.

Root cause: every section uses Framer Motion `initial={{opacity:0, y:…}}` (or `initial="hidden"` variants) and relies on an rAF-driven animation to reveal it. There is **no `prefers-reduced-motion` handling anywhere in `src/`** (verified by grep) and no CSS fallback that makes content visible. So content visibility depends on JavaScript running *and* animation frames being serviced.

Impact: reduced-motion users, a backgrounded tab, battery-saver throttling, some screenshot/preview bots, and any JS failure all produce a blank page. Compounding P0-1, the site has *no* path to visible content that doesn't require a working rAF loop.

Fix: invert the pattern. Content must be **visible in static HTML by default**; motion is applied as an enhancement. Concretely: (a) replace `initial={{opacity:0}}` reveals with CSS classes that animate *from* a hidden offset but *rest at* visible, driven by `IntersectionObserver` adding a class — if JS never runs, content is still visible; (b) wrap all decorative motion in `useReducedMotion()`; (c) add a global `@media (prefers-reduced-motion: reduce)` block that neutralises transforms, marquees and smooth scroll.

**P0-3 · The deployment is ~6 months stale and on an ephemeral URL.**

Evidence: GitHub `pushed_at: 2026-03-16`; local tree has an uncommitted Navbar change and untracked `/alt` route. The live URL is a per-deployment Vercel hostname (`portfolio-kohl-iota-hhgp6wh6p9.vercel.app`), which changes on redeploy and reads as unfinished on a CV.

Fix: commit the working tree, redeploy, then attach a stable production alias and ideally a custom domain. This is a 15-minute task and should ship before any redesign.

### P1 — Correctness and coherence

**P1-1 · The font pipeline is half-broken.**

- [`globals.css:8-14`](src/app/globals.css:8) declares `@font-face { font-family:"Space Grotesk"; src: url("https://fonts.googleapis.com/css2?family=Space+Grotesk…") }`. A CSS stylesheet cannot be a font `src`. The rule is invalid and inert — the font actually loads via `next/font/google` in `layout.tsx`, so nothing looks broken, but the rule is misleading and triggers a wasted request.
- [`globals.css:20`](src/app/globals.css:20) sets `--font-mono: var(--font-geist-mono)`. `--font-geist-mono` is **never defined anywhere in the project**, so `font-mono` silently falls back to the browser default monospace. Every monospace label — the nav's `alt view` chip and the entire `/alt` page's mono metadata system — is therefore unstyled by accident rather than by choice.
- `README.md` still advertises "Inter font". It is Space Grotesk.

**P1-2 · Three scroll systems are fighting each other.**

`html { scroll-smooth }` (globals.css) + Lenis hijacking scroll via an rAF loop (`SmoothScroll.tsx`) + imperative `scrollIntoView({behavior:"smooth"})` in `Navbar.tsx` and `Hero.tsx`. The audit observed `<html class="lenis lenis-scrolling">` with `scrollY` pinned at `0` for both `window.scrollTo()` and wheel events — Lenis was initialised but not servicing scroll. Competing smoothing is also why anchor jumps feel laggy.

Fix: one owner. Keep Lenis, drop `scroll-smooth`, route anchors through `lenis.scrollTo(target, { offset: -80 })`, and when GSAP arrives, wire `lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker.add(t => lenis.raf(t * 1000))`.

**P1-3 · Hero stacking is fragile.**

Four decorative layers plus three animated blobs plus a celestial body are positioned with `-z-20`, `-z-10`, an inline `zIndex:-15`, and `-z-15` — the last of which is not a real Tailwind utility (it's dead markup). The mountain SVG is `absolute bottom-0` at `height:55%`, so on short viewports it collides with the centred text block. One `isolate` container with named layers fixes this permanently.

**P1-4 · Accessibility gaps.**

| Issue | Location |
|---|---|
| No skip-to-content link | global |
| No `prefers-reduced-motion` support at all | global — see P0-2 |
| `cursor: none !important` on every element with no keyboard/touch fallback | `AltPage.tsx:140-144` |
| Decorative SVGs (starfield, mountains, blobs) have no `aria-hidden` | `Hero.tsx` |
| No visible focus-ring styling beyond browser defaults | global |
| No `aria-live` feedback for the contact CTA | `Contact.tsx` |
| Stats and timeline dots convey meaning visually only | `About.tsx`, `Experience.tsx` |

Credit where due: `Contact`, `Footer` and `Navbar` do carry `aria-label`s on their icon-only controls.

### P2 — Dead code, drift, and design-system absence

**Dead code / drift**

- `education` is exported from `data.ts:278` and **never rendered anywhere** — a full credentials block (B.Tech, IIIT Sonepat, CGPA, coursework) sitting unused.
- `src/components/ui/card.tsx` and `separator.tsx` are unused (no imports outside themselves).
- `Navbar.tsx:168-173` renders an **`alt view`** link to `/alt` in the production navigation — an internal experiment exposed to recruiters.
- Two icon libraries with incompatible visual languages. The Skills grid literally mixes filled brand glyphs (`SiNodedotjs`, `SiPostgresql`) with Lucide outline icons cast through `as unknown as IconType` (`Database`, `ShieldCheck`, `Cloud`) — the double casts in `data.ts` are the symptom.
- `About`, `Experience`, `Skills`, `Projects`, `Contact` all declare a `useRef` and some call `useInView` whose return value is never used — dead state and lint noise.
- `.glass-card` is named for the glassmorphism era; the CSS is now a solid pixel card. Naming drift across the whole component set.
- `README.md` documents a stack and structure that no longer exist: "Inter font", a `tailwind.config.ts` (v4 has none), `/src/app/globals.css` "blob keyframes and timeline styles" (still true) but "8 sections" with a hero CTA called "Contact" (it's actually "View My Work"). It also claims an MIT `LICENSE` file that is not in the repo.

**Why it reads minimal (the real design problem)**

- **One rhythm.** Every section is `py-20 sm:py-28`. Every heading is `text-3xl sm:text-4xl font-bold` + the same 24px × 4px `bg-primary` bar. Nothing is allowed to be a *moment*.
- **One voice.** Space Grotesk 400–700 for everything. No display face, no monospace, no contrast between "shout" and "whisper".
- **One surface.** Every card: 16px radius, 1px border, `0 1px 3px` shadow, 2px hover lift. One elevation level across the whole site.
- **One accent at 8% opacity.** Colour appears as `--primary` on single words and as `--chart-*` blobs at 4–8% opacity — effectively monochrome.
- **One rhythm device.** Alternating `bg-secondary/30` bands.
- **Readability bug.** `Experience.tsx` applies `md:text-right` to bulleted lists on left-hand cards. The bullet markers stay left while the text is pushed right, so markers detach from their text and prose scan-order breaks.
- **Hero fragility.** The typewriter sits in a fixed `h-10` container — it clips at larger browser text-zoom settings.
- **Thin evidence.** Only 3 projects, all linking to GitHub, no visuals, no case-study structure, no outcomes.
- **No brand asset.** `public/` still holds create-next-app's `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`. There is no favicon, no `apple-icon`, no OG image.

**SEO / meta**

- `layout.tsx` metadata has no `metadataBase`, no `openGraph.images`, no `twitter` card, no canonical.
- No `sitemap.ts`, no `robots.ts`, no `manifest.ts`.
- No dynamic OG image generation — the thing a recruiter actually sees when your link is pasted into a chat.
- No structured data (`Person` schema with `sameAs`).

**Content currency (worth a decision, not a bug)**

Today is Sep 2026; the most recent role listed ended Dec 2025 (Simpplr, Aug–Dec 2025) — a ~9-month gap that the site neither addresses nor frames. The hero/stat copy says "3+ years", which was accurate at the time of writing but should be recalculated. `Footer.tsx` computes the year dynamically (good), but `AltPage.tsx:590` hardcodes "© 2026".

---

## 3. What to keep

| Keep | Why |
|---|---|
| `src/lib/data.ts` as the single content source | Already excellent; extend it, don't replace it |
| Lenis smooth scroll | Right tool, wrong integration — fix the wiring (P1-2) |
| The 6-palette theming *capability* | Becomes a genuine feature under a colour-led maximalist direction — but re-implement SSR-safe and probably trim to 3 |
| Dark/light toggle | Keep; the direction suits dark |
| The `/alt` editorial instincts | Oversized display type, index-numbered rows, full-bleed colour, blend-mode nav — the closest thing to the target already in the repo |
| The solid pixel-card language (border + hard shadow, no blur) | Correct foundation for maximalism; it needs to be bolder, not removed |
| Section `id`s + `navLinks` mapping | Keep the contract intact through the rebuild |
| Semantic HTML + existing `aria-label`s | Preserve while extending |

---

## 4. Target direction — "Engineered Maximalism"

**One-line brief:** the portfolio equivalent of a beautifully typeset system diagram — dense, loud, technical, and rigorously gridded. Not a magazine, not a collage.

### 4.1 Five principles that keep maximalism from becoming noise

1. **Density, but on a rigid grid.** Maximalism = *more information per screen*, not *more decoration*. Everything sits on a 12-column grid with visible rules (1px hairlines, dashed dividers, corner registration marks). The grid is what makes density legible.
2. **Exactly one focal element per viewport.** Each screen has one thing that is allowed to be huge — a 12vw wordmark, a full-bleed colour block, a landscape illustration. Everything else is deliberately smaller and quieter.
3. **Loud colour, disciplined count.** Three loud colours maximum, plus ink and paper. Saturation lives in flat fills, never in gradients-for-gradients'-sake.
4. **Texture and pattern as structure.** Halftone dots, film grain, 1px graph paper, ruler ticks, barcode strips, index numbers, `[01]`-style notation. This is the layer that reads "designed" instead of "cluttered".
5. **Motion as a system, not decoration.** Motion must express hierarchy or state (a rail that pins, a number that counts, a list that reflows) — never ambient motion for its own sake. Cap concurrent animated elements per viewport.

### 4.2 Tokens to introduce

**Colour** — anchor in the `/alt` experiment's own palette so the direction feels authored, not imported:

| Token | Value | Role |
|---|---|---|
| `--ink` | `#0B0B0C` | near-black, borders, type |
| `--paper` | `#F4F1ED` | warm off-white ground (from `/alt`) |
| `--volt` | `#2B4EFF` | electric blue — structure, links |
| `--hazard` | `#FF4D00` | orange-red — action, focus (from `/alt`'s `#F23C13`) |
| `--signal` | `#C8F135` | acid lime — highlights, live status |

Contrast must be verified per pair at implementation time (target ≥ 4.5:1 body, ≥ 3:1 large text). Because a palette switcher multiplies surfaces by 6, **trim to 3 well-tuned palettes**.

**Typography — three voices, three jobs:**

| Voice | Candidate | Job |
|---|---|---|
| Display | `Archivo` (variable, wide weights) or `Bricolage Grotesque` | Huge statements, 8–14vw, tracking `-0.04em`, line-height `0.85` |
| Text | `Space Grotesk` (already loaded) | Body and UI; keep it, it's working |
| Mono | `JetBrains Mono` | Labels, indices, metadata, timestamps, code, "SYSTEM" notation |

Load all three via `next/font/google` in the root layout, bind real CSS variables, and **delete the fake `@font-face`**. Fluid scale via `clamp()` with a ≥1.5 ratio between steps.

**Form:**

- Radius: `0`, `2px`, `4px` only — the current 16px default must go; it is the fastest way to make the site stop looking like a shadcn template.
- Borders: `2px solid var(--ink)` — always visible, never hazy.
- Shadows: **hard offset only** — `6px 6px 0 var(--ink)`, `10px 10px 0 var(--ink)`. No blur values anywhere.
- Texture overlays: an SVG `feTurbulence` grain layer at 3–6% opacity; a halftone-dot pattern; a 1px graph grid at 4% opacity.
- Buttons: rectangular, 2px border, hard shadow that collapses on press (physical, not glowy).

### 4.3 Alternative directions

If the above doesn't match taste, two coherent fallbacks — both already latent in the repo:

- **(B) Editorial Brutalist** — commit fully to what `/alt` started: cream paper, one saturated accent, enormous serif/condensed display type, index-numbered rows, `mix-blend-mode: difference` chrome, generous editorial whitespace. Maximalism through *scale* rather than *density*.
- **(C) Terminal / Signal** — dark phosphor ground, everything monospace, dense data panels and status strips, ASCII/box-drawing dividers, a live "system status" header. Maximalism through *information*.

(A) and (B) can also be merged: editorial scale for hero moments + engineered density for the sections.

---

## 5. Library plan (npm versions verified today)

### Add

| Package | Latest | Role |
|---|---|---|
| `motion` | **13.4.1** | Successor package to `framer-motion` (identical version number, import from `motion/react`). Has first-class `useReducedMotion`, `useScroll`, `useTransform`, layout animations. **This is the standard motion layer.** |
| `gsap` | **3.15.0** | ScrollTrigger is bundled and free — pinned sections, scroll-scrubbed timelines, stagger orchestration. The thing Motion cannot do. |
| `@gsap/react` | **2.1.2** | `useGSAP()` hook — correct cleanup/SSR handling. |
| `@react-three/fiber` | **9.8.0** | React renderer for three.js — the 3D hero moment. |
| `@react-three/drei` | **10.7.8** | `Float`, `Environment`, `Text`, `MeshTransmissionMaterial`, viewport helpers. |
| `@react-three/postprocessing` | **3.1.2** | Bloom / chromatic aberration / noise for a signature 3D moment. Pairs with `postprocessing`. |
| `three` | **0.186.0** | Peer dependency for the three above. |
| `split-type` | **0.3.4** | Splits text into chars/words/lines (MIT) for per-line staggered reveals. |
| `@number-flow/react` | **0.6.2** | Animated digit transitions — makes the stat/metric numbers feel engineered rather than static. |
| `react-parallax-tilt` | **1.7.344** | GPU 3D tilt on project cards. Optional — achievable with pure CSS transforms for less JS. |
| `@tsparticles/react` | **4.4.0** | Particle field. Optional; evaluate against the perf budget. |
| `simplex-noise` | **4.0.3** | Organic noise for a morphing blob / shader background. Optional. |
| `next-view-transitions` | **0.3.5** | Only worth adding if real multi-page routes (case studies) ship. |

### Upgrade

| Package | From → To | Note |
|---|---|---|
| `next` | `16.1.6` → `16.3.6` | patch/minor, low risk |
| `react` / `react-dom` | `19.2.3` → `19.3.0` | minor, low risk |
| `framer-motion` | `12.36.0` → migrate to `motion@13.4.1` | update imports to `motion/react` |
| `lenis` | `1.3.18` → `1.3.26` | needed for the GSAP ticker integration |
| `tailwindcss` | `^4` → `4.3.3` | resolves within the existing range |
| `typescript` | `^5` → `7.0.2` | **major** — treat as a separate, optional migration after the UI work |

### Remove / consolidate

- `shadcn` as a **runtime dependency** — it is a CLI, not a library to ship.
- `react-type-animation` if the hero moves to a SplitType/GSAP treatment (keep it if the typewriter stays — it is tiny).
- One icon library. Prefer `lucide-react` for UI and keep `react-icons` **only** for brand logos, with consistent treatment — or replace brand glyphs with typed text labels in the mono voice, which suits the direction better and removes the awkward `as unknown as IconType` casts.
- Dead components `ui/card.tsx`, `ui/separator.tsx`.
- `public/{next,vercel,file,globe,window}.svg`.

### Copy-paste component sources (no install)

[Aceternity UI](https://ui.aceternity.com) · [Magic UI](https://magicui.design) · [React Bits](https://reactbits.dev) · [Cult UI](https://21st.dev/@cult-ui/library/cult-ui) · [21st.dev](https://21st.dev/) — take specific patterns (spotlight cards, marquee, animated beams, gradient text) rather than adopting a whole library, so the result stays bespoke.

### What NOT to add

Do not add a component kit wholesale (MUI/Chakra/Ant). Adopting one would visually reset the site to a generic look and fight the existing Tailwind v4 token layer. Use the copy-paste sources above for individual patterns only.

---

## 6. Section-by-section redesign

Each entry: **current → target**, the technique, and its acceptance check.

**Global chrome — Navbar**
*Current:* fixed bar, `SG` monogram, 5 text links with an underline sweep, palette popover, theme toggle, and an internal `alt view` link.
*Target:* a two-row instrument panel. Row 1 = mono metadata strip (`LOC 28.61°N 77.20°E` · local time · `● OPEN TO WORK` status pill). Row 2 = index-numbered nav (`01 About`), a real **Résumé** button, the palette control promoted to a labelled segmented switch, and a 2px scroll-progress rail tied to Lenis.
*Remove:* the `alt view` link. *Acceptance:* nav fully visible on first paint (no `translateY(-100px)` resting state); keyboard-reachable in logical order.

**Hero**
*Current:* typewriter subtitle in a fixed `h-10`, centred name, 4 decorative SVG layers, 3 blobs, 2 CTAs.
*Target:* asymmetric split grid. Left: an eyebrow, a display-scale name (10–14vw, tight tracking), a one-line positioning statement, an availability chip, and a **metrics strip** (`3.5 yrs` · `100K+ concurrent` · `40% latency ↓`) rendered with animated counters. Right: the landscape illustration, re-authored as a hard-edged, flat-fill, 4-layer ridge system with visible hairlines and a halftone sky — **not** 4–8% opacity washes. Add the grain overlay across the section. Optional Phase 4: a lazy-loaded R3F wireframe behind the type with bloom.
*Remove:* the fixed-height typewriter container, the `-z-15` dead class, the fragile z-index ladder.
*Acceptance:* all hero text present and visible in the SSR HTML; no layout shift as the counter animates; readable at 200% text zoom.

**About**
*Current:* two-column bio + gradient-ring avatar, then 4 uniform stat cards.
*Target:* sticky portrait card on the left (2px border, hard offset shadow, duotone/halftone image treatment, a mono caption block with role/location/years). Right: the bio in the text voice, then the four stats at **display scale** with animated digits, separated by dashed rules. Finally, render the **unused `education` data** as a credentials tile — B.Tech IT, IIIT Sonepat, 2019–2023, CGPA 7.9 — a block that currently doesn't exist on the site at all.
*Acceptance:* `education` is rendered from `data.ts`, not hardcoded; stats have text alternatives.

**Skills**
*Current:* 6 near-identical white boxes of badges, mixed icon styles.
*Target:* a dense **capability matrix** — a technical table treatment with mono column headers, hairline rules, hover states that reveal a one-line "what I actually shipped with it" per technology, and a two-direction marquee of tech names at the bottom. This is where the "information density" strand of maximalism pays off, and it doubles as evidence of depth.
*Acceptance:* readable at 360px width (matrix collapses to labelled stacked groups); hover/focus reveals are keyboard-accessible.

**Experience**
*Current:* alternating left/right timeline, uniform cards, `md:text-right` bullets.
*Target:* sticky-scroll narrative. Left rail pins the company/role/period; the right column scrolls its highlights, revealing one line at a time. Each role leads with a **headline metric** at display scale (e.g. `35% ↓ p99`). Horizontal hairlines and index numbers (`[01]`–`[05]`) provide structure.
*Library:* GSAP ScrollTrigger pinning + `split-type` per-line reveal.
*Fix:* drop `md:text-right` on bullet lists entirely.
*Acceptance:* all 5 roles present in SSR HTML; pinning degrades to a normal stacked layout under `prefers-reduced-motion` and below `md`.

**Projects**
*Current:* 3 uniform cards, badge row, GitHub button.
*Target:* case-study rows instead of cards. Desktop: a horizontally pinned scroll where each project is a full panel — cover visual, problem → decision → outcome, stack chips, and **two** links (live + repo). Mobile: stacked full-bleed panels. Give each project one hard number.
*Library:* GSAP ScrollTrigger horizontal pin; `react-parallax-tilt` optional.
*Content gap:* there is no cover art. Either supply real screenshots/diagrams or generate poster-style covers in the new aesthetic.
*Acceptance:* every project has a non-GitHub link or an explicit explanation; horizontal scroll never traps keyboard users (provide a fallback list).

**Contact**
*Current:* heading, paragraph, `mailto:` button, 2 social icons.
*Target:* display-scale CTA (`LET'S BUILD SOMETHING`), a **real form** (Server Action + honeypot + rate limit — no third-party service needed), plus résumé download, email, and a scheduler link. Add `aria-live` feedback states (idle / sending / sent / error).
*Acceptance:* form works with JS disabled up to the point of a `<noscript>` message; validation errors are announced; no PII logged.

**Footer**
*Current:* one line of copyright + a back-to-top button.
*Target:* a maximalist sign-off — a wordmark that spans the full container width, an index of every section, a stacked "built with" credit list in mono, local time, and a back-to-top control. Replace the `❤️` line.
*Acceptance:* wordmark does not cause horizontal overflow at 360px.

**New routes / assets**
- `app/opengraph-image.tsx` — dynamic OG image rendered in the new aesthetic (this is the highest-leverage single SEO asset for link sharing).
- `app/icon.svg` + `apple-icon` — a real monogram.
- `app/sitemap.ts`, `app/robots.ts`, `manifest.ts`.
- `app/not-found.tsx` — a styled 404.
- Optional: `/work/[slug]` deep-dive pages (this is what makes `next-view-transitions` worth adding).
- Decide on `/alt`: keep it as a `noindex` `/lab` route, or delete it.

---

## 7. Accessibility, performance, and SEO guardrails

### Accessibility (target: Lighthouse a11y ≥ 98, axe clean)

1. **Content visible without JS** — the P0-2 fix; also the accessibility fix, since screen readers and reduced-motion users are the first casualties.
2. `@media (prefers-reduced-motion: reduce)` neutralises transforms, marquees, parallax, counter animation and smooth scroll globally; per-component `useReducedMotion()` for anything GSAP drives.
3. Skip-to-content link as the first focusable element.
4. One visible focus treatment (`2px solid var(--hazard)` + 2px offset) applied globally.
5. `aria-hidden="true"` on all decorative SVG (starfield, ridges, blobs, grain, patterns).
6. Any `cursor: none` treatment must ship a text-cursor fallback, be disabled below `md` and under reduced-motion, and never remove pointer affordance from form fields.
7. Contrast verified for **every** palette × theme combination; documented in the styleguide route.
8. Numbers get text alternatives (`aria-label` on stat blocks).
9. Interactive reveals (skills matrix, project panels) must be keyboard-operable, not hover-only.

### Performance budget

| Metric | Target |
|---|---|
| LCP (mobile, throttled 4G) | < 2.0 s |
| CLS | < 0.05 |
| INP | < 200 ms |
| First-load JS (gzip) | ≤ 250 KB |
| Texture/image payload | ≤ 1.2 MB above the fold |

R3F + drei + postprocessing + three is roughly 150 KB gzip on its own, and GSAP + Motion + Lenis adds more. This materially constrains the design. Mitigations, all mandatory if 3D ships:

- Lazy-load the WebGL scene with `next/dynamic(..., { ssr: false })`, mounted only when the hero enters the viewport **and** the device passes a capability check (`hardwareConcurrency`, `deviceMemory`, `prefers-reduced-motion`, save-data).
- Ship a static poster image as the fallback so there is never an empty box.
- Cap device pixel ratio on the canvas (`dpr={[1, 1.5]}`), and pause the render loop when the tab is hidden or the canvas is off-screen.
- No shader/3D work on the critical path — never block first paint for a visual flourish.

Also in `next.config.ts`: `optimizePackageImports` for `lucide-react`, `react-icons` and `gsap`; `images.formats`; `poweredByHeader: false`; `productionBrowserSourceMaps: false`; a baseline security-header set. Consider `@next/bundle-analyzer` in CI to keep the budget honest.

### SEO

- `metadataBase` set to the production domain; canonical URL.
- OG + Twitter card with a **dynamic** `opengraph-image.tsx` (1000×525-aware, rendered in the new aesthetic).
- `sitemap.ts`, `robots.ts`, `manifest.ts`.
- JSON-LD `Person` schema: name, jobTitle, `sameAs` (GitHub, LinkedIn), `knowsAbout` (Node.js, NestJS, Kafka, AWS…).
- Real content in the HTML (P0-1) — without it, none of the above matters.

---

## 8. Phased roadmap

Deliberately ordered so that **correctness ships before beauty**, and so `main` is deployable after every phase.

### Phase 0 — Foundation & fixes · 0.5–1 day
1. Fix P0-1: move palettes to CSS + a blocking inline script; stop returning `null` from `ColorThemeProvider`.
2. Fix P0-2: invert all reveals so content rests visible; add reduced-motion support.
3. Fix P1-1 (delete fake `@font-face`, bind a real `--font-mono`), P1-2 (single scroll owner), P1-3 (one isolated hero background).
4. Commit and redeploy (P0-3); attach a stable alias.
5. Add metadata, OG image, sitemap, robots, icon; delete create-next-app assets.
6. Remove the `alt view` link from production nav.

**Exit tests:** `curl` the deployed URL and confirm content strings appear in the HTML; axe reports no critical violations; Lighthouse a11y ≥ 95, perf ≥ 90; the page renders visibly with JS disabled after first paint.

### Phase 1 — Design system · 1–2 days
1. Author the token layer: colour (3 palettes × 2 modes), three type voices, fluid scale, spacing, borders, hard shadows, radii, motion durations/easings.
2. Build primitives: `HardCard`, `Label` (mono), `IndexNumber`, `Marquee`, `Grain`, `GraphGrid`, `StatusPill`, `MetricCounter`, `Rule`.
3. Rebuild the palette switcher SSR-safe; trim palettes to 3.
4. Delete dead code (`ui/card.tsx`, `ui/separator.tsx`, unused refs, default public SVGs); consolidate icon usage; rewrite `README.md` to match reality.
5. Ship a `/styleguide` route rendering every primitive, both themes, all palettes.

**Exit test:** the styleguide route renders every primitive with no layout defects at 360 / 768 / 1440 px, and every token is used by at least one primitive.

### Phase 2 — Section rebuilds · 3–5 days
Order: Hero → Experience → Projects → Skills → About → Contact → Footer → Navbar shell.
One section per commit, verified at 360 / 768 / 1440 px with a fresh hard reload (this is what catches the animation-gating class of bug).

**Exit test:** every section renders its content in SSR HTML; no horizontal overflow at 360px; no content depends on rAF to be visible.

### Phase 3 — Motion layer · 1–2 days
GSAP + ScrollTrigger pinning (Experience, Projects), SplitType reveals, magnetic CTAs, animated counters, scroll-progress rail. Lenis wired into the GSAP ticker.
**Exit test:** with `prefers-reduced-motion: reduce`, every section is fully readable, static, and complete — no pinned sections stranded mid-animation.

### Phase 4 — 3D / signature moment · 1–3 days
R3F hero scene (lazy, capability-gated, poster fallback) or a lightweight GLSL/simplex-noise background if the perf budget can't take WebGL. Optional `@tsparticles` field.
**Exit test:** Lighthouse perf ≥ 85 on mobile **with** the 3D active; JS ≤ 250 KB gzip; scene pauses when off-screen or tab-hidden.

### Phase 5 — Content depth & launch · 1–2 days
Real case studies for each project (`/work/[slug]`), project cover art, refreshed stats and availability copy, analytics, custom domain, cross-device + cross-browser QA, README/LICENSE cleanup, final deploy.

---

## 9. Risks and guardrails

| Risk | Guardrail |
|---|---|
| Maximalism degrades into noise | Rigid 12-column grid; max 3 loud colours; exactly one focal element per viewport; every decorative element must be removable without breaking comprehension |
| WebGL/GSAP blows the JS budget | Hard 250 KB gzip ceiling enforced by bundle analyzer; 3D lazy + capability-gated with a static poster; measure on a throttled profile, not on a dev machine |
| 6 palettes × 2 themes = 12 surface combinations to QA | Cut to 3 palettes; document contrast for each |
| Big-bang rewrite breaks a live, working site | Work on a branch; keep `main` deployable; ship phase by phase; Phase 0 ships alone |
| The redesign buries the job-search essentials | Impact metrics, and a one-click path to résumé + contact, stay above the fold on both mobile and desktop, in every phase |
| Motion sickness / accessibility regression | Reduced-motion parity is an exit test, not a nice-to-have |
| Taste mismatch discovered late | Build the `/styleguide` route in Phase 1 and get sign-off on tokens *before* touching sections |
| Content gap blocks the project section | Decide early: real screenshots/diagrams vs generated poster covers |

---

## 10. Open decisions for you

1. **Aesthetic direction** — (A) Engineered Maximalism (recommended), (B) Editorial Brutalist (what `/alt` started), (C) Terminal / Signal. Or (A)+(B) hybrid.
2. **Palette switcher** — keep all 6, or cut to 3 well-tuned ones? Keep dark mode? (Recommendation: 3 palettes, keep dark.)
3. **3D** — full R3F hero scene, a lightweight shader background, or none? This is the biggest single lever on bundle size.
4. **Project visuals** — do you have screenshots, diagrams, or demo recordings, or should the covers be generated in the new aesthetic?
5. **Content refresh** — the most recent role ended Dec 2025 and the site doesn't address the gap; "3+ years" needs recalculating (it's now closer to 4). Also: are there 1–2 additional projects worth adding, and do any have live URLs rather than GitHub-only?
6. **`/alt` route** — keep as a `noindex` lab, or delete it?

---

## Appendix A — Audit evidence

| Claim | How it was verified |
|---|---|
| Live HTML contains no content | `curl` of the production URL: 10,698 bytes, 0 matches for content strings, 38 chars / 1 element in `<body>` after stripping scripts |
| Same defect locally | `curl` of `localhost:3000`: 31,997 bytes total, 38 chars / 1 element in `<body>` after stripping scripts |
| 47 elements stuck at `opacity: 0` | Runtime DOM sweep at 1440×900, clean load, 5 s hydration wait |
| Nav off-screen on load | Computed `transform: translateY(-100px)`, rect `top: -100` |
| Lenis not servicing scroll | `<html class="lenis lenis-scrolling">` present; `scrollY` = 0 after both `window.scrollTo` and wheel events |
| No reduced-motion handling | grep for `prefers-reduced-motion`/`useReducedMotion` across `src/` → 0 matches |
| No horizontal overflow | `scrollWidth` 1440 == viewport at 1440×900 |
| Live screenshot essentially blank | Captured `ui-audit/home-desktop.png` (2880×1800) — near-solid `rgb(15,23,42)` with only the Next.js dev badge |
| Deployment staleness | `git log` last commit `a3cb9ce`; GitHub `pushed_at: 2026-03-16`; local tree dirty + 4 untracked paths |
| Library versions | npm registry `latest` dist-tag queried per package on 2026-09-23 |

**Raw evidence file:** [`ui-audit/home-desktop.png`](ui-audit/home-desktop.png)

### Coverage limits (stated honestly)

- The visual audit captured **only** a desktop home screenshot. The mobile home, both `/alt` viewports, and dark/light theme variants were **not** captured — the browser session lost its debugger permission mid-run. Claims about those remain code-derived, not visually confirmed.
- Only one browser attempt was made; the remaining captures are worthwhile before Phase 2 but do not block Phase 0/1.
- Screenshot rendering was viewport-only (full-page capture was unavailable in that runtime), at 2× DPR.
- No Lighthouse or bundle-size measurement has been run yet — the performance budget in §7 is a target, not a measurement. Measure before Phase 2 so there is a baseline to compare against.

---

# IMPLEMENTATION STATUS — 23 Sep 2026

Phases 0–2 and 5 (partial) are **implemented and building clean**. Below is exactly what shipped, where it deviated from the plan above, and what is still open.

## Shipped

**Phase 0 — Foundation & fixes**

| Fix | Status | Evidence |
|---|---|---|
| P0-1 Empty SSR body | **Fixed** | Body text content went from **38 chars / 1 element** to **118,585 chars / 210 elements**. `ColorThemeProvider` no longer returns `null`; palettes are CSS rules applied by a pre-paint inline script. |
| P0-2 Content gated behind JS animation | **Fixed** | `Reveal` only hides elements that are below the fold, with JS, IO and motion all available. Verified: 0 text elements stuck at `opacity: 0`. |
| P1-1 Broken font pipeline | **Fixed** | Fake `@font-face` deleted; `--font-mono` now bound to JetBrains Mono via `next/font`. |
| P1-2 Three competing scroll systems | **Fixed** | Lenis is the single owner; `scroll-smooth` removed; `scrollToSection()` drives anchors and falls back to native scrolling under reduced motion. |
| P1-3 Fragile hero stacking | **Fixed** | One `isolate` container with explicit layers; the invalid `-z-15` class is gone. |
| P1-4 Accessibility | **Fixed** | Skip link, reduced-motion contract, `aria-hidden` on decorative SVG, `role="status"` for copy feedback, one measured focus treatment. |
| SEO/meta | **Fixed** | `metadataBase`, OG + Twitter cards, dynamic `opengraph-image`, `sitemap.ts`, `robots.ts`, `icon.svg`, Person JSON-LD, styled 404. Verified: all routes 200, unknown routes 404. |
| Security headers | **Added** | `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`; `X-Powered-By` removed. Verified in served response. |

**Phase 1 — Design system.** Full token layer in `globals.css`: 3 type voices (Archivo / Space Grotesk / JetBrains Mono), near-zero radii, hard offset shadows, grain + graph-paper + halftone textures, marquee and reveal primitives. Primitives module (`Section`, `SectionHeading`, `Label`, `Index`, `Rule`, `HardCard`, `StatusPill`, `Pill`, `Marquee`, `Grain`) plus `Reveal`, `MetricCounter`, rebuilt `Button`/`ButtonLink`.

**Phase 2 — Section rebuilds.** All eight rebuilt: Navbar (metadata strip, indexed nav, scroll-progress rail), Hero (display-scale name, metrics strip, technology ticker), About (+ the education block that was defined in `data.ts` but never rendered), Skills (capability matrix with evidence lines), Experience (sticky-scroll narrative), Projects (scroll-snap rail), Contact, Footer (edge-to-edge SVG wordmark that cannot overflow).

**Phase 5 — partial.** Dead code removed (`card.tsx`, `separator.tsx`, `badge.tsx` → `.archive/`), the production `alt view` nav link removed, `/alt` noindexed, README rewritten, `next.config.ts` hardened.

## Deliberate deviations from the plan

1. **GSAP and SplitType were installed, then removed.** The plan's Phase 3 assumed GSAP for pinned/scrubbed scroll. In implementation, `position: sticky` covers the Experience pinning and CSS `scroll-snap` covers the Projects rail — both are keyboard-accessible, need zero JavaScript, and cannot strand a section mid-animation. Shipping GSAP unused would have added weight against the 250 KB budget for no benefit. **The final stack is Motion + Lenis + CSS.** If the scroll-scrubbed horizontal rail is still wanted later, GSAP is the right tool and can be added then.
2. **Phase 4 (WebGL/R3F) was not built.** The `three` + `drei` + `postprocessing` stack is ~150 KB gzip on its own. Instead the hero's focal visual is `StackSchematic` — a layered architecture figure whose every label is drawn from real work. It is informative rather than decorative, costs nothing, and is arguably a stronger differentiator for a backend engineer. The original mountain motif survives as the hard-edged ridge band behind the hero.
3. **No contact form.** No email provider or credentials were available, and a form that silently drops messages is worse than a mailto link. Contact ships a copy-to-clipboard address, direct links and a résumé download.
4. **No library version bumps.** Next 16.1.6 / React 19.2.3 were kept deliberately so a visual overhaul and a framework upgrade could not fail together. Next 16.3.6 and React 19.3.0 remain available.
5. **Palette switcher cut from 6 to 3** (`volt` / `hazard` / `signal`), as planned.
6. **Contact form / project metrics:** no live project URLs exist, and none were invented. Projects show "why it exists" framing built only from existing descriptions. `live` is an optional field that renders a second button when populated.

## Verification performed

- `npm run build` — clean, 9 routes, all static.
- Served-HTML content check — all section headings present in the HTML (the exit test for P0-1).
- All routes: `/` 200, `/alt` 200, `/robots.txt` 200, `/sitemap.xml` 200, `/opengraph-image` 200, unknown route 404.
- Security headers present in the response; `X-Powered-By` absent.
- **Contrast: 66/66 colour pairings pass WCAG AA** across 3 palettes × 2 themes, via `.archive/contrast-check.mjs`. This caught two genuine bugs during the build — see below.
- Built-CSS audit: confirmed the classes actually used compile (including `z-2` and `h-13`); confirmed zero remaining references to `framer-motion`, `react-type-animation`, `glass-card`, `timeline-line` or `@base-ui`.

### Two bugs the contrast audit caught

1. **The first audit was wrong, not the design.** The checker's selector regex matched the tail of `.dark[data-palette="…"]`, so light mode was being tested with dark-mode values and reported 9 failures. Found it by hand-checking one value (#1E3AD1 on #F4F1ED should be 7.23:1, not 2.04:1) and fixed the anchoring.
2. **The focus ring would have been invisible on the footer.** A single ink ring clears 17.5:1 on the page but sits at ~1:1 against the footer, which paints itself with `--foreground`. Fixed with an `.inverted` focus variant. An accent-coloured ring was rejected outright: orange on volt-blue measures 1.7:1.

## Not done / still open

- **No visual sign-off.** Browser-based verification was blocked twice: the built-in browser is disabled in Accio Work settings, and launching local Chrome headlessly aborts (SIGABRT) under this shell's sandbox. The design has therefore been verified structurally and by measurement, **not by eye**. The one visual artefact produced is the generated OG card (`ui-audit/og-image.png`), which confirms the palette, type scale and layout language. Before shipping, open the site and check it at 360 / 768 / 1440 px in both themes and all three palettes.
- **No Lighthouse or bundle-size baseline has been measured.** The §7 budget remains a target, not a measurement.
- **Content refresh still needed** (your decision): the most recent role ended Dec 2025, the site does not address the gap, and "3+ years" should be recalculated. `heroMetrics` and `stats` values must be updated in `data.ts` if the numbers change — they are server-rendered.
- **Project depth:** 3 projects, repository links only.
- **Deployment:** the working tree is not committed and the live build is ~6 months stale. Commit, push, and set `NEXT_PUBLIC_SITE_URL` when a domain exists.

---

# CONTENT REFRESH — 23 Sep 2026 (from `Shubham_Gupta_Updated.pdf`)

The resume changed the positioning, not just the bullets. The site was rebuilt around it.

## What changed

| Area | Before | After |
|---|---|---|
| Positioning | "Backend / Full Stack Engineer" | **"AI-focused Backend Engineer"** |
| Tagline / hero roles | Backend Engineer · Full Stack Developer · Node.js Specialist · Web3 Builder | Backend AI Engineer · Multi-Agent Architecture · LLM Product Features · Distributed Systems |
| Current role | *none — 9-month gap after Dec 2025* | **Memorea, Backend AI Engineer, April 2026 — Present** (with a "Current" badge) |
| Roles listed | 5 | 6 |
| Skill areas | 6 | **8** — AI & LLM Engineering and Integrations are new |
| Projects | Kafka Order Pipeline · DeFi Staking · Redis Job Queue | **QueryLens · IdleWatch** |
| Hero metrics | 3+ · 100K+ · 40% · 10K | 3+ · 100K+ · **50%** (Memorea delivery latency) · 10K |
| StackSchematic | 3 groups / 6 layers | **4 groups / 8 layers** — an "Intelligence" group (Agents, Grounding) carries the accent |
| Served résumé | stale PDF (151,775 bytes) | **the new PDF** (145,361 bytes, md5 verified identical) |
| Metadata, OG card, JSON-LD | backend / full-stack framing | AI-focused, plus AI keywords and `knowsAbout` terms |

Every number on the site is now traceable to the resume. NE Group's end date was corrected (July 2025, not June), and the About copy was rewritten around the multi-agent work rather than the Web3 work.

## A live defect the resume work uncovered

**All three project links that were previously on the site returned HTTP 404.** Verified directly:

```
404  https://github.com/shubhamynr22/kafka-order-pipeline
404  https://github.com/shubhamynr22/defi-staking
404  https://github.com/shubhamynr22/redis-job-queue
```

Anyone clicking "View code" landed on a GitHub 404 — on a portfolio whose entire purpose is to be checked by recruiters. This is why `Project.repo` is now **optional**: the two new projects have no publicly reachable repository (checked against the GitHub API — 17 public repos, neither QueryLens nor IdleWatch among them, and no obvious slug variant resolves), so the UI renders a dashed "Repository available on request" chip instead of inventing a URL.

Also removed: an unverified claim I had added during the redesign ("open to remote and relocation") that the resume does not support. It now states only the location and timezone.

## Still needs your input

1. **Repo URLs for QueryLens and IdleWatch** — add a `repo` field in `data.ts` and the "View code" button appears automatically. If those repos are private, the current "on request" chip is the honest state.
2. **"3+ years"** — kept because it is what the resume says and the two should not disagree, but February 2023 → today is ~3.6 years of full-time work before the 2022 internships are counted. Worth deciding deliberately, then updating both documents together.
3. **Availability** — the site still says "Open to new roles" while the résumé shows a current role. Correct if you are passively looking; change `availability.status` if not.

---

# POST-LAUNCH FIXES — 23 Sep 2026

Three defects reported against the deployed build. All three are fixed; the measurements below are from the repository, not from the live site.

## 1. The name was hidden behind the stack schematic

**Cause: a font metric, not a styling preference.** The hero placed the `display-xl` heading in `lg:col-span-7` and the figure in `lg:col-span-5`. At 1440px that column is 744px wide, while "SHUBHAM" in Archivo ExtraBold measures **5.459 em** (read straight out of the shipped font's `hmtx` table — `unitsPerEm` 1000) — at the fluid `13vw` size that is **905px**, so the word overflowed its cell by ~22%. `StackSchematic` has an opaque `bg-card` and comes later in DOM order, so it painted over the last letters. The earlier structural check (`scrollWidth == innerWidth`) never caught it because overflowing a grid cell into a sibling column does not widen the document.

**Fix: give the statement its own full-width row.** No font size was reduced — the name is exactly as large as before, and the collision is now impossible by geometry rather than by tuning a magic number. "SHUBHAM" has **19–31% spare width at every breakpoint** (320 → 2560px).

The `display-xl` floor also moved from `3.25rem` to `2.75rem`: at 320px the old floor measured 284px against a 280px content box, i.e. it was already clipping by 4px before this change.

## 2. Contrast dialled back

The complaint was legitimate: the dominant pairing was `#0B0B0C` on `#F4F1ED` at **17.47:1** — near-black on near-white, at 2px border weight, on every card and rule on the page.

| | before | after |
|---|---|---|
| Body text (light) | 17.47:1 | **13.49:1** |
| Body text (dark) | 17.47:1 | **13.36:1** |
| 2px frame (light) | 17.47:1 | **9.67:1** |
| 2px frame (dark) | 17.47:1 | **9.21:1** |

The dark page was also lifted off absolute black (`#0B0B0C` → `#131316`). Hard offset shadows, 2px borders and the three loud accents are untouched — this is the same theme at a lower amplitude, which is what was asked for.

Re-verified: **`node .archive/contrast-check.mjs` → 66/66 pairings pass WCAG AA** (3 palettes × 2 themes × 11 real pairings). One value needed retuning to stay compliant: hazard's light `--primary-ink` moved `#C43A00` → `#B83600`, because the lighter paper dropped it to 4.47:1 against the 4.5 threshold.

Propagated to `layout.tsx` (`themeColor`), `opengraph-image.tsx` and `icon.svg` so the card preview, the browser chrome and the favicon match the page.

## 3. Responsiveness

Every `display-*` tier was checked against the real glyph advances at 320 / 360 / 375 / 414 / 768 / 1024 / 1280 / 1440 / 1512 / 1920 / 2560px — **zero overflows**:

- `display-xl` (name) — 19–31% spare, full-width row.
- `display-lg` (section headings) — worst word `TECHNICAL` at 505.6px in a 1304px box.
- `display-md` (project cards) — worst `QUERYLENS` at 296px in a 500px panel at every size.

The mobile stack order is unchanged (name → pitch → figure → metrics); only the `lg` breakpoint and above reflows into columns.

## Verification, and its limits

- `npm run build` — clean, 9 routes, all static.
- Contrast audit — 66/66.
- Built-CSS audit — the shipped bundle contains the new tokens and **no** trace of `#f4f1ed` or `#0b0b0c`.
- Served-HTML check on a fresh production server — confirms the new hero grid is what is actually served.

**Still no visual sign-off.** Headless Chrome hangs indefinitely under this sandbox (it had to be moved to a background process and killed), and Playwright's browsers are not installed. Everything above is measurement, not looking. The name fix in particular is arithmetic rather than eyeballed — worth one glance at 1440px in dark mode to confirm the composition still reads the way you want, since the pitch column now sits below the name rather than beside it.
