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
      keywords: [t('가상 플랫폼', 'Virtual Sandbox'), t('창작 입문', 'Sandbox Entry')],
      title: t('가상 플랫폼 창작 입문', 'Virtual Sandbox Entry'),
      description: t('가상 플랫폼에서 작동법을 배우며 프로그래밍을 처음으로 접했습니다.', 'Learned first scripting principles on a virtual platform, experiencing the fun of building interactive worlds.'),
    },
    {
      phase: 'Phase 02',
      keywords: [t('소프트웨어 기초', 'Software'), t('논리 학습', 'Logic Foundation')],
      title: t('컴퓨터 프로그래밍 기초 공부', 'Software Principles'),
      description: t('컴퓨터 소프트웨어의 기초를 공부하며 논리적인 개념을 익혔습니다.', 'Acquired programming logic foundations and structured logical reasoning.'),
    },
    {
      phase: 'Phase 03',
      keywords: [t('팀 프로젝트', 'Collaboration'), t('협업', 'Projects')],
      title: t('팀 프로젝트 참여', 'Project Collaboration'),
      description: t('팀 프로젝트에 참여하며 소통하는 방법과 여러 가지 개발/디자인 도구를 손에 익혔습니다.', 'Joined group projects, learning team communications and creative tools.'),
    },
    {
      phase: 'Phase 04',
      keywords: [t('에셋 제작', 'Planning'), t('운영', 'Leadership')],
      title: t('에셋 기획 및 서비스 운영', 'Idea Realization & Management'),
      description: t('직접 가상 공간 에셋과 플랫폼 디자인을 기획하고 채널을 이끌어 보았습니다.', 'Led game asset production and interface designs, taking ownership of project direction.'),
    },
    {
      phase: 'Phase 05',
      keywords: [t('디자인', 'Design'), t('마케팅', 'Web'), t('개발', 'Marketing')],
      title: t('디자인·마케팅·개발 학습', 'Design, Marketing & Dev Studies'),
      description: t('디자인 툴, 마케팅 방식, 모던 웹 코딩을 고루 공부하며 다방면으로 생각하는 눈을 길렀습니다.', 'Studied visual design, marketing practices, and web development to build cross-disciplinary creative skills.'),
    },
    {
      phase: 'Phase 06',
      keywords: [t('커뮤니티 운영', 'Community'), t('서비스 론칭', 'Feedback')],
      title: t('로폴더 및 Limited™ 운영', 'RoFolder & Limited™ Operations'),
      description: t('직접 커뮤니티 공간을 꾸려 소통하고, 유저 피드백을 받아 서비스를 고치며 배운 점들을 정리해 나가고 있습니다.', 'Managed user channels, gathered feedback, and built practical experience in community operations.'),
    },
  ];

  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-b border-zinc-900 relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="section-overline">JOURNEY</p>
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
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/40 transition-all duration-500 group-hover:bg-white group-hover:border-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:scale-130 z-10 mt-2" />

                {/* Content */}
                <div className={`w-full pl-16 md:pl-0 md:w-[45%] flex flex-col ${
                  index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'
                }`}>
                  <div className={`flex flex-wrap items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <span className="text-[10px] font-sans font-bold text-[#18a0fb] tracking-widest uppercase select-none">
                      {event.phase}
                    </span>
                    <div className="hidden md:block h-px w-4 bg-[#373737]" />
                    <div className="flex flex-wrap gap-2.5">
                      {event.keywords.map(kw => (
                        <span key={kw} className="text-[10px] font-bold tracking-wide text-zinc-450 group-hover:text-zinc-200 transition-all duration-500">
                          #{kw}
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
                      className={`mt-4 text-xs sm:text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors duration-500 leading-relaxed max-w-sm apple-widget p-6 ${index % 2 === 0 ? 'ml-auto text-left md:text-right' : 'mr-auto text-left'}`}
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
