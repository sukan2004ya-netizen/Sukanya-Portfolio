import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

// Sukanya P Knowledge Base prompt for the AI assistant
const SUKANYA_SYSTEM_PROMPT = `
You are the AI Recruiter & Portfolio Assistant for Sukanya P (also known as Sukanya Shetty), a Software Developer based in Nellyadi, Karnataka, India.
Your mission is to represent Sukanya professionally, accurately, and enthusiastically to tech recruiters, hiring managers, engineering leaders, and fellow developers.

Here is the ground truth about Sukanya P:
- Full Name: Sukanya P (Sukanya Shetty)
- Role: Software Developer / Computer Vision & Web Technologies Specialist
- Location: Nellyadi, Dakshina Kannada, Karnataka, India
- Phone: +91 63640 70237
- Email: sukanyashetty1235@gmail.com
- GitHub: https://github.com/sukan2004ya-netizen
- LinkedIn: https://www.linkedin.com/in/sukanya-shetty-591270338

Summary & Career Objective:
Software Developer with a strong foundation in Java, C, PHP, and web technologies (HTML, CSS, JavaScript), plus hands-on expertise in Python and OpenCV through a real-world computer-vision project ("Helmo Vision"). Comfortable learning new stacks quickly, working with modern AI-assisted engineering tools (Gemini, ChatGPT, Claude) for research, debugging, and agentic workflows, and building working applications end-to-end. Excited to contribute to an AI-first engineering environment where automation, quality, and speed drive product delivery.

Technical Skills:
- Programming Languages: Java (OOP, collections, backend logic), Python (Data processing, OpenCV, scripts), C (Memory management, algorithms), PHP (Server-side web scripting, form handling), JavaScript (ES6+, DOM, asynchronous APIs), HTML5 & CSS3.
- Computer Vision & AI: OpenCV (Object & feature detection, video frame processing, contour analysis), AI-assisted development (Google Gemini, ChatGPT, Claude for research, rapid prototyping, and automated testing).
- Tools & Environments: VS Code, Apache NetBeans, Git, GitHub, Linux/Terminal environments.
- Methodologies: SDLC (Software Development Life Cycle), Requirement Analysis, QA & unit testing fundamentals.

Featured Projects:
1. Helmo Vision — Helmet Detection System (Python, OpenCV)
   - Built an automated computer-vision system to detect motorcyclists riding without helmets to support road safety enforcement.
   - Processes video/image frames in real-time, extracts head regions, and evaluates safety gear contours.
   - Addresses real-world traffic monitoring challenges with fast automated violation alerts.
2. MedTrack — Medicine Reminder Web App (JavaScript, HTML, CSS, Web APIs)
   - Built a medicine reminder website to help patients and families track and stay on schedule with complex medication timings.
   - Implemented intuitive reminder scheduling, dosage tracking, notifications, and adherence analytics.
   - GitHub Repo: https://github.com/sukan2004ya-netizen/MedTrack

Education:
- Master of Computer Applications (MCA) — Visvesvaraya Technological University (VTU) (2025–2027)
- Bachelor of Computer Applications (BCA) — Mangalore University (2022–2025), scored 75.89%
- PUC (12th Grade) — Department of Pre-University Education, Karnataka (2020–2022), scored 92.33% (Distinction)
- SSLC (10th Grade) — Karnataka Secondary Education Board (2019–2020), scored 80.00%

Certifications:
- Introduction to Cloud Computing — Infosys SpringBoard
- Introduction to Java — Infosys SpringBoard
- Advanced Python Programming (Grade A) — Ethnotech Academy (Skill India / NSDC)
- Web Application Development – HTML, CSS, JS (Grade A) — Ethnotech Academy (Skill India / NSDC)
- Research Methodologies and IPR (3 Credits, Elite Gold) — VTU Centre for Online Education

Languages & Personal Interests:
- Languages: Tulu (Native), Kannada (Fluent), English (Professional Working), Hindi (Intermediate).
- Hobbies: Playing Chess (strategic thinking), Agricultural Work & Farming (passion for sustainable agritech), Cooking.
- Soft Skills: Adaptability, Cross-functional Collaboration, Clear Communication, Problem Solving, Diligent Time Management.

Guidelines for your responses:
- Keep answers concise, polished, well-formatted, and encouraging.
- Highlight her strong academic track record (92.33% PUC, 75.89% BCA, current MCA at VTU) and hands-on coding ability in Java, Python, and Web development.
- When asked how to hire or interview her, provide her email (sukanyashetty1235@gmail.com) and phone (+91 63640 70237), or suggest scheduling a chat through the portfolio's contact form.
- Use markdown formatting with bullet points when listing details.
`;

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Route: AI Assistant Chat
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Intelligent fallback if API key is not configured in environment
        return res.json({
          reply: generateSmartFallbackResponse(message),
          source: "local-knowledge-base"
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const contents = [
        { role: "user", parts: [{ text: `${SUKANYA_SYSTEM_PROMPT}\n\nUser Question: ${message}` }] }
      ];

      if (Array.isArray(history) && history.length > 0) {
        // Append recent conversation context
        const formattedHistory = history.slice(-4).map(h => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }]
        }));
        contents.splice(0, 0, ...formattedHistory);
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
      });

      const reply = response.text || generateSmartFallbackResponse(message);
      return res.json({ reply, source: "gemini-api" });
    } catch (error: any) {
      console.error("AI Chat API Error:", error);
      // Seamless fallback on error
      const fallback = generateSmartFallbackResponse(req.body.message || "");
      return res.json({ reply: fallback, source: "fallback" });
    }
  });

  // API Route: Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

function generateSmartFallbackResponse(userMsg: string): string {
  const query = userMsg.toLowerCase();

  if (query.includes("why hire") || query.includes("hire") || query.includes("strengths")) {
    return `### Why Sukanya is a Great Addition to Your Team:
- **Strong Technical Foundation**: Proven proficiency in **Java, Python, C, PHP**, and modern **JavaScript**.
- **Practical Project Experience**: Developed **Helmo Vision** (OpenCV computer vision for road safety) and **MedTrack** (responsive healthcare schedule app).
- **Academic Excellence**: Consistent high performance (**92.33% in PUC**, **75.89% in BCA**, currently pursuing **MCA at VTU**).
- **Certified Competence**: Holds certifications from **Infosys SpringBoard** (Java & Cloud) and **Ethnotech Skill India** (Advanced Python & Web Dev Grade A).
- **Fast Learner & AI-Ready**: Adept at using AI tools (Gemini, Claude, ChatGPT) to boost productivity, QA, and rapid prototyping.
- **Location & Flexibility**: Based in Nellyadi, Karnataka; ready for onsite, hybrid, or remote developer roles!`;
  }

  if (query.includes("helmo") || query.includes("vision") || query.includes("helmet") || query.includes("opencv")) {
    return `### Helmo Vision — Helmet Detection System
- **Technologies**: Python, OpenCV, Computer Vision
- **Objective**: Automating real-time detection of motorcyclists riding without helmets to enhance traffic safety and municipal enforcement.
- **Key Capabilities**: Video stream ingestion, frame extraction, head region localization, and contour-based safety gear classification.
- **Try it**: You can test the interactive **Helmo Vision Lab** directly on this portfolio page!`;
  }

  if (query.includes("medtrack") || query.includes("medicine") || query.includes("health")) {
    return `### MedTrack — Medicine Reminder Web App
- **Technologies**: JavaScript, HTML5, CSS3, Web Notification APIs
- **Purpose**: Helps users manage medication schedules, set custom reminder intervals, track daily intake adherence, and avoid missed dosages.
- **GitHub Repository**: [github.com/sukan2004ya-netizen/MedTrack](https://github.com/sukan2004ya-netizen/MedTrack)`;
  }

  if (query.includes("education") || query.includes("college") || query.includes("degree") || query.includes("mca") || query.includes("bca")) {
    return `### Sukanya's Educational Background:
1. **Master of Computer Applications (MCA)** (2025–2027) — Visvesvaraya Technological University (VTU)
2. **Bachelor of Computer Applications (BCA)** (2022–2025) — Mangalore University | **75.89%**
3. **PUC (Pre-University Course)** (2020–2022) — Karnataka PU Board | **92.33% (Distinction)**
4. **SSLC (10th Standard)** (2019–2020) — Karnataka Secondary Board | **80.00%**`;
  }

  if (query.includes("certification") || query.includes("certificate") || query.includes("course")) {
    return `### Verified Certifications:
- **Introduction to Cloud Computing** — Infosys SpringBoard
- **Introduction to Java** — Infosys SpringBoard
- **Advanced Python Programming (Grade A)** — Ethnotech Academy (Skill India / NSDC)
- **Web Application Development (Grade A)** — Ethnotech Academy (Skill India / NSDC)
- **Research Methodologies & IPR (Elite Gold)** — VTU Centre for Online Education`;
  }

  if (query.includes("contact") || query.includes("email") || query.includes("phone") || query.includes("linkedin") || query.includes("reach")) {
    return `### Get in Touch with Sukanya:
- 📧 **Email**: [sukanyashetty1235@gmail.com](mailto:sukanyashetty1235@gmail.com)
- 📱 **Phone**: [+91 63640 70237](tel:+916364070237)
- 💼 **LinkedIn**: [linkedin.com/in/sukanya-shetty-591270338](https://www.linkedin.com/in/sukanya-shetty-591270338)
- 🐙 **GitHub**: [github.com/sukan2004ya-netizen](https://github.com/sukan2004ya-netizen)
- 📍 **Location**: Nellyadi, Karnataka, India`;
  }

  if (query.includes("skills") || query.includes("stack") || query.includes("languages") || query.includes("java") || query.includes("python")) {
    return `### Technical Skill Set:
- **Languages**: Java, Python, C, PHP, JavaScript, HTML5/CSS3
- **Specializations**: Computer Vision (OpenCV), Full-Stack Web Development, AI-Assisted Engineering
- **Developer Tools**: VS Code, Apache NetBeans, Git, GitHub, Linux CLI
- **Spoken Languages**: Tulu (Native), Kannada, English, Hindi`;
  }

  return `Sukanya P is a Software Developer specializing in Java, Python, Web Development, and Computer Vision (OpenCV). She is currently pursuing her MCA at VTU with an outstanding academic record (92.33% in PUC, 75.89% in BCA).

You can ask me about:
- **Projects** (Helmo Vision, MedTrack)
- **Technical Skills & Code Stacks** (Java, Python, OpenCV, PHP, JS)
- **Education & Certifications** (VTU MCA, BCA, Infosys, NSDC)
- **Contact & Availability for Roles/Internships**`;
}

startServer();
