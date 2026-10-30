import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Programming',
    skills: ['Python', 'SQL'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'AI / LLM Engineering',
    skills: ['LLM Applications', 'RAG', 'Embeddings', 'Semantic Search', 'AI Agents', 'Tool Calling', 'Prompt Engineering', 'Google ADK', 'Gemini API', 'Ollama'],
    color: 'from-cyan-500 to-teal-500',
  },
  {
    title: 'Backend / Databases',
    skills: ['FastAPI', 'REST APIs', 'PostgreSQL', 'MySQL', 'SQLite', 'Qdrant', 'pgvector'],
    color: 'from-teal-500 to-emerald-500',
  },
  {
    title: 'Cloud / Development',
    skills: ['Docker', 'Google Cloud Run', 'Google Compute Engine / GPU VMs', 'Artifact Registry', 'Cloud Storage', 'Git', 'GitHub', 'Vercel', 'pytest'],
    color: 'from-emerald-500 to-green-500',
  },
];

function SkillCard({ category, index }: { category: typeof skillCategories[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 hover:border-cyan-400/50 transition-all perspective-1000"
    >
      <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`} style={{ transform: "translateZ(20px)" }}>
        {category.title}
      </h3>
      <div className="grid sm:grid-cols-2 gap-x-4 gap-y-5" style={{ transform: "translateZ(10px)" }}>
        {category.skills.map((skill) => (
          <div key={skill}>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300 font-medium">{skill}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <SkillCard key={category.title} category={category} index={categoryIndex} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-lg">
            Technologies I use across AI applications, Python services, and cloud development
          </p>
        </motion.div>
      </div>
    </section>
  );
}
