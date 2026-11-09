"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, Menu, X } from "lucide-react";
import { navLinks, personalInfo } from "@/lib/data";
import { Container } from "@/components/ui/primitives";
import { scrollToSection } from "@/components/SmoothScroll";

/* ──────────────────────────────────────────────────────────────────
 *  NAVBAR
 *  Sits on the sky and scrolls away with it. Once the hero is gone, a
 *  single glossy "Get in touch" button floats in at the top right and
 *  stays — the one thing worth keeping on screen.
 * ────────────────────────────────────────────────────────────────── */

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={
          light
            ? "flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/20 text-[0.8125rem] font-semibold tracking-tight text-white ring-1 ring-white/40 backdrop-blur"
            : "flex h-8 w-8 items-center justify-center rounded-[10px] bg-ink text-[0.8125rem] font-semibold tracking-tight text-white"
        }
      >
        {personalInfo.initials}
      </span>
      <span
        className={`text-[0.9375rem] font-medium tracking-tight ${light ? "text-white" : "text-ink"}`}
      >
        {personalInfo.name}
      </span>
    </span>
  );
}

export default function Navbar() {
  const [floating, setFloating] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <header className="absolute inset-x-0 top-0 z-40">
        <Container className="flex h-20 items-center justify-between">
          <button onClick={() => scrollToSection(0, 0)} aria-label="Back to top">
            <Logo light />
          </button>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className="text-sm font-medium text-white/85 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/30 backdrop-blur md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </Container>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              aria-label="Sections"
              className="mx-5 rounded-2xl bg-white/95 p-2 shadow-[var(--shadow-float)] backdrop-blur md:hidden"
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="block w-full rounded-xl px-4 py-3 text-left text-[0.9375rem] font-medium text-ink hover:bg-soft"
                >
                  {link.label}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {floating && (
          <motion.a
            href={`mailto:${personalInfo.email}`}
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="btn-gloss fixed top-4 right-4 z-50 inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium sm:top-5 sm:right-6"
          >
            <Mail className="h-4 w-4" />
            Get in touch
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
