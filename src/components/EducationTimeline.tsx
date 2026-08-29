import React from 'react';
import { 
  GraduationCap, 
  Building, 
  CheckCircle2
} from 'lucide-react';
import { EDUCATION_LIST } from '../data/portfolioData';

export const EducationTimeline: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-[#0A0A0A] relative brutal-border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#333] text-[#CCFF00] text-xs font-mono font-bold uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>[05] // ACADEMIC TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
            Education & <span className="neon-text italic">Academic Honors</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-xs sm:text-sm font-mono leading-relaxed">
            Proven track record of high scholastic performance, from top-tier pre-university distinction (92.33%) to advanced postgraduate MCA studies at VTU.
          </p>
        </div>

        {/* Timeline Roadmap */}
        <div className="relative border-l-2 border-[#282828] ml-4 md:ml-24 space-y-10 pb-4">
          {EDUCATION_LIST.map((item, index) => (
            <div key={item.degree} className="relative pl-8 md:pl-10 group">
              
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 bg-black brutal-border flex items-center justify-center text-[#CCFF00] group-hover:scale-110 group-hover:bg-[#CCFF00] group-hover:text-black transition-all">
                <span className="font-mono font-black text-xs">0{index + 1}</span>
              </div>

              {/* Card */}
              <div className="bg-[#0D0D0D] brutal-border p-6 sm:p-8 hover:border-[#CCFF00] transition-all space-y-4">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#282828] pb-4">
                  <div>
                    <span className="text-xs font-mono font-black text-[#CCFF00] uppercase tracking-wider">
                      // {item.period}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
                      {item.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mt-1">
                      <Building className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <span>{item.institution}</span>
                    </div>
                  </div>

                  {item.score && (
                    <div className="self-start sm:self-center px-4 py-2 bg-[#000] border border-[#333] text-right">
                      <div className="text-sm font-black font-mono text-[#CCFF00]">{item.score}</div>
                      {item.scoreLabel && (
                        <div className="text-[9px] font-mono text-zinc-500 uppercase">{item.scoreLabel}</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-mono">
                  {item.description}
                </p>

                {/* Highlights if present */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-wider">// KEY HIGHLIGHTS:</div>
                    <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
