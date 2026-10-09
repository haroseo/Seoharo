import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { RouterProvider, useRouter } from './components/router';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { SearchProvider } from './components/SearchContext';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import About from './components/About';
import PortfolioPage from './components/PortfolioPage';
import ContactPage from './components/ContactPage';
import CareerPage from './components/CareerPage';
import Footer from './components/Footer';
import { MissingPage, ProjectDetail } from './components/portfolio/WorkPages';
import { careerEntries, selectedWorks, type Locale } from './data/portfolioContent';
import { getPortfolioRoute, getPrimaryNavigationPath } from './data/portfolioRoutes';
import { getPageMetadata } from './data/siteSeo';
import { applyPageMetadata } from './lib/applyPageMetadata';
import { usePageRendering } from './components/PageRenderingContext';
import './index.css';
import './portfolio.css';

function Portfolio() {
  const { currentPath } = useRouter();
  const { language } = useLanguage();
  const { hydrated } = usePageRendering();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const route = getPortfolioRoute(currentPath);
  const careerSlug = route.page === 'career-detail' ? route.slug : '';
  const project = route.page === 'project' ? selectedWorks.find((work) => work.slug === route.slug) : undefined;
  const isNotFound = route.page === 'missing' || (route.page === 'project' && !project)
    || (route.page === 'career-detail' && !careerEntries.some(entry => entry.slug === careerSlug));

  useEffect(() => {
    applyPageMetadata(getPageMetadata(currentPath, language));
  }, [currentPath, language]);

  const isAbout = route.page === 'about';
  const isPortfolio = route.page === 'work';
  const isCareer = route.page === 'career' || route.page === 'career-detail';
  const fromWorkTab = route.page === 'career-detail' && route.slug === 'company-work';
  const pageKey = getPrimaryNavigationPath(currentPath) ?? currentPath;

  return (
    <div className="min-h-screen bg-white text-[var(--ink)] flex flex-col justify-between">
      <div>
        <ProgressBar />
        <Header />
        <main id="main-content" tabIndex={-1}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              data-page-path={currentPath}
              key={pageKey}
              initial={!hydrated || shouldReduceMotion ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {isAbout && <About />}
              {isPortfolio && <PortfolioPage focusSection={route.page === 'work' ? route.focusSection : undefined} />}
              {project && <ProjectDetail slug={project.slug} />}
              {isCareer && !isNotFound && <CareerPage slug={route.page === 'career-detail' ? route.slug : undefined} initialGroup={route.page === 'career' ? route.group : undefined} fromWorkTab={fromWorkTab} />}
              {route.page === 'contact' && <ContactPage />}
              {isNotFound && <MissingPage />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Footer originalAbout={isAbout || route.page === 'contact'} />
    </div>
  );
}

export default function App({ initialPath = '/', initialLanguage = 'ko' }: { initialPath?: string; initialLanguage?: Locale; prerendered?: boolean }) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <RouterProvider initialPath={initialPath}>
        <SearchProvider>
          <Portfolio />
        </SearchProvider>
      </RouterProvider>
    </LanguageProvider>
  );
}
