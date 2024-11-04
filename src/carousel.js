import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LearningSession = ({ sessions }) => {
  const [widthOfScreen, setWidthOfScreen] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWidthOfScreen(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="learning-session" id='session'>
      <h2 className="learning-title">Interactive learning session</h2>
      <p className="learning-subtitle">
        <span className="learning-accent">Hands-on training</span> with industry experts to enhance your data analytics skills.
      </p>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={widthOfScreen < 768 ? 1 : 3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="carousel-container"
      >
        {sessions.map((session, index) => (
          <SwiperSlide key={index} className="session-card">
            <img src={session.image} alt={`Training Session ${index + 1}`} className="session-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default LearningSession;