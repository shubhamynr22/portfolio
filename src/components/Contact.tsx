"use client";

import { useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Braces, Check, Copy, Mail, TerminalSquare } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

/* ──────────────────────────────────────────────────────────────────
 *  CONTACT
 *  The closing call to action on a lavender ground, with two frosted
 *  keycaps floating beside it that lean toward the pointer.
 * ────────────────────────────────────────────────────────────────── */

function Keycap({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`float absolute flex items-center justify-center rounded-[26px] bg-[linear-gradient(145deg,#ffffff_0%,#eef1fa_55%,#dfe4f3_100%)] shadow-[0_30px_60px_-20px_rgba(60,80,170,0.45),inset_0_2px_0_rgba(255,255,255,1),inset_0_-6px_12px_rgba(120,140,210,0.18)] ring-1 ring-white ${className ?? ""}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const area = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const x1 = useTransform(sx, (v) => v * 18);
  const y1 = useTransform(sy, (v) => v * 18);
  const x2 = useTransform(sx, (v) => v * -12);
  const y2 = useTransform(sy, (v) => v * -12);

  const onMove = (e: React.PointerEvent) => {
    const r = area.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable — the address is visible right there. */
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef0f8_28%,#e6e9f5_100%)] pt-24 pb-20 sm:pt-32"
      onPointerMove={onMove}
    >
      <Container className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        <Reveal>
          <h2
            id="contact-title"
            className="text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.03em]"
          >
            AI that helps in production, not just in demos.
            <span className="block text-[#7c8aa8]">
              Let&rsquo;s build yours together.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-muted">
            Open to backend AI, high-concurrency platform and
            distributed-systems roles.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${personalInfo.email}?subject=Hello%20from%20your%20portfolio`}
              className="btn-gloss inline-flex h-12 items-center gap-2 rounded-xl px-6 text-[0.9375rem] font-medium"
            >
              <Mail className="h-4 w-4" />
              Email me
            </a>
            <button
              onClick={copy}
              className="btn-glass inline-flex h-12 items-center gap-2 rounded-xl px-5 text-[0.9375rem] font-medium"
            >
              {copied ? (
                <Check className="h-4 w-4 text-[#15803d]" />
              ) : (
                <Copy className="h-4 w-4 text-subtle" />
              )}
              {copied ? "Copied" : personalInfo.email}
            </button>
            <p role="status" aria-live="polite" className="sr-only">
              {copied ? "Email address copied to clipboard" : ""}
            </p>
          </div>
        </Reveal>

        <div
          ref={area}
          aria-hidden="true"
          className="relative mx-auto h-[260px] w-full max-w-[360px] sm:h-[320px]"
        >
          <motion.div style={{ x: x1, y: y1 }} className="absolute inset-0">
            <Keycap
              className="top-2 right-4 h-28 w-28 sm:h-32 sm:w-32"
              style={{ "--tilt": "12deg", "--d": "-1s" } as CSSProperties}
            >
              <Braces className="h-11 w-11 text-[#9aa6cf]" strokeWidth={1.5} />
            </Keycap>
          </motion.div>
          <motion.div style={{ x: x2, y: y2 }} className="absolute inset-0">
            <Keycap
              className="bottom-4 left-6 h-32 w-32 sm:h-36 sm:w-36"
              style={
                {
                  "--tilt": "-10deg",
                  "--d": "-3.5s",
                  "--float-duration": "8s",
                } as CSSProperties
              }
            >
              <TerminalSquare
                className="h-12 w-12 text-[#7f95e6] drop-shadow-[0_0_10px_rgba(127,149,230,0.6)]"
                strokeWidth={1.5}
              />
            </Keycap>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
