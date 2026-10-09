import { getNavigationScreenKey, resolveRedirectPath } from '../data/portfolioRoutes.ts';
import { SITE_ORIGIN } from '../data/siteUrl.ts';
import type { CompanyWorkSpecialtyFilter } from '../data/portfolioContent.ts';

export type NavigationView = { projectStatus?: 'all' | 'ongoing'; heightReserve?: number; companySpecialty?: CompanyWorkSpecialtyFilter };
export type NavigationEntry = {
  index: number; href: string; scrollY: number; view: NavigationView;
  previous: { index: number; href: string } | null;
};

export function readNavigationEntry(value: unknown, href: string): NavigationEntry | null {
  if (!value || typeof value !== 'object' || !('seoharoNavigation' in value)) return null;
  const entry = value.seoharoNavigation as NavigationEntry | null;
  if (!entry || entry.href !== href || !resolveRedirectPath(entry.href, SITE_ORIGIN)
    || !Number.isSafeInteger(entry.index) || entry.index < 0
    || !Number.isFinite(entry.scrollY) || entry.scrollY < 0 || entry.scrollY > 10_000_000) return null;
  if (entry.previous && (!Number.isSafeInteger(entry.previous.index) || entry.previous.index < 0 || entry.previous.index >= entry.index
    || !getNavigationScreenKey(entry.previous.href))) return null;
  const view: NavigationView = {};
  if (entry.view?.projectStatus === 'all' || entry.view?.projectStatus === 'ongoing') view.projectStatus = entry.view.projectStatus;
  if (Number.isFinite(entry.view?.heightReserve) && entry.view.heightReserve! >= 0 && entry.view.heightReserve! <= 1_000_000) view.heightReserve = entry.view.heightReserve;
  if (['all', 'marketing', 'development', 'design'].includes(entry.view?.companySpecialty ?? '')) view.companySpecialty = entry.view.companySpecialty;
  return { index: entry.index, href, scrollY: entry.scrollY, previous: entry.previous ?? null, view };
}

export function createNavigationEntry(href: string, current?: NavigationEntry | null, replace = false): NavigationEntry {
  const sameScreen = current && getNavigationScreenKey(current.href) === getNavigationScreenKey(href);
  return {
    index: current ? current.index + (replace ? 0 : 1) : 0, href, scrollY: 0,
    previous: !current || replace ? null : sameScreen ? current.previous : { index: current.index, href: current.href },
    view: sameScreen && !replace ? { ...current.view } : {},
  };
}
