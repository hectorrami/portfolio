import React from 'react';
import './Experience.css';

function Experience() {
  return (
    <div className="experience">
      <h1>EXPERIENCE</h1>
      <div className="experience-container">
        <div className="experience-item item-1 fromLeft">
          <h2>Pros, Inc</h2>
          <h5>Software Engineer, Aug 2020 - Aug 2022</h5>
          <ul>
            <li>
              Supported a data visualization web application with over 10,000
              monthly active users
            </li>
            <li>
              Implemented enhancements to existing user interface utilizing
              React, Redux, and TypeScript
            </li>
            <li>
              Improved test and code coverage to 100% by utilizing Jest and
              Enzyme
            </li>
            <li>
              Designed and documented technical designs for complex features by
              collaborating with UX engineers and product managers
            </li>
          </ul>
        </div>
        <div className="experience-item item-2 fromBehind">
          <h2>University of Houston</h2>
          <h5>IT Assistant, Aug 2019 - Mar 2020</h5>
          <ul>
            <li>
              Assisted in running software installations and updates on
              classroom desktops and laptops
            </li>
            <li>
              Assisted in setting up Deep Freeze anti-virus software to
              guarantee 100% workstation recovery
            </li>
          </ul>
        </div>
        <div className="experience-item item-3 fromRight">
          <h2>Embarcadero Technologies</h2>
          <h5>Software Engineer Intern, May 2019 - Aug 2019</h5>
          <ul>
            <li>
              Ensured common third-party or open-source C++ libraries build and
              function correctly with the toolchain
            </li>
            <li>
              Built native Windows C++ Apps and integrated continuous build
              configurations with CMake
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Experience;
