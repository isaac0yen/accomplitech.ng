import React from 'react';
import { schedule } from '../config/site.config';
import { image } from '../media/images';

/*
 * First viewport under the sticky masthead, now with the actual cohort photo
 * behind the copy so the opening message and campus imagery read as one idea.
 */

export default function Hero() {
  const times = schedule.map((slot) => `${slot.day} ${slot.time}`).join(' · ');
  const heroImage = image('cohort-group');

  return (
    <section className="hero" id="top">
      <div className="hero__media" aria-hidden="true">
        <img
          src={heroImage}
          className="hero__image"
          width="6016"
          height="4000"
          alt=""
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__inner shell">
        <div className="hero__copy">
          <p className="eyebrow">Lagos · on site or online</p>
          <h1 className="hero__title">Learn analytics, design and code in Lagos.</h1>
          <p className="hero__lede">
            Six tracks. Classes {times}. Campus in Ahmadiya, or join online.
          </p>
          <div className="hero__actions">
            <a className="btn btn--on-dark" href="#courses">
              See the six tracks
            </a>
            <a className="btn btn--outline hero__btn-outline" href="#contact">
              Ask us a question
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
