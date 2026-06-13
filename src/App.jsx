import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import Layout from './components/Layout';
import RouteAnalytics from './components/RouteAnalytics';
import Home from './pages/Home';
import About from './pages/About';
import Post from './pages/Post';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <RouteAnalytics />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts/:slug" element={<Post />} />
            <Route path="*" element={<Post />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
