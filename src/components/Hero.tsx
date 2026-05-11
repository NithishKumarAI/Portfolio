import { useEffect, useRef, useState, lazy, Suspense } from 'react';

const ProfileSphere = lazy(() => import('./ProfileSphere'));

const BIOS = [
  'Specializing in <strong>LLMs, RAG Pipelines, and IoT Analytics</strong>. Merging predictive modeling with production-grade engineering.',
  'Building <strong>AI systems</strong> that don\'t just predict — they <strong>explain, adapt, and scale</strong>. From sensor data to semantic search.',
  'From <strong>hackathon breakthroughs to deployed models</strong>. Passionate about bridging the gap between research and real-world AI.',
  'Led the development of <strong>FairAssess.ai</strong>, a transformer-based bias detection engine that successfully <strong>increased diverse applicant rates by 52%</strong>.',
  'Recently wrapped my <strong>AI Engineer role at Ausweg</strong> (Jan 2026), where I engineered an LLM chatbot and <strong>boosted RAG pipeline accuracy by 72%</strong>.',
  'Creator of <strong>Resume Matcher</strong>. Achieved <strong>90% screening automation</strong> using hybrid BM25 and FAISS vector scoring.',
  'Data Analyst turned AI Engineer. Optimized <strong>MQTT IIoT pipelines by 38%</strong> and cut telemetry data lookup times by <strong>60%</strong>.',
  'Global perspective gained through the <strong>INTI Malaysia Program</strong>, spending 4 months immersed in real-world, cross-border <strong>Data Science challenges</strong>.',
  'Won the <strong>GCC x 6S Hackathon (₹25,000 prize)</strong> by building a robust multi-tenant orchestration platform. Further recognized in 3 of 7+ major competitive hackathons (incl. PSG ITech 2026).',
  '<strong>Google Cloud Gen AI Certified</strong> machine learning developer. I bridge the gap between <strong>React/Next.js interfaces</strong> and deep Python LLM integration.',
  'Served as <strong>Rotaract Community Service Director</strong>. I strongly believe technology and leadership should be together used to drive <strong>meaningful social impact</strong>.',
  'My ML engineering journey started by designing <strong>RNN/LSTM models for stock prediction</strong> at Corizo, yielding a <strong>+24% accuracy boost</strong> and 33% faster training pipelines.',
];

export default function Hero() {
  const bioRef = useRef<HTMLParagraphElement>(null);
  const [currentBioIndex, setCurrentBioIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const typeWriter = (html: string, speed = 25) => {
    setIsTyping(true);
    setDisplayedText('');
    let i = 0;
    const stripped = html.replace(/<[^>]+>/g, '');
    const tick = () => {
      if (i <= stripped.length) {
        setDisplayedText(stripped.slice(0, i));
        i++;
        animationRef.current = setTimeout(tick, speed);
      } else {
        // After plain text animation show rich html
        setDisplayedText(html);
        setIsTyping(false);
      }
    };
    tick();
  };

  useEffect(() => {
    typeWriter(BIOS[0]);
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);

  const generateNewBio = () => {
    if (isTyping) return;
    if (animationRef.current) clearTimeout(animationRef.current);
    const next = (currentBioIndex + 1) % BIOS.length;
    setCurrentBioIndex(next);
    typeWriter(BIOS[next]);
  };



  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: '4rem' }}
    >
      {/* 3D Sphere - positioned behind profile pic area */}
      <Suspense fallback={null}>
        <ProfileSphere />
      </Suspense>

      {/* SYSTEM ONLINE badge */}
      <div
        className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-cyan-400 border border-cyan-500/30 rounded-full bg-cyan-500/10 animate-pulse"
        style={{ fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.15em', zIndex: 2, position: 'relative' }}
      >
        SYSTEM ONLINE
      </div>

      {/* Profile picture - no glow, clean border */}
      <div className="relative flex items-center justify-center mb-6" style={{ zIndex: 2 }}>
          <img
            src="/profile.png"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://ui-avatars.com/api/?name=Gunasree+R&background=0D8ABC&color=fff&size=256';
            }}
            alt="Gunasree R"
            className="relative rounded-full object-cover border-4"
            style={{
              width: 200,
              height: 200,
              borderColor: 'rgba(255,255,255,0.1)',
            }}
            fetchPriority="high"
          />
      </div>

      {/* Name */}
      <h1
        className="font-bold text-white text-center mb-1"
        style={{
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          letterSpacing: '0.05em',
          fontFamily: 'Inter, sans-serif',
          textShadow: '0 0 40px rgba(6,182,212,0.3)',
        }}
      >
        GUNASREE R
      </h1>

      {/* Title */}
      <h2
        className="text-cyan-400 tracking-widest font-bold mb-8"
        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', letterSpacing: '0.3em' }}
      >
        AI ENGINEER
      </h2>

      {/* Bio terminal box */}
      <div
        className="relative mx-auto mb-6"
        style={{
          maxWidth: 520,
          width: '90%',
          background: 'rgba(10,10,15,0.75)',
          border: '1px solid rgba(6,182,212,0.3)',
          borderRadius: 8,
          padding: '1rem 1.25rem',
        }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
          <span
            className="ml-2 text-gray-400 text-xs"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            NEURAL_CORE // BIO_GENERATOR
          </span>
        </div>

        <p
          ref={bioRef}
          className="text-gray-300 text-sm leading-relaxed"
          style={{ fontFamily: 'JetBrains Mono, monospace', minHeight: 60 }}
        >
          <span className="text-cyan-400 mr-1">&gt;</span>
          {isTyping ? (
            <>
              {displayedText}
              <span className="inline-block w-0.5 h-4 bg-cyan-400 ml-0.5 animate-pulse" />
            </>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: displayedText }} />
          )}
        </p>
      </div>

      {/* Generate bio button */}
      <button
        onClick={generateNewBio}
        disabled={isTyping}
        className="group flex items-center gap-2 px-6 py-2.5 rounded-full transition-all mb-10"
        style={{
          background: 'rgba(6,182,212,0.1)',
          border: '1px solid rgba(6,182,212,0.5)',
          color: '#22d3ee',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          cursor: isTyping ? 'not-allowed' : 'pointer',
          opacity: isTyping ? 0.6 : 1,
        }}
      >
        <span style={{ fontSize: '0.9rem' }}>✦</span>
        GENERATE NEW BIO
      </button>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-10" style={{ maxWidth: 480, width: '90%' }}>
        {[
          { value: '1+', label: 'YEARS EXP' },
          { value: '75%', label: 'EFFICIENCY', color: '#22d3ee' },
          { value: '8.1', label: 'CGPA', color: '#c084fc' },
          { value: '5+', label: 'PROJECTS' },
        ].map(({ value, label, color }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center p-3 rounded-lg"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span className="font-bold text-xl" style={{ color: color ?? '#fff', fontFamily: 'JetBrains Mono, monospace' }}>
              {value}
            </span>
            <span className="text-gray-500 text-xs mt-1" style={{ letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace' }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 py-2.5 rounded text-sm font-bold transition-all"
          style={{
            background: 'rgba(6,182,212,0.1)',
            border: '1px solid rgba(6,182,212,0.5)',
            color: '#22d3ee',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.05em',
          }}
        >
          VIEW MY WORK
        </a>
        <a
          href="/GUNASREE_R_RESUME.pdf"
          target="_blank"
          download="GUNASREE_R_RESUME.pdf"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded text-sm font-bold transition-all hover:bg-cyan-400"
          style={{
            background: '#06b6d4',
            color: '#000',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.05em',
          }}
        >
          DOWNLOAD CV
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 text-gray-500 text-xs tracking-widest"
        style={{ transform: 'translateX(-50%)', fontFamily: 'JetBrains Mono, monospace' }}
      >
        SCROLL ↓
      </div>
    </section>
  );
}
