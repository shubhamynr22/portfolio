/*
 * ═══════════════════════════════════════════════════════════════════
 *  PORTFOLIO SITE DATA
 *  ───────────────────
 *  All website content lives here. Edit the values below to update
 *  any text on the site — no need to touch the component files.
 *
 *  Sourced from Shubham_Gupta_Updated.pdf (Sep 2026).
 *  Every metric and claim below is traceable to that resume. Do not
 *  add numbers here that aren't real — `heroMetrics` and `stats` are
 *  server-rendered, so whatever is here is what crawlers quote.
 * ═══════════════════════════════════════════════════════════════════
 */

import {
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiSolidity,
  SiNestjs,
  SiExpress,
  SiReact,
  SiApachekafka,
  SiRabbitmq,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGithubactions,
  SiJenkins,
  SiLinux,
  SiGit,
  SiNextdotjs,
  SiGraphql,
  SiJsonwebtokens,
  SiOpenid,
  SiOpenai,
  SiLangchain,
  SiWhatsapp,
} from "react-icons/si";
import type { IconType } from "react-icons";

/* ──────────────────────────────────────────────────────────────────
 *  PERSONAL INFO
 * ────────────────────────────────────────────────────────────────── */

export const personalInfo = {
  name: "Shubham Gupta",
  initials: "SG",
  phone: "+91-9050216555",
  email: "shubhamynr22@gmail.com",
  /** Shown under the name in the nav and in the About footer line. */
  title: "AI-focused Backend Engineer",
  location: "India",
  timezone: "IST · UTC+5:30",
  github: "https://github.com/shubhamynr22",
  linkedin: "https://linkedin.com/in/shubhamynr22",
  resume: "/resume.pdf",
};

/* ──────────────────────────────────────────────────────────────────
 *  POSITIONING
 * ────────────────────────────────────────────────────────────────── */

export const heroRoles = [
  "Backend AI Engineer",
  "Multi-Agent Architecture",
  "LLM Product Features",
  "Distributed Systems",
];

export const summary =
  "AI-focused backend engineer building multi-agent systems, LLM-powered product features, and the event-driven infrastructure that keeps them reliable. Node.js · NestJS · AWS · Kafka.";

export const availability = {
  status: "Open to new roles",
  note: "Backend AI · Platform · Distributed systems",
};

/* ──────────────────────────────────────────────────────────────────
 *  HERO METRICS
 *  Rendered as animated counters; `value` must be a real number.
 * ────────────────────────────────────────────────────────────────── */

export interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
}

export const heroMetrics: Metric[] = [
  {
    value: 3,
    suffix: "+",
    label: "Years shipping",
    detail: "SaaS · Fintech · AI",
  },
  {
    value: 100,
    suffix: "K+",
    label: "Concurrent users",
    detail: "API gateway + realtime",
  },
  {
    value: 50,
    suffix: "%",
    label: "Delivery latency cut",
    detail: "Event-driven pipeline",
  },
  {
    value: 10,
    suffix: "K",
    label: "Events / second",
    detail: "Kafka pipelines",
  },
];

/* ──────────────────────────────────────────────────────────────────
 *  ABOUT
 * ────────────────────────────────────────────────────────────────── */

export const aboutBio = [
  "I'm an AI-focused backend engineer with 3+ years building and scaling distributed systems in Node.js and NestJS across SaaS, Fintech, and consumer AI products. At Memorea I designed and built a multi-agent architecture from scratch — a custom agent harness with an orchestrator, specialised sub-agents and tool calling — to replace a single prompt-response model.",
  "I care about the parts that decide whether a system holds up: grounding model output in real data instead of guesses, making message delivery reliable at scale, and the failure modes nobody sees until 3am. I've shipped production agentic systems used by real users, supported 100k+ concurrent users, and led backend design for a financial platform from zero to production.",
];

export const stats = [
  { value: 3, suffix: "+", label: "Years of experience" },
  { value: 6, suffix: "", label: "Roles held" },
  { value: 100, suffix: "K+", label: "Concurrent users" },
  { value: 50, suffix: "%", label: "Delivery latency cut" },
];

/* ──────────────────────────────────────────────────────────────────
 *  CAPABILITY MATRIX
 *
 *  `evidence` is lifted from real work in `experiences` below — no
 *  invented claims. `icon` is optional: Python, AWS, BullMQ and the
 *  AI/LLM tooling have no reliable brand glyph, so they render as mono
 *  labels rather than being given a wrong logo.
 * ────────────────────────────────────────────────────────────────── */

export interface Skill {
  name: string;
  icon?: IconType;
}

export interface SkillCategory {
  title: string;
  evidence: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI & LLM Engineering",
    evidence:
      "Custom agent harness — orchestrator, sub-agents and tool calling — reducing hallucinations on multi-step tasks",
    skills: [
      { name: "OpenAI API", icon: SiOpenai },
      { name: "Multi-Agent Orchestration" },
      { name: "Agent Harness Design" },
      { name: "Tool Calling" },
      { name: "Agentic Workflows" },
      { name: "RAG", icon: SiLangchain },
      { name: "Prompt Engineering" },
    ],
  },
  {
    title: "Languages",
    evidence:
      "Audited production Solidity to ERC-20 / ERC-721 / ERC-1155 standards; Python and TypeScript across services",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "SQL" },
      { name: "Solidity", icon: SiSolidity },
    ],
  },
  {
    title: "Backend & APIs",
    evidence:
      "Microservices for enterprise SSO and multi-tenant access; API Gateway rearchitected for 100k+ concurrent users",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "NestJS", icon: SiNestjs },
      { name: "Express.js", icon: SiExpress },
      { name: "REST APIs" },
      { name: "GraphQL", icon: SiGraphql },
      { name: "Microservices" },
      { name: "API Gateway" },
      { name: "WebSockets" },
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
    ],
  },
  {
    title: "Messaging & Events",
    evidence:
      "10k+ events/sec at peak with sub-100ms updates; event-driven pipeline cut delivery latency 50%",
    skills: [
      { name: "Apache Kafka", icon: SiApachekafka },
      { name: "RabbitMQ", icon: SiRabbitmq },
      { name: "BullMQ" },
      { name: "AWS EventBridge" },
      { name: "AWS SQS" },
    ],
  },
  {
    title: "Databases & Caching",
    evidence:
      "Query latency down 40%; write throughput +25% and read latency −30% via denormalization and compound indexing",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
    ],
  },
  {
    title: "Auth & Security",
    evidence:
      "Fine-grained RBAC across distributed services; multi-tenant access control for a SaaS platform",
    skills: [
      { name: "JWT", icon: SiJsonwebtokens },
      { name: "OAuth2", icon: SiOpenid },
      { name: "RBAC" },
      { name: "SSO" },
      { name: "Multi-Tenant Access Control" },
    ],
  },
  {
    title: "Cloud & DevOps",
    evidence:
      "CI/CD with automated smart contract testing via GitHub Actions — deployment time down 50%",
    skills: [
      { name: "AWS" },
      { name: "EC2" },
      { name: "S3" },
      { name: "Lambda" },
      { name: "Docker", icon: SiDocker },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "Jenkins", icon: SiJenkins },
      { name: "Linux", icon: SiLinux },
      { name: "Git", icon: SiGit },
    ],
  },
  {
    title: "Integrations",
    evidence:
      "Email as a first-class channel with AI auto-drafting and auto-labelling; WhatsApp Business API for conversational flows",
    skills: [
      { name: "WhatsApp Business API", icon: SiWhatsapp },
      { name: "Email APIs" },
      { name: "Gmail / SMTP" },
    ],
  },
];

/** Highlighted technologies, for the scrolling ticker. */
export const allTechnologies = [
  "Node.js",
  "NestJS",
  "TypeScript",
  "Python",
  "OpenAI API",
  "Multi-Agent Orchestration",
  "RAG",
  "Apache Kafka",
  "RabbitMQ",
  "AWS SQS",
  "AWS EventBridge",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "AWS",
  "Docker",
  "Terraform",
  "GraphQL",
  "WebSockets",
  "Solidity",
];

/* ──────────────────────────────────────────────────────────────────
 *  WORK EXPERIENCE
 *  Reverse-chronological (newest first).
 * ────────────────────────────────────────────────────────────────── */

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  current?: boolean;
  /** The headline number for this role — rendered at display scale. */
  headline: { value: string; label: string };
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    company: "Memorea",
    role: "Backend AI Engineer",
    location: "Delhi",
    period: "April 2026 — Present",
    current: true,
    headline: { value: "50%", label: "delivery latency cut" },
    highlights: [
      "Rearchitected the message delivery infrastructure for Memorea, a memory-focused AI assistant, replacing a cron-based system with an event-driven pipeline using AWS EventBridge and SQS, cutting delivery latency by 50% and achieving near-100% delivery reliability at scale.",
      "Designed and built a multi-agent architecture from scratch to replace a single prompt-response model, implementing a custom agent harness with an orchestrator, specialised sub-agents, and tool-calling, enabling reliable multi-step task execution and reducing hallucinations.",
      "Built email as a first-class channel for Memorea, including AI-powered auto-drafting and auto-labelling of incoming emails, and integrated WhatsApp Business API as a primary conversational channel for user interactions.",
      "Built collaborative boards and lists within Memorea fully operable through natural language, allowing users to create, update, and manage tasks conversationally via the agent system.",
      "Contributed broadly to product direction and backend architecture, working closely with the founding team on system design decisions as the product scaled.",
    ],
  },
  {
    company: "Simpplr",
    role: "Software Engineer — Backend",
    location: "Gurugram",
    period: "August 2025 — December 2025",
    headline: { value: "40%", label: "query latency reduced" },
    highlights: [
      "Built and maintained backend microservices for identity and authorization modules using Node.js and NestJS, supporting enterprise SSO and multi-tenant access flows for a SaaS platform.",
      "Designed and enforced fine-grained RBAC policies across distributed services, hardening platform security and reducing unauthorized access incidents.",
      "Developed ETL pipelines to migrate large-scale enterprise data from Salesforce to AWS, handling schema transformation, data validation, and error recovery across millions of records.",
      "Resolved critical PostgreSQL performance bottlenecks through targeted indexing and query optimization, reducing average query latency by 40%.",
    ],
  },
  {
    company: "NE Group",
    role: "Software Development Engineer — Backend",
    location: "Hyderabad",
    period: "June 2024 — July 2025",
    headline: { value: "35%", label: "latency reduced" },
    highlights: [
      "Rearchitected the API Gateway for a high-traffic gaming platform, improving scalability and reducing latency by 35%, enabling support for 100k+ concurrent users.",
      "Designed real-time event pipelines using Kafka and Redis, achieving sub-100ms game state updates and processing 10k+ events per second at peak load.",
      "Built a WebSocket-based communication layer for live multiplayer interactions and real-time score updates, reducing client polling overhead by 60%.",
      "Developed ERC-20 and ERC-1155 smart contracts for in-game asset management and on-chain betting logic using Solidity.",
      "Optimized PostgreSQL and MongoDB schemas through denormalization and compound indexing, improving write throughput by 25% and read latency by 30%.",
    ],
  },
  {
    company: "Credain",
    role: "Software Development Engineer — Backend",
    location: "Mumbai",
    period: "February 2023 — April 2024",
    headline: { value: "0", label: "data loss on high-value flows" },
    highlights: [
      "Architected the full backend from scratch for a Web3 banking platform, defining service boundaries, API contracts, and data models for a secure multi-chain financial product.",
      "Built wallet management, transaction processing, and multi-chain asset handling modules, enabling users to interact with multiple blockchains through a unified REST API.",
      "Implemented async transaction workflows using RabbitMQ, ensuring reliable, idempotent, and fully auditable processing of financial operations with zero data loss.",
      "Established CI/CD pipelines with automated smart contract testing via GitHub Actions, reducing deployment time by 50% and release risk.",
    ],
  },
  {
    company: "Idea Usher",
    role: "Blockchain Developer Intern",
    location: "Mohali",
    period: "January 2022 — December 2022",
    headline: { value: "3", label: "token standards shipped" },
    highlights: [
      "Developed and audited Solidity smart contracts (ERC-20, ERC-721, ERC-1155) for NFT marketplace and DeFi applications, focusing on gas optimization and contract security.",
    ],
  },
  {
    company: "IIT Hyderabad",
    role: "Blockchain Research Intern",
    location: "Hyderabad",
    period: "January 2022 — June 2022",
    headline: { value: "1", label: "published research finding" },
    highlights: [
      "Researched parallel transaction scheduling in Hyperledger Sawtooth, benchmarking smart contracts to demonstrate measurable throughput improvements under concurrent workloads.",
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────
 *  PROJECTS
 *
 *  `repo` is OPTIONAL on purpose.
 *
 *  The resume names both projects but no public repository exists for
 *  either (checked against the GitHub API — see README). Rather than
 *  link to a 404, the Projects section renders an "available on request"
 *  chip when `repo` is absent. Add the URL here once the repo is public
 *  and the button appears automatically.
 * ────────────────────────────────────────────────────────────────── */

export interface Project {
  title: string;
  /** What the thing is, in one line. */
  summary: string;
  /** Why it exists — the problem, not the feature list. */
  problem: string;
  techStack: string[];
  repo?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "QueryLens",
    summary:
      "Natural-language slow query explainer for PostgreSQL, grounded in real execution plans rather than model guesswork.",
    problem:
      "Finding out why a query is slow means reading EXPLAIN ANALYZE output by hand, and an LLM's answer is only useful if it is grounded in the real plan, real table structure and real index availability. QueryLens diagnoses against the actual execution plan, then generates runnable index migrations and query rewrites with before/after cost comparisons — exposed as a REST API and CLI for CI pipelines.",
    techStack: ["Node.js", "NestJS", "OpenAI API", "PostgreSQL", "Docker"],
  },
  {
    title: "IdleWatch",
    summary:
      "AWS cost intelligence that identifies genuinely idle resources and prices the waste in monthly spend.",
    problem:
      "Idle cloud resources are invisible until the bill arrives, and a point-in-time snapshot cannot tell genuine idleness from a quiet hour. IdleWatch scores waste by estimated monthly cost impact across RDS, Lambda, EBS and S3 using sustained CloudWatch utilisation metrics, then auto-generates Terraform snippets for right-sizing or terminating flagged resources.",
    techStack: [
      "Node.js",
      "AWS SDK",
      "PostgreSQL",
      "React.js",
      "Terraform",
      "Docker",
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────
 *  NAVIGATION
 * ────────────────────────────────────────────────────────────────── */

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/* ──────────────────────────────────────────────────────────────────
 *  EDUCATION
 * ────────────────────────────────────────────────────────────────── */

export const education = {
  degree: "B.Tech in Information Technology",
  institution: "Indian Institute of Information Technology, Sonepat",
  location: "Sonepat",
  year: "2019 — 2023",
  cgpa: "7.9/10",
  coursework:
    "Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Object-Oriented Programming",
};
