/**
 * @file src/components/Layout/Footer.jsx
 * @description Master footer presenting summary branding, sitemap columns, verified resources,
 * copyright notice, and social media links.
 * @responsibility Render bottom navigation grid, external platform links, and copyright statement.
 */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "../../style";
import { logo } from "../../assets";
import { footerLinks, socialMedia } from "../../constants";

const NAV_LINK_NAMES = {
  "/": "home",
  "/projects": "projects",
  "/about": "about",
  "/contact": "contact",
};

const Footer = () => {
  const { t } = useTranslation("common");
  const location = useLocation();
  const isSpanish =
    location.pathname === "/es" || location.pathname.startsWith("/es/");

  return (
    <footer className={`bg-surface/60 border-t border-borderSubtle ${styles.paddingX} ${styles.flexCenter} mt-20`}>
      <div className={`${styles.boxWidth}`}>
        <div className={`${styles.flexCenter} py-12 flex-col`}>
          <div className={`${styles.flexStart} md:flex-row flex-col mb-10 w-full justify-between gap-10`}>
            <div className="flex-[1] flex flex-col justify-start max-w-[340px]">
              <Link to={isSpanish ? "/es" : "/"} aria-label="JsonDev Home">
                <img
                  loading="lazy"
                  src={logo}
                  alt="JsonDev"
                  width="180"
                  height="48"
                  className="w-[180px] h-[48px] object-contain object-left"
                />
              </Link>

              <p className={`${styles.paragraph2} mt-4`}>
                {t("footer.description")}
              </p>
            </div>

            <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap gap-8">
              {footerLinks.map((footerlink) => {
                const columnTitle = t(
                  `footer.${footerlink.title.toLowerCase()}`,
                  { defaultValue: footerlink.title }
                );

                return (
                  <div
                    key={footerlink.title}
                    className="flex flex-col min-w-[150px]"
                  >
                    <h2 className="font-mono font-semibold text-[13px] tracking-wider uppercase text-textPrimary">
                      {columnTitle}
                    </h2>
                    <ul className="list-none mt-4 space-y-2.5">
                      {footerlink.links.map((item) => {
                        const navKey = NAV_LINK_NAMES[item.link];
                        const linkName = navKey ? t(`nav.${navKey}`) : item.name;

                        if (item.external) {
                          return (
                            <li key={item.name}>
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.paragraph2} hover:text-accent transition-colors duration-200 inline-flex items-center gap-1`}
                              >
                                <span>{linkName}</span>
                                <span aria-hidden="true" className="text-[12px]">
                                  ↗
                                </span>
                              </a>
                            </li>
                          );
                        }

                        const targetLink =
                          isSpanish &&
                          item.link.startsWith("/") &&
                          !item.link.startsWith("/es")
                            ? item.link === "/"
                              ? "/es"
                              : `/es${item.link}`
                            : item.link;

                        return (
                          <li key={item.name}>
                            <Link
                              to={targetLink}
                              className={`${styles.paragraph2} hover:text-accent transition-colors duration-200`}
                            >
                              {linkName}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t border-borderSubtle gap-4">
            <p className={`${styles.paragraph3} text-textMuted`}>
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>

            <ul className="list-none flex flex-row items-center gap-5" aria-label="Social Media Links">
              {socialMedia.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className="inline-flex items-center justify-center p-2 rounded-lg bg-surfaceElevated border border-borderSubtle hover:border-borderAccent social-media-icon"
                  >
                    <img
                      loading="lazy"
                      src={social.icon}
                      alt=""
                      aria-hidden="true"
                      className="w-[18px] h-[18px] object-contain"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
