/*
 * ═══════════════════════════════════════════════════════════════════
 *  PORTFOLIO SITE DATA
 *  ───────────────────
 *  All website content lives here. Edit the values below to update
 *  any text on the site — no need to touch the component files.
 * ═══════════════════════════════════════════════════════════════════
 */

import {
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
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
  SiNextdotjs,
  SiGraphql,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { Cloud, ShieldCheck, Database } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────
 *  PERSONAL INFO
 *  Edit your name, email, links, and tagline here.
 * ────────────────────────────────────────────────────────────────── */

export const personalInfo = {
  name: "Shubham Gupta",
  phone: "+91-9050216555",
  email: "shubhamynr22@gmail.com",
  title: "Software Engineer",
  location: "India",
  github: "https://github.com/shubhamynr22",
  linkedin: "https://linkedin.com/in/shubhamynr22",
};

/* ──────────────────────────────────────────────────────────────────
 *  HERO SECTION
 *  - heroSubtitles: The roles that cycle in the typewriter effect.
 *  - summary: The one-liner shown below the hero heading.
 * ────────────────────────────────────────────────────────────────── */

export const heroSubtitles = [
  "Backend Engineer",
  "Full Stack Developer",
  "Node.js Specialist",
  "Web3 Builder",
];

export const summary =
  "Backend-focused Software Engineer with 3+ years of experience building and scaling distributed systems in Node.js/NestJS across SaaS, Fintech, and Web3 domains. Proven track record in microservices architecture, high-throughput event-driven pipelines, and cloud infrastructure on AWS.";

/* ──────────────────────────────────────────────────────────────────
 *  ABOUT SECTION
 *  - aboutBio: The longer paragraph shown in the About section.
 *  - stats: The four stats cards (value + label).
 * ────────────────────────────────────────────────────────────────── */

export const aboutBio =
  "I'm a Backend-focused Software Engineer with 3+ years of experience building and scaling distributed systems in Node.js/NestJS across SaaS, Fintech, and Web3 domains. I have a proven track record in microservices architecture, high-throughput event-driven pipelines (Kafka, RabbitMQ), RESTful and GraphQL API design, and cloud infrastructure on AWS. I've delivered production systems supporting 100k+ concurrent users and led end-to-end backend design for financial platforms from zero to production.";

export const stats = [
  { label: "Years of Experience", value: "3+" },
  { label: "Companies", value: "5" },
  { label: "Concurrent Users Supported", value: "100K+" },
  { label: "Latency Reduction", value: "40%" },
];

/* ──────────────────────────────────────────────────────────────────
 *  SKILLS
 *  Grouped by category. Each skill has a name and an icon.
 *  To add a new skill, add an entry to the relevant category's
 *  `skills` array. To add a new category, add a new object.
 * ────────────────────────────────────────────────────────────────── */

export interface Skill {
  name: string;
  icon: IconType;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "SQL", icon: Database as unknown as IconType },
      { name: "Solidity", icon: SiSolidity },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "NestJS", icon: SiNestjs },
      { name: "Express.js", icon: SiExpress },
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "GraphQL", icon: SiGraphql },
    ],
  },
  {
    title: "Databases & Caching",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
    ],
  },
  {
    title: "Messaging & Events",
    skills: [
      { name: "Apache Kafka", icon: SiApachekafka },
      { name: "RabbitMQ", icon: SiRabbitmq },
    ],
  },
  {
    title: "Auth & Security",
    skills: [
      { name: "JWT / OAuth2", icon: ShieldCheck as unknown as IconType },
      { name: "RBAC / SSO", icon: ShieldCheck as unknown as IconType },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: Cloud as unknown as IconType },
      { name: "Docker", icon: SiDocker },
      { name: "CI/CD", icon: SiGithubactions },
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────
 *  WORK EXPERIENCE
 *  Each entry: company, role, location, period, and bullet points.
 *  Listed in reverse-chronological order (newest first).
 * ────────────────────────────────────────────────────────────────── */

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    company: "Simpplr",
    role: "Software Engineer",
    location: "Gurugram",
    period: "Aug 2025 — Dec 2025",
    highlights: [
      "Developed and maintained backend microservices for identity and authorization modules using Node.js and NestJS, directly supporting enterprise SSO and multi-tenant access flows.",
      "Designed and enforced fine-grained RBAC policies across distributed services, reducing unauthorized access incidents and hardening the security posture of the SaaS platform.",
      "Built production ETL pipelines to migrate large-scale enterprise data from Salesforce into AWS, handling schema transformation, data validation, and error recovery for datasets with millions of records.",
      "Resolved critical PostgreSQL performance bottlenecks by introducing targeted indexing strategies and rewriting inefficient queries, cutting average query latency by over 40%.",
    ],
  },
  {
    company: "NE Group",
    role: "Software Development Engineer",
    location: "Hyderabad",
    period: "Jun 2024 — Jun 2025",
    highlights: [
      "Led the rearchitecture of the API Gateway for a high-traffic gaming platform, improving scalability and reducing p99 latency by 35%, enabling support for 100k+ concurrent users.",
      "Designed and implemented real-time event pipelines using Kafka and Redis, achieving sub-100ms game state updates and processing 10k+ events per second at peak load.",
      "Built a WebSocket-based communication layer to power live multiplayer interactions and real-time score updates, reducing client polling overhead by 60%.",
      "Developed ERC-20 and ERC-1155 smart contracts for in-game asset management and on-chain betting logic, handling secure token transfers and game state finality.",
      "Optimized PostgreSQL and MongoDB schemas for distributed services, improving write throughput by 25% and read latency by 30% through denormalization and compound indexing.",
    ],
  },
  {
    company: "Credain",
    role: "Software Development Engineer",
    location: "Mumbai",
    period: "Feb 2023 — Apr 2024",
    highlights: [
      "Architected the entire backend from scratch for a Web3 banking platform — defining service boundaries, API contracts, and data models for a secure, multi-chain financial product.",
      "Built wallet management, transaction processing, and multi-chain asset handling modules, enabling users to interact with multiple blockchains through a unified API layer.",
      "Implemented async transaction workflows using RabbitMQ, ensuring reliable, idempotent, and fully auditable processing of high-value financial operations with zero data loss.",
      "Established CI/CD pipelines with automated smart contract testing, cutting deployment time by 50% and significantly reducing release risk.",
    ],
  },
  {
    company: "Idea Usher",
    role: "Blockchain Developer Intern",
    location: "Mohali",
    period: "Jan 2022 — Dec 2022",
    highlights: [
      "Developed and audited production Solidity smart contracts to ERC-20, ERC-721, and ERC-1155 standards, deployed across NFT marketplace and DeFi applications.",
      "Designed blockchain architecture for NFT marketplaces and cross-chain bridge solutions, focusing on gas optimization and contract security.",
    ],
  },
  {
    company: "IIT Hyderabad",
    role: "Blockchain Research Intern",
    location: "Hyderabad",
    period: "Jan 2022 — Jun 2022",
    highlights: [
      "Researched parallel transaction scheduling in Hyperledger Sawtooth to improve throughput in permissioned blockchain networks, publishing internal findings that informed follow-on research.",
      "Developed and benchmarked smart contracts using JavaScript and Docker to validate scheduling hypotheses, demonstrating measurable throughput improvements under concurrent workloads.",
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────
 *  PROJECTS
 *  Each card: title, description, tech stack badges, and GitHub link.
 *  To add a new project, just add another object to this array.
 * ────────────────────────────────────────────────────────────────── */

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  github: string;
}

export const projects: Project[] = [
  {
    title: "Kafka Order Pipeline",
    description:
      "NestJS + Kafka microservices demo with end-to-end distributed tracing, dead-letter queues, and full observability.",
    techStack: ["NestJS", "Kafka", "Docker", "PostgreSQL"],
    github: "https://github.com/shubhamynr22/kafka-order-pipeline",
  },
  {
    title: "DeFi Staking Contract",
    description:
      "Solidity smart contract with a React dApp frontend for staking ERC-20 tokens and earning yield.",
    techStack: ["Solidity", "React", "Ethers.js", "Hardhat"],
    github: "https://github.com/shubhamynr22/defi-staking",
  },
  {
    title: "Redis Job Queue",
    description:
      "Bull/BullMQ-powered background processing service for scheduled emails, webhooks, and data pipelines.",
    techStack: ["Node.js", "BullMQ", "Redis", "TypeScript"],
    github: "https://github.com/shubhamynr22/redis-job-queue",
  },
];

/* ──────────────────────────────────────────────────────────────────
 *  NAVIGATION
 *  Controls which links appear in the navbar.
 *  href must match the section's id attribute (prefixed with #).
 * ────────────────────────────────────────────────────────────────── */

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/* ──────────────────────────────────────────────────────────────────
 *  EDUCATION
 *  Displayed in the About or Education section.
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
