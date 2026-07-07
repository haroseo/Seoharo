import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const [activeStat, setActiveStat] = useState<number | null>(null);

  const details = [
    {
      title: t('시각 디자인', 'Visual Design'),
      description: t('사용자의 시선 흐름을 고려하여 정보를 아름답고 조화롭게 정렬하고, 완성도 높은 디테일의 비주얼을 설계합니다.', 'Designs visuals with rich details and balances information based on the user\'s visual flow.'),
    },
    {
      title: t('브랜드 마케팅', 'Brand Marketing'),
      description: t('단순 노출을 넘어, 유저에게 제품의 고유한 가치를 스토리텔링으로 전달하여 브랜드 팬덤을 구축합니다.', 'Transmits the unique value of products via storytelling to build strong brand loyalty.'),
    },
    {
      title: t('웹 서비스 기획', 'Service Planning'),
      description: t('유저 피드백과 데이터를 분석하여 핵심 문제를 정의하고, 해결을 위한 화면 구조와 제품 프로세스를 고안합니다.', 'Defines problems by analyzing user feedback and logs to structure screen layouts and flows.'),
    },
    {
      title: t('비즈니스 운영', 'Business Operations'),
      description: t('팀 리더십과 소통 능력을 발휘하여 공동체 내 협업 구조를 만들고, 주도적으로 프로젝트를 이끕니다.', 'Applies leadership to build collaboration structures, taking proactive ownership of teams.'),
    },
  ];

  const stats = [
    {
      label: t('가상 공간 에셋 리드 및 기획', 'Virtual Sandbox Director'),
      value: '30+',
      proof: t('로블록스 및 제페토 등 가상 세계 30개 이상의 창작 조직에서 UI 디자인, 그래픽 아셋 기획을 주도했습니다.', 'Directed graphics and UI layouts across 30+ virtual project clubs, driving visual design directions.'),
    },
    {
      label: t('유저 커뮤니티 누적 구성원', 'Cumulative Community Members'),
      value: '2,000+',
      proof: t('총합 2,000명 규모의 대규모 유저 소통 채널(로폴더 등)을 개설하고 기획/운영하여 유저 참여를 이끌었습니다.', 'Created and operated user channels with over 2,000 total members, fostering highly active community environments.'),
    },
    {
      label: t('디스코드 소통망 활성화 멤버', 'Active Networking Members'),
      value: '700+',
      proof: t('자율 네트워킹을 위한 디스코드 채널에 실시간 700명 이상의 유저를 유치하고 운영하고 있습니다.', 'Attracted and managed 700+ active networking users in direct discord spaces, maintaining robust engagement.'),
    },
  ];

  return (
    <section 
      id="about" 
      className="relative py-12 overflow-hidden"
    >
      <div className="relative z-10 space-y-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
          
          {/* Main Info Side */}
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#18a0fb] uppercase">
                {t('핵심 역량', 'CAPABILITIES & VALUES')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent font-extrabold tracking-tight mt-2">
                {t('디자인, 마케팅, 그리고 코딩.', 'Design, Marketing, and Programming.')}
              </h2>
              <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-zinc-400 font-normal tracking-tight">
                {t(
                  '시각적인 균형을 디자인하고, 효과적인 마케팅 전략을 고민하며, 논리적인 구조와 깨끗한 코드로 웹 서비스를 구현합니다. 단순히 단일 업무에 머무르지 않고, 아이디어를 직접 실현해내는 구조적 크리에이터를 지향합니다.',
                  'Designing visual balance, planning effective marketing strategies, and implementing web services with logical structure and clean code. I aim to be a structural creator who directly realizes ideas rather than staying within a single task.'
                )}
              </p>
            </div>

            {/* Custom Glassmorphism Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid gap-6 sm:grid-cols-2"
            >
              {details.map((item, index) => (
                <div
                  key={index}
                  className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-[#18a0fb]/30 transition-all duration-500"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#18a0fb] to-[#a259ff] opacity-40" />
                  
                  <h3 className="text-sm font-bold text-white mb-2 font-display flex items-center gap-2">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-400 font-normal tracking-tight">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Profile Card Side - Cosmic Dashboard Info Panel */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden lg:sticky lg:top-28 shadow-2xl">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#a259ff]/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 space-y-6 text-xs">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{t('활동 분석', 'PROFILE META')}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#a259ff] animate-ping" />
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-zinc-500 text-[8.5px] uppercase tracking-wider">{t('활동 도메인', 'DOMAINS')}</span>
                  <p className="text-zinc-200 font-semibold text-[13px] leading-relaxed">
                    CEO · Founder · Marketer · Designer · Developer
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-zinc-500 text-[8.5px] uppercase tracking-wider">{t('소속 이력', 'AFFILIATIONS')}</span>
                  <p className="text-zinc-300 text-[12px] leading-relaxed">
                    RoFolder CEO · Limited™ Founder · LUXERET Marketer · HANN LABS™ Staff Designer · SIMPLX Developer
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-zinc-500 text-[8.5px] uppercase tracking-wider">{t('핵심 철학', 'CREATIVE PHILOSOPHY')}</span>
                  <p className="text-zinc-300 text-[11.5px] leading-relaxed">
                    {t(
                      '사용자 피드백 중심 설계, 스토리텔링 및 주도적 서비스 빌딩',
                      'User feedback-centric design, storytelling, and proactive service building'
                    )}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-zinc-500 text-[8.5px] uppercase tracking-wider">{t('강점 분야', 'STRENGTHS')}</span>
                  <p className="text-zinc-300 text-[11.5px] leading-relaxed">
                    {t(
                      '비주얼 디렉션 · 유저 인터랙션 기획 · 커뮤니티 매니지먼트',
                      'Visual Direction · Interaction Planning · Community Management'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Stats Grid (Galaxy Metric Widgets) */}
        <div className="pt-16 border-t border-white/5">
          <div className="text-center mb-12 select-none">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#a259ff] uppercase">METRICS</span>
            <h3 className="text-2xl font-extrabold tracking-tight text-white font-display mt-2">{t('핵심 증명 지표', 'Proven Metrics')}</h3>
            <p className="text-xs text-zinc-500 mt-1.5">{t('메트릭 카드를 클릭하여 입증 데이터를 확인해보세요', 'Click each metric card to reveal detailed proof')}</p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto">
            {stats.map((stat, idx) => {
              const isActive = activeStat === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStat(isActive ? null : idx)}
                  className={`glass-panel p-6 text-left relative overflow-hidden transition-all duration-350 cursor-pointer group hover:scale-[1.015] active:scale-[0.985] ${
                    isActive ? 'border-[#18a0fb]/40 shadow-[0_0_20px_rgba(24,160,251,0.1)]' : ''
                  }`}
                >
                  <p className="text-[9px] font-bold text-zinc-500 tracking-wider">
                    {stat.label}
                  </p>
                  
                  <p className="text-4xl font-black tracking-tight text-white mt-4 mb-2 font-display bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  
                  <div className="h-px bg-white/10 w-full my-4" />
                  
                  <div className="relative overflow-hidden min-h-[44px] flex items-center">
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.p
                          key="proof"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-[11px] leading-relaxed text-zinc-300 font-medium tracking-tight font-sans"
                        >
                          {stat.proof}
                        </motion.p>
                      ) : (
                        <motion.p
                          key="click-me"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.6 }}
                          exit={{ opacity: 0 }}
                          className="text-[9px] text-[#18a0fb] font-bold tracking-wider uppercase hover:text-white transition-colors"
                        >
                          {t('자세히 보기', 'CLICK TO EXPAND')} ➔
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
