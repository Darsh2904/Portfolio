import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import useScrollReveal from '../hooks/useScrollReveal';
import './Projects.css';

const API = process.env.REACT_APP_API_URL || '/api';

// Fallback static data if API unreachable
const FALLBACK = [
  { _id: '1', order: 1, title: 'Dreamland Travel', badge: 'Travel Tech', description: 'Full-featured travel booking platform with destination discovery, itinerary planning, and booking management. Built for scale with a seamless UX.', techStack: ['HTML','CSS','PHP'], liveUrl: 'https://dreamland-travel.netlify.app/', githubUrl: 'https://github.com/Darsh2904/Dreamland_Travel.git', accentColor: '#00f5ff', codeSnippet: "const TravelApp = () => {\n  const [trips, setTrips] = useState([])\n  return <TravelDashboard />\n}" },
  { _id: '2', order: 2, title: 'No Nap Drive', badge: 'Safety AI', description: 'Real-time driver alertness detection using AI and computer vision. Prevents drowsy driving with smart mobile alerts and eye-tracking algorithms.', techStack: ['React','Python','OpenCV','Node.js'], liveUrl: '', githubUrl: '#', accentColor: '#ff6b6b', codeSnippet: "def detect_drowsiness(frame):\n  eyes = detect_eyes(frame)\n  if eyes.EAR < 0.25:\n    alert_driver()" },
  { _id: '3', order: 3, title: 'CrackIt.AI', badge: 'AI Platform', description: "AI-powered interview prep with personalized question banks, mock sessions, and real-time performance feedback via language models.", techStack: ['React','Node.js','OpenAI API','MongoDB'], liveUrl: 'https://crackitai-app.vercel.app/', githubUrl: '#', accentColor: '#7c3aed', codeSnippet: "const generateQuestion = async () => {\n  const res = await openai.chat({\n    model: 'gpt-4',\n    role: 'interviewer'\n  })\n}" },
  { _id: '4', order: 4, title: 'E-Auction Platform', badge: 'E-Commerce', description: 'Real-time online auction with live bidding via WebSocket, timer-based listings, secure payments, and comprehensive admin controls.', techStack: ['React','Express','Socket.io','MySQL'], liveUrl: 'https://bid-vault29.vercel.app/', githubUrl: 'https://github.com/Darsh2904/BidVault.git', accentColor: '#ffd166', codeSnippet: "socket.on('bid', (data) => {\n  if(data.amount > currentBid) {\n    updateBid(data.amount)\n    io.emit('bid_update', data)\n  }\n})" },
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const { ref, isVisible } = useScrollReveal();

  // 3D tilt
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    };
    const onLeave = () => { card.style.transform = ''; };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <div
      ref={el => { ref.current = el; cardRef.current = el; }}
      className={`proj-card fade-up hoverable ${isVisible ? 'vis' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Mock code screen */}
      <div className="proj-screen">
        <div className="proj-mockup">
          <div className="pm-bar">
            <span className="pm-dot" style={{ background: '#ff5f56' }} />
            <span className="pm-dot" style={{ background: '#ffbd2e' }} />
            <span className="pm-dot" style={{ background: '#27c93f' }} />
          </div>
          <pre className="pm-code">{project.codeSnippet}</pre>
        </div>
        <div
          className="proj-badge"
          style={{ borderColor: `${project.accentColor}44`, color: project.accentColor, background: `${project.accentColor}11` }}
        >
          {project.badge}
        </div>
      </div>

      <div className="proj-body">
        <div className="proj-num">// {String(project.order).padStart(2, '0')}</div>
        <div className="proj-title">{project.title}</div>
        <div className="proj-desc">{project.description}</div>
        <div className="proj-stack">
          {project.techStack.map(t => <span key={t} className="ps-tag">{t}</span>)}
        </div>
        <div className="proj-links">
          {project.liveUrl && project.liveUrl !== '#' ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="pl-btn pl-live hoverable">Live Demo →</a>
          ) : (
            <span className="pl-btn pl-live" style={{ opacity: 0.55, cursor: 'not-allowed' }}>Not Deployed</span>
          )}
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="pl-btn pl-gh hoverable">GitHub</a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ref: headRef, isVisible: headVis } = useScrollReveal();

  useEffect(() => {
    axios.get(`${API}/projects`)
      .then(res => setProjects(res.data.data || FALLBACK))
      .catch(() => setProjects(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="projects">
      <div ref={headRef} className={`fade-up ${headVis ? 'vis' : ''}`} style={{ marginBottom: '3rem' }}>
        <div className="s-tag">Featured Projects</div>
        <h2 className="s-title">What I've<br /><span style={{ color: 'var(--c1)' }}>Built.</span></h2>
        <p className="s-sub">Real-world applications built end-to-end — from architecture to deployment.</p>
      </div>

      {loading ? (
        <div className="proj-loading">
          <span className="loading-dot" /><span className="loading-dot" /><span className="loading-dot" />
        </div>
      ) : (
        <div className="proj-grid">
          {projects.map((p, i) => <ProjectCard key={p._id} project={p} index={i} />)}
        </div>
      )}
    </section>
  );
};

export default Projects;
