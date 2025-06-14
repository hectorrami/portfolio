// src/components/ScrollProgressIndicator.jsx
import React, { useState, useEffect } from 'react';

const ScrollProgressIndicator = () => {
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const totalScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			const scrolled = document.documentElement.scrollTop;

			if (totalScrollHeight > 0) {
				const progress = (scrolled / totalScrollHeight) * 100;
				setScrollProgress(progress);
			} else {
				setScrollProgress(0);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className="fixed top-0 left-0 w-full h-1 bg-white dark:bg-gray-900 z-50">
			<div
				className="h-full transition-all duration-100 ease-out"
				// Using an arbitrary value for the background with a linear gradient
				// This gradient goes from amber-500 to yellow-400
				style={{
					width: `${scrollProgress}%`,
					backgroundImage: 'linear-gradient(to right,rgb(159, 62, 194),rgb(74, 65, 189))' // amber-500 to yellow-400
				}}
			></div>
		</div>
	);
};

export default ScrollProgressIndicator;