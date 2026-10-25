import React from "react";
import { quotes } from "../assets";
import styles from "../style";

const getInitials = (fullName = "") =>
  fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const FeedbackCard = ({ content, name, title }) => {
  const initials = getInitials(name);

  return (
    <article className="flex justify-between flex-col p-7 rounded-2xl feedback-card h-full">
      <div>
        <img
          src={quotes}
          alt=""
          aria-hidden="true"
          className="w-[32px] h-[20px] object-contain opacity-80"
        />
        <p className={`${styles.paragraph2} text-textPrimary my-6`}>
          &ldquo;{content}&rdquo;
        </p>
      </div>

      <div className="flex flex-row items-center pt-4 border-t border-borderSubtle">
        <div
          aria-hidden="true"
          className="w-[44px] h-[44px] rounded-full bg-crimson-muted border border-crimson/30 flex items-center justify-center font-mono font-semibold text-[14px] text-crimson-soft shrink-0"
        >
          {initials}
        </div>
        <div className="flex flex-col ml-3.5">
          <h3 className="font-display font-semibold text-[17px] leading-[24px] text-textPrimary">
            {name}
          </h3>
          <p className="font-sans font-normal text-[13px] leading-[20px] text-textMuted">
            {title}
          </p>
        </div>
      </div>
    </article>
  );
};

export default FeedbackCard;
