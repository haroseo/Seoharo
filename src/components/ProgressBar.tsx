import { motion, useScroll, useSpring } from 'framer-motion';

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  
  // Apply spring physics for ultra-smooth progress bar movement
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-slate-900 origin-left z-[100] shadow-[0_0_10px_rgba(15,23,42,0.3)]"
      style={{ scaleX }}
    />
  );
}
