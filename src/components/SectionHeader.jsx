import React from "react";
import styles from "../style";

const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "left",
  as: HeadingTag = "h2",
  className = "",
}) => {
  const alignmentClasses =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignmentClasses} max-w-[720px] ${className}`}>
      {eyebrow && (
        <p className={`${styles.subheading} mb-3 flex items-center gap-2`}>
          <span
            className="inline-block w-2 h-2 rounded-sm bg-secondary"
            aria-hidden="true"
          />
          {eyebrow}
        </p>
      )}
      {title && <HeadingTag className={styles.heading2}>{title}</HeadingTag>}
      {description && (
        <p className={`${styles.paragraph} mt-4 max-w-[620px]`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
