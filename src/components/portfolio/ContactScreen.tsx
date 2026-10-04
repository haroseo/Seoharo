import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Link } from '../router';

export default function ContactScreen() {
  const { t } = useLanguage();

  return (
    <section className="sj-contact-page sj-container">
      <div className="sj-contact-intro">
        <span className="sj-eyebrow">{t('작업 안내', 'Work')}</span>
        <h1>{t('프로젝트와 작업 과정을 살펴보세요.', 'Explore the projects and process.')}</h1>
        <p>{t('각 프로젝트의 배경과 맡은 역할, 공개된 결과물을 포트폴리오에서 확인할 수 있습니다.', 'The portfolio includes project context, roles, and publicly available outcomes.')}</p>
        <div className="sj-contact-topics">
          <span>{t('기획', 'Planning')}</span>
          <span>{t('디자인', 'Design')}</span>
          <span>{t('개발', 'Development')}</span>
        </div>
      </div>

      <div className="sj-contact-links">
        <Link className="sj-button sj-button--primary" to="/portfolio">
          {t('프로젝트 보기', 'View projects')}<ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
