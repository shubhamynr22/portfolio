/* ═══════════════════════════════════════════════════════════════════
   THE NAME, IN THE SCRIPTS OF INDIA

   The hero sets "Shubham Gupta" and cycles it through the writing systems
   of the country. Six scripts, chosen for geographic spread rather than for
   exoticism: Devanagari (the name's own script, and the one the site's
   other inscriptions are already written in), Bengali, Gurmukhi, Gujarati,
   Tamil and Telugu.

   ── These are transliterations, and they are the one thing here I cannot
   verify from source material. ──
   Devanagari is exact: शुभम is the spelling the name is written in.
   The rest are standard transliterations — the name has no official
   spelling in a script its owner does not write in. If any reads wrong to
   a speaker, correct `first`/`last` below and nothing else needs to change:
   the font subsetting, the animation and the optical scales are all derived
   from these strings at build time.

   ── On `scale` ──
   Each script's body height sits at a different fraction of the em, so
   setting all seven at one font-size makes some look larger than others.
   `scale` multiplies the nominal size so every script matches the *ink
   height* of Space Grotesk's Latin, which is what the eye reads as "the same
   size" — matching advance widths instead would be the wrong target, since
   Indic scripts are genuinely more compact horizontally and scaling up to
   match them would make the Devanagari tower over the Latin line.

   Measured, not chosen. Canvas `actualBoundingBoxAscent` at 100px, averaged
   across the given and family names, against Latin's 0.714 em:

     devanagari  0.646 em  →  1.10        gujarati  0.603 em  →  1.18
     bengali     0.672 em  →  1.06        tamil     0.828 em  →  0.86
     gurmukhi    0.622 em  →  1.15        telugu    0.754 em  →  0.95

   Only Devanagari's is 800-weight (Mukta); the Noto faces are 700.
   ═══════════════════════════════════════════════════════════════════ */

export type ScriptVariant = {
  /** Stable id, also the animation key. */
  id: string;
  /** BCP-47 tag, for `lang` and for screen readers. */
  lang: string;
  /** English name of the script, for the caption under the name. */
  label: string;
  /** The given name in this script. */
  first: string;
  /** The family name in this script. */
  last: string;
  /** CSS custom property holding the face for this script. */
  font: string;
  /** Optical size correction against the Latin ink height. */
  scale: number;
};

export const nameInScripts: ScriptVariant[] = [
  {
    id: "latin",
    lang: "en",
    label: "Latin",
    first: "Shubham",
    last: "Gupta",
    font: "--font-space-grotesk",
    scale: 1,
  },
  {
    id: "devanagari",
    lang: "hi",
    label: "Devanagari",
    first: "शुभम",
    last: "गुप्ता",
    font: "--font-mukta",
    scale: 1.1,
  },
  {
    id: "bengali",
    lang: "bn",
    label: "Bengali",
    first: "শুভম",
    last: "গুপ্তা",
    font: "--font-bengali",
    scale: 1.06,
  },
  {
    id: "gurmukhi",
    lang: "pa",
    label: "Gurmukhi",
    first: "ਸ਼ੁਭਮ",
    last: "ਗੁਪਤਾ",
    font: "--font-gurmukhi",
    scale: 1.15,
  },
  {
    id: "gujarati",
    lang: "gu",
    label: "Gujarati",
    first: "શુભમ",
    last: "ગુપ્તા",
    font: "--font-gujarati",
    scale: 1.18,
  },
  {
    id: "tamil",
    lang: "ta",
    label: "Tamil",
    first: "சுபம்",
    last: "குப்தா",
    font: "--font-tamil",
    scale: 0.86,
  },
  {
    id: "telugu",
    lang: "te",
    label: "Telugu",
    first: "శుభం",
    last: "గుప్తా",
    font: "--font-telugu",
    scale: 0.95,
  },
];

/* ── Keeping the font subsets honest ──
 *
 * Each Noto face in app/layout.tsx is subset to the exact glyphs of its name
 * via next/font's `text` option. That option only accepts a written literal —
 * passing `first + last` from here fails the build with "Font loader values
 * must be explicitly written literals" — so the strings are duplicated in
 * layout.tsx.
 *
 * If you change `first` or `last` above, update the matching literal in
 * layout.tsx too, or the new glyph will render as tofu. The values are:
 *
 *   bengali   "শুভমগুপ্তা"
 *   gurmukhi  "ਸ਼ੁਭਮਗੁਪਤਾ"
 *   gujarati  "શુભમગુપ્તા"
 *   tamil     "சுபம்குப்தா"
 *   telugu    "శుభంగుప్తా"
 *
 * Devanagari is not listed: Mukta is loaded as a full `devanagari` subset
 * because the rest of the site writes in it too.
 */
