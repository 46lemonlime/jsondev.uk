/**
 * @file src/pages/about-page/components/AboutIntro.jsx
 * @description Narrative introduction, education, technical stack, Notion roadmap trigger,
 * and authenticated operations/customer service work history.
 * @responsibility Present autobiographical background, qualifications, and transferable operational skills.
 */

import React from "react";
import { useTranslation } from "react-i18next";

import styles, { layout } from "../../../style";
import { aboutme, cv } from "../../../assets";
import { features, workHistory } from "../../../constants";
import { Button, Badge, SectionHeader, GetRoadmap } from "../../../components";
import FeatureCard from "./FeatureCard";

const AboutIntro = () => {
  const { t } = useTranslation(["about", "common"]);

  return (
    <div className="w-full">
      {/* Section 1: About Header & Narrative */}
      <section className={`${layout.section} items-center gap-12 relative`}>
        <div className={layout.sectionInfo}>
          <Badge variant="accent" className="mb-4">
            {t("intro.badge")}
          </Badge>
          <h1 className={styles.heading1}>{t("intro.title")}</h1>
          <p className={`${styles.subheading} mt-3`}>
            {t("intro.subheading")}
          </p>
          <p className={`${styles.paragraph} max-w-[580px] mt-5`}>
            {t("intro.paragraph1")}
          </p>
          <p className={`${styles.paragraph2} max-w-[580px] mt-4`}>
            {t("intro.paragraph2")}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Button to="/projects" variant="primary">
              {t("buttons.viewMyProjects", { ns: "common" })}
            </Button>
            <Button
              href={cv}
              download="Jeison_Sanchez_CV.pdf"
              variant="secondary"
            >
              {t("buttons.downloadCvPdf", { ns: "common" })}
            </Button>
          </div>
        </div>

        <div className={layout.sectionImg}>
          <img
            src={aboutme}
            alt={t("intro.imageAlt")}
            className="w-full max-w-[440px] h-auto relative z-[5]"
          />
        </div>
      </section>

      {/* Section 2: Technical Skills, Education & CS Roadmap */}
      <section className={`${styles.paddingY} relative`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-[1]">
          <div className="lg:col-span-5 flex flex-col items-start">
            <SectionHeader
              eyebrow={t("skills.eyebrow")}
              title={t("skills.title")}
              description={t("skills.description")}
            />
            <div className="mt-8">
              <GetRoadmap />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-5 w-full">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={t(`skills.features.${feature.id}.title`, feature.title)}
                content={t(
                  `skills.features.${feature.id}.content`,
                  feature.content
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Verified Operations & Customer Service Experience */}
      <section className={`${styles.paddingY} relative`}>
        <div className="mb-12 relative z-[1]">
          <SectionHeader
            eyebrow={t("experience.eyebrow")}
            title={t("experience.title")}
            description={t("experience.description")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-[1]">
          {workHistory.map((job) => (
            <article
              key={job.id}
              className={`${styles.surfaceCard} p-7 flex flex-col justify-between h-full`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-borderSubtle">
                  <span className="font-mono text-[12px] font-semibold text-accent">
                    {t(`experience.roles.${job.id}.period`, job.period)}
                  </span>
                  <span className="font-mono text-[11px] text-textMuted">
                    {t(`experience.roles.${job.id}.location`, job.location)}
                  </span>
                </div>

                <h3 className={styles.heading4}>
                  {t(`experience.roles.${job.id}.role`, job.role)}
                </h3>
                <p className="font-sans font-medium text-[15px] text-textPrimary mt-1">
                  {t(`experience.roles.${job.id}.company`, job.company)}
                </p>

                <p className={`${styles.paragraph2} mt-4`}>
                  {t(`experience.roles.${job.id}.summary`, job.summary)}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-borderSubtle">
                {job.skills.map((skill) => (
                  <span key={skill} className={styles.monoBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutIntro;
