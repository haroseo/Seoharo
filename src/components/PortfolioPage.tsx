import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Compass, Sparkles, Award } from 'lucide-react';

interface DisplayItem {
  id: string;
  type: 'discord' | 'site' | 'project';
  title: string;
  slogan?: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  achievements?: string[];
  details?: {
    background: string;
    strategy: string;
    metrics?: string;
  };
}

export default function PortfolioPage() {
  const [selectedItem, setSelectedItem] = useState<DisplayItem | null>(null);

  // Map database data into clear categorizations: Discord, Site, Project
  const displayItems: DisplayItem[] = [
    // Discord Category
    {
      id: 'rofolder',
      type: 'discord',
      title: '로폴더 (RoFolder)',
      slogan: '당신의 스토리를 성공의 데이터로, 로폴더',
      description: '청소년 및 청년의 스타트업 창업을 독려하고 지원하는 디스코드 대표 커뮤니티입니다.',
      tags: ['대표 // CEO', 'Branding', 'Community Operation'],
      link: 'https://discord.com/users/seoharo',
      achievements: [
        '청소년 및 청년 창업 활성화를 장려하는 네트워킹 서버 운영',
        '스타트업 아이디어 매칭 지원 및 커뮤니티 이벤트 기획',
        '브랜드 아이덴티티 확립 및 공식 로고 디자인 리뉴얼 주도'
      ]
    },
    {
      id: 'limited',
      type: 'discord',
      title: 'Limited™',
      slogan: '오직 나만을 위한 제품, Limited™',
      description: '최상급 무료배포와 게임 창작 환경에 맞는 프리미엄 리소스를 제공하는 공간입니다.',
      tags: ['설립자 // Founder', 'Asset Curation', 'Figma Design'],
      achievements: [
        '게임 개발에 즉시 사용 가능한 무료 에셋 및 유용한 리소스 배포',
        '사용자 피드백 기반 리소스 구성 최적화 및 커뮤니티 채널 관리'
      ]
    },
    // Site Category
    {
      id: 'designpick',
      type: 'site',
      title: 'Design Pick',
      description: '감각적인 아트워크와 완성도 높은 비주얼을 큐레이션하는 크리에이티브 디자인 플랫폼입니다.',
      tags: ['designs.kro.kr', 'UI/UX Design', 'Brand Identity'],
      link: 'https://designs.kro.kr',
      github: 'https://github.com/haroseo/Design-Pick',
      details: {
        background: '디자이너들의 영감을 자극하고 정돈된 비주얼을 제공하기 위해 기획된 큐레이션 허브입니다.',
        strategy: '타이포그래피와 레이아웃 본질에 집중했으며, 카드 모션을 결합해 시각적 집중도를 올렸습니다.',
        metrics: '디자인 리스트의 가독성 대폭 향상 및 시각 에셋 라이브러리 운영.'
      }
    },
    {
      id: 'planor',
      type: 'site',
      title: 'Planor',
      description: '스마트하게 일정을 조율하고 효율적인 협업 캘린더 기능을 제안하는 통합 웹 스케줄러 서비스입니다.',
      tags: ['planor.kro.kr', 'Product Design', 'Web Service'],
      link: 'https://planor.kro.kr',
      details: {
        background: '직관적인 캘린더 뷰와 일정 조율 문제를 신속하게 조율하기 위한 플랫폼 프로젝트입니다.',
        strategy: '사용자 분석 및 핵심 기능 중심의 론칭을 담당하여 온보딩 이탈률을 최소화했습니다.',
        metrics: '사용자 온보딩 페이지 UX 개선을 통한 사용자 유지 지표 상승.'
      }
    },
    // Project Category
    {
      id: 'naramarsami',
      type: 'project',
      title: '나랏말싸미',
      description: '한글 창제 원리와 타이포그래피 요소를 녹여낸 인터랙티브 에듀테크 타자 연습 서비스입니다.',
      tags: ['훈민정음.kro.kr', 'TypeScript', 'EdTech'],
      link: 'https://훈민정음.kro.kr',
      github: 'https://github.com/naramarsami/naramarsami',
      details: {
        background: '한글의 자모음 결합 원리를 타이핑 경험과 연계하여 흥미를 자아내기 위해 기획되었습니다.',
        strategy: '훈민정음 용자례를 현대적 인터랙션 디자인으로 재해석하여 한글 고유의 비주얼을 이끌어냈습니다.',
        metrics: '교육 플랫폼 내 바이럴 활성화 및 사용자 평균 연습 세션 시간 향상.'
      }
    },
    {
      id: 'luxeret',
      type: 'project',
      title: 'LUXERET',
      slogan: '감각과 데이터를 연결하는 브랜드 마케팅',
      description: 'LUXERET의 마케터로 참여하여 브랜드 마케팅 업무를 총괄 수행하고 있습니다.',
      tags: ['마케터 // Marketer', 'Viral Campaign', 'Funnel Analysis'],
      achievements: [
        '마케팅 콘텐츠 디자인 기획 및 프로모션 소재 제작 지원',
        '유입 통계 데이터 모니터링 및 마케팅 퍼널 최적화 지원'
      ]
    },
    {
      id: 'hannlabs',
      type: 'project',
      title: 'HANN LABS™',
      slogan: '상상을 시각화하는 HANN LABS™ 디자인',
      description: 'HANN LABS™ 팀 내의 스태프로 활동하며 디자인 전반을 총괄하고 있습니다.',
      tags: ['스태프 디자이너 // Staff Designer', 'Figma', 'Visuals'],
      achievements: [
        '팀 브랜드 비주얼 가이드 설계 및 이미지 프로모션 디자인 리비전',
        '아트워크 기획 및 커뮤니티 그래픽 요소 제작'
      ]
    },
    {
      id: 'simplx',
      type: 'project',
      title: 'SIMPLX',
      slogan: '간결한 논리를 담은 시스템 개발',
      description: 'SIMPLX의 개발자로 참여하여 TypeScript 및 Lua 시스템 개발을 수행하고 있습니다.',
      tags: ['개발자 // Developer', 'TypeScript', 'Lua Scripting'],
      achievements: [
        'TypeScript 및 Lua 기반 자동화 모듈 코딩',
        '동기화 관련 백엔드 제어 및 도구 최적화 스크립트 작성 지원'
      ]
    }
  ];

  const discords = displayItems.filter(item => item.type === 'discord');
  const sites = displayItems.filter(item => item.type === 'site');
  const projects = displayItems.filter(item => item.type === 'project');

  return (
    <div className="relative min-h-screen bg-black text-white pt-28 pb-20">
      
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-24">
        
        {/* Page Header */}
        <div className="border-b border-zinc-900 pb-10 text-center md:text-left">
          <p className="text-[10px] font-mono tracking-[0.35em] text-zinc-500 uppercase">
            PORTFOLIO
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent mt-3">
            포트폴리오
          </h1>
        </div>

        {/* Discord Section */}
        <section className="space-y-10">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold font-mono tracking-widest text-zinc-400">DISCORD</h2>
            <span className="h-px flex-1 bg-zinc-900" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {discords.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedItem(item)}
                className="group bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[340px]"
              >
                {/* CSS Wireframe */}
                <div className="aspect-video w-full mb-6 rounded-2xl overflow-hidden border border-zinc-900/60 p-4 bg-black select-none">
                  <div className="w-full h-full bg-zinc-950 flex flex-col p-4 border border-zinc-900 rounded-xl font-mono text-[9px] text-zinc-500">
                    <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-zinc-800" />
                      <span className="text-zinc-400">SERVER // DISCORD</span>
                    </div>
                    <div className="flex gap-3 flex-1 overflow-hidden">
                      <div className="w-12 border-r border-zinc-900 pr-2 flex flex-col gap-1.5">
                        <div className="h-2 w-full bg-zinc-900 rounded" />
                        <div className="h-2 w-8 bg-zinc-900 rounded" />
                        <div className="h-2 w-10 bg-zinc-900 rounded" />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3.5 h-3.5 rounded-full bg-zinc-900" />
                          <div className="h-2 w-16 bg-zinc-800 rounded" />
                        </div>
                        <div className="h-7 w-full bg-zinc-900/50 rounded-xl p-2 flex items-center justify-between">
                          <div className="h-1.5 w-[70%] bg-zinc-800 rounded" />
                          <div className="w-1.5 h-1.5 rounded bg-zinc-700" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white font-display group-hover:text-zinc-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 bg-zinc-900 border border-zinc-850 rounded text-[9px] font-mono text-zinc-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Site Section */}
        <section className="space-y-10">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold font-mono tracking-widest text-zinc-400">SITE</h2>
            <span className="h-px flex-1 bg-zinc-900" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {sites.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedItem(item)}
                className="group bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[340px]"
              >
                {/* CSS Wireframe */}
                <div className="aspect-video w-full mb-6 rounded-2xl overflow-hidden border border-zinc-900/60 p-4 bg-black select-none">
                  <div className="w-full h-full bg-zinc-950 flex flex-col border border-zinc-900 rounded-xl font-mono text-[9px] text-zinc-500 overflow-hidden">
                    <div className="flex items-center justify-between bg-zinc-900/50 px-3 py-1.5 border-b border-zinc-900">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-zinc-850" />
                        <div className="w-1 h-1 rounded-full bg-zinc-850" />
                        <div className="w-1 h-1 rounded-full bg-zinc-850" />
                      </div>
                      <div className="h-3 w-28 bg-zinc-950 rounded border border-zinc-900 flex items-center px-2 text-[7.5px] text-zinc-650">
                        https://domain.kro.kr
                      </div>
                      <div className="w-3" />
                    </div>
                    <div className="p-3 flex-1 grid grid-cols-3 gap-2.5">
                      <div className="col-span-2 border border-zinc-900 rounded-lg p-2.5 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="h-2.5 w-12 bg-zinc-900 rounded" />
                          <div className="h-1 w-full bg-zinc-900/60 rounded" />
                        </div>
                        <div className="h-1.5 w-6 bg-zinc-900 rounded" />
                      </div>
                      <div className="border border-zinc-900 rounded-lg p-2.5 flex flex-col justify-between items-center">
                        <div className="w-5 h-5 rounded-full border border-zinc-900 flex items-center justify-center text-zinc-700">
                          +
                        </div>
                        <div className="h-1 w-6 bg-zinc-900 rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white font-display group-hover:text-zinc-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 bg-zinc-900 border border-zinc-850 rounded text-[9px] font-mono text-zinc-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Project Section */}
        <section className="space-y-10">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold font-mono tracking-widest text-zinc-400">PROJECT & ROLE</h2>
            <span className="h-px flex-1 bg-zinc-900" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedItem(item)}
                className="group bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[340px]"
              >
                {/* CSS Wireframe */}
                <div className="aspect-video w-full mb-6 rounded-2xl overflow-hidden border border-zinc-900/60 p-4 bg-black select-none">
                  <div className="w-full h-full bg-zinc-950 flex flex-col p-4 border border-zinc-900 rounded-xl font-mono text-[9px] text-zinc-500">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-3">
                      <span className="text-zinc-400">SRC // CODE & DESIGN</span>
                      <span className="text-zinc-700">{`</>`}</span>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <div className="h-2.5 w-12 bg-zinc-900 rounded" />
                        <div className="h-1.5 w-16 bg-zinc-900/60 rounded" />
                      </div>
                      <div className="border border-zinc-900/80 rounded-lg p-2 flex-1 flex flex-col gap-1.5">
                        <div className="flex gap-1.5">
                          <div className="h-1 w-2 bg-zinc-800 rounded" />
                          <div className="h-1 w-20 bg-zinc-900 rounded" />
                        </div>
                        <div className="flex gap-1.5 pl-3">
                          <div className="h-1 w-3 bg-zinc-800 rounded" />
                          <div className="h-1 w-12 bg-zinc-900 rounded" />
                        </div>
                        <div className="flex gap-1.5 pl-3">
                          <div className="h-1 w-2 bg-zinc-800 rounded" />
                          <div className="h-1 w-16 bg-zinc-900 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white font-display group-hover:text-zinc-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 bg-zinc-900 border border-zinc-850 rounded text-[9px] font-mono text-zinc-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* SLIDING Drawer File Overlay ("정리된 서류 서랍") */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            />

            {/* Sliding Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="fixed top-0 right-0 z-50 w-full sm:w-[500px] md:w-[540px] h-full bg-[#050505] border-l border-zinc-900 p-8 md:p-12 overflow-y-auto flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-10">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-zinc-900 pb-6">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                      [FILE ARCHIVE // {selectedItem.type.toUpperCase()}]
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white font-display mt-1">
                      {selectedItem.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1.5 rounded-full border border-zinc-900 text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Content details */}
                <div className="space-y-8 font-light text-zinc-350 text-xs">
                  {selectedItem.slogan && (
                    <div className="border-l-2 border-zinc-800 pl-4 py-1 italic text-zinc-400 font-medium">
                      "{selectedItem.slogan}"
                    </div>
                  )}

                  <div className="space-y-2">
                    <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase flex items-center gap-1.5">
                      <Compass size={11} className="text-zinc-500" />
                      설명
                    </span>
                    <p className="leading-relaxed text-zinc-400 whitespace-pre-line">
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Render project details if they exist */}
                  {selectedItem.details && (
                    <>
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase flex items-center gap-1.5">
                          <Sparkles size={11} className="text-zinc-500" />
                          기획 및 디자인
                        </span>
                        <p className="leading-relaxed text-zinc-400">
                          {selectedItem.details.strategy}
                        </p>
                      </div>

                      <div className="bg-zinc-950 p-4.5 rounded-xl border border-zinc-900 space-y-2">
                        <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-400 uppercase flex items-center gap-1.5">
                          <Award size={11} className="text-zinc-400" />
                          역량 및 의의
                        </span>
                        <p className="leading-relaxed text-zinc-300 font-medium">
                          {selectedItem.details.metrics}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Render achievements if they exist */}
                  {selectedItem.achievements && (
                    <div className="space-y-3.5">
                      <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase flex items-center gap-1.5">
                        <Award size={11} className="text-zinc-500" />
                        주요 활동 및 기여
                      </span>
                      <ul className="space-y-2.5">
                        {selectedItem.achievements.map((ach, index) => (
                          <li key={index} className="flex gap-2.5 leading-relaxed text-zinc-400">
                            <span className="text-white">•</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4">
                    {selectedItem.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-[9px] font-mono text-zinc-400 border border-zinc-900 bg-zinc-950/40 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer footer link block */}
              <div className="border-t border-zinc-900 pt-6 mt-12 flex gap-4">
                {selectedItem.github && (
                  <a
                    href={selectedItem.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-5 border border-zinc-900 hover:border-zinc-800 rounded-xl text-[10px] font-mono font-bold tracking-widest text-center text-zinc-400 hover:text-white uppercase transition-all"
                  >
                    Source Code
                  </a>
                )}
                {selectedItem.link && (
                  <a
                    href={selectedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-5 bg-white text-black hover:bg-zinc-200 rounded-xl text-[10px] font-mono font-bold tracking-widest text-center uppercase transition-all flex items-center justify-center gap-1.5"
                  >
                    Link
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
