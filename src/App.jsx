import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import Layout from './components/Layout';
import RouteAnalytics from './components/RouteAnalytics';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Post from './pages/Post';

// A standalone page shipped from public/ rather than built by the app. GitHub
// Pages serves it directly at /morse/, but /morse (and every morse url under
// the Vite dev server) reaches the router instead, so leave the SPA with a
// full page load. Targeting the file itself can't bounce back into the app.
function StaticPage({ href }) {
  React.useEffect(() => {
    window.location.replace(href);
  }, [href]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <RouteAnalytics />
        <Routes>
          <Route path="/morse" element={<StaticPage href="/morse/index.html" />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            {/* /about was a published url and is in the old sitemap, so it
                redirects rather than falling through to the not-found page. */}
            <Route path="/about" element={<Navigate to="/contact" replace />} />
            <Route path="/posts/:slug" element={<Post />} />
            <Route path="*" element={<Post />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
