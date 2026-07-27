import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { audio } from '../utils/audio';

export default function Terminal({ onClose }) {
  const [history, setHistory] = useState([
    { type: 'sys', text: 'INITIALIZING PORTFOLIO KERNEL PROTOCOLS...' },
    { type: 'sys', text: 'ESTABLISHING SECURITY SHIELD...' },
    { type: 'sys', text: 'SYSTEM: ACTIVE. Welcome to Baljeet\'s Cyber-Terminal.' },
    { type: 'sys', text: 'Type "help" to view available subsystems.' }
  ]);
  const [input, setInput] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [isHacking, setIsHacking] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, isHacking]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    let response = [];

    if (!trimmed) return;

    switch (trimmed) {
      case 'help':
        response = [
          { type: 'output', text: 'Available commands:' },
          { type: 'output', text: '  about      - Display Baljeet\'s summary profile.' },
          { type: 'output', text: '  skills     - Map the current core technologies.' },
          { type: 'output', text: '  projects   - Retrieve the current project registry.' },
          { type: 'output', text: '  education  - Access historical academic records.' },
          { type: 'output', text: '  contact    - Display direct access coordinates.' },
          { type: 'output', text: '  hack       - Initiate network simulation test.' },
          { type: 'output', text: '  clear      - Purge console log history.' },
          { type: 'output', text: '  close      - Close terminal overlay.' }
        ];
        break;
      case 'about':
        response = [
          { type: 'output', text: 'IDENTITY: Baljeet | Web Developer' },
          { type: 'output', text: 'MISSION: Full Stack Web Developer building scalable systems.' },
          { type: 'output', text: 'SPECS: Skilled in Node.js, Express.js, React.js, and PostgreSQL.' },
          { type: 'output', text: 'OBJECTIVE: Developing AI solutions and refining user interfaces.' }
        ];
        break;
      case 'skills':
        response = [
          { type: 'output', text: '--- TECH STACK REGISTRY ---' },
          { type: 'output', text: 'Languages: C++, SQL, JavaScript' },
          { type: 'output', text: 'Frontend: React.js, HTML, CSS, Bootstrap' },
          { type: 'output', text: 'Backend: Node.js, Express.js' },
          { type: 'output', text: 'Databases: PostgreSQL, MongoDB, NoSQL' },
          { type: 'output', text: 'Concepts: DSA, OOPs, SDLC' },
          { type: 'output', text: 'AI: Gemini, ChatGPT, Claude, GenAI' }
        ];
        break;
      case 'projects':
        response = [
          { type: 'output', text: '--- PROJECT ARCHIVE ---' },
          { type: 'output', text: '1. THUMBLIFY - AI Video Thumbnail Generator (React.js, Node.js)' },
          { type: 'output', text: '   - Generates aspect-ratio custom AI thumbnails.' },
          { type: 'output', text: '2. COLLEGE SOCIAL NETWORK - Peer communication space (PostgreSQL, React)' },
          { type: 'output', text: '   - Direct messaging, forums, profile configurations.' },
          { type: 'output', text: '3. BLOG PORTAL - Markdown blogging & authentication (Node.js, PostgreSQL)' },
          { type: 'output', text: '   - Session validations, likes, comment loops.' }
        ];
        break;
      case 'education':
        response = [
          { type: 'output', text: '--- HISTORICAL ACADEMICS ---' },
          { type: 'output', text: 'Chandigarh University - B.E. in CS (Aug 2022 - July 2026) | CGPA: 8.01/10' },
          { type: 'output', text: 'Delhi Public Int. School - High School (+2) (July 2022) | 85.17%' },
          { type: 'output', text: 'Ahir Modern Public School - Class X (Apr 2020) | 86.14%' }
        ];
        break;
      case 'contact':
        response = [
          { type: 'output', text: '--- COM-LINK FREQUENCIES ---' },
          { type: 'output', text: 'EMAIL: baljeetsharma.abc@gmail.com' },
          { type: 'output', text: 'PHONE: +91-9588325789' },
          { type: 'output', text: 'LINKEDIN: linkedin.com/in/baljeet-sharma' },
          { type: 'output', text: 'GITHUB: github.com/BaljeetSharma98' }
        ];
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'close':
        onClose();
        return;
      case 'hack':
        triggerHackAnimation();
        return;
      default:
        response = [{ type: 'output-err', text: `Command not found: "${trimmed}". Type "help" for a list of directives.` }];
        audio.playError();
        break;
    }
    
    if (trimmed !== 'hack') {
      setHistory((prev) => [...prev, { type: 'input', text: cmdText }, ...response]);
      audio.playClick();
    }
  };

  const triggerHackAnimation = () => {
    setIsHacking(true);
    audio.playBoot();
    const hackLines = [
      'BYPASSING MAIN NEURAL GRID...',
      'OVERRIDING PORT PROTOCOLS: 80, 443...',
      'ESTABLISHING SHADOW TUNNEL...',
      'DECRYPTING FIREWALL REPOSITORIES...',
      'CRACKING SEED SHIFT STRATEGY...',
      'INTERCEPTING MAIN DATABASE INDEX...',
      'FETCHING DEVELOPER RESUME DATASET...',
      'HACK COMPLETE: ACCESS LEVEL 9 GRANTED.'
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < hackLines.length) {
        setHistory((prev) => [...prev, { type: 'sys-green', text: hackLines[currentLine] }]);
        audio.playClick();
        currentLine++;
      } else {
        clearInterval(interval);
        setIsHacking(false);
        audio.playSuccess();
      }
    }, 250);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div
      className={`terminal-overlay ${isMaximized ? 'maximized' : ''}`}
      onClick={focusInput}
    >
      <div className="terminal-header" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-title">
          <TerminalIcon size={14} />
          <span>guest@baljeet-sys:~</span>
        </div>
        <div className="terminal-controls">
          <button
            className="control-btn"
            onClick={(e) => {
              e.stopPropagation();
              audio.playClick();
              setIsMaximized(!isMaximized);
            }}
          >
            {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          </button>
          <button
            className="control-btn close"
            onClick={(e) => {
              e.stopPropagation();
              audio.playError();
              onClose();
            }}
          >
            <X size={12} />
          </button>
        </div>
      </div>

      <div className="terminal-body" ref={bodyRef}>
        <div className="terminal-history">
          {history.map((item, idx) => {
            if (item.type === 'input') {
              return (
                <div key={idx} className="terminal-line">
                  <span className="terminal-prompt">guest@baljeet-sys:~$</span>
                  <span className="terminal-user-cmd">{item.text}</span>
                </div>
              );
            }
            return (
              <div key={idx} className={`terminal-line line-${item.type}`}>
                {item.text}
              </div>
            );
          })}
        </div>

        {!isHacking && (
          <div className="terminal-input-row">
            <span className="terminal-prompt">guest@baljeet-sys:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              maxLength="50"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <span className="terminal-caret animate-caret">█</span>
          </div>
        )}
      </div>
    </div>
  );
}
