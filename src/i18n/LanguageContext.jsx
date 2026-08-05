import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { STRINGS } from './strings';
import { FEATURES } from '../lib/site';

const LanguageContext = createContext(null);

const initialLanguage = () => {
  const stored = localStorage.getItem('lang');
  if (stored === 'en' || stored === 'es') return stored;
  return navigator.language && navigator.language.startsWith('es') ? 'es' : 'en';
};

// `enabled` defaults to the site-wide flag; tests pass it explicitly to exercise
// the bilingual behavior while Spanish is switched off in production. When it is
// off the app stays in English regardless of a stored preference or a Spanish
// browser locale — otherwise those visitors would land in half-translated
// content with no toggle to escape it.
export function LanguageProvider({ children, enabled = FEATURES.spanish }) {
  const [lang, setLang] = useState(() => (enabled ? initialLanguage() : 'en'));

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const toggle = () => {
      if (!enabled) return;
      setLang((prev) => {
        const next = prev === 'en' ? 'es' : 'en';
        localStorage.setItem('lang', next);
        return next;
      });
    };
    return { lang, toggle, t: STRINGS[lang], languageEnabled: enabled };
  }, [lang, enabled]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
