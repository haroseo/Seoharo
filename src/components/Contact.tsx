import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-100 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="section-overline">Contact</p>
            <h2 className="section-title mt-2 text-slate-950">
              Let’s shape your next design story.
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
              명확한 비주얼과 탄탄한 구조로, 브랜드와 제품이 더 신뢰받는 경험을 만들 수 있도록 돕습니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-slate-950 px-10 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-xl shadow-slate-900/20 transition-transform hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Email me
              </a>
              <a
                href={portfolioData.socialLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-10 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-slate-900/5 transition-transform hover:-translate-y-0.5 hover:bg-slate-100"
              >
                View GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
          >
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
              Contact details
            </p>
            <div className="mt-8 space-y-6 text-slate-700">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Email
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-950 truncate" title={portfolioData.contact.email}>
                  {portfolioData.contact.email}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  GitHub
                </p>
                <a
                  href={portfolioData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-lg font-semibold text-slate-950 hover:text-slate-700 transition-colors truncate"
                >
                  {portfolioData.contact.github.replace('https://github.com/', '')}
                </a>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Discord
                </p>
                <p className="mt-2 block text-lg font-semibold text-slate-950 truncate">
                  {portfolioData.contact.discord}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
