import { experiences } from "@/lib/data";
import {
  Section,
  SectionHeading,
  Label,
  Panel,
} from "@/components/ui/primitives";
import { LiveDot } from "@/components/ui/patterns";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
 *  EXPERIENCE — the stepwell
 *
 *  A sticky-scroll narrative rather than an alternating timeline: the
 *  role/company rail pins next to its highlights as you scroll, so the eye
 *  never has to jump across the page. `position: sticky` does the work
 *  natively — no scroll library, no pinning to break, and it degrades to a
 *  normal stacked layout on mobile and under reduced motion.
 *
 *  The Chand Baori framing is the one place on this site where a cultural
 *  reference carries INFORMATION rather than decorating: each role is a
 *  storey, and each storey's flight length is its real tenure in months.
 *  That is why the bar width is derived from the data instead of fixed.
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

/** A flight of steps whose width is proportional to real tenure. */
function StepFlight({ months }: { months: number | null }) {
  const pct = months ? Math.max(14, (months / LONGEST_TENURE) * 100) : 40;
  return (
    <span
      className="flex h-1 flex-1 overflow-hidden rounded-sm bg-surface-highest"
      aria-hidden="true"
    >
      <span
        className="block rounded-sm bg-secondary/80"
        style={{ width: `${pct}%` }}
      />
    </span>
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
        aside={`${String(experiences.length).padStart(2, "0")} storeys`}
      />

      <div className="mt-10">
        {experiences.map((exp, index) => (
          <Reveal key={`${exp.company}-${exp.period}`}>
            <article
              className={cn(
                "grid gap-6 border-t border-outline-variant pt-8 pb-12 md:grid-cols-12 md:gap-10",
                index === experiences.length - 1 && "border-b",
              )}
            >
              {/* ── Sticky rail ── */}
              <div className="md:col-span-4 md:sticky md:top-28 md:self-start">
                <div className="flex items-center gap-2.5">
                  <Label tone="gold">
                    Storey {String(index + 1).padStart(2, "0")}
                  </Label>
                  <span className="text-outline" aria-hidden="true">
                    ·
                  </span>
                  <Label tone="outline">{exp.location}</Label>
                </div>

                {/* Bar length = real tenure. The months are printed too, so
                    the encoding is legible rather than a private metaphor. */}
                <div className="mt-3 flex items-center gap-3">
                  <StepFlight months={TENURES[index]} />
                  <Label tone="outline" className="shrink-0 tabular-nums">
                    {TENURES[index] ? `${TENURES[index]} mo` : "—"}
                  </Label>
                </div>

                <h3 className="display display-md mt-4 text-balance text-foreground">
                  {exp.company}
                </h3>

                <p className="mt-2 text-sm font-medium">{exp.role}</p>
                <p className="mt-1 font-mono text-[0.6875rem] text-outline">
                  {exp.period}
                </p>

                {exp.current ? (
                  <div className="mt-3 flex items-center gap-2">
                    <LiveDot tone="live" />
                    <Label tone="gold">Current</Label>
                  </div>
                ) : null}

                <Panel className="mt-5 px-4 py-3.5">
                  <div className="display display-md text-primary">
                    {exp.headline.value}
                  </div>
                  <div className="mt-1">
                    <Label tone="outline">{exp.headline.label}</Label>
                  </div>
                </Panel>
              </div>

              {/* ── Highlights ── */}
              <ol className="space-y-4 md:col-span-8">
                {exp.highlights.map((highlight, i) => (
                  <li
                    key={highlight.slice(0, 32)}
                    className="flex gap-4 rounded-r-md border-l-2 border-outline-variant bg-surface-low/40 py-3 pr-4 pl-4"
                  >
                    <span className="mt-0.5 shrink-0 font-mono text-[0.6875rem] tracking-[0.1em] text-secondary tabular-nums">
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
