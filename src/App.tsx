import { useEffect } from 'react';
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
import { useSmoothScroll } from './hooks/useSmoothScroll';
import './index.css';

function AppContent() {
  const { currentPath } = useRouter();
  useSmoothScroll();

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
    <div className="min-h-screen bg-transparent flex flex-col justify-between transition-colors duration-300">
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
              {currentPath === '/chat' && <ChatPage />}
              {currentPath === '/contact' && <ContactPage />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Footer />
    </div>
  );
}

import { LanguageProvider } from './components/LanguageContext';

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
