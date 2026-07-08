import { portfolioData } from '../data/portfolioData';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from './router';
import { useLanguage } from './LanguageContext';

export default function Hero() {
  const { navigate } = useRouter();
  const { language, t } = useLanguage();
  const data = portfolioData[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const
      },
    },
  };

  return (
    <section 
      id="hero" 
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-32 pb-24 sm:pt-40 sm:pb-28 min-h-screen bg-black flex items-center border-b border-zinc-900"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] to-transparent pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-16 lg:grid-cols-[1.5fr_1fr] items-center"
        >
          {/* Main Title / Slogan block */}
          <motion.div variants={itemVariants} className="space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="text-[10px] font-bold tracking-widest text-zinc-450 uppercase">
                {t('소개', 'INTRODUCTION')}
              </span>
              <span className="h-px w-4 bg-zinc-800" />
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[1.1]">
              SEOHARO
            </h1>

            <p className="max-w-xl text-sm md:text-[15px] leading-relaxed text-zinc-300 mx-auto lg:mx-0 font-normal tracking-normal">
              {data.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate('/portfolio')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[var(--toss-blue)] px-8 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-[var(--toss-blue-hover)] shadow-lg transition-all cursor-pointer"
              >
                {t('프로젝트 목록', 'PROJECT CATALOG')}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                {t('협업 문의', 'COLLABORATE')}
              </button>
            </div>
          </motion.div>

          {/* Profile Card Summary Panel - Flat Borderless style */}
          <motion.div
            variants={itemVariants}
            className="py-8 lg:py-10 bg-transparent"
          >
            <div className="space-y-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white font-display tracking-tight">
                    SEOHARO
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 select-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {t('활동 중', 'ACTIVE')}
                </div>
              </div>

              <p className="text-xs leading-relaxed text-zinc-300 font-medium">
                {data.title}
              </p>

              {/* Grid-based Metadata Tiles - Flat with bottom border only */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-xs text-zinc-300 font-normal">
                <div className="flex flex-col justify-between py-2 border-b border-zinc-900">
                  <span className="text-[8.5px] font-bold text-zinc-500 tracking-wider">EMAIL</span>
                  <span className="mt-1.5 font-semibold text-zinc-200 truncate select-all">{data.contact.email}</span>
                </div>
                <div className="flex flex-col justify-between py-2 border-b border-zinc-900">
                  <span className="text-[8.5px] font-bold text-zinc-500 tracking-wider">LOCATION</span>
                  <span className="mt-1.5 font-semibold text-zinc-200">{t('대한민국', 'South Korea')}</span>
                </div>
                <a
                  href={data.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col justify-between py-2 border-b border-zinc-900 col-span-2 group transition-all duration-300"
                >
                  <span className="text-[8.5px] font-bold text-zinc-500 tracking-wider flex justify-between items-center">
                    GITHUB
                    <span className="text-[8px] text-zinc-600 group-hover:text-white transition-colors">LAUNCH ↗</span>
                  </span>
                  <span className="mt-1.5 font-semibold text-zinc-200 group-hover:text-white transition-colors">github.com/haroseo</span>
                </a>
              </div>

              {/* Tag-based Micro Chips (Flat bullet list) */}
              <div className="pt-6 border-t border-zinc-900 space-y-3">
                <span className="text-[9px] font-bold tracking-wider text-zinc-500 uppercase block">ROLES & POSITION</span>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {[
                    'RoFolder CEO',
                    'Limited™ Founder',
                    'LUXERET Marketer',
                    'HANN LABS™ Staff Designer',
                    'SIMPLX Developer'
                  ].map((role, idx, arr) => (
                    <span 
                      key={role} 
                      className="text-[10px] font-semibold text-zinc-300 font-sans tracking-tight flex items-center"
                    >
                      {role}
                      {idx < arr.length - 1 && <span className="text-zinc-705 ml-3 select-none font-normal text-[8px]">•</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bounce Down Arrow */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <ArrowDown className="text-zinc-650" size={24} />
      </motion.div>
    </section>
  );
}
