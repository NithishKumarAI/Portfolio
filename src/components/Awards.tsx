import { motion } from 'framer-motion';

const AWARDS = [
  {
    icon: '🏆',
    category: 'HACKATHONS',
    title: 'GCC x 6S Hackathon Winner',
    desc: 'Won ₹25,000 cash prize building a multi-tenant orchestration platform for GCC. Participated in 7+ more hackathons, recognized in 3 major events (incl. VISAI 2024, PSG ITech 2026).',
    color: '#eab308',
  },
  {
    icon: '📜',
    category: 'CERTIFICATION',
    title: 'Google Cloud Gen AI',
    desc: 'Certified by Simplilearn. Mastered Generative AI concepts.',
    color: '#06b6d4',
  },
  {
    icon: '🌏',
    category: 'GLOBAL EXPOSURE',
    title: 'INTI Malaysia Program',
    desc: '4-month mobility program focusing on real-world Data Science.',
    color: '#a855f7',
  },
  {
    icon: '🤝',
    category: 'LEADERSHIP',
    title: 'Rotaract Director',
    desc: 'Community Service Director. Led tech-driven social initiatives.',
    color: '#22c55e',
  },
];

export default function Awards() {
  return (
    <section id="awards" className="py-24 relative overflow-hidden bg-black/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-white mb-16 flex items-center gap-4 uppercase tracking-widest"
        >
          <span className="w-2 md:w-3 h-10 md:h-12 bg-yellow-500 block rounded-r-lg" />
          CREDIBILITY & AWARDS
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AWARDS.map((award, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl hover:-translate-y-2 transition-transform border-l-4"
              style={{
                borderLeftColor: award.color,
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div className="text-4xl mb-4">{award.icon}</div>
              <div
                className="text-xs font-bold tracking-widest mb-2"
                style={{ color: award.color, fontFamily: 'JetBrains Mono, monospace' }}
              >
                {award.category}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{award.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
