import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Archivo } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  ColorThemeProvider,
  paletteInitScript,
} from "@/components/ColorThemeContext";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

/* ── Three type voices ──
 * Archivo      → display (huge statements)
 * Space Grotesk→ body & UI
 * JetBrains Mono → labels, indices, metadata
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
    <html
      lang="en"
      data-palette="volt"
      suppressHydrationWarning
      className={`${archivo.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
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
