import React, {useContext} from 'react';
import {ThemeContext} from "../Providers/ThemeContext";
import './Header.css';
import global from '../Styles/global.css'

function Header() {
  const {theme} = useContext(ThemeContext);

  return (
    <header className={`header ${theme}`}>
      <div className="header_contents">
        <h1 className={`header_title ${theme}`}>
         Hector Ramirez
        </h1>
        <h2>
          <span className="text-gradient">Software Developer</span>
        </h2>
        <h5>
          Houston, Tx.
        </h5>
      </div>
    </header>
  );
}

export default Header;
