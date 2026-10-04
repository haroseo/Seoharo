import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Link } from './router';
import { careerEntries, careerGroups } from '../data/portfolioContent';

const works = [
  {
    number: '01',
    title: 'RGBdom',
    kind: { ko: '컬러 도구', en: 'Color tool' },
    description: {
      ko: '색을 만들고 조합을 살펴볼 수 있는 컬러 도구입니다.',
      en: 'A small color tool for exploring and combining colors.',
    },
    href: 'https://designs.kro.kr/',
  },
  {
    number: '02',
    title: 'Planor',
    kind: { ko: '시간 기록 · 계획', en: 'Time & planning' },
    description: {
      ko: '공부·업무·휴식 시간을 기록하고 계획을 정리하는 웹 앱입니다.',
      en: 'A web app for tracking study, work, and rest and organizing plans.',
    },
    href: 'https://planor.kro.kr/',
  },
  {
    number: '03',
    title: '나랏말싸미',
    kind: { ko: '한글 타자 연습', en: 'Hangul typing' },
    description: {
      ko: '시와 글을 입력하며 타수와 정확도를 확인하는 타자 연습 서비스입니다.',
      en: 'A typing practice service that measures speed and accuracy as you type.',
    },
    href: 'https://훈민정음.kro.kr/',
  },
  {
    number: '04',
    title: 'Cokform',
    kind: { ko: '폼 제작 도구', en: 'Form builder' },
    description: {
      ko: '행사·교육·커뮤니티 신청 폼을 만들고 접수를 받는 웹 서비스입니다.',
      en: 'A web service for creating registration forms for events and communities.',
    },
    href: 'https://cokform.pages.dev/',
  },
];

export default function HomeContent() {
  const { language, t } = useLanguage();

  return (
    <>
      <section id="selected-work" className="border-t border-[var(--line)] bg-white px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <header className="max-w-sm">
            <p className="text-sm font-semibold text-[var(--brand-accent)]">{t('작업', 'Work')}</p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-[var(--ink)]">
              {t('프로젝트', 'Projects')}
            </h2>
            <p className="mt-3 text-base leading-7 text-[var(--body-copy)]">
              {t('기획하고 직접 만든 웹 프로젝트를 모았습니다.', 'Web projects I planned and built.')}
            </p>
          </header>

          <ol className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {works.map((work) => (
              <li key={work.number}>
                <a
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid min-h-[116px] grid-cols-[2.25rem_minmax(0,1fr)_auto] items-start gap-3 py-5 transition-colors focus-visible:outline-offset-4 sm:grid-cols-[3.5rem_minmax(0,1fr)_9rem_auto] sm:items-center sm:gap-5 sm:py-6"
                >
                  <span className="pt-1 text-xs font-semibold tabular-nums text-[var(--muted-copy)] sm:pt-0">{work.number}</span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--brand-accent)] sm:text-xl">
                      {work.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-6 text-[var(--body-copy)]">{work.description[language]}</p>
                  </div>
                  <span className="col-start-2 row-start-2 mt-1 text-xs font-medium text-[var(--muted-copy)] sm:col-start-3 sm:row-start-1 sm:mt-0">
                    {work.kind[language]}
                  </span>
                  <ArrowUpRight className="col-start-3 row-start-1 mt-1 text-[var(--muted-copy)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--brand-accent)] sm:col-start-4 sm:row-start-1 sm:mt-0" size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--career-surface)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <header className="max-w-sm">
            <p className="text-sm font-semibold text-[var(--brand-accent)]">{t('경력', 'Career')}</p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-[var(--ink)]">
              {t('해온 일', 'Work so far')}
            </h2>
            <p className="mt-3 text-base leading-7 text-[var(--body-copy)]">
              {t('회사 업무와 프리랜서 디자인, 사업 운영, 동아리 경험을 분류별로 정리했습니다.', 'Company work, freelance design, business operations, and club experience, organized by category.')}
            </p>
            <Link to="/career" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)]">
              {t('경력 전체 보기', 'View all career')}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </header>

          <ol className="divide-y divide-[var(--career-line)] border-y border-[var(--career-line)]">
            {careerGroups.map((group, index) => {
              const entry = careerEntries.find((item) => item.group === group.id);
              if (!entry) return null;
              return (
              <li key={entry.slug}>
                <Link
                  to={`/career/group/${group.id}`}
                  className="group grid min-h-[104px] grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 py-5 transition-colors hover:bg-white/70 focus-visible:outline-offset-2 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-5 sm:px-3"
                >
                  <span className="text-xs font-semibold tabular-nums text-[var(--muted-copy)]">0{index + 1}</span>
                  <span className="min-w-0">
                    <span className="block text-lg font-bold text-[var(--ink)] transition-colors group-hover:text-[var(--brand-accent)] sm:text-xl">
                      {group.label[language]}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-[var(--body-copy)]">
                      {entry.role[language]}
                    </span>
                  </span>
                  <ArrowUpRight className="text-[var(--brand-accent)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={19} aria-hidden="true" />
                </Link>
              </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
