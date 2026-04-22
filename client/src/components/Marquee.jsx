import React from 'react';
import './Marquee.css';

const ITEMS = ['React.js','Node.js','MongoDB','Express','Three.js','Java','Python','MySQL','GSAP','Tailwind','Photography','Cinematography','Git','REST API','DSA','Graphic Design'];

const Marquee = () => (
  <div className="marquee-row">
    <div className="marquee-inner">
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <React.Fragment key={i}>
          <span className={i % 3 === 0 ? 'marquee-accent' : ''}>{item}</span>
          <span className="marquee-sep">·</span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default Marquee;
