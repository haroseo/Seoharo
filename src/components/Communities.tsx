import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from './LanguageContext';
import { Users, Shield, Compass, X, ArrowUpRight } from 'lucide-react';

export default function Communities() {
  const { language, t } = useLanguage();
  const [selectedCommunity, setSelectedCommunity] = useState<any | null>(null);
  const data = portfolioData[language];

  return (
    <section id="communities" className="py-12 relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl z-10">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#a259ff] uppercase">COMMUNITIES</span>
          <h2 className="text-3xl sm:text-4xl font-display bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent font-extrabold tracking-tight mt-4 mb-4">
            {t('커뮤니티 빌딩', 'Community Leadership')}
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-zinc-400 leading-relaxed tracking-tight">
            {t(
              '다양한 소통 공간을 개설하고 기획하여, 유저 리텐션을 높이고 지속 가능한 네트워킹 생태계를 구축해 왔습니다.',
              'Created and designed diverse networking channels, maximizing user retention and building sustainable user communities.'
            )}
          </p>
        </motion.div>

        {/* 3D Glass Cards Grid (Symmetric & Premium) */}
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {data.communities.map((community, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              onClick={() => setSelectedCommunity(community)}
              whileHover={{ 
                y: -6,
                borderColor: 'rgba(162, 89, 255, 0.3)',
                boxShadow: '0 15px 30px rgba(162, 89, 255, 0.08)'
              }}
              className="glass-panel p-8 rounded-3xl flex flex-col justify-between cursor-pointer select-none transition-all duration-300 relative overflow-hidden group"
            >
              {/* Glow Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#a259ff]/10 to-transparent blur-xl pointer-events-none" />

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-6 rounded-2xl overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-500 bg-black flex items-center justify-center shadow-lg">
                  <img 
                    src={community.logo} 
                    alt={community.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight font-display">
                  {community.name}
                </h3>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-white/5 text-zinc-300 text-[9.5px] font-mono border border-white/5">
                  <Users size={9} className="text-zinc-500" />
                  {community.members}{t('명 돌파', ' Members')}
                </div>
                
                <p className="text-zinc-400 text-xs leading-relaxed font-normal mb-6 line-clamp-2">
                  {community.description}
                </p>

                <span className="inline-flex items-center gap-1 text-[9px] font-bold font-mono text-[#a259ff] group-hover:text-white transition-colors uppercase tracking-wider">
                  {t('상세 내용 확인', 'VIEW DETAILS')}
                  <ArrowUpRight size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DETAILED COMMUNITY MODAL - Celestial Hologram Style */}
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[580px] md:h-auto max-h-[85vh] z-50 bg-[#0d0d11] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-black">
                    <img src={selectedCommunity.logo} alt={selectedCommunity.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{selectedCommunity.name}</h3>
                    <p className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase">Overview</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCommunity(null)}
                  className="p-1.5 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-zinc-300">
                
                {/* Intro Card */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-300 text-[9px] font-mono uppercase tracking-wider">
                      <Shield size={9} className="text-zinc-500" />
                      {selectedCommunity.role}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-300 text-[9px] font-mono uppercase tracking-wider">
                      <Users size={9} className="text-zinc-500" />
                      {selectedCommunity.members}{t('명', ' Members')}
                    </span>
                  </div>
                  
                  <p className="text-zinc-300 font-normal text-xs sm:text-[13px] leading-relaxed whitespace-pre-line tracking-tight">
                    {selectedCommunity.detailsText}
                  </p>
                  
                  {/* Slogan block */}
                  <div className="glass-panel p-4 rounded-2xl flex flex-col justify-center">
                    <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                      <Compass size={10} />
                      {t('슬로건', 'SLOGAN')}
                    </span>
                    <p className="text-xs font-semibold text-zinc-200 italic leading-relaxed">
                      "{selectedCommunity.slogan}"
                    </p>
                  </div>
                </div>

                {/* Core Achievements & Capabilities */}
                {(() => {
                  const career = data.careers.find(c => {
                    const nameLower = selectedCommunity.name.toLowerCase();
                    if (nameLower.includes("로폴더") || nameLower.includes("rofolder")) return c.id === "rofolder";
                    if (nameLower.includes("limited")) return c.id === "limited";
                    return false;
                  });
                  const achievements = career ? career.achievements : [
                    t("유저들이 스스로 교류하고 성장할 수 있는 소통 채널 구축", "Building channels where users communicate and grow together"),
                    t("자발적 피드백과 투명한 운영 체계 확립", "Establishing voluntary feedback and transparent operation systems"),
                    t("지속 가능한 소통의 장을 통한 유저 리텐션 증대", "Increasing user retention through a sustainable communication playground")
                  ];
                  const skills = career ? career.skills : ["Community Operations", "User Retention", "Communication Design"];
                  
                  return (
                    <div className="space-y-5 pt-4 border-t border-white/5">
                      <div className="space-y-2">
                        <h4 className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-zinc-500" />
                          {t('주요 활동 성과', 'Key Contributions')}
                        </h4>
                        <ul className="space-y-2">
                          {achievements.map((ach, idx) => (
                            <li key={idx} className="flex gap-2.5 text-xs text-zinc-300 leading-relaxed font-normal tracking-tight">
                              <span className="text-[#a259ff] font-bold">•</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 border-t border-white/5 pt-4">
                        <h4 className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                          {t('운영 역량', 'Capabilities')}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {skills.map((skill, idx) => (
                            <span key={idx} className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 text-[9px] font-mono">
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
              <div className="px-6 py-4 bg-white/[0.01] border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setSelectedCommunity(null)}
                  className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {t('닫기', 'Close')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
