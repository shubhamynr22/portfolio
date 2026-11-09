import type { CSSProperties } from "react";
import { skillCategories, type Skill } from "@/lib/data";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

/* ──────────────────────────────────────────────────────────────────
 *  TOOLKIT
 *  Two rows of tools drifting in opposite directions (hover pauses), then
 *  the eight areas as a quiet grid with bold lead-ins.
 * ────────────────────────────────────────────────────────────────── */

const allSkills = skillCategories.flatMap((c) => c.skills);
const half = Math.ceil(allSkills.length / 2);
const rowA = allSkills.slice(0, half);
const rowB = allSkills.slice(half);

function SkillPill({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <span className="mx-1.5 inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-[0.875rem] font-medium whitespace-nowrap text-ink-2 shadow-[var(--shadow-soft)] ring-1 ring-black/5">
      {Icon ? (
        <Icon className="h-4 w-4 text-[#5a6cb0]" aria-hidden="true" />
      ) : (
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#9fb0e6]" />
      )}
      {skill.name}
    </span>
  );
}

function Row({
  skills,
  reverse = false,
  duration,
}: {
  skills: Skill[];
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div className="marquee mask-x overflow-hidden py-2">
      <div
        className="marquee-track"
        data-reverse={reverse ? "true" : undefined}
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        <div className="flex">
          {skills.map((s) => (
            <SkillPill key={s.name} skill={s} />
          ))}
        </div>
        <div className="flex" aria-hidden="true">
          {skills.map((s) => (
            <SkillPill key={s.name} skill={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="toolkit"
      aria-labelledby="toolkit-title"
      className="scroll-mt-20 overflow-hidden py-20 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="toolkit-title"
            align="center"
            title="The toolkit"
            description="Every tool here has shipped in production — each area traces back to a role above."
          />
        </Reveal>
      </Container>

      <Reveal className="mt-12 space-y-2">
        <Row skills={rowA} duration="55s" />
        <Row skills={rowB} duration="60s" reverse />
      </Reveal>

      <Container>
        <div className="mt-16 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <Reveal key={category.title} delay={(i % 4) * 70}>
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                <span className="font-medium text-ink">{category.title}.</span>{" "}
                {category.evidence}.
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
