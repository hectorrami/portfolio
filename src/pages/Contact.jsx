import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { CONTACT } from '../lib/site';

// The page title hangs in the rail as a label and the one line that matters
// opens the column. Visual size and heading level are separate decisions: the
// h1 is the small word in the margin, the big line is the thing you came for.
function Contact() {
  const { t } = useLanguage();
  useDocumentTitle(t.contact);

  return (
    <article className="rail-grid">
      <h1 className="meta pt-2 text-ink">{t.contact}</h1>
      <p className="font-serif text-[1.5rem] leading-[1.45] text-ink sm:text-[1.75rem]">
        {t.contactLead}{' '}
        <a href={`mailto:${CONTACT.email}`} className="link">
          {CONTACT.email}
        </a>
      </p>
    </article>
  );
}

export default Contact;
