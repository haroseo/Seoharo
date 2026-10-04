import type { Copy } from './portfolioContent';

export const aboutHeroIntro: Copy = {
  ko: 'Seoharo라는 이름으로 활동해 온 서주원입니다. 상상한 것을 말과 글로 정리하고, 디자인과 개발로 직접 만듭니다. 생각을 오래 붙잡기보다 먼저 시도하고, 사람들과 함께 끝까지 결과물로 이어갑니다.',
  en: 'I’m Seo Juwon, known online as Seoharo. I shape ideas through writing and conversation, then bring them to life through design and development. I start by trying, and work with people to carry an idea through to a result.',
};

export const aboutIntro: Copy = {
  ko: '온라인에서는 Seoharo라는 이름으로 활동해 온 서주원입니다. 상상한 것을 직접 만들어 보고, 더 나은 방향을 찾아가는 일을 좋아합니다. 디자인과 마케팅, 개발을 오가며 아이디어를 구체적인 화면과 서비스로 옮깁니다. 기획과 글로 생각을 정리하고, 사람들과 목표를 맞춰 팀을 이끌어 실행합니다. 새로운 일을 배우는 데 주저하지 않고, 맡은 일은 끝까지 이어가는 것을 중요하게 생각합니다.',
  en: 'I’m Seo Juwon, known online as Seoharo. I enjoy making what I imagine and finding a better direction along the way. I move between design, marketing, and development to turn ideas into interfaces and services. I clarify ideas through planning and writing, align people around a goal, and lead the work forward. I value learning new things and following through on the work I take on.',
};

export interface GrowthStep {
  id: string;
  anchorId: string;
  phase: Copy;
  tags: Copy[];
  title: Copy;
  body: Copy;
  learning: Copy;
  current?: boolean;
  workLink?: { href: string; label: Copy };
}

export const aboutGrowth: GrowthStep[] = [
  {
    id: 'platform',
    anchorId: 'about-growth-phase-1',
    phase: { ko: 'PHASE 01', en: 'PHASE 01' },
    tags: [{ ko: '# 가상 플랫폼', en: '# Virtual platform' }, { ko: '# 창작 입문', en: '# First steps in making' }],
    title: { ko: '가상 플랫폼 창작 입문', en: 'A first step into making on a virtual platform' },
    body: {
      ko: '가상 플랫폼에서 작동법을 배우며 프로그래밍을 처음으로 접했습니다.',
      en: 'I first encountered programming while learning how things worked inside a virtual platform.',
    },
    learning: { ko: '프로그래밍에 대한 첫 관심', en: 'An interest in programming' },
  },
  {
    id: 'programming',
    anchorId: 'about-growth-phase-2',
    phase: { ko: 'PHASE 02', en: 'PHASE 02' },
    tags: [{ ko: '# 소프트웨어 기초', en: '# Software fundamentals' }, { ko: '# 논리 학습', en: '# Logical thinking' }],
    title: { ko: '컴퓨터 프로그래밍 기초 공부', en: 'Learning the fundamentals of computer programming' },
    body: {
      ko: '컴퓨터 소프트웨어의 기초를 공부하며 논리적인 개념을 익혔습니다.',
      en: 'I studied the fundamentals of computer software and learned to think through logical concepts.',
    },
    learning: { ko: '기초 개념과 논리적 사고', en: 'Fundamentals and logical thinking' },
  },
  {
    id: 'team-projects',
    anchorId: 'about-growth-phase-3',
    phase: { ko: 'PHASE 03', en: 'PHASE 03' },
    tags: [{ ko: '# 팀 프로젝트', en: '# Team projects' }, { ko: '# 협업', en: '# Collaboration' }],
    title: { ko: '팀 프로젝트 참여', en: 'Taking part in team projects' },
    body: {
      ko: '팀 프로젝트에 참여하며 소통하는 방법과 여러 가지 개발/디자인 도구를 손에 익혔습니다.',
      en: 'Through team projects, I practiced communicating and became familiar with a range of development and design tools.',
    },
    learning: { ko: '소통과 협업, 개발·디자인 도구 활용', en: 'Communication, collaboration, and development and design tools' },
  },
  {
    id: 'asset-and-service',
    anchorId: 'about-growth-phase-4',
    phase: { ko: 'PHASE 04', en: 'PHASE 04' },
    tags: [{ ko: '# 에셋 제작', en: '# Asset creation' }, { ko: '# 운영', en: '# Operations' }],
    title: { ko: '에셋 기획 및 서비스 운영', en: 'Planning assets and operating services' },
    body: {
      ko: '직접 가상 공간 에셋과 플랫폼 디자인을 기획하고 채널을 이끌어 보았습니다. 기획을 정리하는 일에서 실제 운영까지 맡아보며, 사람들과 함께 일을 이어가는 경험을 쌓았습니다.',
      en: 'I planned assets and platform design for virtual spaces and led a channel. Taking on both planning and operations gave me experience carrying the work forward with other people.',
    },
    learning: { ko: '기획을 실제 작업과 운영으로 연결하기', en: 'Connecting planning with making and operations' },
  },
  {
    id: 'design-marketing-development',
    anchorId: 'about-growth-phase-5',
    phase: { ko: 'PHASE 05', en: 'PHASE 05' },
    tags: [{ ko: '# 디자인', en: '# Design' }, { ko: '# 마케팅', en: '# Marketing' }, { ko: '# 개발', en: '# Development' }],
    title: { ko: '디자인·마케팅·개발 학습', en: 'Learning design, marketing, and development' },
    body: {
      ko: '디자인은 취미에서 프리랜서 작업으로 이어졌습니다. SNS 마케팅과 데이터 분석을 배우고, 사이트 구성 기획과 제품 UI/UX 작업에도 참여했습니다. 디자인과 마케팅, 개발을 함께 다루며 아이디어를 여러 관점에서 살펴보는 경험을 쌓았습니다.',
      en: 'Design grew from a personal interest into freelance work. I learned social media marketing and data analysis, and contributed to website planning and product UI/UX. Working across design, marketing, and development helped me look at ideas from several perspectives.',
    },
    learning: { ko: '디자인·마케팅·개발을 함께 보는 관점', en: 'A perspective that connects design, marketing, and development' },
  },
  {
    id: 'community-operations',
    anchorId: 'about-growth-phase-6',
    phase: { ko: 'PHASE 06', en: 'PHASE 06' },
    tags: [{ ko: '# 프로젝트 기획', en: '# Project planning' }, { ko: '# 팀 리딩', en: '# Team leadership' }],
    title: { ko: '프로젝트 운영과 팀 리딩', en: 'Project operations and team leadership' },
    body: {
      ko: '직접 시작한 프로젝트와 팀 활동을 통해 기획한 일을 운영하고, 사람들과 소통하는 방법을 배웠습니다. 여러 팀을 이끌면서 목표를 맞추고 역할을 나눠 실행하는 경험을 쌓았습니다. 맡은 일을 끝까지 이어가는 책임감을 중요하게 생각합니다.',
      en: 'Through projects I started and team activities, I learned to run the work and communicate with people. Leading teams gave me practice aligning on a goal and sharing responsibilities. I value taking responsibility and following through.',
    },
    learning: { ko: '기획·팀 리딩·끝까지 이어가는 책임감', en: 'Planning, team leadership, and responsibility' },
  },
  {
    id: 'making-now',
    anchorId: 'about-growth-phase-7',
    phase: { ko: 'PHASE 07', en: 'PHASE 07' },
    tags: [{ ko: '# AI 활용', en: '# Working with AI' }, { ko: '# 빠른 실행', en: '# Fast execution' }],
    title: { ko: '생각을 시험하고, 다시 쌓는 지금', en: 'Testing ideas and building again' },
    body: {
      ko: '요즘은 AI로 상상을 빠르게 시험하고, 디자인과 웹 작업으로 구체화하고 있습니다. 글과 말로 방향을 정리한 뒤 먼저 만들어 보는 실행 방식으로 새로운 작업을 다시 쌓고 있습니다. 디자인 작업과 팀 리딩도 이어가고 있습니다.',
      en: 'I now use AI to test what I imagine and make it concrete through design and web projects. I clarify the direction through writing and conversation, then start making. I’m building a new body of work while continuing design work and team leadership.',
    },
    learning: { ko: '상상을 빠르게 시도하고 결과물로 옮기기', en: 'Trying an idea quickly and turning it into a result' },
    current: true,
    workLink: {
      href: '/portfolio/designgraphy',
      label: { ko: '진행 중인 작업 보기', en: 'View my current work' },
    },
  },
];

export const aboutDisciplines: Array<{ id: string; title: Copy; body: Copy }> = [
  {
    id: 'design',
    title: { ko: '시각 디자인 & 브랜딩', en: 'Visual design & branding' },
    body: {
      ko: '브랜드의 목적과 분위기를 살피고 그래픽과 UI로 정리합니다. 보기 좋은 데서 그치지 않고, 필요한 내용이 잘 전달되는 디자인을 지향합니다.',
      en: 'I shape visual direction through graphics and UI, keeping a brand’s purpose in view. Good design should communicate clearly, not only look good.',
    },
  },
  {
    id: 'marketing',
    title: { ko: '브랜드 마케팅', en: 'Brand marketing' },
    body: {
      ko: 'SNS 마케팅과 데이터 분석을 배우며 사람에게 닿는 메시지와 반응을 살펴봤습니다. 어떤 표현이 관심을 만들고 행동으로 이어지는지 고민합니다.',
      en: 'I learned social media marketing and data analysis, paying attention to how messages reach people and how they respond. I think about what makes a message engaging and useful.',
    },
  },
  {
    id: 'web',
    title: { ko: '웹 서비스 기획 & 개발', en: 'Web service planning & development' },
    body: {
      ko: '아이디어를 화면과 동작으로 옮기고, 서비스의 구조와 사용 흐름을 함께 고민합니다. AI는 상상을 빠르게 시험해보는 도구로 활용합니다.',
      en: 'I turn ideas into interfaces and working flows, considering how a service is structured and used. I use AI to explore and test ideas quickly.',
    },
  },
  {
    id: 'planning',
    title: { ko: '기획 & 팀 리딩', en: 'Planning & team leadership' },
    body: {
      ko: '생각을 말과 글로 정리하고, 사람들과 목표를 맞춘 뒤 역할을 나눠 실행합니다. 서로 다른 의견을 하나의 방향으로 모으고, 맡은 일을 끝까지 이어가는 것을 중요하게 생각합니다.',
      en: 'I clarify ideas through writing and conversation, align on a goal, and help a team move forward. I value bringing different perspectives together and following through on the work.',
    },
  },
];

export const aboutPrinciple: Copy = {
  ko: '생각을 시도하고, 현실로 만듭니다.',
  en: 'I try an idea, then make it real.',
};

export const aboutCapabilities: Array<{ id: string; title: string; subtitle: string; items: Copy[] }> = [
  { id: 'design', title: 'Design', subtitle: 'CREATIVE INTERFACE', items: [
    { ko: '브랜딩', en: 'Branding' }, { ko: 'UI/UX 기획', en: 'UI/UX planning' }, { ko: '프리랜서 디자인', en: 'Freelance design' },
  ] },
  { id: 'marketing', title: 'Marketing', subtitle: 'GROWTH STRATEGY', items: [
    { ko: 'SNS 마케팅', en: 'Social media marketing' }, { ko: '데이터 분석', en: 'Data analysis' }, { ko: '콘텐츠 기획', en: 'Content planning' },
  ] },
  { id: 'programming', title: 'Programming', subtitle: 'SYSTEMS & LOGIC', items: [
    { ko: '웹 서비스 기획', en: 'Web service planning' }, { ko: '웹 제작', en: 'Web building' }, { ko: 'AI 프로토타이핑', en: 'AI prototyping' },
  ] },
];
