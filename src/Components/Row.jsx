import React, { useContext } from 'react';
import { ThemeContext } from "../Providers/ThemeContext";
import SkillsChart from "./SkillsChart";
import global from '../Styles/global.css'
import './Row.css';

function Row({ projects }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`row ${theme} ${theme === 'light' ? 'row-light' : 'row-dark'}`}>
      <h3 className="row-text">Projects</h3>
      <div className="row_posters">
        {projects && projects.map((project) => (
          <div>
            <img src={project.img} alt="project" className="row_poster" />
            <h3 className="row-text">{project.title}</h3>
            <p className="row-text">{project.description}</p>
            <div className={`banner_buttons`}>
              <a className={`banner_button  ${theme}`} href={project.githubLink}>Github</a>
              <a className={`banner_button  ${theme}`} href={project.previewLink}>Demo</a>
            </div>
          </div>
        ))}
      </div>
      <div className="row_posters">
        <SkillsChart />
      </div>
    </div>
  );
}

export default Row;
