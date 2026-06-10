import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

function LanguageToggle() {
  const { toggle, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.switchLanguage}
      className="px-2 py-1 rounded text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
    >
      {t.otherLanguage}
    </button>
  );
}

export default LanguageToggle;
