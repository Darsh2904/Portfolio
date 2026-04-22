import React, { useEffect, useRef, useState } from 'react';
import './Cursor.css';

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [active, setActive] = useState(false);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', onMove);

    let animId;
    const animate = () => {
      const p = pos.current;
      p.rx += (p.mx - p.rx) * 0.11;
      p.ry += (p.my - p.ry) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.left = p.rx + 'px';
        ringRef.current.style.top = p.ry + 'px';
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    const enter = () => setActive(true);
    const leave = () => setActive(false);

    // Re-bind on any DOM change for dynamic elements
    const bindHover = () => {
      document.querySelectorAll('a, button, .hoverable').forEach(el => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
    };
    bindHover();
    const observer = new MutationObserver(bindHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${active ? 'active' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${active ? 'active' : ''}`} />
    </>
  );
};

export default Cursor;
