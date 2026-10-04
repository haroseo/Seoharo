import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Link } from '../router';
import { experiences, profile, skillGroups } from '../../data/portfolioContent';
import { ContactBanner } from './PortfolioUI';

export default function AboutPage() {
  const { language, t } = useLanguage();
  return <div className="sj-profile-page sj-about-page">
    <div className="sj-container">
      <header className="sj-about-profile-header">
        <span className="sj-profile-label">{t('프로필', 'PROFILE')}</span>
        <h1>{profile.koreanName}<span>{profile.name}</span></h1>
        <p className="sj-profile-headline">{profile.headline[language]}</p>
        <p>{profile.summary[language]}</p>
      </header>

      <div className="sj-about-profile-columns">
        <main>
          <section className="sj-profile-panel" aria-labelledby="experience-heading">
            <div className="sj-profile-panel-heading"><div><h2 id="experience-heading">{t('경력', 'Experience')}</h2><p>{t('지금까지 맡았던 역할과 그 안에서 한 일입니다.', 'Roles I have held and the work I did in them.')}</p></div></div>
            <div className="sj-profile-experience-list">
              {experiences.map((item) => <article className="sj-profile-experience" key={item.organization}>
                <div className="sj-experience-monogram" aria-hidden="true">{item.organization.slice(0, 1)}</div>
                <div><div className="sj-profile-experience-title"><h3>{item.organization}</h3><span>{item.status[language]}</span></div><strong>{item.role[language]}</strong><p className="sj-profile-period">{item.period[language]}</p><p>{item.description[language]}</p></div>
              </article>)}
            </div>
          </section>

          <section className="sj-profile-panel sj-about-current" aria-labelledby="restart-heading">
            <div className="sj-profile-panel-heading"><h2 id="restart-heading">{t('지금은 다시 시작하는 중입니다.', 'Starting again')}</h2></div>
            <p>{t('사업을 직접 시작하고 운영한 뒤 다른 사람에게 넘겼습니다. 그 과정에서 얻은 기획·디자인·팀 운영 경험을 다음 일에 이어가려 합니다.', 'I started and ran businesses before handing them over. I’m carrying what I learned about planning, design, and team leadership into my next work.')}</p>
            <p>{t('요즘은 AI를 활용해 아이디어를 실험하고, 개발·마케팅·디자인·기획 경험을 이어갈 다음 작업을 준비하고 있습니다.', 'I’m using AI to explore ideas and preparing what to make next with my experience in development, marketing, design, and planning.')}</p>
            <Link to="/portfolio" className="sj-profile-inline-link">{t('프로젝트 보기', 'Explore projects')}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </section>
        </main>

        <aside className="sj-profile-panel sj-about-skills" aria-labelledby="skills-heading">
          <div className="sj-profile-panel-heading"><h2 id="skills-heading">{t('관심 분야와 역량', 'Skills and interests')}</h2></div>
          <div className="sj-profile-skills">{skillGroups.map((group) => <div key={group.title.en}><h3>{group.title[language]}</h3><div>{group.items[language].map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}</div>
        </aside>
      </div>
    </div>
    <ContactBanner />
  </div>;
}
