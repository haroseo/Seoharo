import { useLanguage } from './LanguageContext';

export default function About() {
  const { t } = useLanguage();

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
      label: t('경력 수', 'Organizations'),
      value: '30+',
      proof: t(
        '로폴더 대표, Limited™ 설립자, LUXERET 마케터, HANN LABS™ 디자이너 등 30개 이상의 조직에서 다양한 역할을 경험하며 실무 역량을 길렀습니다.',
        'Having worked with 30+ organizations, covering roles from CEO and Founder to Marketer and Designer - proving wide cross-disciplinary experience.'
      )
    },
    {
      label: t('소통 유저 수', 'Users Reached'),
      value: '1,200+',
      proof: t(
        '총합 1,200명 이상의 로폴더 및 Limited™ 커뮤니티 유저들과 직접 소통하며 채널을 관리하고 피드백을 모았습니다.',
        'Communicating with over 1,200 users in RoFolder and Limited™ communities, managing channels and gathering feedback.'
      )
    },
    {
      label: t('누적 프로젝트', 'Projects Done'),
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
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden border-b border-zinc-900"
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl space-y-24">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] items-start">
          
          {/* Main Info Side */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="section-title mt-2 font-display bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent font-bold tracking-tight">
                {t('디자인, 마케팅, 프로그래밍.', 'Design, Marketing, Programming.')}
              </h2>
              <p className="max-w-3xl text-sm sm:text-[15px] leading-relaxed text-zinc-300 font-normal tracking-tight">
                {t(
                  '시각적인 균형을 디자인하고, 효과적인 마케팅 전략을 고민하며, 논리적인 구조와 깨끗한 코드로 웹 서비스를 구현합니다. 단순히 단일 업무에 머무르지 않고, 아이디어를 직접 실현해내는 구조적 크리에이터를 지향합니다.',
                  'Designing visual balance, planning effective marketing strategies, and implementing web services with logical structure and clean code. I aim to be a structural creator who directly realizes ideas rather than staying within a single task.'
                )}
              </p>
            </div>

            {/* Flat Text-based Info List (No Card boxes) */}
            <div className="divide-y divide-zinc-900/80">
              {details.map((item, index) => (
                <div
                  key={index}
                  className="py-6 first:pt-0 last:pb-0 space-y-2"
                >
                  <h3 className="text-sm sm:text-base font-bold text-white font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 font-normal">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Details Side - Flat Grid Layout (No Card boxes) */}
          <div className="space-y-8 lg:sticky lg:top-28">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 text-zinc-300">
              
              <div className="space-y-2.5">
                <p className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">
                  {t('활동 분야', 'Areas of Activity')}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-white font-display leading-relaxed">
                  CEO · Founder · Marketer · Designer
                </p>
              </div>

              <div className="space-y-2.5">
                <p className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">
                  {t('소속 및 역할', 'Affiliation & Role')}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-zinc-300 font-sans leading-relaxed">
                  RoFolder CEO · Limited™ Founder · LUXERET Marketer · HANN LABS™ Staff Designer
                </p>
              </div>

              <div className="space-y-2.5">
                <p className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">
                  {t('핵심 지향점', 'Core Approach')}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-zinc-300 font-sans leading-relaxed">
                  {t(
                    '사용자 피드백 중심 설계, 스토리텔링 및 주도적 서비스 빌딩',
                    'User feedback-centric design, storytelling, and proactive service building'
                  )}
                </p>
              </div>

              <div className="space-y-2.5">
                <p className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">
                  {t('주요 강점', 'Key Strengths')}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-zinc-300 font-sans leading-relaxed">
                  {t(
                    '비주얼 디렉션 · 유저 인터랙션 기획 · 커뮤니티 매니지먼트',
                    'Visual Direction · Interaction Planning · Community Management'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Flat Stats Grid (No Cards, No circular charts) */}
        <div className="pt-16 border-t border-zinc-900">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold tracking-tight text-white font-display mt-2">{t('지표와 증명', 'Metrics & Proof')}</h3>
            <p className="text-xs text-zinc-500 mt-2 uppercase tracking-wider">{t('정량적 경험과 신뢰의 증명입니다', 'Quantitative proof of experience and trust')}</p>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-3 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="space-y-3.5 py-6 border-b sm:border-b-0 sm:border-r border-zinc-900 last:border-0 px-0 sm:px-8 first:pl-0 last:pr-0"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  {stat.label}
                </p>
                
                <p className="text-4xl sm:text-5xl font-black tracking-tighter text-white font-display">
                  {stat.value}
                </p>
                
                <p className="text-xs leading-relaxed text-zinc-400 font-normal">
                  {stat.proof}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
