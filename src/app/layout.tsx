import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubham Gupta — Backend / Full Stack Engineer",
  description:
    "Portfolio of Shubham Gupta — 3+ years building scalable backend systems and full-stack products with Node.js, NestJS, Kafka, and AWS.",
  keywords: [
    "Shubham Gupta",
    "Backend Engineer",
    "Full Stack Developer",
    "Node.js",
    "NestJS",
    "Kafka",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Shubham Gupta" }],
  openGraph: {
    title: "Shubham Gupta — Backend / Full Stack Engineer",
    description:
      "3+ years building scalable backend systems and full-stack products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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
