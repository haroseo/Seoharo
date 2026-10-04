import { useLanguage } from './LanguageContext';
import { aboutDisciplines, aboutIntro, aboutPrinciple } from '../data/aboutContent';
import AboutHero from './AboutHero';
import AboutReveal from './AboutReveal';
import Timeline from './Timeline';
import Skills from './Skills';
import '../about-original.css';

export default function About() {
  const { t, language } = useLanguage();
  const profileDetails = [
    { label: t('활동 분야', 'Areas of activity'), value: 'Brand Design · Marketing · Programming' },
    { label: t('일하는 방식', 'How I work'), value: t('말과 글로 방향을 정리하고, 직접 만들어 보며 개선합니다.', 'I clarify direction through writing and conversation, then build and improve it.') },
    { label: t('핵심 지향점', 'Core approach'), value: aboutPrinciple[language] },
    { label: t('주요 강점', 'Key strengths'), value: t('빠른 실행 · 기획 · 글쓰기 · 커뮤니케이션 · 팀 리딩', 'Execution · Planning · Writing · Communication · Team leadership') },
  ];

  return (
    <div className="about-original">
      <AboutHero />

      <section id="about-experience" tabIndex={-1} className="about-original-section relative overflow-hidden border-b border-zinc-900 bg-black px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="about-fields-heading">
        <div className="relative z-10 mx-auto max-w-7xl space-y-24">
          <div className="grid items-start gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <AboutReveal className="space-y-12">
              <div className="space-y-6">
                <h2 id="about-fields-heading" className="section-title font-display font-bold">
                  {t('디자인, 마케팅, 프로그래밍.', 'Design, Marketing, Programming.')}
                </h2>
                <p className="max-w-3xl text-[15px] font-normal leading-7 text-zinc-300">
                  {aboutIntro[language]}
                </p>
              </div>

              <div className="divide-y divide-zinc-900">
                {aboutDisciplines.map((item) => (
                  <div id={'about-' + item.id} key={item.id} tabIndex={-1} className="scroll-mt-24 space-y-2 py-6 first:pt-0 last:pb-0">
                    <h3 className="text-base font-bold text-white">{item.title[language]}</h3>
                    <p className="text-sm leading-7 text-zinc-400">{item.body[language]}</p>
                  </div>
                ))}
              </div>
            </AboutReveal>

            <AboutReveal delay={0.08} className="about-profile-details lg:sticky lg:top-28">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-8 text-zinc-300 sm:grid-cols-2">
                {profileDetails.map((detail) => (
                  <div key={detail.label} className="space-y-2.5">
                    <dt className="text-[11px] font-bold text-zinc-400">{detail.label}</dt>
                    <dd className="text-sm font-semibold leading-7 text-zinc-300">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </AboutReveal>
          </div>

        </div>
      </section>

      <Timeline />
      <Skills />
    </div>
  );
}
