/**
 * @file src/style.js
 * @description Central layout token registry and typography utility classes.
 * @responsibility Export layout, padding, font hierarchy, and responsive breakpoint styles.
 */

const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-8",
  padding: "sm:px-12 px-6 sm:py-10 py-6",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-8",

  // Typography Hierarchy (Direction C: Space Grotesk + Inter + JetBrains Mono)
  display:
    "flex-1 font-display font-bold tracking-tight ss:text-[56px] text-[40px] text-textPrimary ss:leading-[1.15] leading-[1.2]",

  heading1:
    "font-display font-bold tracking-tight ss:text-[52px] text-[36px] text-textPrimary ss:leading-[1.15] leading-[1.2] w-full",

  subheading:
    "font-mono font-medium xs:text-[14px] text-[13px] tracking-wider leading-[22px] text-accent uppercase",

  heading2:
    "font-display font-bold tracking-tight xs:text-[40px] text-[30px] text-textPrimary xs:leading-[1.2] leading-[1.25] w-full",
  heading3:
    "font-display font-semibold xs:text-[28px] text-[22px] xs:leading-[1.3] leading-[1.35] text-textPrimary",
  heading4:
    "font-display font-semibold text-[20px] leading-[1.4] text-textPrimary",

  paragraph:
    "font-sans font-normal text-textSecondary text-[17px] leading-[1.7]",
  paragraph2:
    "font-sans font-normal text-textSecondary text-[15px] leading-[1.6]",
  paragraph3:
    "font-sans font-normal text-textMuted text-[13px] leading-[1.5]",

  // Shared Surface & Badge Tokens
  surfaceCard:
    "bg-surface border border-borderSubtle rounded-2xl transition-all duration-200 hover:border-borderAccent shadow-card",
  monoBadge:
    "inline-flex items-center font-mono text-[12px] font-medium px-2.5 py-1 rounded-md bg-surfaceElevated text-textSecondary border border-borderSubtle",
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;
