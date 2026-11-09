"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { availability, personalInfo } from "@/lib/data";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { Sky } from "@/components/hero/Sky";
import { AgentWindow } from "@/components/hero/AgentWindow";
import { scrollToSection } from "@/components/SmoothScroll";

/* ──────────────────────────────────────────────────────────────────
 *  HERO
 *  The name in a serif against a morning sky, one line on what I build,
 *  two actions — and below, a desktop running a live agent trace that
 *  tilts flat as it scrolls into view.
 * ────────────────────────────────────────────────────────────────── */

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: windowRef,
    offset: ["start end", "start 0.25"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate overflow-hidden pt-36 pb-8 sm:pt-44"
    >
      <Sky target={sectionRef} />

      <Container className="relative flex flex-col items-center text-center">
        <p
          className="rise flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[0.8125rem] font-medium text-white ring-1 ring-white/35 backdrop-blur-md"
          style={d(0)}
        >
          <span className="relative flex h-2 w-2">
            <span className="pulse-ring absolute inset-0 rounded-full bg-[#7dffb0]" />
            <span className="relative h-2 w-2 rounded-full bg-[#7dffb0]" />
          </span>
          {availability.status}
        </p>

        <h1 className="rise mt-7 font-serif text-[clamp(3.25rem,9vw,6.25rem)] leading-[0.98] font-medium tracking-[-0.02em] text-white [text-shadow:0_2px_30px_rgba(20,50,140,0.25)]" style={d(0.08)}>
          {personalInfo.name}
        </h1>

        <p
          className="rise mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/90 sm:text-lg"
          style={d(0.18)}
        >
          Backend AI engineer building multi-agent systems, LLM product
          features and the event-driven infrastructure that keeps them
          reliable.
        </p>

        <div
          className="rise mt-9 flex flex-wrap items-center justify-center gap-3"
          style={d(0.28)}
        >
          <Button size="lg" onClick={() => scrollToSection("#work")}>
            View my work
            <ArrowRight />
          </Button>
          <ButtonLink
            href={personalInfo.resume}
            download
            size="lg"
            variant="glass"
          >
            <Download />
            Résumé
          </ButtonLink>
        </div>
      </Container>

      <Container className="relative mt-16 max-w-[1040px] [perspective:1400px] sm:mt-20">
        <div ref={windowRef} className="rise-window">
          <motion.div
            style={{ rotateX, scale, transformOrigin: "50% 100%" }}
          >
            <AgentWindow />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
