import React from 'react';
import languageColor from '../lib/languageColors';

const compact = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

function RepoCard({ project, blurb }) {
  const { github, repo } = project;
  const [fallbackOwner, fallbackName] = repo.split('/');
  const name = github?.name || fallbackName || repo;
  const owner = github?.owner || fallbackOwner || '';
  const href = github?.url || `https://github.com/${repo}`;
  const color = languageColor(github?.language);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-xl border border-zinc-200 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/40"
    >
      <div
        className="oss-plate flex aspect-[2/1] items-center justify-center border-b border-zinc-200 dark:border-zinc-800"
        style={{ '--lang': color }}
      >
        {github?.avatar ? (
          <img
            src={github.avatar}
            alt=""
            width="52"
            height="52"
            loading="lazy"
            className="h-[52px] w-[52px] rounded-xl"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-white/70 text-xl font-semibold text-zinc-500 dark:bg-zinc-900/70 dark:text-zinc-400"
          >
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold tracking-tight text-zinc-900 group-hover:underline underline-offset-4 dark:text-zinc-100">
          {name}
        </h3>
        {owner && <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">{owner}</p>}
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{blurb}</p>
        {github && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
            {github.language && (
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {github.language}
              </span>
            )}
            {typeof github.stars === 'number' && (
              <span className="inline-flex items-center gap-1">
                <span aria-hidden="true">★ {compact.format(github.stars)}</span>
                <span className="sr-only">{github.stars.toLocaleString('en-US')} stars</span>
              </span>
            )}
            {github.license && <span>{github.license}</span>}
          </div>
        )}
      </div>
    </a>
  );
}

export default RepoCard;
