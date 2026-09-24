import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { personalInfo, summary } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

/** Structured data — helps search engines and recruiters' tools read this
 *  as a person with a job title rather than a generic page. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: "AI-focused Backend Engineer",
  description: summary,
  email: `mailto:${personalInfo.email}`,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [personalInfo.github, personalInfo.linkedin],
  knowsAbout: [
    "Multi-Agent Systems",
    "Agent Orchestration",
    "Retrieval-Augmented Generation",
    "LLM Application Engineering",
    "OpenAI API",
    "Node.js",
    "NestJS",
    "TypeScript",
    "Python",
    "Apache Kafka",
    "PostgreSQL",
    "Redis",
    "AWS",
    "Docker",
    "GraphQL",
    "Solidity",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Information Technology, Sonepat",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
