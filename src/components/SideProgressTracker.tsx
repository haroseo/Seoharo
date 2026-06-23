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

  const shouldRender = currentPath === '/' || currentPath === '/about';

  useEffect(() => {
    if (!shouldRender) return;

    // Scroll listener to catch the bottom page limit (guarantees STACK highlights)
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveSection('skills');
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -65% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // If we are already at the bottom, let the scroll listener handle the STACK section
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveSection('skills');
        return;
      }

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

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  const handleScrollTo = (id: string) => {
    // Instantly sync active state on click
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-6 select-none pointer-events-auto">
      {/* Sleek vertical wireframe track line in monochrome */}
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
                  initial={{ opacity: 0, x: 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 6, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`text-[9px] font-mono tracking-[0.25em] ${
                    isActive ? 'text-white font-extrabold' : 'text-zinc-650'
                  }`}
                >
                  {sec.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Indicator Dot in Monochrome */}
            <div className="relative w-6 h-6 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: isActive ? 1.3 : isHovered ? 1.15 : 1,
                  backgroundColor: isActive ? '#ffffff' : '#050505',
                  borderColor: isActive ? '#ffffff' : isHovered ? '#71717a' : '#27272a'
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="w-2.5 h-2.5 rounded-full border bg-black flex items-center justify-center"
              >
                {isActive && (
                  <motion.div 
                    layoutId="side-nav-glow-mono"
                    className="absolute inset-0 rounded-full bg-white/10 blur-sm" 
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
