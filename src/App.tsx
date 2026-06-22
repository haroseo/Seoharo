import { RouterProvider, useRouter } from './components/router';
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

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between transition-colors duration-300">
      <div>
        <ProgressBar />
        <Header />
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath === '/' ? '/about' : currentPath}
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
              {currentPath === '/portfolio' && <PortfolioPage />}
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
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

export default App;
