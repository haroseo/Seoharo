import type { Locale } from './portfolioContent.ts';
import { resolvePublicPage } from './publicPages.ts';
import { normalizeAppPath } from './siteUrl.ts';
export type PageBootstrap = { initialPath: string; initialLanguage: Locale; prerendered: true };
export function parsePageBootstrap(value: unknown): PageBootstrap | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.initialPath !== 'string' || !['ko', 'en'].includes(String(candidate.initialLanguage)) || candidate.prerendered !== true) return null;
  const path = normalizeAppPath(candidate.initialPath);
  if (!path || (path !== '/404' && !resolvePublicPage(path))) return null;
  return { initialPath: path, initialLanguage: candidate.initialLanguage as Locale, prerendered: true };
}
