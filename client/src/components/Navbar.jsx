import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'about', href: '#about' },
  { label: 'skills', href: '#skills' },
  { label: 'projects', href: '#projects' },
  { label: 'timeline', href: '#experience' },
  { label: 'resume', href: '#resume' },
  { label: 'contact', href: '#contact' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">Darsh Patel<span className="nav-dot">.</span></div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a href={href} onClick={e => { e.preventDefault(); handleNav(href); }}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <div className="nav-status">
          <span className="status-dot" />
          available
        </div>
        <button className="nav-theme-btn" onClick={toggleTheme}>
          {theme === 'dark' ? '[ light ]' : '[ dark ]'}
        </button>
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
