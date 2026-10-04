import { motion, type HTMLMotionProps } from 'framer-motion';
import { useOffscreenReveal } from './useOffscreenReveal';

export default function AboutReveal({ delay = 0, ...props }: HTMLMotionProps<'div'> & { delay?: number }) {
  const { ref, reveal, reducedMotion: reduceMotion } = useOffscreenReveal<HTMLDivElement>();
  return (
    <motion.div
      {...props}
      ref={ref}
      initial={false}
      animate={reveal ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
