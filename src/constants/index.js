/**
 * @file src/constants/index.js
 * @description Centralized data source and content definitions for the jsondev.uk portfolio.
 * Holds navigation routes, project details, capabilities, work history, testimonials, and verified links.
 * @responsibility Serve as the single source of truth for site-wide data and configuration items.
 */

import {
  linkedin,
  twitter,
  github,
  kofi,
  rubik,
  books,
  setup,
  calltracker,
  pokerdisplay,
  portfolioweb,
  smartfileorganizer,
  ascensiontactics,
  handlab,
  buymeacoffee,
  webdev,
} from "../assets";

/**
 * Main application navigation links.
 */
export const navLinks = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "/projects",
    title: "Projects",
  },
  {
    link: "/about",
    title: "About",
  },
  {
    link: "/terminal",
    title: "Terminal",
  },
  {
    link: "/contact",
    title: "Contact",
  },
];

/**
 * About page technical and professional highlights.
 */
export const features = [
  {
    id: "feature-1",
    icon: rubik,
    title: "Technical Stack & Programming",
    content:
      "HTML, CSS, JavaScript, React, Tailwind CSS, Vite, C, SQL, Python, and VBA — backed by foundational knowledge in data structures and memory management.",
  },
  {
    id: "feature-2",
    icon: books,
    title: "Education & Training",
    content:
      "CS50x – Computer Science (Harvard Open Courses / edX, 2023), Customer Service Specialist Apprenticeship (Paragon Skills), and A-Levels (Cambridge House, Valencia, 2011).",
  },
  {
    id: "feature-3",
    icon: setup,
    title: "Professional & Operational Strengths",
    content:
      "Bilingual communication (English & Spanish), regulatory compliance, KPI & quality standards adherence, account management, and workflow process improvement.",
  },
];

/**
 * Verified work experience extracted from authenticated CV.
 */
export const workHistory = [
  {
    id: "exp-1",
    period: "2022 – 2023",
    role: "Estate Care Specialist",
    company: "Phillips & Cohen Associates",
    location: "Manchester, UK (Hybrid)",
    summary:
      "Liaised with customers and clients to manage estate accounts while maintaining accurate account records, meeting internal call quality expectations and KPIs, and operating within strict regulatory compliance guidelines to mitigate legal or financial risk.",
    skills: [
      "Regulatory Compliance",
      "Account Management",
      "Quality Standards & KPIs",
      "Risk Mitigation",
    ],
  },
  {
    id: "exp-2",
    period: "2021 – 2022",
    role: "Customer Service Advisor",
    company: "Ventrica",
    location: "Remote",
    summary:
      "Provided bilingual customer service in Spanish and English across multiple campaigns and channels. Maintained deep knowledge of campaign policies and procedures, met individual and team targets, and collaborated with management to identify areas for process improvement.",
    skills: [
      "Bilingual Support (EN / ES)",
      "Multi-Channel Operations",
      "Process Improvement",
      "Team Collaboration",
    ],
  },
  {
    id: "exp-3",
    period: "2019 – 2020",
    role: "Customer Service Advisor",
    company: "Booking.com",
    location: "Manchester, UK",
    summary:
      "Delivered high-volume bilingual support in Spanish and English across inbound calls, live chat, and email. Resolved complex customer inquiries and complaints, met individual and team performance metrics, and collaborated across departments on process improvements.",
    skills: [
      "Bilingual Communication (EN / ES)",
      "High-Volume Problem Resolution",
      "Performance Metrics",
      "Cross-Department Collaboration",
    ],
  },
];

/**
 * Verified professional feedback and testimonials.
 */
export const feedback = [
  {
    id: "feedback-1",
    content:
      "I cannot recommend his services highly enough - consistently exceeded my expectations and provided exceptional value.",
    name: "Elisabetta Gottardi",
    title: "Customer Contact Manager - Booking.com",
  },
  {
    id: "feedback-2",
    content:
      "From start to finish, working with Jeison was a seamless and enjoyable experience. He is a true professional and a pleasure to work with.",
    name: "William Powell",
    title: "Operations Manager - Armathwaite Hall",
  },
  {
    id: "feedback-3",
    content:
      "I was blown away by the level of expertise and dedication that JsonDev brought to our project. He truly cares about his clients and it shows in his work.",
    name: "Chris Norcup",
    title: "HR Director - Phillips & Cohen Associates",
  },
];

/**
 * Structural project item definition.
 * Localized presentation copy (name, subtitle, projectType, overview, content,
 * problem, solution, highlights, verificationNote, contribution) is owned by
 * src/locales/{en,es}/projects.json.
 * @typedef {Object} ProjectItem
 * @property {string} id - Unique project identifier
 * @property {string} slug - Unique kebab-case route slug
 * @property {string} name - Canonical project name (fallback for non-i18n contexts)
 * @property {string[]} categoryKeys - Machine-readable filter category keys ('desktop' | 'web')
 * @property {boolean} [featured] - Whether the project is curated for the homepage featured showcase
 * @property {"activeLive"|"completed"|"completedMaintained"|"activeLiveDemo"} statusKey - Project lifecycle status badge key
 * @property {string} img - Dedicated project identity icon badge SVG source
 * @property {string[]} stack - Canonical technology stack array
 * @property {string|null} liveUrl - Verified live website or demo URL
 * @property {string|null} repoUrl - Verified public source repository URL
 * @property {string} link - Canonical internal route path (/projects/:slug)
 * @property {ApplicationSubItem[]} [applications] - Structural sub-application models for multi-app suites
 */

/**
 * Structural sub-application model for multi-app ecosystems.
 * Localized copy (name, badge, status, description, capabilities, ctaLabel)
 * is owned by src/locales/{en,es}/projects.json.
 * @typedef {Object} ApplicationSubItem
 * @property {string} id - Unique sub-application identifier
 * @property {string|null} liveUrl - Application-specific deployment URL
 */

/**
 * Verified portfolio projects catalog.
 * @type {ProjectItem[]}
 */
export const projects = [
  {
    id: "project-1",
    slug: "portfolio-website",
    name: "Portfolio Website",
    categoryKeys: ["web"],
    featured: true,
    statusKey: "activeLive",
    img: portfolioweb,
    stack: [
      "React 18",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "React Router v6",
      "Vite",
      "HTML5 & CSS3",
    ],
    liveUrl: "https://www.jsondev.uk/",
    repoUrl: "https://github.com/46lemonlime/jsondev.uk",
    link: "/projects/portfolio-website",
  },
  {
    id: "project-2",
    slug: "call-progress-tracker",
    name: "Call Progress Tracker",
    categoryKeys: ["desktop"],
    featured: true,
    statusKey: "completed",
    img: calltracker,
    stack: ["VBA", "Desktop UI", "Workflow Automation"],
    liveUrl: null,
    repoUrl: null,
    link: "/projects/call-progress-tracker",
  },
  {
    id: "project-3",
    slug: "poker-strategy-display",
    name: "Poker Strategy Display",
    categoryKeys: ["desktop"],
    featured: true,
    statusKey: "completed",
    img: pokerdisplay,
    stack: ["VBA", "Desktop Application", "Strategy Visualization"],
    liveUrl: null,
    repoUrl: null,
    link: "/projects/poker-strategy-display",
  },
  {
    id: "project-4",
    slug: "smart-file-organizer",
    name: "Smart File Organizer",
    categoryKeys: ["desktop"],
    featured: false,
    statusKey: "completedMaintained",
    img: smartfileorganizer,
    stack: [
      "Python 3.10+",
      "CLI Architecture",
      "PyYAML",
      "Event Logging",
      "File System API",
    ],
    liveUrl: null,
    repoUrl: "https://github.com/46lemonlime/smart-file-organizer",
    link: "/projects/smart-file-organizer",
  },
  {
    id: "project-5",
    slug: "ascension-tactics",
    name: "Ascension Tactics",
    categoryKeys: ["web"],
    featured: false,
    statusKey: "activeLiveDemo",
    img: ascensiontactics,
    stack: [
      "TypeScript",
      "Three.js",
      "WebGL",
      "Vite",
      "3D Kinematics",
      "Turn-Based Systems",
    ],
    liveUrl: "https://ascensiontactics.jsondev.uk/",
    repoUrl: "https://github.com/46lemonlime/ascension_tactics",
    link: "/projects/ascension-tactics",
  },
  {
    id: "project-6",
    slug: "handlab",
    name: "HandLab",
    categoryKeys: ["web", "desktop"],
    featured: false,
    statusKey: "activeLiveDemo",
    img: handlab,
    stack: [
      "React",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Vite",
      "Poker Analytics",
      "Desktop Companion",
    ],
    liveUrl: "https://www.handlab.uk/",
    repoUrl: null,
    link: "/projects/handlab",
    applications: [
      {
        id: "handlab-online",
        liveUrl: "https://www.handlab.uk/",
      },
      {
        id: "handlab-desktop",
        liveUrl: null,
      },
    ],
  },
];

/**
 * Technical capability pillars presented on the homepage.
 */
export const technicalCapabilities = [
  {
    id: "capability-frontend",
    icon: webdev,
    code: "01 // WEB DEVELOPMENT",
    title: "Frontend & Web Applications",
    stack: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Vite"],
    content:
      "Building responsive single-page applications, component-driven user interfaces, and clean client-side routing architectures.",
  },
  {
    id: "capability-programming",
    icon: rubik,
    code: "02 // CORE PROGRAMMING & AUTOMATION",
    title: "Systems, Scripting & Workflow Tooling",
    stack: ["C", "Python", "SQL", "VBA", "Data Structures", "Memory Management"],
    content:
      "Developing practical desktop tools and scripts grounded in computer science fundamentals, relational queries, and operational process improvement.",
  },
  {
    id: "capability-foundations",
    icon: books,
    code: "03 // EDUCATION & CONTINUOUS LEARNING",
    title: "CS Foundations & Operational Rigor",
    stack: ["Harvard CS50x", "Process Compliance", "Bilingual EN / ES"],
    content:
      "Combining Harvard CS50x computer science training with 3+ years of experience operating in regulated, KPI-driven environments across the UK.",
  },
];

/**
 * Summary telemetry stats displayed on the hero section.
 */
export const stats = [
  {
    id: "stats-1",
    label: "CORE STACK",
    value: "React & JS",
    detail: "HTML, CSS, Tailwind, Vite",
  },
  {
    id: "stats-2",
    label: "PROGRAMMING",
    value: "C, Python, SQL",
    detail: "VBA, Data Structures & Memory Mgmt",
  },
  {
    id: "stats-3",
    label: "LANGUAGES",
    value: "EN & ES",
    detail: "Native / Bilingual Proficiency",
  },
  {
    id: "stats-4",
    label: "STATUS",
    value: "Available",
    detail: "Manchester, UK & Full-Remote",
  },
];

/**
 * Footer navigation columns and verified external references.
 */
export const footerLinks = [
  {
    title: "Navigation",
    links: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Projects",
        link: "/projects",
      },
      {
        name: "About",
        link: "/about",
      },
      {
        name: "Terminal",
        link: "/terminal",
      },
      {
        name: "Contact",
        link: "/contact",
      },
    ],
  },
  {
    title: "Projects",
    links: [
      {
        name: "Portfolio Website",
        link: "/projects/portfolio-website",
      },
      {
        name: "Call Progress Tracker",
        link: "/projects/call-progress-tracker",
      },
      {
        name: "Poker Strategy Display",
        link: "/projects/poker-strategy-display",
      },
      {
        name: "Smart File Organizer",
        link: "/projects/smart-file-organizer",
      },
      {
        name: "Ascension Tactics",
        link: "/projects/ascension-tactics",
      },
      {
        name: "HandLab",
        link: "/projects/handlab",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        name: "CS Learning Roadmap (Notion)",
        link: "https://juicy-resolution-f28.notion.site/My-CS-Journey-56da4e6378854b02a0dda599d55d633d",
        external: true,
      },
      {
        name: "GitHub Profile",
        link: "https://github.com/46lemonlime",
        external: true,
      },
      {
        name: "LinkedIn Profile",
        link: "https://www.linkedin.com/in/jpplazasanchez/",
        external: true,
      },
    ],
  },
];

/**
 * Verified social media and community platforms.
 */
export const socialMedia = [
  {
    id: "social-github",
    name: "GitHub",
    icon: github,
    link: "https://github.com/46lemonlime",
  },
  {
    id: "social-linkedin",
    name: "LinkedIn",
    icon: linkedin,
    link: "https://www.linkedin.com/in/jpplazasanchez/",
  },
  {
    id: "social-twitter",
    name: "X (Twitter)",
    icon: twitter,
    link: "https://twitter.com/_jsondev",
  },
  {
    id: "social-kofi",
    name: "Ko-fi",
    icon: kofi,
    link: "https://www.ko-fi.com/jsondev/",
  },
  {
    id: "social-bmc",
    name: "Buy Me a Coffee",
    icon: buymeacoffee,
    link: "https://www.buymeacoffee.com/_jsondev",
  },
];
