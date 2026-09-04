import React, { useEffect, useState } from 'react';
import { responsive } from '../media/images';
import { schedule } from '../config/site.config';

const SHOW_PHOTO_QUERY = '(min-width: 701px)';

/** Avoids fetching the hero photo at all on screens where it isn't shown. */
function useShowHeroPhoto() {
  const [show, setShow] = useState(
    () => typeof window === 'undefined' || window.matchMedia(SHOW_PHOTO_QUERY).matches
  );

  useEffect(() => {
    const media = window.matchMedia(SHOW_PHOTO_QUERY);
    const onChange = (event) => setShow(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return show;
}

/*
 * Copy note: the previous hero read "Welcome to Accomplitech" over a paragraph
 * about equipping people for "today's fast-paced digital world". A headline
 * that greets you tells a visitor nothing, so this one states what is taught,
 * where, and to whom.
 *
 * Fills the viewport under the sticky masthead (100vh - navbar height) on
 * screens tall enough for that to make sense. The photo sits inside the same
 * shell container as the rest of the site (not edge-to-edge full-bleed) so it
 * is never displayed wider than the widths it was actually generated at, and
 * drops out entirely on small screens rather than shrinking a wide crop into
 * a cramped box.
 */

export default function Hero() {
  const times = schedule.map((slot) => `${slot.day} ${slot.time}`).join(' · ');
  const showPhoto = useShowHeroPhoto();

  return (
    <section className="hero" id="top">
      <div className="hero__inner shell">
        <div className="hero__copy">
          <p className="eyebrow">Lagos · on site or online</p>
          <h1 className="hero__title">
            Analytics, design and development, taught in small Lagos cohorts.
          </h1>
          <p className="hero__lede">
            Six tracks, from spreadsheets through to Python, UI design, web
            development and security. Classes run {times}, at our Ahmadiya
            campus or online, whichever you can get to.
          </p>
          <div className="hero__actions">
            <a className="btn" href="#courses">
              See the six tracks
            </a>
            <a className="btn btn--outline" href="#contact">
              Ask us a question
            </a>
          </div>
        </div>

        {showPhoto && (
          <div className="hero__media">
            <img
              {...responsive('cohort-group', '1240px')}
              width="2400"
              height="926"
              alt="A large group of Accomplitech students standing together at the front of a classroom at the end of a session."
              fetchpriority="high"
              decoding="async"
            />
          </div>
        )}
      </div>
    </section>
  );
}
