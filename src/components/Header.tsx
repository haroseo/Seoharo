import { useState, useRef, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { useRouter } from './router';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { useSearch } from './SearchContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { currentPath, navigate } = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { query, setQuery } = useSearch();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isPortfolio = ['/portfolio', '/design', '/marketing', '/development'].includes(currentPath);

  // Close search when leaving portfolio pages
  useEffect(() => {
    if (!isPortfolio) {
      setSearchOpen(false);
      setQuery('');
    }
  }, [currentPath, isPortfolio, setQuery]);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const navItems = [
    { label: 'ABOUT', path: '/about' },
    { label: 'PORTFOLIO', path: '/portfolio' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const isLinkActive = (path: string) => {
    if (path === '/about') return currentPath === '/' || currentPath === '/about';
    if (path === '/portfolio') return isPortfolio;
    return currentPath === path;
  };

  const toggleSearch = () => {
    if (searchOpen) {
      setQuery('');
      setSearchOpen(false);
    } else {
      setSearchOpen(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-black/60 backdrop-blur-md border-b border-white/5 shadow-sm">

      {/* Main Nav Row */}
      <div className="py-3 px-6 sm:px-8 mx-auto max-w-7xl w-full flex items-center justify-between">

        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <img
            src="/assets/seoharo-logo-round.png"
            alt="SEOHARO"
            className="w-7 h-7 object-cover rounded-full border border-white/10 bg-black"
          />
          <div className="flex flex-col">
            <button
              onClick={() => navigate('/about')}
              className="text-left text-xs font-bold tracking-[0.2em] uppercase text-white hover:text-zinc-200 transition-colors cursor-pointer"
            >
              SEOHARO
            </button>
            <p className="text-[7px] uppercase tracking-[0.1em] text-zinc-400 font-semibold">
              DESIGN &amp; DEV
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`relative px-3 py-1 text-[11px] font-bold uppercase tracking-wide cursor-pointer transition-colors ${
                  isLinkActive(item.path) ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                {isLinkActive(item.path) && (
                  <motion.div
                    layoutId="active-nav-underline"
                    className="absolute left-3 right-3 -bottom-1 h-0.5 bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </div>

          <div className="h-3 w-px bg-white/10" />

          {/* Search icon — portfolio 페이지일 때만 */}
          <AnimatePresence>
            {isPortfolio && (
              <motion.button
                key="search-btn"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onClick={toggleSearch}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  searchOpen
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
                aria-label="검색"
              >
                {searchOpen ? <X size={13} /> : <Search size={13} />}
              </motion.button>
            )}
          </AnimatePresence>

          <div className="h-3 w-px bg-white/10" />

          <button
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            className="px-2.5 py-1 border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-lg text-[8px] font-bold tracking-wide cursor-pointer transition-all uppercase"
          >
            {language === 'ko' ? 'English' : '한국어'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {isPortfolio && (
            <button
              onClick={toggleSearch}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                searchOpen
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-white/5 border-white/10 text-zinc-400'
              }`}
            >
              {searchOpen ? <X size={14} /> : <Search size={14} />}
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Search Bar Row — 포트폴리오 페이지 & searchOpen 시만 표시 */}
      <AnimatePresence>
        {isPortfolio && searchOpen && (
          <motion.div
            key="header-search"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/5"
          >
            <div className="px-6 sm:px-8 py-2.5 max-w-7xl mx-auto">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('프로젝트 검색 (제목 · 태그)', 'Search projects (title · tag)')}
                  className="w-full bg-white/5 border border-white/8 placeholder:text-zinc-600 text-white text-xs pl-8 pr-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-14 left-4 right-4 bg-zinc-950/95 border border-white/5 rounded-2xl p-5 flex flex-col gap-3 shadow-[0_30px_60px_rgba(0,0,0,0.5)] pointer-events-auto md:hidden z-50"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-[13px] font-bold tracking-wide uppercase cursor-pointer transition-colors ${
                  isLinkActive(item.path)
                    ? 'bg-white/5 text-white border border-white/10'
                    : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-white/5 mt-2 flex justify-between items-center px-4">
              <span className="text-[11px] font-bold text-zinc-400 uppercase">{t('언어 설정', 'LANGUAGE')}</span>
              <button
                onClick={() => {
                  setLanguage(language === 'ko' ? 'en' : 'ko');
                  setIsOpen(false);
                }}
                className="px-3.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-zinc-300 transition-colors cursor-pointer"
              >
                {language === 'ko' ? 'English' : '한국어'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
