import { useEffect } from 'react';

export const SITE_TITLE = 'Hector Ramirez';

// Sets the browser/tab title for the current page; restores nothing on
// unmount since every page sets its own.
export default function useDocumentTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} — ${SITE_TITLE}` : SITE_TITLE;
  }, [pageTitle]);
}
