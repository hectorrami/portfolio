import React, { useState, useEffect } from 'react';
import { GitHub, LinkedIn, Email, Launch } from '@mui/icons-material';
import JobExperience from './JobExperience';
import ProjectsSection from './ProjectSection';

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
		<div className={`min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-gray-900 text-black dark:text-white`}>
			<main className="max-w-[70ch] mx-auto w-full space-y-2 mb-12 md:mb-14">
				{/* About Section */}
				<div
					className={`transition-opacity duration-1000 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}
				>
					<h1 className="text-center font-medium mb-0">About</h1>
					<hr className="pt-4" />
					<p className="text-black dark:text-white leading-snug">
						I am a software engineer based in Houston, Texas, currently working as a full-stack developer at
						<a href="https://www.jpmorganchase.com/" className="text-cblack hover:text-cblack border-b-2 border-cgreen/40 hover:border-cgreen transition-colors after:ml-1"> JPMorganChase.</a>
					</p>
					<br />
					<p className="text-black dark:text-white leading-snug">Connect with me:
						<a
							href="https://www.linkedin.com/in/hector-ramirez-14ab63185"
							className="ml-2  no-underline hover:underline transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							LinkedIn<span className="inline-block ml-1 text-xs align-super">&#x2197;</span>
						</a>
						<a
							href="https://github.com/hectorrami"
							className="ml-2  no-underline hover:underline transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub<span className="inline-block ml-1 text-xs align-super">&#x2197;</span>
						</a>
						<a
							href="mailto:heramire09@gmail.com"
							className="ml-2  no-underline hover:underline transition-colors"
						>
							Email
						</a>
					</p>
				</div>

				{/* Experience Section */}
				<div
					className={`transition-opacity duration-1000 ${experienceVisible ? 'opacity-100' : 'opacity-0'}`}
				>
					<h1 className="text-center font-medium mb-0">Experience</h1>
					<hr className="pt-4" />
					<JobExperience
						company="JPMorgan Chase & Co."
						title="Associate Software Engineer"
						location="Houston, TX"
						dateRange="Oct 2022 – Present"
						responsibilities={[
							"Modernized an internal web application using React, React Query, and Java.",
							"Replaced a legacy Excel system with an intuitive UI for editing and submitting forms.",
							"Resolved critical defects and led production deployments for smooth releases.",
							"Collaborated with cross-functional teams to gather requirements and prioritize development.",
							"Worked on microservices architecture to ensure modular and scalable codebases."
						]}
					/>
					<JobExperience
						company="PROS, Inc."
						title="Software Engineer"
						location="Houston, TX"
						dateRange="Aug 2020 – Aug 2022"
						responsibilities={[
							"Maintained and enhanced a data visualization app with 1,000+ monthly users.",
							"Built UI enhancements using React, JavaScript, TypeScript, and Highcharts.",
							"Achieved 100% test coverage using Jest and React Testing Library.",
							"Helped migrate a legacy system to React, improving usability and adoption.",
							"Collaborated with UX engineers and Product Managers to deliver complex features."
						]}
					/>
				</div>

				{/*Project Section*/}
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
