import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

function LanguageToggle() {
  const { toggle, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.switchLanguage}
      className="meta transition-colors hover:text-ink"
    >
      {t.otherLanguage}
    </button>
  );
}

export default LanguageToggle;
