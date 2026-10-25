import {
  user,
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
  buymeacoffee,
  webdev,
} from "../assets";

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
    link: "/contact",
    title: "Contact",
  },
];

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

export const feedback = [
  {
    id: "feedback-1",
    content:
      "I cannot recommend his services highly enough - consistently exceeded my expectations and provided exceptional value.",
    name: "Elisabetta Gottardi",
    title: "Customer Contact Manager - Booking.com",
    img: user,
  },
  {
    id: "feedback-2",
    content:
      "From start to finish, working with Jeison was a seamless and enjoyable experience. He is a true professional and a pleasure to work with.",
    name: "William Powell",
    title: "Operations Manager - Armathwaite Hall",
    img: user,
  },
  {
    id: "feedback-3",
    content:
      "I was blown away by the level of expertise and dedication that JsonDev brought to our project. He truly cares about his clients and it shows in his work.",
    name: "Chris Norcup",
    title: "HR Director - Phillips & Cohen Associates",
    img: user,
  },
];

/**
 * @typedef {Object} ProjectItem
 * @property {string} id
 * @property {string} slug
 * @property {string} img
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
 */

export const projects = [
  {
    id: "project-1",
    slug: "call-progress-tracker",
    img: calltracker,
    name: "Call Progress Tracker",
    subtitle: "Boosting Customer Service!",
    category: "Desktop Workflow Tool",
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
    id: "project-2",
    slug: "poker-strategy-display",
    img: pokerdisplay,
    name: "Poker Strategy Display",
    subtitle: "Enhancing Poker Strategy Adherence!",
    category: "Desktop Study Application",
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
    id: "project-3",
    slug: "portfolio-website",
    img: portfolioweb,
    name: "Portfolio Website",
    subtitle: "Showcasing My Technical Work & Background",
    category: "Single-Page Web Application",
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
      "Designed with a custom obsidian and crimson design system, semantic HTML landmarks, keyboard focus visibility, and reduced-motion support.",
    ],
    verificationNote:
      "Verified in repository: Full source code is present in this workspace and deployed at jsondev.uk.",
    repoUrl: null,
    liveUrl: "https://jsondev.uk",
    link: "/projects/portfolio-website",
  },
];

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
        name: "Contact",
        link: "/contact",
      },
    ],
  },
  {
    title: "Projects",
    links: [
      {
        name: "Call Progress Tracker",
        link: "/projects/call-progress-tracker",
      },
      {
        name: "Poker Strategy Display",
        link: "/projects/poker-strategy-display",
      },
      {
        name: "Portfolio Website",
        link: "/projects/portfolio-website",
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

