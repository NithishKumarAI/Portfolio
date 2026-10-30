import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useId, useRef } from 'react';
import type { ReactNode } from 'react';
import {
  BookOpen, CalendarDays, CheckCheck, ClipboardCheck, Cloud, Code2,
  Cpu, Database, FileText, ListChecks, Mail, Mic,
  RotateCcw, Search, ShieldCheck, Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ProjectVisualKind = 'robin' | 'forge' | 'learntrack' | 'eta' | 'diary';

const descriptions: Record<ProjectVisualKind, { title: string; description: string; color: string }> = {
  robin: {
    title: 'Robin: local and cloud AI architecture',
    description: 'Ollama or Gemini connects to Robin Core, persistent memory, and voice. Email, calendar, and task actions pass through user approval.',
    color: '#22d3ee',
  },
  forge: {
    title: 'Forge: structured learning cycle',
    description: 'Learn, practice Python or SQL, take fixed assessments, then review. This shows the workflow, not completed curriculum or learner performance. Content review remains in progress.',
    color: '#a78bfa',
  },
  learntrack: {
    title: 'LearnTrack: reviewed learning memory and retrieval',
    description: 'Study input passes through AI extraction and user review before memory is saved. Retrieval links confirmed evidence to checkpoints, recommendations, and grounded answers. Embeddings are optional; confirmed observations remain retrievable without them.',
    color: '#38bdf8',
  },
  eta: {
    title: 'Food delivery ETA: holdout R-squared comparison',
    description: 'On a zero to one scale: Linear Regression 0.60, Random Forest 0.82, XGBoost 0.82, LightGBM 0.83, and CatBoost 0.84. CatBoost has the highest documented holdout R-squared. R-squared is not an accuracy percentage.',
    color: '#fb923c',
  },
  diary: {
    title: 'AI Diary Assistant: voice and text to a saved diary',
    description: 'Voice goes through Whisper transcription; typed text bypasses transcription. Gemini processes the text into diary entries, which are saved in Notion. The waveform is an input symbol, not a recording or measurement.',
    color: '#818cf8',
  },
};

function Label({ x, y, children, size = 13, color = '#94a3b8', anchor = 'middle' }: {
  x: number; y: number; children: ReactNode; size?: number; color?: string;
  anchor?: 'start' | 'middle' | 'end';
}) {
  return <text x={x} y={y} fill={color} fontSize={size} textAnchor={anchor}>{children}</text>;
}

function Node({ x, y, width, height = 48, label, detail, icon: Icon, accent = false }: {
  x: number; y: number; width: number; height?: number; label: string;
  detail?: string; icon: LucideIcon; accent?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={width} height={height} rx={12} fill={accent ? 'currentColor' : '#0f1b30'} fillOpacity={accent ? 0.12 : 0.95} stroke={accent ? 'currentColor' : '#334155'} />
      <Icon x={10} y={height / 2 - 9} width={18} height={18} stroke={accent ? 'currentColor' : '#94a3b8'} strokeWidth={1.6} />
      <Label x={35} y={detail ? height / 2 - 2 : height / 2 + 5} size={14} color="#e2e8f0" anchor="start">{label}</Label>
      {detail && <Label x={35} y={height / 2 + 15} size={11} anchor="start">{detail}</Label>}
    </g>
  );
}

// A finite signal indicates direction, then rests. No animation loop runs offscreen.
function Flow({ d, active, delay = 0, arrow }: { d: string; active: boolean; delay?: number; arrow?: string }) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d={d} opacity={0.3} markerEnd={arrow} />
      {active && <motion.path d={d} strokeDasharray="3 9" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [0, 0.9, 0] }} transition={{ duration: 2.4, delay, ease: 'easeInOut' }} />}
    </g>
  );
}

function Robin({ active }: { active: boolean }) {
  return (
    <>
      <Label x={180} y={20} size={12} color="currentColor">LOCAL + CLOUD AI</Label>
      <Flow d="M80 78 V88 Q80 92 90 92 H161 V104" active={active} />
      <Flow d="M280 78 V88 Q280 92 270 92 H199 V104" active={active} delay={0.15} />
      <Flow d="M107 126 H124 M236 126 H253" active={active} delay={0.3} />
      <Flow d="M180 152 V164 M180 188 V196 H58 V206 M180 196 V206 M180 196 H302 V206" active={active} delay={0.6} />
      <Node x={10} y={34} width={140} height={44} label="Ollama" detail="LOCAL MODEL" icon={Cpu} accent />
      <Node x={210} y={34} width={140} height={44} label="Gemini" detail="CLOUD MODEL" icon={Cloud} />
      <Node x={8} y={104} width={99} height={44} label="Memory" icon={Database} />
      <motion.circle cx={180} cy={128} r={38} fill="none" stroke="currentColor" strokeOpacity={0.16}
        initial={false} animate={active ? { r: [38, 46, 38], opacity: [0.3, 0.7, 0.3] } : { r: 38 }} transition={{ duration: 2.4 }} />
      <rect x={124} y={104} width={112} height={48} rx={16} fill="#102c41" stroke="currentColor" />
      <Label x={180} y={125} size={15} color="#f1f5f9">ROBIN</Label>
      <Label x={180} y={141} size={11} color="currentColor">CORE</Label>
      <Node x={253} y={104} width={99} height={44} label="Voice" icon={Mic} />
      <g transform="translate(94 164)">
        <rect width={172} height={24} rx={12} fill="#0c2835" stroke="currentColor" strokeOpacity={0.5} />
        <ShieldCheck x={9} y={4} width={16} height={16} />
        <Label x={97} y={16} size={11} color="#a5f3fc">USER APPROVAL</Label>
      </g>
      <Node x={8} y={206} width={100} height={42} label="Email" icon={Mail} />
      <Node x={120} y={206} width={120} height={42} label="Calendar" icon={CalendarDays} />
      <Node x={252} y={206} width={100} height={42} label="Tasks" icon={ListChecks} />
    </>
  );
}

function Forge({ active, arrow }: { active: boolean; arrow: string }) {
  return (
    <>
      <Label x={180} y={20} size={12} color="currentColor">STRUCTURED LEARNING</Label>
      <Flow d="M156 78 H204" active={active} arrow={arrow} />
      <Flow d="M272 110 V158" active={active} delay={0.3} arrow={arrow} />
      <Flow d="M204 188 H156" active={active} delay={0.6} arrow={arrow} />
      <Flow d="M88 158 V110" active={active} delay={0.9} arrow={arrow} />
      <Node x={20} y={48} width={136} height={62} label="Learn" detail="LESSONS" icon={BookOpen} accent />
      <Node x={204} y={48} width={136} height={62} label="Practice" detail="PYTHON / SQL" icon={Code2} />
      <Node x={204} y={158} width={136} height={62} label="Assess" detail="FIXED TESTS" icon={ClipboardCheck} accent />
      <Node x={20} y={158} width={136} height={62} label="Review" detail="REVISION" icon={RotateCcw} />
      <Label x={180} y={139} size={11}>LOCAL-FIRST</Label>
      <Label x={180} y={248} size={12}>Content review in progress</Label>
    </>
  );
}

function LearnTrack({ active, arrow }: { active: boolean; arrow: string }) {
  return (
    <>
      <Label x={180} y={20} size={12} color="currentColor">EVIDENCE-LINKED MEMORY</Label>
      <Flow d="M108 62 H126 M234 62 H252" active={active} arrow={arrow} />
      <Flow d="M302 86 V98 H64 V111" active={active} delay={0.35} arrow={arrow} />
      <Flow d="M114 144 H148" active={active} delay={0.55} arrow={arrow} />
      <Flow d="M264 144 H308 V199 M308 188 H60 V199 M188 188 V199" active={active} delay={0.8} />
      <Node x={8} y={38} width={100} label="Study" detail="INPUT" icon={FileText} />
      <Node x={126} y={38} width={108} label="Extract" detail="AI DRAFT" icon={Sparkles} />
      <Node x={252} y={38} width={100} label="Review" detail="BY USER" icon={CheckCheck} accent />
      <g stroke="currentColor" strokeOpacity={0.4} fill="#0c2238">
        <path d="M27 131 L51 116 L81 133 L60 155 Z M27 131 L60 155 M51 116 L60 155 M81 133 L108 145" fill="none" />
        {[[27, 131], [51, 116], [81, 133], [60, 155], [108, 145]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r={4} fill="currentColor" />)}
      </g>
      <Label x={64} y={179} size={12} color="#e2e8f0">Memory</Label>
      <Node x={148} y={120} width={116} label="Retrieve" icon={Search} accent />
      {[
        { x: 8, width: 104, label: 'Checkpoints' },
        { x: 120, width: 136, label: 'Recommendations' },
        { x: 264, width: 88, label: 'Answers' },
      ].map(({ x, width, label }) => (
        <g key={label}>
          <rect x={x} y={199} width={width} height={36} rx={10} fill="#0f1b30" stroke="#334155" />
          <Label x={x + width / 2} y={221} size={12} color="#e2e8f0">{label}</Label>
        </g>
      ))}
      <Label x={180} y={253} size={11}>Confirmed records · optional embeddings</Label>
    </>
  );
}

// Source: https://github.com/NithishKumarAI/food-delivery-eta-pipeline#models
// Values are R² scores, never percentages; bar lengths share the full 0–1 scale.
const modelScores = [
  { name: 'Linear Regression', score: 0.60 },
  { name: 'Random Forest', score: 0.82 },
  { name: 'XGBoost', score: 0.82 },
  { name: 'LightGBM', score: 0.83 },
  { name: 'CatBoost', score: 0.84 },
];

function Eta({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <>
      <Label x={12} y={19} size={11} color="currentColor" anchor="start">BEST MODEL: CATBOOST</Label>
      <Label x={348} y={24} size={24} color="#fff7ed" anchor="end">R² = 0.84</Label>
      <Label x={12} y={40} size={11} anchor="start">HOLDOUT MODEL COMPARISON</Label>
      {[0, 0.5, 1].map(tick => (
        <g key={tick}>
          <line x1={149 + tick * 159} x2={149 + tick * 159} y1={54} y2={225} stroke="#334155" strokeDasharray={tick ? '2 5' : undefined} />
          <Label x={149 + tick * 159} y={246} size={12}>{tick}</Label>
        </g>
      ))}
      {modelScores.map(({ name, score }, index) => {
        const best = name === 'CatBoost';
        const y = 62 + index * 33;
        return (
          <g key={name}>
            {best && <rect x={5} y={y - 6} width={350} height={29} rx={8} fill="currentColor" fillOpacity={0.08} />}
            <Label x={138} y={y + 10} size={12} anchor="end" color={best ? '#ffedd5' : '#cbd5e1'}>{name}</Label>
            <rect x={149} y={y - 3} width={159} height={17} rx={4} fill="#17243a" />
            <motion.rect x={149} y={y - 3} height={17} rx={4} fill={best ? 'currentColor' : '#397eaa'}
              initial={false} animate={{ width: reduced || active ? score * 159 : 0 }} transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : index * 0.1, ease: 'easeOut' }} />
            <Label x={348} y={y + 10} size={13} color={best ? '#fed7aa' : '#e2e8f0'} anchor="end">{score.toFixed(2)}</Label>
          </g>
        );
      })}
    </>
  );
}

function Diary({ active, arrow }: { active: boolean; arrow: string }) {
  return (
    <>
      <Label x={180} y={20} size={12} color="currentColor">VOICE-TO-DIARY PIPELINE</Label>
      <g transform="translate(34 64)" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
        {[10, 22, 35, 18, 43, 28, 14, 32, 20].map((height, index) => (
          <motion.line key={index} x1={index * 7} x2={index * 7} y1={-height / 2} y2={height / 2}
            initial={false} animate={active ? { scaleY: [0.6, 1, 0.7, 1] } : { scaleY: 1 }} transition={{ duration: 1.6, delay: index * 0.06 }} style={{ transformOrigin: `${index * 7}px 0px` }} />
        ))}
      </g>
      <Label x={64} y={106} size={13} color="#e2e8f0">Voice</Label>
      <Flow d="M106 64 H156" active={active} arrow={arrow} />
      <Node x={156} y={40} width={180} label="Whisper" detail="TRANSCRIPTION" icon={Mic} />
      <Flow d="M246 88 V126" active={active} delay={0.3} arrow={arrow} />
      <Node x={8} y={126} width={112} label="Text" icon={FileText} />
      <Flow d="M120 150 H156" active={active} delay={0.3} arrow={arrow} />
      <Node x={156} y={126} width={180} label="Gemini" detail="TEXT PROCESSING" icon={Sparkles} accent />
      <Flow d="M246 174 V209 H212" active={active} delay={0.7} arrow={arrow} />
      <Node x={48} y={193} width={164} height={50} label="Notion" detail="SAVED DIARY" icon={BookOpen} accent />
    </>
  );
}

export default function ProjectVisualization({ kind }: { kind: ProjectVisualKind }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const id = useId().replace(/:/g, '');
  const { title, description, color } = descriptions[kind];
  const active = inView && reduced === false;
  const arrow = `url(#${id}-arrow)`;

  return (
    <svg ref={ref} viewBox="0 0 360 264" role="img" aria-labelledby={`${id}-title ${id}-description`}
      className="block w-full h-auto overflow-visible" style={{ color, fontFamily: 'JetBrains Mono, monospace' }}>
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-description`}>{description}</desc>
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor={color} stopOpacity={0.1} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
        <marker id={`${id}-arrow`} viewBox="0 0 8 8" refX={7} refY={4} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
          <path d="M1 1 L7 4 L1 7" fill="none" stroke={color} strokeWidth={1.4} />
        </marker>
      </defs>
      <ellipse cx={180} cy={132} rx={180} ry={132} fill={`url(#${id}-glow)`} />
      {kind === 'robin' && <Robin active={active} />}
      {kind === 'forge' && <Forge active={active} arrow={arrow} />}
      {kind === 'learntrack' && <LearnTrack active={active} arrow={arrow} />}
      {kind === 'eta' && <Eta active={inView} reduced={reduced !== false} />}
      {kind === 'diary' && <Diary active={active} arrow={arrow} />}
    </svg>
  );
}
