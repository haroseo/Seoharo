export const SITE_ORIGIN = 'https://seoharo.kro.kr';

export function normalizeAppPath(pathname: string): string | null {
  if (pathname === '/') return '/';
  if (!/^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*\/?$/.test(pathname)) return null;
  return pathname.replace(/\/$/, '');
}

export function toCanonicalUrl(path: string): string {
  const normalized = normalizeAppPath(path);
  if (!normalized) throw new Error('Invalid public path');
  return SITE_ORIGIN + (normalized === '/' ? '/' : normalized + '/');
}
