"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { aboutBio, stats } from "@/lib/data";

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
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-muted-foreground leading-[1.8] text-base sm:text-lg">
              {aboutBio}
            </p>
          </motion.div>

          {/* Avatar placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-primary via-chart-2 to-chart-3 p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <span className="text-6xl sm:text-7xl font-bold text-primary">
                    SG
                  </span>
                </div>
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-primary/20 animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-card border border-border shadow-sm"
            >
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
