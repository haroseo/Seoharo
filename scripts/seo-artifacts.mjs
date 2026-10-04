import { mkdir, readFile, writeFile, lstat } from 'node:fs/promises';
import { resolve, dirname, relative, isAbsolute, sep } from 'node:path';
import { publicPages, resolvePublicPage } from '../src/data/publicPages.ts';
import { normalizeAppPath, SITE_ORIGIN, toCanonicalUrl } from '../src/data/siteUrl.ts';
import { renderHtml } from './seo-html.mjs';

export function getHtmlOutputPath(outputDirectory, pagePath) {
  const path = normalizeAppPath(pagePath);
  if (!path) throw new Error('Unsafe output page path');
  const root = resolve(outputDirectory);
  const target = resolve(root, path === '/404' ? '404.html' : path === '/' ? 'index.html' : path.slice(1) + '/index.html');
  const rel = relative(root, target);
  if (rel.startsWith('..') || isAbsolute(rel)) throw new Error('Output escaped root');
  return target;
}
export function readPngDimensions(buffer) {
  if (buffer.length < 24 || buffer.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a' || buffer.subarray(12, 16).toString('ascii') !== 'IHDR') throw new Error('Invalid PNG header');
  const dimensions = { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  if (!dimensions.width || !dimensions.height) throw new Error('Invalid PNG dimensions');
  return dimensions;
}
export function makeSitemap() {
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + publicPages.filter(page => page.indexable).map(page => `  <url><loc>${toCanonicalUrl(page.path)}</loc></url>`).join('\n') + '\n</urlset>\n';
}
export function makeRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n\nDisallow: /dist/\nDisallow: /.github/\nDisallow: /node_modules/\n`;
}
async function rejectSymlinkAncestors(root, target) {
  const segments = relative(root, target).split(sep);
  let current = root;
  for (const segment of ['', ...segments]) {
    if (segment) current = resolve(current, segment);
    try { if ((await lstat(current)).isSymbolicLink()) throw new Error('Symlink output is not allowed'); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
}
export async function writeSiteArtifacts({ outputDirectory, template, pages, cname }) {
  if (cname.trim() !== new URL(SITE_ORIGIN).hostname) throw new Error('CNAME does not match the canonical origin');
  const expected = new Set([...publicPages.map(page => normalizeAppPath(page.path)), '/404']);
  const seen = new Set();
  const files = [];
  const image = readPngDimensions(await readFile(resolve(outputDirectory, 'assets/juwon-mark.png')));
  for (const page of pages) {
    const path = normalizeAppPath(page.bootstrap.initialPath);
    if (!path || !expected.has(path) || seen.has(path)) throw new Error('Missing, duplicate or non-public page');
    seen.add(path);
    const config = resolvePublicPage(path);
    if (page.metadata.canonicalUrl !== (config ? toCanonicalUrl(config.canonicalPath) : null)) throw new Error('Unexpected canonical');
    if (page.metadata.imageUrl !== `${SITE_ORIGIN}/assets/juwon-mark.png` || image.width !== page.metadata.imageWidth || image.height !== page.metadata.imageHeight) throw new Error('Image metadata mismatch');
    if ((page.html.match(/<h1\b/g) ?? []).length !== 1 || /opacity:0(?:;|"|\b)/.test(page.html)) throw new Error('Missing or hidden primary content');
    files.push([getHtmlOutputPath(outputDirectory, path), renderHtml(template, page)]);
  }
  if (seen.size !== expected.size) throw new Error('Incomplete public page set');
  files.push([resolve(outputDirectory, 'sitemap.xml'), makeSitemap()], [resolve(outputDirectory, 'robots.txt'), makeRobots()], [resolve(outputDirectory, 'CNAME'), cname.trim() + '\n']);
  for (const [path] of files) await rejectSymlinkAncestors(resolve(outputDirectory), path);
  for (const [path, html] of files) { await mkdir(dirname(path), { recursive: true }); await writeFile(path, html, 'utf8'); }
  return { pages: publicPages.filter(page => page.indexable).length, aliases: publicPages.filter(page => !page.indexable).length, notFound: 1 };
}
