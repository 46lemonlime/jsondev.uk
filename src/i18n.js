/**
 * @file src/i18n.js
 * @description Central internationalisation configuration using i18next and react-i18next.
 * Configures locally bundled language resources with English default and fallback,
 * while language state is driven authoritatively by the URL path.
 * @responsibility Initialize and export configured i18next instance.
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import esCommon from "./locales/es/common.json";
import enHome from "./locales/en/home.json";
import esHome from "./locales/es/home.json";
import enAbout from "./locales/en/about.json";
import esAbout from "./locales/es/about.json";
import enProjects from "./locales/en/projects.json";
import esProjects from "./locales/es/projects.json";
import enContact from "./locales/en/contact.json";
import esContact from "./locales/es/contact.json";
import enTerminal from "./locales/en/terminal.json";
import esTerminal from "./locales/es/terminal.json";
import enErrors from "./locales/en/errors.json";
import esErrors from "./locales/es/errors.json";

export const defaultNS = "common";
export const resources = {
  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    projects: enProjects,
    terminal: enTerminal,
    contact: enContact,
    errors: enErrors,
  },
  es: {
    common: esCommon,
    home: esHome,
    about: esAbout,
    projects: esProjects,
    terminal: esTerminal,
    contact: esContact,
    errors: esErrors,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  defaultNS,
  ns: ["common", "home", "about", "projects", "terminal", "contact", "errors"],
  interpolation: {
    escapeValue: false, // React handles XSS escaping safely
  },
  react: {
    useSuspense: false, // Static in-memory resources do not require suspense boundaries
  },
});

export default i18n;
