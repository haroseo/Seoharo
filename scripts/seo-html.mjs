import { SITE_NAME } from '../src/data/siteIdentity.ts';
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}
export function serializeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}
export function renderHead(meta) {
  const tag = (attribute, name, content) => content === null ? '' : `<meta ${attribute}="${escapeHtml(name)}" content="${escapeHtml(content)}" />`;
  return [
    `<title>${escapeHtml(meta.title)}</title>`, tag('name', 'description', meta.description), tag('name', 'robots', meta.robots),
    meta.canonicalUrl ? `<link rel="canonical" href="${escapeHtml(meta.canonicalUrl)}" />` : '',
    tag('property', 'og:type', 'website'), tag('property', 'og:site_name', SITE_NAME), tag('property', 'og:title', meta.title),
    tag('property', 'og:description', meta.description), tag('property', 'og:url', meta.canonicalUrl), tag('property', 'og:locale', meta.language === 'ko' ? 'ko_KR' : 'en_US'),
    tag('property', 'og:image', meta.imageUrl), tag('property', 'og:image:width', meta.imageWidth), tag('property', 'og:image:height', meta.imageHeight),
    tag('name', 'twitter:card', 'summary'), tag('name', 'twitter:title', meta.title), tag('name', 'twitter:description', meta.description), tag('name', 'twitter:image', meta.imageUrl),
    `<script id="site-schema" type="application/ld+json">${serializeJson(meta.structuredData)}</script>`,
  ].filter(Boolean).join('\n');
}
export function renderHtml(template, page) {
  if (!page.html.trim()) throw new Error('Empty public body');
  const markers = ['<!--site-head-->', '<!--app-html-->', '<!--site-bootstrap-->'];
  for (const marker of markers) if (template.split(marker).length !== 2) throw new Error(`Missing or duplicate marker: ${marker}`);
  return template.replace('lang="ko"', `lang="${escapeHtml(page.metadata.language)}"`)
    .replace(markers[0], () => renderHead(page.metadata))
    .replace(markers[1], () => page.html)
    .replace(markers[2], () => `<script id="site-bootstrap" type="application/json">${serializeJson(page.bootstrap)}</script>`);
}
