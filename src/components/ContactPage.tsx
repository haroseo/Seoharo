import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Link } from './router';
import { contactChannels } from '../data/contactChannels';

export default function ContactPage() {
  const { language, t } = useLanguage();

  return (
    <section id="contact" tabIndex={-1} className="min-h-[calc(100svh-56px)] scroll-mt-14 bg-[#090a0c] px-5 pb-20 pt-20 text-white sm:px-8 sm:pb-24 sm:pt-24 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100svh-176px)] max-w-7xl items-center gap-12 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-sm font-semibold text-white/65">
            {t('연락', 'Contact')} <span aria-hidden="true" className="h-px w-7 bg-white/30" />
          </p>
          <h1 className="mt-7 max-w-xl text-[clamp(2.7rem,6vw,5rem)] font-bold leading-[1.12]">
            {t('서로의 생각을 나눠요.', 'Let’s exchange ideas.')}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg sm:leading-9">
            {t('작업을 보고 궁금해진 점이나 나누고 싶은 경험이 있다면 편하게 연락 주세요. 디자인과 기획, 만들면서 배운 이야기를 함께 나누고 싶습니다.', 'If my work sparks a question or you have an experience to share, feel free to reach out. I’d like to talk about design, planning, and what we learn by making things.')}
          </p>
          <Link to="/portfolio" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--brand-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            {t('프로젝트 보기', 'View projects')} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <aside className="border-t border-white/20 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0" aria-label={t('연락 채널', 'Contact channels')}>
          <h2 className="text-2xl font-bold sm:text-3xl">SEOHARO</h2>
          <p className="mt-3 text-sm leading-7 text-white/60 sm:text-base">
            {t('이메일이나 공개 프로필에서 이어서 이야기할 수 있습니다.', 'Continue the conversation by email or through a public profile.')}
          </p>
          <ul className="mt-8 divide-y divide-white/15 border-y border-white/15">
            {contactChannels.map((channel, index) => {
              const external = channel.id !== 'email';
              const value = channel.href.replace(/^mailto:/, '').replace(/^https:\/\//, '');
              return (
                <li key={channel.id} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5 sm:py-6">
                  <span className="pt-0.5 text-xs font-semibold tabular-nums text-white/60">{String(index + 1).padStart(2, '0')}</span>
                  <a href={channel.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="group flex min-w-0 items-center justify-between gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4">
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase text-white/60">{channel.label[language]}</span>
                      <span className="mt-2 block break-all text-base font-semibold leading-7 text-white/90 transition-colors group-hover:text-white sm:text-lg">{value}</span>
                    </span>
                    <ArrowUpRight className="shrink-0 text-white/55 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" size={20} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </section>
  );
}
