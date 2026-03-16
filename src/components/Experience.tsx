"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/lib/data";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 sm:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="mx-auto w-24 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="timeline-line hidden md:block" />
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent md:hidden" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <TimelineCard
                  key={`${exp.company}-${exp.role}`}
                  exp={exp}
                  index={idx}
                  isLeft={isLeft}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  exp,
  index,
  isLeft,
}: {
  exp: (typeof experiences)[number];
  index: number;
  isLeft: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -80 : 80, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }}
      className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Content card */}
      <div
        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
          isLeft ? "md:text-right" : "md:text-left"
        }`}
      >
        <motion.div
          whileHover={{
            scale: 1.03,
            y: -6,
            transition: { type: "spring", stiffness: 400, damping: 15 },
          }}
          className="p-6 rounded-xl glass-card"
        >
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-sm font-medium text-primary">
              {exp.period}
            </span>
            <span className="text-sm text-muted-foreground">
              {exp.location}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-1">{exp.company}</h3>
          <p className="text-muted-foreground font-medium mb-3">{exp.role}</p>
          <ul
            className={`space-y-2 ${
              isLeft ? "md:text-right" : "md:text-left"
            }`}
          >
            {exp.highlights.map((h) => (
              <li
                key={h}
                className="text-sm text-muted-foreground leading-relaxed"
              >
                {h}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: index * 0.08 + 0.2,
          type: "spring",
          stiffness: 400,
          damping: 12,
        }}
        className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 shadow-md shadow-primary/30"
      />

      {/* Empty space for opposite side */}
      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
    </motion.div>
  );
}
