import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { getPageMetadata, type PageMetadata } from './data/siteSeo';
import { normalizeAppPath } from './data/siteUrl';
import { resolvePublicPage, publicPages } from './data/publicPages';
import type { PageBootstrap } from './data/pageBootstrap';
import type { Locale } from './data/portfolioContent';
export { publicPages };
export type RenderedPage = { html: string; metadata: PageMetadata; bootstrap: PageBootstrap };
export function renderPage(pathname: string, language: Locale = 'ko'): RenderedPage {
  const initialPath = normalizeAppPath(pathname);
  if (!initialPath || (initialPath !== '/404' && !resolvePublicPage(initialPath))) throw new Error('Not a public page');
  const bootstrap: PageBootstrap = { initialPath, initialLanguage: language, prerendered: true };
  return { html: renderToString(<StrictMode><App {...bootstrap} /></StrictMode>), metadata: getPageMetadata(initialPath, language), bootstrap };
}
