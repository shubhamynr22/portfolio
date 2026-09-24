import { skillCategories, allTechnologies } from "@/lib/data";
import {
  Section,
  SectionHeading,
  Label,
  Marquee,
  Pill,
} from "@/components/ui/primitives";
import { devaDigits, devaNumber } from "@/components/ui/patterns";
import { Reveal } from "@/components/motion/Reveal";

export default function Skills() {
  return (
    <Section id="skills" size="lg">
      <SectionHeading
        index={2}
        title="Capabilities"
        description="Eight areas, each with the outcome it produced — every line traceable to a role below."
        aside={`${devaNumber(skillCategories.length, 2)} domains`}
      />

      {/* ── Capability matrix ── */}
      <div className="mt-10 overflow-hidden rounded-xl border border-outline-variant bg-surface-low">
        {skillCategories.map((category, index) => (
          <Reveal
            key={category.title}
            className={
              index > 0 ? "border-t border-outline-variant" : undefined
            }
          >
            <div className="grid gap-4 p-4 md:grid-cols-12 md:gap-8 md:p-5">
              <div className="md:col-span-5">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-secondary tabular-nums">
                    {devaNumber(index + 1, 2)}
                  </span>
                  <h3 className="font-display text-[1.0625rem] font-semibold tracking-tight">
                    {category.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {devaDigits(category.evidence)}
                </p>
              </div>

              <ul className="flex flex-wrap content-start gap-1.5 md:col-span-7">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <li key={skill.name}>
                      <Pill className="transition-colors hover:border-secondary/50 hover:text-secondary">
                        {Icon ? (
                          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : null}
                        {skill.name}
                      </Pill>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── Inventory ticker ── */}
      <div className="mt-10">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <span className="h-px w-5 bg-secondary" aria-hidden="true" />
            <Label tone="gold">Full inventory</Label>
          </span>
          <Label tone="outline">
            {devaNumber(allTechnologies.length, 2)} tools
          </Label>
        </div>
        <div className="rounded-xl border border-outline-variant bg-surface-low py-3">
          <Marquee duration="62s" reverse>
            {allTechnologies.map((tech) => (
              <span
                key={tech}
                className="flex items-center px-4 font-mono text-[0.75rem] tracking-[0.1em] whitespace-nowrap text-muted-foreground uppercase"
              >
                {tech}
                <span className="ml-4 text-secondary" aria-hidden="true">
                  /
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </Section>
  );
}
