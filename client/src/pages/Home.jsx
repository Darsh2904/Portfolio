import React, { useState, useCallback } from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Resume from '../components/Resume';
import Footer from '../components/Footer';

const Home = () => {
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <Loader onComplete={handleLoaded} />}

      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s' }}>
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
