import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Post from './pages/Post';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:slug" element={<Post />} />
          <Route path="*" element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
