import React from 'react';
import languageColor from '../lib/languageColors';

const compact = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

// One entry in the open source index. Not a card: no fill, no shadow, no
// avatar. The language hangs in the rail, where it lines up with every other
// entry's language down the page and becomes the thing you can scan. The name
// carries the emphasis, the blurb is set in the reading face, and the counts
// sit on one mono line beneath it.
//
// The rail is deliberately outside the link: marginalia annotates the entry,
// it isn't part of the target you click.
function RepoCard({ project, blurb }) {
  const { github, repo } = project;
  const [fallbackOwner, fallbackName] = repo.split('/');
  const name = github?.name || fallbackName || repo;
  const owner = github?.owner || fallbackOwner || '';
  const href = github?.url || `https://github.com/${repo}`;
  const color = languageColor(github?.language);

  return (
    <div className="rail-grid py-7">
      <p className="meta pt-1.5">
        {github?.language && (
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-[6px] w-[6px] shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
            {github.language}
          </span>
        )}
      </p>
      <a href={href} target="_blank" rel="noopener noreferrer" className="row-link group block">
        <p className="display text-[1.0625rem] font-semibold text-ink">
          <span className="row-title">{name}</span>
          {owner && <span className="ml-2 font-normal text-ink-muted">{owner}</span>}
        </p>
        <p className="mt-2 font-serif text-[1.0625rem] leading-relaxed text-ink-body">{blurb}</p>
        {github && (
          <p className="meta mt-3 flex flex-wrap items-center gap-x-6 gap-y-1">
            {typeof github.stars === 'number' && (
              <span>
                <span aria-hidden="true">{compact.format(github.stars)} stars</span>
                <span className="sr-only">{github.stars.toLocaleString('en-US')} stars</span>
              </span>
            )}
            {github.license && <span>{github.license}</span>}
          </p>
        )}
      </a>
    </div>
  );
}

export default RepoCard;
