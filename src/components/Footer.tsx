"use client";

import { FileText, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { availability, navLinks, personalInfo } from "@/lib/data";
import { Container } from "@/components/ui/primitives";
import { Logo } from "@/components/Navbar";
import { scrollToSection } from "@/components/SmoothScroll";

const whatsapp = `https://wa.me/${personalInfo.phone.replace(/\D/g, "")}`;

const columns = [
  {
    title: "Sections",
    links: navLinks.map((l) => ({ label: l.label, href: l.href, internal: true })),
  },
  {
    title: "Elsewhere",
    links: [
      { label: "GitHub", href: personalInfo.github },
      { label: "LinkedIn", href: personalInfo.linkedin },
      { label: "WhatsApp", href: whatsapp },
    ],
  },
  {
    title: "Résumé",
    links: [{ label: "Download PDF", href: personalInfo.resume, download: true }],
  },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#e6e9f5]">
      <Container>
        <div className="grid gap-10 border-t border-[#d6dbec] py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/70 px-2.5 py-1.5 text-[12px] text-muted ring-1 ring-black/5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
              {availability.status}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-medium text-ink">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...("internal" in link
                        ? {
                            onClick: (e: React.MouseEvent) => {
                              e.preventDefault();
                              scrollToSection(link.href);
                            },
                          }
                        : "download" in link
                          ? { download: "" }
                          : { target: "_blank", rel: "noopener noreferrer" })}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#d6dbec] py-6">
          <p className="text-[13px] text-subtle">
            © {year} {personalInfo.name}. Built with Next.js.
          </p>
          <div className="flex items-center gap-4 text-subtle">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-ink">
              <SiGithub className="h-4 w-4" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-ink">
              <FaLinkedinIn className="h-4 w-4" />
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="hover:text-ink">
              <Mail className="h-4 w-4" />
            </a>
            <a href={personalInfo.resume} download aria-label="Download résumé" className="hover:text-ink">
              <FileText className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
