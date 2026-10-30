import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, Zap, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import ProjectVisualization from './ProjectVisualization';
import type { ProjectVisualKind } from './ProjectVisualization';

interface Project {
  title: string;
  tagline: string;
  description: string;
  achievements: string[];
  tech: string[];
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
  gradient: string;
  visualization: ProjectVisualKind;
}

const projects: Project[] = [
  {
    title: 'Robin',
    tagline: 'Local-First Personal AI Assistant',
    description: 'A Windows desktop AI assistant combining local or cloud LLMs, persistent memory, voice, and user-approved actions for email, calendar events, reminders, tasks, and local workflows.',
    achievements: [
      'Integrated Ollama and Gemini with model selection and persistent conversation history',
      'Built SQLite/Qdrant memory and Gmail, Calendar, Tasks, file, and browser integrations',
      'Implemented approval-controlled tool execution for sensitive actions',
      'Added voice, wake-word detection, and streaming; release preflight recorded 932 backend and 52 desktop tests passing',
    ],
    tech: ['Python', 'FastAPI', 'Electron', 'React', 'TypeScript', 'Google ADK', 'Ollama', 'SQLite', 'Qdrant', 'WebSockets'],
    liveUrl: 'https://robinpa.in/',
    liveLabel: 'Project Website',
    gradient: 'from-cyan-500 to-blue-500',
    visualization: 'robin',
  },
  {
    title: 'Forge',
    tagline: 'Local-First Learning & Assessment Platform',
    description: 'A placement preparation platform organizing structured lessons, Python and SQL practice, timed tests, daily study planning, interview preparation, and progress tracking.',
    achievements: [
      'Built subject-based lessons, exercises, and progress tracking; new content awaits independent review',
      'Implemented Python/SQL practice with deterministic evaluation and backend verification',
      'Added timed assessments, saved attempts, daily planning, and revision workflows',
      'Documented Phase 5 verification: 271 backend and 49 frontend tests passing',
    ],
    tech: ['Python', 'FastAPI', 'SQLite', 'React', 'TypeScript', 'Pyodide', 'PGlite', 'pytest'],
    githubUrl: 'https://github.com/NithishKumarAI/Forge',
    gradient: 'from-blue-500 to-violet-500',
    visualization: 'forge',
  },
  {
    title: 'LearnTrack',
    tagline: 'AI Learning Continuity & Memory Platform',
    description: 'Capture study notes, review AI-extracted learning information, and resume learning through evidence-linked retrieval, personalized checkpoints, and recommendations.',
    achievements: [
      'Implemented text and voice capture with editable transcripts and human-reviewed AI interpretations',
      'Built persistent learning records and retrieval with PostgreSQL, pgvector, and embeddings',
      'Added source-linked RAG answers, checkpoints, recommendations, and activity analytics',
      'Developed FastAPI services, authentication, and a Next.js interface with backend and browser verification',
    ],
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Gemini API', 'BGE Embeddings', 'Next.js', 'Docker', 'RAG'],
    githubUrl: 'https://github.com/NithishKumarAI/cognitive-memory-engine',
    gradient: 'from-cyan-500 to-blue-500',
    visualization: 'learntrack',
  },
  {
    title: 'Food Delivery ETA Prediction',
    tagline: 'End-to-End Machine Learning Pipeline',
    description: 'Predicts food delivery time from order information, weather, traffic, and delivery features. Compares regression models and serves predictions through a cloud-deployed Streamlit interface.',
    achievements: [
      'Cleaned, engineered features, and preprocessed 41,953 delivery records',
      'Compared Linear Regression, Random Forest, XGBoost, LightGBM, and CatBoost',
      'Selected CatBoost with a documented holdout R² of 0.84',
      'Built reusable inference and deployed the Dockerized Streamlit app on Google Cloud Run',
    ],
    tech: ['Python', 'Pandas', 'Scikit-learn', 'CatBoost', 'XGBoost', 'LightGBM', 'Streamlit', 'Docker', 'Google Cloud Run'],
    githubUrl: 'https://github.com/NithishKumarAI/food-delivery-eta-pipeline',
    gradient: 'from-orange-500 to-red-500',
    visualization: 'eta',
  },
  {
    title: 'AI Diary Assistant',
    tagline: 'AI-Powered Voice Journaling',
    description: 'Record or type daily activities, transcribe voice notes, improve entries with LLMs, and generate daily diary summaries stored in Notion.',
    achievements: [
      'Integrated Groq Whisper transcription, with a separate local Whisper implementation',
      'Added Gemini text processing and model fallback workflows',
      'Integrated Notion APIs to store daily logs and generated diary entries',
      'Containerized the Streamlit application for Google Cloud Run deployment',
    ],
    tech: ['Python', 'Streamlit', 'Gemini API', 'Groq Whisper', 'Ollama', 'Notion API', 'Docker', 'Google Cloud Run'],
    githubUrl: 'https://github.com/NithishKumarAI/AI-Personal-Assistant-System',
    gradient: 'from-blue-500 to-violet-500',
    visualization: 'diary',
  },
];

function ProjectCard({ project, index }: { project: Project, index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative perspective-1000 w-full min-w-0 shrink-0 md:w-[600px] lg:w-[900px] snap-center"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: "translateZ(-50px)" }}
      />

      <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden hover:border-cyan-400/50 transition-colors duration-500 shadow-2xl h-full flex flex-col lg:flex-row">

        <div className="p-8 lg:p-10 flex flex-col justify-between space-y-6 lg:w-1/2" style={{ transform: "translateZ(20px)" }}>
          <div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block"
            >
              <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                {project.title}
              </h3>
            </motion.div>
            <p className="text-cyan-400 text-lg font-medium mb-4">
              {project.tagline}
            </p>
            <p className="text-gray-300 text-base leading-relaxed line-clamp-3 hover:line-clamp-none transition-all">
              {project.description}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold uppercase tracking-wider text-xs">
              <Target className="w-4 h-4" />
              <span>Key Achievements</span>
            </div>
            <div className="grid gap-2">
              {project.achievements.slice(0, 5).map((achievement, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2"
                >
                  <Zap className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={`px-3 py-1 bg-white/5 rounded-full text-xs text-cyan-300 border border-white/10 hover:bg-white/10 transition-colors`}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${project.gradient} rounded-full text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all`}
              >
                <ExternalLink size={16} />
                {project.liveLabel ?? 'Live Demo'}
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white font-bold text-sm hover:bg-white/10 transition-all"
              >
                <Github size={16} />
                Code
              </motion.a>
            )}
          </div>
        </div>

        <div className="relative h-[300px] lg:h-auto lg:w-1/2 min-w-0 bg-gradient-to-br from-slate-800 to-slate-900 p-4 sm:p-6 lg:p-8 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06),transparent_70%)]" />
          <div className="relative z-10 w-full max-w-[390px] rounded-3xl border border-white/10 bg-slate-950/40 p-2 shadow-xl">
            <ProjectVisualization kind={project.visualization} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Swipe detection logic
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      scrollRight();
    } else if (isRightSwipe) {
      scrollLeft();
    }

    // Reset
    setTouchStart(0);
    setTouchEnd(0);
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -window.innerWidth * 0.8, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 text-lg">
            Swipe to explore my latest work
          </p>
        </motion.div>

        <div className="relative">
          {/* Scroll Buttons for Desktop */}
          <button
            aria-label="Previous project"
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-slate-800/80 p-3 rounded-full text-white hover:bg-cyan-500 hover:scale-110 transition-all hidden md:block backdrop-blur-sm border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            aria-label="Next project"
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-slate-800/80 p-3 rounded-full text-white hover:bg-cyan-500 hover:scale-110 transition-all hidden md:block backdrop-blur-sm border border-white/10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Horizontal Scroll Container */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto gap-6 md:gap-8 pb-12 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}

            {/* CTA Card as the last item */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="min-w-[300px] flex items-center justify-center snap-center"
            >
              <div className="text-center p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-cyan-400/30 transition-colors">
                <Github size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold text-white mb-2">View More</h3>
                <p className="text-gray-400 mb-6">Check out more projects on GitHub</p>
                <a
                  href="https://github.com/NithishKumarAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Visit GitHub
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
