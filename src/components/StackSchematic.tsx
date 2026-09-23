import { Label } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
 *  STACK SCHEMATIC
 *
 *  The hero's focal visual: a readable picture of the system, rather
 *  than decoration. Every label is drawn from real work in `lib/data.ts`
 *  — no invented claims.
 *
 *  Colour encodes layer group. "Intelligence" carries the loud accent
 *  because multi-agent work is the current specialisation; the
 *  foundation layer is deliberately neutral.
 * ────────────────────────────────────────────────────────────────── */

interface Layer {
  index: string;
  name: string;
  detail: string;
}

interface Group {
  title: string;
  accent: string;
  layers: Layer[];
}

const groups: Group[] = [
  {
    title: "Interface",
    accent: "var(--primary)",
    layers: [
      {
        index: "01",
        name: "Client",
        detail: "React · Next.js · WebSocket",
      },
      {
        index: "02",
        name: "Channels",
        detail: "Email · WhatsApp Business API",
      },
    ],
  },
  {
    title: "Intelligence",
    accent: "var(--loud-2)",
    layers: [
      {
        index: "03",
        name: "Agents",
        detail: "Orchestrator · Sub-agents · Tool calling",
      },
      {
        index: "04",
        name: "Grounding",
        detail: "OpenAI API · RAG · Execution plans",
      },
    ],
  },
  {
    title: "Platform",
    accent: "var(--loud-3)",
    layers: [
      {
        index: "05",
        name: "Services",
        detail: "Identity · RBAC · Orders · Wallet",
      },
      {
        index: "06",
        name: "Events",
        detail: "EventBridge · SQS · Kafka · RabbitMQ",
      },
    ],
  },
  {
    title: "Foundation",
    accent: "var(--border-strong)",
    layers: [
      {
        index: "07",
        name: "Data",
        detail: "PostgreSQL · MongoDB · Redis",
      },
      {
        index: "08",
        name: "Runtime",
        detail: "AWS · Docker · CI/CD",
      },
    ],
  },
];

export function StackSchematic({ className }: { className?: string }) {
  return (
    <figure className={cn("frame frame-hard-lg bg-card", className)}>
      {/* Plate header */}
      <figcaption className="flex items-center justify-between gap-3 border-b-2 border-border-strong px-4 py-3">
        <Label tone="foreground">Fig. 01 — System I build</Label>
        <Label>8 layers</Label>
      </figcaption>

      <div className="divide-y-2 divide-border-strong">
        {groups.map((group) => (
          <div key={group.title} className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0"
                style={{ background: group.accent }}
                aria-hidden="true"
              />
              <Label>{group.title}</Label>
            </div>

            <ul className="space-y-2">
              {group.layers.map((layer) => (
                <li
                  key={layer.index}
                  className="flex items-stretch border-2 border-border-strong"
                >
                  <span
                    className="w-1.5 shrink-0"
                    style={{ background: group.accent }}
                    aria-hidden="true"
                  />
                  <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-3 py-2.5">
                    <span className="flex items-baseline gap-2">
                      <span className="mono-sm text-muted-foreground">
                        {layer.index}
                      </span>
                      <span className="font-display text-base font-extrabold tracking-tight">
                        {layer.name}
                      </span>
                    </span>
                    <span className="font-mono text-[0.6875rem] text-muted-foreground">
                      {layer.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-border-strong bg-muted px-4 py-3">
        <Label>
          Scale: 100K+ concurrent · 10K events/sec · near-100% delivery
        </Label>
      </div>
    </figure>
  );
}
