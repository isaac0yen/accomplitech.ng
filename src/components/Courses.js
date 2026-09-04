import React, { useState } from 'react';
import Icon from './Icon';
import {
  contact,
  corporateTraining,
  courses,
  registrationUrl,
  schedule,
} from '../config/site.config';

/*
 * Cards in a 3-up grid (2-up, then 1-up as the screen narrows) rather than
 * full-width rows, which ran long and made the section feel much longer than
 * five tracks warrants. The weekly schedule is the same for every track, so
 * it is stated once above the grid instead of repeated on each card.
 *
 * Only the first row (3 cards) shows by default; the rest sit behind a "View
 * more tracks" toggle so the section doesn't run long on a page that also has
 * a gallery, a contact form and a footer below it.
 *
 * Team training is priced by consultation rather than per seat, so it is not
 * a sixth card pretending to be comparable. It gets its own block below.
 *
 * The old markup drove formatting by scanning detail strings for "*second
 * header*" and "*footer*" markers. The catalogue now uses real fields, so
 * that parser is gone.
 */

const VISIBLE_COUNT = 3;

export default function Courses() {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = courses.length - VISIBLE_COUNT;
  const visibleCourses = expanded ? courses : courses.slice(0, VISIBLE_COUNT);

  return (
    <section className="courses" id="courses">
      <div className="shell">
        <div className="courses__head">
          <div>
            <p className="eyebrow">Courses</p>
            <h2 className="section-title">
              Six tracks. Take one yourself, or bring your team.
            </h2>
          </div>
          <p className="courses__intro">
            Every track runs both at the Lagos campus and online, and can be
            taken on your own or alongside a cohort. Fees are per person in US
            dollars.
          </p>
        </div>

        <p className="courses__schedule">
          <Icon name="clock" size={17} />
          <span>
            All tracks meet{' '}
            {schedule.map((slot, index) => (
              <React.Fragment key={slot.day}>
                {index > 0 && ' and '}
                <strong>
                  {slot.day} {slot.time}
                </strong>
              </React.Fragment>
            ))}
            .
          </span>
        </p>

        <ol className="courses__grid">
          {visibleCourses.map((course) => (
            <li className="course" key={course.id}>
              <h3 className="course__title">{course.title}</h3>
              <p className="course__summary">{course.summary}</p>
              <ul className="tools" aria-label={`${course.title} covers`}>
                {course.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>

              <dl className="course__meta">
                <div>
                  <dt>Length</dt>
                  <dd>{course.duration}</dd>
                </div>
                <div>
                  <dt>Fee</dt>
                  <dd className="course__price">{course.price}</dd>
                </div>
              </dl>

              <a
                className="link-arrow course__action"
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Register</span>
                <Icon name="arrowForward" size={16} />
                <span className="visually-hidden">
                  for {course.title} (opens in a new tab)
                </span>
              </a>
            </li>
          ))}
        </ol>

        {hiddenCount > 0 && (
          <button
            type="button"
            className="courses__toggle"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? 'Show fewer tracks' : `View ${hiddenCount} more tracks`}
          </button>
        )}

        <div className="corporate">
          <div className="corporate__body">
            <p className="eyebrow">Team training</p>
            <h3 className="corporate__title">{corporateTraining.title}</h3>
            <p className="corporate__summary">{corporateTraining.summary}</p>
            <ul className="corporate__points">
              {corporateTraining.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="corporate__aside">
            <dl className="corporate__meta">
              <div>
                <dt>Covers</dt>
                <dd>{corporateTraining.tools.join(', ')}</dd>
              </div>
              <div>
                <dt>Fee</dt>
                <dd>{corporateTraining.price}</dd>
              </div>
            </dl>
            <a className="btn" href="#contact">
              Book a consultation
            </a>
            <p className="corporate__phone">
              Or call{' '}
              <a href={`tel:${contact.phone}`}>{contact.phoneLabel}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
