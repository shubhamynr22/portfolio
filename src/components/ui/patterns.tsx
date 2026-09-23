import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════
   NAME + PROVENANCE

   All the motif components this file used to hold are gone with the
   maximalist layer. Two things survive because they carry meaning rather
   than ornament.
   ═══════════════════════════════════════════════════════════════════ */

/* ── Provenance ──
   Names where a structural idea came from. Kept because with the ornament
   removed this is what still carries the heritage, and it is plain small
   type rather than a picture. */
export function Provenance({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mono-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

/* ── NameLine ──
   One line of the name, held in both scripts at once and cycled between
   them by CSS alone — no timer, no client JS, nothing to hydrate.

   Accessibility: the wrapping <h1> carries aria-label with the plain Latin
   name, and the Devanagari span is aria-hidden so a screen reader hears the
   name once rather than twice. Latin stays the visible default, so with JS
   off or motion reduced what renders is the ordinary name.

   Both spans share one grid cell, so the line is always as wide as the wider
   script and nothing shifts as it alternates. */
export function NameLine({
  latin,
  deva,
  animate = true,
  cycle = "9s",
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
