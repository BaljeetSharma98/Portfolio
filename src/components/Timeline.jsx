import React, { useState } from 'react';
import { BookOpen, Award } from 'lucide-react';
import { audio } from '../utils/audio';

const educationData = [
  {
    institution: 'CHANDIGARH UNIVERSITY',
    degree: 'B.E. in Computer Science',
    location: 'Mohali, Punjab',
    period: 'Aug 2022 – July 2026',
    score: 'CGPA: 8.01 / 10',
    details: 'Focused on core Computer Science principles including Data Structures, Algorithms, Software Engineering, and AI development.'
  },
  {
    institution: 'DELHI PUBLIC INTERNATIONAL SCHOOL',
    degree: 'High School (+2) | CBSE Board',
    location: 'Rewari, Haryana',
    period: 'July 2022',
    score: 'Percentage: 85.17% (PCM)',
    details: 'Specialized focus in Physics, Chemistry, and Mathematics.'
  },
  {
    institution: 'AHIR MODERN PUBLIC SCHOOL',
    degree: 'Secondary School (Class X) | CBSE Board',
    location: 'Rewari, Haryana',
    period: 'Apr 2020',
    score: 'Percentage: 86.14%',
    details: 'General curriculum focusing on foundational mathematics, science, and languages.'
  }
];

const certificationsData = [
  {
    title: 'Foundation of Cloud IoT Edge ML',
    issuer: 'Swayam-NPTEL',
    date: 'June 2025',
    id: 'ID: SWY-IOT-2025'
  },
  {
    title: 'Data Structure and Algorithm',
    issuer: 'Udemy',
    date: 'Aug 2024',
    id: 'ID: UDM-DSA-882'
  },
  {
    title: 'Complete Web Development Course',
    issuer: 'Udemy',
    date: 'Jan 2024',
    id: 'ID: UDM-WD-104'
  }
];

export default function Timeline() {
  const [activeTab, setActiveTab] = useState('education');

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      audio.playBoot();
      setActiveTab(tab);
    }
  };

  return (
    <div className="timeline-section">
      <div className="section-header-glow">
        <BookOpen size={24} className="neon-icon" />
        <h2>REGISTRY LOGS</h2>
        <div className="accent-bar" />
      </div>

      <div className="timeline-tabs">
        <button
          className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => handleTabChange('education')}
        >
          <BookOpen size={16} />
          <span>EDUCATION LOGS</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
          onClick={() => handleTabChange('certifications')}
        >
          <Award size={16} />
          <span>CERTIFICATIONS REGISTRY</span>
        </button>
      </div>

      <div className="timeline-content-panel">
        {activeTab === 'education' ? (
          <div className="education-timeline">
            {educationData.map((edu, idx) => (
              <div
                key={idx}
                className="timeline-item"
                onMouseEnter={() => audio.playClick()}
              >
                <div className="timeline-dot" />
                <div className="timeline-badge">{edu.period}</div>
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <h3>{edu.institution}</h3>
                    <span className="location-tag">{edu.location}</span>
                  </div>
                  <h4 className="degree-title">{edu.degree}</h4>
                  <div className="score-badge">{edu.score}</div>
                  <p className="edu-details">{edu.details}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="certifications-list">
            {certificationsData.map((cert, idx) => (
              <div
                key={idx}
                className="cert-card"
                onMouseEnter={() => audio.playClick()}
              >
                <div className="cert-glow-border" />
                <div className="cert-content">
                  <div className="cert-meta">
                    <Award size={24} className="cert-icon" />
                    <div>
                      <h3 className="cert-title">{cert.title}</h3>
                      <span className="cert-issuer">{cert.issuer}</span>
                    </div>
                  </div>
                  <div className="cert-footer">
                    <span className="cert-date">{cert.date}</span>
                    <span className="cert-id">{cert.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
