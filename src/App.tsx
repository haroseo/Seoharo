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
import { LanguageProvider } from './components/LanguageContext';
import './index.css';

function AppContent() {
  const { currentPath } = useRouter();

  return (
    <div className="min-h-screen bg-[#07070a] text-white flex flex-col justify-between transition-colors duration-300 relative overflow-hidden">
      {/* Background Cosmic Glow Lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 cosmic-nebula z-0" />
      <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] cosmic-nebula z-0" />

      <div className="relative z-10 flex-1 flex flex-col">
        <ProgressBar />
        <Header />

        {/* Fullscreen Main Content Area */}
        <main className="flex-1 w-full pt-[72px] md:pt-[96px] z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={(currentPath === '/' || currentPath === '/about') ? '/about' : (['/portfolio', '/design', '/marketing', '/development'].includes(currentPath) ? '/portfolio' : currentPath)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {(currentPath === '/' || currentPath === '/about') && (
                <div className="space-y-24 md:space-y-36">
                  <Hero />
                  <About />
                  <Timeline />
                  <Communities />
                  <Skills />
                </div>
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
