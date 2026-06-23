import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Compass, 
  Sparkles, 
  Award, 
  Code, 
  Layout, 
  Layers, 
  Grid, 
  Play
} from 'lucide-react';

interface DisplayItem {
  id: string;
  type: 'discord' | 'site' | 'workplace';
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
  const [activeCut, setActiveCut] = useState<number>(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 8 Cuts matching exact criteria (Discord, Site, Workplace categories)
  const displayItems: DisplayItem[] = [
    // Discord
    {
      id: 'rofolder',
      type: 'discord',
      title: '로폴더 (RoFolder)',
      slogan: '당신의 스토리를 성공의 데이터로',
      description: '청소년 및 청년의 스타트업 창업을 독려하고 지원하는 디스코드 대표 커뮤니티입니다.',
      tags: ['대표 // CEO', 'Branding', 'Community Operation'],
      link: 'https://discord.com/users/seoharo',
      achievements: [
        '청소년 및 청년 창업 활성화를 장려하는 네트외킹 서버 운영',
        '스타트업 아이디어 매칭 지원 및 커뮤니티 이벤트 기획',
        '브랜드 아이덴티티 확립 및 공식 로고 디자인 리뉴얼 주도'
      ]
    },
    {
      id: 'limited',
      type: 'discord',
      title: 'Limited™',
      slogan: '오직 나만을 위한 제품',
      description: '최상급 무료배포와 게임 창작 환경에 맞는 프리미엄 리소스를 큐레이션하여 제공하는 공간입니다.',
      tags: ['설립자 // Founder', 'Asset Curation', 'Figma Design'],
      link: 'https://discord.com/users/seoharo',
      achievements: [
        '게임 개발에 즉시 사용 가능한 무료 에셋 및 유용한 리소스 배포',
        '사용자 피드백 기반 리소스 구성 최적화 및 커뮤니티 채널 관리'
      ]
    },
    // Site
    {
      id: 'designpick',
      type: 'site',
      title: 'Design Pick',
      slogan: '감각적인 아트워크와 완성도 높은 비주얼 큐레이션',
      description: '크리에이티브 아트워크와 엄선된 웹 레이아웃을 제공하는 비주얼 디자인 플랫폼입니다.',
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
      slogan: '스마트한 일정 조율과 효율적인 협업 캘린더',
      description: '동작 효율성을 극대화하여 스케줄 공유 문제를 신속하게 조율하는 웹 캘린더 서비스입니다.',
      tags: ['planor.kro.kr', 'Product Design', 'Web Service'],
      link: 'https://planor.kro.kr',
      details: {
        background: '직관적인 캘린더 뷰와 일정 조율 문제를 신속하게 해결하기 위한 플랫폼 프로젝트입니다.',
        strategy: '사용자 분석 및 핵심 기능 중심의 론칭을 담당하여 온보딩 이탈률을 최소화했습니다.',
        metrics: '사용자 온보딩 페이지 UX 개선을 통한 사용자 유지 지표 상승.'
      }
    },
    {
      id: 'naramarsami',
      type: 'site',
      title: '나랏말싸미',
      slogan: '훈민정음 자모결합 원리를 담아낸 인터랙티브 타자 연습',
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
    // Workplace
    {
      id: 'luxeret',
      type: 'workplace',
      title: 'LUXERET',
      slogan: '감각과 데이터를 연결하는 브랜드 마케팅',
      description: '브랜드 가치관과 성과 지표의 유기적인 결합을 목표로 마케팅 전반을 총괄하고 있습니다.',
      tags: ['마케터 // Marketer', 'Viral Campaign', 'Funnel Analysis'],
      achievements: [
        '마케팅 콘텐츠 디자인 기획 및 프로모션 소재 제작 지원',
        '유입 통계 데이터 모니터링 및 마케팅 퍼널 최적화 지원'
      ]
    },
    {
      id: 'hannlabs',
      type: 'workplace',
      title: 'HANN LABS™',
      slogan: '상상을 시각화하는 브랜드 디자인 시스템',
      description: '팀 브랜드 비주얼 가이드라인을 설계하고 커뮤니티 그래픽 디자인을 총괄하고 있습니다.',
      tags: ['스태프 디자이너 // Staff Designer', 'Figma', 'Visuals'],
      achievements: [
        '팀 브랜드 비주얼 가이드 설계 및 이미지 프로모션 디자인 리비전',
        '아트워크 기획 및 커뮤니티 그래픽 요소 제작'
      ]
    },
    {
      id: 'simplx',
      type: 'workplace',
      title: 'SIMPLX',
      slogan: '간결한 논리를 담은 시스템 개발',
      description: 'TypeScript 및 Lua를 기반으로 가동성이 우수한 자동화 모듈과 제어 코드를 작성합니다.',
      tags: ['개발자 // Developer', 'TypeScript', 'Lua Scripting'],
      achievements: [
        'TypeScript 및 Lua 기반 자동화 모듈 코딩',
        '동기화 관련 백엔드 제어 및 도구 최적화 스크립트 작성 지원'
      ]
    }
  ];

  // Track active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setActiveCut(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleTrackerClick = (index: number) => {
    setActiveCut(index);
    const target = sectionRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white select-none">
      
      {/* 01~08 Float-right Micro Navigator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4">
        {displayItems.map((item, idx) => {
          const isActive = activeCut === idx;
          return (
            <button
              key={item.id}
              onClick={() => handleTrackerClick(idx)}
              className="flex items-center gap-3 group text-left outline-none cursor-pointer"
            >
              <span className={`text-[8px] font-mono tracking-widest transition-all duration-300 ${
                isActive ? 'text-white font-bold opacity-100 scale-110' : 'text-zinc-650 opacity-40 group-hover:opacity-85'
              }`}>
                {`0${idx + 1}`}
              </span>
              <div className="relative w-4 h-4 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: isActive ? 1.4 : 1,
                    backgroundColor: isActive ? '#ffffff' : 'rgba(39, 39, 42, 0.4)',
                    borderColor: isActive ? '#ffffff' : 'rgba(63, 63, 70, 0.4)'
                  }}
                  className="w-1.5 h-1.5 rounded-full border bg-zinc-950 transition-all duration-300"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Sequential Cuts Container */}
      <div className="flex flex-col">
        {displayItems.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => { sectionRefs.current[idx] = el; }}
            className="min-h-screen w-full flex items-center justify-center relative border-b border-zinc-950 px-6 sm:px-12 md:px-20 py-24"
          >
            {/* Section grid layout */}
            <div className="max-w-6xl w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Text Panels */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-550 uppercase">
                      {`0${idx + 1} // ${item.type.toUpperCase()}`}
                    </span>
                    <div className="h-px w-8 bg-zinc-900" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                    {item.title}
                  </h2>
                  {item.slogan && (
                    <p className="text-xs sm:text-sm text-zinc-400 font-medium italic border-l border-zinc-800 pl-3">
                      "{item.slogan}"
                    </p>
                  )}
                </div>

                <p className="text-xs sm:text-xs text-zinc-450 leading-relaxed font-light max-w-lg">
                  {item.description}
                </p>

                {/* Sub-tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 bg-zinc-950 border border-zinc-900 rounded text-[9px] font-mono text-zinc-500 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Rows */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="px-6 py-2.5 bg-zinc-900 border border-zinc-850 hover:border-white hover:bg-zinc-950 text-white text-[10px] font-bold font-mono tracking-widest uppercase rounded-full cursor-pointer transition-all shadow-md"
                  >
                    Read Case Study
                  </button>
                  
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-zinc-500 hover:text-white uppercase tracking-widest transition-colors"
                    >
                      Launch
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Right Column: High-End Custom CSS/SVG Motion Panels */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="w-full aspect-video md:aspect-[4/3] lg:aspect-auto lg:h-[460px] rounded-3xl overflow-hidden border border-zinc-900/60 bg-zinc-950/20 p-5 flex items-center justify-center select-none shadow-2xl relative"
              >
                {/* Tech coordinates details */}
                <div className="absolute top-4 left-4 text-[7px] font-mono text-zinc-650 tracking-widest uppercase">
                  {`VIEWPORT_GRID_0${idx + 1}`}
                </div>
                <div className="absolute bottom-4 right-4 text-[7px] font-mono text-zinc-650 tracking-widest uppercase">
                  SYS_ACTIVE_NODE
                </div>

                {/* CUSTOM MOTION ANIMATIONS PER SECTION */}
                <div className="w-full h-full flex items-center justify-center p-2">
                  {item.id === 'rofolder' && <RoFolderVisual />}
                  {item.id === 'limited' && <LimitedVisual />}
                  {item.id === 'designpick' && <DesignPickVisual />}
                  {item.id === 'planor' && <PlanorVisual />}
                  {item.id === 'naramarsami' && <NaramarsamiVisual />}
                  {item.id === 'luxeret' && <LuxeretVisual />}
                  {item.id === 'hannlabs' && <HannLabsVisual />}
                  {item.id === 'simplx' && <SimplxVisual />}
                </div>
              </motion.div>

            </div>
          </div>
        ))}
      </div>

      {/* DETAILED DRAWERS */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="fixed top-0 right-0 z-50 w-full sm:w-[500px] md:w-[540px] h-full bg-[#050505] border-l border-zinc-900 p-8 md:p-12 overflow-y-auto flex flex-col justify-between shadow-2xl font-sans"
            >
              <div className="space-y-10">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b border-zinc-900 pb-6">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-zinc-550 uppercase">
                      {`[FILE ARCHIVE // ${selectedItem.type.toUpperCase()}]`}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white font-display mt-1">
                      {selectedItem.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1.5 rounded-full border border-zinc-900 text-zinc-550 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Body Content */}
                <div className="space-y-8 font-light text-zinc-400 text-xs">
                  {selectedItem.slogan && (
                    <div className="border-l-2 border-zinc-800 pl-4 py-1 italic text-zinc-350 font-medium">
                      "{selectedItem.slogan}"
                    </div>
                  )}

                  <div className="space-y-2">
                    <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-550 uppercase flex items-center gap-1.5">
                      <Compass size={11} className="text-zinc-500" />
                      개요 및 역할
                    </span>
                    <p className="leading-relaxed whitespace-pre-line text-zinc-400">
                      {selectedItem.description}
                    </p>
                  </div>

                  {selectedItem.details && (
                    <>
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-550 uppercase flex items-center gap-1.5">
                          <Sparkles size={11} className="text-zinc-500" />
                          기획 및 디자인 전략
                        </span>
                        <p className="leading-relaxed text-zinc-400">
                          {selectedItem.details.strategy}
                        </p>
                      </div>

                      <div className="bg-zinc-950 p-4.5 rounded-xl border border-zinc-900 space-y-2">
                        <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-350 uppercase flex items-center gap-1.5">
                          <Award size={11} className="text-zinc-450" />
                          역량 증명 및 가치
                        </span>
                        <p className="leading-relaxed text-zinc-300 font-semibold">
                          {selectedItem.details.metrics}
                        </p>
                      </div>
                    </>
                  )}

                  {selectedItem.achievements && (
                    <div className="space-y-3.5">
                      <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-550 uppercase flex items-center gap-1.5">
                        <Award size={11} className="text-zinc-500" />
                        주요 활동 및 성과
                      </span>
                      <ul className="space-y-2.5">
                        {selectedItem.achievements.map((ach, index) => (
                          <li key={index} className="flex gap-2.5 leading-relaxed text-zinc-400">
                            <span className="text-white font-bold">•</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4">
                    {selectedItem.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 text-[9px] font-mono text-zinc-400 border border-zinc-900 bg-zinc-950/40 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="border-t border-zinc-900 pt-6 mt-12 flex gap-4">
                {selectedItem.github && (
                  <a
                    href={selectedItem.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-5 border border-zinc-900 hover:border-zinc-800 rounded-xl text-[10px] font-mono font-bold tracking-widest text-center text-zinc-500 hover:text-white uppercase transition-all"
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

/* ==========================================================================
   INDIVIDUAL HIGH-END CSS/SVG VISUAL REPRESENTATION SUB-COMPONENTS
   ========================================================================== */

// 1. RoFolder: Discord Server & Chat simulation
function RoFolderVisual() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const list = [
      "창업 아이디어 매칭 신청합니다!",
      "네트워킹 채널의 양식을 확인해주세요.",
      "이번 모의피칭 일정이 어떻게 되나요?",
      "다음주 토요일 저녁 8시에 진행됩니다."
    ];
    let idx = 0;
    const interval = setInterval(() => {
      setMessages(prev => {
        const nextList = [...prev];
        if (nextList.length >= 3) nextList.shift();
        nextList.push(list[idx % list.length]);
        return nextList;
      });
      idx++;
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full max-w-sm bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col font-mono text-[9px] text-zinc-400 overflow-hidden shadow-inner">
      {/* Discord Header */}
      <div className="px-3.5 py-2 border-b border-zinc-900 bg-zinc-950/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          <span className="text-zinc-300 font-bold">로폴더 // DISCORD SERVER</span>
        </div>
        <div className="flex items-center gap-1 opacity-50">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="w-1.5 h-1.5 rounded bg-zinc-700" />
        </div>
      </div>
      
      {/* Discord Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Channels Column */}
        <div className="w-24 border-r border-zinc-900 p-2 space-y-2 select-none bg-zinc-950/20">
          <div className="h-1.5 w-12 bg-zinc-900 rounded opacity-60" />
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-zinc-300 font-bold">
              <span>#</span><span className="scale-95">notice</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>#</span><span className="scale-95 text-zinc-550">networking</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>#</span><span className="scale-95 text-zinc-550">pitching</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>#</span><span className="scale-95 text-zinc-550">lounge</span>
            </div>
          </div>
        </div>

        {/* Chat Stream Column */}
        <div className="flex-1 p-3 flex flex-col justify-end space-y-2.5 overflow-hidden">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-2"
              >
                <div className="w-4 h-4 rounded-full bg-zinc-900 border border-zinc-800 shrink-0 flex items-center justify-center text-[7px] text-white">
                  U
                </div>
                <div className="flex-1 bg-zinc-900/40 p-2 rounded-lg border border-zinc-900/60 leading-relaxed">
                  {msg}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// 2. Limited™: Interactive 3D asset matrix
function LimitedVisual() {
  return (
    <div className="w-full max-w-xs grid grid-cols-2 gap-4">
      {[
        { icon: <Layers size={14} />, label: "3D MESH" },
        { icon: <Code size={14} />, label: "SCRIPT UTILS" },
        { icon: <Layout size={14} />, label: "UI KIT" },
        { icon: <Grid size={14} />, label: "DEV PRESETS" }
      ].map((asset, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.03, borderColor: '#ffffff' }}
          className="aspect-square bg-zinc-950 border border-zinc-900 rounded-2xl p-4 flex flex-col justify-between transition-colors duration-300 relative group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
            {asset.icon}
          </div>
          <div className="space-y-1">
            <span className="text-[7px] font-mono text-zinc-650 block">LIMIT_0{i+1}</span>
            <span className="text-[9px] font-mono font-bold text-zinc-350 group-hover:text-white transition-colors uppercase tracking-wider">{asset.label}</span>
          </div>
          {/* Tech dots decoration */}
          <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-zinc-800" />
        </motion.div>
      ))}
    </div>
  );
}

// 3. Design Pick: Horizontal masonry sliding parallax visual
function DesignPickVisual() {
  return (
    <div className="w-full h-full max-w-sm flex items-center justify-center overflow-hidden relative">
      <div className="grid grid-cols-2 gap-3.5 w-full select-none rotate-6 scale-105">
        {/* Column 1 sliding down */}
        <motion.div 
          animate={{ y: [0, -60, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="space-y-3.5"
        >
          {[0, 1, 2].map((x) => (
            <div key={x} className="aspect-video w-full bg-zinc-950 border border-zinc-900 rounded-xl p-3 flex flex-col justify-between font-mono text-[7px] text-zinc-550">
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span>LAYOUT // GRID</span>
                <span>[0{x+1}]</span>
              </div>
              <div className="h-6 w-full border border-dashed border-zinc-900 rounded-md flex items-center justify-center">
                REF_PREVIEW
              </div>
            </div>
          ))}
        </motion.div>

        {/* Column 2 sliding up */}
        <motion.div 
          animate={{ y: [-60, 0, -60] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="space-y-3.5"
        >
          {[3, 4, 5].map((x) => (
            <div key={x} className="aspect-video w-full bg-zinc-950 border border-zinc-900 rounded-xl p-3 flex flex-col justify-between font-mono text-[7px] text-zinc-550">
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span>LAYOUT // ART</span>
                <span>[0{x+1}]</span>
              </div>
              <div className="h-6 w-full border border-dashed border-zinc-900 rounded-md flex items-center justify-center">
                REF_PREVIEW
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// 4. Planor: Smart Scheduler Grid drawing
function PlanorVisual() {
  return (
    <div className="w-full max-w-sm bg-zinc-950 border border-zinc-900 rounded-2xl p-4 flex flex-col font-mono text-[9px] text-zinc-400 overflow-hidden shadow-inner">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-2.5 mb-3">
        <span className="text-zinc-300 font-bold">PLANOR // CALENDAR VIEW</span>
        <div className="flex gap-1.5 text-[8px] text-zinc-550">
          <span>MON</span>
          <span>TUE</span>
          <span>WED</span>
        </div>
      </div>

      {/* Grid Lines drawing */}
      <div className="grid grid-cols-4 gap-2 flex-1 items-stretch">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((day) => {
          const hasEvent = day === 2 || day === 5;
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: day * 0.08 }}
              className="border border-zinc-900/80 rounded-xl p-2 bg-zinc-950/20 flex flex-col justify-between min-h-[50px] relative"
            >
              <span className="text-zinc-650 text-[7px]">{`0${day + 1}`}</span>
              {hasEvent && (
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '105%' }}
                  transition={{ delay: 0.8 }}
                  className="h-2.5 bg-zinc-900 rounded-md border border-zinc-800/80 text-[6.5px] px-1 flex items-center text-zinc-400 truncate"
                >
                  Sync Meet
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// 5. 나랏말싸미: Hangeul typewriter typing simulation
function NaramarsamiVisual() {
  const [typedText, setTypedText] = useState("");
  const fullText = "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할새...";

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, idx));
      idx = (idx + 1) % (fullText.length + 1);
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm bg-zinc-950 border border-zinc-900 rounded-2xl p-5 flex flex-col justify-between min-h-[160px] font-mono text-[10px] text-zinc-450 shadow-inner">
      <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
        <span className="text-zinc-300 font-bold uppercase tracking-widest text-[8px]">Hangeul // Typing Practice</span>
      </div>
      
      <div className="flex-1 py-2 leading-relaxed whitespace-pre-wrap select-none min-h-[40px]">
        {typedText}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1.5 h-3 bg-white ml-0.5"
        />
      </div>

      <div className="flex justify-between items-center border-t border-zinc-900/60 pt-2.5 text-[8px] text-zinc-550">
        <span>SPEED // 350 WPM</span>
        <span>ACCURACY // 98%</span>
      </div>
    </div>
  );
}

// 6. LUXERET: Marketing Funnel Analysis drawing
function LuxeretVisual() {
  const funnelSteps = [
    { label: "AWARENESS", pct: "100%", w: "100%", val: "12,000" },
    { label: "INTEREST", pct: "65%", w: "75%", val: "7,800" },
    { label: "DECISION", pct: "30%", w: "45%", val: "3,600" },
    { label: "ACTION", pct: "12%", w: "25%", val: "1,440" }
  ];

  return (
    <div className="w-full max-w-sm flex flex-col gap-3 font-mono text-[9px] text-zinc-400">
      {funnelSteps.map((step, idx) => (
        <div key={idx} className="flex items-center justify-between gap-3">
          <span className="w-16 text-zinc-555 font-bold">{step.label}</span>
          <div className="flex-1 bg-zinc-950 border border-zinc-900 rounded-full h-4 overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: step.w }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.15 }}
              className="bg-zinc-900 border-r border-zinc-850 h-full rounded-full flex items-center justify-end px-3"
            >
              <span className="text-[7.5px] font-bold text-zinc-400">{step.pct}</span>
            </motion.div>
          </div>
          <span className="w-12 text-right text-zinc-300 font-bold">{step.val}</span>
        </div>
      ))}
    </div>
  );
}

// 7. HANN LABS™: Figma style vector anchor drawing canvas
function HannLabsVisual() {
  return (
    <div className="w-full h-full max-w-sm border border-zinc-900 bg-zinc-950 rounded-2xl overflow-hidden relative shadow-inner">
      {/* Top Ruler */}
      <div className="absolute top-0 left-5 right-0 h-5 border-b border-zinc-900 flex justify-between px-2 font-mono text-[6.5px] text-zinc-650 items-center">
        <span>0</span>
        <span>100</span>
        <span>200</span>
        <span>300</span>
      </div>
      {/* Left Ruler */}
      <div className="absolute top-5 left-0 bottom-0 w-5 border-r border-zinc-900 flex flex-col justify-between py-2 font-mono text-[6.5px] text-zinc-650 items-center">
        <span>0</span>
        <span>100</span>
        <span>200</span>
      </div>

      {/* Guide lines decoration */}
      <div className="absolute top-[35%] left-5 right-0 h-px border-t border-dashed border-zinc-900/60" />
      <div className="absolute left-[45%] top-5 bottom-0 w-px border-l border-dashed border-zinc-900/60" />

      {/* Interactive Vector Curve */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ paddingLeft: '20px', paddingTop: '20px' }}>
        <motion.path
          d="M 40 100 C 90 40, 160 140, 220 70"
          fill="none"
          stroke="#4b5563"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {/* Handles */}
        <circle cx="40" cy="100" r="3" fill="#ffffff" stroke="#000000" strokeWidth="1" />
        <circle cx="220" cy="70" r="3" fill="#ffffff" stroke="#000000" strokeWidth="1" />
        
        {/* Interactive Handle vector box */}
        <line x1="90" y1="40" x2="40" y2="100" stroke="#71717a" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="90" cy="40" r="2.5" fill="#ffffff" stroke="#4b5563" strokeWidth="1" />
      </svg>

      {/* Simulating cursor action */}
      <motion.div 
        animate={{ 
          x: [20, 110, 20],
          y: [20, 60, 20]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-2.5 h-2.5 border border-white bg-black rotate-12 flex items-center justify-center shadow-md"
        style={{ top: 0, left: 0 }}
      >
        <div className="w-0.5 h-0.5 bg-white rounded-full" />
      </motion.div>
    </div>
  );
}

// 8. SIMPLX: Developer IDE syntax typing simulation
function SimplxVisual() {
  const codeLines = [
    "import { System } from 'simplx';",
    "const module = System.create('automator');",
    "module.on('start', () => {",
    "  console.log('SIMPLX RUNNING...');",
    "});"
  ];
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIdx(prev => (prev < codeLines.length ? prev + 1 : 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm bg-zinc-950 border border-zinc-900 rounded-2xl p-4 flex flex-col font-mono text-[9px] text-zinc-400 overflow-hidden shadow-inner">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-3">
        <span className="text-zinc-300 font-bold uppercase tracking-widest text-[8px]">Simplx // Script automator</span>
        <span className="text-[7.5px] text-zinc-650">main.ts</span>
      </div>

      <div className="flex-1 space-y-1 bg-zinc-950/20 p-2 rounded-lg border border-zinc-900/60 leading-relaxed font-mono min-h-[90px]">
        {codeLines.slice(0, lineIdx).map((line, i) => {
          const isComment = line.includes("console.log");
          const isImport = line.startsWith("import");
          return (
            <div key={i} className="flex gap-2">
              <span className="text-zinc-700 select-none w-3">0{i+1}</span>
              <span className={isComment ? "text-white font-bold" : isImport ? "text-zinc-300" : "text-zinc-550"}>
                {line}
              </span>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {lineIdx === codeLines.length && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 bg-zinc-900/50 border border-zinc-850 p-2.5 rounded-lg text-white font-bold flex items-center justify-between"
          >
            <span>[SUCCESS] AUTOMATION MODULE COMPILED</span>
            <Play size={10} className="text-white fill-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
