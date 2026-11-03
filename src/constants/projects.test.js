import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { projects } from "./index";
import i18n, { resources } from "../i18n";
import enProjects from "../locales/en/projects.json";
import esProjects from "../locales/es/projects.json";
import enCommon from "../locales/en/common.json";
import esCommon from "../locales/es/common.json";
import { executeCommand } from "../pages/terminal-page/commandEngine";
import ProjectDetail from "../pages/project-detail-page";
import ProjectCard from "../pages/portfolio-page/components/ProjectCard";

describe("Project Data Model — Identity & Structural Integrity", () => {
  it("contains exactly 6 verified projects in the canonical catalog", () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBe(6);
  });

  it("assigns each project a unique, non-empty string ID", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(projects.length);
    projects.forEach((p) => {
      expect(typeof p.id).toBe("string");
      expect(p.id.trim().length).toBeGreaterThan(0);
    });
  });

  it("assigns each project a unique, non-empty kebab-case slug", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(projects.length);
    projects.forEach((p) => {
      expect(typeof p.slug).toBe("string");
      expect(p.slug.trim().length).toBeGreaterThan(0);
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it("defines a canonical fallback name for every project", () => {
    projects.forEach((p) => {
      expect(typeof p.name).toBe("string");
      expect(p.name.trim().length).toBeGreaterThan(0);
    });
  });

  it("defines a valid internal link for each project matching its slug", () => {
    projects.forEach((p) => {
      expect(typeof p.link).toBe("string");
      expect(p.link).toBe(`/projects/${p.slug}`);
    });
  });

  it("provides an identity image/icon asset for every project", () => {
    projects.forEach((p) => {
      expect(p.img).toBeDefined();
      expect(typeof p.img).toBe("string");
      expect(p.img.length).toBeGreaterThan(0);
    });
  });

  it("defines a non-empty stack array with valid string entries for every project", () => {
    projects.forEach((p) => {
      expect(Array.isArray(p.stack)).toBe(true);
      expect(p.stack.length).toBeGreaterThan(0);
      p.stack.forEach((tech) => {
        expect(typeof tech).toBe("string");
        expect(tech.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("assigns categoryKeys as a non-empty array with supported category tokens", () => {
    const validTokens = ["web", "desktop"];
    projects.forEach((p) => {
      expect(Array.isArray(p.categoryKeys)).toBe(true);
      expect(p.categoryKeys.length).toBeGreaterThan(0);
      p.categoryKeys.forEach((key) => {
        expect(validTokens).toContain(key);
      });
    });
  });

  it("defines valid boolean featured flags and valid statusKey identifiers", () => {
    const validStatusKeys = [
      "activeLive",
      "completed",
      "completedMaintained",
      "activeLiveDemo",
    ];
    projects.forEach((p) => {
      expect(typeof p.featured).toBe("boolean");
      expect(typeof p.statusKey).toBe("string");
      expect(validStatusKeys).toContain(p.statusKey);
    });
  });

  it("ensures liveUrl and repoUrl are either valid HTTP(S) strings or null", () => {
    projects.forEach((p) => {
      if (p.liveUrl !== null) {
        expect(typeof p.liveUrl).toBe("string");
        expect(p.liveUrl).toMatch(/^https?:\/\//);
      }
      if (p.repoUrl !== null) {
        expect(typeof p.repoUrl).toBe("string");
        expect(p.repoUrl).toMatch(/^https?:\/\//);
      }
    });
  });
});

describe("Project Data Model — English & Spanish Translation Completeness", () => {
  const REQUIRED_TEXT_FIELDS = [
    "name",
    "projectType",
    "subtitle",
    "overview",
    "content",
    "problem",
    "solution",
    "verificationNote",
  ];

  const REQUIRED_CONTRIBUTION_FIELDS = [
    "role",
    "approach",
    "decisions",
    "testing",
    "outcome",
  ];

  it("contains direct translation entries for every project in both English and Spanish locale files", () => {
    projects.forEach((project) => {
      const enEntry = enProjects.items[project.slug];
      const esEntry = esProjects.items[project.slug];

      expect(enEntry, `Missing EN entry for ${project.slug}`).toBeDefined();
      expect(esEntry, `Missing ES entry for ${project.slug}`).toBeDefined();
    });
  });

  it("provides non-empty strings for all required text fields directly in English locale", () => {
    projects.forEach((project) => {
      const entry = enProjects.items[project.slug];
      REQUIRED_TEXT_FIELDS.forEach((field) => {
        const val = entry[field];
        expect(
          typeof val,
          `EN ${project.slug}.${field} must be a string`
        ).toBe("string");
        expect(
          val.trim().length,
          `EN ${project.slug}.${field} must not be empty`
        ).toBeGreaterThan(0);
      });
    });
  });

  it("provides non-empty strings for all required text fields directly in Spanish locale without fallback masking", () => {
    projects.forEach((project) => {
      const entry = esProjects.items[project.slug];
      REQUIRED_TEXT_FIELDS.forEach((field) => {
        const val = entry[field];
        expect(
          typeof val,
          `ES ${project.slug}.${field} must be defined directly in Spanish locale`
        ).toBe("string");
        expect(
          val.trim().length,
          `ES ${project.slug}.${field} must not be empty`
        ).toBeGreaterThan(0);
      });
    });
  });

  it("provides non-empty highlights arrays in both English and Spanish locales", () => {
    projects.forEach((project) => {
      const enEntry = enProjects.items[project.slug];
      const esEntry = esProjects.items[project.slug];

      expect(Array.isArray(enEntry.highlights)).toBe(true);
      expect(enEntry.highlights.length).toBeGreaterThan(0);
      enEntry.highlights.forEach((h) => {
        expect(typeof h).toBe("string");
        expect(h.trim().length).toBeGreaterThan(0);
      });

      expect(Array.isArray(esEntry.highlights)).toBe(true);
      expect(esEntry.highlights.length).toBeGreaterThan(0);
      esEntry.highlights.forEach((h) => {
        expect(typeof h).toBe("string");
        expect(h.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("provides complete contribution statements in both English and Spanish locales", () => {
    projects.forEach((project) => {
      const enContrib = enProjects.items[project.slug]?.contribution;
      const esContrib = esProjects.items[project.slug]?.contribution;

      expect(enContrib, `Missing EN contribution for ${project.slug}`).toBeDefined();
      expect(esContrib, `Missing ES contribution for ${project.slug}`).toBeDefined();

      REQUIRED_CONTRIBUTION_FIELDS.forEach((field) => {
        const enVal = enContrib[field];
        const esVal = esContrib[field];

        expect(typeof enVal, `EN ${project.slug}.contribution.${field} missing`).toBe("string");
        expect(enVal.trim().length).toBeGreaterThan(0);

        expect(typeof esVal, `ES ${project.slug}.contribution.${field} missing`).toBe("string");
        expect(esVal.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("resolves runtime translations via i18n instance without falling back to raw key strings", () => {
    projects.forEach((project) => {
      REQUIRED_TEXT_FIELDS.forEach((field) => {
        const enResolved = i18n.t(`projects:items.${project.slug}.${field}`, { lng: "en" });
        const esResolved = i18n.t(`projects:items.${project.slug}.${field}`, { lng: "es" });

        expect(enResolved).not.toContain("projects:items");
        expect(enResolved).not.toContain(`items.${project.slug}`);
        expect(enResolved.trim().length).toBeGreaterThan(0);

        expect(esResolved).not.toContain("projects:items");
        expect(esResolved).not.toContain(`items.${project.slug}`);
        expect(esResolved.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("provides distinct translations between English and Spanish for narrative fields", () => {
    projects.forEach((project) => {
      const enEntry = enProjects.items[project.slug];
      const esEntry = esProjects.items[project.slug];

      // Narrative text should not be identical in EN and ES
      expect(esEntry.overview).not.toBe(enEntry.overview);
      expect(esEntry.content).not.toBe(enEntry.content);
      expect(esEntry.problem).not.toBe(enEntry.problem);
      expect(esEntry.solution).not.toBe(enEntry.solution);
      expect(esEntry.contribution.role).not.toBe(enEntry.contribution.role);
    });
  });
});

describe("Project Data Model — Classification Integrity & Target Contract", () => {
  it("enforces categoryKeys as the single canonical machine classification", () => {
    const validTokens = ["web", "desktop"];
    projects.forEach((p) => {
      expect(Array.isArray(p.categoryKeys)).toBe(true);
      expect(p.categoryKeys.length).toBeGreaterThan(0);
      p.categoryKeys.forEach((key) => {
        expect(validTokens).toContain(key);
      });
    });
  });

  it("ensures legacy classification and title fields are removed from constants", () => {
    projects.forEach((p) => {
      expect(p.categoryKey).toBeUndefined();
      expect(p.categories).toBeUndefined();
      expect(p.category).toBeUndefined();
      expect(p.title).toBeUndefined();
    });
  });

  it("ensures duplicated prose fields are removed from constants", () => {
    projects.forEach((p) => {
      expect(p.subtitle).toBeUndefined();
      expect(p.projectType).toBeUndefined();
      expect(p.content).toBeUndefined();
      expect(p.context).toBeUndefined();
      expect(p.overview).toBeUndefined();
      expect(p.problem).toBeUndefined();
      expect(p.solution).toBeUndefined();
      expect(p.highlights).toBeUndefined();
      expect(p.contribution).toBeUndefined();
      expect(p.verificationNote).toBeUndefined();
    });
  });

  it("preserves technical classification (projectType) in both English and Spanish locale files", () => {
    projects.forEach((p) => {
      const enProjectType = enProjects.items[p.slug].projectType;
      const esProjectType = esProjects.items[p.slug].projectType;
      expect(typeof enProjectType).toBe("string");
      expect(enProjectType.trim().length).toBeGreaterThan(0);
      expect(typeof esProjectType).toBe("string");
      expect(esProjectType.trim().length).toBeGreaterThan(0);
    });
  });
});

describe("Project Data Model — HandLab Multi-Application Integrity", () => {
  const handlab = projects.find((p) => p.slug === "handlab");

  it("identifies HandLab by slug and verifies its dual-application architecture", () => {
    expect(handlab).toBeDefined();
    expect(Array.isArray(handlab.applications)).toBe(true);
    expect(handlab.applications.length).toBe(2);
  });

  it("verifies unique application IDs for HandLab online and desktop components", () => {
    const appIds = handlab.applications.map((a) => a.id);
    expect(appIds).toEqual(["handlab-online", "handlab-desktop"]);
  });

  it("verifies HandLab Online exposes the approved live URL in structural data", () => {
    const onlineApp = handlab.applications.find((a) => a.id === "handlab-online");
    expect(onlineApp).toBeDefined();
    expect(onlineApp.liveUrl).toBe("https://www.handlab.uk/");
  });

  it("verifies HandLab Desktop does not expose a live URL in structural data", () => {
    const desktopApp = handlab.applications.find((a) => a.id === "handlab-desktop");
    expect(desktopApp).toBeDefined();
    expect(desktopApp.liveUrl).toBeNull();
  });

  it("ensures HandLab applications in constants contain only structural data", () => {
    handlab.applications.forEach((app) => {
      expect(app.name).toBeUndefined();
      expect(app.badge).toBeUndefined();
      expect(app.status).toBeUndefined();
      expect(app.description).toBeUndefined();
      expect(app.capabilities).toBeUndefined();
      expect(app.ctaLabel).toBeUndefined();
    });
  });

  it("verifies HandLab application translations exist in both English and Spanish locale files", () => {
    const enApps = enProjects.items.handlab?.applications;
    const esApps = esProjects.items.handlab?.applications;

    expect(enApps).toBeDefined();
    expect(esApps).toBeDefined();
    expect(enApps["handlab-online"]).toBeDefined();
    expect(enApps["handlab-desktop"]).toBeDefined();
    expect(esApps["handlab-online"]).toBeDefined();
    expect(esApps["handlab-desktop"]).toBeDefined();
  });

  it("verifies required fields for all HandLab applications in English", () => {
    const enApps = enProjects.items.handlab.applications;
    ["handlab-online", "handlab-desktop"].forEach((appId) => {
      const app = enApps[appId];
      expect(typeof app.name).toBe("string");
      expect(app.name.trim().length).toBeGreaterThan(0);
      expect(typeof app.badge).toBe("string");
      expect(app.badge.trim().length).toBeGreaterThan(0);
      expect(typeof app.status).toBe("string");
      expect(app.status.trim().length).toBeGreaterThan(0);
      expect(typeof app.description).toBe("string");
      expect(app.description.trim().length).toBeGreaterThan(0);

      expect(Array.isArray(app.capabilities)).toBe(true);
      expect(app.capabilities.length).toBeGreaterThanOrEqual(2);
      app.capabilities.forEach((cap) => {
        expect(typeof cap).toBe("string");
        expect(cap.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("verifies required fields for all HandLab applications in Spanish without fallback masking", () => {
    const esApps = esProjects.items.handlab.applications;
    ["handlab-online", "handlab-desktop"].forEach((appId) => {
      const app = esApps[appId];
      expect(typeof app.name).toBe("string");
      expect(app.name.trim().length).toBeGreaterThan(0);
      expect(typeof app.badge).toBe("string");
      expect(app.badge.trim().length).toBeGreaterThan(0);
      expect(typeof app.status).toBe("string");
      expect(app.status.trim().length).toBeGreaterThan(0);
      expect(typeof app.description).toBe("string");
      expect(app.description.trim().length).toBeGreaterThan(0);

      expect(Array.isArray(app.capabilities)).toBe(true);
      expect(app.capabilities.length).toBeGreaterThanOrEqual(2);
      app.capabilities.forEach((cap) => {
        expect(typeof cap).toBe("string");
        expect(cap.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("verifies localized CTA labels for HandLab Online and null/undefined for Desktop", () => {
    const enApps = enProjects.items.handlab.applications;
    const esApps = esProjects.items.handlab.applications;

    expect(enApps["handlab-online"].ctaLabel).toBe("Visit HandLab Online ↗");
    expect(esApps["handlab-online"].ctaLabel).toBe("Visitar HandLab Online ↗");

    expect(enApps["handlab-desktop"].ctaLabel).toBeUndefined();
    expect(esApps["handlab-desktop"].ctaLabel).toBeUndefined();
  });
});

describe("Project Data Model — Terminal Localisation & Data Flow", () => {
  it("localizes 'projects' listing in Spanish without English category fallbacks", () => {
    const res = executeCommand("projects", {
      t: (key, opts = {}) => i18n.t(key, { ...opts, lng: "es" }),
      language: "es",
    });
    expect(res.type).toBe("projects_list");
    const handlab = res.data.projects.find((p) => p.slug === "handlab");
    expect(handlab).toBeDefined();
    expect(handlab.category).toBe("Aplicación Web");
  });

  it("localizes 'projects handlab' summary in Spanish using the active locale", () => {
    const res = executeCommand("projects handlab", {
      t: (key, opts = {}) => i18n.t(key, { ...opts, lng: "es" }),
      language: "es",
    });
    expect(res.type).toBe("project_detail");
    expect(res.data.name).toBe("HandLab");
    expect(res.data.category).toBe("Aplicación Web");
    expect(res.data.summary).toContain("ecosistema integral de estudio de poker");
    expect(res.data.detailRoute).toBe("/es/projects/handlab");
  });

  it("formats 'projects handlab' summary in English when language is English", () => {
    const res = executeCommand("projects handlab", {
      t: (key, opts = {}) => i18n.t(key, { ...opts, lng: "en" }),
      language: "en",
    });
    expect(res.type).toBe("project_detail");
    expect(res.data.name).toBe("HandLab");
    expect(res.data.category).toBe("Web Application");
    expect(res.data.summary).toContain("poker study ecosystem");
    expect(res.data.detailRoute).toBe("/projects/handlab");
  });
});

describe("Project Data Model — Locale Key Consistency", () => {
  it("maintains a 1-to-1 mapping between constants project slugs and locale item keys", () => {
    const projectSlugs = projects.map((p) => p.slug).sort();
    const enSlugs = Object.keys(enProjects.items).sort();
    const esSlugs = Object.keys(esProjects.items).sort();

    expect(enSlugs).toEqual(projectSlugs);
    expect(esSlugs).toEqual(projectSlugs);
  });

  it("ensures no project item translation in en/es evaluates to an empty string", () => {
    [
      { lang: "en", bundle: enProjects },
      { lang: "es", bundle: esProjects },
    ].forEach(({ lang, bundle }) => {
      Object.entries(bundle.items).forEach(([slug, entry]) => {
        Object.entries(entry).forEach(([key, val]) => {
          if (typeof val === "string") {
            expect(
              val.trim().length,
              `${lang} item ${slug}.${key} should not be an empty string`
            ).toBeGreaterThan(0);
          }
        });
      });
    });
  });

  it("ensures common category badges are available for all categoryKeys", () => {
    const enCommon = resources.en.common;
    const esCommon = resources.es.common;

    const allKeys = new Set(projects.flatMap((p) => p.categoryKeys));
    allKeys.forEach((key) => {
      expect(
        enCommon.categories?.[key],
        `EN common.categories.${key} must be defined`
      ).toBeDefined();
      expect(
        esCommon.categories?.[key],
        `ES common.categories.${key} must be defined`
      ).toBeDefined();
    });
  });
});

describe("Project Status Badge Localisation (Stage 6D)", () => {
  const CANONICAL_STATUS_KEYS = [
    "activeLive",
    "completed",
    "completedMaintained",
    "activeLiveDemo",
  ];

  const EXPECTED_STATUS_LABELS = {
    "portfolio-website": {
      key: "activeLive",
      en: "Active / Live",
      es: "Activo / En Producción",
    },
    "call-progress-tracker": {
      key: "completed",
      en: "Completed",
      es: "Completado",
    },
    "poker-strategy-display": {
      key: "completed",
      en: "Completed",
      es: "Completado",
    },
    "smart-file-organizer": {
      key: "completedMaintained",
      en: "Completed / Maintained",
      es: "Completado / En Mantenimiento",
    },
    "ascension-tactics": {
      key: "activeLiveDemo",
      en: "Active / Live Demo",
      es: "Activo / Demostración",
    },
    handlab: {
      key: "activeLiveDemo",
      en: "Active / Live Demo",
      es: "Activo / Demostración",
    },
  };

  afterEach(() => {
    i18n.changeLanguage("en");
  });

  it("assigns every project a valid statusKey from the canonical status set", () => {
    projects.forEach((p) => {
      expect(typeof p.statusKey).toBe("string");
      expect(CANONICAL_STATUS_KEYS).toContain(p.statusKey);
    });
  });

  it("ensures every project's statusKey exists in raw en/common.json without runtime fallback", () => {
    const rawEnBadges = enCommon.badges;
    expect(rawEnBadges).toBeDefined();

    projects.forEach((p) => {
      const label = rawEnBadges[p.statusKey];
      expect(
        typeof label,
        `Raw EN common.json missing badge key '${p.statusKey}' for ${p.slug}`
      ).toBe("string");
      expect(label.trim().length).toBeGreaterThan(0);
    });
  });

  it("ensures every project's statusKey exists in raw es/common.json without runtime fallback", () => {
    const rawEsBadges = esCommon.badges;
    expect(rawEsBadges).toBeDefined();

    projects.forEach((p) => {
      const label = rawEsBadges[p.statusKey];
      expect(
        typeof label,
        `Raw ES common.json missing badge key '${p.statusKey}' for ${p.slug}`
      ).toBe("string");
      expect(label.trim().length).toBeGreaterThan(0);
      // Verify Spanish is an actual translation, not an accidental copy of the English text
      expect(label).not.toBe(enCommon.badges[p.statusKey]);
    });
  });

  it("ensures the badge translation key sets match between English and Spanish common.json", () => {
    const enBadgeKeys = Object.keys(enCommon.badges).sort();
    const esBadgeKeys = Object.keys(esCommon.badges).sort();
    expect(esBadgeKeys).toEqual(enBadgeKeys);

    CANONICAL_STATUS_KEYS.forEach((key) => {
      expect(enBadgeKeys).toContain(key);
      expect(esBadgeKeys).toContain(key);
    });
  });

  it("resolves each project's status badge text correctly in both English and Spanish", () => {
    projects.forEach((p) => {
      const expected = EXPECTED_STATUS_LABELS[p.slug];
      expect(expected).toBeDefined();
      expect(p.statusKey).toBe(expected.key);

      const enResolved = i18n.t(`badges.${p.statusKey}`, {
        ns: "common",
        lng: "en",
      });
      const esResolved = i18n.t(`badges.${p.statusKey}`, {
        ns: "common",
        lng: "es",
      });

      expect(enResolved).toBe(expected.en);
      expect(esResolved).toBe(expected.es);
    });
  });

  it("renders the correct localized status badge in ProjectDetail on English routes", () => {
    i18n.changeLanguage("en");

    projects.forEach((p) => {
      const expected = EXPECTED_STATUS_LABELS[p.slug];
      const html = renderToStaticMarkup(
        React.createElement(
          MemoryRouter,
          { initialEntries: [`/projects/${p.slug}`] },
          React.createElement(
            Routes,
            null,
            React.createElement(Route, {
              path: "/projects/:slug",
              element: React.createElement(ProjectDetail, { projectSlug: p.slug }),
            })
          )
        )
      );

      expect(html).toContain(expected.en);
      expect(html).not.toContain(expected.es);
    });
  });

  it("renders the correct localized status badge in ProjectDetail on Spanish routes", () => {
    i18n.changeLanguage("es");

    projects.forEach((p) => {
      const expected = EXPECTED_STATUS_LABELS[p.slug];
      const html = renderToStaticMarkup(
        React.createElement(
          MemoryRouter,
          { initialEntries: [`/es/projects/${p.slug}`] },
          React.createElement(
            Routes,
            null,
            React.createElement(Route, {
              path: "/es/projects/:slug",
              element: React.createElement(ProjectDetail, { projectSlug: p.slug }),
            })
          )
        )
      );

      // Must display Spanish label
      expect(html).toContain(expected.es);
      // Must NOT fall back to English label
      expect(html).not.toContain(expected.en);
    });
  });

  it("does not render a status badge when statusKey is invalid or missing", () => {
    i18n.changeLanguage("es");

    const html = renderToStaticMarkup(
      React.createElement(
        MemoryRouter,
        { initialEntries: ["/es/projects/non-existent"] },
        React.createElement(
          Routes,
          null,
          React.createElement(Route, {
            path: "/es/projects/:slug",
            element: React.createElement(ProjectDetail, {
              projectSlug: "non-existent",
            }),
          })
        )
      )
    );

    // Renders error page for non-existent project
    expect(html).not.toContain("badges.");
  });

  it("verifies HandLab sub-application statuses remain localized and independent of top-level statusKey", () => {
    const enHandLabApps = enProjects.items.handlab.applications;
    const esHandLabApps = esProjects.items.handlab.applications;

    expect(enHandLabApps["handlab-online"].status).toBe("Publicly Available");
    expect(esHandLabApps["handlab-online"].status).toBe("Disponible Públicamente");

    expect(enHandLabApps["handlab-desktop"].status).toBe("Private Development");
    expect(esHandLabApps["handlab-desktop"].status).toBe("Desarrollo Privado");

    const handlabProject = projects.find((p) => p.slug === "handlab");
    expect(handlabProject.statusKey).toBe("activeLiveDemo");
    handlabProject.applications.forEach((subApp) => {
      expect(subApp.statusKey).toBeUndefined();
      expect(subApp.status).toBeUndefined();
    });
  });

  it("confirms ProjectCard does not render status badges, preserving summary presentation", () => {
    projects.forEach((p) => {
      const html = renderToStaticMarkup(
        React.createElement(
          MemoryRouter,
          { initialEntries: ["/projects"] },
          React.createElement(ProjectCard, { ...p })
        )
      );

      const expected = EXPECTED_STATUS_LABELS[p.slug];
      // ProjectCard renders category tags, but not status badge strings
      expect(html).not.toContain(expected.en);
      expect(html).not.toContain(expected.es);
    });
  });
});
