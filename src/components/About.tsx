import Image from "next/image";
import { aboutBio, stats, education, personalInfo } from "@/lib/data";
import {
  Section,
  SectionHeading,
  Label,
  Panel,
} from "@/components/ui/primitives";
import { Jali } from "@/components/ui/patterns";
import { MetricCounter } from "@/components/motion/MetricCounter";
import { Reveal } from "@/components/motion/Reveal";

export default function About() {
  return (
    <Section id="about" size="lg">
      <SectionHeading
        index={1}
        eyebrow="About"
        title="About me"
        description="AI-focused backend engineer. Most at home where correctness and throughput matter more than pixels — and where a model's answer has to be grounded in something real."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ── Portrait ── */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <figure className="overflow-hidden rounded-xl border border-outline-variant bg-surface-low">
                <div className="relative aspect-square w-full bg-surface">
                  <Image
                    src="/avatar.png"
                    alt={`Portrait of ${personalInfo.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  {/* The screen sits over the plate rather than beside it —
                      the portrait is already a specimen, and the lattice at
                      this opacity only adds texture to the flat areas. */}
                  <Jali
                    id="jali-portrait"
                    size={28}
                    opacity={0.07}
                    className="text-secondary"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-3 border-t border-outline-variant px-4 py-3">
                  <Label tone="foreground">{personalInfo.name}</Label>
                  <Label tone="gold">{personalInfo.location}</Label>
                </figcaption>
              </figure>
            </Reveal>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-outline-variant bg-surface-low px-3.5 py-3">
                <Label tone="outline">Focus</Label>
                <p className="mt-1.5 text-sm font-medium">Distributed systems</p>
              </div>
              <div className="rounded-lg border border-outline-variant bg-surface-low px-3.5 py-3">
                <Label tone="outline">Domains</Label>
                <p className="mt-1.5 text-sm font-medium">SaaS · Fintech · Web3</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bio + numbers + education ── */}
        <div className="space-y-9 lg:col-span-8">
          <Reveal className="space-y-5">
            {aboutBio.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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

          <Reveal>
            <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-low">
              <div className="flex items-center justify-between gap-3 border-b border-outline-variant px-4 py-2.5">
                <span className="flex items-center gap-2">
                  <span className="text-primary" aria-hidden="true">
                    ◊
                  </span>
                  <Label tone="foreground">Education</Label>
                </span>
                <Label tone="outline">{education.year}</Label>
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
                    {education.location} · CGPA {education.cgpa}
                  </p>
                </div>
                <div>
                  <Label tone="outline">Coursework</Label>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {education.coursework}
                  </p>
                </div>
              </div>

              <div className="border-t border-outline-variant px-4 py-2.5">
                <Label tone="outline">
                  {personalInfo.title} · {personalInfo.location} ·{" "}
                  {personalInfo.timezone}
                </Label>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
