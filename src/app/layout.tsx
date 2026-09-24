import type { Metadata } from "next";
import {
  Space_Grotesk,
  Plus_Jakarta_Sans,
  Space_Mono,
  Mukta,
} from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

/* ── The type system ──
 * Three Latin voices, each with one job, plus one Devanagari face that is
 * not a voice at all but a fallback.
 *
 *   Space Grotesk ......... statements. A grotesque with the terminals cut
 *                           off square — reads as instrument labelling
 *                           rather than as editorial.
 *   Plus Jakarta Sans ..... reading. Open apertures, generous x-height, and
 *                           it stays calm at 15px for long paragraphs.
 *   Space Mono ............ notation. Indices, coordinates, timestamps. The
 *                           monospace IS the archive aesthetic here.
 *   Mukta ................. every Devanagari glyph. It sits at the tail of
 *                           each stack in globals.css, so it catches the
 *                           script automatically — no wrapper, no class, and
 *                           nothing to remember when new copy is added.
 *
 * Weights are declared explicitly because none of these four is variable on
 * Google Fonts: omitting `weight` would ship every weight of every face.
 */
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

/* Devanagari only. The hero name alternates between scripts and the site
 * carries a handful of Devanagari notations; the Latin half of Mukta would
 * be dead weight that never gets reached. */
const mukta = Mukta({
  subsets: ["devanagari"],
  weight: ["400", "600", "800"],
  variable: "--font-mukta",
  display: "swap",
});

import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shubham Gupta — AI-focused Backend Engineer",
    template: "%s · Shubham Gupta",
  },
  description:
    "AI-focused backend engineer building multi-agent systems, LLM-powered product features and the event-driven infrastructure behind them. Node.js, NestJS, AWS, Kafka.",
  keywords: [
    "Shubham Gupta",
    "Backend AI Engineer",
    "Multi-Agent Systems",
    "LLM Engineer",
    "Agent Orchestration",
    "RAG",
    "Node.js",
    "NestJS",
    "Kafka",
    "AWS",
    "TypeScript",
    "PostgreSQL",
    "Portfolio",
  ],
  authors: [{ name: "Shubham Gupta", url: SITE_URL }],
  creator: "Shubham Gupta",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Shubham Gupta",
    title: "Shubham Gupta — AI-focused Backend Engineer",
    description:
      "Multi-agent systems and LLM product features on Node.js, NestJS and AWS. 100K+ concurrent users supported, 50% delivery latency cut.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham Gupta — AI-focused Backend Engineer",
    description:
      "Multi-agent systems and LLM product features on Node.js, NestJS and AWS. 100K+ concurrent users supported, 50% delivery latency cut.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#10131B" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${grotesk.variable} ${jakarta.variable} ${mono.variable} ${mukta.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
