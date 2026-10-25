import React from "react";
import { Link } from "react-router-dom";

// import styles
import styles from "../../../style";

// import data
import { projects } from "../../../constants";

// import global components
import { Button, Badge, SectionHeader } from "../../../components";

const Projects = () => {
  return (
    <section id="portfolio" className={`${styles.paddingY} relative`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <SectionHeader
          eyebrow="01 // PORTFOLIO"
          title="Featured Software Projects"
          description="Practical applications built to solve workflow bottlenecks, structure decision-making data, and deliver responsive web experiences."
        />
        <div className="shrink-0">
          <Button to="/projects" variant="secondary">
            View All Projects →
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-[1]">
        {projects.map((project) => (
          <article
            key={project.id}
            className="project-card rounded-2xl p-7 flex flex-col justify-between"
          >
            <div>
              {/* Card Header: Icon & Category */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-surfaceElevated border border-borderSubtle flex items-center justify-center p-3">
                  <img
                    loading="lazy"
                    src={project.img}
                    alt={`${project.name} icon`}
                    width="36"
                    height="36"
                    className="w-9 h-9 object-contain"
                  />
                </div>
                {project.category && (
                  <Badge variant="neutral">{project.category}</Badge>
                )}
              </div>

              {/* Project Title & Description */}
              <h3 className={styles.heading4}>{project.name}</h3>
              <p className={`${styles.paragraph2} mt-3`}>{project.content}</p>

              {project.context && (
                <p className={`${styles.paragraph3} mt-3 pt-3 border-t border-borderSubtle`}>
                  {project.context}
                </p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-borderSubtle">
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {(project.stack || project.title.split(",")).map((tech) => {
                  const label = tech.trim();
                  return (
                    <span key={label} className={styles.monoBadge}>
                      {label}
                    </span>
                  );
                })}
              </div>

              <Link
                to={project.link}
                className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold text-crimson-soft hover:text-white transition-colors"
              >
                <span>Project Overview</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
