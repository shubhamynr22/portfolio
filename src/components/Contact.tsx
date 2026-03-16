"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { buttonVariants } from "@/components/ui/button";
import { personalInfo } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Contact() {
  const ref = useRef(null);

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div ref={ref} className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="mx-auto w-24 h-1 bg-primary rounded-full mb-8" />

          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            I&apos;m always open to discussing new opportunities, collaborations,
            or interesting backend / full-stack challenges. Feel free to reach
            out!
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 bg-primary hover:bg-primary/90 text-primary-foreground mb-8 cursor-pointer shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
              )}
            >
              <Mail className="h-5 w-5" />
              {personalInfo.email}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              whileHover={{
                scale: 1.12,
                y: -6,
                transition: { type: "spring", stiffness: 400, damping: 12 },
              }}
              className="p-3 rounded-xl glass-card cursor-pointer"
            >
              <SiGithub className="h-6 w-6" />
            </motion.a>
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              whileHover={{
                scale: 1.12,
                y: -6,
                transition: { type: "spring", stiffness: 400, damping: 12 },
              }}
              className="p-3 rounded-xl glass-card cursor-pointer"
            >
              <Linkedin className="h-6 w-6" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
