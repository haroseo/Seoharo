import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Link } from '../router';
import { experiences, profile, selectedWorks, skillGroups } from '../../data/portfolioContent';
import { WorkCard } from './PortfolioUI';

export default function HomePage() {
  const { language, t } = useLanguage();
  return (
    <div className="sj-profile-page">
      <div className="sj-container">
        <section className="sj-profile-card" aria-labelledby="profile-heading">
          <div className="sj-profile-cover"><span>WORK ARCHIVE <span>·</span> SELECTED WORK</span><span>PROJECTS</span></div>
          <div className="sj-profile-card-body">
            <div className="sj-profile-identity">
              <span className="sj-profile-label">{t('작업 모음', 'WORK ARCHIVE')}</span>
              <h1 id="profile-heading">{profile.koreanName}</h1>
              <p className="sj-profile-headline">{profile.headline[language]}</p>
            </div>
            <div className="sj-profile-actions">
              <Link to="/portfolio" className="sj-button sj-button--primary">{t('프로젝트 보기', 'View projects')}<ArrowUpRight size={17} aria-hidden="true" /></Link>
              <Link to="/about" className="sj-button sj-button--outline">{t('경험 보기', 'View experience')}</Link>
            </div>
          </div>
        </section>

        <div className="sj-profile-columns">
          <main className="sj-profile-main">
            <section className="sj-profile-panel" aria-labelledby="profile-about-heading">
              <div className="sj-profile-panel-heading"><h2 id="profile-about-heading">{t('소개', 'About')}</h2><span>01</span></div>
              <p className="sj-profile-summary">{profile.summary[language]}</p>
              <Link to="/about" className="sj-profile-inline-link">{t('경험과 일하는 방식', 'Experience and how I work')}<ArrowUpRight size={16} aria-hidden="true" /></Link>
            </section>

            <section className="sj-profile-panel" aria-labelledby="profile-featured-heading">
              <div className="sj-profile-panel-heading"><div><h2 id="profile-featured-heading">{t('대표 프로젝트', 'Featured projects')}</h2><p>{t('직접 기획하거나 만들며 참여한 작업입니다.', 'Selected work I planned, designed, or helped build.')}</p></div><Link to="/portfolio" aria-label={t('모든 프로젝트 보기', 'View all projects')}><ArrowUpRight size={19} aria-hidden="true" /></Link></div>
              <div className="sj-work-grid sj-profile-work-grid">{selectedWorks.map((work, index) => <WorkCard key={work.slug} work={work} index={index} />)}</div>
            </section>

            <section className="sj-profile-panel" aria-labelledby="profile-experience-heading">
              <div className="sj-profile-panel-heading"><div><h2 id="profile-experience-heading">{t('경력', 'Experience')}</h2><p>{t('맡았던 역할과 현재 상태를 함께 적었습니다.', 'Roles, contributions, and current status.')}</p></div><Link to="/about" aria-label={t('경력 전체 보기', 'View full profile')}><ArrowUpRight size={19} aria-hidden="true" /></Link></div>
              <div className="sj-profile-experience-list">
                {experiences.map((item) => <article className="sj-profile-experience" key={item.organization}>
                  <div className="sj-experience-monogram" aria-hidden="true">{item.organization.slice(0, 1)}</div>
                  <div><div className="sj-profile-experience-title"><h3>{item.organization}</h3><span>{item.status[language]}</span></div><strong>{item.role[language]}</strong><p className="sj-profile-period">{item.period[language]}</p><p>{item.description[language]}</p></div>
                </article>)}
              </div>
            </section>
          </main>

          <aside className="sj-profile-sidebar" aria-label={t('추가 프로필 정보', 'More profile details')}>
            <section className="sj-profile-panel sj-profile-current" aria-labelledby="profile-current-heading">
              <div className="sj-profile-panel-heading"><h2 id="profile-current-heading">{t('현재', 'Now')}</h2><span className="sj-current-indicator" /></div>
              <p>{t('이전 사업을 다른 사람에게 넘기고, 지금은 처음부터 다시 실력을 쌓으며 새 프로젝트를 준비하고 있습니다.', 'I handed over my previous businesses. Now I’m rebuilding my skills and preparing what to make next.')}</p>
              <Link to="/about" className="sj-profile-inline-link">{t('지금의 이야기', 'Read my story')}<ArrowUpRight size={16} aria-hidden="true" /></Link>
            </section>

            <section className="sj-profile-panel" aria-labelledby="profile-skills-heading">
              <div className="sj-profile-panel-heading"><h2 id="profile-skills-heading">{t('관심 분야와 역량', 'Skills and interests')}</h2></div>
              <div className="sj-profile-skills">{skillGroups.map((group) => <div key={group.title.en}><h3>{group.title[language]}</h3><div>{group.items[language].map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}</div>
            </section>

          </aside>
        </div>
      </div>
    </div>
  );
}
