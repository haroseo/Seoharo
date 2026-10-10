import type { Locale } from './portfolioContent.ts';
import { careerEntries, selectedWorks } from './portfolioContent.ts';
import { SITE_NAME, SEARCH_SITE_NAME, SEARCH_SITE_ALIASES, getSitePageTitle } from './siteIdentity.ts';
import { resolvePublicPage } from './publicPages.ts';
import { SITE_ORIGIN, normalizeAppPath, toCanonicalUrl } from './siteUrl.ts';
import { sharingGreeting, sharingIntroduction } from './sharingIntroduction.ts';

export type PageMetadata = {
  language: Locale; title: string; description: string;
  socialTitle: string; socialDescription: string; imageAlt: string;
  robots: 'index, follow' | 'noindex, follow'; canonicalUrl: string | null;
  imageUrl: string; imageWidth: number; imageHeight: number;
  structuredData: Record<string, unknown>;
};

export function getPageMetadata(pathname: string, language: Locale): PageMetadata {
  const page = resolvePublicPage(pathname);
  const path = normalizeAppPath(page?.canonicalPath ?? pathname) ?? '/404';
  const project = selectedWorks.find(work => path === `/portfolio/${work.slug}`);
  const career = careerEntries.find(entry => path === (entry.slug === 'company-work' ? '/portfolio/company-work' : `/career/${entry.slug}`));
  const isAbout = path === '/';
  const description = project?.summary[language] ?? career?.summary[language] ?? (language === 'ko' ? {
    '/': 'Seoharo라는 이름으로 활동해 온 서주원입니다. 브랜드 디자인·마케팅·웹 개발을 통해 생각을 직접 만들고, 기획과 글로 협업의 방향을 정리합니다.',
    '/portfolio': '서주원의 프로필과 경력, 디자인·마케팅·개발 프로젝트를 한곳에서 확인합니다. 진행 중인 작업과 각 작업의 역할·배운 점을 구분합니다.',
    '/contact': '서주원에게 프로젝트와 협업을 제안하는 연락 페이지입니다. Email, GitHub, LinkedIn으로 연결됩니다.',
    '/career': '회사 업무, 프리랜서 디자인, 사업 운영, 동아리 활동에서 서주원이 맡았던 역할과 배운 점을 분야별로 확인합니다.',
  } : {
    '/': 'Seo Juwon, also known as Seoharo. I turn ideas into brand design, marketing and web projects, and clarify collaboration through planning and writing.',
    '/portfolio': 'Explore Seo Juwon’s profile, career and design, marketing and development projects, including ongoing work and individual contributions.',
    '/contact': 'Contact Seo Juwon about projects and collaboration through Email, GitHub or LinkedIn.',
    '/career': 'Explore Seo Juwon’s roles and learning across company work, freelance design, business operations and club activities.',
  })[path] ?? (language === 'ko' ? '요청한 페이지를 찾을 수 없습니다.' : 'The requested page could not be found.');
  const title = !page ? `${language === 'ko' ? '페이지를 찾을 수 없습니다.' : 'Page not found.'} | ${SITE_NAME}`
    : project ? `${project.title} | ${SITE_NAME}`
    : career ? `${career.title[language]} | ${SITE_NAME}` : getSitePageTitle(path, language);
  const canonicalUrl = page ? toCanonicalUrl(page.canonicalPath) : null;
  const personName = language === 'ko' ? '서주원' : 'Seo Juwon';
  const socialTitle = isAbout && language === 'ko' ? sharingGreeting.ko
    : isAbout || path === '/portfolio'
    ? (language === 'ko' ? '서주원 | 생각을 시도하고 현실로 만듭니다' : 'Seo Juwon | I try ideas. Then make them real.')
    : project ? `${project.title} | ${personName}`
    : career ? `${career.title[language]} | ${personName}`
    : `${title.split(' | ')[0]} | ${personName}`;
  const socialDescription = isAbout
    ? (language === 'ko' ? sharingIntroduction.ko.join('\n\n') : 'From planning to design and prototypes. Explore the ideas, decisions and process behind my projects.')
    : path === '/portfolio'
      ? (language === 'ko' ? '작업 화면과 맡은 역할, 배운 점을 한곳에 정리했습니다.' : 'Explore Designgraphy, 1 to Z and web projects through real screens, individual roles and lessons learned.')
      : description;
  const graph: Record<string, unknown>[] = [{ '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, name: SEARCH_SITE_NAME, alternateName: [...SEARCH_SITE_ALIASES], url: `${SITE_ORIGIN}/` }];
  if (page) {
    graph.push({ '@type': isAbout ? 'ProfilePage' : 'WebPage', '@id': canonicalUrl + '#page', url: canonicalUrl, name: title, description, inLanguage: language,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` }, ...(isAbout ? { mainEntity: { '@id': `${SITE_ORIGIN}/#person` } } : {}) });
    if (isAbout) graph.push({ '@type': 'Person', '@id': `${SITE_ORIGIN}/#person`, name: '서주원', alternateName: 'Seoharo', url: `${SITE_ORIGIN}/`, sameAs: ['https://github.com/haroseo', 'https://www.linkedin.com/in/seoharo/'] });
    else {
      const crumbs = [{ name: language === 'ko' ? '소개' : 'About', url: `${SITE_ORIGIN}/` }];
      if (project || career) crumbs.push({ name: language === 'ko' ? '포트폴리오' : 'Portfolio', url: `${SITE_ORIGIN}/portfolio/` });
      crumbs.push({ name: project?.title ?? career?.title[language] ?? title.split(' | ')[0], url: canonicalUrl! });
      graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url })) });
    }
  }
  return { language, title, description, socialTitle, socialDescription,
    imageAlt: language === 'ko' ? '서주원·Seoharo 이름과 개인 로고, 생각을 시도하고 현실로 만든다는 소개가 담긴 카드' : 'Seo Juwon · Seoharo, personal logo and the introduction: I try ideas. Then make them real.',
    robots: page ? 'index, follow' : 'noindex, follow', canonicalUrl,
    imageUrl: `${SITE_ORIGIN}/assets/share/seoharo-${language}-v1.png`, imageWidth: 1200, imageHeight: 630, structuredData: { '@context': 'https://schema.org', '@graph': graph } };
}
