/**
 * @file src/utils/language.js
 * @description Centralized language detection and localized URL resolution utilities and hook.
 * Authoritatively determines language based on URL path conventions:
 * - English (default): unprefixed routes (e.g., '/', '/about', '/projects/:slug')
 * - Spanish: '/es' prefixed routes (e.g., '/es', '/es/about', '/es/projects/:slug')
 * Preserves query strings, hash fragments, and external URLs without mutating state.
 * @responsibility Detect route language and generate properly localized internal URLs.
 */

import { useCallback } from "react";
import { useLocation } from "react-router-dom";

/**
 * Checks whether a given pathname or URL string corresponds to the Spanish locale.
 * Only exact '/es' or subpaths starting with '/es/' (or '/es?' / '/es#') are recognized.
 * False-positive prefixes like '/essential' or '/escape' are correctly rejected.
 *
 * @param {string} pathname - Route pathname or URL string.
 * @returns {boolean} True if the path represents a Spanish route.
 */
export function isSpanishPath(pathname) {
  if (!pathname || typeof pathname !== "string") return false;
  const clean = pathname.split(/[?#]/)[0];
  return clean === "/es" || clean.startsWith("/es/");
}

/**
 * Returns the two-letter language code ("es" | "en") for a given pathname.
 *
 * @param {string} pathname - Route pathname.
 * @returns {"es" | "en"} Language code.
 */
export function getLanguageFromPath(pathname) {
  return isSpanishPath(pathname) ? "es" : "en";
}

/**
 * Strips any leading '/es' language prefix to return the canonical English path.
 *
 * @param {string} path - Internal path or URL string.
 * @returns {string} Path stripped of Spanish prefix.
 */
export function stripLanguagePrefix(path) {
  if (!path || typeof path !== "string" || !path.startsWith("/")) return path;

  const match = path.match(/^([^?#]*)([?#].*)?$/);
  const rawPathname = match[1];
  const suffix = match[2] || "";

  if (rawPathname === "/es" || rawPathname === "/es/") {
    return "/" + suffix;
  }
  if (rawPathname.startsWith("/es/")) {
    return rawPathname.slice(3) + suffix;
  }
  return path;
}

/**
 * Localizes an internal path while preserving existing URL conventions, query strings, and hash fragments.
 * - External URLs (http/https/mailto/tel) and relative paths are preserved without modification.
 * - Double-prefixing is avoided if the path is already localized.
 *
 * @param {string} path - Target path to localize.
 * @param {boolean} [targetIsSpanish=false] - Whether the target path should be Spanish.
 * @returns {string} Localized path string.
 */
export function localizePath(path, targetIsSpanish = false) {
  if (!path || typeof path !== "string") return path;

  // External URLs, protocol-relative URLs, mailto, tel, or non-root relative links are not modified
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(path)
  ) {
    return path;
  }

  const match = path.match(/^([^?#]*)([?#].*)?$/);
  const rawPathname = match[1];
  const suffix = match[2] || "";

  if (targetIsSpanish) {
    if (rawPathname === "/es" || rawPathname.startsWith("/es/")) {
      return path; // Already localized to Spanish
    }
    if (rawPathname === "/") {
      return "/es" + suffix;
    }
    return `/es${rawPathname}${suffix}`;
  } else {
    // Target is English (unprefixed)
    if (rawPathname === "/es" || rawPathname === "/es/") {
      return "/" + suffix;
    }
    if (rawPathname.startsWith("/es/")) {
      return rawPathname.slice(3) + suffix;
    }
    return path; // Already English
  }
}

/**
 * Lightweight custom hook providing current language status and bound path localization.
 * Consumes React Router's location without introducing global stores or context providers.
 *
 * @returns {{
 *   pathname: string,
 *   isSpanish: boolean,
 *   currentLang: "es" | "en",
 *   localizePath: (path: string, targetIsSpanish?: boolean) => string
 * }}
 */
export function useLanguage() {
  const location = useLocation();
  const pathname = location.pathname;
  const isSpanish = isSpanishPath(pathname);
  const currentLang = isSpanish ? "es" : "en";

  const boundLocalizePath = useCallback(
    (path, targetIsSpanish = isSpanish) => localizePath(path, targetIsSpanish),
    [isSpanish]
  );

  return {
    pathname,
    isSpanish,
    currentLang,
    localizePath: boundLocalizePath,
  };
}
