import { describe, it, expect } from "vitest";
import {
  isSpanishPath,
  getLanguageFromPath,
  stripLanguagePrefix,
  localizePath,
} from "./language";

describe("language utilities — Language detection", () => {
  it("detects English for root and standard paths", () => {
    expect(isSpanishPath("/")).toBe(false);
    expect(isSpanishPath("/about")).toBe(false);
    expect(isSpanishPath("/projects")).toBe(false);
    expect(isSpanishPath("/projects/call-progress-tracker")).toBe(false);
    expect(isSpanishPath("/terminal")).toBe(false);
    expect(isSpanishPath("/contact")).toBe(false);
  });

  it("detects Spanish for '/es' root and nested subpaths", () => {
    expect(isSpanishPath("/es")).toBe(true);
    expect(isSpanishPath("/es/")).toBe(true);
    expect(isSpanishPath("/es/about")).toBe(true);
    expect(isSpanishPath("/es/projects")).toBe(true);
    expect(isSpanishPath("/es/projects/call-progress-tracker")).toBe(true);
    expect(isSpanishPath("/es/terminal")).toBe(true);
    expect(isSpanishPath("/es/contact")).toBe(true);
  });

  it("detects Spanish when query parameters or hashes are attached", () => {
    expect(isSpanishPath("/es?ref=nav")).toBe(true);
    expect(isSpanishPath("/es#capabilities")).toBe(true);
    expect(isSpanishPath("/es/projects?filter=web#list")).toBe(true);
  });

  it("avoids false positives on words starting with 'es'", () => {
    expect(isSpanishPath("/essential")).toBe(false);
    expect(isSpanishPath("/escape")).toBe(false);
    expect(isSpanishPath("/estate-planning")).toBe(false);
    expect(isSpanishPath("/es-preview")).toBe(false);
  });

  it("safely handles null, undefined, or empty values", () => {
    expect(isSpanishPath("")).toBe(false);
    expect(isSpanishPath(null)).toBe(false);
    expect(isSpanishPath(undefined)).toBe(false);
  });

  it("returns correct language code via getLanguageFromPath", () => {
    expect(getLanguageFromPath("/")).toBe("en");
    expect(getLanguageFromPath("/about")).toBe("en");
    expect(getLanguageFromPath("/es")).toBe("es");
    expect(getLanguageFromPath("/es/projects")).toBe("es");
  });
});

describe("language utilities — Strip language prefix (stripLanguagePrefix)", () => {
  it("strips '/es' prefix returning canonical English path", () => {
    expect(stripLanguagePrefix("/es")).toBe("/");
    expect(stripLanguagePrefix("/es/")).toBe("/");
    expect(stripLanguagePrefix("/es/about")).toBe("/about");
    expect(stripLanguagePrefix("/es/projects")).toBe("/projects");
    expect(stripLanguagePrefix("/es/projects/portfolio-website")).toBe("/projects/portfolio-website");
  });

  it("preserves query strings and hashes when stripping prefix", () => {
    expect(stripLanguagePrefix("/es?filter=web")).toBe("/?filter=web");
    expect(stripLanguagePrefix("/es#section")).toBe("/#section");
    expect(stripLanguagePrefix("/es/projects?page=2#grid")).toBe("/projects?page=2#grid");
  });

  it("returns English paths unmodified", () => {
    expect(stripLanguagePrefix("/")).toBe("/");
    expect(stripLanguagePrefix("/about")).toBe("/about");
    expect(stripLanguagePrefix("/projects/smart-file-organizer")).toBe("/projects/smart-file-organizer");
  });
});

describe("language utilities — URL Localisation (localizePath)", () => {
  describe("Localising to Spanish (targetIsSpanish = true)", () => {
    it("localises root path to '/es'", () => {
      expect(localizePath("/", true)).toBe("/es");
    });

    it("localises top-level nested paths", () => {
      expect(localizePath("/about", true)).toBe("/es/about");
      expect(localizePath("/projects", true)).toBe("/es/projects");
      expect(localizePath("/terminal", true)).toBe("/es/terminal");
      expect(localizePath("/contact", true)).toBe("/es/contact");
    });

    it("localises project detail routes", () => {
      expect(localizePath("/projects/call-progress-tracker", true)).toBe(
        "/es/projects/call-progress-tracker"
      );
      expect(localizePath("/projects/portfolio-website", true)).toBe(
        "/es/projects/portfolio-website"
      );
    });

    it("preserves query strings and hash fragments", () => {
      expect(localizePath("/#capabilities", true)).toBe("/es#capabilities");
      expect(localizePath("/projects?filter=web", true)).toBe("/es/projects?filter=web");
      expect(localizePath("/projects/handlab?tab=code#repo", true)).toBe(
        "/es/projects/handlab?tab=code#repo"
      );
    });

    it("avoids double-prefixing if already Spanish", () => {
      expect(localizePath("/es", true)).toBe("/es");
      expect(localizePath("/es/about", true)).toBe("/es/about");
      expect(localizePath("/es/projects/call-progress-tracker", true)).toBe(
        "/es/projects/call-progress-tracker"
      );
      expect(localizePath("/es/projects?filter=web", true)).toBe("/es/projects?filter=web");
    });
  });

  describe("Localising to English (targetIsSpanish = false)", () => {
    it("localises '/es' root back to '/'", () => {
      expect(localizePath("/es", false)).toBe("/");
    });

    it("strips Spanish prefix from top-level nested paths", () => {
      expect(localizePath("/es/about", false)).toBe("/about");
      expect(localizePath("/es/projects", false)).toBe("/projects");
      expect(localizePath("/es/terminal", false)).toBe("/terminal");
      expect(localizePath("/es/contact", false)).toBe("/contact");
    });

    it("strips Spanish prefix from project detail paths", () => {
      expect(localizePath("/es/projects/call-progress-tracker", false)).toBe(
        "/projects/call-progress-tracker"
      );
    });

    it("preserves query strings and hashes when localising to English", () => {
      expect(localizePath("/es#capabilities", false)).toBe("/#capabilities");
      expect(localizePath("/es?ref=banner", false)).toBe("/?ref=banner");
      expect(localizePath("/es/projects?filter=desktop#list", false)).toBe(
        "/projects?filter=desktop#list"
      );
    });

    it("keeps already English paths untouched", () => {
      expect(localizePath("/", false)).toBe("/");
      expect(localizePath("/about", false)).toBe("/about");
      expect(localizePath("/projects/ascension-tactics", false)).toBe(
        "/projects/ascension-tactics"
      );
    });
  });

  describe("External URLs and edge cases", () => {
    it("leaves external URLs unmodified", () => {
      expect(localizePath("https://github.com/46lemonlime", true)).toBe(
        "https://github.com/46lemonlime"
      );
      expect(localizePath("https://linkedin.com/in/jpplazasanchez", false)).toBe(
        "https://linkedin.com/in/jpplazasanchez"
      );
      expect(localizePath("http://example.com/page", true)).toBe(
        "http://example.com/page"
      );
      expect(localizePath("mailto:contact@jsondev.uk", true)).toBe(
        "mailto:contact@jsondev.uk"
      );
      expect(localizePath("tel:+44123456789", true)).toBe("tel:+44123456789");
    });

    it("leaves protocol-relative and relative asset paths unmodified", () => {
      expect(localizePath("//cdn.example.com/asset.js", true)).toBe(
        "//cdn.example.com/asset.js"
      );
      expect(localizePath("cv.pdf", true)).toBe("cv.pdf");
      expect(localizePath("images/photo.jpg", true)).toBe("images/photo.jpg");
    });

    it("safely handles null, undefined, or empty path inputs", () => {
      expect(localizePath("", true)).toBe("");
      expect(localizePath(null, true)).toBeNull();
      expect(localizePath(undefined, true)).toBeUndefined();
    });
  });
});
