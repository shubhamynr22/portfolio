"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, Menu, Moon, Sun, X } from "lucide-react";
import { navLinks, personalInfo, availability } from "@/lib/data";
import { useColorTheme, type PaletteName } from "@/components/ColorThemeContext";
import { ButtonLink } from "@/components/ui/button";
import { Label, StatusPill } from "@/components/ui/primitives";
import { scrollToSection } from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const { colorTheme, setColorTheme, themes } = useColorTheme();
  const paletteRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!paletteOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (
        paletteRef.current &&
        !paletteRef.current.contains(event.target as Node)
      ) {
        setPaletteOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPaletteOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [paletteOpen]);

  const goTo = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:border-2 focus:border-border-strong focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b-2 transition-colors duration-300",
          scrolled
            ? "border-border-strong bg-background"
            : "border-transparent bg-transparent",
        )}
      >
        {/* ── Metadata strip: collapses away once you scroll ── */}
        <div
          className={cn(
            "overflow-hidden border-b border-border transition-[max-height,opacity] duration-300",
            scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
          )}
        >
          <div className="mx-auto flex h-9 w-full max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
            <Label className="truncate">
              {personalInfo.location} · {personalInfo.timezone}
            </Label>
            <Label className="hidden sm:block">
              {personalInfo.title} · Backend / Platform
            </Label>
          </div>
        </div>

        {/* ── Main bar ── */}
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <button
            onClick={() => scrollToSection(0, 0)}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="flex h-10 w-10 items-center justify-center border-2 border-border-strong bg-primary font-display text-lg font-extrabold text-primary-foreground transition-transform duration-150 group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
              {personalInfo.initials}
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-sm font-semibold tracking-tight">
                {personalInfo.name}
              </span>
              <span className="mono-sm text-muted-foreground">
                {personalInfo.title}
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => goTo(link.href)}
                className="group flex items-baseline gap-1.5 border-2 border-transparent px-3 py-2 transition-colors hover:border-border-strong hover:bg-muted"
              >
                <span className="mono-sm text-muted-foreground transition-colors group-hover:text-primary-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium">{link.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Palette switcher */}
            <div className="relative" ref={paletteRef}>
              <button
                onClick={() => setPaletteOpen((open) => !open)}
                aria-label="Change accent palette"
                aria-expanded={paletteOpen}
                className="flex h-10 items-center gap-2 border-2 border-border-strong bg-card px-2.5 transition-colors hover:bg-muted"
              >
                <span className="flex gap-1" aria-hidden="true">
                  <span
                    className="h-3.5 w-3.5 border border-border-strong"
                    style={{ background: "var(--primary)" }}
                  />
                  <span
                    className="h-3.5 w-3.5 border border-border-strong"
                    style={{ background: "var(--loud-2)" }}
                  />
                </span>
              </button>

              <AnimatePresence>
                {paletteOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.14, ease: "easeOut" }}
                    className="frame frame-hard absolute right-0 top-[calc(100%+8px)] z-50 w-56 p-2"
                  >
                    <div className="px-2 py-1.5">
                      <Label>Accent</Label>
                    </div>
                    {themes.map((palette) => {
                      const active = colorTheme === palette.name;
                      return (
                        <button
                          key={palette.name}
                          onClick={() => {
                            setColorTheme(palette.name as PaletteName);
                            setPaletteOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 px-2 py-2 text-left transition-colors",
                            active ? "bg-muted" : "hover:bg-muted",
                          )}
                        >
                          <span
                            className="h-5 w-5 shrink-0 border-2 border-border-strong"
                            style={{ background: palette.swatch }}
                          />
                          <span className="flex flex-col leading-tight">
                            <span className="text-sm font-medium">
                              {palette.label}
                            </span>
                            <span className="mono-sm text-muted-foreground">
                              {palette.note}
                            </span>
                          </span>
                          {active && (
                            <Check
                              className="ml-auto h-4 w-4 text-primary-ink"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle colour theme"
              className="flex h-10 w-10 items-center justify-center border-2 border-border-strong bg-card transition-colors hover:bg-muted"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <ButtonLink
              href={personalInfo.resume}
              download
              size="sm"
              className="hidden h-10 sm:inline-flex"
            >
              Résumé
              <ArrowUpRight className="h-3.5 w-3.5" />
            </ButtonLink>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center border-2 border-border-strong bg-card transition-colors hover:bg-muted lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scroll progress rail */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-[2px] origin-left bg-primary"
          aria-hidden="true"
        />
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
            <div className="flex h-16 shrink-0 items-center justify-between border-b-2 border-border-strong px-5">
              <Label>{personalInfo.initials} / Index</Label>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center border-2 border-border-strong bg-card"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => goTo(link.href)}
                  className="group flex w-full items-baseline gap-4 border-b border-border py-5 text-left"
                >
                  <span className="mono-sm text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="display display-md text-foreground transition-colors group-hover:text-primary-ink">
                    {link.label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="shrink-0 space-y-4 border-t-2 border-border-strong px-5 py-6">
              <StatusPill>{availability.status}</StatusPill>
              <div className="grid grid-cols-2 gap-2">
                <ButtonLink href={`mailto:${personalInfo.email}`} size="md">
                  Email
                </ButtonLink>
                <ButtonLink
                  href={personalInfo.resume}
                  download
                  variant="outline"
                  size="md"
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
