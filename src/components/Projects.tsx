"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { personalInfo, projects } from "@/lib/data";
import {
  Container,
  SectionHeading,
  TrafficLights,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

/* ──────────────────────────────────────────────────────────────────
 *  SELECTED WORK
 *  Each project gets a lavender stage with a small working mockup of
 *  the tool, then a bold one-line lead-in and the detail.
 *  Mockup values are illustrative and aria-hidden.
 * ────────────────────────────────────────────────────────────────── */

const QUERY_LINES = [
  { text: "$ querylens explain orders_by_user.sql", tone: "text-white/90" },
  { text: "→ reading execution plan…", tone: "text-white/45" },
  { text: "Seq Scan on orders  (cost=0.00..48211.40)", tone: "text-[#fca5a5]" },
  { text: "  Filter: (user_id = $1)  rows removed: 1.2M", tone: "text-white/45" },
  { text: "Diagnosis: no index on orders.user_id", tone: "text-white/90" },
  { text: "+ CREATE INDEX idx_orders_user_id ON orders (user_id);", tone: "text-[#9dffc8]" },
  { text: "Index Scan  (cost=0.43..312.18)   −99% cost", tone: "text-[#93c5fd]" },
];

function QueryLensMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="w-full max-w-[460px] overflow-hidden rounded-xl bg-[#15171e] shadow-2xl ring-1 ring-black/30"
    >
      <div className="flex h-8 items-center gap-3 border-b border-white/5 px-3">
        <TrafficLights />
        <span className="mx-auto font-mono text-[10.5px] text-white/35">
          querylens — zsh
        </span>
      </div>
      <div className="space-y-1 p-4 font-mono text-[10.5px] leading-relaxed sm:text-[11.5px]">
        {QUERY_LINES.map((line, i) => (
          <motion.p
            key={i}
            className={`truncate ${line.tone}`}
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.15 + i * 0.32, duration: 0.35 }}
          >
            {line.text}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

const IDLE = [
  { name: "rds-staging-replica", kind: "RDS", cost: 412, pct: 100 },
  { name: "ebs-orphaned-vol-0a9", kind: "EBS", cost: 96, pct: 34 },
  { name: "lambda-legacy-sync", kind: "Lambda", cost: 38, pct: 16 },
  { name: "s3-old-build-artifacts", kind: "S3", cost: 21, pct: 9 },
];

function IdleWatchMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="w-full max-w-[460px] rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black/5 sm:p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-subtle">Idle resources · last 14 days</p>
          <p className="mt-1 text-[1.375rem] font-medium tracking-tight">
            $567<span className="text-[0.8125rem] text-subtle">/mo wasted</span>
          </p>
        </div>
        <span className="rounded-full bg-[#eef2ff] px-2.5 py-1 text-[10.5px] font-medium text-blue">
          4 flagged
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {IDLE.map((r, i) => (
          <li key={r.name}>
            <div className="flex items-center justify-between text-[11.5px]">
              <span className="flex items-center gap-2">
                <span className="rounded bg-soft px-1.5 py-0.5 font-mono text-[9.5px] text-muted">
                  {r.kind}
                </span>
                <span className="font-mono text-ink-2">{r.name}</span>
              </span>
              <span className="tabular-nums text-muted">${r.cost}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-soft">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#7aa2f7] to-blue"
                initial={reduced ? false : { width: 0 }}
                animate={inView ? { width: `${r.pct}%` } : undefined}
                style={reduced ? { width: `${r.pct}%` } : undefined}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-lg bg-soft px-3 py-2 font-mono text-[10.5px] text-muted">
        terraform: <span className="text-ink-2">aws_db_instance.staging_replica</span> → destroy
      </div>
    </div>
  );
}

const MOCKS = [QueryLensMock, IdleWatchMock];

export default function Projects() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="scroll-mt-20 py-20 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="work-title"
            title="Selected work"
            description="Tools I built to understand a problem properly — mostly infrastructure that has to keep working when something downstream fails."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-6">
          {projects.map((project, index) => {
            const Mock = MOCKS[index % MOCKS.length];
            return (
              <Reveal key={project.title} delay={index * 120} className="min-w-0">
                <article>
                  <div className="card-soft group relative flex min-h-[280px] items-center sm:aspect-[5/4] justify-center overflow-hidden rounded-[28px] p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-10">
                    <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.9),transparent)]" />
                    <div className="relative w-full transition-transform duration-500 group-hover:scale-[1.02]">
                      <div className="flex justify-center">
                        <Mock />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 px-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-[1.25rem] font-medium tracking-[-0.02em]">
                        {project.title}
                      </h3>
                      {project.repo ? (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue hover:underline"
                        >
                          Code <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="text-sm text-subtle">
                          Code on request
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                      <span className="font-medium text-ink">
                        {project.summary}
                      </span>{" "}
                      {project.problem}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full bg-soft px-2.5 py-1 text-[12px] text-muted ring-1 ring-line"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-12 text-center text-[0.9375rem] text-muted">
          More experiments on{" "}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 font-medium text-ink hover:text-blue"
          >
            GitHub <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </p>
      </Container>
    </section>
  );
}
