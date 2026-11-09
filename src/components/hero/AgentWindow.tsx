"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUp,
  Battery,
  Calendar,
  Check,
  Database,
  GitBranch,
  Loader2,
  Mail,
  Sparkles,
  Terminal,
  Wifi,
} from "lucide-react";
import { TrafficLights } from "@/components/ui/primitives";

/* ──────────────────────────────────────────────────────────────────
 *  AGENT WINDOW
 *  The hero's "product shot": a desktop with an editor open on an
 *  orchestrator loop, and a glass assistant panel on top running a live
 *  multi-agent trace — question, plan, three tool calls resolving one by
 *  one, then a streamed answer. It loops while on screen.
 *
 *  Decorative and aria-hidden: the scenario is an illustration of how
 *  the systems work, not a claim about a specific incident.
 * ────────────────────────────────────────────────────────────────── */

const QUESTION = "Why did notifications lag last night?";

const TOOLS = [
  { call: 'logs.search("delivery", since: "22:00")', result: "1,204 events" },
  { call: 'metrics.query("queue.oldest_age")', result: "spike 02:14" },
  { call: 'db.explain("pending_jobs")', result: "seq scan" },
];

const ANSWER =
  "A sequential scan on pending_jobs stalled the consumer at 02:14. I added an index and replayed the backlog — the queue drained in 38s.";

/* Timeline in ms from the start of a loop. */
const T = {
  question: 300,
  plan: 1300,
  tool: (i: number) => 2200 + i * 1100,
  toolDone: (i: number) => 2900 + i * 1100,
  answer: 5600,
  loop: 13500,
};

function useAgentRun(active: boolean, still: boolean) {
  const [t, setT] = useState(still ? Number.POSITIVE_INFINITY : 0);

  useEffect(() => {
    if (still || !active) return;
    let start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      let elapsed = now - start;
      if (elapsed > T.loop) {
        start = now;
        elapsed = 0;
      }
      setT(elapsed);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, still]);

  return t;
}

const code = [
  [["k", "export async function "], ["f", "run"], ["p", "(task: Task) {"]],
  [["p", "  "], ["k", "const "], ["v", "plan"], ["p", " = "], ["k", "await "], ["v", "orchestrator"], ["p", "."], ["f", "plan"], ["p", "(task);"]],
  [],
  [["p", "  "], ["k", "for "], ["p", "("], ["k", "const "], ["v", "step"], ["k", " of "], ["v", "plan"], ["p", ".steps) {"]],
  [["p", "    "], ["k", "const "], ["v", "agent"], ["p", " = "], ["v", "registry"], ["p", "."], ["f", "pick"], ["p", "(step.capability);"]],
  [["p", "    "], ["k", "const "], ["v", "result"], ["p", " = "], ["k", "await "], ["v", "agent"], ["p", "."], ["f", "run"], ["p", "(step, { tools, memory });"]],
  [["p", "    "], ["k", "await "], ["v", "ledger"], ["p", "."], ["f", "record"], ["p", "(step.id, result);"]],
  [["p", "  }"]],
  [],
  [["p", "  "], ["k", "return "], ["f", "synthesize"], ["p", "(plan, ledger);"]],
  [["p", "}"]],
] as const;

const tone: Record<string, string> = {
  k: "text-[#c792ea]",
  f: "text-[#82aaff]",
  v: "text-[#e6e9f2]",
  p: "text-[#8c93a8]",
};

export function AgentWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion() ?? false;
  const t = useAgentRun(inView, reduced);

  const answerChars = reduced
    ? ANSWER.length
    : Math.max(0, Math.floor((t - T.answer) / 22));
  const answer = ANSWER.slice(0, answerChars);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative overflow-hidden rounded-[22px] shadow-[0_40px_80px_-30px_rgba(30,60,170,0.55)] ring-1 ring-white/50"
    >
      {/* Wallpaper — a sunrise fan of light */}
      <div className="absolute inset-0 bg-[conic-gradient(from_210deg_at_50%_115%,#1f4fd6_0deg,#3c78ee_40deg,#86a8f3_70deg,#f3b886_100deg,#fbd7a6_120deg,#fdebd0_135deg,#f6c18f_150deg,#7da2f1_185deg,#2a5be0_230deg,#1f4fd6_360deg)]" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(255,255,255,0.35),transparent)]" />

      {/* Menu bar */}
      <div className="relative flex h-7 items-center justify-between bg-white/15 px-4 text-white/90 backdrop-blur-md">
        <span className="flex items-center gap-4 text-[11px] font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Orchestrator</span>
          <span className="hidden text-white/70 sm:inline">File</span>
          <span className="hidden text-white/70 sm:inline">Run</span>
        </span>
        <span className="flex items-center gap-3">
          <Wifi className="h-3.5 w-3.5" />
          <Battery className="h-4 w-4" />
        </span>
      </div>

      <div className="relative px-4 pt-6 pb-20 sm:px-10 sm:pt-10 sm:pb-24">
        {/* Editor window */}
        <div className="mx-auto max-w-[780px] overflow-hidden rounded-xl bg-[#14161d] shadow-2xl ring-1 ring-black/40">
          <div className="flex h-9 items-center gap-3 border-b border-white/5 px-3.5">
            <TrafficLights />
            <span className="mx-auto font-mono text-[11px] text-white/40">
              orchestrator/run.ts
            </span>
          </div>
          <pre className="overflow-hidden px-4 py-4 font-mono text-[11px] leading-[1.75] sm:text-[12.5px]">
            {code.map((line, i) => (
              <div key={i} className="flex">
                <span className="w-7 shrink-0 text-right text-white/20 select-none">
                  {i + 1}
                </span>
                <span className="ml-4 whitespace-pre">
                  {line.map(([k, text], j) => (
                    <span key={j} className={tone[k]}>
                      {text}
                    </span>
                  ))}
                </span>
              </div>
            ))}
            {/* Space the glass panel will sit over */}
            <div className="h-40 sm:h-28" />
          </pre>
        </div>

        {/* Floating control pill */}
        <div className="absolute top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#1c1e26]/90 p-1 pr-1.5 shadow-lg ring-1 ring-white/10 backdrop-blur sm:top-5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#4f8cf6] to-[#2453e8]">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] font-medium text-white/90">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-ring absolute inset-0 rounded-full bg-[#4ade80]" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            </span>
            Live
          </span>
          <span className="h-5 w-5 rounded-md bg-white/90" />
        </div>

        {/* Assistant panel */}
        <div className="glass-dark absolute inset-x-4 bottom-16 mx-auto max-w-[560px] rounded-2xl p-4 text-white sm:bottom-14 sm:p-5">
          <div className="flex justify-end">
            <AnimatePresence>
              {t >= T.question && (
                <motion.span
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-full bg-[#2453e8] px-3 py-1.5 text-[11.5px] font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                >
                  {QUESTION}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-3 min-h-[148px] space-y-2 text-[11.5px] sm:min-h-[132px]">
            {t >= T.plan && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-white/50"
              >
                <GitBranch className="h-3.5 w-3.5" />
                Planning · 3 sub-agents
              </motion.p>
            )}

            {TOOLS.map((tool, i) =>
              t >= T.tool(i) ? (
                <motion.div
                  key={tool.call}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 font-mono text-[10.5px] sm:text-[11px]"
                >
                  {t >= T.toolDone(i) ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#4ade80]" />
                  ) : (
                    <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-white/50" />
                  )}
                  <span className="truncate text-white/80">{tool.call}</span>
                  {t >= T.toolDone(i) && (
                    <span className="ml-auto hidden shrink-0 text-white/40 sm:inline">
                      {tool.result}
                    </span>
                  )}
                </motion.div>
              ) : null,
            )}

            {answerChars > 0 && (
              <p className="pt-1 leading-relaxed text-white/90">
                {answer}
                {answerChars < ANSWER.length && (
                  <span className="caret ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 bg-white/80" />
                )}
              </p>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/10 pt-3 text-[10.5px] text-white/55">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Plan
            </span>
            <span>·</span>
            <span>Tools</span>
            <span>·</span>
            <span>Memory</span>
            <span>·</span>
            <span>Recap</span>
          </div>
          <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2 ring-1 ring-white/10">
            <span className="flex-1 text-[11px] text-white/40">
              Ask the orchestrator…
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2453e8]">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        {/* Dock */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-2xl bg-white/25 p-1.5 ring-1 ring-white/40 backdrop-blur-md">
          {[
            { Icon: Terminal, bg: "from-[#2b2f3a] to-[#14161d]" },
            { Icon: Database, bg: "from-[#3b82f6] to-[#1d4ed8]" },
            { Icon: Mail, bg: "from-[#60a5fa] to-[#2563eb]" },
            { Icon: Calendar, bg: "from-[#fb7185] to-[#e11d48]" },
            { Icon: Sparkles, bg: "from-[#4f8cf6] to-[#2453e8]" },
          ].map(({ Icon, bg }, i) => (
            <span
              key={i}
              className={`flex h-8 w-8 items-center justify-center rounded-[9px] bg-gradient-to-b ${bg} shadow-sm`}
            >
              <Icon className="h-4 w-4 text-white" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
