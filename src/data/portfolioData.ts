export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  featured: boolean;
  image?: string;
  category: 'brand' | 'marketing' | 'development';
  details?: {
    background: string;
    strategy: string;
    metrics: string;
  };
}

export interface Career {
  id: string;
  title: string;
  period: string;
  slogan: string;
  description: string;
  achievements: string[];
  skills: string[];
  link?: string;
}

export interface Community {
  name: string;
  members: string;
  description: string;
  logo: string;
  role: string;
  slogan: string;
  detailsText: string;
}

export const portfolioData: {
  name: string;
  title: string;
  tagline: string;
  description: string;
  skills: { category: string; items: string[] }[];
  projects: Project[];
  careers: Career[];
  socialLinks: { icon: string; label: string; url: string }[];
  contact: { email: string; github: string; discord: string; location: string };
  communities: Community[];
} = {
  name: "SEOHARO",
  title: "Brand Design x Marketing x Code",
  tagline: "당신의 스토리를 성공의 데이터로",
  description:
    "시각적인 아름다움(Brand Design), 전략적 마케팅(Marketing), 그리고 기술적 구현(Programming)을 융합하는 브랜드 디자이너, 마케터 겸 CEO입니다. Rofolder, Limited™를 비롯한 비즈니스를 이끌고 있으며 다양한 프로젝트를 성공적으로 론칭하고 있습니다.",

  skills: [
    {
      category: "Brand Design",
      items: ["UX/UI Design", "Typography", "Figma", "Prototyping", "Brand Identity"],
    },
    {
      category: "Marketing & Growth",
      items: ["Growth Hacking", "Viral Marketing", "Community Strategy", "Data Analytics", "User Retention"],
    },
    {
      category: "Programming & Code",
      items: ["React", "TypeScript", "Next.js", "Python", "Lua", "Node.js"],
    },
    {
      category: "Tools & Specialized",
      items: [
        "AI Prompt Engineering",
        "Discord Bot Development",
        "Information Security",
        "Penetration Testing",
        "Git",
      ],
    },
  ],

  projects: [
    {
      id: 1,
      title: "Design Pick",
      description:
        "감각적인 아트워크와 완성도 높은 비주얼을 큐레이션하는 크리에이티브 디자인 플랫폼입니다.",
      tags: ["Brand Design", "UX/UI Design", "Creative Direction"],
      link: "https://designs.kro.kr",
      github: "https://github.com/haroseo/Design-Pick",
      featured: true,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      category: "brand",
      details: {
        background: "디자이너들의 영감을 자극하고 정돈된 비주얼을 제공하기 위해 미니멀리즘 테마로 기획된 큐레이션 허브입니다.",
        strategy: "불필요한 요소를 모두 배제하고 타이포그래피와 레이아웃 본질에 집중했으며, 카드 플립 모션을 결합해 시각적 집중도를 올렸습니다.",
        metrics: "기존 디자인 리스트 대비 클릭 전환율(CTR) 약 28% 증가, 피그마 디자인 에셋 공유 누적 다운로드 300회 돌파."
      }
    },
    {
      id: 2,
      title: "나랏말싸미",
      description:
        "한글 창제 원리와 타이포그래피 요소를 녹여낸 인터랙티브 에듀테크 타자 연습 서비스입니다.",
      tags: ["EdTech", "UX/UI Design", "Web Service"],
      link: "https://훈민정음.kro.kr",
      github: "https://github.com/naramarsami/naramarsami",
      featured: true,
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
      category: "brand",
      details: {
        background: "한글의 자모음 결합 원리를 타이핑 경험과 연계하여, 청소년들에게 정서적 친밀감과 교육적 지식을 제공하려는 목적에서 출발했습니다.",
        strategy: "훈민정음 용자례를 현대적 인터랙션 디자인으로 재해석하고, 점진적인 타자 미션을 도입하여 학습 몰입감을 높였습니다.",
        metrics: "오픈 베타 진행 기간 내 고등학교 학급 내 바이럴 활성화 및 사용자 평균 세션 유지 시간 12분 돌파."
      }
    },
    {
      id: 3,
      title: "크티 (ctee.kr)",
      description:
        "디자인 가이드를 위한 완성형 목업 템플릿과 창작 디지털 상품을 기획하고 유통하는 크리에이터 비즈니스 채널입니다.",
      tags: ["Marketing", "Creator Economy", "Content Strategy"],
      link: "https://ctee.kr/place/seoharo",
      featured: true,
      image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=2669&auto=format&fit=crop",
      category: "marketing",
      details: {
        background: "브랜드 디자이너로서 제작한 디자인 에셋과 목업 템플릿을 타겟 고객(신입 디자이너, 마케터)에게 최적으로 도달시키기 위한 디지털 스토어 채널입니다.",
        strategy: "소셜 미디어를 타겟으로 한 '목업 무료 배포' 마케팅 캠페인을 집행하여 브랜드 유입을 만들고, 상세페이지 가독성을 극대화하여 구매 전환을 유도했습니다.",
        metrics: "기획 목업 콘텐츠 출시 첫 주 다운로드 및 스토어 방문자 수 급증, 전환율 15% 이상 달성."
      }
    },
    {
      id: 4,
      title: "Planor",
      description:
        "스마트하게 일정을 조율하고 효율적인 협업 캘린더 기능을 제안하는 통합 웹 스케줄러 서비스입니다.",
      tags: ["Growth Hacking", "Product Launch", "Web Service"],
      link: "https://planor.kro.kr",
      featured: true,
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2676&auto=format&fit=crop",
      category: "marketing",
      details: {
        background: "직관적인 캘린더 뷰와 일정 조율 문제를 단번에 해결하기 위해 시작된 유틸리티 플랫폼 프로젝트입니다.",
        strategy: "사용자 분석 및 핵심 기능 중심의 론칭을 담당했으며, 마케팅 퍼널 최적화를 통해 가입 후 온보딩 이탈률을 축소했습니다.",
        metrics: "사용자 온보딩 페이지 UX 개선으로 초기 사용자 유지율(Retention) 22% 개선 달성."
      }
    },
    {
      id: 5,
      title: "HANN봇",
      description:
        "디스코드 서버 운영 자동화 및 풍부한 커뮤니티 이벤트를 지원하는 다기능 Discord API 봇 프로그램입니다.",
      tags: ["TypeScript", "Discord.js", "Bot Automation"],
      link: "https://github.com/haroseo/HANN-BOT",
      github: "https://github.com/haroseo/HANN-BOT",
      featured: true,
      image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop",
      category: "development",
      details: {
        background: "디스코드 커뮤니티의 관리가 복잡해짐에 따라, 관리자의 수작업을 줄이고 자동 등급 부여 및 활동 포인트 관리를 하기 위해 구축되었습니다.",
        strategy: "Discord.js API 기반의 분산 처리 구조를 구축하여 수백 명의 동시 활성 유저에 대한 빠른 응답 속도를 설계했습니다.",
        metrics: "커뮤니티 적용 후 반복적인 관리성 문의가 70% 감소하였으며, 사용자 활동 기반 포인트 이벤트 활성화율 45% 증가."
      }
    },
    {
      id: 6,
      title: "Security & Growth Toolkit",
      description:
        "보안 약점 스캐닝 인텔리전스와 유저 유입 분석 툴을 유기적으로 연계한 시스템 진단 도구입니다.",
      tags: ["Python", "Security Pentest", "Analytics"],
      link: "https://github.com/haroseo/sec-growth-toolkit",
      github: "https://github.com/haroseo/sec-growth-toolkit",
      featured: false,
      category: "development"
    },
    {
      id: 7,
      title: "Lua Creative Scripts",
      description:
        "가상 개발 플랫폼의 인터랙티브 맵 오브젝트와 복잡한 카메라 움직임을 효율화하는 스크립트 패키지입니다.",
      tags: ["Lua", "Game Dev", "Automation"],
      link: "https://github.com/haroseo/lua-creative-scripts",
      github: "https://github.com/haroseo/lua-creative-scripts",
      featured: false,
      category: "development"
    }
  ],

  careers: [
    {
      id: "rofolder",
      title: "로폴더 (RoFolder) - 대표 (CEO)",
      period: "2024.11 - Present",
      slogan: "당신의 스토리를 성공의 데이터로, 로폴더",
      description: "로폴더는 청소년/청년의 창업을 독려하고 지원하는 혁신적인 가상 스타트업 커뮤니티입니다.",
      achievements: [
        "창업을 희망하는 700명 이상의 청소년 및 청년 멤버쉽 확보 및 유입 체계 설계",
        "스타트업 아이디어 매칭, 피칭 워크샵 및 커뮤니티 네트워킹 이벤트 총괄 운영",
        "서버의 데이터 분석을 통한 사용자 활동 데이터 추적 및 리텐션 극대화 전략 수립",
        "브랜드 가치 정립과 시각 아이덴티티 및 신규 브랜드 로고 리뉴얼 주도"
      ],
      skills: ["CEO / Leadership", "Branding", "User Retention", "Data Analytics", "Start-up Incubation"],
      link: "https://ctee.kr/place/seoharo"
    },
    {
      id: "limited",
      title: "Limited™ - 설립자 (Founder)",
      period: "2025.02 - Present",
      slogan: "오직 나만을 위한 제품, Limited™",
      description: "최상급 무료배포 에셋과 창작 게임 프로젝트에 꼭 맞는 프리미엄 리소스 채널을 리드합니다.",
      achievements: [
        "게임 개발 지망생들을 위한 500명 이상의 능동형 리소스 배포 커뮤니티 빌딩",
        "독점 고품질 무료배포 전략과 비주얼 프로모션을 통한 유저 전환 캠페인 실행",
        "유저 인터페이스 및 피그마 디자인 가이드 제작 및 개발 에셋 공급망 정립",
        "고객 피드백 기반 에셋 카탈로그 주기적 최적화"
      ],
      skills: ["Asset Curation", "Visual Marketing", "Community Operations", "Figma Design"],
    },
    {
      id: "luxeret",
      title: "LUXERET - 마케터 (Marketer)",
      period: "2025.08 - Present",
      slogan: "데이터를 감각으로, LUXERET 브랜드 마케팅",
      description: "LUXERET의 통합 브랜딩 전략 기획, 유입 마케팅 퍼널 모델링 및 캠페인 총괄 수행.",
      achievements: [
        "핵심 소셜 채널 분석 및 바이럴 타겟 캠페인 기획으로 신규 방문 유입율 35% 증대",
        "디자인 감각을 더한 감성 브랜드 콘텐츠 및 디지털 배너 크리에이티브 설계",
        "전환 데이터 트래킹 및 마케팅 퍼널 진단을 통해 마케팅 비용 효율성 극대화"
      ],
      skills: ["Growth Hacking", "Marketing Funnels", "Viral Marketing", "Performance Analysis"],
    },
    {
      id: "hannlabs",
      title: "HANN LABS™ - 스태프 디자이너 (Designer)",
      period: "2024.03 - Present",
      slogan: "상상을 시각적 실체로, HANN LABS™ 디자인",
      description: "HANN LABS™ 팀 내의 핵심 브랜딩 가이드 설계 및 브랜드 제품 컨셉 디자인 수행.",
      achievements: [
        "브랜드 메인 로고 및 색상 체계, 그래픽 가이드라인 100% 리비전 수행",
        "프로젝트 론칭 포스터, 프로모션 이미지 30건 이상 아트웍 제작 및 퍼블리싱",
        "커뮤니티 웹/디스코드 인터페이스 UI 컨셉 디자인 제안"
      ],
      skills: ["Graphic Design", "Logo Concept Design", "Figma", "Brand Guidelines"],
    },
    {
      id: "simplx",
      title: "SIMPLX - 개발자 (Developer)",
      period: "2025.01 - Present",
      slogan: "간결함을 코드로, SIMPLX 시스템 개발",
      description: "SIMPLX 프로젝트 내 시스템 관리 효율성 확보 및 Lua/TypeScript 시스템 코딩.",
      achievements: [
        "개발 커뮤니티 데이터 동기화 및 봇 통합 관리용 백엔드 파이프라인 개발",
        "Lua 개발 도구 최적화 스크립팅 모듈 구축으로 게임 로직 지연율 최소화",
        "협업 기반 깃허브 워크플로우 제어 및 테스팅 지원"
      ],
      skills: ["TypeScript", "Lua Development", "Automation", "Git Collaboration"],
    }
  ],

  socialLinks: [
    { icon: "github", label: "GitHub", url: "https://github.com/haroseo" },
    { icon: "discord", label: "Discord", url: "https://discord.com/users/harobuger" },
    { icon: "mail", label: "Email", url: "mailto:seoharo0111@gmail.com" },
  ],

  contact: {
    email: "seoharo0111@gmail.com",
    github: "https://github.com/haroseo",
    discord: "@harobuger",
    location: "평택 (Pyeongtaek)",
  },

  communities: [
    {
      name: "로폴더 (RoFolder)",
      members: "700+",
      logo: "/assets/rofolder-logo-new.png",
      role: "대표 (CEO)",
      slogan: "당신의 스토리를 성공의 데이터로, 로폴더",
      description: "청소년 및 청년의 스타트업 창업을 독려하고 이끄는 디스코드 대표 커뮤니티",
      detailsText: "로폴더는 청소년/청년의 창업을 독려하고 지원하는 서버입니다. 브랜드 가치 구축, 모의 피칭 피드백, 네트워킹 리소스를 결합하여 비즈니스의 첫 데이터를 생성할 수 있도록 스타트업 생태계를 활성화합니다."
    },
    {
      name: "Limited™",
      members: "500+",
      logo: "/assets/limited.png",
      role: "설립자 (Founder)",
      slogan: "오직 나만을 위한 제품, Limited™",
      description: "최상급 무료 에셋 배포와 가상 공간에 최적화된 게임 리소스 라이브러리 채널",
      detailsText: "Limited™는 최상급 무료배포와 게임 환경에 특화된 고성능 맞춤형 그래픽/코드 에셋을 제공합니다. 개발자들의 시간 비용을 획기적으로 줄여줄 프리미엄 창작 리소스를 지속 연구하고 유통합니다."
    }
  ],
};
