"use client";

import { ArrowDown, Mail } from "lucide-react";
import {
  personalInfo,
  heroRoles,
  summary,
  heroMetrics,
  availability,
  allTechnologies,
} from "@/lib/data";
import { Button, ButtonLink } from "@/components/ui/button";
import { Label, Marquee, Terminal } from "@/components/ui/primitives";
import {
  CornerMarks,
  Jali,
  LiveDot,
  NameLine,
} from "@/components/ui/patterns";
import { MetricCounter } from "@/components/motion/MetricCounter";
import { StackSchematic } from "@/components/StackSchematic";
import { scrollToSection } from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
 *  HERO
 *
 *  The reference's "primary terminal" is the anchor surface for the whole
 *  site: a bordered card, a jali screen faint enough to read as texture
 *  rather than pattern, four corner inscriptions, and everything inside on
 *  a 12-column grid.
 *
 *  ── The name ──
 *  It alternates between Latin and Devanagari, and the two halves are no
 *  longer drawn by the same family (Space Grotesk 700 against Mukta 800),
 *  so --deva-scale in globals.css is doing real work. Devanagari vowel
 *  signs take no advance width, which is why the same nominal size reads
 *  as roughly half the weight — the multiplier closes that optical gap.
 *  It was measured in the browser, not guessed: see the note there.
 *
 *  Corner inscriptions are the reference's device, but they say something.
 *  शुभम् is the name itself, संरचना is "structure", सूत्र is "thread" — the
 *  vocabulary of a system, not a decoration of a culture.
 * ────────────────────────────────────────────────────────────────── */

export default function Hero() {
  const [first, last] = personalInfo.name.split(" ");

  return (
    <section id="hero" className="relative isolate overflow-hidden pt-32 pb-0 sm:pt-36">
      {/* Ambient specular — the one place a blur is allowed, because it is
          not pretending to be an edge. */}
      <div
        aria-hidden="true"
        className="glow -top-40 left-[18%] h-[26rem] w-[26rem]"
      />
      <div
        aria-hidden="true"
        className="glow right-[12%] bottom-24 h-[22rem] w-[22rem]"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12">
        {/* ── Transmission rail ── */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-primary" aria-hidden="true">
              ◊
            </span>
            <Label tone="gold">Direct transmission · संवाद</Label>
          </div>
          <Label tone="outline">Portfolio · 2026</Label>
        </div>

        {/* ── Availability banner ── */}
        <div className="mb-6 flex flex-col gap-4 rounded-xl border border-outline-variant bg-surface-low px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <LiveDot tone="live" />
            <span className="label font-semibold text-foreground">
              {availability.status}
            </span>
            <span className="hidden text-outline sm:inline" aria-hidden="true">
              •
            </span>
            <span className="hidden sm:inline">
              <Label tone="outline">{availability.note}</Label>
            </span>
          </div>
          <Label tone="primary" className="rounded-sm bg-surface-high px-2.5 py-1">
            Node · Kafka · AWS · Python
          </Label>
        </div>

        {/* ── Primary terminal ── */}
        <Terminal className="overflow-hidden p-6 sm:p-9">
          <Jali id="jali-hero" opacity={0.065} className="text-secondary" />
          <CornerMarks
            topLeft="०१"
            topRight="शुभम्"
            bottomLeft="संरचना"
            bottomRight="सूत्र"
          />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-x-10">
            {/* ── The statement ── */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-outline-variant bg-surface font-display text-base font-bold tracking-tight text-secondary">
                  {personalInfo.initials}
                </span>
                <div className="flex flex-col">
                  <Label tone="foreground">{personalInfo.title}</Label>
                  <Label tone="outline" className="mt-1">
                    {personalInfo.location} · {personalInfo.timezone}
                  </Label>
                </div>
              </div>

              {/* aria-label carries the plain name so a screen reader
                  announces it once; the Devanagari half is aria-hidden and
                  purely visual. Two lines, in two scripts each. */}
              <h1
                className="display display-xl mt-8 text-foreground"
                aria-label={personalInfo.name}
              >
                <NameLine latin={first} deva="शुभम" />
                <NameLine latin={last} deva="गुप्ता" className="text-primary" />
              </h1>

              <div className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                {heroRoles.map((role, index) => (
                  <span key={role} className="flex items-center gap-2.5">
                    {index > 0 && (
                      <span className="text-outline" aria-hidden="true">
                        /
                      </span>
                    )}
                    <Label tone={index === 0 ? "foreground" : "muted"}>
                      {role}
                    </Label>
                  </span>
                ))}
              </div>

              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground">
                {summary}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button size="lg" onClick={() => scrollToSection("#projects")}>
                  <ArrowDown className="h-4 w-4" />
                  View my work
                </Button>
                <ButtonLink
                  href={personalInfo.resume}
                  download
                  variant="outline"
                  size="lg"
                >
                  Download CV
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${personalInfo.email}`}
                  variant="ghost"
                  size="lg"
                >
                  <Mail className="h-4 w-4" />
                  Email me
                </ButtonLink>
              </div>
            </div>

            {/* ── The figure ── */}
            <div className="lg:col-span-5">
              <StackSchematic />
            </div>
          </div>
        </Terminal>

        {/* ── Instrument strip ── */}
        <div className="mt-6 overflow-hidden rounded-xl border border-outline-variant bg-surface-low">
          <div className="flex items-center justify-between border-b border-outline-variant px-4 py-2.5">
            <Label tone="gold">Telemetry</Label>
            <Label tone="outline">4 channels</Label>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {heroMetrics.map((metric, index) => (
              <div
                key={metric.label}
                className={cn(
                  "flex flex-col px-4 py-4 sm:px-5",
                  index >= 2 && "border-t border-outline-variant",
                  index % 2 === 1 && "border-l border-outline-variant",
                  "lg:border-t-0",
                  index > 0 && "lg:border-l",
                )}
              >
                <div className="display display-md text-primary">
                  <MetricCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </div>
                <div className="mt-2 text-sm font-medium">{metric.label}</div>
                <div className="mt-0.5">
                  <Label tone="outline">{metric.detail}</Label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Inventory ticker ── */}
      <div className="relative mt-14 border-y border-outline-variant bg-surface-lowest py-3">
        <Marquee duration="56s">
          {allTechnologies.map((tech) => (
            <span key={tech} className="flex items-center">
              <span className="px-5 font-mono text-[0.75rem] tracking-[0.1em] text-muted-foreground uppercase">
                {tech}
              </span>
              <span className="text-secondary" aria-hidden="true">
                ◊
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
