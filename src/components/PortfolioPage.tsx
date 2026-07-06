import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Compass, 
  Sparkles, 
  Award,
  Heart,
  Eye,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useRouter } from './router';

interface DisplayItem {
  id: string;
  type: 'discord' | 'site' | 'workplace';
  category: 'brand' | 'marketing' | 'development';
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
  const { t } = useLanguage();
  const { currentPath, navigate } = useRouter();

  const displayItems: DisplayItem[] = [
    // Discord
    {
      id: 'rofolder',
      type: 'discord',
      category: 'brand',
      title: 'RoFolder',
      slogan: t('당신의 스토리를 성공의 데이터로', 'Everything you need to search RoShop and raise your value'),
      description: t('청소년 및 청년의 스타트업 창업을 독려하고 지원하는 디스코드 대표 커뮤니티입니다.', 'A leading Discord community that encourages youth startup entrepreneurship.'),
      tags: ['CEO', 'Branding', 'Community Operations'],
      link: 'https://discord.gg/ABz6SQ74Yv',
      achievements: [
        t('청소년 및 청년 창업 활성화를 장려하는 네트워킹 서버 운영', 'Operating networking channels that promote youth startup business'),
        t('회원 대상 지식 공유 세션 및 창업 정보 데이터베이스 구축', 'Constructed sharing databases and networking sessions for members'),
        t('스튜디오 브랜딩 전반의 비주얼 정체성(CI/BI) 설계 및 정비', 'Refined overall graphic identities (CI/BI) for the community studio')
      ],
      details: {
        background: t('창업에 관심 있는 청년들이 정보 부족으로 어려움을 겪는 문제를 해결하기 위해 기획되었습니다.', 'Conceived to resolve networking bottlenecks and lack of early-stage resources for youth creators.'),
        strategy: t('커뮤니티 내 지식 데이터베이스 구축 및 정기적인 협업 채널 활성화를 핵심 전략으로 삼았습니다.', 'Established dynamic networking schedules and structured database sharing assets as core pillars.'),
        metrics: t('디스코드 내 활성 소통 유저 수 1,200명 이상 도달 및 네트워킹 데이터 기여.', 'Reached 1,200+ conversational users, driving networking data growth.')
      }
    },
    {
      id: 'limited',
      type: 'discord',
      category: 'brand',
      title: 'Limited™',
      slogan: t('오직 나만을 위한 제품, Limited™', 'One of a kind, crafted just for you'),
      description: t('가상 공간 및 게임 환경에 최적화된 그래픽 리소스와 커스텀 디자인 에셋을 공유하는 크리에이티브 라이브러리 스튜디오입니다.', 'A creative library sharing graphic resources and custom design assets for virtual worlds.'),
      tags: ['Founder', 'Visual Design', 'Asset Library'],
      link: 'https://discord.gg/H92F7jQ2aA',
      achievements: [
        t('커스텀 디자인 에셋 배포 및 크리에이티브 피드 관리', 'Distributed custom visual design files and maintained creative design feeds'),
        t('가상 환경에 맞춰 최적화된 3D/2D graphic 템플릿 제작', 'Created streamlined 3D/2D visual mockup kits for virtual creators'),
        t('창작자들이 자유롭게 소통할 수 있는 피어 리뷰 허브 활성화', 'Fostered dynamic peer design review hubs for asset library sharing')
      ],
      details: {
        background: t('창작자들이 고품질 그래픽 에셋을 쉽게 확보하고 협업할 수 있는 창구를 열기 위해 설립되었습니다.', 'Launched to provide a drop-in graphic library and feedback channels for virtual spatial creators.'),
        strategy: t('엄선된 디자인 템플릿 배포와 상호 피드백 스페이스 운영을 브랜딩 기조로 정립했습니다.', 'Curated design file distributions and peer feedback formats as central branding goals.'),
        metrics: t('크리에이터 간 에셋 라이브러리 배포 및 커뮤니티 누적 회원 500명 돌파.', 'Successfully distributed graphic libraries, building a 500+ member library hub.')
      }
    },
    // Site
    {
      id: 'designpick',
      type: 'site',
      category: 'brand',
      title: 'Design Pick',
      slogan: t('엄선된 비주얼 디자인 큐레이션', 'Curated visuals that define modern layouts'),
      description: t('타이포그래피와 정교한 구조적 레이아웃을 제공하는 비주얼 디자인 큐레이션 플랫폼입니다.', 'A visual design curation platform delivering structural grids and typography rules.'),
      tags: ['UI/UX Design', 'Brand Identity', 'Curation'],
      link: 'https://designs.kro.kr',
      details: {
        background: t('디자이너와 개발자들이 실무에서 영감을 얻을 수 있는 구조적 폰트 스펙트럼과 그리드 가이드를 제시하기 위해 설계되었습니다.', 'Created to provide clean grid hierarchies and structural font rules for product layouts.'),
        strategy: t('명품 레이아웃과 모노톤의 대비를 활용해 시각적 피로를 줄이고 직관성을 높이는 그리드를 고안했습니다.', 'Utilized monochrome contrasts and strict margins to minimize UI friction and maximize readability.'),
        metrics: t('비주얼 아카이브 조회수 향상 및 유수 디자인 커뮤니티 인지도 기여.', 'Improved visual archive metrics and gained recognized indexing in local design forums.')
      }
    },
    {
      id: 'planor',
      type: 'site',
      category: 'marketing',
      title: 'Planor',
      slogan: t('가장 효율적인 협업 캘린더 플랫폼', 'Smart planning, seamless team coordination'),
      description: t('스마트한 일정 조율과 직관적인 업무 조율을 지원하는 협업 캘린더 웹 서비스입니다.', 'A collaborative team calendar service designed for effortless schedule sharing.'),
      tags: ['Product Design', 'Web Service', 'Marketing Strategy'],
      link: 'https://planor.kro.kr',
      details: {
        background: t('여러 도구로 파편화된 스케줄 협업을 단 하나의 유려한 타임라인에 통합하려는 취지에서 출발했습니다.', 'Developed to unify scattered schedules and project calendars into one streamlined timeline UI.'),
        strategy: t('카드 방식의 드래그 인터랙션과 연간/월간 보기의 시각적 경량화를 제품 디자인에 주입했습니다.', 'Applied lightweight annual/monthly view options and responsive drag layouts to the core product.'),
        metrics: t('릴리스 이후 실사용 유저 피드백 수집 및 브랜드 신뢰도 향상.', 'Collected valuable user feedback post-release, solidifying collaborative brand trust.')
      }
    },
    {
      id: 'naramarsami',
      type: 'site',
      category: 'development',
      title: '나랏말싸미',
      slogan: t('훈민정음 자모결합 원리를 담아낸 타자 연습', 'Interactive typing practice with Hunminjeongeum principles'),
      description: t('훈민정음 고유의 자모결합 원리를 현대적 인터랙션 디자인으로 재해석한 교육용 타자 연습 서비스입니다.', 'An educational typing service reinterpreting historical Hangeul assembly into interactive UI.'),
      tags: ['Interaction', 'EdTech', 'Development'],
      link: 'https://훈민정음.kro.kr',
      github: 'https://github.com/naramarsami/naramarsami',
      details: {
        background: t('한글의 자모음 결합 원리를 타이핑 경험과 연계하여 흥미를 자아내기 위해 기획되었습니다.', 'Designed to link Hangeul\'s assembly principles with typing experience for engagement.'),
        strategy: t('훈민정음 용자례를 현대적 인터랙션 디자인으로 재해석하여 한글 고유의 비주얼을 이끌어냈습니다.', 'Reinterpreted historical Hunminjeongeum structures into modern interactive UI.'),
        metrics: t('교육 플랫폼 내 바이럴 활성화 및 사용자 평균 연습 세션 시간 향상.', 'Activated viral sharing and increased user practice session duration.')
      }
    },
    {
      id: 'figmalibrary',
      type: 'site',
      category: 'brand',
      title: 'Figma Asset Library',
      slogan: t('디자인 생산성을 개선하는 오픈소스 UI 라이브러리', 'Distributing open-source Figma libraries to boost workflow speed'),
      description: t('피그마 커뮤니티 프로필(@seoharo)을 통해 디자이너와 개발자를 위한 고품질 UI/UX 템플릿과 디자인 리소스 라이브러리를 공유합니다.', 'Sharing high-quality UI/UX templates and design resource libraries for designers and developers via Figma Community.'),
      tags: ['Figma Creator', 'UI/UX Library', 'Open Source Asset'],
      link: 'https://www.figma.com/@seoharo',
      details: {
        background: t('사용자의 작업 속도를 단축하고 디자인 완성도를 높일 수 있도록 설계된 디자인 키트입니다.', 'A design kit conceptualized to reduce layout overhead and optimize overall visual alignment.'),
        strategy: t('피그마의 최신 오토 레이아웃과 배리언트 시스템을 엄격히 적용하여 실무에 즉시 사용할 수 있도록 배포했습니다.', 'Applied Figma Auto Layout and Variants strictly, creating drop-in component blocks for mockups.'),
        metrics: t('피그마 커뮤니티 배포 및 오픈소스 디자인 리소스 기여.', 'Published to Figma Community and contributed to open-source design resources.')
      }
    },
    // Workplace
    {
      id: 'luxeret',
      type: 'workplace',
      category: 'marketing',
      title: 'LUXERET',
      slogan: t('감각과 데이터를 연결하는 브랜드 마케팅', 'Connecting senses and data via brand marketing'),
      description: t('브랜드 가치관과 성과 지표를 연결하는 것을 목표로 마케팅 전반을 총괄하고 있습니다.', 'Working as a brand marketer, aiming to connect brand values with performance metrics.'),
      tags: ['Marketer', 'Viral Campaign', 'Funnel Analysis'],
      details: {
        background: t('데이터 수치만 쫓는 차가운 마케팅이 아닌, 고객의 마음에 닿는 감각적 비주얼과 지표를 융합하기 위해 시작했습니다.', 'Started to fuse data-driven analytics with premium visual assets that touch users hearts.'),
        strategy: t('마케팅 퍼널 구간별 도달률 데이터 분석과 비주얼 톤 보정을 결합하는 다변화 전략을 실행했습니다.', 'Executed multi-tier visual branding adjustments alongside funnel analytics to optimize conversion.'),
        metrics: t('마케팅 채널 유입량 향상 기여 및 브랜드 신뢰도 획득.', 'Contributed to marketing inbound acquisition and expanded overall conversion trust.')
      }
    },
    {
      id: 'hannlabs',
      type: 'workplace',
      category: 'brand',
      title: 'HANN LABS™',
      slogan: t('상상을 시각화하는 브랜드 디자인', 'Visualizing imagination through brand design'),
      description: t('HANN LABS™에서 디자이너로 활동하며, 기획된 브랜딩 비주얼 아이덴티티와 프로모션 소재 제작을 지원하고 있습니다.', 'Working as a staff designer, assisting in visual identity guidelines and promotional asset production.'),
      tags: ['Staff Designer', 'Identity Guide', 'Visual Assets'],
      details: {
        background: t('아이디어를 실제 눈에 보이는 그래픽 디자인 가이드라인으로 형태화하고 다지기 위한 연구 지원입니다.', 'Conceived to transform conceptual ideas into solid graphic layout guidelines for digital platforms.'),
        strategy: t('일관성 있는 격자선 구조와 로고 서체의 무결함을 기저에 둔 서브 그래픽 소스 제작에 임했습니다.', 'Focused on strict grid layouts and typography guidelines to support coherent visual assets.'),
        metrics: t('팀 내 비주얼 자산 관리 프로세스 확립 및 브랜딩 가이드 구현 지원.', 'Supported visual asset workflows, contributing to final brand identity guidelines.')
      }
    },
    {
      id: 'simplx',
      type: 'workplace',
      category: 'development',
      title: 'SIMPLX',
      slogan: t('시스템 최적화 및 도구 설계', 'System optimization and custom tool design'),
      description: t('효율성을 최우선으로 지향하며, 시스템 최적화를 위한 디스코드 봇 소프트웨어 개발 및 연구에 기여했습니다.', 'Contributing to system optimization scripts and custom Discord bot software design for workflow efficiency.'),
      tags: ['Developer', 'Automation Script', 'System Optimization'],
      details: {
        background: t('반복되는 인프라 운영 작업의 피로도를 해결하고 리소스 모니터링을 효율화하기 위해 기획되었습니다.', 'Initiated to resolve operational overhead in server infrastructures and automate resource monitors.'),
        strategy: t('비동기 스레드 구조 최적화 및 모듈화된 명령 툴 세트를 설계해 유지보수성을 극대화했습니다.', 'Optimized asynchronous worker modules and engineered extensible toolsets for clean maintenance.'),
        metrics: t('시스템 모니터링 자동화 성공 및 인프라 대응 효율 향상.', 'Automated key system tracking nodes, leading to increased server stability and response time.')
      }
    }
  ];

  // Route-based filtering
  const filteredItems = displayItems.filter(item => {
    if (currentPath === '/design') return item.category === 'brand';
    if (currentPath === '/marketing') return item.category === 'marketing';
    if (currentPath === '/development') return item.category === 'development';
    return true; // '/portfolio' or fallback
  });

  const filterTabs = [
    { label: t('전체', '전체'), path: '/portfolio' },
    { label: t('디자인', '디자인'), path: '/design' },
    { label: t('마케팅', '마케팅'), path: '/marketing' },
    { label: t('개발', '개발'), path: '/development' }
  ];

  // Helper for localized asset types
  const getLocalizedType = (type: string) => {
    if (type === 'discord') return t('디스코드', '디스코드');
    if (type === 'site') return t('웹사이트', '웹사이트');
    return t('경력 소속', '경력 소속');
  };

  return (
    <div className="relative min-h-screen bg-black text-white select-none">
      
      {/* Sticky Category Filter Pills */}
      <div className="sticky top-12 sm:top-[53px] z-30 w-full bg-black/60 backdrop-blur-md border-b border-white/5 py-4 px-6 flex justify-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {filterTabs.map(tab => {
          const isActive = currentPath === tab.path || (tab.path === '/portfolio' && !['/design', '/marketing', '/development'].includes(currentPath));
          return (
            <button
              key={tab.path}
              onClick={() => {
                navigate(tab.path);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4.5 py-1.5 rounded-full text-[9px] font-bold tracking-wider uppercase border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                  : 'bg-white/5 border-white/5 text-zinc-450 hover:text-white hover:bg-white/10 hover:border-white/10'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Figma Community Grid Gallery */}
      <div className="max-w-6xl mx-auto px-6 py-24 sm:py-28">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onClick={() => setSelectedItem(item)}
              className="bg-[#101010]/40 border border-white/5 rounded-xl overflow-hidden hover:border-white/12 transition-all duration-300 group flex flex-col justify-between cursor-pointer h-full shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.7)] hover:-translate-y-0.5"
            >
              {/* Thumbnail header */}
              <div className="aspect-[1.6/1] w-full overflow-hidden relative border-b border-white/5 bg-zinc-950">
                <img
                  src={
                    item.id === 'rofolder' ? '/assets/rofolder-new.jpg' :
                    item.id === 'limited' ? '/assets/limited.png' :
                    item.id === 'designpick' ? '/assets/designpick.png' :
                    item.id === 'planor' ? '/assets/planor.png' :
                    item.id === 'naramarsami' ? '/assets/naramarsami.png' :
                    item.id === 'figmalibrary' ? '/assets/limited-banner.png' :
                    item.id === 'luxeret' ? '/assets/luxeret.png' :
                    item.id === 'simplx' ? '/assets/simplx.png' :
                    '/assets/hannlabs.png'
                  }
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-bold text-zinc-300 uppercase tracking-wider">
                  {getLocalizedType(item.type)}
                </div>
              </div>

              {/* Metadata content body */}
              <div className="p-4 flex flex-col justify-between flex-grow gap-3.5">
                <div className="space-y-1.5">
                  <h3 className="text-[12.5px] font-bold text-white font-display tracking-tight group-hover:text-zinc-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-zinc-400 font-normal line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Sub-tags list */}
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-1.5 py-0.5 bg-white/5 border border-white/5 rounded text-[8px] font-bold text-zinc-450 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Figma Community Social Footer */}
                <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <img 
                      src="/assets/seoharo-logo-round.png" 
                      className="w-4 h-4 rounded-full border border-white/10 bg-black" 
                      alt="SEOHARO" 
                    />
                    <span className="text-[9px] font-bold text-zinc-400 font-sans tracking-wide">SEOHARO</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-[8.5px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1 transition-colors">
                      <Heart size={9} className="text-zinc-500 fill-zinc-500/10 group-hover:text-[#ff2d55] group-hover:fill-[#ff2d55]/10 transition-colors" />
                      {item.id === 'rofolder' ? '78' :
                       item.id === 'limited' ? '54' :
                       item.id === 'designpick' ? '32' :
                       item.id === 'planor' ? '28' :
                       item.id === 'naramarsami' ? '40' :
                       item.id === 'figmalibrary' ? '15' :
                       item.id === 'luxeret' ? '12' :
                       item.id === 'hannlabs' ? '18' : '22'}
                    </span>
                    <span className="flex items-center gap-1 transition-colors">
                      <Eye size={9} />
                      {item.id === 'rofolder' ? '1.2K' :
                       item.id === 'limited' ? '920' :
                       item.id === 'designpick' ? '480' :
                       item.id === 'planor' ? '390' :
                       item.id === 'naramarsami' ? '620' :
                       item.id === 'figmalibrary' ? '190' :
                       item.id === 'luxeret' ? '150' :
                       item.id === 'hannlabs' ? '210' : '290'}
                    </span>
                  </div>
                </div>

              </div>

            </motion.div>
          ))}
        </motion.div>
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
              className="fixed top-0 right-0 z-50 w-full sm:w-[500px] md:w-[540px] h-full bg-[#0d1117] border-l border-white/5 p-8 md:p-12 overflow-y-auto flex flex-col justify-between shadow-2xl font-sans"
            >
              <div className="space-y-10">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <div>
                    <span className="text-[11px] font-sans tracking-wide text-zinc-400 uppercase font-semibold">
                      {t(`아카이브 — ${getLocalizedType(selectedItem.type).toUpperCase()}`, `ARCHIVE — ${getLocalizedType(selectedItem.type).toUpperCase()}`)}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white font-display mt-1">
                      {selectedItem.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1.5 rounded-full border border-white/5 text-zinc-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Body Content */}
                <div className="space-y-8 font-normal text-zinc-200 text-xs sm:text-sm">
                  {selectedItem.slogan && (
                    <div className="border-l-2 border-white/10 pl-4 py-1 italic text-zinc-300 font-medium">
                      "{selectedItem.slogan}"
                    </div>
                  )}

                  <div className="space-y-2">
                    <span className="text-[10px] sm:text-[11px] font-sans tracking-wider text-zinc-400 uppercase flex items-center gap-1.5 font-bold border-b border-white/5 pb-1 w-full">
                      <Compass size={11} className="text-zinc-450" />
                      {t('개요 및 역할', 'Overview & Role')}
                    </span>
                    <p className="leading-relaxed whitespace-pre-line text-zinc-300 pt-1 text-xs sm:text-[13px]">
                      {selectedItem.description}
                    </p>
                  </div>

                  {selectedItem.details && (
                    <>
                      <div className="space-y-3">
                        <span className="text-[10px] sm:text-[11px] font-sans tracking-wider text-zinc-400 uppercase flex items-center gap-1.5 font-bold border-b border-white/5 pb-1 w-full">
                          <Sparkles size={11} className="text-zinc-450" />
                          {t('기획 및 디자인 전략', 'Planning & Design Strategy')}
                        </span>
                        <div className="space-y-2 pt-1 text-xs sm:text-[13px] leading-relaxed text-zinc-300">
                          <p>{selectedItem.details.background}</p>
                          <p>{selectedItem.details.strategy}</p>
                        </div>
                      </div>

                      <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5 space-y-2.5">
                        <span className="text-[10px] sm:text-[11px] font-sans tracking-wider text-zinc-400 uppercase flex items-center gap-1.5 font-bold border-b border-white/5 pb-1 w-full">
                          <Award size={11} className="text-zinc-500" />
                          {t('역량 증명 및 가치', 'Proven Metrics & Value')}
                        </span>
                        <p className="leading-relaxed text-[#5ac8fa] font-bold pt-1 text-xs sm:text-[13.5px]">
                          {selectedItem.details.metrics}
                        </p>
                      </div>
                    </>
                  )}

                  {selectedItem.achievements && (
                    <div className="space-y-3">
                      <span className="text-[10px] sm:text-[11px] font-sans tracking-wider text-zinc-400 uppercase flex items-center gap-1.5 font-bold border-b border-white/5 pb-1 w-full">
                        <Award size={11} className="text-zinc-450" />
                        {t('주요 활동 및 성과', 'Key Activities & Achievements')}
                      </span>
                      <ul className="space-y-2.5 pt-1">
                        {selectedItem.achievements.map((ach, index) => (
                          <li key={index} className="flex gap-2.5 leading-relaxed text-zinc-300 text-xs sm:text-[13px]">
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
              <div className="border-t border-white/5 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-[7.5px] leading-relaxed text-zinc-650 tracking-wider font-mono uppercase text-center sm:text-left max-w-xs">
                  Trademarks (RoFolder, Limited™, HANN LABS™, LUXERET, SIMPLX) are properties of their respective owners.
                </p>
                <div className="flex items-center gap-3">
                  {selectedItem.link && (
                    <a
                      href={selectedItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-white/5 border border-white/10 hover:border-zinc-300/30 hover:bg-white/[0.04] text-white text-[10px] font-bold uppercase tracking-wider rounded-full cursor-pointer transition-all shadow-sm flex items-center gap-1.5"
                    >
                      {t('사이트 방문', 'Visit')}
                      <ExternalLink size={10} className="inline" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-6 py-2.5 toss-blue-btn rounded-full cursor-pointer shadow-md text-[10px] font-bold"
                  >
                    {t('닫기', 'Close')}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
