import type { Metadata } from "next";
import {
  Space_Grotesk,
  JetBrains_Mono,
  Archivo,
  Rajdhani,
} from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  ColorThemeProvider,
  paletteInitScript,
} from "@/components/ColorThemeContext";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

/* ── Three type voices ──
 * Archivo        → display (huge statements)
 * Space Grotesk  → body & UI
 * Rajdhani       → labels, indices, metadata, provenance
 *
 * Rajdhani is an Indian Type Foundry Devanagari + Latin family. Its Latin
 * letterforms are deliberately modularised — round bowls straightened,
 * terminals ending flat on the horizontal or vertical — which is why it can
 * carry the technical register that JetBrains Mono used to, while giving the
 * label voice Indian typographic DNA through a Latin-only cut. Only the two
 * weights the design actually uses are requested; a stray 400 request will
 * resolve to 500 under the CSS font-matching rules rather than synthesising.
 * JetBrains Mono stays loaded as the fallback for glyphs Rajdhani's latin
 * subset does not carry.
 */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-rajdhani",
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
    <html
      lang="en"
      data-palette="indigo"
      data-grid="8x8"
      suppressHydrationWarning
      className={`${archivo.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${rajdhani.variable}`}
    >
      <body className="font-sans antialiased">
        {/* Pre-paint palette application — no flash, no client gate */}
        <script
          dangerouslySetInnerHTML={{ __html: paletteInitScript }}
          suppressHydrationWarning
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ColorThemeProvider>
            <SmoothScroll />
            {children}
          </ColorThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
