export const portfolioData = {
  name: "SEOHARO",
  title: "Creative Ideas x Code",
  tagline: "아이디어에서 아이디어를 창조하는 크리에이티브 메이커",
  description:
    "시각적인 아름다움(Brand Design)과 기술적 구현(Programming)을 결합하여 가치 있는 경험을 설계하는 브랜드 디자이너 겸 CEO입니다. Design Pick, 나랏말싸미(훈민정음)를 비롯한 다양한 프로젝트를 성공적으로 이끌고 있습니다.",

  skills: [
    {
      category: "Design",
      items: ["UX Design", "Typography", "Figma", "Prototyping", "Branding"],
    },
    {
      category: "Frontend",
      items: ["React", "TypeScript", "Next.js"],
    },
    {
      category: "Backend & Scripting",
      items: ["TypeScript", "Python", "Lua", "Node.js"],
    },
    {
      category: "Tools & Others",
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
        "아트워크와 디자인을 큐레이션하는 크리에이티브 플랫폼으로, 감각적인 경험을 제공합니다.",
      tags: ["UX Design", "Web Design", "Creative Direction"],
      link: "https://designs.kro.kr",
      github: "https://github.com/haroseo/Design-Pick",
      featured: true,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "나랏말싸미",
      description:
        "한글의 원리를 담은 에듀케이션 타자 서비스로, 교육적 가치와 재미있는 인터랙티브 경험을 제공합니다.",
      tags: ["Education", "EdTech", "Web Service"],
      link: "https://훈민정음.kro.kr",
      github: "https://github.com/naramarsami/naramarsami",
      featured: true,
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "HANN봇",
      description:
        "디스코드 서버 운영과 커뮤니티 인터랙션을 돕는 다기능 봇으로, 편리한 관리를 지원합니다.",
      tags: ["TypeScript", "Discord.js", "Bot Development"],
      link: "https://github.com/haroseo/HANN-BOT",
      github: "https://github.com/haroseo/HANN-BOT",
      featured: true,
      image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2574&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Security & Growth Toolkit",
      description:
        "보안 인사이트와 성장 전략을 결합한 분석 도구로, 실전 가치 중심의 개발을 실현합니다.",
      tags: ["Python", "Security", "Analytics"],
      link: "https://github.com/haroseo/sec-growth-toolkit",
      github: "https://github.com/haroseo/sec-growth-toolkit",
      featured: false,
    },
    {
      id: 5,
      title: "Lua Creative Scripts",
      description:
        "게임과 미디어 프로젝트를 위한 Lua 스크립트 라이브러리로, 빠른 프로토타입 제작을 돕습니다.",
      tags: ["Lua", "Scripting", "Game Dev"],
      link: "https://github.com/haroseo/lua-creative-scripts",
      github: "https://github.com/haroseo/lua-creative-scripts",
      featured: false,
    },
    {
      id: 6,
      title: "Portfolio AI Explorer",
      description:
        "디자인과 코드를 연결하는 아이디어 탐색 도구로, 창작의 출발점을 제시합니다.",
      tags: ["React", "AI", "Interactive"],
      link: "https://github.com/haroseo/portfolio-ai-explorer",
      github: "https://github.com/haroseo/portfolio-ai-explorer",
      featured: false,
    },
  ],

  socialLinks: [
    { icon: "github", label: "GitHub", url: "https://github.com/haroseo" },
    { icon: "discord", label: "Discord", url: "https://discord.com/users/harobuger" },
    { icon: "twitter", label: "Twitter", url: "https://twitter.com/haroseo" },
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
      name: "로블갤러리 (ROGLLAERY)",
      members: "800+",
      description: "유저가 만들어 나가는 투명한 커뮤니티, 로블갤러리",
      logo: "/assets/rogllaery.png",
    },
    {
      name: "Limited™",
      members: "500+",
      description: "오직 나만을 위한 제품, Limited™",
      logo: "/assets/limited.png",
    },
    {
      name: "로폴더 (RoFolder)",
      members: "700+",
      description: "당신의 가치를 높이는,\n로샵 탐색의 모든 것",
      logo: "/assets/rofolder.jpg",
    },
  ],
};
