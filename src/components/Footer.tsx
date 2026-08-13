import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useRouter } from './router';

interface LicenseEntry {
  name: string;
  license: string;
  url: string;
}

const OPEN_SOURCE_LICENSES: LicenseEntry[] = [
  { name: 'React', license: 'MIT License', url: 'https://github.com/facebook/react/blob/main/LICENSE' },
  { name: 'Vite', license: 'MIT License', url: 'https://github.com/vitejs/vite/blob/main/LICENSE' },
  { name: 'Framer Motion', license: 'MIT License', url: 'https://github.com/framer/motion/blob/main/LICENSE' },
  { name: 'Tailwind CSS', license: 'MIT License', url: 'https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE' },
  { name: 'Lucide React', license: 'ISC License', url: 'https://github.com/lucide-icons/lucide/blob/main/LICENSE' },
  { name: 'Pretendard', license: 'SIL OFL 1.1', url: 'https://github.com/orioncactus/pretendard/blob/main/LICENSE' },
  { name: 'Outfit (Google Fonts)', license: 'SIL OFL 1.1', url: 'https://fonts.google.com/specimen/Outfit/about' },
  { name: '@toss/tds-colors', license: 'MIT License', url: 'https://github.com/toss/toss-design-system' },
  { name: 'TypeScript', license: 'Apache-2.0 License', url: 'https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt' },
];

const NAV_LINKS = [
  { labelKo: '소개', labelEn: 'About', path: '/' },
  { labelKo: '포트폴리오', labelEn: 'Portfolio', path: '/portfolio' },
  { labelKo: '문의', labelEn: 'Contact', path: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [licensesOpen, setLicensesOpen] = useState(false);
  const { t } = useLanguage();
  const { navigate } = useRouter();

  return (
    <footer
      className="border-t border-zinc-900 bg-black text-zinc-500"
      role="contentinfo"
      aria-label="사이트 푸터"
    >
      {/* ── Main Footer Grid ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/seoharo-logo-round.png"
                alt="SEOHARO 로고"
                className="w-7 h-7 rounded-full border border-white/10"
              />
              <span className="text-white font-bold text-sm tracking-tight font-display">SEOHARO</span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs">
              {t(
                '브랜드 디자인, 마케팅 전략, 웹 개발을 하나로 연결하는 크리에이터입니다.',
                'A creator connecting brand design, marketing strategy, and web development.'
              )}
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://github.com/haroseo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub 프로필"
                className="hover:text-white transition-colors flex items-center justify-center"
              >
                <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a
                href="https://www.figma.com/@seoharo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Figma 커뮤니티 프로필"
                className="hover:text-white transition-colors text-[11px] font-bold tracking-wide uppercase"
              >
                Figma
              </a>
              <a
                href="mailto:seoharo0111@gmail.com"
                aria-label="이메일 문의"
                className="hover:text-white transition-colors text-[11px] font-bold tracking-wide uppercase"
              >
                Email
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 mb-4">
              {t('사이트', 'Site')}
            </p>
            <nav aria-label="푸터 네비게이션">
              <ul className="space-y-2.5">
                {NAV_LINKS.map(link => (
                  <li key={link.path}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-xs hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {t(link.labelKo, link.labelEn)}
                    </button>
                  </li>
                ))}
                <li>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs hover:text-white transition-colors flex items-center gap-1"
                  >
                    Sitemap <ExternalLink size={9} />
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Community Column */}
          <div className="space-y-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 mb-4">
              {t('커뮤니티', 'Community')}
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://discord.gg/ABz6SQ74Yv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs hover:text-white transition-colors flex items-center gap-1"
                >
                  RoFolder <ExternalLink size={9} />
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/H92F7jQ2aA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs hover:text-white transition-colors flex items-center gap-1"
                >
                  Limited™ <ExternalLink size={9} />
                </a>
              </li>
              <li>
                <a
                  href="https://luxeret.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs hover:text-white transition-colors flex items-center gap-1"
                >
                  LUXERET <ExternalLink size={9} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Open Source Licenses Accordion ── */}
        <div className="border-t border-zinc-900 pt-6 mb-6">
          <button
            onClick={() => setLicensesOpen(v => !v)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer w-full text-left"
            aria-expanded={licensesOpen}
            aria-controls="license-list"
          >
            <motion.span
              animate={{ rotate: licensesOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={12} />
            </motion.span>
            {t('오픈소스 라이선스', 'Open Source Licenses')}
          </button>

          <AnimatePresence>
            {licensesOpen && (
              <motion.div
                id="license-list"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-5 pb-2">
                  <p className="text-[10px] text-zinc-600 mb-4 leading-relaxed">
                    {t(
                      '이 사이트는 아래 오픈소스 프로젝트를 사용하여 제작되었습니다. 각 프로젝트의 라이선스 조건을 준수합니다.',
                      'This site was built using the following open-source projects. We comply with each project\'s license terms.'
                    )}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {OPEN_SOURCE_LICENSES.map(entry => (
                      <a
                        key={entry.name}
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-zinc-950/60 border border-zinc-900 hover:border-zinc-700 transition-all group"
                      >
                        <span className="text-[10px] font-semibold text-zinc-400 group-hover:text-white transition-colors">
                          {entry.name}
                        </span>
                        <span className="text-[9px] text-zinc-600 group-hover:text-zinc-400 transition-colors ml-2 shrink-0">
                          {entry.license}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Legal Notice ── */}
        <div className="border-t border-zinc-900 pt-6 space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="text-[10px] font-mono tracking-wider">
              © {currentYear} SEOHARO (서하루). All rights reserved.
            </p>
            <p className="text-[9px] font-sans text-zinc-600 italic">
              {t('새로운 미래를, 자신의 브랜드를 스토리로.', 'Turn your story into data for success.')}
            </p>
          </div>

          {/* Legal disclaimer text */}
          <div className="space-y-2 text-[9px] leading-relaxed text-zinc-700 max-w-4xl">
            <p>
              {t(
                '이 웹사이트에 게재된 모든 텍스트, 이미지, 디자인, 코드 등의 콘텐츠는 SEOHARO(서하루)의 지적 재산으로서, 사전 서면 동의 없이 무단으로 복제, 배포, 수정, 상업적으로 이용하는 것을 금지합니다.',
                'All content on this website, including text, images, design, and code, is the intellectual property of SEOHARO. Unauthorized reproduction, distribution, modification, or commercial use without prior written consent is strictly prohibited.'
              )}
            </p>
            <p>
              {t(
                '각 트레이드마크(RoFolder, Limited™, LUXERET, Ku:/ Studio 등)는 해당 소유자의 재산입니다. 이 사이트의 콘텐츠는 정보 제공 목적으로만 제공되며, 명시되지 않은 사항에 대해서는 어떠한 보증도 하지 않습니다.',
                'Each trademark (RoFolder, Limited™, LUXERET, Ku:/ Studio, etc.) is the property of its respective owner. Content on this site is provided for informational purposes only, and no warranty is made regarding anything not explicitly stated.'
              )}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
