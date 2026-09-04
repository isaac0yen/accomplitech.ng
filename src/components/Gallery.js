import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Icon from './Icon';
import { responsive } from '../media/images';
import { gallery } from '../config/site.config';

/*
 * Uses embla-carousel-react rather than a hand-rolled scroller: the previous
 * version overflowed the viewport width because a `margin-inline: -var(--gutter)`
 * trick on the track fought with the section's own padding and it dragged the
 * whole page into horizontal scroll on some widths. Embla scopes its own
 * scroll container properly and this is the same library approach the site
 * used before (Swiper), just lighter and with no autoplay. Loops rather than
 * stopping at the last photo.
 *
 * Captions state what is happening in each photo rather than sitting there
 * as decoration.
 */

export default function Gallery() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' });

  return (
    <section className="gallery" id="sessions">
      <div className="gallery__head shell">
        <div>
          <p className="eyebrow">In the classroom</p>
          <h2 className="section-title">A few sessions, as they happened.</h2>
        </div>
        <div className="gallery__controls">
          <button
            type="button"
            aria-label="Scroll to previous photo"
            onClick={() => embla?.scrollPrev()}
          >
            <Icon name="chevronLeft" size={20} />
          </button>
          <button
            type="button"
            aria-label="Scroll to next photo"
            onClick={() => embla?.scrollNext()}
          >
            <Icon name="chevronRight" size={20} />
          </button>
        </div>
      </div>

      <div className="gallery__viewport shell" ref={emblaRef}>
        <ul className="gallery__track">
          {gallery.map((shot, index) => (
            <li className="gallery__item" key={shot.file}>
              <figure className="figure">
                <img
                  {...responsive(shot.file, '(max-width: 700px) 85vw, 380px')}
                  width="900"
                  height="600"
                  alt={shot.caption}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <figcaption>{shot.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
