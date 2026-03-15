<h1 align="center">🚀 Shubham Gupta — Personal Portfolio</h1>

<p align="center">
  A modern, responsive, and animated personal portfolio website showcasing my work experience, skills, and projects as a Software Engineer.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-ff69b4?logo=framer" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/shadcn/ui-4-000?logo=shadcnui" alt="shadcn/ui" />
</p>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Sections](#-sections)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Customization](#-customization)
- [License](#-license)

---

## Overview

This portfolio is a single-page application built with **Next.js 16 (App Router)** and **TypeScript**. It features smooth scroll animations, dark/light theme support, and a fully responsive layout optimized for all devices. All content is centralized in a single data file, making it easy to update without touching any component code.

---

## 🛠 Tech Stack

| Layer               | Technology                                  |
| ------------------- | ------------------------------------------- |
| **Framework**       | Next.js 16 (App Router) + TypeScript        |
| **Styling**         | Tailwind CSS v4 + shadcn/ui v4              |
| **Animations**      | Framer Motion v12, Lenis smooth scroll      |
| **Theme**           | next-themes (dark / light + system default) |
| **Icons**           | Lucide React, react-icons (Simple Icons)    |
| **Typewriter**      | react-type-animation                        |
| **Package Manager** | npm                                         |

---

## ✨ Features

- **Dark / Light Mode** — Toggle between themes with system-preference detection, powered by `next-themes`
- **Smooth Scrolling** — Buttery-smooth scroll experience using [Lenis](https://github.com/darkroomengineering/lenis)
- **Scroll Animations** — Elements animate into view on scroll using Framer Motion's `whileInView`
- **Typewriter Effect** — Rotating subtitles in the Hero section (Backend Engineer, Full Stack Developer, etc.)
- **Fully Responsive** — Mobile-first design with a collapsible hamburger menu on smaller screens
- **Centralized Data** — All content (bio, skills, experience, projects) lives in a single `data.ts` file
- **SEO Optimized** — Proper meta tags, semantic HTML, and Open Graph metadata
- **Sticky Navbar** — Glassmorphism blur effect on scroll with smooth section navigation
- **Animated Gradient Blobs** — Decorative background blobs in the Hero section

---

## 📄 Sections

| #   | Section        | Description                                                                                |
| --- | -------------- | ------------------------------------------------------------------------------------------ |
| 1   | **Navbar**     | Sticky navigation with blur-on-scroll, SG monogram logo, smooth-scroll links, theme toggle, and mobile hamburger menu |
| 2   | **Hero**       | Full-viewport section with typewriter subtitle animation, animated gradient blobs, staggered fade-in, and CTA buttons (Download CV + Contact) |
| 3   | **About**      | Two-column layout with bio text and avatar placeholder, plus 4 animated stats cards (Years of Experience, Companies, Concurrent Users, Latency Reduction) |
| 4   | **Skills**     | Categorized badge grid with technology icons — Languages, Backend & APIs, Databases, Messaging, Auth & Security, Cloud & DevOps |
| 5   | **Experience** | Vertical timeline with alternating cards, showing 5 roles at Simpplr, NE Group, Credain, Idea Usher, and IIT Hyderabad |
| 6   | **Projects**   | Responsive card grid with hover lift effect, tech stack badges, and GitHub links for each project |
| 7   | **Contact**    | Mailto CTA button with GitHub and LinkedIn social icons                                    |
| 8   | **Footer**     | Auto-updating copyright year and a smooth back-to-top button                               |

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── resume.pdf              # Place your resume here for the Download CV button
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles, animations, blob keyframes, timeline styles
│   │   ├── layout.tsx          # Root layout — Inter font, ThemeProvider, Lenis, SEO metadata
│   │   └── page.tsx            # Main page — composes all 8 sections
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky navigation bar
│   │   ├── Hero.tsx            # Hero section with typewriter effect
│   │   ├── About.tsx           # About section with stats
│   │   ├── Skills.tsx          # Skills grid with icons
│   │   ├── Experience.tsx      # Timeline experience section
│   │   ├── Projects.tsx        # Projects card grid
│   │   ├── Contact.tsx         # Contact section
│   │   ├── Footer.tsx          # Footer with back-to-top
│   │   ├── ThemeProvider.tsx   # Client wrapper for next-themes
│   │   ├── SmoothScroll.tsx    # Lenis smooth-scroll RAF loop
│   │   └── ui/                 # shadcn/ui components (Badge, Button, Card, etc.)
│   └── lib/
│       ├── data.ts             # ⭐ All site content — edit this to update the site
│       └── utils.ts            # Utility helpers (cn)
├── components.json             # shadcn/ui configuration
├── tailwind.config.ts          # Tailwind CSS configuration (if present)
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
└── README.md                   # You are here!
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** >= 9.x (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shubhamynr22/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open in your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command          | Description                                 |
| ---------------- | ------------------------------------------- |
| `npm run dev`    | Start the development server (hot reload)   |
| `npm run build`  | Create an optimized production build         |
| `npm run start`  | Start the production server                 |
| `npm run lint`   | Run ESLint to check for code issues         |

---

## 🎨 Customization

All website content is centralized in **`src/lib/data.ts`**. You can update the entire site without touching any component files.

### Update Personal Information

Edit the `personalInfo` object in `src/lib/data.ts`:

```ts
export const personalInfo = {
  name: "Your Name",
  phone: "+91-XXXXXXXXXX",
  email: "your@email.com",
  title: "Your Title",
  location: "Your City",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
};
```

### Update Skills, Experience, or Projects

Each section has its own exported array/object in `data.ts`:

- **`heroSubtitles`** — Roles shown in the typewriter animation
- **`summary`** — One-liner below the hero heading
- **`aboutBio`** — Longer paragraph in the About section
- **`stats`** — Stats cards (value + label)
- **`skillCategories`** — Grouped skills with icons
- **`experiences`** — Work experience entries (reverse chronological)
- **`projects`** — Project cards with tech stack and GitHub links
- **`education`** — Degree, institution, and coursework
- **`navLinks`** — Navigation menu items

### Add Your Resume

Place your resume PDF at `public/resume.pdf` to enable the **Download CV** button in the Hero section.

### Change the Theme Accent Color

The accent color palette is defined in `src/app/globals.css`. Look for the indigo-based custom properties and adjust them to your preferred color scheme.



---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <strong>Shubham Gupta</strong>
</p>
