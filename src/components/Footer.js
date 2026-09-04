import React from 'react';
import Icon from './Icon';
import { image } from '../media/images';
import { contact, nav, social } from '../config/site.config';

/*
 * The previous footer linked "Policy", "Complaint Handling" and "Terms and
 * Conditions" to a WhatsApp number instead of actual documents, and a
 * Twitter icon to a bare "#twitter" anchor. Those links are removed rather
 * than left pointing at the wrong place — publish the real pages first and
 * add them back.
 */

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner shell">
        <div className="site-footer__brand">
          <img src={image('logo-96')} alt="" width="36" height="35" />
          <div>
            <p className="site-footer__name">Accomplitech</p>
            <p className="site-footer__address">{contact.address}</p>
          </div>
        </div>

        <nav className="site-footer__nav" aria-label="Sections">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-footer__contact">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phone}`}>{contact.phoneLabel}</a>
          <ul className="site-footer__social">
            {social.map((item) => (
              <li key={item.label}>
                <a href={item.href} aria-label={item.label} target="_blank" rel="noopener noreferrer">
                  <Icon name={item.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="site-footer__legal shell">
        &copy; {new Date().getFullYear()} Accomplitech.
      </p>
    </footer>
  );
}
