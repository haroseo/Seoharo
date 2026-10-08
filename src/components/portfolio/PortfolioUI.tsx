import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Link } from '../router';
import type { SelectedWork } from '../../data/portfolioContent';
import { ProjectCover } from './ProjectCover';

export function WorkVisual({ work, priority = false }: { work: SelectedWork; priority?: boolean }) {
  const { language, t } = useLanguage();
  const [imageFailed, setImageFailed] = useState(false);
  const projectCover = <ProjectCover slug={work.slug} title={work.title} language={language} />;
  return (
    <div className={`sj-work-visual sj-work-visual--${work.theme}${work.imagePresentation === 'screen' ? ' sj-work-visual--screen' : ''}`}>
      {work.image && !imageFailed ? (
        <img src={work.image} alt={work.imageAlt?.[language] ?? work.title} loading={priority ? 'eager' : 'lazy'} decoding="async" width="1024" height="1024" onError={() => setImageFailed(true)} />
      ) : projectCover ?? (
        <div className="sj-image-fallback"><strong>{work.title}</strong><span>{work.eyebrow}</span></div>
      )}
      <span className="sj-visual-label">{t('프로젝트 커버', 'PROJECT COVER')}</span>
    </div>
  );
}

export function WorkCard({ work, index }: { work: SelectedWork; index: number }) {
  const { language, t } = useLanguage();
  return (
    <article className="sj-work-card">
      <Link to={`/portfolio/${work.slug}`} className="sj-work-card-link" aria-label={`${work.title} ${t('프로젝트 자세히 보기', 'project details')}`}>
        <WorkVisual work={work} />
        <div className="sj-work-card-info">
          <div className="sj-work-card-top"><span className="sj-caption">{String(index + 1).padStart(2, '0')} / {work.eyebrow}</span><ArrowUpRight size={22} aria-hidden="true" /></div>
          <h3>{work.title}</h3><p>{work.summary[language]}</p>
          {work.projectStatus === 'ongoing'
            ? <span className="sj-work-prototype-label">{t('진행 중', 'Ongoing')}</span>
            : work.status === 'prototype' && <span className="sj-work-prototype-label">{t('프로토타입', 'Prototype')}</span>}
          <span className="sj-work-role">{work.roles[language]}</span>
        </div>
      </Link>
    </article>
  );
}

export function ContactBanner() {
  const { t } = useLanguage();
  return (
    <section className="sj-contact-banner sj-container" aria-labelledby="contact-banner-heading">
      <div><span className="sj-eyebrow">CONTACT</span><h2 id="contact-banner-heading">{t('편하게 연락해주세요.', 'Get in touch.')}</h2><p>{t('기획·디자인·개발 관련 이야기와 협업 제안을 기다립니다.', 'I’m open to conversations and collaboration around planning, design, and development.')}</p></div>
      <Link to="/contact" className="sj-button sj-button--ink">{t('연락하기', 'Contact')}<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </section>
  );
}

export function TextLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link to={to} className="sj-text-link">{children}<ArrowRight size={18} aria-hidden="true" /></Link>;
}
