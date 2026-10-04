import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Link, useRouter } from '../router';

export function PortfolioHeader() {
  const { t, language, setLanguage } = useLanguage();
  const { currentPath } = useRouter();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const links = [{ path: '/', label: t('프로필', 'Profile') }, { path: '/portfolio', label: t('프로젝트', 'Projects') }, { path: '/about', label: t('경력', 'Experience') }];
  function closeMenu() { setOpen(false); toggleRef.current?.focus(); }
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) { if (event.key === 'Escape') closeMenu(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  function active(path: string) {
    if (path === '/portfolio') return currentPath.startsWith('/portfolio') || ['/design', '/development', '/marketing'].includes(currentPath);
    return currentPath === path;
  }
  return (
    <header className="sj-header">
      <a className="sj-skip-link" href="#main-content">{t('본문으로 바로가기', 'Skip to content')}</a>
      <div className="sj-container sj-header-inner">
        <Link to="/" className="sj-brand" aria-label={t('작업 기록 홈', 'Work archive home')}><span>WORK ARCHIVE<span className="sj-brand-sub">작업 기록</span></span></Link>
        <nav aria-label={t('주요 메뉴', 'Main navigation')} className="sj-desktop-nav">
          {links.map((item) => <Link key={item.path} to={item.path} aria-current={active(item.path) ? 'page' : undefined}>{item.label}</Link>)}
        </nav>
        <div className="sj-header-actions">
          <button className="sj-language" type="button" aria-label={t('Switch to English', '한국어로 전환')} onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}>{language === 'ko' ? 'EN' : 'KO'}</button>
          <Link to="/contact" className="sj-header-contact">{t('연락하기', 'Get in touch')}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          <button ref={toggleRef} type="button" className="sj-menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? t('메뉴 닫기', 'Close menu') : t('메뉴 열기', 'Open menu')} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      {open && <nav id="mobile-navigation" className="sj-mobile-nav" aria-label={t('모바일 메뉴', 'Mobile navigation')}>
        {[...links, { path: '/contact', label: t('연락하기', 'Contact') }].map((item) => <Link key={item.path} to={item.path} aria-current={active(item.path) ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={18} aria-hidden="true" /></Link>)}
      </nav>}
    </header>
  );
}

export function PortfolioFooter() {
  const { t } = useLanguage();
  return (
    <footer className="sj-footer sj-container">
      <div className="sj-footer-top"><Link to="/" className="sj-footer-name">작업 기록</Link><p>{t('기획·디자인·개발 작업을 정리했습니다.', 'A selection of planning, design, and development work.')}</p></div>
      <div className="sj-footer-bottom"><span>© {new Date().getFullYear()} WORK ARCHIVE</span><span>PORTFOLIO</span><a href="#main-content" className="sj-top-link">{t('맨 위로', 'Back to top')} ↑</a></div>
    </footer>
  );
}
