import Image from "next/image";
import { aboutBio, stats, education, personalInfo } from "@/lib/data";
import { Section, SectionHeading, Label, HardCard, Rule } from "@/components/ui/primitives";
import { Provenance } from "@/components/ui/patterns";
import { MetricCounter } from "@/components/motion/MetricCounter";
import { Reveal } from "@/components/motion/Reveal";

export default function About() {
  return (
    <Section id="about" size="lg">
      <SectionHeading
        index={1}
        eyebrow="About"
        title={<>About me</>}
        description="AI-focused backend engineer. Most at home where correctness and throughput matter more than pixels — and where a model's answer has to be grounded in something real."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ── Portrait ── */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <figure className="frame frame-hard-lg relative overflow-hidden bg-muted">
                <div className="relative aspect-square w-full">
                  <Image
                    src="/avatar.png"
                    alt={`Portrait of ${personalInfo.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover grayscale contrast-125"
                  />
                  <div className="pulli pointer-events-none absolute inset-0" aria-hidden="true" />
                </div>
                <figcaption className="flex items-center justify-between gap-3 border-t-2 border-border-strong bg-card px-4 py-3">
                  <Label tone="foreground">{personalInfo.name}</Label>
                  <Label>{personalInfo.location}</Label>
                </figcaption>
              </figure>
            </Reveal>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="border-2 border-border-strong p-3">
                <Label>Focus</Label>
                <p className="mt-1.5 text-sm font-medium">Distributed systems</p>
              </div>
              <div className="border-2 border-border-strong p-3">
                <Label>Domains</Label>
                <p className="mt-1.5 text-sm font-medium">SaaS · Fintech · Web3</p>
              </div>
            </div>

            <div className="mt-4">
              <Provenance>Pulli lattice · Kolam, Tamil Nadu</Provenance>
            </div>
          </div>
        </div>

        {/* ── Bio + numbers + education ── */}
        <div className="space-y-10 lg:col-span-8">
          <Reveal className="space-y-5">
            {aboutBio.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          {/* Stats at scale */}
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <HardCard key={stat.label} className="flex flex-col p-4">
                  <div className="display display-md text-primary-ink">
                    <MetricCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mono-sm mt-2 text-muted-foreground">
                    {stat.label}
                  </div>
                  <div className="rule-graduated mt-auto pt-4" />
                </HardCard>
              ))}
            </div>
          </Reveal>

          {/* Education — previously defined in data.ts but never rendered */}
          <Reveal>
            <div className="par">
              <div className="flex items-center justify-between gap-3 border-b-2 border-border-strong px-5 py-3">
                <Label tone="foreground">Education</Label>
                <Label>{education.year}</Label>
              </div>

              <div className="grid gap-6 p-5 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-xl font-extrabold tracking-tight">
                    {education.degree}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {education.institution}
                  </p>
                  <p className="mono-sm mt-2 text-muted-foreground">
                    {education.location} · CGPA {education.cgpa}
                  </p>
                </div>
                <div>
                  <Label>Coursework</Label>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {education.coursework}
                  </p>
                </div>
              </div>

              <Rule />
              <div className="px-5 py-3">
                <Label>
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
