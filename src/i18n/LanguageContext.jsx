import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { STRINGS } from './strings';

const LanguageContext = createContext(null);

const initialLanguage = () => {
  const stored = localStorage.getItem('lang');
  if (stored === 'en' || stored === 'es') return stored;
  return navigator.language && navigator.language.startsWith('es') ? 'es' : 'en';
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const toggle = () =>
      setLang((prev) => {
        const next = prev === 'en' ? 'es' : 'en';
        localStorage.setItem('lang', next);
        return next;
      });
    return { lang, toggle, t: STRINGS[lang] };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
