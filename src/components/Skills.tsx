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
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#18a0fb] uppercase">ABILITIES</span>
          <h2 className="text-3xl sm:text-4xl font-display bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent font-extrabold tracking-tight mt-4 mb-4">
            {t('기술 역량 스택', 'Skills & Stack')}
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-zinc-400 leading-relaxed tracking-tight">
            {t('다양한 분야에서 아이디어를 구체화하기 위해 학습하고 단련한 기술적 도구들입니다.', 'Technical toolsets and stacks acquired to materialize creative thoughts across multiple fields.')}
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
              className="glass-panel p-8 rounded-3xl shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-[#18a0fb]/20 transition-all duration-300"
            >
              {/* Backlight Accent */}
              <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-[#18a0fb]/5 group-hover:bg-[#18a0fb]/10 rounded-full blur-2xl pointer-events-none transition-all duration-300" />

              <div>
                <h3 className="text-lg font-bold text-white mb-1 font-display tracking-tight">
                  {skillGroup.category}
                </h3>
                <p className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-6">
                  {skillGroup.category === 'Design' && 'Creative Interface Assets'}
                  {skillGroup.category === 'Marketing' && 'Growth Strategy Systems'}
                  {skillGroup.category === 'Programming' && 'Code Logic Modules'}
                </p>
                <motion.div variants={containerVariants} className="flex flex-wrap gap-2">
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
                      className="rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition-all select-none cursor-pointer flex items-center gap-1 hover:shadow-[0_0_12px_rgba(162,89,255,0.12)]"
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
