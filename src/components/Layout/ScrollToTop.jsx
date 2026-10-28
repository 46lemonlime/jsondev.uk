/**
 * @file src/components/Layout/ScrollToTop.jsx
 * @description Automatically scrolls the window to the top on route transitions, synchronizes
 * the i18n language and html[lang] attribute with the authoritative URL path, and dynamically
 * applies localized SEO metadata, Open Graph tags, canonical links, and hreflang alternates.
 * @responsibility Synchronize window scroll position, document language, and SEO metadata with React Router history.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import i18n from "../../i18n";
import { resolveSEOMetadata, applySEOMetadata } from "./seo";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
    const targetLang = isSpanish ? "es" : "en";

    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }

    const metadata = resolveSEOMetadata(pathname, targetLang);
    applySEOMetadata(metadata);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
