import { readFile } from 'node:fs/promises';
import { renderPage, publicPages } from '../dist-ssr/entry-server.js';
import { writeSiteArtifacts } from './seo-artifacts.mjs';
const template = await readFile('dist/index.html', 'utf8');
const cname = await readFile('public/CNAME', 'utf8');
const result = await writeSiteArtifacts({ outputDirectory: 'dist', template, cname, pages: [...publicPages.map(page => renderPage(page.path)), renderPage('/404')] });
console.log('Prerendered public pages:', JSON.stringify(result));
