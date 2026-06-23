import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import InteractiveParticles from './InteractiveParticles';
import { X, ExternalLink, Code, Compass, Sparkles, Award } from 'lucide-react';

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Separate main featured projects from open-source tools
  const mainProjects = portfolioData.projects.filter(p => p.featured);
  const openSourceTools = portfolioData.projects.filter(p => !p.featured);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden pt-24 pb-20">
      {/* Immersive Background Particles */}
      <InteractiveParticles />

      {/* Subtle Grid guides */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: `
            linear-gradient(rgba(24, 24, 27, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(24, 24, 27, 0.4) 1px, transparent 1px)
          `, 
          backgroundSize: '80px 80px' 
        }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Page Header */}
        <div className="border-b border-zinc-900 pb-10 mb-20 text-center md:text-left">
          <p className="text-[10px] font-mono tracking-[0.4em] text-zinc-500 uppercase">
            [PROJECT CATALOG]
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent mt-3">
            Creative Artifacts
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-2 uppercase tracking-widest">
            Brand Design x Web Service x Automation Scripts
          </p>
        </div>

        {/* 1. Main Projects: Full-Screen Sequential Showcase */}
        <div className="space-y-36">
          {mainProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.section
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`min-h-[75vh] flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-12 border-b border-zinc-900 pb-20`}
              >
                {/* Visual Media Frame */}
                <div className="w-full lg:w-1/2 group relative aspect-video lg:aspect-auto lg:h-[420px] rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950/40 shadow-2xl flex items-center justify-center cursor-pointer select-none"
                     onClick={() => setSelectedProject(project)}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
                  
                  {project.image && (
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full object-cover opacity-75"
                    />
                  )}
                  
                  {/* Visual Glow Spotlight */}
                  <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 blur-xl" />
                  
                  <span className="absolute bottom-6 right-6 z-20 bg-black/80 border border-zinc-800 px-4 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase text-zinc-400 group-hover:text-white group-hover:border-zinc-500 transition-all">
                    Open File →
                  </span>
                </div>

                {/* Content Panel */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500">
                      [0{idx + 1} // {project.category.toUpperCase()}]
                    </span>
                    <span className="h-px w-8 bg-zinc-800" />
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
                    {project.title}
                  </h2>

                  <p className="text-sm text-zinc-400 leading-relaxed font-light max-w-xl">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-zinc-950 border border-zinc-900 rounded-lg text-[10px] font-mono text-zinc-500 tracking-wide"
                      >
                        #{tag.replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>

                  {/* Action Link row */}
                  <div className="flex items-center gap-6 pt-4">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-650 hover:bg-zinc-850 text-white text-xs font-bold font-mono tracking-widest uppercase rounded-full cursor-pointer transition-all shadow-md"
                    >
                      Read Case Study
                    </button>
                    
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold font-mono text-zinc-400 hover:text-white uppercase tracking-wider transition-colors"
                      >
                        Launch
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* 2. Open Source & Scripts Section */}
        <div className="mt-32 border-t border-zinc-900 pt-20">
          <div className="mb-12 text-center md:text-left">
            <p className="text-[10px] font-mono tracking-[0.35em] text-zinc-500 uppercase">
              [DEVELOPMENT RESOURCE & LIBRARIES]
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-white font-display mt-2">
              Open Source Toolkits
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {openSourceTools.map((tool) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative bg-zinc-950/40 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:bg-zinc-950/80 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono tracking-widest text-cyan-500 uppercase">
                      [{tool.category.toUpperCase()}]
                    </span>
                    <span className="text-[9px] text-zinc-600 font-mono">
                      SRC_0{tool.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-200 group-hover:text-white font-display transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {tool.description}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-zinc-900/60 pt-4 mt-6">
                  <div className="flex gap-1.5">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-semibold text-zinc-600 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  {tool.github && (
                    <a
                      href={tool.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      <Code size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* SLIDING Technical Drawer File Overlay ("정리된 파일") */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm"
            />

            {/* Sliding Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="fixed top-0 right-0 z-50 w-full sm:w-[540px] md:w-[600px] h-full bg-[#050505] border-l border-zinc-900 p-8 md:p-12 overflow-y-auto flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-10">
                {/* Header Row */}
                <div className="flex justify-between items-center border-b border-zinc-900 pb-6">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase">
                      [FILE ARCHIVE // 0{selectedProject.id}]
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight text-white font-display mt-1">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Content details */}
                <div className="space-y-8 font-light text-zinc-300">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase flex items-center gap-1.5">
                      <Compass size={12} className="text-zinc-500" />
                      Overview & Purpose
                    </span>
                    <p className="text-xs leading-relaxed text-zinc-400">
                      {selectedProject.details?.background}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-500 uppercase flex items-center gap-1.5">
                      <Sparkles size={12} className="text-zinc-500" />
                      Design & Architecture
                    </span>
                    <p className="text-xs leading-relaxed text-zinc-400">
                      {selectedProject.details?.strategy}
                    </p>
                  </div>

                  {selectedProject.details?.metrics && (
                    <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-900/60 space-y-2">
                      <span className="text-[9px] font-mono tracking-[0.2em] text-cyan-500 uppercase flex items-center gap-1.5">
                        <Award size={12} className="text-cyan-500" />
                        Key Metrics & Value
                      </span>
                      <p className="text-xs leading-relaxed text-zinc-300 font-medium">
                        {selectedProject.details.metrics}
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-[9px] font-mono text-zinc-400 border border-zinc-900 bg-zinc-950/40 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer footer link block */}
              <div className="border-t border-zinc-900 pt-6 mt-12 flex gap-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-5 border border-zinc-800 hover:border-zinc-650 hover:bg-zinc-900 rounded-xl text-xs font-mono font-bold tracking-widest text-center text-zinc-300 hover:text-white uppercase transition-all"
                  >
                    View Source Code
                  </a>
                )}
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-5 bg-white text-black hover:bg-zinc-200 rounded-xl text-xs font-mono font-bold tracking-widest text-center uppercase transition-all flex items-center justify-center gap-1.5"
                  >
                    Launch Link
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
