import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  FileText
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textResume = `
SUKANYA P
Software Developer
Nellyadi, Karnataka | +91 63640 70237 | sukanyashetty1235@gmail.com
LinkedIn: https://www.linkedin.com/in/sukanya-shetty-591270338 | GitHub: https://github.com/sukan2004ya-netizen

CAREER OBJECTIVE
Software Developer with a foundation in Java, C, PHP, and web technologies (HTML, CSS, JavaScript), plus hands-on exposure to Python and OpenCV through a computer-vision project. Comfortable learning new stacks quickly, working with AI-assisted tools, and building working applications end-to-end. Excited to contribute to an AI-first engineering environment where automation, quality, and speed drive real-world product delivery.

TECHNICAL SKILLS
- Programming Languages: Java, C, PHP, Python
- Web Technologies: HTML, CSS, JavaScript
- Computer Vision: OpenCV (object/feature detection basics)
- Tools & IDEs: VS Code, Apache NetBeans, Git/GitHub
- AI-Assisted Development: ChatGPT, Google Gemini, Claude
- Working Understanding: Software Development Life Cycle (SDLC) fundamentals

PROJECTS
1. Helmo Vision — Helmet Detection System | Python, OpenCV
   - Built a computer-vision system to automatically detect motorcyclists riding without helmets, aimed at supporting road safety enforcement.
   - Used Python and OpenCV to process video/image input and identify riders not wearing helmets.
   - Focused on a practical, real-world safety use case relevant to traffic monitoring.

2. MedTrack — Medicine Reminder Web App | JavaScript
   - Built a medicine reminder website to help users track and stay on schedule with their medication timings.
   - Implemented the reminder logic and interface using JavaScript for a responsive experience.
   - github.com/sukan2004ya-netizen/MedTrack

EDUCATION
- Master of Computer Applications (MCA) — Visvesvaraya Technological University (2025–2027)
- Bachelor of Computer Applications (BCA) — Mangalore University (2022–2025), 75.89%
- PUC — Department of Pre-University Education, Karnataka (2020–2022), 92.33%
- SSLC — Karnataka Secondary Education Board (2019–2020), 80%

CERTIFICATIONS
- Introduction to Cloud Computing — Infosys SpringBoard
- Introduction to Java — Infosys SpringBoard
- Advanced Python Programming (Grade A) — Ethnotech Academy (Skill India / NSDC)
- Web Application Development – HTML, CSS, JS (Grade A) — Ethnotech Academy (Skill India / NSDC)
- Research Methodologies and IPR (3 Credits, Elite Gold) — VTU Centre for Online Education

LANGUAGES & HOBBIES
- Languages: Tulu (Native), Kannada, English (Intermediate), Hindi (Intermediate)
- Hobbies: Playing Chess, Agricultural Work, Cooking
    `.trim();

    navigator.clipboard.writeText(textResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0D0D0D] brutal-border w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Controls Toolbar */}
        <div className="px-6 py-4 bg-[#121212] border-b border-[#282828] flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-mono font-black text-sm uppercase">
            <FileText className="w-4 h-4 text-[#CCFF00]" />
            <span>Curriculum Vitae — Sukanya P</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] hover:bg-white hover:text-black text-xs font-mono font-bold uppercase text-zinc-300 border border-[#333] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#CCFF00]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 neon-bg hover:brightness-110 text-black font-black text-xs font-mono uppercase transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white bg-black border border-[#333] transition-colors ml-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Formatted Printable Resume Paper */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-black font-sans text-sm selection:bg-[#CCFF00]">
          
          {/* Header */}
          <div className="text-center space-y-1.5 border-b-2 border-black pb-4">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase font-mono">
              SUKANYA P
            </h1>
            <p className="text-sm font-bold font-mono text-zinc-700 uppercase">
              Software Developer • MCA Candidate
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-800 font-mono font-medium pt-1">
              <span>{PERSONAL_INFO.location}</span>
              <span>•</span>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:underline font-bold">{PERSONAL_INFO.phone}</a>
              <span>•</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline font-bold">{PERSONAL_INFO.email}</a>
              <span>•</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-800 font-bold hover:underline">LinkedIn</a>
              <span>•</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-blue-800 font-bold hover:underline">GitHub</a>
            </div>
          </div>

          {/* Body content */}
          <div className="space-y-5 pt-4">
            
            {/* Career Objective */}
            <section className="space-y-1.5">
              <h2 className="text-xs font-black font-mono tracking-wider uppercase text-black border-b border-black pb-0.5">
                CAREER OBJECTIVE
              </h2>
              <p className="text-xs text-zinc-800 leading-relaxed">
                Software Developer with a foundation in Java, C, PHP, and web technologies (HTML, CSS, JavaScript), plus hands-on exposure to Python and OpenCV through a computer-vision project. Comfortable learning new stacks quickly, working with AI-assisted tools, and building working applications end-to-end. Excited to contribute to an AI-first engineering environment where automation, quality, and speed drive real-world product delivery.
              </p>
            </section>

            {/* Technical Skills */}
            <section className="space-y-1.5">
              <h2 className="text-xs font-black font-mono tracking-wider uppercase text-black border-b border-black pb-0.5">
                TECHNICAL SKILLS
              </h2>
              <ul className="text-xs text-zinc-800 space-y-1 list-disc pl-4">
                <li><strong>Programming Languages:</strong> Java, C, PHP, Python</li>
                <li><strong>Web Technologies:</strong> HTML, CSS, JavaScript</li>
                <li><strong>Computer Vision:</strong> OpenCV (object/feature detection basics)</li>
                <li><strong>Tools & IDEs:</strong> VS Code, Apache NetBeans, Git/GitHub</li>
                <li><strong>AI-Assisted Development:</strong> ChatGPT, Google Gemini, Claude — used for research, debugging, documentation, and exploring AI-agent-driven workflows</li>
                <li><strong>Working Understanding:</strong> Software Development Life Cycle (SDLC) fundamentals — requirement analysis, structured development, and basic testing/QA practices</li>
              </ul>
            </section>

            {/* Projects */}
            <section className="space-y-3">
              <h2 className="text-xs font-black font-mono tracking-wider uppercase text-black border-b border-black pb-0.5">
                PROJECTS
              </h2>
              
              <div className="space-y-1">
                <div className="flex justify-between items-baseline font-bold text-xs text-black font-mono">
                  <span>Helmo Vision — Helmet Detection System</span>
                  <span className="text-zinc-600 font-normal">Python, OpenCV</span>
                </div>
                <ul className="text-xs text-zinc-800 space-y-0.5 list-disc pl-4">
                  <li>Built a computer-vision system to automatically detect motorcyclists riding without helmets, aimed at supporting road safety enforcement.</li>
                  <li>Used Python and OpenCV to process video/image input and identify riders not wearing helmets.</li>
                  <li>Focused on a practical, real-world safety use case relevant to traffic monitoring and automated enforcement systems.</li>
                </ul>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline font-bold text-xs text-black font-mono">
                  <span>MedTrack — Medicine Reminder Web App</span>
                  <span className="text-zinc-600 font-normal">JavaScript</span>
                </div>
                <ul className="text-xs text-zinc-800 space-y-0.5 list-disc pl-4">
                  <li>Built a medicine reminder website to help users track and stay on schedule with their medication timings.</li>
                  <li>Implemented the reminder logic and interface using JavaScript for a responsive, user-friendly experience.</li>
                  <li className="text-blue-800 font-mono">github.com/sukan2004ya-netizen/MedTrack</li>
                </ul>
              </div>
            </section>

            {/* Education */}
            <section className="space-y-1.5">
              <h2 className="text-xs font-black font-mono tracking-wider uppercase text-black border-b border-black pb-0.5">
                EDUCATION
              </h2>
              <ul className="text-xs text-zinc-800 space-y-1 list-disc pl-4">
                <li><strong>Master of Computer Applications (MCA)</strong> — Visvesvaraya Technological University (2025–2027)</li>
                <li><strong>Bachelor of Computer Applications (BCA)</strong> — Mangalore University (2022–2025), <strong>75.89%</strong></li>
                <li><strong>PUC</strong> — Department of Pre-University Education, Karnataka (2020–2022), <strong>92.33%</strong></li>
                <li><strong>SSLC</strong> — Karnataka Secondary Education Board (2019–2020), <strong>80%</strong></li>
              </ul>
            </section>

            {/* Certifications */}
            <section className="space-y-1.5">
              <h2 className="text-xs font-black font-mono tracking-wider uppercase text-black border-b border-black pb-0.5">
                CERTIFICATIONS
              </h2>
              <ul className="text-xs text-zinc-800 space-y-1 list-disc pl-4">
                <li><strong>Introduction to Cloud Computing</strong> — Infosys SpringBoard</li>
                <li><strong>Introduction to Java</strong> — Infosys SpringBoard</li>
                <li><strong>Advanced Python Programming (Grade A)</strong> — Ethnotech Academy (Skill India / NSDC)</li>
                <li><strong>Web Application Development – HTML, CSS, JS (Grade A)</strong> — Ethnotech Academy (Skill India / NSDC)</li>
                <li><strong>Research Methodologies and IPR (3 Credits, Elite Gold)</strong> — VTU Centre for Online Education</li>
              </ul>
            </section>

            {/* Soft Skills */}
            <section className="space-y-1">
              <h2 className="text-xs font-black font-mono tracking-wider uppercase text-black border-b border-black pb-0.5">
                SOFT SKILLS
              </h2>
              <p className="text-xs text-zinc-800 font-mono">
                Adaptability • Collaboration • Communication • Problem Solving • Time Management
              </p>
            </section>

            {/* Languages & Hobbies */}
            <section className="space-y-1">
              <h2 className="text-xs font-black font-mono tracking-wider uppercase text-black border-b border-black pb-0.5">
                LANGUAGES & HOBBIES
              </h2>
              <ul className="text-xs text-zinc-800 space-y-0.5 list-disc pl-4">
                <li><strong>Languages:</strong> Tulu (Native), Kannada, English (Intermediate), Hindi (Intermediate)</li>
                <li><strong>Hobbies:</strong> Playing Chess, Agricultural Work, Cooking</li>
              </ul>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
};
