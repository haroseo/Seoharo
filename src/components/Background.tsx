import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

export default function Background() {
  const { bgTheme } = useTheme();

  return (
    <div className="fixed inset-0 -z-50 w-full h-full bg-[#000000] overflow-hidden select-none pointer-events-none">
      
      {/* Dynamic Background Transitions */}
      <AnimatePresence mode="wait">
        
        {/* 1. Grid Background */}
        {bgTheme === 'grid' && (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
          />
        )}

        {/* 2. Dots Background */}
        {bgTheme === 'dots' && (
          <motion.div
            key="dots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)',
              backgroundSize: '28px 28px',
            }}
          />
        )}

        {/* 3. Noise Texture overlay */}
        {bgTheme === 'noise' && (
          <motion.div
            key="noise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.04 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
        )}

        {/* 4. Motion Aurora Gradient circles */}
        {bgTheme === 'aurora' && (
          <motion.div
            key="aurora"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Animated soft grey blobs in back */}
            <motion.div 
              animate={{ 
                x: [0, 80, -40, 0],
                y: [0, -60, 40, 0],
                scale: [1, 1.15, 0.9, 1]
              }}
              transition={{ 
                duration: 25, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-zinc-800/10 blur-[120px] pointer-events-none"
            />
            <motion.div 
              animate={{ 
                x: [0, -60, 90, 0],
                y: [0, 80, -30, 0],
                scale: [1, 0.85, 1.1, 1]
              }}
              transition={{ 
                duration: 22, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute -bottom-[10%] -right-[10%] w-[55vw] h-[55vw] rounded-full bg-zinc-900/20 blur-[130px] pointer-events-none"
            />
            <motion.div 
              animate={{ 
                x: [0, 50, -30, 0],
                y: [0, 70, -60, 0],
              }}
              transition={{ 
                duration: 30, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-[30%] left-[25%] w-[40vw] h-[40vw] rounded-full bg-zinc-800/5 blur-[140px] pointer-events-none"
            />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Static very soft ambient light that works on all styles */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/10 to-[#000000]/90 pointer-events-none" />
    </div>
  );
}
