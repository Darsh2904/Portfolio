import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Experience.css';

const TIMELINE = [
  {
    date: '2026 — Present',
    title: 'Full Stack Developer Intern',
    company: 'Growinted Pvt Ltd',
    desc: 'Developed and maintained full-stack web features using the MERN stack. Built scalable RESTful APIs, implemented key UI components, and collaborated with cross-functional teams to deliver product milestones on schedule.',
  },
  {
    date: '2022 — 2026',
    title: 'B.Tech — Computer Science',
    company: 'University, Vadodara',
    desc: 'Core CS curriculum: Data Structures & Algorithms, DBMS, Operating Systems, Web Development, OOP. Built academic and personal projects, participated in hackathons, and led the tech club.',
  },
  {
    date: '2019 — Ongoing',
    title: 'Freelance Photographer & Cinematographer',
    company: 'Self / Various Clients',
    desc: 'Event coverage, portrait sessions, product shoots, wedding Shoots and cinematic reels for local businesses. Bridging technical precision with visual storytelling — the same mindset I bring to every line of code.',
  },
];

const TimelineItem = ({ item, index }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`tl-item fade-up ${isVisible ? 'vis' : ''}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="tl-dot" />
      <div className="tl-date">{item.date}</div>
      <div className="tl-card">
        <div className="tl-title">{item.title}</div>
        <div className="tl-company"><span>▸</span> {item.company}</div>
        <div className="tl-desc">{item.desc}</div>
      </div>
    </div>
  );
};

const Experience = () => {
  const { ref: headRef, isVisible: headVis } = useScrollReveal();

  return (
    <section id="experience" className="experience">
      <div
        ref={headRef}
        className={`exp-head fade-up ${headVis ? 'vis' : ''}`}
      >
        <div className="s-tag" style={{ justifyContent: 'center' }}>Experience</div>
        <h2 className="s-title">My <span style={{ color: 'var(--c1)' }}>Journey.</span></h2>
      </div>

      <div className="timeline">
        {TIMELINE.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
