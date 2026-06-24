import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useState, useRef } from 'react';

export default function Timeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Soft spring for buttery smooth line drawing
  const scaleY = useSpring(scrollYProgress, { stiffness: 70, damping: 26 });

  const timelineEvents = [
    {
      phase: 'Phase 01',
      keywords: ['Roblox', '개발의 기초'],
      title: '로블록스 개발 입문',
      description: '가상 플랫폼 상에서 최초로 논리 구동 방식을 배우며 프로그래밍의 원리와 창작의 재미를 깨달았습니다.',
    },
    {
      phase: 'Phase 02',
      keywords: ['Python', '알고리즘'],
      title: '파이썬 기반 프로그래밍 학습',
      description: '파이썬 언어를 활용해 구조적인 코딩 방식과 알고리즘적 사고의 토대를 확립했습니다.',
    },
    {
      phase: 'Phase 03',
      keywords: ['협업', '실무 경험'],
      title: '다각적 프로젝트 기획 참여',
      description: '팀 단위 창작에 참여하여 요구사항 정의, 커뮤니케이션, 다양한 실무 툴 사용법을 익혔습니다.',
    },
    {
      phase: 'Phase 04',
      keywords: ['주도적 기획', '리더십'],
      title: '아이디어 구현과 운영 책임',
      description: '직접 가상 자산 배포 및 서비스 레이아웃을 주도하며 주체적인 프로덕트 리더십을 형성했습니다.',
    },
    {
      phase: 'Phase 05',
      keywords: ['디자인', '개발', '보안'],
      title: '다중 영역 융합 시도',
      description: '인터페이스 비주얼 설계, 정보 보호, 모던 웹 프론트엔드를 통합 학습하며 크리에이터로서의 역량을 다졌습니다.',
    },
    {
      phase: 'Phase 06',
      keywords: ['커뮤니티 운영', '성장 데이터'],
      title: '로폴더 및 Limited™ 본격 운영',
      description: '1,200명 이상의 유저와 상호작용하는 대형 서버들을 직접 총괄 관리하며 비즈니스 데이터의 흐름을 조율하고 있습니다.',
    },
  ];

  return (
    <section id="journey" className="py-32 px-4 sm:px-6 lg:px-8 bg-black border-b border-zinc-900 relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-mono">JOURNEY</p>
          <h2 className="section-title mt-4 mb-6 font-display bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent font-bold">
            성장 여정
          </h2>
          <p className="mx-auto max-w-2xl text-xs text-zinc-500 font-mono uppercase tracking-widest leading-relaxed">
            마일스톤을 통해 다져온 성장의 기록입니다.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative mt-16">
          {/* Background vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800/80 transform md:-translate-x-1/2" />
          
          {/* Scroll-driven active path in monochrome white */}
          <motion.div 
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)] transform md:-translate-x-1/2" 
          />

          <div className="space-y-20">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`relative flex items-start md:justify-between group ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Desktop Empty side */}
                <div className="hidden md:block w-[45%]" />

                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-black border-2 border-zinc-700 transition-all duration-500 group-hover:bg-white group-hover:border-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:scale-130 z-10 mt-1.5" />

                {/* Content */}
                <div className={`w-full pl-20 md:pl-0 md:w-[45%] flex flex-col ${
                  index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'
                }`}>
                  <div className={`flex flex-wrap items-center gap-4 mb-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <span className="text-xl font-light tracking-tight text-zinc-600 group-hover:text-white transition-colors duration-500 font-mono">
                      {event.phase}
                    </span>
                    <div className="hidden md:block h-px w-8 bg-zinc-850 group-hover:bg-zinc-700 transition-colors duration-500" />
                    <div className="flex flex-wrap gap-2">
                      {event.keywords.map(kw => (
                        <span key={kw} className="px-2.5 py-0.5 bg-zinc-950 border border-zinc-900 text-[10px] font-medium tracking-wide text-zinc-500 rounded-lg group-hover:text-zinc-300 transition-colors duration-500">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative mt-2">
                    <h3 className="text-lg font-bold text-zinc-350 group-hover:text-white transition-colors duration-500 font-display">
                      {event.title}
                    </h3>
                    
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -12, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -12, scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                          className="overflow-hidden"
                        >
                          <div className={`mt-4 text-xs text-zinc-400 leading-relaxed max-w-sm rounded-2xl bg-zinc-950 border border-zinc-900 shadow-2xl p-5 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                            {event.description}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
