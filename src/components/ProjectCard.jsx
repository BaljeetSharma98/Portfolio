import React, { useRef, useState } from 'react';
import { ExternalLink, Code } from 'lucide-react';
import { audio } from '../utils/audio';

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = -((mouseY - height / 2) / (height / 2)) * 10;
    const rotateY = ((mouseX - width / 2) / (width / 2)) * 10;

    const glareX = (mouseX / width) * 100;
    const glareY = (mouseY / height) * 100;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 0.15 });
  };

  const handleMouseEnter = () => {
    audio.playClick();
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="project-card-container"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div
        className="card-glare"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(0, 240, 255, 0.4) 0%, transparent 60%)`,
          opacity: glare.opacity,
        }}
      />
      
      <div className="card-border-glow" />
      <div className="card-corner card-corner-tl" />
      <div className="card-corner card-corner-tr" />
      <div className="card-corner card-corner-bl" />
      <div className="card-corner card-corner-br" />

      <div className="card-content">
        <div className="card-header">
          <div className="card-icon">
            <Code size={18} />
          </div>
          <span className="card-date">{project.date}</span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-features-list">
          <span className="features-header">KEY LOGS:</span>
          <ul>
            {project.features.map((feat, idx) => (
              <li key={idx}>{feat}</li>
            ))}
          </ul>
        </div>

        <div className="project-tech-stack">
          {project.tools.map((tool, idx) => (
            <span key={idx} className="tech-badge">
              {tool}
            </span>
          ))}
        </div>

        <div className="project-actions">
          <a
            href={project.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn"
            onClick={() => audio.playClick()}
          >
            <span>INITIALIZE LINK</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
