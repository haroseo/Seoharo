interface ProjectCoverProps {
  slug: string;
  title: string;
  language: 'ko' | 'en';
  compact?: boolean;
}

export function ProjectCover({ slug, title, language, compact = false }: ProjectCoverProps) {
  if (slug === 'designgraphy') {
    return (
      <div className={`sj-designgraphy${compact ? ' sj-designgraphy--compact' : ''}`} aria-label={language === 'ko' ? '디자인그래피 프로젝트 커버' : 'Designgraphy project cover'}>
        <div className="sj-dg-top"><span>DESIGNGRAPHY</span><span>REFERENCE ARCHIVE</span></div>
        <div className="sj-dg-title">Find <i>your</i><br />reference.<span className="sj-dg-asterisk" aria-hidden="true">✳</span></div>
        <div className="sj-dg-swatches" aria-hidden="true"><span /><span /><span /><span /></div>
        <div className="sj-dg-bottom"><span>Design, organized.</span><span>WEB PROTOTYPE</span></div>
      </div>
    );
  }

  if (slug === 'planor') {
    return (
      <div className={`sj-project-cover sj-project-cover--planor${compact ? ' sj-project-cover--compact' : ''}`} role="img" aria-label={language === 'ko' ? 'Planor 일정 관리 프로젝트 커버' : 'Planor planning project cover'}>
        <span className="sj-planor-label">PLANOR</span>
        <strong>{language === 'ko' ? '계획을\n한눈에.' : 'See your\nplans clearly.'}</strong>
        <span className="sj-planor-rule" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span>
      </div>
    );
  }

  if (slug === 'naratmalsami') {
    return (
      <div className={`sj-project-cover sj-project-cover--naratmalsami${compact ? ' sj-project-cover--compact' : ''}`} role="img" aria-label={title}>
        <strong lang={language === 'ko' ? 'ko' : 'en'}>나랏말싸미</strong>
      </div>
    );
  }

  return null;
}
