/**
 * @file src/pages/home-page/components/Hero.jsx
 * @description Hero introduction section with animated typewriter roles, action buttons,
 * verified profile links, portrait card, and key metrics.
 * @responsibility Deliver the primary first-impression landing introduction and calls to action.
 */

import React from "react";
import { TypeAnimation } from "react-type-animation";
import { useTranslation, Trans } from "react-i18next";

import styles, { layout } from "../../../style";
import { heroIllustration, github, linkedin } from "../../../assets";
import { Button, Badge } from "../../../components";
import Stats from "./Stats";
import GetCV from "./GetCV";

const Hero = () => {
  const { t, i18n } = useTranslation(["home", "common"]);

  const roles = t("hero.roles", { returnObjects: true }) || [
    "Software Developer",
    "React & JavaScript Developer",
    "Workflow Automation Builder",
  ];

  const typeAnimationSequence = [
    roles[0] || "Software Developer",
    2500,
    roles[1] || "React & JavaScript Developer",
    2500,
    roles[2] || "Workflow Automation Builder",
    2500,
  ];

  return (
    <div>
      <section
        id="hero"
        className={`${layout.section} items-center gap-10 lg:gap-14 xl:gap-16 relative`}
      >
        {/* Left Column: Introduction & Actions */}
        <div className={`flex-1 ${styles.flexStart} flex-col z-[2] w-full`}>
          <Badge variant="telemetry" pulse className="mb-5">
            {t("badges.openRemote", { ns: "common" })}
          </Badge>

          <div className="flex flex-row justify-between items-start w-full gap-4">
            <h1 className={styles.display}>
              <span className={styles.displayPrimary}>
                <span className="text-accent">Jeison</span>{" "}
                <span className="text-pink">Porfirio</span>
              </span>
              <span className={styles.displaySecondary}>Plaza Sanchez</span>
            </h1>

            <div className="lg:flex hidden shrink-0">
              <GetCV />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span
              className="font-mono text-accent font-semibold text-[16px]"
              aria-hidden="true"
            >
              &gt;
            </span>
            <TypeAnimation
              key={i18n.language}
              sequence={typeAnimationSequence}
              speed={50}
              className="font-mono font-medium text-[16px] sm:text-[18px] leading-[28px] text-accent-soft bg-surfaceElevated border border-borderSubtle rounded-lg px-3 py-1"
              wrapper="div"
              repeat={Infinity}
            />
          </div>

          <p className={`${styles.paragraph} max-w-[560px] mt-6`}>
            <Trans
              ns="home"
              i18nKey="hero.paragraph"
              components={{
                jsdev: (
                  <span className="font-mono text-textPrimary font-bold" />
                ),
                tech: <span className="text-textPrimary font-bold" />,
              }}
            />
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Button to="/projects" variant="primary">
              {t("buttons.exploreProjects", { ns: "common" })}
            </Button>
            <Button to="/about" variant="secondary">
              {t("buttons.aboutMe", { ns: "common" })}
            </Button>
          </div>

          {/* Direct Verified Profile Links */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-borderSubtle w-full max-w-[560px]">
            <span className="font-mono text-[12px] uppercase tracking-wider text-textMuted">
              {t("hero.verifiedProfiles")}
            </span>
            <a
              href="https://github.com/46lemonlime"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[13px] text-textSecondary hover:text-textPrimary transition-colors"
            >
              <img
                src={github}
                alt=""
                aria-hidden="true"
                className="w-4 h-4 object-contain"
              />
              <span>github.com/46lemonlime</span>
            </a>
            <span className="text-borderSubtle" aria-hidden="true">
              |
            </span>
            <a
              href="https://www.linkedin.com/in/jpplazasanchez/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[13px] text-textSecondary hover:text-textPrimary transition-colors"
            >
              <img
                src={linkedin}
                alt=""
                aria-hidden="true"
                className="w-4 h-4 object-contain"
              />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Column: Hero Illustration Card */}
        <div
          className={`flex-1 flex ${styles.flexCenter} md:my-0 my-8 relative w-full`}
        >
          {/* Caribbean Green Ambient Glow: Layered atmospheric backlight behind card */}
          <div
            className="hero__ambient__glow"
            aria-hidden="true"
          />

          <div className="relative z-[5] p-3 sm:p-3.5 rounded-3xl bg-surface border border-borderSubtle shadow-card w-full max-w-[360px] xs:max-w-[380px] sm:max-w-[440px] md:max-w-[460px] lg:max-w-[490px] xl:max-w-[520px]">
            <div className="overflow-hidden rounded-2xl aspect-[3/4] bg-surfaceElevated">
              <img
                src={heroIllustration}
                alt={t("hero.illustrationAlt")}
                width="764"
                height="1024"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="mt-3 px-2 py-1.5 flex items-center justify-between font-mono text-[12px] text-textMuted">
              <span>{t("hero.locBadge")}</span>
              <span className="text-accent flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {t("hero.devBadge")}
              </span>
            </div>
          </div>
        </div>

        <div className={`lg:hidden ${styles.flexCenter} w-full mt-6`}>
          <GetCV />
        </div>
      </section>

      <Stats />
    </div>
  );
};

export default Hero;
