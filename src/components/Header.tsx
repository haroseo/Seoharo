import { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Briefcase, User, Mail, Globe } from 'lucide-react';
import { useRouter } from './router';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentPath, navigate } = useRouter();
  const { language, setLanguage, t } = useLanguage();

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
    { label: t('소개', 'ABOUT'), path: '/', icon: User },
    { label: t('포트폴리오', 'PORTFOLIO'), path: '/portfolio', icon: Briefcase },
    { label: t('챗봇', 'CHAT'), path: '/chat', icon: MessageSquare },
    { label: t('연락처', 'CONTACT'), path: '/contact', icon: Mail },
  ];

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/' || currentPath === '/about';
    }
    if (path === '/portfolio') {
      return ['/portfolio', '/design', '/marketing', '/development'].includes(currentPath);
    }
    return currentPath === path;
  };

  return (
    <>
      {/* Desktop Floating Capsule Navigation */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl hidden md:block">
        <nav className="px-6 py-3 bg-[#0d0d11]/70 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
          {/* Logo / Brand */}
          <button 
            onClick={() => handleNavClick('/')}
            className="text-xs font-display font-black tracking-widest text-white hover:opacity-80 transition-opacity uppercase cursor-pointer"
          >
            SEOHARO
          </button>

          {/* Center Links */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const active = isLinkActive(item.path);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative px-4 py-1.5 rounded-full text-[10.5px] font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                    active ? 'text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-white rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
              className="p-2 bg-white/5 border border-white/10 hover:bg-white/15 text-zinc-300 hover:text-white rounded-full transition-all cursor-pointer flex items-center justify-center"
              title={language === 'ko' ? 'Change to English' : '한국어로 변경'}
            >
              <Globe size={13} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Sticky Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#07070a]/80 backdrop-blur-lg border-b border-white/5 px-6 py-4 flex items-center justify-between md:hidden">
        <button 
          onClick={() => handleNavClick('/')}
          className="text-xs font-display font-black tracking-widest text-white uppercase cursor-pointer"
        >
          SEOHARO
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            className="text-[10px] font-bold px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-zinc-300"
          >
            {language === 'ko' ? 'EN' : 'KO'}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-300 hover:text-white cursor-pointer"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Fullscreen Overlay Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-14 left-0 right-0 h-screen bg-[#07070a] border-t border-white/5 px-8 py-12 flex flex-col gap-6"
            >
              {navItems.map((item) => {
                const active = isLinkActive(item.path);
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full py-4 border-b border-white/5 text-left text-lg font-bold tracking-wider flex items-center justify-between cursor-pointer ${
                      active ? 'text-white' : 'text-zinc-500'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={16} className={active ? 'text-white' : 'text-zinc-500'} />
                      {item.label}
                    </span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
