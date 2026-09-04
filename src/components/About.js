import React from 'react';
import { responsive } from '../media/images';
import { testimonials } from '../config/site.config';

/*
 * Copy note: the previous version of this section called the company "an EduTech
 * leader dedicated to transforming individuals into proficient professionals"
 * and promised to prepare you "for today's digital economy" as "a tech-driven
 * leader". Three sentences that never said what happens in a class. This says
 * what is taught, to whom, and how enrolment works, which is the same
 * information with the padding removed.
 *
 * The quote is the one testimonial on the site that is attributed to a named
 * person. The four generic avatar circles that used to sit under it were stock
 * portraits of nobody connected to the company, so they are gone.
 */

export default function About() {
  const [featured] = testimonials;

  return (
    <section className="about" id="about">
      <div className="about__inner shell">
        <div className="about__body">
          <p className="eyebrow">About us</p>
          <h2 className="section-title">
            A training company in Lagos, not a video library.
          </h2>
          <p className="lede">
            We teach data analytics, UI/UX design, web development, graphics
            design and cybersecurity, to people changing career and to teams
            that want more out of the data they already collect.
          </p>
          <p className="about__para">
            Classes are small, and they run the same way whether you are in the
            room at Ahmadiya or joining online. You can take a track on your
            own, sit with a cohort, or bring a whole team and we will write the
            programme around the work you already do.
          </p>

          {featured && (
            <figure className="quote">
              <blockquote>{featured.quote}</blockquote>
              <figcaption>
                <span className="quote__name">{featured.name}</span>
                <span className="quote__role">{featured.role}</span>
              </figcaption>
            </figure>
          )}
        </div>

        <figure className="figure about__figure">
          <img
            {...responsive('classroom', '(max-width: 900px) 100vw, 40vw')}
            width="1120"
            height="840"
            alt="Students seated at desks with laptops and notebooks, watching a presentation during an Accomplitech class."
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            A weekend class in progress at the Ahmadiya campus.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
