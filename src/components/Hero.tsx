import { portfolioData } from '../data/portfolioData';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 min-h-screen bg-white">
      <div className="absolute inset-x-0 top-0 h-20 bg-slate-50" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-12 lg:grid-cols-[1.6fr_1fr] items-center"
        >
          <motion.div variants={itemVariants} className="space-y-8 text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
              Designer Portfolio
            </p>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold uppercase tracking-[-0.06em] text-slate-950 leading-tight">
              {portfolioData.name}
            </h1>

            <p className="max-w-3xl text-xl leading-relaxed text-slate-700 mx-auto lg:mx-0">
              {portfolioData.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-950 px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-xl shadow-slate-900/20 transition-transform hover:-translate-y-0.5 hover:bg-slate-900"
              >
                Work Preview
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-950 shadow-lg shadow-slate-900/5 transition-transform hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Collaborate
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-[32px] border border-slate-200 bg-slate-50 p-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
              Business Card
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                    서하루
                  </p>
                  <h2 className="text-3xl font-semibold text-slate-950">
                    Brand Designer & CEO
                  </h2>
                </div>
                <div className="rounded-full border border-slate-300 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-700">
                  Personal
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-700">
                Branding · UX/UI · Visual Design · Programming
              </p>

              <div className="grid gap-4 text-sm text-slate-700">
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <span className="text-slate-500">Email</span>
                  <span className="font-medium">{portfolioData.contact.email}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <span className="text-slate-500">GitHub</span>
                  <a
                    href={portfolioData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-950 hover:text-slate-700"
                  >
                    haroseo
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location</span>
                  <span className="font-medium">Pyeongtaek</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 text-xs uppercase tracking-[0.35em] text-slate-500 grid gap-2">
                <span>Design Pick</span>
                <span>나랏말싸미(훈민정음)</span>
                <span>HANN봇</span>
                <span>다양한 프로젝트</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <ArrowDown className="text-slate-500" size={28} />
      </motion.div>
    </section>
  );
}
