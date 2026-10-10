import { ArrowUpRight } from 'lucide-react';
import { careerEntries } from '../data/portfolioContent';
import { useLanguage } from './LanguageContext';
import { Link } from './router';
import AboutReveal from './AboutReveal';

export default function Communities() {
  const { language, t } = useLanguage();
  const ventures = careerEntries.find((entry) => entry.group === 'business')?.ventures ?? [];
  const communityOrder = ['로블갤러리', 'Limited', 'RoFolder'];
  const communities = communityOrder.flatMap((name) => ventures.filter((venture) => venture.name === name));

  return (
    <section id="about-communities" tabIndex={-1} className="about-original-section relative overflow-hidden border-b border-zinc-900 bg-black px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="about-community-heading">
      <div className="relative z-10 mx-auto max-w-7xl">
        <AboutReveal className="mb-16 text-center">
          <p className="section-overline">COMMUNITY LEADERSHIP</p>
          <h2 id="about-community-heading" className="section-title mb-6 mt-4 font-bold">{t('커뮤니티 운영', 'Community management')}</h2>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-zinc-300 sm:text-base">
            {t('서로 다른 목적의 커뮤니티를 직접 기획하고 운영했습니다. 유저와 소통하고 피드백을 받아 운영을 개선했으며, 지금은 세 사업 모두 다른 사람에게 넘긴 뒤 운영에서 물러났습니다.', 'I planned and operated communities with different purposes, listened to users, and improved operations through their feedback. I have now handed all three businesses over and stepped away.')}
          </p>
        </AboutReveal>

        <ul className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {communities.map((venture, index) => (
            <li key={venture.name}>
              <AboutReveal delay={index * 0.06} className="h-full">
                <Link to="/career/business-operations" className="about-community-card group relative flex h-full flex-col items-center rounded-3xl border border-zinc-900 bg-zinc-950/40 p-8 text-center md:p-10" aria-label={t(venture.name + ' 운영 상세 보기', 'View ' + venture.name + ' operation details')}>
                  <div className="mb-6 flex size-20 items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-black">
                    <img src={venture.logo} alt="" aria-hidden="true" loading="lazy" decoding="async" className="size-full object-contain" draggable={false} />
                  </div>
                  <h3 className="mb-1.5 text-xl font-bold text-white">{venture.name}</h3>
                  <p className="mb-5 text-xs font-semibold text-zinc-400">
                    {language === 'ko' ? '운영 당시 ' + venture.members.toLocaleString() + '명' : venture.members.toLocaleString() + ' members at the time'}
                  </p>
                  <p className="text-sm font-normal leading-7 text-zinc-300">{venture.summary[language]}</p>
                  <p className="mb-6 mt-3 text-xs leading-6 text-zinc-500">{venture.statusText[language]}</p>
                  <span className="mt-auto inline-flex min-h-8 items-center gap-1 text-xs font-bold text-zinc-300">
                    {t('운영 상세 보기', 'View operation details')} <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </Link>
              </AboutReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
