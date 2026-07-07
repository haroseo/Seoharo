import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from './router';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentPath, navigate } = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { bgTheme, setBgTheme } = useTheme();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { label: 'ABOUT', path: '/about' },
    { label: 'PORTFOLIO', path: '/portfolio' },
    { label: 'CHAT', path: '/chat' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const isLinkActive = (path: string) => {
    if (path === '/about') {
      return currentPath === '/' || currentPath === '/about';
    }
    if (path === '/portfolio') {
      return ['/portfolio', '/design', '/marketing', '/development'].includes(currentPath);
    }
    return currentPath === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-black/60 backdrop-blur-md border-b border-white/5 py-3 px-6 sm:px-8 shadow-sm">
      <div className="mx-auto max-w-7xl w-full flex items-center justify-between">
        
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
              DESIGN & DEV
            </p>
          </div>
        </div>

        {/* Desktop Nav Items & Language Toggle */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`relative px-3 py-1 text-[11px] font-bold uppercase tracking-wide cursor-pointer transition-colors ${
                  isLinkActive(item.path)
                    ? 'text-white'
                    : 'text-zinc-500 hover:text-zinc-200'
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
          
          {/* Minimalist Background Theme Switcher Dots */}
          <div className="flex items-center gap-1.5 px-1">
            {[
              { id: 'solid', label: t('솔리드', 'Solid') },
              { id: 'grid', label: t('그리드', 'Grid') },
              { id: 'dots', label: t('도트', 'Dots') },
              { id: 'noise', label: t('노이즈', 'Noise') },
              { id: 'aurora', label: t('오로라', 'Aurora') }
            ].map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setBgTheme(themeOption.id as any)}
                title={themeOption.label}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  bgTheme === themeOption.id
                    ? 'bg-white scale-110 shadow-[0_0_6px_rgba(255,255,255,0.4)]'
                    : 'bg-white/15 hover:bg-white/40'
                }`}
                aria-label={`Switch to ${themeOption.label} background`}
              />
            ))}
          </div>

          <div className="h-3 w-px bg-white/10" />
          <button
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            className="px-2.5 py-1 border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-lg text-[8px] font-bold tracking-wide cursor-pointer transition-all uppercase"
          >
            {language === 'ko' ? 'English' : '한국어'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-450 hover:text-white transition-colors cursor-pointer"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-14 left-4 right-4 bg-zinc-950/95 border border-white/5 rounded-2xl p-5 flex flex-col gap-3 shadow-[0_30px_60px_rgba(0,0,0,0.5)] pointer-events-auto md:hidden"
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
            {/* Mobile Background Theme Picker */}
            <div className="pt-3.5 border-t border-white/5 mt-1 flex justify-between items-center px-4">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{t('배경 테마', 'BACKGROUND')}</span>
              <div className="flex items-center gap-2">
                {[
                  { id: 'solid', label: t('솔리드', 'Solid') },
                  { id: 'grid', label: t('그리드', 'Grid') },
                  { id: 'dots', label: t('도트', 'Dots') },
                  { id: 'noise', label: t('노이즈', 'Noise') },
                  { id: 'aurora', label: t('오로라', 'Aurora') }
                ].map((themeOption) => (
                  <button
                    key={themeOption.id}
                    onClick={() => setBgTheme(themeOption.id as any)}
                    title={themeOption.label}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      bgTheme === themeOption.id
                        ? 'bg-white scale-110'
                        : 'bg-white/20'
                    }`}
                    aria-label={`Switch to ${themeOption.label} background`}
                  />
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 mt-1 flex justify-between items-center px-4">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{t('언어 설정', 'LANGUAGE')}</span>
              <button
                onClick={() => {
                  setLanguage(language === 'ko' ? 'en' : 'ko');
                  setIsOpen(false);
                }}
                className="px-3.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-zinc-300 transition-colors cursor-pointer"
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
