"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { heroMetrics } from "@/lib/data";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

/* ──────────────────────────────────────────────────────────────────
 *  IMPACT
 *  A big-number list beside a small card that draws the latency curve
 *  falling when the pipeline went event-driven. The four numbers are
 *  real (lib/data.ts); the curve's shape is illustrative.
 * ────────────────────────────────────────────────────────────────── */

function LatencyCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const draw = reduced ? { pathLength: 1 } : inView ? { pathLength: 1 } : { pathLength: 0 };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="w-full max-w-[340px] rounded-2xl bg-white p-5 shadow-[var(--shadow-float)] ring-1 ring-black/5"
    >
      <p className="text-[11px] text-subtle">Memorea · message delivery</p>
      <p className="mt-1 text-[1.0625rem] font-medium tracking-tight">
        Delivery latency
      </p>

      <div className="mt-3 flex gap-1.5 text-[10.5px]">
        <span className="rounded-md bg-soft px-2 py-1 text-muted">Cron</span>
        <span className="rounded-md bg-[#eef2ff] px-2 py-1 font-medium text-blue">
          Event-driven
        </span>
      </div>

      <svg viewBox="0 0 300 150" className="mt-4 w-full">
        <defs>
          <linearGradient id="lat-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2453e8" stopOpacity="0.18" />
            <stop offset="1" stopColor="#2453e8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[30, 70, 110].map((y) => (
          <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#eceef4" />
        ))}
        <line x1="150" x2="150" y1="10" y2="140" stroke="#c9d2ee" strokeDasharray="3 4" />
        <motion.path
          d="M0 44 C 30 34, 50 52, 75 40 S 120 30, 150 46 C 175 70, 190 92, 215 94 S 260 90, 300 96 L300 150 L0 150 Z"
          fill="url(#lat-fill)"
          initial={reduced ? false : { opacity: 0 }}
          animate={inView || reduced ? { opacity: 1 } : undefined}
          transition={{ delay: 1, duration: 0.8 }}
        />
        <motion.path
          d="M0 44 C 30 34, 50 52, 75 40 S 120 30, 150 46 C 175 70, 190 92, 215 94 S 260 90, 300 96"
          fill="none"
          stroke="#2453e8"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={draw}
          transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>

      <div className="mt-2 flex items-center justify-between text-[11px]">
        <span className="text-subtle">Before</span>
        <span className="rounded-full bg-[#e8f8ee] px-2 py-0.5 font-medium text-[#15803d]">
          −50% latency
        </span>
        <span className="text-subtle">After</span>
      </div>
    </div>
  );
}

export default function Impact() {
  return (
    <section aria-labelledby="impact-title" className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal>
          <div className="card-soft flex items-center justify-center rounded-[28px] p-6 sm:aspect-[4/5] sm:p-8">
            <LatencyCard />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2
              id="impact-title"
              className="text-[clamp(2rem,4.2vw,3rem)] leading-[1.08] font-medium tracking-[-0.035em]"
            >
              Impact, in numbers
            </h2>
          </Reveal>

          <dl className="mt-8">
            {heroMetrics.map((m, i) => (
              <Reveal
                key={m.label}
                delay={i * 80}
                className="border-b border-line last:border-0"
              >
                <div className="grid grid-cols-[7rem_1fr] gap-6 py-6 sm:grid-cols-[9rem_1fr]">
                  <dd className="text-[2.25rem] leading-none font-normal tracking-[-0.04em] sm:text-[2.75rem]">
                    <CountUp
                      value={m.value}
                      prefix={m.prefix}
                      suffix={m.suffix}
                    />
                  </dd>
                  <div>
                    <dt className="text-[1.25rem] font-medium tracking-[-0.02em]">
                      {m.label}
                    </dt>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                      {m.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
