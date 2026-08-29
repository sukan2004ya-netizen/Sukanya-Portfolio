import React from 'react';
import { 
  User, 
  Target, 
  Sparkles, 
  Languages, 
  HeartHandshake, 
  Compass, 
  Cpu, 
  CheckCircle2, 
  Award,
  BookOpen
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 relative bg-[#0A0A0A] brutal-border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#333] text-[#CCFF00] text-xs font-mono font-bold uppercase tracking-widest">
            <span>[01] // PHILOSOPHY & VISION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
            Engineering with <span className="neon-text italic">Precision</span> & Speed
          </h2>
          <p className="text-zinc-400 max-w-2xl text-xs sm:text-sm font-mono leading-relaxed">
            Bridging foundational software engineering with computer vision, structured problem solving, and modern AI acceleration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Career Objective & Story */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Career Objective Card */}
            <div className="bg-[#0D0D0D] brutal-border p-6 sm:p-8 relative">
              <div className="flex items-center justify-between border-b border-[#282828] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 neon-bg"></span>
                  <h3 className="text-base font-black text-white font-mono uppercase tracking-widest">Career Objective</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">CORE_STATEMENT</span>
              </div>
              
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base italic border-l-2 border-[#CCFF00] pl-4 py-1">
                "Software Developer with a foundation in Java, C, PHP, and web technologies (HTML, CSS, JavaScript), plus hands-on exposure to Python and OpenCV through a computer-vision project. Comfortable learning new stacks quickly, working with AI-assisted tools, and building working applications end-to-end. Excited to contribute to an AI-first engineering environment where automation, quality, and speed drive real-world product delivery."
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0D0D0D] brutal-border p-5 space-y-2 hover:bg-[#111] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono neon-text uppercase font-bold">[01] COMPUTER VISION</span>
                  <Cpu className="w-4 h-4 text-[#CCFF00]" />
                </div>
                <h4 className="text-sm font-bold text-white uppercase italic">OpenCV & Feature Detection</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Real-world application of OpenCV and Python for automated helmet detection, compliance monitoring, and image analysis.
                </p>
              </div>

              <div className="bg-[#0D0D0D] brutal-border p-5 space-y-2 hover:bg-[#111] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono neon-text uppercase font-bold">[02] AI AUGMENTATION</span>
                  <Sparkles className="w-4 h-4 text-[#CCFF00]" />
                </div>
                <h4 className="text-sm font-bold text-white uppercase italic">Agentic Toolchains</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Leveraging Google Gemini, Claude, and ChatGPT to write test cases, generate technical specifications, and optimize velocity.
                </p>
              </div>

              <div className="bg-[#0D0D0D] brutal-border p-5 space-y-2 hover:bg-[#111] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono neon-text uppercase font-bold">[03] SDLC PRACTICE</span>
                  <BookOpen className="w-4 h-4 text-[#CCFF00]" />
                </div>
                <h4 className="text-sm font-bold text-white uppercase italic">Modular Architectures</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Rigorous grounding in requirement analysis, structured programming in Java/C/PHP, and QA testing standards.
                </p>
              </div>

              <div className="bg-[#0D0D0D] brutal-border p-5 space-y-2 hover:bg-[#111] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono neon-text uppercase font-bold">[04] DISTINCTION</span>
                  <Award className="w-4 h-4 text-[#CCFF00]" />
                </div>
                <h4 className="text-sm font-bold text-white uppercase italic">Academic Proven Track</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Distinction in PUC (92.33%), BCA First Class (75.89%), and currently pursuing Master of Computer Applications at VTU.
                </p>
              </div>
            </div>

            {/* Soft Skills */}
            <div className="bg-[#0D0D0D] brutal-border p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#282828] pb-2">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#CCFF00]" />
                  <span>Core Professional Strengths</span>
                </h4>
                <span className="text-[10px] font-mono text-zinc-600">COLLABORATION</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {PERSONAL_INFO.softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] border border-[#333] hover:border-[#CCFF00] text-xs font-mono text-zinc-200 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 neon-bg"></span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Spoken Languages & Personal Dimension */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Spoken Languages Card */}
            <div className="bg-[#0D0D0D] brutal-border p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#282828] pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm font-mono uppercase tracking-wider">
                  <Languages className="w-4 h-4 text-[#CCFF00]" />
                  <span>Languages Spoken</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Multilingual</span>
              </div>

              <div className="space-y-2.5">
                {PERSONAL_INFO.languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between p-3 bg-[#121212] border border-[#262626]">
                    <div>
                      <div className="font-bold text-zinc-200 text-xs font-mono uppercase">{lang.name}</div>
                      <div className="text-[10px] text-zinc-500 font-mono">{lang.proficiency}</div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#1a2200] text-[#CCFF00] border border-[#668800]">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hobbies & Beyond Code */}
            <div className="bg-[#0D0D0D] brutal-border p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#282828] pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm font-mono uppercase tracking-wider">
                  <Compass className="w-4 h-4 text-[#CCFF00]" />
                  <span>Beyond Code</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Interests</span>
              </div>

              <div className="space-y-3">
                {PERSONAL_INFO.hobbies.map((hobby) => (
                  <div key={hobby.name} className="p-3 bg-[#121212] border border-[#262626] space-y-1 hover:border-[#383838] transition-colors">
                    <div className="text-xs font-bold text-[#CCFF00] font-mono uppercase flex items-center justify-between">
                      <span>{hobby.name}</span>
                      <span className="text-zinc-600 text-[10px]">PASSION</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{hobby.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

