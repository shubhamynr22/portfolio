"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { availability, personalInfo } from "@/lib/data";
import { Section, SectionHeading, Label, StatusPill } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* Clipboard unavailable — the mailto link is right there. */
    }
  };

  return (
    <Section id="contact" size="lg" grid>
      <SectionHeading
        index={5}
        eyebrow="Contact"
        title="Let's talk"
        description="I'm looking for backend AI, platform or distributed-systems roles. The fastest way to reach me is email — I read everything."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ── Primary action ── */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="frame frame-hard-lg bg-card">
              <div className="border-b-2 border-border-strong px-5 py-3">
                <Label tone="foreground">Direct</Label>
              </div>

              <div className="p-5 sm:p-7">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="display display-md block break-all text-foreground transition-colors hover:text-primary-ink"
                >
                  {personalInfo.email}
                </a>

                <p className="mono-sm mt-3 text-muted-foreground">
                  {personalInfo.phone} · {personalInfo.location} ·{" "}
                  {personalInfo.timezone}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href={`mailto:${personalInfo.email}`} size="md">
                    <Mail className="h-4 w-4" />
                    Send an email
                  </ButtonLink>

                  <button
                    onClick={copyEmail}
                    className="inline-flex h-11 items-center gap-2 border-2 border-border-strong bg-transparent px-5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy address
                      </>
                    )}
                  </button>

                  <ButtonLink
                    href={personalInfo.resume}
                    download
                    variant="outline"
                    size="md"
                  >
                    Download CV
                  </ButtonLink>
                </div>

                {/* Announced to screen readers when the address is copied */}
                <p role="status" aria-live="polite" className="sr-only">
                  {copied ? "Email address copied to clipboard" : ""}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Availability + elsewhere ── */}
        <div className="space-y-5 lg:col-span-5">
          <Reveal delay={80}>
            <div className="frame p-5">
              <StatusPill>{availability.status}</StatusPill>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {availability.note}. Based in {personalInfo.location} ·{" "}
                {personalInfo.timezone}.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="frame divide-y-2 divide-border-strong">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted"
              >
                <span className="flex items-center gap-3">
                  <SiGithub className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm font-medium">GitHub</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary-ink" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted"
              >
                <span className="flex items-center gap-3">
                  <FaLinkedinIn className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary-ink" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
