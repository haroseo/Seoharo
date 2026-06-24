export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  featured: boolean;
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
  contact: { email: string; github: string; discord: string; instagram: string; location: string };
  communities: Community[];
} = {
  name: "SEOHARO",
  title: "Brand Design x Marketing x Code",
  tagline: "당신의 스토리를 성공의 데이터로",
  description:
    "디자인, 마케팅, 개발을 융합하여 비즈니스와 유저를 연결하는 크리에이터 서하루입니다. 청소년 창업 서버 로폴더(RoFolder)와 리소스 배포 공간 Limited™를 운영하고 있습니다.",

  skills: [
    {
      category: "Design",
      items: ["UX/UI Design", "Typography", "Figma", "Brand Identity"],
    },
    {
      category: "Marketing",
      items: ["Growth Hacking", "Viral Marketing", "Community Strategy", "Instagram Marketing"],
    },
    {
      category: "Programming",
      items: ["React", "TypeScript", "Python", "Lua", "Git", "Discord Bot Development"],
    },
  ],

  projects: [
    {
      id: 1,
      title: "Design Pick",
      description:
        "감각적인 아트워크와 완성도 높은 비주얼을 큐레이션하는 크리에이티브 디자인 플랫폼입니다.",
      tags: ["Brand Design", "UX/UI Design"],
      link: "https://designs.kro.kr",
      github: "https://github.com/haroseo/Design-Pick",
      featured: true,
      category: "brand",
      details: {
        background: "디자이너들의 영감을 자극하고 정돈된 비주얼을 제공하기 위해 기획된 큐레이션 허브입니다.",
        strategy: "타이포그래피와 레이아웃 본질에 집중했으며, 카드 모션을 결합해 시각적 집중도를 올렸습니다.",
        metrics: "기존 디자인 리스트 대비 클릭 전환 효율 향상, 디자인 에셋 공유 활성화."
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
      category: "development",
      details: {
        background: "한글의 자모음 결합 원리를 타이핑 경험과 연계하여 흥미를 자아내기 위해 기획되었습니다.",
        strategy: "훈민정음 용자례를 현대적 인터랙션 디자인으로 재해석하여 한글 고유의 비주얼을 이끌어냈습니다.",
        metrics: "교육 플랫폼 내 바이럴 활성화 및 사용자 평균 연습 세션 시간 향상."
      }
    },
    {
      id: 3,
      title: "Planor",
      description:
        "스마트하게 일정을 조율하고 효율적인 협업 캘린더 기능을 제안하는 통합 웹 스케줄러 서비스입니다.",
      tags: ["Product Design", "Web Service"],
      link: "https://planor.kro.kr",
      featured: true,
      category: "marketing",
      details: {
        background: "직관적인 캘린더 뷰와 일정 조율 문제를 신속하게 조율하기 위한 플랫폼 프로젝트입니다.",
        strategy: "사용자 분석 및 핵심 기능 중심의 론칭을 담당하여 온보딩 이탈률을 최소화했습니다.",
        metrics: "사용자 온보딩 페이지 UX 개선을 통한 사용자 유지 지표 상승."
      }
    }
  ],

  careers: [
    {
      id: "rofolder",
      title: "로폴더 (RoFolder) - 대표 (CEO)",
      slogan: "당신의 가치를 높이는, 로샵 탐색의 모든 것",
      description: "청소년 및 청년의 스타트업 창업을 독려하고 이끄는 디스코드 대표 커뮤니티입니다.",
      achievements: [
        "청소년 및 청년 창업 활성화를 장려하는 네트워킹 서버 운영",
        "스타트업 아이디어 매칭 지원 및 커뮤니티 이벤트 기획",
        "브랜드 아이덴티티 확립 및 공식 로고 디자인 리뉴얼 주도"
      ],
      skills: ["CEO / Leadership", "Branding", "Community Operations"],
    },
    {
      id: "limited",
      title: "Limited™ - 설립자 (Founder)",
      slogan: "오직 나만을 위한 제품, Limited™",
      description: "최상급 무료배포와 여러분들의 게임에 딱 맞는 에셋을 제공합니다.",
      achievements: [
        "게임 개발에 즉시 사용 가능한 무료 에셋 및 리소스 배포",
        "사용자 피드백 기반 리소스 구성 최적화 및 커뮤니티 채널 관리"
      ],
      skills: ["Asset Curation", "Figma Design", "Community Operations"],
    },
    {
      id: "luxeret",
      title: "LUXERET - 마케터 (Marketer)",
      slogan: "브랜드 마케팅",
      description: "마케터로 활동하고 있습니다.",
      achievements: [
        "마케팅 캠페인 기획 및 브랜드 채널 운영",
        "온라인 프로모션 및 데이터 트렌드 분석"
      ],
      skills: ["Growth Hacking", "Marketing Strategy"],
    },
    {
      id: "hannlabs",
      title: "HANN LABS™ - 스태프 디자이너 (Staff Designer)",
      slogan: "브랜드 디자인",
      description: "스태프로 디자인 활동을 하고 있습니다.",
      achievements: [
        "팀 브랜드 비주얼 가이드 설계 및 이미지 프로모션 디자인 리비전",
        "아트워크 기획 및 커뮤니티 그래픽 요소 제작"
      ],
      skills: ["Graphic Design", "Brand Design", "Figma"],
    },
    {
      id: "simplx",
      title: "SIMPLX - 개발자 (Developer)",
      slogan: "시스템 개발",
      description: "개발자로 활동하고 있습니다.",
      achievements: [
        "TypeScript 및 Lua 기반 자동화 모듈 코딩",
        "시스템 도구 최적화 스크립트 작성 지원"
      ],
      skills: ["TypeScript", "Lua Development", "Git"],
    }
  ],

  socialLinks: [
    { icon: "github", label: "GitHub", url: "https://github.com/haroseo" },
    { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/tooday.zip/" },
    { icon: "discord", label: "Discord", url: "https://discord.com/users/seoharo" },
    { icon: "mail", label: "Email", url: "mailto:seoharo0111@gmail.com" },
  ],

  contact: {
    email: "seoharo0111@gmail.com",
    github: "https://github.com/haroseo",
    discord: "seoharo",
    instagram: "tooday.zip",
    location: "대한민국 (Korea)",
  },

  communities: [
    {
      name: "로폴더 (RoFolder)",
      members: "700+",
      logo: "/assets/rofolder-logo-new.png",
      role: "대표 (CEO)",
      slogan: "당신의 가치를 높이는, 로샵 탐색의 모든 것",
      description: "청소년 및 청년의 스타트업 창업을 독려하고 이끄는 디스코드 대표 커뮤니티",
      detailsText: "로폴더는 청소년 및 청년의 스타트업 창업을 독려하고 이끄는 디스코드 대표 커뮤니티입니다. 브랜드 가치 구축, 모의 피칭 피드백, 네트워킹 리소스를 결합하여 비즈니스의 첫 데이터를 생성할 수 있도록 스타트업 생태계를 활성화합니다."
    },
    {
      name: "Limited™",
      members: "500+",
      logo: "/assets/limited.png",
      role: "설립자 (Founder)",
      slogan: "오직 나만을 위한 제품, Limited™",
      description: "최상급 무료 에셋 배포와 가상 공간에 최적화된 게임 리소스 라이브러리 채널",
      detailsText: "Limited™는 최상급 무료배포와 게임 환경에 특화된 맞춤형 그래픽/코드 에셋을 제공합니다. 개발자들의 시간 비용을 획기적으로 줄여줄 프리미엄 창작 리소스를 지속 연구하고 유통합니다."
    }
  ],
};
