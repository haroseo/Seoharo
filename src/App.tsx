import { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './components/router';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';

import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Communities from './components/Communities';
import Skills from './components/Skills';
import PortfolioPage from './components/PortfolioPage';
import ChatPage from './components/ChatPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './components/ThemeContext';
import Background from './components/Background';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import './index.css';

function AppContent() {
  const { currentPath } = useRouter();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');

  // Scrollspy logic to update active section properties on the fly
  useEffect(() => {
    if (currentPath !== '/' && currentPath !== '/about') return;

    const sections = ['hero', 'about', 'timeline', 'communities', 'skills'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial trigger
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isMainPage = currentPath === '/' || currentPath === '/about';

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between transition-colors duration-300">
      <div>
        <ProgressBar />
        <Header />

        {/* Outer Figma Workspace Wrapper */}
        <div className="pt-[44px] flex-1 flex w-full">
          
          {/* Left Panel: Layers Panel */}
          {isMainPage && (
            <aside className="hidden lg:flex w-60 bg-[#2b2b2b] border-r border-[#373737] flex-col text-zinc-300 select-none fixed top-[44px] bottom-0 left-0 overflow-y-auto z-20">
              <div className="px-4 py-2 text-[10px] font-bold text-zinc-500 border-b border-[#373737]">
                LAYERS
              </div>
              <div className="p-2 space-y-1">
                {/* Pages subheader */}
                <div className="px-2 py-1 text-[9px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                  Pages
                </div>
                <div className="pl-4 space-y-0.5">
                  <div className="px-2 py-1 rounded bg-[#18a0fb]/10 text-[10.5px] text-[#18a0fb] font-medium flex items-center gap-1.5 cursor-pointer">
                    <span>🏠</span> Seoharo.fig
                  </div>
                </div>
                
                <div className="h-2" />
                
                {/* Section Layers */}
                <div className="px-2 py-1 text-[9px] font-bold text-zinc-500 uppercase tracking-wider font-mono">
                  Frames
                </div>
                <div className="space-y-0.5">
                  {[
                    { id: 'hero', name: '# Hero Section', icon: '❖' },
                    { id: 'about', name: '# About Metrics', icon: '❖' },
                    { id: 'timeline', name: '# Growth Timeline', icon: '❖' },
                    { id: 'communities', name: '# Communities', icon: '❖' },
                    { id: 'skills', name: '# Skill Sets', icon: '❖' }
                  ].map((layer) => {
                    const active = activeSection === layer.id;
                    return (
                      <button
                        key={layer.id}
                        onClick={() => scrollToSection(layer.id)}
                        className={`w-full text-left px-4 py-1.5 rounded text-[10.5px] flex items-center gap-2 cursor-pointer transition-colors ${
                          active 
                            ? 'bg-[#18a0fb]/10 text-[#18a0fb] font-bold' 
                            : 'hover:bg-white/5 text-zinc-300'
                        }`}
                      >
                        <span className={active ? 'text-[#18a0fb]' : 'text-zinc-500'}>{layer.icon}</span>
                        {layer.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          )}

          {/* Center Area: Figma Canvas */}
          <main className={`flex-1 min-w-0 transition-all duration-300 ${isMainPage ? 'lg:pl-60 lg:pr-60' : ''} figma-canvas-grid`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={(currentPath === '/' || currentPath === '/about') ? '/about' : (['/portfolio', '/design', '/marketing', '/development'].includes(currentPath) ? '/portfolio' : currentPath)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {(currentPath === '/' || currentPath === '/about') && (
                  <>
                    <Hero />
                    <About />
                    <Timeline />
                    <Communities />
                    <Skills />
                  </>
                )}
                {(currentPath === '/portfolio' || currentPath === '/design' || currentPath === '/marketing' || currentPath === '/development') && <PortfolioPage />}
                {currentPath === '/chat' && <ChatPage />}
                {currentPath === '/contact' && <ContactPage />}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Right Panel: Properties Inspector */}
          {isMainPage && (
            <aside className="hidden lg:flex w-60 bg-[#2b2b2b] border-l border-[#373737] flex-col text-zinc-300 select-none fixed top-[44px] bottom-0 right-0 overflow-y-auto z-20 font-mono text-[10px]">
              <div className="px-4 py-2 font-bold text-zinc-500 border-b border-[#373737] flex justify-between items-center">
                <span>PROPERTIES</span>
                <span className="text-[8px] bg-white/5 px-1 py-0.5 rounded text-zinc-400">Design</span>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Object Position Metrics */}
                <div className="space-y-2">
                  <div className="text-zinc-500 font-bold uppercase tracking-wider text-[8px]">
                    Alignment / Layout
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-zinc-300">
                    <div className="flex items-center gap-1.5">
                      <span className="text-zinc-500 font-semibold">X</span>
                      <span className="bg-[#1e1e1e] border border-[#373737] px-2 py-1 rounded text-zinc-200 w-full truncate text-[9.5px]">
                        {activeSection === 'hero' ? '0' : activeSection === 'about' ? '120' : activeSection === 'timeline' ? '240' : activeSection === 'communities' ? '360' : '480'} px
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-zinc-500 font-semibold">Y</span>
                      <span className="bg-[#1e1e1e] border border-[#373737] px-2 py-1 rounded text-zinc-200 w-full truncate text-[9.5px]">Auto</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-zinc-500 font-semibold">W</span>
                      <span className="bg-[#1e1e1e] border border-[#373737] px-2 py-1 rounded text-zinc-200 w-full truncate text-[9.5px]">100%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-zinc-500 font-semibold">H</span>
                      <span className="bg-[#1e1e1e] border border-[#373737] px-2 py-1 rounded text-zinc-200 w-full truncate text-[9.5px]">Hug</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#373737]" />

                {/* Section Specific Details */}
                <div className="space-y-2">
                  <div className="text-zinc-500 font-bold uppercase tracking-wider text-[8px]">
                    Layer Settings
                  </div>
                  <div className="space-y-1.5 text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Selection</span>
                      <span className="text-white font-semibold uppercase">{activeSection}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Position</span>
                      <span className="text-zinc-400">Relative</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Opacity</span>
                      <span className="text-zinc-400">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Fill</span>
                      <span className="text-zinc-400">#000000</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#373737]" />

                {/* Typography Specs */}
                <div className="space-y-2">
                  <div className="text-zinc-500 font-bold uppercase tracking-wider text-[8px]">
                    Typography
                  </div>
                  <div className="space-y-1.5 text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Font family</span>
                      <span className="text-zinc-400">Outfit, Sans</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Weight</span>
                      <span className="text-zinc-400">Extrabold</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Letter spacing</span>
                      <span className="text-zinc-400">-0.03em</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Line height</span>
                      <span className="text-zinc-400">Relaxed</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#373737]" />

                {/* Prototype Mode Trigger */}
                <div className="space-y-2">
                  <div className="text-zinc-500 font-bold uppercase tracking-wider text-[8px]">
                    Interaction Flow
                  </div>
                  <div className="bg-[#18a0fb]/10 text-[#18a0fb] p-2.5 rounded border border-[#18a0fb]/20 leading-relaxed text-[9px] font-sans font-semibold">
                    {t('클릭 시 ➔ 부드럽게 타겟 영역으로 포커싱 이동.', 'On click ➔ Smooth scroll target container.')}
                  </div>
                </div>
              </div>
            </aside>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <RouterProvider>
          <Background />
          <AppContent />
        </RouterProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
