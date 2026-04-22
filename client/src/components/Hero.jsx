import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import HeroCanvas from './HeroCanvas';
import CodeRain from './CodeRain';
import darshPhoto from '../assets/darsh-photo.png';
import './Hero.css';

const Hero = () => {
  const photoRef = useRef(null);

  useEffect(() => {
    // GSAP entrance animations
    const tl = gsap.timeline({ delay: 0.1 });
    tl.to('.hn-inner', { y: 0, duration: 1, stagger: 0.12, ease: 'power4.out' })
      .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')
      .to('.hero-role', { opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .to('.hero-btns', { opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .to('.hero-scroll', { opacity: 1, duration: 0.8 }, '-=0.2')
      .from('.hero-photo-wrap', { x: 60, opacity: 0, duration: 1.1, ease: 'power3.out' }, 0.3);

    // Photo 3D tilt on mouse move
    const handleMouseMove = (e) => {
      if (!photoRef.current) return;
      const dx = (e.clientX / window.innerWidth - 0.5) * 16;
      const dy = (e.clientY / window.innerHeight - 0.5) * 10;
      photoRef.current.style.transform = `perspective(600px) rotateY(${dx}deg) rotateX(${-dy}deg)`;
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero">
      <HeroCanvas />
      <CodeRain />

      <div className="hero-left">
        <div className="hero-eyebrow">Full Stack Developer — MERN Stack</div>
        <h1 className="hero-name">
          <span className="ln1"><span className="hn-inner">DARSH</span></span>
          <span className="ln2"><span className="hn-inner">PATEL</span></span>
        </h1>
        <div className="hero-role">// Building Scalable &amp; Creative Web Experiences</div>
        <p className="hero-tagline">
          MERN Stack Developer · Photographer · Cinematographer · Graphic Designer
          - from Vadodara, India. I write code that ships and capture frames that last.
        </p>
        <div className="hero-btns">
          <button className="btn-solid hoverable" onClick={() => scrollTo('#projects')}>
            [ view_work() ]
          </button>
          <button className="btn-glow hoverable" onClick={() => scrollTo('#contact')}>
            &#123; contact_me &#125;
          </button>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-photo-wrap" ref={photoRef}>
          <div className="hero-photo-frame">
            <img src={darshPhoto} alt="Darsh Patel" />
            <div className="hero-scan-line" />
          </div>
          <div className="corner tl" />
          <div className="corner br" />
          <div className="corner tr" />
          <div className="corner bl" />
          <div className="photo-label">
            <div className="photo-name">Darsh Patel</div>
            <div className="photo-loc">📍 Vadodara, India</div>
          </div>
          <div className="photo-badge-1">status: online ●</div>
          <div className="photo-badge-2">mern: active</div>
        </div>
      </div>

      <div className="hero-scroll">
        scroll_down
        <div className="scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
