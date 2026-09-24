import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DevaIndex } from "@/components/ui/patterns";

/* ═══════════════════════════════════════════════════════════════════
   PRESENTATIONAL PRIMITIVES
   Server-safe (no hooks) so they work in both Server and Client trees.
   ═══════════════════════════════════════════════════════════════════ */

/* ── Notation ── */

export function Label({
  children,
  className,
  tone = "muted",
  lang,
}: {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "primary" | "foreground" | "gold" | "outline";
  /** Set where the label is not English — Devanagari notation and
   *  Devanagari numerals — so a screen reader picks the right voice. */
  lang?: string;
}) {
  const tones = {
    muted: "text-muted-foreground",
    outline: "text-outline",
    primary: "text-primary",
    /* Gold is the notation accent. It clears 5:1 on every ground in both
       themes, so unlike the previous build's bright accent it needs no
       separate *-ink* variant. */
    gold: "text-secondary",
    foreground: "text-foreground",
  } as const;
  return (
    <span lang={lang} className={cn("label", tones[tone], className)}>
      {children}
    </span>
  );
}

/* ── Structure ── */

export function Rule({
  className,
  variant = "hair",
}: {
  className?: string;
  variant?: "hair" | "strong";
}) {
  return (
    <div
      className={cn(variant === "hair" ? "rule" : "rule-strong", className)}
      aria-hidden="true"
    />
  );
}

/* ── Surfaces ── */

/** The site's anchor surface: the reference's terminal card. */
export function Terminal({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "figure" | "form";
}) {
  return <Tag className={cn("terminal", className)}>{children}</Tag>;
}

export function Panel({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "figure";
}) {
  return <Tag className={cn("panel", className)}>{children}</Tag>;
}

/* ── Status ── */

export function Pill({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "gold" | "primary";
}) {
  const tones = {
    default: "border-outline-variant text-muted-foreground",
    gold: "border-secondary/40 text-secondary",
    primary: "border-primary/40 text-primary",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border bg-surface-high/60 px-2 py-1 font-mono text-[0.6875rem] leading-none whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ── Marquee (CSS-only, duplicated track for a seamless loop) ── */

export function Marquee({
  children,
  className,
  duration = "48s",
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  duration?: string;
  reverse?: boolean;
}) {
  return (
    <div className={cn("marquee overflow-hidden", className)}>
      <div
        className="marquee-track"
        data-reverse={reverse ? "true" : undefined}
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Section scaffolding ──
   The reference's page rhythm: a 1200px column, 3rem gutters at desktop. */
export function Section({
  id,
  children,
  className,
  size = "md",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "py-14 sm:py-16",
    md: "py-16 sm:py-24",
    lg: "py-20 sm:py-28",
  } as const;

  return (
    <section id={id} className={cn("relative isolate", sizes[size], className)}>
      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}

/* ── Section heading ──
   The reference's own header: a short gold dash, an uppercase mono label,
   and a counter on the far right — then the statement underneath. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  aside,
  size = "lg",
}: {
  index: number;
  /** Optional. Omitted wherever it would only restate the title. */
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  className?: string;
  /** Right-hand notation, e.g. "०८ domains" — balances the header row. */
  aside?: string;
  size?: "md" | "lg";
}) {
  return (
    <header className={cn("relative", className)}>
      <div className="flex items-center gap-3 pb-4">
        <span className="h-px w-5 bg-secondary" aria-hidden="true" />
        <DevaIndex value={index} />
        {eyebrow ? <Label tone="gold">{eyebrow}</Label> : null}
        <span className="flex-1" />
        {aside ? <Label tone="outline">{aside}</Label> : null}
      </div>

      <h2
        className={cn(
          "display text-balance text-foreground",
          size === "lg" ? "display-lg" : "display-md",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}
