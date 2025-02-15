import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../Providers/ThemeContext'; // Import context
import global from '../Styles/global.css'
import './Nav.css';

function Nav() {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const [show, handleShow] = useState(false);

  const transitionNavbar = () =>
    window.scrollY > 100 ? handleShow(true) : handleShow(false);

  useEffect(() => {
    window.addEventListener('scroll', transitionNavbar);
    return () => window.removeEventListener('scroll', transitionNavbar);
  }, []);

  return (
    <div className={`nav ${theme} ${show && 'transition'}`}>
        <button onClick={toggleTheme}>
          toggle
        </button>
    </div>
  );
}

export default Nav;
