import React from 'react';

const JobExperience = ({ title, company, location, dateRange, responsibilities, tools = [] }) => (
  <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 hover:border-green-400 dark:hover:border-green-500 transition-colors mb-4">
    <div className="font-mono">
      <h2 className="font-semibold text-green-600 dark:text-green-400 mb-1">{company}</h2>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{title}</p>
      <p className="text-xs text-gray-500 dark:text-gray-500 italic mb-3">
        {location} | {dateRange}
      </p>

      {tools.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tools.map((tool, toolIndex) => (
            <span
              key={toolIndex}
              className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-mono rounded border border-green-300 dark:border-green-700"
            >
              {tool}
            </span>
          ))}
        </div>
      )}

      {responsibilities.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-2">
            Achievements:
          </p>
          <ul className="space-y-1">
            {responsibilities.map((responsibility, index) => (
              <li key={index} className="text-sm text-gray-700 dark:text-gray-300 ml-4">
                • {responsibility}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

export default JobExperience;
