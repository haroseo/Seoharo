import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function GlowCard({ children, className = "", style = {} }: { children: React.ReactNode, className?: string, style?: any }) {
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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: -9999, y: -9999 });
      }}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(34, 211, 238, 0.08), transparent 80%)`
        }}
      />
      {children}
    </div>
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

  const details = [
    {
      title: 'Creative design',
      description:
        '전략적 브랜딩 가이드와 섬세한 타이포그래피 규칙을 설계하여 가독성 높은 인터페이스를 이끌어냅니다.',
    },
    {
      title: 'Growth marketing',
      description:
        '사용자의 흥미를 파악하고 커뮤니티 및 소셜 채널 운영을 연계하여 효율적인 도달을 만듭니다.',
    },
    {
      title: 'Technical programming',
      description:
        'React, TypeScript, Python, Lua 등 안정적인 백엔드 시스템 및 깔끔한 웹을 구축합니다.',
    },
    {
      title: 'Execution & Launch',
      description:
        '아이디어를 실행 가능한 데이터로 정립하고 다차원적으로 검증하여 완성도 높은 프로덕트를 만듭니다.',
    },
  ];

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden border-b border-zinc-900"
      style={{ perspective: 1200 }}
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] items-start">
          
          {/* Main Info Side */}
          <div className="space-y-12">
            <div className="space-y-4">
              <p className="section-overline">[01 // IDENTITY]</p>
              <h2 className="section-title mt-2 font-display bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                디자인과 코드를 융합해<br/>스토리를 구축합니다.
              </h2>
              <p className="max-w-3xl text-sm md:text-base leading-relaxed text-zinc-400 font-light">
                시각적 질감과 정교한 설계 규칙을 결합합니다. 
                사용자가 공감할 수 있는 브랜드 디자인 가이드라인을 세우고, 
                자동화된 논리와 깨끗한 코드로 안정적인 웹 서비스를 구현하며, 
                유저 유입에 집중하는 다방면적인 개발 마인드를 지향합니다.
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
                  <h3 className="text-lg font-bold text-white mb-3 font-display">
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
            <p className="section-overline">[MAKER PROFILE]</p>
            <div className="mt-8 space-y-6 text-zinc-400">
              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, type: 'spring', damping: 20 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-zinc-900 bg-zinc-900/20 p-5 shadow-inner"
              >
                <p className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                  Current Roles
                </p>
                <p className="mt-2 text-sm font-bold text-white font-display">
                  Brand Designer, Marketer, & CEO
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
                  Approach
                </p>
                <p className="mt-2 text-sm font-bold text-white">
                  간결한 직관성, 피드백 기반 최적화, 빠른 커뮤니케이션
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
                  Core Fields
                </p>
                <p className="mt-2 text-sm font-bold text-white">
                  Branding · User Experience · Performance · System Code
                </p>
              </motion.div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
