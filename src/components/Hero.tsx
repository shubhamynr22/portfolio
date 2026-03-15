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
      {/* Gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-3xl"
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
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-chart-2/20 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-chart-3/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-4xl px-4 text-center"
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
          <span className="text-primary">{personalInfo.name}</span>
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
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
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
