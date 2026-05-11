import { motion } from 'framer-motion';

const EXPERIENCES = [
  {
    title: 'AI Engineer',
    company: 'Ausweg Info Control Pvt Ltd',
    date: 'Jul 2025 - Jan 2026',
    bullets: [
      'Built LLM chatbot for EMS, automating support workflows.',
      'Engineered RAG pipelines boosting accuracy by 72%.',
      'Integrated IoT telemetry reducing data lookup time by 60%.',
    ],
    color: '#06b6d4',
  },
  {
    title: 'Data Analyst',
    company: 'Ausweg Info Control Pvt Ltd',
    date: 'Aug 2024 - Dec 2024',
    bullets: [
      'Optimized MQTT IIoT pipelines (38% more stable).',
      'Enhanced real-time production visibility by 32%.',
      'Reduced data ingestion latency by 25%.',
    ],
    color: '#a855f7',
  },
  {
    title: 'ML Intern',
    company: 'Corizo Pvt Ltd',
    date: 'Jun 2023',
    bullets: [
      'Designed RNN/LSTM models for stock prediction (+24% acc).',
      'Reduced model training time by 33% via pipeline optimization.',
      'Built wine-quality prediction models.',
    ],
    color: '#4ade80',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-white mb-16 flex items-center gap-4 uppercase tracking-widest"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <span className="w-2 md:w-3 h-10 md:h-12 bg-cyan-500 block rounded-r-lg" />
          CAREER IMPACT
        </motion.h2>

        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 relative pl-8 md:pl-12"
            >
              {/* Timeline dot */}
              <div
                className="absolute w-5 h-5 rounded-full z-10 -left-[11px] top-1"
                style={{
                  backgroundColor: exp.color,
                  boxShadow: `0 0 15px ${exp.color}80, 0 0 30px ${exp.color}40`,
                  border: '3px solid #050505',
                }}
              />

              <div
                className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border hover:-translate-y-1 transition-transform"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                    <div
                      className="text-sm font-semibold tracking-widest uppercase"
                      style={{ color: exp.color, fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {exp.company}
                    </div>
                  </div>
                  <div
                    className="text-xs text-gray-400 border border-white/10 px-3 py-1.5 rounded-full inline-block mt-2 md:mt-0"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {exp.date}
                  </div>
                </div>

                <ul className="space-y-3 mt-4 text-gray-300">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3 text-sm md:text-base">
                      <span className="shrink-0 mt-1" style={{ color: exp.color }}>
                        ✦
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
