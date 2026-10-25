import React from "react";
import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-secondary-gradient text-white font-semibold border border-crimson-hover/40 shadow-crimson hover:brightness-110",
  secondary:
    "bg-surfaceElevated text-textPrimary font-medium border border-borderSubtle hover:border-borderAccent hover:bg-surface",
  ghost:
    "bg-transparent text-textSecondary font-medium border border-transparent hover:text-textPrimary hover:bg-white/[0.04]",
};

const Button = ({
  type = "button",
  variant = "primary",
  to,
  href,
  download,
  target,
  rel,
  onClick,
  styles = "",
  children,
  ...rest
}) => {
  const baseClasses = `inline-flex items-center justify-center gap-2 py-3.5 px-6 font-sans text-[16px] leading-[1.2] rounded-[10px] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson ${
    variants[variant] || variants.primary
  } ${styles}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={target === "_blank" ? rel || "noopener noreferrer" : rel}
        className={baseClasses}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
