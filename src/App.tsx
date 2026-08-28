import { useEffect } from 'react';
import { RouterProvider, useRouter } from './components/router';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Communities from './components/Communities';
import Skills from './components/Skills';
import PortfolioPage from './components/PortfolioPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

function AppContent() {
  const { currentPath } = useRouter();
  const { language } = useLanguage();

  // Dynamic Browser Title for SEO / GEO
  useEffect(() => {
    const routeTitlesKo: Record<string, string> = {
      '/': '서하루 | Brand Designer · Marketer · Developer',
      '/about': '서하루 | Brand Designer · Marketer · Developer',
      '/portfolio': '서하루 | 포트폴리오 전체',
      '/design': '서하루 | 브랜드 디자인 포트폴리오',
      '/marketing': '서하루 | 마케팅 포트폴리오',
      '/development': '서하루 | 웹 개발 포트폴리오',
      '/contact': '서하루 | 협업 및 문의',
    };

    const routeTitlesEn: Record<string, string> = {
      '/': 'SEOHARO | Brand Designer · Marketer · Developer',
      '/about': 'SEOHARO | Brand Designer · Marketer · Developer',
      '/portfolio': 'SEOHARO | Full Portfolio',
      '/design': 'SEOHARO | Brand Design Portfolio',
      '/marketing': 'SEOHARO | Marketing Portfolio',
      '/development': 'SEOHARO | Web Dev Portfolio',
      '/contact': 'SEOHARO | Contact & Collaborate',
    };

    const titleMap = language === 'ko' ? routeTitlesKo : routeTitlesEn;
    document.title = titleMap[currentPath] || titleMap['/'];
  }, [currentPath, language]);

  // Block middle-click auto-scroll globally
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 1) { // Middle button clicked
        e.preventDefault();
      }
    };
    window.addEventListener('mousedown', handleMouseDown, { passive: false });
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between transition-colors duration-300">
      <div>
        <ProgressBar />
        <Header />
        <main>
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
              {currentPath === '/contact' && <ContactPage />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Footer />
    </div>
  );
}

import { SearchProvider } from './components/SearchContext';

function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <SearchProvider>
          <AppContent />
        </SearchProvider>
      </RouterProvider>
    </LanguageProvider>
  );
}

export default App;
