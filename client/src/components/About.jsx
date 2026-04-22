import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './About.css';

const CHIPS = ['React.js','Node.js','MongoDB','Express.js','Java','Python','MySQL','Data Structures','Git','Photography','Cinematography','Graphic Design'];

const About = () => {
  const { ref: leftRef, isVisible: leftVis } = useScrollReveal();
  const { ref: rightRef, isVisible: rightVis } = useScrollReveal();

  return (
    <section id="about" className="about">
      <div className="about-grid">
        {/* Code card */}
        <div ref={leftRef} className={`about-card fade-up ${leftVis ? 'vis' : ''}`}>
          <div className="card-header">
            <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
            <span className="card-filename">darsh_profile.js</span>
          </div>
          <div className="code-block">
            <span><span className="kw">const</span> <span className="obj">developer</span> = {'{'}</span>
            <span>&nbsp;&nbsp;<span className="str">name</span>: <span className="str">"Darsh Patel"</span>,</span>
            <span>&nbsp;&nbsp;<span className="str">role</span>: <span className="str">"Full Stack Dev"</span>,</span>
            <span>&nbsp;&nbsp;<span className="str">stack</span>: [<span className="str">"MongoDB"</span>, <span className="str">"Express"</span>,</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"React"</span>, <span className="str">"Node.js"</span>],</span>
            <span>&nbsp;&nbsp;<span className="str">languages</span>: [<span className="str">"JS"</span>, <span className="str">"Java"</span>, <span className="str">"Python"</span>],</span>
            <span>&nbsp;&nbsp;<span className="str">creative</span>: {'{'}</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="str">photography</span>: <span className="num">true</span>,</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="str">cinematography</span>: <span className="num">true</span>,</span>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="str">Graphic Designing</span>: <span className="num">true</span></span>
            <span>&nbsp;&nbsp;{'}'},</span>
            <span>&nbsp;&nbsp;<span className="str">location</span>: <span className="str">"Vadodara, IN"</span>,</span>
            <span>&nbsp;&nbsp;<span className="str">available</span>: <span className="num">true</span></span>
            <span>{'};'}</span>
            <span>&nbsp;</span>
            <span className="comment">// export default developer;</span>
          </div>
        </div>

        {/* Text side */}
        <div ref={rightRef} className={`about-right fade-up ${rightVis ? 'vis' : ''}`} style={{ transitionDelay: '0.15s' }}>
          <div className="s-tag">About Me</div>
          <h2 className="s-title">
            I Build.<br /><span style={{ color: 'var(--c1)' }}>I Create.</span><br />I Ship.
          </h2>
          <p>I'm a Full Stack Developer from Vadodara, India, specializing in the MERN stack. I architect and build end-to-end web applications — clean RESTful APIs, scalable backends, and UIs that feel alive.</p>
          <p>Beyond the terminal, I'm a photographer and cinematographer. The precision of code and the art of a frame aren't that different — both require vision, patience, and bringing something to life from nothing.</p>
          <div className="skill-chips">
            {CHIPS.map(chip => (
              <span key={chip} className="chip hoverable">{chip}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
