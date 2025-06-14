import React from 'react';
import { GitHub, Launch } from '@mui/icons-material';

function ProjectsSection() {
	return (
		<div>
			<h1 className="text-center font-medium mb-0">Projects</h1>
			<hr className="pt-4" />

			{/* Project 1 */}
			<div className="mb-8">
				<h2 className="font-semibold text-lg mb-1">Netflix Clone</h2>
				<p className="text-sm text-cgray dark:text-gray-400 mb-2">
					A front-end recreation of the Netflix user interface, demonstrating responsive design and dynamic content display
				</p>
				<p className="text-sm mb-2">
					<span className="font-medium">Tech Stack:</span> React, Netlify
				</p>
				<div className="flex items-center space-x-4">
					<a href="https://github.com/hectorrami/Neflix-clone/tree/main/netflix-clone" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 flex items-center">
						<GitHub fontSize='small' className="mr-1" /> GitHub Repo
					</a>
					<a href="https://netflix-clone-39324.web.app/" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-600 flex items-center">
						<Launch fontSize='small' className="mr-1" /> Live Demo
					</a>
				</div>
				{/* Placeholder for an image */}
			</div>

			{/* Project 2 */}
			<div className="mb-8">
				<h2 className="font-semibold text-lg mb-1">Portfolio Website</h2>
				<p className="text-sm text-cgray dark:text-gray-400 mb-2">
					The very portfolio you're viewing, built from scratch to showcase skills and projects.
				</p>
				<p className="text-sm mb-2">
					<span className="font-medium">Tech Stack:</span> React, Vite, Tailwind CSS
				</p>
				<div className="flex items-center space-x-4">
					<a href="https://github.com/hectorrami/portfolio" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600 flex items-center">
						<GitHub fontSize='small' className="mr-1" /> GitHub Repo
					</a>
				</div>
			</div>
		</div>
	);
}

export default ProjectsSection;