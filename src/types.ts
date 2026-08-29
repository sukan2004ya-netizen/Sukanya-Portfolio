export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Computer Vision' | 'Web App' | 'AI & System';
  description: string;
  tags: string[];
  githubUrl?: string;
  liveDemoAvailable: boolean;
  featured: boolean;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  codeSnippet?: {
    language: string;
    code: string;
    filename: string;
  };
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    category: string;
    description: string;
    badge?: string;
    snippet?: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score?: string;
  scoreLabel?: string;
  description: string;
  badge?: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  grade?: string;
  badgeType: 'gold' | 'emerald' | 'blue' | 'purple';
  description: string;
  skillsAcquired: string[];
  credentialUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: 'gemini-api' | 'local-knowledge-base' | 'fallback';
}

export interface TerminalCommandOutput {
  command: string;
  output: string | string[];
  isError?: boolean;
  isCustomComponent?: 'helmo' | 'medtrack' | 'chess' | 'contact' | 'skills';
}

export interface VisionTestCase {
  id: string;
  title: string;
  imageUrl: string;
  helmetDetected: boolean;
  confidence: number;
  riderCount: number;
  violationType: 'NONE (Compliant)' | 'NO_HELMET_VIOLATION' | 'PARTIAL_GEAR';
  bbox: { x: number; y: number; width: number; height: number };
  explanation: string;
}
