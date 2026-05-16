import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="section-overline">Expertise</p>
          <h2 className="section-title mt-2 mb-6 text-slate-950">
            Skills that shape products and experiences.
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
            디자인과 코드가 만나는 지점에서, 서비스와 비즈니스가 함께 성장할 수 있는 역량을 구성합니다.
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
              className="glass-card p-8"
            >
              <h3 className="text-2xl font-semibold text-slate-950 mb-4">
                {skillGroup.category}
              </h3>
              <motion.div variants={containerVariants} className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill, itemIndex) => (
                  <motion.span
                    key={itemIndex}
                    variants={itemVariants}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-slate-300"
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
