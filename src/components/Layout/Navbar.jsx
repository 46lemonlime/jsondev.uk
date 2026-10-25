/**
 * @file src/components/Layout/Navbar.jsx
 * @description Accessible primary navigation component supporting desktop links, CV download,
 * and mobile slide-out drawer with keyboard Escape and route transition handling.
 * @responsibility Present site logo, main navigation routes, mobile hamburger drawer, and resume action.
 */

import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import styles from "../../style";
import { close, logo, menu, cv } from "../../assets";
import { navLinks } from "../../constants";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { pathname } = useLocation();

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

  return (
    <nav
      aria-label="Primary Navigation"
      className="w-full flex py-4 justify-between items-center navbar relative"
    >
      {/* Brand Logo */}
      <Link
        to="/"
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
      <div className="sm:flex hidden items-center gap-8">
        <ul className="list-none flex justify-end items-center gap-8">
          {navLinks.map((nav) => (
            <li key={nav.link}>
              <NavLink
                to={nav.link}
                end={nav.link === "/"}
                className={({ isActive }) =>
                  `${styles.paragraph2} navLink relative py-1 transition-colors duration-200 ${
                    isActive
                      ? "text-textPrimary font-medium navLink-active"
                      : "text-textSecondary hover:text-textPrimary"
                  }`
                }
              >
                {nav.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href={cv}
          download="Jeison_Sanchez_CV.pdf"
          className="font-mono text-[13px] font-medium px-4 py-2 rounded-lg bg-surfaceElevated text-textPrimary border border-borderSubtle hover:border-borderAccent transition-colors duration-200"
        >
          Download CV
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
          } p-6 bg-surface border border-borderSubtle shadow-card absolute top-16 right-0 my-2 min-w-[220px] rounded-xl sidebar z-50 flex-col`}
        >
          <ul className="list-none flex flex-col justify-end items-start flex-1 w-full gap-3">
            {navLinks.map((nav) => (
              <li key={nav.link} className="w-full">
                <NavLink
                  to={nav.link}
                  end={nav.link === "/"}
                  onClick={() => setToggle(false)}
                  className={({ isActive }) =>
                    `block w-full py-2 px-3 rounded-lg font-sans text-[15px] transition-colors ${
                      isActive
                        ? "bg-crimson-muted text-textPrimary font-semibold border border-crimson/30"
                        : "text-textSecondary hover:text-textPrimary hover:bg-surfaceElevated"
                    }`
                  }
                >
                  {nav.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-borderSubtle w-full">
            <a
              href={cv}
              download="Jeison_Sanchez_CV.pdf"
              onClick={() => setToggle(false)}
              className="block w-full text-center font-mono text-[13px] font-medium py-2.5 px-4 rounded-lg bg-secondary-gradient text-white"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
