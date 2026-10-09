import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  careerEntries,
  companyWorkSpecialties,
  filterCompanyContributions,
  selectedWorks,
  type CareerGroupId,
  type CompanyWorkSpecialtyFilter,
} from '../data/portfolioContent';
import { Link, useRouter } from './router';
import ReturnNavigation from './ReturnNavigation';
import { useLanguage } from './LanguageContext';

interface CareerPageProps {
  slug?: string;
  fromWorkTab?: boolean;
  initialGroup?: CareerGroupId;
}

export default function CareerPage({ slug, fromWorkTab = false, initialGroup }: CareerPageProps) {
  const { language, t } = useLanguage();
  const { viewState, updateViewState } = useRouter();
  const activeSpecialty = viewState.companySpecialty ?? 'all';
  const setActiveSpecialty = (companySpecialty: CompanyWorkSpecialtyFilter) => updateViewState({ companySpecialty });
  const selectedGroupEntry = initialGroup
    ? careerEntries.find((entry) => entry.group === initialGroup)
    : undefined;
  const detailSlug = slug ?? selectedGroupEntry?.slug;
  const backPath = fromWorkTab ? '/portfolio' : '/career';

  if (!detailSlug) {
    return (
      <section className="min-h-[65vh] bg-white px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-28 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <ReturnNavigation className="mb-5" />
          <header className="max-w-3xl">
            <p className="text-sm font-semibold text-[var(--brand-accent)]">{t('경력', 'Career')}</p>
            <h1 className="mt-2 text-2xl font-bold leading-snug text-[var(--ink)] sm:text-3xl">
              {t('해온 일', 'Work so far')}
            </h1>
            <p className="mt-3 text-sm leading-7 text-[var(--body-copy)] sm:text-base">
              {t('회사 업무, 프리랜서 디자인, 사업 운영, 동아리 경험을 분야별로 나누어 정리했습니다.', 'Company work, freelance design, business operations, and club experience, organized by area.')}
            </p>
          </header>

          <ol className="mt-7 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {careerEntries.map((entry, index) => (
              <li key={entry.slug}>
                <Link
                  to={`/career/group/${entry.group}`}
                  className="group grid min-h-28 grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 py-5 transition-colors hover:bg-[var(--hero-surface)] focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-[-2px] sm:min-h-32 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-5 sm:px-4 sm:py-6"
                >
                  <span className="self-start pt-1 text-sm font-semibold tabular-nums text-[var(--brand-accent)]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="min-w-0">
                    <span className="mb-1.5 inline-flex rounded bg-[var(--career-surface)] px-2 py-1 text-xs font-semibold text-[var(--career-status-ink)]">{entry.statusText[language]}</span>
                    <span className="block text-lg font-bold text-[var(--ink)] group-hover:text-[var(--brand-accent)] sm:text-xl">{entry.title[language]}</span>
                    <span className="mt-1.5 block max-w-3xl text-sm leading-6 text-[var(--muted-copy)]">{entry.summary[language]}</span>
                  </span>
                  <ArrowUpRight size={19} className="text-[var(--brand-accent)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  const entry = careerEntries.find((item) => item.slug === detailSlug);
  if (!entry) {
    return (
      <section className="min-h-[60vh] px-5 pb-20 pt-32 text-center sm:px-8">
        <h1 className="text-2xl font-bold text-[var(--ink)]">{t('경력 정보를 찾을 수 없습니다.', 'Career details not found.')}</h1>
        <Link to="/career" className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-[var(--brand-accent)]">
          <ArrowLeft size={16} aria-hidden="true" />{t('경력 목록으로', 'Back to career')}
        </Link>
      </section>
    );
  }
  const visibleContributions = entry.contributions
    ? filterCompanyContributions(entry.contributions, activeSpecialty)
    : [];
  const specialtyFilters = [
    { id: 'all' as const, label: { ko: '전체', en: 'All' } },
    ...companyWorkSpecialties,
  ];

  return (
    <article className="min-h-[65vh] bg-white px-5 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-28 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <ReturnNavigation />

        <header className="mt-7 rounded-2xl border border-[var(--career-line)] bg-[var(--career-surface)] p-5 sm:p-8">
          <div className="flex items-start gap-4 sm:gap-6">
            {entry.logo && <span className="size-14 shrink-0 overflow-hidden rounded-xl border border-[var(--line)] bg-white sm:size-20">
              <img src={entry.logo} alt="" aria-hidden="true" className={`size-full object-contain ${entry.slug === 'company-work' ? 'scale-[1.65]' : 'p-1.5'}`} />
            </span>}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--brand-accent)]">{t('경력 상세', 'Career details')}</p>
              <h1 className="mt-2 text-[clamp(1.9rem,3vw,2.65rem)] font-bold leading-tight text-[var(--ink)]">{entry.title[language]}</h1>
              {entry.organization?.[language] && <p className="mt-2 text-base font-semibold text-[var(--ink)]">{entry.organization[language]}</p>}
              <p className="mt-3 text-base font-semibold text-[var(--body-copy)] sm:text-lg">{entry.role[language]}</p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--body-copy)]">{entry.summary[language]}</p>
            </div>
          </div>
        </header>

        <dl className={`mt-4 grid gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] ${entry.members ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
          <div className="bg-white p-4 sm:p-5">
            <dt className="text-xs font-medium text-[var(--muted-copy)]">{t('활동 상태', 'Status')}</dt>
            <dd className="mt-2 text-sm font-semibold text-[var(--ink)]">{entry.statusText[language]}</dd>
          </div>
          <div className="bg-white p-4 sm:p-5">
            <dt className="text-xs font-medium text-[var(--muted-copy)]">{entry.areasHeading?.[language] ?? t('주요 분야', 'Areas')}</dt>
            <dd className="mt-2 text-sm font-semibold leading-6 text-[var(--ink)]">{entry.areas?.map((area) => area[language]).join(' · ') ?? entry.role[language]}</dd>
          </div>
          {entry.members && <div className="bg-white p-4 sm:p-5">
            <dt className="text-xs font-medium text-[var(--muted-copy)]">{t('당시 서버 멤버 규모', 'Server members at the time')}</dt>
            <dd className="mt-2 text-sm font-semibold text-[var(--ink)]">{language === 'ko' ? `${entry.members.toLocaleString()}명` : entry.members.toLocaleString()}</dd>
          </div>}
        </dl>

        {entry.responsibilities.length > 0 && <div className="mt-12 grid gap-10 border-t border-[var(--line)] pt-8 sm:mt-16 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-12">
          <h2 className="text-base font-bold text-[var(--ink)]">{t('맡은 일', 'Responsibilities')}</h2>
          <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {entry.responsibilities.map((responsibility) => (
              <li key={responsibility.ko} className="py-4 text-base leading-7 text-[var(--body-copy)]">{responsibility[language]}</li>
            ))}
          </ul>
        </div>}

        {entry.contributions && (
          <section className="mt-12 grid gap-8 border-t border-[var(--line)] pt-8 sm:mt-16 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-12" aria-labelledby="career-contributions-heading">
            <div>
              <h2 id="career-contributions-heading" className="text-base font-bold text-[var(--ink)]">{t('참여한 작업', 'Selected contributions')}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-copy)]">{t('참여 범위와 공식 서비스 설명을 나누어 적었습니다.', 'My contribution and each official service description are listed separately.')}</p>
            </div>
            <div>
              <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label={t('회사 업무 분야', 'Company work specialties')}>
                {specialtyFilters.map((specialty) => (
                  <button
                    key={specialty.id}
                    type="button"
                    aria-pressed={activeSpecialty === specialty.id}
                    onClick={() => setActiveSpecialty(specialty.id)}
                    className={`min-h-10 rounded-full border px-3.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2 ${activeSpecialty === specialty.id ? 'border-[var(--brand-accent)] bg-[var(--brand-accent)] text-white' : 'border-[var(--line)] bg-white text-[var(--body-copy)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]'}`}
                  >
                    {specialty.label[language]}
                  </button>
                ))}
              </div>
              <ol className="space-y-3" aria-live="polite">
              {visibleContributions.map((contribution, index) => (
                <li key={contribution.title.ko} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 rounded-xl border border-[var(--line)] bg-white p-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5 sm:p-5">
                  <span className="flex size-9 items-center justify-center rounded-full bg-[var(--career-surface)] text-xs font-bold tabular-nums text-[var(--brand-accent)] sm:size-10">{String(index + 1).padStart(2, '0')}</span>
                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-[var(--ink)]">{contribution.title[language]}</h3>
                      <p className="mt-1.5 text-sm leading-7 text-[var(--body-copy)]">{contribution.description[language]}</p>
                      {contribution.productSummary && <p className="mt-2 text-sm leading-6 text-[var(--muted-copy)]">
                        <span className="font-semibold text-[var(--body-copy)]">{t('서비스 소개', 'Service')}</span>{' '}{contribution.productSummary[language]}
                      </p>}
                    </div>
                    {contribution.href && <a
                      href={contribution.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(`${contribution.title.ko} 공식 페이지 열기`, `Open official ${contribution.title.en} page`)}
                      className="inline-flex min-h-10 w-fit shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--brand-accent)] transition-colors hover:text-[var(--brand-accent-hover)] focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2"
                    >
                      {t('공식 페이지', 'Official page')}<ArrowUpRight size={15} aria-hidden="true" />
                    </a>}
                  </div>
                </li>
              ))}
              {visibleContributions.length === 0 && <li className="list-none rounded-lg bg-[var(--hero-surface)] px-4 py-5 text-sm leading-6 text-[var(--muted-copy)]">
                {activeSpecialty === 'development'
                  ? t('현재 개발 분야로 분류된 내용이 없습니다.', 'There is no company work currently confirmed under development.')
                  : t('이 분야에 정리된 내용이 없습니다.', 'There is no work listed in this area yet.')}
              </li>}
              </ol>
            </div>
          </section>
        )}

        {entry.slug === 'freelance-design' && <section className="sj-design-case-links" aria-labelledby="design-cases-heading">
          <header><h2 id="design-cases-heading">{t('디자인 작업', 'Design work')}</h2>
            <p>{t('개인 프로젝트와 시안을 함께 정리했습니다. 실제 적용·유료 납품 작업과는 구분합니다.', 'Personal projects and prototypes, separate from client deliveries or confirmed production work.')}</p></header>
          <div>{['one-to-z', 'designgraphy'].map(slug => {
            const work = selectedWorks.find(item => item.slug === slug);
            if (!work) return null;
            return <Link to={`/portfolio/${work.slug}`} key={work.slug} className="sj-design-case-link">
              <span><strong>{work.title}</strong><span>{work.summary[language]}</span><small>{work.output[language]}</small></span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>;
          })}</div>
        </section>}

        {entry.ventures && (
          <section className="mt-12 grid gap-8 border-t border-[var(--line)] pt-8 sm:mt-16 sm:grid-cols-[190px_minmax(0,1fr)] sm:gap-12" aria-labelledby="career-ventures-heading">
            <h2 id="career-ventures-heading" className="text-base font-bold text-[var(--ink)]">{t('운영한 사업', 'Businesses operated')}</h2>
            <div className="divide-y divide-[var(--career-line)] border-y border-[var(--career-line)]">
              {entry.ventures.map((venture) => (
                <article key={venture.name} className="py-5 sm:py-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <img src={venture.logo} alt="" aria-hidden="true" className="size-12 shrink-0 rounded-lg border border-[var(--line)] bg-white object-contain p-1" />
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-[var(--ink)] sm:text-xl">{venture.name}</h3>
                        <p className="mt-1 text-sm font-semibold text-[var(--brand-accent)]">{venture.field[language]}</p>
                      </div>
                    </div>
                    <span className="rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-[var(--muted-copy)]">{venture.statusText[language]}</span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--body-copy)]">{venture.summary[language]}</p>
                  <p className="mt-3 inline-flex items-baseline gap-2 rounded-md bg-[var(--hero-surface)] px-3 py-2 text-sm text-[var(--body-copy)]">
                    <span>{t('운영 당시', 'At the time')}</span>
                    <strong className="text-base font-bold text-[var(--brand-accent)]">{language === 'ko' ? `${venture.members.toLocaleString()}명 규모` : `${venture.members.toLocaleString()} members`}</strong>
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        <Link to={backPath} className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)]">
          {fromWorkTab ? t('작업 탭으로 돌아가기', 'Back to work') : t('다른 경력도 보기', 'Explore other roles')}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
