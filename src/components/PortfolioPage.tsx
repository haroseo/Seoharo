import { ArrowRight, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { aboutIntro } from '../data/aboutContent';
import { careerEntries, profile, skillGroups } from '../data/portfolioContent';
import {
  filterProjectStatus,
  getProfilePortfolioDisplayItems,
  profileCategoryTabs,
  profilePortfolioItems,
  type ProfileCategory,
  type ProfileCategoryFilter,
  type ProjectStatusFilter,
} from '../data/profilePortfolio';
import { useLanguage } from './LanguageContext';
import { Link, useRouter } from './router';
import { useSearch } from './SearchContext';
import { ProjectCover } from './portfolio/ProjectCover';
import { getFilterHeightReserve } from '../lib/filterScroll';

const categoryLabels: Record<ProfileCategory, { ko: string; en: string }> = {
  brand: { ko: '디자인', en: 'Design' },
  marketing: { ko: '마케팅', en: 'Marketing' },
  development: { ko: '개발', en: 'Development' },
  operations: { ko: '사업 운영', en: 'Business operations' },
  club: { ko: '동아리', en: 'Clubs' },
};

function careerDetailPath(slug: string) {
  return slug === 'company-work' ? '/portfolio/company-work' : `/career/${slug}`;
}

export default function PortfolioPage({ focusSection }: { focusSection?: 'experience' }) {
  const { language, t } = useLanguage();
  const { currentPath, navigate } = useRouter();
  const { query, activeTag } = useSearch();
  const [projectStatusFilter, setProjectStatusFilter] = useState<ProjectStatusFilter>('all');
  const projectSectionRef = useRef<HTMLElement>(null);
  const [filterHeightReserve, setFilterHeightReserve] = useState(0);

  function preserveFilterHeight() {
    const section = projectSectionRef.current;
    if (!section) return;
    const reserve = getFilterHeightReserve({
      sectionHeight: section.getBoundingClientRect().height,
      documentHeight: document.documentElement.scrollHeight,
      scrollY: window.scrollY,
      viewportHeight: window.innerHeight,
    });
    setFilterHeightReserve((previous) => Math.max(previous, reserve));
  }

  useEffect(() => {
    const resetHeightReserve = () => setFilterHeightReserve(0);
    window.addEventListener('resize', resetHeightReserve);
    return () => window.removeEventListener('resize', resetHeightReserve);
  }, []);

  const filterTabs = profileCategoryTabs.map((tab) => ({ label: t(tab.label.ko, tab.label.en), path: tab.path }));
  const categoryByPath = Object.fromEntries(profileCategoryTabs.map((tab) => [tab.path, tab.category])) as Record<string, ProfileCategoryFilter>;
  const selectedCategory = categoryByPath[currentPath] ?? 'all';
  const projectItems = getProfilePortfolioDisplayItems(selectedCategory, query, activeTag)
    .filter((item) => item.kind === 'project');
  const relatedExperienceItems = getProfilePortfolioDisplayItems(selectedCategory, query, activeTag)
    .filter((item) => item.kind === 'experience' && item.href?.startsWith('/'));
  const visibleProjectItems = filterProjectStatus(projectItems, projectStatusFilter);
  const hasOngoingProjects = profilePortfolioItems.some((item) => item.kind === 'project' && item.projectStatus === 'ongoing');

  useEffect(() => {
    if (!focusSection) return;
    const section = document.getElementById(focusSection);
    section?.scrollIntoView({ block: 'start', behavior: 'instant' });
    section?.focus({ preventScroll: true });
  }, [focusSection]);

  return (
    <div className="min-h-screen bg-[#f3f2ef] pt-[56px] text-[var(--ink)]">
      <div className="mx-auto max-w-[1128px] px-3 py-5 sm:px-5 sm:py-7">
        <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(250px,1fr)]">
          <div className="min-w-0 space-y-3">
            <section className="overflow-hidden rounded-xl border border-[#d6dce5] bg-white" aria-labelledby="profile-heading">
              <div className="profile-banner relative h-[92px] overflow-hidden bg-[#e5edfa] sm:h-[112px]" aria-hidden="true">
                <img src="/assets/juwon-mark.svg" alt="" className="absolute -right-1 top-1/2 h-[175px] w-[175px] -translate-y-1/2 object-contain opacity-[0.12] sm:h-[210px] sm:w-[210px]" />
              </div>
              <div className="relative px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
                <span className="absolute -top-11 left-4 block size-[76px] overflow-hidden rounded-xl border-4 border-white bg-[#eef1f6] shadow-sm sm:left-6 sm:size-[84px]">
                  <img src="/assets/juwon-mark.svg" alt={t('서주원 개인 로고', 'Seo Juwon personal logo')} className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 object-contain" />
                </span>
                <div className="pt-10">
                  <p className="text-sm font-semibold text-[var(--muted-copy)]">{t('프로필', 'Profile')}</p>
                  <h1 id="profile-heading" className="mt-1 text-2xl font-bold leading-tight text-[var(--ink)] sm:text-3xl">
                    {t('서주원', 'Seo Juwon')}
                  </h1>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[var(--body-copy)] sm:text-base">{t('브랜드 디자이너 · 마케터 · 개발자', 'Brand Designer · Marketer · Developer')}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--body-copy)] sm:text-base">
                    {profile.summary[language]}
                  </p>
                  <nav className="mt-4 flex flex-wrap gap-2" aria-label={t('프로필 바로가기', 'Profile shortcuts')}>
                    {[
                      ['#about', t('소개', 'About')],
                      ['#experience', t('경력', 'Experience')],
                      ['#projects', t('프로젝트', 'Projects')],
                    ].map(([href, label]) => (
                      <a key={href} href={href} className="inline-flex min-h-10 items-center rounded-full border border-[#d6dce5] px-3.5 text-sm font-semibold text-[var(--body-copy)] transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2">
                        {label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </section>

            <section id="about" className="scroll-mt-20 rounded-xl border border-[#d6dce5] bg-white px-4 py-5 sm:px-6 sm:py-6" aria-labelledby="about-heading">
              <h2 id="about-heading" className="text-lg font-bold text-[var(--ink)] sm:text-xl">{t('소개', 'About')}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--body-copy)] sm:text-base">{aboutIntro[language]}</p>
              <Link to="/#about-growth" className="mt-3 inline-flex min-h-10 items-center text-sm font-semibold text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2">
                {t('성장 과정 자세히 보기', 'Read the full story')} <ArrowRight size={15} className="ml-1" aria-hidden="true" />
              </Link>
            </section>

            <section id="experience" tabIndex={-1} className="scroll-mt-20 rounded-xl border border-[#d6dce5] bg-white px-4 py-5 sm:px-6 sm:py-6" aria-labelledby="experience-heading">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 id="experience-heading" className="text-lg font-bold text-[var(--ink)] sm:text-xl">{t('경력', 'Experience')}</h2>
                  <p className="mt-1 text-sm text-[var(--muted-copy)]">{t('맡았던 역할과 운영 경험', 'Roles and operating experience')}</p>
                </div>
                <Link to="/career" className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-md px-2 text-sm font-semibold text-[var(--brand-accent)] hover:bg-[var(--brand-accent-soft)] focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2">
                  {t('전체 보기', 'View all')} <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>

              <ol className="mt-3 divide-y divide-[#e7eaf0]">
                {careerEntries.map((entry) => (
                  <li key={entry.slug} className="py-4 first:pt-3 last:pb-0">
                    <article>
                      <div className="flex items-start gap-3">
                        {entry.logo && <img src={entry.logo} alt="" aria-hidden="true" className="size-11 shrink-0 rounded-lg border border-[#e7eaf0] bg-white object-contain p-1" />}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                            <div className="min-w-0">
                              <h3 className="text-base font-bold text-[var(--ink)]">
                                <Link to={careerDetailPath(entry.slug)} className="inline-flex min-h-8 items-center gap-1.5 rounded-sm hover:text-[var(--brand-accent)] focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2">
                                  {entry.title[language]} <ArrowRight size={15} aria-hidden="true" />
                                </Link>
                              </h3>
                              <p className="mt-1 text-sm font-medium text-[var(--body-copy)]">
                                {entry.organization?.[language] ? `${entry.role[language]} · ${entry.organization[language]}` : entry.role[language]}
                              </p>
                            </div>
                            <span className="rounded-full bg-[#f3f5f8] px-2.5 py-1 text-xs font-medium text-[var(--muted-copy)]">{entry.statusText[language]}</span>
                          </div>
                        </div>
                      </div>
                      <p className={`mt-2 text-sm leading-6 text-[var(--body-copy)] ${entry.logo ? 'pl-14' : ''}`}>{entry.summary[language]}</p>
                      {entry.ventures && (
                        <ul className="mt-4 grid gap-2 sm:grid-cols-3" aria-label={t('운영한 커뮤니티', 'Communities operated')}>
                          {entry.ventures.map((venture) => (
                            <li key={venture.name} className="flex min-w-0 items-start gap-2 border-t border-[#e7eaf0] py-3">
                              <img src={venture.logo} alt="" aria-hidden="true" className="size-9 shrink-0 rounded-md border border-[#e7eaf0] bg-white object-contain p-1" />
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[var(--ink)]">{venture.name}</p>
                                <p className="mt-0.5 text-xs leading-5 text-[var(--body-copy)]">{venture.field[language]}</p>
                                <p className="mt-1 text-xs font-medium text-[var(--muted-copy)]">{language === 'ko' ? `${venture.members.toLocaleString('ko-KR')}명` : `${venture.members.toLocaleString('en-US')} members`} · {venture.statusText[language]}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      {entry.areas && !entry.ventures && (
                        <ul className={`mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--muted-copy)] ${entry.logo ? 'pl-14' : ''}`} aria-label={t('업무 분야', 'Areas of work')}>
                          {entry.areas.map((area) => <li key={area.ko}>{area[language]}</li>)}
                        </ul>
                      )}
                    </article>
                  </li>
                ))}
              </ol>
            </section>

            <section ref={projectSectionRef} id="projects" tabIndex={-1} style={{ minHeight: filterHeightReserve || undefined }} className="scroll-mt-20 rounded-xl border border-[#d6dce5] bg-white px-4 py-5 sm:px-6 sm:py-6" aria-labelledby="projects-heading">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 id="projects-heading" className="text-lg font-bold text-[var(--ink)] sm:text-xl">{t('프로젝트', 'Projects')}</h2>
                  <p className="mt-1 text-sm text-[var(--muted-copy)]">{t('기획하거나 제작에 참여한 작업', 'Projects planned or built')}</p>
                </div>
              </div>

              <nav aria-label={t('프로젝트 분류', 'Project categories')} className="mt-4 flex gap-1 overflow-x-auto border-b border-[#e7eaf0]">
                {filterTabs.map((tab) => {
                  const isActive = currentPath === tab.path || (tab.path === '/portfolio' && selectedCategory === 'all');
                  return (
                    <button
                      key={tab.path}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => { preserveFilterHeight(); navigate(tab.path, { preserveScroll: true }); }}
                      className={`relative min-h-11 shrink-0 px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-[-2px] ${isActive ? 'font-semibold text-[var(--brand-accent)] after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-[var(--brand-accent)]' : 'font-medium text-[var(--muted-copy)] hover:text-[var(--ink)]'}`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={t('프로젝트 진행 상태', 'Project status')}>
                <button type="button" aria-pressed={projectStatusFilter === 'all'} onClick={() => { preserveFilterHeight(); setProjectStatusFilter('all'); }} className={`min-h-9 rounded-full border px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2 ${projectStatusFilter === 'all' ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)] text-white' : 'border-[#d6dce5] bg-white text-[var(--body-copy)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]'}`}>
                  {t('전체', 'All')}
                </button>
                <button type="button" aria-pressed={projectStatusFilter === 'ongoing'} onClick={() => { preserveFilterHeight(); setProjectStatusFilter('ongoing'); }} className={`min-h-9 rounded-full border px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2 ${projectStatusFilter === 'ongoing' ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)] text-white' : 'border-[#d6dce5] bg-white text-[var(--body-copy)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]'}`}>
                  {t('진행 중', 'Ongoing')}
                </button>
              </div>

              <p className="sr-only" role="status" aria-live="polite">
                {language === 'ko' ? `${visibleProjectItems.length}개 프로젝트를 표시합니다.` : `Showing ${visibleProjectItems.length} projects.`}
              </p>

              <ol className="divide-y divide-[#e7eaf0]">
                {visibleProjectItems.map((item) => (
                  <li key={item.id}>
                    <article className="flex gap-3 py-4 first:pt-4 last:pb-0">
                      {item.logo ? (
                        <span className="relative block size-[76px] shrink-0 overflow-hidden rounded-lg border border-[#e7eaf0] bg-white sm:size-[88px]">
                          <img src={item.logo} alt={t(`${item.title.ko} 로고`, `${item.title.en} logo`)} className="size-full object-contain p-1.5" />
                        </span>
                      ) : item.id === 'planor' || item.id === 'naratmalsami' ? (
                        <span className="hidden h-[76px] w-[132px] shrink-0 overflow-hidden rounded-lg border border-[#e7eaf0] sm:block">
                          <ProjectCover slug={item.id} title={item.title[language]} language={language} compact />
                        </span>
                      ) : item.image && <img src={item.image} alt={item.imageAlt?.[language] ?? ''} loading="lazy" decoding="async" width="104" height="76" className={`hidden h-[76px] w-[104px] shrink-0 rounded-lg border border-[#e7eaf0] object-cover sm:block ${item.imagePresentation === 'screen' ? 'object-top' : ''}`} />}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="text-base font-bold text-[var(--ink)]">
                            {item.detailHref ? <Link to={item.detailHref} className="rounded-sm hover:text-[var(--brand-accent)] focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2">{item.title[language]}</Link> : item.title[language]}
                          </h3>
                          <span className="text-xs font-medium text-[var(--brand-accent)]">{t(categoryLabels[item.category].ko, categoryLabels[item.category].en)}</span>
                          {item.status && <span className="rounded-full bg-[#f3f5f8] px-2 py-0.5 text-xs font-medium text-[var(--muted-copy)]">{item.status[language]}</span>}
                        </div>
                        <p className="mt-1 text-sm font-medium text-[var(--body-copy)]">{item.subtitle[language]}</p>
                        <p className="mt-2 text-sm leading-6 text-[var(--body-copy)]">{item.description[language]}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--muted-copy)]" aria-label={t('프로젝트 분야', 'Project areas')}>
                            {item.tags.map((tag) => <li key={tag.ko}>{tag[language]}</li>)}
                          </ul>
                          {item.detailHref && <Link to={item.detailHref} className="inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2">
                            {t('상세 보기', 'View details')} <ArrowRight size={14} aria-hidden="true" />
                          </Link>}
                          {item.href && <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-[var(--body-copy)] hover:text-[var(--brand-accent)] focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2">
                            {t('프로젝트 열기', 'Open project')} <ExternalLink size={13} aria-hidden="true" />
                          </a>}
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
                {visibleProjectItems.length === 0 && <li className="py-8 text-sm leading-6 text-[var(--muted-copy)]">
                  {projectStatusFilter === 'ongoing'
                    ? hasOngoingProjects
                      ? t('조건에 맞는 진행 중 프로젝트가 없습니다.', 'No ongoing projects match these filters.')
                      : t('진행 중으로 확인된 프로젝트가 없습니다.', 'No projects have been confirmed as ongoing yet.')
                    : t('이 분류에서 공개하는 프로젝트가 없습니다.', 'No projects are listed in this category.')}
                  {relatedExperienceItems.length > 0 && (
                    <div className="mt-5 border-t border-[#e7eaf0] pt-4">
                      <p className="font-semibold text-[var(--body-copy)]">{t('대신 관련 경력을 확인할 수 있어요.', 'You can explore related experience instead.')}</p>
                      <ul className="mt-2 divide-y divide-[#e7eaf0]">
                        {relatedExperienceItems.map((item) => item.href?.startsWith('/') && (
                          <li key={item.id}>
                            <Link
                              to={item.href}
                              className="flex min-h-11 items-center justify-between gap-3 py-2 font-semibold text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2"
                            >
                              <span className="min-w-0">
                                <span className="block text-sm">{item.title[language]}</span>
                                <span className="mt-0.5 block text-xs font-medium text-[var(--muted-copy)]">{item.subtitle[language]}</span>
                              </span>
                              <ArrowRight size={16} aria-hidden="true" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>}
              </ol>
            </section>
          </div>

          <aside className="space-y-3 lg:sticky lg:top-[76px]">
            <nav className="rounded-xl border border-[#d6dce5] bg-white px-4 py-5 sm:px-5" aria-label={t('프로필 내 이동', 'Profile sections')}>
              <h2 className="text-base font-bold text-[var(--ink)]">{t('이 페이지에서 보기', 'On this page')}</h2>
              <ul className="mt-2 divide-y divide-[#e7eaf0]">
                {[
                  ['#about', t('소개', 'About')],
                  ['#experience', t('경력', 'Experience')],
                  ['#projects', t('프로젝트', 'Projects')],
                  ['#skills', t('역량', 'Skills')],
                ].map(([href, label]) => <li key={href}><a href={href} className="flex min-h-11 items-center text-sm font-medium text-[var(--body-copy)] hover:text-[var(--brand-accent)] focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)]">{label}</a></li>)}
              </ul>
            </nav>

            <section id="skills" tabIndex={-1} className="scroll-mt-20 rounded-xl border border-[#d6dce5] bg-white px-4 py-5 sm:px-5" aria-labelledby="skills-heading">
              <h2 id="skills-heading" className="text-base font-bold text-[var(--ink)]">{t('역량', 'Skills')}</h2>
              <div className="mt-3 space-y-4">
                {skillGroups.map((group) => (
                  <section key={group.title.ko}>
                    <h3 className="text-sm font-semibold text-[var(--body-copy)]">{group.title[language]}</h3>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {group.items[language].map((skill) => <li key={skill} className="rounded-full bg-[#f3f5f8] px-3 py-1.5 text-sm text-[var(--body-copy)]">{skill}</li>)}
                    </ul>
                  </section>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
