import React, {useContext} from 'react';
import {ThemeContext} from "../Providers/ThemeContext";
import global from '../Styles/global.css'
import './Row.css';

// To Do : Add Prop Validation
function Row({ projects }) {
    const {theme} = useContext(ThemeContext);

  return (
    <div className={`row ${theme}`}>
      <div className="row_posters">
        {projects.map((project) => (
          <div>
            <img src={project.img} alt="project" className="row_poster" />
            <h3 className={`row-text ${theme}`}>{project.title}</h3>
            <div className="banner_buttons">
              <button className="banner_button" type="button">
                <a href={project.githubLink}>Github</a>
              </button>
              <button className="banner_button" type="button">
                <a href={project.previewLink}>Demo</a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
