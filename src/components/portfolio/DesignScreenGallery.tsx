import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import type { DesignCaseStudy } from '../../data/designCaseStudies';

export function DesignScreenGallery({ study }: { study: DesignCaseStudy }) {
  const { language, t } = useLanguage();
  return <section className="sj-screen-gallery" aria-labelledby="design-screens-heading">
    <header className="sj-screen-gallery-header">
      <p className="sj-caption">{study.source[language]}</p>
      <h2 id="design-screens-heading">{t('화면으로 보는 작업', 'The work, screen by screen')}</h2>
      <p>{study.disclaimer[language]}</p>
    </header>
    <nav className="sj-screen-index" aria-label={t('화면 바로가기', 'Jump to a screen')}>
      {(['web', 'mobile'] as const).map(format => {
        const screens = study.screens.filter(screen => screen.format === format);
        if (!screens.length) return null;
        return <div key={format}><h3>{format === 'web' ? t('웹', 'Web') : t('모바일', 'Mobile')} <span>{screens.length}</span></h3>
          <ol>{screens.map(screen => <li key={screen.id}><a href={`#screen-${screen.id}`}>{screen.title[language]}</a></li>)}</ol>
        </div>;
      })}
    </nav>
    {study.screens.map((screen, index) => <section id={`screen-${screen.id}`} data-design-screen={screen.id} className={`sj-screen-row sj-screen-row--${screen.format}`} aria-labelledby={`screen-title-${screen.id}`} key={screen.id}>
      <figure>
        <a href={screen.image} target="_blank" rel="noopener noreferrer" data-screen-original={screen.id} aria-label={t(`${screen.title.ko} 이미지 전체 보기 (새 창)`, `View the full ${screen.title.en} image (new tab)`)}>
          <img data-screen-image={screen.id} src={screen.image} alt={t(`${screen.title.ko} 전체 디자인 시안`, `${screen.title.en} full design prototype`)} width={screen.width} height={screen.height} loading="lazy" decoding="async" />
        </a>
        <figcaption>{screen.width} × {screen.height} · {t('이미지 전체 보기', 'Open full image')}<ArrowUpRight size={14} aria-hidden="true" /></figcaption>
      </figure>
      <div className="sj-screen-notes">
        <p className="sj-caption">{String(index + 1).padStart(2, '0')} / {screen.format === 'web' ? 'WEB' : 'MOBILE'}</p>
        <h3 id={`screen-title-${screen.id}`}>{screen.title[language]}</h3>
        <h4>{t('화면 해설', 'Screen notes')}</h4><p>{screen.function[language]}</p>
        <h4>{t('구성 이유 · 해석', 'Layout rationale · interpretation')}</h4><p>{screen.rationale[language]}</p>
        <a href="#design-screens-heading" className="sj-screen-back">{t('화면 목록으로', 'Back to screen index')} ↑</a>
      </div>
    </section>)}
  </section>;
}
