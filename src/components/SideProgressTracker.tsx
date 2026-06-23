import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from './router';

interface Section {
  id: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: 'hero', label: 'INTRO' },
  { id: 'about', label: 'IDENTITY' },
  { id: 'journey', label: 'JOURNEY' },
  { id: 'communities', label: 'ROLES' },
  { id: 'skills', label: 'STACK' }
];

export default function SideProgressTracker() {
  const { currentPath } = useRouter();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Only render on homepage / about page
  const shouldRender = currentPath === '/' || currentPath === '/about';

  useEffect(() => {
    if (!shouldRender) return;

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the active middle portion of the screen
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-5 select-none pointer-events-auto">
      {/* Background wireframe line */}
      <div className="absolute right-[11px] top-4 bottom-4 w-px bg-zinc-900 -z-10" />

      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredSection === sec.id;

        return (
          <div
            key={sec.id}
            className="flex items-center gap-3 cursor-pointer group"
            onMouseEnter={() => setHoveredSection(sec.id)}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={() => handleScrollTo(sec.id)}
          >
            {/* Label - visible on hover or active */}
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.span
                  initial={{ opacity: 0, x: 12, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`text-[9px] font-mono tracking-[0.25em] ${
                    isActive ? 'text-cyan-400 font-extrabold' : 'text-zinc-500'
                  }`}
                >
                  [{sec.label}]
                </motion.span>
              )}
            </AnimatePresence>

            {/* Indicator Dot */}
            <div className="relative w-6 h-6 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: isActive ? 1.4 : isHovered ? 1.1 : 1,
                  backgroundColor: isActive ? '#22d3ee' : '#18181b',
                  borderColor: isActive ? '#22d3ee' : isHovered ? '#3f3f46' : '#27272a'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-2.5 h-2.5 rounded-full border bg-zinc-950 flex items-center justify-center"
              >
                {isActive && (
                  <motion.div 
                    layoutId="side-nav-glow"
                    className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md" 
                  />
                )}
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
