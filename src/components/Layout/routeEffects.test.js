import { describe, it, expect, vi } from "vitest";
import { handleScrollToTop } from "./ScrollToTop";
import { syncLanguageWithRoute } from "./LanguageSync";
import { syncRouteSEO } from "./SEOSync";
import { resolveSEOMetadata } from "./seo";

describe("Route-Level Effects — Viewport Scrolling (ScrollToTop)", () => {
  it("invokes the scroll function with coordinates (0, 0)", () => {
    const mockScrollTo = vi.fn();
    handleScrollToTop(mockScrollTo);
    expect(mockScrollTo).toHaveBeenCalledTimes(1);
    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("handles missing scroll implementation gracefully without throwing", () => {
    expect(() => handleScrollToTop(null)).not.toThrow();
    expect(() => handleScrollToTop(undefined)).not.toThrow();
  });
});

describe("Route-Level Effects — Language Synchronisation (LanguageSync)", () => {
  it("changes i18n language to Spanish when route is Spanish and i18n is English", () => {
    const mockI18n = {
      language: "en",
      changeLanguage: vi.fn((lang) => {
        mockI18n.language = lang;
      }),
    };

    const changed = syncLanguageWithRoute("es", mockI18n);
    expect(changed).toBe(true);
    expect(mockI18n.changeLanguage).toHaveBeenCalledWith("es");
    expect(mockI18n.language).toBe("es");
  });

  it("changes i18n language to English when route is English and i18n is Spanish", () => {
    const mockI18n = {
      language: "es",
      changeLanguage: vi.fn((lang) => {
        mockI18n.language = lang;
      }),
    };

    const changed = syncLanguageWithRoute("en", mockI18n);
    expect(changed).toBe(true);
    expect(mockI18n.changeLanguage).toHaveBeenCalledWith("en");
    expect(mockI18n.language).toBe("en");
  });

  it("skips calling changeLanguage when i18n is already in sync with target language", () => {
    const mockI18n = {
      language: "en",
      changeLanguage: vi.fn(),
    };

    const changed = syncLanguageWithRoute("en", mockI18n);
    expect(changed).toBe(false);
    expect(mockI18n.changeLanguage).not.toHaveBeenCalled();
  });

  it("safely handles null or undefined i18n instances", () => {
    expect(syncLanguageWithRoute("en", null)).toBe(false);
    expect(syncLanguageWithRoute("en", {})).toBe(false);
  });
});

describe("Route-Level Effects — SEO Metadata Synchronisation (SEOSync)", () => {
  it("delegates pathname and lang to resolver and passes metadata to applier", () => {
    const mockResolver = vi.fn((pathname, lang) => ({
      title: "Test Title",
      description: "Test Desc",
      pathname,
      lang,
    }));
    const mockApplier = vi.fn();

    const result = syncRouteSEO("/projects", "es", mockResolver, mockApplier);

    expect(mockResolver).toHaveBeenCalledWith("/projects", "es");
    expect(mockApplier).toHaveBeenCalledWith(result);
    expect(result).toEqual({
      title: "Test Title",
      description: "Test Desc",
      pathname: "/projects",
      lang: "es",
    });
  });

  it("resolves English metadata accurately against real resolveSEOMetadata", () => {
    const mockApplier = vi.fn();
    const metaAboutEn = syncRouteSEO("/about", "en", resolveSEOMetadata, mockApplier);

    expect(metaAboutEn.lang).toBe("en");
    expect(metaAboutEn.canonicalUrl).toBe("https://www.jsondev.uk/about");
    expect(metaAboutEn.enUrl).toBe("https://www.jsondev.uk/about");
    expect(metaAboutEn.esUrl).toBe("https://www.jsondev.uk/es/about");
    expect(metaAboutEn.is404).toBe(false);
    expect(mockApplier).toHaveBeenCalledWith(metaAboutEn);
  });

  it("resolves Spanish metadata accurately against real resolveSEOMetadata", () => {
    const mockApplier = vi.fn();
    const metaAboutEs = syncRouteSEO("/es/about", "es", resolveSEOMetadata, mockApplier);

    expect(metaAboutEs.lang).toBe("es");
    expect(metaAboutEs.canonicalUrl).toBe("https://www.jsondev.uk/es/about");
    expect(metaAboutEs.enUrl).toBe("https://www.jsondev.uk/about");
    expect(metaAboutEs.esUrl).toBe("https://www.jsondev.uk/es/about");
    expect(metaAboutEs.is404).toBe(false);
    expect(mockApplier).toHaveBeenCalledWith(metaAboutEs);
  });

  it("resolves project detail routes accurately with localized canonical URLs", () => {
    const mockApplier = vi.fn();
    const metaProj = syncRouteSEO(
      "/projects/call-progress-tracker",
      "en",
      resolveSEOMetadata,
      mockApplier
    );

    expect(metaProj.is404).toBe(false);
    expect(metaProj.canonicalUrl).toBe(
      "https://www.jsondev.uk/projects/call-progress-tracker"
    );
    expect(metaProj.esUrl).toBe(
      "https://www.jsondev.uk/es/projects/call-progress-tracker"
    );
  });

  it("resolves 404 metadata with noindex flags for unknown routes", () => {
    const mockApplier = vi.fn();
    const meta404 = syncRouteSEO(
      "/unknown-route",
      "en",
      resolveSEOMetadata,
      mockApplier
    );

    expect(meta404.is404).toBe(true);
    expect(meta404.enUrl).toBeNull();
    expect(meta404.esUrl).toBeNull();
  });
});
