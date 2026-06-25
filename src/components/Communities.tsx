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
    <section id="communities" className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-b border-zinc-900 relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl z-10">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-550 mb-4 font-mono">
            {t('커뮤니티 리더십', 'COMMUNITY LEADERSHIP')}
          </p>
          <h2 className="section-title mt-4 mb-6 font-display bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent font-bold">
            {t('커뮤니티 운영', 'Community Management')}
          </h2>
          <p className="mx-auto max-w-3xl text-sm sm:text-base text-zinc-200 font-normal leading-relaxed">
            {t(
              '총 2,000명 이상의 유저와 소통하며 커뮤니티를 성장시킨 경험을 바탕으로 더 나은 소통과 긍정적인 커뮤니티 문화를 설계합니다.',
              'Based on the experience of growing servers and communicating with over 2,000 users, I design a better user experience and positive community culture.'
            )}
          </p>
        </motion.div>

        {/* Card Grid */}
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {data.communities.map((community, index) => (
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
                
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal whitespace-pre-line mb-6">
                  {community.description}
                </p>

                <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-zinc-300 group-hover:text-white transition-colors uppercase tracking-wider">
                  {t('프로필 확인', 'View Profile')}
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[680px] md:h-auto max-h-[85vh] z-50 bg-[#050505] border border-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-zinc-950 border-b border-zinc-900">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-800 bg-black">
                    <img src={selectedCommunity.logo} alt={selectedCommunity.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-350 uppercase">[{selectedCommunity.name} Profile]</span>
                </div>
                <button
                  onClick={() => setSelectedCommunity(null)}
                  className="p-1.5 rounded-full hover:bg-zinc-900 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-zinc-300">
                
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
                    
                    <p className="text-zinc-300 font-normal text-xs sm:text-sm leading-relaxed whitespace-pre-line">
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
                  const career = data.careers.find(c => 
                    c.id === (selectedCommunity.name.toLowerCase().includes("로폴더") || selectedCommunity.name.toLowerCase().includes("rofolder") ? "rofolder" : selectedCommunity.name.toLowerCase().includes("limited") ? "limited" : "")
                  );
                  const achievements = career ? career.achievements : [
                    t("유저 친화적인 커뮤니티 규칙 정의 및 소통 구조 확립", "Establishing user-friendly communication rules and transparent structures"),
                    t("커뮤니티 내 활발한 유저 상호작용 및 이벤트 기획/진행", "Planning and executing active user interactions and events"),
                    t("자율적인 유저 참여형 서비스 피드백 채널 수립 및 운영", "Operating voluntary user feedback channels")
                  ];
                  const skills = career ? career.skills : ["Community Management", "User Engagement", "Branding"];
                  return (
                    <div className="space-y-6 pt-4 border-t border-zinc-900">
                      <div className="space-y-3">
                        <h4 className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-zinc-500" />
                          {t('핵심 기여 및 성과', 'Key Contributions')}
                        </h4>
                        <ul className="space-y-2.5">
                          {achievements.map((ach, idx) => (
                            <li key={idx} className="flex gap-2.5 text-xs text-zinc-300 leading-relaxed font-normal">
                              <span className="text-zinc-400 font-bold">•</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3 border-t border-zinc-900 pt-4">
                        <h4 className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                          {t('보유 역량', 'Capabilities')}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {skills.map((skill, idx) => (
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
