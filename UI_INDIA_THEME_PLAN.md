# INDIAN DESIGN SYSTEM — IMPLEMENTATION PLAN

**Date:** 23 Sep 2026
**Scope:** Layer an Indian design grammar onto the existing "Engineered Maximalism" system. Keep everything you already like. Do not rebuild.
**Hard constraints from you:** no stereotype elements, no Indian text (no Devanagari/Sanskrit/Persian script anywhere in the UI), must define heritage and ancient India, must be *cool*.

---

## 1. The thesis

Most "Indian-themed" websites are **stickers**: a paisley here, a mandala there, a marigold-and-maroon palette, done. That is exactly the failure mode you asked me to avoid, and it is also the reason those sites look cheap.

The alternative is to be Indian in **grammar** rather than in **stickers** — in the grid, the symmetry, the repeat unit, the frame, the material logic. India has an unusually deep tradition of *abstract, mathematical, structural* design. That is not a consolation prize; it is arguably the most impressive part of the heritage, and it is almost entirely unused on the web.

So the whole plan runs on one rule:

> **Structure, not ornament. And geometric fidelity, not pastiche.**

Every motif below is used *geometrically true to its source* — a jali with real 6- or 12-fold symmetry, a kolam that is genuinely one continuous stroke on a dot lattice, a stepwell whose stairs actually interlock. Nothing is "Indian-looking squiggles". A recruiter sees a rigorous geometric system. Someone who knows the sources sees Chand Baori, a pulli grid, a Vastu pada. That second reader is the one you want to impress, and the recognition is the payoff.

### The second, sharper thesis: India invented the algorithm

You are an AI-focused backend engineer. There is a genuinely strong, honest story here that almost nobody uses:

- **Panini's Ashtadhyayi** (c. 5th century BCE) is a generative rule system — a finite set of rules producing an infinite language. It is studied in computer science and linguistics as one of the earliest formal grammars and is described in the literature as arguably the most complete generative grammar ever produced.
- **Kolam** floor patterns are drawn from formal **picture grammars** — there is an active research literature on generating them (including one-stroke generation algorithms published in *Nature*-family journals).
- **Chand Baori** is a recursion you can walk down: 13 storeys of interlocking flights folding ~3,500 steps into a small square.

So the site can carry a quiet thesis — *the formal system is older than the computer* — expressed entirely through geometry, with no text required. That is a far better answer to "why does this Indian developer's site look like this" than a decorative border.

---

## 2. Constraints and guardrails

Inherited from you:

| Constraint | Consequence |
|---|---|
| No stereotype elements | Excluded-motif list in §9 is a hard filter, not a preference |
| No Indian text | No Devanagari, Sanskrit, Tamil, Persian or transliterated phrases as *content*. Roman-letter provenance labels only (see §6) — and Indian-designed typefaces used via their **Latin** cuts |
| Keep maximalism + the theme | The existing token system, 2px borders, hard shadows, zero blur, ≤4px radius, three loud accents all survive |
| Must be cool, not kitsch | Density is a *system*, not a decoration budget |

Inherited from the codebase (these are proven, don't regress them):

1. **Content visible by default.** No element may be hidden behind JS-only animation. The reveal contract stays: JS may only hide *below-fold* elements, gated on `IntersectionObserver` + `prefers-reduced-motion`.
2. **WCAG AA, verified by machine.** `.archive/contrast-check.mjs` must pass. Currently 66/66 (3 palettes × 2 themes × 11 pairings). Any new palette or ink goes through it.
3. **Bundle discipline.** No new runtime libraries. No WebGL. SVG + CSS only. The whole motif system should add **< 30 KB** uncompressed, ideally < 10 KB.
4. **No blur, ever.** This rules out some lovely ideas (see §9) — noted rather than fought.
5. **Responsive proof, not vibes.** Any display type change gets re-measured against real glyph advances at 320→2560px, the way `display-xl` was.

---

## 3. Research catalogue

Ten traditions, with provenance. Each entry says what it actually gives a UI, and what the risk is.

### 3.1 Vastu Purusha Mandala — the grid
The ritual planning diagram behind Indian temple and city layout: a square subdivided into a grid, most commonly **8×8 (64 cells, "Manduka")** or **9×9 (81 cells, "Paramasaayika")**, with the cell (pada) as the unit of proportion. ([Wikimedia — Manduka 8×8 temple plan](https://commons.wikimedia.org/wiki/File:64_grid_Manduka_design_Hindu_Temple_Floor_Plan_Vastu_Purusa_Mandala_Ancient_Architecture.svg), [Vastu Purusha Mandala grids](https://vastuvilla.com/blog/vastu_purusha_mandala_in_contemporary_villa_design))

**Gives us:** a direct, drop-in upgrade for the existing `.grid-paper` texture. Instead of a generic 34px square grid, the page sits on a *named* proportional grid with two line weights (pada + mandala). You already have a `data-palette` attribute pattern — this becomes `data-grid="8x8 | 9x9"`, same mechanism.
**Risk:** low. It is pure geometry.

### 3.2 Chand Baori & Rani ki Vav — the stepwell
Chand Baori (Abhaneri, Rajasthan) folds roughly **3,500 narrow steps across 13 storeys** into a square, in interlocking double flights on three sides. Rani ki Vav (Patan, Gujarat, 11th c.) is a UNESCO site designed as an **inverted temple** — literally "descend to ascend" — divided into **seven levels of stairs** with sculptural panels. ([Chand Baori geometry](https://www.studiomatrx.org/architecture-canon/chand-baori-stepwell), [UNESCO — Rani-ki-Vav](https://whc.unesco.org/en/list/922/))

**Gives us:** the single strongest *metaphor* available, and a real structural motif.
- A **stepped rule** (a rule that steps, rather than a straight 2px line) as the section divider — a genuinely novel alternative to the plain rule.
- A **scroll-progress cross-section**: 13 storeys descending as you scroll.
- The **Experience section becomes a stepwell**: each role is a storey, and descending reads as going back in time. This is the one place where the metaphor is not decorative but *informational*.

**Risk:** low, with one judgement call — don't let it imply your career goes *down*.

### 3.3 Kolam — the algorithm
Tamil floor patterns drawn as **one continuous stroke** (ideally closed) around a lattice of **pulli** (dots), traditionally rice flour, traced back millennia and passed down through generations of women. Kolam are the subject of a real formal-language literature: **picture grammars** and one-stroke generation algorithms. ([Nature — one-stroke kolam generation](https://www.nature.com/articles/s40494-026-02310-3), [MIT Design Issues — The Kolam Drawing: A Point Lattice System](https://direct.mit.edu/desi/article-pdf/38/3/34/2032937/desi_a_00690.pdf), [Kambi Kolam as Algorithmic Pattern](https://alpaca.pubpub.org/pub/xywz3ebv))

**Gives us:** the motion system, and the best single marriage of heritage + your profession.
- The decorative line work across the site is drawn as **one continuous path on a dot lattice**, and animates by drawing itself (`stroke-dasharray` / `stroke-dashoffset`) as it enters the viewport.
- The **pulli lattice** replaces the generic halftone dot screen — it is a *specific*, named geometry rather than a generic dot grid, and it is already 90% of what `.halftone` does today.
**Risk:** low. Technically trivial in SVG; must respect the reduced-motion contract.

### 3.4 Bidriware — the material
Bidar, Karnataka, 14th century: a zinc–copper alloy body chemically blackened, with pure **silver inlaid** into it (a damascening technique), then polished so the inlay and the blackened alloy sit flush. ([Wikipedia — Bidriware](https://en.wikipedia.org/wiki/Bidriware), [Asia Research News](https://www.asiaresearchnews.com/content/centuries-old-metalwork-tradition-%E2%80%94-southern-india%E2%80%99s-bidriware))

**Gives us:** the best possible justification for your dark theme, and a real upgrade to the border system.
- The dark page *is* blackened alloy; type, rules and accents *are* the silver inlay.
- Crucially: in bidri the design is **cut into the body and filled** — it is an *inset* line, not an outline drawn on top. That is a materially-correct reason to upgrade the current single 2px border to a **two-tone inlay channel** (`border: 2px solid var(--alloy)` + `box-shadow: inset 0 0 0 1px var(--inlay)`). It reads as inlaid wire, and it is a genuine visual upgrade independent of the Indian framing.
- It also legitimises the **silver** palette as a first-class accent (§5.6) rather than a fourth arbitrary colour.

**Risk:** low. This is a palette + border change.

### 3.5 Jali — the perforated screen
Mughal pierced-stone lattice. Under Akbar the vocabulary was **hexagonal and octagonal**; the mature repertoire runs on **6- and 12-sided figures**. Functionally it is a light filter: a mask over an opening. ([Aramco World — Mughal jaali](https://www.aramcoworld.com/articles/2022/art-of-islamic-patterns-mughal-jaali), [DailyArt — Jali in Mughal architecture](https://www.dailyartmagazine.com/jali-in-mughal-architecture-the-most-delicate-stone-curtains/))

**Gives us:** the section-divider and "light" system, implemented as CSS `mask-image` — a solid band perforated by a real 6- or 12-fold lattice. Cheap, distinctive, and it gives the site *light* rather than just *pattern*. The hero's grid can be revealed *through* a jali mask instead of sitting flat behind everything.

**Risk:** low.

### 3.6 Madhubani — the frame and the density principle
Mithila, Bihar. Its signature is a **double-line border drawn first**, before anything else, and a dense filling of space in which empty ground is rarely left untouched. ([Artflute — Madhubani](https://www.artflute.com/blog/what-is-madhubani-painting), [Anuprerna — Madhubani wall art](https://anuprerna.com/stories/madhubani-wall-art/93791248))

**Gives us:** a *principled* foundation for maximalism — which is currently asserted in your design language but not derived from anything.
- **"The border is drawn first"** → the frame becomes a first-class component (a `par`: double rule + patterned inner band), not a `border` property.
- **"No empty space"** → the license for density. Applied with judgement: dense frames and section bands, quiet text areas. Density everywhere is unreadable; density *around* quiet is what makes maximalism work.
- Madhubani filler styles (line-fill, cross-fill, dot-fill) → a named set of CSS fill textures.

**Risk:** low–medium. The "fill every space" principle must be scoped or it becomes noise. §9 lists where it is deliberately *not* applied.

### 3.7 Jantar Mantar — the instrument
Jaipur, 18th century: naked-eye astronomical instruments built at architectural scale, operating across three classical celestial coordinate systems. The **Samrat Yantra** gnomon is a giant triangle reading solar time to within about two seconds. ([Jantar Mantar, Jaipur](https://en.wikipedia.org/wiki/Jantar_Mantar,_Jaipur), [jantarmantar.org — Samrat Yantra](https://www.jantarmantar.org/learn/observatories/instruments/samrat/index.html))

**Gives us:** the data-visualisation language — and it is a *perfect* fit for a backend engineer, because these are measuring instruments.
- Metric counters get a **graduated quadrant arc** with real degree ticks, instead of a number sitting on a line.
- Progress/level indicators become **graduated rules** (a rule divided into ticks, like the quadrant).
- This is the one tradition that lets the site look *quantitative* rather than decorative.

**Risk:** low.

### 3.8 Indus Valley seals — the mark
Seals from Harappa and Mohenjo-daro (c. 2600–1900 BCE) carry **geometric patterns — grid designs, cross motifs, chevrons** — alongside a script that **remains undeciphered**. ([Harappa.com — Indus Seals beyond geometry](https://www.harappa.com/content/indus-seals-2600-1900-bce-beyond-geometry-new-approach-break-old-code), [Smarthistory — An Indus Seal](https://smarthistory.org/indus-seal/), [Harappan Geometry and Symmetry (ResearchGate)](https://www.researchgate.net/publication/265828493_Harappan_Geometry_and_Symmetry_A_Study_of_Geometrical_Patterns_on_Indus_Objects))

**Gives us:** the badge / stamp language — square, bordered, grid-based. Used for the availability pill, project index marks, the favicon, and the OG card corners.

**Two hard rules here, both of which I want to be explicit about:**
1. **No Indus script glyphs.** The script is undeciphered, so reproducing glyphs would be both fake and, per your constraint, "Indian text". We use only the **geometric** corpus: grids, crosses, chevrons, concentric squares.
2. **Some Harappan geometry is unusable.** The documented repertoire includes swastika-like motifs. Those are excluded outright — no exceptions, no "but it's an ancient auspicious symbol" argument. §9.

**Risk:** medium. Handled by taking only geometry and only the safe subset.

### 3.9 Panini's Ashtadhyayi — the concept
c. 5th century BCE. A finite rule set generating an entire language; described in the literature as a generative system with remarkable computational properties, and regularly compared to a program. ([Computing Processes and Panini's Ashtadhyayi](https://bhavana.org.in/computing-processes-and-pan%CC%A3inis-as%CC%A3t%CC%A3adhyayi/), [Paninian Grammar: Computational Linguistics Before Computers](https://iksai.hcommons.org/2026/03/14/paninian-grammar-computational-linguistics-before-computers/))

**Gives us:** the *concept* layer — no motif, no drawing. It justifies the site's rule-based rigidity ("a small rule set producing rich output") as an inherited principle rather than a shadcn reaction. It also gives the About/skills narrative its spine.

**Risk:** low, provided it stays a design rationale and does not become a content claim about Panini that you'd have to defend in an interview.

### 3.10 Sri Yantra — flagged, your call
Nine interlocking triangles (four upward, five downward) whose intersections produce **43 smaller triangles across five concentric levels**, around a central **bindu** point, inside an eight- and a sixteen-petal enclosure and a square frame with four gates. Nine levels are named. ([Wikipedia — Sri Yantra](https://en.wikipedia.org/wiki/Sri_Yantra))

**Gives us:** an extraordinary piece of abstract geometry, and — read purely structurally — a *system diagram* vocabulary: concentric levels, a centre, radiating layers. It maps suspiciously well onto a software architecture figure, and it would be the most visually striking element on the site.

**Risk: high, and I want to be straight with you rather than quietly include it.** This is an active **devotional object**, not a historical motif. Reusing it as a systems diagram ranges from "respectful homage" to "someone's sacred diagram is now your Kafka diagram," and different people will read it differently — including people who might be interviewing you. **My recommendation: use the underlying geometry (interlocking triangles, concentric levels, a centre point) as a construction principle for the architecture figure, without reproducing the canonical yantra or its nine-level naming.** That keeps the mathematics, drops the misappropriation. I've listed it as an open decision in §11 rather than deciding it for you.

---

## 4. What this looks like, in one sentence

> The page sits on a **Vastu pada grid**; every section is framed by a **double par** with a patterned inner band; **Bidri inlay channels** replace flat borders; section breaks are **jali screens** that let light through; textures are **pulli lattices** and **Madhubani fills**; one **kolam stroke** draws itself on entry; numbers sit on **Jantar Mantar graduated arcs**; the Experience timeline descends as a **stepwell** — and every one of these carries a small mono **provenance label** saying exactly where it came from.

---

## 5. The system — six layers

Six layers, ordered from most structural to most cosmetic. Each is independently shippable: layer 1 alone is a visible improvement, and nothing below depends on the layers above.

### 5.1 Layer 1 — Grid: the pada

Replace `.grid-paper` with a named proportional grid. Same `data-*` mechanism as `data-palette`, so the existing pre-paint script pattern is reused.

```css
/* globals.css */
.grid-yantra {
  --pada: 48px;                              /* one cell */
  --mandala: calc(var(--pada) * 8);           /* 8 pada = one mandala */
  background-image:
    linear-gradient(to right,  var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to right,  var(--grid-line-strong) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line-strong) 1px, transparent 1px);
  background-size:
    var(--pada) var(--pada), var(--pada) var(--pada),
    var(--mandala) var(--mandala), var(--mandala) var(--mandala);
}
[data-grid="9x9"] .grid-yantra { --mandala: calc(var(--pada) * 9); }
```

Two line weights is the whole trick: it reads as a *plan* rather than as graph paper, which is exactly what the current 34px single-weight grid reads as. Add optional intersection dots (the pada nodes) at low opacity.

**Also do this:** make `--pada` drive real spacing. Pick 8px, and set section padding and frame gaps to multiples of it. Then the grid is not a background texture, it is the *proportion system* — that is what the mandala actually is, and it is what makes the whole page feel authored rather than assembled.

### 5.2 Layer 2 — Frame: the par, and the inlay channel

Two changes to the frame, both small, both high-impact.

**The par (double line).** Madhubani's rule is that the border is drawn first. Promote it from a `border` property to a component:

```
┌───────────────────────────┐   outer rule: 2px
│ ┌───────────────────────┐ │   gap: 3px
│ │  inner band, fillable │ │   inner rule: 1px
│ │  ┌─────────────────┐  │ │
│ │  │     content     │  │ │
```

Implemented as `box-shadow` insets so it costs no extra DOM and no layout shift:
```css
.par      { border: 2px solid var(--border-strong);
            box-shadow: inset 0 0 0 3px var(--card), inset 0 0 0 4px var(--border); }
.par-fill { /* the inner band carries a fill texture from 5.4 */ }
```

**The bidri inlay channel.** Replace flat borders site-wide with a two-tone line:
```css
--alloy: var(--border-strong);   /* the body of the metal  */
--inlay: var(--inlay-color);     /* the silver wire        */
.inlay { border: 2px solid var(--alloy);
         box-shadow: inset 0 0 0 1px var(--inlay); }
```
On the dark theme this reads as silver wire set into blackened alloy. It is the cheapest way to make the whole interface look more expensive, and it is materially correct rather than decorative.

### 5.3 Layer 3 — Lattice: the jali screen

Section dividers and "light" stop being flat bands and become perforated screens. CSS `mask-image` with an inline SVG, so it is a few hundred bytes and scales to any size.

```css
.jali {
  background: var(--border-strong);
  -webkit-mask-image: url("data:image/svg+xml,/* 6-fold lattice */");
  mask-image: url("data:image/svg+xml,/* 6-fold lattice */");
  mask-size: 64px 64px;
}
```

Two stock motifs, both geometrically real:
- `jali-hex` — hexagonal lattice, the earlier and simpler Mughal vocabulary.
- `jali-12` — 12-fold star lattice, the mature repertoire.

**Use it for:** the band between every section (replacing the plain 2px rule), the tech-ticker strip, and a slow light-sweep behind the hero grid where the grid is revealed *through* the mask. Also useful as a texture on `.frame` headers at very low opacity to separate a plate header from its body.

### 5.4 Layer 4 — Texture: pulli, fills, and the running stitch

Three textures, all CSS-only, all named for their source.

**Pulli lattice** — replaces `.halftone`. A square-aligned dot grid, which is what a pulli grid actually is, at a spacing that relates to `--pada` (one dot per pada node, or per half-pada):
```css
.pulli {
  background-image: radial-gradient(var(--border-strong) 1.4px, transparent 1.6px);
  background-size: calc(var(--pada) / 2) calc(var(--pada) / 2);
  opacity: .28;
}
```
**Madhubani fills** — four named texture classes for panel bodies and badges, replacing the single `.hatch`:
`fill-line` (parallel line-fill), `fill-cross` (cross-hatch), `fill-dot` (dot-fill), `fill-wave` (stacked arcs). All `repeating-linear-gradient` / `radial-gradient`, all at 10–18% opacity.

**Kantha stitch** — replaces every dashed border and `.rule-dashed`. Kantha is the running stitch, the simplest stitch there is, worked in rows across layered cloth. As a CSS border that is a stitched line rather than a hairline gap:
```css
.stitch { background-image: repeating-linear-gradient(to right,
            var(--stitch-color) 0 6px, transparent 6px 11px);
          height: 2px; }
```
Affects the "Repository available on request" chip, the `.rule-dashed` usage, and the section-heading rule. Tiny detail, disproportionately effective.

### 5.5 Layer 5 — Figure and data

**The stepwell rule** (section dividers, and the Experience rail). A stepped rule is a repeating stepped edge:
```css
.rule-step {
  height: 8px;
  background-image: repeating-linear-gradient(to right,
    var(--border-strong) 0 8px, transparent 8px 16px),
    repeating-linear-gradient(to right,
    transparent 0 8px, var(--border-strong) 8px 16px);
  background-size: 16px 4px, 16px 4px;
  background-position: 0 0, 0 4px;
}
```
Better served by a small inline SVG for real interlocking flights, but the CSS version is a two-line experiment.

**The stepwell Experience section.** This is the one place where the metaphor carries information rather than decorating:

```
STOREY 04  ─────────────────────────  Credain            2023 – 2024
STOREY 03  ──────────────────────     High-traffic gaming platform
STOREY 02  ───────────────────        Idea Usher
STOREY 01  ────────────────           IIT Hyderabad
```
- Each role is a **storey**, each storey is a **flight of steps** whose length is proportional to the tenure.
- The vertical rail between them is the well wall; the step count per storey comes from real months.
- Provenance label: `CHAND BAORI · ABHANERI · 13 STOREYS`. Yours will have 4. That gap is charming, not a problem — the label states the source, not a claim of equivalence.

**Graduated arcs** (metrics + skills). Wrap the existing `MetricCounter` in a small SVG quadrant arc with tick marks:

```
    ▁▂▃▄▅▆▇  ← ticks at real intervals
   ╱
  ╱  3+
 ╱   Years shipping
```
- The arc is a quarter circle with 12 ticks — the Samrat Yantra's graduated quadrant, abstracted.
- Progress states (skill levels, if any) become graduated rules rather than generic progress bars.

**The architecture figure.** The existing `StackSchematic` is already good — do not throw it away. The India-native upgrade is to the *enclosure*: concentric levels with a centre point, drawn as interlocking triangles, with the eight stack layers mapped onto radial levels. See §11 for the yantra decision — build the enclosure geometrically, but do not reproduce the canonical yantra.

**The seal stamp.** A square, bordered mark with a grid or chevron pattern and a monogram. Uses: favicon, the availability pill, project index corners, OG card corner. **Geometry only — no script glyphs, and none of the swastika-like motifs** (§3.8).

### 5.6 Layer 6 — Material: palette and type

**Palette as material, not as slang.** Keep the three-palette switcher and its pre-paint mechanism exactly as built. Rename and re-tune them to material systems, which is both more Indian and more grown-up than colour slang. I'd use plain English material names and put the Indian source in the sub-label:

| Palette | Material | Source | Notes |
|---|---|---|---|
| **Indigo** | indigo dye | Ajrakh / Kalamkari, pan-Indian | The current volt blue is already nearly indigo. Small shift, no visual upheaval |
| **Madder** | madder root red | Kalamkari, Ajrakh, block-print | Close to the current hazard orange-red |
| **Silver** | silver inlay on alloy | Bidriware, Bidar | **New.** A monochrome metallic palette — sophisticated, and the material the border system is named after |

This means retiring the acid-lime "Signal" or demoting it to a specialist accent. That is a real loss (lime is a great maximalist shout, and it is in the current OG card) — flagged in §11.

**Typography — Indian-designed typefaces, Latin cuts.** Every one of these is on Google Fonts, so all work with `next/font/google` and are self-hosted with no runtime dependency. This is how you get Indian typographic DNA without a single Devanagari character.

| Voice | Current | Proposed | Why |
|---|---|---|---|
| Display | Archivo | **Eczar** (Indian Type Foundry, Vaibhav Singh) — keep Archivo as the alternative | Eczar's Latin is drawn with Devanagari-informed calligraphic contrast. It reads as an Indian display face without a single non-Latin glyph. It would change the site's feel significantly — high-contrast display vs. industrial grotesque — so it is a real fork, not a drop-in |
| Technical / label | JetBrains Mono | **Rajdhani** (ITF — Satya Rajpurohit, Jyotish Sonowal, Shiva Nalleperumal) for uppercase labels; keep JetBrains Mono for numerals and code | Rajdhani's letters are **modularised**: round bowls are straightened, terminals end flat on the horizontal or vertical. The foundry itself describes it as "technical or even futuristic". That is your `mono` label voice, Indian-designed, and it suits the engineered language better than JetBrains Mono does for prose labels |
| Text | Space Grotesk | **Anek Latin** (Ek Type, Mumbai, 2021 — a 10-script variable superfamily made by 12 designers across 8 cities) or **Mukta** (Ek Type) | Anek is variable on weight **and width** — the width axis lets labels compress at small sizes without a second font. Mukta is the safer, quieter swap |

Keep three voices, do not add a fourth. The `--font-*` token structure already supports a swap with no component changes.

---

## 6. The provenance label — the idea that makes this work

Here is the problem with a purely abstract Indian theme: nobody knows it's Indian. A recruiter sees a nice grid. The whole cultural signal is invisible, and if you *do* make it visible you're into stereotype territory.

The fix is already in your design system. You have `Fig. 01 — System I build` and a mono specimen-label language throughout. Turn those into **provenance labels**:

| Where | Label |
|---|---|
| Hero grid | `GRID · VASTU PURUSHA MANDALA · 8×8 PADA` |
| Section divider | `JALI · 6-FOLD · MUGHAL` |
| Experience rail | `STEPWELL · CHAND BAORI · RAJASTHAN · 13 STOREYS` |
| Metrics | `GRADUATED QUADRANT · JANTAR MANTAR · JAIPUR` |
| Texture swatch | `PULLI GRID · KOLAM · TAMIL NADU` |
| Frame | `PAR · DOUBLE BORDER · MADHUBANI · MITHILA` |
| Accent | `SILVER INLAY · BIDRIWARE · BIDAR · 14C` |
| Architecture figure | `NAVAYONI CONSTRUCTION · 9 TRIANGLES · 43 FORMS` |
| Footer | `SET IN ECZAR + RAJDHANI + ANEK — INDIAN TYPE FOUNDRY / EK TYPE` |

Why this is the highest-value item in the plan:

1. **It is the entire maximalist spec-plate aesthetic you already have** — it costs nothing stylistically, it *is* the style.
2. **It makes the heritage legible without a single Indian word.** All Latin, all uppercase mono.
3. **It is educational rather than boastful.** It states provenance, not superiority.
4. **It is an in-group signal.** Exactly the right kind of flex: the people who recognise these names will get it, and the ones who don't will just see a well-annotated design.
5. **It is honest.** Every label names a real, verifiable source. Where you have 4 storeys and Chand Baori has 13, the label says Chand Baori's number — it is citing the reference, not claiming equality.

I'd make this a component — `<Provenance source="..." ref="..." />` — rendered in the existing mono label style at `--muted-foreground`.

---

## 7. Component-by-component map

Concrete, file by file.

| File | Change |
|---|---|
| `globals.css` | Add `.grid-yantra`, `.par`, `.inlay`, `.jali`, `.pulli`, `.fill-*`, `.stitch`, `.rule-step`, `.arc-tick`. Add `--pada`, `--alloy`, `--inlay-color`, `--grid-line-strong` tokens. Retune the three palettes to Indigo / Madder / Silver |
| `components/ui/patterns.tsx` | **New.** Inline-SVG motif components: `JaliBand`, `KolamField`, `StepwellRule`, `GraduatedArc`, `SealMark`, `Provenance`. Server-safe, no hooks, like `primitives.tsx` |
| `components/Hero.tsx` | `.grid-paper` → `.grid-yantra`; jali light-sweep behind the grid; provenance label under the name row |
| `StackSchematic.tsx` | Reframe the plate with the concentric-level enclosure; two-tone inlay borders; provenance footnote |
| `Experience.tsx` | Becomes the stepwell: storey numbering, flight-length from real tenure, stepwell rule between entries |
| `Skills.tsx` | Graduated rules/arcs instead of generic bars; Rajdhani for group labels |
| `Projects.tsx` | Seal-mark index corners; `.par` frames; kantha-stitch on the "on request" chip |
| `About.tsx` | Pulli lattice ground; Madhubani fill band; the Panini paragraph as the thesis anchor |
| `Contact.tsx` | Kolam field that draws itself on entry |
| `Footer.tsx` | Provenance colophon (typefaces + motif sources) |
| `layout.tsx` | Font swaps; `data-grid` attribute alongside `data-palette` |
| `opengraph-image.tsx` | Seal stamp; indigo/silver palette; stepwell rule |
| `icon.svg` | Seal geometry replacing the current mark |

---

## 8. Motion

Four motions. All of them CSS/SVG, all gated on the existing reveal contract, all disabled under `prefers-reduced-motion`.

1. **Kolam draw** — `stroke-dasharray`/`dashoffset` transition on viewport entry. One continuous stroke over the pulli dots, drawing itself. Traditional kolam aim for a closed loop; the specimen sheet drawn up alongside this plan is an open serpentine, so either close it deliberately or describe it accurately as "one stroke". ~700ms, `--ease-out`.
2. **Stepwell descent** — scroll progress fills storeys top-down. Implemented on the existing scroll listener via a CSS custom property, no per-frame layout reads.
3. **Jali light sweep** — a very slow horizontal translation of the mask position behind the hero (60s+, linear). Ambient and almost subliminal.
4. **Graduated tick count-up** — ticks illuminate in sequence as `MetricCounter` counts. Ties the instrument metaphor to the existing number animation.

Explicitly **not** doing: parallax on the motifs (cheap-looking), blur/focus-pull transitions (violates the zero-blur rule), and any scroll-jacking beyond the Lenis instance already in place.

---

## 9. Explicitly excluded — the anti-cliché list

Hard exclusions, with reasons. This list is the plan's real value; it is what stops the site from drifting into a postcard.

**Stereotype elements (your constraint):**
- Paisley / ambi / kairi as generic ornament — the single most overused "Indian" shape on the web
- Lotus and padma as decoration
- Elephants, peacocks, camels, tigers, snakes
- Any deity imagery, *including* stylised line-art versions
- Om, trishul, swastika, chakra, or any religious or national symbol
- Saffron–white–green flag palette; gold-and-maroon "wedding invitation" palette
- Chai, auto-rickshaws, Bollywood, yoga-studio wellness branding, "namaste" energy
- Henna/mehndi as decorative line work
- Generic radial mandala-as-wellness-logo

**Text and script (your constraint):**
- Devanagari, Tamil, Bengali, Gurmukhi, Persian or Arabic script anywhere in the UI
- Transliterated phrases as copy ("shubh", "namaste", "atithi devo bhava")
- Indus Valley script glyphs — undeciphered, so any reproduction is fabrication
- Sanskrit numerals or *akshara* numbering

**Unusable-by-association:**
- Swastika-like motifs from the documented Harappan geometric repertoire (§3.8) — excluded outright

**Excluded for technical reasons (the design system forbids them):**
- **Ikat** — its entire visual signature is a *feathered, blurred* edge from the resist-dye process. It is a beautiful idea and it is fundamentally incompatible with your zero-blur rule. Noted rather than forced; revisit only if the rule ever relaxes.
- **Bandhani** — the tied-dot pattern is lovely, but at UI scale it collapses into the pulli lattice we already have. Redundant, so cut.
- **Thangka / Tibetan scroll painting** — not Indian.
- Full-bleed photography of monuments, gradients suggesting sunrise-over-Taj, and any "sunset palette". Photographs of real places are the fastest route to looking like a travel brochure.

**Also deliberately not applied everywhere:**
- **"No empty space" (Madhubani) applies to frames and bands, not to text.** Dense typography is unreadable typography. The maximalism works *because* the dense bands surround quiet type. I'll hold that line unless you tell me otherwise.

---

## 10. Verification plan

Non-negotiable, same standard as the last two rounds.

1. **Contrast** — `.archive/contrast-check.mjs` at 66/66 (84/84 if a fourth palette is added). New accent inks (Indigo, Madder, Silver) go through the harness *before* any component work. Silver is the risky one: a mid-tone metallic on both light paper and dark alloy is the hardest pairing in the set.
2. **Display fit** — any display typeface change invalidates the Archivo measurements. **Eczar's advance widths are completely different**; if the name font changes, `display-xl` gets re-measured from the new font's `hmtx` table exactly as before, at 320→2560px. Do not assume the current clamp survives.
3. **No-JS / reduced-motion** — curl the served HTML and confirm the kolam, stepwell fill and arcs are all visible without JS and with motion disabled. Motifs are decorative, but the *information* they sometimes carry (both previous bugs were here).
4. **Bundle** — measure before/after. Budget < 30 KB uncompressed for all motifs; they are inline SVG + CSS so this should be trivially met, but measure.
5. **A11y** — every motif is `aria-hidden`; provenance labels are real text and must be readable, not decorative; mask-based jali bands must not be the only thing conveying meaning.
6. **Visual sign-off** — still impossible for me locally (headless Chrome hangs in this sandbox, Playwright browsers are not installed). This round is *more* visual than the last two, so this gap matters more. Either you check it, or we set up a way for me to see it.

---

## 11. Open decisions for you

1. **Sri Yantra** — include the nine-triangle construction as the architecture figure's enclosure, or keep it strictly abstract? My recommendation is in §3.10: geometry yes, canonical yantra no.
2. **Display face** — Eczar (Indian-designed, high-contrast, changes the feel a lot) or keep Archivo (safe, industrial, proven at every breakpoint)? There is also a middle path: Archivo for the name, Eczar for section headings.
3. **The lime palette** — retire it, demote it to a specialist accent, or keep all four? Retiring it is the most coherent Indian-material story; keeping it is the most maximalist.
4. **How loud?** Two viable levels: **(a) grammar only** — grid, frames, borders, type, palette (the site looks refined and geometric, the Indian read is subtle), or **(b) grammar + figures** — add the stepwell Experience section, graduated arcs, kolam drawing and seal marks (unmistakably ours). I'd default to (b) because (a) risks being invisible, but this is your call.
5. **Regional weighting** — the plan is deliberately pan-Indian (Rajasthan, Gujarat, Karnataka, Tamil Nadu, Bihar, Mughal north, and the Indus). Anything to lead with or drop? Given Hyderabad, Mumbai, Mohali and Sonepat in your history, a Deccan–west-and-north weighting is defensible, but the current spread is honest about how widely these traditions travelled.
6. **Sequencing** — do you want Layer 1 (grid) shipped alone first so you can see the direction on the live site before committing to the rest?

---

## 12. Sources

Architecture & geometry
- [Chand Baori stepwell geometry](https://www.studiomatrx.org/architecture-canon/chand-baori-stepwell)
- [UNESCO — Rani-ki-Vav (the Queen's Stepwell), Patan](https://whc.unesco.org/en/list/922/)
- [Wikimedia — 64-grid Manduka Vastu Purusa Mandala temple plan](https://commons.wikimedia.org/wiki/File:64_grid_Manduka_design_Hindu_Temple_Floor_Plan_Vastu_Purusa_Mandala_Ancient_Architecture.svg)
- [Vastu Purusha Mandala grids (8×8 / 9×9)](https://vastuvilla.com/blog/vastu_purusha_mandala_in_contemporary_villa_design)

Kolam & formal grammars
- [Nature — An algorithm for one-stroke kolam generation](https://www.nature.com/articles/s40494-026-02310-3)
- [MIT Design Issues — The Kolam Drawing: A Point Lattice System](https://direct.mit.edu/desi/article-pdf/38/3/34/2032937/desi_a_00690.pdf)
- [Kambi Kolam as Algorithmic Pattern](https://alpaca.pubpub.org/pub/xywz3ebv)
- [Generating kolam patterns using kolam picture grammar](https://www.inderscienceonline.com/doi/pdf/10.1504/IJITST.2018.093384?download=true)

Craft, material & motif
- [Wikipedia — Bidriware](https://en.wikipedia.org/wiki/Bidriware)
- [Asia Research News — Southern India's Bidriware](https://www.asiaresearchnews.com/content/centuries-old-metalwork-tradition-%E2%80%94-southern-india%E2%80%99s-bidriware)
- [Aramco World — Mughal jaali lattice screens](https://www.aramcoworld.com/articles/2022/art-of-islamic-patterns-mughal-jaali)
- [DailyArt — Jali in Mughal architecture](https://www.dailyartmagazine.com/jali-in-mughal-architecture-the-most-delicate-stone-curtains/)
- [Artflute — What is Madhubani painting](https://www.artflute.com/blog/what-is-madhubani-painting)
- [Anuprerna — Madhubani wall art](https://anuprerna.com/stories/madhubani-wall-art/93791248)
- [Wikipedia — Kantha](https://en.wikipedia.org/wiki/Kantha)

Instruments, measurement & generative systems
- [Wikipedia — Jantar Mantar, Jaipur](https://en.wikipedia.org/wiki/Jantar_Mantar,_Jaipur)
- [jantarmantar.org — Samrat Yantra](https://www.jantarmantar.org/learn/observatories/instruments/samrat/index.html)
- [Computing Processes and Panini's Ashtadhyayi](https://bhavana.org.in/computing-processes-and-pan%CC%A3inis-as%CC%A3t%CC%A3adhyayi/)
- [Paninian Grammar: Computational Linguistics Before Computers](https://iksai.hcommons.org/2026/03/14/paninian-grammar-computational-linguistics-before-computers/)

Indus & iconography
- [Harappa.com — Indus Seals (2600–1900 BCE), Beyond Geometry](https://www.harappa.com/content/indus-seals-2600-1900-bce-beyond-geometry-new-approach-break-old-code)
- [Smarthistory — An Indus Seal](https://smarthistory.org/indus-seal/)
- [Harappan Geometry and Symmetry (ResearchGate)](https://www.researchgate.net/publication/265828493_Harappan_Geometry_and_Symmetry_A_Study_of_Geometrical_Patterns_on_Indus_Objects)
- [Wikipedia — Sri Yantra](https://en.wikipedia.org/wiki/Sri_Yantra)

Typography
- [Indian Type Foundry](https://www.indiantypefoundry.com/)
- [GitHub — itfoundry/rajdhani (modularised letterforms, flat terminals)](https://github.com/itfoundry/rajdhani)
- [Google Design — Anek, Google's multiscript font](https://design.google/library/anek-multiscript)
- [Ek Type — Anek family](https://ektype.in/anek-family.html)
- [Google Fonts — Mukta](https://fonts.google.com/specimen/Mukta)

**Weak evidence, flagged:** the specific claim that Ajrakh resist-dye traces back ~4,500 years, and the "212 pillars / 500 sculptures" figures for Rani ki Vav, come from craft-trade and social sources rather than institutional ones. I have not used either as a design justification. Likewise, the Warli and Gond entries (geometric tribal painting, Maharashtra and Madhya Pradesh) are well-known traditions but my search returned commerce pages rather than scholarly ones — so **I deliberately left them out of the system above** rather than assert detail I could not source. Worth a dedicated pass if you want them in.

---

# IMPLEMENTATION STATUS — 23 Sep 2026

All six layers shipped in one pass. Build clean, 7 routes static, contrast harness at **104/104**.

## What shipped

| Layer | Shipped as |
|---|---|
| 1 · Grid | `.grid-yantra` replaces `.grid-paper`. Two line weights (fine pada + heavier mandala every 8) plus a dot at every node, so it reads as a plan rather than as graph paper. `data-grid="8x8"` on `<html>`; `9x9` also wired. |
| 2 · Frame | Bidriware inlay channel on every `.frame*` — 2px body, 2px gap, 1px wire, via two inset shadows (no extra DOM). `.par` added for the Madhubani doubled border. |
| 3 · Lattice | `<JaliBand>` — a real hexagonal honeycomb on the two-sublattice lattice (pitch √3r, 3r). In the footer, under the wordmark. |
| 4 · Texture | `.pulli` (dot lattice) on the portrait; `.rule-stitch` (kantha) replaces the hairline in every `SectionHeading`; `.stitch-box` replaces dashed borders; `.fill-line/-cross/-dot` added. |
| 5 · Figure | `<StepwellBand>` replaces the mountain ridge in the hero. Experience is now the stepwell: storeys numbered, stepped rules between entries, and **flight length = real tenure in months**. `<GraduatedArc>` + `.rule-graduated` put the metrics on a Jantar Mantar scale. `<SealMark>` stamps the plates, the OG card and the favicon. `<KolamField>` draws itself in Contact. |
| 6 · Material | Label voice moved to **Rajdhani** (ITF) — size up, tracking down, weight 600. Four material palettes: Indigo / Madder / Mehendi / **Bidri** (new). |
| — | `<Provenance>` on nine surfaces, naming each motif's source in Latin script. |

## Decisions I had to make (you said "implement the plan" without answering §11)

1. **Sri Yantra — geometry only, and then not even that.** The canonical yantra is not reproduced anywhere. Beyond that I went further than the plan: I deliberately did **not** force the architecture figure into sacred geometry. The eight layers are a real SRE stack, and drawing a Kafka diagram as a yantra would be pastiche, which is the one thing the plan set out to avoid. The figure gets a seal stamp and the inlay channel instead.
2. **Display face — kept Archivo.** Rajdhani went in for the label voice, which is the change that does the most work per unit of risk. Eczar would change the site's entire personality, I cannot see the result, and Archivo's hero fit is measured and proven. **It is a one-line swap in `layout.tsx` if you want it.**
3. **Lime kept, not retired.** You said you love the theme; quietly deleting an accent you like is the highest-regret option available. It is renamed **Mehendi**, and **Bidri** is added alongside it as a genuinely new material palette.
4. **"Grammar + figures" (option b).** The Indian read is unmistakable rather than subtle.
5. Pan-Indian weighting, as planned. All layers in one pass, as planned.

## Three bugs found while implementing — all pre-existing

1. **`text-loud-2` used as type failed WCAG AA at 2.80:1** in light mode, and had been shipping. The bright value is fine for borders and fills but not for text. Fixed with a `--loud-2-ink` token; the harness now checks it, which is why the count went from 66 to 104 (also 13 pairs × 4 palettes × 2 themes).
2. **The Experience copy claimed "Five roles." There are six.** Corrected to "Six roles".
3. **Tenure parsing silently failed** on first pass: the data uses an em dash (—), my split regex only handled hyphen and en dash, so all six flights fell back to "—". Caught by checking the rendered output rather than trusting the code. Now parses 6 / 5 / 14 / 15 / 12 / 6 months, which I verified by hand against each period.

## Deliberate deviations

- **Jali is inline stroked SVG, not a CSS `mask-image`.** Same geometry, no data-URI encoding, no risk of a malformed mask. The "light through the screen" read survives because the strokes are the stone and the gaps are the holes.
- **Proportional flights use a 12-step scale**, not a literal step count, with the month count printed beside each flight so the encoding is legible rather than a private metaphor.
- Ikat and Bandhani still excluded (zero-blur rule; redundancy with pulli). Warli and Gond still excluded — sources were too thin to assert detail.
- `/alt` keeps its own red-and-cream design; it is a separate, unlinked page.

## Verification, and its limits

Passed:
- `npm run build` — clean, 7 routes static, no type errors.
- Contrast — **104/104** WCAG AA across 4 palettes × 2 themes.
- SSR containment — all 9 provenance labels, `data-palette="indigo"`, `data-grid="8x8"`, the kolam path and `--kolam-length` are in the server HTML, so none of this depends on JS.
- `.kolam-draw` base state confirmed as `stroke-dashoffset: 0` in the built CSS — the stroke is drawn by default and only JS marking the wrapper `pending` hides it. The reveal contract holds.
- Built CSS — every new class present, and **zero** trace of `grid-paper`, `halftone`, `volt`, `hazard` or `signal`.
- Rajdhani self-hosted: `@font-face` emitted, variable class on `<html>`, 5 font files preloaded.
- Tenure data checked by hand against all six period strings.
- **The OG card was rendered and inspected visually** — seal mark, indigo role line, graduated scale and provenance caption all correct, no clipping. That is genuine visual confirmation of one surface.

**Not passed — and this is the important one:**

> **I still cannot render the main page.** Headless Chrome hangs indefinitely in this sandbox (it had to be backgrounded and killed, twice), Playwright's browsers are not installed, and the built-in browser is disabled. Everything above about the page itself is measurement and inspection of markup and CSS, not looking at it.

This round changed far more of the *appearance* than the previous two, so that gap is bigger than it was. Specific things worth your eye, in rough order of risk:

1. **Rajdhani at label sizes.** It is a condensed face; the sizes were compensated on reasoning, not observation. If labels look cramped or too light anywhere, that is the first thing to tune.
2. **The inlay channel on every frame.** Two inset shadows on every plate is a deliberate density decision — it could read as busy.
3. **The stepwell hero band.** The flights are generated geometry, and I sized the step and rise without seeing them. They may want to be shallower.
4. **The Experience storey rail**, where the new flight sits under the role/location row.

Nothing has been committed or pushed.
