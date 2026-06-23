import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import type { Community } from '../data/portfolioData';
import { X, Users, Compass, Shield, ArrowUpRight } from 'lucide-react';

export default function Communities() {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);

  return (
    <section id="communities" className="py-32 px-4 sm:px-6 lg:px-8 bg-black border-b border-zinc-900 relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl z-10">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4 font-mono">[03 // LEADERSHIP]</p>
          <h2 className="section-title mt-4 mb-6 font-display bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent font-bold">
            Community Operations
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-zinc-400 font-light leading-relaxed">
            청소년 창업 생태계 지원 및 리소스 배포망 구축을 주도하며 유저와 긴밀히 호흡하는 커뮤니티 공간을 리드합니다.
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
              className="group relative bg-zinc-950/40 rounded-3xl p-8 md:p-10 border border-zinc-900 shadow-2xl hover:border-zinc-700 hover:-translate-y-1 transition-all duration-300 cursor-pointer select-none"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-6 rounded-2xl overflow-hidden border border-zinc-800 group-hover:scale-105 transition-transform duration-500 bg-black flex items-center justify-center">
                  <img 
                    src={community.logo} 
                    alt={community.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight font-display">
                  {community.name}
                </h3>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-zinc-900 text-zinc-300 text-[10px] font-mono border border-zinc-800">
                  <Users size={10} className="text-zinc-500" />
                  {community.members} Members
                </div>
                
                <p className="text-zinc-400 text-xs leading-relaxed font-light whitespace-pre-line mb-6">
                  {community.description}
                </p>

                <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-zinc-300 group-hover:text-white transition-colors uppercase tracking-wider">
                  View Detail
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DETAILED COMMUNITY MODAL */}
      <AnimatePresence>
        {selectedCommunity && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCommunity(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="fixed inset-4 md:inset-auto md:w-[680px] md:h-auto max-h-[85vh] z-50 bg-[#050505] border border-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col self-center justify-self-center"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-b border-zinc-900">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-800 bg-black">
                    <img src={selectedCommunity.logo} alt={selectedCommunity.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-300 uppercase">[{selectedCommunity.name} Profile]</span>
                </div>
                <button
                  onClick={() => setSelectedCommunity(null)}
                  className="p-1.5 rounded-full hover:bg-zinc-900 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-zinc-350">
                
                {/* Intro Card */}
                <div className="grid gap-6 md:grid-cols-[1.5fr_1fr] items-center bg-zinc-950/60 rounded-2xl border border-zinc-900 p-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-[9px] font-mono uppercase tracking-wider">
                        <Shield size={10} className="text-zinc-400" />
                        {selectedCommunity.role}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-[9px] font-mono uppercase tracking-wider">
                        <Users size={10} className="text-zinc-400" />
                        {selectedCommunity.members} Members
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white font-display tracking-tight">
                      {selectedCommunity.name}
                    </h3>
                    
                    <p className="text-zinc-400 font-light text-xs leading-relaxed whitespace-pre-line">
                      {selectedCommunity.detailsText}
                    </p>
                  </div>
                  
                  {/* Slogan block */}
                  <div className="border-t md:border-t-0 md:border-l border-zinc-900 pt-6 md:pt-0 md:pl-6 flex flex-col justify-center">
                    <span className="text-[8.5px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                      <Compass size={11} />
                      SLOGAN
                    </span>
                    <p className="text-xs font-semibold text-zinc-300 italic leading-relaxed">
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
                    <div className="space-y-6 pt-4 border-t border-zinc-900">
                      <div className="space-y-3">
                        <h4 className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-zinc-500" />
                          Key Contributions
                        </h4>
                        <ul className="space-y-2.5">
                          {career.achievements.map((ach, idx) => (
                            <li key={idx} className="flex gap-2.5 text-xs text-zinc-400 leading-relaxed font-light">
                              <span className="text-zinc-300 font-bold">•</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3 border-t border-zinc-900 pt-4">
                        <h4 className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                          Capabilities
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {career.skills.map((skill, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] font-mono">
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
              <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-900 flex justify-end">
                <button
                  onClick={() => setSelectedCommunity(null)}
                  className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
