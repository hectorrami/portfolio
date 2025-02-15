import React, {useContext} from 'react';
import './Footer.css';
import {ThemeContext} from "../Providers/ThemeContext";

function Footer() {
  const {theme} = useContext(ThemeContext);

  return (
    <div>
      <div className={`footer ${theme}`}>
        <p>Created by Hector Ramirez with 💖</p>
      </div>
    </div>
  );
}

export default Footer;
