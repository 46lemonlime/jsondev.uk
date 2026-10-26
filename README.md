# jsondev.uk — Software Developer Portfolio

[![Vite](https://img.shields.io/badge/Vite-4.2.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.10.0-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
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
- **Project Archive & Detail System**:
  - Filterable catalog allowing visitors to sort projects by category (`All Projects`, `Web / React`, `Desktop / VBA`).
  - Dynamic route detail pages (`/projects/:slug`) presenting operational challenges, technical solutions, highlights, and bidirectional previous/next project navigation.
  - Dedicated route wrappers for legacy routes (`/CPT`, `/PSD`, `/PortfolioWeb`).
- **Comprehensive About View**:
  - Background narrative tracking the transition from high-volume operations into software engineering.
  - Harvard CS50x educational background, technical stack categorization, and verified Notion CS Learning Roadmap integration.
  - Verified work experience across Phillips & Cohen Associates, Ventrica, and Booking.com highlighting transferable operational and compliance discipline.
- **Accessible Contact Workflow**:
  - Validated inquiry composer powered by Formik and Yup.
  - Transparent notification explaining that direct email transmission is unconfigured on this static site.
  - One-click clipboard copy utility with automatic fallback textarea selection, allowing visitors to format inquiries and paste them directly into LinkedIn messages.
  - Verified profiles and Manchester, UK location details.
- **Modern Performance & Architecture**:
  - Route code-splitting with `React.lazy` and `Suspense` for all secondary pages.
  - Accessible keyboard navigation with visible focus rings (`focus-visible:outline-accent`), semantic HTML landmarks (`header`, `main`, `footer`, `nav`, `article`, `aside`), and `prefers-reduced-motion` overrides.
  - Client-side title manager synchronizing document title on every route change.
  - Dedicated 404 error page with recovery navigation.

### Incomplete / Deliberately Omitted Features
- **Automated Backend Email API**: Contact form does not transmit emails automatically to a remote server. It acts honestly as a client-side message formatter and clipboard copy tool.
- **Proprietary VBA Repositories**: Source code and internal screenshots for the Call Progress Tracker and Poker Strategy Display desktop projects are proprietary or pending personal review and are not published publicly.

---

## 3. Technology Stack

Exact package versions matching [`package.json`](./package.json):

### Production Dependencies
| Dependency | Version | Purpose |
| :--- | :--- | :--- |
| `react` | `^18.2.0` | UI rendering library |
| `react-dom` | `^18.2.0` | DOM bindings for React |
| `react-router-dom` | `^6.10.0` | Declarative client-side routing and navigation |
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
│   └── favicon.svg               # Site browser favicon
├── src/                          # Application source code
│   ├── assets/                   # Centralized media, brand graphics, and icons
│   │   ├── brand/                # Logo SVG and PNG files
│   │   ├── fonts/                # Local Silkscreen and Geist Pixel font files (WOFF2/TTF)
│   │   ├── icons/                # Category, project, and social SVGs
│   │   ├── images/               # Pixel-art hero illustration, location map, and vector graphics
│   │   ├── cv.pdf                # Authentic curriculum vitae document
│   │   └── index.js              # Asset barrel export registry
│   ├── components/               # Shared reusable UI primitives
│   │   ├── Layout/               # Header, Footer, Navbar, and ScrollToTop
│   │   ├── Badge.jsx             # Status tag component (neutral, accent, telemetry, pink)
│   │   ├── Button.jsx            # Polymorphic button/anchor primitive
│   │   ├── FeedbackCard.jsx      # Testimonial quote card
│   │   ├── GetRoadmap.jsx        # Notion CS roadmap CTA button
│   │   ├── SectionHeader.jsx     # Consistent section title component
│   │   └── index.js              # Barrel export for shared components
│   ├── constants/                # Single source of truth for site content
│   │   └── index.js              # Nav links, projects catalog, history, stats
│   ├── pages/                    # Route-level view modules
│   │   ├── about-page/           # Narrative background, skills, work history
│   │   ├── contact-page/         # Message composer & verified contact info
│   │   │   └── components/       # ContactForm.jsx & ContactInfo.jsx (SRP)
│   │   ├── error-page/           # HTTP 404 recovery view
│   │   ├── home-page/            # Developer-first landing page
│   │   │   └── components/       # Hero, Stats, Projects, Products, GetInTouch
│   │   ├── portfolio-page/       # Main filterable project archive
│   │   │   └── components/       # ProjectCard.jsx primitive
│   │   ├── project-detail-page/  # Dynamic single project view (/projects/:slug)
│   │   ├── project-CPT-page/     # Dedicated wrapper for Call Progress Tracker
│   │   ├── project-PSD-page/     # Dedicated wrapper for Poker Strategy Display
│   │   └── project-portfolioweb-page/ # Dedicated wrapper for Portfolio Website
│   ├── routes/                   # Application routing and chunking
│   │   └── App.jsx               # BrowserRouter, route chunks, redirects, 404
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
- **Brand System & Semantic Palette**: Governed by [`DESIGN.md`](./DESIGN.md) as the repository-wide specification. Enforces a 4-step decision hierarchy for colour usage (Caribbean Green for primary actions/brand identity, Vivid Pink for the hero name and deliberate secondary highlights, Semantic status tokens for runtime telemetry, and Dark Neutrals as standard defaults).
- **Component-Driven Composition**: UI primitives ([`Button.jsx`](./src/components/Button.jsx), [`Badge.jsx`](./src/components/Badge.jsx), [`SectionHeader.jsx`](./src/components/SectionHeader.jsx), [`ProjectCard.jsx`](./src/pages/portfolio-page/components/ProjectCard.jsx)) isolate styling and presentation logic, ensuring consistent design language across all views.
- **Hero Typography & Two-Scale Scaling**: The hero name leverages locally bundled **Silkscreen Bold** with a calculated 1.5× scale ratio between the primary line (“Jeison Porfirio”) and secondary line (“Plaza Sanchez”), rendered with crisp solid brand colours rather than gradients or synthetic strokes.
- **Single Responsibility Principle (SRP)**:
  - Form validation and clipboard state are managed in [`ContactForm.jsx`](./src/pages/contact-page/components/ContactForm.jsx), while static location and verified profiles are isolated in [`ContactInfo.jsx`](./src/pages/contact-page/components/ContactInfo.jsx).
  - Navigation links and CV actions are decoupled from sticky header glassmorphism styles.
- **Open/Closed Principle (OCP)**:
  - Project archive filtering uses declarative `categoryKey` properties on project data instead of hardcoded component arrays.
  - Route document titles in [`ScrollToTop.jsx`](./src/components/Layout/ScrollToTop.jsx) resolve dynamically from the project data catalog.
- **Performance & Lazy Loading**: Secondary routes are split into separate JavaScript chunks using `React.lazy` and `Suspense`, preventing unnecessary overhead on initial landing load.
- **Accessibility & UX**:
  - Full keyboard focusability with high-contrast Caribbean green focus rings.
  - Skip-to-content bypass link for screen reader and keyboard visitors.
  - Media queries respecting `prefers-reduced-motion: reduce`.
  - Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<article>`, `<aside>`).

---

## 9. Routing

Routing is managed via `react-router-dom` in [`src/routes/App.jsx`](./src/routes/App.jsx).

### Active Main Routes
| Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `Home` | Primary landing page |
| `/projects` | `Projects` | Full filterable software projects archive |
| `/projects/:slug` | `ProjectDetail` | Dynamic project detail view based on slug parameter |
| `/about` | `About` | Personal narrative, education, skills, and work history |
| `/contact` | `Contact` | Message builder and verified contact channels |

### Backward-Compatible Legacy Redirects
Legacy uppercase and previous site paths redirect seamlessly:
- `/About` ➔ `/about`
- `/Projects` ➔ `/projects`
- `/Contact` ➔ `/contact`
- `/CPT` ➔ `/projects/call-progress-tracker`
- `/PSD` ➔ `/projects/poker-strategy-display`
- `/PortfolioWeb` ➔ `/projects/portfolio-website`
- `/services` & `/Services` ➔ `/about` (consolidated)
- `/construction` & `/Construction` ➔ `/`

### 404 Route Catch-All
- Any undefined URL renders the dedicated `Error` component (`<Route path="*" element={<Error />} />`), providing clear navigation back to active sections.

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
3. **Proprietary Project Sources**: The desktop VBA tools were developed for personal review and internal workplace environments. Public GitHub repositories and proprietary screenshots are not published.

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
