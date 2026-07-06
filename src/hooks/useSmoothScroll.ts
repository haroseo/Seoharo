import { useEffect } from 'react';

export function useSmoothScroll() {
  useEffect(() => {
    // Prevent smooth scroll on touch/mobile devices to keep native touch inertia intact
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    const damping = 0.08; // Damping constant between 0.05 (slower) and 0.1 (faster)
    let isScrolling = false;

    // Track scroll position changes from keys, page reloads, browser actions, etc.
    const handleScrollSync = () => {
      if (!isScrolling) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Allow default pinch-to-zoom gestures
      if (e.ctrlKey) return;

      e.preventDefault();
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetY = Math.max(0, Math.min(maxScroll, targetY + e.deltaY * 0.85));

      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(updateScroll);
      }
    };

    const updateScroll = () => {
      const diff = targetY - currentY;
      currentY += diff * damping;

      if (Math.abs(diff) > 0.4) {
        window.scrollTo(0, currentY);
        requestAnimationFrame(updateScroll);
      } else {
        window.scrollTo(0, targetY);
        currentY = targetY;
        isScrolling = false;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScrollSync, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScrollSync);
    };
  }, []);
}
