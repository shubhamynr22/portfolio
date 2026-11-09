"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { education, experiences } from "@/lib/data";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
 *  EXPERIENCE
 *  An accordion: one line per role, the current one open. Opening a row
 *  shows the number it moved and what was done.
 * ────────────────────────────────────────────────────────────────── */

type Row = {
  key: string;
  title: string;
  subtitle: string;
  period: string;
  current?: boolean;
  headline?: { value: string; label: string };
  points: string[];
};

const rows: Row[] = [
  ...experiences.map((e) => ({
    key: `${e.company}-${e.period}`,
    title: e.company,
    subtitle: `${e.role} · ${e.location}`,
    period: e.period,
    current: e.current,
    headline: e.headline,
    points: e.highlights,
  })),
  {
    key: "education",
    title: "IIIT Sonepat",
    subtitle: education.degree,
    period: education.year,
    points: [
      `${education.institution}. CGPA ${education.cgpa}.`,
      `Coursework: ${education.coursework}.`,
    ],
  },
];

export default function Experience() {
  const [open, setOpen] = useState<string | null>(rows[0].key);

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="scroll-mt-20 py-20 sm:py-28"
    >
      <Container className="max-w-[920px]">
        <Reveal>
          <SectionHeading
            id="experience-title"
            title="Where I've worked"
            description="Six roles, most recent first."
          />
        </Reveal>

        <Reveal className="mt-10">
          <ul className="border-t border-line">
            {rows.map((row) => {
              const isOpen = open === row.key;
              const panelId = `exp-${row.key.replace(/\W+/g, "-")}`;
              return (
                <li key={row.key} className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : row.key)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                      <span className="flex items-center gap-2 text-[1.0625rem] font-medium tracking-[-0.01em]">
                        {row.title}
                        {row.current && (
                          <span className="rounded-full bg-[#e8f8ee] px-2 py-0.5 text-[11px] font-medium text-[#15803d]">
                            Now
                          </span>
                        )}
                      </span>
                      <span className="truncate text-[0.9375rem] text-muted">
                        {row.subtitle}
                      </span>
                    </span>
                    <span className="hidden shrink-0 text-sm text-subtle tabular-nums sm:block">
                      {row.period}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-subtle transition-transform duration-300 group-hover:text-ink",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7">
                          <p className="text-sm text-subtle sm:hidden">
                            {row.period}
                          </p>
                          {row.headline && (
                            <p className="mt-1 mb-4 inline-flex items-baseline gap-2 rounded-xl bg-soft px-3 py-2 ring-1 ring-line">
                              <span className="text-[1.25rem] font-medium tracking-tight text-blue">
                                {row.headline.value}
                              </span>
                              <span className="text-sm text-muted">
                                {row.headline.label}
                              </span>
                            </p>
                          )}
                          <ul className="space-y-2.5">
                            {row.points.map((point) => (
                              <li
                                key={point.slice(0, 32)}
                                className="relative pl-5 text-[0.9375rem] leading-relaxed text-muted before:absolute before:top-[0.6em] before:left-0.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#c3cbe6]"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
