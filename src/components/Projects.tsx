"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9, rotateX: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function Projects() {
  const ref = useRef(null);

  return (
    <section id="projects" className="py-20 sm:py-28 bg-secondary/30">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="mx-auto w-24 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }}
              className="group cursor-default"
            >
              <div className="h-full p-6 rounded-xl glass-card">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs px-2 py-0.5"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "gap-1.5"
                  )}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  GitHub
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
