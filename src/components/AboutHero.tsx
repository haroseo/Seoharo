import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Link } from './router';
import { aboutHeroIntro } from '../data/aboutContent';
import { contactChannels } from '../data/contactChannels';
import AboutReveal from './AboutReveal';

export default function AboutHero() {
  const { t, language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const channelOrder = ['email', 'linkedin', 'github'];
  const channels = channelOrder.flatMap((id) => contactChannels.filter((channel) => channel.id === id));
  const traits = [
    t('빠른 실행', 'Quick execution'),
    t('기획과 글쓰기', 'Planning and writing'),
    t('상상력을 결과물로', 'Imagination into real work'),
  ];

  return (
    <section id="about" tabIndex={-1} className="about-original-hero relative flex min-h-svh items-center overflow-hidden border-b border-zinc-900 bg-black px-4 pb-24 pt-32 sm:px-6 sm:pb-28 sm:pt-40 lg:px-8">
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1.5fr_1fr]">
          <AboutReveal className="space-y-6 text-center lg:text-left">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold text-zinc-400 lg:justify-start">
              {t('소개', 'Introduction')} <span className="h-px w-4 bg-zinc-800" aria-hidden="true" />
            </p>
            <h1 className="text-5xl font-extrabold leading-[1.1] text-white sm:text-6xl lg:text-7xl">SEOHARO</h1>
            <p className="mx-auto max-w-xl text-[15px] font-normal leading-7 text-zinc-300 lg:mx-0">{aboutHeroIntro[language]}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link to="/portfolio" className="about-original-primary inline-flex min-h-12 w-full items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold text-white sm:w-auto">{t('프로젝트 목록', 'Project catalog')}</Link>
              <Link to="/contact" className="about-original-secondary inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-bold text-white sm:w-auto">{t('협업 문의', 'Collaborate')}</Link>
            </div>
          </AboutReveal>

          <AboutReveal delay={0.12} className="py-8 lg:py-10" aria-label={t('프로필과 연락처', 'Profile and contact information')}>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white">SEOHARO</h2>
              <p className="text-sm font-medium leading-6 text-zinc-300">Brand Design · Marketing · Programming</p>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-6 text-zinc-300 sm:grid-cols-2">
                {channels.map((channel) => {
                  const external = channel.id !== 'email';
                  const display = channel.id === 'linkedin' ? 'linkedin.com/in/seoharo' : channel.href.replace(/^mailto:/, '').replace(/^https:\/\//, '');
                  return (
                    <div key={channel.id} className={'border-b border-zinc-900 py-2 ' + (channel.id === 'github' ? 'sm:col-span-2' : '')}>
                      <dt className="flex items-center justify-between text-[10px] font-bold uppercase text-zinc-400">
                        {channel.label[language]} {external && <ArrowUpRight size={12} aria-hidden="true" />}
                      </dt>
                      <dd className="mt-1.5">
                        <a href={channel.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="break-all text-sm font-semibold leading-6 text-zinc-200">{display}</a>
                      </dd>
                    </div>
                  );
                })}
              </dl>
              <div className="space-y-3 border-t border-zinc-900 pt-6">
                <p className="text-[10px] font-bold text-zinc-400">{t('일하는 방식', 'WORKING STYLE')}</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {traits.map((trait) => <li key={trait} className="text-xs font-semibold leading-6 text-zinc-300">{trait}</li>)}
                </ul>
              </div>
            </div>
          </AboutReveal>
        </div>
      </div>

      <motion.a href="#about-experience" aria-label={t('소개 더 보기', 'Read more about me')} animate={reduceMotion ? { y: 0 } : { y: [0, 8, 0] }} transition={{ duration: 3, repeat: reduceMotion ? 0 : Infinity }} className="absolute bottom-8 left-1/2 z-10 inline-flex size-11 -translate-x-1/2 items-center justify-center rounded-full text-zinc-300">
        <ArrowDown size={24} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
