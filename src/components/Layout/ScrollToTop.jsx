/**
 * @file src/components/Layout/ScrollToTop.jsx
 * @description Automatically scrolls the window to the top on route transitions and dynamically
 * sets the document title based on standard routes and cataloged projects.
 * @responsibility Synchronize window scroll position and document title with React Router history.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { projects } from "../../constants";

/**
 * Base static route-to-title mapping.
 */
const BASE_ROUTE_TITLES = {
  "/": "Jeison Plaza Sanchez (JsonDev) | Software Developer",
  "/projects": "Projects | JsonDev",
  "/about": "About Jeison Plaza Sanchez | JsonDev",
  "/contact": "Contact | JsonDev",
};

/**
 * Dynamically resolves the page title from project data (Open/Closed Principle) or static routes.
 * @param {string} path - Normalized pathname.
 * @returns {string} Page title.
 */
const resolvePageTitle = (path) => {
  if (BASE_ROUTE_TITLES[path]) {
    return BASE_ROUTE_TITLES[path];
  }

  if (path.startsWith("/projects/")) {
    const slug = path.replace("/projects/", "");
    const matchingProject = projects.find((p) => p.slug === slug);
    if (matchingProject) {
      return `${matchingProject.name} | JsonDev`;
    }
  }

  return "404 — Page Not Found | JsonDev";
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const normalizedPath =
      pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    document.title = resolvePageTitle(normalizedPath);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
