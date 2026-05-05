import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobExperience from './JobExperience';
import ProjectsSection from '../projects/ProjectSection';
import { education, experience } from '../../data/experience';
import { PERSONAL } from '../../data/personal';

function AboutExperience() {
  const [aboutVisible, setAboutVisible] = useState(false);
  const [experienceVisible, setExperienceVisible] = useState(false);

  useEffect(() => {
    setAboutVisible(true);

    const timer = setTimeout(() => {
      setExperienceVisible(true);
    }, 200);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-gray-900 text-black dark:text-white`}
    >
      <main className="max-w-[70ch] mx-auto w-full space-y-2 mb-12 md:mb-14">
        {/* About Section */}
        <div
          className={`transition-opacity duration-1000 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <h1 className="text-center font-medium mb-0 font-mono text-lg">
            <span className="text-green-500 dark:text-green-400">$</span> cat about.md
          </h1>
          <hr className="pt-4" />
          <div className="space-y-3">
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 hover:border-green-400 dark:hover:border-green-500 transition-colors">
              <h2 className="font-mono font-semibold text-green-600 dark:text-green-400 mb-2">
                Location
              </h2>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
                {PERSONAL.location}
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 hover:border-green-400 dark:hover:border-green-500 transition-colors">
              <h2 className="font-mono font-semibold text-green-600 dark:text-green-400 mb-2">
                Current Role
              </h2>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
                Software Engineer @{' '}
                <a
                  href={PERSONAL.employer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 underline"
                >
                  {PERSONAL.employer.name}
                </a>
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 hover:border-green-400 dark:hover:border-green-500 transition-colors">
              <h2 className="font-mono font-semibold text-green-600 dark:text-green-400 mb-2">
                Focus
              </h2>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300">{PERSONAL.focus}</p>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 hover:border-green-400 dark:hover:border-green-500 transition-colors">
              <h2 className="font-mono font-semibold text-green-600 dark:text-green-400 mb-3">
                Connect
              </h2>
              <div className="flex items-center space-x-4">
                <a
                  href={PERSONAL.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 underline font-mono text-sm"
                >
                  LinkedIn
                </a>
                <a
                  href={PERSONAL.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 underline font-mono text-sm"
                >
                  GitHub
                </a>
                <a
                  href={`mailto:${PERSONAL.links.email}`}
                  className="text-blue-500 hover:text-blue-400 underline font-mono text-sm"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Education Section */}
        <div
          className={`transition-opacity duration-1000 ${experienceVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <h1 className="text-center font-medium mb-0 font-mono text-lg">
            <span className="text-green-500 dark:text-green-400">$</span> cat education.md
          </h1>
          <hr className="pt-4" />
          {education.map((entry) => (
            <JobExperience
              key={entry.id}
              company={entry.company}
              title={entry.title}
              location={entry.location}
              dateRange={entry.dateRange}
              responsibilities={entry.responsibilities}
            />
          ))}
        </div>

        {/* Experience Section */}
        <div
          className={`transition-opacity duration-1000 ${experienceVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <h1 className="text-center font-medium mb-0 font-mono text-lg">
            <span className="text-green-500 dark:text-green-400">$</span> cat experience.md
          </h1>
          <hr className="pt-4" />
          {experience.map((entry) => (
            <JobExperience
              key={entry.id}
              company={entry.company}
              title={entry.title}
              location={entry.location}
              dateRange={entry.dateRange}
              responsibilities={entry.responsibilities}
              tools={entry.tools}
            />
          ))}
        </div>

        {/* Project Section */}
        <div
          className={`transition-opacity duration-1000 ${experienceVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <ProjectsSection />
        </div>

        {/* Work In Progress Section */}
        <div
          className={`transition-opacity duration-1000 ${experienceVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <h1 className="text-center font-medium mb-0 font-mono text-lg">
            <span className="text-green-500 dark:text-green-400">$</span> ls ./in-progress
          </h1>
          <hr className="pt-4" />

          <Link to="/stockanalysis" className="block group">
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 hover:border-green-400 dark:hover:border-green-500 transition-colors relative overflow-hidden">
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c8ff00] via-[#00d4ff] to-[#ff6b35]" />

              <div className="flex items-start justify-between mb-2">
                <h2 className="font-semibold text-lg font-mono text-green-600 dark:text-green-400">
                  {'>'} stockanalysis
                </h2>
                <span className="px-2 py-0.5 text-xs font-mono rounded-full border border-yellow-400/50 text-yellow-400 bg-yellow-400/10">
                  in progress
                </span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Full-stack stock intelligence platform for long-term buy-and-hold growth investors.
                Analyses stocks through an opinionated investment framework — scorecards, AI
                summaries, risk analysis, and portfolio tracking. Not a data dump.
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {['React', 'Node.js', 'Express', 'Supabase', 'Claude API', 'FMP API', 'Stripe'].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-mono rounded border"
                      style={{
                        background: 'rgba(200,255,0,0.08)',
                        borderColor: 'rgba(200,255,0,0.3)',
                        color: '#c8ff00',
                      }}
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>

              <span className="text-sm font-mono text-green-500 dark:text-green-400 group-hover:underline">
                → View mockup
              </span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default AboutExperience;
