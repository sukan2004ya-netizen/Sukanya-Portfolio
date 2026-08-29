import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Send, 
  Check, 
  Copy, 
  MessageSquare
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('Opportunity Discussion / Interview');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    // Trigger mailto client
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(`[Portfolio] ${subject} - from ${name}`)}&body=${encodeURIComponent(`Hi Sukanya,\n\n${message}\n\nFrom:\n${name}\nEmail: ${senderEmail || 'N/A'}`)}`;
    
    window.open(mailtoUrl, '_blank');
    setSent(true);
    
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 }
    });

    setTimeout(() => setSent(false), 5000);
  };

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
    <section id="contact" className="py-20 bg-[#0A0A0A] relative brutal-border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#333] text-[#CCFF00] text-xs font-mono font-bold uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            <span>[07] // LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans">
            Get in Touch with <span className="neon-text italic">Sukanya</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-xs sm:text-sm font-mono leading-relaxed">
            Open to discussing Software Engineering opportunities, MCA internships, technical collaborations, and research projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Details & Availability */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#0D0D0D] brutal-border p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-black text-white font-mono uppercase">
                  // Direct Channels
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  Reach out via email, phone, or connect on LinkedIn and GitHub.
                </p>
              </div>

              <div className="space-y-3">
                
                {/* Email Item */}
                <div className="p-3.5 bg-[#121212] border border-[#282828] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black text-[#CCFF00] border border-[#333]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">Email Address</div>
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs sm:text-sm font-bold text-white hover:text-[#CCFF00] transition-colors font-mono">
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 text-zinc-400 hover:text-white bg-black border border-[#333] transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-[#CCFF00]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-3.5 bg-[#121212] border border-[#282828] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black text-[#CCFF00] border border-[#333]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">Phone & WhatsApp</div>
                      <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs sm:text-sm font-bold text-white hover:text-[#CCFF00] transition-colors font-mono">
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 text-zinc-400 hover:text-white bg-black border border-[#333] transition-colors cursor-pointer"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-[#CCFF00]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="p-3.5 bg-[#121212] border border-[#282828] flex items-center gap-3">
                  <div className="p-2 bg-black text-[#CCFF00] border border-[#333]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">Location</div>
                    <div className="text-xs sm:text-sm font-bold text-white font-mono">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>

              </div>

              {/* Social Profiles */}
              <div className="pt-2 border-t border-[#282828] space-y-2.5">
                <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">// PLATFORMS:</div>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#141414] hover:bg-white hover:text-black text-zinc-200 font-mono text-xs font-bold uppercase border border-[#333] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#141414] hover:bg-[#CCFF00] hover:text-black text-zinc-200 font-mono text-xs font-bold uppercase border border-[#333] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Direct Message Draft Form */}
          <div className="lg:col-span-7 bg-[#0D0D0D] brutal-border p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-black text-white font-mono uppercase flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#CCFF00]" />
                <span>Send a Direct Message</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                Draft a message to immediately open your configured email client or forward an invitation.
              </p>
            </div>

            {sent && (
              <div className="p-4 bg-[#1a2200] border border-[#CCFF00] text-[#CCFF00] text-xs font-mono flex items-center gap-2 uppercase">
                <Check className="w-4 h-4" />
                <span>Message composer launched! Looking forward to talking with you.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-zinc-400 block mb-1.5 uppercase">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma / Alex Mercer"
                    className="w-full px-4 py-2.5 bg-[#080808] border border-[#333] text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 block mb-1.5 uppercase">
                    Your Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="e.g. recruiter@company.com"
                    className="w-full px-4 py-2.5 bg-[#080808] border border-[#333] text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-1.5 uppercase">
                  Subject / Discussion Type
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#080808] border border-[#333] text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="Software Engineer Role / Interview">Software Engineer Role / Interview</option>
                  <option value="MCA Internship Opportunity">MCA Internship Opportunity</option>
                  <option value="Computer Vision / OpenCV Project Collaboration">Computer Vision / OpenCV Project Collaboration</option>
                  <option value="General Technical Inquiry">General Technical Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-1.5 uppercase">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Sukanya, I reviewed your Helmo Vision and MedTrack projects and would love to connect regarding an opportunity..."
                  className="w-full px-4 py-3 bg-[#080808] border border-[#333] text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00] resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 neon-bg hover:brightness-110 text-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Sukanya</span>
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
