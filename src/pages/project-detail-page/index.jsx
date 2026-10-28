/**
 * @file src/pages/project-detail-page/index.jsx
 * @description Dynamic project detail view presenting project metadata, operational challenges,
 * technical solutions, highlights, and previous/next project navigation.
 * @responsibility Render comprehensive single project detail pages based on slug parameters.
 */

import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "../../style";
import { projects } from "../../constants";
import { Button, Badge } from "../../components";
import Error from "../error-page";

const ProjectDetail = ({ projectSlug }) => {
  const { slug: routeSlug } = useParams();
  const location = useLocation();
  const { t } = useTranslation(["projects", "common"]);

  const isSpanish =
    location.pathname === "/es" || location.pathname.startsWith("/es/");

  const activeSlug = projectSlug || routeSlug;
  const projectIndex = projects.findIndex((p) => p.slug === activeSlug);
  const project = projects[projectIndex];

  if (!project) {
    return <Error />;
  }

  const prevProject =
    projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  const prevLink = isSpanish ? `/es${prevProject.link}` : prevProject.link;
  const nextLink = isSpanish ? `/es${nextProject.link}` : nextProject.link;
  const backLink = isSpanish ? "/es/projects" : "/projects";

  const techList = Array.isArray(project.stack)
    ? project.stack
    : (project.title || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

  const categoryList =
    Array.isArray(project.categories) && project.categories.length > 0
      ? Array.from(new Set(project.categories))
      : project.category
      ? [project.category]
      : [];

  const projectSubtitle = t(`items.${project.slug}.subtitle`, {
    defaultValue: project.subtitle,
  });
  const projectOverview = t(`items.${project.slug}.overview`, {
    defaultValue: project.overview || project.content,
  });
  const projectType = t(`items.${project.slug}.projectType`, {
    defaultValue: project.projectType || categoryList.join(" // "),
  });
  const projectProblem = project.problem
    ? t(`items.${project.slug}.problem`, { defaultValue: project.problem })
    : null;
  const projectSolution = project.solution
    ? t(`items.${project.slug}.solution`, { defaultValue: project.solution })
    : null;
  const projectHighlights = Array.isArray(project.highlights)
    ? t(`items.${project.slug}.highlights`, {
        returnObjects: true,
        defaultValue: project.highlights,
      })
    : [];
  const verificationNote = project.verificationNote
    ? t(`items.${project.slug}.verificationNote`, {
        defaultValue: project.verificationNote,
      })
    : null;

  return (
    <div className={`w-full ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <article className={`${styles.paddingY} relative`}>
          {/* Breadcrumb & Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-borderSubtle relative z-[1]">
            <Link
              to={backLink}
              className="inline-flex items-center gap-2 font-mono text-[13px] font-medium text-textSecondary hover:text-textPrimary transition-colors"
            >
              <span aria-hidden="true">←</span>
              <span>{t("detail.backLink")}</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              {categoryList.map((cat) => (
                <Badge key={cat} variant="neutral">
                  {t(`categories.${cat}`, {
                    ns: "common",
                    defaultValue: cat,
                  })}
                </Badge>
              ))}
              {project.status && (
                <Badge
                  variant={
                    project.status.toLowerCase().includes("live")
                      ? "accent"
                      : "neutral"
                  }
                  pulse={project.status.toLowerCase().includes("live")}
                >
                  {t(`badges.${project.status}`, {
                    ns: "common",
                    defaultValue: project.status,
                  })}
                </Badge>
              )}
            </div>
          </div>

          {/* Hero Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-12 relative z-[1]">
            <div className="md:col-span-2">
              <p className={styles.subheading}>{projectType}</p>
              <h1 className={`${styles.heading1} mt-2`}>{project.name}</h1>
              {projectSubtitle && (
                <p className="font-display font-medium text-[20px] text-textPrimary mt-3">
                  {projectSubtitle}
                </p>
              )}
              <p className={`${styles.paragraph} mt-5`}>{projectOverview}</p>

              {/* Action Links (Rendered only when verified URLs exist) */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                {project.liveUrl && (
                  <Button
                    href={project.liveUrl}
                    target="_blank"
                    variant="primary"
                  >
                    {project.slug === "handlab"
                      ? t("detail.buttons.visitHandLabOnline")
                      : project.projectType?.toLowerCase().includes("game")
                      ? t("detail.buttons.playLiveDemo")
                      : t("detail.buttons.visitLiveSite")}
                  </Button>
                )}
                {project.repoUrl && (
                  <Button
                    href={project.repoUrl}
                    target="_blank"
                    variant="secondary"
                  >
                    {t("detail.buttons.viewSourceRepo")}
                  </Button>
                )}
                <Button to="/contact" variant="secondary">
                  {t("detail.buttons.askAboutProject")}
                </Button>
              </div>
            </div>

            {/* Project Metadata & Icon Card */}
            <aside className={`${styles.surfaceCard} p-6 flex flex-col gap-5`}>
              <div className="flex items-center gap-4 pb-5 border-b border-borderSubtle">
                <div className="w-16 h-16 rounded-2xl bg-surfaceElevated border border-borderSubtle flex items-center justify-center p-3 shrink-0">
                  <img
                    src={project.img}
                    alt={`${project.name} icon`}
                    width="44"
                    height="44"
                    className="w-11 h-11 object-contain"
                  />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-textMuted block">
                    {t("detail.projectId")}
                  </span>
                  <span className="font-mono text-[14px] font-semibold text-textPrimary">
                    {project.slug}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-mono text-[12px] font-semibold uppercase tracking-wider text-accent mb-3">
                  {t("detail.techStack")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {techList.map((tech) => (
                    <span key={tech} className={styles.monoBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {verificationNote && (
                <div className="pt-4 border-t border-borderSubtle">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-textMuted block mb-1">
                    {t("detail.docNote")}
                  </span>
                  <p className={styles.paragraph3}>{verificationNote}</p>
                </div>
              )}
            </aside>
          </div>

          {/* Multi-Application Ecosystem Breakdown */}
          {Array.isArray(project.applications) && project.applications.length > 0 && (
            <section className="mb-10 relative z-[1]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
                <div>
                  <span className="font-mono text-[12px] font-semibold uppercase tracking-wider text-accent block">
                    {t("detail.ecosystemEyebrow")}
                  </span>
                  <h2 className={`${styles.heading3} mt-1`}>
                    {t("detail.ecosystemTitle")}
                  </h2>
                </div>
                <p className={`${styles.paragraph3} max-w-[420px]`}>
                  {t("detail.ecosystemSubtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.applications.map((app) => {
                  const appName = t(
                    `items.${project.slug}.applications.${app.id}.name`,
                    { defaultValue: app.name }
                  );
                  const appBadge = t(
                    `items.${project.slug}.applications.${app.id}.badge`,
                    { defaultValue: app.badge }
                  );
                  const appStatus = t(
                    `items.${project.slug}.applications.${app.id}.status`,
                    { defaultValue: app.status }
                  );
                  const appDescription = t(
                    `items.${project.slug}.applications.${app.id}.description`,
                    { defaultValue: app.description }
                  );
                  const appCapabilities = t(
                    `items.${project.slug}.applications.${app.id}.capabilities`,
                    {
                      returnObjects: true,
                      defaultValue: app.capabilities || [],
                    }
                  );
                  const appCtaLabel = t(
                    `items.${project.slug}.applications.${app.id}.ctaLabel`,
                    {
                      defaultValue:
                        app.ctaLabel || t("buttons.visitApplication", { ns: "common" }),
                    }
                  );

                  return (
                    <div
                      key={app.id}
                      className={`${styles.surfaceCard} p-7 flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                          <Badge variant="neutral">{appBadge}</Badge>
                          <span className="font-mono text-[11px] text-textMuted">
                            {appStatus}
                          </span>
                        </div>

                        <h3 className={styles.heading4}>{appName}</h3>
                        <p className={`${styles.paragraph2} mt-3`}>
                          {appDescription}
                        </p>

                        {Array.isArray(appCapabilities) && appCapabilities.length > 0 && (
                          <ul className="mt-5 pt-4 border-t border-borderSubtle space-y-2.5">
                            {appCapabilities.map((cap) => (
                              <li
                                key={cap}
                                className="text-[13px] text-textSecondary flex items-start gap-2.5 leading-relaxed"
                              >
                                <span
                                  className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"
                                  aria-hidden="true"
                                />
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {app.liveUrl && (
                        <div className="mt-6 pt-5 border-t border-borderSubtle">
                          <Button
                            href={app.liveUrl}
                            target="_blank"
                            variant="primary"
                          >
                            {appCtaLabel}
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Problem & Solution Breakdown */}
          {(projectProblem || projectSolution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative z-[1]">
              {projectProblem && (
                <section className={`${styles.surfaceCard} p-7`}>
                  <span className="font-mono text-[12px] font-semibold uppercase tracking-wider text-accent">
                    {t("detail.problemEyebrow")}
                  </span>
                  <h2 className={`${styles.heading4} mt-2 mb-3`}>
                    {t("detail.problemTitle")}
                  </h2>
                  <p className={styles.paragraph2}>{projectProblem}</p>
                </section>
              )}

              {projectSolution && (
                <section className={`${styles.surfaceCard} p-7`}>
                  <span className="font-mono text-[12px] font-semibold uppercase tracking-wider text-accent">
                    {t("detail.solutionEyebrow")}
                  </span>
                  <h2 className={`${styles.heading4} mt-2 mb-3`}>
                    {t("detail.solutionTitle")}
                  </h2>
                  <p className={styles.paragraph2}>{projectSolution}</p>
                </section>
              )}
            </div>
          )}

          {/* Key Highlights */}
          {Array.isArray(projectHighlights) && projectHighlights.length > 0 && (
            <section
              className={`${styles.surfaceCard} p-7 mb-12 relative z-[1]`}
            >
              <span className="font-mono text-[12px] font-semibold uppercase tracking-wider text-accent">
                {t("detail.highlightsEyebrow")}
              </span>
              <h2 className={`${styles.heading4} mt-2 mb-4`}>
                {t("detail.highlightsTitle")}
              </h2>
              <ul className="space-y-3">
                {projectHighlights.map((item) => (
                  <li
                    key={item}
                    className={`${styles.paragraph2} flex items-start gap-3`}
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Previous / Next Project Navigation */}
          <nav
            aria-label={t("detail.navAria")}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-borderSubtle relative z-[1]"
          >
            <Link
              to={prevLink}
              className={`${styles.surfaceCard} p-5 flex flex-col items-start hover:border-borderAccent`}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-textMuted">
                {t("detail.prevProject")}
              </span>
              <span className="font-display font-semibold text-[18px] text-textPrimary mt-1">
                {prevProject.name}
              </span>
            </Link>

            <Link
              to={nextLink}
              className={`${styles.surfaceCard} p-5 flex flex-col sm:items-end items-start sm:text-right hover:border-borderAccent`}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-textMuted">
                {t("detail.nextProject")}
              </span>
              <span className="font-display font-semibold text-[18px] text-textPrimary mt-1">
                {nextProject.name}
              </span>
            </Link>
          </nav>
        </article>
      </div>
    </div>
  );
};

export default ProjectDetail;
