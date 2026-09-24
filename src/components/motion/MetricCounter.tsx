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

    /* Reset through a frame callback rather than in the effect body. The
       element is below the fold by definition at this point, so there is
       nothing on screen to flash, and the state change belongs to a callback
       rather than to the render pass. */
    const raf = requestAnimationFrame(() => setDisplay(0));

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
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {/* `hi-IN-u-nu-deva` is the Intl numbering system for Devanagari
          digits, so the odometer rolls through ०१२३… rather than 0123…
          Doing it here rather than by string-replacing the output keeps the
          digit-transition animation intact — NumberFlow is animating per
          digit glyph, and it can only do that for digits it owns. */}
      <NumberFlow value={display} locales="hi-IN-u-nu-deva" />
      {suffix}
    </span>
  );
}
