import React from 'react';
import NavBar from './components/NavBar';
import MaterialCard from './components/MaterialCard';
import Skills from './components/Skills';
import './App.css';
import logo from './logo.svg';

const skillList = [{ name: 'React', image: logo }, { name: 'JavaScript', image: logo }, { name: 'TypeScript', image: logo }];

function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>⚡️ Welcome to my portfolio! ⚡️</h1>
        <MaterialCard />
      </header>
      <h1>SKILLS</h1>
      <div className="container-skills">
        {
        skillList.map((skill) => <Skills skill={skill.name} image={skill.image} />)
      }
      </div>
    </div>
  );
}

export default App;
