/**
 * @file src/pages/terminal-page/index.jsx
 * @description Master view for the interactive Terminal shell.
 * Integrates SectionHeader, telemetry badges, and the TerminalView component.
 * @responsibility Render page layout and host the interactive terminal view.
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
          {/* Page Heading Section */}
          <div className="flex flex-col items-start max-w-[720px] relative z-[2]">
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

          {/* Interactive Terminal Shell */}
          <div className="w-full relative z-[2] mt-2">
            <TerminalView />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terminal;
