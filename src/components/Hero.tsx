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
      className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 min-h-screen bg-black flex items-center border-b border-zinc-900"
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
          <motion.div variants={itemVariants} className="space-y-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
                INTRO // SEOHARO
              </span>
              <span className="h-px w-6 bg-zinc-850" />
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-tight">
              SEOHARO
            </h1>

            <p className="max-w-xl text-sm md:text-base leading-relaxed text-zinc-200 mx-auto lg:mx-0 font-normal">
              {data.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate('/portfolio')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-xs sm:text-sm font-bold text-black hover:bg-zinc-200 shadow-xl transition-all cursor-pointer"
              >
                {t('프로젝트 목록', 'PROJECT CATALOG')}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 px-8 py-3.5 text-xs sm:text-sm font-bold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
              >
                {t('협업 문의', 'COLLABORATE')}
              </button>
            </div>
          </motion.div>

          {/* Profile Card Summary Panel */}
          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-zinc-900 bg-zinc-950/40 p-8 md:p-10 shadow-2xl backdrop-blur-md"
          >
            <p className="text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
              PROFILE // OVERVIEW
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold tracking-wide text-zinc-400 uppercase">
                    PROFILE NODE
                  </p>
                  <h2 className="text-xl font-bold text-white mt-1 font-display">
                    SEOHARO
                  </h2>
                </div>
                <div className="rounded-full border border-zinc-850 bg-zinc-900/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                  {t('활동 중', 'ACTIVE')}
                </div>
              </div>

              <p className="text-xs leading-relaxed text-zinc-300 font-medium">
                {data.title}
              </p>

              <div className="grid gap-4 text-xs text-zinc-300 font-normal">
                <div className="flex justify-between border-b border-zinc-900 pb-3">
                  <span className="text-zinc-400 font-bold">EMAIL</span>
                  <span className="font-semibold text-zinc-200">{data.contact.email}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900 pb-3">
                  <span className="text-zinc-400 font-bold">GITHUB</span>
                  <a
                    href={data.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-zinc-200 hover:text-white transition-colors"
                  >
                    github.com/haroseo
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 font-bold">LOCATION</span>
                  <span className="font-semibold text-zinc-200">{t('대한민국', 'South Korea')}</span>
                </div>
              </div>

              {/* Minimal Project Links */}
              <div className="pt-6 border-t border-zinc-900 text-[11px] font-bold tracking-wide text-zinc-400 grid gap-1.5 uppercase">
                <span>ROLES & POSITION</span>
                <span className="text-xs text-white font-sans font-bold leading-normal">
                  ROFOLDER CEO / LIMITED™ FOUNDER / LUXERET MARKETER / HANN LABS™ STAFF DESIGNER
                </span>
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
