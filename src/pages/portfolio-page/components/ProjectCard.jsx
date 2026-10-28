/**
 * @file src/pages/portfolio-page/components/ProjectCard.jsx
 * @description Reusable project card primitive displaying technology stack, category badges,
 * overview copy, and dynamic routing links across project listings and homepage showcases.
 * @responsibility Present individual project summary metadata and navigation trigger.
 */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../../../style";
import { Badge } from "../../../components";

/**
 * @param {Object} props
 * @param {string} props.img - Dedicated project identity icon badge SVG source (rendered at 36x36; not a screenshot).
 * @param {string} props.name - Display title of the project.
 * @param {string[]} [props.categories] - Array of human-readable category labels.
 * @param {string} [props.category] - Legacy single category label.
 * @param {string[]} [props.categoryKeys] - Array of filter category keys.
 * @param {string} [props.categoryKey] - Legacy single filter key.
 * @param {string} [props.projectType] - Project subtype/classification badge.
 * @param {string} [props.title] - Comma-delimited fallback tech stack string.
 * @param {string[]} [props.stack] - Array of technology names.
 * @param {string} props.content - Summary description.
 * @param {string} [props.context] - Brief context sentence.
 * @param {string} props.link - Destination route path.
 * @param {string|null} [props.liveUrl] - Verified live website or demo URL.
 * @param {string|null} [props.repoUrl] - Verified public source repository URL.
 * @param {string} [props.ctaLabel] - Custom label for the navigation CTA.
 * @param {string} [props.headingLevel="h2"] - Heading tag level ('h2' | 'h3' | 'h4').
 */
const ProjectCard = ({
  img,
  name,
  categories,
  category,
  categoryKeys,
  categoryKey,
  projectType,
  title,
  stack,
  content,
  context,
  link,
  liveUrl,
  repoUrl,
  ctaLabel,
  headingLevel = "h2",
}) => {
  const { t } = useTranslation(["projects", "common"]);
  const location = useLocation();
  const isSpanish =
    location.pathname === "/es" || location.pathname.startsWith("/es/");

  const HeadingTag = headingLevel;
  const techList = Array.isArray(stack)
    ? stack
    : (title || "").split(",").map((item) => item.trim()).filter(Boolean);

  const categoryList =
    Array.isArray(categories) && categories.length > 0
      ? Array.from(new Set(categories))
      : category
      ? [category]
      : [];

  const slug = (link || "").replace(/^\/(es\/)?projects\//, "");
  const cardContent = slug
    ? t(`items.${slug}.content`, { defaultValue: content })
    : content;
  const cardContext =
    slug && context
      ? t(`items.${slug}.context`, { defaultValue: context })
      : context;
  const cardProjectType =
    slug && projectType
      ? t(`items.${slug}.projectType`, { defaultValue: projectType })
      : projectType;

  const targetLink =
    isSpanish && link && link.startsWith("/") && !link.startsWith("/es")
      ? link === "/"
        ? "/es"
        : `/es${link}`
      : link;

  const finalCtaLabel =
    ctaLabel || t("buttons.viewDetails", { ns: "common" });

  const liveText = projectType?.toLowerCase().includes("game")
    ? t("buttons.liveDemo", { ns: "common" })
    : t("buttons.liveSite", { ns: "common" });

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
          <div className="flex flex-col items-end gap-1.5 flex-1 min-w-0">
            {categoryList.length > 0 && (
              <div className="flex flex-wrap justify-end gap-1.5">
                {categoryList.map((cat) => (
                  <Badge key={cat} variant="neutral">
                    {t(`categories.${cat}`, {
                      ns: "common",
                      defaultValue: cat,
                    })}
                  </Badge>
                ))}
              </div>
            )}
            {cardProjectType && (
              <span className="font-mono text-[11px] text-textMuted text-right">
                {cardProjectType}
              </span>
            )}
          </div>
        </div>

        <HeadingTag className={styles.heading4}>{name}</HeadingTag>
        <p className={`${styles.paragraph2} mt-3`}>{cardContent}</p>

        {cardContext && (
          <p className={`${styles.paragraph3} mt-3 pt-3 border-t border-borderSubtle`}>
            {cardContext}
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

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Link
            to={targetLink}
            className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold text-accent hover:text-white transition-colors"
          >
            <span>{finalCtaLabel}</span>
            <span aria-hidden="true">→</span>
          </Link>

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[12px] font-medium text-textSecondary hover:text-accent transition-colors"
            >
              <span>{liveText}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
