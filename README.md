# jsondev.uk — Software Developer Portfolio

[![Vite](https://img.shields.io/badge/Vite-4.2.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.10.0-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![i18next](https://img.shields.io/badge/i18next-26.5.11-26A69A?logo=i18next&logoColor=white)](https://www.i18next.com/)
[![License: All Rights Reserved](https://img.shields.io/badge/License-All_Rights_Reserved-red.svg)](#license-and-contact)

The personal software development portfolio of **Jeison Porfirio Plaza Sanchez (JsonDev)**, hosted live at [jsondev.uk](https://jsondev.uk/). Designed as a developer-first platform showcasing web applications, workflow automation tooling, computer science foundations, and verified professional experience.

---

## 1. Project Title and Overview

`jsondev.uk` is a client-side Single-Page Application (SPA) built to communicate technical competence, software engineering foundations, and operational rigor to recruiters, hiring managers, and prospective engineering collaborators.

- **Primary Goal**: Present verified software engineering capabilities, computer science training (Harvard CS50x), and real-world operational strengths.
- **Intended Audience**: Engineering leads, recruiters, and collaborators seeking dedicated software developers with strong problem-solving fundamentals.
- **Visual Design System**: Dark, atmospheric, technical developer aesthetic — Near-black Canvas (`#101110`), layered dark surface cards (`#181A17`, `#20231E`), subtle structural borders (`#30342C`), Caribbean Green primary accent (`#00CC99`), Vivid Pink secondary accent (`#F62975`), and tactical telemetry status badges. Grounded by a subtle fixed viewport grid with faint green intersection nodes and a custom pixel-art workbench hero illustration framed with a layered ambient glow. Typographic hierarchy combines Silkscreen Bold (hero name two-scale identity), Space Grotesk (display headings), Inter (body), and JetBrains Mono (telemetry & code). Fully specified in [`DESIGN.md`](./DESIGN.md).

---

## 2. Features

### Implemented Features
- **Developer-First Homepage**: Clear introductions, animated typewriter title sequence, verified social channels, high-level technical telemetry stats, featured software previews, capability pillars, genuine recommendations, and calls to action.
- **Full Bilingual Support (EN / ES)**:
  - English as the default locale on root paths (`/`) and Spanish localized routes under the `/es` URL prefix.
  - Synchronous language switcher in both desktop header and mobile drawer navigation with persistent `localStorage` preference.
  - Complete, professional translations across all 6 namespaces (`common`, `home`, `about`, `projects`, `contact`, `terminal`).
  - Dynamic `document.documentElement.lang` synchronisation (`en` / `es`).
- **Multilingual SEO & Metadata**:
  - Centralized, route-aware SEO helper synchronising localized document `<title>`, meta descriptions, Open Graph data, canonical `<link rel="canonical">`, and bidirectional hreflang `<link rel="alternate" hreflang="...">` tags on every route transition.
  - Multi-language XML sitemap (`/sitemap.xml`) referencing all 22 canonical URLs and search crawler policy (`/robots.txt`).
- **Interactive Terminal & Simulated Bash Shell**:
  - Dedicated interactive terminal tab at `/terminal` and `/es/terminal`, cleanly placed in the main navigation order between About and Contact (`Home`, `Projects`, `About`, `Terminal`, `Contact`).
  - Frontend-only simulated Bash shell environment featuring a POSIX-style prompt (`guest@jsondev.uk:<path>$`), session command history with `↑`/`↓` recall, and status telemetry.
  - Deterministic in-memory virtual filesystem supporting `ls` (short, `-a`, `-l`, `-la`), `cd` (`~`, `.`, `..`, `-`, absolute/relative paths), `pwd`, and file browsing.
  - Built-in portfolio inspection commands (`help`, `about`, `projects`, `projects <slug>`, `skills`, `contact`, `whoami`, `echo`, `history`, `clear`).
  - High-fidelity ASCII-art welcome screen with 8-line wordmark, session prose, version, separator, help hint, and CLI illustration box.
  - Clean window layout without nested vertical scrollbars, expanding naturally with document height and preserving focus stability (`preventScroll: true`).
- **Project Archive & Detail System**:
  - Filterable catalog allowing visitors to sort projects by category (`All Projects`, `Web Application`, `Desktop & Tooling`), featuring multi-category support per project.
  - Dynamic route detail pages (`/projects/:slug` and `/es/projects/:slug`) presenting operational challenges, technical solutions, highlights, multi-application suite breakdowns, and bidirectional previous/next project navigation.
  - Strictly case-sensitive route matching (`caseSensitive`) with unknown or obsolete URLs routing directly to the localized 404 error page.
- **Comprehensive Software Project Catalog with Dedicated Identity Icons**:
  - **Portfolio Website**: React 18, Tailwind CSS, and Vite SPA with custom design system and client-side routing (Globe / Web browser icon).
  - **Call Progress Tracker**: Native VBA desktop tool designed to structure call stages and support agent KPIs in high-volume operations (Operator headset icon).
  - **Poker Strategy Display**: Dedicated VBA desktop tool for quick-reference strategy range adherence and review routines (Crowned poker chip icon).
  - **Smart File Organizer**: Contract-first Python 3.10+ CLI tool featuring dry-run simulations, YAML classification, and deterministic rollback (Dedicated folder & structured document sort icon).
  - **Ascension Tactics**: Browser-based 3D tactical skirmish game built with TypeScript, Three.js, WebGL, line-of-sight raycasting, and action cameras (Dedicated tactical targeting reticle & isometric skirmish grid icon).
  - **HandLab**: Unified poker study ecosystem consisting of **HandLab Online** (deployed Texas Hold'em range analyzer and solver suite) and **HandLab Desktop** (companion desktop tool for extended analysis; dedicated laboratory flask & cards icon).
- **Comprehensive About View**:
  - Background narrative tracking the transition from high-volume operations into software engineering.
  - Harvard CS50x educational background, technical stack categorization, and verified Notion CS Learning Roadmap integration.
  - Verified work experience across Phillips & Cohen Associates, Ventrica, and Booking.com highlighting transferable operational and compliance discipline, with authenticated Spanish translations.
- **Accessible Contact Workflow**:
  - Validated inquiry composer powered by Formik and Yup with full EN/ES form validation messaging.
  - Transparent notification explaining that direct email transmission is unconfigured on this static site.
  - One-click clipboard copy utility with automatic fallback textarea selection, allowing visitors to format inquiries and paste them directly into LinkedIn messages.
  - Verified profiles and Manchester, UK location details.
- **Modern Performance & Architecture**:
  - Route code-splitting with `React.lazy` and `Suspense` for all secondary pages with localized fallback indicators.
  - Accessible keyboard navigation with visible focus rings (`focus-visible:outline-accent`), semantic HTML landmarks (`header`, `main`, `footer`, `nav`, `article`, `aside`), and `prefers-reduced-motion` overrides.
  - Dedicated 404 error page with localized recovery navigation.

### Incomplete / Deliberately Omitted Features
- **Simulated Terminal Boundaries**: The interactive terminal is strictly a simulated, frontend-only Bash environment operating against an in-memory virtual filesystem. It executes zero host operating system commands, accesses no server filesystems or environment variables, makes no execution-related network calls, and uses no `eval()` or dynamic execution mechanisms.
- **Automated Backend Email API**: Contact form does not transmit emails automatically to a remote server. It acts honestly as a client-side message formatter and clipboard copy tool.
- **Proprietary & Private Repositories**: Source code and internal screenshots for the Call Progress Tracker and Poker Strategy Display desktop projects are proprietary or pending personal review. Repositories for HandLab Online and HandLab Desktop are private; no private source links or internal distribution artifacts are exposed.
- **Project Mockup Screenshots**: Project records purposefully employ 36×36 px / 44×44 px SVG identity icons rather than screenshots or gallery carousels.

---

## 3. Technology Stack

Exact package versions matching [`package.json`](./package.json):

### Production Dependencies
| Dependency | Version | Purpose |
| :--- | :--- | :--- |
| `react` | `^18.2.0` | UI rendering library |
| `react-dom` | `^18.2.0` | DOM bindings for React |
| `react-router-dom` | `^6.10.0` | Declarative client-side routing and navigation |
| `i18next` | `^26.5.11` | Core internationalization framework |
| `react-i18next` | `^17.1.9` | React bindings and hooks (`useTranslation`) for i18next |
| `formik` | `^2.4.1` | Form state management and submission lifecycle |
| `yup` | `^1.2.0` | Schema-based client-side form validation |
| `react-type-animation` | `^3.0.1` | Typewriter visual effect in the hero header |

### Development Dependencies
| Dependency | Version | Purpose |
| :--- | :--- | :--- |
| `vite` | `^4.2.0` | Next-generation frontend build tooling and dev server |
| `@vitejs/plugin-react` | `^3.1.0` | Babel/Fast Refresh React plugin for Vite |
| `tailwindcss` | `^3.3.1` | Utility-first CSS framework |
| `@tailwindcss/forms` | `^0.5.3` | Tailwind form element reset plugin |
| `postcss` | `^8.4.21` | CSS processor tool |
| `autoprefixer` | `^10.4.14` | Vendor prefix parser for CSS rules |
| `@types/react` | `^18.0.28` | TypeScript definitions for React |
| `@types/react-dom` | `^18.0.11` | TypeScript definitions for React DOM |

---

## 4. Prerequisites

To run and build this application locally, ensure you have:
- **Node.js**: `v18.0.0` or higher (compatible with Vite 4, React 18, and modern Vercel runtimes; tested on `v20.x` and `v24.x`).
- **npm**: `v9.0.0` or higher.
- A modern evergreen browser (Chrome, Firefox, Safari, Edge) supporting ES modules.

---

## 5. Installation and Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/46lemonlime/jsondev.uk.git
   cd jsondev.uk
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:5173/` (or the port Vite outputs in the console).

---

## 6. Available Scripts

The following scripts are defined in [`package.json`](./package.json):

```bash
# Starts Vite local development server with Fast Refresh (HMR)
npm run dev

# Bundles production-optimized static assets into the dist/ directory
npm run build

# Boots a local static server to preview the production build in dist/
npm run preview
```

---

## 7. Project Structure

```text
jsondev.uk/
├── public/                       # Static public assets served directly
│   ├── favicon.svg               # Site browser favicon
│   ├── robots.txt                # Search crawler policy and sitemap reference
│   └── sitemap.xml               # Multi-language XML sitemap (22 canonical routes)
├── src/                          # Application source code
│   ├── assets/                   # Centralized media, brand graphics, and icons
│   │   ├── brand/                # Brand wordmark (logoSmall.png)
│   │   ├── fonts/                # Local Silkscreen and Geist Pixel font files (WOFF2/TTF)
│   │   ├── icons/                # Dedicated project badges and UI/social SVGs
│   │   ├── images/               # Page hero illustrations, location map, and 404 art
│   │   ├── cv.pdf                # Authentic curriculum vitae document
│   │   └── index.js              # Centralized asset export registry with backward-compatibility aliases
│   ├── components/               # Shared reusable UI primitives
│   │   ├── Layout/               # Header, Footer, Navbar, ScrollToTop, and seo.js helper
│   │   ├── Badge.jsx             # Status tag component (neutral, accent, telemetry, pink)
│   │   ├── Button.jsx            # Polymorphic button/anchor primitive
│   │   ├── FeedbackCard.jsx      # Testimonial quote card
│   │   ├── GetRoadmap.jsx        # Notion CS roadmap CTA button
│   │   ├── SectionHeader.jsx     # Consistent section title component
│   │   └── index.js              # Barrel export for shared components
│   ├── constants/                # Single source of truth for site content
│   │   └── index.js              # Nav links, projects catalog, history, stats
│   ├── i18n.js                   # i18next configuration, language detection, and namespace loading
│   ├── locales/                  # Localized translation catalogs
│   │   ├── en/                   # English translations (common, home, about, projects, contact, terminal)
│   │   └── es/                   # Spanish translations (common, home, about, projects, contact, terminal)
│   ├── pages/                    # Route-level view modules (code-split)
│   │   ├── about-page/           # Narrative background, skills, verified work history
│   │   ├── contact-page/         # Message composer & verified contact info
│   │   │   └── components/       # ContactForm.jsx & ContactInfo.jsx (SRP)
│   │   ├── error-page/           # Localized HTTP 404 recovery view
│   │   ├── home-page/            # Developer-first landing page
│   │   │   └── components/       # Hero, Stats, Projects, Products, GetInTouch
│   │   ├── portfolio-page/       # Main filterable project archive
│   │   │   └── components/       # ProjectCard.jsx primitive
│   │   ├── project-detail-page/  # Dynamic single project view (/projects/:slug)
│   │   └── terminal-page/        # Interactive simulated Bash shell (/terminal)
│   │       ├── components/       # TerminalView.jsx (window chrome, history, input)
│   │       ├── commandEngine.js  # Dispatcher for simulated POSIX built-in commands
│   │       ├── virtualFs.js      # In-memory virtual directory tree and path resolver
│   │       └── TerminalPage.jsx  # Route wrapper with localized headings and SEO
│   ├── routes/                   # Application routing and chunking
│   │   └── App.jsx               # Case-sensitive canonical English and Spanish routes, 404
│   ├── index.css                 # Tailwind base styles, font faces, theme vars, reduced-motion
│   ├── main.jsx                  # React 18 DOM mount entry point
│   └── style.js                  # Shared typographic and layout token utility
├── DESIGN.md                     # Comprehensive design system specification & rules
├── index.html                    # Root HTML document and Google Fonts configuration
├── package.json                  # Dependencies, metadata, and scripts
├── package-lock.json             # Locked dependency tree
├── postcss.config.js             # PostCSS plugin registration
├── tailwind.config.js            # Design tokens, color palette, and font definitions
├── vercel.json                   # Vercel deployment SPA rewrite rule
├── vite.config.js                # Vite build and plugin setup
└── README.md                     # Comprehensive project documentation
```

---

## 8. Architecture and Design Decisions

- **Single Source of Truth**: All dynamic content (project catalog, employment timeline, technical capabilities, social channels, and navigation items) is declared in [`src/constants/index.js`](./src/constants/index.js). Adding or revising projects automatically propagates across the homepage, archive, detail pages, and document titles.
- **Bilingual i18n Architecture**: Powered by `i18next` and `react-i18next` in [`src/i18n.js`](./src/i18n.js). Content is segmented into six dedicated JSON namespaces (`common`, `home`, `about`, `projects`, `contact`, `terminal`) under `src/locales/en/` and `src/locales/es/`. Language selection syncs with URL paths (`/` for English, `/es` for Spanish) and persists in `localStorage`.
- **Multilingual SEO Framework**: Managed dynamically through [`src/components/Layout/seo.js`](./src/components/Layout/seo.js) via the `useLocalizeDocument` hook called in `ScrollToTop.jsx`. Automatically computes and applies localized page `<title>`, `<meta name="description">`, Open Graph tags, canonical `<link rel="canonical">`, and `<link rel="alternate" hreflang="...">` tags for `en`, `es`, and `x-default`.
- **Simulated Bash Shell & Virtual Filesystem**: Implemented in [`src/pages/terminal-page/`](./src/pages/terminal-page/) as a strictly simulated, frontend-only command line environment. An in-memory virtual filesystem ([`virtualFs.js`](./src/pages/terminal-page/virtualFs.js)) models `/home/guest` and directory nodes derived from [`src/constants/index.js`](./src/constants/index.js). The dispatch engine ([`commandEngine.js`](./src/pages/terminal-page/commandEngine.js)) parses POSIX flags (`ls -la`), resolves directory traversals (`cd ..`, `cd ~`, `cd -`), and renders portfolio data safely without host execution, `eval()`, or backend transmission. Layout expands naturally with page height, eliminating nested inner scrollbars while preserving focus stability (`preventScroll: true`).
- **Dark Technical Page Scrollbar**: Primary page scrollbar rules declared in [`src/index.css`](./src/index.css) apply the Canvas (`#101110`) track, Border Subtle (`#30342C`) thumb, and Caribbean Green (`#00CC99`) active hover states across WebKit and standard W3C scrollbar properties without polluting nested elements.
- **Brand System & Semantic Palette**: Governed by [`DESIGN.md`](./DESIGN.md) as the repository-wide specification. Enforces a 4-step decision hierarchy for colour usage (Caribbean Green for primary actions/brand identity, Vivid Pink for the hero name and deliberate secondary highlights, Semantic status tokens for runtime telemetry, and Dark Neutrals as standard defaults).
- **Dedicated Project Identity Badges**: Each project in the catalog has its own dedicated SVG identity badge rendered at 36×36 px (in cards) and 44×44 px (in detail metadata cards). Smart File Organizer and Ascension Tactics feature custom monochrome `#00CC99` vector icons rather than borrowing section feature icons.
- **Component-Driven Composition**: UI primitives ([`Button.jsx`](./src/components/Button.jsx), [`Badge.jsx`](./src/components/Badge.jsx), [`SectionHeader.jsx`](./src/components/SectionHeader.jsx), [`ProjectCard.jsx`](./src/pages/portfolio-page/components/ProjectCard.jsx)) isolate styling and presentation logic, ensuring consistent design language across all views.
- **Hero Typography & Two-Scale Scaling**: The hero name leverages locally bundled **Silkscreen Bold** with a calculated 1.5× scale ratio between the primary line (“Jeison Porfirio”) and secondary line (“Plaza Sanchez”), rendered with crisp solid brand colours rather than gradients or synthetic strokes.
- **Single Responsibility Principle (SRP)**:
  - Form validation and clipboard state are managed in [`ContactForm.jsx`](./src/pages/contact-page/components/ContactForm.jsx), while static location and verified profiles are isolated in [`ContactInfo.jsx`](./src/pages/contact-page/components/ContactInfo.jsx).
  - Navigation links and CV actions are decoupled from sticky header glassmorphism styles.
- **Open/Closed Principle (OCP)**:
  - Project archive filtering uses declarative `categoryKeys` and `categories` arrays on project data, supporting multi-category membership (e.g., HandLab under both `Web Application` and `Desktop & Tooling`) without hardcoded component arrays or duplicate project records.
- **Performance & Lazy Loading**: Secondary routes are split into separate JavaScript chunks using `React.lazy` and `Suspense`, preventing unnecessary overhead on initial landing load.
- **Controlled Legacy Cleanup**: Obsolete legacy URL redirects, redundant single-project page wrappers, and unused template graphics have been removed. All canonical routes enforce native `caseSensitive` matching, safely directing legacy, mixed-case, or invalid URLs to the 404 error page.
- **Accessibility & UX**:
  - Full keyboard focusability with high-contrast Caribbean green focus rings.
  - Skip-to-content bypass link for screen reader and keyboard visitors.
  - Media queries respecting `prefers-reduced-motion: reduce`.
  - Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<article>`, `<aside>`).

---

## 9. Routing

Routing is managed via `react-router-dom` in [`src/routes/App.jsx`](./src/routes/App.jsx) with strict case-sensitive matching (`caseSensitive`).

### Canonical Route Matrix (22 Routes)

| English Path (Default) | Spanish Path (`/es`) | Component | Description |
| :--- | :--- | :--- | :--- |
| `/` | `/es` | `Home` | Primary landing page |
| `/projects` | `/es/projects` | `Projects` | Filterable project archive |
| `/projects/portfolio-website` | `/es/projects/portfolio-website` | `ProjectDetail` | Portfolio Website detail |
| `/projects/call-progress-tracker` | `/es/projects/call-progress-tracker` | `ProjectDetail` | Call Progress Tracker detail |
| `/projects/poker-strategy-display` | `/es/projects/poker-strategy-display` | `ProjectDetail` | Poker Strategy Display detail |
| `/projects/smart-file-organizer` | `/es/projects/smart-file-organizer` | `ProjectDetail` | Smart File Organizer detail |
| `/projects/ascension-tactics` | `/es/projects/ascension-tactics` | `ProjectDetail` | Ascension Tactics detail |
| `/projects/handlab` | `/es/projects/handlab` | `ProjectDetail` | HandLab suite detail |
| `/about` | `/es/about` | `About` | Personal narrative, education, and verified work history |
| `/terminal` | `/es/terminal` | `TerminalPage` | Interactive simulated Bash shell |
| `/contact` | `/es/contact` | `Contact` | Message builder and verified contact channels |

### 404 Route Catch-All & Strict URL Enforcement
- In accordance with Stage 21G, obsolete legacy redirect paths (such as `/About`, `/Projects`, `/Contact`, `/CPT`, `/PSD`, `/PortfolioWeb`, `/services`, `/construction`) and mixed-case variations have been deprecated.
- Because all canonical `<Route>` definitions declare `caseSensitive`, any non-matching, legacy, or unknown path (in either `/` or `/es/*`) falls directly into the localized 404 `Error` component (`<Route path="*" element={<Error />} />`). The 404 page provides clear recovery navigation and sets `<meta name="robots" content="noindex, nofollow" />`.

---

## 10. Configuration and Environment Variables

- **Environment Variables**: No external environment variables (`.env`) are required or used. The application is completely self-contained and operates purely client-side.
- **Configuration Files**:
  - [`DESIGN.md`](./DESIGN.md): Source-of-truth specification for visual identity, typography ratios, color decision criteria, and component rules.
  - [`vite.config.js`](./vite.config.js): Configures Vite and `@vitejs/plugin-react`.
  - [`tailwind.config.js`](./tailwind.config.js): Extends color tokens (`canvas`, `surface`, `accent`, `pink`, `telemetry`), font families (`display`, `sans`, `mono`, `pixel`), and registers `@tailwindcss/forms`.
  - [`postcss.config.js`](./postcss.config.js): Connects Tailwind and Autoprefixer.
  - [`vercel.json`](./vercel.json): Configures SPA client-side routing rewrites for Vercel edge deployment.
  - [`package.json`](./package.json): Defines module scripts, core dependencies, and dev tool versions.

---

## 11. Build and Deployment

### Production Build
Running the production build produces minified, hash-versioned static assets:
```bash
npm run build
```
Output directory: `dist/` containing `index.html`, versioned JS chunks, CSS, and asset files.

### Vercel Deployment & SPA Rewrites
Because this application uses HTML5 client-side routing (`BrowserRouter`), direct visits to deep links (such as `https://jsondev.uk/projects/call-progress-tracker` or `/about`) require the web server to rewrite all incoming traffic to `index.html`.

This behavior is configured in [`vercel.json`](./vercel.json):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## 12. Code Quality and Contribution Guidelines

- **Code Conventions**: Follow standard JavaScript (ES6+) and modern React function components with hooks.
- **Component Header Documentation**: Every handwritten file contains a standardized JSDoc file header documenting `@file`, `@description`, and `@responsibility`.
- **Honest Test & Linting Status**: No automated test runner (such as Jest or Vitest) or linter (such as ESLint) is currently configured in `package.json`. Code quality and integrity are maintained through static architecture reviews, explicit typing definitions, and production build verification.
- **Accessibility Discipline**: Always include accessible names (`aria-label`, visible text, or `aria-labelledby`), semantic landmarks, and preserve keyboard focus visibility.

---

## 13. Known Limitations

1. **Static Site Form Delivery**: The contact form does not have an active serverless or backend email processing endpoint. It formats inquiries and copies them to the system clipboard for direct submission via LinkedIn.
2. **Clipboard API Permissions**: In non-HTTPS or iframe-restricted browser environments, `navigator.clipboard.writeText` may be blocked by browser security policy. The form includes an automatic fallback that highlights the prepared message in a selectable textarea for manual copying (`Ctrl+C` / `Cmd+C`).
3. **Proprietary & Private Project Sources**: The desktop VBA tools were developed for personal review and internal workplace environments. Repositories for HandLab Online and HandLab Desktop are private and internal; no private source links or unauthorized distributions are exposed. Public GitHub repositories and verified live demos are provided where available (Portfolio Website, Ascension Tactics, Smart File Organizer, HandLab Online).

---

## 14. License and Contact

### License
All rights reserved. © 2026 Jeison Plaza Sanchez (JsonDev). Unauthorized copying, redistribution, or modification of proprietary branding, text content, and personal assets is prohibited.

### Verified Contact Channels
- **LinkedIn**: [linkedin.com/in/jpplazasanchez](https://www.linkedin.com/in/jpplazasanchez/)
- **GitHub**: [github.com/46lemonlime](https://github.com/46lemonlime)
- **X (Twitter)**: [@_jsondev](https://twitter.com/_jsondev)
- **Ko-fi**: [ko-fi.com/jsondev](https://www.ko-fi.com/jsondev/)
- **Buy Me a Coffee**: [buymeacoffee.com/_jsondev](https://www.buymeacoffee.com/_jsondev)
- **CS Learning Roadmap**: [Notion Document](https://juicy-resolution-f28.notion.site/My-CS-Journey-56da4e6378854b02a0dda599d55d633d)
