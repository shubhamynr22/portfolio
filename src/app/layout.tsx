import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

/* ── ONE typeface for the entire interface ──
 * Mukta (Ek Type, Mumbai) — a single family that draws Devanagari and Latin
 * together as one system rather than pairing a Latin face with an Indic one.
 * That is the requirement here rather than a preference: the name animates
 * between the two scripts, so both halves have to look like they belong to
 * each other, and they do because they were designed together.
 *
 * Weights are the only variation — 400 for body, 600 for labels and UI,
 * 800 for display. One family, three weights, no second voice.
 *
 * Both subsets are loaded. Devanagari is not optional: the name needs it,
 * and next/font self-hosts it with no runtime dependency on a foreign CDN.
 */
const mukta = Mukta({
  subsets: ["latin", "devanagari"],
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
    { media: "(prefers-color-scheme: light)", color: "#EFEBE4" },
    { media: "(prefers-color-scheme: dark)", color: "#131316" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-grid: 8x8 pada (Manduka) by default; 9x9 (Paramasaayika) also
    // supported — it only changes the heavier mandala line's interval.
    <html lang="en" suppressHydrationWarning className={mukta.variable}>
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
