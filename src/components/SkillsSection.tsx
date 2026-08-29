import React, { useState } from 'react';
import { 
  Code2, 
  Cpu, 
  Globe, 
  Wrench, 
  Terminal, 
  ChevronRight
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(SKILL_CATEGORIES[0].skills[0]);

  const activeCategory = SKILL_CATEGORIES[activeCategoryIndex];

  return (
    <section id="skills" className="py-20 bg-[#0A0A0A] relative brutal-border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#333] text-[#CCFF00] text-xs font-mono font-bold uppercase tracking-widest">
            <span>[02] // TECHNICAL STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
            Languages & <span className="neon-text italic">Engineering</span> Matrix
          </h2>
          <p className="text-zinc-400 max-w-2xl text-xs sm:text-sm font-mono leading-relaxed">
            Verified knowledge across foundational programming, computer vision pipelines, web engineering, and modern AI developer toolchains.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={cat.title}
                id={`skill-tab-${idx}`}
                onClick={() => {
                  setActiveCategoryIndex(idx);
                  setSelectedSkill(cat.skills[0]);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'neon-bg text-black font-black shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                    : 'bg-[#111] text-zinc-400 hover:text-white hover:bg-[#181818] border border-[#282828]'
                }`}
              >
                {idx === 0 && <Code2 className="w-3.5 h-3.5" />}
                {idx === 1 && <Cpu className="w-3.5 h-3.5" />}
                {idx === 2 && <Globe className="w-3.5 h-3.5" />}
                {idx === 3 && <Wrench className="w-3.5 h-3.5" />}
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Skill Items with Interactive Selection */}
          <div className="lg:col-span-7 space-y-3">
            {activeCategory.skills.map((skill) => {
              const isSelected = selectedSkill.name === skill.name;
              return (
                <div
                  key={skill.name}
                  id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-4 transition-all duration-150 cursor-pointer brutal-border ${
                    isSelected
                      ? 'bg-[#141414] border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.15)]'
                      : 'bg-[#0D0D0D] hover:bg-[#111] border-[#282828] hover:border-[#3a3a3a]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-white text-sm sm:text-base font-mono uppercase">{skill.name}</span>
                      {skill.badge && (
                        <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-[#1a2200] text-[#CCFF00] border border-[#668800]">
                          {skill.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#CCFF00]">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar (Brutalist style) */}
                  <div className="w-full h-2 bg-[#1A1A1A] border border-[#333] mb-2 p-[1px]">
                    <div
                      className="h-full neon-bg transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Interactive Skill Inspector & Code Preview */}
          <div className="lg:col-span-5">
            <div className="bg-[#0D0D0D] brutal-border p-6 space-y-5 sticky top-24">
              
              <div className="flex items-center justify-between border-b border-[#282828] pb-4">
                <div>
                  <span className="text-[10px] font-mono neon-text uppercase tracking-widest">
                    TELEMETRY // INSPECTOR
                  </span>
                  <h3 className="text-lg font-black text-white font-mono uppercase mt-0.5">
                    {selectedSkill.name}
                  </h3>
                </div>
                <div className="p-2 bg-black text-[#CCFF00] border border-[#333]">
                  <Terminal className="w-4 h-4" />
                </div>
              </div>

              {/* Skill Description */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Capabilities:</div>
                <p className="text-xs text-zinc-300 leading-relaxed bg-[#080808] p-3.5 border border-[#262626] font-mono">
                  {selectedSkill.description}
                </p>
              </div>

              {/* Code Snippet if present */}
              {selectedSkill.snippet && (
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase flex items-center justify-between">
                    <span>Sample Pattern:</span>
                    <span className="neon-text">SYNTAX</span>
                  </div>
                  <div className="bg-[#080808] p-3 border border-[#262626] font-mono text-[11px] text-[#CCFF00] overflow-x-auto">
                    <code>{selectedSkill.snippet}</code>
                  </div>
                </div>
              )}

              {/* Practical Applications */}
              <div className="space-y-2 pt-2 border-t border-[#282828]">
                <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Verification Highlights:</div>
                <ul className="space-y-1.5 text-xs text-zinc-400 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="neon-text mt-0.5">&gt;</span>
                    <span>Applied in academic coursework & real-world system implementations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="neon-text mt-0.5">&gt;</span>
                    <span>Validated through structured debugging, unit tests, and modular refactoring.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

