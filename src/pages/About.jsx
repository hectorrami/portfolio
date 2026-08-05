import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import useDocumentTitle from '../hooks/useDocumentTitle';

function About() {
  const { t } = useLanguage();
  useDocumentTitle(t.about);

  return (
    <article>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-ink mb-8">
        {t.about}
      </h1>
      <p className="text-zinc-600 dark:text-ink-body leading-relaxed">
        Software Engineer from Houston, TX who loves lattes
      </p>
    </article>
  );
}

export default About;
