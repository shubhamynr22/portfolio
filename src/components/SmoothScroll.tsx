"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Single owner of scroll behaviour.
 *
 * Previously three systems competed: `scroll-smooth` on <html>, Lenis, and
 * imperative `scrollIntoView({behavior:"smooth"})` calls. That produced
 * laggy anchors and could leave scroll stuck.
 *
 * Lenis is now the only smooth-scroll owner, and it exposes itself on
 * `window.__lenis` so navigation can drive it directly.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Respect the user's motion preference: no hijacking scroll at all.
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native touch scrolling feels better on mobile than simulated.
      syncTouch: false,
    });

    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // Let CSS drive anchor offsets rather than fighting them.
    document.documentElement.classList.add("lenis-active");

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("lenis-active");
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  return null;
}

/**
 * Scroll helper used by the navbar, hero and footer.
 * Falls back to native scrolling when Lenis is absent (reduced motion,
 * or before hydration) so anchors always work.
 */
export function scrollToSection(target: string | number, offset = -72) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.05 });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "auto" });
    return;
  }

  const el = document.querySelector(target);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "auto" });
  }
}
