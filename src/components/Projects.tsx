import { ArrowUpRight, MoveRight } from "lucide-react";
import { projects } from "@/lib/data";
import { Section, SectionHeading, Label, Pill } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
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
    <Section
      id="projects"
      size="lg"
      className="bg-muted"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          index={4}
          eyebrow="Projects"
          title="Selected work"
          description="Things I built to understand a problem properly — mostly infrastructure that has to keep working when something downstream fails."
        />
        <div className="flex items-center gap-2 pb-1">
          <Label>Scroll</Label>
          <MoveRight className="h-4 w-4 text-primary-ink" aria-hidden="true" />
        </div>
      </div>

      {/* ── Rail ── */}
      <div className="mt-12 -mx-5 sm:-mx-8 lg:-mx-12">
        <div
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12"
          tabIndex={0}
          role="region"
          aria-label="Project panels"
        >
          {projects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 60}
              className="w-[84vw] shrink-0 snap-start sm:w-[420px] lg:w-[540px]"
            >
              <article className="frame frame-hard flex h-full flex-col bg-card">
                {/* Plate header */}
                <div className="flex items-center justify-between gap-3 border-b-2 border-border-strong px-5 py-3">
                  <span className="flex items-center gap-2.5">
                    {/* Square stamp, geometric corpus only — the Indus script
                        is undeciphered, so no glyph is reproduced. */}

                    <Label tone="foreground">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(projects.length).padStart(2, "0")}
                    </Label>
                  </span>
                  <Label>{project.repo ? "Repository" : "On request"}</Label>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="display display-md text-balance text-foreground">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>

                  <div className="mt-6 border-l-2 border-loud-2 pl-4">
                    <Label>Why it exists</Label>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {project.problem}
                    </p>
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <li key={tech}>
                        <Pill className="bg-background">{tech}</Pill>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                    {project.repo ? (
                      <ButtonLink
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="sm"
                      >
                        View code
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </ButtonLink>
                    ) : (
                      /* No public repo exists — say so rather than linking a 404. */
                      <span className="frame inline-flex items-center px-3 py-2.5">
                        <Label>Repository available on request</Label>
                      </span>
                    )}
                    {project.live ? (
                      <ButtonLink
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="sm"
                      >
                        Live site
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </ButtonLink>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          {/* End cap — keeps the rail from feeling truncated */}
          <div className="w-[60vw] shrink-0 snap-start sm:w-[240px]">
            <div className="frame flex h-full items-center justify-center p-6">
              <div className="text-center">
                <Label>More on GitHub</Label>
                <a
                  href="https://github.com/shubhamynr22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-ink underline decoration-2 underline-offset-4"
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
