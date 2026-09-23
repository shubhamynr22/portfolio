import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════
   MOTIF LIBRARY

   Every form here is drawn to its source geometry rather than to a mood:
   the jali has real 6-fold symmetry, the kolam is a genuine single stroke
   over a pulli lattice, the seal uses only the geometric corpus. Sources are
   named at each component and surfaced in the UI through <Provenance>.

   Server-safe (no hooks), so these render in both Server and Client trees.
   ═══════════════════════════════════════════════════════════════════ */

/* ── Provenance ──
   The device that makes an abstract system legible as culture. Pure geometry
   reads as "nice grid" and nobody knows it is Indian; obvious cultural
   markers read as costume. Naming the source resolves both: Latin script
   only, factual, and it is exactly the specimen-label language the rest of
   the site already speaks. */

export function Provenance({
  children,
  className,
  seal = true,
}: {
  children: ReactNode;
  className?: string;
  seal?: boolean;
}) {
  return (
    <span
      className={cn(
        "mono-sm inline-flex items-center gap-2 text-muted-foreground",
        className,
      )}
    >
      {seal ? <SealMark className="h-2.5 w-2.5 shrink-0 opacity-70" /> : null}
      <span>{children}</span>
    </span>
  );
}

/* ── Seal mark ──
   Indus Valley seals, c. 2600–1900 BCE: square stamps carrying geometric
   lattice work. The script on those seals is still undeciphered, so no glyph
   is reproduced here — geometric corpus only (grids, crosses, concentric
   squares). Some documented Harappan motifs are excluded outright for
   obvious reasons; none of them appear. */

export function SealMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="1" width="18" height="18" strokeWidth="2" />
      <rect x="5" y="5" width="10" height="10" strokeWidth="1" />
      <path d="M10 2.5v3M10 14.5v3M2.5 10h3M14.5 10h3" strokeWidth="1" />
    </svg>
  );
}

/* ── Jali band ──
   Mughal pierced-stone screen. Under Akbar the vocabulary was hexagonal and
   octagonal; the mature repertoire runs on 6- and 12-sided figures. This is
   a true hexagonal honeycomb — pointy-top hexagons on the standard
   two-sublattice lattice, pitch √3r horizontally and 3r vertically. The
   strokes are the stone; the gaps are where the light comes through.

   The pattern id is derived from the geometry, so two bands with the same
   radius share one def — identical content, so sharing is safe, and it keeps
   the id stable between server and client (no hydration mismatch). */

const JALI_RADIUS = 9;

function hexPoints(cx: number, cy: number, r: number) {
  return [90, 150, 210, 270, 330, 30]
    .map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return `${(cx + r * Math.cos(rad)).toFixed(2)},${(cy + r * Math.sin(rad)).toFixed(2)}`;
    })
    .join(" ");
}

export function JaliBand({
  className,
  height = 27,
  strokeWidth = 1.4,
}: {
  className?: string;
  /** Height in px. 27 = one hexagon row, 54 = two, and so on. */
  height?: number;
  strokeWidth?: number;
}) {
  const r = JALI_RADIUS;
  const w = Math.sqrt(3) * r;
  const patternId = `jali-hex-${r}`;

  /* Sublattice A sits at (i·w, 3r·j); sublattice B at ((i+½)·w, 3r·j + 1.5r).
     Only the cells whose reach intersects the tile are drawn — five of them,
     which is enough for a seamless repeat. */
  const centres: Array<[number, number]> = [
    [0, 0],
    [w, 0],
    [w / 2, 1.5 * r],
    [0, 3 * r],
    [w, 3 * r],
  ];

  return (
    <svg
      className={cn("block w-full text-border-strong/35", className)}
      height={height}
      width="100%"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={patternId}
          width={w}
          height={3 * r}
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinejoin="miter"
          >
            {centres.map(([cx, cy]) => (
              <polygon key={`${cx}-${cy}`} points={hexPoints(cx, cy, r)} />
            ))}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${patternId})`} />
    </svg>
  );
}

/* ── Kolam field ──
   Tamil Nadu. Kolam are drawn as ONE continuous stroke (ideally closed)
   around a lattice of pulli — dots. They are the subject of a real formal
   language literature: picture grammars, one-stroke generation algorithms.
   That is why this is the site's motion system: the pattern is literally an
   algorithm, which is the quiet thesis of the whole design.

   The path is generated rather than hand-authored so the geometry stays
   honest if the lattice changes. It is a serpentine that loops around every
   dot, which is one continuous stroke but is NOT closed — described as such
   rather than overclaimed. */

function kolamGeometry(dots: number, spacing: number, radius: number, pad: number) {
  const points: Array<[number, number]> = [];
  for (let row = 0; row < dots; row += 1) {
    const columns = Array.from({ length: dots }, (_, i) => i);
    if (row % 2 === 1) columns.reverse();
    for (const col of columns) {
      points.push([pad + col * spacing, pad + row * spacing]);
    }
  }

  let d = `M${points[0][0] - radius} ${points[0][1]}`;
  points.forEach(([x, y], i) => {
    if (i > 0) d += `L${x - radius} ${y}`;
    // Two half-arcs make a full loop around the dot and return to the start.
    d += `a${radius} ${radius} 0 1 0 ${2 * radius} 0a${radius} ${radius} 0 1 0 ${-2 * radius} 0`;
  });

  // Total length, so the draw animation can run without getTotalLength().
  const loops = points.length * 2 * Math.PI * radius;
  const connectors = points.reduce((sum, [x, y], i) => {
    if (i === 0) return sum;
    const [px, py] = points[i - 1];
    return sum + Math.hypot(x - px, y - py);
  }, 0);

  return { d, points, length: loops + connectors };
}

export function KolamField({
  className,
  dots = 5,
  draw = false,
}: {
  className?: string;
  dots?: number;
  /** Draw itself once the surrounding <Reveal> enters. See .kolam-draw. */
  draw?: boolean;
}) {
  const spacing = 22;
  const radius = 5;
  const pad = 15;
  const { d, points, length } = kolamGeometry(dots, spacing, radius, pad);
  const size = pad * 2 + (dots - 1) * spacing;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={cn("block", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor" opacity="0.45">
        {points.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.7" />
        ))}
      </g>
      <path
        d={d}
        fill="none"
        stroke="var(--primary-ink)"
        strokeWidth="1.6"
        strokeLinecap="round"
        className={draw ? "kolam-draw" : undefined}
        style={draw ? ({ "--kolam-length": length } as CSSProperties) : undefined}
      />
    </svg>
  );
}

/* ── Graduated arc ──
   Jantar Mantar, Jaipur: naked-eye astronomical instruments built at
   architectural scale, the Samrat Yantra's quadrant divided into degrees and
   reading solar time to within about two seconds. A quarter arc with real
   tick intervals, used as an instrument mark — deliberately NOT wired to a
   value, because there is no measured quantity behind it and a filled arc
   that encodes nothing would be a lie told in data's clothing. */

function graduatedTicks(
  cx: number,
  cy: number,
  r: number,
  count: number,
  majorEvery: number,
  majorLen: number,
  minorLen: number,
) {
  return Array.from({ length: count }, (_, k) => {
    // −90° (straight up) sweeping to 0° (straight right).
    const rad = ((-90 + (k * 90) / (count - 1)) * Math.PI) / 180;
    const len = k % majorEvery === 0 ? majorLen : minorLen;
    return {
      x1: cx + r * Math.cos(rad),
      y1: cy + r * Math.sin(rad),
      x2: cx + (r - len) * Math.cos(rad),
      y2: cy + (r - len) * Math.sin(rad),
    };
  });
}

export function GraduatedArc({ className }: { className?: string }) {
  const cx = 14;
  const cy = 106;
  const r = 88;
  const ticks = graduatedTicks(cx, cy, r, 13, 3, 10, 5);

  return (
    <svg
      viewBox="0 0 112 112"
      className={cn("block", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={`M${cx} ${cy - r} A${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="var(--border-strong)"
        strokeWidth="1.6"
      />
      <g stroke="var(--border-strong)" strokeWidth="1.2" opacity="0.75">
        {ticks.map((t) => (
          <line
            key={`${t.x1}-${t.y1}`}
            x1={t.x1.toFixed(1)}
            y1={t.y1.toFixed(1)}
            x2={t.x2.toFixed(1)}
            y2={t.y2.toFixed(1)}
          />
        ))}
      </g>
    </svg>
  );
}
