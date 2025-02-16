import React, {useContext} from 'react';
import {ThemeContext} from "../Providers/ThemeContext";
import {GitHub, LinkedIn, Email} from "@mui/icons-material";
import './Footer.css';

function Footer() {
  const {theme} = useContext(ThemeContext);

  const copyright = () => {
      const year = new Date().getFullYear();
      return `© ${year} Hector Ramirez. All rights reserved.`;
  }

  return (
      <div className={`footer ${theme}`}>
          <p className={'footer-text'}>{copyright()}</p>
          <div className={'footer-link'}>
              <a href={'https://github.com/hectorrami'} target={'_blank'}>
                  <GitHub className={`${theme}`}/>
              </a>
              <a href={'https://www.linkedin.com/in/hector-ramirez-14ab63185'} target={'_blank'}>
                  <LinkedIn className={`${theme}`}/>
              </a>
          </div>
      </div>
  );
}

export default Footer;
