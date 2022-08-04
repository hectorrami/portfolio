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
          Hector <span className="text-gradient">Ramirez</span>
        </h1>
        <h1 className="header_description">
          Welcome to my portfolio! I'm a software engineer from Houston, Texas.
        </h1>
      </div>
      <div className="header--fadeBottom" />
    </header>
  );
}

export default Header;
