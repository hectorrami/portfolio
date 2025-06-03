import React from 'react';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

const AboutExperience = () => {
	return (
		<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 bg-cwhite dark:bg-dm-background text-cblack dark:text-dm-foreground">
				<main className="max-w-[60ch] mx-auto w-full space-y-6 mb-12 md:mb-14">
					<div>
						<h1 className="text-center font-medium mb-0">About</h1>
						<hr className="pt-4" />
						<p className="text-black dark:text-dm-foreground leading-snug">
							I'm a software engineer based in Houston, Texas, currently working as a full-stack developer at
							<a href="https://www.jpmorganchase.com/" className="text-cblack hover:text-cblack border-b-2 border-cgreen/40 hover:border-cgreen transition-colors after:ml-1"> JPMorganChase.</a>
						</p>
						<br></br>
						<p className="text-black dark:text-dm-foreground leading-snug">Connect with me :
							<a href="mailto:heramire09@gmail.com"> <Email fontSize='small' /></a>,
							<a href="https://www.linkedin.com/in/hector-ramirez-14ab63185"> <LinkedIn fontSize='small' /></a>,
							<a href="https://github.com/hectorrami"> <GitHub fontSize='small' /></a>
						</p>
					</div>
					<div>
						<h1 className="text-center font-medium mb-0">Experience</h1>
						<hr className="pt-4" />
						<div className="text-black dark:text-dm-foreground leading-snug space-y-4">
							<div>
								<h2 className="font-semibold">JPMorgan Chase & Co. — Associate Software Engineer</h2>
								<p className="text-sm text-cgray dark:text-gray-400">Houston, TX | Oct 2022 – Present</p>
								<ul className="list-disc list-inside mt-2 space-y-1">
									<li>Modernized an internal web application using React, React Query, and Java.</li>
									<li>Replaced a legacy Excel system with an intuitive UI for editing and submitting forms.</li>
									<li>Resolved critical defects and led production deployments for smooth releases.</li>
									<li>Collaborated with cross-functional teams to gather requirements and prioritize development.</li>
									<li>Worked on microservices architecture to ensure modular and scalable codebases.</li>
								</ul>
							</div>
						</div>
					</div>

					<div>
						<h2 className="font-semibold">PROS, Inc. — Software Engineer</h2>
						<p className="text-sm text-cgray dark:text-gray-400">Houston, TX | Aug 2020 – Aug 2022</p>
						<ul className="list-disc list-inside mt-2 space-y-1">
							<li>Maintained and enhanced a data visualization app with 1,000+ monthly users.</li>
							<li>Built UI enhancements using React, JavaScript, TypeScript, and Highcharts.</li>
							<li>Achieved 100% test coverage using Jest and React Testing Library.</li>
							<li>Helped migrate a legacy system to React, improving usability and adoption.</li>
							<li>Collaborated with UX engineers and Product Managers to deliver complex features.</li>
						</ul>
					</div>
				</main>
			</div>
		</div>
	);
};

export default AboutExperience;
