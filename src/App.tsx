import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { HelmoVisionDemo } from './components/HelmoVisionDemo';
import { EducationTimeline } from './components/EducationTimeline';
import { CertificationsSection } from './components/CertificationsSection';
import { ChessPuzzleSection } from './components/ChessPuzzleSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { AiRecruiterChat } from './components/AiRecruiterChat';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#f1f5f9] selection:bg-[#CCFF00] selection:text-black">
      {/* Navigation Bar */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="space-y-0">
        <Hero
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenAiChat={() => setIsAiChatOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection />

        <HelmoVisionDemo />

        <EducationTimeline />

        <CertificationsSection />

        <ChessPuzzleSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Floating Action Button for AI Chat */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="floating-ai-button"
          onClick={() => setIsAiChatOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#CCFF00] hover:bg-white text-black font-black text-xs font-mono uppercase brutal-border shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer group"
          title="Ask Sukanya AI"
        >
          <span className="w-2 h-2 bg-black animate-ping" />
          <span>ASK SUKANYA AI</span>
        </button>
      </div>

      {/* Interactive Modals */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenAiChat={() => {
          setIsTerminalOpen(false);
          setIsAiChatOpen(true);
        }}
      />

      <AiRecruiterChat
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
