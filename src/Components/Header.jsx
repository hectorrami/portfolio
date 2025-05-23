import React, { useContext } from 'react';
import { ThemeContext } from "../Providers/ThemeContext";
import './Header.css';
import global from '../Styles/global.css'
import { ABOUT_ME } from '../Constants/constants';

function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <header className={`header ${theme}`}>
      <div className="header_contents">
        <h1 className={`header_title ${theme}`}>
          Hector Ramirez
        </h1>
        <h2>
          <span className={`text-gradient ${theme}`}>Software Developer</span>
        </h2>
        <p className={`about-me ${theme}`}>
          {ABOUT_ME}
        </p>
      </div>
    </header>
  );
}

export default Header;
