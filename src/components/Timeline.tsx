import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from './LanguageContext';

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Soft spring for buttery smooth line drawing
  const scaleY = useSpring(scrollYProgress, { stiffness: 70, damping: 26 });

  const timelineEvents = [
    {
      phase: 'Phase 01',
      keywords: [t('가상 Sandbox', 'Virtual Sandbox'), t('개발 입문', 'Sandbox Entry')],
      title: t('가상 Sandbox 창작 입문', 'Virtual Sandbox Entry'),
      description: t('가상 플랫폼 상에서 최초로 작동 원리를 배우며 프로그래밍의 기초와 창작의 재미를 깨달았습니다.', 'Learned first scripting principles on a virtual platform, experiencing the fun of building interactive worlds.'),
    },
    {
      phase: 'Phase 02',
      keywords: [t('소프트웨어', 'Software'), t('논리 학습', 'Logic Foundation')],
      title: t('컴퓨터 소프트웨어 학습', 'Software Principles'),
      description: t('프로그래밍 기초 지식을 습득하고, 논리적이고 구조화된 사고의 틀을 정립했습니다.', 'Acquired programming logic foundations and structured logical reasoning.'),
    },
    {
      phase: 'Phase 03',
      keywords: [t('협업', 'Collaboration'), t('프로젝트', 'Projects')],
      title: t('다각적 프로젝트 기획 참여', 'Project Collaboration'),
      description: t('팀 단위 활동에 참여하여 소통하는 방법과 다양한 디자인/개발 도구 활용법을 다각도로 익혔습니다.', 'Joined group projects, learning team communications and creative tools.'),
    },
    {
      phase: 'Phase 04',
      keywords: [t('주도적 기획', 'Planning'), t('리더십', 'Leadership')],
      title: t('아이디어 구현과 운영 책임', 'Idea Realization & Management'),
      description: t('직접 가상 에셋과 플랫폼 디자인 구성을 총괄하며 주도적으로 서비스를 설계하고 관리했습니다.', 'Led game asset production and interface designs, taking ownership of project direction.'),
    },
    {
      phase: 'Phase 05',
      keywords: [t('디자인', 'Design'), t('개발', 'Web'), t('마케팅', 'Marketing')],
      title: t('디자인, 마케팅, 프로그래밍 학습', 'Design, Marketing & Dev Studies'),
      description: t('시각 디자인, 마케팅 전개 방식, 모던 웹 기술 등을 포괄적으로 공부하며 다방면의 크리에이티브 시각을 얻었습니다.', 'Studied visual design, marketing practices, and web development to build cross-disciplinary creative skills.'),
    },
    {
      phase: 'Phase 06',
      keywords: [t('커뮤니티', 'Community'), t('사용자 피드백', 'Feedback')],
      title: t('로폴더 및 Limited™ 본격 운영', 'RoFolder & Limited™ Operations'),
      description: t('다수의 유저와 소통하는 공간을 설계하고 피드백을 반영하며, 실질적인 커뮤니티 경험을 다졌습니다.', 'Managed user channels, gathered feedback, and built practical experience in community operations.'),
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
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-550 font-mono">JOURNEY</p>
          <h2 className="section-title mt-4 mb-6 font-display bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent font-bold">
            {t('성장 여정', 'Growth Journey')}
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-zinc-200 font-normal leading-relaxed">
            {t('한 걸음씩 배우고 경험하며 쌓아 올린 기록입니다.', 'A record of learning and experiencing step by step.')}
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-start md:justify-between group ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
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
                    <span className="text-xl font-light tracking-tight text-zinc-650 group-hover:text-white transition-colors duration-500 font-mono">
                      {event.phase}
                    </span>
                    <div className="hidden md:block h-px w-8 bg-zinc-850 group-hover:bg-zinc-700 transition-colors duration-500" />
                    <div className="flex flex-wrap gap-2">
                      {event.keywords.map(kw => (
                        <span key={kw} className="px-2.5 py-0.5 bg-zinc-950 border border-zinc-900 text-[10px] font-medium tracking-wide text-zinc-400 rounded-lg group-hover:text-zinc-200 transition-colors duration-500">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative mt-2 w-full">
                    <h3 className="text-lg font-bold text-zinc-300 group-hover:text-white transition-colors duration-500 font-display">
                      {event.title}
                    </h3>
                    <motion.div 
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className={`mt-4 text-xs sm:text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors duration-500 leading-relaxed max-w-sm rounded-2xl bg-zinc-950 border border-zinc-900 shadow-2xl p-5 ${index % 2 === 0 ? 'ml-auto text-left md:text-right' : 'mr-auto text-left'}`}
                    >
                      {event.description}
                    </motion.div>
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
