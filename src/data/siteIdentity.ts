export const SITE_NAME = '서주원 | Brand Designer • Marketer • Developer';

// Search-result source labels are distinct from the unchanged page/tab titles.
export const SEARCH_SITE_NAME = '서주원';
export const SEARCH_SITE_ALIASES = ['Seoharo', 'seoharo.kro.kr'] as const;

const pageLabels = {
  ko: {
    '/about': '소개',
    '/portfolio': '포트폴리오',
    '/design': '디자인',
    '/marketing': '마케팅',
    '/development': '개발',
    '/operations': '사업 운영',
    '/clubs': '동아리',
    '/contact': '연락',
    '/career': '경력',
  },
  en: {
    '/about': 'About',
    '/portfolio': 'Portfolio',
    '/design': 'Design',
    '/marketing': 'Marketing',
    '/development': 'Development',
    '/operations': 'Business operations',
    '/clubs': 'Clubs',
    '/contact': 'Contact',
    '/career': 'Career',
  },
} as const;

export function getSitePageTitle(path: string, language: 'ko' | 'en'): string {
  if (path === '/') return SITE_NAME;
  const label = pageLabels[language][path as keyof typeof pageLabels.ko];
  return label ? `${label} | ${SITE_NAME}` : SITE_NAME;
}
