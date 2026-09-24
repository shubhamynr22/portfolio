import { ArrowUpRight, MoveRight } from "lucide-react";
import { projects } from "@/lib/data";
import { Section, SectionHeading, Label, Pill } from "@/components/ui/primitives";
import { Jali, devaDigits, devaNumber } from "@/components/ui/patterns";
import { Reveal } from "@/components/motion/Reveal";
import { Spotlight } from "@/components/motion/Spotlight";
import { ButtonLink } from "@/components/ui/button";

/* ──────────────────────────────────────────────────────────────────
 *  PROJECTS
 *
 *  A horizontal scroll-snap rail on desktop, stacked panels on mobile.
 *  Chose native CSS scroll-snap over a JS scroll-pinning library: it is
 *  keyboard-accessible for free (focus scrolls panels into view), needs
 *  zero JavaScript, and cannot leave the section stranded mid-animation.
 * ────────────────────────────────────────────────────────────────── */

export default function Projects() {
  return (
    <Section id="projects" size="lg">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          index={4}
          eyebrow="Projects"
          title="Selected work"
          description="Things I built to understand a problem properly — mostly infrastructure that has to keep working when something downstream fails."
        />
        <div className="flex items-center gap-2 pb-1">
          <Label tone="outline">Scroll</Label>
          <MoveRight className="h-4 w-4 text-secondary" aria-hidden="true" />
        </div>
      </div>

      {/* ── Rail ── */}
      <div className="mt-10 -mx-5 sm:-mx-8 lg:-mx-12">
        <div
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12"
          tabIndex={0}
          role="region"
          aria-label="Project panels"
        >
          {projects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 60}
              className="w-[84vw] shrink-0 snap-start sm:w-[420px] lg:w-[520px]"
            >
              <Spotlight className="flex h-full flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-low transition-colors hover:border-outline">
                <div className="relative flex items-center justify-between gap-3 border-b border-outline-variant px-4 py-2.5">
                  <Label tone="gold">
                    {devaNumber(index + 1, 2)} /{" "}
                    {devaNumber(projects.length, 2)}
                  </Label>
                  <Label tone="outline">
                    {project.repo ? "Repository" : "On request"}
                  </Label>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="display display-md text-balance text-foreground">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {devaDigits(project.summary)}
                  </p>

                  <div className="mt-5 rounded-md border-l-2 border-secondary/50 bg-surface/60 py-3 pr-3 pl-4">
                    <Label tone="outline">Why it exists</Label>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {devaDigits(project.problem)}
                    </p>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <li key={tech}>
                        <Pill>{tech}</Pill>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                    {project.repo ? (
                      <ButtonLink
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="md"
                      >
                        View code
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </ButtonLink>
                    ) : (
                      /* No public repo exists — say so rather than linking a 404. */
                      <Pill className="h-10 px-3">
                        Repository available on request
                      </Pill>
                    )}
                    {project.live ? (
                      <ButtonLink
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="md"
                      >
                        Live site
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </ButtonLink>
                    ) : null}
                  </div>
                </div>
              </Spotlight>
            </Reveal>
          ))}

          {/* End cap — keeps the rail from feeling truncated */}
          <div className="w-[62vw] shrink-0 snap-start sm:w-[240px]">
            <div className="relative flex h-full min-h-[240px] items-center justify-center overflow-hidden rounded-xl border border-outline-variant bg-surface-low p-6">
              <Jali id="jali-rail-end" size={28} opacity={0.06} className="text-secondary" />
              <div className="relative text-center">
                <Label tone="outline">More on GitHub</Label>
                <a
                  href="https://github.com/shubhamynr22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary underline decoration-1 underline-offset-4 hover:decoration-2"
                >
                  All repositories
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
