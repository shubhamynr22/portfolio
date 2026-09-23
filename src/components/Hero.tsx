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
import { Label, Marquee, StatusPill } from "@/components/ui/primitives";
import { NameLine } from "@/components/ui/patterns";
import { MetricCounter } from "@/components/motion/MetricCounter";
import { StackSchematic } from "@/components/StackSchematic";
import { scrollToSection } from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";

/* ── Stepwell band ──
   Chand Baori, Abhaneri, Rajasthan: roughly 3,500 steps across 13 storeys,
   folded into a square as interlocking double flights on three of its walls.
   That is what this replaces the previous mountain ridge with — a descending
   staircase read from both directions, so the flights cross. No gradients,
   no glow, same hard-segment language as before. */
const STEPWELL_W = 1440;
const STEPWELL_H = 260;

/** One descending flight, as open points. Mirrored flights run the other way
 *  so adjacent flights interlock rather than nest. */
function stepEdge(
  step: number,
  rise: number,
  startY: number,
  mirrored: boolean,
): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  const clampY = (y: number) => Math.min(y, STEPWELL_H);
  let y = startY;

  if (mirrored) {
    pts.push([STEPWELL_W, startY]);
    for (let x = STEPWELL_W; x > 0; x -= step) {
      pts.push([x - step, y]);
      y = clampY(y + rise);
      pts.push([x - step, y]);
    }
  } else {
    pts.push([0, startY]);
    for (let x = 0; x < STEPWELL_W; x += step) {
      pts.push([x + step, y]);
      y = clampY(y + rise);
      pts.push([x + step, y]);
    }
  }
  return pts;
}

const toPointList = (pts: Array<[number, number]>) =>
  pts.map(([x, y]) => `${x},${y}`).join(" ");

function StepwellBand() {
  const flights = [
    { step: 44, rise: 11, startY: 96, mirrored: false, opacity: 0.05 },
    { step: 38, rise: 10, startY: 138, mirrored: true, opacity: 0.08 },
    { step: 32, rise: 9, startY: 180, mirrored: false, opacity: 0.12 },
  ];
  const topFlight = stepEdge(
    flights[0].step,
    flights[0].rise,
    flights[0].startY,
    flights[0].mirrored,
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10"
    >
      <svg
        className="h-[200px] w-full sm:h-[260px]"
        viewBox={`0 0 ${STEPWELL_W} ${STEPWELL_H}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {flights.map((flight) => {
          const edge = stepEdge(
            flight.step,
            flight.rise,
            flight.startY,
            flight.mirrored,
          );
          return (
            <polygon
              key={`${flight.step}-${flight.startY}`}
              points={toPointList([
                ...edge,
                [0, STEPWELL_H],
                [STEPWELL_W, STEPWELL_H],
              ])}
              style={{ fill: "var(--border-strong)", opacity: flight.opacity }}
            />
          );
        })}
        {/* The lit edge of the topmost flight, derived from the same geometry
            rather than hand-traced — it cannot drift out of alignment. */}
        <polyline
          points={toPointList(topFlight)}
          fill="none"
          style={{ stroke: "var(--border-strong)", opacity: 0.18 }}
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="grain relative isolate overflow-hidden pt-32 pb-0 sm:pt-40"
    >

      <div className="relative z-2 mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-14">
          {/* ── Row 1 — the statement, on its own full-width row.
                 Archivo ExtraBold sets "SHUBHAM" at 5.459em, so at the
                 fluid display size the word is wider than any fractional
                 grid column: parked in `lg:col-span-7` it spilled out of
                 its cell and the figure — which paints later and has an
                 opaque background — covered the last letters.
                 Giving the name the whole container removes the collision
                 by geometry rather than by tuning a font size. ── */}
          <div className="lg:col-span-12">
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill>{availability.status}</StatusPill>
              <Label tone="muted">{availability.note}</Label>
            </div>

            {/* aria-label carries the plain name so a screen reader announces
                it once; the Devanagari half is aria-hidden and purely visual. */}
            <h1
              className="display display-xl mt-7 text-foreground"
              aria-label={personalInfo.name}
            >
              <NameLine
                latin={personalInfo.name.split(" ")[0]}
                deva="शुभम"
                className="text-balance"
              />
              <NameLine
                latin={personalInfo.name.split(" ")[1]}
                deva="गुप्ता"
                className="text-primary-ink"
              />
            </h1>
          </div>

          {/* ── Row 2 — the pitch ── */}
          <div className="lg:col-span-7">
            {/* Roles — dense, static, no clipping typewriter */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {heroRoles.map((role, index) => (
                <span key={role} className="flex items-center gap-3">
                  {index > 0 && (
                    <span className="mono text-muted-foreground" aria-hidden="true">
                      /
                    </span>
                  )}
                  <Label tone={index === 0 ? "foreground" : "muted"}>
                    {role}
                  </Label>
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {summary}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                className="sm:ml-1"
              >
                <Mail className="h-4 w-4" />
                Email me
              </ButtonLink>
            </div>
          </div>

          {/* ── Row 2 — the figure ── */}
          <div className="lg:col-span-5">
            <StackSchematic />
          </div>

          {/* ── Metrics strip ──
                Now a plate with a header, so the numbers sit on an
                instrument rather than floating. Each cell is closed by a
                graduated scale — Jantar Mantar's quadrant, abstracted. */}
          <div className="frame frame-hard mb-14 lg:col-span-12">
            <div className="flex items-center justify-between gap-4 border-b-2 border-border-strong px-5 py-3">

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4">
              {heroMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className={cn(
                    "flex flex-col p-5",
                    index >= 2 && "border-t-2",
                    index % 2 === 1 && "border-l-2",
                    "lg:border-t-0",
                    index > 0 && "lg:border-l-2",
                  )}
                >
                  <div className="display display-md text-primary-ink">
                    <MetricCounter
                      value={metric.value}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                    />
                  </div>
                  <div className="mt-2 text-sm font-medium">{metric.label}</div>
                  <div className="mono-sm mt-1 text-muted-foreground">
                    {metric.detail}
                  </div>
                  {/* mt-auto pins the scale to the cell floor so the four
                      read as one instrument across the row. */}
                  <div className="rule mt-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Technology ticker ── */}
      <div className="relative z-2 border-y-2 border-border-strong bg-foreground py-3.5 text-background">
        <Marquee duration="52s">
          {allTechnologies.map((tech) => (
            <span key={tech} className="flex items-center">
              <span className="px-5 font-mono text-[0.8125rem] tracking-[0.12em] uppercase">
                {tech}
              </span>
              {/* Bright loud-2, not the *-ink* variant: this band is an
                  inverted surface, so the text-safe token would sink into it.
                  Decorative glyph, aria-hidden — no text threshold applies. */}
              <span className="text-loud-2" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
