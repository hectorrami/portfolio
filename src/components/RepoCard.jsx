import React from 'react';
import languageColor from '../lib/languageColors';
import Avatar from './Avatar';

const compact = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const shortDate = (isoDate, locale) => {
  if (!isoDate) return '';
  return new Date(isoDate).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

function RepoCard({ project, blurb, locale = 'en-US' }) {
  const { github, repo, added } = project;
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
      className="group -mx-3 flex gap-3 rounded-xl px-3 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-surface-2/40"
    >
      <Avatar
        src={github?.avatar}
        initials={name.charAt(0).toUpperCase()}
        className="bg-zinc-100 text-zinc-500 dark:bg-surface-2 dark:text-ink-muted"
      />
      <div className="min-w-0">
        <p className="text-sm text-zinc-500 dark:text-ink-muted">
          <span className="font-semibold text-zinc-900 underline-offset-4 group-hover:underline dark:text-ink">
            {name}
          </span>
          {owner && (
            <>
              <span className="mx-1.5">·</span>
              {owner}
            </>
          )}
          {added && (
            <>
              <span className="mx-1.5">·</span>
              <time dateTime={added}>{shortDate(added, locale)}</time>
            </>
          )}
        </p>
        <p className="mt-1.5 leading-relaxed text-zinc-700 dark:text-ink-body">{blurb}</p>
        {github && (
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 dark:text-ink-muted">
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
