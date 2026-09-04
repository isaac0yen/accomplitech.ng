import React from 'react';
import { image } from '../media/images';
import { clients } from '../config/site.config';

/*
 * Logos render at their own aspect ratio (width/height come straight from the
 * source files in site.config.js) rather than being forced into a uniform
 * height. Full colour, no grayscale filter.
 *
 * Five logos of different shapes wrapping onto a second line on a narrow
 * screen looked messy, so on mobile the row becomes a horizontal scroller
 * instead of wrapping. On larger screens, where all five fit on one line
 * without crowding, it stays a plain flex row.
 */

export default function Clients() {
  return (
    <section className="clients" id="clients">
      <div className="clients__inner shell">
        <div className="clients__label">
          <p className="eyebrow">Clients</p>
          <h2 className="clients__title">
            We have trained people at these organisations.
          </h2>
        </div>

        <ul className="clients__row">
          {clients.map((client) => (
            <li key={client.name}>
              <img
                src={image(client.file)}
                alt={client.name}
                width={client.width}
                height={client.height}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
