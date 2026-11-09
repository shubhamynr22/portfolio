import type { Metadata } from "next";
import { EB_Garamond, Geist, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

/* Geist for the interface, EB Garamond for the one human headline, Geist
 * Mono inside the product-style mockups. */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-eb-garamond",
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
  themeColor: "#2f6fd6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${garamond.variable}`}
    >
      <body className="font-sans antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
