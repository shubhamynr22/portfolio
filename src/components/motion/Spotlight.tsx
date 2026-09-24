"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
 *  SPOTLIGHT
 *
 *  A card that carries a soft accent wash following the pointer across it.
 *  Built on a CSS custom property rather than on React state for a specific
 *  reason: the wash has to update at pointer resolution, and re-rendering a
 *  React tree on every mousemove is how a hover effect becomes the slowest
 *  thing on the page. The listener writes --mx/--my straight onto the
 *  element and the gradient in globals.css reads them. React never renders
 *  again.
 *
 *  rAF-throttled: pointermove fires far faster than paint, and the extra
 *  writes are pure waste.
 *
 *  Renders <a> when given an href, so a card can stay a link rather than
 *  becoming a div with a click handler — which would cost keyboard
 *  activation, middle-click, and the status-bar preview.
 * ────────────────────────────────────────────────────────────────── */

type BaseProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function Spotlight({
  children,
  className,
  style,
  href,
  ...rest
}: BaseProps & {
  href?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const frame = useRef(0);

  // A pointer that has left the card must not leave a stale position behind
  // for the next hover to jump from.
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onPointerMove = useCallback((event: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  }, []);

  const props = {
    ref: ref as never,
    onPointerMove,
    className: cn("spotlight", className),
    style,
    ...rest,
  };

  if (href) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return <div {...props}>{children}</div>;
}
