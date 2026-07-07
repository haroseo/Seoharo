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
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden border-b border-[#373737]">
      {/* Figma Selection Boundary Box */}
      <div className="absolute inset-4 sm:inset-6 border border-[#18a0fb]/20 rounded-2xl pointer-events-none z-10">
        <div className="absolute -top-2.5 left-4 px-1.5 py-0.5 bg-[#18a0fb] text-white text-[8px] font-bold font-mono rounded">
          # Skill Sets Frame
        </div>
        {/* Handles */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-[#18a0fb] rounded-sm" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-[#18a0fb] rounded-sm" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-[#18a0fb] rounded-sm" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-[#18a0fb] rounded-sm" />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="section-overline">ASSETS / LIBRARIES</p>
          <h2 className="section-title mt-4 mb-6 font-display bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent font-bold">
            {t('기술 스택', 'Skills & Stack')}
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-200 font-normal tracking-tight">
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
              className="bg-[#2b2b2b]/95 border border-[#373737] p-8 rounded-2xl shadow-2xl flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-bold text-white mb-1 font-display tracking-tight">
                  {skillGroup.category}
                </h3>
                <p className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-6">
                  {skillGroup.category === 'Design' && 'Library / Visual Asset'}
                  {skillGroup.category === 'Marketing' && 'Strategy / Funnel Asset'}
                  {skillGroup.category === 'Programming' && 'Code / Script Module'}
                </p>
                <motion.div variants={containerVariants} className="flex flex-wrap gap-2.5">
                  {skillGroup.items.map((skill, itemIndex) => (
                    <motion.span
                      key={itemIndex}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.04, 
                        borderColor: '#a259ff', 
                        color: '#d3b4ff',
                        backgroundColor: 'rgba(162, 89, 255, 0.08)'
                      }}
                      className="rounded-lg border border-[#373737] bg-[#1e1e1e] px-3.5 py-1.5 text-xs font-mono font-semibold text-zinc-400 transition-all select-none cursor-pointer flex items-center gap-1.5 hover:shadow-[0_0_10px_rgba(162,89,255,0.15)] group"
                    >
                      <span className="text-[#a259ff] group-hover:hidden">◇</span>
                      <span className="text-[#a259ff] hidden group-hover:inline">❖</span>
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
