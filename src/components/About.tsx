import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

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

  // 3D Perspective Transformations based on scroll
  const rotateX = useTransform(scrollYProgress, [0.1, 0.5], [20, 0]);
  const rotateY = useTransform(scrollYProgress, [0.1, 0.5], [-10, 0]);
  const translateZ = useTransform(scrollYProgress, [0.1, 0.5], [-100, 0]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.95, 1]);

  const [activeStat, setActiveStat] = useState<number | null>(null);

  const details = [
    {
      title: '시각 디자인',
      description:
        '브랜드 아이덴티티와 규칙적인 타이포그래피 설계를 바탕으로 명확하고 균형 잡힌 인터페이스를 도출합니다.',
    },
    {
      title: '브랜드 마케팅',
      description:
        '소셜 채널 운영 및 타겟 타게팅 기획을 통해 유입 경로를 다지며, 커뮤니티 성장을 이끌어냅니다.',
    },
    {
      title: '시스템 개발',
      description:
        'TypeScript와 Lua 등을 사용하여 가동성이 높고 신뢰할 수 있는 자동화 논리 및 웹 시스템을 구현합니다.',
    },
    {
      title: '기획과 실행',
      description:
        '상상하는 아이디어를 현실적인 구조로 정의하고 빠르게 검증하여 실질적으로 기능하는 산출물을 만듭니다.',
    },
  ];

  const stats = [
    {
      label: '경력 수',
      value: '5',
      proof: '다양한 팀에서의 협업 경력은 주도적인 실행력과 프로덕트 완수의 신뢰도를 증명합니다.'
    },
    {
      label: '소통 유저 수',
      value: '1,200+',
      proof: '다양한 개성을 가진 많은 유저들과의 깊은 커뮤니케이션은 사용자 니즈 분석 능력을 증명합니다.'
    },
    {
      label: '운영 커뮤니티',
      value: '2',
      proof: '로폴더 및 Limited™ 등 두 대형 커뮤니티의 총괄 운영은 탄탄한 기획 및 리더십을 증명합니다.'
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden border-b border-zinc-900"
      style={{ perspective: 1200 }}
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl space-y-24">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] items-start">
          
          {/* Main Info Side */}
          <div className="space-y-12">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-mono">ABOUT</p>
              <h2 className="section-title mt-2 font-display bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent font-bold">
                디자인, 마케팅, 코딩을 융합합니다.
              </h2>
              <p className="max-w-3xl text-sm leading-relaxed text-zinc-400 font-light">
                균형 잡힌 시각 가이드라인을 세우고, 마케팅 전략을 고민하며, 
                자동화된 논리와 깨끗한 코드로 웹 서비스를 구현합니다. 
                단순히 단일 업무에 머무르지 않고, 비즈니스 아이디어를 구현해내는 구조적 크리에이터를 지향합니다.
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
                  <h3 className="text-sm font-bold text-white mb-3 font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-400 font-light">
                    {item.description}
                  </p>
                </GlowCard>
              ))}
            </motion.div>
          </div>

          {/* Profile Card Side */}
          <GlowCard className="glass-card p-8 sm:p-10 border border-zinc-900 bg-zinc-950/50 shadow-2xl sticky top-28">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-mono">PROFILE</p>
            <div className="mt-8 space-y-6 text-zinc-400">
              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, type: 'spring', damping: 20 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 shadow-inner"
              >
                <p className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                  활동 분야
                </p>
                <p className="mt-2 text-xs font-bold text-white font-display">
                  디자이너, 마케터 & 커뮤니티 대표
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, type: 'spring', damping: 20 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 shadow-inner"
              >
                <p className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                  핵심 지향점
                </p>
                <p className="mt-2 text-xs font-bold text-white">
                  간결한 직관성, 피드백 기반 최적화, 신속한 소통
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: 'spring', damping: 20 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 shadow-inner"
              >
                <p className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                  주요 강점
                </p>
                <p className="mt-2 text-xs font-bold text-white">
                  브랜드 아이덴티티 · 유저 인터랙션 · 자동화 로직 설계
                </p>
              </motion.div>
            </div>
          </GlowCard>
        </div>

        {/* Interactive Stats Grid (What it Proves) */}
        <div className="pt-16 border-t border-zinc-900/80">
          <div className="text-center mb-10">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500">METRICS & EVIDENCE</p>
            <h3 className="text-2xl font-bold tracking-tight text-white font-display mt-2">지표와 증명</h3>
            <p className="text-xs text-zinc-500 font-mono mt-1 uppercase tracking-widest">각 지표를 클릭하여 증명하는 역량을 확인해보세요</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {stats.map((stat, idx) => {
              const isActive = activeStat === idx;
              return (
                <GlowCard
                  key={idx}
                  layout
                  onClick={() => setActiveStat(isActive ? null : idx)}
                  className={`glass-card p-6 text-center border transition-all duration-300 cursor-pointer ${
                    isActive ? 'border-white bg-zinc-905/80' : 'border-zinc-900 bg-zinc-950/20'
                  }`}
                >
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-550 mb-2">
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
                          className="text-[11px] leading-relaxed text-zinc-350"
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
                          className="text-[10px] text-zinc-550 font-mono tracking-widest"
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
