import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../Providers/ThemeContext';
import {Bedtime, WbSunny} from '@mui/icons-material';
import {IconButton} from "@mui/material";
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
    <div className={`nav ${theme}`}>
        <IconButton onClick={toggleTheme}>
          {theme === 'light' ? <Bedtime className={`${theme}`}/> : <WbSunny className={`${theme}`}/>}
        </IconButton >
    </div>
  );
}

export default Nav;
