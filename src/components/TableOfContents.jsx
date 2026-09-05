import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

// Where in the viewport counts as "what you are reading". A third of the way
// down, not the very top — the top of the screen is where a section you have
// already finished is still sitting.
const READ_LINE = 0.3;

const clamp = (value) => Math.min(1, Math.max(0, value));

// The table of contents, and the one piece of this site that is bespoke.
//
// Each entry's slot on the spine grows with the real pixel height of the
// section it points at, so a long section gets a long slot and the marker
// travelling down the spine moves at the speed you are actually reading.
// Evenly divided slots are the easy version, and they lie: the marker races
// through a 2,000-word section and stalls on a two-line one, and you can see
// it. The mapping below converts reading progress to a pixel offset by walking
// the measured slots, so it stays exact even where a short section's label
// forces its slot taller than its share.
function TableOfContents({ headings, containerRef, label }) {
  const spineRef = useRef(null);
  const itemRefs = useRef([]);
  // Section extents in page coordinates, plus each slot's box on the spine.
  const geometry = useRef({ top: 0, height: 1, sections: [], slots: [] });
  const [fill, setFill] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const spine = spineRef.current;
    if (!container || !spine) return;

    const pageY = (el) => el.getBoundingClientRect().top + window.scrollY;
    const top = pageY(container);
    const height = Math.max(container.offsetHeight, 1);

    // A section runs from its own heading to the next one. The first section
    // absorbs everything above it, so the spine starts full at the top of the
    // article rather than only once the first heading scrolls past.
    const tops = headings.map(({ id }) => {
      const el = document.getElementById(id);
      return el ? pageY(el) : top;
    });
    const sections = tops.map((start, i) => {
      const from = i === 0 ? top : start;
      const to = i === headings.length - 1 ? top + height : tops[i + 1];
      return { from, to: Math.max(to, from + 1) };
    });

    const spineTop = spine.getBoundingClientRect().top;
    const slots = itemRefs.current.slice(0, headings.length).map((el) => {
      if (!el) return { offset: 0, size: 0 };
      const box = el.getBoundingClientRect();
      return { offset: box.top - spineTop, size: box.height };
    });

    geometry.current = { top, height, sections, slots };
  }, [containerRef, headings]);

  const update = useCallback(() => {
    const { top, height, sections, slots } = geometry.current;
    if (!sections.length) return;

    const read = window.scrollY + window.innerHeight * READ_LINE;
    const progress = clamp((read - top) / height);
    const position = top + progress * height;

    let index = sections.findIndex(({ from, to }) => position >= from && position < to);
    if (index === -1) index = position < sections[0].from ? 0 : sections.length - 1;

    const { from, to } = sections[index];
    const within = clamp((position - from) / (to - from));
    const slot = slots[index] || { offset: 0, size: 0 };

    setActiveIndex(index);
    setFill(slot.offset + within * slot.size);
  }, []);

  useLayoutEffect(() => {
    measure();
    update();
  }, [measure, update]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    const onResize = () => {
      measure();
      update();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Web fonts and images land after the first measurement and move every
    // heading down the page, so measure again once they have.
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(onResize) : null;
    if (observer && containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (observer) observer.disconnect();
    };
  }, [containerRef, measure, update]);

  return (
    <nav aria-label={label} className="lg:sticky lg:top-16">
      <ol ref={spineRef} className="toc-spine relative pl-4">
        <span
          aria-hidden="true"
          className="toc-fill"
          style={{ height: `${Math.max(fill, 0)}px` }}
        />
        {headings.map((heading, index) => (
          <li
            key={heading.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={heading.depth === 3 ? 'pl-3' : ''}
          >
            <a
              href={`#${heading.id}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className={`meta block py-1.5 transition-colors hover:text-ink ${
                index === activeIndex ? 'text-ink' : ''
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default TableOfContents;
