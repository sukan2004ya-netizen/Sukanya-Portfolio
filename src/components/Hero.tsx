import React, { useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  ShieldCheck, 
  Play, 
  Layers, 
  Code2, 
  GraduationCap
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenAiChat: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenTerminal,
  onOpenAiChat,
  onOpenResume
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section 
      id="hero-section"
      className="relative min-h-[92vh] pt-24 pb-16 flex items-center justify-center overflow-hidden bg-[#0A0A0A] artistic-grid brutal-border-b"
    >
      {/* Background Decorative Typography */}
      <div className="absolute -top-12 -right-12 text-[180px] sm:text-[240px] font-black opacity-[0.03] text-white pointer-events-none select-none font-mono tracking-tighter">
        NETIZEN
      </div>
      <div className="absolute -bottom-16 -left-16 text-[160px] sm:text-[220px] font-black opacity-[0.02] neon-text pointer-events-none select-none font-mono tracking-tighter">
        SUKANYA
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Artistic Branding & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 bg-[#0D0D0D] brutal-border relative">
            
            <div>
              {/* Top System Status Tag */}
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 brutal-border-b">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 neon-bg"></span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                    STATUS: <span className="neon-text font-bold">READY FOR HIRE</span>
                  </span>
                </div>
                <div className="text-[10px] font-mono text-zinc-600 uppercase">
                  LOC: NELLYADI, KA // IN
                </div>
              </div>

              {/* Huge Artistic Monolithic Name */}
              <div className="select-none tracking-tight">
                <div className="text-huge text-white font-black">SUKA</div>
                <div className="text-huge neon-text font-black ml-8 sm:ml-16">NYA</div>
              </div>

              {/* Sub-headline & Bio */}
              <div className="mt-6 space-y-3 max-w-xl">
                <p className="text-xs font-mono neon-text uppercase tracking-widest">
                  // Software Developer • MCA Scholar @ VTU
                </p>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                  Crafting high-precision applications with <strong className="text-white">Java, Python, C, PHP, and Web Architectures</strong>. Proven computer vision engineering with <strong className="neon-text">OpenCV</strong> (Helmo Vision) and interactive web applications (MedTrack).
                </p>
              </div>

              {/* Quick Contact Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-5 text-xs font-mono">
                <button
                  id="hero-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#CCFF00] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Click to copy email address"
                >
                  <Mail className="w-3.5 h-3.5 text-[#CCFF00]" />
                  <span>{PERSONAL_INFO.email}</span>
                  {copiedEmail ? <Check className="w-3 h-3 text-[#CCFF00]" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                </button>

                <button
                  id="hero-copy-phone-btn"
                  onClick={handleCopyPhone}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#202020] border border-[#333] hover:border-[#CCFF00] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Click to copy phone number"
                >
                  <Phone className="w-3.5 h-3.5 text-[#CCFF00]" />
                  <span>{PERSONAL_INFO.phone}</span>
                  {copiedPhone ? <Check className="w-3 h-3 text-[#CCFF00]" /> : <Copy className="w-3 h-3 text-zinc-500" />}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-6">
                <a
                  id="hero-explore-projects-cta"
                  href="#projects"
                  className="flex items-center gap-2 px-5 py-3 neon-bg hover:brightness-110 text-black font-mono font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  id="hero-cv-lab-cta"
                  href="#helmo-lab"
                  className="flex items-center gap-2 px-4 py-3 bg-[#161616] hover:bg-[#222222] border border-[#333] hover:border-[#CCFF00] text-zinc-200 font-mono text-xs uppercase tracking-wider transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-[#CCFF00] text-[#CCFF00]" />
                  <span>Helmo CV Lab</span>
                </a>

                <button
                  id="hero-open-resume-cta"
                  onClick={onOpenResume}
                  className="flex items-center gap-1.5 px-4 py-3 bg-[#161616] hover:bg-[#222] border border-[#333] hover:border-white text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </button>

                <button
                  id="hero-ai-chat-cta"
                  onClick={onOpenAiChat}
                  className="flex items-center gap-1.5 px-4 py-3 bg-[#1a2200] hover:bg-[#263300] border border-[#668800] hover:border-[#CCFF00] text-[#CCFF00] font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>

            {/* Socials Divider & Links */}
            <div className="flex flex-col gap-3 pt-8 mt-8 brutal-border-t">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Socials & Repos</span>
                <div className="h-[1px] flex-1 bg-[#282828]"></div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  id="hero-github-link"
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-[#333] bg-[#111] hover:bg-white hover:text-black text-zinc-300 text-[11px] font-mono uppercase transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>github.com/sukan2004ya-netizen</span>
                </a>

                <a
                  id="hero-linkedin-link"
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-[#333] bg-[#111] hover:bg-white hover:text-black text-zinc-300 text-[11px] font-mono uppercase transition-colors flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn / Sukanya Shetty</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Brutalist Developer Cockpit */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            
            {/* Terminal Preview Card */}
            <div className="bg-[#0D0D0D] brutal-border overflow-hidden flex-1 flex flex-col justify-between">
              {/* Terminal Header */}
              <div className="px-4 py-2.5 bg-black brutal-border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 neon-bg" />
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    SUKANYA // CORE_TELEMETRY
                  </span>
                </div>
                <button
                  id="hero-launch-terminal-btn"
                  onClick={onOpenTerminal}
                  className="text-[10px] font-mono uppercase font-bold text-black neon-bg px-2 py-0.5 transition-opacity hover:opacity-90 cursor-pointer"
                >
                  &gt; CLI
                </button>
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs text-zinc-300 space-y-3 bg-[#080808] flex-1">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="neon-text font-bold">$</span>
                  <span>cat developer_profile.json</span>
                </div>
                
                <div className="bg-[#0F0F0F] p-3.5 border border-[#262626] text-[11px] leading-relaxed overflow-x-auto text-zinc-300">
                  <pre>
{`{
  "name": "Sukanya P (Sukanya Shetty)",
  "role": "Software Developer",
  "status": "MCA @ VTU (2025–2027)",
  "distinctions": {
    "puc": "92.33% Distinction",
    "bca": "75.89% (Mangalore Univ)"
  },
  "stack": ["Java", "Python", "OpenCV", "JavaScript", "PHP", "C"],
  "featured_works": [
    "Helmo Vision (Computer Vision)",
    "MedTrack (Health Reminders)"
  ],
  "verified_certifications": 5,
  "ready_for_interviews": true
}`}
                  </pre>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-[#222]">
                  <span className="flex items-center gap-1.5 neon-text">
                    <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED CREDENTIALS
                  </span>
                  <span>HTTP 200 OK</span>
                </div>
              </div>
            </div>

            {/* Brutalist Metric Blocks */}
            <div className="grid grid-cols-3 brutal-border bg-[#000]">
              <div className="p-4 text-center border-r border-[#282828] hover:bg-[#111] transition-colors">
                <div className="text-[10px] font-mono uppercase text-zinc-500 mb-1">[01] PUC</div>
                <div className="text-xl sm:text-2xl font-black neon-text font-mono">92.3%</div>
                <div className="text-[9px] font-mono uppercase text-zinc-400 mt-0.5">Distinction</div>
              </div>

              <div className="p-4 text-center border-r border-[#282828] hover:bg-[#111] transition-colors">
                <div className="text-[10px] font-mono uppercase text-zinc-500 mb-1">[02] BCA</div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono">75.9%</div>
                <div className="text-[9px] font-mono uppercase text-zinc-400 mt-0.5">Graduate</div>
              </div>

              <div className="p-4 text-center hover:bg-[#111] transition-colors">
                <div className="text-[10px] font-mono uppercase text-zinc-500 mb-1">[03] CERTS</div>
                <div className="text-xl sm:text-2xl font-black neon-text font-mono">5+</div>
                <div className="text-[9px] font-mono uppercase text-zinc-400 mt-0.5">Accredited</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

