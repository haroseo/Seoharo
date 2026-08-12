import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Compass, 
  Sparkles, 
  Award,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useRouter } from './router';
import SearchBar from './SearchBar';

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
        metrics: t('로폴더 디스코드 커뮤니티 멤버 700명 돌파 및 네트워킹 활성화.', 'Reached 700+ members in the Discord community and activated networking.')
      }
    },
    {
      id: 'limited',
      type: 'discord',
      category: 'brand',
      title: 'Limited™',
      slogan: t('오직 나만을 위한 제품, Limited™', 'One of a kind, crafted just for you'),
      description: t('가상 공간 및 게임 환경에 최적화된 그래픽 리소스와 커스텀 디자인 에셋을 공유하는 크리에이티브 라이브러리 스튜디오입니다.', 'Creative library studio sharing graphic resources and custom design assets optimized for virtual spaces and game environments.'),
      tags: ['Founder', 'Visual Design', 'Asset Library'],
      link: 'https://discord.gg/H92F7jQ2aA',
      achievements: [
        t('커스텀 디자인 에셋 배포 및 크리에이티브 피드 관리', 'Distributed custom visual design files and maintained creative design feeds'),
        t('가상 환경에 맞춰 최적화된 3D/2D graphic 템플릿 제작', 'Created streamlined 3D/2D visual mockup kits for virtual creators'),
        t('창작자들이 자유롭게 소통할 수 있는 피어 리뷰 허브 활성화', 'Fostered dynamic peer design review hubs for asset library sharing')
      ],
      details: {
        background: t('창작자들이 고품질 그래픽 에셋을 쉽게 확보하고 협업할 수 있는 창구를 열기 위해 설립되었습니다.', 'Launched to provide a drop-in graphic asset channel for creators to access high-quality items easily.'),
        strategy: t('엄선된 디자인 템플릿 배포와 상호 피드백 스페이스 운영을 브랜딩 기조로 정립했습니다.', 'Curated design file distributions and peer feedback spaces as a branding principle.'),
        metrics: t('크리에이터 간 에셋 라이브러리 배포 및 커뮤니티 누적 회원 500명 돌파.', 'Successfully distributed graphic libraries, building a 500+ member library hub.')
      }
    },
    {
      id: 'designpick',
      type: 'site',
      category: 'brand',
      title: 'Design Pick',
      slogan: t('엄선된 비주얼 디자인 큐레이션', 'Curated visuals that define modern layouts'),
      description: t('타이포그래피와 정교한 구조적 레이아웃을 제공하는 비주얼 디자인 큐레이션 플랫폼입니다.', 'A visual design curation platform delivering structured layouts and typographic references.'),
      tags: ['UI/UX Design', 'Brand Identity', 'Curation'],
      link: 'https://designs.kro.kr',
      details: {
        background: t('디자이너와 개발자들이 실무에서 영감을 얻을 수 있는 구조적 폰트 스펙트럼과 그리드 가이드를 제시하기 위해 설계되었습니다.', 'Designed to provide structural font spectrum and grid guides as practical inspiration.'),
        strategy: t('명품 레이아웃과 모노톤의 대비를 활용해 시각적 피로를 줄이고 직관성을 높이는 그리드를 고안했습니다.', 'Utilized monochrome contrasts and premium layouts to reduce visual fatigue and increase intuitiveness.'),
        metrics: t('비주얼 아카이브 조회수 향상 및 유수 디자인 커뮤니티 인지도 기여.', 'Improved visual archive metrics and gained recognized indexing in local design forums.')
      }
    },
    {
      id: 'planor',
      type: 'site',
      category: 'marketing',
      title: 'Planor',
      slogan: t('당신의 일상에 조화로운 시간 질서를 부여하는 스케줄러, Planor', 'Bringing harmonious order to your daily rhythm, Planor'),
      description: t('파편화된 일정과 협업 일정을 하나의 유려한 인터페이스에 통합하여 효율적인 일상 관리를 실현하는 캘린더 웹 서비스입니다.', 'A calendar web service unifying fragmented schedules and collaborative timelines.'),
      tags: ['Product Design', 'Web Service', 'Marketing Strategy'],
      link: 'https://planor.kro.kr',
      details: {
        background: t('일정 조율과 캘린더 파편화 문제를 해결하고 스케줄 프로세스의 온보딩을 개선하기 위해 설계되었습니다.', 'Developed to resolve fragmented scheduling and improve onboarding into schedule processes.'),
        strategy: t('부드러운 카드 드래그 제스처와 경량화된 연간/월간 타임라인 레이아웃을 통해 최상의 일정 사용성을 확보했습니다.', 'Applied smooth card drag gestures and lightweight timelines to secure superior schedule usability.'),
        metrics: t('사용자 친화적 협업 스케줄러 인터페이스 설계', 'Designed highly intuitive collaborative scheduler interfaces.')
      }
    },
    {
      id: 'typolab',
      type: 'site',
      category: 'development',
      title: 'TypoLab',
      slogan: t('훈민정음 자모결합 원리를 담아낸 인터랙티브 타이포랩', 'Interactive typography experiments with Hunminjeongeum principles'),
      description: t('한글의 조형적 가치와 자모 결합 원리를 현대적 인터랙션 디자인으로 풀어낸 실험적 웹 타이핑 서비스입니다.', 'An experimental web typing service exploring Hangul composition principles through interaction.'),
      tags: ['Typography', 'Interactive Design', 'Web Experiment'],
      link: 'https://훈민정음.kro.kr',
      github: 'https://github.com/naramarsami/naramarsami',
      details: {
        background: t('디자인과 프로그래밍의 융합을 통해 한글 자모음의 결합 메커니즘을 타이핑 인터랙션으로 표현했습니다.', 'Conceived to translate Hangul composition mechanics into typing interactions.'),
        strategy: t('훈민정음 고유의 용자례 구조를 분석하여 브라우저 환경에 맞는 인터랙티브 모션 그래픽으로 구현했습니다.', 'Analyzed classical composition structures to implement browser-friendly interactive motion graphics.'),
        metrics: t('인터랙티브 한글 타이포그래피 시스템 기획 및 구축', 'Planned and built interactive Hangul typography system.')
      }
    },
    {
      id: 'figmalibrary',
      type: 'site',
      category: 'brand',
      title: t('피그마 커뮤니티 프로필', 'Figma Community Profile'),
      slogan: t('디자인 자산과 템플릿 아카이빙', 'Archiving UI templates and design assets'),
      description: t('피그마 커뮤니티 프로필(@seoharo)을 통해 개인 작업물과 디자인 템플릿 에셋을 공유하며 다양한 크리에이터들과 소통합니다.', 'Sharing personal works and templates via Figma Community profile.'),
      tags: ['Figma Profile', 'UX/UI Design', 'Asset Archive'],
      link: 'https://www.figma.com/@seoharo',
      details: {
        background: t('개인적인 작업 과정에서 설계한 컴포넌트와 템플릿들을 체계적으로 축적하고 오픈소스 형태로 공유하기 위해 프로필을 개설했습니다.', 'Created profile to accumulate and share reusable components and templates.'),
        strategy: t('실용성이 우수하고 즉시 조립 가능한 구조로 컴포넌트를 설계하여 업로드하고 있습니다.', 'Designed highly reusable components for immediate assembly and upload.'),
        metrics: t('피그마 커뮤니티 계정 활성화 및 에셋 공유.', 'Active archiving and asset sharing on Figma Community.')
      }
    },
    {
      id: 'xeproject',
      type: 'site',
      category: 'development',
      title: 'Xe Project',
      slogan: t('개인 창작과 개발을 위한 실험실', 'A personal sandbox for creative development'),
      description: t('개인 창작 프로젝트로, 다양한 브라우저 기반 기술 스택과 새로운 기획 아이디어를 프로토타이핑하는 공간입니다.', 'A personal sandbox for prototyping new ideas and browser tech.'),
      tags: ['Personal', 'Development'],
      link: 'https://github.com/haroseo/Xe-project',
      github: 'https://github.com/haroseo/Xe-project',
      details: {
        background: t('개인 창작과 개발 실험을 통해 새로운 아이디어를 탐색하기 위한 프로젝트입니다.', 'Conceived to explore new technologies and ideas through personal experiments.'),
        strategy: t('빠른 프로토타이핑과 반복적인 실험을 통해 다양한 기술 스택을 직접 경험했습니다.', 'Rapidly built prototypes to experiment with multiple frameworks.'),
        metrics: t('개인 기술 역량 확장 및 창작 실험 기록', 'Documented tech stack experiences and structured sandbox builds.')
      }
    },
    {
      id: 'mindmap',
      type: 'site',
      category: 'development',
      title: 'Mindmap',
      slogan: t('마인드맵 기반 시각적 암기 학습 서비스', 'Visual mind mapping study tool'),
      description: t('개념과 연결고리를 직관적인 노드 네트워크로 시각화하여 사용자의 암기 및 학습 능률을 높여주는 지적 생산성 도구입니다.', 'A visual mind mapping study tool to improve memorization and learning efficiency.'),
      tags: ['Education', 'Data Mapping'],
      link: 'https://github.com/haroseo/Mindmap',
      github: 'https://github.com/haroseo/Mindmap',
      details: {
        background: t('암기 학습에서 마인드맵의 시각적 구조가 가진 가능성을 웹으로 구현하기 위해 제작했습니다.', 'Developed to translate cognitive benefits of mindmaps into web interactions.'),
        strategy: t('노드 기반의 연결 구조로 개념 간 관계를 직관적으로 표현하고 사용자 친화적인 UI를 구성했습니다.', 'Designed connection flows using node networks for intuitive relationships.'),
        metrics: t('마인드맵 기반 학습 도구 웹 구현', 'Implemented responsive canvas and concept mapping interfaces.')
      }
    },
    {
      id: 'crewcheck',
      type: 'site',
      category: 'development',
      title: 'Crewcheck',
      slogan: t('함수연구소 출석 체크 및 정산 자동화 툴', 'Automated attendance tracking for Function Factory'),
      description: t('함수연구소(Function Factory) 팀 내 출결 상태 및 일정 정산 프로세스를 TypeScript 기반으로 개발하여 관리 효율을 대폭 개선했습니다.', 'Developed a TypeScript-based attendance and settlement automation tool for the team.'),
      tags: ['TypeScript', 'Automation'],
      link: 'https://github.com/haroseo/Crewcheck',
      github: 'https://github.com/haroseo/Crewcheck',
      details: {
        background: t('함수연구소 팀 내 출석 관리의 번거로움을 해소하기 위해 직접 기획 및 개발했습니다.', 'Created to automate administrative overhead for the team.'),
        strategy: t('TypeScript를 활용해 안정적인 타입 시스템을 구축하고 간결한 대시보드 그리드를 채택했습니다.', 'Applied strict TypeScript typings and efficient dashboard grids.'),
        metrics: t('팀 출결 관리 자동화 시스템 구현', 'Fully automated attendance logs and simplified validations.')
      }
    },
    {
      id: 'hannbot',
      type: 'site',
      category: 'development',
      title: 'HANN BOT',
      slogan: t('디스코드 커뮤니티 자동화와 서버 관리의 표준', 'Establishing standards for Discord server automation'),
      description: t('디스코드 서버 운영의 효율을 극대화하기 위해 다채로운 관리 명령어와 자동 감지 로직을 갖춘 TypeScript 기반 서버 봇입니다.', 'A feature-rich Discord automation bot for server management.'),
      tags: ['Discord Bot', 'Automation'],
      link: 'https://github.com/haroseo/HANN-BOT',
      github: 'https://github.com/haroseo/HANN-BOT',
      details: {
        background: t('HANN LABS™ 소속 당시 팀 디스코드 서버 관리 효율화를 위해 직접 설계하고 개발한 봇입니다.', 'Designed and developed to optimize server management during team tenure.'),
        strategy: t('TypeScript의 강타입 시스템을 활용해 안정적인 명령어 처리와 이벤트 핸들링을 구현했습니다.', 'Constructed structured event handlers and robust processing.'),
        metrics: t('디스코드 서버 관리 자동화 봇 단독 개발', 'Delivered reliable Discord integration features.')
      }
    },
    {
      id: 'movtier',
      type: 'site',
      category: 'development',
      title: 'movtier',
      slogan: t('영화 및 미디어 콘텐츠 드래그 앤 드롭 티어 메이커', 'Draggable movie and contents tier list builder'),
      description: t('사용자가 선호하는 영화와 콘텐츠를 직관적인 티어 그리드 레이아웃에 직접 배치하고 공유할 수 있는 랭킹 플랫폼입니다.', 'A draggable tier list builder for movies and media.'),
      tags: ['Ranking', 'Vanilla JS'],
      link: 'https://github.com/haroseo/movtier',
      github: 'https://github.com/haroseo/movtier',
      details: {
        background: t('영화와 콘텐츠를 티어 형식으로 정리하고 공유하는 플랫폼을 직접 기획했습니다.', 'Conceived as a lightweight responsive cataloging and tiering tool.'),
        strategy: t('HTML 기반의 가벼운 구조로 빠른 렌더링과 직관적인 티어 배치 UI를 구현했습니다.', 'Implemented lightweight vanilla structures and draggable UI.'),
        metrics: t('콘텐츠 랭킹 큐레이션 서비스 제작', 'Created intuitive tier lists and curation pages.')
      }
    },
    {
      id: 'cokform',
      type: 'site',
      category: 'development',
      title: 'Cokform',
      slogan: t('사용자 반응형 초간단 폼 빌더 서비스', 'Super fast & customizable web form builder'),
      description: t('코딩 없이 간편하게 드래그 앤 드롭만으로 설문지와 응답 수집 폼을 생성할 수 있는 웹 퍼블리싱 생산성 서비스입니다.', 'A fast form builder enabling drag-and-drop creation without coding.'),
      tags: ['Form Builder', 'Productivity'],
      link: 'https://github.com/haroseo',
      github: 'https://github.com/haroseo',
      details: {
        background: t('사용자가 코딩 없이 직관적으로 설문 조사 및 입력 폼을 빌드하고 데이터를 수집할 수 있도록 돕는 솔루션이 필요하여 제작했습니다.', 'Built to let users create surveys and forms intuitively without coding.'),
        strategy: t('컴포넌트 드래그 앤 드롭 방식의 유연한 에디터 인터페이스를 도입하고 데이터 저장 프로세스를 경량화했습니다.', 'Adopted component drag-and-drop editor and lightweight storage flows.'),
        metrics: t('직관적인 폼 빌더 에디터 인터페이스 구현', 'Delivered intuitive form creation flows and minimal DB configuration.')
      }
    },
    {
      id: 'functionfactory',
      type: 'site',
      category: 'development',
      title: 'function factory',
      slogan: t('재사용 가능한 고성능 유틸리티 함수 팩토리', 'Highly reusable TypeScript utility function packaging'),
      description: t('중복되는 모듈 코드를 최적화하고 코드 안정성을 극대화하기 위해 공통 로직을 라이브러리 형태로 모아놓은 오픈소스 프로젝트입니다.', 'A library of reusable utilities to reduce duplication.'),
      tags: ['Library', 'Utility'],
      link: 'https://github.com/haroseo',
      github: 'https://github.com/haroseo',
      details: {
        background: t('반복적인 코드 작성을 방지하고 개발자들의 생산성을 올리기 위해 검증된 유틸리티 코드들을 통합 관리하기 위한 목적입니다.', 'Integrated utilities to prevent repetitive coding.'),
        strategy: t('엄격한 타입 정의와 단위 테스트 구성을 통해 라이브러리의 신뢰성을 높이고 패키지 배포 파이프라인을 구축했습니다.', 'Used strict type definitions and unit tests for reliability.'),
        metrics: t('오픈소스 유틸리티 라이브러리 프레임워크 구축', 'Constructed modular utilities and code snippet structures.')
      }
    },
    {
      id: 'mapfit',
      type: 'site',
      category: 'development',
      title: 'Mapfit',
      slogan: t('위치 기반 좌표 매칭 및 경로 시각화 솔루션', 'Geographic path visualization and coordinate matching'),
      description: t('사용자 좌표 정보와 지리 데이터 API를 결합하여 정확한 위치 매칭을 돕고 브라우저 상에 직관적으로 시각화하는 지도 서비스입니다.', 'A map service combining user coordinates and geo APIs for visualization.'),
      tags: ['Map API', 'Geolocation'],
      link: 'https://github.com/haroseo',
      github: 'https://github.com/haroseo',
      details: {
        background: t('복잡한 공간 좌표 데이터를 최적의 경로와 장소 매칭 알고리즘을 사용해 브라우저에 시각화하기 위해 개발되었습니다.', 'Created to visualize complex coordinate data and path matching.'),
        strategy: t('지도 API와 좌표 변환 알고리즘을 결합해 부드러운 렌더링 성능과 높은 핀 매칭 정밀도를 구현했습니다.', 'Linked map APIs with path-matching for smooth rendering.'),
        metrics: t('실시간 위치 데이터 렌더링 및 경로 탐색 인터랙션 구현', 'Rendered interactive route mapping and pin coordinates dynamically.')
      }
    },
    {
      id: 'luxeret',
      type: 'workplace',
      category: 'marketing',
      title: 'LUXERET',
      slogan: t('감각과 데이터를 연결하는 브랜드 마케팅', 'Connecting senses and data via brand marketing'),
      description: t('브랜드 가치관과 성과 지표를 연결하는 것을 목표로 마케팅 전반을 총괄하고 있습니다.', 'Working as a brand marketer, aiming to connect brand values and performance metrics.'),
      tags: ['Marketer', 'Viral Campaign', 'Funnel Analysis'],
      details: {
        background: t('데이터 수치만 쫓는 차가운 마케팅이 아닌, 고객의 마음에 닿는 감각적 비주얼과 지표를 융합하기 위해 시작했습니다.', 'Started to combine sensory visuals with metrics rather than chase numbers alone.'),
        strategy: t('마케팅 퍼널 구간별 도달률 데이터 분석과 비주얼 톤 보정을 결합하는 다변화 전략을 실행했습니다.', 'Executed a diversified strategy combining funnel metrics with visual tone adjustments.'),
        metrics: t('마케팅 채널 유입량 향상 기여 및 브랜드 신뢰도 획득.', 'Contributed to improved inbound and brand trust.')
      }
    },
    {
      id: 'kustudio',
      type: 'workplace',
      category: 'brand',
      title: 'Ku:/ Studio',
      slogan: t('창작의 경계를 넓히는 곳', 'Expanding the boundaries of creation'),
      description: t('Ku:/ Studio에서 크리에이티브 멤버로 활동하며 다양한 브랜드 및 비주얼 디자인 프로젝트를 수행하고 있습니다.', 'Working as a creative member at Ku:/ Studio on various brand and visual design projects.'),
      tags: ['Creative Member', 'Brand Design', 'Visual Design'],
      achievements: [
        t('스튜디오 내 브랜드 및 비주얼 디자인 프로젝트 참여', 'Participated in studio brand identity design'),
        t('크리에이티브 방향성 논의 및 콘텐츠 기획 기여', 'Contributed to creative direction and content curation')
      ],
      details: {
        background: t('스튜디오 내부 브랜딩 정체성을 강화하고 다양한 시각 창작 콘텐츠를 생성하기 위해 합류했습니다.', 'Joined to strengthen internal brand identity and create visual content.'),
        strategy: t('모던한 비주얼 톤앤매너와 사용자 경험을 조화시키는 아이디어 제안을 중심으로 프로젝트를 리드했습니다.', 'Led projects focusing on modern visual tone and UX harmony.'),
        metrics: t('스튜디오 브랜드 디자인 품질 제고 및 창작 콘텐츠 라인업 다양화.', 'Elevated studio branding quality and diversified content.')
      }
    }
  ];

  // New: search & tag filter state
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // allTags
  const allTags = useMemo(() => {
    const s = new Set<string>();
    displayItems.forEach((it) => it.tags?.forEach((tg) => s.add(tg)));
    return Array.from(s);
  }, [displayItems]);

  // Route + search + tag filtering
  const filteredItems = useMemo(() => {
    const byRoute = displayItems.filter(item => {
      if (currentPath === '/design') return item.category === 'brand';
      if (currentPath === '/marketing') return item.category === 'marketing';
      if (currentPath === '/development') return item.category === 'development';
      return true;
    });

    const q = query.trim().toLowerCase();

    return byRoute.filter(item => {
      if (activeTag && !item.tags.map(t => t.toLowerCase()).includes(activeTag.toLowerCase())) return false;
      if (!q) return true;
      const hay = (
        item.title + ' ' +
        (item.slogan || '') + ' ' +
        (item.description || '') + ' ' +
        (item.tags || []).join(' ')
      ).toLowerCase();
      return hay.includes(q);
    });
  }, [displayItems, currentPath, query, activeTag]);

  const filterTabs = [
    { label: t('전체', '전체'), path: '/portfolio' },
    { label: t('디자인', '디자인'), path: '/design' },
    { label: t('마케팅', '마케팅'), path: '/marketing' },
    { label: t('개발', '개발'), path: '/development' }
  ];

  const getLocalizedType = (type: string) => {
    if (type === 'discord') return t('디스코드', '디스코드');
    if (type === 'site') return t('웹사이트', '웹사이트');
    return t('경력 소속', '경력 소속');
  };

  return (
    <div className="relative min-h-screen bg-black text-white select-none">
      {/* Sticky Category Filter Pills */}
      <div className="sticky top-12 sm:top-[53px] z-30 w-full bg-black/60 backdrop-blur-md border-b border-white/5 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-1">
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
          <div className="hidden sm:block text-[11px] text-zinc-400">프로젝트 아카이브</div>
        </div>

        {/* SearchBar + Tag chips */}
        <SearchBar
          query={query}
          setQuery={setQuery}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
          allTags={allTags}
        />
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 py-24 sm:py-28">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onClick={() => setSelectedItem(item)}
              className="bg-[#101010]/40 border border-white/5 rounded-xl overflow-hidden hover:border-white/12 transition-all duration-300 group flex flex-col justify-between cursor-pointer h-full"
            >
              <div className="aspect-[1.6/1] w-full overflow-hidden relative border-b border-white/5 bg-zinc-950 flex items-center justify-center">
                {item.id === 'figmalibrary' ? (
                  <div className="w-12 h-18 transition-transform duration-700 ease-out group-hover:scale-110 flex items-center justify-center">
                    {/* svg icon */}
                  </div>
                ) : (
                  <img
                    src={
                      item.id === 'rofolder' ? '/assets/rofolder-new.jpg' :
                      item.id === 'limited' ? '/assets/limited.png' :
                      item.id === 'designpick' ? '/assets/designpick.png' :
                      item.id === 'planor' ? '/assets/planor.png' :
                      item.id === 'typolab' ? '/assets/naramarsami.png' :
                      item.id === 'luxeret' ? '/assets/luxeret.png' :
                      item.id === 'kustudio' ? '/assets/kustudio.png' :
                      '/assets/default-project.png'
                    }
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                )}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-bold text-zinc-300 uppercase tracking-wider">
                  {getLocalizedType(item.type)}
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow gap-3.5">
                <div className="space-y-1.5">
                  <h3 className="text-[12.5px] font-bold text-white font-display tracking-tight group-hover:text-zinc-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-zinc-400 font-normal line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Sub-tags list (show all) */}
                <div className="flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-1.5 py-0.5 bg-white/5 border border-white/5 rounded text-[8px] font-bold text-zinc-450 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <img 
                      src="/assets/seoh

