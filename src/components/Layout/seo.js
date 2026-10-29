/**
 * @file src/components/Layout/seo.js
 * @description SEO utilities for dynamic metadata resolution, Open Graph tags,
 * canonical links, and hreflang alternates in jsondev.uk.
 * @responsibility Resolve and apply localized page titles, meta descriptions, and link tags.
 */

import { projects } from "../../constants";
import i18n from "../../i18n";

const SITE_ORIGIN = "https://www.jsondev.uk";

/**
 * Known static routes mapped to their i18n translation keys.
 */
const STATIC_ROUTES = {
  "/": {
    titleKey: "common:seo.defaultTitle",
    descKey: "common:seo.defaultDescription",
  },
  "/about": {
    titleKey: "common:seo.aboutTitle",
    descKey: "common:seo.aboutDescription",
  },
  "/projects": {
    titleKey: "common:seo.projectsTitle",
    descKey: "common:seo.projectsDescription",
  },
  "/terminal": {
    titleKey: "common:seo.terminalTitle",
    descKey: "common:seo.terminalDescription",
  },
  "/contact": {
    titleKey: "common:seo.contactTitle",
    descKey: "common:seo.contactDescription",
  },
};

/**
 * Resolves SEO metadata for a given pathname and target language.
 * @param {string} pathname - Raw or normalized location pathname.
 * @param {"en" | "es"} lang - Target language.
 * @returns {Object} SEO metadata object.
 */
export function resolveSEOMetadata(pathname, lang = "en") {
  const normalized =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  // Determine canonical route (unprefixed)
  let canonicalPath = normalized;
  if (normalized === "/es") {
    canonicalPath = "/";
  } else if (normalized.startsWith("/es/")) {
    canonicalPath = normalized.replace(/^\/es/, "");
  }

  // Check static routes
  if (STATIC_ROUTES[canonicalPath]) {
    const config = STATIC_ROUTES[canonicalPath];
    const title = i18n.t(config.titleKey, { lng: lang });
    const description = i18n.t(config.descKey, { lng: lang });
    const enUrl = `${SITE_ORIGIN}${canonicalPath}`;
    const esUrl =
      canonicalPath === "/"
        ? `${SITE_ORIGIN}/es`
        : `${SITE_ORIGIN}/es${canonicalPath}`;
    const canonicalUrl = lang === "es" ? esUrl : enUrl;

    return {
      title,
      description,
      canonicalUrl,
      enUrl,
      esUrl,
      lang,
      is404: false,
    };
  }

  // Check project detail routes
  if (canonicalPath.startsWith("/projects/")) {
    const slug = canonicalPath.replace("/projects/", "");
    const matchingProject = projects.find((p) => p.slug === slug);

    if (matchingProject) {
      const projectName = i18n.t(`projects:items.${slug}.name`, {
        lng: lang,
        defaultValue: matchingProject.name,
      });
      const projectDesc = i18n.t(`projects:items.${slug}.content`, {
        lng: lang,
        defaultValue: matchingProject.content,
      });
      const title = `${projectName} | JsonDev`;
      const description = projectDesc;
      const enUrl = `${SITE_ORIGIN}/projects/${slug}`;
      const esUrl = `${SITE_ORIGIN}/es/projects/${slug}`;
      const canonicalUrl = lang === "es" ? esUrl : enUrl;

      return {
        title,
        description,
        canonicalUrl,
        enUrl,
        esUrl,
        lang,
        is404: false,
      };
    }
  }

  // Fallback to 404
  const title = i18n.t("common:seo.notFoundTitle", { lng: lang });
  const description = i18n.t("common:seo.notFoundDescription", { lng: lang });
  return {
    title,
    description,
    canonicalUrl: `${SITE_ORIGIN}${normalized}`,
    enUrl: null,
    esUrl: null,
    lang,
    is404: true,
  };
}

/**
 * Updates DOM head elements with the resolved metadata.
 * @param {Object} metadata - The metadata object returned by resolveSEOMetadata.
 */
export function applySEOMetadata(metadata) {
  if (typeof document === "undefined") return;

  // 1. Document title
  document.title = metadata.title;

  // 2. HTML lang attribute
  document.documentElement.lang = metadata.lang;

  // Helper to get or create a meta tag
  const setMetaTag = (attrName, attrValue, content) => {
    let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  const removeMetaTag = (attrName, attrValue) => {
    const el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (el) el.remove();
  };

  // 3. Meta description
  setMetaTag("name", "description", metadata.description);

  // 4. Robots
  if (metadata.is404) {
    setMetaTag("name", "robots", "noindex, nofollow");
  } else {
    removeMetaTag("name", "robots");
  }

  // 5. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (metadata.is404) {
    if (canonicalEl) canonicalEl.remove();
  } else {
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", metadata.canonicalUrl);
  }

  // 6. Reciprocal hreflang alternates
  const existingHreflangs = document.querySelectorAll(
    'link[rel="alternate"][hreflang]'
  );
  existingHreflangs.forEach((el) => el.remove());

  if (!metadata.is404 && metadata.enUrl && metadata.esUrl) {
    const alternates = [
      { hreflang: "en", href: metadata.enUrl },
      { hreflang: "es", href: metadata.esUrl },
      { hreflang: "x-default", href: metadata.enUrl },
    ];
    alternates.forEach(({ hreflang, href }) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", hreflang);
      link.setAttribute("href", href);
      document.head.appendChild(link);
    });
  }

  // 7. Open Graph
  setMetaTag("property", "og:title", metadata.title);
  setMetaTag("property", "og:description", metadata.description);
  setMetaTag("property", "og:type", "website");
  setMetaTag("property", "og:url", metadata.canonicalUrl);
  setMetaTag(
    "property",
    "og:locale",
    metadata.lang === "es" ? "es_ES" : "en_GB"
  );
  setMetaTag(
    "property",
    "og:locale:alternate",
    metadata.lang === "es" ? "en_GB" : "es_ES"
  );

  // 8. Twitter
  setMetaTag("name", "twitter:card", "summary");
  setMetaTag("name", "twitter:site", "@_jsondev");
  setMetaTag("name", "twitter:title", metadata.title);
  setMetaTag("name", "twitter:description", metadata.description);
}
