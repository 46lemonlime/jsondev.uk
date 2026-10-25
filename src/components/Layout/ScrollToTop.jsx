import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ROUTE_TITLES = {
  "/": "Jeison Plaza Sanchez (JsonDev) | Software Developer",
  "/projects": "Projects | JsonDev",
  "/projects/call-progress-tracker": "Call Progress Tracker | JsonDev",
  "/projects/poker-strategy-display": "Poker Strategy Display | JsonDev",
  "/projects/portfolio-website": "Portfolio Website | JsonDev",
  "/about": "About Jeison Plaza Sanchez | JsonDev",
  "/contact": "Contact | JsonDev",
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const normalizedPath =
      pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    document.title =
      ROUTE_TITLES[normalizedPath] || "404 — Page Not Found | JsonDev";
  }, [pathname]);

  return null;
}

export default ScrollToTop;
