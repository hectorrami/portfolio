import React from 'react';
import './Header.css';

function Header() {
  return (
    <header
      className="header"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="header_contents">
        <h1 className="header_title">
          <span className="text-gradient">Hector</span> Ramirez
        </h1>
        <p className="header_description">
          Hi. I'm a software engineer from Houston, Tx.
          <br /> I have professional experience with React, JavaScript,
          TypeScript, Java, and many other programming languages and tools.
          <br /> My goal is to continue learning and growing as a developer.
        </p>
      </div>
      <div className="header--fadeBottom" />
    </header>
  );
}

export default Header;
