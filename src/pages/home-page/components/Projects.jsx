/**
 * @file src/pages/home-page/components/Projects.jsx
 * @description Featured projects preview section on the homepage, reusing the canonical ProjectCard component.
 * @responsibility Display top featured projects and direct visitors to the main portfolio archive.
 */

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../../style";
import { projects } from "../../../constants";
import { Button, SectionHeader } from "../../../components";
import ProjectCard from "../../portfolio-page/components/ProjectCard";

const Projects = () => {
  const { t } = useTranslation(["home", "common"]);

  // Showcase all three verified projects on the homepage
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section id="portfolio" className={`${styles.paddingY} relative`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <SectionHeader
          eyebrow={t("projects.eyebrow")}
          title={t("projects.title")}
          description={t("projects.description")}
        />
        <div className="shrink-0">
          <Button to="/projects" variant="secondary">
            {t("buttons.viewAllProjects", { ns: "common" })}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-[1]">
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            ctaLabel={t("buttons.projectOverview", { ns: "common" })}
            headingLevel="h3"
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
