import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  BookOpen
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-20 bg-[#0A0A0A] relative brutal-border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#333] text-[#CCFF00] text-xs font-mono font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>[06] // VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
            Certifications & <span className="neon-text italic">Accreditations</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-xs sm:text-sm font-mono leading-relaxed">
            Formal certifications from Infosys SpringBoard, Skill India / NSDC (Ethnotech Academy), and VTU Centre for Online Education.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, idx) => {
            return (
              <div
                key={cert.title}
                className="p-6 brutal-border bg-[#0D0D0D] flex flex-col justify-between space-y-4 hover:border-[#CCFF00] transition-all group"
              >
                <div className="space-y-3">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider bg-black text-[#CCFF00] border border-[#333]">
                      {cert.grade || 'VERIFIED'}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600">CERT-0{idx + 1}</span>
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="text-base font-black text-white font-mono uppercase leading-snug group-hover:text-[#CCFF00] transition-colors">
                      {cert.title}
                    </h3>
                    <div className="text-xs font-mono text-zinc-400 mt-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <span>{cert.issuer}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {cert.description}
                  </p>
                </div>

                {/* Skills Acquired Chips */}
                <div className="space-y-2 pt-3 border-t border-[#282828]">
                  <div className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                    Competencies:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsAcquired.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-[9px] font-mono bg-[#141414] text-zinc-300 border border-[#282828]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
