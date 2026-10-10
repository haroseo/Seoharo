import { getImagePreview } from '../lib/imagePreview.ts';

export type Locale = 'ko' | 'en';
export type Copy = Record<Locale, string>;
export type WorkCategory = 'design' | 'development' | 'planning' | 'operations';

export interface SelectedWork {
  slug: string;
  title: string;
  category: WorkCategory;
  status: 'project' | 'prototype';
  projectStatus?: 'ongoing';
  eyebrow: string;
  headline: Copy;
  summary: Copy;
  roles: Copy;
  output: Copy;
  image?: string;
  imageAlt?: Copy;
  imagePresentation?: 'screen';
  href?: string;
  github?: string;
  theme: 'ink' | 'paper' | 'blue';
  notes: { title: Copy; body: Copy }[];
}

export const profile = {
  name: 'Seo Juwon',
  koreanName: '서주원',
  headline: {
    ko: '브랜드 디자이너 · 마케터 · 개발자',
    en: 'Brand Designer · Marketer · Developer',
  },
  summary: {
    ko: 'Seoharo라는 이름으로 활동해 온 서주원입니다. 기획과 글로 생각을 정리하고, 디자인·마케팅·개발을 오가며 직접 만듭니다.',
    en: 'I’m Seo Juwon, known online as Seoharo. I shape ideas through planning and writing, then build across design, marketing and development.',
  },
};

export const profileApproach: Copy = {
  ko: '먼저 생각을 말과 글로 정리하고, 사람들과 목표를 맞춥니다. AI로 아이디어를 시험하고 디자인과 웹 작업으로 구체화합니다. 보이는 내용은 간결하게, 자세한 과정은 작업 안에 담는 방식을 지향합니다.',
  en: 'I clarify ideas through writing and conversation, align people around a goal, and use AI to try ideas before turning them into design and web projects. I aim for a clear overview with the detailed process inside each project.',
};

export const skillGroups = [
  { title: { ko: '기획 · 커뮤니케이션', en: 'Planning · Communication' }, items: { ko: ['기획', '글쓰기', '발표', '팀 리딩'], en: ['Planning', 'Writing', 'Speaking', 'Team leadership'] } },
  { title: { ko: '디자인', en: 'Design' }, items: { ko: ['프리랜서 디자인', 'UI 디자인', '브랜딩'], en: ['Freelance design', 'UI design', 'Branding'] } },
  { title: { ko: '개발 · 마케팅', en: 'Development · Marketing' }, items: { ko: ['개발 업무 경험', '마케팅 업무 경험', 'AI 프로토타이핑'], en: ['Development experience', 'Marketing experience', 'AI prototyping'] } },
];

// Sources: user-provided statements, the existing site and repository, and supplied project references.
// Project covers are existing artwork, not presented as live product screenshots.
// No unverified conversion, revenue, member or client counts are published.
export const selectedWorks: SelectedWork[] = [
  {
    slug: 'designgraphy', title: '디자인그래피', category: 'design', status: 'prototype', projectStatus: 'ongoing', eyebrow: 'DESIGN REFERENCE ARCHIVE', theme: 'blue',
    headline: { ko: '필요한 디자인 레퍼런스를,\n한곳에서.', en: 'Find your design\nreference in one place.' },
    summary: { ko: '기업과 대학의 공식 디자인 가이드를 모아 검색하고, 원문으로 연결하는 레퍼런스 아카이브 프로토타입.', en: 'A reference archive prototype for finding official company and university design guides and opening their original sources.' },
    roles: { ko: '개인 프로젝트 · 웹 프로토타입', en: 'Personal project · Web prototype' },
    output: { ko: '검색 · 분야별 목록 · 가이드 상세 화면', en: 'Search · Categorized index · Guide detail pages' },
    image: getImagePreview('designgraphy:home').image, imagePresentation: 'screen',
    imageAlt: { ko: '디자인그래피 홈페이지 공개용 미리보기', en: 'Public preview of the Designgraphy homepage' },
    notes: [
      { title: { ko: '무엇을 만들었나요?', en: 'What is it?' }, body: { ko: '디자인을 참고할 때 기업과 대학의 공식 자료를 한곳에서 찾을 수 있도록 구성한 웹 프로토타입입니다. 자료 소개에서 원문 가이드로 바로 이동하는 흐름을 담았습니다.', en: 'A web prototype that brings official design references from companies and universities into one place, connecting guide summaries to their original sources.' } },
      { title: { ko: '화면에서 확인할 수 있는 것', en: 'What the prototype shows' }, body: { ko: '검색, 국내·해외와 기업·대학 분류, 가이드 목록과 상세 화면을 구성했습니다. 공식 자료를 만든 기관과 아카이브의 역할을 구분합니다.', en: 'The interface includes search, domestic and international company and university categories, a guide index, and detail pages. The archive remains distinct from the organizations that created the guides.' } },
      { title: { ko: '현재 작업 범위', en: 'Current scope' }, body: { ko: '공유된 Claude 아티팩트 버전입니다. 컬러 팔레트와 타이포그래피 메뉴는 준비 중이며, 아카이브 전체 자료의 정확성이나 서비스 운영 성과를 검증한 결과는 아닙니다.', en: 'The shared Claude artifact version. Color palette and typography sections are marked as coming soon. This record does not claim independently validated archive data or service outcomes.' } },
    ],
  },
  {
    slug: 'one-to-z', title: '1 to Z', category: 'design', status: 'prototype', eyebrow: 'FASHION PLATFORM · UI/UX', theme: 'paper',
    headline: { ko: '취향을 발견하고,\n옷을 고르는 화면.', en: 'Discover a style.\nExplore the clothes.' },
    summary: { ko: '의류 관련 플랫폼 1 to Z의 웹·모바일 디자인 시안. 홈부터 상품 탐색, 주문과 배송 조회까지 18개 화면을 정리했습니다.', en: 'Web and mobile design prototypes for the clothing platform 1 to Z. Eighteen screens cover home, discovery, products, ordering and delivery tracking.' },
    roles: { ko: '개인 디자인 시안 · UI/UX 구성', en: 'Personal design prototype · UI/UX layout' },
    output: { ko: '웹 5개 · 모바일 13개 디자인 화면', en: '5 web · 13 mobile design screens' },
    image: getImagePreview('one-to-z:20-11859').image, imagePresentation: 'screen',
    imageAlt: { ko: '1 to Z 의류 플랫폼 쇼핑 홈페이지 디자인 시안', en: '1 to Z clothing platform shopping homepage design prototype' },
    notes: [
      { title: { ko: '작업 범위', en: 'Scope' }, body: { ko: '의류 관련 플랫폼의 웹·모바일 화면을 구성한 디자인 시안입니다. 상품 목록과 상세, 브랜드 이야기와 에디토리얼, 찜과 장바구니, 주문 이후 화면까지 담았습니다.', en: 'Design prototypes for a clothing platform across web and mobile, including product lists and details, brand stories, editorial content, saved items, cart and post-order screens.' } },
      { title: { ko: '화면 전체로 확인하기', en: 'Inspect the screens' }, body: { ko: '디자인 화면 18개를 화면별 기능과 함께 정리했습니다. 원본 파일 대신 공개용 미리보기를 사용하며, 각 화면의 전체 흐름은 페이지 안에서 확인할 수 있습니다.', en: 'Eighteen design screens are documented with notes. Public previews replace the source files, while the complete screen flow remains viewable within this page.' } },
      { title: { ko: '시안과 실제 서비스 구분', en: 'Prototype, not a live service' }, body: { ko: '화면에 있는 상품·가격·주문·회원·회사 정보는 예시입니다. 실제 판매, 고객 수, 구매 성과나 개발 완료를 주장하지 않습니다.', en: 'Products, prices, orders, member and company information in the design are examples, not claims of sales, customers, purchase outcomes or a completed implementation.' } },
    ],
  },
  {
    slug: 'planor', title: 'Planor', category: 'planning', status: 'project', eyebrow: 'PRODUCT & PLANNING', theme: 'blue',
    headline: { ko: '계획을 짜는\n새로운 방식.', en: 'A new way\nto plan your days.' },
    summary: { ko: '일정과 계획을 한눈에 볼 수 있는 캘린더 웹 서비스. 아이디어를 실제 화면과 흐름으로 옮겨 본 프로젝트입니다.', en: 'A calendar web project for organizing plans and turning an idea into a working interface.' },
    roles: { ko: '기획 · 웹 제작', en: 'Planning · Web building' },
    output: { ko: '캘린더 웹 서비스와 인터페이스', en: 'Calendar web project and interface' },
    href: 'https://planor.kro.kr',
    notes: [
      { title: { ko: '출발점', en: 'Starting point' }, body: { ko: '흩어진 일정과 계획을 한 화면에서 정리하는 방식을 고민한 프로젝트입니다.', en: 'A project exploring how scattered schedules and plans can be organized in one interface.' } },
      { title: { ko: '프로젝트에서 고민한 일', en: 'Project focus' }, body: { ko: 'Planor를 만들며 화면 구조와 제품 방향, 계획을 정리하는 흐름을 고민했습니다.', en: 'While making Planor, I explored its interface structure, product direction, and planning flow.' } },
    ],
  },
  {
    slug: 'design-pick', title: 'Design Pick', category: 'design', status: 'project', eyebrow: 'DESIGN & WEB', theme: 'paper',
    headline: { ko: '색을 고르고,\n작업에 가져다 쓰다.', en: 'Choose a color.\nBring it into your work.' },
    summary: { ko: 'RGB 조절과 컬러 피커, 팔레트 탐색, HEX·RGB 복사와 CSS·Tailwind 내보내기를 한곳에 모은 디자인 도구 웹 프로젝트.', en: 'A design tools web project bringing together RGB controls, a color picker, palette browsing, HEX and RGB copying, and CSS and Tailwind export.' },
    roles: { ko: '기획 · UI 디자인 · 웹 제작', en: 'Planning · UI design · Web building' },
    output: { ko: '컬러 피커 · 팔레트 · 디자인 도구', en: 'Color picker · Palettes · Design tools' },
    image: '/assets/designpick.png', imageAlt: { ko: 'Design Pick 색상환과 디자인 도구 소개 커버', en: 'Design Pick cover featuring a color wheel and design tools' },
    href: 'https://designs.kro.kr',
    github: 'https://github.com/haroseo/Design-Pick',
    notes: [
      { title: { ko: '화면에서 확인할 수 있는 것', en: 'What the public version shows' }, body: { ko: 'RGB 채널 조절, 색상 코드 복사, 팔레트 탐색과 보관함을 구성한 컬러 도구입니다. CSS 변수와 Tailwind 설정 내보내기, 폰트 미리보기와 디자인 학습 자료 메뉴도 공개 버전에 포함되어 있습니다.', en: 'The public version includes RGB channel controls, color-code copying, palette browsing and saved palettes. It also presents CSS variable and Tailwind config export, font previews and design learning resources.' } },
      { title: { ko: '공개 버전 안내', en: 'About the linked version' }, body: { ko: '이곳에서는 Design Pick이라는 이름으로 소개합니다. 연결된 공개 사이트의 제목과 일부 메뉴에는 RGBdom이라는 이름이 남아 있습니다. 실제 기능과 작업 범위를 구분해 기록하며, 이용자 수나 성과를 주장하지 않습니다.', en: 'This portfolio introduces the project as Design Pick. The linked public site still uses RGBdom in its title and some menus. This record describes the visible tools without claiming user counts or business outcomes.' } },
    ],
  },
  {
    slug: 'naratmalsami', title: '나랏말싸미', category: 'development', status: 'project', eyebrow: 'HANGEUL TYPING', theme: 'paper',
    headline: { ko: '한글을 직접 입력하며\n익히는 경험.', en: 'Learn Hangeul by\ntyping it yourself.' },
    summary: { ko: '한글의 자모 결합 원리를 타이핑 연습에 담아낸 웹 프로젝트.', en: 'A web project that brings the principles of Hangeul composition into typing practice.' },
    roles: { ko: '기획 · 인터랙션 · 웹 개발', en: 'Planning · Interaction · Web development' },
    output: { ko: '한글 타이핑 연습 서비스', en: 'Hangeul typing practice' },
    href: 'https://훈민정음.kro.kr',
    notes: [
      { title: { ko: '출발점', en: 'Starting point' }, body: { ko: '한글 창제의 결합 원리를 타이핑 연습에서 자연스럽게 접할 수 있도록 기획했습니다.', en: 'I planned a typing exercise that introduces the combination principles behind Hangeul.' } },
      { title: { ko: '작업 방향', en: 'Project focus' }, body: { ko: '글자와 입력에 집중할 수 있도록 화면을 단순하게 구성하고, 연습 흐름에 맞춘 인터랙션을 만들었습니다.', en: 'I kept the interface focused on letters and input, with interactions that follow the practice flow.' } },
    ],
  },
];

export const archiveWorks: { title: string; description: Copy; href?: string; category: WorkCategory }[] = [
  { title: 'Cokform', category: 'development', description: { ko: '설문과 입력 폼을 만드는 웹 프로젝트 · 사업 중단', en: 'A web form building project · business stopped' }, href: 'https://cokform.pages.dev/' },
];

export const experiences = [
  { organization: 'RoFolder', period: { ko: '과거 운영', en: 'Former operation' }, role: { ko: '서버 찾기 플랫폼 운영', en: 'Server discovery platform operations' }, description: { ko: '서버 찾기 플랫폼을 운영했습니다. 다른 사람에게 인계한 뒤 운영에서 물러났습니다.', en: 'Operated a server discovery platform, then handed it over and stepped away.' }, status: { ko: '인계 후 운영에서 물러남', en: 'Handed over · Stepped away' } },
  { organization: 'Limited', period: { ko: '과거 운영', en: 'Former operation' }, role: { ko: '모델링 · UI/UX 주문 제작 서버 운영', en: 'Custom modeling · UI/UX commission server' }, description: { ko: '모델링과 UI/UX 주문 제작 서버를 운영했습니다. 다른 사람에게 인계한 뒤 운영에서 물러났습니다.', en: 'Operated a custom modeling and UI/UX commission server, then handed it over and stepped away.' }, status: { ko: '인계 후 운영에서 물러남', en: 'Handed over · Stepped away' } },
  { organization: '로블갤러리', period: { ko: '과거 운영', en: 'Former operation' }, role: { ko: '로블록스 에셋 무료 배포 서버 운영', en: 'Free Roblox asset distribution server' }, description: { ko: '로블록스 이용자가 만든 에셋을 무료로 배포하는 서버를 운영했습니다.', en: 'Operated a server that freely distributed assets made by Roblox users.' }, status: { ko: '이전 운영', en: 'Former operation' } },
];

export interface CareerVenture {
  name: string;
  logo: string;
  field: Copy;
  summary: Copy;
  members: number;
  statusText: Copy;
  status: 'former';
}

export interface CareerContribution {
  title: Copy;
  description: Copy;
  productSummary?: Copy;
  href?: string;
  specialty?: CompanyWorkSpecialtyId;
}

export const careerGroups = [
  { id: 'company', label: { ko: '회사 업무', en: 'Company work' } },
  { id: 'freelance', label: { ko: '프리랜서 디자인', en: 'Freelance design' } },
  { id: 'business', label: { ko: '사업 운영', en: 'Business operations' } },
  { id: 'club', label: { ko: '동아리', en: 'Clubs' } },
] as const;

export type CareerGroupId = typeof careerGroups[number]['id'];

export const companyWorkSpecialties = [
  { id: 'marketing', label: { ko: '마케팅', en: 'Marketing' } },
  { id: 'development', label: { ko: '개발', en: 'Development' } },
  { id: 'design', label: { ko: '디자인', en: 'Design' } },
] as const;

export type CompanyWorkSpecialtyId = typeof companyWorkSpecialties[number]['id'];
export type CompanyWorkSpecialtyFilter = CompanyWorkSpecialtyId | 'all';

export interface CareerEntry {
  slug: string;
  group: CareerGroupId;
  specialty?: CompanyWorkSpecialtyId;
  title: Copy;
  organization?: Copy;
  logo?: string;
  role: Copy;
  summary: Copy;
  members?: number;
  responsibilities: Copy[];
  contributions?: CareerContribution[];
  areas?: Copy[];
  areasHeading?: Copy;
  status: 'current' | 'former';
  statusText: Copy;
  ventures?: CareerVenture[];
}

export const careerEntries: CareerEntry[] = [
  {
    slug: 'company-work',
    group: 'company',
    specialty: 'marketing',
    title: { ko: '회사 업무', en: 'Company work' },
    organization: { ko: 'LUXERET', en: 'LUXERET' },
    role: { ko: '마케팅 담당자', en: 'Marketing associate' },
    summary: {
      ko: '마케팅 담당자로 채용되어 SNS 마케팅과 데이터 분석을 익혔고, 사이트 구성 기획과 제품 UI/UX 작업에도 참여했습니다.',
      en: 'Hired for marketing, I learned social media marketing and data analysis while also contributing to website planning and product UI/UX.',
    },
    members: 900,
    responsibilities: [],
    contributions: [
      {
        title: { ko: 'SNS 마케팅·데이터 분석', en: 'Social media marketing · Data analysis' },
        description: {
          ko: '마케팅 담당자로 일하며 SNS 마케팅과 데이터 분석을 익혔습니다.',
          en: 'As a marketing associate, I learned social media marketing and data analysis.',
        },
        specialty: 'marketing',
      },
      {
        title: { ko: '놀리 AI (Knowly)', en: 'Knowly AI' },
        description: { ko: '놀리 AI 제작 과정에 일부 참여했습니다.', en: 'Contributed to part of the Knowly AI creation process.' },
        productSummary: {
          ko: '의료 현장 종사자와 진로 준비생을 위한 의료 AI 지식 파트너로 소개됩니다.',
          en: 'Presented as a medical AI knowledge partner for healthcare professionals and people preparing for healthcare careers.',
        },
        href: 'https://knowly.im/',
      },
      {
        title: { ko: 'LUXERET 사이트 구성 기획', en: 'LUXERET website planning' },
        description: {
          ko: '사이트 디자인과 구성을 기획하고, 푸터의 SNS 링크 배치 등을 정리했습니다.',
          en: 'Planned the site design and layout, including the placement of social links in the footer.',
        },
        specialty: 'design',
        href: 'https://luxeret.com/',
      },
      {
        title: { ko: '리턴 제품 UI/UX', en: 'Return product UI/UX' },
        description: {
          ko: '리턴이라는 회사의 제품 개발에 UI/UX로 참여했습니다.',
          en: 'Contributed to UI/UX for a product developed by a company called Return.',
        },
        specialty: 'design',
        productSummary: {
          ko: '윈도우 PC 관리와 원클릭 최적화를 제공하는 제품입니다.',
          en: 'A Windows PC product for system management and one-click optimization.',
        },
        href: 'https://returns.luxeret.com/',
      },
    ],
    areasHeading: { ko: '업무·참여 분야', en: 'Work and contribution areas' },
    areas: [
      { ko: 'SNS 마케팅', en: 'Social media marketing' },
      { ko: '데이터 분석', en: 'Data analysis' },
      { ko: '사이트 구성 기획', en: 'Website planning' },
      { ko: '제품 UI/UX', en: 'Product UI/UX' },
    ],
    status: 'former',
    statusText: { ko: '전 직장', en: 'Former workplace' },
  },
  {
    slug: 'freelance-design',
    group: 'freelance',
    title: { ko: '프리랜서 디자인', en: 'Freelance design' },
    role: { ko: '디자인 작업', en: 'Design work' },
    summary: {
      ko: '디자인을 취미로 시작해 프리랜서 작업으로 이어가고 있습니다.',
      en: 'I started designing as a personal interest and have taken on freelance projects.',
    },
    responsibilities: [
      { ko: '디자인을 바탕으로 한 프리랜서 작업', en: 'Freelance work in design' },
    ],
    areas: [{ ko: '디자인 작업', en: 'Design work' }],
    status: 'current',
    statusText: { ko: '프리랜서 활동', en: 'Freelance practice' },
  },
  {
    slug: 'business-operations',
    group: 'business',
    title: { ko: '사업 운영', en: 'Business operations' },
    role: { ko: '기획 · 운영 · 팀 리딩', en: 'Planning · operations · team leadership' },
    summary: {
      ko: 'RoFolder, Limited, 로블갤러리를 기획·운영했습니다. 세 사업을 다른 사람에게 넘기고 운영에서 물러났습니다.',
      en: 'I planned and operated RoFolder, Limited, and Roblox Gallery, then handed all three to new operators and stepped away.',
    },
    responsibilities: [
      { ko: '사업 기획과 운영', en: 'Business planning and operations' },
      { ko: '팀 리딩', en: 'Team leadership' },
      { ko: '세 사업을 인계하고 운영에서 물러남', en: 'Handed over all three businesses and stepped away from operations' },
    ],
    areas: [
      { ko: '서비스 기획', en: 'Service planning' },
      { ko: '커뮤니티 운영', en: 'Community operations' },
      { ko: '팀 리딩', en: 'Team leadership' },
    ],
    status: 'former',
    statusText: { ko: '양도 후 운영에서 물러남', en: 'Handed over; stepped away' },
    ventures: [
      {
        name: 'RoFolder',
        logo: '/assets/rofolder-logo.png',
        field: { ko: '서버 찾기 플랫폼', en: 'Server discovery platform' },
        summary: { ko: '관심 있는 서버를 찾아볼 수 있는 플랫폼을 운영했습니다.', en: 'Operated a platform for discovering communities and servers.' },
        members: 800,
        statusText: { ko: '인계 후 운영에서 물러남', en: 'Handed over; stepped away' },
        status: 'former',
      },
      {
        name: 'Limited',
        logo: '/assets/limited-logo.png',
        field: { ko: '모델링 · UI/UX 주문 제작 서버', en: 'Custom modeling · UI/UX commission server' },
        summary: { ko: '모델링과 UI/UX 작업을 의뢰받아 제작하는 커뮤니티를 운영했습니다.', en: 'Operated a community for custom modeling and UI/UX commissions.' },
        members: 700,
        statusText: { ko: '인계 후 운영에서 물러남', en: 'Handed over; stepped away' },
        status: 'former',
      },
      {
        name: '로블갤러리',
        logo: '/assets/roblox-gallery-logo.png',
        field: { ko: '로블록스 에셋 무료 배포 서버', en: 'Free Roblox asset distribution server' },
        summary: { ko: '로블록스 이용자가 만든 에셋을 무료로 배포하는 서버를 운영했습니다.', en: 'Operated a server that freely distributed assets made by Roblox users.' },
        members: 800,
        statusText: { ko: '양도 후 운영에서 물러남', en: 'Handed over; stepped away' },
        status: 'former',
      },
    ],
  },
  {
    slug: 'function-factory',
    group: 'club',
    title: { ko: '동아리', en: 'Club' },
    organization: { ko: 'F(x) Factory', en: 'F(x) Factory' },
    role: { ko: '학교 IT 동아리 운영', en: 'School IT club operations' },
    summary: {
      ko: '학교 IT 동아리 F(x) Factory를 운영하고 있습니다.',
      en: 'I operate F(x) Factory, a school IT club.',
    },
    responsibilities: [
      { ko: 'F(x) Factory 운영', en: 'Operating F(x) Factory' },
    ],
    areas: [
      { ko: 'IT 동아리 운영', en: 'IT club operations' },
      { ko: '팀 리딩', en: 'Team leadership' },
    ],
    status: 'current',
    statusText: { ko: '운영 중', en: 'Operating' },
  },
];

export function filterCompanyContributions(
  contributions: readonly CareerContribution[],
  specialty: CompanyWorkSpecialtyFilter,
): CareerContribution[] {
  return specialty === 'all'
    ? [...contributions]
    : contributions.filter((contribution) => contribution.specialty === specialty);
}

export function filterCareerEntries(group: CareerGroupId | 'all', specialty?: CareerEntry['specialty']): CareerEntry[] {
  if (group === 'all') return careerEntries;
  return careerEntries.filter((entry) => entry.group === group && (!specialty || entry.specialty === specialty));
}

export function filterWorks(category: WorkCategory | 'all', query: string): SelectedWork[] {
  const search = query.trim().toLocaleLowerCase();
  return selectedWorks.filter((work) => (category === 'all' || work.category === category) &&
    [work.title, work.eyebrow, work.headline.ko, work.headline.en, work.summary.ko, work.summary.en, work.roles.ko, work.roles.en].join(' ').toLocaleLowerCase().includes(search));
}
