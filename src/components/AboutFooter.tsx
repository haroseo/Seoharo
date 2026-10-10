import { ExternalLink } from 'lucide-react';
import { Link } from './router';
import { useLanguage } from './LanguageContext';
import { contactChannels } from '../data/contactChannels';
import { primaryNavigation } from '../data/portfolioRoutes';
import { SITE_NAME } from '../data/siteIdentity';
import FooterContactLinks from './FooterContactLinks';

export default function AboutFooter() {
  const { t, language } = useLanguage();
  return (
    <footer className="about-original border-t border-zinc-900 bg-black px-4 py-12 text-zinc-400 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 text-white">
              <img src="/assets/juwon-mark.svg" alt="" width="32" height="32" aria-hidden="true" draggable={false} />
              <span className="text-base font-bold">SEOHARO</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7">{t('디자인, 마케팅, 개발을 연결해 생각을 시도하고 현실로 만듭니다.', 'Connecting design, marketing, and development to turn ideas into real work.')}</p>
          </div>
          <nav aria-label={t('푸터 메뉴', 'Footer navigation')}>
            <h2 className="mb-3 text-sm font-semibold text-white">{t('사이트', 'Site')}</h2>
            <ul className="space-y-1 text-sm">
              {primaryNavigation.map((item) => <li key={item.path}><Link to={item.path} className="inline-flex min-h-9 items-center hover:text-white">{item.label[language]}</Link></li>)}
              <li><a href="/sitemap.xml" className="inline-flex min-h-9 items-center gap-1 hover:text-white">{t('사이트맵', 'Sitemap')} <ExternalLink size={12} aria-hidden="true" /></a></li>
            </ul>
          </nav>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-white">{t('연락', 'Contact')}</h2>
            <ul className="space-y-1 text-sm">
              {contactChannels.map((channel) => <li key={channel.id}><a href={channel.href} target={channel.id === 'email' ? undefined : '_blank'} rel={channel.id === 'email' ? undefined : 'noopener noreferrer'} className="inline-flex min-h-9 items-center hover:text-white">{channel.label[language]}</a></li>)}
            </ul>
            <FooterContactLinks dark />
          </div>
        </div>
        <details className="mt-8 border-t border-zinc-900 pt-5 text-xs leading-6">
          <summary className="w-fit cursor-pointer font-semibold hover:text-white">{t('오픈소스 라이선스', 'Open-source licenses')}</summary>
          <p className="mt-3">React · Vite · Framer Motion · Tailwind CSS (MIT) / Lucide (ISC) / Pretendard (SIL OFL 1.1) / TypeScript (Apache-2.0)</p>
          <p><a href="/licenses/bootstrap-icons-MIT.txt" className="hover:text-white">Bootstrap Icons · MIT</a></p>
        </details>
        <div className="mt-6 border-t border-zinc-900 pt-5 text-xs leading-6 text-zinc-400">
          <p>© {new Date().getFullYear()} {SITE_NAME}</p>
          <p className="mt-2 max-w-4xl">{t('이 사이트의 작업물과 디자인은 별도 표시가 없는 한 포트폴리오 작성자의 작업물입니다. 타인의 프로젝트와 상표는 각 권리자에게 속합니다. 프로젝트의 운영 여부와 외부 링크는 달라질 수 있습니다.', 'Unless otherwise noted, the work and design on this site belong to the portfolio author. Referenced projects and trademarks belong to their owners. Project availability and external links may change.')}</p>
        </div>
      </div>
    </footer>
  );
}
