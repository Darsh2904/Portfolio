import React, { useEffect, useRef } from 'react';
import SkillsCanvas from './SkillsCanvas';
import useScrollReveal from '../hooks/useScrollReveal';
import './Skills.css';

const CATEGORIES = [
  {
    title: 'Frontend',
    color: 'var(--c1)',
    items: [{ name: 'React.js', w: 90 }, { name: 'HTML/CSS', w: 95 }, { name: 'Tailwind', w: 85 }, { name: 'JavaScript', w: 88 }],
  },
  {
    title: 'Backend',
    color: 'var(--c3)',
    items: [{ name: 'Node.js', w: 85 }, { name: 'Express.js', w: 82 }, { name: 'MongoDB', w: 80 }, { name: 'MySQL', w: 75 }],
  },
  {
    title: 'Languages',
    color: '#c792ea',
    items: [{ name: 'JavaScript', w: 88 }, { name: 'Java', w: 78 }, { name: 'Python', w: 72 }, { name: 'DSA', w: 80 }],
  },
  {
    title: 'Creative',
    color: 'var(--c5)',
    items: [{ name: 'Photography', w: 90 }, { name: 'Cinematography', w: 85 }, { name: 'Graphic Design', w: 78 }, { name: 'Git/GitHub', w: 83 }],
  },
];

const Skills = () => {
  const { ref: headRef, isVisible: headVis } = useScrollReveal();
  const catRefs = useRef([]);

  // Animate skill bars when visible
  useEffect(() => {
    const observers = catRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('vis');
          el.querySelectorAll('.sk-bar').forEach(bar => {
            bar.style.width = bar.dataset.w + '%';
          });
        }
      }, { threshold: 0.15 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <section id="skills" className="skills">
      <div ref={headRef} className={`skills-head fade-up ${headVis ? 'vis' : ''}`}>
        <div className="s-tag" style={{ justifyContent: 'center' }}>Tech Stack</div>
        <h2 className="s-title glitch" data-text="SKILLS &amp; TOOLS">SKILLS &amp; TOOLS</h2>
      </div>

      <div className="skills-3d-wrap fade-up vis">
        <div className="sk3d-label">tech_logos.three - INTERACTIVE 3D</div>
        <SkillsCanvas />
      </div>

      <div className="skills-cats">
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat.title}
            ref={el => catRefs.current[i] = el}
            className="sk-cat fade-up"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="sk-cat-title">
              <span style={{ color: cat.color }}>▸</span> {cat.title}
            </div>
            <ul className="sk-list">
              {cat.items.map(item => (
                <li key={item.name}>
                  <span className="sk-name">{item.name}</span>
                  <div className="sk-bar-wrap">
                    <span
                      className="sk-bar"
                      data-w={item.w}
                      style={{ background: cat.color, boxShadow: `0 0 4px ${cat.color}` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
