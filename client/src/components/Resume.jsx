import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Resume.css';

const RESUME_POINTS = [
  'MERN Stack Web Development (MongoDB, Express.js, React.js, Node.js)',
  'REST API design, scalable backend architecture, and clean frontend UI',
  'Languages: C, C++, JavaScript, Java, Python, and DSA fundamentals',
  'Database work with MongoDB and MySQL',
  'Creative skills: Photography, Cinematography, Graphic Design',
];

const EXPERIENCE = [
  {
    title: 'Full Stack Developer Intern',
    org: 'Growinted Pvt Ltd',
    period: '2026 - Present',
    details:
      'Building and maintaining production-ready MERN features, APIs, and responsive interfaces with a focus on performance and clean architecture.',
  },
  {
    title: 'B.Tech - Computer Science',
    org: 'University, Vadodara',
    period: '2022 - 2026',
    details:
      'Studied Data Structures, DBMS, OS, OOP, and Web Development while building real-world academic and personal projects.',
  },
];

const Resume = () => {
  const { ref: headRef, isVisible: headVis } = useScrollReveal();
  const { ref: cardRef, isVisible: cardVis } = useScrollReveal();

  return (
    <section id="resume" className="resume">
      <div ref={headRef} className={`resume-head fade-up ${headVis ? 'vis' : ''}`}>
        <div className="s-tag" style={{ justifyContent: 'center' }}>Resume</div>
        <h2 className="s-title">My <span style={{ color: 'var(--c1)' }}>Resume.</span></h2>
        <p className="resume-sub">Darsh Patel - Full Stack Developer (Vadodara, India)</p>
      </div>

      <div ref={cardRef} className={`resume-card fade-up ${cardVis ? 'vis' : ''}`}>
        <div className="resume-top">
          <div>
            <div className="resume-name">Darsh Patel</div>
            <div className="resume-meta">Full Stack Developer | darshnation@gmail.com</div>
          </div>
          <a className="resume-download hoverable" href="/resume.pdf" download="Darsh_Patel_Resume.pdf">
            Download Resume
          </a>
        </div>

        <div className="resume-grid">
          <div className="resume-block">
            <div className="resume-block-title">Profile Highlights</div>
            <ul className="resume-list">
              {RESUME_POINTS.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="resume-block">
            <div className="resume-block-title">Experience & Education</div>
            <div className="resume-exp-wrap">
              {EXPERIENCE.map((item) => (
                <div className="resume-exp" key={`${item.title}-${item.period}`}>
                  <div className="resume-exp-title">{item.title}</div>
                  <div className="resume-exp-meta">{item.org} | {item.period}</div>
                  <div className="resume-exp-desc">{item.details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
