/**
 * @file src/components/Layout/Navbar.jsx
 * @description Accessible primary navigation component supporting desktop links, CV download,
 * language switcher (EN / ES), and mobile slide-out drawer with keyboard Escape and route transition handling.
 * @responsibility Present site logo, main navigation routes, language switcher, mobile hamburger drawer, and resume action.
 */

import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "../../style";
import { close, logo, menu, cv } from "../../assets";
import { navLinks } from "../../constants";

/**
 * Mapping from base path to translation key in common.json under "nav".
 */
const NAV_KEYS = {
  "/": "home",
  "/projects": "projects",
  "/about": "about",
  "/contact": "contact",
};

/**
 * Accessible segmented button for toggling between English and Spanish.
 */
const LanguageSwitcher = ({ isSpanish, onLanguageChange, t, className = "" }) => (
  <div
    role="group"
    aria-label={t("nav.languageSwitcher")}
    className={`inline-flex items-center p-0.5 rounded-lg bg-surfaceElevated border border-borderSubtle font-mono text-[12px] ${className}`}
  >
    <button
      type="button"
      onClick={() => onLanguageChange("en")}
      aria-pressed={!isSpanish}
      className={`px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer ${
        !isSpanish
          ? "bg-surface text-accent font-semibold shadow-sm border border-borderSubtle"
          : "text-textSecondary hover:text-textPrimary"
      }`}
    >
      EN
    </button>
    <button
      type="button"
      onClick={() => onLanguageChange("es")}
      aria-pressed={isSpanish}
      className={`px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer ${
        isSpanish
          ? "bg-surface text-accent font-semibold shadow-sm border border-borderSubtle"
          : "text-textSecondary hover:text-textPrimary"
      }`}
    >
      ES
    </button>
  </div>
);

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { pathname } = location;
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");

  // Close mobile drawer automatically on route transition
  useEffect(() => {
    setToggle(false);
  }, [pathname]);

  // Support closing mobile drawer via Escape key for keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && toggle) {
        setToggle(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  const handleLanguageChange = (targetLang) => {
    if (
      (targetLang === "es" && isSpanish) ||
      (targetLang === "en" && !isSpanish)
    ) {
      return;
    }

    let newPathname;
    if (targetLang === "es") {
      newPathname = pathname === "/" ? "/es" : `/es${pathname}`;
    } else {
      const stripped = pathname.replace(/^\/es/, "");
      newPathname = stripped === "" ? "/" : stripped;
    }

    navigate({
      pathname: newPathname,
      search: location.search,
      hash: location.hash,
    });
  };

  /**
   * Resolves the localized target path for a navigation item.
   */
  const getLocalizedLink = (basePath) => {
    if (!isSpanish) return basePath;
    return basePath === "/" ? "/es" : `/es${basePath}`;
  };

  return (
    <nav
      aria-label="Primary Navigation"
      className="w-full flex py-4 justify-between items-center navbar relative"
    >
      {/* Brand Logo */}
      <Link
        to={isSpanish ? "/es" : "/"}
        className="inline-flex items-center gap-2 focus-visible:rounded-md"
        aria-label="JsonDev Home"
      >
        <img
          src={logo}
          alt="JsonDev"
          width="120"
          height="40"
          className="w-[120px] h-[40px] object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden items-center gap-6">
        <ul className="list-none flex justify-end items-center gap-8">
          {navLinks.map((nav) => {
            const localizedLink = getLocalizedLink(nav.link);
            const translationKey = NAV_KEYS[nav.link];
            const title = translationKey ? t(`nav.${translationKey}`) : nav.title;

            return (
              <li key={nav.link}>
                <NavLink
                  to={localizedLink}
                  end={localizedLink === "/" || localizedLink === "/es"}
                  className={({ isActive }) =>
                    `${styles.paragraph2} navLink relative py-1 transition-colors duration-200 ${
                      isActive
                        ? "text-textPrimary font-medium navLink-active"
                        : "text-textSecondary hover:text-textPrimary"
                    }`
                  }
                >
                  {title}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Desktop Language Switcher */}
        <LanguageSwitcher
          isSpanish={isSpanish}
          onLanguageChange={handleLanguageChange}
          t={t}
        />

        <a
          href={cv}
          download="Jeison_Sanchez_CV.pdf"
          className="font-mono text-[13px] font-medium px-4 py-2 rounded-lg bg-surfaceElevated text-textPrimary border border-borderSubtle hover:border-borderAccent transition-colors duration-200"
        >
          {t("nav.downloadCv")}
        </a>
      </div>

      {/* Mobile Navigation Trigger & Drawer */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <button
          type="button"
          aria-expanded={toggle}
          aria-controls="mobile-navigation-menu"
          aria-label={toggle ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setToggle((prev) => !prev)}
          className="p-2 rounded-lg bg-surfaceElevated border border-borderSubtle text-textPrimary"
        >
          <img
            src={toggle ? close : menu}
            alt=""
            aria-hidden="true"
            className="w-[24px] h-[24px] object-contain"
          />
        </button>

        <div
          id="mobile-navigation-menu"
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-surface border border-borderSubtle shadow-card absolute top-16 right-0 my-2 min-w-[240px] rounded-xl sidebar z-50 flex-col`}
        >
          <ul className="list-none flex flex-col justify-end items-start flex-1 w-full gap-3">
            {navLinks.map((nav) => {
              const localizedLink = getLocalizedLink(nav.link);
              const translationKey = NAV_KEYS[nav.link];
              const title = translationKey ? t(`nav.${translationKey}`) : nav.title;

              return (
                <li key={nav.link} className="w-full">
                  <NavLink
                    to={localizedLink}
                    end={localizedLink === "/" || localizedLink === "/es"}
                    onClick={() => setToggle(false)}
                    className={({ isActive }) =>
                      `block w-full py-2 px-3 rounded-lg font-sans text-[15px] transition-colors ${
                        isActive
                          ? "bg-accent/10 text-accent font-semibold border border-accent/30"
                          : "text-textSecondary hover:text-textPrimary hover:bg-surfaceElevated"
                      }`
                    }
                  >
                    {title}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Mobile Language Switcher */}
          <div className="mt-4 pt-4 border-t border-borderSubtle w-full flex items-center justify-between">
            <span className="font-mono text-[11px] text-textSecondary uppercase tracking-wider">
              {t("nav.languageSwitcher")}
            </span>
            <LanguageSwitcher
              isSpanish={isSpanish}
              onLanguageChange={handleLanguageChange}
              t={t}
            />
          </div>

          <div className="mt-3 pt-3 border-t border-borderSubtle w-full">
            <a
              href={cv}
              download="Jeison_Sanchez_CV.pdf"
              onClick={() => setToggle(false)}
              className="block w-full text-center font-mono text-[13px] font-semibold py-2.5 px-4 rounded-lg bg-secondary-gradient text-canvas"
            >
              {t("nav.downloadCv")}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
