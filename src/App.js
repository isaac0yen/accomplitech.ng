import React, { useState } from 'react';
import './App.css';

import curvedLine from './webp/curved-line.webp';
import illustration from './assets/edits-43.jpg';
import illustration2 from './assets/edits-36.jpg';
import logo from './webp/logo-main.webp';
import peopleIcon from './webp/people-icon.webp';
import service1 from './webp/service1.webp';
import service2 from './webp/service2.webp';
import service3 from './webp/service3.webp';
import session1 from './assets/session1.svg'
import session2 from './assets/session2.svg'
import session3 from './assets/session3.svg'
import session4 from './webp/session4.webp'
import session5 from './webp/session5.webp'

import personIcon from './webp/person-icon.webp';
import phoneIcon from './webp/phone-icon.webp';
import mailIcon from './webp/mail-icon.webp';

import elipse1 from './webp/elipse1.webp';
import elipse2 from './webp/elipse2.webp';
import elipse3 from './webp/elipse3.webp';
import elipse4 from './webp/elipse4.webp';

import whatsappCircle from './webp/whatsapp-circle.webp';
import mailCircle from './webp/mail-circle.webp';

import LinkedinIcon from './webp/linkedin.webp';
import XIcon from './webp/x.webp';
import InstagramIcon from './webp/instagram.webp';
import LearningSession from './carousel';

import uba from './webp/uba.webp';
import vitafoam from './webp/vitafoam.webp';
import fruitylife from './webp/fruitylife.webp';
import mycil from './webp/mycil.webp';
import aipl from './assets/aipl.jpeg';
import CourseGrid from './course';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  // State for the newsletter form
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // State for loading and form submission
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle input changes for contact form
  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === 'email' || name === 'fullName') {
      value = value.toLowerCase();
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission for contact form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);

    // Submit form data to Formspree
    fetch('https://formspree.io/f/xpwzzykn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setFormSubmitted(true);
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            message: '',
          });
        }
      })
      .catch((error) => console.error('Error submitting the form:', error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Validate inputs
  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    const phoneRegex = /^\+?[0-9]\d{1,14}$/;

    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return false;
    }

    if (!phoneRegex.test(formData.phone)) {
      alert('Please enter a valid phone number');
      return false;
    }

    return true;
  };

  // Handle newsletter form submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    fetch('https://formspree.io/f/xpwzzykn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newsletterEmail,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setNewsletterEmail('');
        }
      })
      .catch((error) => console.error('Error subscribing to the newsletter:', error))
      .finally(() => {
        setIsLoading(false);
      });
  };


  const sessions = [
    { image: session1 },
    { image: session2 },
    { image: session3 },
    { image: session4 },
    { image: session5 },
  ];

  const courses = [
    {
      title: "Data Analysis",
      description: "Master essential tools in data analysis to drive insights and make data-driven decisions in any industry.",
      price: "$100",
      details: [
        "Course Duration: 3 months",
        "Next Cohort Start Date: January 17, 2024",
        "Topics Covered: Excel, Power BI, SQL, Python",
        "Class Schedule: Fridays: 04:00 PM - 06:00 PM",
        "Class Schedule: Saturdays: 10:00 AM - 12:00 PM"
      ],
      link: "https://bit.ly/accomplitech_courses_registration"
    },
    {
      title: "UI/UX Design",
      description: "Develop user-friendly interfaces and improve user experiences with a course in UI/UX design fundamentals and advanced concepts.",
      price: "$100",
      details: [
        "Course Duration: 3 months",
        "Next Cohort Start Date: January 17, 2024",
        "Class Schedule: Fridays: 04:00 PM - 06:00 PM",
        "Class Schedule: Saturdays: 10:00 AM - 12:00 PM"
      ],
      link: "https://bit.ly/accomplitech_courses_registration"
    },
    {
      title: "Web Development",
      description: "Learn the essentials of front-end and back-end development to create responsive and interactive websites.",
      price: "$100",
      details: [
        "Course Duration: 3 months",
        "Next Cohort Start Date: January 17, 2024",
        "Class Schedule: Fridays: 04:00 PM - 06:00 PM",
        "Class Schedule: Saturdays: 10:00 AM - 12:00 PM"
      ],
      link: "https://bit.ly/accomplitech_courses_registration"
    },
    {
      title: "Graphics Design",
      description: "Transform your creative skills with our graphics design course, perfect for building a professional portfolio.",
      price: "$100",
      details: [
        "Course Duration: 3 months",
        "Next Cohort Start Date: January 17, 2024",
        "Class Schedule: Fridays: 04:00 PM - 06:00 PM",
        "Class Schedule: Saturdays: 10:00 AM - 12:00 PM"
      ],
      link: "https://bit.ly/accomplitech_courses_registration"
    },
    {
      title: "Cybersecurity",
      description: "Gain essential skills in cybersecurity, focusing on protecting data, preventing breaches, and understanding cybersecurity principles.",
      price: "$100",
      details: [
        "Course Duration: 3 months",
        "Next Cohort Start Date: January 17, 2024",
        "Class Schedule: Fridays: 04:00 PM - 06:00 PM",
        "Class Schedule: Saturdays: 10:00 AM - 12:00 PM"
      ],
      link: "https://bit.ly/accomplitech_courses_registration"
    },
    {
      title: "Organizational Training",
      description: "We provide customized training solutions to help your team master data analysis for smarter decision-making and optimal performance.",
      price: "Based on consultation",
      details: [
        "Course Duration: Customizable based on organizational needs",
        "Courses Covered: Excel, Power BI, SQL Python  (Customized)",
        "*second header* Special benefits include:",
        "Tailored training programs specific to your industry",
        "On-site or virtual delivery",
        "Post-training support to ensure skills application",
        "*footer* Contact us today for a consultation to assess your team’s needs and develop a program that will boost productivity and data-driven decision-making"
      ],
      link: "https://bit.ly/accomplitech_courses_registration"
    }
  ];

  return (
    <>

      <nav className="navbar">

        <div className="nav-logo">
          <img src={logo} alt="AccompliTech Logo" />
        </div>
        <div className="nav-links">
          <a href="#home" className="active">Home</a>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#courses">Courses</a>
        </div>
        <div>
          <button className="contact-button" onClick={() => window.location.href = '#contact'}>Contact us</button>
        </div>
      </nav>

      <div className="app">
        <main className="hero" id='home'>
          <div className="hero-content">
            <h1>Welcome to Accomplitech</h1>
            <img src={curvedLine} alt="" className="curved-line" />
            <p className="hero-text">
              Your gateway to in-demand tech skills and a thriving career. At Accomplitech, we’re committed to equipping aspiring tech professionals, career switchers, and business innovators with the tools needed to excel in today’s fast-paced digital world.
            </p>
            <button className="contact-button" onClick={() => window.location.href = '#contact'}>Contact Us</button>
          </div>
          <div className="hero-image">
            <img src={illustration} alt="Data Analytics Illustration" />
          </div>
        </main>

        {/* Stats Section */}
        <section className="stats">
          <div className="stat-container">
            <div className="stat-item">
              <div className="icon-circle">
                <img src={peopleIcon} alt="Students Icon" />
              </div>
              <div className="stat-content">
                <h2 className='fact-header'>70+</h2>
                <p>Students</p>
              </div>
            </div>

            <div className="divider" />

            <div className="stat-item">
              <div className="icon-circle">
                <img src={peopleIcon} alt="Individual Learning Icon" />
              </div>
              <div className="stat-content">
                <h2 className='fact-header'>Learn</h2>
                <p>Individually</p>
              </div>
            </div>

            <div className="divider" />

            <div className="stat-item">
              <div className="icon-circle">
                <img src={peopleIcon} alt="Organization Learning Icon" />
              </div>
              <div className="stat-content">
                <h2 className='fact-header'>Learn</h2>
                <p>In an organisation</p>
              </div>
            </div>

            <div className="divider" />

            <div className="stat-item">
              <div className="icon-circle">
                <img src={peopleIcon} alt="Cohort Learning Icon" />
              </div>
              <div className="stat-content">
                <h2 className='fact-header'>Learn</h2>
                <p>In a cohort</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="about-us" id='about'>
          <div className="about-image">
            <img src={illustration2} alt="About Us Illustration" />
          </div>
          <div className="about-content">
            <h2>About Us</h2>
            <p>
              Accomplitech is an EduTech leader dedicated to transforming individuals into proficient professionals and empowering organizations to leverage data and technology for growth. Our programs are designed to equip learners with essential skills in areas such as Data Analytics, UI/UX Design, Web Development, and Cybersecurity. By learning these courses, we prepare you with the expertise required in today’s digital economy, supporting your journey to become a tech-driven leader.
            </p>
          </div>
        </section>

        <section className="client-showcase">
          <div className="showcase-content">
            <h2 className="showcase-title">We have trained individual and corporate clients at... </h2>
            <div className="logo-grid-container">
              <div className="logo-grid">
                <div className="logo-box">
                  <img src={uba} alt="uba Logo" className="logo" />
                </div>
                <div className="logo-box">
                  <img src={vitafoam} alt="vitafoam Logo" className="logo" />
                </div>
                <div className="logo-box">
                  <img src={fruitylife} alt="fruitylife Logo" className="logo" />
                </div>
                <div className="logo-box">
                  <img src={mycil} alt="mycil Logo" className="logo" />
                </div>
              </div>

              <div className="logo-box-under">
                <img src={aipl} alt="aipl Logo" className="logo-under" />
              </div>
            </div>

          </div>
        </section>

        <section className="services" id='services'>
          <h2 className="services-title">
            Our <span className="services-title-accent">Services</span>
          </h2>

          <div className="services-grid">
            <div className="service-card">
              <img src={service1} alt="Excel and Power BI" className="service-icon" />
              <p className="service-text">
                Learn Data analytics with Excel, Power BI
              </p>
            </div>

            <div className="service-card">
              <img src={service2} alt="SQL Analytics" className="service-icon" />
              <p className="service-text">
                Learn Data analytics with SQL
              </p>
            </div>

            <div className="service-card">
              <img src={service3} alt="Python Analytics" className="service-icon" />
              <p className="service-text">
                Learn Data analytics with Python
              </p>
            </div>
          </div>
        </section>

        <LearningSession sessions={sessions} />
        <section className="course-selection" id='courses'>
          <h2 className="course-selection__title">
            COURSE OFFERINGS <span className="course-selection__title-accent">(Either virtual or physical options are available for all courses)</span>
          </h2>
          <p className="course-selection__description">
            At Accomplitech, we offer comprehensive data analytics and digital skills training to help
            you excel in your career and improve organizational efficiency. Explore our range of courses:
          </p>
          <CourseGrid courses={courses} />
        </section>


        <section className="contact-testimonials-newsletter" id="contact">
          <div className="contact-form">
            <h2>Let's Work Together</h2>
            <p>Do you want to work with me or directly learn from me?</p>
            <p>You can send an email or fill the form</p>
            <div className="contact-info" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href="mailto:accomplitech.org@gmail.com">accomplitech.org@gmail.com</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a href="tel:+2347077032733">+2347077032733</a>
              </div>
            </div>
            {formSubmitted ? (
              <p className="success-message">Thank you for your message! We'll be in touch soon.</p>
            ) : (
              <form action="https://formspree.io/f/xpwzzykn" method="post" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <div className="input-wrapper">
                    <img src={personIcon} alt="Person Icon" className="input-icon" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Ganiyat Femi"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <img src={mailIcon} alt="Mail Icon" className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="gyalfemi@gmail.com"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="input-wrapper">
                    <img src={phoneIcon} alt="Phone Icon" className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+2345675656"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Message"
                  ></textarea>
                </div>
                <button type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            )}
          </div>

          <div className="testimonials-newsletter">
            <div className="testimonials">
              <h2>What people are saying about Accomplitech</h2>
              <blockquote>
                "Accomplitech's hands-on training allowed me to tackle actual business challenges, making data analysis intuitive and enjoyable. I now drive results-driven solutions."
                <footer>- Peace Roberts</footer>
              </blockquote>
              <div className="testimonial-avatars">
                <img src={elipse1} alt="Testimonial 1" />
                <img src={elipse2} alt="Testimonial 2" />
                <img src={elipse3} alt="Testimonial 3" />
                <img src={elipse4} alt="Testimonial 4" />
              </div>
            </div>

            <div className="newsletter">
              <h3>Subscribe to our newsletter</h3>
              <p>Get started now try our product</p>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email here"
                  required
                />
                <button type="submit" aria-label="Subscribe" disabled={isLoading}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="12" x2="2" y2="12"></line>
                    <polyline points="15,5 22,12 15,19"></polyline>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Pages</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about-us">About us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#courses">Courses</a></li>
                <li><a href="#session">Gallery</a></li>
                <li><a href="https://wa.me/+2347077032733">Work with Accompilitch</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Legal</h3>
              <ul>
                <li><a href="https://wa.me/+2347077032733">Policy</a></li>
                <li><a href="https://wa.me/+2347077032733">Complaint Handling</a></li>
                <li><a href="https://wa.me/+2347077032733">Terms and Conditions</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Contact</h3>
              <div className="contact-item">
                <div className="icon-circle">
                  <img src={mailCircle} alt='' />

                </div>
                <a href="mailto:accomplitech.org@gmail.com">accomplitech.org@gmail.com</a>
              </div>
              <div className="contact-item">
                <div className="icon-circle">
                  <img src={whatsappCircle} alt='' />

                </div>
                <a href="https://wa.me/+2347077032733">Chat on whatsapp</a>
              </div>
              <p className="address">Address: 41/42 Gbola Onibiyo Street, Ahmadiya, Lagos</p>
              <div className="social-icons">
                <a href="https://www.linkedin.com/company/accomplitech" aria-label="LinkedIn">

                  <img src={LinkedinIcon} alt='' />
                </a>
                <a href="#twitter" aria-label="Twitter">
                  <img src={XIcon} alt='' />
                </a>
                <a href="https://www.instagram.com/accompli_tech" aria-label="Instagram">
                  <img src={InstagramIcon} alt='' />

                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;