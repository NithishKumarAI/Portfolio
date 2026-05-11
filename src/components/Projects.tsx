import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, TrendingUp, Zap, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import ProjectImpactChart from './ProjectImpactChart';

const projects = [
  {
    title: 'TaskNerve',
    tagline: 'Governance-First Task Orchestration for GCCs',
    description: 'Intelligent orchestration platform for Global Capability Centers that solves the "Governance Paradox" — giving leadership deep oversight without imposing micromanagement on execution teams.',
    achievements: [
      'Multi-tenant architecture with Row Level Security isolation',
      'Role-based dashboards: Managers, Team Members, Leaders',
      'AI intelligence engine with predictive SLA breach detection',
      'Geospatial cluster health map with Leaflet integration',
      'Context-aware AI chat powered by Groq/Llama 3.1',
    ],
    tech: ['Next.js 16', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Shadcn UI', 'Framer Motion', 'Vercel AI SDK', 'Groq'],
    liveUrl: 'https://task-nerve.vercel.app',
    githubUrl: 'https://github.com/rgunasree/TaskNerve',
    gradient: 'from-purple-500 to-cyan-500',
    impactMetric: { value: 100, label: 'Governance Score', prefix: '' },
    image: '/images/tasknerve_smurf.png'
  },
  {
    title: 'Crowd Guardian',
    tagline: 'Edge AI-Powered Smart Crowd Management System',
    description: 'Production-grade safety platform designed for high-density public spaces that uses computer vision to detect surge patterns and calculate Stampede Risk Index (SRI).',
    achievements: [
      'Decentralized Edge-AI processing using TensorFlow.js in-browser',
      'SRI Algorithm: Density-based momentum tracking for predictive safety',
      'Sub-150ms incident propagation via WebSocket event bus',
      'Interactive emergency protocols with mission-critical checklists',
      'Zero-latency detection with 100% video data privacy',
    ],
    tech: ['React 18', 'TypeScript', 'TensorFlow.js', 'Node.js', 'WebSocket', 'Tailwind CSS', 'Recharts'],
    liveUrl: 'https://crowd-guardian-kappa.vercel.app',
    githubUrl: 'https://github.com/rgunasree/crowd-guardian',
    gradient: 'from-orange-500 to-red-500',
    impactMetric: { value: 150, label: 'ms Prop. Latency', prefix: '<' },
    image: '/images/crowdguardian_smurf.png'
  },
  {
    title: 'FairAssess.ai',
    tagline: 'AI-Powered Hiring Bias Detection Platform',
    description: 'Enterprise-grade platform that analyzes job descriptions and candidate evaluations for bias, providing real-time fairness analytics and AI-powered rewriting suggestions.',
    achievements: [
      '43% boost in candidate diversity through bias detection',
      'Sub-500ms analysis with LLM-powered insights',
      'Real-time fairness dashboard with actionable metrics',
      'Automated bias rewriting with context preservation',
      'Multi-dimensional bias scoring across gender, race, age',
    ],
    tech: ['Next.js', 'TypeScript', 'Python', 'OpenAI GPT', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://fairassess-j0isbrlkp-gunasrees-projects.vercel.app',
    githubUrl: 'https://github.com/rgunasree/FairAssess',
    gradient: 'from-blue-500 to-cyan-500',
    impactMetric: { value: 43, label: 'Diversity Boost' },
    image: '/images/fair_assess_smurf.png'
  },
  {
    title: 'WhatShouldIWatch.ai',
    tagline: 'Mood-Based Entertainment Recommender',
    description: 'Real-time AI recommendation engine that suggests movies and shows based on user mood, preferences, and viewing history with instant results.',
    achievements: [
      'Real-time AI recommendations with instant results',
      'No signup required - frictionless user experience',
      'Mobile-first responsive design for all devices',
      'TMDB API integration with 1M+ titles',
      'Personalized mood-to-content matching algorithm',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'OpenAI API', 'TMDB API', 'Vercel'],
    liveUrl: 'https://whatshouldiwatch-ai.vercel.app',
    githubUrl: 'https://github.com/rgunasree/whatshouldiwatch-ai',
    gradient: 'from-cyan-500 to-teal-500',
    impactMetric: { value: 500, label: 'ms Response Time', prefix: '<' },
    image: '/images/what_should_i_watch_smurf.png'
  },
  {
    title: 'AI-Powered Resume Matcher',
    tagline: 'Intelligent Resume Ranking Engine',
    description: 'Hybrid NLP system combining BM25 and FAISS for semantic resume-job matching, with recruiter dashboard for efficient candidate screening.',
    achievements: [
      'Hybrid search with BM25 + FAISS vector similarity',
      'Automated skill extraction and matching',
      'Batch resume upload with parallel processing',
      'Real-time ranking dashboard for recruiters',
      'Semantic filtering with 95%+ accuracy',
    ],
    tech: ['Python', 'FastAPI', 'FAISS', 'Transformers', 'React', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/rgunasree/resume-matcher',
    gradient: 'from-teal-500 to-emerald-500',
    impactMetric: { value: 95, label: 'Match Accuracy' },
    image: '/images/resume_matcher_smurf.png'
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
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
      className="group relative perspective-1000 min-w-[350px] md:min-w-[600px] lg:min-w-[900px] snap-center"
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
              {project.achievements.slice(0, 3).map((achievement, i) => (
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

          <div className="flex gap-4 pt-2">
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
                Live Demo
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

        <div className="relative h-[300px] lg:h-auto lg:w-1/2 bg-gradient-to-br from-slate-800 to-slate-900 p-8 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              scale: 1.1,
              translateX: useTransform(mouseX, [-0.5, 0.5], ["-5%", "5%"]),
              translateY: useTransform(mouseY, [-0.5, 0.5], ["-5%", "5%"]),
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="relative z-10 w-full max-w-[280px]"
            style={{ transform: "translateZ(50px)" }}
          >
            <div className={`bg-gradient-to-br ${project.gradient} bg-opacity-10 rounded-3xl p-6 border border-white/10 backdrop-blur-md shadow-xl`}>
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-white mx-auto mb-4 drop-shadow-lg" />
                <div className="text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
                  {project.impactMetric.prefix}{project.impactMetric.value}
                  {!project.impactMetric.prefix && '%'}
                </div>
                <div className="text-sm text-white/90 font-bold uppercase tracking-widest">
                  {project.impactMetric.label}
                </div>
              </div>
              <div className="mt-6 h-[100px]">
                <ProjectImpactChart value={project.impactMetric.value} />
              </div>
            </div>
          </motion.div>
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
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-slate-800/80 p-3 rounded-full text-white hover:bg-cyan-500 hover:scale-110 transition-all hidden md:block backdrop-blur-sm border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>

          <button
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
                  href="https://github.com/rgunasree"
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
