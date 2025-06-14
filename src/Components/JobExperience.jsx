import React from 'react';

const JobExperience = ({ title, company, location, dateRange, responsibilities }) => (
	<div>
		<h2 className="font-semibold">{company} — {title}</h2>
		<p className="text-sm text-cgray dark:text-gray-400">{location} | {dateRange}</p>
		<ul className="list-disc list-inside mt-2 space-y-1 pb-2">
			{responsibilities.map((responsibility, index) => (
				<li key={index}>{responsibility}</li>
			))}
		</ul>
	</div>
);

export default JobExperience;