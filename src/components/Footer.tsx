import React from 'react';
import { 
  Terminal, 
  Sparkles, 
  FileText, 
  ArrowUp
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenAiChat: () => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTerminal,
  onOpenAiChat,
  onOpenResume
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] brutal-border-t text-zinc-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#282828] pb-8">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black brutal-border flex items-center justify-center font-mono font-black text-[#CCFF00] text-lg">
              S_
            </div>
            <div>
              <div className="font-black text-white text-base uppercase font-mono">
                {PERSONAL_INFO.name} ({PERSONAL_INFO.preferredName})
              </div>
              <div className="text-[11px] text-zinc-400 font-mono">
                Software Developer • MCA @ VTU
              </div>
            </div>
          </div>

          {/* Quick interactive trigger buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121212] hover:bg-[#1a1a1a] text-zinc-300 font-mono text-xs uppercase border border-[#282828] hover:border-[#CCFF00] transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>CLI Terminal</span>
            </button>

            <button
              onClick={onOpenAiChat}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121212] hover:bg-[#1a1a1a] text-zinc-300 font-mono text-xs uppercase border border-[#282828] hover:border-[#CCFF00] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>Ask AI</span>
            </button>

            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-1.5 neon-bg text-black font-black font-mono text-xs uppercase transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 bg-[#121212] hover:bg-[#1a1a1a] text-zinc-300 border border-[#282828] hover:border-white transition-colors cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-zinc-500 uppercase">
          <div className="flex items-center gap-1">
            <span>Built with React, TypeScript & Tailwind CSS for</span>
            <strong className="text-white font-bold">{PERSONAL_INFO.name}</strong>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={PERSONAL_INFO.github} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#CCFF00] transition-colors"
            >
              github.com/sukan2004ya-netizen
            </a>
            <span>//</span>
            <a 
              href={PERSONAL_INFO.linkedin} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#CCFF00] transition-colors"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
