import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

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

/* ── NameLine ──
   One line of the name, held in both scripts at once and cycled between
   them by CSS alone — no timer, no client JS, nothing to hydrate.

   Accessibility: the wrapping <h1> carries aria-label with the plain Latin
   name and the Devanagari span is aria-hidden, so a screen reader hears the
   name once rather than twice. Latin stays the visible default, so with JS
   off or motion reduced what renders is the ordinary name. */
export function NameLine({
  latin,
  deva,
  animate = true,
  cycle = "10s",
  className,
}: {
  latin: string;
  deva: string;
  animate?: boolean;
  /** Full cycle length; each script holds for half of it. */
  cycle?: string;
  className?: string;
}) {
  return (
    <span
      className={cn("name-swap", className)}
      data-animate={animate ? "true" : undefined}
      style={{ "--name-cycle": cycle } as CSSProperties}
    >
      <span className="name-latin">{latin}</span>
      <span className="name-deva" lang="hi" aria-hidden="true">
        {deva}
      </span>
    </span>
  );
}

/* ── Devanagari numerals ──
   Section indices are counted in the script the site's culture actually
   counts in. Used as notation, next to the Latin numeral rather than
   replacing it, so nothing becomes unreadable to a visitor who cannot read
   Devanagari digits. */
const DEVA_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export function devaNumber(n: number): string {
  return String(n)
    .split("")
    .map((d) => DEVA_DIGITS[Number(d)] ?? d)
    .join("");
}

export function DevaIndex({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <span className={cn("label text-secondary", className)} lang="hi">
      {devaNumber(value)}
    </span>
  );
}
