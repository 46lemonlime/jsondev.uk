import React from "react";
import { Link, useParams } from "react-router-dom";

// import styles
import styles from "../../style";

// import constants
import { projects } from "../../constants";

// import global components
import { Button, Badge } from "../../components";
import Error from "../error-page";

const ProjectDetail = ({ projectSlug }) => {
  const { slug: routeSlug } = useParams();
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

  const techList = Array.isArray(project.stack)
    ? project.stack
    : (project.title || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

  return (
    <div className={`bg-canvas ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <article className={`${styles.paddingY} relative`}>
          <div className="absolute z-[0] w-[40%] h-[40%] right-10 top-20 rounded-full red__gradient" />

          {/* Breadcrumb & Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-borderSubtle relative z-[1]">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-[13px] font-medium text-textSecondary hover:text-textPrimary transition-colors"
            >
              <span aria-hidden="true">←</span>
              <span>Back to All Projects</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              {project.category && (
                <Badge variant="neutral">{project.category}</Badge>
              )}
              {project.status && (
                <Badge
                  variant={
                    project.status.toLowerCase().includes("live")
                      ? "telemetry"
                      : "crimson"
                  }
                  pulse={project.status.toLowerCase().includes("live")}
                >
                  {project.status}
                </Badge>
              )}
            </div>
          </div>

          {/* Hero Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-12 relative z-[1]">
            <div className="md:col-span-2">
              <p className={styles.subheading}>
                {project.projectType || project.category}
              </p>
              <h1 className={`${styles.heading1} mt-2`}>{project.name}</h1>
              {project.subtitle && (
                <p className="font-display font-medium text-[20px] text-textPrimary mt-3">
                  {project.subtitle}
                </p>
              )}
              <p className={`${styles.paragraph} mt-5`}>
                {project.overview || project.content}
              </p>

              {/* Action Links (Rendered only when verified URLs exist) */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                {project.liveUrl && (
                  <Button
                    href={project.liveUrl}
                    target="_blank"
                    variant="primary"
                  >
                    Visit Live Site ↗
                  </Button>
                )}
                {project.repoUrl && (
                  <Button
                    href={project.repoUrl}
                    target="_blank"
                    variant="secondary"
                  >
                    View Source Repository ↗
                  </Button>
                )}
                <Button to="/contact" variant="secondary">
                  Ask About This Project
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
                    PROJECT ID
                  </span>
                  <span className="font-mono text-[14px] font-semibold text-textPrimary">
                    {project.slug}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="font-mono text-[12px] font-semibold uppercase tracking-wider text-crimson-soft mb-3">
                  Technology Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {techList.map((tech) => (
                    <span key={tech} className={styles.monoBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.verificationNote && (
                <div className="pt-4 border-t border-borderSubtle">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-textMuted block mb-1">
                    DOCUMENTATION &amp; REPOSITORY NOTE
                  </span>
                  <p className={styles.paragraph3}>{project.verificationNote}</p>
                </div>
              )}
            </aside>
          </div>

          {/* Problem & Solution Breakdown */}
          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative z-[1]">
              {project.problem && (
                <section className={`${styles.surfaceCard} p-7`}>
                  <span className="font-mono text-[12px] font-semibold uppercase tracking-wider text-crimson-soft">
                    01 // CONTEXT &amp; PROBLEM
                  </span>
                  <h2 className={`${styles.heading4} mt-2 mb-3`}>
                    Operational Challenge
                  </h2>
                  <p className={styles.paragraph2}>{project.problem}</p>
                </section>
              )}

              {project.solution && (
                <section className={`${styles.surfaceCard} p-7`}>
                  <span className="font-mono text-[12px] font-semibold uppercase tracking-wider text-crimson-soft">
                    02 // APPROACH &amp; IMPLEMENTATION
                  </span>
                  <h2 className={`${styles.heading4} mt-2 mb-3`}>
                    Technical Solution
                  </h2>
                  <p className={styles.paragraph2}>{project.solution}</p>
                </section>
              )}
            </div>
          )}

          {/* Key Highlights */}
          {Array.isArray(project.highlights) && project.highlights.length > 0 && (
            <section
              className={`${styles.surfaceCard} p-7 mb-12 relative z-[1]`}
            >
              <span className="font-mono text-[12px] font-semibold uppercase tracking-wider text-crimson-soft">
                03 // KEY DETAILS
              </span>
              <h2 className={`${styles.heading4} mt-2 mb-4`}>
                Project Highlights &amp; Scope
              </h2>
              <ul className="space-y-3">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className={`${styles.paragraph2} flex items-start gap-3`}
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full bg-crimson mt-2.5 shrink-0"
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
            aria-label="Project Navigation"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-borderSubtle relative z-[1]"
          >
            <Link
              to={prevProject.link}
              className={`${styles.surfaceCard} p-5 flex flex-col items-start hover:border-borderAccent`}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-textMuted">
                ← Previous Project
              </span>
              <span className="font-display font-semibold text-[18px] text-textPrimary mt-1">
                {prevProject.name}
              </span>
            </Link>

            <Link
              to={nextProject.link}
              className={`${styles.surfaceCard} p-5 flex flex-col sm:items-end items-start sm:text-right hover:border-borderAccent`}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-textMuted">
                Next Project →
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
