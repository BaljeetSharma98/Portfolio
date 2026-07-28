import React from 'react';
import { FiRadio, FiMail, FiPhone, FiLinkedin, FiGithub, FiDownload, FiFileText } from "react-icons/fi";
import { audio } from '../utils/audio';

export const ContactInfo = () => {
  return (
    <section id="contact" className="contact-info-section">
      <div className="section-header-glow">
        <FiRadio size={24} className="neon-icon"/>
        <h2>Contact</h2>
        <div className="accent-bar" />
      </div>

      <div className="console-grid-contact">
        {/* Panel 1: Direct Comms */}
        <div className="console-panel-contact">
          <div className="panel-header">// DIRECT COMMS</div>
          
          <div className="contact-list">
            <a 
              href="mailto:baljeetsharma.abc@gmail.com" 
              className="contact-item"
              onMouseEnter={() => audio.playClick()}
            >
              <FiMail className="contact-icon" />
              <div className="contact-data">
                <span className="label">EMAIL</span>
                <span className="contact-text">baljeetsharma.abc@gmail.com</span>
              </div>
            </a>

            <a 
              href="tel:+919588325789" 
              className="contact-item"
              onMouseEnter={() => audio.playClick()}
            >
              <FiPhone className="contact-icon" />
              <div className="contact-data">
                <span className="label">MOBILE</span>
                <span className="contact-text">+91 9588325789</span>
              </div>
            </a>

            <a 
              href="https://linkedin.com/in/baljeet-sharma" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-item"
              onMouseEnter={() => audio.playClick()}
            >
              <FiLinkedin className="contact-icon" />
              <div className="contact-data">
                <span className="label">LINKEDIN</span>
                <span className="contact-text">linkedin.com/in/baljeet-sharma</span>
              </div>
            </a>

            <a 
              href="https://github.com/BaljeetSharma98" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-item"
              onMouseEnter={() => audio.playClick()}
            >
              <FiGithub className="contact-icon" />
              <div className="contact-data">
                <span className="label">GITHUB</span>
                <span className="contact-text">github.com/BaljeetSharma98</span>
              </div>
            </a>
          </div>
        </div>

        {/* Panel 2: Download CV */}
        <div className="console-panel-contact cv-panel">
          <div className="panel-header">// SYSTEM ARCHIVE</div>
          
          <div className="cv-content">
            <div className="cv-preview">
              <FiFileText className="cv-file-icon" />
              <div className="cv-info">
                <span className="cv-filename">BALJEET_RESUME.pdf</span>
                <span className="cv-meta">VER 2.0 // FULL STACK DEV</span>
              </div>
            </div>

            <p className="cv-description">
              Access complete technical credentials, architecture experience, and project history.
            </p>

            <a 
              href="/BaljeetResume.pdf" 
              download="Baljeet_Resume.pdf" 
              className="download-btn"
              onMouseEnter={() => audio.playClick()}
              onClick={() => audio.playBoot()}
            >
              <FiDownload className="download-icon" />
              <span>INITIALIZE DOWNLOAD</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};