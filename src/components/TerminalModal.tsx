import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Terminal as TerminalIcon, 
  Maximize2, 
  Minimize2
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, EDUCATION_LIST, CERTIFICATIONS } from '../data/portfolioData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAiChat: () => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onOpenAiChat
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [executedCommands, setExecutedCommands] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (history.length === 0) {
        // Initial banner
        setHistory([
          {
            id: 'welcome',
            command: 'system.init()',
            output: (
              <div className="space-y-1.5 text-zinc-300 text-xs font-mono">
                <div className="text-[#CCFF00] font-black text-sm uppercase">
                  ⚡ Sukanya P (Sukanya Shetty) — Interactive Developer CLI v2.4
                </div>
                <div className="text-zinc-400">
                  Software Developer | MCA @ VTU | Java • Python • OpenCV • Web Systems
                </div>
                <div className="text-white pt-1">
                  Type <span className="text-[#CCFF00] font-bold underline">help</span> to view all supported terminal commands.
                </div>
              </div>
            )
          }
        ]);
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    setExecutedCommands(prev => [...prev, cmdStr]);
    setCommandIndex(-1);

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono text-zinc-300">
            <div className="text-[#CCFF00] font-bold uppercase">// AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1">
              <div><span className="text-[#CCFF00] font-bold">bio</span> — Developer summary & career goals</div>
              <div><span className="text-[#CCFF00] font-bold">skills</span> — Technical languages & tools</div>
              <div><span className="text-[#CCFF00] font-bold">projects</span> — List core software projects</div>
              <div><span className="text-[#CCFF00] font-bold">helmo</span> — Run Helmo Vision CV pipeline</div>
              <div><span className="text-[#CCFF00] font-bold">medtrack</span> — Inspect MedTrack app details</div>
              <div><span className="text-[#CCFF00] font-bold">education</span> — Academic degrees & scores</div>
              <div><span className="text-[#CCFF00] font-bold">certs</span> — Verified certifications</div>
              <div><span className="text-[#CCFF00] font-bold">contact</span> — Email, phone & socials</div>
              <div><span className="text-[#CCFF00] font-bold">hire</span> — Interview & recruitment info</div>
              <div><span className="text-[#CCFF00] font-bold">aichat</span> — Launch AI Recruiter assistant</div>
              <div><span className="text-[#CCFF00] font-bold">clear</span> — Clear terminal window</div>
              <div><span className="text-[#CCFF00] font-bold">exit</span> — Close terminal</div>
            </div>
          </div>
        );
        break;

      case 'bio':
        outputNode = (
          <div className="text-xs font-mono space-y-2 text-zinc-300">
            <div className="text-[#CCFF00] font-bold uppercase">{PERSONAL_INFO.name} ({PERSONAL_INFO.preferredName})</div>
            <div>{PERSONAL_INFO.bio}</div>
            <div className="text-zinc-400">Languages: Tulu (Native), Kannada (Fluent), English (Working), Hindi (Intermediate)</div>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-zinc-300">
            {SKILL_CATEGORIES.map(cat => (
              <div key={cat.title}>
                <div className="text-[#CCFF00] font-bold uppercase">// {cat.title}:</div>
                <div className="text-zinc-300 pl-3">
                  {cat.skills.map(s => `${s.name} (${s.level}%)`).join(' • ')}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-3 text-xs font-mono text-zinc-300">
            {PROJECTS.map(p => (
              <div key={p.id} className="border-l-2 border-[#CCFF00] pl-3">
                <div className="text-white font-bold">{p.title} [{p.category}]</div>
                <div className="text-zinc-400">{p.description}</div>
                <div className="text-[#CCFF00] text-[11px]">Tags: {p.tags.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'helmo':
        outputNode = (
          <div className="p-3 bg-black border border-[#282828] text-xs font-mono text-zinc-300 space-y-1">
            <div className="text-[#CCFF00] font-bold">[OPENCV_SYSTEM] Running Helmo Vision Pipeline...</div>
            <div className="text-zinc-400">1. Reading Video Stream Frame: 1920x1080 @ 30 FPS</div>
            <div className="text-zinc-400">2. GaussianBlur(ksize=(5,5)) + Canny(50, 150)</div>
            <div className="text-zinc-400">3. Head ROI Extracted: Area=720px, Circularity=0.88</div>
            <div className="text-[#CCFF00] font-bold">4. RESULT: HELMET_VERIFIED (Confidence: 96.2%)</div>
            <div className="text-zinc-400">Status: Road Safety Law Enforcement COMPLIANT.</div>
          </div>
        );
        break;

      case 'medtrack':
        outputNode = (
          <div className="p-3 bg-black border border-[#282828] text-xs font-mono text-zinc-300 space-y-1">
            <div className="text-[#CCFF00] font-bold">MedTrack — Medicine Reminder Web App</div>
            <div className="text-zinc-300">Repository: https://github.com/sukan2004ya-netizen/MedTrack</div>
            <div className="text-zinc-400">Features: Multi-dose scheduling, in-browser audio chime, daily adherence streak counter.</div>
          </div>
        );
        break;

      case 'education':
      case 'edu':
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-zinc-300">
            {EDUCATION_LIST.map(e => (
              <div key={e.degree}>
                <span className="text-[#CCFF00] font-bold">{e.degree}</span>
                <span className="text-zinc-400"> — {e.institution} ({e.period}) {e.score ? `[${e.score}]` : ''}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
      case 'certifications':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            {CERTIFICATIONS.map(c => (
              <div key={c.title}>
                <span className="text-white font-bold">• {c.title}</span>
                <span className="text-zinc-400"> ({c.issuer} {c.grade ? `— ${c.grade}` : ''})</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#CCFF00] underline">{PERSONAL_INFO.email}</a></div>
            <div>Phone: <span className="text-white">{PERSONAL_INFO.phone}</span></div>
            <div>Location: <span className="text-zinc-400">{PERSONAL_INFO.location}</span></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-[#CCFF00] underline">{PERSONAL_INFO.linkedin}</a></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-[#CCFF00] underline">{PERSONAL_INFO.github}</a></div>
          </div>
        );
        break;

      case 'hire':
        outputNode = (
          <div className="p-3 bg-[#1a2200] border border-[#CCFF00] text-xs font-mono text-[#CCFF00] space-y-2">
            <div className="font-bold text-white uppercase">💼 Recruiter & Hiring Next Steps:</div>
            <div>Sukanya is currently pursuing MCA at VTU and actively seeking Software Engineering Roles & MCA Internships.</div>
            <div>Direct Email: <strong>{PERSONAL_INFO.email}</strong> | Direct Phone: <strong>{PERSONAL_INFO.phone}</strong></div>
          </div>
        );
        break;

      case 'aichat':
        onClose();
        onOpenAiChat();
        return;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        outputNode = (
          <div className="text-xs font-mono text-red-400">
            Command not found: '{cmdStr}'. Type <span className="text-[#CCFF00] underline">help</span> for a list of valid commands.
          </div>
        );
    }

    setHistory(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        command: cmdStr,
        output: outputNode
      }
    ]);

    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (executedCommands.length > 0) {
        const nextIdx = commandIndex === -1 ? executedCommands.length - 1 : Math.max(0, commandIndex - 1);
        setCommandIndex(nextIdx);
        setInputVal(executedCommands[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      if (executedCommands.length > 0 && commandIndex !== -1) {
        const nextIdx = commandIndex + 1;
        if (nextIdx < executedCommands.length) {
          setCommandIndex(nextIdx);
          setInputVal(executedCommands[nextIdx]);
        } else {
          setCommandIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className={`bg-[#0D0D0D] brutal-border flex flex-col overflow-hidden transition-all duration-300 ${
          isMaximized ? 'w-full h-full' : 'w-full max-w-3xl h-[540px]'
        }`}
      >
        {/* Terminal Titlebar */}
        <div className="px-4 py-3 bg-[#121212] border-b border-[#282828] flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 bg-yellow-500 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
            <div className="w-3 h-3 neon-bg cursor-pointer" />
            <span className="ml-2 text-xs font-mono text-zinc-300 font-bold flex items-center gap-1.5 uppercase">
              <TerminalIcon className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>sukanya@terminal: ~/portfolio</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 text-zinc-400 hover:text-white bg-black border border-[#333] transition-colors cursor-pointer"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white bg-black border border-[#333] transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content Screen */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-5 overflow-y-auto font-mono text-xs text-zinc-200 space-y-4 cursor-text bg-[#080808]"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-zinc-500">
                <span className="text-[#CCFF00] font-bold">sukanya@portfolio:~$</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <div className="pl-4 py-1">{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-1 text-zinc-300">
            <span className="text-[#CCFF00] font-bold shrink-0">sukanya@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs focus:ring-0"
              autoFocus
              placeholder="Type 'help'..."
            />
          </div>

          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Quick Command Pills Footer */}
        <div className="px-4 py-2.5 bg-[#121212] border-t border-[#282828] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-zinc-400">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-zinc-500 uppercase">Quick:</span>
            {['help', 'bio', 'skills', 'helmo', 'education', 'contact'].map(cmd => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2 py-0.5 bg-[#1a1a1a] hover:bg-[#CCFF00] hover:text-black text-zinc-300 uppercase border border-[#333] transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-zinc-500 hidden sm:inline uppercase">Press Enter to run</span>
        </div>

      </div>
    </div>
  );
};
