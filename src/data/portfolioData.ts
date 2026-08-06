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
  contact: { email: string; github: string; discord: string; instagram: string; location: string };
  communities: Community[];
}

const portfolioDataKo: PortfolioDataType = {
  name: "서하루",
  title: "Brand Design · Marketing · Programming",
  tagline: "당신의 스토리를 성공의 데이터로",
  description:
    "디자인, 마케팅, 프로그래밍을 통해 비즈니스와 유저를 연결하는 크리에이터 서하루입니다. 청소년 창업 서버 로폴더(RoFolder)와 리소스 배포 공간 Limited™를 운영하고 있습니다.",

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
      title: "TypoLab",
      description:
        "한글의 조형적 가치와 자모 결합 원리를 현대적 인터랙션 디자인으로 풀어낸 실험적 웹 타이핑 서비스입니다.",
      tags: ["Typography", "Interactive Design", "Web Experiment"],
      link: "https://훈민정음.kro.kr",
      github: "https://github.com/naramarsami/naramarsami",
      featured: true,
      category: "development",
      details: {
        background: "디자인과 프로그래밍의 융합을 통해 한글 자모음의 결합 메커니즘을 타이핑 인터랙션으로 표현했습니다.",
        strategy: "훈민정음 고유의 용자례 구조를 분석하여 브라우저 환경에 맞는 인터랙티브 모션 그래픽으로 구현했습니다.",
        metrics: "인터랙티브 한글 타이포그래피 시스템 기획 및 구축"
      }
    },
    {
      id: 3,
      title: "Planor",
      description:
        "당신의 일상에 조화로운 시간 질서를 부여하고 파편화된 일정 협업을 하나의 유려한 인터페이스에 통합하는 캘린더 웹 서비스입니다.",
      tags: ["Product Design", "Web Service"],
      link: "https://planor.kro.kr",
      featured: true,
      category: "marketing",
      details: {
        background: "일정 조율과 캘린더 파편화 문제를 해결하고 스케줄 프로세스의 온보딩을 개선하기 위해 설계되었습니다.",
        strategy: "부드러운 카드 드래그 제스처와 경량화된 연간/월간 타임라인 레이아웃을 통해 최상의 일정 사용성을 확보했습니다.",
        metrics: "사용자 친화적 협업 스케줄러 인터페이스 설계"
      }
    },
    {
      id: 4,
      title: "Xe Project",
      description:
        "서하루가 직접 기획하고 개발한 개인 창작 프로젝트로, 다양한 아이디어를 실험하는 공간입니다.",
      tags: ["Personal Project", "Development"],
      link: "https://github.com/haroseo/Xe-project",
      github: "https://github.com/haroseo/Xe-project",
      featured: false,
      category: "development",
      details: {
        background: "개인 창작과 개발 실험을 통해 새로운 아이디어를 탐색하기 위한 프로젝트입니다.",
        strategy: "빠른 프로토타이핑과 반복적인 실험을 통해 다양한 기술 스택을 직접 경험했습니다.",
        metrics: "개인 기술 역량 확장 및 창작 실험 기록"
      }
    },
    {
      id: 5,
      title: "Mindmap",
      description:
        "마인드맵을 활용한 시각적 암기 학습 웹 서비스입니다. 개념과 연결고리를 직관적으로 표현해 학습 효율을 높입니다.",
      tags: ["Web Service", "Education", "Interactive Design"],
      link: "https://github.com/haroseo/Mindmap",
      github: "https://github.com/haroseo/Mindmap",
      featured: false,
      category: "development",
      details: {
        background: "암기 학습에서 마인드맵의 시각적 구조가 가진 가능성을 웹으로 구현하기 위해 제작했습니다.",
        strategy: "노드 기반의 연결 구조로 개념 간 관계를 직관적으로 표현하고 사용자 친화적인 UI를 구성했습니다.",
        metrics: "마인드맵 기반 학습 도구 웹 구현"
      }
    },
    {
      id: 6,
      title: "Crewcheck",
      description:
        "함수연구소(Function Factory)의 출석 체크 전용 프로젝트입니다. TypeScript 기반으로 팀 출결 현황을 효율적으로 관리합니다.",
      tags: ["TypeScript", "Tool", "Community"],
      link: "https://github.com/haroseo/Crewcheck",
      github: "https://github.com/haroseo/Crewcheck",
      featured: false,
      category: "development",
      details: {
        background: "함수연구소 팀 내 출석 관리의 번거로움을 해소하기 위해 직접 기획 및 개발했습니다.",
        strategy: "TypeScript를 활용해 안정적인 타입 시스템을 구축하고, 팀원 누구나 쉽게 사용할 수 있도록 간결한 인터페이스를 설계했습니다.",
        metrics: "팀 출결 관리 자동화 시스템 구현"
      }
    },
    {
      id: 7,
      title: "HANN BOT",
      description:
        "서버 관리의 새로운 기준을 제시하는 TypeScript 기반 디스코드 봇입니다.",
      tags: ["Discord Bot", "TypeScript", "Automation"],
      link: "https://github.com/haroseo/HANN-BOT",
      github: "https://github.com/haroseo/HANN-BOT",
      featured: false,
      category: "development",
      details: {
        background: "HANN LABS™ 소속 당시 팀 디스코드 서버 관리 효율화를 위해 직접 설계하고 개발한 봇입니다.",
        strategy: "TypeScript의 강타입 시스템을 활용해 안정적인 명령어 처리와 이벤트 핸들링을 구현했습니다.",
        metrics: "디스코드 서버 관리 자동화 봇 단독 개발"
      }
    },
    {
      id: 8,
      title: "movtier",
      description:
        "몹티어 - 영화 및 콘텐츠 티어 랭킹 서비스입니다.",
      tags: ["Web Service", "HTML", "Ranking"],
      link: "https://github.com/haroseo/movtier",
      github: "https://github.com/haroseo/movtier",
      featured: false,
      category: "development",
      details: {
        background: "영화와 콘텐츠를 티어 형식으로 정리하고 공유하는 플랫폼을 직접 기획했습니다.",
        strategy: "HTML 기반의 가벼운 구조로 빠른 렌더링과 직관적인 티어 배치 UI를 구현했습니다.",
        metrics: "콘텐츠 랭킹 큐레이션 서비스 제작"
      }
    },
    {
      id: 9,
      title: "Cokform",
      description:
        "손쉽고 빠른 웹 설문지 및 데이터 수집 폼 제작 서비스입니다.",
      tags: ["Web Service", "Form Builder", "Productivity"],
      link: "https://github.com/haroseo",
      github: "https://github.com/haroseo",
      featured: false,
      category: "development",
      details: {
        background: "사용자가 코딩 없이 직관적으로 설문 조사 및 입력 폼을 빌드하고 데이터를 수집할 수 있도록 돕는 솔루션이 필요하여 제작했습니다.",
        strategy: "컴포넌트 드래그 앤 드롭 방식의 유연한 에디터 인터페이스를 도입하고 데이터 저장 프로세스를 경량화했습니다.",
        metrics: "직관적인 폼 빌더 에디터 인터페이스 구현"
      }
    },
    {
      id: 10,
      title: "function factory",
      description:
        "유용한 공통 유틸리티 함수와 오픈소스 코드 조각들을 실험하고 패키징하는 개발 연구 프로젝트입니다.",
      tags: ["Library", "Developer Tool", "TypeScript"],
      link: "https://github.com/haroseo",
      github: "https://github.com/haroseo",
      featured: false,
      category: "development",
      details: {
        background: "반복적인 코드 작성을 방지하고 개발자들의 생산성을 올리기 위해 검증된 유틸리티 코드들을 통합 관리하기 위한 목적입니다.",
        strategy: "엄격한 타입 정의와 단위 테스트 구성을 통해 라이브러리의 신뢰성을 높이고 패키지 배포 파이프라인을 구축했습니다.",
        metrics: "오픈소스 유틸리티 라이브러리 프레임워크 구축"
      }
    },
    {
      id: 11,
      title: "Mapfit",
      description:
        "위치 데이터를 정밀 매칭하고 지도 위에 시각화하는 지리 정보 통합 웹 서비스입니다.",
      tags: ["Map API", "Geolocation", "Data Visualization"],
      link: "https://github.com/haroseo",
      github: "https://github.com/haroseo",
      featured: false,
      category: "development",
      details: {
        background: "복잡한 공간 좌표 데이터를 최적의 경로와 장소 매칭 알고리즘을 사용해 브라우저에 시각화하기 위해 개발되었습니다.",
        strategy: "지도 API와 좌표 변환 알고리즘을 결합해 부드러운 렌더링 성능과 높은 핀 매칭 정밀도를 구현했습니다.",
        metrics: "실시간 위치 데이터 렌더링 및 경로 탐색 인터랙션 구현"
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
      id: "kustudio",
      title: "Ku:/ Studio - Member",
      slogan: "창작의 경계를 넓히는 곳",
      description: "Ku:/ Studio에서 크리에이티브 멤버로 활동하며 디자인 및 브랜딩 프로젝트에 참여하고 있습니다.",
      achievements: [
        "스튜디오 내 브랜드 및 비주얼 디자인 프로젝트 참여",
        "크리에이티브 방향성 논의 및 콘텐츠 기획 기여"
      ],
      skills: ["Brand Design", "Visual Design", "Creative Direction"],
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
    location: "대한민국",
  },

  communities: [
    {
      name: "로블갤러리 (ROGLLAERY)",
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
    "A creator who connects businesses and users through design, marketing, and programming. I operate the youth startup community RoFolder and the asset distribution channel Limited™.",

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
      title: "TypoLab",
      description:
        "An experimental web typing service reinterpreting Hangeul's assembly mechanisms and visual values into interactive typography motion graphics.",
      tags: ["Typography", "Interactive Design", "Web Experiment"],
      link: "https://훈민정음.kro.kr",
      github: "https://github.com/naramarsami/naramarsami",
      featured: true,
      category: "development",
      details: {
        background: "Conceived to translate Hangeul's letters and assembly dynamics into browser-based interactive mechanics.",
        strategy: "Analyzed historical Hunminjeongeum structures to build real-time responsive web motion layouts.",
        metrics: "Planned and built interactive Hangeul typography system."
      }
    },
    {
      id: 3,
      title: "Planor",
      description:
        "A collaborative schedule planner bringing harmonious order to your daily rhythm by integrating scattered task management into one polished interface.",
      tags: ["Product Design", "Web Service"],
      link: "https://planor.kro.kr",
      featured: true,
      category: "marketing",
      details: {
        background: "Developed to resolve team calendar fragmentation and improve user schedule onboarding drop-offs.",
        strategy: "Injected lightweight annual/monthly time grid displays and buttery drag-and-drop layouts.",
        metrics: "Designed highly intuitive collaborative scheduler interfaces."
      }
    },
    {
      id: 4,
      title: "Xe Project",
      description:
        "A personal creative workspace where I prototype and experiment with diverse programming concepts.",
      tags: ["Personal Project", "Development"],
      link: "https://github.com/haroseo/Xe-project",
      github: "https://github.com/haroseo/Xe-project",
      featured: false,
      category: "development",
      details: {
        background: "Conceived to explore new technologies and ideas through personal creative workflows.",
        strategy: "Rapidly built prototypes to experiment with multiple framework combinations.",
        metrics: "Documented tech stack experiences and structured sandbox builds."
      }
    },
    {
      id: 5,
      title: "Mindmap",
      description:
        "An interactive web study tool based on node-graph structures to enhance memorization efficiency.",
      tags: ["Web Service", "Education", "Interactive Design"],
      link: "https://github.com/haroseo/Mindmap",
      github: "https://github.com/haroseo/Mindmap",
      featured: false,
      category: "development",
      details: {
        background: "Developed to translate the cognitive benefit of visual mind mapping into a web application.",
        strategy: "Designed connection flows using node networks with an intuitive UI.",
        metrics: "Implemented highly responsive canvas matching and concept mapping interfaces."
      }
    },
    {
      id: 6,
      title: "Crewcheck",
      description:
        "An automated team attendance tracking tool tailored for Function Factory, written in TypeScript.",
      tags: ["TypeScript", "Tool", "Community"],
      link: "https://github.com/haroseo/Crewcheck",
      github: "https://github.com/haroseo/Crewcheck",
      featured: false,
      category: "development",
      details: {
        background: "Created to automate the administrative overhead of team presence logs in Function Factory.",
        strategy: "Applied strict TypeScript static typings and simple dashboard grids for daily use.",
        metrics: "Fully automated attendance logs and simplified user validation workflows."
      }
    },
    {
      id: 7,
      title: "HANN BOT",
      description:
        "A feature-rich Discord administration bot built on TypeScript, establishing new standards for server operations.",
      tags: ["Discord Bot", "TypeScript", "Automation"],
      link: "https://github.com/haroseo/HANN-BOT",
      github: "https://github.com/haroseo/HANN-BOT",
      featured: false,
      category: "development",
      details: {
        background: "Designed and developed during my stay to optimize HANN LABS™' developer community server.",
        strategy: "Constructed structured event handlers and robust command architectures for stability.",
        metrics: "Delivered reliable discord integration features."
      }
    },
    {
      id: 8,
      title: "movtier",
      description:
        "A simple web ranking service to curate and rank movies/contents on modular tier lists.",
      tags: ["Web Service", "HTML", "Ranking"],
      link: "https://github.com/haroseo/movtier",
      github: "https://github.com/haroseo/movtier",
      featured: false,
      category: "development",
      details: {
        background: "Conceived to create a lightweight, responsive cataloging format to organize movie tiers.",
        strategy: "Wrote lightweight vanilla structures and streamlined draggable ranking assets.",
        metrics: "Created intuitive tier lists and curation pages."
      }
    },
    {
      id: 9,
      title: "Cokform",
      description:
        "A fast and customizable web form builder for collecting user feedback and surveys.",
      tags: ["Web Service", "Form Builder", "Productivity"],
      link: "https://github.com/haroseo",
      github: "https://github.com/haroseo",
      featured: false,
      category: "development",
      details: {
        background: "Aimed to let non-developers build dynamic feedback sheets and collect database payloads easily.",
        strategy: "Implemented drag-and-drop element editors and secure submission streams.",
        metrics: "Delivered intuitive form creation flows and minimal database configurations."
      }
    },
    {
      id: 10,
      title: "function factory",
      description:
        "A repository dedicated to researching and packaging reusable TypeScript utility functions.",
      tags: ["Library", "Developer Tool", "TypeScript"],
      link: "https://github.com/haroseo",
      github: "https://github.com/haroseo",
      featured: false,
      category: "development",
      details: {
        background: "Formed to minimize boilerplate programming across multiple personal web services.",
        strategy: "Used precise type definitions and unit tests to maximize library reliability.",
        metrics: "Constructed modular utilities and code snippet structures."
      }
    },
    {
      id: 11,
      title: "Mapfit",
      description:
        "A geographic data visualization service designed to match and plot locations on interactive maps.",
      tags: ["Map API", "Geolocation", "Data Visualization"],
      link: "https://github.com/haroseo",
      github: "https://github.com/haroseo",
      featured: false,
      category: "development",
      details: {
        background: "Created to render dense geo-coordinate information onto client browsers with custom routing.",
        strategy: "Linked Map APIs with path-matching algorithms for smooth animations.",
        metrics: "Rendered interactive route mapping and pin coordinates dynamically."
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
      id: "kustudio",
      title: "Ku:/ Studio - Creative Member",
      slogan: "Expanding the boundaries of creation",
      description: "Working as a creative member at Ku:/ Studio, participating in branding and design projects.",
      achievements: [
        "Participated in studio brand identity design and visual assets",
        "Contributed to creative design direction and contents curation"
      ],
      skills: ["Brand Design", "Visual Design", "Creative Direction"],
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
    location: "Republic of Korea",
  },

  communities: [
    {
      name: "ROGLLAERY",
      members: "800+",
      logo: "/assets/rogllaery.png",
      role: "Founder & General Manager",
      slogan: "A transparent community built by users, ROGLLAERY",
      description: "A transparent community built by users, ROGLLAERY",
      detailsText: "ROGLLAERY is a communication community where users interact and grow together. We aim for voluntary user participation and transparent culture, providing a healthy and transparent environment."
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
