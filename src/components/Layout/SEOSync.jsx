/**
 * @file src/components/Layout/SEOSync.jsx
 * @description Route-level SEO metadata synchronizer updating document title, meta tags, and canonical links.
 * @responsibility Resolve and apply localized SEO metadata based on current pathname and language.
 */

import { useEffect } from "react";
import { resolveSEOMetadata, applySEOMetadata } from "./seo";
import { useLanguage } from "../../utils/language";

/**
 * Resolves and applies SEO metadata for the current route and language.
 *
 * @param {string} pathname - Route pathname.
 * @param {"en" | "es"} lang - Current route language.
 * @param {Function} [resolver=resolveSEOMetadata] - Metadata resolution function.
 * @param {Function} [applier=applySEOMetadata] - DOM application function.
 * @returns {Object} Resolved metadata object.
 */
export function syncRouteSEO(
  pathname,
  lang,
  resolver = resolveSEOMetadata,
  applier = applySEOMetadata
) {
  const metadata = resolver(pathname, lang);
  if (typeof applier === "function") {
    applier(metadata);
  }
  return metadata;
}

function SEOSync() {
  const { pathname, currentLang } = useLanguage();

  useEffect(() => {
    syncRouteSEO(pathname, currentLang);
  }, [pathname, currentLang]);

  return null;
}

export default SEOSync;
