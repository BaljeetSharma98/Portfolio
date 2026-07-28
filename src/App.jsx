import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Volume2, VolumeX, Code, Cpu, BookOpen, Mail, ExternalLink } from 'lucide-react';
import { audio } from './utils/audio';
import astronautImg from './assets/astronaut.png';

// Components
import ParticleCanvas from './components/ParticleCanvas';
import ProjectCard from './components/ProjectCard';
import SkillsMatrix from './components/SkillsMatrix';
import Timeline from './components/Timeline';
import ContactConsole from './components/ContactConsole';
import Terminal from './components/Terminal';
import { ContactInfo } from './components/ContactInfo';

const projectsData = [
  {
    title: 'Thumblify',
    date: 'Sep 2025',
    description: 'An AI-powered web application that generates eye-catching thumbnails for social media videos to improve engagement and save creators\' time.',
    tools: ['React.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'AI Image APIs', 'REST APIs'],
    features: [
      'AI-based thumbnail generation',
      'Multiple screen ratios (16:9, 1:1, 4:5, 9:16)',
      'Real-time preview & customization options',
      'User authentication & easy downloads'
    ],
    link: 'https://github.com/BaljeetSharma98/Thumblify'
  },
  {
    title: 'College Social Network',
    date: 'Jul 2025',
    description: 'A dedicated social network platform specifically designed for university students to share, connect, and converse securely.',
    tools: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL'],
    features: [
      'Custom user profile configurations',
      'Group forums & real-time chat',
      'Post creation with real-time likes & comments'
    ],
    link: 'https://github.com/BaljeetSharma98/SocialMediaApp'
  },
  {
    title: 'Blog Website with Auth',
    date: 'Jan 2025',
    description: 'A multi-user blog platform supporting user sessions, post publishing, comments, and community liking structures.',
    tools: ['Node.js', 'Express.js', 'EJS', 'PostgreSQL'],
    features: [
      'Secure user registration & login',
      'Interactive comment threads',
      'Clean post design with active comments & likes'
    ],
    link: 'https://github.com/BaljeetSharma98/blog-platform'
  }
];

const typewriterWords = [
  'FULL STACK WEB DEVELOPER',
  'MERN STACK DEVELOPER',
  'DSA & SYSTEM ENGINEER',
  'PROBLEM SOLVER',
  'INNOVATIVE DEVELOPER',
];

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Typewriter state
  const [wordIdx, setWordIdx] = useState(0);
  const [subWord, setSubWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Sections scroll spy
  const [activeSection, setActiveSection] = useState('home');

  // Detect touch devices
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  // Cursor movements
  useEffect(() => {
    if (isTouch) return;
    const updateCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTouch]);

  // Scroll spy observer
  useEffect(() => {
    const sections = ['home', 'projects', 'skills', 'registry', 'contact', 'transmit'];
    const observers = sections.map((secId) => {
      const el = document.getElementById(secId);
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(secId);
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return { obs, el };
    });

    return () => {
      observers.forEach((item) => {
        if (item) item.obs.unobserve(item.el);
      });
    };
  }, []);

  // Typewriter loop
  useEffect(() => {
    let timer;
    const currentFullWord = typewriterWords[wordIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setSubWord(currentFullWord.substring(0, subWord.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setSubWord(currentFullWord.substring(0, subWord.length + 1));
      }, 100);
    }

    if (!isDeleting && subWord === currentFullWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Wait on complete word
    } else if (isDeleting && subWord === '') {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % typewriterWords.length);
    }

    return () => clearTimeout(timer);
  }, [subWord, isDeleting, wordIdx]);

  const toggleSound = () => {
    const nextMute = audio.toggleMute();
    setSoundMuted(nextMute);
    if (!nextMute) {
      audio.playBoot();
    }
  };

  const handleNavClick = (sectionId) => {
    audio.playClick();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Visual cyber scanline lines */}
      <div className="scanlines" />

      {/* Custom lagging cursor ring on desktops */}
      {!isTouch && (
        <div
          className={`custom-cursor ${isClicking ? 'clicking' : ''}`}
          style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
        />
      )}

      {/* Floating Canvas Particles */}
      <ParticleCanvas />

      {/* Header Panel */}
      <header className="header-nav">
        <a href="#home" className="logo-glow" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          BALJEET<span>.SYS</span>
        </a>

        <nav className="nav-links">
          <a
            href="#home"
            className={activeSection === 'home' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          >
            DASHBOARD
          </a>
          <a
            href="#projects"
            className={activeSection === 'projects' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}
          >
            PROJECTS
          </a>
          <a
            href="#skills"
            className={activeSection === 'skills' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }}
          >
            SKILLS
          </a>
          <a
            href="#registry"
            className={activeSection === 'registry' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('registry'); }}
          >
            REGISTRY
          </a>
          <a
            href="#contact"
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
          >
            CONTACT
          </a>
          <a
            href="#transmit"
            className={activeSection === 'transmit' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavClick('transmit'); }}
          >
            TRANSMIT
          </a>
        </nav>

        <div className="nav-controls">
          <button
            className="icon-toggle-btn"
            onClick={toggleSound}
            title={soundMuted ? 'Unmute Audio Interface' : 'Mute Audio Interface'}
          >
            {soundMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <button
            className="icon-toggle-btn"
            onClick={() => {
              audio.playBoot();
              setTerminalOpen(!terminalOpen);
            }}
            title="Open CLI Terminal"
          >
            <TerminalIcon size={16} />
          </button>
        </div>
      </header>

      {/* Main Core Elements */}
      <main className="main-content">
        {/* Section: Dashboard (Hero) */}
        <section id="home" className="hero-console">
          <div className="hero-grid">
            <div className="hero-text-content">
              <div className="hero-tag">STATUS: ONLINE // SECURITY: SECURE</div>
              <h1 className="hero-title-main">BALJEET</h1>
              <div className="hero-subtitle">
                <span>&gt; {subWord}</span>
                <span className="animate-caret">█</span>
              </div>
              <p className="hero-desc">
                A results-oriented Full Stack Web Developer. Experienced in building scalable architectures using
                Node.js, React.js, and PostgreSQL. Focused on developing robust, AI-powered systems and refining interactive user journeys.
              </p>
              <div className="hero-actions">
                <button
                  className="cyber-btn primary"
                  onClick={() => {
                    audio.playBoot();
                    setTerminalOpen(true);
                  }}
                >
                  <TerminalIcon size={18} />
                  <span>INITIALIZE CLI</span>
                </button>

                <button
                  className="cyber-btn secondary"
                  onClick={() => handleNavClick('projects')}
                >
                  <Code size={18} />
                  <span>PROJECTS</span>
                </button>

                <a
                  href="mailto:baljeetsharma.abc@gmail.com"
                  className="cyber-btn action-trigger"
                  onClick={() => audio.playClick()}
                >
                  <Mail size={18} />
                  <span>CONTACT SECURE</span>
                </a>
              </div>
            </div>

            <div className="hero-visual-content">
              <div className="astronaut-container">
                {/* Decorative target bracket overlays */}
                <div className="hud-bracket top-left"></div>
                <div className="hud-bracket top-right"></div>
                <div className="hud-bracket bottom-left"></div>
                <div className="hud-bracket bottom-right"></div>
                
                {/* Rotating scanner circle behind */}
                <div className="hud-scanner-ring"></div>
                
                {/* Floating astronaut image with neon glow */}
                <div className="astronaut-wrapper">
                  <img
                    src={astronautImg}
                    alt="Baljeet Sharma Astronaut floating in space"
                    className="astronaut-img"
                  />
                  <div className="scanner-line"></div>
                </div>

                {/* Status indicators */}
                <div className="astronaut-status-badge">
                  <span className="pulse-dot"></span>
                  <span>SYSTEM.ACTIVE // SPACE_WALK</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Projects */}
        <section id="projects">
          <div className="section-header-glow">
            <Code size={24} className="neon-icon" />
            <h2>PROJECT ARCHIVES</h2>
            <div className="accent-bar" />
          </div>

          <div className="projects-deck-grid">
            {projectsData.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </section>

        {/* Section: Skills */}
        <section id="skills">
          <SkillsMatrix />
        </section>

        {/* Section: Education / Certifications */}
        <section id="registry">
          <Timeline />
        </section>

        {/* Section: Contact Info */}
        <section id="contact-info">
          <ContactInfo />
        </section>

        {/* Section: Contact Secure */}
        <section id="contact">
          <ContactConsole />
        </section>
      </main>

      {/* Floating HUD controls on bottom right */}
      <div className="floating-hud">
        <button
          className="hud-btn"
          onClick={() => {
            audio.playBoot();
            setTerminalOpen(!terminalOpen);
          }}
        >
          <TerminalIcon size={14} />
          <span>{terminalOpen ? 'SHUTDOWN CLI' : 'LAUNCH CLI'}</span>
        </button>
      </div>

      {/* Terminal Overlay */}
      {terminalOpen && (
        <Terminal onClose={() => setTerminalOpen(false)} />
      )}
    </div>
  );
}
