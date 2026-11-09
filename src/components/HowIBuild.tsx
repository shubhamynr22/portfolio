"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Check, Loader2, Route, ShieldCheck } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
 *  HOW I BUILD
 *  Two feature cards, each with a small live mockup of the idea:
 *  an agent working through its execution plan, and an event pipeline
 *  that keeps delivering when a broker hiccups.
 * ────────────────────────────────────────────────────────────────── */

const PLAN = [
  "Understand the request",
  "Pick sub-agents and tools",
  "Execute with grounded data",
  "Verify, then respond",
];

function usePlanStep(active: boolean, still: boolean) {
  const [step, setStep] = useState(still ? PLAN.length : 0);
  useEffect(() => {
    if (!active || still) return;
    const id = window.setInterval(
      () => setStep((s) => (s >= PLAN.length + 1 ? 0 : s + 1)),
      1100,
    );
    return () => window.clearInterval(id);
  }, [active, still]);
  return step;
}

function PlanCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion() ?? false;
  const step = usePlanStep(inView, reduced);

  return (
    <div
      ref={ref}
      className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#6f97f5_0%,#4b78ee_45%,#3a62e2_100%)] p-7 text-white shadow-[var(--shadow-float)] sm:p-9"
    >
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_20%_0%,rgba(255,255,255,0.35),transparent)]" />

      <h3 className="relative text-[1.5rem] leading-snug font-medium tracking-[-0.02em] sm:text-[1.75rem]">
        Agents that{" "}
        <span className="word-pill">
          <Route className="h-[0.8em] w-[0.8em]" />
          plan
        </span>{" "}
        before they act
      </h3>
      <p className="relative mt-3 max-w-md text-[0.9375rem] leading-relaxed text-white/85">
        An orchestrator breaks the task down, hands each step to a specialised
        sub-agent with the right tools, and checks the result before it
        answers — fewer hallucinations on multi-step work.
      </p>

      {/* Token waveform */}
      <div
        aria-hidden="true"
        className="relative mt-8 flex h-12 items-center justify-center gap-[3px]"
      >
        {Array.from({ length: 44 }).map((_, i) => (
          <span
            key={i}
            className="wave-bar w-[3px] rounded-full bg-white/80"
            style={
              {
                height: `${12 + ((i * 37) % 36)}px`,
                "--d": `${(i % 11) * -0.11}s`,
                opacity: 0.35 + ((i * 13) % 10) / 15,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Execution plan */}
      <div
        aria-hidden="true"
        className="relative mt-8 rounded-2xl bg-[#1e2a5c]/45 p-4 ring-1 ring-white/20 backdrop-blur-md"
      >
        <div className="mb-3 flex items-center justify-between text-[11px] text-white/70">
          <span>Execution plan</span>
          <span className="tabular-nums">
            {Math.min(step, PLAN.length)}/{PLAN.length}
          </span>
        </div>
        <ul className="space-y-2">
          {PLAN.map((label, i) => {
            const done = step > i;
            const running = step === i;
            return (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px] transition-colors duration-300",
                  running ? "bg-white/15" : "bg-transparent",
                  !done && !running && "text-white/45",
                )}
              >
                <span className="flex h-4 w-4 items-center justify-center">
                  {done ? (
                    <Check className="h-4 w-4 text-[#9dffc8]" />
                  ) : running ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  )}
                </span>
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const LOGS = [
  ["evt_7f21", "delivered", "41ms", "ok"],
  ["evt_7f22", "delivered", "38ms", "ok"],
  ["evt_7f23", "broker timeout · retry 1/3", "", "warn"],
  ["evt_7f23", "delivered", "212ms", "ok"],
  ["evt_7f24", "delivered", "44ms", "ok"],
  ["evt_7f25", "duplicate · skipped", "", "muted"],
  ["evt_7f26", "delivered", "39ms", "ok"],
  ["evt_7f27", "delivered", "47ms", "ok"],
] as const;

function PipelineCard() {
  return (
    <div className="card-soft relative flex h-full flex-col overflow-hidden rounded-[28px] p-7 shadow-[var(--shadow-soft)] sm:p-9">
      <h3 className="text-[1.5rem] leading-snug font-medium tracking-[-0.02em] sm:text-[1.75rem]">
        Delivery that{" "}
        <span className="word-pill word-pill-light">
          <ShieldCheck className="h-[0.8em] w-[0.8em] text-blue" />
          survives
        </span>{" "}
        outages
      </h3>
      <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted">
        Event-driven pipelines with idempotent consumers, retries and
        dead-letter queues — so a broker going down at 3am is a log line, not
        an incident.
      </p>

      {/* Pipeline */}
      <div
        aria-hidden="true"
        className="mt-8 flex items-center justify-between gap-2"
      >
        {["EventBridge", "SQS", "Worker"].map((node, i, all) => (
          <div key={node} className="contents">
            <span className="rounded-xl bg-white px-3 py-2 text-[12px] font-medium text-ink-2 shadow-[var(--shadow-soft)] ring-1 ring-black/5">
              {node}
            </span>
            {i < all.length - 1 && (
              <span className="relative h-px flex-1 bg-[#c6cde3]">
                {[0, 0.6, 1.2].map((delay) => (
                  <span
                    key={delay}
                    className="packet absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue shadow-[0_0_10px_rgba(36,83,232,0.7)]"
                    style={{ "--d": `${delay + i * 0.3}s` } as CSSProperties}
                  />
                ))}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Log */}
      <div
        aria-hidden="true"
        className="mt-8 overflow-hidden rounded-2xl bg-[#16181f] p-4 shadow-xl ring-1 ring-black/20"
      >
        <div className="mb-2 flex items-center justify-between font-mono text-[10.5px] text-white/40">
          <span>delivery.log</span>
          <span className="flex items-center gap-1.5 text-[#4ade80]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            near-100% delivered
          </span>
        </div>
        <div className="h-[132px] overflow-hidden [mask-image:linear-gradient(180deg,transparent,#000_20%,#000_80%,transparent)]">
          <div className="log-scroll">
            {[...LOGS, ...LOGS].map(([id, msg, ms, kind], i) => (
              <div
                key={i}
                className="flex gap-3 py-[3px] font-mono text-[11px] whitespace-nowrap sm:text-[11.5px]"
              >
                <span className="text-white/35">{id}</span>
                <span
                  className={cn(
                    "truncate",
                    kind === "ok" && "text-[#9dffc8]",
                    kind === "warn" && "text-[#fbbf77]",
                    kind === "muted" && "text-white/40",
                  )}
                >
                  {msg}
                </span>
                <span className="ml-auto text-white/35">{ms}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowIBuild() {
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="scroll-mt-20 py-20 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="how-title"
            title="How I build AI that holds up in production"
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <PlanCard />
          </Reveal>
          <Reveal delay={120} className="h-full">
            <PipelineCard />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
