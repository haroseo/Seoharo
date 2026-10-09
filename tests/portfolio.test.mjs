import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { selectedWorks, archiveWorks, filterWorks, experiences, profile } from '../src/data/portfolioContent.ts';
import { getPortfolioRoute, getPrimaryNavigationPath, resolveRedirectPath } from '../src/data/portfolioRoutes.ts';
import { hiddenPortfolioIds, visiblePortfolioItems } from '../src/data/siteRevision.ts';
import { getSitePageTitle, SITE_NAME } from '../src/data/siteIdentity.ts';
import { filterProfilePortfolioItems, profileCategoryTabs, profilePortfolioItems } from '../src/data/profilePortfolio.ts';
import * as profilePortfolioModule from '../src/data/profilePortfolio.ts';
import * as portfolioContent from '../src/data/portfolioContent.ts';
import * as portfolioRoutes from '../src/data/portfolioRoutes.ts';
import { getPageMetadata } from '../src/data/siteSeo.ts';
import { renderHead } from '../scripts/seo-html.mjs';

test('selected work has unique valid routes and bilingual content', () => {
  assert.equal(new Set(selectedWorks.map(work => work.slug)).size, selectedWorks.length);
  for (const work of selectedWorks) {
    assert.match(work.slug, /^[a-z0-9-]+$/);
    assert.deepEqual(getPortfolioRoute(`/portfolio/${work.slug}`), { page: 'project', slug: work.slug });
    for (const field of ['headline', 'summary', 'roles', 'output']) {
      assert.ok(work[field].ko.trim()); assert.ok(work[field].en.trim());
    }
    assert.ok(work.notes.length > 0);
    for (const note of work.notes) for (const language of ['ko', 'en']) {
      assert.ok(note.title[language].trim()); assert.ok(note.body[language].trim());
    }
  }
});
test('filters combine category and case-insensitive, trimmed bilingual search', () => {
  assert.equal(filterWorks('all', '').length, selectedWorks.length);
  assert.deepEqual(filterWorks('planning', '  PLANOR  ').map(work => work.slug), ['planor']);
  assert.equal(filterWorks('design', 'Planor').length, 0);
  assert.deepEqual(filterWorks('all', '디자인그래피').map(work => work.slug), ['designgraphy']);
  assert.equal(filterWorks('all', 'no-such-work').length, 0);
});
test('work view keeps employment and clubs inside their selected categories', () => {
  assert.deepEqual(profilePortfolioModule.getProfilePortfolioDisplayItems('all').map(item => item.id), ['designgraphy', 'one-to-z', 'planor', 'design-pick', 'naratmalsami', 'cokform']);
  assert.deepEqual(profilePortfolioModule.getProfilePortfolioDisplayItems('marketing').map(item => item.id), ['company-work']);
  assert.deepEqual(profilePortfolioModule.getProfilePortfolioDisplayItems('club').map(item => item.id), ['functionfactory']);
});
test('legacy field links, trailing slash, and missing routes resolve correctly', () => {
  assert.deepEqual(getPortfolioRoute('/'), { page: 'about' });
  assert.deepEqual(getPortfolioRoute('/portfolio/'), { page: 'work', category: 'all' });
  assert.deepEqual(getPortfolioRoute('/design'), { page: 'work', category: 'design' });
  assert.deepEqual(getPortfolioRoute('/development'), { page: 'work', category: 'development' });
  assert.deepEqual(getPortfolioRoute('/marketing'), { page: 'work', category: 'planning' });
  assert.deepEqual(getPortfolioRoute('/operations'), { page: 'work', category: 'operations' });
  assert.deepEqual(getPortfolioRoute('/clubs'), { page: 'work', category: 'club' });
  assert.deepEqual(getPortfolioRoute('/about'), { page: 'about' });
  assert.deepEqual(getPortfolioRoute('/contact'), { page: 'contact' });
  assert.deepEqual(getPortfolioRoute('/career'), { page: 'career' });
  assert.deepEqual(getPortfolioRoute('/career/group/club'), { page: 'career', group: 'club' });
  assert.deepEqual(getPortfolioRoute('/career/company-work'), { page: 'career-detail', slug: 'company-work' });
  assert.deepEqual(getPortfolioRoute('/career/business-operations'), { page: 'career-detail', slug: 'business-operations' });
  assert.deepEqual(getPortfolioRoute('/portfolio/company-work'), { page: 'career-detail', slug: 'company-work' });
  assert.deepEqual(getPortfolioRoute('/portfolio/typolab'), { page: 'project', slug: 'naratmalsami' });
  assert.deepEqual(getPortfolioRoute('/portfolio/naratmalsami'), { page: 'project', slug: 'naratmalsami' });
  assert.deepEqual(getPortfolioRoute('/not-a-route'), { page: 'missing' });
  assert.deepEqual(getPortfolioRoute('/portfolio/too/deep'), { page: 'missing' });
});
test('sitemapped project details render a case page and unknown project slugs render a noindex fallback', () => {
  const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  assert.match(app, /ProjectDetail/);
  assert.match(app, /route\.page === 'project'/);
  assert.match(app, /project && <ProjectDetail/);
  assert.equal(getPageMetadata('/portfolio/not-real', 'ko').robots, 'noindex, follow');
  for (const work of selectedWorks) assert.ok(sitemap.includes(`/portfolio/${work.slug}`), `${work.slug} should be indexed`);
  for (const entry of portfolioContent.careerEntries) assert.ok(sitemap.includes(entry.slug === 'company-work' ? '/portfolio/company-work/' : `/career/${entry.slug}/`));
  assert.doesNotMatch(sitemap, /\/career\/group\//);
});
test('page redirect preserves local search/hash and rejects off-site paths', () => {
  const origin = 'https://seoharo.kro.kr';
  assert.equal(resolveRedirectPath('/portfolio/planor?view=work#notes', origin), '/portfolio/planor?view=work#notes');
  for (const value of [null, '', '//example.com', '/\\example.com', 'https://example.com', 'javascript:alert(1)']) {
    assert.equal(resolveRedirectPath(value, origin), null);
  }
});
test('public links use https and no placeholder addresses', () => {
  for (const work of [...selectedWorks, ...archiveWorks]) for (const url of [work.href, work.github].filter(Boolean)) {
    assert.equal(new URL(url).protocol, 'https:'); assert.ok(!url.includes('username'));
  }
  assert.doesNotMatch(JSON.stringify(profile), /mailto:|linkedin|github\.com|@[\w.-]+\.[a-z]{2,}/i);
  assert.ok(!Object.values(profile).some(value => /discord/i.test(value)));
});
test('former businesses are not presented as active', () => {
  for (const name of ['RoFolder', 'Limited', '로블갤러리']) {
    const experience = experiences.find(item => item.organization.includes(name));
    assert.ok(experience); assert.match(experience.status.ko, /양도|인계|퇴임|종료|중단|이전 운영/);
  }
});

test('career details include only verified experience and handed-over ventures', () => {
  assert.ok(Array.isArray(portfolioContent.careerEntries), 'career detail data should be available');
  const entries = portfolioContent.careerEntries;
  assert.deepEqual(entries.map(entry => entry.slug), ['company-work', 'freelance-design', 'business-operations', 'function-factory']);
  assert.deepEqual(portfolioContent.careerGroups.map(group => [group.id, group.label.ko]), [
    ['company', '회사 업무'],
    ['freelance', '프리랜서 디자인'],
    ['business', '사업 운영'],
    ['club', '동아리'],
  ]);
  assert.deepEqual(portfolioContent.filterCareerEntries('all').map(entry => entry.slug), ['company-work', 'freelance-design', 'business-operations', 'function-factory']);
  assert.deepEqual(portfolioContent.filterCareerEntries('company').map(entry => entry.slug), ['company-work'], 'company roles should be visible without an extra specialty click');
  assert.deepEqual(portfolioContent.filterCareerEntries('company', 'marketing').map(entry => entry.slug), ['company-work']);
  assert.deepEqual(portfolioContent.filterCareerEntries('club').map(entry => entry.slug), ['function-factory']);
  assert.deepEqual(portfolioContent.filterCareerEntries('freelance').map(entry => entry.slug), ['freelance-design']);
  assert.deepEqual(portfolioContent.filterCareerEntries('business').map(entry => entry.slug), ['business-operations']);
  for (const entry of entries) {
    for (const field of ['title', 'role', 'summary']) {
      assert.ok(entry[field].ko.trim(), `${entry.slug} ${field} should have Korean copy`);
      assert.ok(entry[field].en.trim(), `${entry.slug} ${field} should have English copy`);
    }
  }
  const company = entries.find(entry => entry.slug === 'company-work');
  assert.equal(company.title.ko, '회사 업무');
  assert.equal(company.organization.ko, 'LUXERET');
  assert.equal(company.group, 'company');
  assert.equal(company.specialty, 'marketing');
  assert.equal(company.role.ko, '마케팅 담당자');
  assert.equal(company.logo, undefined);
  assert.equal(company.members, 900);
  assert.equal(company.statusText.ko, '전 직장');
  assert.deepEqual(company.areas.map(area => area.ko), ['SNS 마케팅', '데이터 분석', '사이트 구성 기획', '제품 UI/UX']);
  assert.deepEqual(company.contributions.map(item => [item.title.ko, item.href]), [
    ['SNS 마케팅·데이터 분석', undefined],
    ['놀리 AI (Knowly)', 'https://knowly.im/'],
    ['LUXERET 사이트 구성 기획', 'https://luxeret.com/'],
    ['리턴 제품 UI/UX', 'https://returns.luxeret.com/'],
  ]);
  assert.match(company.contributions[1].description.ko, /일부 참여/);
  assert.match(company.contributions[1].productSummary.ko, /의료.*AI.*지식 파트너/);
  assert.match(company.contributions[2].description.ko, /푸터.*SNS 링크/);
  assert.match(company.contributions[3].description.ko, /제품 개발.*UI\/UX/);
  assert.match(company.contributions[3].productSummary.ko, /윈도우 PC.*최적화/);
  assert.ok(company.contributions.filter(item => item.href).every(item => new URL(item.href).protocol === 'https:'));
  assert.doesNotMatch(JSON.stringify(company), /성과|매출|전환율/);
  const club = entries.find(entry => entry.slug === 'function-factory');
  assert.equal(club.group, 'club');
  assert.equal(club.title.ko, '동아리');
  assert.equal(club.organization.ko, 'F(x) Factory');
  assert.equal(club.statusText.ko, '운영 중');
  assert.equal(entries.find(entry => entry.slug === 'freelance-design').statusText.ko, '프리랜서 활동');
  assert.equal(entries.find(entry => entry.slug === 'business-operations').statusText.ko, '양도 후 운영에서 물러남');
  assert.match(club.summary.ko, /IT 동아리/);
  const ventures = entries.find(entry => entry.slug === 'business-operations').ventures;
  assert.deepEqual(ventures.map(venture => [venture.name, venture.members]), [['RoFolder', 800], ['Limited', 700], ['로블갤러리', 800]]);
  assert.ok(ventures.every(venture => /양도|인계/.test(venture.statusText.ko)));
  assert.deepEqual(ventures.map(venture => venture.logo), ['/assets/rofolder-logo.png', '/assets/limited-logo.png', '/assets/roblox-gallery-logo.png']);
  assert.ok(ventures.every(venture => venture.status === 'former'));
  assert.match(ventures[0].summary.ko, /서버.*플랫폼/);
  assert.match(ventures[1].summary.ko, /모델링.*UI\/UX/);
  assert.match(ventures[2].summary.ko, /로블록스.*에셋.*무료로 배포/);
  const clubItem = profilePortfolioItems.find(item => item.id === 'functionfactory');
  assert.equal(clubItem.kind, 'experience');
  assert.equal(clubItem.category, 'club');
  assert.equal(clubItem.title.ko, 'F(x) Factory');
  assert.equal(clubItem.status.ko, '운영 중');
  assert.equal(profilePortfolioItems.find(item => item.id === 'roblox-gallery').status.ko, '양도 후 운영에서 물러남');
  assert.deepEqual(filterProfilePortfolioItems('club').map(item => item.id), ['functionfactory']);
  assert.deepEqual(profileCategoryTabs.map(tab => [tab.path, tab.label.ko]), [
    ['/portfolio', '프로젝트'],
    ['/design', '디자인'],
    ['/marketing', '마케팅'],
    ['/development', '개발'],
    ['/operations', '사업 운영'],
    ['/clubs', '동아리'],
  ]);
  assert.equal(profilePortfolioItems.find(item => item.id === 'design-pick').kind, 'project');
  assert.equal(profilePortfolioItems.find(item => item.id === 'company-work').href, '/portfolio/company-work');
  assert.equal(profilePortfolioItems.find(item => item.id === 'rofolder').href, '/career/business-operations');
  assert.deepEqual(
    ['rofolder', 'roblox-gallery', 'limited', 'company-work'].map(id => profilePortfolioItems.find(item => item.id === id).logo),
    ['/assets/rofolder-logo.png', '/assets/roblox-gallery-logo.png', '/assets/limited-logo.png', '/assets/luxeret-logo.png'],
  );
  for (const file of ['rofolder-logo.png', 'roblox-gallery-logo.png', 'limited-logo.png', 'luxeret-logo.png']) {
    assert.equal(existsSync(new URL(`../public/assets/${file}`, import.meta.url)), true, `${file} should be served`);
  }
});

test('career categories are ordered for the four-row index', () => {
  assert.deepEqual(portfolioContent.careerEntries.map(entry => [entry.group, entry.title.ko]), [
    ['company', '회사 업무'],
    ['freelance', '프리랜서 디자인'],
    ['business', '사업 운영'],
    ['club', '동아리'],
  ]);
  assert.deepEqual(portfolioContent.careerEntries.map(entry => entry.statusText.ko), [
    '전 직장', '프리랜서 활동', '양도 후 운영에서 물러남', '운영 중',
  ]);
  assert.deepEqual(portfolioContent.careerEntries.map(entry => entry.organization?.ko ?? null), [
    'LUXERET', null, null, 'F(x) Factory',
  ]);
  assert.doesNotMatch(JSON.stringify(portfolioContent.careerEntries), /이전 역할/);
});

test('company contribution filters include only confirmed specialties', () => {
  const company = portfolioContent.careerEntries.find(entry => entry.slug === 'company-work');
  assert.equal(typeof portfolioContent.filterCompanyContributions, 'function');
  assert.deepEqual(portfolioContent.companyWorkSpecialties.map(item => item.id), ['marketing', 'development', 'design']);
  const filter = portfolioContent.filterCompanyContributions;
  assert.deepEqual(filter(company.contributions, 'all').map(item => item.title.ko), [
    'SNS 마케팅·데이터 분석', '놀리 AI (Knowly)', 'LUXERET 사이트 구성 기획', '리턴 제품 UI/UX',
  ]);
  assert.deepEqual(filter(company.contributions, 'marketing').map(item => item.title.ko), ['SNS 마케팅·데이터 분석']);
  assert.deepEqual(filter(company.contributions, 'design').map(item => item.title.ko), ['LUXERET 사이트 구성 기획', '리턴 제품 UI/UX']);
  assert.deepEqual(filter(company.contributions, 'development'), []);
  assert.equal(company.contributions.find(item => item.title.ko.includes('Knowly')).specialty, undefined);
});

test('ongoing project filter includes only explicitly ongoing project items', () => {
  const filter = profilePortfolioModule.filterProjectStatus;
  assert.equal(typeof filter, 'function');
  const items = [
    { id: 'active', kind: 'project', projectStatus: 'ongoing' },
    { id: 'unknown', kind: 'project' },
    { id: 'career', kind: 'experience', projectStatus: 'ongoing' },
  ];
  assert.deepEqual(filter(items, 'all').map(item => item.id), ['active', 'unknown']);
  assert.deepEqual(filter(items, 'ongoing').map(item => item.id), ['active']);
});

test('only Designgraphy is marked as an ongoing project', () => {
  const projects = profilePortfolioItems.filter(item => item.kind === 'project');
  assert.ok(projects.length > 0);
  assert.deepEqual(projects.filter(item => item.projectStatus === 'ongoing').map(item => item.id), ['designgraphy']);
  assert.equal(projects.find(item => item.id === 'designgraphy').status.ko, '진행 중');
});

test('requested project naming, covers, and supplied Cokform logo are applied', () => {
  const nara = selectedWorks.find(item => item.slug === 'naratmalsami');
  const planor = selectedWorks.find(item => item.slug === 'planor');
  assert.equal(nara?.title, '나랏말싸미');
  assert.equal(nara?.image, undefined, 'the Hangeul title cover should be rendered in Pretendard, not as an old image');
  assert.equal(planor?.image, undefined, 'the dated, fabricated calendar image should not be reused');
  assert.equal(profilePortfolioItems.find(item => item.id === 'cokform')?.logo, '/assets/cokform-logo.png');
  assert.ok(existsSync(new URL('../public/assets/cokform-logo.png', import.meta.url)));
  assert.match(readFileSync(new URL('../src/components/portfolio/ProjectCover.tsx', import.meta.url), 'utf8'), /나랏말싸미/);
});

test('career profile links open the relevant detail and keep the work tab active', () => {
  const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const homeContent = readFileSync(new URL('../src/components/HomeContent.tsx', import.meta.url), 'utf8');
  const careerPage = readFileSync(new URL('../src/components/CareerPage.tsx', import.meta.url), 'utf8');
  const workPage = readFileSync(new URL('../src/components/PortfolioPage.tsx', import.meta.url), 'utf8');
  const header = readFileSync(new URL('../src/components/Header.tsx', import.meta.url), 'utf8');
  assert.match(careerPage, /initialGroup\s*\?\s*careerEntries\.find/);
  assert.match(careerPage, /to=\{`\/career\/group\/\$\{entry\.group\}`\}/);
  assert.match(careerPage, /careerEntries\.map\(\(entry, index\)/);
  assert.match(careerPage, /visibleContributions\.map/);
  assert.match(careerPage, /companyWorkSpecialties/);
  assert.match(careerPage, /aria-pressed=\{activeSpecialty === specialty\.id\}/);
  assert.match(homeContent, /careerGroups\.map/);
  assert.match(homeContent, /`\/career\/group\/\$\{group\.id\}`/);
  assert.doesNotMatch(homeContent, /careerEntries\.map/);
  assert.match(careerPage, /venture\.members/);
  assert.match(careerPage, /venture\.statusText/);
  assert.match(careerPage, /entry\.logo/);
  assert.match(careerPage, /venture\.logo/);
  assert.match(careerPage, /entry\.contributions/);
  assert.match(careerPage, /contribution\.productSummary/);
  assert.match(careerPage, /contribution\.href/);
  assert.match(careerPage, /target="_blank"[\s\S]*?rel="noopener noreferrer"/);
  assert.match(workPage, /careerEntries\.map/);
  assert.match(workPage, /careerDetailPath\(entry\.slug\)/);
  assert.match(workPage, /venture\.members/);
  assert.match(workPage, /getProfilePortfolioDisplayItems\(selectedCategory, query, activeTag\)/);
  assert.match(workPage, /item\.detailHref/);
  assert.match(workPage, /profileCategoryTabs\.map/);
  const projectsSection = workPage.slice(workPage.indexOf('id="projects"'), workPage.indexOf('id="skills"'));
  assert.match(projectsSection, /aria-label=\{t\('프로젝트 분류'/);
  assert.match(workPage, /id="experience"/);
  assert.match(workPage, /to="\/career"[\s\S]*?전체 보기/);
  assert.match(header, /getPrimaryNavigationPath\(currentPath\)/);
  const companyMetadata = getPageMetadata('/portfolio/company-work', 'ko');
  assert.equal(companyMetadata.title, '회사 업무 | 서주원 | Brand Designer • Marketer • Developer');
  assert.equal(companyMetadata.description, portfolioContent.careerEntries[0].summary.ko);
  assert.match(app, /const fromWorkTab = route\.page === 'career-detail' && route\.slug === 'company-work'/);
  assert.match(app, /fromWorkTab=\{fromWorkTab\}/);
  assert.equal(companyMetadata.socialTitle, '회사 업무 | 서주원');
  assert.ok(renderHead(companyMetadata).includes('property="og:title" content="회사 업무 | 서주원"'));
  assert.ok(renderHead(companyMetadata).includes('name="twitter:title" content="회사 업무 | 서주원"'));
  assert.equal(SITE_NAME, '서주원 | Brand Designer • Marketer • Developer');
  assert.equal(getSitePageTitle('/marketing', 'ko'), '마케팅 | 서주원 | Brand Designer • Marketer • Developer');
  assert.equal(getSitePageTitle('/operations', 'ko'), '사업 운영 | 서주원 | Brand Designer • Marketer • Developer');
  assert.equal(getSitePageTitle('/clubs', 'ko'), '동아리 | 서주원 | Brand Designer • Marketer • Developer');
});

test('career page index is directly reachable and lists the four categorized career details', () => {
  const careerPage = readFileSync(new URL('../src/components/CareerPage.tsx', import.meta.url), 'utf8');
  assert.match(careerPage, /careerEntries\.map\(\(entry, index\)/);
  assert.match(careerPage, /to=\{`\/career\/group\/\$\{entry\.group\}`\}/);
  assert.match(careerPage, /entry\.statusText\[language\]/);
  assert.match(careerPage, /padStart\(2, '0'\)/);
  assert.doesNotMatch(careerPage, /careerTabs\.map|visibleGroups\.map|이전 역할/);
  assert.deepEqual(getPortfolioRoute('/career'), { page: 'career' });
});

test('work page exposes an accessible ongoing filter and distinct empty state', () => {
  const workPage = readFileSync(new URL('../src/components/PortfolioPage.tsx', import.meta.url), 'utf8');
  assert.match(workPage, /filterProjectStatus\(projectItems, projectStatusFilter\)/);
  assert.match(workPage, /aria-pressed=\{projectStatusFilter === 'ongoing'\}/);
  assert.match(workPage, /role="status" aria-live="polite"[\s\S]*visibleProjectItems\.length/);
  assert.match(workPage, /t\('전체', 'All'\)/);
  assert.match(workPage, /진행 중/);
  assert.match(workPage, /진행 중으로 확인된 프로젝트가 없습니다/);
  assert.match(workPage, /조건에 맞는 진행 중 프로젝트가 없습니다/);
});

test('career group route opens the selected category detail', () => {
  const careerPage = readFileSync(new URL('../src/components/CareerPage.tsx', import.meta.url), 'utf8');
  assert.match(careerPage, /initialGroup[\s\S]*careerEntries\.find\(\(entry\) => entry\.group === initialGroup\)/);
  assert.match(careerPage, /const detailSlug = slug \?\? selectedGroupEntry\?\.slug/);
  assert.match(careerPage, /const entry = careerEntries\.find\(\(item\) => item\.slug === detailSlug\)/);
});

test('company work detail has accessible specialty filters and an honest empty state', () => {
  const careerPage = readFileSync(new URL('../src/components/CareerPage.tsx', import.meta.url), 'utf8');
  assert.match(careerPage, /filterCompanyContributions\(entry\.contributions, activeSpecialty\)/);
  assert.match(careerPage, /aria-pressed=\{activeSpecialty === specialty\.id\}/);
  assert.match(careerPage, /\.\.\.companyWorkSpecialties/);
  assert.match(careerPage, /개발 분야로 분류된 내용이 없습니다/);
  assert.match(careerPage, /entry\.organization\?\.\[language\]/);
  assert.match(careerPage, /entry\.statusText\[language\]/);
});

test('primary navigation has exactly three Korean-first destinations', () => {
  assert.ok(Array.isArray(portfolioRoutes.primaryNavigation), 'primary navigation should have a single source');
  assert.deepEqual(portfolioRoutes.primaryNavigation.map(item => item.path), ['/', '/portfolio', '/contact']);
  assert.deepEqual(portfolioRoutes.primaryNavigation.map(item => item.label.ko), ['소개', '포트폴리오', '연락']);
  assert.deepEqual(portfolioRoutes.primaryNavigation.map(item => item.label.en), ['About', 'Portfolio', 'Contact']);
  assert.deepEqual(getPortfolioRoute('/'), { page: 'about' });
  assert.deepEqual(getPortfolioRoute('/about'), { page: 'about' });
  assert.deepEqual(['/portfolio/planor', '/career/company-work', '/career/group/company', '/marketing', '/contact', '/unknown'].map(getPrimaryNavigationPath), [
    '/portfolio', '/portfolio', '/portfolio', '/portfolio', '/contact', null,
  ]);
});

test('header uses the personal logo lockup and highlights Portfolio on detail routes', () => {
  const header = readFileSync(new URL('../src/components/Header.tsx', import.meta.url), 'utf8');
  assert.match(header, /getPrimaryNavigationPath\(currentPath\)/);
  assert.match(header, /juwon-mark\.svg/);
  assert.match(header, /className="sj-header-mark/);
  assert.doesNotMatch(header, /bg-\[#eef1f6\]/);
  assert.match(header, /aria-current=\{active \? 'page' : undefined\}/);
});

test('the shared navigation keeps the same dark identity across every tab', () => {
  const header = readFileSync(new URL('../src/components/Header.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(header, /isAboutSurface/);
  assert.match(header, /bg-\[#090a0c\]\/95 text-white/);
  assert.match(header, /t\('서주원', 'Seo Juwon'\)/);
});

test('site motion has a reduced-motion fallback', () => {
  const styles = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
  const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const header = readFileSync(new URL('../src/components/Header.tsx', import.meta.url), 'utf8');
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(styles, /animation-duration:\s*\.01ms/);
  assert.match(app, /useReducedMotion\(\)/);
  assert.match(app, /AnimatePresence/);
  assert.match(app, /initial=\{!hydrated \|\| shouldReduceMotion \? false : \{ opacity: 0, x: 8 \}\}/);
  assert.match(app, /exit=\{shouldReduceMotion \? \{ opacity: 1, x: 0 \} : \{ opacity: 0, x: -8 \}\}/);
  assert.match(app, /duration: shouldReduceMotion \? 0 : 0\.22/);
  assert.match(header, /layoutId=\{shouldReduceMotion \? undefined : 'active-primary-navigation-indicator'\}/);
  assert.match(header, /aria-current=\{active \? 'page' : undefined\}/);
});

test('home introduction uses the approved identity and original two-column composition', () => {
  const hero = readFileSync(new URL('../src/components/Hero.tsx', import.meta.url), 'utf8');
  const styles = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
  assert.match(hero, /서주원/);
  assert.match(hero, /Brand Designer • Marketer • Developer/);
  assert.match(hero, /juwon-mark\.png/);
  assert.match(hero, /grid[^"]*lg:grid-cols/);
  assert.match(hero, /rounded-lg[^"]*bg-\[var\(--brand-accent\)\]/);
  assert.match(styles, /#hero h1[^}]*color:\s*#fff/i);
  assert.doesNotMatch(hero, /Creative entrepreneur|portfolio-mark\.jpg|중학생|student/i);
  assert.match(hero, /<Link\s+to="\/portfolio"/);
  assert.match(hero, /<Link\s+to="\/career"/);
});
test('home heading exposes only its visible name to assistive technology', () => {
  const hero = readFileSync(new URL('../src/components/Hero.tsx', import.meta.url), 'utf8');
  assert.match(hero, /<h1 id="hero-title" className=/);
  assert.doesNotMatch(hero, /aria-label=\{SITE_NAME\}/);
});
test('primary and footer route navigation are links and the page has a skip link', () => {
  const header = readFileSync(new URL('../src/components/Header.tsx', import.meta.url), 'utf8');
  const footer = readFileSync(new URL('../src/components/Footer.tsx', import.meta.url), 'utf8');
  assert.match(header, /href="#main-content"/);
  assert.match(header, /<Link[\s\S]*?to=\{item\.path\}/);
  assert.match(header, /<SiteSearchDialog open=\{isSearchOpen\}/);
  assert.match(header, /aria-controls=\{isSearchOpen \? 'site-search-dialog' : undefined\}/);
  assert.match(footer, /<Link[\s\S]*?to=\{link\.path\}/);
  assert.doesNotMatch(header, /<button[\s\S]*?onClick=\{\(\) => handleNavClick\(item\.path\)\}/);
});

test('global search control and dialog are mounted in the persistent shared header', () => {
  const header = readFileSync(new URL('../src/components/Header.tsx', import.meta.url), 'utf8');
  const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  assert.match(app, /<Header\s*\/>/);
  assert.match(header, /aria-label=\{isSearchOpen \? t\('검색 닫기', 'Close search'\) : t\('사이트 검색', 'Search this site'\)\}/);
  assert.match(header, /<SiteSearchDialog open=\{isSearchOpen\} onClose=\{closeSearch\}/);
  assert.match(header, /searchButtonRef\.current\?\.focus\(\)/);
  assert.doesNotMatch(header, /useSearch\(\)|<input/);
});

test('SPA navigation scrolls to same-page and cross-page search anchors', () => {
  const router = readFileSync(new URL('../src/components/router.tsx', import.meta.url), 'utf8');
  assert.match(router, /new URL\(to, window\.location\.origin\)/);
  assert.match(router, /url\.hash/);
  assert.match(router, /document\.getElementById/);
  assert.match(router, /scrollIntoView\(/);
  assert.match(router, /navigationIntentRef/);
  assert.match(router, /navigationVersion/);
  assert.match(router, /attempts < 40/);
  assert.match(router, /focus\(\{ preventScroll: true \}\)/);
  assert.match(router, /getElementById\('main-content'\)/);
  assert.match(router, /history\.pushState/);
});

test('header wordmark uses the personal logo and the approved Creative entrepreneur descriptor', () => {
  const header = readFileSync(new URL('../src/components/Header.tsx', import.meta.url), 'utf8');
  assert.match(header, /t\('서주원', 'Seo Juwon'\)/);
  assert.match(header, /aria-label=\{t\('서주원 소개', 'Seo Juwon About'\)\}/);
  assert.match(header, /juwon-mark\.svg/);
  assert.match(header, /className="sj-header-mark/);
  assert.doesNotMatch(header, /bg-\[#eef1f6\]|rounded-\[.*\] bg-/);
  assert.match(header, /Creative entrepreneur/);
  assert.doesNotMatch(header, /t\('작업 기록', 'Work archive'\)/);
});

test('about introduces the person without former affiliations, community metrics, or venture promotion', async () => {
  const about = ['About.tsx', 'AboutHero.tsx'].map(file => readFileSync(new URL('../src/components/' + file, import.meta.url), 'utf8')).join('\n');
  const timeline = readFileSync(new URL('../src/components/Timeline.tsx', import.meta.url), 'utf8');
  const { aboutDisciplines, aboutGrowth, aboutIntro, aboutHeroIntro, aboutPrinciple, aboutCapabilities } = await import('../src/data/aboutContent.ts');
  assert.match(about, /aboutDisciplines/);
  assert.match(about, /channels\.map/);
  assert.match(about, /aboutPrinciple/);
  assert.match(about, /<Timeline\s*\/>/);
  assert.match(timeline, /id="about-growth"/);
  assert.deepEqual(aboutGrowth.slice(0, 6).map(step => step.id), ['platform', 'programming', 'team-projects', 'asset-and-service', 'design-marketing-development', 'community-operations']);
  assert.deepEqual(aboutGrowth.slice(0, 6).map(step => step.phase.ko), ['PHASE 01', 'PHASE 02', 'PHASE 03', 'PHASE 04', 'PHASE 05', 'PHASE 06']);
  assert.equal(aboutGrowth[0].title.ko, '가상 플랫폼 창작 입문');
  assert.equal(aboutGrowth[0].body.ko, '가상 플랫폼에서 작동법을 배우며 프로그래밍을 처음으로 접했습니다.');
  assert.equal(aboutGrowth[1].title.ko, '컴퓨터 프로그래밍 기초 공부');
  assert.equal(aboutGrowth[2].title.ko, '팀 프로젝트 참여');
  assert.equal(aboutGrowth[3].title.ko, '에셋 기획 및 서비스 운영');
  assert.equal(aboutGrowth[4].title.ko, '디자인·마케팅·개발 학습');
  assert.equal(aboutGrowth[5].title.ko, '프로젝트 운영과 팀 리딩');
  assert.match(timeline, /JOURNEY/);
  assert.match(timeline, /aboutGrowth\.map/);
  assert.match(timeline, /step\.phase\[language\]/);
  assert.match(timeline, /step\.tags\.map/);
  assert.match(about, /SEOHARO/);
  assert.match(about, /포트폴리오 보기/);
  assert.match(about, /협업 문의/);
  assert.match(about, /lg:grid-cols/);
  assert.doesNotMatch(about, /juwon-mark\.png/);
  assert.ok(aboutIntro.ko.length > 150, 'the original intro should retain a substantial, personal introduction');
  assert.match(aboutIntro.ko, /Seoharo/);
  assert.match(JSON.stringify(aboutDisciplines), /SNS 마케팅/);
  assert.match(JSON.stringify(aboutDisciplines), /팀 리딩/);
  assert.equal(aboutPrinciple.ko, '생각을 시도하고, 현실로 만듭니다.');
  assert.match(about, /bg-black/);
  const copy = JSON.stringify({ aboutIntro, aboutHeroIntro, aboutDisciplines, aboutGrowth, aboutPrinciple, aboutCapabilities });
  assert.doesNotMatch(copy, /룩세렛|LUXERET|RoFolder|Limited|로블갤러리|전 직장|전직|양도|중학생|middle school|1,200\+|30\+|8\+/i);
  assert.doesNotMatch(about, /<Communities|operatedVentures|venture\.members|경력과 역할|전 직장|LUXERET/);
});

test('growth journey restores the original alternating, scroll-progress timeline and honors reduced motion', () => {
  const timeline = readFileSync(new URL('../src/components/Timeline.tsx', import.meta.url), 'utf8');
  const styles = readFileSync(new URL('../src/about-original.css', import.meta.url), 'utf8');
  const baseStyles = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
  assert.match(baseStyles, /html\s*\{[^}]*position:\s*relative/);
  assert.match(timeline, /useReducedMotion/);
  assert.match(timeline, /useScroll/);
  assert.match(timeline, /useSpring/);
  assert.match(timeline, /style=\{\{ scaleY: reduceMotion \? 1 : lineProgress \}\}/);
  assert.match(timeline, /growth-timeline__progress/);
  assert.match(timeline, /growth-timeline__item--left/);
  assert.match(timeline, /viewport=\{\{ once: true/);
  assert.match(timeline, /initial=\{false\}/);
  assert.match(timeline, /useOffscreenReveal/);
  assert.doesNotMatch(timeline, /<li key=\{tag\.ko\}>#\{tag\[language\]\}/);
  assert.match(styles, /@media \(min-width: 768px\) \{[\s\S]*?growth-timeline__item--left/);
  assert.match(styles, /@media \(max-width: 480px\) \{/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?growth-timeline__progress/);
});

test('about keeps detailed verified fields and a stable experience section', async () => {
  const { aboutIntro, aboutDisciplines, aboutGrowth, aboutPrinciple } = await import('../src/data/aboutContent.ts');
  assert.deepEqual(aboutDisciplines.map(item => item.id), ['design', 'marketing', 'web', 'planning']);
  assert.equal(aboutPrinciple.ko, '생각을 시도하고, 현실로 만듭니다.');
  for (const item of aboutDisciplines) {
    assert.ok(item.title.ko && item.title.en && item.body.ko && item.body.en, `${item.id} needs complete bilingual copy`);
  }
  const about = readFileSync(new URL('../src/components/About.tsx', import.meta.url), 'utf8');
  assert.match(about, /aboutIntro/);
  assert.match(about, /aboutDisciplines/);
  assert.match(about, /aboutPrinciple/);
  assert.match(about, /id="about-experience"/);
  assert.match(about, /aboutIntro\[language\]/);
  assert.ok(aboutIntro.ko.length > 150);
  assert.doesNotMatch(JSON.stringify({ aboutIntro, aboutDisciplines, aboutGrowth, aboutPrinciple }), /seoharo0111@gmail\.com|github\.com\/|중학생|middle school|1,200\+/i);
});

test('contact page exposes only the three approved channels with safe destinations', async () => {
  const { contactChannels } = await import('../src/data/contactChannels.ts');
  assert.deepEqual(contactChannels.map(({ id, label, href }) => [id, label.ko, href]), [
    ['email', 'Email', 'mailto:seoharo0111@gmail.com'],
    ['github', 'GitHub', 'https://github.com/haroseo'],
    ['linkedin', 'LinkedIn', 'https://www.linkedin.com/in/seoharo/'],
  ]);
  const contact = readFileSync(new URL('../src/components/ContactPage.tsx', import.meta.url), 'utf8');
  assert.match(contact, /const \{ language, t \} = useLanguage\(\)/);
  assert.match(contact, /contactChannels\.map/);
  assert.match(contact, /target=\{external \? '_blank' : undefined\}/);
  assert.match(contact, /rel=\{external \? 'noopener noreferrer' : undefined\}/);
  assert.match(contact, /bg-\[#090a0c\]/);
  assert.match(contact, /grid[\s\S]*?lg:grid-cols/);
  assert.match(contact, /SEOHARO/);
  assert.match(contact, /contactChannels\.map/);
  assert.doesNotMatch(contact, /<form|phone|discord|instagram/i);
});

test('LinkedIn-style work profile starts with the approved name and professional title', () => {
  const portfolioPage = readFileSync(new URL('../src/components/PortfolioPage.tsx', import.meta.url), 'utf8');
  assert.match(portfolioPage, /t\('서주원', 'Seo Juwon'\)/);
  assert.match(portfolioPage, /Brand Designer · Marketer · Developer/);
  assert.match(portfolioPage, /profile\.summary\[language\]/);
  assert.match(portfolioPage, /to="\/#about-growth"/);
  assert.match(portfolioPage, /juwon-mark\.svg/);
  assert.match(portfolioPage, /profile-banner/);
  assert.doesNotMatch(portfolioPage, /t\('작업 기록', 'Work archive'\)/);
  assert.equal(profile.koreanName, '서주원');
});

test('portfolio category filters preserve the reader’s scroll position', () => {
  const workPage = readFileSync(new URL('../src/components/PortfolioPage.tsx', import.meta.url), 'utf8');
  const router = readFileSync(new URL('../src/components/router.tsx', import.meta.url), 'utf8');
  assert.match(workPage, /navigate\(tab\.path,\s*\{\s*preserveScroll:\s*true\s*\}\)/);
  assert.match(router, /preserveScroll\?: boolean/);
  assert.match(router, /previousScrollY: window\.scrollY/);
  assert.match(router, /window\.scrollTo\(\{ top: intent\.previousScrollY, behavior: 'instant' \}\)/);
});

test('empty project categories offer links to relevant verified experience', () => {
  const workPage = readFileSync(new URL('../src/components/PortfolioPage.tsx', import.meta.url), 'utf8');
  assert.match(workPage, /relatedExperienceItems/);
  assert.match(workPage, /대신 관련 경력을 확인할 수 있어요\./);
  assert.match(workPage, /to=\{item\.href\}/);
});

test('requested portfolio exclusions stay hidden while other work remains visible', () => {
  assert.deepEqual(hiddenPortfolioIds, ['xeproject', 'mindmap', 'crewcheck', 'movtier', 'mapfit', 'kustudio', 'luxeret']);
  const items = [...hiddenPortfolioIds.map(id => ({ id })), { id: 'designpick' }, { id: 'rofolder' }];
  assert.deepEqual(visiblePortfolioItems(items).map(item => item.id), ['designpick', 'rofolder']);
});

test('profile experience and project copy is complete in both languages', () => {
  for (const item of profilePortfolioItems) {
    for (const field of ['title', 'subtitle', 'description', ...(item.status ? ['status'] : '')]) {
      assert.ok(item[field].ko.trim(), `${item.id} ${field} should have Korean copy`);
      assert.ok(item[field].en.trim(), `${item.id} ${field} should have English copy`);
    }
    for (const tag of item.tags) {
      assert.ok(tag.ko.trim());
      assert.ok(tag.en.trim());
    }
  }
});

test('profile filters search both languages and combine with categories and tags', () => {
  assert.deepEqual(filterProfilePortfolioItems('all', '  SERVER DISCOVERY  ').map(item => item.id), ['rofolder']);
  assert.deepEqual(filterProfilePortfolioItems('development', 'calendar').map(item => item.id), ['planor']);
  assert.deepEqual(filterProfilePortfolioItems('brand', '', 'Design').map(item => item.id), ['freelance-design', 'designgraphy', 'one-to-z', 'design-pick']);
  assert.deepEqual(filterProfilePortfolioItems('operations').map(item => item.id), ['rofolder', 'limited', 'roblox-gallery']);
  assert.equal(filterProfilePortfolioItems('marketing', 'nonsense').length, 0);
  assert.ok(!filterProfilePortfolioItems().some(item => hiddenPortfolioIds.includes(item.id)));
});

test('profile section coverage includes each visible selected work once with its canonical title', () => {
  const items = visiblePortfolioItems(profilePortfolioItems);
  const projects = items.filter(item => item.kind === 'project');
  assert.equal(new Set(items.map(item => item.id)).size, items.length, 'profile record ids should be unique');
  for (const work of selectedWorks) {
    const matches = projects.filter(item => item.detailHref === `/portfolio/${work.slug}`);
    assert.equal(matches.length, 1, `${work.slug} should appear exactly once in Projects`);
    assert.equal(matches[0].title.en, work.title, `${work.slug} should use its canonical title`);
  }
  assert.ok(items.filter(item => item.kind === 'experience').every(item => ['brand', 'marketing', 'development', 'operations', 'club'].includes(item.category)));
  assert.ok(!items.some(item => hiddenPortfolioIds.includes(item.id)));
});

test('portfolio detail targets are valid and resolve to known project or career routes only', () => {
  const items = visiblePortfolioItems(profilePortfolioItems);
  for (const item of items) {
    for (const path of [item.href, item.detailHref].filter(value => value?.startsWith('/'))) {
      const route = getPortfolioRoute(path);
      assert.ok(['career-detail', 'project'].includes(route.page), `${item.id} target ${path} should resolve to a detail route`);
      if (item.detailHref) {
        assert.deepEqual(route, { page: 'project', slug: item.detailHref.slice('/portfolio/'.length) });
      }
    }
  }
  for (const work of selectedWorks) assert.deepEqual(getPortfolioRoute(`/portfolio/${work.slug}`), { page: 'project', slug: work.slug });
});

test('LinkedIn profile sections and portfolio combines work and career in one profile', () => {
  const page = readFileSync(new URL('../src/components/PortfolioPage.tsx', import.meta.url), 'utf8');
  const orderedSections = ['id="profile-heading"', 'id="about"', 'id="experience"', 'id="projects"', 'id="skills"']
    .map((marker) => page.indexOf(marker));
  assert.ok(orderedSections.every(index => index >= 0), 'profile, About, Experience, Projects, and Skills sections should exist');
  assert.deepEqual(orderedSections, [...orderedSections].sort((a, b) => a - b), 'profile sections should follow LinkedIn reading order');
  assert.match(page, /careerEntries\.map/);
  assert.match(page, /getProfilePortfolioDisplayItems\(selectedCategory, query, activeTag\)/);
  assert.match(page, /detailHref/);
  assert.match(page, /entry\.statusText\[language\]/);
  assert.match(page, /venture\.members/);
  assert.match(page, /skillGroups/);
  const projects = page.slice(page.indexOf('id="projects"'), page.indexOf('id="skills"'));
  assert.match(projects, /aria-label=\{t\('프로젝트 분류'/);
  assert.match(projects, /filterTabs\.map/);
  assert.doesNotMatch(page, /followers|connections|endorsements/i);
});

test('small-text colors retain WCAG AA contrast on their surfaces', () => {
  function luminance(hex) {
    const rgb = hex.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16) / 255)
      .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
  }
  function contrast(a, b) { const values = [luminance(a), luminance(b)].sort((x,y)=>y-x); return (values[0]+.05)/(values[1]+.05); }
  const css = readFileSync(new URL('../src/portfolio.css', import.meta.url), 'utf8');
  const tds = readFileSync(new URL('../node_modules/@toss/tds-colors/colors.light.css', import.meta.url), 'utf8');
  const color = name => tds.match(new RegExp(`--adaptive${name}:(#[a-f\\d]{6})`, 'i'))[1];
  assert.match(css, /--sj-blue:\s*var\(--adaptiveBlue700\)/);
  assert.match(css, /--sj-muted:\s*var\(--adaptiveGrey600\)/);
  assert.ok(contrast(color('Blue700'), '#ffffff') >= 4.5);
  assert.ok(contrast(color('Grey600'), '#ffffff') >= 4.5);
  assert.ok(contrast(color('Grey700'), color('Grey50')) >= 4.5);
  assert.ok(contrast(color('Grey900'), color('Blue50')) >= 4.5);
});

test('production metadata preserves approved page titles with a concise search name and no private details', () => {
  const html = renderHead(getPageMetadata('/', 'ko'));
  const siteName = '서주원 | Brand Designer • Marketer • Developer';
  assert.match(html, new RegExp(`<title>${siteName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/title>`));
  assert.match(html, /<meta property="og:site_name" content="서주원"/);
  assert.ok(!/"worksFor"|"jobTitle"|discord\.gg|700\+|500\+/i.test(html));
  assert.doesNotMatch(html, /preconnect[^>]+fonts\.googleapis|fonts\.gstatic/i);
  assert.doesNotMatch(html, /<meta\s+name="author"|birthDate|address|school|mailto:/i);
  const publicCopy = [
    readFileSync(new URL('../index.html', import.meta.url), 'utf8'),
    ...[
    'src/App.tsx',
    'src/components/Header.tsx',
    'src/components/Hero.tsx',
    'src/components/HomeContent.tsx',
    'src/components/PortfolioPage.tsx',
    'src/components/Footer.tsx',
    'src/data/profilePortfolio.ts',
    'src/data/portfolioContent.ts',
    ].map((path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')),
  ].join('\n');
  assert.doesNotMatch(publicCopy, /mailto:|linkedin\.com\/in\/|instagram\.com\/|figma\.com\/@/i);
  assert.doesNotMatch(publicCopy, /중학생|middle school|\bstudent\b/i);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    assert.ok(JSON.parse(match[1])['@type']);
  }
});

test('private and former-brand assets are not served from the public asset directory', () => {
  const publicAssets = new URL('../public/assets/', import.meta.url);
  for (const file of [
    'seoharo-logo.png', 'seoharo-logo-round.png', 'naramarsami.png',
    'limited.png', 'limited-banner.png', 'luxeret.png',
    'rofolder.jpg', 'rofolder-new.jpg', 'rofolder-logo-new.png',
  ]) {
    assert.equal(existsSync(new URL(file, publicAssets)), false, `${file} should not be publicly served`);
  }
  const legacyData = readFileSync(new URL('../src/data/portfolioData.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(legacyData, /naramarsami|github\.com\//i);
});

test('portfolio typography and navigation avoid oversized AI-style defaults', () => {
  const ui = ['Hero.tsx', 'About.tsx', 'HomeContent.tsx', 'PortfolioPage.tsx', 'ContactPage.tsx']
    .map((file) => readFileSync(new URL(`../src/components/${file}`, import.meta.url), 'utf8'))
    .join('\n');
  const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const header = readFileSync(new URL('../src/components/Header.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(ui, /text-6xl|tracking-|4\.6rem/);
  assert.doesNotMatch(app, /y:\s*(?:20|24|30)|duration:\s*0\.[5-9]/);
  assert.match(app, /x: 8/);
  assert.match(app, /duration: shouldReduceMotion \? 0 : 0\.22/);
  assert.match(header, /primaryNavigation\.map/);
  assert.match(header, /item\.label\.ko/);
});
