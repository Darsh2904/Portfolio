import React, { useState } from 'react';
import axios from 'axios';
import useScrollReveal from '../hooks/useScrollReveal';
import './Contact.css';

const API = process.env.REACT_APP_API_URL || '/api';
const EMAIL_ID = 'darshnation@gmail.com';
const EMAIL_GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_ID)}`;

const SOCIALS = [
  { icon: 'in',  name: 'LinkedIn',  handle: 'linkedin.com/in/darsh6608',  href: 'https://linkedin.com/in/darsh6608', gradient: 'linear-gradient(135deg,var(--c2),var(--c1))' },
  { icon: '</>', name: 'GitHub',    handle: 'github.com/Darsh2904',        href: 'https://github.com/Darsh2904',   gradient: 'linear-gradient(135deg,#333,#555)' },
  { icon: '@',   name: 'Email',     handle: EMAIL_ID,                       href: EMAIL_GMAIL_URL,                 gradient: 'linear-gradient(135deg,#ea4335,#c62828)' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('');

  const { ref: leftRef,  isVisible: leftVis  } = useScrollReveal();
  const { ref: rightRef, isVisible: rightVis } = useScrollReveal(); 

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrMsg('// error: name, email and message are required.');
      return;
    }
    setStatus('loading');
    setErrMsg('');
    try {
      await axios.post(`${API}/contact`, form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setErrMsg(err.response?.data?.error || '// error: failed to send. try again.');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const btnLabel = {
    idle:    'execute( send_message )',
    loading: '// sending...',
    success: '// success: message_sent ✓',
    error:   '// error: try again',
  }[status];

  return (
    <section id="contact" className="contact">
      <div className="contact-wrap">

        {/* Left — info & socials */}
        <div ref={leftRef} className={`contact-left fade-up ${leftVis ? 'vis' : ''}`}>
          <div className="s-tag" style={{ color: 'var(--c1)' }}>Contact</div>
          <h2 className="s-title">
            Let's <span style={{ color: 'var(--c1)' }}>Connect</span>
            <span style={{ color: 'var(--c3)' }}>.</span>
          </h2>
          <p>Have a project, an idea, or just want to talk tech? I'm always open for conversations that ship something great.</p>
          <div className="social-links">
            {SOCIALS.map(soc => {
              return (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="soc-link hoverable"
                >
                  <div className="soc-icon" style={{ background: soc.gradient }}>{soc.icon}</div>
                  <div className="soc-text">
                    <div className="soc-name">{soc.name}</div>
                    <div className="soc-handle">{soc.handle}</div>
                  </div>
                  <span className="soc-arrow">→</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Right — form */}
        <div ref={rightRef} className={`contact-right fade-up ${rightVis ? 'vis' : ''}`} style={{ transitionDelay: '0.15s' }}>
          <form className="cform" onSubmit={handleSubmit} noValidate>
            <div className="cform-header">// send_message.js</div>

            <div className="fg-row">
              <div className="fg">
                <label htmlFor="cf-name">name</label>
                <input id="cf-name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} />
              </div>
              <div className="fg">
                <label htmlFor="cf-email">email</label>
                <input id="cf-email" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} />
              </div>
            </div>

            <div className="fg">
              <label htmlFor="cf-subject">subject</label>
              <input id="cf-subject" name="subject" type="text" placeholder="What's on your mind?" value={form.subject} onChange={handleChange} />
            </div>

            <div className="fg">
              <label htmlFor="cf-message">message</label>
              <textarea id="cf-message" name="message" placeholder="Tell me about your project..." value={form.message} onChange={handleChange} />
            </div>

            {errMsg && <div className="form-err">{errMsg}</div>}

            <button
              type="submit"
              className={`btn-submit hoverable ${status}`}
              disabled={status === 'loading'}
            >
              {btnLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
