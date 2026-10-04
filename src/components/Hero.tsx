import { ArrowRight } from 'lucide-react';
import { Link } from './router';
import { useLanguage } from './LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" aria-labelledby="hero-title" className="bg-[#090a0c] px-5 pb-16 pt-24 text-white sm:px-8 sm:pb-20 sm:pt-28 lg:px-10">
      <div className="mx-auto grid min-h-[min(760px,calc(100svh-4rem))] max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-white/65">{t('소개', 'About')}</p>
          <h1 id="hero-title" className="mt-5 text-[clamp(3.5rem,7.6vw,6.25rem)] font-bold leading-[1.08]">
            {t('서주원', 'Seo Juwon')}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
            {t(
              '디자인과 마케팅, 개발을 오가며 떠올린 생각을 실제 결과물로 만듭니다. 기획과 글로 방향을 정리하고, 필요한 사람들과 함께 실행합니다.',
              'I move between design, marketing, and development to turn ideas into real work. I shape the direction through planning and writing, then build with people.'
            )}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/portfolio"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--brand-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t('프로젝트 목록', 'Projects')}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              to="/career"
              className="inline-flex min-h-11 items-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t('경력 보기', 'Career')}
            </Link>
          </div>
        </div>

        <aside className="border-t border-white/20 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0" aria-label={t('소개 요약', 'Profile summary')}>
          <div className="flex items-center gap-5">
            <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#eef1f6] sm:h-24 sm:w-24">
              <img src="/assets/juwon-mark.png" alt="" className="absolute left-1/2 top-1/2 h-[180%] w-[180%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain" />
            </span>
            <p className="max-w-xs text-base font-semibold leading-7 sm:text-lg">Brand Designer • Marketer • Developer</p>
          </div>

          <dl className="mt-8 divide-y divide-white/15 border-y border-white/15">
            <div className="grid grid-cols-[5.25rem_1fr] gap-4 py-4 sm:grid-cols-[6rem_1fr]">
              <dt className="text-sm font-medium text-white/50">{t('분야', 'Fields')}</dt>
              <dd className="text-sm leading-6 text-white/85">{t('기획 · 브랜드 디자인 · 마케팅 · 개발', 'Planning · Brand design · Marketing · Development')}</dd>
            </div>
            <div className="grid grid-cols-[5.25rem_1fr] gap-4 py-4 sm:grid-cols-[6rem_1fr]">
              <dt className="text-sm font-medium text-white/50">{t('강점', 'Strengths')}</dt>
              <dd className="text-sm leading-6 text-white/85">{t('글쓰기 · 말하기 · 기획 · 팀 리딩', 'Writing · Speaking · Planning · Team leadership')}</dd>
            </div>
            <div className="grid grid-cols-[5.25rem_1fr] gap-4 py-4 sm:grid-cols-[6rem_1fr]">
              <dt className="text-sm font-medium text-white/50">{t('방식', 'Approach')}</dt>
              <dd className="text-sm leading-6 text-white/85">{t('생각을 시도하고, 결과물로 확인합니다.', 'Try an idea, then make it tangible.')}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
