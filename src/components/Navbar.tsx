"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { navLinks, personalInfo, availability } from "@/lib/data";
import { ButtonLink } from "@/components/ui/button";
import { Label } from "@/components/ui/primitives";
import { LiveDot } from "@/components/ui/patterns";
import { scrollToSection } from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
 *  NAVBAR
 *
 *  Two registers, as in the reference. The upper strip is a status rail —
 *  it only exists at the top of the page and retracts on scroll, so it
 *  costs nothing once you are reading. The lower bar is the working
 *  navigation.
 *
 *  The clock is real IST, computed from the visitor's own clock rather than
 *  from a stored offset, and it renders a placeholder until hydration: a
 *  server-rendered time would be a different time by the time it painted,
 *  and a mismatch is both a hydration error and a lie.
 * ────────────────────────────────────────────────────────────────── */

function useIstClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      // IST is UTC+5:30 with no DST, so the offset is a constant and does
      // not need a timezone database.
      const ist = new Date(now.getTime() + (330 + now.getTimezoneOffset()) * 60000);
      const p = (n: number) => String(n).padStart(2, "0");
      setTime(`${p(ist.getHours())}:${p(ist.getMinutes())}:${p(ist.getSeconds())}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const clock = useIstClock();

  const { theme, setTheme } = useTheme();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-primary-fill focus:px-4 focus:py-2 focus:text-sm focus:text-on-primary-fill"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "border-b transition-colors duration-300",
            scrolled
              ? "border-outline-variant bg-background/92 backdrop-blur-xl"
              : "border-outline-variant bg-surface-lowest/70 backdrop-blur-sm",
          )}
        >
          {/* ── Status rail — retracts on scroll ── */}
          <div
            className={cn(
              "overflow-hidden transition-[max-height,opacity] duration-300",
              scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
            )}
          >
            <div className="mx-auto flex h-8 w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
              <div className="flex min-w-0 items-center gap-2.5">
                <LiveDot tone="live" />
                <Label tone="gold" className="shrink-0">
                  {availability.status}
                </Label>
                <span className="hidden truncate sm:inline">
                  <Label tone="outline">{availability.note}</Label>
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-2.5">
                <Label tone="primary" className="tabular-nums">
                  {clock ? `${clock} IST` : "--:--:-- IST"}
                </Label>
                <span className="text-outline" aria-hidden="true">
                  ·
                </span>
                <Label tone="outline" className="hidden sm:inline">
                  {personalInfo.location} [IST · UTC+5:30]
                </Label>
              </div>
            </div>
          </div>

          {/* ── Main bar ── */}
          <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
            <button
              onClick={() => scrollToSection(0, 0)}
              className="group flex items-center gap-3"
              aria-label="Back to top"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface font-display text-[0.9375rem] font-bold tracking-tight text-secondary transition-colors group-hover:border-secondary/50">
                {personalInfo.initials}
              </span>
              <span className="hidden flex-col items-start leading-none sm:flex">
                <span className="font-display text-sm font-semibold tracking-tight">
                  {personalInfo.name}
                </span>
                <span className="label mt-1 text-outline">
                  {personalInfo.title}
                </span>
              </span>
            </button>

            {/* Desktop nav — index + label, the reference's structural index */}
            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Sections">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => goTo(link.href)}
                  className="group flex items-baseline gap-1.5 rounded-md px-2.5 py-2 transition-colors hover:bg-surface-high"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.1em] text-outline transition-colors group-hover:text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                    {link.label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle colour theme"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface text-muted-foreground transition-colors hover:border-outline hover:text-foreground"
              >
                {/* Which icon to show is decided by the class next-themes
                    already put on <html>, not by a `mounted` flag. Reading it
                    from CSS means no state, no effect, and no window between
                    hydration and the first correct paint. */}
                <Sun className="hidden h-4 w-4 dark:block" />
                <Moon className="block h-4 w-4 dark:hidden" />
              </button>

              <ButtonLink
                href={personalInfo.resume}
                download
                size="md"
                className="hidden sm:inline-flex"
              >
                Résumé
                <ArrowUpRight className="h-3.5 w-3.5" />
              </ButtonLink>

              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface text-muted-foreground transition-colors hover:text-foreground lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>

          <motion.div
            style={{ scaleX: progress }}
            className="h-px origin-left bg-secondary/70"
            aria-hidden="true"
          />
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background lg:hidden"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-outline-variant px-5">
              <Label tone="gold">{personalInfo.initials} / Structural index</Label>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-4">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => goTo(link.href)}
                  className="group flex w-full items-baseline gap-4 border-b border-outline-variant/60 py-5 text-left"
                >
                  <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="display display-md text-foreground transition-colors group-hover:text-primary">
                    {link.label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="shrink-0 space-y-4 border-t border-outline-variant px-5 py-6">
              <div className="flex items-center gap-2.5">
                <LiveDot tone="live" />
                <Label tone="gold">{availability.status}</Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <ButtonLink href={`mailto:${personalInfo.email}`} size="lg">
                  Email
                </ButtonLink>
                <ButtonLink
                  href={personalInfo.resume}
                  download
                  variant="outline"
                  size="lg"
                >
                  Résumé
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
