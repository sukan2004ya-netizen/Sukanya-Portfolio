import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Sparkles, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  ExternalLink,
  Code2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenAiChat: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTerminal,
  onOpenAiChat,
  onOpenResume
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'CV Lab', href: '#helmo-lab' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#282828] py-2.5 shadow-xl shadow-black/80' 
          : 'bg-[#0A0A0A]/80 backdrop-blur-sm border-b border-[#202020] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          id="navbar-brand-logo"
          href="#" 
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-8 h-8 neon-bg flex items-center justify-center text-black font-extrabold text-base font-mono shadow-[0_0_15px_rgba(204,255,0,0.4)] group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-white group-hover:text-[#CCFF00] transition-colors text-sm sm:text-base font-mono uppercase">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full neon-bg animate-pulse"></span>
              PORTFOLIO // 2026
            </span>
          </div>
        </a>

        {/* Desktop Nav items */}
        <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-6 border border-[#282828] bg-[#111111]/80 px-5 py-1.5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              href={link.href}
              className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 hover:text-[#CCFF00] hover:underline decoration-[#CCFF00] decoration-2 underline-offset-4 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div id="navbar-action-controls" className="hidden sm:flex items-center gap-2.5">
          <div className="neon-text text-[11px] font-mono mr-2 hidden md:block border border-[#282828] px-2 py-1 bg-[#121212]">
            v2.0.4-live
          </div>

          {/* Terminal Launcher */}
          <button
            id="nav-terminal-button"
            onClick={onOpenTerminal}
            title="Launch Interactive Terminal (CLI Mode)"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-zinc-300 bg-[#161616] hover:bg-[#222222] border border-[#333] hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all cursor-pointer active:scale-95"
          >
            <Terminal className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>CLI</span>
          </button>

          {/* AI Assistant Launcher */}
          <button
            id="nav-ai-chat-button"
            onClick={onOpenAiChat}
            title="Ask AI Recruiter Assistant about Sukanya"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-[#CCFF00] bg-[#1a2200]/80 hover:bg-[#253300] border border-[#668800] hover:border-[#CCFF00] transition-all cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#CCFF00] animate-pulse" />
            <span>ASK AI</span>
          </button>

          {/* Resume Modal */}
          <button
            id="nav-resume-button"
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-extrabold text-black neon-bg hover:brightness-110 shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all cursor-pointer active:scale-95 uppercase tracking-wide"
          >
            <FileText className="w-3.5 h-3.5 text-black" />
            <span>CV / RESUME</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="mobile-ai-trigger"
            onClick={onOpenAiChat}
            aria-label="Open AI Chat"
            className="p-2 text-[#CCFF00] bg-[#1a2200] border border-[#668800]"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          
          <button
            id="mobile-menu-toggle-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-zinc-300 hover:text-[#CCFF00] bg-[#161616] border border-[#333] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#0D0D0D] border-b border-[#282828] px-6 py-5 mt-2.5 space-y-4 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-[#CCFF00] hover:bg-[#181818] border border-transparent hover:border-[#333] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#282828] flex flex-col gap-2.5">
            <button
              id="mobile-drawer-resume-button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 neon-bg text-black font-extrabold text-xs font-mono uppercase tracking-wider shadow-[0_0_15px_rgba(204,255,0,0.3)]"
            >
              <FileText className="w-4 h-4" />
              <span>View & Print Resume</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                id="mobile-drawer-terminal-button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-[#161616] text-zinc-300 font-mono text-xs border border-[#333] hover:border-[#CCFF00]"
              >
                <Terminal className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span>CLI Terminal</span>
              </button>

              <button
                id="mobile-drawer-ai-button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiChat();
                }}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-[#1a2200] text-[#CCFF00] font-mono text-xs border border-[#668800]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI Bot</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2 text-zinc-500 text-xs font-mono uppercase">
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 hover:text-[#CCFF00]"
              >
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
              <span>•</span>
              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 hover:text-[#CCFF00]"
              >
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

