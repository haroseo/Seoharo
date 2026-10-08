import { visiblePortfolioItems } from './siteRevision.ts';
import { selectedWorks, type WorkCategory } from './portfolioContent.ts';

export type ProfileLanguage = 'ko' | 'en';
export type ProfileCategory = 'brand' | 'marketing' | 'development' | 'operations' | 'club';
export type ProfileCategoryFilter = ProfileCategory | 'all';
export type ProjectStatusFilter = 'all' | 'ongoing';

export const profileCategoryTabs = [
  { category: 'all', path: '/portfolio', label: { ko: '프로젝트', en: 'Projects' } },
  { category: 'brand', path: '/design', label: { ko: '디자인', en: 'Design' } },
  { category: 'marketing', path: '/marketing', label: { ko: '마케팅', en: 'Marketing' } },
  { category: 'development', path: '/development', label: { ko: '개발', en: 'Development' } },
  { category: 'operations', path: '/operations', label: { ko: '사업 운영', en: 'Business' } },
  { category: 'club', path: '/clubs', label: { ko: '동아리', en: 'Clubs' } },
] as const;

export interface LocalizedText {
  ko: string;
  en: string;
}

export interface ProfilePortfolioItem {
  id: string;
  kind: 'experience' | 'project';
  category: ProfileCategory;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  tags: LocalizedText[];
  logo?: string;
  image?: string;
  imageAlt?: LocalizedText;
  imagePresentation?: 'screen';
  href?: string;
  detailHref?: string;
  status?: LocalizedText;
  projectStatus?: 'ongoing';
}

const profileCategoryByWorkCategory: Record<WorkCategory, ProfileCategory> = {
  design: 'brand',
  development: 'development',
  planning: 'development',
  operations: 'operations',
};

const categoryLabelByWorkCategory: Record<WorkCategory, LocalizedText> = {
  design: { ko: '디자인', en: 'Design' },
  development: { ko: '개발', en: 'Development' },
  planning: { ko: '기획', en: 'Planning' },
  operations: { ko: '사업 운영', en: 'Business operations' },
};

const selectedWorkProfileItems: ProfilePortfolioItem[] = selectedWorks.map((work) => ({
  id: work.slug,
  kind: 'project',
  category: profileCategoryByWorkCategory[work.category],
  title: { ko: work.title, en: work.title },
  subtitle: work.roles,
  description: work.summary,
  tags: [categoryLabelByWorkCategory[work.category], work.output],
  image: work.image,
  imageAlt: work.imageAlt,
  imagePresentation: work.imagePresentation,
  href: work.href,
  detailHref: `/portfolio/${work.slug}`,
  status: work.projectStatus === 'ongoing'
    ? { ko: '진행 중', en: 'Ongoing' }
    : work.status === 'prototype'
      ? { ko: '프로토타입', en: 'Prototype' }
      : { ko: '프로젝트', en: 'Project' },
  projectStatus: work.projectStatus,
}));

export const profilePortfolioItems: ProfilePortfolioItem[] = [
  {
    id: 'company-work',
    kind: 'experience',
    category: 'marketing',
    title: { ko: 'LUXERET', en: 'LUXERET' },
    logo: '/assets/luxeret-logo.png',
    subtitle: { ko: '마케팅 담당자', en: 'Marketing associate' },
    description: {
      ko: 'SNS 마케팅과 데이터 분석을 배웠고, 놀리AI 제작 일부와 사이트 구성 기획, 리턴 제품 UI/UX에도 참여했습니다.',
      en: 'Learned social media marketing and data analysis; also contributed to Nolli AI, website planning, and UI/UX for a Return product.',
    },
    tags: [{ ko: 'SNS 마케팅', en: 'Social media marketing' }, { ko: '데이터 분석', en: 'Data analysis' }],
    status: { ko: '업무 경험', en: 'Work experience' },
    href: '/portfolio/company-work',
  },
  {
    id: 'freelance-design',
    kind: 'experience',
    category: 'brand',
    title: { ko: '프리랜서 디자인', en: 'Freelance design' },
    subtitle: { ko: '취미에서 프리랜서 작업으로', en: 'From personal interest to freelance work' },
    description: {
      ko: '디자인을 취미로 시작해 프리랜서 작업으로 이어가고 있습니다.',
      en: 'I started designing as a personal interest and have taken on freelance projects.',
    },
    tags: [{ ko: '디자인', en: 'Design' }],
    status: { ko: '진행 경험', en: 'Freelance experience' },
  },
  {
    id: 'rofolder',
    kind: 'experience',
    category: 'operations',
    title: { ko: 'RoFolder', en: 'RoFolder' },
    logo: '/assets/rofolder-logo.png',
    subtitle: { ko: '서버 찾기 플랫폼', en: 'Server discovery platform' },
    description: {
      ko: '서버를 찾는 플랫폼을 운영했습니다. 운영 당시 800명 규모였으며, 이후 사업을 인계하고 물러났습니다.',
      en: 'Operated a server discovery platform that reached 800 members before handing over the business and stepping away.',
    },
    tags: [{ ko: '이전 사업', en: 'Former business' }, { ko: '플랫폼 운영', en: 'Platform operations' }],
    status: { ko: '양도 후 퇴임', en: 'Handed over · Former role' },
    href: '/career/business-operations',
  },
  {
    id: 'limited',
    kind: 'experience',
    category: 'operations',
    title: { ko: 'Limited', en: 'Limited' },
    logo: '/assets/limited-logo.png',
    subtitle: { ko: '모델링 · UI/UX 전문 주문 제작 서버', en: 'Custom modeling · UI/UX commission server' },
    description: {
      ko: '모델링과 UI/UX 주문 제작 서버를 운영했습니다. 운영 당시 700명 규모였으며, 이후 사업을 인계하고 물러났습니다.',
      en: 'Operated a custom modeling and UI/UX commission server that reached 700 members before handing it over and stepping away.',
    },
    tags: [{ ko: '이전 사업', en: 'Former business' }, { ko: '디자인', en: 'Design' }, { ko: '모델링', en: 'Modeling' }, { ko: 'UI/UX', en: 'UI/UX' }],
    status: { ko: '양도 후 퇴임', en: 'Handed over · Former role' },
    href: '/career/business-operations',
  },
  ...selectedWorkProfileItems,
  {
    id: 'cokform',
    kind: 'project',
    category: 'development',
    title: { ko: 'Cokform', en: 'Cokform' },
    logo: '/assets/cokform-logo.png',
    subtitle: { ko: '한국어 신청·접수 폼 만들기', en: 'A Korean sign-up and registration form builder' },
    description: {
      ko: '행사·교육·커뮤니티 신청 폼을 만들고 질문·동의·마감 조건을 설정할 수 있는 웹 서비스입니다.',
      en: 'A web service for creating event, education, and community forms with configurable questions, consent, and deadlines.',
    },
    tags: [{ ko: '신청 폼', en: 'Forms' }, { ko: '업무 도구', en: 'Productivity' }, { ko: '웹 서비스', en: 'Web service' }],
    href: 'https://cokform.pages.dev/',
    status: { ko: '사업 중단', en: 'Business stopped' },
  },
  {
    id: 'functionfactory',
    kind: 'experience',
    category: 'club',
    title: { ko: 'F(x) Factory', en: 'F(x) Factory' },
    subtitle: { ko: '학교 IT 동아리 운영', en: 'School IT club operations' },
    description: {
      ko: '학교 IT 동아리 F(x) Factory를 운영하고 있습니다.',
      en: 'I operate F(x) Factory, a school IT club.',
    },
    tags: [{ ko: 'IT 동아리', en: 'IT club' }, { ko: '운영', en: 'Operations' }],
    status: { ko: '운영 중', en: 'Ongoing' },
    href: '/career/function-factory',
  },
  {
    id: 'roblox-gallery',
    kind: 'experience',
    category: 'operations',
    title: { ko: '로블갤러리', en: 'Roblox Gallery' },
    logo: '/assets/roblox-gallery-logo.png',
    subtitle: { ko: '로블록스 유저 제작 에셋 무료 배포 서버', en: 'Free distribution server for user-made Roblox assets' },
    description: {
      ko: '로블록스 이용자가 만든 에셋을 무료로 배포하는 서버를 운영했습니다. 운영 당시 800명 규모였으며, 이전 운영 경험입니다.',
      en: 'Operated a server freely distributing assets made by Roblox users. It reached 800 members; this is a past role.',
    },
    tags: [{ ko: '이전 사업', en: 'Former business' }, { ko: '커뮤니티 운영', en: 'Community operations' }],
    status: { ko: '양도 후 운영에서 물러남', en: 'Handed over; stepped away' },
    href: '/career/business-operations',
  },
];

export function filterProfilePortfolioItems(
  category: ProfileCategoryFilter = 'all',
  query = '',
  activeTag: string | null = null,
): ProfilePortfolioItem[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const normalizedTag = activeTag?.toLocaleLowerCase();

  return visiblePortfolioItems(profilePortfolioItems).filter((item) => {
    if (category !== 'all' && item.category !== category) return false;
    if (normalizedTag && !item.tags.some((tag) => [tag.ko, tag.en].some((value) => value.toLocaleLowerCase() === normalizedTag))) return false;

    const copy = [item.title, item.subtitle, item.description, ...(item.status ? [item.status] : []), ...item.tags];
    const searchableText = copy.flatMap((text) => [text.ko, text.en]).join(' ').toLocaleLowerCase();
    return searchableText.includes(normalizedQuery);
  });
}

export function getProfilePortfolioDisplayItems(
  category: ProfileCategoryFilter = 'all',
  query = '',
  activeTag: string | null = null,
): ProfilePortfolioItem[] {
  const items = filterProfilePortfolioItems(category, query, activeTag);
  return category === 'all' ? items.filter((item) => item.kind === 'project') : items;
}

export function filterProjectStatus<T extends Pick<ProfilePortfolioItem, 'kind' | 'projectStatus'>>(
  items: readonly T[],
  status: ProjectStatusFilter,
): T[] {
  const projects = items.filter((item) => item.kind === 'project');
  return status === 'ongoing' ? projects.filter((item) => item.projectStatus === 'ongoing') : projects;
}
