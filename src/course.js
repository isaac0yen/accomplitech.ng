import React from 'react';

const CourseGrid = ({ courses }) => {
  // Helper function to process details and handle special formatting
  const processDetails = (details) => {
    let currentList = [];
    let sections = {
      mainDetails: [],
      specialBenefits: [],
      footer: ''
    };

    details.forEach(detail => {
      if (detail.includes('*second header*')) {
        // Store main details and start new section for benefits
        sections.mainDetails = [...currentList];
        currentList = [];
        // Remove the marker from the benefits header
        const benefitsHeader = detail.replace('*second header*', '').trim();
        sections.specialBenefits.push({ isHeader: true, content: benefitsHeader });
      } else if (detail.includes('*footer*')) {
        // Store benefits and capture footer
        if (currentList.length > 0) {
          sections.specialBenefits.push(...currentList);
        }
        sections.footer = detail.replace('*footer*', '').trim();
        currentList = [];
      } else {
        currentList.push(detail);
      }
    });

    // If there are no special sections, all details go to mainDetails
    if (sections.mainDetails.length === 0 && sections.specialBenefits.length === 0) {
      sections.mainDetails = currentList;
    } else if (currentList.length > 0) {
      sections.specialBenefits.push(...currentList);
    }

    return sections;
  };

  return (
    <div className="course-selection__grid">
      {courses.map((course, index) => {
        const { mainDetails, specialBenefits, footer } = processDetails(course.details);

        return (
          <div key={index} className="course-card">
            <h3 className="course-card__title">{course.title}</h3>
            <p className="course-card__description">
              {course.description}
            </p>
            <p className="course-card__price">{course.price}</p>

            {/* Main Details Section */}
            {mainDetails.length > 0 && (
              <ul className="course-card__details">
                {mainDetails.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            )}

            {/* Special Benefits Section */}
            {specialBenefits.length > 0 && (
              <>
                {specialBenefits.map((benefit, idx) => {
                  if (benefit.isHeader) {
                    return <h4 key={idx} className="course-card__benefits-title">{benefit.content}</h4>;
                  }
                  return (
                    <ul key={idx} className="course-card__benefits-list">
                      <li>{benefit}</li>
                    </ul>
                  );
                })}
              </>
            )}

            {/* Footer Section */}
            {footer ? (
              <p className="course-card__cta">
                {footer}
              </p>
            ) : (
              <p className="course-card__cta">
                For inquiries, call or WhatsApp: +2347077032733
              </p>
            )}

            <a
              className="course-card__button"
              href={course.link}
              style={{ textDecoration: 'none' }}
            >
              Register Now
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default CourseGrid;