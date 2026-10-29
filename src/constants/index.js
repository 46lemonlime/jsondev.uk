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
 * @typedef {Object} ProjectItem
 * @property {string} id
 * @property {string} slug
 * @property {string[]} categoryKeys - Filter category keys ('desktop' | 'web')
 * @property {string} [categoryKey] - Legacy single category key for backward compatibility
 * @property {string[]} categories - Human-readable category labels (e.g., ['Web Application'], ['Desktop & Tooling'])
 * @property {string} [category] - Legacy single category string for backward compatibility
 * @property {boolean} [featured] - Whether the project is curated for the homepage featured showcase
 * @property {string} img - Dedicated project identity icon badge SVG source (rendered at 36x36 in project cards and 44x44 in detail views; not a screenshot)
 * @property {string} name
 * @property {string} subtitle
 * @property {string} category
 * @property {string} projectType
 * @property {string} status
 * @property {string} title
 * @property {string[]} stack
 * @property {string} content
 * @property {string} context
 * @property {string} overview
 * @property {string} problem
 * @property {string} solution
 * @property {string[]} highlights
 * @property {string} verificationNote
 * @property {string|null} repoUrl
 * @property {string|null} liveUrl
 * @property {string} link
 * @property {ApplicationSubItem[]} [applications] - Optional sub-application breakdowns for multi-app suites
 */

/**
 * @typedef {Object} ApplicationSubItem
 * @property {string} id
 * @property {string} name
 * @property {string} badge
 * @property {string} status
 * @property {string|null} liveUrl
 * @property {string|null} ctaLabel
 * @property {string} description
 * @property {string[]} [capabilities]
 */

/**
 * Verified portfolio projects catalog.
 * @type {ProjectItem[]}
 */
export const projects = [
  {
    id: "project-1",
    slug: "portfolio-website",
    categoryKeys: ["web"],
    categoryKey: "web",
    categories: ["Web Application"],
    category: "Single-Page Web Application",
    featured: true,
    img: portfolioweb,
    name: "Portfolio Website",
    subtitle: "Showcasing My Technical Work & Background",
    projectType: "React & Tailwind Web Project",
    status: "Active / Live",
    title: "HTML, CSS, Javascript, React, Tailwind, Vite",
    stack: [
      "React 18",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "React Router v6",
      "Vite",
      "HTML5 & CSS3",
    ],
    content:
      "Dynamic website used as a platform to introduce myself, display my work, and highlight my expertise, skills and achievements in various fields.",
    context:
      "Multi-route responsive React application deployed on Vercel at jsondev.uk.",
    overview:
      "This portfolio website serves as a central platform to introduce my background, display my software projects, and document my computer science journey using a modern React, Tailwind CSS, and Vite stack.",
    problem:
      "Needed a fast, responsive, and maintainable personal platform to present software projects, technical skills, and professional recommendations to recruiters and collaborators.",
    solution:
      "Engineered a client-side Single-Page Application (SPA) with React 18, Vite, React Router v6, and Tailwind CSS, featuring centralized content constants, reusable UI primitives, accessible navigation, and Vercel rewrite routing.",
    highlights: [
      "Corrected legacy copy-paste metadata (previously mislabelled as a VBA project) and restructured around a modular React + Vite architecture.",
      "Implemented hybrid client-side routing with backward-compatible redirects for legacy project links.",
      "Designed with a custom dark Caribbean green design system, semantic HTML landmarks, keyboard focus visibility, and reduced-motion support.",
    ],
    verificationNote:
      "Verified in repository: Full source code is present in this workspace and deployed at jsondev.uk.",
    repoUrl: "https://github.com/46lemonlime/jsondev.uk",
    liveUrl: "https://www.jsondev.uk/",
    link: "/projects/portfolio-website",
  },
  {
    id: "project-2",
    slug: "call-progress-tracker",
    categoryKeys: ["desktop"],
    categoryKey: "desktop",
    categories: ["Desktop & Tooling"],
    category: "Desktop Workflow Tool",
    featured: true,
    img: calltracker,
    name: "Call Progress Tracker",
    subtitle: "Boosting Customer Service!",
    projectType: "VBA Personal Project",
    status: "Completed",
    title: "VBA",
    stack: ["VBA", "Desktop UI", "Workflow Automation"],
    content:
      "Desktop application designed to empower customer service agents during calls. Developed using VBA, helps agents deliver outstanding service and exceeding KPIs.",
    context:
      "Developed in a live call-centre environment to streamline call handling workflows and support KPI adherence.",
    overview:
      "As a former customer service agent, I discovered the crucial importance of empowering agents with the right tools to deliver exceptional customer service. Developed during my time in a call center, this application helped structure live call workflows and support agents working toward their KPIs.",
    problem:
      "Customer service agents in fast-paced call centres must track call stages, compliance requirements, and customer details simultaneously while maintaining call quality and KPI targets.",
    solution:
      "Built a lightweight desktop application using Visual Basic for Applications (VBA) to guide agents through call stages, keep essential workflow prompts accessible, and reduce friction during live customer interactions.",
    highlights: [
      "Designed from direct first-hand experience working in high-volume customer service operations.",
      "Built with VBA to run natively inside standard desktop office environments without requiring external software installations.",
      "Focused on practical workflow structure and helping agents stay aligned with call quality and KPI expectations.",
    ],
    verificationNote:
      "Source code & screenshots: Built for an internal call-centre desktop environment; public source repository and proprietary workplace screenshots are not published.",
    repoUrl: null,
    liveUrl: null,
    link: "/projects/call-progress-tracker",
  },
  {
    id: "project-3",
    slug: "poker-strategy-display",
    categoryKeys: ["desktop"],
    categoryKey: "desktop",
    categories: ["Desktop & Tooling"],
    category: "Desktop Study Application",
    featured: true,
    img: pokerdisplay,
    name: "Poker Strategy Display",
    subtitle: "Enhancing Poker Strategy Adherence!",
    projectType: "VBA Personal Project",
    status: "Completed",
    title: "VBA",
    stack: ["VBA", "Desktop Application", "Strategy Visualization"],
    content:
      "Desktop application designed to provide poker players accurate adherence and optimal study with their customized poker strategy.",
    context:
      "Built to provide fast, structured access to customized strategy ranges during study and review sessions.",
    overview:
      "This desktop application was designed to provide poker players with clear, structured access to their customized poker strategy for accurate adherence and study sessions.",
    problem:
      "Studying and cross-referencing custom pre-flop and post-flop poker ranges across static spreadsheets or scattered notes is slow and error-prone during review sessions.",
    solution:
      "Developed a dedicated VBA desktop interface that organises customized strategy charts into an accessible, quick-reference display tailored for structured study.",
    highlights: [
      "Custom desktop interface built in VBA for rapid strategy lookup and review.",
      "Structured around clear visual presentation of user-defined strategy matrices.",
      "Created as a personal tool to support disciplined decision-making and study routines.",
    ],
    verificationNote:
      "Source code & screenshots: Personal desktop VBA application; public repository and UI screenshots are pending owner review.",
    repoUrl: null,
    liveUrl: null,
    link: "/projects/poker-strategy-display",
  },
  {
    id: "project-4",
    slug: "smart-file-organizer",
    categoryKeys: ["desktop"],
    categoryKey: "desktop",
    categories: ["Desktop & Tooling"],
    category: "CLI Automation Tool",
    featured: false,
    img: smartfileorganizer,
    name: "Smart File Organizer",
    subtitle: "Deterministic CLI File Organization & Recovery Engine",
    projectType: "Python CLI Project",
    status: "Completed / Maintained",
    title: "Python 3.10+, CLI Architecture, PyYAML, Event Logging",
    stack: [
      "Python 3.10+",
      "CLI Architecture",
      "PyYAML",
      "Event Logging",
      "File System API",
    ],
    content:
      "Contract-first Python CLI application for deterministic file organization, dry-run simulation, execution reporting, and safe rollback.",
    context:
      "Automates directory cleanup workflows with strict separation between planning, execution, and recovery phases.",
    overview:
      "Smart File Organizer is a contract-first Python command-line application built to automate directory organization workflows (such as Downloads or Desktop folders) safely and deterministically. Designed around layered separation of concerns, it decouples discovery, classification, execution planning, filesystem operations, and rollback recovery.",
    problem:
      "Automating directory cleanup across busy filesystem locations is often risky with basic scripts: unexpected file moves can misplace data, lack execution visibility, or provide no mechanism to undo changes when rules mismatch.",
    solution:
      "Engineered an installable Python CLI tool (smartorg) featuring dry-run simulations, YAML-driven classification rules, atomic per-file failure isolation, structured JSON execution reporting, and a deterministic rollback engine to safely undo changes.",
    highlights: [
      "Contract-first architecture with typed dataclass models enforcing strict boundaries across discovery, operations, recovery, and reporting.",
      "Safe execution pipeline separating planning from filesystem operations, with full dry-run simulation support.",
      "Deterministic rollback subsystem that inverts operation paths and restores files with comprehensive rollback report persistence.",
      "Structured key=value logging and chronological JSON report history with scoped filtering and index-based inspection.",
    ],
    verificationNote:
      "Verified repository: Open-source Python package with full pipeline contracts, CLI entry points, and documentation on GitHub.",
    repoUrl: "https://github.com/46lemonlime/smart-file-organizer",
    liveUrl: null,
    link: "/projects/smart-file-organizer",
  },
  {
    id: "project-5",
    slug: "ascension-tactics",
    categoryKeys: ["web"],
    categoryKey: "web",
    categories: ["Web Application"],
    category: "Browser-Based 3D Game",
    featured: false,
    img: ascensiontactics,
    name: "Ascension Tactics",
    subtitle: "Browser-Based 3D Turn-Based Tabletop Skirmish Game",
    projectType: "Turn-based tabletop game",
    status: "Active / Live Demo",
    title: "TypeScript, Three.js, WebGL, Vite, Game Architecture",
    stack: [
      "TypeScript",
      "Three.js",
      "WebGL",
      "Vite",
      "3D Kinematics",
      "Turn-Based Systems",
    ],
    content:
      "High-performance browser-based 3D tactical skirmish game built with Three.js and TypeScript, featuring turn-based combat, 10 factions, and dynamic action cameras.",
    context:
      "Interactive client-side 3D wargame delivering tactical line-of-sight calculations, vehicle physics, and tabletop rule systems in the browser.",
    overview:
      "Ascension Tactics is a high-performance, browser-based 3D tactical tabletop wargame built from scratch using TypeScript and Three.js. Inspired by grimdark tabletop rulesets, it translates miniature skirmishes into an interactive WebGL experience featuring 10 distinct playable factions, multi-weapon loadouts, procedural 3D miniatures, and deterministic camera systems.",
    problem:
      "Translating complex tabletop wargaming mechanics (multi-weapon profiles, range bands, line-of-sight checks, and dice-based combat resolution) into an accessible, performant browser game without heavy external game engine runtimes.",
    solution:
      "Architected a custom WebGL game loop in TypeScript using Three.js, incorporating shared geometry and material caching to minimize draw calls, a deterministic action camera pipeline, line-of-sight raycasting, and isolated equipment state machines.",
    highlights: [
      "10 distinct playable factions with custom heraldic emblems, unit rosters, specialized weapon ranges, and faction doctrines.",
      "Tactical line-of-sight analysis, raycasted movement grids, and multi-weapon squad combat resolution.",
      "Deterministic over-the-shoulder action camera that interpolates and settles before triggering animations and combat rolls.",
      "Custom WebGL rendering architecture with geometry/material caching and realistic continuous tracked vehicle wheel kinematics.",
    ],
    verificationNote:
      "Verified repository & live demo: Full TypeScript and Three.js source code on GitHub, deployed live at ascensiontactics.jsondev.uk.",
    repoUrl: "https://github.com/46lemonlime/ascension_tactics",
    liveUrl: "https://ascensiontactics.jsondev.uk/",
    link: "/projects/ascension-tactics",
  },
  {
    id: "project-6",
    slug: "handlab",
    categoryKeys: ["web", "desktop"],
    categoryKey: "web",
    categories: ["Web Application", "Desktop & Tooling"],
    category: "Web & Desktop Suite",
    featured: false,
    img: handlab,
    name: "HandLab",
    subtitle: "Texas Hold'em Range Analyzer & Companion Desktop Suite",
    projectType: "Related web and desktop applications",
    status: "Active / Live Demo",
    title: "React, JavaScript, Tailwind CSS, Vite, Poker Analytics, Desktop Companion",
    stack: [
      "React",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Vite",
      "Poker Analytics",
      "Desktop Companion",
    ],
    content:
      "Unified poker analysis suite comprising HandLab Online—a browser-based Texas Hold'em range analyzer and study tool—and HandLab Desktop, a companion application delivering extended functionality.",
    context:
      "Consists of a publicly deployed web application at handlab.uk alongside a specialized companion desktop tool for extended analysis.",
    overview:
      "HandLab is a comprehensive poker study ecosystem composed of two complementary applications: HandLab Online, a publicly deployed web platform for visual preflop range analysis and game-tree exploration, and HandLab Desktop, a companion application built to provide extended capabilities beyond the browser experience.",
    problem:
      "Studying complex Texas Hold'em strategies and post-hand decision-making requires rapid access to visual range matrices, preflop charts, and quantitative math tools, while deeper workflows demand specialized desktop capabilities.",
    solution:
      "Engineered HandLab as a complementary two-part poker study system: HandLab Online provides an interactive browser-based 13×13 range matrix, preflop solver charts, EV and pot odds calculators, and street-by-street hand replaying. HandLab Desktop operates as the dedicated companion application providing additional functionality beyond the web platform.",
    highlights: [
      "HandLab Online: Interactive 13×13 Texas Hold'em range matrix with action weighting, hand combo inspection, and visual range painting.",
      "Preflop Chart Library: Positional solver charts (Open Raise, 3-Bet, 4-Bet, vs Squeeze) with custom cloud strategy creation.",
      "Poker Math & EV Suite: Integrated EV solver, pot odds hurdle calculation, Monte Carlo simulation, and ICM tools.",
      "Hand Replayer: Parses raw hand histories from PokerStars and GGPoker to step through played hands street-by-street with chip and pot tracking.",
      "HandLab Desktop Companion: Extended desktop edition built to provide advanced functionality beyond the online platform.",
      "Private Source Repositories: Developed and maintained in private repositories; live web application deployed publicly at handlab.uk.",
    ],
    verificationNote:
      "Verified public deployment: HandLab Online is live at handlab.uk. Source repositories for both online and desktop applications are private.",
    repoUrl: null,
    liveUrl: "https://www.handlab.uk/",
    link: "/projects/handlab",
    applications: [
      {
        id: "handlab-online",
        name: "HandLab Online",
        badge: "Web Application // Deployed",
        status: "Publicly Available",
        liveUrl: "https://www.handlab.uk/",
        ctaLabel: "Visit HandLab Online ↗",
        description:
          "Publicly accessible browser-based Texas Hold'em range analysis and study platform. Features an interactive 13×13 range matrix, positional preflop solver charts, combo weight inspector, poker math and EV calculators, and street-by-street hand history replayer.",
        capabilities: [
          "Interactive 13×13 visual preflop range matrix with action weighting and hand combo inspection.",
          "Pre-loaded positional solver charts (Open Raise, 3-Bet, 4-Bet, vs Squeeze) and custom strategy creation.",
          "Integrated poker math hub featuring EV solvers, pot odds hurdles, Monte Carlo simulation, and ICM calculations.",
          "Hand replayer supporting raw hand history parsing from PokerStars and GGPoker with pot and stack tracking.",
        ],
      },
      {
        id: "handlab-desktop",
        name: "HandLab Desktop",
        badge: "Companion Desktop Application",
        status: "Private Development",
        liveUrl: null,
        ctaLabel: null,
        description:
          "Companion desktop software designed to complement the online platform by providing additional functionality beyond the web version. Maintained in a private repository without public distribution.",
        capabilities: [
          "Provides extended capabilities and specialized analysis workflows beyond the online platform.",
          "Maintained in a private repository; source code and internal distribution are restricted.",
        ],
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
