import React from 'react';
import Home from './Components/Home';
import { ThemeProvider } from './Providers/ThemeContext';
import './App.css';

function App() {
  return (
      <ThemeProvider>
          <Home />
      </ThemeProvider>
  );
}

export default App;
