import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import type { Project, Career } from '../data/portfolioData';
import InteractiveParticles from './InteractiveParticles';
import { X, ExternalLink, Code, Calendar, Award, Compass, Sparkles, Briefcase } from 'lucide-react';

export default function PortfolioPage() {
  const [filter, setFilter] = useState<'all' | 'brand' | 'marketing' | 'development'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [activeSegment, setActiveSegment] = useState<'projects' | 'careers'>('projects');

  // Filter projects
  const filteredProjects = portfolioData.projects.filter(p => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-slate-950 text-white overflow-hidden p-6 sm:p-12 flex flex-col justify-start">
      
      {/* 3D Particle Background */}
      <InteractiveParticles />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, #94a3b8 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Title and Segment Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800 pb-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight font-display bg-gradient-to-r from-slate-200 via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Spatial Creative Catalog
            </h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest font-mono">
              Branding x Growth Marketing x Development
            </p>
          </div>

          {/* Segment Selector (Projects vs Careers) */}
          <div className="flex bg-slate-900/60 border border-slate-800 p-1.5 rounded-full backdrop-blur-md select-none">
            <button
              onClick={() => setActiveSegment('projects')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all cursor-pointer ${
                activeSegment === 'projects'
                  ? 'bg-white text-slate-950 shadow-md scale-102'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveSegment('careers')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all cursor-pointer ${
                activeSegment === 'careers'
                  ? 'bg-white text-slate-950 shadow-md scale-102'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Experience
            </button>
          </div>
        </div>

        {/* Categories Filter (Only visible for Projects segment) */}
        {activeSegment === 'projects' && (
          <div className="flex flex-wrap justify-center md:justify-start gap-2.5 select-none">
            {[
              { id: 'all', label: 'All Works' },
              { id: 'brand', label: 'Brand Design' },
              { id: 'marketing', label: 'Growth Marketing' },
              { id: 'development', label: 'Development' }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id as any)}
                className={`px-4.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  filter === btn.id
                    ? 'bg-slate-100 text-slate-950 border-white font-extrabold shadow-sm scale-102'
                    : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* Dynamic Display Grid */}
        <AnimatePresence mode="wait">
          {activeSegment === 'projects' ? (
            <motion.div
              key="projects-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layoutId={`project-card-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                  className="group relative bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 hover:border-slate-600 transition-all duration-300 cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm overflow-hidden flex flex-col justify-between min-h-[220px]"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                        project.category === 'brand' ? 'border-sky-500/30 text-sky-400 bg-sky-500/5' :
                        project.category === 'marketing' ? 'border-violet-500/30 text-violet-400 bg-violet-500/5' :
                        'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'
                      }`}>
                        {project.category}
                      </span>
                      <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest font-mono">
                        0{project.id}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-slate-100 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-6 border-t border-slate-800/40 pt-4">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-[9px] font-semibold text-slate-500 uppercase tracking-wide">
                        #{tag.replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="careers-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {portfolioData.careers.map((career) => (
                <motion.div
                  key={career.id}
                  layoutId={`career-card-${career.id}`}
                  onClick={() => setSelectedCareer(career)}
                  whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                  className="group relative bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 hover:border-slate-600 transition-all duration-300 cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm overflow-hidden flex flex-col justify-between min-h-[220px]"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                        <Briefcase size={12} />
                        Experience
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono tracking-tight">
                        {career.period.split(' ')[0]}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-slate-100 group-hover:text-white transition-colors">
                      {career.title.split(' - ')[0]}
                    </h3>
                    
                    <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-3">
                      {career.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-800/40 pt-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {career.title.split(' - ')[1]}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold group-hover:translate-x-0.5 transition-transform">
                      View details →
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FLUID MORPH CASE STUDY OVERLAY: PROJECTS */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              layoutId={`project-card-${selectedProject.id}`}
              className="relative w-full max-w-5xl h-[85vh] bg-slate-900 border border-slate-800 rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-950 hover:scale-105 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* LEFT SIDE: Cinematic Media Frame */}
              <div className="w-full md:w-1/2 h-48 md:h-full bg-slate-950 relative overflow-hidden flex items-center justify-center select-none border-b md:border-b-0 md:border-r border-slate-800">
                <img 
                  src={selectedProject.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-900/60" />
              </div>

              {/* RIGHT SIDE: Rich Typography Case Study */}
              <div className="w-full md:w-1/2 flex-1 flex flex-col justify-between overflow-hidden">
                {/* Scrollable contents */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  {/* Category capsule */}
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900 text-slate-400">
                      {selectedProject.category} category
                    </span>
                  </div>

                  {/* Header info */}
                  <div className="space-y-3">
                    <h3 className="text-3xl font-extrabold tracking-tight text-white">
                      {selectedProject.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-light">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Case Study text blocks */}
                  {selectedProject.details ? (
                    <div className="space-y-6">
                      <div className="space-y-2 border-t border-slate-800/60 pt-5">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-slate-500" />
                          Overview & Purpose
                        </h4>
                        <p className="text-xs leading-relaxed text-slate-300 font-light">
                          {selectedProject.details.background}
                        </p>
                      </div>

                      <div className="space-y-2 border-t border-slate-800/60 pt-5">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                          Execution & Design
                        </h4>
                        <p className="text-xs leading-relaxed text-slate-300 font-light">
                          {selectedProject.details.strategy}
                        </p>
                      </div>

                      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 flex flex-col gap-2">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-slate-400" />
                          Key Metrics & Achievements
                        </h4>
                        <p className="text-sm font-semibold text-slate-200 leading-relaxed">
                          {selectedProject.details.metrics}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic border-t border-slate-800/60 pt-5">
                      코드와 구조에 대한 세부 사항은 프로젝트 깃허브 코드를 참조해주십시오.
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 border-t border-slate-800/60 pt-6">
                    {selectedProject.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 text-[10px] font-semibold text-slate-400 border border-slate-800 bg-slate-900/30 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="px-8 py-5 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between gap-4">
                  {selectedProject.github ? (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
                    >
                      <Code size={14} />
                      View Source
                    </a>
                  ) : (
                    <div />
                  )}

                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-white text-slate-950 text-[10px] font-bold uppercase tracking-wider hover:bg-slate-200 transition-all cursor-pointer shadow-md"
                  >
                    Launch Live
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLUID MORPH CASE STUDY OVERLAY: CAREERS */}
      <AnimatePresence>
        {selectedCareer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              layoutId={`career-card-${selectedCareer.id}`}
              className="relative w-full max-w-3xl h-[75vh] bg-slate-900 border border-slate-800 rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCareer(null)}
                className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-950 hover:scale-105 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Header Slogan Box */}
              <div className="p-8 bg-slate-950 border-b border-slate-800 text-white flex flex-col justify-center min-h-[120px]">
                <span className="text-slate-500 text-[9px] font-bold tracking-widest uppercase mb-2 block font-mono">Slogan</span>
                <h4 className="text-lg md:text-xl font-bold tracking-wide text-slate-100">
                  "{selectedCareer.slogan}"
                </h4>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">
                      {selectedCareer.title}
                    </h3>
                    <p className="text-slate-400 text-xs font-light mt-1.5">
                      {selectedCareer.description}
                    </p>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-950 text-slate-300 text-[10px] font-bold tracking-wider font-mono flex items-center gap-1.5 shrink-0">
                    <Calendar size={12} className="text-slate-500" />
                    {selectedCareer.period}
                  </span>
                </div>

                {/* Achievements */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-slate-500" />
                    Contributions & Milestones
                  </h4>
                  <ul className="space-y-3.5">
                    {selectedCareer.achievements.map((ach, idx) => (
                      <li key={idx} className="flex gap-3 text-xs text-slate-300 leading-relaxed font-light">
                        <span className="text-emerald-400 font-bold mt-0.5">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div className="space-y-3 border-t border-slate-800 pt-5">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCareer.skills.map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 text-[10px] font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-8 py-5 border-t border-slate-800 bg-slate-950/40 flex justify-end gap-3">
                {selectedCareer.link ? (
                  <a
                    href={selectedCareer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-white text-slate-950 text-[10px] font-bold uppercase tracking-wider hover:bg-slate-200 transition-all cursor-pointer shadow-md"
                  >
                    Go to Channel
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <button
                    onClick={() => setSelectedCareer(null)}
                    className="px-4.5 py-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Close Profile
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
