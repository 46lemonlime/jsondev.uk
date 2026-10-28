/**
 * @file src/assets/index.js
 * @description Centralized export registry for application assets, including brand graphics,
 * icons, images, and document resources.
 * @responsibility Consolidate and export only active static assets used across the portfolio.
 */

// Brand Assets
import logo from "./brand/logoSmall.png";

// Documents
import cv from "./cv.pdf";

// Profile & Visual Page Hero Illustrations
import heroIllustration from "./images/hero_pixel_workbench.jpg";
import projectsHero from "./images/projects_hero.svg";
import error_img from "./images/404.svg";
import aboutme from "./images/aboutme.svg";
import contactIllustration from "./images/contact_illustration.svg";
import location from "./images/location.png";

// General Section & Feature Icons
import quotes from "./icons/quotes.svg";
import rubik from "./icons/rubik.svg";
import books from "./icons/books.svg";
import setup from "./icons/setup.svg";
import menu from "./icons/menu.svg";
import close from "./icons/close.svg";
import arrowUp from "./icons/arrow-up.svg";
import webdev from "./icons/webdev.svg";

// Dedicated Project Identity Icons (Square 36x36 card badge / 44x44 detail badge)
import calltracker from "./icons/call_progress_tracker.svg";
import pokerdisplay from "./icons/poker_strat_display.svg";
import portfolioweb from "./icons/portfolio_web.svg";
import smartfileorganizer from "./icons/smart_file_organizer.svg";
import ascensiontactics from "./icons/ascension_tactics.svg";
import handlab from "./icons/handlab.svg";

// Social & Community Icons
import github from "./icons/github.svg";
import linkedin from "./icons/linkedin.svg";
import twitter from "./icons/twitter.svg";
import kofi from "./icons/ko-fi.svg";
import buymeacoffee from "./icons/buymeacoffee.svg";
import notionBlack from "./icons/notionBlack.svg";

export {
  logo,
  cv,
  heroIllustration,
  projectsHero,
  projectsHero as project00,
  error_img,
  aboutme,
  contactIllustration,
  contactIllustration as chat,
  location,
  quotes,
  rubik,
  books,
  setup,
  menu,
  close,
  arrowUp,
  webdev,
  calltracker,
  pokerdisplay,
  portfolioweb,
  smartfileorganizer,
  ascensiontactics,
  handlab,
  github,
  linkedin,
  twitter,
  kofi,
  buymeacoffee,
  notionBlack,
};
