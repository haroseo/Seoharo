import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ProgressBar(): JSX.Element {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const [ariaValue, setAriaValue] = useState<number>(0);

  // update aria-valuenow for assistive tech
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      setAriaValue(Math.round((v ?? 0) * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Use spring animation unless user prefers reduced motion
  const scaleX = reduceMotion
    ? scrollYProgress
    : useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
      });

  return (
    <motion.div
      role="progressbar"
      aria-label="Scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={ariaValue}
      className="fixed top-0 left-0 right-0 h-0.5 bg-white origin-left z-[100] shadow-[0_0_8px_rgba(255,255,255,0.4)]"
      style={{ scaleX }}
    />
  );
}
