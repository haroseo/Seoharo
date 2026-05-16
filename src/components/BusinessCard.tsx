import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function BusinessCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="business-card" className="py-32 bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16 text-center z-10"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Identity</p>
        <h2 className="text-4xl font-light tracking-tight text-white mt-4">Interactive Card</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        style={{ perspective: 1500 }}
        className="z-10"
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-[360px] sm:w-[440px] h-[260px] rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] cursor-pointer group bg-[#fdfbf7] border border-slate-200"
        >
          {/* Paper Texture Overlay */}
          <div 
            className="absolute inset-0 rounded-2xl mix-blend-multiply opacity-40 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
          
          {/* Card Content with 3D translation */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between" style={{ transform: "translateZ(40px)" }}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-slate-900" style={{ transform: "translateZ(20px)" }}>SEOHARO</h3>
                <p className="text-sm font-medium tracking-wide text-slate-500 mt-2 uppercase" style={{ transform: "translateZ(15px)" }}>Brand Designer & CEO</p>
              </div>
              <div 
                className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                style={{ transform: "translateZ(30px)" }}
              >
                S
              </div>
            </div>
            
            <div className="space-y-2" style={{ transform: "translateZ(25px)" }}>
              <p className="text-sm text-slate-600 font-medium tracking-wide">
                seoharo0111@gmail.com
              </p>
              <p className="text-sm text-slate-600 font-medium tracking-wide">
                github.com/haroseo
              </p>
              <p className="text-sm text-slate-600 font-medium tracking-wide">
                평택 (Pyeongtaek)
              </p>
            </div>
          </div>

          {/* Glare effect */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-20">
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
              style={{
                background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 25%, transparent 30%)",
                backgroundSize: "200% 200%",
                backgroundPosition: "0% 0%",
              }}
              animate={{
                backgroundPosition: ["200% 200%", "-100% -100%"]
              }}
              transition={{
                duration: 2.5,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
