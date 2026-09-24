import { aboutBio, stats, education } from "@/lib/data";
import { Section, SectionHeading, Label, Panel } from "@/components/ui/primitives";
import { devaDigits } from "@/components/ui/patterns";
import { MetricCounter } from "@/components/motion/MetricCounter";
import { Reveal } from "@/components/motion/Reveal";

/* ──────────────────────────────────────────────────────────────────
 *  ABOUT
 *
 *  No portrait. There was one, framed and captioned, and it was doing the
 *  job a photograph does on a CV: filling a column. The copy is what the
 *  section is for, so the column is gone and the text gets the width.
 *
 *  One paragraph, not two. The old first paragraph restated the hero
 *  summary and the old second restated the stat row beneath it — three
 *  places saying "3+ years, Node.js, 100K+ users". What is left is the part
 *  that appears nowhere else.
 * ────────────────────────────────────────────────────────────────── */

export default function About() {
  return (
    <Section id="about" size="lg">
      <SectionHeading index={1} title="About" />

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="space-y-6 lg:col-span-7">
          {aboutBio.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]"
            >
              {devaDigits(paragraph)}
            </p>
          ))}

          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-1">
            <div>
              <Label tone="outline">Focus</Label>
              <p className="mt-1.5 text-sm font-medium">Distributed systems</p>
            </div>
            <div>
              <Label tone="outline">Domains</Label>
              <p className="mt-1.5 text-sm font-medium">
                SaaS · Fintech · Web3
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Numbers + education ── */}
        <div className="space-y-6 lg:col-span-5">
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <Panel key={stat.label} className="flex flex-col px-4 py-4">
                  <div className="display display-md text-primary">
                    <MetricCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2">
                    <Label tone="outline">{stat.label}</Label>
                  </div>
                </Panel>
              ))}
            </div>
          </Reveal>

        </div>
      </div>

      {/* Full width, not stacked under the stats: in the right column it made
          that side 270px taller than the bio beside it, and the resulting gap
          read as a missing element rather than as whitespace. */}
      <Reveal className="mt-6">
        <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-low">
          <div className="flex items-center justify-between gap-3 border-b border-outline-variant px-4 py-2.5">
            <Label tone="foreground">Education</Label>
            <Label tone="outline" lang="hi">
              {education.year}
            </Label>
          </div>

          <div className="grid gap-6 p-4 sm:grid-cols-2 sm:p-5">
            <div>
              <h3 className="font-display text-[1.0625rem] font-semibold tracking-tight">
                {education.degree}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {education.institution}
              </p>
              <p className="mt-2 font-mono text-[0.6875rem] text-outline">
                {devaDigits(`${education.location} · CGPA ${education.cgpa}`)}
              </p>
            </div>

            <div>
              <Label tone="outline">Coursework</Label>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {education.coursework}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
