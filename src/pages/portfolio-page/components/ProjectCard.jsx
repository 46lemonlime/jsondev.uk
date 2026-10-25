/**
 * @file src/pages/portfolio-page/components/ProjectCard.jsx
 * @description Reusable project card primitive displaying technology stack, category badges,
 * overview copy, and dynamic routing links across project listings and homepage showcases.
 * @responsibility Present individual project summary metadata and navigation trigger.
 */

import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../style";
import { Badge } from "../../../components";

/**
 * @param {Object} props
 * @param {string} props.img - Project icon source.
 * @param {string} props.name - Display title of the project.
 * @param {string} [props.category] - Human-readable category label.
 * @param {string} [props.projectType] - Project subtype/classification badge.
 * @param {string} [props.title] - Comma-delimited fallback tech stack string.
 * @param {string[]} [props.stack] - Array of technology names.
 * @param {string} props.content - Summary description.
 * @param {string} [props.context] - Brief context sentence.
 * @param {string} props.link - Destination route path.
 * @param {string} [props.ctaLabel="View Project Details"] - Custom label for the navigation CTA.
 * @param {string} [props.headingLevel="h2"] - Heading tag level ('h2' | 'h3' | 'h4').
 */
const ProjectCard = ({
  img,
  name,
  category,
  projectType,
  title,
  stack,
  content,
  context,
  link,
  ctaLabel = "View Project Details",
  headingLevel = "h2",
}) => {
  const HeadingTag = headingLevel;
  const techList = Array.isArray(stack)
    ? stack
    : (title || "").split(",").map((item) => item.trim()).filter(Boolean);

  return (
    <article className="project-card rounded-2xl p-7 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-surfaceElevated border border-borderSubtle flex items-center justify-center p-3 shrink-0">
            <img
              loading="lazy"
              src={img}
              alt={`${name} icon`}
              width="36"
              height="36"
              className="w-9 h-9 object-contain"
            />
          </div>
          <div className="flex flex-col items-end gap-1">
            {category && <Badge variant="neutral">{category}</Badge>}
            {projectType && (
              <span className="font-mono text-[11px] text-textMuted">
                {projectType}
              </span>
            )}
          </div>
        </div>

        <HeadingTag className={styles.heading4}>{name}</HeadingTag>
        <p className={`${styles.paragraph2} mt-3`}>{content}</p>

        {context && (
          <p className={`${styles.paragraph3} mt-3 pt-3 border-t border-borderSubtle`}>
            {context}
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-borderSubtle">
        <div className="flex flex-wrap gap-2 mb-5">
          {techList.map((tech) => (
            <span key={tech} className={styles.monoBadge}>
              {tech}
            </span>
          ))}
        </div>

        <Link
          to={link}
          className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold text-crimson-soft hover:text-white transition-colors"
        >
          <span>{ctaLabel}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
