"use client";

import { ArrowUp } from "lucide-react";
import { navLinks, personalInfo } from "@/lib/data";
import { Label } from "@/components/ui/primitives";
import { LiveDot } from "@/components/ui/patterns";
import { scrollToSection } from "@/components/SmoothScroll";

const buildStack = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Motion",
  "Lenis",
];

const typeStack = ["Space Grotesk", "Plus Jakarta Sans", "Space Mono", "Mukta"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-outline-variant bg-surface-lowest">
      {/* ── Edge-to-edge wordmark ──
          SVG `textLength` stretches the text to exactly the container width,
          so it always fills the row without ever overflowing. Recessed to the
          brightest surface token rather than set in ink: at this size a solid
          wordmark would out-shout the section above it. */}
      <div className="mx-auto w-full max-w-[1200px] px-5 pt-14 sm:px-8 lg:px-12">
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
              fill: "var(--surface-highest)",
              fontFamily: "var(--font-display)",
              fontSize: "112px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            {personalInfo.name.toUpperCase()}
          </text>
        </svg>
      </div>

      {/* ── Ornament rule ── */}
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center gap-4 px-5 pt-10 pb-10 sm:px-8 lg:px-12">
        <span className="h-px flex-1 max-w-[120px] bg-outline-variant" />
        <Label tone="gold">◊ Engineered in India · भारत में निर्मित ◊</Label>
        <span className="h-px flex-1 max-w-[120px] bg-outline-variant" />
      </div>

      {/* ── Columns ── */}
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 border-t border-outline-variant px-5 py-10 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-outline-variant bg-surface font-display text-[0.9375rem] font-bold tracking-tight text-secondary">
              {personalInfo.initials}
            </span>
            <div className="flex flex-col">
              <span className="font-display text-lg font-semibold tracking-tight">
                शुभम {personalInfo.name.split(" ")[1].toUpperCase()}
              </span>
              <Label tone="primary">AI-focused Backend Engineer</Label>
            </div>
          </div>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Multi-agent systems, LLM product features and the event-driven
            infrastructure that keeps them reliable — built to hold up under
            load, not just to demo.
          </p>

          <div className="mt-5 flex items-center gap-2.5">
            <span className="flex items-center gap-2">
              <LiveDot tone="live" />
              <Label tone="gold">{personalInfo.location}</Label>
            </span>
            <span className="text-outline" aria-hidden="true">
              ·
            </span>
            <Label tone="outline">{personalInfo.timezone}</Label>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-3">
          <Label tone="primary">Structural index</Label>
          {navLinks.map((link, index) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="group flex items-baseline gap-2.5 text-left"
            >
              <span className="font-mono text-[0.625rem] tracking-[0.12em] text-outline">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-muted-foreground transition-colors group-hover:text-primary">
                {link.label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 lg:col-span-3">
          <Label tone="primary">Relay nodes</Label>
          {[
            { label: "GitHub", href: personalInfo.github, handle: "@shubhamynr22" },
            {
              label: "LinkedIn",
              href: personalInfo.linkedin,
              handle: "in/shubhamynr22",
            },
            {
              label: "Email",
              href: `mailto:${personalInfo.email}`,
              handle: personalInfo.email,
            },
          ].map((node) => (
            <a
              key={node.label}
              href={node.href}
              {...(node.href.startsWith("mailto")
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
              className="group flex flex-col"
            >
              <span className="text-sm text-muted-foreground transition-colors group-hover:text-primary">
                {node.label}
              </span>
              <span className="font-mono text-[0.625rem] break-all text-outline">
                {node.handle}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Colophon ── */}
      <div className="mx-auto w-full max-w-[1200px] px-5 pb-8 sm:px-8 lg:px-12">
        <p className="max-w-3xl text-[0.8125rem] leading-relaxed text-muted-foreground">
          Built from scratch with {buildStack.join(", ")}. Content lives in a
          single typed data file. Set in {typeStack.slice(0, 3).join(", ")} with{" "}
          {typeStack[3]} carrying every Devanagari glyph — the hero name holds
          both scripts in one line and alternates between them.
        </p>
      </div>

      {/* ── Baseline ── */}
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 border-t border-outline-variant px-5 py-5 sm:px-8 lg:px-12">
        <Label tone="outline">
          © {year} {personalInfo.name}
        </Label>
        <Label tone="outline" className="hidden md:inline">
          Type: Space Grotesk · Plus Jakarta Sans · Space Mono · Mukta
        </Label>
        <button
          onClick={() => scrollToSection(0, 0)}
          className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-3 py-2 text-outline transition-colors hover:border-secondary/50 hover:text-secondary"
          aria-label="Back to top"
        >
          <ArrowUp className="h-3.5 w-3.5" />
          <span className="label">Top</span>
        </button>
      </div>
    </footer>
  );
}
