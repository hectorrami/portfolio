import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import Layout from './components/Layout';
import RouteAnalytics from './components/RouteAnalytics';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Post from './pages/Post';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <RouteAnalytics />
        <Routes>
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
