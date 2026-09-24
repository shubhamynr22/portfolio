"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, FileText, Send } from "lucide-react";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { availability, personalInfo } from "@/lib/data";
import {
  Section,
  Label,
  Terminal,
} from "@/components/ui/primitives";
import { CornerMarks, Jali, LiveDot } from "@/components/ui/patterns";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────────
 *  CONTACT — the transmission console
 *
 *  This is the section the reference was drawn for, so it follows it most
 *  closely: the primary terminal card with its corner inscriptions and jali
 *  screen, the coordinates plate, the dispatch console, and the relay-node
 *  grid underneath.
 *
 *  Two honesty constraints:
 *
 *  1. The console does not send anything. It composes a message and hands it
 *     to the visitor's own mail client, and the copy says so — a form that
 *     flashed "sent" while quietly opening mailto: would be lying.
 *  2. The reference's "READ RATE 100%" is a measured claim, and there is no
 *     measurement. It is replaced with the mechanism ("direct to inbox"),
 *     which is true by construction.
 * ────────────────────────────────────────────────────────────────── */

function useIstClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ist = new Date(now.getTime() + (330 + now.getTimezoneOffset()) * 60000);
      const p = (n: number) => String(n).padStart(2, "0");
      setTime(`${p(ist.getHours())}:${p(ist.getMinutes())}:${p(ist.getSeconds())}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

const [emailUser, emailDomain] = personalInfo.email.split("@");
const whatsapp = `https://wa.me/${personalInfo.phone.replace(/\D/g, "")}`;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "composing" | "ready">("idle");
  const clock = useIstClock();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* Clipboard unavailable — the address is selectable right there. */
    }
  };

  /* Composes the message and hands it to the OS. Nothing leaves this page. */
  const dispatch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setStatus("composing");

    const subject = `Portfolio inquiry${name ? ` from ${name}` : ""}`;
    const body = `${message}\n\n— ${name || "Anonymous"}${from ? `\nReply to: ${from}` : ""}`;

    window.setTimeout(() => {
      setStatus("ready");
      window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
    }, 700);
  };

  const relayNodes = [
    {
      code: "०१",
      group: "Codebase",
      title: "GitHub",
      handle: "@shubhamynr22",
      action: "Explore repos",
      href: personalInfo.github,
      icon: SiGithub,
    },
    {
      code: "०२",
      group: "Career",
      title: "LinkedIn",
      handle: "in/shubhamynr22",
      action: "Professional wire",
      href: personalInfo.linkedin,
      icon: FaLinkedinIn,
    },
    {
      code: "०३",
      group: "Wire",
      title: "WhatsApp",
      handle: personalInfo.phone,
      action: "Instant sync",
      href: whatsapp,
      icon: SiWhatsapp,
    },
    {
      code: "०४",
      group: "Dossier",
      title: "Résumé",
      handle: "PDF · one page",
      action: "Direct download",
      href: personalInfo.resume,
      icon: FileText,
      download: true,
    },
  ];

  return (
    <Section id="contact" size="lg">
      {/* ── Header ── */}
      <header className="flex flex-col gap-6 border-b border-outline-variant pb-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-primary" aria-hidden="true">
              ◊
            </span>
            <Label tone="gold">Direct transmission · संवाद</Label>
          </div>
          <h2 className="display display-lg text-foreground">
            Let&rsquo;s talk{" "}
            <span className="font-normal text-primary">— संवाद करें</span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
          Open to backend AI, high-concurrency platform and distributed-systems
          roles. The wire is open below.
        </p>
      </header>

      {/* ── Availability ── */}
      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-outline-variant bg-surface-low px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <LiveDot tone="live" />
          <span className="label font-semibold text-foreground">
            {availability.status}
          </span>
          <span className="hidden text-outline sm:inline" aria-hidden="true">
            •
          </span>
          <span className="hidden sm:inline">
            <Label tone="outline">{availability.note}</Label>
          </span>
        </div>
        <Label tone="primary" className="rounded-sm bg-surface-high px-2.5 py-1">
          Replies within a day
        </Label>
      </div>

      {/* ── Primary terminal ── */}
      <Reveal className="mt-6">
        <Terminal className="overflow-hidden p-6 sm:p-8">
          <Jali id="jali-contact" opacity={0.065} className="text-secondary" />
          <CornerMarks
            topLeft="०५"
            topRight="संवाद"
            bottomLeft="स्थैर्य"
            bottomRight="प्रणाली"
          />

          <div className="relative grid gap-8 lg:grid-cols-12 lg:gap-9">
            {/* ── Coordinates ── */}
            <div className="flex flex-col gap-5 lg:col-span-6">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-outline-variant bg-surface font-display text-base font-bold tracking-tight text-secondary">
                  {personalInfo.initials}
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-xl font-semibold tracking-tight">
                      शुभम {personalInfo.name.split(" ")[1]}
                    </span>
                    <span className="rounded-full border border-secondary/40 px-2 py-0.5">
                      <Label tone="gold">Direct inbox</Label>
                    </span>
                  </div>
                  <Label tone="primary">{personalInfo.title}</Label>
                </div>
              </div>

              {/* Dispatch target */}
              <div className="flex flex-col gap-3 rounded-xl border border-outline-variant bg-surface px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <Label tone="outline">Primary dispatch target</Label>
                  <span className="flex items-center gap-1.5">
                    <LiveDot tone="live" />
                    <Label tone="gold">Direct to inbox</Label>
                  </span>
                </div>

                {/* `break-all` split this as "…@GMAI / L.COM" at display size.
                    A <wbr> after the @ gives the browser the one break point
                    that actually reads (before the domain). */}
                <div className="display display-md text-balance text-secondary select-all">
                  {emailUser}
                  <wbr />@{emailDomain}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                  <button
                    onClick={copyEmail}
                    className="inline-flex h-9 items-center gap-2 rounded-lg border border-outline-variant bg-surface-highest px-3 font-mono text-[0.6875rem] tracking-[0.1em] text-foreground uppercase transition-colors hover:border-outline hover:bg-surface-highest/70 active:scale-[0.97]"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-secondary" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-secondary" />
                    )}
                    {copied ? "Copied" : "Copy address"}
                  </button>

                  <a
                    href={`mailto:${personalInfo.email}?subject=Inquiry%20via%20Portfolio`}
                    className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary-fill px-4 text-[0.8125rem] font-medium text-on-primary-fill shadow-[0_0_18px_-2px_var(--accent-halo)] transition-colors hover:bg-primary-fill-hover active:scale-[0.97]"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Direct dispatch
                  </a>
                </div>

                <p role="status" aria-live="polite" className="sr-only">
                  {copied ? "Email address copied to clipboard" : ""}
                </p>
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface/70 px-3.5 py-3">
                  <Label tone="outline">Direct wire</Label>
                  <span className="mt-1 font-display text-[0.9375rem] font-semibold">
                    {personalInfo.phone}
                  </span>
                  <span className="mt-0.5">
                    <Label tone="gold">Voice · WhatsApp</Label>
                  </span>
                </div>
                <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface/70 px-3.5 py-3">
                  <Label tone="outline">Chronometer</Label>
                  <span className="mt-1 font-display text-[0.9375rem] font-semibold tabular-nums">
                    {clock ? `${clock} IST` : "--:--:-- IST"}
                  </span>
                  <span className="mt-0.5">
                    <Label tone="primary">UTC+5:30 · India</Label>
                  </span>
                </div>
              </div>
            </div>

            {/* ── Dispatch console ── */}
            <div className="rounded-xl border border-outline-variant bg-surface/60 p-5 sm:p-6 lg:col-span-6">
              <form className="flex flex-col gap-4" onSubmit={dispatch}>
                <div className="flex items-center justify-between gap-3 border-b border-outline-variant pb-3">
                  <span className="flex items-center gap-1.5">
                    <span className="text-primary" aria-hidden="true">
                      ◊
                    </span>
                    <Label tone="gold">Quick dispatch console</Label>
                  </span>
                  <Label
                    tone="outline"
                    className="shrink-0 whitespace-nowrap"
                  >
                    Ingress ०५
                  </Label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field id="name" label="Your name / org">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Maya Sharma"
                      className={inputClass}
                    />
                  </Field>
                  <Field id="email" label="Return coordinates">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="maya@enterprise.ai"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field id="message" label="Role / architecture inquiry" aside="ASCII ready">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Describe the scale, the challenge, or the mandate…"
                    className={cn(inputClass, "resize-none py-2.5")}
                  />
                </Field>

                <div className="flex flex-col gap-3 pt-0.5 sm:flex-row sm:items-center sm:justify-between">
                  {/* Shown at every width, not just desktop: this is the one
                      sentence that stops the console from being mistaken for
                      a form that transmits. */}
                  <Label tone="outline" className="text-center sm:text-left">
                    Opens your mail client — nothing sends from this page
                  </Label>
                  <button
                    type="submit"
                    className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-primary-fill px-5 text-[0.9375rem] font-medium whitespace-nowrap text-on-primary-fill shadow-[0_0_18px_-2px_var(--accent-halo)] transition-colors hover:bg-primary-fill-hover active:scale-[0.98] sm:w-auto"
                  >
                    <span className="font-mono text-[0.8125rem] font-bold">
                      शुभम्
                    </span>
                    <span>Send dispatch</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                {status !== "idle" ? (
                  <p className="rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-center">
                    <Label tone={status === "ready" ? "gold" : "outline"}>
                      {status === "ready"
                        ? "धन्यवाद · Message handed to your mail client"
                        : "Composing dispatch…"}
                    </Label>
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </Terminal>
      </Reveal>

      {/* ── Relay channels ── */}
      <div className="mt-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <span className="h-px w-5 bg-secondary" aria-hidden="true" />
            <Label tone="gold">Relay channels · प्राधिकृत लिंक</Label>
          </span>
          <Label tone="outline">4 nodes synchronised</Label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relayNodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <Reveal key={node.title} delay={index * 60}>
                <a
                  href={node.href}
                  {...(node.download
                    ? { download: "" }
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  className="lift group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-outline-variant bg-surface-low p-5"
                >
                  <div className="relative flex items-center justify-between gap-3">
                    <Label tone="gold">
                      {node.code} {"//"} {node.group}
                    </Label>
                    <Icon
                      className="h-4 w-4 text-outline transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="relative mt-4 flex flex-col">
                    <span className="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {node.title}
                    </span>
                    <span className="mt-0.5 font-mono text-[0.6875rem] text-outline">
                      {node.handle}
                    </span>
                  </div>

                  <div className="relative mt-5 flex items-center justify-between gap-3 border-t border-outline-variant pt-3">
                    <Label tone="outline">{node.action}</Label>
                    <span
                      className="text-secondary transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

const inputClass =
  "w-full rounded-lg border border-outline-variant bg-surface-low px-3.5 py-2.5 font-sans text-sm text-foreground transition-colors placeholder:text-outline/70 hover:border-outline focus:border-primary focus:outline-none";

function Field({
  id,
  label,
  aside,
  children,
}: {
  id: string;
  label: string;
  aside?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id}>
          <Label tone="outline">{label}</Label>
        </label>
        {aside ? (
          <Label tone="outline" className="hidden sm:inline">
            {aside}
          </Label>
        ) : null}
      </div>
      {children}
    </div>
  );
}
