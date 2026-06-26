import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from './router';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentPath, navigate } = useRouter();
  const { language, setLanguage, t } = useLanguage();

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
    return currentPath === path;
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-xl bg-black/75 backdrop-blur-2xl border border-zinc-900 rounded-full px-4 py-2 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-auto">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <img 
            src="/assets/seoharo-logo-round.png" 
            alt="SEOHARO" 
            className="w-7 h-7 object-cover rounded-full border border-zinc-850 bg-black" 
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
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`relative px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide cursor-pointer transition-colors ${
                  isLinkActive(item.path)
                    ? 'text-white'
                    : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                {isLinkActive(item.path) && (
                  <motion.div
                    layoutId="active-nav-capsule"
                    className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </div>
          <div className="h-3.5 w-px bg-zinc-850" />
          <button
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            className="px-2 py-0.5 border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-450 hover:text-white rounded-full text-[8px] font-bold tracking-wide cursor-pointer transition-all uppercase"
          >
            {language === 'ko' ? 'English' : '한국어'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-16 left-4 right-4 bg-black/95 backdrop-blur-3xl border border-zinc-900 rounded-3xl p-5 flex flex-col gap-3 shadow-[0_30px_60px_rgba(0,0,0,0.9)] pointer-events-auto md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-[13px] font-bold tracking-wide uppercase cursor-pointer transition-colors ${
                  isLinkActive(item.path)
                    ? 'bg-zinc-900 text-white border border-zinc-800'
                    : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-zinc-900 mt-2 flex justify-between items-center px-4">
              <span className="text-[11px] font-bold text-zinc-450 uppercase">{t('언어 설정', 'LANGUAGE')}</span>
              <button
                onClick={() => {
                  setLanguage(language === 'ko' ? 'en' : 'ko');
                  setIsOpen(false);
                }}
                className="px-3.5 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[11px] font-bold text-zinc-300 transition-colors cursor-pointer"
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
