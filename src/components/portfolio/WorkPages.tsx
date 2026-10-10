import { ArrowRight, ArrowUpRight, Search, X } from 'lucide-react';
import { Github } from './BrandIcons';
import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Link } from '../router';
import { archiveWorks, filterWorks, selectedWorks } from '../../data/portfolioContent';
import type { WorkCategory } from '../../data/portfolioContent';
import { ContactBanner, WorkCard, WorkVisual } from './PortfolioUI';
import { getDesignCaseStudy } from '../../data/designCaseStudies';
import { DesignScreenGallery } from './DesignScreenGallery';
import ReturnNavigation from '../ReturnNavigation';
import { projectEvidence } from '../../data/projectEvidence';

export function ProjectsPage({ initialCategory = 'all' }: { initialCategory?: WorkCategory | 'all' }) {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const works = filterWorks(category, query);
  const tabs: { id: WorkCategory | 'all'; label: string }[] = [{ id: 'all', label: t('전체', 'All') }, { id: 'design', label: t('디자인', 'Design') }, { id: 'development', label: t('개발', 'Development') }, { id: 'planning', label: t('기획', 'Planning') }];
  const archive = archiveWorks.filter((work) => (category === 'all' || work.category === category) && `${work.title} ${work.description[language]}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <><section className="sj-page-intro sj-container"><span className="sj-eyebrow">PROJECTS</span><h1>{t('프로젝트', 'Projects')}</h1><p>{t('기획·디자인·개발에 참여한 작업과 프로토타입을 정리했습니다.', 'Selected work and prototypes I planned, designed, or helped build.')}</p></section>
    <section className="sj-work-index sj-container" aria-label={t('프로젝트 목록', 'Project list')}><div className="sj-filter-toolbar"><div className="sj-filters" role="group" aria-label={t('프로젝트 분야 필터', 'Filter by field')}>{tabs.map((tab) => <button key={tab.id} type="button" aria-pressed={category === tab.id} onClick={() => setCategory(tab.id)}>{tab.label}</button>)}</div><div className="sj-search"><Search size={17} aria-hidden="true" /><label className="sj-sr-only" htmlFor="work-search">{t('프로젝트 검색', 'Search projects')}</label><input id="work-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('이름, 역할, 키워드 검색', 'Search by name, role, keyword')} />{query && <button type="button" onClick={() => setQuery('')} aria-label={t('검색 지우기', 'Clear search')}><X size={16} /></button>}</div></div>
      <p className="sj-result-count" aria-live="polite">{t(`대표 작업 ${works.length}개 · 기록 ${archive.length}개`, `${works.length} selected works · ${archive.length} archive entries`)}</p>
      {works.length > 0 ? <div className="sj-work-grid">{works.map((work) => <WorkCard key={work.slug} work={work} index={selectedWorks.indexOf(work)} />)}</div> : <div className="sj-empty-state"><h2>{t('일치하는 대표 작업이 없습니다.', 'No selected work matches.')}</h2><p>{t('다른 검색어나 분야로 찾아보세요.', 'Try a different keyword or field.')}</p><button type="button" className="sj-button sj-button--primary" onClick={() => { setQuery(''); setCategory('all'); }}>{t('전체 작업 보기', 'See all work')}<ArrowRight size={16} /></button></div>}
      {archive.length > 0 && <div className="sj-archive"><div className="sj-section-head"><div><span className="sj-eyebrow">ARCHIVE</span><h2>{t('이전 작업', 'Past work')}</h2><p>{t('현재 운영 여부와 구분해 이전 작업으로 정리했습니다.', 'Listed as past work, separate from current projects.')}</p></div></div>{archive.map((work) => <div className="sj-archive-row" key={work.title}><h3>{work.title}</h3><p>{work.description[language]}</p>{work.href ? <a href={work.href} target="_blank" rel="noopener noreferrer" aria-label={`${work.title} ${t('외부 링크 열기', 'open external link')}`}><ArrowUpRight size={20} /></a> : <span className="sj-archive-note">{t('기록', 'Archive')}</span>}</div>)}</div>}
    </section><ContactBanner /></>;
}

export function ProjectDetail({ slug }: { slug: string }) {
  const { language, t } = useLanguage();
  const work = selectedWorks.find((item) => item.slug === slug);
  if (!work) return <MissingPage />;
  const next = selectedWorks[(selectedWorks.indexOf(work) + 1) % selectedWorks.length];
  const study = getDesignCaseStudy(slug);
  const evidence = projectEvidence.find(item => item.slug === slug);
  return (
    <article className="sj-project-detail sj-container">
      <ReturnNavigation className="sj-back-link" />
      <header className="sj-detail-header">
        <span className="sj-eyebrow">{work.eyebrow}</span>
        <h1>{work.headline[language]}</h1>
        <p>{work.summary[language]}</p>
        <dl className="sj-project-facts">
          <div><dt>PROJECT</dt><dd>{work.title}</dd></div>
          <div><dt>{t('참여한 일', 'CONTRIBUTION')}</dt><dd>{work.roles[language]}</dd></div>
          <div><dt>{t('작업', 'OUTPUT')}</dt><dd>{work.output[language]}</dd></div>
        </dl>
        {study && <nav className="sj-detail-actions" aria-label={t('작업 내 이동', 'Case study sections')}>
          <a href="#project-notes" className="sj-button sj-button--outline">{t('작업 요약', 'Work summary')}</a>
          <a href="#design-screens-heading" className="sj-button sj-button--primary">{t(`전체 화면 ${study.screens.length}개 보기`, `See all ${study.screens.length} screens`)}<ArrowRight size={16} aria-hidden="true" /></a>
        </nav>}
      </header>
      {!study && !evidence && <WorkVisual key={work.slug} work={work} priority />}
      <section id="project-notes" tabIndex={-1} className="sj-case-notes scroll-mt-20" aria-labelledby="project-notes-heading">
        <h2 id="project-notes-heading">{t('작업에 담은 생각.', 'Thinking behind the work.')}</h2>
        <div>
          {work.notes.map((note, index) => <section key={note.title.en}>
            <span className="sj-caption">0{index + 1}</span>
            <h3>{note.title[language]}</h3><p>{note.body[language]}</p>
          </section>)}
          <p className="sj-case-note">{t('개인 프로젝트 기록입니다. 공개 링크의 현재 서비스 상태는 달라질 수 있습니다.', 'Personal project archive. The current availability of linked services may vary.')}</p>
          <div className="sj-detail-actions">
            {work.href && <a href={work.href} target="_blank" rel="noopener noreferrer" className="sj-button sj-button--primary">{t('프로젝트 열기', 'Open project')}<ArrowUpRight size={18} aria-hidden="true" /></a>}
            {work.github && <a href={work.github} target="_blank" rel="noopener noreferrer" className="sj-button sj-button--outline"><Github size={17} />{t('코드 살펴보기', 'Explore the code')}</a>}
          </div>
        </div>
      </section>
      {study && <DesignScreenGallery study={study} />}
      {evidence && <section id="project-evidence" tabIndex={-1} data-project-evidence={work.slug} className="sj-project-evidence scroll-mt-20" aria-labelledby="project-evidence-heading">
        <header>
          <p className="sj-caption">{t('공개 서비스 화면', 'Public service interface')} · {evidence.capturedOn}</p>
          <h2 id="project-evidence-heading">{evidence.title[language]}</h2>
          <p>{evidence.description[language]}</p>
        </header>
        <figure>
          <img src={evidence.image} alt={`${work.title} · ${evidence.title[language]}`} width={evidence.width} height={evidence.height} loading="lazy" decoding="async" draggable={false} />
          <figcaption>{t('실제 공개 화면의 미리보기입니다. 현재 서비스는 달라질 수 있으며, 사용자 수나 운영 성과를 증명하는 자료는 아닙니다.', 'A preview captured from the public interface. The live service may change; this image does not establish user counts or business outcomes.')}</figcaption>
        </figure>
      </section>}
      <Link to={`/portfolio/${next.slug}`} className="sj-next-project"><div><span className="sj-eyebrow">NEXT PROJECT</span><h2>{next.title}</h2></div><ArrowRight size={30} aria-hidden="true" /></Link>
    </article>
  );
}

export function MissingPage() {
  const { t } = useLanguage();
  return <section className="sj-not-found sj-container"><span className="sj-eyebrow">404 / A DIFFERENT PATH</span><h1>{t('아직 없는 페이지입니다.', 'This page is not here yet.')}</h1><p>{t('프로젝트 목록에서 다른 이야기를 찾아보세요.', 'Discover another story in my projects.')}</p><Link to="/portfolio" className="sj-button sj-button--primary">{t('프로젝트 보러 가기', 'Explore my projects')}<ArrowRight size={18} /></Link></section>;
}
