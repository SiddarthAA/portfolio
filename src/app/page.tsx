"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import FlickeringGrid from "@/components/ui/flickering-grid";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const BACKERS = [
  "IISc Bangalore", "PESU Research Foundation", "NetAnalytiks", "Cyient", "The College App",
];

const EXPERIENCE = [
  {
    from: "MAR 2026",
    to: "PRESENT",
    company: "The College App",
    role: "Founding Engineer",
    description: "Designed a production-grade __agentic inference__ and __memory system__ for a US EdTech startup, integrating __schema-constrained 2-pass LLM__ orchestration, __O(1) Redis I/O__, __async cache hydration__, and __token-efficient session compression__.",
    detail: [
      "Architected a production-grade agentic AI backend with a __2-pass schema-constrained LLM loop__, separating tool routing from final synthesis for deterministic, context-isolated inference.",
      "Engineered a __constant-round-trip Redis memory layer__ with pipelined I/O, sliding-window truncation, TTL lifecycle control, and token-compressed session state for low-latency multi-turn workflows.",
      "Built __async retrieval + orchestration pipelines__ using parallel cache hydration, CrewAI agents, and vector-indexed semantic search for scalable, low-latency conversational systems.",
    ],
    tags: ["AGENTIC AI", "CREWAI", "TWO-PASS LLM", "REDIS PIPELINE", "FASTAPI", "ASYNC PYTHON", "SYSTEM DESIGN"],
  },
  {
    from: "FEB 2026",
    to: "APR 2026",
    company: "Cyient",
    role: "AI Systems Engineer",
    description: "Sole AI engineer for a __DO-178C/ARP4754A__-aligned aerospace traceability engine, architecting a multi-stage __lexical+dense retrieval__, __cross-encoder reranking__, and __LLM obligation-decomposition__ pipeline over __hierarchical requirement graphs__ for certification-grade verification.",
    detail: [
      "Sole AI engineer on a safety-critical requirements traceability system built and validated against __Airbus__ and __Boeing__ certification workflows (__DO-178C/ARP4754A__) over large-scale requirement graphs.",
      "Architected a __3-stage hybrid retrieval + reasoning pipeline__ \u2014 BM25 lexical search, dense semantic retrieval (all-MiniLM-L6-v2) with RRF, cross-encoder reranking, and an LLM obligation-decomposition agent emitting structured trace verdicts with gap localization.",
      "Engineered automated __orphan-node__ and __broken-edge detection__ across requirement hierarchies, compressing multi-week compliance audits into seconds.",
    ],
    tags: ["DO-178C", "ARP4754A", "HYBRID RETRIEVAL", "BM25 + DENSE", "RRF", "LLM RERANKING", "CROSS-ENCODER", "AEROSPACE AI"],
  },
  {
    from: "JUN 2025",
    to: "AUG 2025",
    company: "IISc \u2014 CiSTUP",
    role: "ML Research Intern",
    description: "Contributed to __UVH-26__, India's first large-scale open-source urban traffic dataset \u2014 fine-tuned __six SOTA detection models__ and achieved up to __31.5% mAP improvement__ over COCO baselines.",
    detail: [
      "Built __multi-camera vehicle tracking pipelines__ for dense urban intersections, owning annotation workflows, preprocessing, and large-scale quality validation across the UVH-26 dataset.",
      "Developed __Vehicle Re-ID models__ for cross-camera identity consistency and spatio-temporal association in occlusion-heavy Indian traffic scenes.",
      "Fine-tuned __YOLOv11__, __DAMO-YOLO__, __RT-DETRv2__, and 3 additional detectors on UVH-26, achieving __31.5% mAP@50:95__ improvement over COCO-pretrained baselines.",
      "Conducted applied ML research at the Centre for infrastructure, Sustainable Transportation & Urban Planning (__CiSTUP__), IISc Bangalore.",
    ],
    tags: ["COMPUTER VISION", "VEHICLE RE-ID", "YOLOV11", "RT-DETRV2", "OBJECT DETECTION", "DEEP LEARNING"],
  },
  {
    from: "JUN 2025",
    to: "SEP 2025",
    company: "PESU Research Foundation",
    role: "Research Engineer",
    description: "Designed and implemented __RACD__ \u2014 a Retrieval-Augmented Change Detection architecture that __outperforms pixel-differencing baselines__ with queryable __external exemplar memory__ at inference time.",
    detail: [
      "Identified the __memoryless limitation__ in existing change detection models, which compare only paired images and often miss subtle temporal changes.",
      "Designed __RACD__, a retrieval-augmented change detection framework with a persistent exemplar memory bank, semantic retrieval, and soft-prior conditioning over similar historical events.",
      "Implemented the full __PyTorch architecture__ including memory bank construction, retrieval, and attention-based fusion, achieving improved __F1 and IoU__ over strong baselines on benchmark remote sensing datasets.",
      "Manuscript currently in preparation for __ISPRS__ and __IGARSS__.",
    ],
    tags: ["CHANGE DETECTION", "RETRIEVAL-AUGMENTED", "PYTORCH", "ATTENTION FUSION", "REMOTE SENSING", "RESEARCH"],
  },
  {
    from: "JUN 2024",
    to: "JUL 2024",
    company: "Netanalytiks",
    role: "GenAI Intern",
    description: "Designed and deployed a __production RAG pipeline__ on __AWS__ powering an LLM recruitment engine \u2014 end-to-end: model training \u2192 containerised microservices \u2192 cloud infra, cutting screening overhead by __~30%__.",
    detail: [
      "__Semantic alignment engine__: Sentence-Transformer embeddings fine-tuned on HR corpora, cosine similarity over FAISS indices partitioned by job category \u2014 sub-100ms retrieval at scale.",
      "__RAG pipeline__: LangChain + FAISS + Meta LLaMA 3 on AWS EC2; fronted by API Gateway + Lambda, auto-scaling groups, CloudWatch alerting.",
      "Fine-tuned __OpenAI Whisper-medium__ for multilingual ASR across Hindi, Kannada, Tamil, Telugu, English \u2014 voice-to-text ingestion via FastAPI microservice into ATS pipeline.",
      "Full containerisation with __Docker__; infrastructure managed via shell + AWS CLI. __~30% reduction__ in manual screening within first production month.",
    ],
    tags: ["RAG", "FAISS", "LLAMA 3", "WHISPER ASR", "FASTAPI", "DOCKER", "AWS", "SENTENCE-TRANSFORMERS"],
  },
];

const ACHIEVEMENTS_LEADERSHIP = [
  {
    org: "IEEE COMPUTER SOCIETY \u2014 PES UNIVERSITY",
    role: "Chairman",
    period: "NOV 2025 \u2013 PRESENT",
    brief: "Chairman of IEEE CS PES University chapter \u2014 directing technical strategy across CV, GenAI, and Deep Learning verticals for one of PES University's largest technical bodies.",
    bullets: [
      "Directed technical strategy across __Computer Vision__, __GenAI__, and __Deep Learning__ verticals for one of PES University's largest student technical bodies.",
      "Led the __Open Source Program Initiative (OSPI)__; drove active contributions to public repositories under the IEEE CS banner.",
      "Mentored competing teams at __Confluence'25__ and __Silicon Rush 3.0__ (national-level IEEE events); advised pipeline architecture and judging criteria.",
      "Conducted a hands-on __containers & DevOps__ workshop at GEEKS'25.",
    ],
  },
  {
    org: "NEURALHIVE \u2014 OFFICIAL AI/ML CLUB, PES UNIVERSITY",
    role: "Tech Lead",
    period: "AUG 2025 \u2013 PRESENT",
    brief: "Tech Lead of NeuralHive, the official AI/ML club at PES University \u2014 running workshops, hackathons, and applied ML initiatives.",
    bullets: [
      "Organised __Gradient Ascent__ \u2014 an internal AI/ML hackathon with __250+ participants__ and __50+ competing teams__.",
      "Delivered __\"Pixels to Patterns\"__ \u2014 a sold-out workshop on Convolutional Neural Networks and feature extraction fundamentals (__50+ attendees__).",
    ],
  },
  {
    org: "GOOGLE AGENTIC AI DAY 2025",
    role: "Best Breakthrough Idea Award",
    period: "JUL 2025",
    brief: "Awarded Best Breakthrough Idea at Google Agentic AI Day 2025 \u2014 selected from 1,000+ competing teams across India.",
    bullets: [],
  },
  {
    org: "ZENITH \u2014 POINTBLANK & FINALROUNDAI",
    role: "Top 8 Finalist",
    period: "JAN 2026",
    brief: "Top 8 finalist out of 1,000+ teams in a national-level product and engineering challenge.",
    bullets: [],
  },
  {
    org: "CODE OF HONOUR \u2014 PES UNIVERSITY",
    role: "First Runners-Up",
    period: "2024",
    brief: "First Runners-Up at a national-level hackathon.",
    bullets: [],
  },
];

const SKILL_GROUPS = [
  {
    category: "LANGUAGES",
    tags: ["Python", "Go", "SQL", "Bash", "JavaScript"],
  },
  {
    category: "ML / DL & FRAMEWORKS",
    tags: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Hugging Face", "PEFT", "BitsAndBytes", "CNNs", "RNNs", "Transformers", "Transfer Learning", "Model Quantization", "Edge Inference"],
  },
  {
    category: "COMPUTER VISION",
    tags: ["YOLOv8", "YOLOv11", "RT-DETRv2", "DAMO-YOLO", "OpenCV", "Dlib", "MediaPipe", "EasyOCR", "scikit-image"],
  },
  {
    category: "GENAI / LLMs",
    tags: ["LangChain", "CrewAI", "FAISS", "ChromaDB", "Ollama", "Whisper", "Sentence-Transformers", "RAG Pipelines", "NLTK"],
  },
  {
    category: "BACKEND & WEB",
    tags: ["FastAPI", "Flask", "Django", "React", "Next.js", "Node.js", "BeautifulSoup", "Selenium", "Pandas"],
  },
  {
    category: "INFRASTRUCTURE & DATA",
    tags: ["Docker", "Kubernetes", "AWS", "AWS SageMaker", "AWS Aurora", "GCP", "PostgreSQL", "MongoDB", "Redis", "MySQL", "SQLite", "Firebase", "Supabase", "CI/CD", "Git"],
  },
];

const PROJECTS = [
  {
    title: "BangaloreNow",
    description: "Real-time city intelligence platform \u2014 automated __GCP-native__ ingestion pipeline aggregating civic events, urban alerts, and open data into a single live dashboard.",
    tags: ["GCP", "PIPELINE", "OPEN SOURCE", "NEXT.JS"],
    url: "https://github.com/SiddarthAA/BangaloreNow",
  },
  {
    title: "TrafficTwin",
    description: "Predictive commute platform \u2014 __graph-based digital twin__ of Bangalore's Silk Board corridor with __461 nodes__, __920 road links__, and __60-min__ forward simulation.",
    tags: ["DIGITAL TWIN", "GRAPH SIMULATION", "PREDICTIVE AI", "GCP"],
    url: "https://github.com/SiddarthAA/traffic-proj",
  },
  {
    title: "RoadGuard",
    description: "Multi-modal road safety system \u2014 real-time __drowsiness detection__ (CNN + Dlib), __crash detection__ via IoT/GPS fusion, __pothole identification__ with OpenCV, and facial-auth driver verification.",
    tags: ["COMPUTER VISION", "IOT", "TENSORFLOW", "RASPBERRY PI"],
    url: "https://github.com/SiddarthAA/RoadGuard",
  },
  {
    title: "Whisper",
    description: "__RAG-powered__ media intelligence \u2014 transcribes audio/video via Whisper, embeds with All-MPNet-Base-V2, __FAISS__ indexing, interactive QA and __quiz generation__ over any media.",
    tags: ["RAG", "WHISPER", "FAISS", "LLAMA 3"],
    url: "https://github.com/SiddarthAA/WhisperX",
  },
  {
    title: "Smart Park",
    description: "CV parking management system with real-time __number plate recognition__ (OpenCV + EasyOCR), live __slot availability__ queries, and a server-synced vehicle database.",
    tags: ["OPENCV", "OCR", "SQLITE", "COMPUTER VISION"],
    url: "https://github.com/SiddarthAA/Override23-SmartParkX",
  },
  {
    title: "More on GitHub \u2192",
    description: "Browse the full project archive \u2014 research code, experiments, open-source tooling, and work in progress.",
    tags: ["GITHUB"],
    url: "https://github.com/SiddarthAA",
  },
];

const EDUCATION = [
  {
    institution: "PES University",
    degree: "B.Tech \u2014 Computer Science (AI & Machine Learning)",
    from: "AUG 2023",
    to: "MAY 2027",
    description: "B.Tech in __Computer Science__ and Engineering with a specialization in __Artificial Intelligence & Machine Learning__, with active research involvement at PES University.",
    tags: ["DATA STRUCTURES & ALGORITHMS", "OPERATING SYSTEMS", "COMPUTER NETWORKS", "MACHINE LEARNING", "DEEP LEARNING", "COMPILER DESIGN", "CLOUD COMPUTING"],
  },
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconEmail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}
function IconGithub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
function IconLinkedin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconDownload() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v13M8 12l4 4 4-4" />
      <path d="M4 20h16" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ─── Highlight renderer ───────────────────────────────────────────────────────

function HL({ text }: { text: string }) {
  return (
    <>
      {text.split(/(__[^_]+__)/).map((part, i) => {
        if (part.startsWith("__") && part.endsWith("__")) {
          return (
            <span key={i} style={{ color: "#a5b4fc", textShadow: "0 0 10px rgba(165,180,252,0.4)" }}>
              {part.slice(2, -2)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const mono: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), 'Fira Code', monospace",
};

const SOCIAL_LINKS = [
  { label: "EMAIL", href: "mailto:siddartha_ay@protonmail.com", Icon: IconEmail },
  { label: "GITHUB", href: "https://github.com/SiddarthAA", Icon: IconGithub },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/siddarthaay", Icon: IconLinkedin },
  { label: "X / TWITTER", href: "https://x.com/SiddarthAhhaaa", Icon: IconX },
  { label: "INSTAGRAM", href: "https://www.instagram.com/siddd.jpeg/", Icon: IconInstagram },
  { label: "DOWNLOAD CV", href: "https://drive.google.com/file/d/1R4p1KYJGhsoYTvOrI9_dbcZJXUkhYPrm/view?usp=drive_link", Icon: IconDownload },
];

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const marqueeItems = [...BACKERS, ...BACKERS];

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* ── Flickering grid background ─────────────────────── */}
      <FlickeringGrid
        squareSize={3}
        gridGap={7}
        flickerChance={0.25}
        color="165,180,252"
        maxOpacity={0.09}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "56px 28px 96px", position: "relative", zIndex: 1 }}>

        {/* ── Name heading ──────────────────────────────────── */}
        <div style={{ marginBottom: "36px" }}>
          <h1
            style={{
              fontFamily: "var(--font-newsreader), Georgia, serif",
              fontSize: "clamp(52px, 10vw, 78px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "var(--fg)",
              marginBottom: "16px",
            }}
          >
            Siddartha A Y
          </h1>
          <button
            onClick={toggleTheme}
            style={{
              ...mono,
              background: "none", border: "none", cursor: "pointer",
              fontSize: "11px", fontWeight: 500, letterSpacing: "0.07em",
              color: "var(--muted)", padding: 0,
              display: "flex", alignItems: "center", gap: "5px",
              transition: "color 0.12s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
          >
            {theme === "dark" ? "\u2600" : "\u25d7"}&nbsp;{theme === "dark" ? "LIGHT" : "DARK"}
          </button>
        </div>

        {/* ── Hero tagline ────────────────────────────────────── */}
        <section style={{ marginBottom: "28px" }}>
          <p style={{ ...mono, fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", color: "var(--fg-dim)", lineHeight: 1.6, textTransform: "uppercase" }}>
            AI Systems&nbsp;&bull;&nbsp;Backend&nbsp;&bull;&nbsp;Cloud Infrastructure&nbsp;&bull;&nbsp;Applied ML / GenAI
          </p>
        </section>

        {/* ── Social text links ──────────────────────────────── */}
        <section style={{ marginBottom: "52px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0", alignItems: "center" }}>
            {SOCIAL_LINKS.map(({ label, href }, i) => (
              <span key={label} style={{ display: "flex", alignItems: "center" }}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    ...mono,
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: "var(--fg-dim)",
                    textDecoration: "none",
                    paddingBottom: "1px",
                    borderBottom: "1px solid var(--border-strong)",
                    transition: "color 0.12s, border-color 0.12s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--fg)";
                    el.style.borderBottomColor = "var(--fg)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--fg-dim)";
                    el.style.borderBottomColor = "var(--border-strong)";
                  }}
                >
                  {label}
                </a>
                {i < SOCIAL_LINKS.length - 1 && (
                  <span style={{ ...mono, fontSize: "11px", color: "var(--muted)", margin: "0 14px", opacity: 0.4 }}>&bull;</span>
                )}
              </span>
            ))}
          </div>
        </section>

        {/* ── Backed by marquee ──────────────────────────────── */}
        <section style={{ marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{
              ...mono,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "var(--fg-dim)",
              flexShrink: 0,
              textTransform: "uppercase",
            }}>
              backed by
            </span>
            <div className="marquee-wrapper" style={{ flex: 1, minWidth: 0 }}>
              <div className="marquee-track">
                {marqueeItems.map((backer, i) => (
                  <span key={i} style={{ ...mono, fontSize: "12px", fontWeight: 600, color: "var(--fg-dim)", whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
                    {backer}
                    <span style={{ margin: "0 10px", opacity: 0.35, color: "var(--muted)" }}>/</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 01 / ABOUT ─────────────────────────────────────── */}
        <section className="about-grid">
          <div
            style={{
              ...mono,
              fontSize: "10.5px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              paddingTop: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "#a5b4fc", opacity: 0.55, textShadow: "0 0 12px rgba(165,180,252,0.45), 0 0 24px rgba(165,180,252,0.18)" }}>01</span>
            <span style={{ color: "#a5b4fc", opacity: 0.35, textShadow: "0 0 12px rgba(165,180,252,0.45), 0 0 24px rgba(165,180,252,0.18)" }}>/</span>
            <span style={{ color: "#a5b4fc", textShadow: "0 0 12px rgba(165,180,252,0.45), 0 0 24px rgba(165,180,252,0.18)" }}>ABOUT</span>
          </div>
          <div>
            <h2
              style={{
                fontFamily: "var(--font-newsreader), Georgia, serif",
                fontSize: "clamp(22px, 3.2vw, 36px)",
                fontWeight: 400,
                color: "var(--fg)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: "28px",
              }}
            >
              From production AI for Airbus & Boeing to founding-engineer roles at US startups — I build high-reliability AI, backend, and distributed systems optimized for correctness, throughput, and scale.
            </h2>
            <p style={{ ...mono, fontSize: "13px", color: "var(--fg-dim)", lineHeight: 1.8, marginBottom: "18px" }}>
              Final-year CS student at PES University. I&apos;ve shipped safety-critical LLM pipelines for Airbus and Boeing, designed the entire AI services architecture for a US-based EdTech startup as a founding engineer, and helped create India&apos;s largest public urban traffic dataset at IISc Bangalore &mdash; all before graduating.
            </p>
            <p style={{ ...mono, fontSize: "13px", color: "var(--fg-dim)", lineHeight: 1.8 }}>
              I work at the intersection of AI systems, backend engineering, and cloud infrastructure, building LLM pipelines, scalable services, containerized deployments, and DevOps workflows that handle real load, fail gracefully, and remain maintainable in production.
            </p>
          </div>
        </section>

        {/* ── 02 / EXPERIENCE ────────────────────────────────── */}
        <Section num="02" label="EXPERIENCE">
          <ExperienceList />
        </Section>

        {/* ── 03 / TECHNICAL SKILLS ──────────────────────────── */}
        <Section num="03" label="TECHNICAL SKILLS">
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {SKILL_GROUPS.map((group) => (
              <div key={group.category}>
                <div style={{
                  ...mono,
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "#a5b4fc",
                  textShadow: "0 0 10px rgba(165,180,252,0.35)",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                }}>
                  {group.category}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {group.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        ...mono,
                        fontSize: "11.5px",
                        color: "#c0c0c0",
                        border: "1px solid rgba(255,255,255,0.12)",
                        padding: "6px 14px",
                        borderRadius: "4px",
                        background: "rgba(255,255,255,0.04)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 04 / PROJECTS ──────────────────────────────────── */}
        <Section num="04" label="PROJECTS">
          <div
            className="projects-grid"
            style={{
              display: "grid",
              gap: "1px",
              background: "var(--border)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            {PROJECTS.map((proj) => (
              <a
                key={proj.title}
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  background: "var(--bg)",
                  textDecoration: "none",
                  transition: "background 0.12s",
                  minHeight: "160px",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--tag-bg)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg)")}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{
                    fontFamily: "var(--font-newsreader), Georgia, serif",
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "var(--fg)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}>
                    {proj.title}
                  </span>
                  <span style={{ color: "#a5b4fc", fontSize: "14px", flexShrink: 0, marginLeft: "6px", marginTop: "1px" }}>↗</span>
                </div>
                <p style={{ ...mono, fontSize: "11.5px", color: "var(--fg-dim)", lineHeight: 1.65, flex: 1, marginBottom: "14px" }}>
                  <HL text={proj.description} />
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {proj.tags.map((tag) => (
                    <span key={tag} style={{
                      ...mono,
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: "0.09em",
                      color: "#999",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      padding: "2px 7px",
                      borderRadius: "2px",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </Section>

        {/* ── 05 / ACHIEVEMENTS & LEADERSHIP ─────────────────── */}
        <Section num="05" label="ACHIEVEMENTS & LEADERSHIP">
          <AchievementsList />
        </Section>

        {/* ── 06 / EDUCATION ─────────────────────────────────── */}
        <Section num="06" label="EDUCATION" noBottomMargin>
          {EDUCATION.map((edu, i) => (
            <div
              key={i}
              style={{
                padding: "20px 0",
                borderBottom: i < EDUCATION.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", marginBottom: "10px" }}>
                <div>
                  <div style={{ ...mono, fontSize: "14px", fontWeight: 700, color: "var(--fg)", marginBottom: "3px" }}>
                    {edu.degree}
                  </div>
                  <div style={{ ...mono, fontSize: "12px", fontWeight: 600, color: "var(--fg-dim)", marginBottom: "2px" }}>
                    {edu.institution}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ ...mono, fontSize: "11px", fontWeight: 600, color: "var(--fg)", letterSpacing: "0.06em" }}>
                    {edu.from} &mdash; {edu.to}
                  </div>
                </div>
              </div>
              <div style={{ ...mono, fontSize: "12px", color: "var(--fg-dim)", lineHeight: 1.7, marginBottom: "12px" }}>
                <HL text={edu.description} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {edu.tags.map((tag) => (
                  <span key={tag} style={{
                    ...mono,
                    fontSize: "9.5px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "#999",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    padding: "2px 8px",
                    borderRadius: "2px",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Section>

      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--border)", position: "relative", zIndex: 1 }}>
        <div style={{
          maxWidth: "720px", margin: "0 auto", padding: "20px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <a
            href="mailto:siddartha_ay@protonmail.com"
            style={{ ...mono, fontSize: "12px", color: "var(--muted)", textDecoration: "none", transition: "color 0.12s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
          >
            siddartha_ay@protonmail.com
          </a>
          <span style={{ ...mono, fontSize: "12px", color: "var(--muted)" }}>
            &copy; {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}

// ─── ExperienceList ───────────────────────────────────────────────────────────
function ExperienceList() {
  const [open, setOpen] = useState<number | null>(null);
  const m: React.CSSProperties = { fontFamily: "var(--font-geist-mono), 'Fira Code', monospace" };
  const s: React.CSSProperties = { fontFamily: "var(--font-newsreader), Georgia, serif" };

  return (
    <div>
      {EXPERIENCE.map((exp, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--border)", paddingTop: "28px", paddingBottom: "28px" }}>
            {/* Clickable entire header */}
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                cursor: "pointer",
                marginBottom: "12px",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "12px",
                background: "none",
                border: "none",
                padding: 0,
                textAlign: "left",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{
                  ...m,
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: exp.to === "PRESENT" ? "var(--fg-dim)" : "var(--muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}>
                  {exp.to === "PRESENT" && (
                    <span style={{
                      display: "inline-block",
                      width: "6px", height: "6px",
                      borderRadius: "50%",
                      background: "#4ade80",
                      boxShadow: "0 0 6px #4ade80, 0 0 12px rgba(74,222,128,0.4)",
                      flexShrink: 0,
                    }} />
                  )}
                  {exp.from} &middot; {exp.to}
                </span>
                <span style={{
                  ...s,
                  fontSize: "clamp(20px, 3.5vw, 26px)",
                  fontWeight: 400,
                  color: "var(--fg)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                }}>
                  {exp.company}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0, marginTop: "4px" }}>
                <div style={{
                  ...m,
                  fontSize: "10.5px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: exp.to === "PRESENT" ? "#4ade80" : "var(--fg-dim)",
                  border: exp.to === "PRESENT" ? "1px solid rgba(74,222,128,0.35)" : "1px solid var(--border-strong)",
                  background: exp.to === "PRESENT" ? "rgba(74,222,128,0.07)" : "transparent",
                  padding: "4px 10px",
                  borderRadius: "3px",
                  whiteSpace: "nowrap",
                }}>
                  {exp.role}
                </div>
                <span style={{
                  ...m,
                  fontSize: "18px",
                  fontWeight: 300,
                  color: "var(--muted)",
                  lineHeight: 1,
                  display: "inline-block",
                  transition: "transform 0.18s ease",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  minWidth: "24px",
                  textAlign: "center",
                }}>
                  +
                </span>
              </div>
            </button>

            {/* Always-visible brief */}
            <p style={{ ...m, fontSize: "13px", color: "var(--fg-dim)", lineHeight: 1.7 }}>
              <HL text={exp.description} />
            </p>

            {/* Dropdown */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="detail"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ paddingTop: "16px" }}>
                    {Array.isArray(exp.detail) && exp.detail.length > 0 && (
                      <ul style={{ margin: "0 0 14px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
                        {exp.detail.map((point: string, k: number) => (
                          <li key={k} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <span style={{ ...m, fontSize: "11px", color: "#a5b4fc", flexShrink: 0, marginTop: "3px", opacity: 0.7 }}>&bull;</span>
                            <span style={{ ...m, fontSize: "12.5px", color: "var(--fg-dim)", lineHeight: 1.7 }}>
                              <HL text={point} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {exp.tags.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {exp.tags.map((tag) => (
                          <span key={tag} style={{
                            ...m,
                            fontSize: "9.5px",
                            fontWeight: 600,
                            letterSpacing: "0.09em",
                            color: "#999",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            padding: "3px 8px",
                            borderRadius: "2px",
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── AchievementsList ─────────────────────────────────────────────────────────
function AchievementsList() {
  const [open, setOpen] = useState<number | null>(null);
  const m: React.CSSProperties = { fontFamily: "var(--font-geist-mono), 'Fira Code', monospace" };

  return (
    <div>
      {ACHIEVEMENTS_LEADERSHIP.map((item, i) => {
        const isOpen = open === i;
        const hasBullets = item.bullets.length > 0;
        return (
          <div key={i} style={{
            borderBottom: i < ACHIEVEMENTS_LEADERSHIP.length - 1 ? "1px solid var(--border)" : "none",
            paddingTop: "22px",
            paddingBottom: "22px",
          }}>
            <div
              onClick={() => hasBullets && setOpen(isOpen ? null : i)}
              role={hasBullets ? "button" : undefined}
              tabIndex={hasBullets ? 0 : undefined}
              onKeyDown={(e) => { if (hasBullets && (e.key === "Enter" || e.key === " ")) setOpen(isOpen ? null : i); }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "12px",
                cursor: hasBullets ? "pointer" : "default",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                userSelect: "none",
                marginBottom: "0",
              }}
              aria-expanded={hasBullets ? isOpen : undefined}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap", marginBottom: "4px" }}>
                  <span style={{
                    ...m,
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#a5b4fc",
                    textShadow: "0 0 12px rgba(165,180,252,0.5), 0 0 24px rgba(165,180,252,0.2)",
                  }}>
                    {item.org}
                  </span>
                  <span style={{
                    ...m,
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "var(--fg)",
                  }}>
                    {item.period}
                  </span>
                </div>
                <div style={{
                  ...m,
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--fg)",
                  letterSpacing: "0.03em",
                  marginBottom: "6px",
                }}>
                  {item.role}
                </div>
                <p style={{ ...m, fontSize: "12.5px", color: "var(--fg-dim)", lineHeight: 1.65, margin: 0 }}>
                  {item.brief}
                </p>
              </div>
              {hasBullets && (
                <span style={{
                  ...m,
                  fontSize: "18px",
                  fontWeight: 300,
                  color: "var(--muted)",
                  lineHeight: 1,
                  display: "inline-block",
                  transition: "transform 0.18s ease",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  flexShrink: 0,
                  marginTop: "2px",
                  minWidth: "24px",
                  textAlign: "center",
                }}>
                  +
                </span>
              )}
            </div>

            {hasBullets && (
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="bullets"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {item.bullets.map((b, j) => (
                        <li key={j} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                          <span style={{ ...m, fontSize: "11px", color: "#a5b4fc", flexShrink: 0, marginTop: "3px", opacity: 0.7 }}>&bull;</span>
                          <span style={{ ...m, fontSize: "12.5px", color: "var(--fg-dim)", lineHeight: 1.65 }}>
                            <HL text={b} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({
  num, label, children, noBottomMargin,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
  noBottomMargin?: boolean;
}) {
  const m: React.CSSProperties = { fontFamily: "var(--font-geist-mono), 'Fira Code', monospace" };
  return (
    <section style={{ marginBottom: noBottomMargin ? 0 : "64px" }}>
      <div style={{
        ...m,
        fontSize: "10.5px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        marginBottom: "20px",
        paddingBottom: "10px",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <span style={{ color: "#a5b4fc", opacity: 0.55, textShadow: "0 0 12px rgba(165,180,252,0.45), 0 0 24px rgba(165,180,252,0.18)" }}>{num}</span>
        <span style={{ color: "#a5b4fc", opacity: 0.35, textShadow: "0 0 12px rgba(165,180,252,0.45), 0 0 24px rgba(165,180,252,0.18)" }}>/</span>
        <span style={{ color: "#a5b4fc", textShadow: "0 0 12px rgba(165,180,252,0.45), 0 0 24px rgba(165,180,252,0.18)" }}>{label}</span>
      </div>
      {children}
    </section>
  );
}
