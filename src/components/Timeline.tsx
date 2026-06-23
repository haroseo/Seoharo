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
      keywords: ['Roblox', 'Creation', 'Basics'],
      title: 'Roblox Development',
      description: '로블록스 플랫폼에서 처음 개발을 시작하며 창작의 기초를 다졌습니다.',
    },
    {
      phase: 'Phase 02',
      keywords: ['Python', 'Programming', 'Basics'],
      title: 'Python Journey Begins',
      description: '파이썬을 배우며 프로그래밍에 본격적으로 관심을 갖고 기초를 다졌습니다.',
    },
    {
      phase: 'Phase 03',
      keywords: ['Collaboration', 'Skills', 'Projects'],
      title: 'Project Participation',
      description: '여러 프로젝트에 참여하며 협업의 경험과 다양한 기술을 습득했습니다.',
    },
    {
      phase: 'Phase 04',
      keywords: ['Leadership', 'Ownership', 'Launch'],
      title: 'Leadership & Ownership',
      description: '프로젝트를 직접 주도하며 리더십을 키우고 완성도 높은 결과물을 만들었습니다.',
    },
    {
      phase: 'Phase 05',
      keywords: ['Design', 'Security', 'Web'],
      title: 'Multi-Domain Mastery',
      description: '디자인, 개발, 보안 등 다양한 분야를 학습하며 전문성을 확장했습니다.',
    },
    {
      phase: 'Phase 06',
      keywords: ['Scale', 'Community', 'Operation'],
      title: 'Scale & Community',
      description: 'Rofolder 및 Limited™ 서버 운영으로 유저들과 소통하며 성장 가치를 만듭니다.',
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
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-500 font-mono">[02 // MILESTONES]</p>
          <h2 className="section-title mt-4 mb-6 font-display bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            From Ideas to Impact
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-zinc-400 font-light leading-relaxed">
            디지털 공간에서 가치를 창출하기 위한 점진적인 단계별 여정입니다.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative mt-16">
          {/* Background vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-zinc-900 transform md:-translate-x-1/2" />
          
          {/* Scroll-driven active path */}
          <motion.div 
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-cyan-400/80 shadow-[0_0_8px_#22d3ee] transform md:-translate-x-1/2" 
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
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-800 border-4 border-black transition-all duration-500 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_#22d3ee] group-hover:scale-150 z-10 mt-1.5" />

                {/* Content */}
                <div className={`w-full pl-20 md:pl-0 md:w-[45%] flex flex-col ${
                  index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'
                }`}>
                  <div className={`flex flex-wrap items-center gap-4 mb-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <span className="text-2xl font-light tracking-tight text-zinc-600 group-hover:text-cyan-400 transition-colors duration-500 font-mono">
                      {event.phase}
                    </span>
                    <div className="hidden md:block h-px w-8 bg-zinc-800 group-hover:bg-cyan-900 transition-colors duration-500" />
                    <div className="flex flex-wrap gap-2">
                      {event.keywords.map(kw => (
                        <span key={kw} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[10px] font-medium uppercase tracking-widest text-zinc-500 rounded group-hover:text-zinc-300 transition-colors duration-500">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative mt-2">
                    <h3 className="text-xl font-bold text-zinc-300 group-hover:text-white transition-colors duration-500 font-display">
                      {event.title}
                    </h3>
                    
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-40 grid gap-6 grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto"
        >
          {[
            { label: 'Domains Covered', value: 'Design & Code' },
            { label: 'Active Users Managed', value: '1,200+' },
            { label: 'Core Communities', value: '2 Servers' },
          ].map((stat, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-zinc-900 bg-zinc-950/60 p-8 text-center shadow-xl hover:border-zinc-800 transition-all duration-500"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-4 group-hover:text-zinc-400 transition-colors">
                {stat.label}
              </p>
              <p className="text-2xl md:text-3xl font-light tracking-tight text-white font-display">{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
