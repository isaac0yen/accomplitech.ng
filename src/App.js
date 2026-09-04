import './styles/foundation.css';
import './App.css';

import SiteHeader from './components/SiteHeader';
import Hero from './components/Hero';
import ProofBand from './components/ProofBand';
import About from './components/About';
import Clients from './components/Clients';
import Courses from './components/Courses';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProofBand />
        <About />
        <Clients />
        <Courses />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
