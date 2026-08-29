import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Loader2
} from 'lucide-react';
import { ChatMessage } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AiRecruiterChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: `Hello! I'm Sukanya's AI Portfolio & Recruiter Assistant. I can answer questions about her software engineering skills (Java, Python, OpenCV, JavaScript, C, PHP), academic distinctions (92.33% PUC, MCA at VTU), project architectures, or help you get in touch for interviews!`,
    timestamp: 'Just now',
    source: 'gemini-api'
  }
];

const SUGGESTED_QUESTIONS = [
  'Why hire Sukanya for our engineering team?',
  'Explain Helmo Vision (Helmet Detection System)',
  'What is her educational background & score?',
  'What are her top Java & Python strengths?',
  'How do I schedule an interview with Sukanya?'
];

export const AiRecruiterChat: React.FC<AiRecruiterChatProps> = ({
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputVal('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-4)
        })
      });

      if (!response.ok) throw new Error('API response failed');

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'Sukanya is a dedicated software developer specializing in Java, Python, and Web Technologies. Feel free to contact her at sukanyashetty1235@gmail.com!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback message
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sukanya P (Sukanya Shetty) is a Software Developer based in Nellyadi, Karnataka. She is pursuing her MCA at VTU, holds a 75.89% BCA from Mangalore University, and scored 92.33% in PUC. Her featured projects are Helmo Vision (Python/OpenCV) and MedTrack (JS). You can contact her at ${PERSONAL_INFO.email} or ${PERSONAL_INFO.phone}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'local-knowledge-base'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0D0D0D] brutal-border w-full max-w-2xl h-[600px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-5 py-4 bg-[#121212] border-b border-[#282828] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black text-[#CCFF00] border border-[#333]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-white text-base font-mono uppercase">Ask Sukanya AI</h3>
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-[#1a2200] text-[#CCFF00] border border-[#668800]">
                  RECRUITER AGENT
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">Ask about skills, projects, background or availability.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white bg-black border border-[#333] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#080808]">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 bg-black border border-[#333] flex items-center justify-center text-[#CCFF00] shrink-0 mt-0.5 font-mono">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-4 text-xs sm:text-sm leading-relaxed font-mono ${
                    isUser
                      ? 'neon-bg text-black font-bold'
                      : 'bg-[#121212] border border-[#282828] text-zinc-200 space-y-2'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <div className="flex items-center justify-between text-[9px] opacity-70 pt-1">
                    <span>{msg.timestamp}</span>
                    {msg.source && <span>// {msg.source}</span>}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 bg-black border border-[#CCFF00] flex items-center justify-center text-[#CCFF00] shrink-0 font-bold text-xs mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-[#CCFF00] text-xs font-mono">
              <div className="w-8 h-8 bg-black border border-[#333] flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-[#CCFF00]" />
              </div>
              <span>SUKANYA AI IS PROCESSING...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2.5 bg-[#121212] border-t border-[#282828] flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-mono text-zinc-500 uppercase shrink-0">Prompts:</span>
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-[10px] font-mono font-bold px-2.5 py-1 bg-[#1a1a1a] hover:bg-[#CCFF00] hover:text-black text-zinc-300 border border-[#333] shrink-0 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#121212] border-t border-[#282828] flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question for Sukanya's AI..."
            className="flex-1 px-4 py-2.5 bg-[#080808] border border-[#333] font-mono text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#CCFF00]"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputVal.trim() || isLoading}
            className="p-2.5 neon-bg hover:brightness-110 text-black font-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
