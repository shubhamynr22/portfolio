import { experiences } from "@/lib/data";
import {
  Section,
  SectionHeading,
  Label,
  Rule,
  StatusPill,
} from "@/components/ui/primitives";
import { Provenance } from "@/components/ui/patterns";
import { Reveal } from "@/components/motion/Reveal";

/* ──────────────────────────────────────────────────────────────────
 *  EXPERIENCE — the stepwell
 *
 *  A sticky-scroll narrative rather than an alternating timeline:
 *  the role/company rail pins next to its highlights as you scroll,
 *  so the eye never has to jump across the page.
 *
 *  `position: sticky` does the work natively — no scroll library, no
 *  pinning to break, and it degrades to a normal stacked layout on
 *  mobile and under reduced motion.
 *
 *  The Chand Baori framing is the one place on this site where a cultural
 *  reference carries INFORMATION rather than decorating: each role is a
 *  storey, and each storey's flight length is its real tenure in months.
 *  That is why the step count is derived from the data instead of fixed.
 * ────────────────────────────────────────────────────────────────── */

/** Months between the two ends of a period string. Null if it won't parse —
 *  the UI must degrade to an unlabelled flight rather than print a wrong
 *  number, so every unparseable case returns null instead of a guess. */
function monthsIn(period: string): number | null {
  // The data uses an em dash; an en dash or hyphen is accepted too so a
  // future content edit cannot silently turn every tenure into a fallback.
  const [startRaw, endRaw] = period.split(/\s*[—–-]\s*/);
  if (!startRaw || !endRaw) return null;

  const start = new Date(startRaw);
  const end = /present|current|now/i.test(endRaw) ? new Date() : new Date(endRaw);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;
  return months > 0 ? months : null;
}

const TENURES = experiences.map((exp) => monthsIn(exp.period));
const LONGEST_TENURE = Math.max(...TENURES.map((m) => m ?? 0), 1);

/** A flight of steps whose width is proportional to real tenure. Reuses the
 *  same stepped-rule geometry as the section dividers. */
function StepFlight({ months }: { months: number | null }) {
  const steps = months ? Math.max(3, Math.round((months / LONGEST_TENURE) * 12)) : 6;
  return (
    <span
      className="rule-step inline-block align-middle"
      style={{ width: `${(steps / 12) * 100}%`, minWidth: "44px" }}
      aria-hidden="true"
    />
  );
}

export default function Experience() {
  return (
    <Section id="experience" size="lg">
      <SectionHeading
        index={3}
        eyebrow="Experience"
        title="Where I've shipped"
        description="Six roles, in reverse order. Each one leads with the number it moved."
      />

      <div className="mt-8">
        <Provenance>
          Stepwell · Chand Baori, Abhaneri · 13 storeys, ~3,500 steps
        </Provenance>
      </div>

      <div className="mt-10">
        {experiences.map((exp, index) => (
          <Reveal key={`${exp.company}-${exp.period}`}>
            {/* Interlocking flights instead of a straight divider. */}
            <Rule variant="step" />
            <article className="grid gap-6 pt-8 pb-14 md:grid-cols-12 md:gap-10">
              {/* ── Sticky rail ── */}
              <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
                <div className="flex items-center gap-3">
                  <Label tone="foreground">
                    Storey {String(index + 1).padStart(2, "0")}
                  </Label>
                  <Label>{exp.location}</Label>
                </div>

                {/* Flight width = real tenure. The months are printed too, so
                    the encoding is legible rather than a private metaphor. */}
                <div className="mt-4 flex items-center gap-3">
                  <StepFlight months={TENURES[index]} />
                  <Label>
                    {TENURES[index] ? `${TENURES[index]} mo` : "—"}
                  </Label>
                </div>

                <h3 className="display display-md mt-3 text-balance text-foreground">
                  {exp.company}
                </h3>

                <p className="mt-2 text-sm font-medium">{exp.role}</p>
                <p className="mono-sm mt-1 text-muted-foreground">{exp.period}</p>

                {exp.current ? (
                  <div className="mt-3">
                    <StatusPill>Current</StatusPill>
                  </div>
                ) : null}

                <div className="frame mt-5 p-4">
                  <div className="display display-md text-primary-ink">
                    {exp.headline.value}
                  </div>
                  <div className="mono-sm mt-1 text-muted-foreground">
                    {exp.headline.label}
                  </div>
                </div>
              </div>

              {/* ── Highlights ── */}
              <ol className="space-y-5 md:col-span-8">
                {exp.highlights.map((highlight, i) => (
                  <li
                    key={highlight.slice(0, 32)}
                    className="flex gap-4 border-l-2 border-border-strong pl-5"
                  >
                    <span className="mono-sm mt-1 shrink-0 text-muted-foreground tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {highlight}
                    </p>
                  </li>
                ))}
              </ol>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
