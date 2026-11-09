import { ArrowRight } from 'lucide-react';
import { selectedWorks } from '../data/portfolioContent';
import { aboutPublicWorkSlugs } from '../data/aboutContent';
import { Link } from './router';
import { useLanguage } from './LanguageContext';
import AboutReveal from './AboutReveal';

const previewWorks = ['one-to-z', 'designgraphy'].flatMap((slug) =>
  selectedWorks.filter((work) => work.slug === slug),
);

export default function AboutWorkPreview() {
  const { language, t } = useLanguage();
  const [formulaSlug, publicServicesSlug] = aboutPublicWorkSlugs;
  const projectLink = 'font-semibold text-white underline underline-offset-4 hover:text-zinc-200';
  return (
    <section id="about-work" tabIndex={-1} className="about-work-preview border-t border-zinc-900 px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="about-work-heading">
      <div className="mx-auto max-w-7xl">
        <AboutReveal className="about-work-intro">
          <div>
            <p className="text-xs font-semibold text-zinc-400">{t('이어서 볼 작업', 'Explore the work')}</p>
            <h2 id="about-work-heading" className="mt-3 text-2xl font-bold leading-snug text-white sm:text-3xl">{t('서주원이 만든 프로젝트', 'Projects by Seo Juwon')}</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-300">
              {t('수학·과학 공식 검색 사이트 ', 'I planned and built ')}
              <Link to={`/portfolio/${formulaSlug}/`} className={projectLink}>{t('공식집', 'FormulaZIP')}</Link>
              {t('과 공공서비스 안내 사이트 ', ', a school formula index, and ')}
              <Link to={`/portfolio/${publicServicesSlug}/`} className={projectLink}>K-00</Link>
              {t('을 기획하고 만들었습니다. 각 작업에서 맡은 역할과 실제 화면을 볼 수 있습니다.', ', a public-service directory. Each project shows what I did and what the site looks like.')}
            </p>
          </div>
          <Link to="/portfolio#projects" className="about-original-primary about-work-all inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-bold text-white">
            {t('포트폴리오 전체 보기', 'Explore the portfolio')} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </AboutReveal>
        <div className="about-work-grid mt-8">
          {previewWorks.map((work) => (
            <Link key={work.slug} to={`/portfolio/${work.slug}`} className="about-work-link group block min-w-0 rounded-lg">
              <div className={`about-work-image${work.imagePresentation === 'brand' ? ' about-work-image--brand' : ''} overflow-hidden rounded-lg border border-white/10 bg-zinc-950`}>
                <img src={work.image} alt={work.imageAlt?.[language] ?? work.title} loading="lazy" decoding="async" draggable={false} />
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
