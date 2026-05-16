import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Code, ArrowRight } from 'lucide-react';

export default function Projects() {
  const featuredProjects = portfolioData.projects.filter(p => p.featured);

  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24 md:mb-32"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-4">Selected work</p>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-slate-900 mb-6">
            Merge clarity<br/>and craft.
          </h2>
          <p className="max-w-2xl text-lg text-slate-500 font-light leading-relaxed">
            각 프로젝트는 심플한 구조와 감각적 비주얼을 통해 사용자 신뢰를 끌어내는 데 초점을 맞춥니다.
          </p>
        </motion.div>

        <div className="space-y-32">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full lg:w-3/5">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group shadow-2xl shadow-slate-200/50">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <img 
                      src={project.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    />
                  </motion.div>
                  <div className="absolute inset-0 border border-black/5 rounded-3xl pointer-events-none" />
                </div>
              </div>
              
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-medium">0{index + 1}</span>
                  <div className="h-px w-12 bg-slate-200" />
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-medium">{project.tags[0]}</span>
                </div>
                
                <h3 className="text-4xl font-semibold text-slate-900 mb-6 tracking-tight">
                  {project.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed text-lg mb-8 font-light">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-500 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-6">
                  <a
                    href={project.link}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-950 text-white hover:bg-slate-800 hover:scale-105 transition-all duration-300 shadow-lg group"
                  >
                    <ArrowRight size={24} className="group-hover:-rotate-45 transition-transform duration-300" />
                  </a>
                  <a
                    href={project.github}
                    className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-slate-500 hover:text-slate-950 transition-colors uppercase"
                  >
                    <Code size={18} />
                    View Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
