"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { personalInfo, heroSubtitles, summary } from "@/lib/data";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" as const },
  },
};

export default function Hero() {
  const typeSequence = heroSubtitles.flatMap((s) => [s, 2000]);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Mountain Landscape SVG Background ── */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {/* Starfield / dots */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Scattered stars */}
          <circle cx="10%" cy="15%" r="1.5" fill="var(--primary)" opacity="0.4" />
          <circle cx="25%" cy="8%" r="1" fill="var(--primary)" opacity="0.3" />
          <circle cx="40%" cy="20%" r="1.5" fill="var(--primary)" opacity="0.25" />
          <circle cx="55%" cy="5%" r="2" fill="var(--primary)" opacity="0.35" />
          <circle cx="70%" cy="12%" r="1" fill="var(--primary)" opacity="0.3" />
          <circle cx="85%" cy="18%" r="1.5" fill="var(--primary)" opacity="0.4" />
          <circle cx="92%" cy="7%" r="1" fill="var(--primary)" opacity="0.25" />
          <circle cx="15%" cy="30%" r="1" fill="var(--primary)" opacity="0.2" />
          <circle cx="78%" cy="25%" r="1.5" fill="var(--primary)" opacity="0.2" />
          <circle cx="48%" cy="35%" r="1" fill="var(--primary)" opacity="0.15" />
          <circle cx="5%" cy="45%" r="1.5" fill="var(--primary)" opacity="0.15" />
          <circle cx="95%" cy="40%" r="1" fill="var(--primary)" opacity="0.2" />
          <circle cx="33%" cy="12%" r="2" fill="url(#star-glow)" opacity="0.5" />
          <circle cx="67%" cy="22%" r="2" fill="url(#star-glow)" opacity="0.4" />
        </motion.svg>

        {/* Mountain landscape */}
        <motion.svg
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 500"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: "55%" }}
        >
          <defs>
            {/* Mountain gradients using CSS variables */}
            <linearGradient id="mtn-far" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="mtn-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="mtn-near" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="mtn-front" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Far mountain range (most distant, lightest) */}
          <path
            d="M0 350 L80 280 L160 310 L240 250 L320 290 L400 220 L480 260 L560 200 L640 240 L720 180 L800 220 L880 190 L960 230 L1040 170 L1120 210 L1200 190 L1280 230 L1360 200 L1440 250 L1440 500 L0 500Z"
            fill="url(#mtn-far)"
          />

          {/* Mid mountain range */}
          <path
            d="M0 400 L100 340 L180 370 L260 310 L340 350 L420 280 L520 330 L600 270 L700 320 L780 260 L860 300 L940 270 L1020 310 L1100 250 L1200 290 L1280 260 L1360 300 L1440 280 L1440 500 L0 500Z"
            fill="url(#mtn-mid)"
          />
          {/* Ridge lines on mid mountains */}
          <path
            d="M420 280 L480 295 L520 330"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="0.5"
            opacity="0.15"
          />
          <path
            d="M780 260 L820 275 L860 300"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="0.5"
            opacity="0.15"
          />

          {/* Near mountain range */}
          <path
            d="M0 430 L120 380 L200 400 L300 350 L400 390 L500 340 L580 370 L680 320 L760 360 L840 330 L920 360 L1000 320 L1100 350 L1180 330 L1260 360 L1340 340 L1440 370 L1440 500 L0 500Z"
            fill="url(#mtn-near)"
          />

          {/* Front hills (closest, most opaque) */}
          <path
            d="M0 470 L100 440 L200 455 L320 420 L440 445 L560 410 L680 440 L800 415 L920 440 L1040 420 L1160 445 L1280 425 L1400 440 L1440 430 L1440 500 L0 500Z"
            fill="url(#mtn-front)"
          />

          {/* Pine tree silhouettes on front hills */}
          <g opacity="0.12" fill="var(--primary)">
            {/* Tree cluster left */}
            <polygon points="80,470 85,440 90,470" />
            <polygon points="95,470 100,435 105,470" />
            <polygon points="110,468 115,442 120,468" />
            {/* Tree cluster center-left */}
            <polygon points="320,420 325,388 330,420" />
            <polygon points="335,420 340,392 345,420" />
            <polygon points="350,422 355,394 360,422" />
            {/* Tree cluster center */}
            <polygon points="680,440 685,408 690,440" />
            <polygon points="695,438 700,410 705,438" />
            <polygon points="670,442 675,412 680,442" />
            {/* Tree cluster right */}
            <polygon points="1040,420 1045,390 1050,420" />
            <polygon points="1055,422 1060,394 1065,422" />
            <polygon points="1070,420 1075,396 1080,420" />
            {/* Tree cluster far right */}
            <polygon points="1280,425 1285,398 1290,425" />
            <polygon points="1295,427 1300,400 1305,427" />
          </g>

          {/* Mist/fog layers */}
          <rect x="0" y="460" width="1440" height="40" fill="var(--background)" opacity="0.3" />
          <ellipse cx="400" cy="470" rx="300" ry="15" fill="var(--primary)" opacity="0.04" />
          <ellipse cx="1000" cy="475" rx="250" ry="12" fill="var(--primary)" opacity="0.03" />
        </motion.svg>

        {/* Shooting star */}
        <motion.div
          animate={{
            x: [0, 300],
            y: [0, 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 8,
            delay: 3,
            ease: "easeOut",
          }}
          className="absolute top-[10%] left-[20%] w-16 h-[1px] bg-gradient-to-r from-primary/60 to-transparent rotate-[30deg]"
        />
      </div>

      {/* ── Celestial body (sun/moon) — separate layer above mountains ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
        className="absolute top-[12%] right-[18%] -z-15 pointer-events-none"
        style={{ zIndex: -15 }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="celestial-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="60" fill="url(#celestial-glow)" />
          <circle cx="60" cy="60" r="20" fill="var(--primary)" opacity="0.2" />
        </svg>
      </motion.div>

      {/* Gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-chart-2/6 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -30, 50, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-chart-3/6 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-4xl px-4 text-center relative z-10"
      >
        <motion.p
          variants={fadeUp}
          className="text-sm font-medium uppercase tracking-widest text-primary mb-4"
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          Hi, I&apos;m{" "}
          <span className="text-primary">
            {personalInfo.name}
          </span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground mb-6 h-10"
        >
          <TypeAnimation
            sequence={typeSequence}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            cursor={true}
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed mb-8"
        >
          {summary}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer transition-colors"
          >
            <ArrowDown className="h-4 w-4" />
            View My Work
          </Button>
          <a
            href="/resume.pdf"
            download
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2 cursor-pointer"
            )}
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
