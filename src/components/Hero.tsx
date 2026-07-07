import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from './LanguageContext';
import { useRouter } from './router';

export default function Hero() {
  const { language, t } = useLanguage();
  const { navigate } = useRouter();
  const data = portfolioData[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section 
      id="hero" 
      className="relative overflow-hidden min-h-[85vh] flex items-center py-12"
    >
      <div className="relative z-10 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center"
        >
          {/* Main Title / Slogan block */}
          <motion.div variants={itemVariants} className="space-y-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                {t('크리에이티브 포트폴리오', 'CREATIVE PORTFOLIO')}
              </span>
              <span className="h-px w-8 bg-zinc-800" />
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-tight">
              SEOHARO
            </h1>

            <p className="max-w-xl text-sm md:text-[15px] leading-relaxed text-zinc-400 mx-auto lg:mx-0 font-normal tracking-tight">
              {data.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => navigate('/portfolio')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-white text-black hover:bg-zinc-200 px-8 py-3.5 text-xs sm:text-sm font-bold shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {t('프로젝트 카탈로그', 'PROJECT CATALOG')}
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                {t('협업 제안하기', 'COLLABORATE')}
              </button>
            </div>
          </motion.div>

          {/* Profile Card Summary Panel - Celestial Glass Card */}
          <motion.div
            variants={itemVariants}
            className="relative glass-panel p-8 md:p-10 rounded-3xl shadow-2xl z-20 overflow-hidden"
          >
            {/* Interactive Light Beam Accent */}
            <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-[#18a0fb]/10 to-[#a259ff]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white font-display tracking-tight uppercase">
                    SEOHARO
                  </h2>
                  <p className="text-[10px] font-mono text-zinc-500 tracking-wider mt-1">{t('총괄 디렉터', 'GENERAL DIRECTOR')}</p>
                </div>
                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                  {t('온라인', 'ACTIVE')}
                </div>
              </div>

              <p className="text-xs leading-relaxed text-zinc-300 font-medium">
                {data.title}
              </p>

              {/* Grid-based Metadata Tiles */}
              <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3 text-xs text-zinc-300 font-normal">
                <div className="glass-card-hologram p-4 rounded-xl flex flex-col justify-between overflow-hidden">
                  <span className="text-[8.5px] font-bold text-zinc-500 tracking-wider">{t('이메일', 'EMAIL')}</span>
                  <span className="mt-1 font-semibold text-zinc-200 truncate select-all">{data.contact.email}</span>
                </div>
                <div className="glass-card-hologram p-4 rounded-xl flex flex-col justify-between overflow-hidden">
                  <span className="text-[8.5px] font-bold text-zinc-500 tracking-wider">{t('위치', 'LOCATION')}</span>
                  <span className="mt-1 font-semibold text-zinc-200 truncate">{t('대한민국 서울', 'Seoul, South Korea')}</span>
                </div>
                <a
                  href={data.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card-hologram p-4 rounded-xl flex flex-col justify-between transition-all duration-300 group overflow-hidden"
                >
                  <span className="text-[8.5px] font-bold text-zinc-500 tracking-wider flex justify-between items-center">
                    {t('깃허브', 'GITHUB')}
                    <span className="text-[8px] text-zinc-400 group-hover:text-white transition-colors">↗</span>
                  </span>
                  <span className="mt-1 font-semibold text-zinc-200 truncate">github.com/haroseo</span>
                </a>
                <a
                  href={data.contact.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card-hologram p-4 rounded-xl flex flex-col justify-between transition-all duration-300 group overflow-hidden"
                >
                  <span className="text-[8.5px] font-bold text-zinc-500 tracking-wider flex justify-between items-center">
                    {t('피그마', 'FIGMA')}
                    <span className="text-[8px] text-zinc-400 group-hover:text-white transition-colors">↗</span>
                  </span>
                  <span className="mt-1 font-semibold text-zinc-200 truncate">figma.com/@seoharo</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
