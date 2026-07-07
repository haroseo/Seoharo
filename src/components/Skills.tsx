import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from './LanguageContext';

export default function Skills() {
  const { language, t } = useLanguage();
  const data = portfolioData[language];

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
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="section-overline">
            CAPABILITIES
          </p>
          <h2 className="section-title mt-4 mb-6 font-display bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent font-bold">
            {t('기술 스택', 'Skills & Stack')}
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-200 font-normal">
            {t('디자인, 마케팅, 개발 전반의 역량을 나타내는 핵심 기술 스택입니다.', 'Key skill stack representing capabilities across design, marketing, and programming.')}
          </p>
        </motion.div>
 
        <div className="grid gap-8 lg:grid-cols-3">
          {data.skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={groupIndex}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card p-8 border border-zinc-900 bg-zinc-950/40 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-white mb-2 font-display tracking-tight">
                  {skillGroup.category}
                </h3>
                <p className="text-[10px] font-sans font-bold text-zinc-450 uppercase tracking-widest mb-6">
                  {skillGroup.category === 'Design' && 'Creative Interface'}
                  {skillGroup.category === 'Marketing' && 'Growth Strategy'}
                  {skillGroup.category === 'Programming' && 'Systems & Logic'}
                </p>
                <motion.div variants={containerVariants} className="flex flex-wrap gap-2.5">
                  {skillGroup.items.map((skill, itemIndex) => (
                    <motion.span
                      key={itemIndex}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.04, 
                        borderColor: '#ffffff', 
                        color: '#ffffff',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.05)'
                      }}
                      className="rounded-lg border border-zinc-900 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-sans font-semibold text-zinc-400 transition-all select-none cursor-pointer"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
