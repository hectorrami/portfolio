import React from 'react';
import { GitHub, Launch } from '@mui/icons-material';
import { projects } from '../../data/projects';

function ProjectsSection() {
  return (
    <div>
      <h1 className="text-center font-medium mb-0 font-mono text-lg">
        <span className="text-green-500 dark:text-green-400">$</span> ls ./projects
      </h1>
      <hr className="pt-4" />

      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 hover:border-green-400 dark:hover:border-green-500 transition-colors"
          >
            <h2 className="font-semibold text-lg mb-2 font-mono text-green-600 dark:text-green-400">
              {'>'} {project.title}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{project.description}</p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-mono rounded border border-green-300 dark:border-green-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center space-x-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center text-sm font-mono hover:underline"
              >
                <GitHub fontSize="small" className="mr-1" /> GitHub
              </a>
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 flex items-center text-sm font-mono hover:underline"
                >
                  <Launch fontSize="small" className="mr-1" /> Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsSection;
