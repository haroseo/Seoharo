import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative, extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { publicPages } from '../src/data/publicPages.ts';
import { getPageMetadata } from '../src/data/siteSeo.ts';
import { SITE_ORIGIN, normalizeAppPath } from '../src/data/siteUrl.ts';
import { parsePageBootstrap } from '../src/data/pageBootstrap.ts';
import { aboutGrowth } from '../src/data/aboutContent.ts';
import { selectedWorks, careerEntries } from '../src/data/portfolioContent.ts';
import { getHtmlOutputPath, makeRobots, makeSitemap, readSharingImage } from './seo-artifacts.mjs';
import { escapeHtml } from './seo-html.mjs';

function requireCheck(condition, message) { if (!condition) throw new Error(message); }
async function listFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    requireCheck(!entry.isSymbolicLink(), 'Symlink in public build');
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(path)); else files.push(path);
  }
  return files;
}
export async function verifySeoBuild(outputDirectory) {
  const root = resolve(outputDirectory);
  const expectedHtml = new Set([...publicPages.map(page => getHtmlOutputPath(root, page.path)), getHtmlOutputPath(root, '/404')]);
  for (const file of await listFiles(root)) {
    const path = relative(root, file).replace(/\\/g, '/');
    requireCheck(expectedHtml.has(file) || ['CNAME', 'robots.txt', 'sitemap.xml', 'favicon.svg', 'icons.svg', '.nojekyll', '.well-known/discord.txt'].includes(path)
      || (/^assets\//.test(path) && /\.(?:js|css|png|jpg|jpeg|webp|svg|woff2?|ttf)$/i.test(extname(path))), `Unexpected public file: ${path}`);
    if (path === '.well-known/discord.txt') requireCheck(/^dh=[a-zA-Z0-9_-]+$/.test((await readFile(file, 'utf8')).trim()), 'Unexpected content in legacy public domain challenge');
  }
  requireCheck((await readFile(resolve(root, 'CNAME'), 'utf8')).trim() === new URL(SITE_ORIGIN).hostname, 'Wrong CNAME');
  requireCheck(await readFile(resolve(root, 'robots.txt'), 'utf8') === makeRobots(), 'Wrong robots policy');
  requireCheck(await readFile(resolve(root, 'sitemap.xml'), 'utf8') === makeSitemap(), 'Wrong sitemap');
  for (const language of ['ko', 'en']) await readSharingImage(root, getPageMetadata('/', language));
  const descriptions = new Set();
  for (const page of [...publicPages, { path: '/404', indexable: false }]) {
    const html = await readFile(getHtmlOutputPath(root, page.path), 'utf8');
    const metadata = getPageMetadata(page.path, 'ko');
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/)?.[1] ?? '';
    for (const [attribute, name, content] of [
      ['property', 'og:title', metadata.socialTitle], ['property', 'og:description', metadata.socialDescription],
      ['property', 'og:image', metadata.imageUrl], ['property', 'og:image:width', metadata.imageWidth],
      ['property', 'og:image:height', metadata.imageHeight], ['property', 'og:image:type', 'image/png'], ['property', 'og:image:alt', metadata.imageAlt],
      ['name', 'twitter:card', 'summary_large_image'], ['name', 'twitter:title', metadata.socialTitle],
      ['name', 'twitter:description', metadata.socialDescription], ['name', 'twitter:image', metadata.imageUrl], ['name', 'twitter:image:alt', metadata.imageAlt],
    ]) {
      const tag = `<meta ${attribute}="${name}" content="${escapeHtml(content)}" />`;
      requireCheck(head.split(tag).length - 1 === 1 && (head.match(new RegExp(`${attribute}="${name}"`, 'g')) ?? []).length === 1, `Wrong sharing metadata: ${page.path} ${name}`);
    }
    if (page.path === '/') {
      for (const [name, value] of [
        ['msvalidate.01', '230AE140E58F75920EDB0EA20EC0FD39'],
        ['naver-site-verification', '239679eef06375e786bdccfc7fad64c1c67d1e7c'],
      ]) {
        const tag = `<meta name="${name}" content="${value}" />`;
        requireCheck(head.split(tag).length - 1 === 1, `Missing or duplicate search verification: ${name}`);
      }
    }
    requireCheck(html.includes(`<title>${escapeHtml(metadata.title)}</title>`), `Wrong title: ${page.path}`);
    requireCheck(html.includes(`name="description" content="${escapeHtml(metadata.description)}"`), `Wrong description: ${page.path}`);
    requireCheck(html.includes(`name="robots" content="${metadata.robots}"`), `Wrong robots: ${page.path}`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/g) ?? [];
    requireCheck(metadata.canonicalUrl ? canonical.length === 1 && canonical[0].includes(metadata.canonicalUrl) : canonical.length === 0, `Wrong canonical: ${page.path}`);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
    requireCheck((main.match(/<h1\b/g) ?? []).length === 1 && main.length > 200 && !/opacity:0(?:;|"|\b)/.test(main), `Empty or hidden main: ${page.path}`);
    const schema = JSON.parse(html.match(/<script id="site-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? 'null');
    requireCheck(JSON.stringify(schema) === JSON.stringify(metadata.structuredData), `Wrong schema: ${page.path}`);
    const bootstrap = parsePageBootstrap(JSON.parse(html.match(/<script id="site-bootstrap" type="application\/json">([\s\S]*?)<\/script>/)?.[1] ?? 'null'));
    requireCheck(bootstrap?.initialPath === normalizeAppPath(page.path), `Wrong bootstrap: ${page.path}`);
    for (const match of html.matchAll(/\b(?:src|href)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
      const path = match[1];
      requireCheck(!path.startsWith('//'), 'External protocol-relative resource');
      const target = /\.[a-z0-9]+$/i.test(path) ? resolve(root, path.slice(1)) : getHtmlOutputPath(root, path);
      const rel = relative(root, target);
      requireCheck(!rel.startsWith('..') && (await stat(target)).isFile(), `Missing public target: ${path}`);
    }
    if (page.indexable) descriptions.add(metadata.description);
    const work = selectedWorks.find(work => page.path === `/portfolio/${work.slug}/`);
    const career = careerEntries.find(entry => page.path === (entry.slug === 'company-work' ? '/portfolio/company-work/' : `/career/${entry.slug}/`));
    if (work) requireCheck(main.includes(escapeHtml(work.headline.ko)) && main.includes(escapeHtml(work.title)), `Wrong project body: ${page.path}`);
    if (career) requireCheck(main.includes(escapeHtml(career.summary.ko)), `Wrong career body: ${page.path}`);
    if (page.path === '/') for (const stage of aboutGrowth) requireCheck(main.includes(escapeHtml(stage.title.ko)), 'Missing growth stage');
    if (page.path === '/contact/') for (const href of ['mailto:seoharo0111@gmail.com', 'https://github.com/haroseo', 'https://www.linkedin.com/in/seoharo/']) requireCheck(main.includes(href), 'Missing approved contact');
    if (page.path === '/portfolio/company-work/') requireCheck(main.includes('LUXERET') && main.includes('Knowly'), 'Missing company contributions');
    if (page.path === '/career/business-operations/') for (const name of ['RoFolder', 'Limited', '로블갤러리']) requireCheck(main.includes(name), 'Missing business record');
  }
  const pages = publicPages.filter(page => page.indexable).length;
  const aliases = publicPages.length - pages;
  requireCheck(descriptions.size === pages, 'Canonical descriptions must be distinct');
  return { pages, aliases, notFound: 1, sitemapUrls: pages };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try { console.log(JSON.stringify(await verifySeoBuild(process.argv[2] ?? 'dist'))); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
