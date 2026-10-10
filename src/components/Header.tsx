import { useEffect, useRef, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, useRouter } from './router';
import { useLanguage } from './LanguageContext';
import { getPrimaryNavigationPath, primaryNavigation } from '../data/portfolioRoutes';
import SiteSearchDialog from './SiteSearchDialog';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { currentPath } = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const activePath = getPrimaryNavigationPath(currentPath);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    requestAnimationFrame(() => searchButtonRef.current?.focus());
  };

  const toggleLanguage = () => setLanguage(language === 'ko' ? 'en' : 'ko');

  const languageControl = (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t('언어를 영어로 바꾸기', 'Switch language to Korean')}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2.5 text-sm font-semibold text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2"
    >
      {language === 'ko' ? 'EN' : '한국어'}
    </button>
  );

  const searchControl = (
    <button
      ref={searchButtonRef}
      type="button"
      onClick={() => isSearchOpen ? closeSearch() : setIsSearchOpen(true)}
      aria-label={isSearchOpen ? t('검색 닫기', 'Close search') : t('사이트 검색', 'Search this site')}
      aria-expanded={isSearchOpen}
      aria-controls={isSearchOpen ? 'site-search-dialog' : undefined}
      className="inline-flex size-11 items-center justify-center rounded-md text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2"
    >
      {isSearchOpen ? <X size={18} aria-hidden="true" /> : <Search size={18} aria-hidden="true" />}
    </button>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#090a0c]/95 text-white backdrop-blur-sm">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--ink)] focus:shadow-lg">
        {t('본문으로 바로가기', 'Skip to content')}
      </a>
      <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:gap-3 sm:px-8 lg:px-10">
        <Link
          to="/"
          onClick={handleNavClick}
          aria-label={t('서주원 소개', 'Seo Juwon About')}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm text-white focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2 hover:text-white/75 sm:gap-2.5"
        >
          <span className="relative block size-8 shrink-0 overflow-hidden sm:size-9">
            <img src="/assets/juwon-mark.svg" alt="" aria-hidden="true" width="36" height="36" className="sj-header-mark size-full object-contain" />
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className="text-sm font-bold tracking-normal">{t('서주원', 'Seo Juwon')}</span>
            <span className="mt-0.5 text-[10px] font-medium text-white/65">Creative entrepreneur</span>
          </span>
        </Link>

        <nav aria-label={t('주 메뉴', 'Main navigation')} className="hidden items-center gap-6 md:flex">
          {primaryNavigation.map((item) => {
            const active = activePath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                aria-current={active ? 'page' : undefined}
                className={`relative inline-flex min-h-14 items-center border-b-2 border-transparent px-0 pt-0.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2 ${active ? 'font-semibold text-white' : 'font-medium text-white/65 hover:text-white'}`}
              >
                <span className="relative inline-flex">
                  <span className="relative z-10">{t(item.label.ko, item.label.en)}</span>
                  {active && (
                    <motion.span
                      layoutId={shouldReduceMotion ? undefined : 'active-primary-navigation-indicator'}
                      aria-hidden="true"
                      className="absolute inset-x-0 top-full mt-1 h-0.5 rounded-full bg-white"
                      transition={{ duration: shouldReduceMotion ? 0 : 0.21, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-0.5">
          <div className="flex items-center gap-0.5">
            {searchControl}
            {languageControl}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? t('메뉴 닫기', 'Close menu') : t('메뉴 열기', 'Open menu')}
              aria-expanded={isMenuOpen}
              aria-controls={isMenuOpen ? 'mobile-navigation' : undefined}
              className="inline-flex size-11 items-center justify-center rounded-md text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2 md:hidden"
            >
              {isMenuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav id="mobile-navigation" aria-label={t('주 메뉴', 'Main navigation')} className="absolute inset-x-0 top-full border-y border-white/15 bg-[#090a0c] md:hidden">
          {primaryNavigation.map((item) => {
            const active = activePath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-12 items-center border-b border-white/10 px-5 py-3.5 text-sm focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-[-2px] ${active ? 'font-semibold text-white' : 'text-white/65 hover:text-white'}`}
              >
                {t(item.label.ko, item.label.en)}
              </Link>
            );
          })}
        </nav>
      )}
      {isSearchOpen && <SiteSearchDialog open={isSearchOpen} onClose={closeSearch} />}
    </header>
  );
}
