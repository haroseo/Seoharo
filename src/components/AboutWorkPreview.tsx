import { ArrowRight } from 'lucide-react';
import { selectedWorks } from '../data/portfolioContent';
import { Link } from './router';
import { useLanguage } from './LanguageContext';
import AboutReveal from './AboutReveal';

const previewWorks = ['one-to-z', 'designgraphy'].flatMap((slug) =>
  selectedWorks.filter((work) => work.slug === slug),
);

export default function AboutWorkPreview() {
  const { language, t } = useLanguage();
  return (
    <section id="about-work" tabIndex={-1} className="about-work-preview border-t border-zinc-900 px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="about-work-heading">
      <div className="mx-auto max-w-7xl">
        <AboutReveal className="about-work-intro">
          <div>
            <p className="text-xs font-semibold text-zinc-400">{t('이어서 볼 작업', 'Explore the work')}</p>
            <h2 id="about-work-heading" className="mt-3 text-2xl font-bold leading-snug text-white sm:text-3xl">{t('제가 만든 작업도 살펴보세요.', 'Take a look at what I have made.')}</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-300">{t('디자인 시안과 웹 프로젝트의 화면, 맡은 역할과 만든 과정을 담았습니다.', 'Explore design prototypes and web projects, with screens, my role and the process behind them.')}</p>
          </div>
          <Link to="/portfolio#projects" className="about-original-primary about-work-all inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-bold text-white">
            {t('포트폴리오 전체 보기', 'Explore the portfolio')} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </AboutReveal>
        <div className="about-work-grid mt-8">
          {previewWorks.map((work) => (
            <Link key={work.slug} to={`/portfolio/${work.slug}`} className="about-work-link group block min-w-0 rounded-lg">
              <div className="about-work-image overflow-hidden rounded-lg border border-white/10 bg-zinc-950">
                <img src={work.image} alt={work.imageAlt?.[language] ?? work.title} loading="lazy" decoding="async" />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-white">{work.title}</h3>
                <ArrowRight size={18} className="text-zinc-400 transition-colors group-hover:text-white" aria-hidden="true" />
              </div>
              <p className="mt-1.5 text-sm leading-6 text-zinc-400">{work.roles[language]}</p>
              <p className="mt-2 text-xs font-semibold text-zinc-300">{work.projectStatus === 'ongoing' ? t('진행 중 · 화면과 과정 보기', 'Ongoing · Explore screens and process') : t('디자인 시안 · 화면과 과정 보기', 'Design prototype · Explore screens and process')}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
