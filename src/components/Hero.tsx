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
import { MetricCounter } from "@/components/motion/MetricCounter";
import { StackSchematic } from "@/components/StackSchematic";
import { scrollToSection } from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";

/* ── Hard-edged ridge band. The original mountain illustration, redrawn in
      the new visual language: straight segments, no gradients, no glow. ── */
function RidgeBand() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10"
    >
      <svg
        className="h-[200px] w-full sm:h-[260px]"
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="0,140 120,92 240,128 360,76 480,118 600,64 720,104 840,70 960,112 1080,58 1200,100 1320,74 1440,116 1440,260 0,260"
          style={{ fill: "var(--border-strong)", opacity: 0.06 }}
        />
        <polygon
          points="0,182 140,142 280,172 420,128 560,164 700,120 840,158 980,126 1120,166 1260,134 1400,170 1440,156 1440,260 0,260"
          style={{ fill: "var(--border-strong)", opacity: 0.09 }}
        />
        <polyline
          points="0,182 140,142 280,172 420,128 560,164 700,120 840,158 980,126 1120,166 1260,134 1400,170 1440,156"
          fill="none"
          style={{ stroke: "var(--border-strong)", opacity: 0.18 }}
          strokeWidth="1"
        />
        <polygon
          points="0,218 160,196 320,212 480,186 640,208 800,190 960,210 1120,192 1280,208 1440,196 1440,260 0,260"
          style={{ fill: "var(--border-strong)", opacity: 0.13 }}
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
      <div className="grid-paper absolute inset-0 -z-20" aria-hidden="true" />
      <RidgeBand />

      <div className="relative z-2 mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ── Left: the statement ── */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill>{availability.status}</StatusPill>
              <Label tone="muted">{availability.note}</Label>
            </div>

            <h1 className="display display-xl mt-7 text-foreground">
              {personalInfo.name.split(" ")[0]}
              <br />
              <span className="text-primary-ink">
                {personalInfo.name.split(" ")[1]}
              </span>
            </h1>

            {/* Roles — dense, static, no clipping typewriter */}
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1">
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

          {/* ── Right: the figure ── */}
          <div className="lg:col-span-5">
            <StackSchematic />
          </div>
        </div>

        {/* ── Metrics strip ── */}
        <div className="frame frame-hard mt-14 mb-14 grid grid-cols-2 lg:grid-cols-4">
          {heroMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                "border-border-strong p-5",
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
            </div>
          ))}
        </div>
      </div>

      {/* ── Technology ticker ── */}
      <div className="relative z-2 border-y-2 border-border-strong bg-foreground py-3.5 text-background">
        <Marquee duration="52s">
          {allTechnologies.map((tech) => (
            <span key={tech} className="flex items-center">
              <span className="px-5 font-mono text-[0.75rem] tracking-[0.14em] uppercase">
                {tech}
              </span>
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
