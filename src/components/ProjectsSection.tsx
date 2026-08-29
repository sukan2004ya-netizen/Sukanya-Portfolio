import React, { useState } from 'react';
import { 
  FolderGit2, 
  Github, 
  Play, 
  Eye, 
  ArrowUpRight
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { MedTrackDemo } from './MedTrackDemo';

export const ProjectsSection: React.FC = () => {
  const [showMedTrackSandbox, setShowMedTrackSandbox] = useState(true);

  return (
    <section id="projects" className="py-20 bg-[#0A0A0A] relative brutal-border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#333] text-[#CCFF00] text-xs font-mono font-bold uppercase tracking-widest">
            <span>[03] // FEATURED ARTIFACTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
            Applied <span className="neon-text italic">Engineering</span> & Systems
          </h2>
          <p className="text-zinc-400 max-w-2xl text-xs sm:text-sm font-mono leading-relaxed">
            End-to-end applications built to solve tangible road safety, health adherence, and developer acceleration challenges.
          </p>
        </div>

        {/* Projects Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.filter(p => p.featured).map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="bg-[#0D0D0D] brutal-border p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#444] transition-all group relative"
            >
              <div className="space-y-4">
                {/* Header Tag and Category */}
                <div className="flex items-center justify-between border-b border-[#282828] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 neon-bg"></span>
                    <span className="text-[11px] font-mono font-bold uppercase text-[#CCFF00] tracking-widest">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-[#141414] hover:bg-white hover:text-black border border-[#333] text-zinc-300 transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:neon-text transition-colors font-sans uppercase">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    // {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2 pt-2 border-t border-[#282828]">
                  <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Architecture Highlights:</div>
                  <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="neon-text font-bold">&gt;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics Pill Grid */}
                {project.metrics && (
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="bg-[#080808] p-2.5 border border-[#262626] text-center">
                        <div className="text-[9px] font-mono uppercase text-zinc-500">{m.label}</div>
                        <div className="text-xs font-black text-white font-mono mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Tech Tags & CTA */}
              <div className="space-y-4 pt-4 border-t border-[#282828]">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-mono uppercase font-bold bg-[#141414] text-zinc-300 border border-[#2e2e2e]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.id === 'helmo-vision' ? (
                  <a
                    href="#helmo-lab"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 neon-bg hover:brightness-110 text-black font-mono font-black text-xs uppercase tracking-wider transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-black text-black" />
                    <span>Launch Live Computer Vision Lab</span>
                  </a>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowMedTrackSandbox(!showMedTrackSandbox)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{showMedTrackSandbox ? 'Interactive Sandbox Active' : 'Show Sandbox'}</span>
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#161616] hover:bg-[#222] text-zinc-200 border border-[#333] transition-colors"
                        title="GitHub Repo"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Embedded MedTrack Sandbox */}
        {showMedTrackSandbox && (
          <div className="pt-4">
            <MedTrackDemo />
          </div>
        )}

      </div>
    </section>
  );
};

