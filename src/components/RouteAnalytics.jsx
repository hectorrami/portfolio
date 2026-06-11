import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// GoatCounter's script counts the initial page load by itself; this reports
// subsequent client-side navigations. Renders nothing.
function RouteAnalytics() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (window.goatcounter && typeof window.goatcounter.count === 'function') {
      window.goatcounter.count({ path: pathname });
    }
  }, [pathname]);

  return null;
}

export default RouteAnalytics;
