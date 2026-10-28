/**
 * @file src/pages/portfolio-page/index.jsx
 * @description Main project archive view featuring category filtering and responsive project cards.
 * @responsibility Filter and present all verified software projects in the catalog.
 */

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../../style";
import { projectsHero, github } from "../../assets";
import { Button, Badge } from "../../components";
import ProjectCard from "./components/ProjectCard";
import { projects } from "../../constants";

/**
 * Filter configuration mapping filter IDs to project category keys.
 */
const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Application" },
  { id: "desktop", label: "Desktop & Tooling" },
];

const Projects = () => {
  const { t } = useTranslation(["projects", "common"]);
  const [activeFilter, setActiveFilter] = useState("all");

  // Filter projects declaratively supporting multiple categories per project
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;

    const keys = Array.isArray(project.categoryKeys)
      ? project.categoryKeys
      : project.categoryKey
      ? [project.categoryKey]
      : [];

    const labels = Array.isArray(project.categories)
      ? project.categories
      : project.category
      ? [project.category]
      : [];

    return (
      keys.includes(activeFilter) ||
      labels.some(
        (lbl) =>
          lbl.toLowerCase() === activeFilter.toLowerCase() ||
          (activeFilter === "web" && lbl.toLowerCase().includes("web")) ||
          (activeFilter === "desktop" && lbl.toLowerCase().includes("desktop"))
      )
    );
  });

  return (
    <div className={`w-full ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        {/* Page Header Section */}
        <section className={`flex md:flex-row flex-col ${styles.paddingY} items-center gap-10 relative`}>
          <div className="flex-1 flex flex-col items-start relative z-[2]">
            <Badge variant="accent" className="mb-4">
              {t("archive.badge")}
            </Badge>
            <h1 className={styles.heading1}>{t("archive.title")}</h1>
            <p className={`${styles.subheading} mt-3`}>
              {t("archive.subheading")}
            </p>
            <p className={`${styles.paragraph} max-w-[560px] mt-5`}>
              {t("archive.description")}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-7">
              <Button
                href="https://github.com/46lemonlime"
                target="_blank"
                variant="secondary"
              >
                <img
                  src={github}
                  alt=""
                  aria-hidden="true"
                  className="w-4 h-4 object-contain"
                />
                <span>GitHub (@46lemonlime)</span>
              </Button>
              <Button to="/contact" variant="ghost">
                {t("buttons.discussProject", { ns: "common" })}
              </Button>
            </div>
          </div>

          <div
            className={`flex-1 flex ${styles.flexCenter} ${styles.padding} relative`}
          >
            <img
              src={projectsHero}
              alt={t("archive.illustrationAlt")}
              className="w-full max-w-[420px] h-auto relative z-[5]"
            />
          </div>
        </section>

        {/* Filter Bar & Project Grid */}
        <section className={`${styles.paddingY} pt-4`} aria-label="Project Archive">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-borderSubtle">
            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label={t("archive.filterAria")}
            >
              {CATEGORIES.map((cat) => {
                const isSelected = activeFilter === cat.id;
                const translatedLabel = t(`categories.${cat.id}`, {
                  ns: "common",
                  defaultValue: cat.label,
                });

                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`font-mono text-[13px] font-medium px-4 py-2 rounded-lg border transition-colors ${
                      isSelected
                        ? "bg-accent text-canvas font-semibold border-accent"
                        : "bg-surface text-textSecondary border-borderSubtle hover:text-textPrimary hover:border-borderAccent"
                    }`}
                  >
                    {translatedLabel}
                  </button>
                );
              })}
            </div>

            <span className="font-mono text-[12px] text-textMuted">
              {t("archive.showingCount", {
                count: filteredProjects.length,
                total: projects.length,
              })}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-[1]">
            {filteredProjects.map((card) => (
              <ProjectCard key={card.id} {...card} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
