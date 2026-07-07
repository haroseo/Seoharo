import { useState, useEffect } from 'react';
import { Menu, X, MousePointer2, Play, ChevronDown, MessageSquare, Component, Globe, Layers } from 'lucide-react';
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
    { label: t('소개 (V)', 'ABOUT (V)'), path: '/about', icon: MousePointer2, tooltip: 'Move tool' },
    { label: t('포토폴리오 (F)', 'PORTFOLIO (F)'), path: '/portfolio', icon: Layers, tooltip: 'Frame tool' },
    { label: t('챗봇 (I)', 'AI CHAT (I)'), path: '/chat', icon: Component, tooltip: 'Resource component' },
    { label: t('협업 (C)', 'CONTACT (C)'), path: '/contact', icon: MessageSquare, tooltip: 'Comment' },
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
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#2b2b2b] border-b border-[#373737] py-2 px-4 shadow-[0_2px_4px_rgba(0,0,0,0.15)] select-none">
      <div className="w-full flex items-center justify-between">
        
        {/* Left: Figma Logo Dropdown & File Name */}
        <div className="flex items-center gap-3">
          {/* Small Figma Logo */}
          <div className="flex items-center justify-center p-1.5 hover:bg-white/5 rounded transition-colors cursor-pointer">
            <svg viewBox="0 0 12 18" className="w-3 h-[18px]">
              <path fill="#F24E1E" d="M6 0H3a3 3 0 0 0 0 6H6V0z"/>
              <path fill="#A259FF" d="M3 6a3 3 0 0 0 0 6H6V6H3z"/>
              <path fill="#0ACF83" d="M3 12a3 3 0 0 0 0 6 3 3 0 0 0 3-3V12H3z"/>
              <path fill="#1ABC9C" d="M6 12h3a3 3 0 0 0 0-6H6v6z"/>
              <path fill="#FF7262" d="M9 6A3 3 0 0 0 6 3V6h3z"/>
            </svg>
          </div>
          
          <div className="h-4 w-px bg-[#373737]" />

          {/* Project File Info */}
          <div className="flex items-center gap-1.5 px-2 py-1 hover:bg-white/5 rounded transition-colors cursor-pointer">
            <span className="text-[11px] font-semibold text-[#dddddd] font-sans tracking-wide">
              Seoharo_Portfolio.fig
            </span>
            <ChevronDown size={10} className="text-zinc-400 mt-0.5" />
          </div>
        </div>

        {/* Center: Figma Interactive Toolbar */}
        <div className="hidden md:flex items-center justify-center bg-[#2b2b2b] p-0.5 rounded-lg border border-[#373737] gap-0.5">
          {navItems.map((item) => {
            const active = isLinkActive(item.path);
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                title={item.tooltip}
                className={`relative px-3.5 py-1.5 rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#18a0fb] text-white shadow-sm'
                    : 'text-zinc-300 hover:bg-white/5'
                }`}
              >
                <Icon size={12} className={active ? 'text-white' : 'text-zinc-400'} />
                <span className="text-[10px] font-bold tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Share, Play, Zoom & Language Toggles */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            className="px-2 py-1 border border-[#373737] hover:border-zinc-500 bg-[#1e1e1e] hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-md text-[9px] font-bold tracking-wide cursor-pointer transition-all uppercase flex items-center gap-1"
          >
            <Globe size={10} />
            {language === 'ko' ? 'EN' : 'KO'}
          </button>

          <div className="h-4 w-px bg-[#373737]" />

          {/* Background Theme Switcher Dots */}
          <div className="flex items-center gap-1 px-1 bg-[#1e1e1e] py-1 rounded border border-[#373737]">
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
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  bgTheme === themeOption.id
                    ? 'bg-[#18a0fb] scale-110 shadow-[0_0_4px_rgba(24,160,251,0.5)]'
                    : 'bg-white/10 hover:bg-white/30'
                }`}
                aria-label={`Switch to ${themeOption.label} background`}
              />
            ))}
          </div>

          <div className="h-4 w-px bg-[#373737]" />

          {/* Share Button (Figma Style) */}
          <button 
            onClick={() => handleNavClick('/contact')}
            className="px-3.5 py-1.5 bg-[#18a0fb] hover:bg-[#0c8ce9] text-white text-[10px] font-bold rounded-md cursor-pointer transition-all tracking-wide"
          >
            {t('공유', 'Share')}
          </button>

          {/* Presentation (Play) Button */}
          <button 
            onClick={() => handleNavClick('/portfolio')}
            title="Present (Presentation Mode)"
            className="p-2 hover:bg-white/5 text-zinc-400 hover:text-white rounded cursor-pointer transition-all"
          >
            <Play size={12} className="fill-current" />
          </button>

          {/* Zoom Level Indicator */}
          <div className="text-[10px] text-zinc-400 font-mono select-none px-1.5 py-1 rounded border border-transparent hover:border-[#373737] hover:bg-white/5 transition-all cursor-pointer">
            100%
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            className="px-2 py-1 border border-[#373737] bg-[#1e1e1e] text-zinc-300 rounded-md text-[8px] font-bold uppercase"
          >
            {language === 'ko' ? 'EN' : 'KO'}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-12 left-4 right-4 bg-[#2b2b2b] border border-[#373737] rounded-xl p-4 flex flex-col gap-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] pointer-events-auto md:hidden"
          >
            {navItems.map((item) => {
              const active = isLinkActive(item.path);
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full text-left py-2 px-3 rounded-lg text-[12px] font-bold tracking-wide uppercase cursor-pointer transition-colors flex items-center gap-2 ${
                    active
                      ? 'bg-[#18a0fb] text-white shadow'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <Icon size={12} className={active ? 'text-white' : 'text-zinc-400'} />
                  {item.label}
                </button>
              );
            })}
            
            {/* Mobile Background Theme Picker */}
            <div className="pt-3 border-t border-[#373737] mt-1 flex justify-between items-center px-2">
              <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">{t('배경 테마', 'THEME')}</span>
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
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      bgTheme === themeOption.id
                        ? 'bg-[#18a0fb] scale-110'
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
