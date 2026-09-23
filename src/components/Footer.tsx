"use client";

import { ArrowUp } from "lucide-react";
import { navLinks, personalInfo } from "@/lib/data";
import { Label } from "@/components/ui/primitives";
import { JaliBand } from "@/components/ui/patterns";
import { scrollToSection } from "@/components/SmoothScroll";

const buildStack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Motion",
  "Lenis",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="inverted relative border-t-2 border-border-strong bg-foreground text-background">
      {/* ── Jali screen ──
             Mughal pierced-stone lattice: the screen you pass through on the
             way into the colophon. Coloured from `text-background` rather
             than `border-strong`, because this surface is inverted and
             border-strong sits too close to the footer's own fill. */}
      <JaliBand className="text-background/30" height={27} />

      {/* ── Edge-to-edge wordmark ──
          SVG `textLength` stretches the text to exactly the container
          width, so it always fills the row without ever overflowing. */}
      <div className="mx-auto w-full max-w-[1400px] px-5 pt-14 sm:px-8 lg:px-12">
        <svg
          className="w-full"
          viewBox="0 0 1000 118"
          role="img"
          aria-label={personalInfo.name}
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="0"
            y="98"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            style={{
              fill: "var(--background)",
              fontFamily: "var(--font-display)",
              fontSize: "112px",
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            {personalInfo.name.toUpperCase()}
          </text>
        </svg>
      </div>

      {/* ── Columns ── */}
      <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-3 lg:px-12">
        <div>
          <Label className="text-background/60">Navigate</Label>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="group flex items-baseline gap-3 text-left"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.16em] text-background/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium transition-colors group-hover:text-loud-2-ink">
                    {link.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Label className="text-background/60">Elsewhere</Label>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors hover:text-loud-2-ink"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors hover:text-loud-2-ink"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-sm font-medium break-all transition-colors hover:text-loud-2-ink"
              >
                {personalInfo.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Label className="text-background/60">Colophon</Label>
          <p className="mt-4 text-sm leading-relaxed text-background/70">
            Built from scratch with {buildStack.join(", ")}. Content lives in a
            single typed data file; the palette is four CSS variables.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-background/70">
            Motif geometry is drawn to source rather than to mood: the Vastu
            pada grid, Mughal jali lattice, Kolam pulli, Chand Baori flights,
            Jantar Mantar graduations and Indus seal marks — each one labelled
            where it appears.
          </p>
        </div>
      </div>

      {/* ── Baseline ── */}
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-4 border-t border-background/20 px-5 py-6 sm:px-8 lg:px-12">
        <Label className="text-background/60">
          © {year} {personalInfo.name}
        </Label>
        <Label className="text-background/60">
          Archivo · Space Grotesk · Rajdhani <span className="text-background/40">(Indian Type Foundry)</span>
        </Label>
        <Label className="text-background/60">
          {personalInfo.timezone}
        </Label>
        <button
          onClick={() => scrollToSection(0, 0)}
          className="inline-flex items-center gap-2 border-2 border-background/40 px-3 py-2 transition-colors hover:border-loud-2 hover:text-loud-2-ink"
          aria-label="Back to top"
        >
          <ArrowUp className="h-3.5 w-3.5" />
          <span className="mono-sm">Top</span>
        </button>
      </div>
    </footer>
  );
}
