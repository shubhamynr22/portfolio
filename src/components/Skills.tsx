import { skillCategories, allTechnologies } from "@/lib/data";
import {
  Section,
  SectionHeading,
  Label,
  Marquee,
  Pill,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

export default function Skills() {
  return (
    <Section id="skills" size="lg">
      <SectionHeading
        index={2}
        eyebrow="Capabilities"
        title="Technical depth"
        description="Eight areas I work in, with the outcome each one produced. Every evidence line is traceable to a role below."
      />

      {/* ── Capability matrix ──
             Enclosed in a par: the Madhubani doubled border, drawn first and
             drawn as two lines rather than one. */}
      <div className="frame mt-8">
        {skillCategories.map((category, index) => (
          <Reveal
            key={category.title}
            className={
              index > 0 ? "border-t-2 border-border-strong" : undefined
            }
          >
            <div className="grid gap-4 p-5 md:grid-cols-12 md:gap-8 md:p-6">
              {/* Category + evidence */}
              <div className="md:col-span-5">
                <div className="flex items-baseline gap-3">
                  <span className="mono-sm text-muted-foreground tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-extrabold tracking-tight">
                    {category.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {category.evidence}
                </p>
              </div>

              {/* Technologies */}
              <ul className="flex flex-wrap content-start gap-2 md:col-span-7">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <li key={skill.name}>
                      <Pill className="bg-background transition-colors hover:border-loud-2 hover:text-primary-ink">
                        {Icon ? (
                          <Icon className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
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
        <div className="mb-3 flex items-center justify-between">
          <Label>Full inventory</Label>
          <Label>
            {String(allTechnologies.length).padStart(2, "0")} tools
          </Label>
        </div>
        <div className="border-y-2 border-border-strong py-3.5">
          <Marquee duration="58s" reverse>
            {allTechnologies.map((tech) => (
              <span
                key={tech}
                className="flex items-center whitespace-nowrap px-4 font-mono text-[0.8125rem] tracking-[0.12em] uppercase text-muted-foreground"
              >
                {tech}
                <span className="ml-4 text-primary" aria-hidden="true">
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
