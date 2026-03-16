"use client";

import { ArrowUp } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-8 border-t border-border">
      {/* Subtle gradient top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          &copy; {year} Built by {personalInfo.name} with Next.js &amp; ❤️
        </p>
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 cursor-pointer hover:scale-110 hover:-translate-y-0.5"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </footer>
  );
}
