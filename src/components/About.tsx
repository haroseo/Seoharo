import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

function GlowCard({ children, className = "", style = {}, onClick, layout }: { children: React.ReactNode, className?: string, style?: any, onClick?: () => void, layout?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: -9999, y: -9999 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      ref={cardRef}
      layout={layout}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: -9999, y: -9999 });
      }}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.04), transparent 80%)`
        }}
      />
      {children}
    </motion.div>
  );
}

export default function About() {
  const { t } = useLanguage();

  const [activeStat, setActiveStat] = useState<number | null>(null);

  const details = [
    {
      title: t('시각 디자인 & 브랜딩', 'Visual Design & Branding'),
      description: t(
        'HANN LABS™에서 디자인을 배우며 보조 스태프로 참여하고, 브랜드 비주얼 기획 경험을 기반으로 Limited™의 비주얼 정체성을 구상해 나갑니다.',
        'Learning design and participating as assistant staff at HANN LABS™, and conceptualizing the visual identity of Limited™ based on brand design experience.'
      ),
    },
    {
      title: t('브랜드 마케팅', 'Brand Marketing'),
      description: t(
        'LUXERET의 마케터로서 마케팅 활동에 참여하고 있으며, 로폴더와 Limited™ 채널을 통해 다양한 유저 소통과 채널 활성화를 경험했습니다.',
        'Participating as a marketer at LUXERET, planning marketing campaigns and gaining experience in user communication and channel growth through RoFolder and Limited™.'
      ),
    },
    {
      title: t('웹 서비스 기획 & 개발', 'Web Service Development'),
      description: t(
        'Design Pick, 나랏말싸미, Planor 등 실제 작동하는 웹 서비스들을 직접 기획하고 구현합니다.',
        'Directly planning and implementing functional web services like Design Pick, Naramarsami, and Planor.'
      ),
    },
    {
      title: t('비즈니스 운영', 'Business Operations'),
      description: t(
        '로폴더(RoFolder)의 CEO로서 청소년 및 청년 창업 활성화를 장려하는 네트워킹 커뮤니티를 총괄하고 운영을 이끕니다.',
        'Leading and managing networking communities that support and encourage youth startups as the CEO of RoFolder.'
      ),
    },
  ];

  const stats = [
    {
      label: t('경력 수', 'Experience'),
      value: '30+',
      proof: t(
        '로폴더 대표, Limited™ 설립자, LUXERET 마케터, HANN LABS™ 디자이너, SIMPLX 개발자 등 30개 이상의 조직에서 다양한 역할을 경험하며 실무 역량을 길렀습니다.',
        'Having worked with 30+ organizations, covering roles from CEO and Founder to Marketer, Designer, and Developer - proving wide cross-disciplinary experience.'
      )
    },
    {
      label: t('소통 유저 수', 'Communities'),
      value: '1,200+',
      proof: t(
        '총합 1,200명 이상의 로폴더 및 Limited™ 커뮤니티 유저들과 직접 소통하며 채널을 관리하고 피드백을 모았습니다.',
        'Communicating with over 1,200 users in RoFolder and Limited™ communities, managing channels and gathering feedback.'
      )
    },
    {
      label: t('누적 프로젝트', 'Projects'),
      value: '8+',
      proof: t(
        '웹 서비스 기획·개발부터 디자인, 브랜딩, 데이터 분석까지 8개 이상의 다각적 프로젝트 실행 경험은 경계를 넘나드는 문제 해결력을 증명합니다.',
        'With experience executing over 8 diverse projects ranging from planning, design, and branding to web development and data analysis, proving cross-boundary problem-solving capabilities.'
      )
    }
  ];

  return (
    <section 
      id="about" 
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden border-b border-[#373737]"
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none" />
      
      {/* Figma Selection Boundary Box */}
      <div className="absolute inset-4 sm:inset-6 border border-[#18a0fb]/20 rounded-2xl pointer-events-none z-10">
        <div className="absolute -top-2.5 left-4 px-1.5 py-0.5 bg-[#18a0fb] text-white text-[8px] font-bold font-mono rounded">
          # About Metrics Frame
        </div>
        {/* Handles */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-[#18a0fb] rounded-sm" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-[#18a0fb] rounded-sm" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-[#18a0fb] rounded-sm" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-[#18a0fb] rounded-sm" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
          
          {/* Main Info Side */}
          <div className="space-y-12">
            <div className="space-y-4">
              <p className="section-overline">ABOUT / CAPABILITIES</p>
              <h2 className="section-title mt-2 font-display bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent font-bold">
                {t('디자인, 마케팅, 프로그래밍.', 'Design, Marketing, Programming.')}
              </h2>
              <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-zinc-200 font-normal tracking-tight">
                {t(
                  '시각적인 균형을 디자인하고, 효과적인 마케팅 전략을 고민하며, 논리적인 구조와 깨끗한 코드로 웹 서비스를 구현합니다. 단순히 단일 업무에 머무르지 않고, 아이디어를 직접 실현해내는 구조적 크리에이터를 지향합니다.',
                  'Designing visual balance, planning effective marketing strategies, and implementing web services with logical structure and clean code. I aim to be a structural creator who directly realizes ideas rather than staying within a single task.'
                )}
              </p>
            </div>

            {/* Figma Auto-Layout Control Panels style */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid gap-6 sm:grid-cols-2"
            >
              {details.map((item, index) => (
                <GlowCard
                  key={index}
                  className="bg-[#181818]/60 border border-[#373737] p-6 rounded-xl transition-all duration-300 relative"
                >
                  {/* Fake Figma Auto Layout Header */}
                  <div className="absolute top-2 right-3 text-[7.5px] font-mono text-zinc-600 flex items-center gap-1.5 select-none">
                    <span>↓ Auto Layout</span>
                    <span>Gap: 12px</span>
                  </div>
                  
                  <h3 className="text-sm font-bold text-white mb-3 font-display flex items-center gap-2">
                    <span className="text-[#18a0fb] font-mono text-[9px] bg-[#18a0fb]/10 px-1 py-0.5 rounded">Frame {index+1}</span>
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-zinc-300 font-normal tracking-tight">
                    {item.description}
                  </p>
                </GlowCard>
              ))}
            </motion.div>
          </div>

          {/* Profile Card Side - Figma Properties Inspector style */}
          <GlowCard className="bg-[#2b2b2b]/90 border border-[#373737] p-8 rounded-2xl lg:sticky lg:top-28 text-[11px] font-mono shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#373737] pb-3 mb-6 select-none">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">❖ Active Inspector</span>
              <span className="text-[8px] bg-white/5 px-1 py-0.5 rounded text-[#a259ff]">Component</span>
            </div>

            <div className="space-y-5">
              
              <div className="space-y-1.5">
                <label className="text-zinc-500 text-[9px] uppercase tracking-wider block">Areas of Activity</label>
                <div className="bg-[#1e1e1e] border border-[#373737] p-3 rounded-lg text-zinc-200 text-xs font-semibold leading-relaxed font-sans">
                  CEO · Founder · Marketer · Designer · Developer
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-500 text-[9px] uppercase tracking-wider block">Affiliation & Role</label>
                <div className="bg-[#1e1e1e] border border-[#373737] p-3 rounded-lg text-zinc-200 text-xs font-medium leading-relaxed font-sans">
                  RoFolder CEO · Limited™ Founder · LUXERET Marketer · HANN LABS™ Staff Designer · SIMPLX Developer
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-500 text-[9px] uppercase tracking-wider block">Core Approach</label>
                <div className="bg-[#1e1e1e] border border-[#373737] p-3 rounded-lg text-zinc-200 text-xs leading-relaxed font-sans">
                  {t(
                    '사용자 피드백 중심 설계, 스토리텔링 및 주도적 서비스 빌딩',
                    'User feedback-centric design, storytelling, and proactive service building'
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-500 text-[9px] uppercase tracking-wider block">Key Strengths</label>
                <div className="bg-[#1e1e1e] border border-[#373737] p-3 rounded-lg text-zinc-200 text-xs leading-relaxed font-sans">
                  {t(
                    '비주얼 디렉션 · 유저 인터랙션 기획 · 커뮤니티 매니지먼트',
                    'Visual Direction · Interaction Planning · Community Management'
                  )}
                </div>
              </div>

            </div>
          </GlowCard>
        </div>

        {/* Interactive Stats Grid (Figma Local Variables style) */}
        <div className="pt-16 border-t border-[#373737]">
          <div className="text-center mb-10 select-none">
            <p className="section-overline">LOCAL VARIABLES</p>
            <h3 className="text-2xl font-bold tracking-tight text-white font-display mt-2">{t('핵심 지표', 'Core Metrics')}</h3>
            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">{t('각 변수 행을 클릭하여 증명하는 역량을 확인해보세요', 'Click each variable to verify key capabilities')}</p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto">
            {stats.map((stat, idx) => {
              const isActive = activeStat === idx;
              // Border left color based on Figma Variable Types (String = orange, Number = purple, Boolean = green)
              const typeColor = idx === 0 ? 'border-l-4 border-l-[#ff7262]' : idx === 1 ? 'border-l-4 border-l-[#a259ff]' : 'border-l-4 border-l-[#0acf83]';
              return (
                <GlowCard
                  key={idx}
                  layout
                  onClick={() => setActiveStat(isActive ? null : idx)}
                  className={`bg-[#2b2b2b] border border-[#373737] p-5 text-left relative overflow-hidden transition-all duration-300 cursor-pointer group hover:scale-[1.015] active:scale-[0.985] ${typeColor} ${
                    isActive ? 'shadow-[0_0_15px_rgba(24,160,251,0.15)] border-[#18a0fb]' : ''
                  }`}
                >
                  {/* Type Badge */}
                  <div className="absolute right-4 top-4 text-[7px] font-mono text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded uppercase tracking-wider">
                    {idx === 0 ? 'Collection' : idx === 1 ? 'Number' : 'Boolean'}
                  </div>

                  <p className="text-[10px] font-bold text-zinc-500 pr-12 font-mono">
                    {stat.label}
                  </p>
                  
                  <p className="text-3xl font-extrabold tracking-tight text-white mt-3 mb-2 font-display">
                    {stat.value}
                  </p>
                  
                  <div className="h-px bg-[#373737] w-full my-3" />
                  
                  <div className="relative overflow-hidden min-h-[40px] flex items-center">
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.p
                          key="proof"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-[11px] leading-relaxed text-zinc-200 font-medium tracking-tight font-sans"
                        >
                          {stat.proof}
                        </motion.p>
                      ) : (
                        <motion.p
                          key="click-me"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.6 }}
                          exit={{ opacity: 0 }}
                          className="text-[9px] text-[#18a0fb] font-bold tracking-wide uppercase hover:text-[#0c8ce9] transition-colors font-mono"
                        >
                          {t('자세히 보기', 'CLICK TO READ')} ➔
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
