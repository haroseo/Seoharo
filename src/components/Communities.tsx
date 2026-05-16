import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export default function Communities() {
  return (
    <section id="communities" className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-4">Leadership</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-6">
            Community Management
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-500 font-light leading-relaxed">
            총 2,000명 이상의 유저와 교감하며 서버를 성장시킨 경험을 바탕으로 
            더 나은 사용자 경험과 커뮤니티 문화를 설계합니다.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {portfolioData.communities.map((community, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100/50 ring-4 ring-slate-50">
                  <img 
                    src={community.logo} 
                    alt={community.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3 tracking-tight">
                  {community.name}
                </h3>
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-5 rounded-full bg-slate-100/80 text-slate-700 text-sm font-semibold tracking-wide border border-slate-200/50">
                  {community.members} Members
                </div>
                <p className="text-slate-500 text-sm leading-relaxed font-light whitespace-pre-line">
                  {community.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
