import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import type { Project, Career } from '../data/portfolioData';
import { Folder, FileText, X, Minus, Maximize2, ExternalLink, Code, Calendar, ChevronRight, Award, Compass, Sparkles } from 'lucide-react';

interface WindowState {
  id: 'projects' | 'careers';
  isOpen: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
}

export default function PortfolioPage() {
  const [windows, setWindows] = useState<{ projects: WindowState; careers: WindowState }>({
    projects: { id: 'projects', isOpen: true, isMaximized: false, x: 40, y: 80 },
    careers: { id: 'careers', isOpen: false, isMaximized: false, x: 200, y: 150 },
  });

  const [focusedWindow, setFocusedWindow] = useState<'projects' | 'careers'>('projects');
  
  // File filters inside windows
  const [projectFilter, setProjectFilter] = useState<'all' | 'brand' | 'marketing' | 'development'>('all');
  const [careerFilter, setCareerFilter] = useState<'all' | 'lead' | 'design-marketing' | 'dev'>('all');

  // Currently open file (Document Reader)
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [openCareer, setOpenCareer] = useState<Career | null>(null);

  const toggleWindow = (id: 'projects' | 'careers') => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: !prev[id].isOpen }
    }));
    setFocusedWindow(id);
  };

  const maximizeWindow = (id: 'projects' | 'careers') => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
    }));
  };

  const bringToFront = (id: 'projects' | 'careers') => {
    setFocusedWindow(id);
  };

  // Filter projects
  const filteredProjects = portfolioData.projects.filter(p => {
    if (projectFilter === 'all') return true;
    return p.category === projectFilter;
  });

  // Filter careers
  const filteredCareers = portfolioData.careers.filter(c => {
    if (careerFilter === 'all') return true;
    if (careerFilter === 'lead') return c.id === 'rofolder' || c.id === 'limited';
    if (careerFilter === 'design-marketing') return c.id === 'luxeret' || c.id === 'hannlabs';
    if (careerFilter === 'dev') return c.id === 'simplx';
    return true;
  });

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-slate-900 overflow-hidden font-sans p-4 sm:p-8">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-slate-950 to-black" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Desktop Icons */}
      <div className="absolute top-12 left-12 flex flex-col gap-10 z-10">
        {/* Projects Folder Icon */}
        <button
          onClick={() => toggleWindow('projects')}
          className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <div className="relative w-16 h-16 flex items-center justify-center bg-slate-800/40 rounded-2xl border border-slate-700/30 group-hover:bg-slate-800/80 group-hover:scale-105 transition-all duration-300 shadow-lg backdrop-blur-md">
            <Folder className="w-9 h-9 text-sky-400 fill-sky-400/20 group-hover:fill-sky-400/40 transition-all" />
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-200 tracking-wide bg-slate-950/60 px-2.5 py-1 rounded-full border border-slate-800 backdrop-blur-sm shadow-md">
            Projects (프로젝트)
          </span>
        </button>

        {/* Experience Folder Icon */}
        <button
          onClick={() => toggleWindow('careers')}
          className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <div className="relative w-16 h-16 flex items-center justify-center bg-slate-800/40 rounded-2xl border border-slate-700/30 group-hover:bg-slate-800/80 group-hover:scale-105 transition-all duration-300 shadow-lg backdrop-blur-md">
            <Folder className="w-9 h-9 text-emerald-400 fill-emerald-400/20 group-hover:fill-emerald-400/40 transition-all" />
          </div>
          <span className="text-xs font-semibold text-slate-200 tracking-wide bg-slate-950/60 px-2.5 py-1 rounded-full border border-slate-800 backdrop-blur-sm shadow-md">
            Experience (경력 · 활동)
          </span>
        </button>
      </div>

      {/* Windows Layer */}
      <div className="relative w-full h-[calc(100vh-140px)] pointer-events-none">
        
        {/* PROJECTS WINDOW */}
        <AnimatePresence>
          {windows.projects.isOpen && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              drag
              dragMomentum={false}
              dragListener={!windows.projects.isMaximized}
              onPointerDown={() => bringToFront('projects')}
              className={`absolute pointer-events-auto bg-slate-950/90 border border-slate-800 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col overflow-hidden ${
                windows.projects.isMaximized 
                  ? 'inset-0 w-full h-full z-30' 
                  : focusedWindow === 'projects'
                    ? 'w-full max-w-4xl h-[550px] z-25'
                    : 'w-full max-w-4xl h-[550px] z-20'
              }`}
              style={windows.projects.isMaximized ? undefined : { left: windows.projects.x, top: windows.projects.y }}
            >
              {/* Window Title Bar */}
              <div className="h-12 bg-slate-900/60 px-4 border-b border-slate-800/60 flex items-center justify-between select-none cursor-move">
                {/* Control Dots */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleWindow('projects')}
                    className="w-3.5 h-3.5 rounded-full bg-rose-500/80 hover:bg-rose-500 flex items-center justify-center group/btn transition-colors cursor-pointer"
                  >
                    <X className="w-2 h-2 text-rose-950 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </button>
                  <button 
                    onClick={() => toggleWindow('projects')}
                    className="w-3.5 h-3.5 rounded-full bg-amber-500/80 hover:bg-amber-500 flex items-center justify-center group/btn transition-colors cursor-pointer"
                  >
                    <Minus className="w-2 h-2 text-amber-955 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </button>
                  <button 
                    onClick={() => maximizeWindow('projects')}
                    className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 hover:bg-emerald-500 flex items-center justify-center group/btn transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-1.5 h-1.5 text-emerald-950 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </button>
                </div>
                {/* Title */}
                <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-display">
                  C:\Seoharo\Portfolio\Projects.exe
                </span>
                {/* Empty block for symmetry */}
                <div className="w-16" />
              </div>

              {/* Window Main Work Area */}
              <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-slate-900/30 border-r border-slate-800/50 p-4 hidden sm:flex flex-col gap-6 select-none">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Filter Categories</span>
                    <div className="flex flex-col gap-1 mt-3">
                      {[
                        { id: 'all', label: 'All Projects', color: 'bg-slate-800 text-slate-200' },
                        { id: 'brand', label: 'Brand Design', color: 'bg-sky-500/10 text-sky-400' },
                        { id: 'marketing', label: 'Growth Marketing', color: 'bg-violet-500/10 text-violet-400' },
                        { id: 'development', label: 'Development', color: 'bg-emerald-500/10 text-emerald-400' },
                      ].map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setProjectFilter(cat.id as any)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold tracking-wide cursor-pointer transition-all ${
                            projectFilter === cat.id 
                              ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700/50' 
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6 overflow-y-auto bg-slate-950/20">
                  <div className="mb-6 select-none flex sm:hidden flex-wrap gap-2">
                    {/* Small Screen Filters */}
                    {['all', 'brand', 'marketing', 'development'].map(f => (
                      <button
                        key={f}
                        onClick={() => setProjectFilter(f as any)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize cursor-pointer ${
                          projectFilter === f ? 'bg-slate-800 text-white' : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        {f === 'all' ? 'All' : f === 'brand' ? 'Design' : f === 'marketing' ? 'Marketing' : 'Dev'}
                      </button>
                    ))}
                  </div>

                  {/* Grid layout for file icons */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => setOpenProject(project)}
                        className="flex flex-col items-center gap-3 p-4 rounded-xl border border-transparent hover:border-slate-800/80 hover:bg-slate-900/30 group cursor-pointer text-center transition-all select-none"
                      >
                        <div className="relative w-14 h-14 flex items-center justify-center bg-slate-900/60 rounded-xl shadow-md border border-slate-800 group-hover:scale-105 transition-transform duration-300">
                          <FileText className={`w-8 h-8 ${
                            project.category === 'brand' ? 'text-sky-400' :
                            project.category === 'marketing' ? 'text-violet-400' : 'text-emerald-400'
                          }`} />
                          <span className="absolute -bottom-1 -right-1 text-[9px] font-semibold bg-slate-800 text-slate-300 px-1 rounded-md border border-slate-700">
                            doc
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                            {project.title}
                          </span>
                          <span className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">
                            {project.category}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* EXPERIENCE & CAREERS WINDOW */}
        <AnimatePresence>
          {windows.careers.isOpen && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              drag
              dragMomentum={false}
              dragListener={!windows.careers.isMaximized}
              onPointerDown={() => bringToFront('careers')}
              className={`absolute pointer-events-auto bg-slate-950/90 border border-slate-800 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col overflow-hidden ${
                windows.careers.isMaximized 
                  ? 'inset-0 w-full h-full z-30' 
                  : focusedWindow === 'careers'
                    ? 'w-full max-w-4xl h-[550px] z-25'
                    : 'w-full max-w-4xl h-[550px] z-20'
              }`}
              style={windows.careers.isMaximized ? undefined : { left: windows.careers.x, top: windows.careers.y }}
            >
              {/* Window Title Bar */}
              <div className="h-12 bg-slate-900/60 px-4 border-b border-slate-800/60 flex items-center justify-between select-none cursor-move">
                {/* Control Dots */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleWindow('careers')}
                    className="w-3.5 h-3.5 rounded-full bg-rose-500/80 hover:bg-rose-500 flex items-center justify-center group/btn transition-colors cursor-pointer"
                  >
                    <X className="w-2 h-2 text-rose-950 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </button>
                  <button 
                    onClick={() => toggleWindow('careers')}
                    className="w-3.5 h-3.5 rounded-full bg-amber-500/80 hover:bg-amber-500 flex items-center justify-center group/btn transition-colors cursor-pointer"
                  >
                    <Minus className="w-2 h-2 text-amber-955 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </button>
                  <button 
                    onClick={() => maximizeWindow('careers')}
                    className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 hover:bg-emerald-500 flex items-center justify-center group/btn transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-1.5 h-1.5 text-emerald-950 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </button>
                </div>
                {/* Title */}
                <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-display">
                  C:\Seoharo\Portfolio\Experience.exe
                </span>
                {/* Empty block for symmetry */}
                <div className="w-16" />
              </div>

              {/* Window Main Work Area */}
              <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-slate-900/30 border-r border-slate-800/50 p-4 hidden sm:flex flex-col gap-6 select-none">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Role Type</span>
                    <div className="flex flex-col gap-1 mt-3">
                      {[
                        { id: 'all', label: 'All Roles' },
                        { id: 'lead', label: 'CEO & Founder' },
                        { id: 'design-marketing', label: 'Design & Marketing' },
                        { id: 'dev', label: 'Development' },
                      ].map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setCareerFilter(cat.id as any)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold tracking-wide cursor-pointer transition-all ${
                            careerFilter === cat.id 
                              ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700/50' 
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6 overflow-y-auto bg-slate-950/20">
                  <div className="mb-6 select-none flex sm:hidden flex-wrap gap-2">
                    {/* Small Screen Filters */}
                    {['all', 'lead', 'design-marketing', 'dev'].map(f => (
                      <button
                        key={f}
                        onClick={() => setCareerFilter(f as any)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer ${
                          careerFilter === f ? 'bg-slate-800 text-white' : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        {f === 'all' ? 'All' : f === 'lead' ? 'CEO/Founder' : f === 'design-marketing' ? 'Design/Mkt' : 'Dev'}
                      </button>
                    ))}
                  </div>

                  {/* Grid layout for career icons */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredCareers.map((career) => (
                      <button
                        key={career.id}
                        onClick={() => setOpenCareer(career)}
                        className="flex flex-col items-center gap-3 p-4 rounded-xl border border-transparent hover:border-slate-800/80 hover:bg-slate-900/30 group cursor-pointer text-center transition-all select-none"
                      >
                        <div className="relative w-14 h-14 flex items-center justify-center bg-slate-900/60 rounded-xl shadow-md border border-slate-800 group-hover:scale-105 transition-transform duration-300">
                          <FileText className="w-8 h-8 text-emerald-400" />
                          <span className="absolute -bottom-1 -right-1 text-[9px] font-semibold bg-slate-800 text-slate-300 px-1 rounded-md border border-slate-700">
                            doc
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                            {career.title.split(' - ')[0]}
                          </span>
                          <span className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">
                            {career.title.split(' - ')[1] || 'Role'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* DOCUMENT READER OVERLAY: PROJECTS */}
      <AnimatePresence>
        {openProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Paper Texture Overlay */}
              <div 
                className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply rounded-3xl"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
              />

              {/* Reader Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono tracking-tight truncate max-w-[80%]">
                  <span>C:</span>
                  <ChevronRight size={10} />
                  <span>Seoharo</span>
                  <ChevronRight size={10} />
                  <span>Portfolio</span>
                  <ChevronRight size={10} />
                  <span className="text-slate-600 font-semibold">{openProject.title}.doc</span>
                </div>
                <button
                  onClick={() => setOpenProject(null)}
                  className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Reader Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                {/* Banner Image */}
                <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/50 shadow-sm relative">
                  <img 
                    src={openProject.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"} 
                    alt={openProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Title Section */}
                <div className="space-y-4 border-b border-slate-100 pb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                    {openProject.category} project
                  </span>
                  <h3 className="text-3xl font-bold tracking-tight text-slate-900">
                    {openProject.title}
                  </h3>
                  <p className="text-slate-500 font-light text-base leading-relaxed">
                    {openProject.description}
                  </p>
                </div>

                {/* Case Study Grid */}
                {openProject.details ? (
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-slate-400" />
                          Background & Goal
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-light">
                          {openProject.details.background}
                        </p>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                          Craft & Strategy
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-light">
                          {openProject.details.strategy}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-6 rounded-2xl text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-slate-400" />
                          Results & Key Impact
                        </h4>
                        <p className="text-base font-semibold text-slate-200">
                          {openProject.details.metrics}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500 text-sm font-light italic">
                    세부 문서 덤프는 깃허브 코드 및 레포지토리를 참조하십시오.
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-6">
                  {openProject.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-lg border border-slate-200 text-slate-500 text-xs font-medium uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reader Action Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3">
                {openProject.github ? (
                  <a
                    href={openProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
                  >
                    <Code size={16} />
                    View Source Code
                  </a>
                ) : (
                  <div />
                )}
                
                <a
                  href={openProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-slate-950/10 hover:scale-102 transition-all cursor-pointer"
                >
                  Visit Live Site
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DOCUMENT READER OVERLAY: CAREERS */}
      <AnimatePresence>
        {openCareer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Paper Texture Overlay */}
              <div 
                className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply rounded-3xl"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
              />

              {/* Reader Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono tracking-tight truncate max-w-[80%]">
                  <span>C:</span>
                  <ChevronRight size={10} />
                  <span>Seoharo</span>
                  <ChevronRight size={10} />
                  <span>Experience</span>
                  <ChevronRight size={10} />
                  <span className="text-slate-600 font-semibold">{openCareer.id}_profile.doc</span>
                </div>
                <button
                  onClick={() => setOpenCareer(null)}
                  className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Reader Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                {/* Slogan Banner */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 text-white relative overflow-hidden border border-slate-800 shadow-sm flex flex-col justify-center min-h-[120px]">
                  <div className="absolute right-4 bottom-0 opacity-5 pointer-events-none">
                    <Award size={140} />
                  </div>
                  <span className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-2">Slogan</span>
                  <p className="text-lg md:text-xl font-medium tracking-wide text-slate-100">
                    "{openCareer.slogan}"
                  </p>
                </div>

                {/* Title & Info */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-100 pb-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                      {openCareer.title}
                    </h3>
                    <p className="text-slate-500 font-light text-base leading-relaxed">
                      {openCareer.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold shrink-0">
                    <Calendar size={14} />
                    {openCareer.period}
                  </div>
                </div>

                {/* Achievements Section */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    Key Roles & Accomplishments
                  </h4>
                  <ul className="space-y-3.5">
                    {openCareer.achievements.map((ach, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-slate-700 leading-relaxed font-light">
                        <span className="text-emerald-500 font-bold mt-0.5">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div className="space-y-3 border-t border-slate-100 pt-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Utilized Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {openCareer.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                {openCareer.link ? (
                  <a
                    href={openCareer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-slate-950/10 hover:scale-102 transition-all cursor-pointer"
                  >
                    Visit Channel
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <button
                    onClick={() => setOpenCareer(null)}
                    className="px-5 py-2.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
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
