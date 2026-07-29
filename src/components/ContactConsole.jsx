import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { audio } from '../utils/audio';

export default function ContactConsole() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [terminalLogs, setTerminalLogs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addLog = (text, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, `[LOG]: ${text}`]);
        audio.playClick();
        resolve();
      }, delay);
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.name || !formData.email || !formData.message) {
    audio.playError();
    setStatus('error');
    setTerminalLogs(['[ERROR]: Insufficient packet details. Complete all fields.']);
    return;
  }

  audio.playBoot();
  setStatus('sending');
  setTerminalLogs([]);

  // Terminal animation delays
  await addLog('ESTABLISHING SECURE CONNECTION...', 300);
  await addLog('HANDSHAKE WITH BALJEET.SECURE...', 200);
  await addLog('ENCRYPTING TRANSLATION DATA...', 300);

  try {
    // Make actual API call to save to MongoDB & trigger email
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    await addLog('SAVING PACKET TO ATLAS DATABASE...', 200);
    await addLog('DISPATCHING NEURAL NOTIFICATION...', 300);

    if (response.ok) {
      audio.playSuccess();
      setStatus('success');
      setTerminalLogs((prev) => [
        ...prev,
        '[SUCCESS]: Message saved to Database!',
        '[CONFIRMATION]: Baljeet notified via email.',
      ]);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      throw new Error('Server returned non-200 status');
    }
  } catch (err) {
    audio.playError();
    setStatus('error');
    setTerminalLogs((prev) => [
      ...prev,
      '[ERROR]: Transmission failed. Signal interrupted.',
    ]);
  }
};

  return (
    <div className="contact-console-section" id="transmit">
      <div className="section-header-glow">
        <Mail size={24} className="neon-icon" />
        <h2>SECURE TRANSMISSION</h2>
        <div className="accent-bar" />
      </div>

      <div className="contact-grid">
        <div className="form-panel">
          <form onSubmit={handleSubmit} className="cyber-form">
            <div className="form-group">
              <label>SENDER IDENTITY</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="YOUR NAME"
                disabled={status === 'sending'}
              />
            </div>
            
            <div className="form-group">
              <label>RETURN COM-LINK</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="YOUR EMAIL"
                disabled={status === 'sending'}
              />
            </div>

            <div className="form-group">
              <label>OBJECT IDENTIFIER</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="SUBJECT"
                disabled={status === 'sending'}
              />
            </div>

            <div className="form-group">
              <label>DATA PAYLOAD</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="WRITE YOUR MESSAGE..."
                disabled={status === 'sending'}
              />
            </div>

            <button
              type="submit"
              className={`submit-btn ${status === 'sending' ? 'sending' : ''}`}
              disabled={status === 'sending'}
            >
              <span>{status === 'sending' ? 'TRANSMITTING...' : 'TRANSMIT PACKET'}</span>
              <Send size={12} />
            </button>
          </form>
        </div>

        <div className="console-panel">
          <div className="console-header">
            <span className="console-dot dot-red" />
            <span className="console-dot dot-yellow" />
            <span className="console-dot dot-green" />
            <span className="console-title">TRANSMISSION LOGGER</span>
          </div>
          <div className="console-body">
            {status === 'idle' && (
              <div className="console-placeholder">
                <p>Waiting for data packet assembly...</p>
                <p className="system-ready">SYSTEM: Ready to transmit</p>
              </div>
            )}
            
            {(status === 'sending' || status === 'success' || status === 'error') && (
              <div className="console-logs">
                {terminalLogs.map((log, idx) => (
                  <p key={idx} className={log.includes('[ERROR]') ? 'log-err' : log.includes('[SUCCESS]') ? 'log-ok' : ''}>
                    {log}
                  </p>
                ))}
                {status === 'sending' && <span className="console-caret animate-caret">█</span>}
              </div>
            )}
            
            {status === 'success' && (
              <div className="console-success-splash">
                <CheckCircle size={36} className="success-icon" />
                <p>TRANSMISSION SECURED</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
