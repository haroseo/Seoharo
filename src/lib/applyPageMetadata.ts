import type { PageMetadata } from '../data/siteSeo';
import { SEARCH_SITE_NAME } from '../data/siteIdentity';

export function applyPageMetadata(metadata: PageMetadata) {
  document.title = metadata.title;
  document.documentElement.lang = metadata.language;
  const values: [string, string, string | null][] = [
    ['name', 'robots', metadata.robots], ['name', 'description', metadata.description],
    ['property', 'og:title', metadata.socialTitle], ['property', 'og:description', metadata.socialDescription],
    ['property', 'og:site_name', SEARCH_SITE_NAME], ['property', 'og:url', metadata.canonicalUrl],
    ['property', 'og:image', metadata.imageUrl], ['property', 'og:image:width', String(metadata.imageWidth)],
    ['property', 'og:image:height', String(metadata.imageHeight)],
    ['property', 'og:image:type', 'image/png'], ['property', 'og:image:alt', metadata.imageAlt],
    ['property', 'og:locale', metadata.language === 'ko' ? 'ko_KR' : 'en_US'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', metadata.socialTitle], ['name', 'twitter:description', metadata.socialDescription], ['name', 'twitter:image', metadata.imageUrl],
    ['name', 'twitter:image:alt', metadata.imageAlt],
  ];
  for (const [attribute, name, value] of values) {
    let tag = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!value) { tag?.remove(); continue; }
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attribute, name); document.head.append(tag); }
    tag.setAttribute('content', value);
  }
  let canonical = document.querySelector('link[rel="canonical"]');
  if (metadata.canonicalUrl) {
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.append(canonical); }
    canonical.setAttribute('href', metadata.canonicalUrl);
  } else canonical?.remove();
  let schema = document.getElementById('site-schema');
  if (!schema) { schema = document.createElement('script'); schema.id = 'site-schema'; schema.setAttribute('type', 'application/ld+json'); document.head.append(schema); }
  schema.textContent = JSON.stringify(metadata.structuredData);
}
