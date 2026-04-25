import React, { useState, useEffect } from 'react';
import JobExperience from './JobExperience';
import ProjectsSection from '../projects/ProjectSection';

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
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300">Houston, Texas</p>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 hover:border-green-400 dark:hover:border-green-500 transition-colors">
              <h2 className="font-mono font-semibold text-green-600 dark:text-green-400 mb-2">
                Current Role
              </h2>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
                Software Engineer @{' '}
                <a
                  href="https://www.jpmorganchase.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 underline"
                >
                  JPMorgan Chase
                </a>
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 hover:border-green-400 dark:hover:border-green-500 transition-colors">
              <h2 className="font-mono font-semibold text-green-600 dark:text-green-400 mb-2">
                Focus
              </h2>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
                Crafting efficient, scalable applications and resilient user experiences.
              </p>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 hover:border-green-400 dark:hover:border-green-500 transition-colors">
              <h2 className="font-mono font-semibold text-green-600 dark:text-green-400 mb-3">
                Connect
              </h2>
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.linkedin.com/in/hector-ramirez-14ab63185"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 underline font-mono text-sm"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/hectorrami"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 underline font-mono text-sm"
                >
                  GitHub
                </a>
                <a
                  href="mailto:heramire09@gmail.com"
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
          <JobExperience
            company="University of Houston"
            title="Bachelor of Science in Computer Science, Minor in Mathematics"
            location="Houston, TX"
            dateRange="Aug 2020"
            responsibilities={[]}
          />
        </div>

        {/* Experience Section */}
        <div
          className={`transition-opacity duration-1000 ${experienceVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <h1 className="text-center font-medium mb-0 font-mono text-lg">
            <span className="text-green-500 dark:text-green-400">$</span> cat experience.md
          </h1>
          <hr className="pt-4" />
          <JobExperience
            company="JPMorgan Chase & Co."
            title="Associate Software Engineer"
            location="Houston, TX"
            dateRange="Oct 2022 – Present"
            tools={['React', 'React Query', 'Java', 'TypeScript', 'Spring Boot']}
            responsibilities={[
              'Modernized an internal web application using React, React Query, and Java.',
              'Replaced a legacy Excel system with an intuitive UI for editing and submitting forms.',
              'Resolved critical defects and led production deployments for smooth releases.',
              'Collaborated with cross-functional teams to gather requirements and prioritize development.',
              'Worked on microservices architecture to ensure modular and scalable codebases.',
            ]}
          />
          <JobExperience
            company="PROS, Inc."
            title="Software Engineer"
            location="Houston, TX"
            dateRange="Aug 2020 – Aug 2022"
            tools={[
              'React',
              'JavaScript',
              'TypeScript',
              'Highcharts',
              'Jest',
              'React Testing Library',
            ]}
            responsibilities={[
              'Maintained and enhanced a data visualization app with 1,000+ monthly users.',
              'Built UI enhancements using React, JavaScript, TypeScript, and Highcharts.',
              'Achieved 100% test coverage using Jest and React Testing Library.',
              'Helped migrate a legacy system to React, improving usability and adoption.',
              'Collaborated with UX engineers and Product Managers to deliver complex features.',
            ]}
          />
        </div>

        {/* Project Section */}
        <div
          className={`transition-opacity duration-1000 ${experienceVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <ProjectsSection />
        </div>
      </main>
    </div>
  );
}

export default AboutExperience;
