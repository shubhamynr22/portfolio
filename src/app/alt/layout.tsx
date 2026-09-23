import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubham Gupta — Editorial",
  description: "An alternate editorial view of Shubham Gupta's portfolio.",
  /* Design experiment kept for reference — never indexed. */
  robots: { index: false, follow: false, nocache: true },
};

export default function AltLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${jetbrainsMono.variable}`}>
      {children}
    </div>
  );
}
