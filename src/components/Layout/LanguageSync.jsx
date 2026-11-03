/**
 * @file src/components/Layout/LanguageSync.jsx
 * @description Route-level language synchronizer ensuring i18next matches the authoritative URL-derived language.
 * @responsibility Synchronize active i18next language with the current route language.
 */

import { useEffect } from "react";
import i18n from "../../i18n";
import { useLanguage } from "../../utils/language";

/**
 * Synchronizes an i18next instance with the specified target language.
 * Only calls changeLanguage if the current language differs.
 *
 * @param {"en" | "es"} targetLang - Target language code from the route.
 * @param {Object} [i18nInstance=i18n] - The i18next instance to synchronize.
 * @returns {boolean} True if language was changed, false if already in sync.
 */
export function syncLanguageWithRoute(targetLang, i18nInstance = i18n) {
  if (i18nInstance && i18nInstance.language !== targetLang) {
    if (typeof i18nInstance.changeLanguage === "function") {
      i18nInstance.changeLanguage(targetLang);
      return true;
    }
  }
  return false;
}

function LanguageSync() {
  const { currentLang } = useLanguage();

  useEffect(() => {
    syncLanguageWithRoute(currentLang, i18n);
  }, [currentLang]);

  return null;
}

export default LanguageSync;
