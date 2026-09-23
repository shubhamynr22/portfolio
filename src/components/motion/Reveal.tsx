"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
 *  REVEAL
 *
 *  Content is visible by default. This component only ever *hides* an
 *  element when all of these are true:
 *    1. JS is running,
 *    2. motion is not reduced,
 *    3. IntersectionObserver is available,
 *    4. the element is still below the fold.
 *
 *  Point 4 is the important one: anything already on screen is never
 *  touched, so there is no hide-then-show flash and the hero never
 *  depends on an animation to be visible.
 *
 *  This replaces the previous approach (Framer Motion `initial={{opacity:0}}`),
 *  which left 47 elements invisible whenever animation frames were throttled.
 * ────────────────────────────────────────────────────────────────── */

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    // Already on screen (or close to it) — leave it completely alone.
    if (el.getBoundingClientRect().top < viewportHeight * 0.92) return;

    el.dataset.reveal = "pending";

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset.reveal = "in";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
