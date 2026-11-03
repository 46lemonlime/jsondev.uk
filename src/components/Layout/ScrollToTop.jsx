/**
 * @file src/components/Layout/ScrollToTop.jsx
 * @description Viewport scroll manager that resets window scroll position to the top on route transitions.
 * @responsibility Restore window scroll position when navigating to a new pathname.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets the window scroll position to the top-left (0, 0).
 * Safely handles environments where window or scrollTo is unavailable.
 *
 * @param {Function} [scrollFn] - Optional scroll implementation (defaults to window.scrollTo).
 */
export function handleScrollToTop(scrollFn = typeof window !== "undefined" ? window.scrollTo : null) {
  if (typeof scrollFn === "function") {
    scrollFn(0, 0);
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    handleScrollToTop();
  }, [pathname]);

  return null;
}

export default ScrollToTop;
