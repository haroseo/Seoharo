import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import type { Community } from '../data/portfolioData';
import { X, Users, Compass, Shield, ArrowUpRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function Communities() {
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const { language, t } = useLanguage();
  const data = portfolioData[language];

  return (
    <section id="communities" className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-b border-[#373737] relative overflow-hidden">
      {/* Figma Selection Boundary Box */}
      <div className="absolute inset-4 sm:inset-6 border border-[#18a0fb]/20 rounded-2xl pointer-events-none z-10">
        <div className="absolute -top-2.5 left-4 px-1.5 py-0.5 bg-[#18a0fb] text-white text-[8px] font-bold font-mono rounded">
          # Communities Section Frame
        </div>
        {/* Handles */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-[#18a0fb] rounded-sm" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-[#18a0fb] rounded-sm" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-[#18a0fb] rounded-sm" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-[#18a0fb] rounded-sm" />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="section-overline">COMMUNITY MANAGEMENT</p>
          <h2 className="section-title mt-4 mb-6 font-display bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent font-bold">
            {t('커뮤니티 운영', 'Community Management')}
          </h2>
          <p className="mx-auto max-w-3xl text-sm sm:text-base text-zinc-200 font-normal leading-relaxed tracking-tight">
            {t(
              '총 2,000명 이상의 유저와 소통하며 커뮤니티를 성장시킨 경험을 바탕으로 더 나은 소통과 긍정적인 커뮤니티 문화를 설계합니다.',
              'Based on the experience of growing servers and communicating with over 2,000 users, I design a better user experience and positive community culture.'
            )}
          </p>
        </motion.div>

        {/* Figma Plugins Market layout (List form instead of cards) */}
        <div className="max-w-4xl mx-auto bg-[#2b2b2b]/95 border border-[#373737] rounded-2xl overflow-hidden shadow-2xl divide-y divide-[#373737] font-sans">
          {/* Header of marketplace window */}
          <div className="px-6 py-3 bg-[#1e1e1e] flex justify-between items-center text-[10px] text-zinc-400 font-mono select-none border-b border-[#373737]">
            <span>Figma Community Plugins</span>
            <span>Sort: Popular</span>
          </div>

          {data.communities.map((community, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedCommunity(community)}
              className="group p-5 md:p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-5 min-w-0">
                {/* Plugin Icon/Logo */}
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#373737] bg-black flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={community.logo} 
                    alt={community.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                {/* Description texts */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-tight truncate">
                      {community.name}
                    </h3>
                    <span className="text-[8px] bg-white/5 text-zinc-400 border border-white/5 px-1.5 py-0.5 rounded font-mono">
                      {community.members}{t('명', ' Members')}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-zinc-400 font-mono mt-0.5">by @seoharo</p>
                  <p className="text-zinc-300 text-xs mt-2 line-clamp-1 tracking-tight leading-relaxed">
                    {community.description}
                  </p>
                </div>
              </div>

              {/* Install / Run Action Button */}
              <button className="flex-shrink-0 ml-4 px-4 py-2 bg-[#18a0fb] hover:bg-[#0c8ce9] text-white text-[10.5px] font-bold rounded-lg cursor-pointer transition-all shadow-sm flex items-center gap-1">
                {t('열기', 'Run')}
                <ArrowUpRight size={11} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DETAILED COMMUNITY MODAL - Figma Plugin Details Style */}
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

            {/* Modal Box: Figma Plugin Details View */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] md:h-auto max-h-[85vh] z-50 bg-[#1e1e1e] border border-[#373737] rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#2b2b2b] border-b border-[#373737]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#373737] bg-black">
                    <img src={selectedCommunity.logo} alt={selectedCommunity.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{selectedCommunity.name}</h3>
                    <p className="text-[8px] text-zinc-500 font-mono">Plugin Details & Documentation</p>
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
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-300 text-[9px] font-mono uppercase tracking-wider">
                      <Shield size={9} className="text-zinc-500" />
                      {selectedCommunity.role}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-300 text-[9px] font-mono uppercase tracking-wider">
                      <Users size={9} className="text-zinc-500" />
                      {selectedCommunity.members}{t('명', ' Members')}
                    </span>
                  </div>
                  
                  <p className="text-zinc-300 font-normal text-xs sm:text-[13px] leading-relaxed whitespace-pre-line tracking-tight">
                    {selectedCommunity.detailsText}
                  </p>
                  
                  {/* Slogan block */}
                  <div className="bg-[#2b2b2b] border border-[#373737] p-4 rounded-xl flex flex-col justify-center">
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
                    <div className="space-y-5 pt-4 border-t border-[#373737]">
                      <div className="space-y-2">
                        <h4 className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-zinc-500" />
                          {t('핵심 기여 및 성과', 'Key Contributions')}
                        </h4>
                        <ul className="space-y-2">
                          {achievements.map((ach, idx) => (
                            <li key={idx} className="flex gap-2.5 text-xs text-zinc-300 leading-relaxed font-normal tracking-tight">
                              <span className="text-[#18a0fb] font-bold">•</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 border-t border-[#373737] pt-4">
                        <h4 className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                          {t('보유 역량', 'Capabilities')}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {skills.map((skill, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-300 text-[9px] font-mono">
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
              <div className="px-6 py-4 bg-[#2b2b2b] border-t border-[#373737] flex justify-end gap-3">
                <button
                  onClick={() => setSelectedCommunity(null)}
                  className="px-5 py-2.5 rounded bg-[#1e1e1e] hover:bg-zinc-800 border border-[#373737] text-zinc-300 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
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
