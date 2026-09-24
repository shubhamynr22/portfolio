import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { nameInScripts } from "@/lib/scripts";

/* ═══════════════════════════════════════════════════════════════════
   MOTIF LAYER

   Four devices, all lifted from the reference and all doing a job. Nothing
   here is a picture of a culture: the jali is a real screen pattern, the
   corner marks are the reference's own instrument device, and the name
   alternates between two living scripts.
   ═══════════════════════════════════════════════════════════════════ */

/* ── Jali ──
   The pierced lattice screen — a rotated square on a 32px tile with a
   single bead at the crossing, exactly the reference's geometry. It is a
   *screen*: it lets the ground through rather than covering it, which is
   why it is layered at 1/30th opacity instead of being drawn at full
   strength and then faded.

   Uses currentColor for the lattice and the accent for the bead, so one
   component works on the page ground, inside a card, and inverted. */
export function Jali({
  id = "jali",
  size = 32,
  className,
  opacity = 0.05,
}: {
  id?: string;
  size?: number;
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={id}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M${size / 2} 0 L${size} ${size / 2} L${size / 2} ${size} L0 ${size / 2} Z`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx={size / 2} cy={size / 2} r="2" fill="var(--secondary)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ── Corner marks ──
   An L-bracket and an inscription, one per corner. The reference draws these
   with box-drawing glyphs (┌ ०५, संवाद ┐) and so did the first pass of this
   — which is a font-coverage bet, not a design decision: U+250C is absent
   from Space Mono's Latin subset, so every bracket quietly fell through to
   whichever system font happened to have it, at that font's weight and
   baseline. Rendering them as two borders instead makes the geometry ours
   and the glyph set irrelevant.

   The inscriptions carry the section index and engineering vocabulary —
   संरचना (structure), सूत्र (thread), स्थैर्य (stability) — which is the
   honest version of the device: labels, not incantation. */
export function CornerMarks({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  className,
}: {
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  className?: string;
}) {
  const marks: Array<[ReactNode, string, "left" | "right"]> = [
    [topLeft, "top-3.5 left-4", "left"],
    [topRight, "top-3.5 right-4", "right"],
    [bottomLeft, "bottom-3.5 left-4", "left"],
    [bottomRight, "bottom-3.5 right-4", "right"],
  ];
  return (
    <>
      {marks.map(([content, pos, side], i) =>
        content ? (
          <span
            key={i}
            aria-hidden="true"
            data-side={side}
            className={cn("corner", pos, className)}
          >
            <span className="corner-bracket" />
            {content}
          </span>
        ) : null,
      )}
    </>
  );
}

/* ── Live dot ──
   Status indicator: a solid bead with a soft ring expanding out of it. The
   reference pairs this with its availability banner, which is the one place
   on a portfolio where a status light means something. */
export function LiveDot({
  className,
  tone = "secondary",
}: {
  className?: string;
  tone?: "secondary" | "live";
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-flex h-2 w-2 shrink-0", className)}
    >
      <span
        className={cn(
          "ping-soft absolute inset-0 rounded-full",
          tone === "live" ? "bg-live" : "bg-secondary",
        )}
      />
      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full",
          tone === "live" ? "bg-live" : "bg-secondary",
        )}
      />
    </span>
  );
}

/* ── NameCycler ──
   One line of the name, present in all seven scripts at once and moved
   between them by CSS alone — no timer, no client JS, nothing to hydrate.

   Grapheme segmentation is not optional here. Splitting by code point would
   cut शुभम into श + ु, and each span shapes independently, so the vowel sign
   would detach from its consonant and render against a dotted circle.
   Intl.Segmenter keeps clusters intact, and the Indic rules it implements
   (UAX #29 / InCB) keep conjuncts like गु*प्ता* in one piece. The fallback
   only fires on runtimes without it, and is worse rather than wrong. */
function splitGraphemes(word: string): string[] {
  const Segmenter = (
    Intl as unknown as {
      Segmenter?: new (
        locale?: string,
        opts?: { granularity: string },
      ) => { segment(input: string): Iterable<{ segment: string }> };
    }
  ).Segmenter;

  if (typeof Segmenter === "function") {
    const segmenter = new Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(word), (s) => s.segment);
  }
  return Array.from(word);
}

/** Seconds each glyph waits behind the one before it, so the word arrives
 *  as a wave rather than all at once. Kept small: the whole stagger for a
 *  six-letter word has to fit inside the ~3% overlap between two scripts. */
const GLYPH_STEP = 0.06;

export function NameCycler({
  line,
  animate = true,
  cycle = "18s",
  className,
}: {
  line: "first" | "last";
  animate?: boolean;
  /** Full cycle length — every script's window is a percentage of it. */
  cycle?: string;
  className?: string;
}) {
  return (
    <span
      className={cn("name-scripts", className)}
      data-animate={animate ? "true" : undefined}
      style={{ "--name-cycle": cycle } as CSSProperties}
      aria-hidden="true"
    >
      {nameInScripts.map((script) => {
        const word = line === "first" ? script.first : script.last;
        return (
          <span
            key={script.id}
            className="name-variant"
            data-script={script.id}
            lang={script.lang}
            style={
              {
                "--script-font": `var(${script.font})`,
                "--script-scale": script.scale,
              } as CSSProperties
            }
          >
            {splitGraphemes(word).map((glyph, index) => (
              <span
                key={index}
                className="name-glyph"
                style={
                  {
                    "--glyph-delay": `${(index * GLYPH_STEP).toFixed(3)}s`,
                  } as CSSProperties
                }
              >
                {glyph}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}

/* ── ScriptCaption ──
   Names whichever script is on screen, driven by the same keyframes on the
   same clock. Without it a visitor who does not read the script sees only
   that the name changed into something they cannot identify — the caption is
   what turns the animation from a trick into a piece of information. */
export function ScriptCaption({ className }: { className?: string }) {
  return (
    <span className={cn("name-caption inline-grid align-baseline", className)}>
      {nameInScripts.map((script) => (
        <span
          key={script.id}
          className="name-script-label label text-secondary"
          data-script={script.id}
          lang={script.lang}
          style={{ gridArea: "1 / 1" }}
        >
          {script.label}
        </span>
      ))}
    </span>
  );
}

/* ── Devanagari numerals ──
   Every counting number on the site is written in Devanagari: section
   indices, nav numbering, career storeys, project positions, relay codes.
   These are notation — they label where you are, they are not data you have
   to read a value off — so the script costs a visitor nothing.

   Quantities are the deliberate exception and stay in Latin digits: 3+
   years, 100K+ concurrent users, 50% latency cut, a 7.9/10 CGPA. Those are
   the numbers a recruiter scans for, and १००K+ is a decode step in front of
   the one piece of proof on the page. Notation converts; measurements do
   not. */
const DEVA_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export function devaNumber(n: number, pad = 0): string {
  const digits = pad > 0 ? String(n).padStart(pad, "0") : String(n);
  return digits
    .split("")
    .map((d) => DEVA_DIGITS[Number(d)] ?? d)
    .join("");
}

/** Zero-padded to two places, matching the "०१" the reference counts in. */
export function DevaIndex({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <span className={cn("label text-secondary", className)} lang="hi">
      {devaNumber(value, 2)}
    </span>
  );
}
