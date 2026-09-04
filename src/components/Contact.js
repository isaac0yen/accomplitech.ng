import React, { useState } from 'react';
import Icon from './Icon';
import { contact, formEndpoint } from '../config/site.config';

/*
 * One form, one purpose: reach the team. The previous version paired this with
 * a second "newsletter" form under the copy "Get started now try our product"
 * next to four stock testimonial avatars — a subscribe box for a training
 * company, with placeholder copy left over from whatever template it came
 * from. Removed rather than rewritten: nobody asked for a newsletter, and it
 * had no content to send.
 *
 * The single remaining form still posts to the same public Formspree endpoint
 * (src/config/site.config.js) that has been working here since launch.
 */

const initialForm = { fullName: '', email: '', phone: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: 'New enquiry from accomplitech.ng' }),
      });

      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);

      setStatus('sent');
      setForm(initialForm);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setStatus('error');
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__inner shell">
        <div className="contact__intro">
          <p className="eyebrow">Get in touch</p>
          <h2 className="section-title">Ask about a track, or book a call.</h2>
          <p className="lede">
            Fastest way to reach us is WhatsApp. Or send the form and we will
            reply by email, usually the same day.
          </p>

          <ul className="contact__channels">
            <li>
              <Icon name="whatsapp" size={20} />
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <Icon name="phone" size={20} />
              <a href={`tel:${contact.phone}`}>{contact.phoneLabel}</a>
            </li>
            <li>
              <Icon name="mail" size={20} />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <Icon name="pin" size={20} />
              <span>{contact.address}</span>
            </li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          {status === 'sent' ? (
            <p className="contact__success" role="status">
              Thanks — we have your message and will reply soon.
            </p>
          ) : (
            <>
              <div className="field">
                <label htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {status === 'error' && (
                <p className="contact__error" role="alert">
                  That didn't go through. Try again, or message us on
                  WhatsApp instead.
                </p>
              )}

              <button className="btn" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
