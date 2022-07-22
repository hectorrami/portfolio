import React from 'react';
import MaterialCard from './components/MaterialCard';
import './App.css';
import ErrorLogo from './img/404.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>
            Welcome to my
            {' '}
            <span className="text-gradient">portfolio</span>
          </h1>
          <p>Hi, 👋 My name is Hector.I am a highly driven Software Engineer from in Houston, Tx.</p>
        </div>
        <div><MaterialCard /></div>
      </header>
      <div className="App-work">
        <img src={ErrorLogo} className="img" alt="404" />
        <p>
          Please check back later. My website is currently under development,
          but I am constantly updating it..
        </p>
      </div>
    </div>
  );
}

export default App;
