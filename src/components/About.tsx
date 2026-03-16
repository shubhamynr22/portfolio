"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { aboutBio, stats } from "@/lib/data";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 sm:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-muted-foreground leading-[1.8] text-base sm:text-lg">
              {aboutBio}
            </p>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Gradient ring */}
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-primary via-chart-2 to-chart-3 p-1 shadow-lg shadow-primary/20">
                <div className="w-full h-full rounded-full overflow-hidden bg-background">
                  <Image
                    src="/avatar.png"
                    alt="Shubham Gupta - Avatar"
                    width={288}
                    height={288}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-full border-2 border-primary/20 animate-pulse" />
              <div
                className="absolute -inset-8 rounded-full border border-primary/10 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              {/* Glow behind avatar */}
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl -z-10" />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                scale: 1.06,
                y: -6,
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }}
              className="text-center p-6 rounded-xl glass-card cursor-default"
            >
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2 drop-shadow-[0_0_10px_var(--primary)]">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
