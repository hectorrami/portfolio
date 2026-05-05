import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Header from './components/header/Header';
import AboutExperience from './components/about/AboutExperience';
import Footer from './components/footer/Footer';
import StockAnalysisPage from './pages/StockAnalysisPage';

function PortfolioHome() {
  return (
    <div>
      <Nav />
      <Header />
      <AboutExperience />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route path="/stockanalysis" element={<StockAnalysisPage />} />
    </Routes>
  );
}

export default App;
