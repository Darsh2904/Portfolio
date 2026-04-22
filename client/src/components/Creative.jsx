import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Creative.css';

const ITEMS = [
  { tag: 'Photography',    title: 'Landscape Series',  icon: '📷', glow: '#00f5ff', bg: '#1a120a' },
  { tag: 'Cinematography', title: 'Short Film Reel',   icon: '🎬', glow: '#7c3aed', bg: '#0a1218' },
  { tag: 'Graphic Design', title: 'Brand Identity',    icon: '🎨', glow: '#06d6a0', bg: '#0a1a12' },
  { tag: 'Photography',    title: 'Urban Frames',      icon: '🌆', glow: '#ff6b6b', bg: '#1a0a0a' },
  { tag: 'Motion',         title: 'Motion Graphics',   icon: '🎥', glow: '#ffd166', bg: '#1a1200' },
  { tag: 'Design',         title: 'Typography Art',    icon: '✍',  glow: '#c792ea', bg: '#120a1a' },
];

const Creative = () => {
  const { ref: headRef, isVisible: headVis } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVis } = useScrollReveal();

  return (
    <section id="creative" className="creative">
      <div ref={headRef} className={`fade-up ${headVis ? 'vis' : ''}`} style={{ marginBottom: '2.5rem' }}>
        <div className="s-tag">Beyond Code</div>
        <h2 className="s-title">
          Creative<br /><span style={{ color: 'var(--c1)' }}>Portfolio.</span>
        </h2>
      </div>

      <div
        ref={gridRef}
        className={`cr-grid fade-up ${gridVis ? 'vis' : ''}`}
        style={{ transitionDelay: '0.1s' }}
      >
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="cr-cell hoverable"
            style={{ background: item.bg }}
          >
            <div className="cr-bg">
              <div className="cr-grid-pattern" />
              <div className="cr-glow-orb" style={{ background: item.glow }} />
            </div>
            <span className="cr-icon-big">{item.icon}</span>
            <div className="cr-info">
              <div className="cr-tag" style={{ color: item.glow }}>{item.tag}</div>
              <div className="cr-title">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Creative;
