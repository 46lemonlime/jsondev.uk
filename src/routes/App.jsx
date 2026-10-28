/**
 * @file src/routes/App.jsx
 * @description Central routing configuration for jsondev.uk.
 * Configures the client-side router, layout wrapper, lazy route chunking,
 * loading fallbacks, backward-compatible legacy redirects, and 404 handling.
 * @responsibility Define application routes, redirects, and top-level suspense boundaries.
 */

import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Layout & primary landing page loaded eagerly for instant initial render
import Layout from "../components/Layout";
import Home from "../pages/home-page";

// Lazy-load secondary route chunks to minimize initial bundle size
const About = lazy(() => import("../pages/about-page"));
const Contact = lazy(() => import("../pages/contact-page"));
const Projects = lazy(() => import("../pages/portfolio-page"));
const ProjectDetail = lazy(() => import("../pages/project-detail-page"));
const Error = lazy(() => import("../pages/error-page"));

/**
 * Lightweight loading state displayed during route chunk evaluation.
 */
const RouteLoadingFallback = () => {
  const { t } = useTranslation("common");

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full min-h-[60vh] flex items-center justify-center px-6"
    >
      <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface border border-borderSubtle font-mono text-[13px] text-textSecondary">
        <span
          className="w-2 h-2 rounded-full bg-accent animate-pulse"
          aria-hidden="true"
        />
        <span>{t("loading")}</span>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            {/* Core English Portfolio Routes (Default) */}
            <Route caseSensitive path="/" element={<Home />} />
            <Route caseSensitive path="/about" element={<About />} />
            <Route caseSensitive path="/projects" element={<Projects />} />
            <Route caseSensitive path="/contact" element={<Contact />} />

            {/* Dynamic Project Detail Route (handles /projects/:slug) */}
            <Route
              caseSensitive
              path="/projects/:slug"
              element={<ProjectDetail />}
            />

            {/* Spanish Portfolio Routes (/es) */}
            <Route caseSensitive path="/es">
              <Route index element={<Home />} />
              <Route caseSensitive path="about" element={<About />} />
              <Route caseSensitive path="projects" element={<Projects />} />
              <Route caseSensitive path="contact" element={<Contact />} />
              <Route
                caseSensitive
                path="projects/:slug"
                element={<ProjectDetail />}
              />
              <Route path="*" element={<Error />} />
            </Route>

            {/* 404 Catch-All Route */}
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
