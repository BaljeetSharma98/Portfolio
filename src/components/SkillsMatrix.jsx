import React, { useEffect, useRef, useState } from 'react';
import { Cpu } from 'lucide-react';
import { audio } from '../utils/audio';

const skillCategories = [
  {
    title: 'Languages & Core',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'C++', level: 80 },
      { name: 'SQL', level: 85 },
      { name: 'Data Structures & Algorithms', level: 85 }
    ]
  },
  {
    title: 'Frontend Dev',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'HTML & CSS', level: 95 },
      { name: 'Bootstrap / Responsive UI', level: 85 }
    ]
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB / NoSQL', level: 75 }
    ]
  },
  {
    title: 'Tools & AI Integrations',
    skills: [
      { name: 'Git & GitHub / REST APIs', level: 90 },
      { name: 'GenAI Tools (Gemini, Claude, GPT)', level: 95 },
      { name: 'Object-Oriented Programming (OOPs)', level: 85 },
      { name: 'SDLC & Team Leadership', level: 80 }
    ]
  }
];

export default function SkillsMatrix() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="skills-matrix-section">
      <div className="section-header-glow">
        <Cpu size={24} className="neon-icon" />
        <h2>SKILLS MATRIX</h2>
        <div className="accent-bar" />
      </div>

      <div className="skills-grid">
        {skillCategories.map((category, catIdx) => (
          <div key={catIdx} className="skill-cat-card">
            <h3 className="skill-cat-title">{category.title}</h3>
            <div className="skill-list">
              {category.skills.map((skill, skillIdx) => (
                <div
                  key={skillIdx}
                  className="skill-item"
                  onMouseEnter={() => audio.playClick()}
                >
                  <div className="skill-meta">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percent">{visible ? `${skill.level}%` : '0%'}</span>
                  </div>
                  <div className="skill-progress-track">
                    <div
                      className={`skill-progress-bar bar-cat-${catIdx}`}
                      style={{
                        width: visible ? `${skill.level}%` : '0%',
                        transition: `width 1.2s cubic-bezier(0.1, 0.8, 0.25, 1) ${skillIdx * 0.1}s`,
                      }}
                    >
                      <div className="bar-glow" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
