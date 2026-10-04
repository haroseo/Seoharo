import { aboutCapabilities } from '../data/aboutContent';
import { useLanguage } from './LanguageContext';
import AboutReveal from './AboutReveal';

export default function Skills() {
  const { language, t } = useLanguage();
  return (
    <section id="about-skills" tabIndex={-1} className="about-original-section relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="about-skills-heading">
      <div className="mx-auto max-w-7xl">
        <AboutReveal className="mb-16 text-center">
          <p className="section-overline">CAPABILITIES</p>
          <h2 id="about-skills-heading" className="section-title mb-6 mt-4 font-bold">{t('다루는 역량', 'Skills & capabilities')}</h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
            {t('디자인, 마케팅, 개발을 연결해 아이디어를 실행하는 데 사용하는 역량입니다.', 'Capabilities I use to connect design, marketing, and development and put ideas into action.')}
          </p>
        </AboutReveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {aboutCapabilities.map((group, index) => (
            <AboutReveal key={group.id} delay={index * 0.06} className="glass-card p-8">
              <h3 className="mb-2 text-lg font-bold text-white">{group.title}</h3>
              <p className="mb-6 text-[11px] font-semibold text-zinc-400">{group.subtitle}</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-3">
                {group.items.map((skill) => <li key={skill.ko} className="text-sm font-semibold leading-6 text-zinc-400">#{skill[language]}</li>)}
              </ul>
            </AboutReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
