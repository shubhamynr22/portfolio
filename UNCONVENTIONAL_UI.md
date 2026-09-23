# Unconventional UI: Tools & Libraries to Stand Out

> Current stack: Next.js 16, React 19, Tailwind 4, Framer Motion 12, Lenis, shadcn/ui
> Everything below builds *on top of* what you already have — no replacements.

---

## 1. WebGL & 3D (Biggest differentiator)

| Library | Why |
|---|---|
| `@react-three/fiber` | React renderer for Three.js — bring 3D scenes into JSX |
| `@react-three/drei` | Helpers: floating text, reflections, environment maps, HTML overlays in 3D |
| `@react-three/postprocessing` | Bloom, chromatic aberration, depth-of-field, glitch effects on 3D scenes |
| `ogl` | Minimal WebGL — great for custom GLSL shader backgrounds without Three.js overhead |
| `curtainsjs` | Applies WebGL distortion shaders *directly to DOM elements* (images, sections) |

**Use case ideas:** Interactive 3D avatar/model on hero, distorted project cards on hover, morphing blob background.

---

## 2. Advanced Animation (Beyond Framer Motion)

| Library | Why |
|---|---|
| `gsap` + `@gsap/react` | Industry gold standard — unmatched for timeline sequencing, stagger, morph |
| `gsap/ScrollTrigger` | Pin sections, scrub animations to scroll position, parallax layers |
| `gsap/MorphSVGPlugin` | Morph SVG paths smoothly (requires GSAP Club, but free for portfolio) |
| `theatre/core` + `@theatre/r3f` | Visual animation studio — keyframe editor in the browser for 3D + DOM |
| `motion-canvas` | Code-driven cinematic animations rendered as video/canvas sequences |
| `animejs` | Lightweight alternative for CSS/SVG/DOM animations with timeline API |

**What GSAP gives you that Framer Motion doesn't:** Scroll-scrubbed pinned sections, morphing SVG, and complex multi-step timelines synced to user interaction.

---

## 3. Scroll-Driven & Parallax

| Library | Why |
|---|---|
| `gsap/ScrollTrigger` | Works with your existing Lenis setup — most powerful scroll animation tool |
| `@studio-freight/tempus` | RAF (requestAnimationFrame) scheduler to sync Lenis + GSAP perfectly |
| Native CSS `animation-timeline: scroll()` | Zero-JS scroll progress animations (Chrome 115+, Edge) |

---

## 4. Particle Systems & Generative Art

| Library | Why |
|---|---|
| `@tsparticles/react` | Configurable particle engine — connect links, repulse on cursor, absorb |
| `react-p5` | p5.js in React — generative sketches, noise-based animations, cellular automata |
| `simplex-noise` | Organic noise for blob morphing, wavy backgrounds, terrain |
| `pts` | Creative coding toolkit — geometry, particles, canvas-based art |

---

## 5. Shader / Visual FX

| Library | Why |
|---|---|
| `react-vfx` | Drop-in WebGL shader effects on any React element (glitch, ripple, warp) |
| `vanilla-tilt` / `react-parallax-tilt` | GPU-accelerated 3D tilt on cards/images |
| `glsl-canvas` | Render raw GLSL fragment shaders as backgrounds |

---

## 6. Custom Cursor

| Library | Why |
|---|---|
| `react-animated-cursor` | Magnetic trailing cursor with blend modes |
| Custom GSAP cursor | Most portfolios use this — follows mouse with lag, grows on hover |

A custom cursor alone can make a portfolio feel premium immediately.

---

## 7. Text FX

| Library | Why |
|---|---|
| `splitting` | Splits text into chars/words/lines — enables per-character CSS animations |
| `react-spring` | Physics spring animations — more organic than tween-based |
| `motion-primitives` | Pre-built Framer Motion text reveals, blur-in, scramble effects |
| `@formkit/auto-animate` | Automatic FLIP animations on list reorders with one line |
| Text Scramble (vanilla) | `setInterval` + random char replacement — retro hacker effect, no lib needed |

---

## 8. UI Component Libraries with Unconventional Aesthetics

| Library | Why |
|---|---|
| `aceternity-ui` | Animated cards, spotlight effects, aurora backgrounds — built on Framer Motion + Tailwind |
| `magic-ui` | Shiny buttons, animated beams, ripple effects, word rotate |
| `hover.dev` | Copy-paste interactive hover animations |
| `motion-primitives` | Headless animated primitives (blur text, scroll progress, animated tabs) |
| `react-bits` | Curated animated React components (star border, noise card, gradient text) |

These are **copy-paste component libraries** — no npm install needed, just drop in JSX.

---

## 9. Magnetic & Physics-Based Interaction

These don't have dedicated libraries — implement with GSAP or vanilla JS:

- **Magnetic buttons** — elements that attract toward the cursor within a radius
- **Elastic nav links** — overshoot then settle using spring physics
- **Cursor-repelling particles** — items scatter away from mouse position
- **Rubber-band scroll** — content stretches on overscroll (like iOS feel)

---

## 10. Noise-Based Organic Backgrounds

Combine `simplex-noise` or raw GLSL with canvas/WebGL:

- **Animated blob** — noise-displaced circle that breathes
- **Fluid gradient** — slowly shifting color mesh (like Stripe's gradient hero)
- **Grain texture overlay** — CSS `filter: url(#grain)` SVG filter for a film grain look

---

## 11. Transition / Page Effects

| Library | Why |
|---|---|
| `next-view-transitions` | Native View Transitions API wrapped for Next.js — morphing page transitions |
| `barba.js` | SPA-style page transitions with GSAP hooks |
| Custom clip-path transitions | CSS `clip-path` reveal/wipe — no library, pure CSS + Framer Motion |

---

## 12. Lottie & SVG Animation

| Library | Why |
|---|---|
| `lottie-react` | Play After Effects animations as JSON — great for illustrated loaders/icons |
| `react-spring` with SVG | Physics springs on SVG path lengths for handwriting/drawing effects |
| `vivus` | SVG stroke draw-on animation — makes your logo or icons "draw themselves" |

---

## Prioritized Recommendations (What to Actually Do)

Given your pixel-style aesthetic and current stack, here's a prioritized hit-list:

### High Impact, Reasonable Effort
1. **GSAP + ScrollTrigger** — pinned horizontal scroll for projects, staggered reveals
2. **Custom GSAP cursor** — immediate "premium feel"
3. **`react-parallax-tilt`** on project cards — hardware-accelerated 3D depth
4. **`splitting.js`** — animate each letter of section headings independently
5. **`motion-primitives`** — drop-in scramble text, blur-in effects (works with existing Framer Motion)

### High Impact, More Effort
6. **React Three Fiber** — 3D hero element (floating cube, icosahedron, model)
7. **GLSL noise background** — replace static background with animated shader
8. **Magnetic buttons** — GSAP-powered buttons that attract the cursor

### Stylistic / Finishing Touches
9. **SVG grain overlay** — adds texture depth to the pixel aesthetic
10. **`next-view-transitions`** — smooth page transitions between routes
11. **`lottie-react`** — animated skill icons or section illustrations

---

## References & Inspiration

- [threejs.org](https://threejs.org) — 3D library
- [gsap.com](https://gsap.com) — GSAP docs + ScrollTrigger
- [ui.aceternity.com](https://ui.aceternity.com) — Aceternity components
- [magicui.design](https://magicui.design) — Magic UI
- [motion.dev](https://motion.dev) — Motion (Framer Motion) docs
- [react-bits.dev](https://react-bits.dev) — React Bits components
- [hover.dev](https://hover.dev) — Hover animations

---

*No changes made to code — this is a reference document only.*
