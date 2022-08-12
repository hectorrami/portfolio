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
          <span>Hector</span> Ramirez
        </h1>
        <h2>
          <span className="text-gradient">Software Engineer</span>
        </h2>
        <h5 className="fromLeft">
          Hi👋I have professional experience working with React, TypeScript,
          JavaScript, and many other programming languages and tools. I love new
          challenges, learning, and creating.
        </h5>
      </div>
    </header>
  );
}

export default Header;
