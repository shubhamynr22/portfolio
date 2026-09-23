import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════
   PRESENTATIONAL PRIMITIVES
   Server-safe (no hooks) so they work in both Server and Client trees.
   ═══════════════════════════════════════════════════════════════════ */

/* ── Mono notation ── */

export function Label({
  children,
  className,
  tone = "muted",
}: {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "primary" | "foreground" | "loud";
}) {
  const tones = {
    muted: "text-muted-foreground",
    primary: "text-primary-ink",
    foreground: "text-foreground",
    loud: "text-loud-2",
  } as const;
  return (
    <span className={cn("mono", tones[tone], className)}>{children}</span>
  );
}

export function Index({
  value,
  className,
}: {
  value: number | string;
  className?: string;
}) {
  const formatted =
    typeof value === "number" ? String(value).padStart(2, "0") : value;
  return (
    <span
      className={cn("mono-sm text-muted-foreground tabular-nums", className)}
    >
      [{formatted}]
    </span>
  );
}

/* ── Structure ── */

export function Rule({
  className,
  variant = "hair",
}: {
  className?: string;
  variant?: "hair" | "strong" | "dashed";
}) {
  const variants = {
    hair: "rule",
    strong: "rule-strong",
    dashed: "rule-dashed",
  } as const;
  return <div className={cn(variants[variant], className)} aria-hidden="true" />;
}

export function HardCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Tag className={cn("frame frame-hard frame-press", className)}>
      {children}
    </Tag>
  );
}

/* ── Status ── */

export function StatusPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border-2 border-border-strong bg-card px-3 py-1.5",
        className,
      )}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="blink absolute inline-flex h-2 w-2 rounded-full bg-live" />
      </span>
      <span className="mono-sm text-foreground">{children}</span>
    </span>
  );
}

export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-border-strong px-2.5 py-1 font-mono text-[0.6875rem] leading-none tracking-wide",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ── Texture overlays ── */

export function Grain({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("grain pointer-events-none absolute inset-0", className)}
    />
  );
}

/* ── Marquee (CSS-only, duplicated track for a seamless loop) ── */

export function Marquee({
  children,
  className,
  duration = "42s",
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
   Deliberately allows three different vertical rhythms instead of the
   single `py-20 sm:py-28` that made every section feel identical. */

export function Section({
  id,
  children,
  className,
  size = "md",
  grid = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  grid?: boolean;
}) {
  const sizes = {
    sm: "py-16 sm:py-20",
    md: "py-20 sm:py-28",
    lg: "py-28 sm:py-40",
  } as const;

  return (
    <section
      id={id}
      className={cn(
        "relative isolate",
        sizes[size],
        grid && "grid-paper",
        className,
      )}
    >
      <div className="relative z-2 mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}

/* ── Section heading ── */

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  size = "lg",
}: {
  index: number;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <header className={cn("relative", className)}>
      <div className="flex items-center gap-3">
        <Index value={index} />
        <Label tone="muted">{eyebrow}</Label>
        <Rule className="flex-1" />
      </div>

      <h2
        className={cn(
          "display mt-5 text-balance text-foreground",
          size === "lg" ? "display-lg" : "display-md",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}
