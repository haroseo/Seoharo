import { normalizeAppPath } from './siteUrl.ts';
import { selectedWorks, careerEntries } from './portfolioContent.ts';

export type PublicPage = { path: string; canonicalPath: string; indexable: boolean };
const canonicalPaths = [
  '/', '/portfolio/', '/contact/', '/career/',
  ...selectedWorks.map(work => `/portfolio/${work.slug}/`),
  ...careerEntries.map(entry => entry.slug === 'company-work' ? '/portfolio/company-work/' : `/career/${entry.slug}/`),
];
const aliases: Record<string, string> = {
  '/about/': '/', '/portfolio/typolab/': '/portfolio/naratmalsami/',
  '/career/company-work/': '/portfolio/company-work/',
  '/career/group/company/': '/portfolio/company-work/',
  '/career/group/freelance/': '/career/freelance-design/',
  '/career/group/business/': '/career/business-operations/',
  '/career/group/club/': '/career/function-factory/',
  '/design/': '/portfolio/', '/development/': '/portfolio/', '/marketing/': '/portfolio/',
  '/operations/': '/portfolio/', '/clubs/': '/portfolio/',
};
export const publicPages: readonly PublicPage[] = [
  ...canonicalPaths.map(path => ({ path, canonicalPath: path, indexable: true })),
  ...Object.entries(aliases).map(([path, canonicalPath]) => ({ path, canonicalPath, indexable: false })),
];
export function resolvePublicPage(pathname: string): PublicPage | null {
  const path = normalizeAppPath(pathname);
  return path === null ? null : publicPages.find(page => normalizeAppPath(page.path) === path) ?? null;
}
