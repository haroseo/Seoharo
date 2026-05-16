import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Timeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const timelineEvents = [
    {
      year: '2021',
      keywords: ['Roblox', 'Creation', 'Basics'],
      title: 'Roblox Development',
      description: '로블록스 플랫폼에서 처음 개발을 시작하며 창작의 기초를 다졌습니다.',
    },
    {
      year: '2022',
      keywords: ['Python', 'Programming', 'Basics'],
      title: 'Python Journey Begins',
      description: '파이썬을 배우며 프로그래밍에 본격적으로 관심을 갖고 기초를 다졌습니다.',
    },
    {
      year: '2023',
      keywords: ['Collaboration', 'Skills', 'Projects'],
      title: 'Project Participation',
      description: '여러 프로젝트에 참여하며 협업의 경험과 다양한 기술을 습득했습니다.',
    },
    {
      year: '2024',
      keywords: ['Leadership', 'Ownership', 'Launch'],
      title: 'Leadership & Ownership',
      description: '프로젝트를 직접 주도하며 리더십을 키우고 완성도 높은 결과물을 만들었습니다.',
    },
    {
      year: '2025',
      keywords: ['Design', 'Security', 'Web'],
      title: 'Multi-Domain Mastery',
      description: '디자인, 개발, 보안 등 다양한 분야를 학습하며 전문성을 확장했습니다.',
    },
    {
      year: '2026',
      keywords: ['Scale', 'Community', 'Operation'],
      title: 'Scale & Community',
      description: '3개 서버 운영으로 2000명 유저와 교감하며 제품 설계와 커뮤니티 관리에 집중합니다.',
    },
  ];

  return (
    <section id="journey" className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Journey</p>
          <h2 className="section-title mt-4 mb-6">From Ideas to Impact</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-500 font-light">
            5년간의 디지털 창작 여정. 각 지점에 마우스를 올려 상세한 스토리를 확인해보세요.
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* Main vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 transform md:-translate-x-1/2" />

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
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-slate-200 border-4 border-white transition-all duration-500 group-hover:bg-slate-950 group-hover:scale-150 z-10 mt-1.5" />

                {/* Content */}
                <div className={`w-full pl-20 md:pl-0 md:w-[45%] flex flex-col ${
                  index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'
                }`}>
                  <div className={`flex flex-wrap items-center gap-4 mb-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <span className="text-4xl font-light tracking-tight text-slate-300 group-hover:text-slate-900 transition-colors duration-500">
                      {event.year}
                    </span>
                    <div className="hidden md:block h-px w-12 bg-slate-200 group-hover:bg-slate-400 transition-colors duration-500" />
                    <div className="flex flex-wrap gap-2">
                      {event.keywords.map(kw => (
                        <span key={kw} className="px-2 py-1 bg-slate-50 text-xs font-medium uppercase tracking-widest text-slate-400 rounded group-hover:bg-slate-100 group-hover:text-slate-600 transition-colors duration-500">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative mt-2">
                    <h3 className="text-2xl font-semibold text-slate-800 group-hover:text-slate-950 transition-colors duration-500">
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
                          <div className={`mt-4 text-sm text-slate-600 leading-relaxed max-w-sm rounded-2xl bg-slate-50/80 backdrop-blur-sm p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
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
          className="mt-40 grid gap-6 grid-cols-2 md:grid-cols-4"
        >
          {[
            { label: 'Years Active', value: '5+' },
            { label: 'Projects Built', value: '20+' },
            { label: 'Active Users', value: '2000+' },
            { label: 'Communities', value: '3' },
          ].map((stat, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-[0_8px_24px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.06)] transition-all duration-500"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-4 group-hover:text-slate-500 transition-colors">
                {stat.label}
              </p>
              <p className="text-4xl md:text-5xl font-light tracking-tight text-slate-900">{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
