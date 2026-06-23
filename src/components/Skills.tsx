import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4 font-mono">[04 // CAPABILITIES]</p>
          <h2 className="section-title mt-4 mb-6 font-display bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent font-bold">
            Skills & Stack
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 font-light">
            디자인과 개발의 경계에서 시너지를 극대화하는 핵심 기술 스택입니다.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {portfolioData.skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={groupIndex}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card p-8 border border-zinc-900 bg-zinc-950/40 shadow-2xl"
            >
              <h3 className="text-lg font-bold text-white mb-5 font-display tracking-tight">
                {skillGroup.category}
              </h3>
              <motion.div variants={containerVariants} className="flex flex-wrap gap-2.5">
                {skillGroup.items.map((skill, itemIndex) => (
                  <motion.span
                    key={itemIndex}
                    variants={itemVariants}
                    className="rounded-lg border border-zinc-900 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-mono text-zinc-300 transition-all hover:border-zinc-700 hover:text-white"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
