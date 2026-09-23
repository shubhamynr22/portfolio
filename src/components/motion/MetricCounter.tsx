"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────────
 *  METRIC COUNTER
 *
 *  The real value is rendered on the server and on first paint, so the
 *  number is always present in the HTML (crawlers, link previews, and
 *  users with reduced motion all get the truth).
 *
 *  Only when the element is below the fold, JS is running and motion is
 *  allowed do we reset to 0 and count up on scroll-into-view.
 * ────────────────────────────────────────────────────────────────── */

export function MetricCounter({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

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
    // Already on screen — keep the true value, don't fake a count-up.
    if (el.getBoundingClientRect().top < viewportHeight * 0.92) return;

    setDisplay(0);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setDisplay(value);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <NumberFlow value={display} />
      {suffix}
    </span>
  );
}
