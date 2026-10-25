import React from "react";
import { Link } from "react-router-dom";

// import styles
import styles from "../../../style";

// import global components
import { Badge } from "../../../components";

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
}) => {
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

        <h2 className={styles.heading4}>{name}</h2>
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
          <span>View Project Details</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
