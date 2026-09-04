import React from 'react';
import Icon from './Icon';
import {
  clients,
  courses,
  peopleTrained,
  schedule,
} from '../config/site.config';

/*
 * Four countable facts, each with an icon that matches what it is counting
 * (people, tracks, calendar, buildings) instead of one icon repeated four
 * times. Three of the four are derived from the catalogue so they can't drift
 * out of date when a course is added.
 */

export default function FactStrip() {
  const facts = [
    { icon: 'groups', value: peopleTrained, label: 'people trained' },
    { icon: 'school', value: courses.length + 1, label: 'tracks' },
    { icon: 'calendar', value: schedule.length, label: 'class days a week' },
    { icon: 'building', value: clients.length, label: 'organisations trained' },
  ];

  return (
    <section className="facts" aria-label="Accomplitech in numbers">
      <dl className="facts__list">
        {facts.map((fact) => (
          <div className="facts__item" key={fact.label}>
            <div className="facts__glyph" aria-hidden="true">
              <Icon name={fact.icon} size={20} className="facts__icon" />
            </div>
            <div className="facts__body">
              <dt className="facts__value">{fact.value}</dt>
              <dd className="facts__label">{fact.label}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
