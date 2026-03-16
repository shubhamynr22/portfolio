"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, Palette } from "lucide-react";
import { navLinks, personalInfo } from "@/lib/data";
import { useColorTheme } from "@/components/ColorThemeContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { colorTheme, setColorTheme, themes } = useColorTheme();
  const [mounted, setMounted] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close palette popover on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setPaletteOpen(false);
      }
    };
    if (paletteOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [paletteOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* ── Color palette picker (shared between desktop & mobile) ── */
  const PalettePicker = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div ref={!isMobile ? paletteRef : undefined} className="relative">
      <button
        onClick={() => setPaletteOpen(!paletteOpen)}
        aria-label="Change color theme"
        className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors cursor-pointer"
      >
        <Palette className="h-5 w-5" />
      </button>
      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 p-3 rounded-xl glass-card z-50 min-w-[180px]"
          >
            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
              Accent Color
            </p>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => {
                    setColorTheme(t.name);
                    setPaletteOpen(false);
                  }}
                  className={`group flex flex-col items-center gap-1 p-2 rounded-lg transition-all cursor-pointer ${
                    colorTheme === t.name
                      ? "bg-primary/10 ring-2 ring-primary/40"
                      : "hover:bg-secondary"
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full border-2 border-white/40 shadow-md transition-transform group-hover:scale-110"
                    style={{ background: t.swatch }}
                  />
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "navbar-glass shadow-lg" : "bg-transparent"
      }`}
    >
      {/* SVG vector pattern background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <svg
          className="absolute inset-0 w-full h-full text-primary/[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="nav-grid"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1" fill="currentColor" />
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nav-grid)" />
        </svg>
        {/* Animated accent line at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          animate={{ width: scrolled ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-xl font-bold tracking-tight group"
          >
            <span className="text-primary transition-all group-hover:drop-shadow-[0_0_8px_var(--primary)]">
              {personalInfo.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all group-hover:w-full" />
              </button>
            ))}

            {mounted && <PalettePicker />}

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-1">
            {mounted && <PalettePicker isMobile />}

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden navbar-glass"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
