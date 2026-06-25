import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Compass, 
  Sparkles, 
  Award
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

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
  const { t } = useLanguage();

  const displayItems: DisplayItem[] = [
    // Discord
    {
      id: 'rofolder',
      type: 'discord',
      title: 'RoFolder',
      slogan: t('당신의 스토리를 성공의 데이터로', 'Everything you need to search RoShop and raise your value'),
      description: t('청소년 및 청년의 스타트업 창업을 독려하고 지원하는 디스코드 대표 커뮤니티입니다.', 'A leading Discord community that encourages youth startup entrepreneurship.'),
      tags: ['CEO', 'Branding', 'Community Operations'],
      link: 'https://discord.gg/ABz6SQ74Yv',
      achievements: [
        t('청소년 및 청년 창업 활성화를 장려하는 네트워킹 서버 운영', 'Operating networking channels that promote youth startup business'),
        t('스타트업 아이디어 매칭 지원 및 커뮤니티 이벤트 기획', 'Supporting startup ideas matchmaking and planning community events'),
        t('브랜드 아이덴티티 확립 및 공식 로고 디자인 리뉴얼 주도', 'Leading brand identity designs and official logo renewals')
      ]
    },
    {
      id: 'limited',
      type: 'discord',
      title: 'Limited™',
      slogan: t('오직 나만을 위한 제품', 'Products made exclusively for you'),
      description: t('실무 경험을 쌓고 다양한 그래픽 및 코드 관련 시도를 진행하는 시발점이 되는 채널입니다.', 'A channel serving as the starting point of practical experience and various creative attempts.'),
      tags: ['Founder', 'Asset Curation', 'Creative Studio'],
      link: 'https://discord.gg/utGzjE6r8J',
      achievements: [
        t('게임 개발에 사용 가능한 무료 에셋 및 리소스 배포', 'Distributing free game assets and design resources for developers'),
        t('사용자 피드백 기반 리소스 구성 및 커뮤니티 채널 관리', 'Structuring resource categories and managing channels based on feedback')
      ]
    },
    // Site
    {
      id: 'designpick',
      type: 'site',
      title: 'Design Pick',
      slogan: t('감각적인 아트워크와 완성도 높은 비주얼 큐레이션', 'Aesthetic artwork curation & visual layout design'),
      description: t('크리에이티브 아트워크와 엄선된 웹 레이아웃을 제공하는 비주얼 디자인 플랫폼입니다.', 'A visual design platform curating aesthetic artwork and high-quality web layouts.'),
      tags: ['designs.kro.kr', 'UI/UX Design', 'Brand Identity'],
      link: 'https://designs.kro.kr',
      github: 'https://github.com/haroseo/Design-Pick',
      details: {
        background: t('디자이너들의 영감을 자극하고 정돈된 비주얼을 제공하기 위해 기획된 큐레이션 허브입니다.', 'A curation hub designed to inspire designers and present refined visual systems.'),
        strategy: t('타이포그래피와 레이아웃 본질에 집중했으며, 카드 모션을 결합해 시각적 집중도를 올렸습니다.', 'Focused on layout fundamentals and typography, using card motion to increase focus.'),
        metrics: t('디자인 리스트의 가독성 및 클릭 관심도 대폭 향상.', 'Significantly improved readability and click conversion of the design list.')
      }
    },
    {
      id: 'planor',
      type: 'site',
      title: 'Planor',
      slogan: t('스마트한 일정 조율과 효율적인 협업 캘린더', 'Smart scheduling and schedule coordination'),
      description: t('동작 효율성을 극대화하여 스케줄 공유 문제를 신속하게 조율하는 웹 캘린더 서비스입니다.', 'A collaborative calendar service providing smart scheduling and schedule coordination.'),
      tags: ['planor.kro.kr', 'Product Design', 'Web Service'],
      link: 'https://planor.kro.kr',
      details: {
        background: t('직관적인 캘린더 뷰와 일정 조율 문제를 신속하게 조율하기 위한 플랫폼 프로젝트입니다.', 'A platform project built to solve schedule coordination issues with a calendar view.'),
        strategy: t('사용자 분석 및 핵심 기능 중심의 론칭을 담당하여 온보딩 이탈률을 최소화했습니다.', 'Conducted user analysis and key features launch to minimize onboarding drop-off.'),
        metrics: t('사용자 온보딩 페이지 UX 개선을 통한 사용자 유지 지표 상승.', 'Increased user retention metrics by improving the onboarding page UX.')
      }
    },
    {
      id: 'naramarsami',
      type: 'site',
      title: t('나랏말싸미', 'Naramarsami'),
      slogan: t('훈민정음 자모결합 원리를 담아낸 인터랙티브 타자 연습', 'Interactive Hangeul typing practice based on Hunminjeongeum principles'),
      description: t('한글 창제 원리와 타이포그래피 요소를 녹여낸 인터랙티브 에듀테크 타자 연습 서비스입니다.', 'An interactive typing practice service presenting Hangeul\'s letters and typography elements.'),
      tags: ['훈민정음.kro.kr', 'Interaction', 'EdTech'],
      link: 'https://훈민정음.kro.kr',
      github: 'https://github.com/naramarsami/naramarsami',
      details: {
        background: t('한글의 자모음 결합 원리를 타이핑 경험과 연계하여 흥미를 자아내기 위해 기획되었습니다.', 'Designed to link Hangeul\'s assembly principles with typing experience for engagement.'),
        strategy: t('훈민정음 용자례를 현대적 인터랙션 디자인으로 재해석하여 한글 고유의 비주얼을 이끌어냈습니다.', 'Reinterpreted historical Hunminjeongeum structures into modern interactive UI.'),
        metrics: t('교육 플랫폼 내 바이럴 활성화 및 사용자 평균 연습 세션 시간 향상.', 'Activated viral sharing and increased user practice session duration.')
      }
    },
    // Workplace
    {
      id: 'luxeret',
      type: 'workplace',
      title: 'LUXERET',
      slogan: t('감각과 데이터를 연결하는 브랜드 마케팅', 'Connecting senses and data via brand marketing'),
      description: t('브랜드 가치관과 성과 지표를 연결하는 것을 목표로 마케팅 전반을 총괄하고 있습니다.', 'Working as a brand marketer, aiming to connect brand values with performance metrics.'),
      tags: ['Marketer', 'Viral Campaign', 'Funnel Analysis'],
      link: 'https://luxeret.com/',
      achievements: [
        t('마케팅 콘텐츠 디자인 기획 및 프로모션 소재 제작 지원', 'Planning marketing campaigns and managing brand channels'),
        t('유입 통계 데이터 모니터링 및 마케팅 퍼널 최적화 지원', 'Analyzing online promotions and trends')
      ]
    },
    {
      id: 'hannlabs',
      type: 'workplace',
      title: 'HANN LABS™',
      slogan: t('상상을 시각화하는 브랜드 디자인', 'Visualizing imagination via brand design'),
      description: t('HANN LABS™에서 디자인을 배우며 어시스턴트(보조) 및 스태프로 시각 작업 전반에 참여하고 있습니다.', 'Learning design and participating as assistant staff at HANN LABS™.'),
      tags: ['Staff Designer', 'Graphic Design', 'Visuals'],
      achievements: [
        t('브랜드 비주얼 디자인 보조 및 이미지 프로모션 디자인 지원', 'Assisting team brand visual design and image promotions'),
        t('아트워크 기획 보조 및 커뮤니티 그래픽 요소 제작 지원', 'Supporting artwork planning and community graphic production')
      ]
    },
    {
      id: 'simplx',
      type: 'workplace',
      title: 'SIMPLX',
      slogan: t('간결한 논리를 담은 시스템 개발', 'System development with simple logic'),
      description: t('필요한 시스템 스크립트와 프로그램을 제작하고 제어 코드를 작성합니다.', 'Developing system scripts and utility programs.'),
      tags: ['Developer', 'System Scripts', 'Utility Tool'],
      achievements: [
        t('스크립트 및 프로그램 구현', 'Implementing scripts and programs'),
        t('시스템 도구 최적화 스크립트 작성 지원', 'Supporting system tools optimization and scripting')
      ]
    }
  ];

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

  const categories = [
    { id: 'discord', label: 'Discord' },
    { id: 'site', label: 'Site' },
    { id: 'workplace', label: 'Workplace' }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white select-none">
      
      {/* Grouped Float-right Micro Navigator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-6 border-r border-zinc-900/60 pr-4">
        {categories.map(cat => {
          const catItems = displayItems.filter(item => item.type === cat.id);
          return (
            <div key={cat.id} className="flex flex-col items-end gap-2.5">
              <span className="text-[7.5px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold mb-1">{cat.label}</span>
              {catItems.map(item => {
                const itemIdx = displayItems.findIndex(d => d.id === item.id);
                const isActive = activeCut === itemIdx;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTrackerClick(itemIdx)}
                    className="flex items-center gap-3 group text-left outline-none cursor-pointer"
                  >
                    <span className={`text-[9.5px] font-bold transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-zinc-500 opacity-60 group-hover:opacity-100 group-hover:text-zinc-300'
                    }`}>
                      {item.title}
                    </span>
                    <div className="relative w-2 h-2 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 border border-zinc-700 group-hover:border-zinc-500 transition-all duration-300" style={{
                        backgroundColor: isActive ? '#ffffff' : undefined,
                        borderColor: isActive ? '#ffffff' : undefined
                      }} />
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Sequential Cuts Container */}
      <div className="flex flex-col">
        {displayItems.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => { sectionRefs.current[idx] = el; }}
            className="min-h-screen w-full flex items-center justify-center relative border-b border-zinc-950 px-6 sm:px-12 md:px-20 py-16"
          >
            {/* Section grid layout */}
            <div className="max-w-6xl w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
              
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
                    <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase font-bold">
                      {item.type === 'discord' ? 'Discord' : item.type === 'site' ? 'Site' : 'Workplace'}
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

                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal max-w-lg">
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
                    {t('상세 보기', 'Read Case Study')}
                  </button>
                  
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-zinc-500 hover:text-white uppercase tracking-widest transition-colors"
                    >
                      {t('방문하기', 'Launch')}
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Right Column: Premium Flat Mockup Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="w-full aspect-video md:aspect-[4/3] lg:aspect-auto lg:h-[460px] rounded-3xl overflow-hidden border border-zinc-900/60 bg-zinc-950/20 shadow-2xl relative group cursor-pointer"
              >
                <img
                  src={
                    item.id === 'rofolder' ? '/assets/rofolder-new.jpg' :
                    item.id === 'limited' ? '/assets/limited-banner.png' :
                    item.id === 'designpick' ? '/assets/designpick.png' :
                    item.id === 'planor' ? '/assets/planor.png' :
                    item.id === 'naramarsami' ? '/assets/naramarsami.png' :
                    item.id === 'luxeret' ? '/assets/luxeret.png' :
                    item.id === 'hannlabs' ? '/assets/hannlabs.png' :
                    '/assets/simplx.png'
                  }
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
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
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase font-bold">
                      {t(`아카이브 // ${selectedItem.type.toUpperCase()}`, `ARCHIVE // ${selectedItem.type.toUpperCase()}`)}
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

                {/* Body Content */}
                <div className="space-y-8 font-normal text-zinc-200 text-xs sm:text-sm">
                  {selectedItem.slogan && (
                    <div className="border-l-2 border-zinc-800 pl-4 py-1 italic text-zinc-300 font-medium">
                      "{selectedItem.slogan}"
                    </div>
                  )}

                  <div className="space-y-2">
                    <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase flex items-center gap-1.5 font-bold">
                      <Compass size={11} className="text-zinc-500" />
                      {t('개요 및 역할', 'Overview & Role')}
                    </span>
                    <p className="leading-relaxed whitespace-pre-line text-zinc-300">
                      {selectedItem.description}
                    </p>
                  </div>

                  {selectedItem.details && (
                    <>
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase flex items-center gap-1.5 font-bold">
                          <Sparkles size={11} className="text-zinc-500" />
                          {t('기획 및 디자인 전략', 'Planning & Design Strategy')}
                        </span>
                        <p className="leading-relaxed text-zinc-300">
                          {selectedItem.details.background}
                        </p>
                        <p className="leading-relaxed text-zinc-300">
                          {selectedItem.details.strategy}
                        </p>
                      </div>

                      <div className="bg-zinc-950 p-4.5 rounded-xl border border-zinc-900 space-y-2">
                        <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-350 uppercase flex items-center gap-1.5 font-bold">
                          <Award size={11} className="text-zinc-450" />
                          {t('역량 증명 및 가치', 'Proven Metrics & Value')}
                        </span>
                        <p className="leading-relaxed text-zinc-200 font-semibold">
                          {selectedItem.details.metrics}
                        </p>
                      </div>
                    </>
                  )}

                  {selectedItem.achievements && (
                    <div className="space-y-3.5">
                      <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase flex items-center gap-1.5 font-bold">
                        <Award size={11} className="text-zinc-500" />
                        {t('주요 활동 및 성과', 'Key Activities & Achievements')}
                      </span>
                      <ul className="space-y-2.5">
                        {selectedItem.achievements.map((ach, index) => (
                          <li key={index} className="flex gap-2.5 leading-relaxed text-zinc-300">
                            <span className="text-white font-bold">•</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>

              {/* Footer */}
              <div className="border-t border-zinc-900 pt-6 mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-2.5 bg-zinc-900 border border-zinc-850 hover:border-white hover:bg-zinc-950 text-white text-[10px] font-bold font-mono tracking-widest uppercase rounded-full cursor-pointer transition-colors shadow-md"
                >
                  {t('닫기', 'Close')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
