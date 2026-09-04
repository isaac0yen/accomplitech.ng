import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { image } from '../media/images';
import { nav } from '../config/site.config';

/*
 * Below 768px the previous header set `.nav-links { display: none }` and offered
 * nothing in its place, so every section of the site was unreachable on a phone
 * apart from by scrolling. This adds a real disclosure: labelled trigger,
 * aria-expanded, Escape to close, focus returned to the trigger, and the
 * background locked while the panel is open.
 */

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 16);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector('a')?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <header className={`masthead${atTop && !open ? ' masthead--transparent' : ''}`}>
      <div className="masthead__inner shell">
        <a className="masthead__brand" href="#top">
          <img
            src={image('logo-96')}
            srcSet={`${image('logo-96')} 96w, ${image('logo-192')} 192w`}
            sizes="44px"
            width="44"
            height="43"
            alt="Accomplitech"
          />
          <span>Accomplitech</span>
        </a>

        <nav className="masthead__nav" aria-label="Sections">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn masthead__cta" href="#contact">
          Get in touch
        </a>

        <button
          ref={triggerRef}
          type="button"
          className="masthead__toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
          <span className="visually-hidden">
            {open ? 'Close menu' : 'Open menu'}
          </span>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="mobile-nav"
          ref={panelRef}
          onClick={(event) => {
            // Any link tap should dismiss the panel, not leave it covering the
            // section the user just jumped to.
            if (event.target.closest('a')) close();
          }}
        >
          <nav aria-label="Sections">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href="#contact" className="mobile-nav__cta">
              Get in touch
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
