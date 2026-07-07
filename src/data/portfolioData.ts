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

export interface PortfolioDataType {
  name: string;
  title: string;
  tagline: string;
  description: string;
  skills: { category: string; items: string[] }[];
  projects: Project[];
  careers: Career[];
  socialLinks: { icon: string; label: string; url: string }[];
  contact: { email: string; github: string; figma?: string; discord: string; instagram: string; location: string };
  communities: Community[];
}

const portfolioDataKo: PortfolioDataType = {
  name: "서하루",
  title: "Brand Design · Marketing · Programming",
  tagline: "당신의 스토리를 성공의 데이터로",
  description:
    "디자인, 마케팅, 프로그래밍을 통해 비즈니스와 유저를 연결하는 크리에이터 서하루입니다. 청소년 창업 커뮤니티 로폴더(RoFolder), 에셋 공유 공간 Limited™, 그리고 로블갤러리(RoGALLERY)를 운영하고 있습니다.",

  skills: [
    {
      category: "Design",
      items: ["UX/UI Design", "Typography", "Figma", "Brand Identity"],
    },
    {
      category: "Marketing",
      items: ["Growth Marketing", "Viral Marketing", "Community Strategy", "Instagram Marketing"],
    },
    {
      category: "Programming",
      items: ["Web Development", "Scripting", "Discord Bot Development", "Software Tools"],
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
        metrics: "감각적이고 직관적인 디자인 큐레이션 웹 제공"
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
        metrics: "한글 자모 결합 타자 연습 시스템 설계 및 구현"
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
        strategy: "사용자 분석 및 핵심 기능 중심의 제작을 담당하여 온보딩 이탈률을 최소화했습니다.",
        metrics: "사용자 친화적 캘린더 인터페이스 설계"
      }
    }
  ],

  careers: [
    {
      id: "rofolder",
      title: "RoFolder - CEO",
      slogan: "당신의 스토리를 성공의 데이터로, 로폴더",
      description: "청소년 및 청년의 스타트업 창업을 독려하고 지원하는 디스코드 대표 커뮤니티입니다.",
      achievements: [
        "창업 활성화를 장려하는 네트워킹 채널 운영",
        "스타트업 아이디어 매칭 및 커뮤니티 이벤트 기획",
        "브랜드 아이덴티티 수립 및 공식 로고 기획 주도"
      ],
      skills: ["CEO / Leadership", "Branding", "Community Operations"],
      link: "https://discord.gg/ABz6SQ74Yv"
    },
    {
      id: "limited",
      title: "Limited™ - Founder",
      slogan: "오직 나만을 위한 제품, Limited™",
      description: "Limited™는 오직 나만을 위한 제품, Limited™ 브랜드로 가상 공간에 최적화된 게임 리소스와 에셋 라이브러리를 공유하고 소통하는 채널입니다.",
      achievements: [
        "게임 개발에 사용 가능한 무료 에셋 및 리소스 배포",
        "사용자 피드백 기반 리소스 구성 및 커뮤니티 채널 관리"
      ],
      skills: ["Asset Curation", "Figma Design", "Community Operations"],
      link: "https://discord.gg/utGzjE6r8J"
    },
    {
      id: "luxeret",
      title: "LUXERET - Marketer",
      slogan: "가능성을 넘어, 가치를 향해",
      description: "LUXERET에서 브랜드 마케터로 일하며 다양한 가치 중심 마케팅 활동을 펼치고 있습니다.",
      achievements: [
        "마케팅 캠페인 기획 및 브랜드 채널 운영",
        "온라인 프로모션 및 트렌드 분석"
      ],
      skills: ["Growth Marketing", "Marketing Strategy"],
      link: "https://luxeret.com/"
    },
    {
      id: "hannlabs",
      title: "HANN LABS™ - Staff Designer",
      slogan: "브랜드 디자인",
      description: "HANN LABS™에서 보조 스태프로 활동하며 팀 브랜드 비주얼 기획 및 이미지 그래픽 제작을 지원하고 있습니다.",
      achievements: [
        "브랜드 비주얼 디자인 보조 및 이미지 프로모션 디자인 지원",
        "아트워크 기획 보조 및 커뮤니티 그래픽 요소 제작 지원"
      ],
      skills: ["Graphic Design", "Brand Design", "Figma"],
    },
    {
      id: "simplx",
      title: "SIMPLX - Developer",
      slogan: "시스템 최적화 및 도구 개발",
      description: "SIMPLX에서 개발자로 활동하며 시스템 최적화 및 디스코드 소프트웨어 툴 설계를 진행하고 있습니다.",
      achievements: [
        "효율적인 스크립팅 모듈 구축 및 성능 최적화",
        "디스코드 봇 및 개발 도구 설계/구축"
      ],
      skills: ["Software Development", "System Optimization", "Discord Tools"],
    }
  ],

  socialLinks: [
    { icon: "github", label: "GitHub", url: "https://github.com/haroseo" },
    { icon: "figma", label: "Figma", url: "https://www.figma.com/@seoharo" },
    { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/tooday.zip/" },
    { icon: "discord", label: "Discord", url: "https://discord.com/users/seoharo" },
    { icon: "mail", label: "Email", url: "mailto:seoharo0111@gmail.com" },
  ],

  contact: {
    email: "seoharo0111@gmail.com",
    github: "https://github.com/haroseo",
    figma: "https://www.figma.com/@seoharo",
    discord: "seoharo",
    instagram: "tooday.zip",
    location: "대한민국",
  },

  communities: [
    {
      name: "로블갤러리 (RoGALLERY)",
      members: "800+",
      logo: "/assets/rogllaery.png",
      role: "설립자 및 총괄 (Founder)",
      slogan: "유저가 만들어 나가는 투명한 커뮤니티, 로블갤러리",
      description: "유저가 만들어 나가는 투명한 커뮤니티, 로블갤러리",
      detailsText: "로블갤러리는 유저들이 스스로 교류하고 성장하는 소통 커뮤니티입니다. 유저들의 자발적인 참여와 투명한 문화를 지향하며 건전하고 투명한 커뮤니티 환경을 제공하고 지속 가능한 소통의 장을 만듭니다."
    },
    {
      name: "Limited™",
      members: "500+",
      logo: "/assets/limited.png",
      role: "Founder",
      slogan: "오직 나만을 위한 제품, Limited™",
      description: "최상급 무료 에셋 배포와 가상 공간에 최적화된 게임 리소스 라이브러리 채널",
      detailsText: "Limited™는 최상급 무료배포와 게임 환경에 특화된 맞춤형 그래픽/코드 에셋을 제공합니다. 개발자들의 시간 비용을 획기적으로 줄여줄 프리미엄 창작 리소스를 지속 연구하고 유통합니다."
    },
    {
      name: "로폴더 (RoFolder)",
      members: "700+",
      logo: "/assets/rofolder-logo-new.png",
      role: "대표 (CEO)",
      slogan: "당신의 가치를 높이는, 로샵 탐색의 모든 것",
      description: "청소년 및 청년의 스타트업 창업을 독려하고 이끄는 디스코드 대표 커뮤니티",
      detailsText: "로폴더는 청소년 및 청년의 스타트업 창업을 독려하고 이끄는 디스코드 대표 커뮤니티입니다. 브랜드 가치 구축, 모의 피칭 피드백, 네트워킹 리소스를 결합하여 비즈니스의 첫 데이터를 생성할 수 있도록 스타트업 생태계를 활성화합니다."
    }
  ],
};

const portfolioDataEn: PortfolioDataType = {
  name: "SEOHARO",
  title: "Brand Design · Marketing · Programming",
  tagline: "Turn your story into data for success",
  description:
    "A creator connecting businesses and users through design, marketing, and programming. I manage the youth startup community RoFolder, the asset sharing channel Limited™, and RoGALLERY.",

  skills: [
    {
      category: "Design",
      items: ["UX/UI Design", "Typography", "Figma", "Brand Identity"],
    },
    {
      category: "Marketing",
      items: ["Growth Marketing", "Viral Marketing", "Community Strategy", "Instagram Marketing"],
    },
    {
      category: "Programming",
      items: ["Web Development", "Scripting", "Discord Bot Development", "Software Tools"],
    },
  ],

  projects: [
    {
      id: 1,
      title: "Design Pick",
      description:
        "A visual design platform curating aesthetic artwork and high-quality web layouts.",
      tags: ["Brand Design", "UX/UI Design"],
      link: "https://designs.kro.kr",
      github: "https://github.com/haroseo/Design-Pick",
      featured: true,
      category: "brand",
      details: {
        background: "A curation hub designed to inspire designers and present refined visual systems.",
        strategy: "Focused on layout fundamentals and typography, using card motion to increase focus.",
        metrics: "Significantly improved readability and click conversion of the design list."
      }
    },
    {
      id: 2,
      title: "Naramarsami",
      description:
        "An interactive typing practice service presenting Hangeul's letters and typography elements.",
      tags: ["EdTech", "UX/UI Design", "Web Service"],
      link: "https://훈민정음.kro.kr",
      github: "https://github.com/naramarsami/naramarsami",
      featured: true,
      category: "development",
      details: {
        background: "Designed to link Hangeul's assembly principles withtyping experience for engagement.",
        strategy: "Reinterpreted historical Hunminjeongeum structures into modern interactive UI.",
        metrics: "Activated viral sharing and increased user practice session duration."
      }
    },
    {
      id: 3,
      title: "Planor",
      description:
        "A collaborative calendar service providing smart scheduling and schedule coordination.",
      tags: ["Product Design", "Web Service"],
      link: "https://planor.kro.kr",
      featured: true,
      category: "marketing",
      details: {
        background: "A platform project built to solve schedule coordination issues with a calendar view.",
        strategy: "Conducted user analysis and produced key features to minimize onboarding drop-off.",
        metrics: "Increased user retention metrics by improving the onboarding page UX."
      }
    }
  ],

  careers: [
    {
      id: "rofolder",
      title: "RoFolder - CEO",
      slogan: "Turn your story into data for success, RoFolder",
      description: "A leading Discord community that encourages youth startup entrepreneurship.",
      achievements: [
        "Operating networking channels that promote youth startup business",
        "Supporting startup ideas matchmaking and planning community events",
        "Leading brand identity designs and official logo renewals"
      ],
      skills: ["CEO / Leadership", "Branding", "Community Operations"],
      link: "https://discord.gg/ABz6SQ74Yv"
    },
    {
      id: "limited",
      title: "Limited™ - Founder",
      slogan: "Products made exclusively for you, Limited™",
      description: "Limited™ is a channel exclusively for me — sharing and communicating game resources and assets optimized for virtual spaces under the Limited™ brand.",
      achievements: [
        "Distributing free game assets and design resources for developers",
        "Structuring resource categories and managing channels based on feedback"
      ],
      skills: ["Asset Curation", "Figma Design", "Community Operations"],
      link: "https://discord.gg/utGzjE6r8J"
    },
    {
      id: "luxeret",
      title: "LUXERET - Marketer",
      slogan: "Beyond possibilities, towards value",
      description: "Working as a brand marketer at LUXERET, carrying out various value-oriented marketing activities.",
      achievements: [
        "Planning marketing campaigns and managing brand channels",
        "Analyzing online promotions and market trends"
      ],
      skills: ["Growth Marketing", "Marketing Strategy"],
      link: "https://luxeret.com/"
    },
    {
      id: "hannlabs",
      title: "HANN LABS™ - Staff Designer",
      slogan: "Brand Design",
      description: "Participating as assistant staff at HANN LABS™, supporting team brand visuals and promotion graphics.",
      achievements: [
        "Assisting team brand visual design and image promotions",
        "Supporting artwork planning and community graphic production"
      ],
      skills: ["Graphic Design", "Brand Design", "Figma"],
    },
    {
      id: "simplx",
      title: "SIMPLX - Developer",
      slogan: "System Optimization & Tool Development",
      description: "Working as a developer at SIMPLX, focusing on system optimization and software tool design.",
      achievements: [
        "Building efficient scripting modules and optimizing performance",
        "Designing and building Discord bots and development tools"
      ],
      skills: ["Software Development", "System Optimization", "Discord Tools"],
    }
  ],

  socialLinks: [
    { icon: "github", label: "GitHub", url: "https://github.com/haroseo" },
    { icon: "figma", label: "Figma", url: "https://www.figma.com/@seoharo" },
    { icon: "instagram", label: "Instagram", url: "https://www.instagram.com/tooday.zip/" },
    { icon: "discord", label: "Discord", url: "https://discord.com/users/seoharo" },
    { icon: "mail", label: "Email", url: "mailto:seoharo0111@gmail.com" },
  ],

  contact: {
    email: "seoharo0111@gmail.com",
    github: "https://github.com/haroseo",
    figma: "https://www.figma.com/@seoharo",
    discord: "seoharo",
    instagram: "tooday.zip",
    location: "Republic of Korea",
  },

  communities: [
    {
      name: "RoGALLERY",
      members: "800+",
      logo: "/assets/rogllaery.png",
      role: "Founder & General Manager",
      slogan: "A transparent community built by users, RoGALLERY",
      description: "A transparent community built by users, RoGALLERY",
      detailsText: "RoGALLERY is a communication community where users interact and grow together. We aim for voluntary user participation and transparent culture, providing a healthy and transparent environment."
    },
    {
      name: "Limited™",
      members: "500+",
      logo: "/assets/limited.png",
      role: "Founder",
      slogan: "Products made exclusively for you, Limited™",
      description: "A channel distributing top-tier free assets and hosting a game resource library optimized for virtual spaces",
      detailsText: "Limited™ provides custom graphic and code assets tailored for game environments along with top-tier free distribution. We continuously research and distribute premium creative resources to drastically save development time and costs."
    },
    {
      name: "RoFolder",
      members: "700+",
      logo: "/assets/rofolder-logo-new.png",
      role: "CEO",
      slogan: "Everything about RoShop searches that raises your value",
      description: "A leading Discord community that encourages youth startup entrepreneurship",
      detailsText: "RoFolder is a leading Discord community that encourages and guides youth startup entrepreneurship. We activate the startup ecosystem by combining brand value establishment, mock pitch feedback, and networking resources so businesses can generate their first data."
    }
  ],
};

export const portfolioData = {
  ko: portfolioDataKo,
  en: portfolioDataEn,
};
