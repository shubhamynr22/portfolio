import { Label } from "@/components/ui/primitives";
import { devaDigits, devaNumber } from "@/components/ui/patterns";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
 *  STACK SCHEMATIC
 *
 *  The hero's focal visual: a readable picture of the system, rather than
 *  decoration. Every label is drawn from real work in `lib/data.ts` — no
 *  invented claims, and the figure is deliberately NOT forced into sacred
 *  geometry. The layers are a real SRE stack, and dressing a Kafka
 *  diagram as a yantra would be pastiche rather than heritage.
 *
 *  Colour carries one distinction only: the layer group that is the
 *  current specialisation takes the accent, everything else is neutral.
 *  Four competing accents on a figure this size is noise.
 * ────────────────────────────────────────────────────────────────── */

interface Layer {
  index: string;
  name: string;
  detail: string;
}

interface Group {
  title: string;
  accent: string;
  muted?: boolean;
  layers: Layer[];
}

const groups: Group[] = [
  {
    title: "Interface",
    accent: "var(--outline)",
    muted: true,
    layers: [
      { index: "०१", name: "Client", detail: "React · Next.js · WebSocket" },
      { index: "०२", name: "Channels", detail: "Email · WhatsApp Business API" },
    ],
  },
  {
    title: "Intelligence",
    accent: "var(--primary)",
    layers: [
      { index: "०३", name: "Agents", detail: "Orchestrator · Sub-agents · Tool calling" },
      { index: "०४", name: "Grounding", detail: "OpenAI API · RAG · Execution plans" },
    ],
  },
  {
    title: "Platform",
    accent: "var(--outline)",
    muted: true,
    layers: [
      { index: "०५", name: "Services", detail: "Identity · RBAC · Orders · Wallet" },
      { index: "०६", name: "Events", detail: "EventBridge · SQS · Kafka · RabbitMQ" },
    ],
  },
  {
    title: "Foundation",
    accent: "var(--outline-variant)",
    muted: true,
    layers: [
      { index: "०७", name: "Data", detail: "PostgreSQL · MongoDB · Redis" },
      { index: "०८", name: "Runtime", detail: "AWS · Docker · CI/CD" },
    ],
  },
];

export function StackSchematic({ className }: { className?: string }) {
  return (
    <figure className={cn("panel overflow-hidden", className)}>
      <figcaption className="flex items-center justify-between gap-3 border-b border-outline-variant px-4 py-2.5">
        <span className="flex items-center gap-2">
          <span className="text-primary" aria-hidden="true">
            ◊
          </span>
          <Label tone="foreground">The system</Label>
        </span>
        <Label tone="outline">{devaNumber(8, 2)} layers</Label>
      </figcaption>

      <div className="divide-y divide-outline-variant/60">
        {groups.map((group) => (
          <div key={group.title} className="px-4 py-3.5">
            <div className="mb-2.5 flex items-center gap-2">
              <span
                className="h-2 w-2 shrink-0 rounded-sm"
                style={{ background: group.accent }}
                aria-hidden="true"
              />
              <Label tone={group.muted ? "outline" : "primary"}>
                {group.title}
              </Label>
            </div>

            <ul className="space-y-1.5">
              {group.layers.map((layer) => (
                <li
                  key={layer.index}
                  className="flex items-stretch overflow-hidden rounded-md border border-outline-variant/70 bg-surface-low/60"
                >
                  <span
                    className="w-1 shrink-0"
                    style={{ background: group.accent }}
                    aria-hidden="true"
                  />
                  <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 px-2.5 py-2">
                    <span className="flex items-baseline gap-2">
                      <span className="font-mono text-[0.625rem] tracking-[0.1em] text-outline">
                        {layer.index}
                      </span>
                      <span className="font-display text-[0.9375rem] font-semibold tracking-tight">
                        {layer.name}
                      </span>
                    </span>
                    <span className="font-mono text-[0.625rem] text-outline">
                      {layer.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-outline-variant px-4 py-2.5">
        <Label tone="outline">
          {devaDigits(
            "Scale: 100K+ concurrent · 10K events/sec · near-100% delivery",
          )}
        </Label>
      </div>
    </figure>
  );
}
