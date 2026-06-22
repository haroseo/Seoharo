import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 3D Perspective Transformations based on scroll
  const rotateX = useTransform(scrollYProgress, [0.1, 0.5], [25, 0]);
  const rotateY = useTransform(scrollYProgress, [0.1, 0.5], [-12, 0]);
  const translateZ = useTransform(scrollYProgress, [0.1, 0.5], [-150, 0]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0.4, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.9, 1]);

  const details = [
    {
      title: 'Creative process',
      description:
        '브랜드와 서비스를 위한 전략적 아이디어를 설계하고, 실행 가능한 형태로 연결합니다.',
    },
    {
      title: 'Growth marketing',
      description:
        '데이터 분석 및 커뮤니티 활성화를 토대로 유저 유입 퍼널을 확장하고 성장을 가속합니다.',
    },
    {
      title: 'Visual craft',
      description:
        '정교한 타이포그래피와 시각적 규칙을 정립하여 일관성 있는 비주얼 시스템을 구축합니다.',
    },
    {
      title: 'Reliable execution',
      description:
        '직관적인 디자인과 안정적인 코딩 기술을 결합하여 완성도 높은 디지털 제품을 실현합니다.',
    },
  ];

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden"
      style={{ perspective: 1200 }}
    >
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-100 to-transparent pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
          
          {/* Main Info Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="section-overline">About</p>
              <h2 className="section-title mt-2 font-bold text-slate-950">
                디자인과 경험을 연결하는,<br/>서하루입니다.
              </h2>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-600 font-light">
                사용자 중심의 인터페이스, 감각적인 브랜드 디자인, 그리고 유저 심리를 꿰뚫는 마케팅 퍼널을 결합합니다. 
                단순히 보기 좋은 디자인을 넘어 비즈니스가 지속 성장할 수 있는 구조적 경험을 설계합니다.
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
                <div
                  key={index}
                  className="glass-card p-8 border border-slate-200/80 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_-5px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 bg-white/70 backdrop-blur-md"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <h3 className="text-xl font-bold text-slate-950 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-700 font-light">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Profile Card Side */}
          <div className="glass-card p-8 sm:p-10 border border-slate-200 bg-white/80 backdrop-blur-md shadow-lg sticky top-28">
            <p className="section-overline">Profile</p>
            <div className="mt-8 space-y-6 text-slate-700">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm hover:shadow transition-all">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  Role
                </p>
                <p className="mt-2 text-lg font-bold text-slate-950">
                  Brand Designer, Marketer, & CEO
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm hover:shadow transition-all">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  Approach
                </p>
                <p className="mt-2 text-lg font-bold text-slate-950">
                  깔끔한 아이디어, 고객과의 활발한 교류, 빠른 연락
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm hover:shadow transition-all">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  Focus
                </p>
                <p className="mt-2 text-lg font-bold text-slate-950">
                  브랜드 · UX · 마케팅 · Programming
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
