import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import "../../i18n";
import i18next from "i18next";
import Contact from "./index";
import ContactForm, { formatDraftMessage } from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";

const renderWithRouter = (element) => {
  return renderToStaticMarkup(
    React.createElement(MemoryRouter, null, element)
  );
};

describe("Contact Page Composition & Separation of Concerns", () => {
  describe("ContactForm Independence", () => {
    it("renders independently as a form element without embedding ContactInfo or aside", () => {
      const html = renderWithRouter(React.createElement(ContactForm));

      // Must render a form
      expect(html).toContain("<form");
      expect(html).toContain("</form>");

      // Must NOT contain the aside or verified contact info container
      expect(html).not.toContain("<aside");
      expect(html).not.toContain("Verified Contact Information");
      expect(html).not.toContain("info.title");
    });

    it("contains all standard form controls and inputs", () => {
      const html = renderWithRouter(React.createElement(ContactForm));

      expect(html).toContain('id="contact-name"');
      expect(html).toContain('id="contact-email"');
      expect(html).toContain('id="contact-phone"');
      expect(html).toContain('id="contact-subject"');
      expect(html).toContain('id="contact-message"');
      expect(html).toContain('type="submit"');
    });

    it("applies customizable or default container classes", () => {
      const defaultHtml = renderWithRouter(React.createElement(ContactForm));
      expect(defaultHtml).toContain("lg:col-span-7 flex flex-col gap-5 w-full");

      const customHtml = renderWithRouter(
        React.createElement(ContactForm, { className: "custom-form-class" })
      );
      expect(customHtml).toContain("custom-form-class");
      expect(customHtml).not.toContain("lg:col-span-7");
    });
  });

  describe("ContactInfo Independence", () => {
    it("renders independently as an aside element with verified channels", () => {
      const html = renderWithRouter(React.createElement(ContactInfo));

      expect(html).toContain("<aside");
      expect(html).toContain('aria-label="Verified Contact Information"');
      expect(html).toContain("linkedin.com/in/jpplazasanchez");
      expect(html).toContain("github.com/46lemonlime");
      expect(html).not.toContain("<form");
    });

    it("applies customizable or default container classes", () => {
      const defaultHtml = renderWithRouter(React.createElement(ContactInfo));
      expect(defaultHtml).toContain("lg:col-span-5 flex flex-col gap-6 w-full");

      const customHtml = renderWithRouter(
        React.createElement(ContactInfo, { className: "custom-info-class" })
      );
      expect(customHtml).toContain("custom-info-class");
      expect(customHtml).not.toContain("lg:col-span-5");
    });
  });

  describe("Contact Page Composition", () => {
    it("composes ContactForm and ContactInfo side-by-side in the layout grid", () => {
      const html = renderWithRouter(React.createElement(Contact));

      // Contains the section wrapper and heading
      expect(html).toContain('aria-labelledby="contact-form-heading"');
      expect(html).toContain('id="contact-form-heading"');

      // Contains the 12-column responsive layout grid
      expect(html).toContain("grid grid-cols-1 lg:grid-cols-12 gap-10 items-start");

      // Composes both the form and the aside inside the same page
      expect(html).toContain("<form");
      expect(html).toContain("<aside");
      expect(html).toContain("Verified Contact Information");
    });

    it("renders hero section with telemetry badge and action buttons", () => {
      const html = renderWithRouter(React.createElement(Contact));

      expect(html).toContain("https://www.linkedin.com/in/jpplazasanchez/");
      expect(html).toContain("https://github.com/46lemonlime");
      expect(html).toContain("<h1");
    });
  });

  describe("Draft Message Formatting (formatDraftMessage)", () => {
    it("formats a complete draft message with all fields", () => {
      const values = {
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "+44 7700 900077",
        subject: "role",
        message: "We would love to discuss a full stack role with you.",
      };

      const t = (key) => {
        const translations = {
          "form.subjectOptions.role": "Software Developer role / recruitment",
          "form.draftHeaders.subject": "Subject",
          "form.draftHeaders.from": "From",
          "form.draftHeaders.phone": "Phone",
        };
        return translations[key] || key;
      };

      const draft = formatDraftMessage(values, t);

      expect(draft).toContain("Subject: Software Developer role / recruitment");
      expect(draft).toContain("From: Jane Doe <jane@example.com>");
      expect(draft).toContain("Phone: +44 7700 900077");
      expect(draft).toContain("We would love to discuss a full stack role with you.");
    });

    it("omits phone line when phone number is not provided", () => {
      const values = {
        name: "John Smith",
        email: "john@example.com",
        phone: "",
        subject: "collaboration",
        message: "Interested in collaborating on an open source project.",
      };

      const tEn = i18next.getFixedT("en", "contact");
      const draft = formatDraftMessage(values, tEn);

      expect(draft).not.toContain("Phone:");
      expect(draft).toContain("From: John Smith <john@example.com>");
      expect(draft).toContain("Interested in collaborating on an open source project.");
    });

    it("supports Spanish translation lookups", () => {
      const values = {
        name: "Carlos Sanchez",
        email: "carlos@example.es",
        phone: "+34 600 000 000",
        subject: "project",
        message: "Hola, me gustaría hacer una consulta sobre un proyecto.",
      };

      const tEs = i18next.getFixedT("es", "contact");
      const draft = formatDraftMessage(values, tEs);

      expect(draft).toContain(tEs("form.draftHeaders.subject"));
      expect(draft).toContain(tEs("form.subjectOptions.project"));
      expect(draft).toContain("Carlos Sanchez <carlos@example.es>");
      expect(draft).toContain(tEs("form.draftHeaders.phone"));
    });
  });
});
