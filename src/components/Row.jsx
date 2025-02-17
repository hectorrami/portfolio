import React, {useContext} from 'react';
import {ThemeContext} from "../Providers/ThemeContext";
import SkillsChart from "./SkillsChart";
import global from '../Styles/global.css'
import './Row.css';

// To Do : Add Prop Validation
function Row({ projects }) {
    const {theme} = useContext(ThemeContext);

  return (
      <div className={`row ${theme} ${theme === 'light' ? 'row-light' : 'row-dark'}`}>
          <div className="row_posters">
            <SkillsChart />
          </div>
      </div>
  );
}

export default Row;
