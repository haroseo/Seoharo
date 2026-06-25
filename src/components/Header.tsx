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
    { label: t('소개', 'About'), path: '/about' },
    { label: t('포트폴리오', 'Portfolio'), path: '/portfolio' },
    { label: t('챗봇', 'Chat'), path: '/chat' },
    { label: t('연락처', 'Contact'), path: '/contact' },
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
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-5xl bg-black/75 backdrop-blur-2xl border border-zinc-900 rounded-full px-12 py-5.5 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-auto">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <img 
            src="/assets/seoharo-logo-round.png" 
            alt="SEOHARO" 
            className="w-11 h-11 object-cover rounded-full border border-zinc-850 bg-black" 
          />
          <div className="flex flex-col">
            <button
              onClick={() => navigate('/about')}
              className="text-left text-sm sm:text-base font-bold tracking-[0.25em] uppercase text-white hover:text-zinc-200 transition-colors cursor-pointer"
            >
              SEOHARO
            </button>
            <p className="text-[8.5px] uppercase tracking-[0.25em] text-zinc-500 font-mono">
              DESIGN & DEV
            </p>
          </div>
        </div>

        {/* Desktop Nav Items & Language Toggle */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`relative px-4.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.2em] font-mono cursor-pointer transition-colors ${
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
          <div className="h-4 w-px bg-zinc-800" />
          <button
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            className="px-4 py-1.5 border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-full text-[9px] font-mono font-bold tracking-widest cursor-pointer transition-all uppercase"
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
            className="absolute top-18 left-4 right-4 bg-black/95 backdrop-blur-3xl border border-zinc-900 rounded-3xl p-5 flex flex-col gap-3 shadow-[0_30px_60px_rgba(0,0,0,0.9)] pointer-events-auto md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-bold font-mono tracking-[0.2em] uppercase cursor-pointer transition-colors ${
                  isLinkActive(item.path)
                    ? 'bg-zinc-900 text-white border border-zinc-800'
                    : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-zinc-900 mt-2 flex justify-between items-center px-4">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">{t('언어 설정', 'LANGUAGE')}</span>
              <button
                onClick={() => {
                  setLanguage(language === 'ko' ? 'en' : 'ko');
                  setIsOpen(false);
                }}
                className="px-3.5 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-mono font-bold text-zinc-300 transition-colors cursor-pointer"
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
