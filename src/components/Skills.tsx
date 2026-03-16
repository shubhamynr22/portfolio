"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/lib/data";

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92, rotateX: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.04 + 0.3,
      duration: 0.4,
      type: "spring" as const,
      stiffness: 300,
      damping: 15,
    },
  }),
};

export default function Skills() {
  const ref = useRef(null);

  return (
    <section id="skills" className="py-20 sm:py-28 bg-secondary/30">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <div className="mx-auto w-24 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              custom={catIdx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                scale: 1.04,
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }}
              className="p-6 rounded-xl glass-card cursor-default"
            >
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      custom={catIdx * 4 + skillIdx}
                      variants={badgeVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Badge
                        variant="secondary"
                        className="gap-1.5 px-3 py-1.5 text-sm cursor-default hover:bg-primary/10 hover:scale-110 transition-all duration-200"
                      >
                        <Icon className="h-4 w-4" />
                        {skill.name}
                      </Badge>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
