import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// React Router navigates with history.pushState, which by specification does
// not touch the scroll position — so without this, clicking a post from
// halfway down the index drops you halfway down the article. `<BrowserRouter>`
// ships no scroll management of its own, and the router's `<ScrollRestoration>`
// is not an option here: it calls useDataRouterContext, which only exists under
// createBrowserRouter. Renders nothing.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // POP is the back/forward button and the very first render. The browser
    // restores the position itself in both cases, and doing it again here
    // would throw away where the reader had got to.
    if (navigationType === 'POP') return;

    // A link to a section is asking for that section, not for the top.
    if (hash) return;

    // `instant` overrides the `scroll-behavior: smooth` set on html for anchor
    // links; without it a route change animates the whole page height.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash, navigationType]);

  return null;
}

export default ScrollToTop;
