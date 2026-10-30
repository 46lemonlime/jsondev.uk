/**
 * @file src/pages/terminal-page/index.jsx
 * @description Master view for the interactive Terminal shell.
 * Integrates responsive two-column hero section (page introduction beside ASCII branding)
 * and hosts the interactive TerminalView component below.
 * @responsibility Render page layout, host two-column hero intro, and embed interactive terminal view.
 */

import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../style";
import { Badge } from "../../components";
import TerminalView from "./components/TerminalView";

const Terminal = () => {
  const { t } = useTranslation(["terminal", "common"]);

  return (
    <div className={`w-full ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <section className={`flex flex-col ${styles.paddingY} gap-8 relative`}>
          {/* Responsive Two-Column Hero Section above the Terminal */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-6 lg:gap-10 relative z-[2] w-full">
            {/* Left Column — Existing Page Introduction */}
            <div className="flex flex-col items-start min-w-0 max-w-[680px] md:max-w-[480px] lg:max-w-[560px]">
              <Badge variant="telemetry" pulse className="mb-4">
                {t("badge")}
              </Badge>
              <h1 className={styles.heading1}>{t("title")}</h1>
              <p className={`${styles.subheading} mt-3`}>
                {t("subheading")}
              </p>
              <p className={`${styles.paragraph} max-w-[620px] mt-4`}>
                {t("description")}
              </p>
            </div>

            {/* Right Column — Persistent Introductory ASCII Branding & Welcome Info */}
            <div className="w-full md:w-auto min-w-0 md:max-w-[500px] lg:max-w-[560px] xl:max-w-[620px] flex-1 font-mono text-[12px] sm:text-[13px] leading-relaxed text-textSecondary select-none">
              {/* 1. JsonDev ASCII Wordmark */}
              <pre className="font-mono text-accent text-[8px] xs:text-[9px] sm:text-[10px] md:text-[9.5px] lg:text-[11px] xl:text-[12px] leading-tight mb-3 overflow-x-auto select-none font-bold whitespace-pre">
{`    /$$$$$  /$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$  /$$$$$$$$ /$$    /$$
   |__  $$ /$$__  $$ /$$__  $$| $$$ | $$| $$__  $$| $$_____/| $$   | $$
      | $$| $$  \\__/| $$  \\ $$| $$$$| $$| $$  \\ $$| $$      | $$   | $$
      | $$|  $$$$$$ | $$  | $$| $$ $$ $$| $$  | $$| $$$$$   |  $$ / $$/
 /$$  | $$ \\____  $$| $$  | $$| $$  $$$$| $$  | $$| $$__/    \\  $$ $$/ 
| $$  | $$ /$$  \\ $$| $$  | $$| $$\\  $$$| $$  | $$| $$        \\  $$$/  
|  $$$$$$/|  $$$$$$/|  $$$$$$/| $$ \\  $$| $$$$$$$/| $$$$$$$$   \\  $/   
 \\______/  \\______/  \\______/ |__/  \\__/|_______/ |________/    \\_/       `}
              </pre>

              {/* 2. Welcome prose */}
              <div className="text-textPrimary font-semibold text-[13px] sm:text-[14px]">
                {t("welcome.title")}
              </div>

              {/* 3. Separator line */}
              <div className="text-borderSubtle text-[11px] my-1 select-none">
                ----------------------------------------------------------------------
              </div>

              {/* 4. Terminal CLI Illustration */}
              <pre className="font-mono text-emerald-400/80 text-[9.5px] sm:text-[10.5px] lg:text-[11px] leading-tight mt-2 overflow-x-auto select-none">
{`+---------------------------------------------------------+
| [guest@jsondev.uk:~] Simulated UNIX Portfolio Shell     |
| Virtual FS: /home/guest/projects, skills, about, contact |
+---------------------------------------------------------+`}
              </pre>
            </div>
          </div>

          {/* Interactive Terminal Shell (Spanning available width below both columns) */}
          <div className="w-full relative z-[2]">
            <TerminalView />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terminal;
