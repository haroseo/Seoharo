import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import type { Community } from '../data/portfolioData';
import { X, Users, Compass, Shield, ArrowUpRight } from 'lucide-react';

export default function Communities() {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);

  return (
    <section id="communities" className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl z-10">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-4 font-mono">Leadership</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-6">
            Community Management
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-500 font-light leading-relaxed">
            청소년/청년 창업 생태계 활성화와 리소스 배포망 구축을 주도하며,
            1,200명 이상의 유저와 긴밀히 호흡하는 디지털 커뮤니티 공간을 관리합니다.
          </p>
        </motion.div>

        {/* Card Grid */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {portfolioData.communities.map((community, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              onClick={() => setSelectedCommunity(community)}
              className="group relative bg-white rounded-[32px] p-8 md:p-10 border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer select-none"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100/50 ring-4 ring-slate-100 group-hover:scale-105 transition-transform duration-500 bg-white">
                  <img 
                    src={community.logo} 
                    alt={community.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                  {community.name}
                </h3>
                
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wide border border-slate-200/50">
                  <Users size={12} className="text-slate-500" />
                  {community.members} Members
                </div>
                
                <p className="text-slate-500 text-sm leading-relaxed font-light whitespace-pre-line mb-6">
                  {community.description}
                </p>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-slate-600 transition-colors uppercase tracking-wider">
                  View Detail
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DETAILED COMMUNITY MODAL */}
      <AnimatePresence>
        {selectedCommunity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200/60">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-200 bg-white">
                    <img src={selectedCommunity.logo} alt={selectedCommunity.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">{selectedCommunity.name} Workspace</span>
                </div>
                <button
                  onClick={() => setSelectedCommunity(null)}
                  className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                
                {/* Intro Card */}
                <div className="grid gap-6 md:grid-cols-[1.5fr_1fr] items-center bg-slate-50 rounded-2xl border border-slate-100 p-6 md:p-8">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold uppercase tracking-wider">
                        <Shield size={12} className="text-slate-600" />
                        {selectedCommunity.role}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold uppercase tracking-wider">
                        <Users size={12} className="text-slate-600" />
                        {selectedCommunity.members} Members
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {selectedCommunity.name}
                    </h3>
                    
                    <p className="text-slate-600 font-light text-sm leading-relaxed whitespace-pre-line">
                      {selectedCommunity.detailsText}
                    </p>
                  </div>
                  
                  {/* Slogan block */}
                  <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center min-h-[80px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Compass size={12} />
                      Mission & Slogan
                    </span>
                    <p className="text-sm font-semibold text-slate-800 italic leading-relaxed">
                      "{selectedCommunity.slogan}"
                    </p>
                  </div>
                </div>

                {/* Core Achievements & Capabilities */}
                {(() => {
                  const career = portfolioData.careers.find(c => 
                    c.id === (selectedCommunity.name.includes("로폴더") ? "rofolder" : "limited")
                  );
                  if (!career) return null;
                  return (
                    <div className="space-y-6 border-t border-slate-100 pt-6">
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-slate-400" />
                          Key Accomplishments & Leadership
                        </h4>
                        <ul className="space-y-3">
                          {career.achievements.map((ach, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-slate-700 leading-relaxed font-light">
                              <span className="text-slate-950 font-bold mt-0.5">•</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3 border-t border-slate-100 pt-5">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          Core Capabilities
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {career.skills.map((skill, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Modal Action Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200/60 flex justify-end">
                {selectedCommunity.name.includes("로폴더") ? (
                  <a
                    href="https://ctee.kr/place/seoharo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-slate-950/15 hover:scale-102 transition-all cursor-pointer"
                  >
                    Go to ctee Place
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <button
                    onClick={() => setSelectedCommunity(null)}
                    className="px-6 py-3 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Close Modal
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
