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
				</main>
			</div>
		</div>
	);
};

export default AboutExperience;
