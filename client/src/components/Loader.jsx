import React, { useEffect, useState } from 'react';
import './Loader.css';

const TERMS = [
  '$ npm install portfolio...',
  '$ loading Three.js engine...',
  '$ compiling React components...',
  '$ connecting to MongoDB...',
  '$ deploying to production...',
];

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [termLine, setTermLine] = useState(TERMS[0]);
  const [termIdx, setTermIdx] = useState(0);

  useEffect(() => {
    // Cycle terminal lines
    const termTimer = setInterval(() => {
      setTermIdx(i => {
        const next = (i + 1) % TERMS.length;
        setTermLine(TERMS[next]);
        return next;
      });
    }, 500);

    // Progress bar
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 12 + 3;
        if (next >= 100) {
          clearInterval(interval);
          clearInterval(termTimer);
          setTimeout(onComplete, 600);
          return 100;
        }
        return next;
      });
    }, 110);

    return () => { clearInterval(interval); clearInterval(termTimer); };
  }, [onComplete]);

  return (
    <div className="loader">
      <div className="loader-logo">
        DARSH<span>_</span>PATEL
      </div>
      <div className="loader-terminal">{termLine}</div>
      <div className="loader-track">
        <div className="loader-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
      <div className="loader-pct">{Math.floor(Math.min(progress, 100))}%</div>
    </div>
  );
};

export default Loader;
