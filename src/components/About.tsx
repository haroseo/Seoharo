import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

function GlowCard({ children, className = "", style = {}, onClick, layout }: { children: React.ReactNode, className?: string, style?: any, onClick?: () => void, layout?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: -9999, y: -9999 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      ref={cardRef}
      layout={layout}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: -9999, y: -9999 });
      }}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.04), transparent 80%)`
        }}
      />
      {children}
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { t } = useLanguage();

  // 3D Perspective Transformations based on scroll
  const rotateX = useTransform(scrollYProgress, [0.1, 0.5], [20, 0]);
  const rotateY = useTransform(scrollYProgress, [0.1, 0.5], [-10, 0]);
  const translateZ = useTransform(scrollYProgress, [0.1, 0.5], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.95, 1]);

  const [activeStat, setActiveStat] = useState<number | null>(null);

  const details = [
    {
      title: t('시각 디자인 & 브랜딩', 'Visual Design & Branding'),
      description: t(
        'HANN LABS™에서 디자인을 배우며 보조 스태프로 참여하고, 브랜드 비주얼 기획 경험을 기반으로 Limited™의 비주얼 정체성을 구상해 나갑니다.',
        'Learning design and participating as assistant staff at HANN LABS™, and conceptualizing the visual identity of Limited™ based on brand design experience.'
      ),
    },
    {
      title: t('브랜드 마케팅', 'Brand Marketing'),
      description: t(
        'LUXERET의 마케터로서 마케팅 활동에 참여하고 있으며, 로폴더와 Limited™ 채널을 통해 다양한 유저 소통과 채널 활성화를 경험했습니다.',
        'Participating as a marketer at LUXERET, planning marketing campaigns and gaining experience in user communication and channel growth through RoFolder and Limited™.'
      ),
    },
    {
      title: t('웹 서비스 기획 & 개발', 'Web Service Development'),
      description: t(
        'Design Pick, 나랏말싸미, Planor 등 실제 작동하는 웹 서비스들을 직접 기획하고 구현합니다.',
        'Directly planning and implementing functional web services like Design Pick, Naramarsami, and Planor.'
      ),
    },
    {
      title: t('비즈니스 운영', 'Business Operations'),
      description: t(
        '로폴더(RoFolder)의 CEO로서 청소년 및 청년 창업 활성화를 장려하는 네트워킹 커뮤니티를 총괄하고 운영을 이끕니다.',
        'Leading and managing networking communities that support and encourage youth startups as the CEO of RoFolder.'
      ),
    },
  ];

  const stats = [
    {
      label: t('경력 수', 'Organizations'),
      value: '4',
      proof: t(
        '로폴더 CEO, Limited™ Founder, LUXERET 마케터, HANN LABS™ 스태프 디자이너 등 4개 조직에서 다양한 역할을 경험하며 실무 역량을 길렀습니다.',
        'Various role experiences across 4 organizations - RoFolder CEO, Limited™ Founder, LUXERET Marketer, and HANN LABS™ Staff Designer - proving cross-disciplinary experience.'
      )
    },
    {
      label: t('소통 유저 수', 'Users Reached'),
      value: '1,200+',
      proof: t(
        '총합 1,200명 이상의 로폴더 및 Limited™ 커뮤니티 유저들과 직접 소통하며 채널을 관리하고 피드백을 모았습니다.',
        'Communicating with over 1,200 users in RoFolder and Limited™ communities, managing channels and gathering feedback.'
      )
    },
    {
      label: t('누적 프로젝트', 'Projects Done'),
      value: '3+',
      proof: t(
        'Design Pick, Planor, 나랏말싸미 등 실제 기획하고 론칭한 웹 서비스 경험을 바탕으로 실전 문제 해결력을 기르고 있습니다.',
        'Planning and launching functional web services like Design Pick, Planor, and Naramarsami, building practical problem-solving capabilities.'
      )
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden border-b border-zinc-900"
      style={{ perspective: 1200 }}
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl space-y-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
          
          {/* Main Info Side */}
          <div className="space-y-12">
            <div className="space-y-4">
              <p className="section-overline">ABOUT</p>
              <h2 className="section-title mt-2 font-display bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent font-bold">
                {t('디자인, 마케팅, 프로그래밍.', 'Design, Marketing, Programming.')}
              </h2>
              <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-zinc-200 font-normal">
                {t(
                  '시각적인 균형을 디자인하고, 효과적인 마케팅 전략을 고민하며, 논리적인 구조와 깨끗한 코드로 웹 서비스를 구현합니다. 단순히 단일 업무에 머무르지 않고, 아이디어를 직접 실현해내는 구조적 크리에이터를 지향합니다.',
                  'Designing visual balance, planning effective marketing strategies, and implementing web services with logical structure and clean code. I aim to be a structural creator who directly realizes ideas rather than staying within a single task.'
                )}
              </p>
            </div>

            {/* 3D Animated Card Grid */}
            <motion.div 
              style={{
                rotateX,
                rotateY,
                translateZ,
                opacity,
                scale,
                transformStyle: "preserve-3d"
              }}
              className="grid gap-6 sm:grid-cols-2"
            >
              {details.map((item, index) => (
                <GlowCard
                  key={index}
                  className="glass-card p-8 border border-zinc-900 bg-zinc-950/40 shadow-2xl transition-all duration-300"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <h3 className="text-sm sm:text-base font-bold text-white mb-3 font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 font-normal">
                    {item.description}
                  </p>
                </GlowCard>
              ))}
            </motion.div>
          </div>

          {/* Profile Card Side */}
          <GlowCard className="glass-card p-8 sm:p-10 border border-zinc-900 bg-zinc-950/50 shadow-2xl lg:sticky lg:top-28">
            <p className="section-overline">PROFILE</p>
            <div className="mt-8 space-y-6 text-zinc-300">
              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, type: 'spring', damping: 20 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 shadow-inner"
              >
                <p className="text-[11px] font-bold text-zinc-400 tracking-wide uppercase">
                  {t('활동 분야', 'Areas of Activity')}
                </p>
                <p className="mt-2 text-xs sm:text-sm font-bold text-white font-display">
                  CEO / Founder / Marketer / Designer
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, type: 'spring', damping: 20 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 shadow-inner"
              >
                <p className="text-[11px] font-bold text-zinc-400 tracking-wide uppercase">
                  {t('소속 및 역할', 'Affiliation & Role')}
                </p>
                <p className="mt-2 text-xs sm:text-sm font-bold text-white font-sans leading-relaxed">
                  RoFolder CEO · Limited™ Founder · LUXERET Marketer · HANN LABS™ Staff Designer
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: 'spring', damping: 20 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 shadow-inner"
              >
                <p className="text-[11px] font-bold text-zinc-400 tracking-wide uppercase">
                  {t('핵심 지향점', 'Core Approach')}
                </p>
                <p className="mt-2 text-xs sm:text-sm font-bold text-white font-sans leading-relaxed">
                  {t(
                    '사용자 피드백 중심 설계, 스토리텔링 및 주도적 서비스 빌딩',
                    'User feedback-centric design, storytelling, and proactive service building'
                  )}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: 'spring', damping: 20 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 shadow-inner"
              >
                <p className="text-[11px] font-bold text-zinc-400 tracking-wide uppercase">
                  {t('주요 강점', 'Key Strengths')}
                </p>
                <p className="mt-2 text-xs sm:text-sm font-bold text-white font-sans leading-relaxed">
                  {t(
                    '비주얼 디렉션 · 유저 인터랙션 기획 · 커뮤니티 매니지먼트',
                    'Visual Direction · Interaction Planning · Community Management'
                  )}
                </p>
              </motion.div>
            </div>
          </GlowCard>
        </div>

        {/* Interactive Stats Grid (What it Proves) */}
        <div className="pt-16 border-t border-zinc-900/80">
          <div className="text-center mb-10">
            <p className="section-overline">METRICS & EVIDENCE</p>
            <h3 className="text-2xl font-bold tracking-tight text-white font-display mt-2">{t('지표와 증명', 'Metrics & Proof')}</h3>
            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">{t('각 지표를 클릭하여 증명하는 역량을 확인해보세요', 'Click each metric to verify capabilities')}</p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto">
            {stats.map((stat, idx) => {
              const isActive = activeStat === idx;
              return (
                <GlowCard
                  key={idx}
                  layout
                  onClick={() => setActiveStat(isActive ? null : idx)}
                  className={`glass-card p-6 text-center border transition-all duration-300 cursor-pointer ${
                    isActive ? 'border-white bg-zinc-950/80' : 'border-zinc-900 bg-zinc-950/20'
                  }`}
                >
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-extrabold tracking-tight text-white font-display mb-3">
                    {stat.value}
                  </p>
                  <div className="h-px w-8 bg-zinc-800 mx-auto mb-3" />
                  
                  <div className="relative overflow-hidden min-h-[40px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.p
                          key="proof"
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                          className="text-[11px] leading-relaxed text-zinc-200 font-normal"
                        >
                          {stat.proof}
                        </motion.p>
                      ) : (
                        <motion.p
                          key="click-me"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.5 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="text-[11px] text-zinc-450 font-bold tracking-wide"
                        >
                          CLICK TO EXPLAIN
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
