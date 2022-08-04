import React from 'react';
import './Row.css';

function Row({ images }) {
  return (
    <div className="row">
      <h2>PROJECTS</h2>
      <div className="row_posters">
        {images.map((img) => (
          <div>
            <img src={img} alt="project" className="row_poster" />
            <h3 className="row-text">Netlix Clone</h3>
            <div className="banner_buttons">
              <button className="banner_button">GitHub</button>
              <button className="banner_button">Preview</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
