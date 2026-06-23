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
      className="fixed top-0 left-0 right-0 h-0.5 bg-white origin-left z-[100] shadow-[0_0_8px_rgba(255,255,255,0.4)]"
      style={{ scaleX }}
    />
  );
}
