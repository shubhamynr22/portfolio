"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { projects, personalInfo } from "@/lib/data";

/* ── Focus tags: top skills from skillCategories ── */
const focusTags = [
  "Node.js",
  "NestJS",
  "Apache Kafka",
  "PostgreSQL",
  "Redis",
  "Docker",
  "TypeScript",
  "Solidity",
];

/* ── Shortened editorial bio ── */
const editorialBio =
  "Backend engineer with 3+ years building distributed systems across SaaS, Fintech, and Web3. From Kafka pipelines to on-chain contracts, I work closest to the infrastructure that matters.";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ── Row hover variants ── */
const rowVariants = {
  rest: {
    backgroundColor: "transparent",
    color: "#111111",
    transition: { duration: 0.2, ease: EASE },
  },
  hover: {
    backgroundColor: "#F23C13",
    color: "#F4F1ED",
    transition: { duration: 0.2, ease: EASE },
  },
};

const titleVariants = {
  rest: { x: 0, transition: { duration: 0.2, ease: EASE } },
  hover: { x: 24, transition: { duration: 0.2, ease: EASE } },
};

/* ── WorkRow component ── */
function WorkRow({
  index,
  project,
}: {
  index: number;
  project: (typeof projects)[0];
}) {
  return (
    <motion.a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      className="alt-list-row"
      initial="rest"
      whileHover="hover"
      variants={rowVariants}
    >
      <span className="alt-row-index">{String(index + 1).padStart(2, "0")}</span>
      <motion.span className="alt-row-title" variants={titleVariants}>
        {project.title}
      </motion.span>
      <div className="alt-row-meta">
        {project.techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="alt-pill">
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

/* ── Main AltPage ── */
export default function AltPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [cursorHovered, setCursorHovered] = useState(false);

  /* Framer Motion spring for the circle */
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  /* Mousemove: dot snaps, circle springs */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  /* Hover state on interactive elements */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const onEnter = () => setCursorHovered(true);
    const onLeave = () => setCursorHovered(false);
    const els = wrapper.querySelectorAll("a, button");
    els.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    return () => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <style>{`
        .alt-root {
          --red: #F23C13;
          --cream: #F4F1ED;
          --font-sans: var(--font-inter, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
          --font-mono: var(--font-jetbrains, 'JetBrains Mono', monospace);
          background-color: var(--cream);
          color: #111111;
          font-family: var(--font-sans);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          min-height: 100vh;
          overflow-x: hidden;
          line-height: 1.2;
        }
        .alt-root,
        .alt-root * {
          cursor: none !important;
          box-sizing: border-box;
        }

        /* ── Nav ── */
        .alt-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          pointer-events: none;
        }
        .alt-nav-inner {
          mix-blend-mode: difference;
          color: white;
          pointer-events: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
        }
        .alt-nav-inner a {
          color: inherit;
          text-decoration: none;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
          font-family: var(--font-sans);
        }
        .alt-nav-links {
          display: flex;
          gap: 2rem;
        }

        /* ── Typography ── */
        .alt-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
          font-family: var(--font-sans);
        }
        .alt-label-mono {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0em;
        }
        .alt-heading-huge {
          font-size: clamp(4rem, 10vw, 12rem);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.85;
          color: var(--red);
          font-family: var(--font-sans);
        }
        .alt-heading-large {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          font-family: var(--font-sans);
        }

        /* ── Hero ── */
        .alt-hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          padding: 0 2rem;
          overflow: hidden;
        }
        .alt-hero-graphic {
          position: absolute;
          top: 50%;
          right: 10%;
          transform: translateY(-50%);
          width: clamp(300px, 40vw, 600px);
          aspect-ratio: 1;
          background-color: var(--red);
          border-radius: 50%;
          z-index: 1;
          pointer-events: none;
        }
        .alt-hero-content {
          position: relative;
          z-index: 2;
        }
        .alt-hero-data {
          display: flex;
          gap: 3rem;
          margin-top: 3rem;
          max-width: 600px;
        }
        .alt-data-block {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .alt-data-block p {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          line-height: 1.4;
          color: #111111;
        }

        /* ── Works / Index ── */
        .alt-works {
          padding: 8rem 2rem;
          padding-top: 2rem;
        }
        .alt-works-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--red);
        }
        .alt-works-list {
          display: flex;
          flex-direction: column;
        }
        .alt-list-row {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          align-items: center;
          padding: 2rem 0;
          border-bottom: 1px solid currentColor;
          text-decoration: none;
        }
        .alt-row-index {
          font-family: var(--font-mono);
          font-size: 1rem;
        }
        .alt-row-title {
          font-size: clamp(1.5rem, 3vw, 3rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          font-family: var(--font-sans);
          display: block;
        }
        .alt-row-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .alt-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.4rem 1rem;
          border: 1px solid currentColor;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 500;
          font-family: var(--font-sans);
          white-space: nowrap;
        }

        /* ── Focus / About ── */
        .alt-focus {
          background-color: var(--red);
          color: var(--cream);
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 8rem 2rem;
        }
        .alt-focus-top {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--cream);
          padding-bottom: 2rem;
          margin-bottom: 4rem;
        }
        .alt-focus-content {
          max-width: 800px;
        }
        .alt-focus-bio {
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          line-height: 1.3;
          margin-bottom: 3rem;
          font-family: var(--font-sans);
        }
        .alt-focus-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .alt-focus-tags .alt-pill {
          border-color: var(--cream);
          color: var(--cream);
        }
        .alt-focus-action {
          margin-top: 4rem;
        }
        .alt-github-cta {
          display: inline-flex;
          align-items: center;
          padding: 1rem 3rem;
          background-color: var(--cream);
          color: var(--red);
          border-radius: 100px;
          font-size: 1.25rem;
          font-weight: 500;
          text-decoration: none;
          font-family: var(--font-sans);
          transition: background-color 0.2s, color 0.2s;
        }
        .alt-github-cta:hover {
          background-color: transparent;
          color: var(--cream);
          border: 1px solid var(--cream);
        }

        /* ── Footer ── */
        .alt-footer {
          padding: 4rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-top: 2px solid var(--red);
        }
        .alt-footer-col {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .alt-footer-email {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #111111;
          text-decoration: underline;
          text-underline-offset: 8px;
          font-family: var(--font-sans);
        }
        .alt-footer-email:hover {
          color: var(--red);
        }
        .alt-huge-arrow {
          font-size: 4rem;
          line-height: 0.5;
          font-weight: 400;
          color: var(--red);
          font-family: var(--font-sans);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .alt-hero-graphic {
            width: 70vw;
            top: 20%;
            right: -10%;
          }
          .alt-list-row {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 1.5rem 0;
          }
          .alt-row-index {
            display: none;
          }
          .alt-row-meta {
            justify-content: flex-start;
          }
          .alt-focus-top {
            flex-direction: column;
            gap: 1rem;
          }
          .alt-hero-data {
            flex-direction: column;
            gap: 1.5rem;
          }
          .alt-footer {
            flex-direction: column;
            gap: 2rem;
            align-items: flex-start;
          }
        }
      `}</style>

      {/* Custom cursor */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: cursorHovered ? 12 : 8,
          height: cursorHovered ? 12 : 8,
          borderRadius: "50%",
          backgroundColor: cursorHovered ? "transparent" : "#F23C13",
          border: cursorHovered ? "1px solid #F4F1ED" : "none",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transition: "width 0.2s, height 0.2s, background-color 0.2s, border 0.2s",
        }}
      />
      <motion.div
        style={{
          x: springX,
          y: springY,
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid #F23C13",
          backgroundColor: "transparent",
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />

      {/* Entry fade-in wrapper (covers ColorThemeProvider flash) */}
      <motion.div
        ref={wrapperRef}
        className="alt-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Nav */}
        <nav className="alt-nav">
          <div className="alt-nav-inner">
            <Link href="/" className="alt-label">
              sg_sys
            </Link>
            <div className="alt-nav-links alt-label">
              <a href="#alt-works">Index</a>
              <a href="#alt-about">About</a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="alt-hero">
          <div className="alt-hero-graphic" />
          <div className="alt-hero-content">
            <h1 className="alt-heading-huge">
              Backend
              <br />
              Engineer
            </h1>
            <div className="alt-hero-data">
              <div className="alt-data-block">
                <span className="alt-label" style={{ color: "var(--red)" }}>
                  Location
                </span>
                <p>{personalInfo.location}</p>
              </div>
              <div className="alt-data-block">
                <span className="alt-label" style={{ color: "var(--red)" }}>
                  Focus
                </span>
                <p>
                  Node.js / NestJS
                  <br />
                  Kafka / RabbitMQ
                  <br />
                  PostgreSQL / Redis
                </p>
              </div>
              <div className="alt-data-block">
                <span className="alt-label" style={{ color: "var(--red)" }}>
                  Status
                </span>
                <p>
                  Open to
                  <br />
                  new roles
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Works */}
        <section id="alt-works" className="alt-works">
          <div className="alt-works-header">
            <h2 className="alt-heading-large" style={{ color: "var(--red)" }}>
              Selected Works
            </h2>
            <span className="alt-label-mono" style={{ color: "var(--red)" }}>
              Displaying {String(projects.length).padStart(2, "0")} items
            </span>
          </div>
          <div className="alt-works-list">
            {projects.map((project, i) => (
              <WorkRow key={project.title} index={i} project={project} />
            ))}
          </div>
        </section>

        {/* Focus / About */}
        <section id="alt-about" className="alt-focus">
          <div className="alt-focus-top">
            <span className="alt-label">Operational Doctrine</span>
            <span className="alt-label-mono">SYS.REQ.01</span>
          </div>
          <div className="alt-focus-content">
            <p className="alt-focus-bio">{editorialBio}</p>
            <div className="alt-focus-tags">
              {focusTags.map((tag) => (
                <span key={tag} className="alt-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="alt-focus-action">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="alt-github-cta"
            >
              View GitHub Profile
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="alt-footer">
          <div className="alt-footer-col">
            <span className="alt-label" style={{ color: "var(--red)" }}>
              Contact
            </span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="alt-footer-email"
            >
              Initiate Protocol
            </a>
          </div>
          <div className="alt-footer-col" style={{ textAlign: "right" }}>
            <span className="alt-huge-arrow">↘</span>
            <span className="alt-label-mono" style={{ color: "var(--red)" }}>
              © 2026 Shubham Gupta
            </span>
          </div>
        </footer>
      </motion.div>
    </>
  );
}
