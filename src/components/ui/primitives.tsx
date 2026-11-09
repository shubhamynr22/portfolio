import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The page column. One width, one gutter, everywhere. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1120px] px-5 sm:px-8", className)}
    >
      {children}
    </div>
  );
}

/** Small uppercase kicker above a heading or a logo row. */
export function Kicker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[0.6875rem] font-medium tracking-[0.18em] text-subtle uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

/* ── Section heading ──
   Product-site rhythm: a large, tight Geist headline that fades from ink
   into grey, and one quiet line under it. */
export function SectionHeading({
  id,
  title,
  description,
  align = "left",
  className,
}: {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      <h2
        id={id}
        className="text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.08] font-medium tracking-[-0.035em] text-balance"
      >
        <span className="heading-fade">{title}</span>
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-[1.0625rem] leading-relaxed text-muted",
            align === "center" ? "mx-auto max-w-xl" : "max-w-xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}

/** macOS-style window chrome dots. */
export function TrafficLights({ className }: { className?: string }) {
  return (
    <span className={cn("flex gap-1.5", className)} aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
    </span>
  );
}
