import { ExternalLink } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Link } from './router';
import { primaryNavigation } from '../data/portfolioRoutes';
import { SITE_NAME } from '../data/siteIdentity';
import AboutFooter from './AboutFooter';

const LICENSES = [
  { name: 'React', license: 'MIT', url: 'https://github.com/facebook/react/blob/main/LICENSE' },
  { name: 'Vite', license: 'MIT', url: 'https://github.com/vitejs/vite/blob/main/LICENSE' },
  { name: 'Framer Motion', license: 'MIT', url: 'https://github.com/framer/motion/blob/main/LICENSE' },
  { name: 'Tailwind CSS', license: 'MIT', url: 'https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE' },
  { name: 'Lucide React', license: 'ISC', url: 'https://github.com/lucide-icons/lucide/blob/main/LICENSE' },
  { name: 'Pretendard', license: 'SIL OFL 1.1', url: 'https://github.com/orioncactus/pretendard/blob/main/LICENSE' },
  { name: 'TypeScript', license: 'Apache-2.0', url: 'https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt' },
];

export default function Footer({ originalAbout = false }: { originalAbout?: boolean }) {
  const { t } = useLanguage();
  if (originalAbout) return <AboutFooter />;
  return (
    <footer className="border-t border-[var(--line)] bg-white text-[var(--muted-copy)]" role="contentinfo">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <Link
              to="/"
              className="text-left text-base font-semibold text-[var(--ink)] hover:text-[var(--brand-accent)]"
            >
              {SITE_NAME}
            </Link>
            <p className="mt-2 max-w-md text-sm leading-6">
              {t('기획·디자인·개발 작업과 경험을 정리했습니다.', 'A selection of planning, design, development, and related experience.')}
            </p>
          </div>

          <nav aria-label={t('푸터 메뉴', 'Footer navigation')}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {primaryNavigation.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="inline-flex min-h-11 items-center hover:text-[var(--ink)]">
                    {t(link.label.ko, link.label.en)}
                  </Link>
                </li>
              ))}
              <li>
                <a href="/sitemap.xml" className="inline-flex min-h-11 items-center gap-1 hover:text-[var(--ink)]">
                  {t('사이트맵', 'Sitemap')} <ExternalLink size={12} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <details className="mt-8 border-t border-[var(--line)] pt-5">
          <summary className="w-fit cursor-pointer text-sm font-semibold hover:text-[var(--ink)]">
            {t('오픈소스 라이선스', 'Open-source licenses')}
          </summary>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs">
            {LICENSES.map((entry) => (
              <li key={entry.name}>
                <a href={entry.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)]">
                  {entry.name} · {entry.license}
                </a>
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-6 border-t border-[var(--line)] pt-5 text-xs leading-5">
          <p>© {new Date().getFullYear()} {SITE_NAME}</p>
          <p className="mt-2 max-w-4xl">
            {t(
              '이 사이트의 텍스트, 이미지, 디자인, 코드는 별도 표시가 없는 한 포트폴리오 작성자의 작업물입니다. 타인의 프로젝트와 상표는 각 권리자에게 속합니다.',
              'Unless otherwise noted, the text, images, design, and code on this site are the portfolio author’s work. Other projects and trademarks remain the property of their respective owners.'
            )}
          </p>
          <p className="mt-2">
            {t('공개된 프로젝트의 운영 여부와 외부 링크는 달라질 수 있습니다.', 'Project status and external links may change.')}
          </p>
        </div>
      </div>
    </footer>
  );
}
