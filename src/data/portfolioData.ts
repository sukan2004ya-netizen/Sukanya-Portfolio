import { Project, SkillCategory, EducationItem, CertificationItem, VisionTestCase } from '../types';

export const PERSONAL_INFO = {
  name: 'Sukanya P',
  preferredName: 'Sukanya Shetty',
  role: 'Software Developer',
  tagline: 'Crafting robust software solutions in Java, Python, and Modern Web Systems with a Computer Vision edge.',
  location: 'Nellyadi, Karnataka, India',
  email: 'sukanyashetty1235@gmail.com',
  phone: '+91 63640 70237',
  github: 'https://github.com/sukan2004ya-netizen',
  linkedin: 'https://www.linkedin.com/in/sukanya-shetty-591270338',
  status: 'Open to Software Engineering Roles & MCA Internships',
  bio: `Software Developer with a strong academic foundation in Java, C, PHP, and web technologies (HTML, CSS, JavaScript), complemented by hands-on exposure to Python and OpenCV through real-world computer-vision engineering. Passionate about AI-assisted development tools (ChatGPT, Google Gemini, Claude) for high-speed prototyping, debugging, and robust full-stack delivery. Comfortable picking up new tech stacks rapidly and building production-grade software end-to-end.`,
  languages: [
    { name: 'Tulu', level: 'Native', proficiency: 'Mother Tongue' },
    { name: 'Kannada', level: 'Fluent', proficiency: 'Native State Language' },
    { name: 'English', level: 'Professional', proficiency: 'Working / Technical' },
    { name: 'Hindi', level: 'Intermediate', proficiency: 'Conversational' },
  ],
  hobbies: [
    { name: 'Playing Chess', desc: 'Sharpening tactical intuition, positional strategy & algorithmic patience.' },
    { name: 'Agricultural Work', desc: 'Grounded connection to soil, sustainable farming techniques & agritech potential.' },
    { name: 'Culinary Arts & Cooking', desc: 'Experimenting with regional Mangalorean and South Indian flavors.' }
  ],
  softSkills: [
    'Adaptability & Rapid Learning',
    'Cross-functional Collaboration',
    'Clear Technical Communication',
    'Analytical Problem Solving',
    'Time & Milestone Management',
    'SDLC & Quality Assurance'
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'helmo-vision',
    title: 'Helmo Vision',
    subtitle: 'Automated Motorcycle Helmet Detection & Traffic Safety System',
    category: 'Computer Vision',
    description: 'Built a real-time computer-vision system to automatically detect motorcyclists riding without helmets, aimed at supporting road safety enforcement and automated municipal traffic monitoring.',
    tags: ['Python', 'OpenCV', 'Computer Vision', 'Image Processing', 'Feature Extraction', 'NumPy'],
    featured: true,
    liveDemoAvailable: true,
    highlights: [
      'Engineered video/image ingestion pipeline processing multi-rider traffic feeds.',
      'Extracted region-of-interest (ROI) for rider head contours using color thresholding and Haar-cascade feature localization.',
      'Designed a confidence scoring engine to differentiate helmets, caps, hair, and bare heads.',
      'Created automated violation logger ready for smart-city surveillance integration.'
    ],
    metrics: [
      { label: 'Detection Speed', value: '< 45ms / frame' },
      { label: 'Safety Coverage', value: 'Two-Wheeler Traffic' },
      { label: 'Core Stack', value: 'Python + OpenCV' }
    ],
    codeSnippet: {
      language: 'python',
      filename: 'helmet_detector.py',
      code: `import cv2
import numpy as np

def detect_helmet_violation(frame, rider_roi):
    """
    Analyzes rider head region to detect presence of safety helmet.
    Processes contours, circularity metrics, and color variance.
    """
    gray = cv2.cvtColor(rider_roi, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blurred, 50, 150)
    
    contours, _ = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    
    helmet_detected = False
    confidence_score = 0.0
    
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area > 450:
            perimeter = cv2.arcLength(cnt, True)
            circularity = 4 * np.pi * (area / (perimeter * perimeter + 1e-5))
            if 0.65 < circularity < 1.2:
                helmet_detected = True
                confidence_score = min(0.96, circularity * 0.88)
                break
                
    return {
        "helmet_detected": helmet_detected,
        "confidence": confidence_score,
        "status": "COMPLIANT" if helmet_detected else "NO_HELMET_VIOLATION"
    }`
    }
  },
  {
    id: 'medtrack',
    title: 'MedTrack',
    subtitle: 'Smart Medicine Reminder & Adherence Web Application',
    category: 'Web App',
    description: 'Built a responsive medicine reminder web application to help patients, seniors, and caregivers track complex dosage regimens, stay on schedule, and maintain consistent health adherence.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Web APIs', 'Local Storage', 'Responsive UI'],
    githubUrl: 'https://github.com/sukan2004ya-netizen/MedTrack',
    featured: true,
    liveDemoAvailable: true,
    highlights: [
      'Architected intuitive scheduling engine supporting daily, interval-based, and as-needed dosage frequencies.',
      'Implemented in-browser audio alarms and browser notification triggers with snooze capabilities.',
      'Designed responsive UI optimized for senior accessibility with high contrast and readable cards.',
      'Maintained persistent patient logs with adherence streak tracker.'
    ],
    metrics: [
      { label: 'Adherence Tracking', value: '100% Client-Side' },
      { label: 'Notification Latency', value: 'Instant Alarm' },
      { label: 'Open Source', value: 'GitHub Public' }
    ],
    codeSnippet: {
      language: 'javascript',
      filename: 'reminderEngine.js',
      code: `// MedTrack Scheduler Core Engine
class MedicationTracker {
  constructor() {
    this.schedules = JSON.parse(localStorage.getItem('med_schedules')) || [];
  }

  addPrescription(name, dosage, time, days = ['All']) {
    const item = {
      id: Date.now().toString(),
      name,
      dosage,
      time,
      days,
      takenToday: false,
      streak: 0
    };
    this.schedules.push(item);
    this.save();
    this.scheduleAlert(item);
  }

  markAsTaken(id) {
    const med = this.schedules.find(m => m.id === id);
    if (med && !med.takenToday) {
      med.takenToday = true;
      med.streak += 1;
      this.save();
      this.playChime();
    }
  }
}`
    }
  },
  {
    id: 'ai-dev-orchestration',
    title: 'AI-Assisted Workflow Lab',
    subtitle: 'Agentic Research, Prompt Synthesis & Rapid Prototyping Experiments',
    category: 'AI & System',
    description: 'Exploration and systematic benchmarking of modern AI tools (Google Gemini, Claude, ChatGPT) for architectural planning, test case generation, code refactoring, and automated QA in SDLC.',
    tags: ['Gemini API', 'Prompt Engineering', 'SDLC Automation', 'QA Testing', 'Workflow Optimization'],
    featured: false,
    liveDemoAvailable: false,
    highlights: [
      'Developed structured prompt templates for generating clean unit tests and edge-case validation.',
      'Streamlined development iteration cycles with multi-turn AI code-review workflows.',
      'Explored integration of LLMs for generating automated API documentation.'
    ],
    metrics: [
      { label: 'Workflow Boost', value: '3x Faster Prototyping' },
      { label: 'Methodology', value: 'AI-First SDLC' }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    iconName: 'Code2',
    skills: [
      {
        name: 'Java',
        level: 88,
        category: 'Language',
        description: 'Object-Oriented Programming, Collections, Multithreading, Exception Handling, Clean Architecture.',
        badge: 'Infosys Certified',
        snippet: 'public class Solution { ... Java OOP & Data Structures ... }'
      },
      {
        name: 'Python',
        level: 86,
        category: 'Language',
        description: 'NumPy, OpenCV integration, Scripting, Automation, Data Structures, Image Processing.',
        badge: 'Ethnotech Grade A',
        snippet: 'def process_stream(frame): return cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)'
      },
      {
        name: 'C Programming',
        level: 80,
        category: 'Language',
        description: 'Pointers, Dynamic Memory Allocation, Core Algorithms, Low-level system concepts.',
        snippet: 'int* ptr = (int*)malloc(sizeof(int) * n);'
      },
      {
        name: 'PHP',
        level: 78,
        category: 'Language',
        description: 'Server-side scripting, Form processing, Database interaction, Web backend logic.',
        snippet: '<?php echo json_encode(["status" => "success"]); ?>'
      },
      {
        name: 'JavaScript (ES6+)',
        level: 85,
        category: 'Language',
        description: 'Modern ES6+ syntax, Promises, Async/Await, DOM manipulation, Web APIs, Event-driven architecture.',
        snippet: 'const response = await fetch("/api/data");'
      }
    ]
  },
  {
    title: 'Computer Vision & AI Tools',
    iconName: 'Cpu',
    skills: [
      {
        name: 'OpenCV',
        level: 84,
        category: 'Vision',
        description: 'Image filtering, Gaussian blur, Canny edge detection, Contour analysis, ROI extraction, Video processing.',
        badge: 'Project Tested'
      },
      {
        name: 'AI-Assisted Development',
        level: 90,
        category: 'AI Tooling',
        description: 'Google Gemini, Claude, ChatGPT for code synthesis, debugging, architectural design & unit testing.',
        badge: 'Modern Workflow'
      },
      {
        name: 'Prompt Engineering',
        level: 86,
        category: 'AI Tooling',
        description: 'Zero-shot, few-shot, system persona formulation, and structured JSON parsing prompts.'
      },
      {
        name: 'Object & Feature Detection',
        level: 80,
        category: 'Vision',
        description: 'Haar Cascade classifiers, color thresholding, bounding box coordinates, safety classification.'
      }
    ]
  },
  {
    title: 'Web Technologies & Frontend',
    iconName: 'Globe',
    skills: [
      {
        name: 'HTML5 & Semantic Markup',
        level: 92,
        category: 'Web',
        description: 'Accessible markup, semantic layout, audio/video elements, canvas integration.',
        badge: 'Ethnotech Grade A'
      },
      {
        name: 'CSS3 & Modern Styling',
        level: 88,
        category: 'Web',
        description: 'Flexbox, Grid, Animations, Responsive Media Queries, Tailwind CSS utility styling.',
        badge: 'Ethnotech Grade A'
      },
      {
        name: 'Web APIs & DOM',
        level: 84,
        category: 'Web',
        description: 'Local Storage, Web Notifications API, Canvas API, Fetch/XHR, AudioContext.'
      },
      {
        name: 'Responsive UI Design',
        level: 88,
        category: 'Web',
        description: 'Mobile-first layout precision, touch accessibility, cross-browser compatibility.'
      }
    ]
  },
  {
    title: 'Tools, IDEs & Engineering',
    iconName: 'Wrench',
    skills: [
      {
        name: 'Git & GitHub',
        level: 85,
        category: 'Tool',
        description: 'Version control, branching, pull requests, commit hygiene, repository management.'
      },
      {
        name: 'VS Code & Apache NetBeans',
        level: 90,
        category: 'IDE',
        description: 'Code debugging, extensions, Java workspace management, Python virtual environments.'
      },
      {
        name: 'SDLC & QA Fundamentals',
        level: 86,
        category: 'Process',
        description: 'Requirement analysis, structured development, modular design, manual QA and test execution.'
      },
      {
        name: 'Cloud Computing Basics',
        level: 78,
        category: 'Cloud',
        description: 'Infosys SpringBoard certified understanding of IaaS, PaaS, SaaS, and cloud architecture.'
      }
    ]
  }
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Visvesvaraya Technological University (VTU)',
    period: '2025 – 2027 (Pursuing)',
    score: 'In Progress',
    scoreLabel: 'Postgraduate Degree',
    description: 'Advanced postgraduate program focused on advanced algorithms, distributed computing, software engineering methodologies, data structures, and computer vision systems.',
    badge: 'Master’s Degree',
    highlights: [
      'Specializing in advanced software systems, computer vision, and applied algorithms.',
      'Active participant in technical research, seminars, and academic projects.',
      'Elected for online research & IPR certification (VTU Elite Gold).'
    ]
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Mangalore University',
    period: '2022 – 2025',
    score: '75.89%',
    scoreLabel: 'First Class with Distinction',
    description: 'Graduated with strong technical honors across core computer science domains including Java Programming, Data Structures, Relational Database Management, Web Development, and C.',
    badge: 'Undergraduate Degree',
    highlights: [
      'Achieved 75.89% cumulative aggregate over 3-year rigorous curriculum.',
      'Built capstone projects in JavaScript and Web Technologies (MedTrack).',
      'Completed industry-recognized certifications with Ethnotech Academy and Infosys.'
    ]
  },
  {
    degree: 'Pre-University Course (PUC / 12th Standard)',
    institution: 'Department of Pre-University Education, Karnataka',
    period: '2020 – 2022',
    score: '92.33%',
    scoreLabel: 'Distinction (92.33%)',
    description: 'Completed rigorous pre-university curriculum with exceptional academic distinction, demonstrating strong analytical, mathematical, and logical reasoning aptitude.',
    badge: 'Top Tier 92.33%',
    highlights: [
      'Scored outstanding 92.33% across all subjects.',
      'Ranked among top academic performers in the region.'
    ]
  },
  {
    degree: 'Secondary School Leaving Certificate (SSLC / 10th Standard)',
    institution: 'Karnataka Secondary Education Examination Board',
    period: '2019 – 2020',
    score: '80.00%',
    scoreLabel: 'First Class (80.00%)',
    description: 'Built a solid foundational aptitude in mathematics, physical sciences, and logical problem-solving.',
    highlights: [
      'Scored 80.00% first class academic standing.'
    ]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'Research Methodologies and IPR (3 Credits)',
    issuer: 'VTU Centre for Online Education',
    grade: 'Elite Gold',
    badgeType: 'gold',
    description: 'Rigorous 3-credit master-level certification covering structured scientific research methodologies, patent analysis, intellectual property rights, and technical paper formulation.',
    skillsAcquired: ['Research Design', 'Intellectual Property Rights', 'Patent Filing Analysis', 'Technical Documentation']
  },
  {
    title: 'Advanced Python Programming',
    issuer: 'Ethnotech Academy (Skill India / NSDC)',
    grade: 'Grade A',
    badgeType: 'emerald',
    description: 'Government-aligned national skill certification covering advanced Python programming, object-oriented concepts, algorithm design, file I/O, and data processing.',
    skillsAcquired: ['Python OOP', 'Data Structures', 'Algorithmic Optimization', 'Module Design']
  },
  {
    title: 'Web Application Development (HTML, CSS, JS)',
    issuer: 'Ethnotech Academy (Skill India / NSDC)',
    grade: 'Grade A',
    badgeType: 'emerald',
    description: 'Comprehensive industry web curriculum covering modern HTML5 architecture, responsive CSS3 styling, JavaScript DOM scripting, asynchronous events, and deployment.',
    skillsAcquired: ['HTML5 Semantic Structuring', 'CSS3 Layouts', 'Vanilla JavaScript ES6', 'DOM Manipulation']
  },
  {
    title: 'Introduction to Java',
    issuer: 'Infosys SpringBoard',
    grade: 'Completed & Certified',
    badgeType: 'blue',
    description: 'Industry-standard foundational course on Java enterprise programming, OOP paradigms, JVM architecture, exception handling, and collections framework.',
    skillsAcquired: ['Java Core', 'OOP Principles', 'Collections Framework', 'Exception Handling']
  },
  {
    title: 'Introduction to Cloud Computing',
    issuer: 'Infosys SpringBoard',
    grade: 'Completed & Certified',
    badgeType: 'purple',
    description: 'Foundational certification exploring cloud infrastructure (IaaS, PaaS, SaaS), cloud deployment models, security best practices, and distributed systems.',
    skillsAcquired: ['Cloud Architectures', 'Virtualization Concepts', 'Cloud Security Principles', 'Service Models']
  }
];

export const HELMO_VISION_TEST_CASES: VisionTestCase[] = [
  {
    id: 'case-1',
    title: 'Highway Rider — Certified Helmet On',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
    helmetDetected: true,
    confidence: 0.96,
    riderCount: 1,
    violationType: 'NONE (Compliant)',
    bbox: { x: 38, y: 15, width: 28, height: 35 },
    explanation: 'Detected curved closed contour on head region. High convex hull circularity (0.89) matching helmet safety profile.'
  },
  {
    id: 'case-2',
    title: 'Urban Commute — Bare Head Detected',
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80',
    helmetDetected: false,
    confidence: 0.94,
    riderCount: 1,
    violationType: 'NO_HELMET_VIOLATION',
    bbox: { x: 36, y: 18, width: 26, height: 32 },
    explanation: 'Head ROI analysis shows skin tone frequency and irregular hair edge gradient without smooth rigid outer shell contour.'
  },
  {
    id: 'case-3',
    title: 'Dual Riders — Front Compliant / Pillion Violation',
    imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80',
    helmetDetected: false,
    confidence: 0.91,
    riderCount: 2,
    violationType: 'PARTIAL_GEAR',
    bbox: { x: 45, y: 20, width: 35, height: 40 },
    explanation: 'Multi-rider ROI parsing detected helmet on driver, but secondary passenger head ROI lacks safety helmet contour.'
  }
];
