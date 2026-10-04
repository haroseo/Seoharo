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
  contact: { email: string; github: string; instagram: string };
  communities: Community[];
}

const portfolioDataKo: PortfolioDataType = {
  name: "작업 기록",
  title: "기획 · 디자인 · 개발 · 마케팅",
  tagline: "생각을 시도하고, 현실로 만듭니다.",
  description:
    "회사에서 개발·마케팅 관련 업무를 경험했고, 디자인은 프리랜서 작업으로 이어가고 있습니다. 기획과 글쓰기, 웹 제작 경험을 함께 정리했습니다.",

  skills: [
    {
      category: "디자인 · 기획",
      items: ["UI 디자인", "브랜드 비주얼", "Figma", "콘텐츠 기획"],
    },
    {
      category: "사업 · 마케팅",
      items: ["사업 운영 경험", "마케팅 업무 경험", "커뮤니티 운영", "팀 리딩"],
    },
    {
      category: "개발 · AI 활용",
      items: ["개발 업무 경험", "웹 개발", "빠른 프로토타이핑", "생성형 AI 활용"],
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
        "한글의 자모 결합 원리를 타이핑 연습에 담아낸 웹 프로젝트입니다.",
      tags: ["Hangeul typing", "Web service"],
      link: "https://훈민정음.kro.kr",
      github: "",
      featured: true,
      category: "development",
      details: {
        background: "한글 창제의 결합 원리를 타이핑 연습으로 접할 수 있도록 기획했습니다.",
        strategy: "글자와 입력에 집중할 수 있도록 간결한 연습 흐름을 구성했습니다.",
        metrics: "한글 타이핑 연습 웹 프로젝트"
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
        "다양한 아이디어를 시험해 보는 개인 창작 프로젝트입니다.",
      tags: ["Personal Project", "Development"],
      link: "",
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
      link: "",
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
      link: "",
      featured: false,
      category: "development",
      details: {
        background: "함수연구소 팀 내 출석 관리의 번거로움을 해소하기 위해 직접 기획 및 개발했습니다.",
        strategy: "TypeScript를 활용해 안정적인 타입 시스템을 구축하고, 팀원 누구나 쉽게 사용할 수 있도록 간결한 인터페이스를 설계했습니다.",
        metrics: "팀 출결 관리 자동화 시스템 구현"
      }
    },

    {
      id: 8,
      title: "movtier",
      description:
        "몹티어 - 영화 및 콘텐츠 티어 랭킹 서비스입니다.",
      tags: ["Web Service", "HTML", "Ranking"],
      link: "",
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
      link: "https://cokform.pages.dev/",
      github: "",
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
      link: "",
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
      link: "",
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
      title: "커뮤니티 사업 · 이전 운영",
      slogan: "커뮤니티를 직접 기획하고 운영한 경험",
      description: "창업 커뮤니티 사업을 운영했습니다. 이후 사업을 다른 사람에게 넘기고 운영에서 물러났습니다.",
      achievements: [
        "사업을 직접 시작하고 팀을 이끌며 운영했습니다.",
        "이후 사업을 다른 사람에게 넘기고 운영에서 물러났습니다."
      ],
      skills: ["사업 운영", "팀 리딩", "책임감"]
    },
    {
      id: "limited",
      title: "디자인 리소스 사업 · 이전 운영",
      slogan: "디자인 리소스 사업을 기획하고 운영한 경험",
      description: "디자인 리소스 사업을 운영했습니다. 이후 사업을 다른 사람에게 넘기고 운영에서 물러났습니다.",
      achievements: [
        "디자인 리소스 사업을 직접 시작하고 운영했습니다.",
        "이후 사업을 다른 사람에게 넘기고 운영에서 물러났습니다."
      ],
      skills: ["사업 운영", "디자인", "팀 리딩"]
    },
    {
      id: "luxeret",
      title: "회사 업무 경험",
      slogan: "가능성을 넘어, 가치를 향해",
      description: "회사에서 브랜드 마케팅 관련 업무를 경험했습니다.",
      achievements: [
        "마케팅 캠페인 기획 및 브랜드 채널 운영",
        "온라인 프로모션 및 트렌드 분석"
      ],
      skills: ["Growth Marketing", "Marketing Strategy"],
    },
    {
      id: "kustudio",
      title: "크리에이티브 스튜디오 경험",
      slogan: "창작의 경계를 넓히는 곳",
      description: "스튜디오의 디자인 및 브랜딩 프로젝트에 참여했습니다.",
      achievements: [
        "스튜디오 내 브랜드 및 비주얼 디자인 프로젝트 참여",
        "크리에이티브 방향성 논의 및 콘텐츠 기획 기여"
      ],
      skills: ["Brand Design", "Visual Design", "Creative Direction"],
    }
  ],

  socialLinks: [],

  contact: {
    email: "",
    github: "",
    instagram: "",
  },

  communities: [
    {
      name: "커뮤니티 운영 경험",
      members: "커뮤니티 경험",
      logo: "/assets/rogllaery.png",
      role: "설립자 및 총괄 (Founder)",
      slogan: "사용자가 함께 만들어가는 커뮤니티",
      description: "사용자 참여와 투명한 소통을 중심으로 커뮤니티를 운영했습니다.",
      detailsText: "사용자 참여와 투명한 문화를 바탕으로 커뮤니티 운영 경험을 쌓았습니다."
    },
    {
      name: "디자인 리소스 사업",
      members: "이전 사업 · 양도 후 퇴임",
      logo: "/assets/limited.png",
      role: "창업 · 운영 · 양도 후 퇴임",
      slogan: "디자인 리소스 사업 운영 경험",
      description: "디자인 리소스 사업을 운영했습니다. 이후 다른 사람에게 넘기고 운영에서 물러났습니다.",
      detailsText: "이전 사업으로 디자인 리소스를 다루고 운영했습니다. 현재는 사업을 다른 사람에게 넘기고 운영에서 물러난 상태입니다."
    },
    {
      name: "커뮤니티 사업",
      members: "이전 사업 · 양도 후 퇴임",
      logo: "/assets/rofolder-logo-new.png",
      role: "창업 · 운영 · 양도 후 퇴임",
      slogan: "커뮤니티 서비스 기획과 운영 경험",
      description: "창업 커뮤니티 사업을 운영했습니다. 이후 다른 사람에게 넘기고 운영에서 물러났습니다.",
      detailsText: "창업 커뮤니티 사업을 직접 시작하고 운영했습니다. 이후 사업을 다른 사람에게 넘기고 운영에서 물러났습니다."
    }
  ],
};

const portfolioDataEn: PortfolioDataType = {
  name: "WORK ARCHIVE",
  title: "Planning · Design · Development · Marketing",
  tagline: "I try ideas and bring them to life.",
  description:
    "I have experience in development- and marketing-related work and continue design through freelance projects. This portfolio also includes planning, writing, and web work.",

  skills: [
    {
      category: "Design & Planning",
      items: ["UI Design", "Brand Visuals", "Figma", "Content Planning"],
    },
    {
      category: "Business & Marketing",
      items: ["Business Operations", "Marketing Experience", "Community Operations", "Team Leadership"],
    },
    {
      category: "Development & AI",
      items: ["Development Experience", "Web Development", "Rapid Prototyping", "Generative AI"],
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
      title: "나랏말싸미",
      description:
        "A web project that brings the principles of Hangeul composition into typing practice.",
      tags: ["Hangeul typing", "Web service"],
      link: "https://훈민정음.kro.kr",
      github: "",
      featured: true,
      category: "development",
      details: {
        background: "Planned as a way to encounter Hangeul composition principles through typing practice.",
        strategy: "Kept the practice flow focused on reading and entering Hangeul.",
        metrics: "Hangeul typing practice web project"
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
      link: "",
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
      link: "",
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
      link: "",
      featured: false,
      category: "development",
      details: {
        background: "Created to automate the administrative overhead of team presence logs in Function Factory.",
        strategy: "Applied strict TypeScript static typings and simple dashboard grids for daily use.",
        metrics: "Fully automated attendance logs and simplified user validation workflows."
      }
    },

    {
      id: 8,
      title: "movtier",
      description:
        "A simple web ranking service to curate and rank movies/contents on modular tier lists.",
      tags: ["Web Service", "HTML", "Ranking"],
      link: "",
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
      link: "https://cokform.pages.dev/",
      github: "",
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
      link: "",
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
      link: "",
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
      title: "Community business · Former",
      slogan: "Experience planning and operating a community business",
      description: "I ran a startup community business, then handed it over and stepped away from operations.",
      achievements: [
        "Started the business, led a team, and took responsibility for operations.",
        "Later handed the business over and stepped away from operations."
      ],
      skills: ["Business operations", "Team leadership", "Accountability"]
    },
    {
      id: "limited",
      title: "Design-resource business · Former",
      slogan: "Experience planning and operating a design-resource business",
      description: "I ran a design resource business, then handed it over and stepped away from operations.",
      achievements: [
        "Started and ran a business focused on design resources.",
        "Later handed the business over and stepped away from operations."
      ],
      skills: ["Business operations", "Design", "Team leadership"]
    },
    {
      id: "luxeret",
      title: "Company experience",
      slogan: "Beyond possibilities, towards value",
      description: "Experience in brand marketing-related work.",
      achievements: [
        "Planning marketing campaigns and managing brand channels",
        "Analyzing online promotions and market trends"
      ],
      skills: ["Growth Marketing", "Marketing Strategy"],
    },
    {
      id: "kustudio",
      title: "Creative studio experience",
      slogan: "Expanding the boundaries of creation",
      description: "Participated in studio design and branding projects.",
      achievements: [
        "Participated in studio brand identity design and visual assets",
        "Contributed to creative design direction and contents curation"
      ],
      skills: ["Brand Design", "Visual Design", "Creative Direction"],
    }
  ],

  socialLinks: [],

  contact: {
    email: "",
    github: "",
    instagram: "",
  },

  communities: [
    {
      name: "Community experience",
      members: "Community experience",
      logo: "/assets/rogllaery.png",
      role: "Founder & General Manager",
      slogan: "A community built together with its users",
      description: "Community operations centered on user participation and open communication.",
      detailsText: "Experience operating a community around user participation and transparent communication."
    },
    {
      name: "Design-resource business",
      members: "Former business · handed over",
      logo: "/assets/limited.png",
      role: "Founded · operated · handed over",
      slogan: "Design-resource business experience",
      description: "I ran a design resource business, then handed it over and stepped away from operations.",
      detailsText: "This was a former business focused on design resources. I handed it over and am no longer involved in its operations."
    },
    {
      name: "Community business",
      members: "Former business · handed over",
      logo: "/assets/rofolder-logo-new.png",
      role: "Founded · operated · handed over",
      slogan: "Everything about RoShop searches that raises your value",
      description: "I ran a startup community business, then handed it over and stepped away from operations.",
      detailsText: "I started and ran this startup community business, then handed it over and stepped away from operations."
    }
  ],
};

export const portfolioData = {
  ko: portfolioDataKo,
  en: portfolioDataEn,
};
