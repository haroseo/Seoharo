import type { CareerGroupId, WorkCategory } from './portfolioContent';
import { normalizeAppPath } from './siteUrl.ts';

export const primaryNavigation = [
  { path: '/', label: { ko: '소개', en: 'About' } },
  { path: '/portfolio', label: { ko: '포트폴리오', en: 'Portfolio' } },
  { path: '/contact', label: { ko: '연락', en: 'Contact' } },
] as const;

export type PortfolioRoute =
  | { page: 'about' | 'contact' | 'missing' }
  | { page: 'career'; group?: CareerGroupId }
  | { page: 'career-detail'; slug: string }
  | { page: 'work'; category: WorkCategory | 'all' | 'club'; focusSection?: 'experience' }
  | { page: 'project'; slug: string };

/** GitHub Pages redirects must stay on this site, including search and hash. */
export function resolveRedirectPath(value: string | null, origin: string): string | null {
  if (!value?.startsWith('/') || value.startsWith('//') || value.includes('\\')) return null;
  try {
    const url = new URL(value, origin);
    return url.origin === origin ? `${url.pathname}${url.search}${url.hash}` : null;
  } catch { return null; }
}

export function getPortfolioRoute(path: string): PortfolioRoute {
  const normalized = normalizeAppPath(path);
  if (!normalized) return { page: 'missing' };
  if (normalized === '/' || normalized === '/about') return { page: 'about' };
  const careerGroupMatch = normalized.match(/^\/career\/group\/(company|freelance|business|club)$/);
  if (careerGroupMatch) return { page: 'career', group: careerGroupMatch[1] as CareerGroupId };
  if (normalized === '/career') return { page: 'career' };
  if (normalized === '/contact') return { page: 'contact' };
  if (normalized === '/portfolio') return { page: 'work', category: 'all' };
  if (normalized === '/design') return { page: 'work', category: 'design' };
  if (normalized === '/development') return { page: 'work', category: 'development' };
  if (normalized === '/marketing') return { page: 'work', category: 'planning' };
  if (normalized === '/operations') return { page: 'work', category: 'operations' };
  if (normalized === '/clubs') return { page: 'work', category: 'club' };
  if (normalized === '/portfolio/company-work') return { page: 'career-detail', slug: 'company-work' };
  const match = normalized.match(/^\/portfolio\/([a-z0-9-]+)$/);
  if (match) return { page: 'project', slug: match[1] === 'typolab' ? 'naratmalsami' : match[1] };
  const careerMatch = normalized.match(/^\/career\/([a-z0-9-]+)$/);
  if (careerMatch) return { page: 'career-detail', slug: careerMatch[1] };
  return { page: 'missing' };
}

export function getPrimaryNavigationPath(path: string): string | null {
  const route = getPortfolioRoute(path);
  if (route.page === 'about') return '/';
  if (route.page === 'contact') return '/contact';
  if (route.page === 'work' || route.page === 'career' || route.page === 'career-detail' || route.page === 'project') return '/portfolio';
  return null;
}
