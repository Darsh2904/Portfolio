import { useEffect, useRef, useState } from 'react';

const useCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [active, setActive] = useState(false);
  let rx = 0, ry = 0;
  let mx = 0, my = 0;
  let animId = null;

  useEffect(() => {
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px';
        dotRef.current.style.top = my + 'px';
      }
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    const hoverEls = document.querySelectorAll('a, button, .hoverable');
    const enter = () => setActive(true);
    const leave = () => setActive(false);
    hoverEls.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
      hoverEls.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); });
    };
  }, []);

  return { dotRef, ringRef, active };
};

export default useCursor;
